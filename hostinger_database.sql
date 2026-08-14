-- ==========================================================
-- Devisly SaaS — Hostinger MySQL Database Schema (v1.2)
-- قاعدة بيانات منصة Devisly المعتمدة لهوستينغر و phpMyAdmin
-- ==========================================================

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- 1. جدول المستخدمين والمؤسسات (Users & Companies)
CREATE TABLE IF NOT EXISTS `users` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `user_uuid` VARCHAR(64) NOT NULL UNIQUE,
  `name` VARCHAR(150) NOT NULL,
  `business_name` VARCHAR(255) NOT NULL,
  `phone` VARCHAR(50) NOT NULL,
  `email` VARCHAR(150) NOT NULL UNIQUE,
  `address` TEXT,
  `nif` VARCHAR(50) DEFAULT NULL,
  `rc` VARCHAR(50) DEFAULT NULL,
  `currency` VARCHAR(10) DEFAULT 'دج',
  `plan` ENUM('Free', 'Pro', 'Business') DEFAULT 'Free',
  `plan_expires_at` DATETIME DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. جدول العملاء (Clients CRM)
CREATE TABLE IF NOT EXISTS `clients` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `client_uuid` VARCHAR(64) NOT NULL UNIQUE,
  `user_id` INT DEFAULT 1,
  `name` VARCHAR(255) NOT NULL,
  `contact_person` VARCHAR(150) DEFAULT NULL,
  `phone` VARCHAR(50) NOT NULL,
  `email` VARCHAR(150) DEFAULT NULL,
  `address` TEXT,
  `wilaya` VARCHAR(100) DEFAULT 'الجزائر',
  `total_deals` INT DEFAULT 0,
  `total_spent` DECIMAL(15,2) DEFAULT 0.00,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. جدول دليل الخدمات والأسعار (Services Catalog)
CREATE TABLE IF NOT EXISTS `services` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `service_uuid` VARCHAR(64) NOT NULL UNIQUE,
  `user_id` INT DEFAULT 1,
  `name` VARCHAR(255) NOT NULL,
  `unit` VARCHAR(50) DEFAULT 'م²',
  `price` DECIMAL(15,2) NOT NULL DEFAULT 0.00,
  `category` VARCHAR(100) DEFAULT 'عام',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. جدول عروض الأسعار (Quotations / Devis)
CREATE TABLE IF NOT EXISTS `devis` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `devis_uuid` VARCHAR(64) NOT NULL UNIQUE,
  `user_id` INT DEFAULT 1,
  `number` VARCHAR(50) NOT NULL,
  `client_id` INT DEFAULT NULL,
  `client_name` VARCHAR(255) NOT NULL,
  `client_phone` VARCHAR(50) DEFAULT NULL,
  `client_address` TEXT,
  `date` DATE NOT NULL,
  `expiry_date` DATE NOT NULL,
  `status` ENUM('مسودة', 'تمت المشاهدة', 'بانتظار الرد', 'مقبول', 'تعديل مطلوب', 'ملغى') DEFAULT 'مسودة',
  `subtotal` DECIMAL(15,2) NOT NULL DEFAULT 0.00,
  `discount_type` ENUM('fixed', 'percentage') DEFAULT 'fixed',
  `discount_value` DECIMAL(15,2) DEFAULT 0.00,
  `tax_rate` DECIMAL(5,2) DEFAULT 0.00,
  `tax_amount` DECIMAL(15,2) DEFAULT 0.00,
  `total` DECIMAL(15,2) NOT NULL DEFAULT 0.00,
  `deposit_required` DECIMAL(15,2) DEFAULT 0.00,
  `payment_terms` TEXT,
  `notes` TEXT,
  `client_feedback` TEXT DEFAULT NULL,
  `view_count` INT DEFAULT 0,
  `last_viewed_at` DATETIME DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 5. جدول بنود عروض الأسعار (Devis Items)
CREATE TABLE IF NOT EXISTS `devis_items` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `devis_id` INT NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `unit` VARCHAR(50) DEFAULT 'م²',
  `quantity` DECIMAL(10,2) NOT NULL DEFAULT 1.00,
  `price` DECIMAL(15,2) NOT NULL DEFAULT 0.00,
  `total` DECIMAL(15,2) NOT NULL DEFAULT 0.00,
  FOREIGN KEY (`devis_id`) REFERENCES `devis`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 6. جدول الفواتير (Invoices)
CREATE TABLE IF NOT EXISTS `invoices` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `invoice_uuid` VARCHAR(64) NOT NULL UNIQUE,
  `user_id` INT DEFAULT 1,
  `devis_id` INT DEFAULT NULL,
  `number` VARCHAR(50) NOT NULL,
  `client_name` VARCHAR(255) NOT NULL,
  `date` DATE NOT NULL,
  `due_date` DATE NOT NULL,
  `total` DECIMAL(15,2) NOT NULL DEFAULT 0.00,
  `paid_amount` DECIMAL(15,2) DEFAULT 0.00,
  `due_amount` DECIMAL(15,2) DEFAULT 0.00,
  `status` ENUM('غير مدفوع', 'مدفوع جزئياً', 'مدفوع بالكامل', 'متأخر') DEFAULT 'غير مدفوع',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 7. جدول الدفعات وسندات القبض (Payments & Receipts)
CREATE TABLE IF NOT EXISTS `payments` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `receipt_number` VARCHAR(50) NOT NULL UNIQUE,
  `invoice_id` INT DEFAULT NULL,
  `invoice_number` VARCHAR(50) DEFAULT NULL,
  `client_name` VARCHAR(255) NOT NULL,
  `date` DATE NOT NULL,
  `amount` DECIMAL(15,2) NOT NULL,
  `method` VARCHAR(100) NOT NULL,
  `reference` VARCHAR(100) DEFAULT NULL,
  `note` TEXT,
  `amount_in_words` VARCHAR(255) DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 8. جدول طلبات اشتراك المنصة (Subscription Payment Requests)
CREATE TABLE IF NOT EXISTS `payment_requests` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `request_number` VARCHAR(50) NOT NULL UNIQUE,
  `user_id` INT DEFAULT 1,
  `user_name` VARCHAR(150) NOT NULL,
  `user_phone` VARCHAR(50) NOT NULL,
  `plan_name` ENUM('Free', 'Pro', 'Business') NOT NULL,
  `billing_cycle` VARCHAR(50) DEFAULT 'شهري',
  `amount` DECIMAL(15,2) NOT NULL,
  `payment_method` VARCHAR(100) NOT NULL,
  `reference` VARCHAR(100) DEFAULT NULL,
  `slip_image_url` TEXT DEFAULT NULL,
  `status` ENUM('بانتظار المراجعة', 'مفعل', 'مرفوض', 'بانتظار معلومات') DEFAULT 'بانتظار المراجعة',
  `reject_reason` TEXT DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ==========================================================
-- بيانات نموذجية للبدء المباشر (Initial Starter Data)
-- ==========================================================

INSERT INTO `users` (`id`, `user_uuid`, `name`, `business_name`, `phone`, `email`, `address`, `currency`, `plan`)
VALUES (1, 'usr-default', 'كريم بن سالم', 'مؤسسة الأفق للخدمات العامة والتشطيب', '+213 555 12 34 56', 'contact@alofok-services.dz', 'حي 05 جويلية، باب الزوار، الجزائر العاصمة', 'دج', 'Pro');

INSERT INTO `clients` (`client_uuid`, `user_id`, `name`, `contact_person`, `phone`, `email`, `address`, `wilaya`, `total_deals`, `total_spent`)
VALUES
('cli-1', 1, 'مؤسسة البناء الحديث', 'السيد أحمد لعريبي', '+213 661 23 45 67', 'contact@el-binaa.dz', 'حي 05 جويلية، الجزائر العاصمة', 'الجزائر', 3, 435000.00),
('cli-2', 1, 'أعمال الري السقي الزراعي', 'عبد القادر بن عيسى', '+213 550 98 76 54', 'irrigation.dz@gmail.com', 'المنطقة الصناعية، أولاد يعيش، البليدة', 'البليدة', 2, 170000.00),
('cli-3', 1, 'مؤسسة النور للكهرباء والتجهيز', 'سمير قادري', '+213 770 11 22 33', 'nour.electrique@gmail.com', 'حي الصديقية، وهران', 'وهران', 4, 520000.00),
('cli-4', 1, 'ورشة الحدادة المتقنة', 'فاتح بوخالفة', '+213 658 44 33 22', 'hadada.setif@gmail.com', 'طريق باتنة، سطيف', 'سطيف', 1, 42500.00),
('cli-5', 1, 'شركة الأمل للترميم والتجديد', 'مهدي عثماني', '+213 560 77 88 99', 'amal.renov@gmail.com', 'علي منجلي، قسنطينة', 'قسنطينة', 3, 620000.00);

INSERT INTO `services` (`service_uuid`, `user_id`, `name`, `unit`, `price`, `category`)
VALUES
('srv-1', 1, 'تركيب السيراميك والبورسلان', 'م²', 1200.00, 'تشطيب'),
('srv-2', 1, 'دهان داخلي فينيل فاخر', 'م²', 1000.00, 'دهان'),
('srv-3', 1, 'تمديدات كهربائية عامة وإنارة', 'نقطة', 2500.00, 'كهرباء'),
('srv-4', 1, 'تركيب كاميرات مراقبة IP فائقة الدقة', 'كاميرا', 6500.00, 'حماية وشبكات'),
('srv-5', 1, 'تركيب أسقف جبس بورد BA13 مع إنارة مخفية', 'م²', 1800.00, 'ديكور'),
('srv-6', 1, 'أعمال السباكة وتصريف المياه', 'خدمة', 15000.00, 'سباكة');

SET FOREIGN_KEY_CHECKS = 1;
