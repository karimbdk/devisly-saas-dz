import React from 'react';
import { FileText, ChevronLeft, ExternalLink, Edit3, ArrowRightLeft, Printer, Wrench, Share2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const RecentDevisTable = ({ onOpenPrintCenter, onOpenWorkOrder }) => {
  const {
    devisList,
    formatDZD,
    setActiveTab,
    setPublicPreviewDevis,
    setEditingDevis,
    setIsBuilderOpen,
    convertDevisToInvoice
  } = useApp();

  const getStatusBadge = (status) => {
    switch (status) {
      case 'مقبول':
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-lg text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200/80">
            مقبول
          </span>
        );
      case 'تمت المشاهدة':
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-lg text-xs font-bold bg-sky-50 text-sky-700 border border-sky-200/80">
            تمت المشاهدة
          </span>
        );
      case 'مسودة':
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-lg text-xs font-bold bg-slate-100 text-slate-600 border border-slate-200">
            مسودة
          </span>
        );
      case 'تعديل مطلوب':
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-lg text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200/80">
            تعديل مطلوب
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-lg text-xs font-bold bg-slate-50 text-slate-600 border border-slate-200">
            {status}
          </span>
        );
    }
  };

  const recentQuotes = devisList.slice(0, 5);

  return (
    <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/80 shadow-soft">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-slate-400" />
          <h3 className="text-base font-extrabold text-slate-900">آخر عروض الأسعار</h3>
        </div>
        <button
          onClick={() => setActiveTab('devis')}
          className="inline-flex items-center gap-1 text-xs font-bold text-brand-600 hover:text-brand-700 transition-colors"
        >
          <span>عرض الكل</span>
          <ChevronLeft className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-right border-collapse">
          <thead>
            <tr className="border-b border-slate-100 text-[11px] font-extrabold text-slate-400 uppercase">
              <th className="py-3 px-3 text-right">رقم العرض</th>
              <th className="py-3 px-3 text-right">العميل</th>
              <th className="py-3 px-3 text-right">المبلغ</th>
              <th className="py-3 px-3 text-right">التاريخ</th>
              <th className="py-3 px-3 text-center">الحالة</th>
              <th className="py-3 px-3 text-center">الإجراءات والطباعة</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs font-bold text-slate-700">
            {recentQuotes.map((quote) => (
              <tr key={quote.id} className="hover:bg-slate-50/80 transition-colors group">
                {/* Number */}
                <td className="py-3.5 px-3 text-slate-900 font-mono font-extrabold text-xs">
                  {quote.number}
                </td>

                {/* Client */}
                <td className="py-3.5 px-3">
                  <span className="font-bold text-slate-900 block truncate max-w-[180px]">
                    {quote.clientName}
                  </span>
                </td>

                {/* Amount */}
                <td className="py-3.5 px-3 font-extrabold text-slate-900">
                  {formatDZD(quote.total)}
                </td>

                {/* Date */}
                <td className="py-3.5 px-3 text-slate-500 font-mono text-[11px]">
                  {quote.date}
                </td>

                {/* Status */}
                <td className="py-3.5 px-3 text-center">
                  {getStatusBadge(quote.status)}
                </td>

                {/* Actions */}
                <td className="py-3.5 px-3 text-center">
                  <div className="flex items-center justify-center gap-1">
                    {/* View as Client Portal */}
                    <button
                      onClick={() => setPublicPreviewDevis(quote)}
                      className="p-1.5 text-slate-400 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-colors"
                      title="معاينة العرض كعميل / رابط عام"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </button>

                    {/* Print Center Modal */}
                    {onOpenPrintCenter && (
                      <button
                        onClick={() => onOpenPrintCenter(quote)}
                        className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="مركز الطباعة (A4 / A5 / Thermal)"
                      >
                        <Printer className="w-4 h-4" />
                      </button>
                    )}

                    {/* Work Order if accepted */}
                    {quote.status === 'مقبول' && onOpenWorkOrder && (
                      <button
                        onClick={() => onOpenWorkOrder(quote)}
                        className="p-1.5 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                        title="إنشاء أمر عمل ومحضر تسليم (Bon de Travail)"
                      >
                        <Wrench className="w-4 h-4" />
                      </button>
                    )}

                    {/* Edit */}
                    <button
                      onClick={() => {
                        setEditingDevis(quote);
                        setIsBuilderOpen(true);
                      }}
                      className="p-1.5 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                      title="تعديل العرض"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>

                    {/* Convert to invoice if accepted */}
                    {quote.status === 'مقبول' && (
                      <button
                        onClick={() => convertDevisToInvoice(quote)}
                        className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                        title="تحويل إلى فاتورة بضغطة واحدة"
                      >
                        <ArrowRightLeft className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
