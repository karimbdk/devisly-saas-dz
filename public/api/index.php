<?php
require_once __DIR__ . '/config.php';

$action = isset($_GET['action']) ? $_GET['action'] : '';
$method = $_SERVER['REQUEST_METHOD'];

// قراءة بيانات JSON الواردة في طلبات POST/PUT
$inputData = json_decode(file_get_contents('php://input'), true);

switch ($action) {
    
    // 1. جلب أو حفظ عروض الأسعار (Devis)
    case 'devis':
        if ($method === 'GET') {
            $stmt = $pdo->query("SELECT * FROM devis ORDER BY id DESC");
            $devisList = $stmt->fetchAll();
            
            // جلب بنود كل عرض
            foreach ($devisList as &$d) {
                $itemStmt = $pdo->prepare("SELECT * FROM devis_items WHERE devis_id = ?");
                $itemStmt->execute([$d['id']]);
                $d['items'] = $itemStmt->fetchAll();
            }
            
            echo json_encode(['success' => true, 'data' => $devisList], JSON_UNESCAPED_UNICODE);
        } elseif ($method === 'POST') {
            $uuid = isset($inputData['id']) ? $inputData['id'] : 'q-' . time();
            $stmt = $pdo->prepare("
                INSERT INTO devis (devis_uuid, number, client_name, client_phone, client_address, date, expiry_date, status, subtotal, discount_value, total, deposit_required, payment_terms, notes)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ");
            $stmt->execute([
                $uuid,
                $inputData['number'],
                $inputData['clientName'],
                $inputData['clientPhone'] ?? '',
                $inputData['clientAddress'] ?? '',
                $inputData['date'] ?? date('Y-m-d'),
                $inputData['expiryDate'] ?? date('Y-m-d', strtotime('+15 days')),
                $inputData['status'] ?? 'مسودة',
                $inputData['subtotal'] ?? 0,
                $inputData['discountValue'] ?? 0,
                $inputData['total'] ?? 0,
                $inputData['depositRequired'] ?? 0,
                $inputData['paymentTerms'] ?? '',
                $inputData['notes'] ?? ''
            ]);
            $devisId = $pdo->lastInsertId();

            // حفظ البنود
            if (!empty($inputData['items']) && is_array($inputData['items'])) {
                $itemStmt = $pdo->prepare("INSERT INTO devis_items (devis_id, name, unit, quantity, price, total) VALUES (?, ?, ?, ?, ?, ?)");
                foreach ($inputData['items'] as $item) {
                    $itemStmt->execute([
                        $devisId,
                        $item['name'],
                        $item['unit'] ?? 'م²',
                        $item['quantity'] ?? 1,
                        $item['price'] ?? 0,
                        $item['total'] ?? 0
                    ]);
                }
            }

            echo json_encode(['success' => true, 'message' => 'تم حفظ عرض السعر بنجاح', 'id' => $devisId], JSON_UNESCAPED_UNICODE);
        }
        break;

    // 2. العملاء (Clients)
    case 'clients':
        if ($method === 'GET') {
            $stmt = $pdo->query("SELECT * FROM clients ORDER BY id DESC");
            echo json_encode(['success' => true, 'data' => $stmt->fetchAll()], JSON_UNESCAPED_UNICODE);
        } elseif ($method === 'POST') {
            $uuid = isset($inputData['id']) ? $inputData['id'] : 'cli-' . time();
            $stmt = $pdo->prepare("INSERT INTO clients (client_uuid, name, contact_person, phone, email, address, wilaya) VALUES (?, ?, ?, ?, ?, ?, ?)");
            $stmt->execute([
                $uuid,
                $inputData['name'],
                $inputData['contactPerson'] ?? '',
                $inputData['phone'] ?? '',
                $inputData['email'] ?? '',
                $inputData['address'] ?? '',
                $inputData['wilaya'] ?? 'الجزائر'
            ]);
            echo json_encode(['success' => true, 'message' => 'تمت إضافة العميل بنجاح'], JSON_UNESCAPED_UNICODE);
        }
        break;

    // 3. الدفعات وسندات القبض (Payments & Receipts)
    case 'payments':
        if ($method === 'GET') {
            $stmt = $pdo->query("SELECT * FROM payments ORDER BY id DESC");
            echo json_encode(['success' => true, 'data' => $stmt->fetchAll()], JSON_UNESCAPED_UNICODE);
        } elseif ($method === 'POST') {
            $stmt = $pdo->prepare("
                INSERT INTO payments (receipt_number, invoice_number, client_name, date, amount, method, reference, note, amount_in_words)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
            ");
            $stmt->execute([
                $inputData['receiptNumber'],
                $inputData['invoiceNumber'] ?? 'فاتورة عامة',
                $inputData['clientName'],
                $inputData['date'] ?? date('Y-m-d'),
                $inputData['amount'],
                $inputData['method'],
                $inputData['reference'] ?? '',
                $inputData['note'] ?? '',
                $inputData['amountInWords'] ?? ''
            ]);
            echo json_encode(['success' => true, 'message' => 'تم تسجيل الدفعة وإصدار السند بنجاح'], JSON_UNESCAPED_UNICODE);
        }
        break;

    // 4. الفحص وحالة الخادم (Health Check)
    case 'status':
    default:
        echo json_encode([
            'success' => true,
            'message' => 'خادم Devisly SaaS وواجهة Hostinger API تعمل بنجاح!',
            'version' => '1.2',
            'server_time' => date('Y-m-d H:i:s')
        ], JSON_UNESCAPED_UNICODE);
        break;
}
