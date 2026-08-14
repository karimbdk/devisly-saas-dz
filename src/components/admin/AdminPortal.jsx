import React, { useState } from 'react';
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
  UserCheck
} from 'lucide-react';

export const AdminPortal = () => {
  const {
    formatDZD,
    showToast,
    accounts,
    impersonateUser,
    logoutAdmin,
    upgradePlan
  } = useApp();

  const [activeAdminTab, setActiveAdminTab] = useState('users'); // 'users' | 'requests'
  const [search, setSearch] = useState('');

  // Local accounts state synced from context
  const [adminAccounts, setAdminAccounts] = useState(accounts);

  // 2. Payment Requests State
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
      date: "2024-05-21 14:30",
      status: "بانتظار المراجعة",
      notes: "تم إرسال وصل بريدي موب عبر واتساب"
    },
    {
      id: "req-880",
      number: "#REQ-2024-880",
      userName: "فاتح بوخالفة",
      userPhone: "+213 658 44 33 22",
      userEmail: "fateh@hadada.dz",
      planName: "Pro",
      billingCycle: "شهري",
      amount: 1500,
      paymentMethod: "تحويل بريدي CCP",
      reference: "CCP-487125",
      date: "2024-05-20 11:15",
      status: "مفعل",
      notes: "تم التحقق وتفعيل الخطة"
    },
    {
      id: "req-879",
      number: "#REQ-2024-879",
      userName: "سمير قادري",
      userPhone: "+213 770 11 22 33",
      userEmail: "samir@nour.dz",
      planName: "Business",
      billingCycle: "شهري",
      amount: 3500,
      paymentMethod: "البطاقة الذهبية (Chargily Pay)",
      reference: "CHRG-991204",
      date: "2024-05-19 16:00",
      status: "مفعل",
      notes: "دفع إلكتروني آلي"
    }
  ]);

  // Modal: Add New User
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [newUserName, setNewUserName] = useState('');
  const [newUserBusiness, setNewUserBusiness] = useState('');
  const [newUserPhone, setNewUserPhone] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserWilaya, setNewUserWilaya] = useState('الجزائر');
  const [newUserPlan, setNewUserPlan] = useState('Pro');

  const handleCreateUser = (e) => {
    e.preventDefault();
    if (!newUserName || !newUserPhone) return;

    const created = {
      id: `usr-${Date.now()}`,
      name: newUserName,
      businessName: newUserBusiness || newUserName,
      phone: newUserPhone,
      email: newUserEmail || `${newUserPhone.replace(/\D/g, '')}@devisly.dz`,
      password: '123',
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

    const updated = [created, ...adminAccounts];
    setAdminAccounts(updated);
    localStorage.setItem('devisly_accounts', JSON.stringify(updated));
    showToast(`تم إنشاء حساب المستخدم ${newUserName} وتفعيل خطة ${newUserPlan} بنجاح!`);
    setIsAddUserModalOpen(false);
    setNewUserName('');
    setNewUserBusiness('');
    setNewUserPhone('');
    setNewUserEmail('');
  };

  const handleToggleUserStatus = (userId) => {
    const updated = adminAccounts.map(u => {
      if (u.id === userId) {
        const nextStatus = u.status === 'نشط' ? 'معطل' : 'نشط';
        showToast(`تم تغيير حالة الحساب إلى: ${nextStatus}`);
        return { ...u, status: nextStatus };
      }
      return u;
    });
    setAdminAccounts(updated);
    localStorage.setItem('devisly_accounts', JSON.stringify(updated));
  };

  const handleChangeUserPlan = (userId, nextPlan) => {
    const updated = adminAccounts.map(u => {
      if (u.id === userId) {
        showToast(`تمت ترقية خطة ${u.name} إلى: ${nextPlan}`);
        return {
          ...u,
          plan: nextPlan,
          expiresAt: nextPlan === 'Free' ? 'دائم' : '2027-05-20'
        };
      }
      return u;
    });
    setAdminAccounts(updated);
    localStorage.setItem('devisly_accounts', JSON.stringify(updated));
  };

  const handleApproveRequest = (req) => {
    setRequests(prev => prev.map(r => r.id === req.id ? { ...r, status: "مفعل" } : r));
    upgradePlan(req.planName);
    showToast(`تمت الموافقة على طلب الدفع ${req.number} وتفعيل خطة ${req.planName} للمستخدم فورياً!`);
  };

  const filteredUsers = adminAccounts.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    (u.businessName && u.businessName.toLowerCase().includes(search.toLowerCase())) ||
    u.phone.includes(search)
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
                  لوحة تحكم الإدارة العليا (Super Admin Portal)
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-white mt-1">
                إدارة المشتركين، الخطط والتحصيلات
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={logoutAdmin}
              className="px-4 py-2 bg-slate-800 hover:bg-rose-900/30 text-slate-300 hover:text-rose-300 text-xs font-bold rounded-xl border border-slate-700 transition-all flex items-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>تسجيل خروج الإدارة</span>
            </button>
          </div>
        </div>

        {/* Global SaaS Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="bg-slate-950 border border-slate-800 p-5 rounded-2xl">
            <span className="text-xs text-slate-400 font-bold block">إجمالي المشتركين المسجلين</span>
            <span className="text-2xl font-black text-white font-mono mt-1 block">{adminAccounts.length} حساب</span>
          </div>

          <div className="bg-slate-950 border border-slate-800 p-5 rounded-2xl">
            <span className="text-xs text-slate-400 font-bold block">الاشتراكات المدفوعة (Pro / Business)</span>
            <span className="text-2xl font-black text-emerald-400 font-mono mt-1 block">
              {adminAccounts.filter(u => u.plan !== 'Free' && u.status === 'نشط').length} نشط
            </span>
          </div>

          <div className="bg-slate-950 border border-slate-800 p-5 rounded-2xl">
            <span className="text-xs text-slate-400 font-bold block">الدخل الشهري المتكرر (MRR)</span>
            <span className="text-2xl font-black text-amber-400 font-mono mt-1 block">
              {formatDZD(totalMRR)}
            </span>
          </div>

          <div className="bg-slate-950 border border-slate-800 p-5 rounded-2xl">
            <span className="text-xs text-slate-400 font-bold block">طلبات دفع WhatsApp المعلقة</span>
            <span className="text-2xl font-black text-purple-400 font-mono mt-1 block">
              {requests.filter(r => r.status === 'بانتظار المراجعة').length} طلب
            </span>
          </div>
        </div>

        {/* Admin Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
          <button
            onClick={() => setActiveAdminTab('users')}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${
              activeAdminTab === 'users' ? 'bg-brand-600 text-white shadow-md' : 'bg-slate-800/80 text-slate-400 hover:text-white'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>إدارة حسابات المستخدمين ({adminAccounts.length})</span>
          </button>

          <button
            onClick={() => setActiveAdminTab('requests')}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${
              activeAdminTab === 'requests' ? 'bg-brand-600 text-white shadow-md' : 'bg-slate-800/80 text-slate-400 hover:text-white'
            }`}
          >
            <CreditCard className="w-4 h-4" />
            <span>طلبات الدفع والوصولات ({requests.length})</span>
          </button>
        </div>

        {/* TAB 1: USERS CRM */}
        {activeAdminTab === 'users' && (
          <div className="space-y-4 animate-in fade-in">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-950 p-4 rounded-2xl border border-slate-800">
              <div className="relative w-full sm:w-80">
                <input
                  type="text"
                  placeholder="بحث باسم الحساب أو الهاتف أو المؤسسة..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-slate-900 pl-4 pr-10 py-2 rounded-xl border border-slate-700 text-xs font-bold text-white outline-none focus:border-brand-500"
                />
                <Search className="w-4 h-4 text-slate-500 absolute right-3.5 top-1/2 -translate-y-1/2" />
              </div>

              <button
                onClick={() => setIsAddUserModalOpen(true)}
                className="w-full sm:w-auto px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black rounded-xl shadow-md flex items-center justify-center gap-1.5 transition-all"
              >
                <Plus className="w-4 h-4 stroke-[3]" />
                <span>إنشاء حساب وتفعيل اشتراك جديد</span>
              </button>
            </div>

            {/* Users Table */}
            <div className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-right border-collapse text-xs font-bold">
                  <thead>
                    <tr className="bg-slate-900 border-b border-slate-800 text-[11px] font-black text-slate-400 uppercase">
                      <th className="py-3.5 px-4 whitespace-nowrap">المستخدم / المؤسسة</th>
                      <th className="py-3.5 px-4 whitespace-nowrap">الهاتف والولاية</th>
                      <th className="py-3.5 px-4 whitespace-nowrap">الخطة الحالية</th>
                      <th className="py-3.5 px-4 whitespace-nowrap">تاريخ الانتهاء</th>
                      <th className="py-3.5 px-4 text-center whitespace-nowrap">الحالة</th>
                      <th className="py-3.5 px-4 text-center whitespace-nowrap">دخول الحساب</th>
                      <th className="py-3.5 px-4 text-center whitespace-nowrap">إجراءات</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-slate-300">
                    {filteredUsers.map((u) => (
                      <tr key={u.id} className="hover:bg-slate-900/60">
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <span className="font-black text-white text-sm block">{u.name}</span>
                          <span className="text-[11px] text-slate-400">{u.businessName}</span>
                        </td>
                        <td className="py-3.5 px-4 whitespace-nowrap font-mono text-slate-400">
                          <span className="block text-slate-200">{u.phone}</span>
                          <span className="text-[10px] text-brand-400">{u.wilaya || 'الجزائر'}</span>
                        </td>
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <select
                            value={u.plan}
                            onChange={(e) => handleChangeUserPlan(u.id, e.target.value)}
                            className={`px-2.5 py-1 rounded-lg text-xs font-black border outline-none bg-slate-900 ${
                              u.plan === 'Pro' ? 'text-brand-400 border-brand-500/40' :
                              u.plan === 'Business' ? 'text-amber-400 border-amber-500/40' :
                              'text-slate-400 border-slate-700'
                            }`}
                          >
                            <option value="Free">خطة Free</option>
                            <option value="Pro">خطة Pro (1,500 دج)</option>
                            <option value="Business">خطة Business (3,500 دج)</option>
                          </select>
                        </td>
                        <td className="py-3.5 px-4 whitespace-nowrap font-mono text-slate-400">{u.expiresAt}</td>
                        <td className="py-3.5 px-4 text-center whitespace-nowrap">
                          <span className={`px-2.5 py-1 rounded-lg text-xs font-black border ${
                            u.status === 'نشط' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                          }`}>
                            {u.status}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-center whitespace-nowrap">
                          <button
                            onClick={() => impersonateUser(u.id)}
                            className="px-3 py-1 bg-brand-600 hover:bg-brand-500 text-white rounded-lg text-xs font-black inline-flex items-center gap-1 shadow-sm transition-all"
                            title="دخول مساحة عمل هذا المستخدم مباشرة"
                          >
                            <LogIn className="w-3.5 h-3.5" />
                            <span>دخول للحساب</span>
                          </button>
                        </td>
                        <td className="py-3.5 px-4 text-center whitespace-nowrap">
                          <div className="flex items-center justify-center gap-1.5">
                            <button
                              onClick={() => handleToggleUserStatus(u.id)}
                              className={`p-1.5 rounded-lg text-xs transition-colors ${
                                u.status === 'نشط' ? 'text-rose-400 hover:bg-rose-500/20' : 'text-emerald-400 hover:bg-emerald-500/20'
                              }`}
                              title={u.status === 'نشط' ? 'تعطيل الحساب' : 'تفعيل الحساب'}
                            >
                              <Power className="w-4 h-4" />
                            </button>

                            <a
                              href={`https://wa.me/${u.phone.replace(/\D/g, '')}`}
                              target="_blank"
                              rel="noreferrer"
                              className="p-1.5 text-emerald-400 hover:bg-emerald-500/20 rounded-lg transition-colors"
                              title="محادثة المستخدم على WhatsApp"
                            >
                              <MessageSquare className="w-4 h-4" />
                            </a>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PAYMENT REQUESTS */}
        {activeAdminTab === 'requests' && (
          <div className="space-y-4 animate-in fade-in">
            <div className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-right border-collapse text-xs font-bold">
                  <thead>
                    <tr className="bg-slate-900 border-b border-slate-800 text-[11px] font-black text-slate-400 uppercase">
                      <th className="py-3.5 px-4 whitespace-nowrap">رقم الطلب</th>
                      <th className="py-3.5 px-4 whitespace-nowrap">المستخدم</th>
                      <th className="py-3.5 px-4 whitespace-nowrap">الخطة المطلوبة</th>
                      <th className="py-3.5 px-4 whitespace-nowrap">طريقة التحويل</th>
                      <th className="py-3.5 px-4 whitespace-nowrap">المرجع</th>
                      <th className="py-3.5 px-4 whitespace-nowrap">المبلغ</th>
                      <th className="py-3.5 px-4 text-center whitespace-nowrap">الحالة</th>
                      <th className="py-3.5 px-4 text-center whitespace-nowrap">إجراءات المراجعة والتفعيل</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-slate-300">
                    {requests.map((req) => (
                      <tr key={req.id} className="hover:bg-slate-900/60">
                        <td className="py-3.5 px-4 font-mono font-black text-brand-400 whitespace-nowrap">{req.number}</td>
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <span className="font-black text-white block">{req.userName}</span>
                          <span className="text-[10px] text-slate-400 font-mono">{req.userPhone}</span>
                        </td>
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <span className="px-2 py-0.5 rounded-md bg-brand-500/20 text-brand-300 text-[11px] font-black border border-brand-500/30">
                            {req.planName} ({req.billingCycle})
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-slate-400 whitespace-nowrap">{req.paymentMethod}</td>
                        <td className="py-3.5 px-4 font-mono text-slate-400 whitespace-nowrap">{req.reference}</td>
                        <td className="py-3.5 px-4 font-mono font-black text-white whitespace-nowrap">{formatDZD(req.amount)}</td>
                        <td className="py-3.5 px-4 text-center whitespace-nowrap">
                          <span className={`px-2.5 py-1 rounded-lg text-xs font-black border ${
                            req.status === 'مفعل' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' :
                            req.status === 'مرفوض' ? 'bg-rose-500/10 text-rose-400 border-rose-500/30' :
                            'bg-amber-500/10 text-amber-400 border-amber-500/30'
                          }`}>
                            {req.status}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-center whitespace-nowrap">
                          <div className="flex items-center justify-center gap-1.5">
                            {req.status === 'بانتظار المراجعة' ? (
                              <button
                                onClick={() => handleApproveRequest(req)}
                                className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-black flex items-center gap-1 shadow-md transition-all"
                              >
                                <Check className="w-3.5 h-3.5 stroke-[3]" />
                                <span>تفعيل فوري</span>
                              </button>
                            ) : (
                              <span className="text-slate-500 text-xs font-bold">تمت المعالجة</span>
                            )}

                            <a
                              href={`https://wa.me/${req.userPhone.replace(/\D/g, '')}`}
                              target="_blank"
                              rel="noreferrer"
                              className="p-1.5 text-emerald-400 hover:bg-emerald-500/20 rounded-lg transition-colors"
                              title="محادثة المستخدم على WhatsApp"
                            >
                              <MessageSquare className="w-4 h-4" />
                            </a>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Modal: Create User */}
        {isAddUserModalOpen && (
          <div className="fixed inset-0 z-60 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="font-black text-white text-base">إنشاء حساب مستخدم جديد وتفعيل الخطة</h3>
                <button onClick={() => setIsAddUserModalOpen(false)} className="text-slate-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateUser} className="space-y-3 text-xs font-bold text-slate-300">
                <div>
                  <label className="block mb-1">اسم الحرفي أو صاحب المؤسسة *</label>
                  <input
                    type="text"
                    required
                    placeholder="مثال: يوسف بلحاج"
                    value={newUserName}
                    onChange={(e) => setNewUserName(e.target.value)}
                    className="w-full p-2.5 bg-slate-800 rounded-xl border border-slate-700 text-white outline-none focus:border-brand-500"
                  />
                </div>

                <div>
                  <label className="block mb-1">اسم المؤسسة أو الورشة</label>
                  <input
                    type="text"
                    placeholder="مثال: ورشة التميز للكهرباء والتكييف"
                    value={newUserBusiness}
                    onChange={(e) => setNewUserBusiness(e.target.value)}
                    className="w-full p-2.5 bg-slate-800 rounded-xl border border-slate-700 text-white outline-none focus:border-brand-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block mb-1">رقم الهاتف *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+213 550 11 22 33"
                      value={newUserPhone}
                      onChange={(e) => setNewUserPhone(e.target.value)}
                      className="w-full p-2.5 bg-slate-800 rounded-xl border border-slate-700 text-white outline-none focus:border-brand-500 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block mb-1">الولاية</label>
                    <select
                      value={newUserWilaya}
                      onChange={(e) => setNewUserWilaya(e.target.value)}
                      className="w-full p-2.5 bg-slate-800 rounded-xl border border-slate-700 text-white outline-none focus:border-brand-500"
                    >
                      {['الجزائر', 'وهران', 'قسنطينة', 'سطيف', 'البليدة', 'عنابة', 'تلمسان', 'باتنة', 'بجاية', 'تيزي وزو'].map(w => (
                        <option key={w} value={w}>{w}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block mb-1">البريد الإلكتروني (اختياري)</label>
                  <input
                    type="email"
                    placeholder="contact@domain.dz"
                    value={newUserEmail}
                    onChange={(e) => setNewUserEmail(e.target.value)}
                    className="w-full p-2.5 bg-slate-800 rounded-xl border border-slate-700 text-white outline-none focus:border-brand-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block mb-1">خطة الاشتراك وتاريخ التفعيل *</label>
                  <select
                    value={newUserPlan}
                    onChange={(e) => setNewUserPlan(e.target.value)}
                    className="w-full p-2.5 bg-slate-800 rounded-xl border border-slate-700 text-white outline-none focus:border-brand-500"
                  >
                    <option value="Free">خطة مجانية (Free)</option>
                    <option value="Pro">خطة المحترفين (Pro — سنة كاملة)</option>
                    <option value="Business">خطة الشركات (Business)</option>
                  </select>
                </div>

                <div className="pt-3 flex gap-2">
                  <button
                    type="submit"
                    className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-black transition-all"
                  >
                    إنشاء وتفعيل الحساب فوراً
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsAddUserModalOpen(false)}
                    className="px-4 py-3 bg-slate-800 hover:bg-slate-700 text-slate-400 rounded-xl"
                  >
                    إلغاء
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
