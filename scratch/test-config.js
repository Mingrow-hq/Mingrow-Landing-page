import dotenv from 'dotenv';
import mysql from 'mysql2/promise';
import Razorpay from 'razorpay';

dotenv.config();

console.log('====================================================');
console.log('   MINGROW CONFIGURATION HEALTH CHECK');
console.log('====================================================\n');

async function testDatabase() {
  console.log('1. Testing MySQL Database Connection...');
  try {
    const pool = mysql.createPool({
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '3306'),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      connectTimeout: 5000,
      ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false
    });

    const [rows] = await pool.query('SELECT 1 + 1 AS solution');
    console.log('   ✅ MySQL DB Connection SUCCESSFUL! Result:', rows[0].solution);
    await pool.end();
    return true;
  } catch (err) {
    console.log('   ❌ MySQL DB Connection FAILED:', err.message);
    return false;
  }
}

async function testRazorpay() {
  console.log('\n2. Testing Razorpay API Credentials...');
  try {
    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keyId || !keySecret) {
      console.log('   ❌ RAZORPAY_KEY_ID or RAZORPAY_KEY_SECRET is missing in .env');
      return false;
    }

    const rzp = new Razorpay({ key_id: keyId, key_secret: keySecret });
    // Test creating a small test order
    const order = await rzp.orders.create({
      amount: 100, // 1 INR
      currency: 'INR',
      receipt: `test_cfg_${Date.now()}`
    });
    console.log('   ✅ Razorpay API Credentials SUCCESSFUL! Created Test Order ID:', order.id);
    return true;
  } catch (err) {
    console.log('   ❌ Razorpay API Check FAILED:', err.message || err);
    return false;
  }
}

function testAdminKey() {
  console.log('\n3. Testing Admin Portal Secret Key...');
  const key = process.env.ADMIN_SECRET_KEY;
  if (!key) {
    console.log('   ❌ ADMIN_SECRET_KEY is missing in .env');
    return false;
  }
  console.log('   ✅ ADMIN_SECRET_KEY is configured:', key ? `${key.substring(0, 4)}***` : 'MISSING');
  return true;
}

async function main() {
  const dbOk = await testDatabase();
  const rzpOk = await testRazorpay();
  const adminOk = testAdminKey();

  console.log('\n====================================================');
  if (dbOk && rzpOk && adminOk) {
    console.log('🎉 ALL CONFIGURATIONS ARE CORRECT & FULLY WORKING!');
  } else {
    console.log('⚠️  SOME CONFIGURATIONS REQUIRED ATTENTION ABOVE.');
  }
  console.log('====================================================');
}

main();
