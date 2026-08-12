import db from '../../lib/db.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const STORE_PATH = path.join(__dirname, '../../../database/coupons_store.json');

function loadFileCoupons() {
  try {
    if (fs.existsSync(STORE_PATH)) {
      const raw = fs.readFileSync(STORE_PATH, 'utf-8');
      return JSON.parse(raw) || [];
    }
  } catch (err) {
    console.warn('Could not read coupons_store.json:', err.message);
  }
  return [];
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
    const { code } = req.body || {};

    if (!code || typeof code !== 'string') {
      return res.status(400).json({ error: 'Coupon code is required' });
    }

    const cleanCode = code.trim().toUpperCase();

    // 1. Try MySQL Database query first
    let coupon = null;
    try {
      const [rows] = await db.query(
        'SELECT * FROM coupons WHERE UPPER(code) = ?',
        [cleanCode]
      );
      if (rows && rows.length > 0) {
        coupon = rows[0];
      }
    } catch (err) {
      console.warn('MySQL verify coupon lookup error, checking local store fallback:', err.message);
    }

    // 2. Fallback to coupons_store.json if not found in DB or DB error
    if (!coupon) {
      const fileCoupons = loadFileCoupons();
      coupon = fileCoupons.find(c => c.code.toUpperCase() === cleanCode);
    }

    if (!coupon) {
      return res.status(404).json({ error: 'Invalid coupon code' });
    }

    // Check if active
    const isActive = coupon.is_active === 1 || coupon.is_active === true;
    if (!isActive) {
      return res.status(400).json({ error: 'This coupon is no longer active' });
    }

    // Check expiry
    if (coupon.expiry_date) {
      const expiry = new Date(coupon.expiry_date);
      if (!isNaN(expiry.getTime()) && expiry < new Date()) {
        return res.status(400).json({ error: 'This coupon has expired' });
      }
    }

    // Check usage limits
    if (coupon.max_uses !== undefined && coupon.max_uses !== null) {
      const maxUses = parseInt(coupon.max_uses, 10);
      const usedCount = parseInt(coupon.used_count || 0, 10);
      if (maxUses > 0 && usedCount >= maxUses) {
        return res.status(400).json({ error: 'Coupon usage limit has been reached' });
      }
    }

    // Valid coupon! Return coupon discount info
    return res.status(200).json({
      valid: true,
      coupon: {
        id: coupon.id,
        code: coupon.code,
        discount_type: coupon.discount_type,
        discount_value: parseInt(coupon.discount_value, 10),
      }
    });

  } catch (err) {
    console.error('Verify coupon endpoint error:', err);
    return res.status(500).json({ error: 'Failed to verify coupon code' });
  }
}
