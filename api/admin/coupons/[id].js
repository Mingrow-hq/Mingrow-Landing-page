import db from '../../lib/db.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-admin-key');

  if (req.method === 'OPTIONS') return res.status(200).end();

  const adminKey = req.headers['x-admin-key'];
  if (!adminKey || adminKey !== process.env.ADMIN_SECRET_KEY) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { id } = req.query;
  if (!id) {
    return res.status(400).json({ error: 'Missing coupon ID' });
  }

  if (req.method === 'PATCH') {
    const { is_active, max_uses, expiry_date, discount_value, discount_type } = req.body || {};

    try {
      const updates = [];
      const params = [];

      if (is_active !== undefined) {
        updates.push('is_active = ?');
        params.push(is_active ? 1 : 0);
      }
      if (max_uses !== undefined) {
        updates.push('max_uses = ?');
        params.push(parseInt(max_uses, 10));
      }
      if (expiry_date) {
        let expFormatted = expiry_date;
        if (expiry_date.includes('T')) {
          expFormatted = expiry_date.replace('T', ' ');
          if (expFormatted.length === 16) expFormatted += ':00';
        }
        updates.push('expiry_date = ?');
        params.push(expFormatted);
      }
      if (discount_value !== undefined) {
        updates.push('discount_value = ?');
        params.push(parseInt(discount_value, 10));
      }
      if (discount_type) {
        updates.push('discount_type = ?');
        params.push(discount_type === 'FIXED' ? 'FIXED' : 'PERCENTAGE');
      }

      if (updates.length === 0) {
        return res.status(400).json({ error: 'No fields to update' });
      }

      params.push(id);
      await db.query(`UPDATE coupons SET ${updates.join(', ')} WHERE id = ?`, params);
      return res.status(200).json({ message: 'Coupon updated successfully' });
    } catch (err) {
      console.error('MySQL coupon patch error:', err);
      return res.status(500).json({ error: 'Failed to update coupon' });
    }
  }

  if (req.method === 'DELETE') {
    try {
      await db.query('DELETE FROM coupons WHERE id = ?', [id]);
      return res.status(200).json({ message: 'Coupon deleted successfully' });
    } catch (err) {
      console.error('MySQL coupon delete error:', err);
      return res.status(500).json({ error: 'Failed to delete coupon' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
