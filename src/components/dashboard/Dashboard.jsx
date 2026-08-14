import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { KpiCard } from './KpiCard';
import { InteractiveChart } from './InteractiveChart';
import { AttentionAlerts } from './AttentionAlerts';
import { RecentDevisTable } from './RecentDevisTable';
import {
  Plus,
  Smartphone,
  Sparkles,
  Wrench,
  Users,
  Clock,
  TrendingUp,
  Wallet,
  ArrowUpRight,
  ShieldCheck,
  ChevronDown,
  Zap
} from 'lucide-react';

export const Dashboard = ({ onOpenPrintCenter, onOpenWorkOrder }) => {
  const {
    stats,
    formatDZD,
    setIsBuilderOpen,
    setIsMobileSimulatorOpen,
    setIsUpgradeModalOpen,
    services,
    clients,
    devisList,
    invoices,
    setActiveTab
  } = useApp();

  const [dateFilter, setDateFilter] = useState('هذا الشهر');

  // Top services simulation
  const topServices = services.slice(0, 4);

  // Top clients
  const topClients = clients.slice(0, 4);

  return (
    <div className="space-y-6 pb-12 animate-in fade-in">
      
      {/* Top Banner / Quick Action Bar */}
      <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between gap-5 bg-gradient-to-r from-brand-600 via-brand-700 to-navy-900 rounded-3xl p-6 sm:p-7 text-white shadow-card relative overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none" />
        
        {/* Banner Text */}
        <div className="relative z-10 max-w-2xl">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[11px] font-black bg-white/20 backdrop-blur-md px-3 py-0.5 rounded-full text-white inline-flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-300 fill-amber-300" />
              منصة Devisly الذكية v1.2
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black tracking-tight leading-snug flex items-center gap-2">
            <span>حضّر عرض سعر احترافي وابعثه للزبون في أقل من 3 دقائق</span>
            <Zap className="w-5 h-5 text-amber-300 fill-amber-300 shrink-0" />
          </h2>
          <p className="text-xs sm:text-sm text-blue-100 mt-1.5 leading-relaxed">
            متابعة دقيقة للعروض المقبولة، الدفعات وسندات القبض وبوابات الدفع الجزائرية.
          </p>
        </div>

        {/* Action Buttons (Fixed wrapping & padding to prevent clipping) */}
        <div className="flex flex-wrap items-center gap-2.5 relative z-10 w-full xl:w-auto shrink-0 pt-2 xl:pt-0">
          <button
            onClick={() => setIsUpgradeModalOpen(true)}
            className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2.5 bg-amber-400/20 hover:bg-amber-400/30 border border-amber-300/40 text-amber-200 font-black text-xs rounded-xl transition-all backdrop-blur-md whitespace-nowrap"
          >
            <Sparkles className="w-3.5 h-3.5 fill-amber-300" />
            <span>بوابات الدفع</span>
          </button>
          
          <button
            onClick={() => setIsMobileSimulatorOpen(true)}
            className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2.5 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white font-bold text-xs rounded-xl transition-all whitespace-nowrap"
          >
            <Smartphone className="w-4 h-4" />
            <span>معاينة الجوال</span>
          </button>
          
          <button
            onClick={() => setIsBuilderOpen(true)}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 bg-white hover:bg-slate-100 text-brand-700 font-black text-xs rounded-xl shadow-lg shadow-black/10 transition-all active:scale-95 whitespace-nowrap"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>إنشاء عرض سعر</span>
          </button>
        </div>
      </div>

      {/* 4 Primary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        <KpiCard
          title="قيمة العروض"
          value={formatDZD(stats.totalDevisAmount || 2450000)}
          change="15%+"
          isPositive={true}
          iconType="file"
        />

        <KpiCard
          title="نسبة القبول"
          value={`${stats.acceptanceRate || 68}%`}
          change="4%-"
          isPositive={false}
          iconType="chart"
        />

        <KpiCard
          title="المبالغ المحصلة"
          value={formatDZD(stats.totalCollected || 1245000)}
          change="18%+"
          isPositive={true}
          iconType="wallet"
        />

        <KpiCard
          title="المبالغ المتأخرة"
          value={formatDZD(stats.totalOverdue || 287500)}
          change="12%+"
          isPositive={false}
          iconType="alert"
        />
      </div>

      {/* Secondary Quick Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-soft flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] text-slate-400 font-bold block">متوسط زمن قبول العرض</span>
              <span className="text-sm font-black text-slate-900">{stats.avgAcceptanceTime}</span>
            </div>
          </div>
          <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md inline-flex items-center gap-1">
            <Zap className="w-3 h-3 fill-emerald-600" />
            <span>أسرع 2x</span>
          </span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-soft flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] text-slate-400 font-bold block">متوسط قيمة العرض الواحد</span>
              <span className="text-sm font-black text-slate-900 font-mono">{formatDZD(stats.avgQuoteValue)}</span>
            </div>
          </div>
          <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">+8% نمو</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-soft flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] text-slate-400 font-bold block">معدل التحصيل الفعلي</span>
              <span className="text-sm font-black text-teal-700">81.4% من المستحقات</span>
            </div>
          </div>
          <button
            onClick={() => setActiveTab('payments')}
            className="text-xs font-bold text-brand-600 hover:underline"
          >
            سجل الدفعات ←
          </button>
        </div>
      </div>

      {/* Charts & Attention Alert Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2">
          <InteractiveChart />
        </div>

        <div className="lg:col-span-1">
          <AttentionAlerts />
        </div>
      </div>

      {/* Top Services & Top Clients Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        
        {/* Top Services */}
        <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-soft">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Wrench className="w-4 h-4 text-brand-600" />
              <h3 className="text-sm font-black text-slate-900">أفضل الخدمات إيراداً وطلباً</h3>
            </div>
            <button
              onClick={() => setActiveTab('services')}
              className="text-xs font-bold text-brand-600 hover:underline"
            >
              الدليل الكامل
            </button>
          </div>

          <div className="space-y-3">
            {topServices.map((srv, idx) => (
              <div key={srv.id} className="flex items-center justify-between text-xs p-2.5 rounded-xl hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center font-bold text-[10px] text-slate-600">
                    {idx + 1}
                  </span>
                  <div>
                    <span className="font-bold text-slate-900 block">{srv.name}</span>
                    <span className="text-[10px] text-slate-400">{srv.category}</span>
                  </div>
                </div>
                <div className="text-left font-mono">
                  <span className="font-black text-brand-700">{formatDZD(srv.price * 25)}</span>
                  <span className="text-[10px] text-slate-400 block">إجمالي 25 طلب</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Clients */}
        <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-soft">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-emerald-600" />
              <h3 className="text-sm font-black text-slate-900">أفضل العملاء والمؤسسات</h3>
            </div>
            <button
              onClick={() => setActiveTab('clients')}
              className="text-xs font-bold text-brand-600 hover:underline"
            >
              سجل العملاء
            </button>
          </div>

          <div className="space-y-3">
            {topClients.map((cli, idx) => (
              <div key={cli.id} className="flex items-center justify-between text-xs p-2.5 rounded-xl hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-[10px]">
                    {idx + 1}
                  </span>
                  <div>
                    <span className="font-bold text-slate-900 block">{cli.name}</span>
                    <span className="text-[10px] text-slate-400">{cli.wilaya}</span>
                  </div>
                </div>
                <div className="text-left font-mono">
                  <span className="font-black text-slate-900">{formatDZD(cli.totalSpent)}</span>
                  <span className="text-[10px] text-emerald-600 font-bold block">{cli.totalDeals} تعاملات</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Recent Quotes Table */}
      <div>
        <RecentDevisTable onOpenPrintCenter={onOpenPrintCenter} onOpenWorkOrder={onOpenWorkOrder} />
      </div>

    </div>
  );
};
