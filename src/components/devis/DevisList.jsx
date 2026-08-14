import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  FileText,
  Plus,
  Search,
  Filter,
  ExternalLink,
  Edit3,
  Trash2,
  ArrowRightLeft,
  Share2,
  Clock,
  Eye,
  Printer,
  Wrench,
  CheckCircle2,
  FileQuestion
} from 'lucide-react';

export const DevisList = ({ onOpenPrintCenter, onOpenWorkOrder }) => {
  const {
    devisList,
    formatDZD,
    setIsBuilderOpen,
    setEditingDevis,
    setPublicPreviewDevis,
    deleteDevis,
    convertDevisToInvoice
  } = useApp();

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('الكل');

  const filtered = devisList.filter(d => {
    const matchesSearch = d.clientName.toLowerCase().includes(search.toLowerCase()) ||
                          d.number.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'الكل' || d.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getBadgeStyle = (status) => {
    switch (status) {
      case 'مقبول':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'تمت المشاهدة':
        return 'bg-sky-50 text-sky-700 border-sky-200';
      case 'مسودة':
        return 'bg-slate-100 text-slate-600 border-slate-200';
      case 'تعديل مطلوب':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'بانتظار الرد':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            عروض الأسعار (Devis)
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            إدارة ومتابعة كافة عروض الأسعار المرسلة، طباعة A4/A5، وأوامر العمل الميدانية
          </p>
        </div>

        <button
          onClick={() => {
            setEditingDevis(null);
            setIsBuilderOpen(true);
          }}
          className="flex items-center justify-center gap-2 px-5 py-2.5 bg-brand-600 hover:bg-brand-700 active:scale-95 text-white text-xs font-black rounded-xl shadow-md shadow-brand-600/25 transition-all"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>إنشاء عرض سعر جديد</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-soft flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <input
            type="text"
            placeholder="بحث برقم العرض أو اسم العميل..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-50 pl-4 pr-10 py-2 rounded-xl border border-slate-200 text-xs font-bold outline-none focus:bg-white focus:border-brand-500"
          />
          <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          {['الكل', 'مقبول', 'تمت المشاهدة', 'بانتظار الرد', 'تعديل مطلوب', 'مسودة'].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                statusFilter === status
                  ? 'bg-brand-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Devis Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((quote) => (
          <div
            key={quote.id}
            className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-soft hover:shadow-card transition-all flex flex-col justify-between group"
          >
            <div>
              {/* Card Top */}
              <div className="flex items-start justify-between mb-3">
                <div>
                  <span className="font-mono font-black text-xs text-brand-600 block">
                    {quote.number}
                  </span>
                  <h3 className="font-black text-slate-900 text-sm mt-0.5">
                    {quote.clientName}
                  </h3>
                </div>
                <span className={`px-2.5 py-1 rounded-lg text-xs font-bold border ${getBadgeStyle(quote.status)}`}>
                  {quote.status}
                </span>
              </div>

              {/* Items summary */}
              <div className="py-3 my-2 border-y border-slate-100 text-xs space-y-1.5 text-slate-600">
                <div className="flex justify-between">
                  <span>عدد البنود:</span>
                  <span className="font-bold text-slate-900">{quote.items?.length || 0} خدمات</span>
                </div>
                <div className="flex justify-between">
                  <span>تاريخ العرض:</span>
                  <span className="font-mono text-slate-700">{quote.date}</span>
                </div>
                <div className="flex justify-between">
                  <span>المبلغ الإجمالي:</span>
                  <span className="font-mono font-black text-brand-700 text-sm">
                    {formatDZD(quote.total)}
                  </span>
                </div>
              </div>

              {quote.clientFeedback && (
                <div className="p-2.5 bg-amber-50 rounded-xl border border-amber-200/70 text-[11px] text-amber-900 mb-3">
                  <span className="font-black block">طلب العميل:</span>
                  {quote.clientFeedback}
                </div>
              )}
            </div>

            {/* Actions Bottom Bar */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-100 gap-1">
              <button
                onClick={() => setPublicPreviewDevis(quote)}
                className="flex-1 flex items-center justify-center gap-1 py-1.5 bg-teal-50 hover:bg-teal-100 text-teal-800 rounded-xl text-xs font-bold transition-colors"
                title="معاينة رابط العميل"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>الرابط</span>
              </button>

              {onOpenPrintCenter && (
                <button
                  onClick={() => onOpenPrintCenter(quote)}
                  className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors"
                  title="مركز الطباعة (A4 / A5 / Thermal)"
                >
                  <Printer className="w-4 h-4" />
                </button>
              )}

              {quote.status === 'مقبول' && onOpenWorkOrder && (
                <button
                  onClick={() => onOpenWorkOrder(quote)}
                  className="p-1.5 text-slate-500 hover:text-amber-600 hover:bg-amber-50 rounded-xl transition-colors"
                  title="إنشاء أمر عمل ومحضر تسليم (Bon de Travail)"
                >
                  <Wrench className="w-4 h-4" />
                </button>
              )}

              <button
                onClick={() => {
                  setEditingDevis(quote);
                  setIsBuilderOpen(true);
                }}
                className="p-1.5 text-slate-500 hover:text-amber-600 hover:bg-amber-50 rounded-xl transition-colors"
                title="تعديل"
              >
                <Edit3 className="w-4 h-4" />
              </button>

              {quote.status === 'مقبول' && (
                <button
                  onClick={() => convertDevisToInvoice(quote)}
                  className="p-1.5 text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-colors"
                  title="تحويل إلى فاتورة"
                >
                  <ArrowRightLeft className="w-4 h-4" />
                </button>
              )}

              <button
                onClick={() => {
                  if (confirm(`هل أنت متأكد من حذف العرض ${quote.number}؟`)) {
                    deleteDevis(quote.id);
                  }
                }}
                className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                title="حذف"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
