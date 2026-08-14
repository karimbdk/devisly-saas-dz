import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const OUTPUT_DIR = "d:\\Karim_Project\\Source_code\\Antigravity\\Test 4";
const IMAGES_DIR = path.join(OUTPUT_DIR, "guide_assets");

if (!fs.existsSync(IMAGES_DIR)) {
  fs.mkdirSync(IMAGES_DIR, { recursive: true });
}

async function captureAndGeneratePdf() {
  console.log("🚀 Starting browser to capture screenshots and generate updated PDF guide v1.2...");

  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: "new",
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1600,1000']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });

  // 1. Dashboard
  console.log("📸 Capturing Dashboard...");
  await page.goto("http://localhost:3000/", { waitUntil: "networkidle0" });
  await new Promise(r => setTimeout(r, 1000));
  const shotDashboard = path.join(IMAGES_DIR, "dashboard.png");
  await page.screenshot({ path: shotDashboard });

  // 2. Devis Builder Modal
  console.log("📸 Capturing Devis Builder Modal...");
  await page.evaluate(() => {
    const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('إنشاء عرض سعر'));
    if (btn) btn.click();
  });
  await new Promise(r => setTimeout(r, 600));
  const shotBuilder = path.join(IMAGES_DIR, "devis_builder.png");
  await page.screenshot({ path: shotBuilder });
  await page.keyboard.press('Escape');
  await new Promise(r => setTimeout(r, 400));

  // 3. Print Center Modal (New v1.2)
  console.log("📸 Capturing Print Center Modal...");
  await page.evaluate(() => {
    const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('مركز الطباعة'));
    if (btn) btn.click();
  });
  await new Promise(r => setTimeout(r, 600));
  const shotPrintCenter = path.join(IMAGES_DIR, "print_center.png");
  await page.screenshot({ path: shotPrintCenter });
  await page.keyboard.press('Escape');
  await new Promise(r => setTimeout(r, 400));

  // 4. Admin Payment Requests (New v1.2)
  console.log("📸 Capturing Admin Payment Requests...");
  await page.evaluate(() => {
    const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('الإدارة والمبيعات') || b.textContent.includes('الإدارة'));
    if (btn) btn.click();
  });
  await new Promise(r => setTimeout(r, 600));
  const shotAdmin = path.join(IMAGES_DIR, "admin_requests.png");
  await page.screenshot({ path: shotAdmin });
  await new Promise(r => setTimeout(r, 400));

  // 5. Payments View
  console.log("📸 Capturing Payments View...");
  await page.evaluate(() => {
    const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('الدفعات'));
    if (btn) btn.click();
  });
  await new Promise(r => setTimeout(r, 600));
  const shotPayments = path.join(IMAGES_DIR, "payments_list.png");
  await page.screenshot({ path: shotPayments });

  // 6. Payment Receipt Modal
  console.log("📸 Capturing Payment Receipt Modal...");
  await page.evaluate(() => {
    const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('معاينة وطباعة'));
    if (btn) btn.click();
  });
  await new Promise(r => setTimeout(r, 600));
  const shotReceipt = path.join(IMAGES_DIR, "payment_receipt.png");
  await page.screenshot({ path: shotReceipt });
  await page.keyboard.press('Escape');
  await new Promise(r => setTimeout(r, 400));

  // 7. Upgrade Subscription Modal
  console.log("📸 Capturing Upgrade & Payment Gateways Modal...");
  await page.evaluate(() => {
    const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('بوابات الدفع') || b.textContent.includes('ترقية'));
    if (btn) btn.click();
  });
  await new Promise(r => setTimeout(r, 600));
  const shotUpgrade = path.join(IMAGES_DIR, "upgrade_subscription.png");
  await page.screenshot({ path: shotUpgrade });
  await page.keyboard.press('Escape');
  await new Promise(r => setTimeout(r, 400));

  const toBase64 = (filePath) => `data:image/png;base64,${fs.readFileSync(filePath).toString('base64')}`;

  const b64Dashboard = toBase64(shotDashboard);
  const b64Builder = toBase64(shotBuilder);
  const b64PrintCenter = toBase64(shotPrintCenter);
  const b64Admin = toBase64(shotAdmin);
  const b64Payments = toBase64(shotPayments);
  const b64Receipt = toBase64(shotReceipt);
  const b64Upgrade = toBase64(shotUpgrade);

  const htmlContent = `
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <title>دليل الاستخدام والتشغيل الشامل — منصة Devisly SaaS v1.2</title>
  <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;600;700;800;900&display=swap" rel="stylesheet">
  <style>
    @page {
      size: A4;
      margin: 15mm 15mm 20mm 15mm;
      @bottom-right {
        content: "صفحة " counter(page);
        font-family: 'Cairo', sans-serif;
        font-size: 9pt;
        color: #94a3b8;
      }
      @bottom-left {
        content: "Devisly DZ v1.2 — الدليل التشغيلي المعتمد";
        font-family: 'Cairo', sans-serif;
        font-size: 9pt;
        color: #94a3b8;
      }
    }
    
    body {
      font-family: 'Cairo', sans-serif;
      margin: 0;
      padding: 0;
      color: #1e293b;
      background: #ffffff;
      line-height: 1.6;
      font-size: 11pt;
    }
    
    .page-break {
      page-break-before: always;
    }
    
    .cover-page {
      min-height: 245mm;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 10px 0;
    }
    
    .brand-badge {
      display: inline-block;
      background: #eff6ff;
      color: #2563eb;
      border: 1px solid #bfdbfe;
      padding: 4px 14px;
      border-radius: 20px;
      font-size: 10pt;
      font-weight: 800;
    }
    
    .main-title {
      font-size: 26pt;
      font-weight: 900;
      color: #0f172a;
      line-height: 1.2;
      margin: 12px 0 6px 0;
    }
    
    .subtitle {
      font-size: 13pt;
      color: #64748b;
      font-weight: 600;
      margin-bottom: 20px;
    }
    
    .cover-banner {
      width: 100%;
      border-radius: 14px;
      box-shadow: 0 8px 20px rgba(0,0,0,0.08);
      border: 1px solid #e2e8f0;
      margin-bottom: 20px;
    }
    
    .meta-box {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 14px;
      padding: 14px 18px;
      display: flex;
      justify-content: space-between;
      font-size: 9pt;
      font-weight: 700;
      color: #475569;
    }
    
    h2.section-title {
      font-size: 16pt;
      font-weight: 900;
      color: #0f172a;
      border-bottom: 3px solid #2563eb;
      padding-bottom: 6px;
      margin-top: 25px;
      margin-bottom: 12px;
    }
    
    h3.sub-title {
      font-size: 12pt;
      font-weight: 800;
      color: #1e293b;
      margin-top: 16px;
      margin-bottom: 6px;
    }
    
    p {
      margin: 5px 0 10px 0;
      color: #334155;
    }
    
    .screenshot-card {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      padding: 8px;
      margin: 12px 0 16px 0;
      text-align: center;
    }
    
    .screenshot-card img {
      width: 100%;
      border-radius: 8px;
      box-shadow: 0 3px 10px rgba(0,0,0,0.05);
      display: block;
    }
    
    .screenshot-caption {
      font-size: 8pt;
      color: #64748b;
      font-weight: 700;
      margin-top: 6px;
    }
    
    .steps-list {
      padding-right: 18px;
      margin: 8px 0;
    }
    
    .steps-list li {
      margin-bottom: 6px;
      font-weight: 600;
    }
    
    .tip-box {
      background: #eff6ff;
      border-right: 4px solid #2563eb;
      padding: 10px 14px;
      border-radius: 8px;
      font-size: 9pt;
      margin: 12px 0;
      color: #1e3a8a;
    }
    
    .tip-box strong {
      color: #1d4ed8;
      display: block;
      margin-bottom: 2px;
    }
    
    .badge {
      display: inline-block;
      padding: 2px 8px;
      border-radius: 6px;
      font-size: 8pt;
      font-weight: 800;
    }
    .badge-green { background: #dcfce7; color: #166534; }
    .badge-blue { background: #dbeafe; color: #1e40af; }
    .badge-amber { background: #fef3c7; color: #92400e; }
  </style>
</head>
<body>

  <!-- COVER PAGE -->
  <div class="cover-page">
    <div>
      <div class="brand-badge">Devisly DZ — الدليل الشامل v1.2</div>
      <h1 class="main-title">دليل الاستخدام والتشغيل الشامل</h1>
      <div class="subtitle">منصة إنشاء عروض الأسعار، الفوترة، إدارة التحصيل، مركز الطباعة وإدارة مبيعات WhatsApp</div>
      
      <img src="${b64Dashboard}" class="cover-banner" alt="Devisly Dashboard">
    </div>
    
    <div class="meta-box">
      <div>النسخة: <strong>1.2 Full Specifications</strong></div>
      <div>المطوّر: <strong>فريق هندسة وتصميم المنتج</strong></div>
      <div>السوق: <strong>الجزائر (دينار جزائري DZD)</strong></div>
      <div>التاريخ: <strong>أوت 2026</strong></div>
    </div>
  </div>

  <div class="page-break"></div>

  <!-- SECTION 1: DASHBOARD -->
  <h2 class="section-title">1. لوحة التحكم والإحصائيات الشاملة (Dashboard)</h2>
  
  <p>
    صُممت منصة <strong>Devisly</strong> لتمنح الحرفي والمقاول وصاحب المؤسسة الخدمية نظرة فورية خلال 5 ثوانٍ عن نشاطه التجاري.
  </p>

  <div class="screenshot-card">
    <img src="${b64Dashboard}" alt="لوحة التحكم">
    <div class="screenshot-caption">شكل (1): لوحة التحكم الرئيسية متضمنة بطاقات الأداء، الرسم البياني الأسبوعي، وصندوق التنبيهات.</div>
  </div>

  <h3 class="sub-title">المكونات الأساسية للوحة التحكم:</h3>
  <ul class="steps-list">
    <li><strong>بطاقات الأداء الـ 4 (KPIs):</strong> إجمالي قيمة العروض (2,450,000 دج)، نسبة القبول (68%)، المبالغ المحصلة (1,245,000 دج)، والمبالغ المتأخرة (287,500 دج).</li>
    <li><strong>مؤشرات الأداء المتقدمة:</strong> متوسط زمن قبول العرض (4.2 ساعات)، متوسط قيمة العرض، ومعدل التحصيل الفعلي (81.4%).</li>
    <li><strong>أفضل الخدمات والعملاء:</strong> تحليل الخدمات الأكثر مبيعاً وأهم الزبائن تعاملاً.</li>
  </ul>

  <div class="page-break"></div>

  <!-- SECTION 2: PRINT CENTER PRO -->
  <h2 class="section-title">2. مركز الطباعة الذكي (Print Center Pro — الميزة 1 في v1.2)</h2>

  <p>
    يوفر مركز الطباعة إمكانية تخصيص المقاسات حسب طبيعة النشاط التجاري والمعدات المتوفرة:
  </p>

  <div class="screenshot-card">
    <img src="${b64PrintCenter}" alt="مركز الطباعة">
    <div class="screenshot-caption">شكل (2): نافذة مركز الطباعة الذكي لدعم مقاسات A4 و A5 و Thermal 80mm مع تخصيص الأختام.</div>
  </div>

  <ul class="steps-list">
    <li><strong>مقاس A4 الرسمي:</strong> مخصص لعروض الأسعار والفواتير الرسمية للشركات والزبائن.</li>
    <li><strong>مقاس A5 المقتضب:</strong> مخصص لسندات القبض الميدانية والوصولات السريعة.</li>
    <li><strong>مقاس Thermal 80mm (الإيصال الحراري):</strong> مخصص لمحلات الصيانة، نقاط الخدمة وورشات العمل.</li>
    <li><strong>تخصيص اللغة:</strong> التبديل الفوري بين الوثيقة العربية، الفرنسية، أو ثنائية اللغة.</li>
  </ul>

  <div class="page-break"></div>

  <!-- SECTION 3: ADMIN & WHATSAPP SUBSCRIPTION SALES -->
  <h2 class="section-title">3. لوحة تحكم الإدارة ومبيعات WhatsApp (Admin Desk — القسم 47)</h2>

  <p>
    نظام متكامل لمراجعة طلبات الدفع عبر WhatsApp وبريدي موب وتفعيل الحسابات للمستخدمين:
  </p>

  <div class="screenshot-card">
    <img src="${b64Admin}" alt="لوحة الإدارة">
    <div class="screenshot-caption">شكل (3): لوحة تحكم الإدارة لمراجعة طلبات الدفع والتحقق من الوصولات وتفعيل الاشتراكات.</div>
  </div>

  <ul class="steps-list">
    <li><strong>الموافقة والتفعيل الفوري (1-Click Activate):</strong> تفعيل فوري لخطة المستخدم (Pro / Business) عند مطابقة وصل الدفع.</li>
    <li><strong>سجل التدقيق والمبيعات (Audit Log):</strong> تتبع إجمالي المبيعات، ومصادر التحويلات (BaridiMob, CCP, Chargily Pay).</li>
    <li><strong>التواصل الفوري عبر WhatsApp:</strong> رابط محادثة مباشر مع المستخدم لطلب توضيحات أو إرسال إشعار التفعيل.</li>
  </ul>

  <div class="page-break"></div>

  <!-- SECTION 4: PAYMENTS & RECEIPTS -->
  <h2 class="section-title">4. سندات القبض وبوابات الدفع (Payments & Receipts)</h2>

  <div class="screenshot-card">
    <img src="${b64Receipt}" alt="وصل الاستلام">
    <div class="screenshot-caption">شكل (4): نموذج وصل استلام مالي معتمد مع التفقيط بالحروف والختم.</div>
  </div>

  <div class="screenshot-card">
    <img src="${b64Upgrade}" alt="بوابات الدفع">
    <div class="screenshot-caption">شكل (5): نافذة خطط الاشتراك وبوابات الدفع الجزائرية (Chargily, BaridiMob, CCP).</div>
  </div>

  <div class="tip-box" style="margin-top: 25px; text-align: center;">
    <strong>Devisly — عرضك احترافي. موافقة عميلك أسرع.</strong>
    دعم العملاء والاستفسارات: contact@devisly.dz | هاتف: +213 555 12 34 56
  </div>

</body>
</html>
  `;

  const htmlPath = path.join(OUTPUT_DIR, "Devisly_User_Guide.html");
  fs.writeFileSync(htmlPath, htmlContent, "utf8");

  const pdfPage = await browser.newPage();
  await pdfPage.setContent(htmlContent, { waitUntil: "networkidle0" });
  
  const pdfPath = path.join(OUTPUT_DIR, "Devisly_User_Guide.pdf");
  await pdfPage.pdf({
    path: pdfPath,
    format: 'A4',
    printBackground: true,
    margin: {
      top: '15mm',
      bottom: '15mm',
      left: '15mm',
      right: '15mm'
    }
  });

  console.log(`🎉 Updated PDF generated successfully at: ${pdfPath}`);
  await browser.close();
}

captureAndGeneratePdf().catch(err => {
  console.error("❌ Error generating PDF:", err);
  process.exit(1);
});
