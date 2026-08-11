import crypto from 'crypto';
import db from '../lib/db.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { razorpayOrderId, razorpayPaymentId, razorpaySignature, bookingId } = req.body;

    if (!razorpayOrderId || !razorpayPaymentId || !razorpaySignature || !bookingId) {
      return res.status(400).json({ error: 'Missing payment verification fields' });
    }

    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpayOrderId}|${razorpayPaymentId}`)
      .digest('hex');

    if (expectedSignature !== razorpaySignature) {
      await db.query("UPDATE payments SET status = 'FAILED' WHERE order_id = ?", [razorpayOrderId]);
      return res.status(400).json({ error: 'Payment verification failed. Invalid signature.' });
    }

    const [rows] = await db.query(
      `SELECT b.*, c.name AS customer_name, c.email AS customer_email 
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
      return res.status(200).json({
        success: true,
        bookingReference: booking.booking_reference,
        message: 'Booking already confirmed',
      });
    }

    // Double-check no other booking was marked PAID for this date & slot
    const [alreadyPaid] = await db.query(
      "SELECT id FROM bookings WHERE booking_date = ? AND time_slot = ? AND status = 'PAID' AND id != ?",
      [booking.booking_date, booking.time_slot, bookingId]
    );

    if (alreadyPaid.length > 0) {
      return res.status(409).json({
        error: 'This slot was already booked and paid by another customer. Please contact support if payment was deducted.',
        code: 'SLOT_TAKEN'
      });
    }

    const paidAt = new Date();

    await db.query(
      "UPDATE payments SET payment_id = ?, status = 'SUCCESS', paid_at = ? WHERE order_id = ?",
      [razorpayPaymentId, paidAt, razorpayOrderId]
    );

    await db.query(
      "UPDATE bookings SET status = 'PAID', paid_at = ?, held_until = NULL WHERE id = ?",
      [paidAt, bookingId]
    );

    return res.status(200).json({
      success: true,
      bookingReference: booking.booking_reference,
      bookingDate: booking.booking_date,
      timeSlot: booking.time_slot,
      amount: booking.amount,
      currency: booking.currency,
      customerName: booking.customer_name,
      customerEmail: booking.customer_email,
      paidAt: paidAt.toISOString(),
    });
  } catch (err) {
    console.error('MySQL Payment verify error:', err);
    return res.status(500).json({ error: 'Payment verification failed.' });
  }
}
