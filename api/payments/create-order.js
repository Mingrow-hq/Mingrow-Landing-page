import Razorpay from 'razorpay';
import db from '../lib/db.js';
import { v4 as uuidv4 } from 'uuid';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { bookingId, amount: requestedAmount } = req.body;

    if (!bookingId) {
      return res.status(400).json({ error: 'bookingId is required' });
    }

    const [rows] = await db.query(
      `SELECT b.*, c.name AS customer_name, c.email AS customer_email, c.phone AS customer_phone 
       FROM bookings b 
       JOIN customers c ON b.customer_id = c.id 
       WHERE b.id = ?`,
      [bookingId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    const booking = rows[0];

    if (booking.status === 'PAID') {
      return res.status(400).json({ error: 'This booking is already paid', code: 'ALREADY_PAID' });
    }

    // Check if another customer completed payment for the same slot
    const [alreadyPaid] = await db.query(
      "SELECT id FROM bookings WHERE booking_date = ? AND time_slot = ? AND status = 'PAID' AND id != ?",
      [booking.booking_date, booking.time_slot, booking.id]
    );

    if (alreadyPaid.length > 0) {
      return res.status(409).json({
        error: 'This time slot was just booked and paid by another customer. Please select another slot.',
        code: 'SLOT_TAKEN',
      });
    }

    // Use the discounted amount if explicitly passed from frontend (coupon applied),
    // otherwise fall back to whatever is stored in the booking record.
    const amountPaise = (requestedAmount !== undefined && requestedAmount !== null && !isNaN(requestedAmount))
      ? parseInt(requestedAmount, 10)
      : booking.amount;

    // Update booking amount in DB so booking record reflects final paid fee
    if (amountPaise !== booking.amount) {
      await db.query('UPDATE bookings SET amount = ? WHERE id = ?', [amountPaise, booking.id]);
    }

    const order = await razorpay.orders.create({
      amount: amountPaise,
      currency: booking.currency,
      receipt: booking.booking_reference,
      notes: {
        bookingId: booking.id,
        bookingReference: booking.booking_reference,
        customerName: booking.customer_name,
        customerEmail: booking.customer_email,
      },
    });

    const paymentId = uuidv4();
    await db.query(
      "INSERT INTO payments (id, booking_id, provider, order_id, amount, currency, status) VALUES (?, ?, 'razorpay', ?, ?, ?, 'CREATED')",
      [paymentId, booking.id, order.id, amountPaise, booking.currency]
    );

    return res.status(200).json({
      orderId: order.id,
      amount: amountPaise,
      currency: booking.currency,
      keyId: process.env.RAZORPAY_KEY_ID,
      bookingReference: booking.booking_reference,
      prefill: {
        name: booking.customer_name,
        email: booking.customer_email,
        contact: booking.customer_phone,
      },
    });
  } catch (err) {
    console.error('MySQL Create order error:', err);
    return res.status(500).json({ error: 'Failed to create payment order.' });
  }
}
