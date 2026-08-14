// ==========================================================
// Devisly SaaS — Multi-tenant Initial Mock Data
// بيانات تجريبية معزولة لكل مستخدم ومؤسسة
// ==========================================================

export const INITIAL_ACCOUNTS = [
  {
    id: "usr-1",
    name: "كريم بن سالم",
    businessName: "مؤسسة الأفق للخدمات العامة والتشطيب",
    phone: "+213 555 12 34 56",
    email: "karim@alofok.dz",
    password: "123",
    address: "حي 05 جويلية، باب الزوار، الجزائر العاصمة",
    wilaya: "الجزائر",
    nif: "001916109876543",
    rc: "16/00-0987654B19",
    currency: "دج",
    plan: "Pro",
    status: "نشط",
    expiresAt: "2027-05-20",
    role: "user",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
  },
  {
    id: "usr-2",
    name: "فاتح بوخالفة",
    businessName: "ورشة الحدادة والإنشاءات المعدنية",
    phone: "+213 658 44 33 22",
    email: "fateh@hadada.dz",
    password: "123",
    address: "طريق باتنة، المنطقة الحرفية، سطيف",
    wilaya: "سطيف",
    nif: "001819203948571",
    rc: "19/00-1122334A18",
    currency: "دج",
    plan: "Pro",
    status: "نشط",
    expiresAt: "2026-09-15",
    role: "user",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
  },
  {
    id: "usr-3",
    name: "سمير قادري",
    businessName: "مؤسسة النور للكهرباء وشبكات الطاقة",
    phone: "+213 770 11 22 33",
    email: "samir@nour.dz",
    password: "123",
    address: "حي الصديقية، وهران",
    wilaya: "وهران",
    nif: "002031405968741",
    rc: "31/00-5566778C20",
    currency: "دج",
    plan: "Business",
    status: "نشط",
    expiresAt: "2026-12-31",
    role: "user",
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80"
  },
  {
    id: "usr-4",
    name: "أحمد لعريبي",
    businessName: "أعمال البناء والترميم الحديث",
    phone: "+213 661 23 45 67",
    email: "ahmed@binaa.dz",
    password: "123",
    address: "عين البنيان، الجزائر العاصمة",
    wilaya: "الجزائر",
    nif: "002116508493021",
    rc: "16/00-8899001D21",
    currency: "دج",
    plan: "Free",
    status: "نشط",
    expiresAt: "دائم",
    role: "user",
    avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80"
  }
];

export const INITIAL_USER = INITIAL_ACCOUNTS[0];

export const INITIAL_SERVICES = [
  { id: "srv-1", userId: "usr-1", name: "تركيب السيراميك والبورسلان", unit: "م²", price: 1200, category: "تشطيب" },
  { id: "srv-2", userId: "usr-1", name: "دهان داخلي فينيل فاخر", unit: "م²", price: 1000, category: "دهان" },
  { id: "srv-3", userId: "usr-1", name: "تمديدات كهربائية عامة وإنارة", unit: "نقطة", price: 2500, category: "كهرباء" },
  { id: "srv-4", userId: "usr-1", name: "تركيب كاميرات مراقبة IP فائقة الدقة", unit: "كاميرا", price: 6500, category: "حماية وشبكات" },
  { id: "srv-5", userId: "usr-1", name: "تركيب أسقف جبس بورد BA13 مع إنارة مخفية", unit: "م²", price: 1800, category: "ديكور" },
  { id: "srv-6", userId: "usr-1", name: "أعمال السباكة وتصريف المياه", unit: "خدمة", price: 15000, category: "سباكة" },
  { id: "srv-7", userId: "usr-1", name: "نجارة الألمنيوم والزجاج المضاعف", unit: "م²", price: 9500, category: "ألمنيوم" },
  // User 2 services
  { id: "srv-201", userId: "usr-2", name: "صناعة وتركيب أبواب حديدية فاخرة", unit: "باب", price: 45000, category: "حدادة" },
  { id: "srv-202", userId: "usr-2", name: "شباك حماية نوافذ مودرن", unit: "م²", price: 6500, category: "حدادة" },
  { id: "srv-203", userId: "usr-2", name: "هيكل معدني لمستودع وتغطية الصاج", unit: "م²", price: 12000, category: "إنشاءات" },
  // User 3 services
  { id: "srv-301", userId: "usr-3", name: "تركيب خزانة كهربائية صناعية 380V", unit: "خزانة", price: 85000, category: "كهرباء صناعية" },
  { id: "srv-302", userId: "usr-3", name: "تمديد كوابل شبكة ألياف بصرية", unit: "متر", price: 450, category: "شبكات" },
  { id: "srv-303", userId: "usr-3", name: "تركيب نظام إنذار ضد الحريق معتمد", unit: "نظام", price: 120000, category: "سلامة" },
];

export const INITIAL_CLIENTS = [
  {
    id: "cli-1",
    userId: "usr-1",
    name: "مؤسسة البناء الحديث",
    contactPerson: "السيد أحمد لعريبي",
    phone: "+213 661 23 45 67",
    email: "contact@el-binaa.dz",
    address: "حي 05 جويلية، الجزائر العاصمة",
    wilaya: "الجزائر",
    totalDeals: 3,
    totalSpent: 435000
  },
  {
    id: "cli-2",
    userId: "usr-1",
    name: "أعمال الري السقي الزراعي",
    contactPerson: "عبد القادر بن عيسى",
    phone: "+213 550 98 76 54",
    email: "irrigation.dz@gmail.com",
    address: "المنطقة الصناعية، أولاد يعيش، البليدة",
    wilaya: "البليدة",
    totalDeals: 2,
    totalSpent: 170000
  },
  {
    id: "cli-3",
    userId: "usr-1",
    name: "مؤسسة النور للكهرباء والتجهيز",
    contactPerson: "سمير قادري",
    phone: "+213 770 11 22 33",
    email: "nour.electrique@gmail.com",
    address: "حي الصديقية، وهران",
    wilaya: "وهران",
    totalDeals: 4,
    totalSpent: 520000
  },
  {
    id: "cli-4",
    userId: "usr-1",
    name: "ورشة الحدادة المتقنة",
    contactPerson: "فاتح بوخالفة",
    phone: "+213 658 44 33 22",
    email: "hadada.setif@gmail.com",
    address: "طريق باتنة، سطيف",
    wilaya: "سطيف",
    totalDeals: 1,
    totalSpent: 42500
  },
  {
    id: "cli-5",
    userId: "usr-1",
    name: "شركة الأمل للترميم والتجديد",
    contactPerson: "مهدي عثماني",
    phone: "+213 560 77 88 99",
    email: "amal.renov@gmail.com",
    address: "علي منجلي، قسنطينة",
    wilaya: "قسنطينة",
    totalDeals: 3,
    totalSpent: 620000
  }
];

export const INITIAL_DEVIS = [
  {
    id: "q-058",
    userId: "usr-1",
    number: "#Q-2024-058",
    clientName: "مؤسسة البناء الحديث",
    clientPhone: "+213 661 23 45 67",
    clientAddress: "حي 05 جويلية، الجزائر العاصمة",
    date: "2024-05-20",
    expiryDate: "2024-06-04",
    status: "مقبول",
    subtotal: 125000,
    discountType: "fixed",
    discountValue: 0,
    taxRate: 0,
    total: 125000,
    depositRequired: 37500,
    paymentTerms: "عربون 30% عند بدء الأشغال، والباقي عند التسليم النهائي.",
    notes: "مدة التنفيذ المقدرة: 12 يوم عمل من تاريخ استلام الموقع.",
    items: [
      { name: "تركيب أسقف جبس بورد BA13 مع إنارة مخفية", unit: "م²", quantity: 50, price: 1800, total: 90000 },
      { name: "تمديدات كهربائية عامة وإنارة", unit: "نقطة", quantity: 14, price: 2500, total: 35000 }
    ],
    clientFeedback: null,
    viewCount: 4,
    lastViewedAt: "2024-05-20 14:32"
  },
  {
    id: "q-057",
    userId: "usr-1",
    number: "#Q-2024-057",
    clientName: "أعمال الري السقي الزراعي",
    clientPhone: "+213 550 98 76 54",
    clientAddress: "المنطقة الصناعية، أولاد يعيش، البليدة",
    date: "2024-05-19",
    expiryDate: "2024-06-03",
    status: "تمت المشاهدة",
    subtotal: 85000,
    discountType: "fixed",
    discountValue: 0,
    taxRate: 0,
    total: 85000,
    depositRequired: 25500,
    paymentTerms: "الدفع عبر تحويل بنكي أو صك عند التسليم.",
    notes: "الضمان سنة كاملة على جودة التجهيزات.",
    items: [
      { name: "أعمال السباكة وتصريف المياه", unit: "خدمة", quantity: 1, price: 15000, total: 15000 },
      { name: "تركيب كاميرات مراقبة IP فائقة الدقة", unit: "كاميرا", quantity: 10, price: 6500, total: 65000 },
      { name: "تمديدات كهربائية عامة وإنارة", unit: "نقطة", quantity: 2, price: 2500, total: 5000 }
    ],
    clientFeedback: null,
    viewCount: 2,
    lastViewedAt: "2024-05-19 18:10"
  },
  {
    id: "q-056",
    userId: "usr-1",
    number: "#Q-2024-056",
    clientName: "مؤسسة النور للكهرباء والتجهيز",
    clientPhone: "+213 770 11 22 33",
    clientAddress: "حي الصديقية، وهران",
    date: "2024-05-18",
    expiryDate: "2024-06-02",
    status: "بانتظار الرد",
    subtotal: 210000,
    discountType: "fixed",
    discountValue: 10000,
    taxRate: 0,
    total: 200000,
    depositRequired: 60000,
    paymentTerms: "عربون 30% والباقي بعد انتهاء التركيب والاختبار.",
    notes: "يشمل السعر كافة لوازم التثبيت والتوصيل.",
    items: [
      { name: "تركيب السيراميك والبورسلان", unit: "م²", quantity: 100, price: 1200, total: 120000 },
      { name: "دهان داخلي فينيل فاخر", unit: "م²", quantity: 90, price: 1000, total: 90000 }
    ],
    clientFeedback: null,
    viewCount: 1,
    lastViewedAt: "2024-05-18 10:15"
  },
  {
    id: "q-055",
    userId: "usr-1",
    number: "#Q-2024-055",
    clientName: "ورشة الحدادة المتقنة",
    clientPhone: "+213 658 44 33 22",
    clientAddress: "طريق باتنة، سطيف",
    date: "2024-05-17",
    expiryDate: "2024-06-01",
    status: "تعديل مطلوب",
    subtotal: 42500,
    discountType: "fixed",
    discountValue: 0,
    taxRate: 0,
    total: 42500,
    depositRequired: 15000,
    paymentTerms: "دفع نقدي فوري عند الاستلام.",
    notes: "طلب العميل مراجعة تكلفة التوصيل ونوع الطلاء.",
    items: [
      { name: "نجارة الألمنيوم والزجاج المضاعف", unit: "م²", quantity: 3, price: 9500, total: 28500 },
      { name: "أعمال السباكة وتصريف المياه", unit: "خدمة", quantity: 1, price: 14000, total: 14000 }
    ],
    clientFeedback: "يرجى تعديل موعد التسليم ليكون قبل نهاية الشهر إن أمكن، وإضافة خيار الزجاج العاكس.",
    viewCount: 5,
    lastViewedAt: "2024-05-17 21:40"
  },
  {
    id: "q-054",
    userId: "usr-1",
    number: "#Q-2024-054",
    clientName: "شركة الأمل للترميم والتجديد",
    clientPhone: "+213 560 77 88 99",
    clientAddress: "علي منجلي، قسنطينة",
    date: "2024-05-15",
    expiryDate: "2024-05-30",
    status: "مسودة",
    subtotal: 310000,
    discountType: "fixed",
    discountValue: 0,
    taxRate: 0,
    total: 310000,
    depositRequired: 90000,
    paymentTerms: "دفعات مجدولة حسب تقدم نسب الإنجاز.",
    notes: "قيد المراجعة والتدقيق الداخلي للكميات.",
    items: [
      { name: "تركيب السيراميك والبورسلان", unit: "م²", quantity: 150, price: 1200, total: 180000 },
      { name: "دهان داخلي فينيل فاخر", unit: "م²", quantity: 130, price: 1000, total: 130000 }
    ],
    clientFeedback: null,
    viewCount: 0,
    lastViewedAt: null
  }
];

export const INITIAL_INVOICES = [
  {
    id: "inv-022",
    userId: "usr-1",
    number: "#INV-2024-022",
    devisId: "q-058",
    clientName: "مؤسسة البناء الحديث",
    date: "2024-05-20",
    dueDate: "2024-06-05",
    total: 125000,
    paidAmount: 37500,
    dueAmount: 87500,
    status: "مدفوع جزئياً"
  },
  {
    id: "inv-021",
    userId: "usr-1",
    number: "#INV-2024-021",
    devisId: "q-050",
    clientName: "مؤسسة البناء الحديث",
    date: "2024-05-01",
    dueDate: "2024-05-15",
    total: 287500,
    paidAmount: 0,
    dueAmount: 287500,
    status: "متأخر"
  },
  {
    id: "inv-020",
    userId: "usr-1",
    number: "#INV-2024-020",
    devisId: "q-048",
    clientName: "شركة الأمل للترميم والتجديد",
    date: "2024-04-20",
    dueDate: "2024-05-05",
    total: 620000,
    paidAmount: 620000,
    dueAmount: 0,
    status: "مدفوع بالكامل"
  }
];

export const INITIAL_PAYMENTS = [
  {
    id: "pay-001",
    userId: "usr-1",
    receiptNumber: "#REC-2024-001",
    invoiceId: "inv-022",
    invoiceNumber: "#INV-2024-022",
    clientName: "مؤسسة البناء الحديث",
    date: "2024-05-20",
    amount: 37500,
    method: "BaridiMob / CCP",
    reference: "BM-98741029",
    note: "عربون 30% لبدء أعمال الأسقف والجبس",
    amountInWords: "سبعة وثلاثون ألف وخمسمائة دينار جزائري"
  },
  {
    id: "pay-002",
    userId: "usr-1",
    receiptNumber: "#REC-2024-002",
    invoiceId: "inv-020",
    invoiceNumber: "#INV-2024-020",
    clientName: "شركة الأمل للترميم والتجديد",
    date: "2024-05-02",
    amount: 320000,
    method: "شيك بنكي",
    reference: "CHK-0098234",
    note: "الدفعة الختامية لمشروع التجديد",
    amountInWords: "ثلاثمائة وعشرون ألف دينار جزائري"
  },
  {
    id: "pay-003",
    userId: "usr-1",
    receiptNumber: "#REC-2024-003",
    invoiceId: "inv-020",
    invoiceNumber: "#INV-2024-020",
    clientName: "شركة الأمل للترميم والتجديد",
    date: "2024-04-20",
    amount: 300000,
    method: "نقداً (Cash)",
    reference: "CASH-REC-01",
    note: "دفعة أولية نقدية بالموقع",
    amountInWords: "ثلاثمائة ألف دينار جزائري"
  },
  {
    id: "pay-004",
    userId: "usr-1",
    receiptNumber: "#REC-2024-004",
    invoiceId: null,
    invoiceNumber: "فاتورة تركيب كاميرات",
    clientName: "أعمال الري السقي الزراعي",
    date: "2024-05-10",
    amount: 85000,
    method: "بطاقة ذهبية / CIB",
    reference: "CHRG-882914",
    note: "دفع إلكتروني عبر Chargily Pay",
    amountInWords: "خمسة وثمانون ألف دينار جزائري"
  },
  {
    id: "pay-005",
    userId: "usr-1",
    receiptNumber: "#REC-2024-005",
    invoiceId: null,
    invoiceNumber: "دفعة صيانة",
    clientName: "مؤسسة النور للكهرباء",
    date: "2024-05-12",
    amount: 120000,
    method: "BaridiMob / CCP",
    reference: "BM-44556677",
    note: "تحويل بريدي موب مباشر",
    amountInWords: "مائة وعشرون ألف دينار جزائري"
  }
];

export const ATTENTION_ALERTS = [
  {
    id: "alt-1",
    type: "revision",
    title: "مؤسسة البناء الحديث طلبت تعديل",
    description: "تعديل في أسعار مواد العزل وتاريخ التسليم بالعرض #Q-2024-055",
    time: "منذ ساعتين",
    actionLabel: "مراجعة العرض",
    devisId: "q-055"
  },
  {
    id: "alt-2",
    type: "overdue",
    title: "فاتورة متأخرة الدفع #INV-2024-021",
    description: "مبلغ 287,500 دج مستحق منذ 15 يوماً على مؤسسة البناء الحديث",
    time: "منذ يومين",
    actionLabel: "إرسال تذكير WhatsApp",
    phone: "+213 661 23 45 67"
  },
  {
    id: "alt-3",
    type: "accepted",
    title: "تم قبول العرض #Q-2024-058",
    description: "مؤسسة البناء وافقت على العرض بقيمة 125,000 دج. ابدأ العمل!",
    time: "أمس 16:40",
    actionLabel: "تحويل لفاتورة",
    devisId: "q-058"
  }
];

export const WEEKLY_CHART_DATA = [
  { day: "السبت", devis: 120000, collected: 85000 },
  { day: "الأحد", devis: 280000, collected: 140000 },
  { day: "الاثنين", devis: 190000, collected: 210000 },
  { day: "الثلاثاء", devis: 340000, collected: 180000 },
  { day: "الأربعاء", devis: 450000, collected: 320000 },
  { day: "الخميس", devis: 290000, collected: 260000 },
  { day: "الجمعة", devis: 95000, collected: 50000 },
];
