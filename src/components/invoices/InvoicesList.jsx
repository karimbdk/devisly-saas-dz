import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Receipt,
  Plus,
  Search,
  DollarSign,
  CheckCircle2,
  AlertCircle,
  Clock,
  Wallet,
  X,
  CreditCard
} from 'lucide-react';

export const InvoicesList = () => {
  const {
    invoices,
    formatDZD,
    recordPayment,
    stats
  } = useApp();

  const [search, setSearch] = useState('');
  const [selectedInvoiceForPayment, setSelectedInvoiceForPayment] = useState(null);
  
  // Payment Modal State
  const [payAmount, setPayAmount] = useState('');
  const [payMethod, setPayMethod] = useState('نقداً (Cash)');
  const [payNote, setPayNote] = useState('');

  const filtered = invoices.filter(inv => {
    return inv.clientName.toLowerCase().includes(search.toLowerCase()) ||
           inv.number.toLowerCase().includes(search.toLowerCase());
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'مدفوع بالكامل':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'مدفوع جزئياً':
        return 'bg-blue-50 text-brand-700 border-blue-200';
      case 'متأخر':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      default:
        return 'bg-amber-50 text-amber-700 border-amber-200';
    }
  };

  const handleRecordPaymentSubmit = (e) => {
    e.preventDefault();
    if (!payAmount || Number(payAmount) <= 0) return;

    recordPayment(selectedInvoiceForPayment.id, {
      amount: Number(payAmount),
      method: payMethod,
      note: payNote
    });

    setSelectedInvoiceForPayment(null);
    setPayAmount('');
    setPayNote('');
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            الفواتير والتحصيل (Invoices)
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            متابعة فواتير الخدمات الصادرة، المبالغ المحصلة والمستحقات المتبقية
          </p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-soft">
          <span className="text-xs font-bold text-slate-400">إجمالي الفواتير</span>
          <p className="text-2xl font-black text-slate-900 mt-1 font-mono">
            {formatDZD(invoices.reduce((a, b) => a + b.total, 0))}
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-soft">
          <span className="text-xs font-bold text-emerald-600">المبالغ المحصلة</span>
          <p className="text-2xl font-black text-emerald-600 mt-1 font-mono">
            {formatDZD(stats.totalCollected)}
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-soft">
          <span className="text-xs font-bold text-rose-600">المستحقات المتأخرة</span>
          <p className="text-2xl font-black text-rose-600 mt-1 font-mono">
            {formatDZD(stats.totalOverdue)}
          </p>
        </div>
      </div>

      {/* Invoices Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-soft overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div className="relative w-full sm:w-72">
            <input
              type="text"
              placeholder="بحث برقم الفاتورة أو العميل..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-50 pl-4 pr-10 py-2 rounded-xl border border-slate-200 text-xs font-bold outline-none focus:bg-white focus:border-brand-500"
            />
            <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-right border-collapse">
            <thead>
              <tr className="bg-slate-50/70 border-b border-slate-200 text-[11px] font-black text-slate-400 uppercase">
                <th className="py-3.5 px-4">رقم الفاتورة</th>
                <th className="py-3.5 px-4">العميل</th>
                <th className="py-3.5 px-4">تاريخ الاستحقاق</th>
                <th className="py-3.5 px-4">المبلغ الإجمالي</th>
                <th className="py-3.5 px-4">المدفوع</th>
                <th className="py-3.5 px-4">المتبقي</th>
                <th className="py-3.5 px-4 text-center">الحالة</th>
                <th className="py-3.5 px-4 text-center">الإجراء</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs font-bold text-slate-700">
              {filtered.map((inv) => (
                <tr key={inv.id} className="hover:bg-slate-50/50">
                  <td className="py-3.5 px-4 font-mono font-black text-slate-900">{inv.number}</td>
                  <td className="py-3.5 px-4 font-black text-slate-900">{inv.clientName}</td>
                  <td className="py-3.5 px-4 font-mono text-slate-500">{inv.dueDate}</td>
                  <td className="py-3.5 px-4 font-mono font-black text-slate-900">{formatDZD(inv.total)}</td>
                  <td className="py-3.5 px-4 font-mono font-bold text-emerald-600">{formatDZD(inv.paidAmount)}</td>
                  <td className="py-3.5 px-4 font-mono font-bold text-rose-600">{formatDZD(inv.dueAmount)}</td>
                  <td className="py-3.5 px-4 text-center">
                    <span className={`px-2.5 py-1 rounded-lg text-xs font-bold border ${getStatusBadge(inv.status)}`}>
                      {inv.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    {inv.dueAmount > 0 ? (
                      <button
                        onClick={() => {
                          setSelectedInvoiceForPayment(inv);
                          setPayAmount(inv.dueAmount);
                        }}
                        className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1 mx-auto"
                      >
                        <Wallet className="w-3.5 h-3.5" />
                        <span>تسجيل دفعة</span>
                      </button>
                    ) : (
                      <span className="text-xs text-emerald-600 font-bold inline-flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>مسدد</span>
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payment Recording Modal */}
      {selectedInvoiceForPayment && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-slate-200 animate-in zoom-in-95 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-black text-slate-900 text-base">
                  تسجيل دفعة مالية — {selectedInvoiceForPayment.number}
                </h3>
                <p className="text-xs text-slate-400">{selectedInvoiceForPayment.clientName}</p>
              </div>
              <button
                onClick={() => setSelectedInvoiceForPayment(null)}
                className="text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleRecordPaymentSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-black text-slate-700 mb-1">المبلغ المدفوع (دج)</label>
                <input
                  type="number"
                  min="1"
                  max={selectedInvoiceForPayment.dueAmount}
                  value={payAmount}
                  onChange={(e) => setPayAmount(e.target.value)}
                  className="w-full p-3 bg-slate-50 rounded-xl border border-slate-300 font-mono font-black text-base outline-none focus:border-brand-600"
                  required
                />
              </div>

              <div>
                <label className="block font-black text-slate-700 mb-1">طريقة الدفع</label>
                <select
                  value={payMethod}
                  onChange={(e) => setPayMethod(e.target.value)}
                  className="w-full p-3 bg-slate-50 rounded-xl border border-slate-300 font-bold outline-none focus:border-brand-600"
                >
                  <option value="نقداً (Cash)">نقداً (Cash)</option>
                  <option value="تحويل بريدي BaridiMob / CCP">تحويل بريدي BaridiMob / CCP</option>
                  <option value="شيك بنكي">شيك بنكي</option>
                  <option value="تحويل بنكي Virement">تحويل بنكي Virement</option>
                </select>
              </div>

              <div>
                <label className="block font-black text-slate-700 mb-1">ملاحظة أو رقم الوصل</label>
                <input
                  type="text"
                  placeholder="مثال: وصل رقم 0987 أو دفعة مرحلية"
                  value={payNote}
                  onChange={(e) => setPayNote(e.target.value)}
                  className="w-full p-3 bg-slate-50 rounded-xl border border-slate-300 font-bold outline-none focus:border-brand-600"
                />
              </div>

              <div className="pt-3 flex gap-2">
                <button
                  type="submit"
                  className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-xl transition-all"
                >
                  تأكيد تسجيل الدفعة
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedInvoiceForPayment(null)}
                  className="px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl"
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
