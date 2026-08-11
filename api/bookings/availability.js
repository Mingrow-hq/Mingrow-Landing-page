import db from '../lib/db.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    const { date } = req.query;

    const [configRows] = await db.query('SELECT config_key, config_value FROM availability_config');
    const config = {};
    for (const row of configRows) {
      config[row.config_key] = typeof row.config_value === 'string' ? JSON.parse(row.config_value) : row.config_value;
    }

    const workingDays = config.working_days || [1, 2, 3, 4, 5, 6];
    const allSlots = config.time_slots || [
      '09:00','10:00','11:00','12:00','13:00','14:00',
      '15:00','16:00','17:00','18:00','19:00','20:00','21:00'
    ];
    const maxAdvanceDays = config.max_advance_days || 90;

    if (date) {
      const [year, month, day] = date.split('-').map(Number);
      const now = new Date();
      const requestedDate = new Date(year, month - 1, day);

      const isToday = (
        now.getFullYear() === year &&
        now.getMonth() === (month - 1) &&
        now.getDate() === day
      );

      const todayMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate());

      if (requestedDate < todayMidnight) {
        return res.status(400).json({ error: 'Cannot book past dates' });
      }

      const dayOfWeek = requestedDate.getDay();
      if (!workingDays.includes(dayOfWeek)) {
        return res.status(200).json({ available: false, reason: 'Not a working day', slots: [] });
      }

      const [blocked] = await db.query('SELECT id FROM blocked_dates WHERE blocked_date = ?', [date]);
      if (blocked.length > 0) {
        return res.status(200).json({ available: false, reason: 'Date not available', slots: [] });
      }

      // Expire held bookings
      await db.query("UPDATE bookings SET status = 'EXPIRED' WHERE status = 'HELD' AND held_until < NOW()");

      // Get active bookings (only PAID bookings count as reserved slots)
      const [activeBookings] = await db.query(
        "SELECT time_slot FROM bookings WHERE booking_date = ? AND status = 'PAID'",
        [date]
      );

      const bookedSlots = new Set(activeBookings.map(b => b.time_slot));

      const availableSlots = allSlots.filter(slot => {
        if (bookedSlots.has(slot)) return false;
        if (isToday) {
          const [hour, minute] = slot.split(':').map(Number);
          const slotTime = new Date(year, month - 1, day, hour, minute, 0, 0);
          if (slotTime <= now) {
            return false;
          }
        }
        return true;
      });

      return res.status(200).json({
        date,
        available: availableSlots.length > 0,
        slots: availableSlots,
        allSlots: allSlots,
        bookedSlots: Array.from(bookedSlots),
      });
    }

    // Helper to format Date to YYYY-MM-DD in local time
    const formatDateStr = (d) => {
      const y = d.getFullYear();
      const m = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      return `${y}-${m}-${day}`;
    };

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const maxDate = new Date(today);
    maxDate.setDate(maxDate.getDate() + parseInt(maxAdvanceDays));

    const todayStr = formatDateStr(today);
    const maxDateStr = formatDateStr(maxDate);

    const [blockedDates] = await db.query('SELECT blocked_date FROM blocked_dates WHERE blocked_date >= ? AND blocked_date <= ?', [
      todayStr,
      maxDateStr
    ]);

    const blockedSet = new Set(blockedDates.map(b => {
      const bd = new Date(b.blocked_date);
      return formatDateStr(bd);
    }));

    const availableDates = [];
    const cursor = new Date(today);

    while (cursor <= maxDate) {
      const dayOfWeek = cursor.getDay();
      const dateStr = formatDateStr(cursor);
      if (workingDays.includes(dayOfWeek) && !blockedSet.has(dateStr)) {
        availableDates.push(dateStr);
      }
      cursor.setDate(cursor.getDate() + 1);
    }

    return res.status(200).json({ availableDates });
  } catch (err) {
    console.error('MySQL Availability error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
