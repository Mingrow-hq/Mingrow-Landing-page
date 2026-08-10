import crypto from 'crypto';
import db from '../lib/db.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const webhookSignature = req.headers['x-razorpay-signature'];
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;

    if (!webhookSecret) {
      return res.status(500).json({ error: 'Webhook secret not configured' });
    }

    const rawBody = typeof req.body === 'string' ? req.body : JSON.stringify(req.body);
    const expectedSignature = crypto
      .createHmac('sha256', webhookSecret)
      .update(rawBody)
      .digest('hex');

    if (expectedSignature !== webhookSignature) {
      return res.status(400).json({ error: 'Invalid webhook signature' });
    }

    const event = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const eventType = event.event;

    if (eventType === 'payment.captured') {
      const payment = event.payload.payment.entity;
      const orderId = payment.order_id;
      const paymentId = payment.id;

      const [rows] = await db.query('SELECT booking_id, webhook_verified FROM payments WHERE order_id = ?', [orderId]);
      if (rows.length === 0) return res.status(200).json({ received: true });

      if (rows[0].webhook_verified) {
        return res.status(200).json({ received: true, message: 'Already processed' });
      }

      const paidAt = new Date(payment.created_at * 1000);

      await db.query(
        "UPDATE payments SET payment_id = ?, status = 'SUCCESS', payment_method = ?, paid_at = ?, webhook_verified = 1 WHERE order_id = ?",
        [paymentId, payment.method, paidAt, orderId]
      );

      await db.query(
        "UPDATE bookings SET status = 'PAID', paid_at = ?, held_until = NULL WHERE id = ? AND status != 'REFUNDED'",
        [paidAt, rows[0].booking_id]
      );
    } else if (eventType === 'payment.failed') {
      const payment = event.payload.payment.entity;
      await db.query("UPDATE payments SET status = 'FAILED' WHERE order_id = ?", [payment.order_id]);
    }

    return res.status(200).json({ received: true });
  } catch (err) {
    console.error('MySQL Webhook error:', err);
    return res.status(200).json({ received: true, error: 'Internal processing error' });
  }
}
