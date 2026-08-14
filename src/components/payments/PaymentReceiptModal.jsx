import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  Printer,
  Share2,
  CheckCircle2,
  ShieldCheck,
  Building,
  DollarSign,
  QrCode,
  FileCheck
} from 'lucide-react';

export const PaymentReceiptModal = () => {
  const { receiptModalData, setReceiptModalData, user, formatDZD } = useApp();

  if (!receiptModalData) return null;

  const receipt = receiptModalData;

  const handlePrint = () => {
    window.print();
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent(`السلام عليكم، هذا وصل استلام الدفعة رقم ${receipt.receiptNumber} بمبلغ ${formatDZD(receipt.amount)} لصالح ${user.businessName}.`);
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[94vh] animate-in zoom-in-95">
        
        {/* Controls Bar (No Print) */}
        <div className="px-6 py-3.5 bg-slate-900 text-white flex items-center justify-between no-print">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-bold text-slate-200">
              سند قبض ووصل استلام رسمي (Reçu de Paiement)
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleWhatsApp}
              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>مشاركة واتساب</span>
            </button>
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>طباعة الوصل</span>
            </button>
            <button
              onClick={() => setReceiptModalData(null)}
              className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Receipt Body */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-6 bg-slate-50/50" id="printable-receipt">
          
          {/* Header */}
          <div className="flex items-start justify-between border-b-2 border-slate-200 pb-5">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 border border-emerald-200 rounded-full text-emerald-800 text-[11px] font-black mb-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>وصل استلام مالي مسجل</span>
              </div>
              <h2 className="text-xl font-black text-slate-900">{user.businessName}</h2>
              <p className="text-xs text-slate-500 font-medium">{user.address} | هاتف: {user.phone}</p>
            </div>

            <div className="text-right">
              <span className="text-[11px] text-slate-400 font-bold block">رقم السند:</span>
              <span className="text-lg font-black font-mono text-brand-700">{receipt.receiptNumber}</span>
              <span className="text-xs text-slate-500 font-mono block mt-1">التاريخ: {receipt.date}</span>
            </div>
          </div>

          {/* Parties & Details Grid */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-soft space-y-3 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <span className="text-slate-400 block font-bold text-[11px]">استلمنا من السيد / المؤسسة:</span>
                <span className="text-sm font-black text-slate-900">{receipt.clientName}</span>
              </div>
              <div>
                <span className="text-slate-400 block font-bold text-[11px]">مقابل الفاتورة / العرض:</span>
                <span className="text-sm font-black font-mono text-brand-600">{receipt.invoiceNumber}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-slate-100">
              <div>
                <span className="text-slate-400 block font-bold text-[11px]">طريقة الدفع:</span>
                <span className="font-black text-slate-800">{receipt.method}</span>
              </div>
              <div>
                <span className="text-slate-400 block font-bold text-[11px]">رقم المرجع / الإشعار:</span>
                <span className="font-mono font-bold text-slate-800">{receipt.reference || '—'}</span>
              </div>
            </div>

            {receipt.note && (
              <div className="pt-2 border-t border-slate-100">
                <span className="text-slate-400 block font-bold text-[11px]">بيان الدفعة:</span>
                <p className="text-slate-700 font-medium">{receipt.note}</p>
              </div>
            )}
          </div>

          {/* Amount Box */}
          <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white p-5 rounded-2xl shadow-card flex flex-col sm:flex-row items-center justify-between gap-3">
            <div>
              <span className="text-xs text-emerald-100 font-bold block">المبلغ المقبوض كاملاً:</span>
              <span className="text-2xl font-black font-mono tracking-tight">{formatDZD(receipt.amount)}</span>
            </div>
            <div className="text-left sm:text-right bg-white/10 px-4 py-2 rounded-xl backdrop-blur-sm border border-white/20">
              <span className="text-[10px] text-emerald-200 block">المبلغ كتابة بالحروف:</span>
              <span className="text-xs font-black">{receipt.amountInWords || `${formatDZD(receipt.amount)}`}</span>
            </div>
          </div>

          {/* Signature and Stamp Zone */}
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-200 text-center text-xs">
            <div className="p-4 bg-white rounded-2xl border border-slate-200">
              <span className="text-slate-400 font-bold block mb-8">توقيع المستلم (مقدم الخدمة)</span>
              <span className="font-black text-slate-800">{user.name}</span>
            </div>

            <div className="p-4 bg-white rounded-2xl border border-slate-200 flex flex-col items-center justify-center">
              <div className="w-16 h-16 rounded-full border-2 border-dashed border-emerald-400 flex items-center justify-center text-emerald-600 font-black text-[10px] text-center rotate-[-12deg]">
                ختم ومطابقة<br />Devisly
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
