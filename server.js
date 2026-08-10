// MUST be the first import: ESM hoists and evaluates all imports before any
// statement body, so the route modules below (which read process.env at module
// scope, e.g. new Razorpay({ key_id })) would otherwise see an empty env.
import 'dotenv/config';

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

import bookingsHandler from './api/bookings/index.js';
import availabilityHandler from './api/bookings/availability.js';
import createOrderHandler from './api/payments/create-order.js';
import verifyHandler from './api/payments/verify.js';
import webhookHandler from './api/payments/webhook.js';
import adminBookingsHandler from './api/admin/bookings/index.js';
import adminBookingByIdHandler from './api/admin/bookings/[id].js';
import adminStatsHandler from './api/admin/stats.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Raw body for Razorpay webhook verification MUST come before express.json()
app.use('/api/payments/webhook', express.raw({ type: 'application/json' }));

// JSON parser for everything else
app.use(express.json());

// CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-admin-key');
  if (req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});

// -- Booking Routes --------------------------------------------
app.all('/api/bookings/availability', (req, res) => availabilityHandler(req, res));
app.all('/api/bookings', (req, res) => bookingsHandler(req, res));

// -- Payment Routes --------------------------------------------
app.all('/api/payments/create-order', (req, res) => createOrderHandler(req, res));
app.all('/api/payments/verify', (req, res) => verifyHandler(req, res));
app.all('/api/payments/webhook', (req, res) => webhookHandler(req, res));

// -- Admin Routes ----------------------------------------------
app.all('/api/admin/bookings', (req, res) => adminBookingsHandler(req, res));
app.all('/api/admin/bookings/:id', (req, res) => {
  req.query.id = req.params.id;
  adminBookingByIdHandler(req, res);
});
app.all('/api/admin/stats', (req, res) => adminStatsHandler(req, res));

// -- Serve React Frontend --------------------------------------
app.use(express.static(path.join(__dirname, 'dist')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log('Mingrow Studio server running on port ' + PORT);
});
