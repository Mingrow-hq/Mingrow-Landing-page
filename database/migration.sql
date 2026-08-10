-- ============================================================
-- Mingrow Studio Booking System — Supabase Migration
-- Run this in your Supabase SQL Editor
-- ============================================================

-- Customers table
CREATE TABLE IF NOT EXISTS customers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  company_name TEXT,
  website TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(email)
);

-- Bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  booking_reference TEXT NOT NULL UNIQUE,
  customer_id UUID NOT NULL REFERENCES customers(id) ON DELETE RESTRICT,
  booking_date DATE NOT NULL,
  time_slot TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'PENDING' CHECK (status IN ('PENDING','HELD','PAID','CANCELLED','EXPIRED','REFUNDED')),
  amount INTEGER NOT NULL DEFAULT 250000, -- in paise (₹2500)
  currency TEXT NOT NULL DEFAULT 'INR',
  notes TEXT,
  held_until TIMESTAMPTZ, -- expiry time for temporary hold
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  paid_at TIMESTAMPTZ,
  UNIQUE(booking_date, time_slot, status) -- prevent double booking (partial unique)
);

-- Partial unique index: only one HELD or PAID booking per (date, time_slot)
CREATE UNIQUE INDEX IF NOT EXISTS idx_booking_slot_active
  ON bookings (booking_date, time_slot)
  WHERE status IN ('HELD', 'PAID');

-- Payments table
CREATE TABLE IF NOT EXISTS payments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  booking_id UUID NOT NULL REFERENCES bookings(id) ON DELETE RESTRICT,
  provider TEXT NOT NULL DEFAULT 'razorpay',
  order_id TEXT UNIQUE,
  payment_id TEXT UNIQUE,
  amount INTEGER NOT NULL,
  currency TEXT NOT NULL DEFAULT 'INR',
  status TEXT NOT NULL DEFAULT 'CREATED' CHECK (status IN ('CREATED','PENDING','SUCCESS','FAILED','REFUNDED')),
  payment_method TEXT,
  webhook_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  paid_at TIMESTAMPTZ
);

-- Availability configuration table
CREATE TABLE IF NOT EXISTS availability_config (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  config_key TEXT NOT NULL UNIQUE,
  config_value JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Blocked dates table (admin can block specific dates)
CREATE TABLE IF NOT EXISTS blocked_dates (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  blocked_date DATE NOT NULL UNIQUE,
  reason TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Seed default availability config
INSERT INTO availability_config (config_key, config_value) VALUES
  ('working_days', '[1,2,3,4,5,6]'::jsonb),  -- 0=Sun, 1=Mon...6=Sat
  ('time_slots', '["09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00","21:00"]'::jsonb),
  ('booking_fee_paise', '250000'::jsonb),
  ('max_advance_days', '90'::jsonb),
  ('hold_duration_minutes', '10'::jsonb)
ON CONFLICT (config_key) DO NOTHING;

-- Trigger to auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER bookings_updated_at BEFORE UPDATE ON bookings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER customers_updated_at BEFORE UPDATE ON customers
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Indexes
CREATE INDEX IF NOT EXISTS idx_bookings_date ON bookings (booking_date);
CREATE INDEX IF NOT EXISTS idx_bookings_customer ON bookings (customer_id);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings (status);
CREATE INDEX IF NOT EXISTS idx_payments_booking ON payments (booking_id);
CREATE INDEX IF NOT EXISTS idx_payments_order ON payments (order_id);

-- RLS: Disable for service role access (serverless functions use service key)
ALTER TABLE customers DISABLE ROW LEVEL SECURITY;
ALTER TABLE bookings DISABLE ROW LEVEL SECURITY;
ALTER TABLE payments DISABLE ROW LEVEL SECURITY;
ALTER TABLE availability_config DISABLE ROW LEVEL SECURITY;
ALTER TABLE blocked_dates DISABLE ROW LEVEL SECURITY;
