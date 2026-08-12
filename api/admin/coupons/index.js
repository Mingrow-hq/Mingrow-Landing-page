import db from '../../lib/db.js';
import { randomUUID } from 'crypto';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const STORE_PATH = path.join(__dirname, '../../../database/coupons_store.json');

// Persistent JSON file fallback helper
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

function saveFileCoupons(coupons) {
  try {
    const dir = path.dirname(STORE_PATH);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(STORE_PATH, JSON.stringify(coupons, null, 2));
  } catch (err) {
    console.warn('Could not write coupons_store.json:', err.message);
  }
}

let fileCoupons = loadFileCoupons();

async function ensureTable() {
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS coupons (
        id VARCHAR(36) NOT NULL PRIMARY KEY,
        code VARCHAR(50) NOT NULL UNIQUE,
        discount_type ENUM('PERCENTAGE', 'FIXED') NOT NULL DEFAULT 'PERCENTAGE',
        discount_value INT NOT NULL,
        max_uses INT NOT NULL DEFAULT 1,
        used_count INT NOT NULL DEFAULT 0,
        expiry_date DATETIME NOT NULL,
        is_active TINYINT(1) NOT NULL DEFAULT 1,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);
  } catch (err) {
    console.warn('Could not ensure coupons table in MySQL:', err.message);
  }
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-admin-key');

  if (req.method === 'OPTIONS') return res.status(200).end();

  const adminKey = req.headers['x-admin-key'];
  if (!adminKey || adminKey !== process.env.ADMIN_SECRET_KEY) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  await ensureTable();

  if (req.method === 'GET') {
    try {
      const [rows] = await db.query('SELECT * FROM coupons ORDER BY created_at DESC');
      return res.status(200).json({ coupons: rows });
    } catch (err) {
      console.error('MySQL list coupons error, returning persistent file coupons:', err.message);
      return res.status(200).json({ coupons: fileCoupons });
    }
  }

  if (req.method === 'POST') {
    const { code, discount_type, discount_value, max_uses, expiry_date, is_active } = req.body || {};

    if (!code || !discount_value || !expiry_date || !max_uses) {
      return res.status(400).json({ error: 'Missing required fields: code, discount_value, expiry_date, max_uses' });
    }

    const cleanCode = code.trim().toUpperCase();
    const id = randomUUID();
    const discType = discount_type === 'FIXED' ? 'FIXED' : 'PERCENTAGE';
    const discVal = parseInt(discount_value, 10);
    const uses = parseInt(max_uses, 10);
    const active = is_active !== false && is_active !== 0 ? 1 : 0;
    
    let expFormatted = expiry_date;
    if (expiry_date.includes('T')) {
      expFormatted = expiry_date.replace('T', ' ');
      if (expFormatted.length === 16) expFormatted += ':00';
    } else if (expFormatted.length === 10) {
      expFormatted += ' 23:59:59';
    }

    const newCoupon = {
      id,
      code: cleanCode,
      discount_type: discType,
      discount_value: discVal,
      max_uses: uses,
      used_count: 0,
      expiry_date: expFormatted,
      is_active: active,
      created_at: new Date().toISOString().replace('T', ' ').substring(0, 19)
    };

    let dbSaved = false;
    try {
      await db.query(
        `INSERT INTO coupons (id, code, discount_type, discount_value, max_uses, used_count, expiry_date, is_active)
         VALUES (?, ?, ?, ?, ?, 0, ?, ?)`,
        [id, cleanCode, discType, discVal, uses, expFormatted, active]
      );
      dbSaved = true;
    } catch (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(400).json({ error: 'Coupon code already exists' });
      }
      console.warn('MySQL save failed, persisting to coupons_store.json:', err.message);
    }

    // Always update persistent file fallback
    if (fileCoupons.some(c => c.code === cleanCode)) {
      if (!dbSaved) return res.status(400).json({ error: 'Coupon code already exists' });
    } else {
      fileCoupons.unshift(newCoupon);
      saveFileCoupons(fileCoupons);
    }

    return res.status(201).json({ message: 'Coupon created successfully', coupon: newCoupon });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
