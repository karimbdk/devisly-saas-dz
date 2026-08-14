import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  Check,
  Sparkles,
  CreditCard,
  QrCode,
  Building,
  ShieldCheck,
  Zap,
  ArrowLeft
} from 'lucide-react';

export const UpgradeSubscriptionModal = () => {
  const { isUpgradeModalOpen, setIsUpgradeModalOpen, user, upgradePlan, formatDZD } = useApp();

  const [selectedPlan, setSelectedPlan] = useState('Pro');
  const [billingCycle, setBillingCycle] = useState('monthly'); // 'monthly' | 'yearly'
  const [paymentMethod, setPaymentMethod] = useState('chargily'); // 'chargily' | 'baridimob' | 'ccp'
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isUpgradeModalOpen) return null;

  const plans = [
    {
      id: 'Free',
      name: 'الخطة المجانية',
      priceMonthly: 0,
      priceYearly: 0,
      features: [
        '3 عروض أسعار شهرياً',
        '3 فواتير شهرياً',
        'حتى 10 عملاء',
        'قالب PDF قياسي واحد',
        'رابط عام للعميل'
      ]
    },
    {
      id: 'Pro',
      name: 'خطة المحترفين Pro',
      priceMonthly: 1500,
      priceYearly: 15000,
      badge: 'الأكثر طلباً',
      features: [
        'عروض أسعار غير محدودة شهرياً',
        'فواتير وسندات قبض غير محدودة',
        'عملاء ودليل خدمات غير محدود',
        'إزالة علامة Devisly المائية',
        '4 قوالب PDF حصرية ومخصصة',
        'تسجيل الدفعات وسندات القبض',
        'تصدير البيانات والتقارير المالية'
      ]
    },
    {
      id: 'Business',
      name: 'خطة الشركات Business',
      priceMonthly: 3500,
      priceYearly: 35000,
      features: [
        'كل ميزات Pro',
        'إدارة فرق العمل والصلاحيات',
        'دعم فني مخصص وأولوية',
        'تخصيص الهوية والشعار المتقدم',
        'ربط بوابات الدفع الإلكتروني'
      ]
    }
  ];

  const currentPrice = selectedPlan === 'Pro' 
    ? (billingCycle === 'monthly' ? 1500 : 15000)
    : selectedPlan === 'Business'
    ? (billingCycle === 'monthly' ? 3500 : 35000)
    : 0;

  const handleSubscribe = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      upgradePlan(selectedPlan);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white rounded-3xl w-full max-w-4xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[94vh] animate-in zoom-in-95">
        
        {/* Header */}
        <div className="px-6 py-5 bg-gradient-to-r from-brand-900 via-navy-900 to-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-400/20 border border-amber-400/30 flex items-center justify-center text-amber-400">
              <Sparkles className="w-5 h-5 fill-amber-400" />
            </div>
            <div>
              <h2 className="text-lg font-black tracking-tight">خطط اشتراك Devisly الجزائر</h2>
              <p className="text-xs text-slate-300">طوّر أعمالك وأرسل عروض وفواتير غير محدودة مع بوابات الدفع المحلية</p>
            </div>
          </div>

          <button
            onClick={() => setIsUpgradeModalOpen(false)}
            className="p-2 text-slate-400 hover:text-white rounded-xl"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1">
          
          {/* Billing Cycle Toggle */}
          <div className="flex items-center justify-center">
            <div className="bg-slate-100 p-1 rounded-2xl flex items-center border border-slate-200 text-xs font-black">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-4 py-2 rounded-xl transition-all ${
                  billingCycle === 'monthly' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                اشتراك شهري
              </button>
              <button
                onClick={() => setBillingCycle('yearly')}
                className={`px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
                  billingCycle === 'yearly' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                <span>اشتراك سنوي</span>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">شهران مجاناً 🎁</span>
              </button>
            </div>
          </div>

          {/* Plans Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {plans.map((p) => {
              const isSelected = selectedPlan === p.id;
              const isCurrent = user.plan === p.id;
              const price = billingCycle === 'monthly' ? p.priceMonthly : p.priceYearly;

              return (
                <div
                  key={p.id}
                  onClick={() => setSelectedPlan(p.id)}
                  className={`rounded-3xl p-5 border-2 transition-all cursor-pointer flex flex-col justify-between relative ${
                    isSelected
                      ? 'border-brand-600 bg-brand-50/30 shadow-card'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  {p.badge && (
                    <span className="absolute -top-3 right-6 px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[10px] font-black rounded-full shadow-sm">
                      {p.badge}
                    </span>
                  )}

                  <div>
                    <h3 className="font-black text-slate-900 text-base">{p.name}</h3>
                    <div className="my-3 font-mono">
                      <span className="text-2xl font-black text-slate-900">{formatDZD(price)}</span>
                      <span className="text-xs text-slate-500 font-sans font-bold"> / {billingCycle === 'monthly' ? 'شهر' : 'سنة'}</span>
                    </div>

                    <ul className="space-y-2 text-xs text-slate-600 my-4 border-t border-slate-100 pt-3">
                      {p.features.map((feat, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 stroke-[3]" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    type="button"
                    className={`w-full py-2.5 rounded-xl text-xs font-black transition-all ${
                      isSelected
                        ? 'bg-brand-600 text-white shadow-md'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {isCurrent ? 'خطتك الحالية' : isSelected ? 'تم الاختيار' : 'اختيار هذه الخطة'}
                  </button>
                </div>
              );
            })}
          </div>

          {/* Payment Methods Section (for paid plans) */}
          {selectedPlan !== 'Free' && (
            <div className="p-6 bg-slate-50 rounded-3xl border border-slate-200 space-y-4">
              <h4 className="text-sm font-black text-slate-900">طريقة الدفع المعتمدة في الجزائر:</h4>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Method 1: Chargily Pay */}
                <div
                  onClick={() => setPaymentMethod('chargily')}
                  className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                    paymentMethod === 'chargily'
                      ? 'border-teal-600 bg-white shadow-soft'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-2.5 mb-2">
                    <CreditCard className="w-5 h-5 text-teal-600" />
                    <span className="font-black text-slate-900 text-xs">البطاقة الذهبية / CIB</span>
                  </div>
                  <p className="text-[11px] text-slate-500">دفع فوري آمن عبر Chargily Pay مع تفعيل لحظي</p>
                </div>

                {/* Method 2: BaridiMob */}
                <div
                  onClick={() => setPaymentMethod('baridimob')}
                  className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                    paymentMethod === 'baridimob'
                      ? 'border-amber-600 bg-white shadow-soft'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-2.5 mb-2">
                    <QrCode className="w-5 h-5 text-amber-600" />
                    <span className="font-black text-slate-900 text-xs">تطبيق بريدي موب BaridiMob</span>
                  </div>
                  <p className="text-[11px] text-slate-500">مسح QR Code أو التحويل لـ RIP: 00799999002148754112</p>
                </div>

                {/* Method 3: CCP Account */}
                <div
                  onClick={() => setPaymentMethod('ccp')}
                  className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                    paymentMethod === 'ccp'
                      ? 'border-blue-600 bg-white shadow-soft'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-2.5 mb-2">
                    <Building className="w-5 h-5 text-blue-600" />
                    <span className="font-black text-slate-900 text-xs">تحويل حساب بريدي CCP</span>
                  </div>
                  <p className="text-[11px] text-slate-500">الحساب: 2148754 Clé 89 باسم: مؤسسة Devisly SARL</p>
                </div>
              </div>

              {paymentMethod === 'baridimob' && (
                <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-900 flex items-center justify-between">
                  <div>
                    <span className="font-black block">رقم RIP بريدي موب للدفع:</span>
                    <span className="font-mono font-bold text-slate-900 text-sm">007 99999 0021487541 12</span>
                  </div>
                  <div className="px-3 py-1.5 bg-amber-200/70 rounded-xl font-bold text-[11px]">
                    التفعيل خلال 5 دقائق
                  </div>
                </div>
              )}
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>ضمان استرجاع الأموال خلال 14 يوماً</span>
          </div>

          <button
            onClick={handleSubscribe}
            disabled={isProcessing}
            className="px-8 py-3 bg-brand-600 hover:bg-brand-700 active:scale-95 text-white font-black text-xs rounded-xl shadow-md transition-all flex items-center gap-2"
          >
            {isProcessing ? (
              <span>جاري المعالجة وتفعيل الخطة...</span>
            ) : (
              <>
                <span>تأكيد الاشتراك في {selectedPlan} ({formatDZD(currentPrice)})</span>
                <Zap className="w-4 h-4 fill-white" />
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
