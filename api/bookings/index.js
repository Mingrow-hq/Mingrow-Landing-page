import db from '../lib/db.js';
import { v4 as uuidv4 } from 'uuid';

function generateBookingRef() {
  const num = Math.floor(10000 + Math.random() * 90000);
  return `MINGROW-STUDIO-${num}`;
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, phone, companyName, website, notes, bookingDate, timeSlot } = req.body;

    if (!name || !email || !phone || !bookingDate || !timeSlot) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const cleanEmail = email.toLowerCase().trim();

    // Check if past date or past time slot today
    const [bYear, bMonth, bDay] = bookingDate.split('-').map(Number);
    const reqDateObj = new Date(bYear, bMonth - 1, bDay);
    const nowObj = new Date();
    const todayObj = new Date(nowObj.getFullYear(), nowObj.getMonth(), nowObj.getDate());

    if (reqDateObj < todayObj) {
      return res.status(400).json({ error: 'Cannot book past dates' });
    }

    if (reqDateObj.valueOf() === todayObj.valueOf()) {
      const [sh, sm] = timeSlot.split(':').map(Number);
      const slotTimeObj = new Date(nowObj.getFullYear(), nowObj.getMonth(), nowObj.getDate(), sh, sm, 0, 0);
      if (slotTimeObj <= nowObj) {
        return res.status(400).json({ error: 'Cannot book past time slots' });
      }
    }

    // Expire stale HELD bookings
    await db.query("UPDATE bookings SET status = 'EXPIRED' WHERE status = 'HELD' AND held_until < NOW()");

    // Check slot availability (only PAID bookings block creation)
    const [existing] = await db.query(
      "SELECT id FROM bookings WHERE booking_date = ? AND time_slot = ? AND status = 'PAID'",
      [bookingDate, timeSlot]
    );

    if (existing.length > 0) {
      return res.status(409).json({
        error: 'This time slot is already booked and paid. Please select another slot.',
        code: 'SLOT_TAKEN',
      });
    }

    // Upsert customer
    const [custRows] = await db.query('SELECT id FROM customers WHERE email = ?', [cleanEmail]);
    let customerId;

    if (custRows.length > 0) {
      customerId = custRows[0].id;
      await db.query(
        'UPDATE customers SET name = ?, phone = ?, company_name = ?, website = ?, notes = ? WHERE id = ?',
        [name, phone.trim(), companyName || null, website || null, notes || null, customerId]
      );
    } else {
      customerId = uuidv4();
      await db.query(
        'INSERT INTO customers (id, name, email, phone, company_name, website, notes) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [customerId, name, cleanEmail, phone.trim(), companyName || null, website || null, notes || null]
      );
    }

    // Fetch fee config
    const [feeConfig] = await db.query("SELECT config_value FROM availability_config WHERE config_key = 'booking_fee_paise'");
    const amountPaise = feeConfig.length > 0 ? (typeof feeConfig[0].config_value === 'string' ? parseInt(JSON.parse(feeConfig[0].config_value)) : parseInt(feeConfig[0].config_value)) : 250000;

    const holdUntil = new Date(Date.now() + 10 * 60 * 1000);
    const bookingId = uuidv4();
    const bookingRef = generateBookingRef();

    await db.query(
      "INSERT INTO bookings (id, booking_reference, customer_id, booking_date, time_slot, status, amount, currency, notes, held_until) VALUES (?, ?, ?, ?, ?, 'HELD', ?, 'INR', ?, ?)",
      [bookingId, bookingRef, customerId, bookingDate, timeSlot, amountPaise, notes || null, holdUntil]
    );

    return res.status(201).json({
      bookingId,
      bookingReference: bookingRef,
      customerId,
      bookingDate,
      timeSlot,
      amount: amountPaise,
      currency: 'INR',
      status: 'HELD',
      holdUntil: holdUntil.toISOString(),
    });
  } catch (err) {
    console.error('MySQL Create booking error:', err);
    return res.status(500).json({ error: 'Failed to create booking. Please try again.' });
  }
}
