import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  LayoutDashboard,
  FileText,
  Receipt,
  Wallet,
  Users,
  Wrench,
  BarChart3,
  Settings,
  Sparkles,
  Zap
} from 'lucide-react';

export const Sidebar = () => {
  const { activeTab, setActiveTab, user, devisList, invoices, payments, setIsUpgradeModalOpen } = useApp();

  const navItems = [
    { id: 'dashboard', label: 'الرئيسية', icon: LayoutDashboard },
    { id: 'devis', label: 'عروض الأسعار', icon: FileText, count: devisList.length },
    { id: 'invoices', label: 'الفواتير', icon: Receipt, count: invoices.length },
    { id: 'payments', label: 'الدفعات وسندات القبض', icon: Wallet, count: payments.length },
    { id: 'clients', label: 'العملاء', icon: Users },
    { id: 'services', label: 'الخدمات', icon: Wrench },
    { id: 'reports', label: 'التقارير', icon: BarChart3 },
    { id: 'settings', label: 'الإعدادات', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-white border-l border-slate-200 min-h-[calc(100vh-4rem)] flex flex-col justify-between p-4 shrink-0 shadow-sm hidden md:flex">
      {/* Navigation List */}
      <div className="space-y-1">
        <div className="px-3 py-2 text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">
          القائمة الرئيسية
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                isActive
                  ? 'bg-brand-50 text-brand-700 shadow-sm border border-brand-100'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 ${isActive ? 'text-brand-600 stroke-[2.5]' : 'text-slate-400 stroke-[2]'}`} />
                <span>{item.label}</span>
              </div>
              {item.count !== undefined && (
                <span className={`text-[11px] px-2 py-0.5 rounded-full font-bold ${
                  isActive ? 'bg-brand-200/60 text-brand-800' : 'bg-slate-100 text-slate-500'
                }`}>
                  {item.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Plan Card & User Info */}
      <div className="space-y-3 pt-4 border-t border-slate-100">
        {/* Pro Plan Card */}
        <div 
          onClick={() => setIsUpgradeModalOpen(true)}
          className="p-3.5 bg-gradient-to-br from-brand-900 to-navy-900 rounded-2xl text-white shadow-card relative overflow-hidden cursor-pointer group hover:scale-[1.02] transition-transform"
        >
          <div className="absolute -right-6 -bottom-6 w-20 h-20 bg-brand-500/20 rounded-full blur-xl pointer-events-none" />
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-black text-brand-300 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              خطة {user.plan}
            </span>
            <span className="text-[10px] bg-brand-800/80 text-brand-200 px-2 py-0.5 rounded-full font-bold group-hover:bg-amber-400 group-hover:text-slate-900 transition-colors inline-flex items-center gap-1">
              <Zap className="w-2.5 h-2.5 fill-current" />
              <span>ترقية / دفع</span>
            </span>
          </div>
          <p className="text-[11px] text-slate-300 mb-2.5">
            عروض وفواتير غير محدودة، تخصيص الهوية ودعم الـ WhatsApp.
          </p>
          <div className="w-full bg-navy-800 rounded-full h-1.5 mb-1.5 overflow-hidden">
            <div className="bg-brand-400 h-full rounded-full" style={{ width: '42%' }} />
          </div>
          <div className="flex justify-between text-[10px] text-slate-400">
            <span>الاستهلاك</span>
            <span>42% من المساحة</span>
          </div>
        </div>

        {/* User Card */}
        <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 transition-colors">
          <div className="w-9 h-9 rounded-full bg-brand-100 border border-brand-200 flex items-center justify-center font-bold text-brand-700 text-sm overflow-hidden">
            {user.avatarUrl ? (
              <img src={user.avatarUrl} alt={user.name} className="w-full h-full object-cover" />
            ) : (
              user.name.charAt(0)
            )}
          </div>
          <div className="flex flex-col text-right overflow-hidden flex-1">
            <span className="text-xs font-bold text-slate-900 truncate">{user.name}</span>
            <span className="text-[10px] text-slate-400 truncate">{user.businessName}</span>
          </div>
        </div>
      </div>
    </aside>
  );
};
