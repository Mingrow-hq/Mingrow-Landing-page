import db from '../../lib/db.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-admin-key');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const adminKey = req.headers['x-admin-key'];
  if (!adminKey || adminKey !== process.env.ADMIN_SECRET_KEY) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const { search, paymentStatus, bookingStatus, dateFilter, page = 1, limit = 20 } = req.query;
    const offset = (parseInt(page) - 1) * parseInt(limit);

    let whereClause = 'WHERE 1=1';
    const params = [];

    if (bookingStatus && bookingStatus !== 'ALL') {
      whereClause += ' AND b.status = ?';
      params.push(bookingStatus.toUpperCase());
    }

    if (paymentStatus && paymentStatus !== 'ALL') {
      whereClause += ' AND p.status = ?';
      params.push(paymentStatus.toUpperCase());
    }

    if (dateFilter) {
      const now = new Date();
      const todayStr = now.toISOString().split('T')[0];
      if (dateFilter === 'TODAY') {
        whereClause += ' AND b.booking_date = ?';
        params.push(todayStr);
      } else if (dateFilter === 'TOMORROW') {
        const tomorrow = new Date(now);
        tomorrow.setDate(tomorrow.getDate() + 1);
        whereClause += ' AND b.booking_date = ?';
        params.push(tomorrow.toISOString().split('T')[0]);
      } else if (dateFilter === 'UPCOMING') {
        whereClause += ' AND b.booking_date >= ?';
        params.push(todayStr);
      } else if (dateFilter === 'THIS_WEEK') {
        const startOfWeek = new Date(now);
        startOfWeek.setDate(now.getDate() - now.getDay());
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);
        whereClause += ' AND b.booking_date >= ? AND b.booking_date <= ?';
        params.push(startOfWeek.toISOString().split('T')[0], endOfWeek.toISOString().split('T')[0]);
      } else if (dateFilter === 'THIS_MONTH') {
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        whereClause += ' AND b.booking_date LIKE ?';
        params.push(`${year}-${month}-%`);
      }
    }

    if (search) {
      const s = `%${search.trim()}%`;
      whereClause += ' AND (b.booking_reference LIKE ? OR c.name LIKE ? OR c.email LIKE ? OR c.phone LIKE ? OR c.company_name LIKE ?)';
      params.push(s, s, s, s, s);
    }

    const [countRows] = await db.query(
      `SELECT COUNT(DISTINCT b.id) AS total FROM bookings b JOIN customers c ON b.customer_id = c.id LEFT JOIN payments p ON p.booking_id = b.id ${whereClause}`,
      params
    );

    const total = countRows[0].total;

    const [rows] = await db.query(
      `SELECT b.*, c.name AS customer_name, c.email AS customer_email, c.phone AS customer_phone, c.company_name, c.website,
              p.id AS payment_db_id, p.order_id, p.payment_id, p.status AS payment_status, p.payment_method,
              p.amount AS payment_amount, p.currency AS payment_currency, p.provider AS payment_provider, p.webhook_verified AS payment_webhook_verified
       FROM bookings b 
       JOIN customers c ON b.customer_id = c.id 
       LEFT JOIN payments p ON p.booking_id = b.id 
       ${whereClause} 
       ORDER BY b.created_at DESC 
       LIMIT ? OFFSET ?`,
      [...params, parseInt(limit), offset]
    );

    const bookings = rows.map(r => ({
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
      customers: {
        name: r.customer_name,
        email: r.customer_email,
        phone: r.customer_phone,
        company_name: r.company_name,
        website: r.website
      },
      payments: r.payment_db_id ? [{
        id: r.payment_db_id,
        order_id: r.order_id,
        payment_id: r.payment_id,
        status: r.payment_status,
        payment_method: r.payment_method,
        amount: r.payment_amount,
        currency: r.payment_currency,
        provider: r.payment_provider,
        webhook_verified: r.payment_webhook_verified
      }] : []
    }));

    return res.status(200).json({
      bookings,
      total,
      page: parseInt(page),
      limit: parseInt(limit),
      totalPages: Math.ceil(total / parseInt(limit)),
    });
  } catch (err) {
    console.error('MySQL Admin bookings list error:', err);
    return res.status(500).json({ error: 'Failed to fetch bookings' });
  }
}
