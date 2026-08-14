import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  FileText,
  User,
  Building,
  Phone,
  Mail,
  MapPin,
  Lock,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Zap,
  Eye,
  EyeOff,
  ShieldCheck,
  Briefcase,
  Sparkles,
  ChevronLeft
} from 'lucide-react';

export const AuthPage = ({ initialMode = 'register', onClose }) => {
  const { login, register, quickLogin, accounts } = useApp();

  const [mode, setMode] = useState(initialMode); // 'login' | 'register'
  const [step, setStep] = useState(1); // 1: Personal Info, 2: Business Profile
  const [showPassword, setShowPassword] = useState(false);

  // Login form state
  const [loginEmailOrPhone, setLoginEmailOrPhone] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Registration form state
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    businessName: '',
    wilaya: 'الجزائر',
    activity: 'أعمال الكهرباء والتشطيب',
    nif: '',
    rc: ''
  });

  const algerianWilayas = [
    "01 - أدرار", "02 - الشلف", "03 - الأغواط", "04 - أم البواقي", "05 - باتنة",
    "06 - بجاية", "07 - بسكرة", "08 - بشار", "09 - البليدة", "10 - البويرة",
    "11 - تمنراست", "12 - تبسة", "13 - تلمسان", "14 - تيارت", "15 - تيزي وزو",
    "16 - الجزائر", "17 - الجلفة", "18 - جيجل", "19 - سطيف", "20 - سعيدة",
    "21 - سكيكدة", "22 - سيدي بلعباس", "23 - عنابة", "24 - قالمة", "25 - قسنطينة",
    "26 - المدية", "27 - مستغانم", "28 - المسيلة", "29 - معسكر", "30 - ورقلة",
    "31 - وهران", "32 - البيض", "33 - إليزي", "34 - برج بوعريريج", "35 - بومرداس",
    "36 - الطارف", "37 - تندوف", "38 - تسمسيلت", "39 - الوادي", "40 - خنشلة",
    "41 - سوق أهراس", "42 - تيبازة", "43 - ميلة", "44 - عين الدفلى", "45 - النعامة",
    "46 - عين تموشنت", "47 - غرداية", "48 - غليزان", "49 - تيميمون", "50 - برج باجي مختار",
    "51 - أولاد جلال", "52 - بني عباس", "53 - عين صالح", "54 - عين قزام", "55 - تقرت",
    "56 - جانت", "57 - المغير", "58 - المنيعة"
  ];

  const handleLogin = (e) => {
    e.preventDefault();
    login(loginEmailOrPhone, loginPassword);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    register({
      name: formData.name,
      businessName: formData.businessName || formData.name,
      phone: formData.phone,
      email: formData.email,
      password: formData.password || '123',
      wilaya: formData.wilaya,
      activity: formData.activity,
      nif: formData.nif,
      rc: formData.rc,
      plan: 'Free'
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto font-sans" dir="rtl">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-4xl shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[600px] animate-in zoom-in-95 text-slate-100">
        
        {/* Left Side: Brand Showcase & Value Proposition */}
        <div className="hidden md:flex md:w-5/12 bg-gradient-to-br from-brand-950 via-slate-900 to-navy-950 p-8 flex-col justify-between border-l border-slate-800 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-600/10 rounded-full blur-3xl pointer-events-none" />
          
          <div>
            <div className="flex items-center gap-2.5 mb-8">
              <div className="w-10 h-10 rounded-2xl bg-brand-600 flex items-center justify-center text-white shadow-lg shadow-brand-500/20">
                <FileText className="w-5 h-5 stroke-[2.5]" />
              </div>
              <span className="text-2xl font-black text-white tracking-tight">
                Devis<span className="text-brand-500">ly</span>
              </span>
            </div>

            <div className="space-y-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-500/10 border border-brand-500/30 rounded-full text-[11px] font-black text-brand-300">
                <Sparkles className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                <span>المنظومة الأولى للخدمات في الجزائر</span>
              </div>

              <h2 className="text-2xl font-black text-white leading-snug">
                انضم لمئات الحرفيين وأصحاب المؤسسات الخدمية في الجزائر
              </h2>

              <p className="text-xs text-slate-300 leading-relaxed font-medium">
                حوّل طريقة عملك اليومية إلى نظام رقمي محترف يزيد من سرعة موافقة زبائنك ويضمن تحصيل أموالك في وقتها.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-2.5 text-xs text-slate-200 font-bold">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[10px]">✓</div>
                  <span>عروض أسعار وفواتير بالدينار الجزائري (DZD)</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-slate-200 font-bold">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[10px]">✓</div>
                  <span>روابط واتساب تفاعلية وسندات قبض بالتفقيط</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-slate-200 font-bold">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[10px]">✓</div>
                  <span>طباعة فورية A4 و A5 و Thermal 80mm</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800 text-[11px] text-slate-400">
            <p className="font-bold text-slate-200 mb-1">💬 رأي حرفي:</p>
            <p className="italic">«من نهار بديت نبعث ديفي بـ Devisly الزبائن ولاو يوافقو في نفس النهار وبلا تفاوض زايد.»</p>
            <span className="block text-[10px] text-brand-400 font-bold mt-1.5">— سمير، مقاول كهرباء، وهران</span>
          </div>
        </div>

        {/* Right Side: Auth Forms */}
        <div className="flex-1 p-6 sm:p-10 flex flex-col justify-between bg-slate-900">
          
          {/* Top Bar with Mode Switcher & Close */}
          <div className="flex items-center justify-between pb-6 border-b border-slate-800">
            <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-2xl border border-slate-800 text-xs font-black">
              <button
                type="button"
                onClick={() => { setMode('register'); setStep(1); }}
                className={`px-4 py-2 rounded-xl transition-all ${
                  mode === 'register' ? 'bg-brand-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
                }`}
              >
                إنشاء حساب جديد
              </button>
              <button
                type="button"
                onClick={() => setMode('login')}
                className={`px-4 py-2 rounded-xl transition-all ${
                  mode === 'login' ? 'bg-brand-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
                }`}
              >
                تسجيل الدخول
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
            >
              ✕
            </button>
          </div>

          {/* 1. LOGIN MODE */}
          {mode === 'login' && (
            <div className="py-6 space-y-6 animate-in fade-in">
              <div>
                <h3 className="text-xl font-black text-white">تسجيل الدخول إلى حسابك</h3>
                <p className="text-xs text-slate-400 mt-1">ادخل رقم الهاتف أو البريد الإلكتروني للوصول إلى مساحة عملك</p>
              </div>

              <form onSubmit={handleLogin} className="space-y-4 text-xs font-bold">
                <div>
                  <label className="block text-slate-300 mb-1.5">رقم الهاتف أو البريد الإلكتروني</label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      placeholder="0555 12 34 56 أو contact@domain.dz"
                      value={loginEmailOrPhone}
                      onChange={(e) => setLoginEmailOrPhone(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 pl-4 pr-10 py-3 rounded-2xl text-white outline-none focus:border-brand-500 font-mono text-xs"
                    />
                    <User className="w-4 h-4 text-slate-500 absolute right-3.5 top-1/2 -translate-y-1/2" />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 mb-1.5">كلمة المرور</label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      placeholder="••••••••"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 pl-10 pr-10 py-3 rounded-2xl text-white outline-none focus:border-brand-500 font-mono text-xs"
                    />
                    <Lock className="w-4 h-4 text-slate-500 absolute right-3.5 top-1/2 -translate-y-1/2" />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
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
            </div>
          )}

          {/* 2. MULTI-STEP REGISTRATION */}
          {mode === 'register' && (
            <div className="py-4 space-y-5 animate-in fade-in">
              
              {/* Step Progress Bar */}
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h3 className="text-lg font-black text-white">
                    {step === 1 ? 'الخطوة 1: معلوماتك الشخصية' : 'الخطوة 2: هوية ونشاط المؤسسة'}
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    {step === 1 ? 'ادخل بيانات الاتصال لتأكيد حسابك' : 'تظهر هذه البيانات أعلى عروض الأسعار والفواتير'}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 font-mono text-xs font-black text-brand-400 bg-brand-500/10 px-3 py-1 rounded-full border border-brand-500/20">
                  <span>{step}</span>
                  <span>/</span>
                  <span>2</span>
                </div>
              </div>

              <form onSubmit={step === 1 ? (e) => { e.preventDefault(); setStep(2); } : handleRegister} className="space-y-3.5 text-xs font-bold">
                
                {/* STEP 1: Personal Contact */}
                {step === 1 && (
                  <div className="space-y-3 animate-in fade-in">
                    <div>
                      <label className="block text-slate-300 mb-1">الاسم الكامل *</label>
                      <div className="relative">
                        <input
                          type="text"
                          required
                          placeholder="مثال: يوسف بلحاج"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full bg-slate-950 border border-slate-800 pl-4 pr-10 py-2.5 rounded-xl text-white outline-none focus:border-brand-500"
                        />
                        <User className="w-4 h-4 text-slate-500 absolute right-3.5 top-1/2 -translate-y-1/2" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-slate-300 mb-1">رقم الهاتف (WhatsApp) *</label>
                      <div className="relative">
                        <input
                          type="tel"
                          required
                          placeholder="+213 550 12 34 56"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full bg-slate-950 border border-slate-800 pl-4 pr-10 py-2.5 rounded-xl text-white outline-none focus:border-brand-500 font-mono"
                        />
                        <Phone className="w-4 h-4 text-slate-500 absolute right-3.5 top-1/2 -translate-y-1/2" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-slate-300 mb-1">البريد الإلكتروني (اختياري)</label>
                      <div className="relative">
                        <input
                          type="email"
                          placeholder="contact@domain.dz"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full bg-slate-950 border border-slate-800 pl-4 pr-10 py-2.5 rounded-xl text-white outline-none focus:border-brand-500 font-mono"
                        />
                        <Mail className="w-4 h-4 text-slate-500 absolute right-3.5 top-1/2 -translate-y-1/2" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-slate-300 mb-1">كلمة المرور *</label>
                      <div className="relative">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          required
                          placeholder="اختر كلمة مرور آمنة"
                          value={formData.password}
                          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                          className="w-full bg-slate-950 border border-slate-800 pl-10 pr-10 py-2.5 rounded-xl text-white outline-none focus:border-brand-500 font-mono"
                        />
                        <Lock className="w-4 h-4 text-slate-500 absolute right-3.5 top-1/2 -translate-y-1/2" />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 bg-brand-600 hover:bg-brand-500 text-white rounded-2xl font-black text-xs shadow-lg shadow-brand-600/30 transition-all flex items-center justify-center gap-2 mt-4"
                    >
                      <span>المتابعة لخطوة النشاط والمؤسسة</span>
                      <ArrowRight className="w-4 h-4 rotate-180" />
                    </button>
                  </div>
                )}

                {/* STEP 2: Business & Activity Info */}
                {step === 2 && (
                  <div className="space-y-3 animate-in fade-in">
                    <div>
                      <label className="block text-slate-300 mb-1">اسم المؤسسة أو الورشة *</label>
                      <div className="relative">
                        <input
                          type="text"
                          required
                          placeholder="مثال: ورشة التميز للأشغال العامة والتشطيب"
                          value={formData.businessName}
                          onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                          className="w-full bg-slate-950 border border-slate-800 pl-4 pr-10 py-2.5 rounded-xl text-white outline-none focus:border-brand-500"
                        />
                        <Building className="w-4 h-4 text-slate-500 absolute right-3.5 top-1/2 -translate-y-1/2" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-slate-300 mb-1">الولاية *</label>
                        <select
                          value={formData.wilaya}
                          onChange={(e) => setFormData({ ...formData, wilaya: e.target.value })}
                          className="w-full bg-slate-950 border border-slate-800 p-2.5 rounded-xl text-white outline-none focus:border-brand-500"
                        >
                          {algerianWilayas.map(w => (
                            <option key={w} value={w}>{w}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-slate-300 mb-1">مجال النشاط الأساسي</label>
                        <input
                          type="text"
                          placeholder="مثال: كهرباء، ألمنيوم، كاميرات"
                          value={formData.activity}
                          onChange={(e) => setFormData({ ...formData, activity: e.target.value })}
                          className="w-full bg-slate-950 border border-slate-800 p-2.5 rounded-xl text-white outline-none focus:border-brand-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-slate-300 mb-1">رقم السجل التجاري RC (اختياري)</label>
                        <input
                          type="text"
                          placeholder="مثال: 16/00-1234567"
                          value={formData.rc}
                          onChange={(e) => setFormData({ ...formData, rc: e.target.value })}
                          className="w-full bg-slate-950 border border-slate-800 p-2.5 rounded-xl text-white outline-none focus:border-brand-500 font-mono text-[11px]"
                        />
                      </div>

                      <div>
                        <label className="block text-slate-300 mb-1">الرقم الجبائي NIF (اختياري)</label>
                        <input
                          type="text"
                          placeholder="مثال: 001916000000000"
                          value={formData.nif}
                          onChange={(e) => setFormData({ ...formData, nif: e.target.value })}
                          className="w-full bg-slate-950 border border-slate-800 p-2.5 rounded-xl text-white outline-none focus:border-brand-500 font-mono text-[11px]"
                        />
                      </div>
                    </div>

                    <div className="pt-2 flex gap-2">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="px-4 py-3 bg-slate-800 hover:bg-slate-750 text-slate-300 rounded-xl font-bold transition-all"
                      >
                        ← رجوع
                      </button>
                      <button
                        type="submit"
                        className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-black text-xs shadow-lg shadow-emerald-600/30 transition-all flex items-center justify-center gap-2"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>إتمام التسجيل وبدء العمل فوراً</span>
                      </button>
                    </div>
                  </div>
                )}

              </form>
            </div>
          )}

          {/* Footer note */}
          <div className="pt-4 border-t border-slate-800/80 text-center text-[10px] text-slate-500">
            بتسجيلك أنت توافق على شروط الاستخدام وسياسة الخصوصية لمنصة Devisly الجزائر 🇩🇿
          </div>

        </div>

      </div>
    </div>
  );
};
