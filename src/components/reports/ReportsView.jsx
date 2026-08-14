import React from 'react';
import { useApp } from '../../context/AppContext';
import { BarChart3, TrendingUp, DollarSign, Users, FileCheck, CheckCircle2 } from 'lucide-react';

export const ReportsView = () => {
  const { stats, formatDZD, devisList, invoices } = useApp();

  const totalQuotesCount = devisList.length;
  const acceptedQuotesCount = devisList.filter(d => d.status === 'مقبول').length;

  return (
    <div className="space-y-6 pb-12 animate-in fade-in">
      <div>
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
          التقارير ومؤشرات الأداء (Reports)
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          نظرة شاملة على نشاطك التجاري، معدلات التحويل والتدفقات النقدية
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-soft">
          <span className="text-xs font-bold text-slate-400">إجمالي العروض الصادرة</span>
          <p className="text-2xl font-black text-slate-900 mt-1">{totalQuotesCount} عرض</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-soft">
          <span className="text-xs font-bold text-emerald-600">العروض المقبولة</span>
          <p className="text-2xl font-black text-emerald-600 mt-1">{acceptedQuotesCount} عرض</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-soft">
          <span className="text-xs font-bold text-brand-600">نسبة القبول الكلية</span>
          <p className="text-2xl font-black text-brand-600 mt-1">{stats.acceptanceRate}%</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-soft">
          <span className="text-xs font-bold text-purple-600">معدل قيمة العرض الواحد</span>
          <p className="text-xl font-black text-purple-700 mt-1 font-mono">
            {formatDZD(totalQuotesCount > 0 ? Math.round(stats.totalDevisAmount / totalQuotesCount) : 0)}
          </p>
        </div>
      </div>

      {/* Conversion Funnel */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-soft">
        <h3 className="text-sm font-black text-slate-900 mb-4">مسار تحويل عروض الأسعار (Conversion Funnel)</h3>
        
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-xs font-bold mb-1">
              <span>تم إرسالها للعميل (100%)</span>
              <span>{totalQuotesCount} عروض</span>
            </div>
            <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
              <div className="bg-brand-600 h-full rounded-full w-full" />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs font-bold mb-1">
              <span>تم فتحها ومشاهدتها من العميل (85%)</span>
              <span>{Math.round(totalQuotesCount * 0.85)} عروض</span>
            </div>
            <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
              <div className="bg-sky-500 h-full rounded-full w-[85%]" />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs font-bold mb-1">
              <span>تمت الموافقة وقبول العرض ({stats.acceptanceRate}%)</span>
              <span>{acceptedQuotesCount} عروض</span>
            </div>
            <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
              <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${stats.acceptanceRate}%` }} />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs font-bold mb-1">
              <span>تم تحويلها لفواتير وتحصيلها (55%)</span>
              <span>{invoices.filter(i => i.status === 'مدفوع بالكامل').length} فواتير</span>
            </div>
            <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
              <div className="bg-teal-600 h-full rounded-full w-[55%]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
