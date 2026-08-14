import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Wallet,
  Plus,
  Search,
  Receipt,
  Printer,
  Share2,
  ExternalLink,
  CreditCard,
  Building,
  CheckCircle2,
  Calendar,
  X,
  Sparkles
} from 'lucide-react';

export const PaymentsList = () => {
  const {
    payments,
    invoices,
    clients,
    formatDZD,
    recordPayment,
    setReceiptModalData,
    setIsUpgradeModalOpen
  } = useApp();

  const [search, setSearch] = useState('');
  const [methodFilter, setMethodFilter] = useState('الكل');
  const [isRecordModalOpen, setIsRecordModalOpen] = useState(false);

  // New payment form
  const [selectedInvoiceId, setSelectedInvoiceId] = useState('');
  const [payAmount, setPayAmount] = useState('');
  const [payMethod, setPayMethod] = useState('نقداً (Cash)');
  const [payRef, setPayRef] = useState('');
  const [payNote, setPayNote] = useState('');

  const filtered = payments.filter(p => {
    const matchesSearch = p.clientName.toLowerCase().includes(search.toLowerCase()) ||
                          p.receiptNumber.toLowerCase().includes(search.toLowerCase()) ||
                          p.invoiceNumber.toLowerCase().includes(search.toLowerCase()) ||
                          (p.reference && p.reference.toLowerCase().includes(search.toLowerCase()));
    const matchesMethod = methodFilter === 'الكل' || p.method.includes(methodFilter);
    return matchesSearch && matchesMethod;
  });

  const totalPaymentsSum = payments.reduce((acc, p) => acc + (Number(p.amount) || 0), 0);

  const handleRecordSubmit = (e) => {
    e.preventDefault();
    if (!payAmount || Number(payAmount) <= 0) return;

    const newRec = recordPayment(selectedInvoiceId || null, {
      amount: Number(payAmount),
      method: payMethod,
      reference: payRef || `REF-${Math.floor(100000 + Math.random() * 900000)}`,
      note: payNote
    });

    setIsRecordModalOpen(false);
    setSelectedInvoiceId('');
    setPayAmount('');
    setPayRef('');
    setPayNote('');

    if (newRec) {
      setReceiptModalData(newRec);
    }
  };

  const getMethodBadgeStyle = (method) => {
    if (method.includes('BaridiMob') || method.includes('CCP')) {
      return 'bg-amber-50 text-amber-800 border-amber-200/90';
    }
    if (method.includes('البطاقة') || method.includes('CIB') || method.includes('Chargily')) {
      return 'bg-teal-50 text-teal-800 border-teal-200/90';
    }
    if (method.includes('شيك')) {
      return 'bg-purple-50 text-purple-800 border-purple-200/90';
    }
    return 'bg-emerald-50 text-emerald-800 border-emerald-200/90';
  };

  const formatMethodLabel = (method) => {
    if (method.includes('BaridiMob') || method.includes('CCP')) return 'BaridiMob / CCP';
    if (method.includes('البطاقة') || method.includes('Chargily')) return 'بطاقة ذهبية / CIB';
    if (method.includes('شيك')) return 'شيك بنكي';
    return 'نقداً (Cash)';
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            سجل المدفوعات وسندات القبض (Payments & Receipts)
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            توثيق جميع المبالغ المقبوضة، إصدار وصولات الاستلام وتتبع طرق الدفع
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setIsUpgradeModalOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white text-xs font-black rounded-xl shadow-md transition-all whitespace-nowrap"
          >
            <Sparkles className="w-4 h-4 fill-white" />
            <span>بوابات الدفع والاشتراك</span>
          </button>

          <button
            onClick={() => setIsRecordModalOpen(true)}
            className="flex items-center justify-center gap-2 px-5 py-2.5 bg-brand-600 hover:bg-brand-700 active:scale-95 text-white text-xs font-black rounded-xl shadow-md shadow-brand-600/25 transition-all whitespace-nowrap"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>تسجيل دفعة جديدة</span>
          </button>
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-soft">
          <span className="text-xs font-bold text-slate-400">إجمالي المبالغ المحصلة</span>
          <p className="text-2xl font-black text-emerald-600 mt-1 font-mono">{formatDZD(totalPaymentsSum)}</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-soft">
          <span className="text-xs font-bold text-slate-400">عدد سندات القبض</span>
          <p className="text-2xl font-black text-slate-900 mt-1">{payments.length} سند</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-soft">
          <span className="text-xs font-bold text-slate-400">الدفع عبر BaridiMob / CCP</span>
          <p className="text-xl font-black text-amber-700 mt-1 font-mono">
            {formatDZD(payments.filter(p => p.method.includes('BaridiMob') || p.method.includes('CCP')).reduce((a, b) => a + b.amount, 0))}
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-soft">
          <span className="text-xs font-bold text-slate-400">الدفع النقدي (Cash)</span>
          <p className="text-xl font-black text-slate-800 mt-1 font-mono">
            {formatDZD(payments.filter(p => p.method.includes('نقداً')).reduce((a, b) => a + b.amount, 0))}
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-soft flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <input
            type="text"
            placeholder="بحث برقم السند، الفاتورة أو العميل..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-50 pl-4 pr-10 py-2 rounded-xl border border-slate-200 text-xs font-bold outline-none focus:bg-white focus:border-brand-500"
          />
          <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          {['الكل', 'نقداً', 'BaridiMob', 'البطاقة', 'شيك'].map((method) => (
            <button
              key={method}
              onClick={() => setMethodFilter(method)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 whitespace-nowrap ${
                methodFilter === method
                  ? 'bg-brand-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80'
              }`}
            >
              {method}
            </button>
          ))}
        </div>
      </div>

      {/* Payments Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right border-collapse">
            <thead>
              <tr className="bg-slate-50/70 border-b border-slate-200 text-[11px] font-black text-slate-400 uppercase">
                <th className="py-3.5 px-4 whitespace-nowrap">رقم السند</th>
                <th className="py-3.5 px-4 whitespace-nowrap">الفاتورة</th>
                <th className="py-3.5 px-4 whitespace-nowrap">العميل</th>
                <th className="py-3.5 px-4 whitespace-nowrap">التاريخ</th>
                <th className="py-3.5 px-4 whitespace-nowrap">طريقة الدفع</th>
                <th className="py-3.5 px-4 whitespace-nowrap">المرجع</th>
                <th className="py-3.5 px-4 text-left whitespace-nowrap">المبلغ المدفوع</th>
                <th className="py-3.5 px-4 text-center whitespace-nowrap">سند القبض</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs font-bold text-slate-700">
              {filtered.map((pay) => (
                <tr key={pay.id} className="hover:bg-slate-50/50">
                  <td className="py-3.5 px-4 font-mono font-black text-brand-600 whitespace-nowrap">{pay.receiptNumber}</td>
                  <td className="py-3.5 px-4 font-mono font-bold text-slate-900 whitespace-nowrap">{pay.invoiceNumber}</td>
                  <td className="py-3.5 px-4 font-black text-slate-900 whitespace-nowrap">{pay.clientName}</td>
                  <td className="py-3.5 px-4 font-mono text-slate-500 whitespace-nowrap">{pay.date}</td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold border whitespace-nowrap ${getMethodBadgeStyle(pay.method)}`}>
                      {formatMethodLabel(pay.method)}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-slate-500 text-[11px] whitespace-nowrap">{pay.reference || '—'}</td>
                  <td className="py-3.5 px-4 text-left font-mono font-black text-emerald-600 text-sm whitespace-nowrap">
                    {formatDZD(pay.amount)}
                  </td>
                  <td className="py-3.5 px-4 text-center whitespace-nowrap">
                    <button
                      onClick={() => setReceiptModalData(pay)}
                      className="px-3 py-1.5 bg-brand-50 hover:bg-brand-100 text-brand-700 rounded-xl text-xs font-bold transition-colors inline-flex items-center gap-1.5 whitespace-nowrap"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>معاينة وطباعة</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Record Payment Direct Modal */}
      {isRecordModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-slate-200 animate-in zoom-in-95 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-black text-slate-900 text-base">تسجيل دفعة وإصدار سند قبض</h3>
              <button onClick={() => setIsRecordModalOpen(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleRecordSubmit} className="space-y-3 text-xs font-bold">
              <div>
                <label className="block text-slate-700 mb-1">اختر الفاتورة أو العميل</label>
                <select
                  value={selectedInvoiceId}
                  onChange={(e) => {
                    setSelectedInvoiceId(e.target.value);
                    const inv = invoices.find(i => i.id === e.target.value);
                    if (inv) setPayAmount(inv.dueAmount);
                  }}
                  className="w-full p-2.5 bg-slate-50 rounded-xl border border-slate-300 outline-none focus:border-brand-600"
                >
                  <option value="">-- دفعة عامة / خارج الفواتير --</option>
                  {invoices.filter(i => i.dueAmount > 0).map(inv => (
                    <option key={inv.id} value={inv.id}>
                      {inv.number} — {inv.clientName} (مستحق: {formatDZD(inv.dueAmount)})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-700 mb-1">المبلغ المقبوض (دج) *</label>
                <input
                  type="number"
                  required
                  min="1"
                  value={payAmount}
                  onChange={(e) => setPayAmount(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 rounded-xl border border-slate-300 font-mono font-black text-base outline-none focus:border-brand-600"
                />
              </div>

              <div>
                <label className="block text-slate-700 mb-1">طريقة القبض *</label>
                <select
                  value={payMethod}
                  onChange={(e) => setPayMethod(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 rounded-xl border border-slate-300 outline-none focus:border-brand-600"
                >
                  <option value="نقداً (Cash)">نقداً (Cash)</option>
                  <option value="تحويل بريدي CCP / BaridiMob">تحويل بريدي CCP / BaridiMob</option>
                  <option value="البطاقة الذهبية / CIB (Chargily Pay)">البطاقة الذهبية / CIB (Chargily Pay)</option>
                  <option value="شيك بنكي">شيك بنكي</option>
                  <option value="تحويل بنكي Virement">تحويل بنكي Virement</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 mb-1">رقم المرجع / رقم الوصل</label>
                <input
                  type="text"
                  placeholder="مثال: REF-98741 أو رقم الشيك"
                  value={payRef}
                  onChange={(e) => setPayRef(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 rounded-xl border border-slate-300 outline-none focus:border-brand-600 font-mono"
                />
              </div>

              <div>
                <label className="block text-slate-700 mb-1">ملاحظات إضافية</label>
                <input
                  type="text"
                  placeholder="ملاحظات حول الدفعة"
                  value={payNote}
                  onChange={(e) => setPayNote(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 rounded-xl border border-slate-300 outline-none focus:border-brand-600"
                />
              </div>

              <div className="pt-3 flex gap-2">
                <button
                  type="submit"
                  className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl transition-all font-black"
                >
                  حفظ وإصدار السند
                </button>
                <button
                  type="button"
                  onClick={() => setIsRecordModalOpen(false)}
                  className="px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl"
                >
                  إلغاء
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
