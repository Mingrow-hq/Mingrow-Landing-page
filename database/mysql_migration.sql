-- ============================================================
-- Mingrow Studio Booking System — MySQL Migration
-- Run this script in your MySQL Database (e.g. phpMyAdmin / MySQL Workbench)
-- ============================================================

CREATE TABLE IF NOT EXISTS `customers` (
  `id` VARCHAR(36) NOT NULL PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL UNIQUE,
  `phone` VARCHAR(50) NOT NULL,
  `company_name` VARCHAR(255) DEFAULT NULL,
  `website` VARCHAR(255) DEFAULT NULL,
  `notes` TEXT DEFAULT NULL,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `bookings` (
  `id` VARCHAR(36) NOT NULL PRIMARY KEY,
  `booking_reference` VARCHAR(100) NOT NULL UNIQUE,
  `customer_id` VARCHAR(36) NOT NULL,
  `booking_date` DATE NOT NULL,
  `time_slot` VARCHAR(20) NOT NULL,
  `status` ENUM('PENDING','HELD','PAID','CANCELLED','EXPIRED','REFUNDED') NOT NULL DEFAULT 'PENDING',
  `amount` INT NOT NULL DEFAULT 250000,
  `currency` VARCHAR(10) NOT NULL DEFAULT 'INR',
  `notes` TEXT DEFAULT NULL,
  `held_until` DATETIME DEFAULT NULL,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `paid_at` DATETIME DEFAULT NULL,
  FOREIGN KEY (`customer_id`) REFERENCES `customers`(`id`) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `payments` (
  `id` VARCHAR(36) NOT NULL PRIMARY KEY,
  `booking_id` VARCHAR(36) NOT NULL,
  `provider` VARCHAR(50) NOT NULL DEFAULT 'razorpay',
  `order_id` VARCHAR(255) UNIQUE DEFAULT NULL,
  `payment_id` VARCHAR(255) UNIQUE DEFAULT NULL,
  `amount` INT NOT NULL,
  `currency` VARCHAR(10) NOT NULL DEFAULT 'INR',
  `status` ENUM('CREATED','PENDING','SUCCESS','FAILED','REFUNDED') NOT NULL DEFAULT 'CREATED',
  `payment_method` VARCHAR(50) DEFAULT NULL,
  `webhook_verified` TINYINT(1) DEFAULT 0,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `paid_at` DATETIME DEFAULT NULL,
  FOREIGN KEY (`booking_id`) REFERENCES `bookings`(`id`) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `availability_config` (
  `id` VARCHAR(36) NOT NULL PRIMARY KEY,
  `config_key` VARCHAR(100) NOT NULL UNIQUE,
  `config_value` JSON NOT NULL,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `blocked_dates` (
  `id` VARCHAR(36) NOT NULL PRIMARY KEY,
  `blocked_date` DATE NOT NULL UNIQUE,
  `reason` VARCHAR(255) DEFAULT NULL,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `coupons` (
  `id` VARCHAR(36) NOT NULL PRIMARY KEY,
  `code` VARCHAR(50) NOT NULL UNIQUE,
  `discount_type` ENUM('PERCENTAGE', 'FIXED') NOT NULL DEFAULT 'PERCENTAGE',
  `discount_value` INT NOT NULL,
  `max_uses` INT NOT NULL DEFAULT 1,
  `used_count` INT NOT NULL DEFAULT 0,
  `expiry_date` DATETIME NOT NULL,
  `is_active` TINYINT(1) NOT NULL DEFAULT 1,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Seed default configuration
INSERT INTO `availability_config` (`id`, `config_key`, `config_value`) VALUES
  (UUID(), 'working_days', '[1,2,3,4,5,6]'),
  (UUID(), 'time_slots', '["09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00","21:00"]'),
  (UUID(), 'booking_fee_paise', '250000'),
  (UUID(), 'max_advance_days', '90'),
  (UUID(), 'hold_duration_minutes', '10')
ON DUPLICATE KEY UPDATE `updated_at` = NOW();
