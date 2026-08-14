import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  FileText,
  CheckCircle2,
  XCircle,
  Zap,
  Printer,
  Smartphone,
  ShieldCheck,
  ArrowRight,
  TrendingUp,
  Receipt,
  Users,
  Wallet,
  Clock,
  Sparkles,
  MessageSquare,
  LogIn,
  UserPlus,
  ChevronDown,
  ChevronUp,
  Camera,
  Wrench,
  Scissors,
  Laptop,
  Check,
  Share2,
  ExternalLink,
  HelpCircle,
  Send,
  Eye,
  ArrowUpRight
} from 'lucide-react';

export const LandingPage = ({ onOpenAuth }) => {
  const { formatDZD } = useApp();
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  const faqs = [
    {
      q: "هل نقدر نخدم بـ Devisly من التيليفون مباشرة؟",
      a: "نعم وبكل سهولة! تم تحسين منصة Devisly لتعمل بسرعة فائقة على متصفح الهاتف، بحيث تقدر تحضر الديفي وتبعثه للزبون عبر WhatsApp وأنت في الشانطي أو في الورشة."
    },
    {
      q: "هل توجد خطة مجانية حقيقية؟",
      a: "نعم، الخطة المجانية (Free) مجانية للأبد دون الحاجة لأي بطاقة بنكية، وتتيح لك تجربة المنصة وتوليد عروض أسعارك وفواتيرك الأساسية."
    },
    {
      q: "كيفاش يوصل عرض السعر للزبون؟",
      a: "بمجرد حفظ العرض، تضغط على زر 'إرسال عبر WhatsApp' ليصل لزبونك رابط تفاعلي مباشر يفتحه من هاتفه ليرى الوثيقة بوضوح ويضغط على زر 'الموافقة وقبول العرض'."
    },
    {
      q: "هل يدعم التطبيق الطباعة الحرارية والمقاسات العادية؟",
      a: "نعم، مركز الطباعة يدعم 3 مقاسات معتمدة في الجزائر: A4 للشركات الرسمية، A5 لسندات القبض المقتضبة، و Thermal 80mm للإيصالات الحرارية السريعة."
    },
    {
      q: "كيفاش نخلّص اشتراك خطة Pro في الجزائر؟",
      a: "نوفر أسهل الطرق المحلية: تطبيق بريدي موب BaridiMob، تحويل بريدي CCP، أو البطاقة الذهبية / CIB عبر Chargily Pay مع تفعيل فوري للاشتراك."
    }
  ];

  return (
    <div className="min-h-screen bg-[#070B19] text-slate-100 flex flex-col font-sans selection:bg-brand-500 selection:text-white relative overflow-hidden" dir="rtl">
      
      {/* Background Ambient Glows & Dynamic Mesh */}
      <div className="absolute -top-40 right-1/4 w-[600px] h-[500px] bg-blue-600/15 rounded-full blur-[140px] pointer-events-none animate-glow" />
      <div className="absolute top-1/3 -left-40 w-[500px] h-[450px] bg-cyan-500/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[400px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* 1. Top Navigation Bar */}
      <header className="sticky top-0 z-40 bg-[#070B19]/85 backdrop-blur-xl border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center gap-2.5 cursor-pointer group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-10 h-10 rounded-xl bg-brand-600 flex items-center justify-center text-white shadow-lg shadow-brand-500/30 group-hover:scale-105 transition-transform">
              <FileText className="w-5 h-5 stroke-[2.5]" />
            </div>
            <span className="text-2xl font-black text-white tracking-tight">
              Devis<span className="text-brand-500">ly</span>
            </span>
          </div>

          {/* Center Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 text-xs font-bold text-slate-300">
            <a href="#" className="text-white relative py-2 border-b-2 border-brand-500 transition-colors">
              الرئيسية
            </a>
            <a href="#features" className="hover:text-brand-400 transition-colors">المميزات</a>
            <a href="#how-it-works" className="hover:text-brand-400 transition-colors">كيف يعمل</a>
            <a href="#print" className="hover:text-brand-400 transition-colors">القوالب والطباعة</a>
            <a href="#pricing" className="hover:text-brand-400 transition-colors">الأسعار</a>
            <a href="#faq" className="hover:text-brand-400 transition-colors">الأسئلة الشائعة</a>
          </nav>

          {/* Left Action Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => onOpenAuth('login')}
              className="px-4 py-2 text-xs font-bold text-slate-300 hover:text-white bg-slate-900/90 hover:bg-slate-800 rounded-xl border border-slate-700/80 transition-all"
            >
              تسجيل الدخول
            </button>

            <button
              onClick={() => onOpenAuth('register')}
              className="px-5 py-2.5 bg-brand-600 hover:bg-brand-500 active:scale-95 text-white font-black text-xs rounded-xl shadow-lg shadow-brand-600/30 transition-all flex items-center gap-1.5"
            >
              <span>ابدأ مجاناً</span>
            </button>
          </div>

        </div>
      </header>

      {/* 2. Hero Section (Ultra-Premium Split Screen matching uploaded reference image) */}
      <section className="relative pt-12 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">
        
        {/* RIGHT COLUMN: Copywriting & CTAs */}
        <div className="lg:w-5/12 text-right space-y-6 z-10">
          
          {/* Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-slate-900/90 border border-slate-700/70 rounded-full text-xs font-bold text-slate-300 shadow-sm backdrop-blur-md">
            <span>منصة عروض الأسعار والفواتير لأصحاب الخدمات</span>
          </div>

          {/* Big Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-[52px] font-black text-white tracking-tight leading-[1.2]">
            عرضك احترافي.<br />
            حساباتك واضحة.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-brand-400">
              ودفعاتك تحت عينك.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
            أنشئ عروض الأسعار والفواتير من الهاتف أو الكمبيوتر، اطبعها أو ابعتها عبر WhatsApp، وتابع العربون والمبلغ المتبقي بلا فوضى.
          </p>

          {/* CTA Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
            <button
              onClick={() => onOpenAuth('register')}
              className="px-8 py-4 bg-brand-600 hover:bg-brand-500 text-white font-black text-sm rounded-2xl shadow-xl shadow-brand-600/30 flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95"
            >
              <span>ابدأ مجاناً</span>
              <ArrowLeft className="w-4 h-4" />
            </button>

            <button
              onClick={() => onOpenAuth('register')}
              className="px-6 py-4 bg-slate-900/90 hover:bg-slate-800 text-slate-200 font-bold text-xs sm:text-sm rounded-2xl border border-slate-700/80 transition-all flex items-center justify-center gap-2"
            >
              <FileText className="w-4 h-4 text-slate-400" />
              <span>شاهد نموذج فاتورة</span>
            </button>
          </div>

          {/* Microcopy Trust */}
          <div className="pt-2 text-xs text-slate-400 font-medium flex items-center gap-2">
            <span>بدون بطاقة بنكية</span>
            <span>•</span>
            <span>عربي وفرنسي</span>
            <span>•</span>
            <span>يعمل من الهاتف</span>
          </div>
        </div>

        {/* LEFT COLUMN: Visual Showcase (Dashboard + Overlapping Phone + Floating Badges) */}
        <div className="lg:w-7/12 relative w-full flex items-center justify-center z-10">
          
          {/* Main Desktop Dashboard Window */}
          <div className="w-full bg-[#0D1527]/95 border border-slate-700/70 rounded-3xl p-5 sm:p-6 shadow-2xl shadow-blue-950/40 relative overflow-hidden backdrop-blur-xl">
            
            {/* Top Window Bar */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-800/80 mb-5">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
                <span className="text-[11px] text-slate-400 font-bold mr-2">لوحة التحكم</span>
              </div>
              <span className="text-[10px] text-slate-400 bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800">
                آخر 30 يوم ▾
              </span>
            </div>

            {/* KPI Cards Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-5 text-right">
              <div className="bg-[#090F1E] p-3 rounded-xl border border-slate-800/80">
                <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1">
                  <span>قيمة العروض</span>
                  <span className="text-emerald-400 text-[9px] font-bold">15% ↑</span>
                </div>
                <span className="text-xs sm:text-sm font-black text-white font-mono block">300,000 دج</span>
              </div>

              <div className="bg-[#090F1E] p-3 rounded-xl border border-slate-800/80">
                <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1">
                  <span>نسبة القبول</span>
                  <span className="text-emerald-400 text-[9px] font-bold">8% ↑</span>
                </div>
                <span className="text-xs sm:text-sm font-black text-white font-mono block">68%</span>
              </div>

              <div className="bg-[#090F1E] p-3 rounded-xl border border-slate-800/80">
                <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1">
                  <span>المبالغ المحصلة</span>
                  <span className="text-emerald-400 text-[9px] font-bold">12% ↑</span>
                </div>
                <span className="text-xs sm:text-sm font-black text-emerald-400 font-mono block">175,000 دج</span>
              </div>

              <div className="bg-[#090F1E] p-3 rounded-xl border border-slate-800/80">
                <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1">
                  <span>المبالغ المتبقية</span>
                  <span className="text-slate-500 text-[9px]">-</span>
                </div>
                <span className="text-xs sm:text-sm font-black text-cyan-400 font-mono block">125,000 دج</span>
              </div>
            </div>

            {/* Glowing Chart Visual */}
            <div className="bg-[#090F1E] p-4 rounded-2xl border border-slate-800/80 mb-5">
              <div className="flex items-center justify-between text-xs font-bold text-slate-400 mb-3">
                <span>نظرة عامة على العروض</span>
                <span className="text-[10px] text-brand-400">ماي 2024</span>
              </div>

              <div className="h-28 w-full relative">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 400 100" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="glowGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.35" />
                      <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  {/* Fill Area */}
                  <path
                    d="M 0,90 Q 50,80 100,55 T 200,60 T 300,30 T 400,15 L 400,100 L 0,100 Z"
                    fill="url(#glowGrad)"
                  />
                  {/* Glowing Stroke Line */}
                  <path
                    d="M 0,90 Q 50,80 100,55 T 200,60 T 300,30 T 400,15"
                    fill="none"
                    stroke="#38BDF8"
                    strokeWidth="3"
                    className="drop-shadow-[0_0_8px_rgba(56,189,248,0.6)]"
                  />
                  {/* Marker Points */}
                  <circle cx="100" cy="55" r="4" fill="#FFFFFF" stroke="#38BDF8" strokeWidth="2" />
                  <circle cx="200" cy="60" r="4" fill="#FFFFFF" stroke="#38BDF8" strokeWidth="2" />
                  <circle cx="300" cy="30" r="4" fill="#FFFFFF" stroke="#38BDF8" strokeWidth="2" />
                  <circle cx="400" cy="15" r="5" fill="#38BDF8" stroke="#FFFFFF" strokeWidth="2" />
                </svg>
              </div>

              <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-2">
                <span>01 ماي</span>
                <span>08 ماي</span>
                <span>15 ماي</span>
                <span>22 ماي</span>
                <span>29 ماي</span>
              </div>
            </div>

            {/* Mini Quotes Table */}
            <div className="space-y-2">
              <div className="flex justify-between text-[11px] font-bold text-slate-400 px-2 pb-1">
                <span>آخر العروض</span>
                <span>المبلغ والحالة</span>
              </div>

              <div className="p-2.5 bg-[#090F1E] rounded-xl border border-slate-800 flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-white block">مؤسسة البناء الحديث</span>
                  <span className="text-[10px] text-slate-500 font-mono">QT-2024-058</span>
                </div>
                <div className="text-left flex items-center gap-3">
                  <span className="font-mono font-bold text-white">125,000 دج</span>
                  <span className="text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                    مقبول
                  </span>
                </div>
              </div>

              <div className="p-2.5 bg-[#090F1E] rounded-xl border border-slate-800 flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-white block">ورشة الأمل للنجارة</span>
                  <span className="text-[10px] text-slate-500 font-mono">QT-2024-057</span>
                </div>
                <div className="text-left flex items-center gap-3">
                  <span className="font-mono font-bold text-white">75,000 دج</span>
                  <span className="text-[10px] font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30 px-2 py-0.5 rounded-full">
                    تمت المشاهدة
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* Overlapping iPhone Smartphone Simulator */}
          <div className="hidden sm:block absolute -left-8 -bottom-6 w-60 bg-[#060A17] border-4 border-slate-700/80 rounded-[36px] p-3.5 shadow-2xl z-20 shadow-black/80 animate-float-delayed">
            {/* Speaker & Camera Notch */}
            <div className="w-16 h-3.5 bg-slate-900 rounded-full mx-auto mb-3" />
            
            <div className="space-y-3 text-right">
              <div className="border-b border-slate-800 pb-2 flex justify-between items-center text-[10px]">
                <span className="font-mono text-slate-400">#QT-2024-058</span>
                <span className="font-bold text-slate-200">عرض سعر</span>
              </div>

              <div>
                <span className="text-[10px] text-slate-400 block">العميل:</span>
                <span className="text-xs font-black text-white block">مؤسسة البناء الحديث</span>
              </div>

              <div className="p-2 bg-slate-900 rounded-xl text-center border border-slate-800">
                <span className="text-[10px] text-slate-400 block">المجموع الكلي</span>
                <span className="text-base font-black text-cyan-400 font-mono">125,000 دج</span>
              </div>

              <div className="space-y-1 text-[10px] text-slate-300">
                <div className="flex justify-between">
                  <span className="text-slate-500">المبلغ الإجمالي:</span>
                  <span className="font-mono">150,000 دج</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">الخصم:</span>
                  <span className="font-mono text-amber-400">10%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">العربون المستحق:</span>
                  <span className="font-mono text-emerald-400 font-bold">40,000 دج</span>
                </div>
              </div>

              <button
                onClick={() => onOpenAuth('register')}
                className="w-full py-2 bg-brand-600 hover:bg-brand-500 text-white rounded-xl text-[11px] font-black flex items-center justify-center gap-1.5 shadow-md"
              >
                <Send className="w-3 h-3" />
                <span>إرسال للعميل (WhatsApp)</span>
              </button>
            </div>
          </div>

          {/* Floating Badge 1: Top Left "✓ تم قبول العرض" */}
          <div className="absolute -top-4 -left-4 sm:left-4 z-30 bg-slate-900/90 border border-emerald-500/40 text-emerald-300 px-3.5 py-1.5 rounded-full text-xs font-black shadow-lg shadow-emerald-950/40 flex items-center gap-1.5 backdrop-blur-md animate-float">
            <span className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[10px]">✓</span>
            <span>تم قبول العرض</span>
          </div>

          {/* Floating Badge 2: Bottom Left "تم تسجيل عربون 40,000 دج" */}
          <div className="absolute -bottom-10 right-4 sm:right-10 z-30 bg-slate-900/90 border border-brand-500/40 text-brand-200 px-4 py-2 rounded-2xl text-xs font-black shadow-xl shadow-brand-950/40 flex items-center gap-2 backdrop-blur-md animate-float">
            <div className="w-6 h-6 rounded-lg bg-brand-500/20 text-brand-400 flex items-center justify-center">
              <Wallet className="w-3.5 h-3.5" />
            </div>
            <div>
              <span className="block text-[10px] text-slate-400 font-normal">سند قبض فوري</span>
              <span>تم تسجيل عربون 40,000 دج</span>
            </div>
          </div>

        </div>

      </section>

      {/* 3. Section 3: "كل ما تحتاجه لتنظم خدمتك" (3 Glassmorphism Cards as in Reference) */}
      <section id="features" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        
        {/* Section Title with Decorative Lines */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <div className="h-px bg-gradient-to-l from-transparent via-slate-700 to-slate-700 w-24 sm:w-48" />
          <h2 className="text-lg sm:text-2xl font-black text-white text-center">
            كل ما تحتاجه لتنظم خدمتك
          </h2>
          <div className="h-px bg-gradient-to-r from-transparent via-slate-700 to-slate-700 w-24 sm:w-48" />
        </div>

        {/* 3 Main Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1 */}
          <div className="bg-[#0C1222]/80 border border-slate-800/90 hover:border-slate-700 p-7 rounded-3xl space-y-4 text-right transition-all hover:scale-[1.02] shadow-xl backdrop-blur-md">
            <div className="w-12 h-12 rounded-2xl bg-brand-500/10 text-brand-400 border border-brand-500/20 flex items-center justify-center">
              <FileText className="w-6 h-6 stroke-[2.2]" />
            </div>
            <h3 className="text-lg font-black text-white">عروض وفواتير احترافية</h3>
            <p className="text-xs text-slate-400 leading-relaxed font-normal">
              قوالب جاهزة وقابلة للتخصيص تعكس هوية عملك وتزيد ثقة عملائك.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-[#0C1222]/80 border border-slate-800/90 hover:border-slate-700 p-7 rounded-3xl space-y-4 text-right transition-all hover:scale-[1.02] shadow-xl backdrop-blur-md">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 flex items-center justify-center">
              <Printer className="w-6 h-6 stroke-[2.2]" />
            </div>
            <h3 className="text-lg font-black text-white">طباعة A4 و A5 و 80mm</h3>
            <p className="text-xs text-slate-400 leading-relaxed font-normal">
              اطبع فواتيرك وعروضك بالمقاسات التي تناسبك، بوضوح واحترافية.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-[#0C1222]/80 border border-slate-800/90 hover:border-slate-700 p-7 rounded-3xl space-y-4 text-right transition-all hover:scale-[1.02] shadow-xl backdrop-blur-md">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center">
              <Wallet className="w-6 h-6 stroke-[2.2]" />
            </div>
            <h3 className="text-lg font-black text-white">العربون والدفعات تحت السيطرة</h3>
            <p className="text-xs text-slate-400 leading-relaxed font-normal">
              سجل العربون، تابع الدفعات، اعرف المتبقي، وتلقى إشعارات بكل حركة.
            </p>
          </div>

        </div>
      </section>

      {/* 4. Pricing Plans */}
      <section id="pricing" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-800/60">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-xs font-black text-brand-400 uppercase tracking-wider mb-2">خطط شفافة ومناسبة للجميع</h2>
          <p className="text-2xl sm:text-3xl font-black text-white">اختر خطتك وابدأ العمل باحترافية</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {/* Free */}
          <div className="bg-[#0C1222] border border-slate-800 p-7 rounded-3xl flex flex-col justify-between space-y-6">
            <div>
              <span className="text-xs font-black text-slate-400 block mb-1">الخطة المجانية</span>
              <h3 className="text-2xl font-black text-white">Free</h3>
              <div className="mt-3 mb-6">
                <span className="text-3xl font-black text-white font-mono">0 دج</span>
                <span className="text-xs text-slate-400 mr-1">/ شهرياً للأبد</span>
              </div>
              <ul className="space-y-2.5 text-xs text-slate-300 font-bold">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>5 عروض أسعار شهرياً</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>3 فواتير وسندات قبض</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>دليل خدمات حتى 10 بنود</span>
                </li>
              </ul>
            </div>
            <button onClick={() => onOpenAuth('register')} className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-white text-xs font-black rounded-xl transition-all">
              ابدأ مجاناً
            </button>
          </div>

          {/* Pro */}
          <div className="bg-gradient-to-b from-brand-950 to-[#0C1222] border-2 border-brand-500 p-7 rounded-3xl flex flex-col justify-between space-y-6 relative shadow-2xl shadow-brand-500/20">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-brand-500 text-white text-[10px] font-black px-4 py-1 rounded-full uppercase tracking-wider">
              الأكثر طلباً للمحترفين
            </div>
            <div>
              <span className="text-xs font-black text-brand-300 block mb-1">خطة المحترفين</span>
              <h3 className="text-2xl font-black text-white">Pro</h3>
              <div className="mt-3 mb-6">
                <span className="text-3xl font-black text-white font-mono">1,500 دج</span>
                <span className="text-xs text-slate-400 mr-1">/ شهرياً</span>
              </div>
              <ul className="space-y-2.5 text-xs text-slate-200 font-bold">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-400" />
                  <span>عروض وفواتير غير محدودة</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-400" />
                  <span>إزالة العلامة المائية وتخصيص الشعار</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-400" />
                  <span>مركز الطباعة A4 و A5 و Thermal</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-400" />
                  <span>سندات قبض بالتفقيط والختم المعتمد</span>
                </li>
              </ul>
            </div>
            <button onClick={() => onOpenAuth('register')} className="w-full py-3.5 bg-brand-600 hover:bg-brand-500 text-white text-xs font-black rounded-xl shadow-lg shadow-brand-600/30 transition-all active:scale-95">
              اشترك في خطة Pro
            </button>
          </div>

          {/* Business */}
          <div className="bg-[#0C1222] border border-slate-800 p-7 rounded-3xl flex flex-col justify-between space-y-6">
            <div>
              <span className="text-xs font-black text-amber-400 block mb-1">خطة الشركات والفرق</span>
              <h3 className="text-2xl font-black text-white">Business</h3>
              <div className="mt-3 mb-6">
                <span className="text-3xl font-black text-white font-mono">3,500 دج</span>
                <span className="text-xs text-slate-400 mr-1">/ شهرياً</span>
              </div>
              <ul className="space-y-2.5 text-xs text-slate-300 font-bold">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400" />
                  <span>كل ميزات خطة Pro</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400" />
                  <span>إدارة فرق العمل والموظفين</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400" />
                  <span>دعم فني مخصص ذو أولوية</span>
                </li>
              </ul>
            </div>
            <button onClick={() => onOpenAuth('register')} className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-white text-xs font-black rounded-xl transition-all">
              تواصل لحساب الشركات
            </button>
          </div>
        </div>
      </section>

      {/* 5. FAQ Section */}
      <section id="faq" className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto border-t border-slate-800/60">
        <div className="text-center mb-12">
          <h2 className="text-xs font-black text-brand-400 uppercase tracking-wider mb-2">الأسئلة الشائعة</h2>
          <p className="text-2xl sm:text-3xl font-black text-white">كل ما تريد معرفته حول Devisly</p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-[#0C1222] border border-slate-800 rounded-2xl overflow-hidden">
              <button
                onClick={() => setOpenFaqIndex(openFaqIndex === idx ? -1 : idx)}
                className="w-full p-5 text-right font-black text-sm text-white flex items-center justify-between hover:text-brand-400 transition-colors"
              >
                <span>{faq.q}</span>
                {openFaqIndex === idx ? <ChevronUp className="w-4 h-4 text-brand-400" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
              </button>
              {openFaqIndex === idx && (
                <div className="px-5 pb-5 text-xs text-slate-400 leading-relaxed border-t border-slate-900 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 6. Footer */}
      <footer className="bg-[#050814] border-t border-slate-800/80 py-10 px-4 sm:px-6 lg:px-8 text-xs text-slate-500 text-center">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-brand-600 text-white flex items-center justify-center font-black text-xs">
              D
            </div>
            <span className="font-bold text-slate-300 text-sm">Devisly الجزائر — منصة عروض الأسعار والفوترة للخدمات المحلية</span>
          </div>
          <p>© 2026 Devisly DZ. جميع الحقوق محفوظة.</p>
        </div>
      </footer>

    </div>
  );
};
