import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Printer,
  X,
  FileText,
  Receipt,
  Smartphone,
  CheckCircle2,
  Download,
  Languages,
  Eye,
  Sliders
} from 'lucide-react';

export const PrintCenterModal = ({ documentData, documentType = 'devis', onClose }) => {
  const { user, formatDZD } = useApp();

  const [paperSize, setPaperSize] = useState('A4'); // 'A4' | 'A5' | 'Thermal80'
  const [printLang, setPrintLang] = useState('ar'); // 'ar' | 'fr' | 'bilingual'
  const [showLogo, setShowLogo] = useState(true);
  const [showStamp, setShowStamp] = useState(true);
  const [showSignature, setShowSignature] = useState(true);
  const [copiesCount, setCopiesCount] = useState(1);

  if (!documentData) return null;

  const doc = documentData;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-60 bg-slate-900/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white rounded-3xl w-full max-w-5xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[94vh] animate-in zoom-in-95">
        
        {/* Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between no-print">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-brand-600 flex items-center justify-center text-white">
              <Printer className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-black">مركز الطباعة الذكي (Print Center Pro)</h2>
              <p className="text-xs text-slate-400">تخصيص مقاس الورق (A4 / A5 / Thermal)، اللغة والختم</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-5 py-2.5 bg-brand-600 hover:bg-brand-700 active:scale-95 text-white font-black text-xs rounded-xl shadow-md flex items-center gap-2 transition-all"
            >
              <Printer className="w-4 h-4" />
              <span>طباعة المستند الآن ({copiesCount} نسخ)</span>
            </button>
            <button onClick={onClose} className="p-2 text-slate-400 hover:text-white rounded-xl">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Workspace Layout */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          
          {/* Left Sidebar: Controls & Options */}
          <div className="w-full md:w-80 bg-slate-50 p-5 border-l border-slate-200 overflow-y-auto space-y-5 no-print text-xs font-bold text-slate-700">
            
            {/* Paper Size Selector */}
            <div>
              <label className="block text-slate-900 font-black mb-2">مقاس وتنسيق الطباعة:</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'A4', label: 'A4 رسمي', desc: 'عروض وفواتير' },
                  { id: 'A5', label: 'A5 مقتضب', desc: 'سندات قبض' },
                  { id: 'Thermal80', label: 'Thermal 80mm', desc: 'إيصال حراري' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setPaperSize(item.id)}
                    className={`p-2.5 rounded-xl border-2 text-center transition-all flex flex-col items-center justify-center ${
                      paperSize === item.id
                        ? 'border-brand-600 bg-white text-brand-700 shadow-sm'
                        : 'border-slate-200 bg-white hover:border-slate-300 text-slate-600'
                    }`}
                  >
                    <span className="font-black text-xs">{item.id}</span>
                    <span className="text-[9px] text-slate-400 mt-0.5">{item.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Language */}
            <div>
              <label className="block text-slate-900 font-black mb-2">لغة الوثيقة:</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'ar', label: 'العربية' },
                  { id: 'fr', label: 'Français' },
                  { id: 'bilingual', label: 'ثنائية' }
                ].map(lang => (
                  <button
                    key={lang.id}
                    onClick={() => setPrintLang(lang.id)}
                    className={`py-2 rounded-xl border text-center font-black text-xs ${
                      printLang === lang.id
                        ? 'bg-brand-600 text-white border-brand-600 shadow-sm'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Toggles */}
            <div className="space-y-3 pt-3 border-t border-slate-200">
              <label className="block text-slate-900 font-black mb-1">عناصر الوثيقة:</label>
              
              <label className="flex items-center justify-between p-2.5 bg-white rounded-xl border border-slate-200 cursor-pointer">
                <span>إظهار شعار المؤسسة</span>
                <input
                  type="checkbox"
                  checked={showLogo}
                  onChange={(e) => setShowLogo(e.target.checked)}
                  className="rounded text-brand-600 focus:ring-brand-500"
                />
              </label>

              <label className="flex items-center justify-between p-2.5 bg-white rounded-xl border border-slate-200 cursor-pointer">
                <span>إظهار الختم المالي المعتمد</span>
                <input
                  type="checkbox"
                  checked={showStamp}
                  onChange={(e) => setShowStamp(e.target.checked)}
                  className="rounded text-brand-600 focus:ring-brand-500"
                />
              </label>

              <label className="flex items-center justify-between p-2.5 bg-white rounded-xl border border-slate-200 cursor-pointer">
                <span>إظهار مكان التوقيع</span>
                <input
                  type="checkbox"
                  checked={showSignature}
                  onChange={(e) => setShowSignature(e.target.checked)}
                  className="rounded text-brand-600 focus:ring-brand-500"
                />
              </label>
            </div>

            {/* Copies */}
            <div>
              <label className="block text-slate-900 font-black mb-1">عدد النسخ للطباعة:</label>
              <input
                type="number"
                min="1"
                max="10"
                value={copiesCount}
                onChange={(e) => setCopiesCount(Number(e.target.value))}
                className="w-full p-2.5 bg-white rounded-xl border border-slate-200 font-bold outline-none text-center"
              />
            </div>

          </div>

          {/* Right Area: Interactive Live Print Preview */}
          <div className="flex-1 bg-slate-200/70 p-4 sm:p-8 overflow-y-auto flex items-center justify-center">
            
            {/* Paper Preview Canvas */}
            <div
              className={`bg-white shadow-2xl transition-all duration-300 text-slate-900 ${
                paperSize === 'A4'
                  ? 'w-full max-w-[210mm] min-h-[297mm] p-8 sm:p-12 rounded-lg'
                  : paperSize === 'A5'
                  ? 'w-full max-w-[148mm] min-h-[210mm] p-6 rounded-lg'
                  : 'w-[80mm] min-h-[140mm] p-4 text-[10px] rounded shadow-md font-mono'
              }`}
              id="printable-area"
              dir={printLang === 'fr' ? 'ltr' : 'rtl'}
            >
              
              {/* Document Header */}
              <div className="flex items-start justify-between border-b-2 border-slate-800 pb-4 mb-6">
                <div>
                  {showLogo && (
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-lg bg-brand-600 text-white flex items-center justify-center font-black">
                        D
                      </div>
                      <span className="font-black text-lg text-slate-900">Devisly</span>
                    </div>
                  )}
                  <h1 className="font-black text-lg sm:text-xl text-slate-900 leading-tight">
                    {user.businessName}
                  </h1>
                  <p className="text-xs text-slate-500 font-medium">{user.address}</p>
                  <p className="text-xs text-slate-500 font-mono">هاتف: {user.phone} | بريد: {user.email}</p>
                </div>

                <div className="text-right">
                  <span className="text-xs text-slate-400 font-bold block">
                    {documentType === 'devis' ? 'عرض سعر / DEVIS' : documentType === 'invoice' ? 'فاتورة / FACTURE' : 'سند قبض / REÇU'}
                  </span>
                  <span className="text-base sm:text-lg font-black font-mono text-brand-700">
                    {doc.number || doc.receiptNumber}
                  </span>
                  <span className="text-xs text-slate-500 font-mono block mt-1">التاريخ: {doc.date}</span>
                </div>
              </div>

              {/* Client Info */}
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 mb-5 text-xs">
                <span className="text-slate-400 font-bold block mb-1">العميل / Client:</span>
                <span className="font-black text-slate-900 text-sm">{doc.clientName}</span>
                {doc.clientAddress && <span className="text-slate-600 block mt-0.5">{doc.clientAddress}</span>}
              </div>

              {/* Items Table */}
              {paperSize !== 'Thermal80' ? (
                <table className="w-full text-right border-collapse text-xs mb-6">
                  <thead>
                    <tr className="bg-slate-100 border-b border-slate-300 font-black text-slate-700">
                      <th className="py-2.5 px-3">#</th>
                      <th className="py-2.5 px-3">البيان والخدمة</th>
                      <th className="py-2.5 px-3 text-center">الوحدة</th>
                      <th className="py-2.5 px-3 text-center">الكمية</th>
                      <th className="py-2.5 px-3 text-left">السعر</th>
                      <th className="py-2.5 px-3 text-left">المجموع</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {(doc.items || [
                      { name: 'خدمات وأعمال عامة معتمدة', unit: 'خدمة', quantity: 1, price: doc.total || doc.amount, total: doc.total || doc.amount }
                    ]).map((item, idx) => (
                      <tr key={idx}>
                        <td className="py-2.5 px-3 font-mono text-slate-400">{idx + 1}</td>
                        <td className="py-2.5 px-3 font-bold text-slate-900">{item.name}</td>
                        <td className="py-2.5 px-3 text-center text-slate-600">{item.unit}</td>
                        <td className="py-2.5 px-3 text-center font-mono font-bold">{item.quantity}</td>
                        <td className="py-2.5 px-3 text-left font-mono">{formatDZD(item.price)}</td>
                        <td className="py-2.5 px-3 text-left font-mono font-black text-slate-900">{formatDZD(item.total)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                /* Thermal compact receipt items */
                <div className="divide-y divide-dashed divide-slate-300 my-3 text-[10px]">
                  {(doc.items || [{ name: 'خدمة عامة', quantity: 1, total: doc.total || doc.amount }]).map((item, idx) => (
                    <div key={idx} className="py-1.5 flex justify-between">
                      <span>{item.name} x{item.quantity}</span>
                      <span className="font-bold">{formatDZD(item.total)}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Totals Summary */}
              <div className="flex justify-end mb-6">
                <div className="w-64 space-y-2 text-xs border-t-2 border-slate-800 pt-3">
                  <div className="flex justify-between font-bold">
                    <span>المجموع الفرعي:</span>
                    <span className="font-mono">{formatDZD(doc.subtotal || doc.total || doc.amount)}</span>
                  </div>
                  <div className="flex justify-between text-sm font-black text-slate-900 pt-1 border-t border-slate-200">
                    <span>المجموع الصافي للدفع:</span>
                    <span className="font-mono text-brand-700">{formatDZD(doc.total || doc.amount)}</span>
                  </div>
                </div>
              </div>

              {/* Signatures & Stamp */}
              {(showStamp || showSignature) && (
                <div className="grid grid-cols-2 gap-6 pt-6 border-t border-slate-200 text-xs">
                  {showSignature && (
                    <div className="text-center p-3 border border-slate-200 rounded-xl">
                      <span className="text-slate-400 block font-bold mb-8">توقيع الطرفين / Signature</span>
                      <span className="font-black text-slate-800">{user.name}</span>
                    </div>
                  )}

                  {showStamp && (
                    <div className="text-center p-3 border border-slate-200 rounded-xl flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full border-2 border-dashed border-brand-600 text-brand-600 font-black text-[9px] flex items-center justify-center rotate-[-10deg]">
                        ختم ومطابقة<br />معتمد
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Footer */}
              <div className="mt-8 text-center text-[10px] text-slate-400 border-t border-slate-100 pt-3">
                وثيقة صادرة عبر منصة Devisly الجزائر — شكراً لثقتكم بنا!
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
