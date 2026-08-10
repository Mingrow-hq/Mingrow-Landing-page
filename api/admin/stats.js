import db from '../lib/db.js';

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
    const todayStr = new Date().toISOString().split('T')[0];
    const monthStart = new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0];

    const [[{ totalBookings }]] = await db.query("SELECT COUNT(*) AS totalBookings FROM bookings");
    const [[{ paidBookings }]] = await db.query("SELECT COUNT(*) AS paidBookings FROM bookings WHERE status = 'PAID'");
    const [[{ pendingBookings }]] = await db.query("SELECT COUNT(*) AS pendingBookings FROM bookings WHERE status IN ('PENDING', 'HELD')");
    const [[{ cancelledBookings }]] = await db.query("SELECT COUNT(*) AS cancelledBookings FROM bookings WHERE status IN ('CANCELLED', 'EXPIRED', 'REFUNDED')");
    const [[{ totalRevenue }]] = await db.query("SELECT COALESCE(SUM(amount), 0) AS totalRevenue FROM bookings WHERE status = 'PAID'");
    const [[{ todayBookings }]] = await db.query("SELECT COUNT(*) AS todayBookings FROM bookings WHERE booking_date = ?", [todayStr]);
    const [[{ todayRevenue }]] = await db.query("SELECT COALESCE(SUM(amount), 0) AS todayRevenue FROM bookings WHERE status = 'PAID' AND booking_date = ?", [todayStr]);
    const [[{ monthRevenue }]] = await db.query("SELECT COALESCE(SUM(amount), 0) AS monthRevenue FROM bookings WHERE status = 'PAID' AND booking_date >= ?", [monthStart]);
    const [[{ upcomingDemos }]] = await db.query("SELECT COUNT(*) AS upcomingDemos FROM bookings WHERE status = 'PAID' AND booking_date >= ?", [todayStr]);

    return res.status(200).json({
      totalBookings,
      paidBookings,
      pendingBookings,
      cancelledBookings,
      totalRevenue: Math.floor(totalRevenue / 100),
      todayBookings,
      todayRevenue: Math.floor(todayRevenue / 100),
      monthRevenue: Math.floor(monthRevenue / 100),
      upcomingDemos,
    });
  } catch (err) {
    console.error('MySQL Admin stats error:', err);
    return res.status(500).json({ error: 'Failed to fetch stats' });
  }
}
