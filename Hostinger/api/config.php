<?php
/**
 * Devisly SaaS — Hostinger Database Configuration
 * إعدادات الاتصال المباشر بقاعدة بيانات Hostinger الخاصة بك
 */

header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// معلومات قاعدة البيانات الخاصة بك في Hostinger
define('DB_HOST', 'localhost');
define('DB_NAME', 'u448030187_bdktest4');
define('DB_USER', 'u448030187_bdktest4');
define('DB_PASS', 'Bdktest4');

try {
    $pdo = new PDO(
        "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4",
        DB_USER,
        DB_PASS,
        [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false,
        ]
    );
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'تعذر الاتصال بقاعدة بيانات Hostinger: ' . $e->getMessage()
    ], JSON_UNESCAPED_UNICODE);
    exit();
}
