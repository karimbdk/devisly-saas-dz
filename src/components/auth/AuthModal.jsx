import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  Lock,
  User,
  Building,
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Zap,
  CheckCircle2,
  KeyRound
} from 'lucide-react';

export const AuthModal = () => {
  const {
    isAuthModalOpen,
    setIsAuthModalOpen,
    authMode,
    setAuthMode,
    login,
    register,
    loginAdmin,
    quickLogin,
    accounts
  } = useApp();

  // Login state
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Register state
  const [regName, setRegName] = useState('');
  const [regBusiness, setRegBusiness] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regWilaya, setRegWilaya] = useState('الجزائر');
  const [regActivity, setRegActivity] = useState('تشطيب ودهان');
  const [regPassword, setRegPassword] = useState('');

  // Admin PIN state
  const [adminPin, setAdminPin] = useState('');

  if (!isAuthModalOpen) return null;

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    login(loginIdentifier, loginPassword);
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (!regName || !regPhone) return;

    register({
      name: regName,
      businessName: regBusiness || regName,
      phone: regPhone,
      email: regEmail,
      wilaya: regWilaya,
      activity: regActivity,
      password: regPassword || '123',
      plan: 'Free'
    });
  };

  const handleAdminSubmit = (e) => {
    e.preventDefault();
    loginAdmin(adminPin);
  };

  return (
    <div className="fixed inset-0 z-60 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto font-sans" dir="rtl">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden animate-in zoom-in-95 text-slate-100">
        
        {/* Header Tabs */}
        <div className="p-6 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2 bg-slate-900 p-1 rounded-2xl border border-slate-800 text-xs font-bold">
            <button
              onClick={() => setAuthMode('login')}
              className={`px-4 py-2 rounded-xl transition-all ${
                authMode === 'login' ? 'bg-brand-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              تسجيل الدخول
            </button>
            <button
              onClick={() => setAuthMode('register')}
              className={`px-4 py-2 rounded-xl transition-all ${
                authMode === 'register' ? 'bg-brand-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              حساب جديد
            </button>
            <button
              onClick={() => setAuthMode('admin')}
              className={`px-3 py-2 rounded-xl transition-all flex items-center gap-1 ${
                authMode === 'admin' ? 'bg-amber-500 text-slate-950 font-black shadow-md' : 'text-amber-400/70 hover:text-amber-300'
              }`}
              title="دخول الإدارة"
            >
              <Lock className="w-3 h-3" />
              <span>الإدارة</span>
            </button>
          </div>

          <button
            onClick={() => setIsAuthModalOpen(false)}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {/* 1. LOGIN FORM */}
          {authMode === 'login' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-black text-white">تسجيل الدخول لمساحة عملك</h3>
                <p className="text-xs text-slate-400 mt-1">ادخل بريدك الإلكتروني أو رقم هاتفك للوصول لعروضك وفواتيرك</p>
              </div>

              <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs font-bold">
                <div>
                  <label className="block text-slate-300 mb-1.5">البريد الإلكتروني أو رقم الهاتف</label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      placeholder="مثال: 0555123456 أو karim@alofok.dz"
                      value={loginIdentifier}
                      onChange={(e) => setLoginIdentifier(e.target.value)}
                      className="w-full bg-slate-800/80 border border-slate-700 pl-4 pr-10 py-3 rounded-2xl text-white outline-none focus:border-brand-500 font-mono text-xs"
                    />
                    <User className="w-4 h-4 text-slate-500 absolute right-3.5 top-1/2 -translate-y-1/2" />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 mb-1.5">كلمة المرور</label>
                  <div className="relative">
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      className="w-full bg-slate-800/80 border border-slate-700 pl-4 pr-10 py-3 rounded-2xl text-white outline-none focus:border-brand-500 font-mono text-xs"
                    />
                    <KeyRound className="w-4 h-4 text-slate-500 absolute right-3.5 top-1/2 -translate-y-1/2" />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-brand-600 hover:bg-brand-500 active:scale-95 text-white rounded-2xl font-black text-sm shadow-lg shadow-brand-600/30 transition-all flex items-center justify-center gap-2"
                >
                  <Zap className="w-4 h-4 fill-current" />
                  <span>دخول لمساحة العمل</span>
                </button>
              </form>

              {/* Quick Demo Switcher */}
              <div className="pt-4 border-t border-slate-800/80">
                <span className="text-[11px] font-bold text-slate-400 block mb-2.5">
                  أو جرّب الدخول السريع بحسابات تجريبية جاهزة:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => quickLogin('usr-1')}
                    className="p-2.5 bg-slate-800 hover:bg-slate-750 border border-slate-700 rounded-xl text-right transition-colors flex items-center justify-between"
                  >
                    <div>
                      <span className="font-black text-xs text-white block">كريم بن سالم (Pro)</span>
                      <span className="text-[10px] text-slate-400">مؤسسة الأفق للتشطيب</span>
                    </div>
                    <span className="text-[10px] bg-brand-500/20 text-brand-300 px-2 py-0.5 rounded-full font-bold">دخول</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => quickLogin('usr-3')}
                    className="p-2.5 bg-slate-800 hover:bg-slate-750 border border-slate-700 rounded-xl text-right transition-colors flex items-center justify-between"
                  >
                    <div>
                      <span className="font-black text-xs text-white block">سمير قادري (Business)</span>
                      <span className="text-[10px] text-slate-400">مؤسسة النور للكهرباء</span>
                    </div>
                    <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full font-bold">دخول</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 2. REGISTER FORM */}
          {authMode === 'register' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-black text-white">إنشاء حساب جديد مجاناً</h3>
                <p className="text-xs text-slate-400 mt-1">ابدأ فوراً بتنظيم عروضك وفواتيرك دون أي التزام مالي</p>
              </div>

              <form onSubmit={handleRegisterSubmit} className="space-y-3.5 text-xs font-bold">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 mb-1">الاسم الكامل *</label>
                    <input
                      type="text"
                      required
                      placeholder="مثال: يوسف بلحاج"
                      value={regName}
                      onChange={(e) => setRegName(e.target.value)}
                      className="w-full bg-slate-800/80 border border-slate-700 p-2.5 rounded-xl text-white outline-none focus:border-brand-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 mb-1">اسم النشاط أو المؤسسة</label>
                    <input
                      type="text"
                      placeholder="مثال: ورشة التميز للكهرباء"
                      value={regBusiness}
                      onChange={(e) => setRegBusiness(e.target.value)}
                      className="w-full bg-slate-800/80 border border-slate-700 p-2.5 rounded-xl text-white outline-none focus:border-brand-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 mb-1">رقم الهاتف (WhatsApp) *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+213 550 00 00 00"
                      value={regPhone}
                      onChange={(e) => setRegPhone(e.target.value)}
                      className="w-full bg-slate-800/80 border border-slate-700 p-2.5 rounded-xl text-white outline-none focus:border-brand-500 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 mb-1">الولاية</label>
                    <select
                      value={regWilaya}
                      onChange={(e) => setRegWilaya(e.target.value)}
                      className="w-full bg-slate-800/80 border border-slate-700 p-2.5 rounded-xl text-white outline-none focus:border-brand-500"
                    >
                      {['الجزائر', 'وهران', 'قسنطينة', 'سطيف', 'البليدة', 'عنابة', 'تلمسان', 'باتنة', 'بجاية', 'تيزي وزو'].map(w => (
                        <option key={w} value={w}>{w}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 mb-1">مجال النشاط الأساسي</label>
                    <input
                      type="text"
                      placeholder="مثال: تركيب مكيفات، دهان، كاميرات..."
                      value={regActivity}
                      onChange={(e) => setRegActivity(e.target.value)}
                      className="w-full bg-slate-800/80 border border-slate-700 p-2.5 rounded-xl text-white outline-none focus:border-brand-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 mb-1">كلمة المرور *</label>
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      className="w-full bg-slate-800/80 border border-slate-700 p-2.5 rounded-xl text-white outline-none focus:border-brand-500 font-mono"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white rounded-2xl font-black text-sm shadow-lg shadow-emerald-600/30 transition-all flex items-center justify-center gap-2 mt-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>تأكيد وإنشاء الحساب فوراً</span>
                </button>
              </form>
            </div>
          )}

          {/* 3. ADMIN PIN LOGIN */}
          {authMode === 'admin' && (
            <div className="space-y-6">
              <div className="text-center">
                <div className="w-14 h-14 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <Lock className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-black text-white">دخول الإدارة العليا (Super Admin)</h3>
                <p className="text-xs text-slate-400 mt-1">خاص بإدارة الحسابات وتفعيل المشتركين ومراجعة الدفعات</p>
              </div>

              <form onSubmit={handleAdminSubmit} className="space-y-4 text-xs font-bold max-w-xs mx-auto">
                <div>
                  <label className="block text-slate-300 mb-1.5 text-center">رمز المرور أو PIN الإدارة</label>
                  <input
                    type="password"
                    required
                    autoFocus
                    placeholder="ادخل PIN الإدارة (مثال: 1234 أو Bdktest4)"
                    value={adminPin}
                    onChange={(e) => setAdminPin(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 p-3 rounded-2xl text-white outline-none focus:border-amber-500 text-center font-mono text-sm tracking-widest"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-2xl font-black text-sm shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>فتح لوحة تحكم الإدارة</span>
                </button>
              </form>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
