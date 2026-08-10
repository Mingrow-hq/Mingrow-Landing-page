import db from '../../lib/db.js';

// GET/PATCH /api/admin/bookings/:id
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, PATCH, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-admin-key');

  if (req.method === 'OPTIONS') return res.status(200).end();

  const adminKey = req.headers['x-admin-key'];
  if (!adminKey || adminKey !== process.env.ADMIN_SECRET_KEY) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { id } = req.query;
  if (!id) return res.status(400).json({ error: 'Booking ID is required' });

  if (req.method === 'GET') {
    try {
      const [rows] = await db.query(
        `SELECT b.*,
                c.name AS customer_name, c.email AS customer_email,
                c.phone AS customer_phone, c.company_name, c.website,
                p.id AS payment_db_id, p.order_id, p.payment_id,
                p.status AS payment_status, p.payment_method,
                p.paid_at AS payment_paid_at
         FROM bookings b
         JOIN customers c ON b.customer_id = c.id
         LEFT JOIN payments p ON p.booking_id = b.id
         WHERE b.id = ?`,
        [id]
      );

      if (rows.length === 0) return res.status(404).json({ error: 'Booking not found' });

      const r = rows[0];
      return res.status(200).json({
        booking: {
          id: r.id,
          booking_reference: r.booking_reference,
          booking_date: r.booking_date,
          time_slot: r.time_slot,
          status: r.status,
          amount: r.amount,
          currency: r.currency,
          notes: r.notes,
          created_at: r.created_at,
          paid_at: r.paid_at,
          held_until: r.held_until,
          customers: {
            name: r.customer_name,
            email: r.customer_email,
            phone: r.customer_phone,
            company_name: r.company_name,
            website: r.website,
          },
          payments: r.payment_db_id ? [{
            id: r.payment_db_id,
            order_id: r.order_id,
            payment_id: r.payment_id,
            status: r.payment_status,
            payment_method: r.payment_method,
            paid_at: r.payment_paid_at,
          }] : [],
        }
      });
    } catch (err) {
      console.error('Admin booking detail error:', err);
      return res.status(500).json({ error: 'Failed to fetch booking' });
    }
  }

  if (req.method === 'PATCH') {
    try {
      const { action, reason } = req.body;
      if (!action) return res.status(400).json({ error: 'Action is required' });

      const [rows] = await db.query('SELECT * FROM bookings WHERE id = ?', [id]);
      if (rows.length === 0) return res.status(404).json({ error: 'Booking not found' });

      const booking = rows[0];

      if (action === 'CANCEL') {
        if (booking.status === 'REFUNDED' || booking.status === 'CANCELLED') {
          return res.status(400).json({ error: 'Booking is already ' + booking.status });
        }
        const updatedNotes = booking.notes
          ? booking.notes + '\n[Admin cancelled: ' + (reason || 'No reason provided') + ']'
          : '[Admin cancelled: ' + (reason || 'No reason provided') + ']';

        await db.query(
          "UPDATE bookings SET status = 'CANCELLED', notes = ? WHERE id = ?",
          [updatedNotes, id]
        );
        return res.status(200).json({ success: true, message: 'Booking cancelled' });
      }

      return res.status(400).json({ error: 'Unknown action: ' + action });
    } catch (err) {
      console.error('Admin booking update error:', err);
      return res.status(500).json({ error: 'Failed to update booking' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
