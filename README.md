# Devisly — منصة عروض الأسعار والفوترة للخدمات المحلية في الجزائر 🇩🇿

> **Devisly SaaS Platform** (React + Vite + Tailwind CSS + Hostinger Web MySQL API)  
> الإصدار 1.3 — Multi-tenant SaaS Web Application

---

## 🌟 نظرة عامة (Overview)
**Devisly** هي أول منصة سحابية جزائرية مخصصة للحرفيين وأصحاب المؤسسات الخدمية والمقاولين لإنشاء عروض أسعار وفواتير احترافية خلال دقائق، ومشاركتها عبر روابط WhatsApp تفاعلية، وطباعتها بمقاسات متعددة (A4, A5, Thermal 80mm)، وإدارة الديون والدفعات وسندات القبض بالتفقيط والختم المعتمد.

---

## 🚀 المميزات الرئيسية (Core Features)

1. 📄 **منشئ عروض الأسعار الذكي (Devis Builder):**
   - حساب تلقائي للمجاميع والخصومات ونسب الضريبة (TVA 0%/19%) والعربون (Acompte 30%).
   - تفقيط المبالغ باللغة العربية والفرنسية تلقائياً.

2. 📱 **بوابة العميل وروابط WhatsApp التفاعلية (Client Public Portal):**
   - رابط مباشر للزبون يفتحه من هاتفه ليقبل العرض بضغطة زر مع احتفالية ومؤثرات Confetti أو يطلب تعديلاً مع إشعار فوري.

3. 🖨️ **مركز الطباعة الذكي (Smart Print Center):**
   - طباعة وتصدير PDF بمقاسات:
     - **A4:** للوثائق الرسمية وعروض الشركات.
     - **A5:** لسندات القبض والوصولات السريعة.
     - **Thermal 80mm:** للإيصالات الحرارية ونقاط الخدمة وورشات الصيانة.

4. 🧾 **سندات القبض والدفعات (Payment Receipts & Invoices):**
   - تحويل العرض المقبول إلى فاتورة بضغطة زر واحدة.
   - تسجيل الدفعات وإصدار سند قبض رسمي فوري.
   - دعم بوابات الدفع الجزائرية: Chargily Pay (الذهبية/CIB)، BaridiMob، و CCP.

5. 🛠️ **أوامر العمل ومحاضر الاستلام (Bon de Travail & PV de Réception):**
   - تكليف الفرق الميدانية وتوقيع محضر الاستلام والمطابقة الرسمي عند نهاية الأشغال.

6. 👑 **لوحة تحكم الإدارة العليا (Super Admin Portal):**
   - مسار سري خاص `/#admin` لمالك المنصة لإدارة المشتركين، ترقية الخطط، مراجعة طلبات الدفع عبر بريدي موب، وميزة الدخول بحساب أي مستخدم ومحاكاته (Impersonate).

---

## 🛠️ التقنيات المستخدمة (Tech Stack)

- **Frontend:** React 18, Vite, Tailwind CSS, Lucide React Icons.
- **Routing:** Hash & Path Multi-Tenant URL Router.
- **Styling & Fonts:** Cairo, Tajawal, Custom Midnight Dark Blue Aesthetic.
- **Backend & Database:** PHP REST API + MySQL (Hostinger Web Hosting).

---

## 💻 التشغيل المحلي (Local Development)

```bash
# تثبيت الحزم
npm install

# تشغيل خادم التطوير
npm run dev

# بناء النسخة الإنتاجية
npm run build
```

---

## 📄 الترخيص (License)
جميع الحقوق محفوظة © 2026 Devisly DZ.
