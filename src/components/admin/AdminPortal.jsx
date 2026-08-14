import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Lock,
  Users,
  CheckCircle2,
  XCircle,
  Clock,
  Plus,
  Search,
  Check,
  X,
  Edit3,
  Trash2,
  DollarSign,
  TrendingUp,
  CreditCard,
  MessageSquare,
  ShieldCheck,
  ArrowRight,
  ExternalLink,
  Sparkles,
  Zap,
  Power,
  LogIn,
  LogOut,
  Building,
  UserCheck,
  Calendar,
  Bell,
  Send,
  Phone,
  Mail,
  MapPin,
  KeyRound,
  AlertCircle
} from 'lucide-react';

export const AdminPortal = () => {
  const {
    formatDZD,
    showToast,
    accounts,
    impersonateUser,
    logoutAdmin,
    upgradePlan,
    updateAccountInfo,
    deleteAccount,
    sendNotification,
    allNotifications
  } = useApp();

  const [activeAdminTab, setActiveAdminTab] = useState('users'); // 'users' | 'requests' | 'notifications'
  const [search, setSearch] = useState('');

  // Local accounts state synced live from context
  const [adminAccounts, setAdminAccounts] = useState(accounts);

  useEffect(() => {
    setAdminAccounts(accounts);
  }, [accounts]);

  // Modals state
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [notifTargetUser, setNotifTargetUser] = useState(null); // null means broadcast if opened from top button
  const [isNotifModalOpen, setIsNotifModalOpen] = useState(false);

  // Edit User Form State
  const [editFormData, setEditFormData] = useState({
    name: '',
    businessName: '',
    phone: '',
    email: '',
    password: '',
    wilaya: 'الجزائر',
    plan: 'Free',
    status: 'نشط',
    expiresAt: '2027-05-20',
    nif: '',
    rc: ''
  });

  // Notification Form State
  const [notifTitle, setNotifTitle] = useState('');
  const [notifMessage, setNotifMessage] = useState('');
  const [notifType, setNotifType] = useState('success');
  const [isBroadcast, setIsBroadcast] = useState(false);

  // New User Form State
  const [newUserName, setNewUserName] = useState('');
  const [newUserBusiness, setNewUserBusiness] = useState('');
  const [newUserPhone, setNewUserPhone] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserPassword, setNewUserPassword] = useState('123');
  const [newUserPlan, setNewUserPlan] = useState('Pro');
  const [newUserWilaya, setNewUserWilaya] = useState('16 - الجزائر');

  // Payment Requests State
  const [requests, setRequests] = useState([
    {
      id: "req-881",
      number: "#REQ-2024-881",
      userName: "كريم بن سالم",
      userPhone: "+213 555 12 34 56",
      userEmail: "karim@alofok.dz",
      planName: "Pro",
      billingCycle: "سنوي (12 شهر)",
      amount: 15000,
      paymentMethod: "BaridiMob (تطبيق بريدي موب)",
      reference: "BM-99824109",
      date: "2026-05-21 14:30",
      status: "قيد المراجعة",
      receiptImageUrl: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&auto=format&fit=crop&q=80"
    }
  ]);

  const openEditUserModal = (u) => {
    setEditingUser(u);
    setEditFormData({
      name: u.name || '',
      businessName: u.businessName || '',
      phone: u.phone || '',
      email: u.email || '',
      password: u.password || '123',
      wilaya: u.wilaya || 'الجزائر',
      plan: u.plan || 'Free',
      status: u.status || 'نشط',
      expiresAt: u.expiresAt || '2027-05-20',
      nif: u.nif || '',
      rc: u.rc || ''
    });
  };

  const handleSaveEditUser = (e) => {
    e.preventDefault();
    if (!editingUser) return;
    updateAccountInfo(editingUser.id, editFormData);
    setEditingUser(null);
  };

  const handleSetQuickExpiry = (months) => {
    if (months === 'permanent') {
      setEditFormData(prev => ({ ...prev, expiresAt: 'دائم' }));
      return;
    }
    const d = new Date();
    d.setMonth(d.getMonth() + months);
    const dateStr = d.toISOString().split('T')[0];
    setEditFormData(prev => ({ ...prev, expiresAt: dateStr }));
  };

  const openNotificationModal = (user = null) => {
    setNotifTargetUser(user);
    setIsBroadcast(user === null);
    setNotifTitle(user ? `إشعار هام من إدارة Devisly لـ ${user.name}` : 'تحديث هام لجميع مستخدمي منصة Devisly 🚀');
    setNotifMessage(user ? 'تم تحديث حسابك ومراجعة اشتراكك بنجاح. شكراً لثقتك في Devisly!' : 'يسرنا إعلامكم بإطلاق ميزات جديدة في منصة عروض الأسعار والفوترة!');
    setNotifType('success');
    setIsNotifModalOpen(true);
  };

  const handleSendNotificationSubmit = (e) => {
    e.preventDefault();
    if (!notifTitle || !notifMessage) {
      showToast('يرجى كتابة عنوان ونص الإشعار.');
      return;
    }
    sendNotification({
      userId: notifTargetUser ? notifTargetUser.id : null,
      title: notifTitle,
      message: notifMessage,
      type: notifType,
      isBroadcast: isBroadcast
    });
    setIsNotifModalOpen(false);
  };

  const handleCreateUser = (e) => {
    e.preventDefault();
    if (!newUserName || !newUserPhone) {
      showToast('يرجى ملء الاسم ورقم الهاتف.');
      return;
    }

    const newId = `usr-${Date.now()}`;
    const created = {
      id: newId,
      name: newUserName,
      businessName: newUserBusiness || newUserName,
      phone: newUserPhone,
      email: newUserEmail || `${newUserPhone.replace(/\D/g, '')}@devisly.dz`,
      password: newUserPassword || '123',
      address: `${newUserWilaya}، الجزائر`,
      wilaya: newUserWilaya,
      nif: '',
      rc: '',
      currency: 'دج',
      plan: newUserPlan,
      status: "نشط",
      expiresAt: newUserPlan === 'Free' ? 'دائم' : '2027-05-20',
      role: 'user',
      avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
    };

    updateAccountInfo(newId, created);
    setIsAddUserModalOpen(false);
    setNewUserName('');
    setNewUserBusiness('');
    setNewUserPhone('');
    setNewUserEmail('');
  };

  const handleToggleUserStatus = (u) => {
    const nextStatus = u.status === 'نشط' ? 'معطل' : 'نشط';
    updateAccountInfo(u.id, { status: nextStatus });
  };

  const handleDeleteUser = (u) => {
    if (window.confirm(`هل أنت متأكد من رغبتك في حذف حساب "${u.name}" وجميع بياناته نهائياً؟`)) {
      deleteAccount(u.id);
    }
  };

  const handleApproveRequest = (req) => {
    setRequests(prev => prev.map(r => r.id === req.id ? { ...r, status: "مفعل" } : r));
    upgradePlan(req.planName);
    showToast(`تمت الموافقة على طلب الدفع ${req.number} وتفعيل خطة ${req.planName} فورياً!`);
  };

  const filteredUsers = adminAccounts.filter(u =>
    (u.name && u.name.toLowerCase().includes(search.toLowerCase())) ||
    (u.businessName && u.businessName.toLowerCase().includes(search.toLowerCase())) ||
    (u.phone && u.phone.includes(search)) ||
    (u.email && u.email.toLowerCase().includes(search.toLowerCase()))
  );

  const totalMRR = adminAccounts.reduce((acc, u) => {
    if (u.plan === 'Pro' && u.status === 'نشط') return acc + 1500;
    if (u.plan === 'Business' && u.status === 'نشط') return acc + 3500;
    return acc;
  }, 0);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-4 sm:p-8 font-sans selection:bg-brand-500 selection:text-white" dir="rtl">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-950 p-6 rounded-3xl border border-slate-800 shadow-2xl">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center font-black shadow-lg shadow-amber-500/20">
              <Lock className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2.5 py-0.5 rounded-full">
                  لوحة تحكم الإدارة العليا (Super Admin)
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-white mt-1">
                إدارة المشتركين، صلاحيات الحسابات والإشعارات
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => openNotificationModal(null)}
              className="px-4 py-2.5 bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 text-xs font-black rounded-xl border border-blue-500/30 transition-all flex items-center gap-1.5"
            >
              <Bell className="w-4 h-4 text-blue-400" />
              <span>إرسال إشعار عام للجميع</span>
            </button>

            <button
              onClick={logoutAdmin}
              className="px-4 py-2.5 bg-slate-800 hover:bg-rose-900/30 text-slate-300 hover:text-rose-300 text-xs font-bold rounded-xl border border-slate-700 transition-all flex items-center gap-1.5"
            >
              <LogOut className="w-4 h-4" />
              <span>تسجيل خروج الإدارة</span>
            </button>
          </div>
        </div>

        {/* Top KPIs Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="bg-slate-950 border border-slate-800 p-5 rounded-2xl">
            <div className="flex items-center justify-between text-slate-400 text-xs font-bold mb-2">
              <span>إجمالي المشتركين الحقيقيين</span>
              <Users className="w-4 h-4 text-brand-400" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-white font-mono">{adminAccounts.length}</span>
              <span className="text-xs text-emerald-400 font-bold">حسابات نشطة</span>
            </div>
          </div>

          <div className="bg-slate-950 border border-slate-800 p-5 rounded-2xl">
            <div className="flex items-center justify-between text-slate-400 text-xs font-bold mb-2">
              <span>الإيراد الشهري المقدر (MRR)</span>
              <DollarSign className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-emerald-400 font-mono">{formatDZD(totalMRR)}</span>
              <span className="text-xs text-slate-400">/ شهر</span>
            </div>
          </div>

          <div className="bg-slate-950 border border-slate-800 p-5 rounded-2xl">
            <div className="flex items-center justify-between text-slate-400 text-xs font-bold mb-2">
              <span>طلبات الدفع (WhatsApp / CCP)</span>
              <CreditCard className="w-4 h-4 text-amber-400" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-amber-400 font-mono">
                {requests.filter(r => r.status === "قيد المراجعة").length}
              </span>
              <span className="text-xs text-slate-400">بحاجة لتأكيد</span>
            </div>
          </div>

          <div className="bg-slate-950 border border-slate-800 p-5 rounded-2xl">
            <div className="flex items-center justify-between text-slate-400 text-xs font-bold mb-2">
              <span>حالة خادم MySQL (Hostinger)</span>
              <Zap className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-sm font-black text-emerald-400 flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block animate-pulse" />
                متصل وجاهز (Online)
              </span>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
          <button
            onClick={() => setActiveAdminTab('users')}
            className={`px-5 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${
              activeAdminTab === 'users' ? 'bg-amber-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white bg-slate-950'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>إدارة الحسابات والمشتركين ({adminAccounts.length})</span>
          </button>

          <button
            onClick={() => setActiveAdminTab('requests')}
            className={`px-5 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${
              activeAdminTab === 'requests' ? 'bg-amber-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white bg-slate-950'
            }`}
          >
            <CreditCard className="w-4 h-4" />
            <span>وصولات الدفع عبر بريدي موب ({requests.length})</span>
          </button>
        </div>

        {/* TAB 1: USERS CRM TABLE */}
        {activeAdminTab === 'users' && (
          <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 space-y-5">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <div className="relative flex-1 max-w-md">
                <input
                  type="text"
                  placeholder="ابحث بالاسم، المؤسسة، الهاتف، أو الولاية..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 pl-4 pr-10 py-2.5 rounded-2xl text-xs text-white outline-none focus:border-amber-500 font-bold"
                />
                <Search className="w-4 h-4 text-slate-500 absolute right-3.5 top-1/2 -translate-y-1/2" />
              </div>

              <button
                onClick={() => setIsAddUserModalOpen(true)}
                className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-amber-500/10 transition-all"
              >
                <Plus className="w-4 h-4 stroke-[3]" />
                <span>إضافة حساب جديد يدوياً</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-right border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-[11px] font-extrabold text-slate-400 uppercase">
                    <th className="py-3 px-3">المستخدم والمؤسسة</th>
                    <th className="py-3 px-3">الهاتف والولاية</th>
                    <th className="py-3 px-3">الخطة وتاريخ الانتهاء</th>
                    <th className="py-3 px-3 text-center">الحالة</th>
                    <th className="py-3 px-3 text-center">الإجراءات والتحكم الشامل</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80 font-bold text-slate-300">
                  {filteredUsers.map((u) => (
                    <tr key={u.id} className="hover:bg-slate-900/60 transition-colors">
                      
                      {/* Name & Business */}
                      <td className="py-3.5 px-3">
                        <div className="flex items-center gap-2.5">
                          <img src={u.avatarUrl} alt={u.name} className="w-8 h-8 rounded-xl object-cover border border-slate-800" />
                          <div>
                            <span className="font-black text-white block">{u.name}</span>
                            <span className="text-[11px] text-slate-400 block">{u.businessName}</span>
                          </div>
                        </div>
                      </td>

                      {/* Phone & Wilaya */}
                      <td className="py-3.5 px-3">
                        <span className="font-mono text-white block">{u.phone}</span>
                        <span className="text-[10px] text-slate-400 block">{u.wilaya}</span>
                      </td>

                      {/* Plan & Expiry */}
                      <td className="py-3.5 px-3">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`px-2 py-0.5 rounded-md text-[10px] font-black ${
                            u.plan === 'Business' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                            u.plan === 'Pro' ? 'bg-brand-500/20 text-brand-300 border border-brand-500/30' :
                            'bg-slate-800 text-slate-400'
                          }`}>
                            خطة {u.plan}
                          </span>
                        </div>
                        <span className="text-[10px] text-slate-400 font-mono block">
                          ينتهي: {u.expiresAt || '2027-05-20'}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-3 text-center">
                        <button
                          onClick={() => handleToggleUserStatus(u)}
                          className={`px-2.5 py-1 rounded-full text-[10px] font-black transition-all ${
                            u.status === 'نشط' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                          }`}
                        >
                          {u.status === 'نشط' ? '● نشط' : '✕ معطل'}
                        </button>
                      </td>

                      {/* Action Controls */}
                      <td className="py-3.5 px-3 text-center">
                        <div className="flex items-center justify-center gap-1.5">
                          
                          {/* 1. Edit User & Subscription */}
                          <button
                            onClick={() => openEditUserModal(u)}
                            className="p-1.5 bg-slate-900 hover:bg-slate-800 text-amber-400 hover:text-amber-300 rounded-lg border border-slate-800 transition-colors"
                            title="تعديل الحساب وتاريخ الاشتراك"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>

                          {/* 2. Send In-App Notification */}
                          <button
                            onClick={() => openNotificationModal(u)}
                            className="p-1.5 bg-slate-900 hover:bg-slate-800 text-blue-400 hover:text-blue-300 rounded-lg border border-slate-800 transition-colors"
                            title="إرسال إشعار فوري للحساب"
                          >
                            <Bell className="w-4 h-4" />
                          </button>

                          {/* 3. Impersonate Account */}
                          <button
                            onClick={() => impersonateUser(u.id)}
                            className="p-1.5 bg-slate-900 hover:bg-slate-800 text-emerald-400 hover:text-emerald-300 rounded-lg border border-slate-800 transition-colors"
                            title="الدخول بحسابه ومحاكاته (Impersonate)"
                          >
                            <LogIn className="w-4 h-4" />
                          </button>

                          {/* 4. Delete Account */}
                          <button
                            onClick={() => handleDeleteUser(u)}
                            className="p-1.5 bg-slate-900 hover:bg-rose-950/40 text-rose-400 hover:text-rose-300 rounded-lg border border-slate-800 transition-colors"
                            title="حذف الحساب نهائياً"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>

                        </div>
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: PAYMENT VERIFICATION DESK */}
        {activeAdminTab === 'requests' && (
          <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 space-y-4">
            <h2 className="text-base font-black text-white">طلبات الاشتراكات ووصولات الدفع عبر بريدي موب</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {requests.map(req => (
                <div key={req.id} className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <div>
                      <span className="font-mono text-xs font-black text-amber-400 block">{req.number}</span>
                      <span className="text-sm font-black text-white">{req.userName}</span>
                    </div>
                    <span className="px-2.5 py-1 bg-amber-500/20 text-amber-300 rounded-full text-[10px] font-black">
                      {req.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-slate-400 block text-[10px]">الخطة المطلوبة:</span>
                      <span className="font-bold text-white">خطة {req.planName} ({req.billingCycle})</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">المبلغ المحول:</span>
                      <span className="font-black text-emerald-400 font-mono">{formatDZD(req.amount)}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">رقم الوصل / الحوالة:</span>
                      <span className="font-mono text-slate-300">{req.reference}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">تاريخ الإرسال:</span>
                      <span className="font-mono text-slate-400">{req.date}</span>
                    </div>
                  </div>

                  {req.receiptImageUrl && (
                    <div className="relative group rounded-xl overflow-hidden border border-slate-800">
                      <img src={req.receiptImageUrl} alt="وصل التحويل" className="w-full h-32 object-cover" />
                      <a
                        href={req.receiptImageUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center text-xs font-bold text-white transition-opacity"
                      >
                        عرض وصل الدفع بحجم كامل
                      </a>
                    </div>
                  )}

                  {req.status === "قيد المراجعة" && (
                    <button
                      onClick={() => handleApproveRequest(req)}
                      className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs rounded-xl transition-all flex items-center justify-center gap-1.5"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>تأكيد الاستلام وتفعيل الاشتراك فورياً</span>
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* MODAL 1: EDIT USER & SUBSCRIPTION */}
      {editingUser && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-950 border border-slate-800 rounded-3xl w-full max-w-xl p-6 sm:p-7 space-y-5 shadow-2xl animate-in zoom-in-95 text-slate-100">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-black">
                  <Edit3 className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-black text-white">تعديل بيانات الحساب وتاريخ الاشتراك</h3>
                  <span className="text-xs text-slate-400">حساب: {editingUser.name}</span>
                </div>
              </div>
              <button onClick={() => setEditingUser(null)} className="p-2 text-slate-400 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleSaveEditUser} className="space-y-4 text-xs font-bold">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1">الاسم الكامل *</label>
                  <input
                    type="text"
                    required
                    value={editFormData.name}
                    onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 p-2.5 rounded-xl text-white outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 mb-1">اسم المؤسسة أو الورشة</label>
                  <input
                    type="text"
                    value={editFormData.businessName}
                    onChange={(e) => setEditFormData({ ...editFormData, businessName: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 p-2.5 rounded-xl text-white outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1">رقم الهاتف (WhatsApp) *</label>
                  <input
                    type="text"
                    required
                    value={editFormData.phone}
                    onChange={(e) => setEditFormData({ ...editFormData, phone: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 p-2.5 rounded-xl text-white outline-none focus:border-amber-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 mb-1">البريد الإلكتروني</label>
                  <input
                    type="email"
                    value={editFormData.email}
                    onChange={(e) => setEditFormData({ ...editFormData, email: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 p-2.5 rounded-xl text-white outline-none focus:border-amber-500 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1">خطة الاشتراك</label>
                  <select
                    value={editFormData.plan}
                    onChange={(e) => setEditFormData({ ...editFormData, plan: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 p-2.5 rounded-xl text-white outline-none focus:border-amber-500"
                  >
                    <option value="Free">مجاني (Free)</option>
                    <option value="Pro">خطة Pro (1,500 دج)</option>
                    <option value="Business">خطة Business (3,500 دج)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 mb-1">حالة الحساب</label>
                  <select
                    value={editFormData.status}
                    onChange={(e) => setEditFormData({ ...editFormData, status: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 p-2.5 rounded-xl text-white outline-none focus:border-amber-500"
                  >
                    <option value="نشط">نشط (Active)</option>
                    <option value="معطل">معطل (Suspended)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 mb-1">كلمة المرور</label>
                  <input
                    type="text"
                    value={editFormData.password}
                    onChange={(e) => setEditFormData({ ...editFormData, password: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 p-2.5 rounded-xl text-white outline-none focus:border-amber-500 font-mono"
                  />
                </div>
              </div>

              {/* Subscription Expiry Section */}
              <div className="p-3.5 bg-slate-900 rounded-2xl border border-slate-800 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>تاريخ انتهاء الاشتراك (Subscription Expiry)</span>
                  </span>
                  <input
                    type="text"
                    value={editFormData.expiresAt}
                    onChange={(e) => setEditFormData({ ...editFormData, expiresAt: e.target.value })}
                    className="bg-slate-950 border border-slate-800 px-3 py-1 rounded-xl text-white font-mono text-xs outline-none focus:border-amber-500"
                  />
                </div>

                {/* Quick Expiry Presets */}
                <div className="flex items-center gap-1.5 flex-wrap pt-1">
                  <span className="text-[10px] text-slate-400">تمديد سريع:</span>
                  <button
                    type="button"
                    onClick={() => handleSetQuickExpiry(1)}
                    className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-[10px] text-slate-300 rounded-lg"
                  >
                    + شهر
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSetQuickExpiry(3)}
                    className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-[10px] text-slate-300 rounded-lg"
                  >
                    + 3 أشهر
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSetQuickExpiry(6)}
                    className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-[10px] text-slate-300 rounded-lg"
                  >
                    + 6 أشهر
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSetQuickExpiry(12)}
                    className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-[10px] text-slate-300 rounded-lg"
                  >
                    + سنة كاملة
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSetQuickExpiry('permanent')}
                    className="px-2 py-1 bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] rounded-lg"
                  >
                    دائم للأبد
                  </button>
                </div>
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => setEditingUser(null)}
                  className="px-4 py-2.5 bg-slate-900 text-slate-400 rounded-xl"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl transition-all"
                >
                  حفظ التعديلات وتحديث الاشتراك
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: SEND IN-APP NOTIFICATION */}
      {isNotifModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-950 border border-slate-800 rounded-3xl w-full max-w-lg p-6 space-y-5 shadow-2xl animate-in zoom-in-95 text-slate-100">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-black">
                  <Bell className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-black text-white">إرسال إشعار وتنبيه فوري</h3>
                  <span className="text-xs text-slate-400">
                    {isBroadcast ? 'إشعار عام لجميع المشتركين' : `إشعار مخصص لـ: ${notifTargetUser?.name}`}
                  </span>
                </div>
              </div>
              <button onClick={() => setIsNotifModalOpen(false)} className="p-2 text-slate-400 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleSendNotificationSubmit} className="space-y-4 text-xs font-bold">
              <div>
                <label className="block text-slate-300 mb-1">نوع الإشعار</label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setNotifType('success')}
                    className={`py-2 rounded-xl text-center border transition-all ${
                      notifType === 'success' ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500' : 'bg-slate-900 border-slate-800 text-slate-400'
                    }`}
                  >
                    ✓ نجاح وتفعيل
                  </button>
                  <button
                    type="button"
                    onClick={() => setNotifType('info')}
                    className={`py-2 rounded-xl text-center border transition-all ${
                      notifType === 'info' ? 'bg-blue-500/20 text-blue-300 border-blue-500' : 'bg-slate-900 border-slate-800 text-slate-400'
                    }`}
                  >
                    ℹ️ معلومة وتحديث
                  </button>
                  <button
                    type="button"
                    onClick={() => setNotifType('warning')}
                    className={`py-2 rounded-xl text-center border transition-all ${
                      notifType === 'warning' ? 'bg-amber-500/20 text-amber-300 border-amber-500' : 'bg-slate-900 border-slate-800 text-slate-400'
                    }`}
                  >
                    ⚠️ تنبيه وتذكير
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 mb-1">عنوان الإشعار *</label>
                <input
                  type="text"
                  required
                  value={notifTitle}
                  onChange={(e) => setNotifTitle(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 p-2.5 rounded-xl text-white outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1">نص الرسالة والتفاصيل *</label>
                <textarea
                  rows={3}
                  required
                  value={notifMessage}
                  onChange={(e) => setNotifMessage(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 p-2.5 rounded-xl text-white outline-none focus:border-blue-500 leading-relaxed"
                />
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsNotifModalOpen(false)}
                  className="px-4 py-2.5 bg-slate-900 text-slate-400 rounded-xl"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-black rounded-xl transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>إرسال الإشعار الآن</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: ADD NEW USER MANUALLY */}
      {isAddUserModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-950 border border-slate-800 rounded-3xl w-full max-w-md p-6 space-y-4 shadow-2xl animate-in zoom-in-95 text-slate-100">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-black text-white">إضافة حساب مستخدم جديد يدوياً</h3>
              <button onClick={() => setIsAddUserModalOpen(false)} className="p-2 text-slate-400 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleCreateUser} className="space-y-3 text-xs font-bold">
              <div>
                <label className="block text-slate-300 mb-1">الاسم الكامل *</label>
                <input
                  type="text"
                  required
                  placeholder="مثال: يوسف بلحاج"
                  value={newUserName}
                  onChange={(e) => setNewUserName(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 p-2.5 rounded-xl text-white outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1">اسم المؤسسة أو الورشة</label>
                <input
                  type="text"
                  placeholder="مثال: مؤسسة بلحاج للتشطيب"
                  value={newUserBusiness}
                  onChange={(e) => setNewUserBusiness(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 p-2.5 rounded-xl text-white outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-300 mb-1">رقم الهاتف (WhatsApp) *</label>
                  <input
                    type="text"
                    required
                    placeholder="0555123456"
                    value={newUserPhone}
                    onChange={(e) => setNewUserPhone(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 p-2.5 rounded-xl text-white outline-none focus:border-amber-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 mb-1">الخطة</label>
                  <select
                    value={newUserPlan}
                    onChange={(e) => setNewUserPlan(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 p-2.5 rounded-xl text-white outline-none focus:border-amber-500"
                  >
                    <option value="Pro">خطة Pro</option>
                    <option value="Business">خطة Business</option>
                    <option value="Free">خطة Free</option>
                  </select>
                </div>
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddUserModalOpen(false)}
                  className="px-4 py-2.5 bg-slate-900 text-slate-400 rounded-xl"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl transition-all"
                >
                  إنشاء الحساب وتفعيل الخطة
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
