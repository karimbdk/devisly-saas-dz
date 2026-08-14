import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import confetti from 'canvas-confetti';
import {
  X,
  CheckCircle2,
  Download,
  Share2,
  MessageSquare,
  Building,
  Phone,
  Mail,
  MapPin,
  Calendar,
  ShieldCheck,
  Printer,
  Sparkles,
  FileCheck,
  Send
} from 'lucide-react';

export const ClientPublicView = () => {
  const {
    publicPreviewDevis,
    setPublicPreviewDevis,
    updateDevisStatus,
    user,
    formatDZD,
    showToast
  } = useApp();

  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);
  const [feedbackText, setFeedbackText] = useState('');
  const [isAccepted, setIsAccepted] = useState(false);

  if (!publicPreviewDevis) return null;

  const devis = publicPreviewDevis;

  const handleAccept = () => {
    // Fire confetti celebration!
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 }
    });

    setIsAccepted(true);
    updateDevisStatus(devis.id, 'مقبول');
    showToast('تم تسجيل موافقتك على العرض بنجاح! تم إشعار مقدم الخدمة');
  };

  const handleSendFeedback = () => {
    if (!feedbackText.trim()) return;
    updateDevisStatus(devis.id, 'تعديل مطلوب', feedbackText);
    showToast('تم إرسال طلب التعديل لمقدم الخدمة');
    setFeedbackModalOpen(false);
    setFeedbackText('');
  };

  const handlePrint = () => {
    window.print();
  };

  const shareWhatsApp = () => {
    const text = encodeURIComponent(`السلام عليكم، تفضل رابط عرض السعر الخاص بكم رقم ${devis.number} بمبلغ إجمالي ${formatDZD(devis.total)}`);
    window.open(`https://wa.me/${devis.clientPhone?.replace(/\D/g, '')}?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      
      {/* Container */}
      <div className="bg-white rounded-3xl w-full max-w-4xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[94vh] animate-in zoom-in-95">
        
        {/* Top Control Bar (Non-print) */}
        <div className="px-6 py-3.5 bg-slate-900 text-white flex items-center justify-between no-print">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-xs font-bold text-slate-300">
              معاينة بوابة العميل العامة (Client Public Link)
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={shareWhatsApp}
              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>مشاركة عبر WhatsApp</span>
            </button>
            <button
              onClick={handlePrint}
              className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl transition-colors"
              title="طباعة / تصدير PDF"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={() => setPublicPreviewDevis(null)}
              className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Document Content */}
        <div className="p-6 sm:p-10 overflow-y-auto flex-1 space-y-8 bg-slate-50/40" id="printable-devis">
          
          {/* Header Banner */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 pb-6 border-b border-slate-200">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-teal-50 border border-teal-200 rounded-full text-teal-800 text-xs font-bold mb-3">
                <ShieldCheck className="w-4 h-4 text-teal-600" />
                <span>وثيقة معتمدة ومطابقة للمعايير</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                {user.businessName}
              </h1>
              <p className="text-xs text-slate-500 font-medium mt-1">
                بإدارة: {user.name} | {user.address}
              </p>
              <div className="flex flex-wrap gap-4 text-xs text-slate-600 mt-2 font-mono">
                <span>الهاتف: {user.phone}</span>
                <span>البريد: {user.email}</span>
                {user.nif && <span>NIF: {user.nif}</span>}
              </div>
            </div>

            {/* Document Meta Box */}
            <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm text-right space-y-1.5 min-w-[220px]">
              <div className="text-xs text-slate-400 font-bold">عرض سعر رقم</div>
              <div className="text-lg font-black text-brand-600 font-mono">{devis.number}</div>
              <div className="flex justify-between text-xs text-slate-600 pt-2 border-t border-slate-100">
                <span>التاريخ:</span>
                <span className="font-mono font-bold">{devis.date}</span>
              </div>
              <div className="flex justify-between text-xs text-slate-600">
                <span>الصلاحية:</span>
                <span className="font-mono font-bold text-amber-700">{devis.expiryDate}</span>
              </div>
            </div>
          </div>

          {/* Client Info Card */}
          <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-soft">
            <h3 className="text-xs font-black text-slate-400 uppercase mb-3">بيانات العميل المستفيد:</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <span className="text-[11px] text-slate-400 block font-bold">الاسم / المؤسسة:</span>
                <span className="text-sm font-black text-slate-900">{devis.clientName}</span>
              </div>
              <div>
                <span className="text-[11px] text-slate-400 block font-bold">رقم الهاتف:</span>
                <span className="text-xs font-mono font-bold text-slate-700">{devis.clientPhone || 'غير محدد'}</span>
              </div>
              <div>
                <span className="text-[11px] text-slate-400 block font-bold">العنوان:</span>
                <span className="text-xs font-bold text-slate-700">{devis.clientAddress || 'غير محدد'}</span>
              </div>
            </div>
          </div>

          {/* Items Table */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-soft overflow-hidden">
            <table className="w-full text-right border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-black text-slate-500 uppercase">
                  <th className="py-3 px-4">#</th>
                  <th className="py-3 px-4">وصف الخدمة أو المادة</th>
                  <th className="py-3 px-4 text-center">الوحدة</th>
                  <th className="py-3 px-4 text-center">الكمية</th>
                  <th className="py-3 px-4 text-left">السعر الأحادي</th>
                  <th className="py-3 px-4 text-left">الإجمالي</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs font-bold text-slate-700">
                {devis.items?.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50">
                    <td className="py-3.5 px-4 text-slate-400 font-mono">{idx + 1}</td>
                    <td className="py-3.5 px-4 text-slate-900 font-extrabold">{item.name}</td>
                    <td className="py-3.5 px-4 text-center text-slate-600">{item.unit}</td>
                    <td className="py-3.5 px-4 text-center font-mono font-bold text-slate-900">{item.quantity}</td>
                    <td className="py-3.5 px-4 text-left font-mono text-slate-600">{formatDZD(item.price)}</td>
                    <td className="py-3.5 px-4 text-left font-mono font-black text-slate-900">{formatDZD(item.total)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals & Terms */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Payment terms & notes */}
            <div className="p-5 bg-white rounded-2xl border border-slate-200 space-y-3 text-xs">
              <div>
                <h4 className="font-black text-slate-900 mb-1">شروط الدفع والتسليم:</h4>
                <p className="text-slate-600 leading-relaxed">{devis.paymentTerms || '30% عربون والباقي عند التسليم'}</p>
              </div>
              {devis.notes && (
                <div className="pt-2 border-t border-slate-100">
                  <h4 className="font-black text-slate-900 mb-1">ملاحظات إضافية:</h4>
                  <p className="text-slate-600 leading-relaxed">{devis.notes}</p>
                </div>
              )}
            </div>

            {/* Financial summary */}
            <div className="p-5 bg-slate-900 text-white rounded-2xl space-y-2.5 text-xs">
              <div className="flex justify-between text-slate-300">
                <span>المجموع الفرعي:</span>
                <span className="font-mono font-bold">{formatDZD(devis.subtotal)}</span>
              </div>
              {devis.discountValue > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <span>الخصم الممنوح:</span>
                  <span className="font-mono font-bold">-{formatDZD(devis.discountValue)}</span>
                </div>
              )}
              {devis.taxAmount > 0 && (
                <div className="flex justify-between text-slate-300">
                  <span>الضريبة (TVA):</span>
                  <span className="font-mono font-bold">+{formatDZD(devis.taxAmount)}</span>
                </div>
              )}
              <div className="pt-3 border-t border-slate-800 flex justify-between items-center">
                <span className="text-sm font-black">المجموع الصافي للدفع:</span>
                <span className="text-2xl font-black text-brand-400 font-mono">{formatDZD(devis.total)}</span>
              </div>
              {devis.depositRequired > 0 && (
                <div className="p-2.5 bg-slate-800/80 rounded-xl flex justify-between items-center text-amber-300 text-xs font-bold">
                  <span>العربون المطلوب لبدء الأشغال:</span>
                  <span className="font-mono">{formatDZD(devis.depositRequired)}</span>
                </div>
              )}
            </div>

          </div>

          {/* Client Action Acceptance Section (Interactive) */}
          <div className="p-6 bg-gradient-to-r from-brand-50 via-blue-50 to-teal-50 rounded-3xl border-2 border-brand-200 text-center space-y-4 no-print">
            
            {isAccepted || devis.status === 'مقبول' ? (
              <div className="py-4 space-y-2">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-md">
                  <CheckCircle2 className="w-8 h-8 stroke-[2.5]" />
                </div>
                <h3 className="text-xl font-black text-emerald-800">
                  تمت الموافقة وقبول عرض السعر رسمياً
                </h3>
                <p className="text-xs text-slate-600">
                  شكراً لك! سيتواصل معك فريق العمل قريباً لتنسيق بدء الأشغال.
                </p>
              </div>
            ) : (
              <>
                <div>
                  <h3 className="text-lg font-black text-slate-900">
                    هل يناسبك عرض السعر؟ وافق الآن لتأكيد الحجز وبدء العمل
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    بموافقتك، يتم إشعار مقدم الخدمة فوراً وتثبيت بنود الاتفاق.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    onClick={handleAccept}
                    className="w-full sm:w-auto px-8 py-3.5 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-sm font-black rounded-2xl shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 transition-all"
                  >
                    <CheckCircle2 className="w-5 h-5 stroke-[2.5]" />
                    <span>الموافقة وقبول عرض السعر</span>
                  </button>

                  <button
                    onClick={() => setFeedbackModalOpen(true)}
                    className="w-full sm:w-auto px-6 py-3.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 text-xs font-bold rounded-2xl shadow-sm flex items-center justify-center gap-2 transition-all"
                  >
                    <MessageSquare className="w-4 h-4 text-amber-600" />
                    <span>طلب تعديل أو استفسار</span>
                  </button>
                </div>
              </>
            )}

          </div>

        </div>

      </div>

      {/* Revision Request Feedback Modal */}
      {feedbackModalOpen && (
        <div className="fixed inset-0 z-60 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-slate-200 animate-in zoom-in-95 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-black text-slate-900 text-base">طلب تعديل على عرض السعر</h3>
              <button onClick={() => setFeedbackModalOpen(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-slate-500">
              اكتب التعديلات أو الاستفسارات التي تود مناقشتها مع مقدم الخدمة (مثلاً: الموعد، البنود، الأسعار).
            </p>
            <textarea
              rows="4"
              placeholder="اكتب ملاحظتك هنا..."
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
              className="w-full p-3 bg-slate-50 rounded-xl border border-slate-300 text-xs font-medium outline-none focus:border-brand-600"
            />
            <div className="flex gap-2">
              <button
                onClick={handleSendFeedback}
                className="flex-1 py-2.5 bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5"
              >
                <Send className="w-4 h-4 -scale-x-100" />
                <span>إرسال الطلب</span>
              </button>
              <button
                onClick={() => setFeedbackModalOpen(false)}
                className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl"
              >
                إلغاء
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
