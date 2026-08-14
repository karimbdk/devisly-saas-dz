import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  FileText,
  Plus,
  Bell,
  Smartphone,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  ChevronDown,
  Printer,
  Lock,
  Sparkles,
  LogOut,
  User,
  ShieldAlert,
  ArrowRight
} from 'lucide-react';

export const Navbar = ({ onOpenPrintCenter, onOpenLanding }) => {
  const {
    user,
    currentUser,
    logout,
    isImpersonating,
    stopImpersonating,
    setIsBuilderOpen,
    setIsMobileSimulatorOpen,
    setIsUpgradeModalOpen,
    language,
    setLanguage,
    devisList,
    activeTab,
    setActiveTab,
    setPublicPreviewDevis,
    notifications = []
  } = useApp();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-sm no-print">
      
      {/* Impersonation Warning Banner if Admin is viewing user */}
      {isImpersonating && (
        <div className="bg-amber-500 text-slate-950 px-4 py-1.5 text-xs font-black flex items-center justify-between shadow-inner">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4" />
            <span>وضع محاكاة الإدارة: أنت تتصفح الآن حساب ({user.name} — {user.businessName})</span>
          </div>
          <button
            onClick={stopImpersonating}
            className="px-3 py-0.5 bg-slate-950 hover:bg-slate-900 text-amber-300 rounded-lg text-xs font-bold transition-all"
          >
            العودة للوحة الإدارة ←
          </button>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Right: Logo & Business Name */}
          <div className="flex items-center gap-4">
            <div 
              onClick={() => setActiveTab('dashboard')} 
              className="flex items-center gap-2.5 cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-xl bg-brand-600 flex items-center justify-center text-white shadow-md shadow-brand-500/20 group-hover:scale-105 transition-transform">
                <FileText className="w-6 h-6 stroke-[2.2]" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 leading-none">
                  Devis<span className="text-brand-600">ly</span>
                </span>
                <span className="text-[10px] text-slate-400 font-medium tracking-wide">
                  {user.businessName ? user.businessName.slice(0, 24) + '...' : 'v1.2 Multi-tenant'}
                </span>
              </div>
            </div>
          </div>

          {/* Center Links */}
          <div className="hidden md:flex items-center gap-1.5 text-xs font-semibold text-slate-600 bg-slate-100/80 p-1 rounded-xl border border-slate-200/70">
            <button 
              onClick={() => setActiveTab('dashboard')}
              className={`px-3 py-1.5 rounded-lg transition-all font-bold ${activeTab === 'dashboard' ? 'bg-white text-brand-600 shadow-sm' : 'hover:text-brand-600 hover:bg-white'}`}
            >
              الرئيسية
            </button>
            <button 
              onClick={() => setActiveTab('devis')}
              className={`px-3 py-1.5 rounded-lg transition-all font-bold ${activeTab === 'devis' ? 'bg-white text-brand-600 shadow-sm' : 'hover:text-brand-600 hover:bg-white'}`}
            >
              عروض الأسعار ({devisList.length})
            </button>
            <button 
              onClick={() => setActiveTab('services')}
              className={`px-3 py-1.5 rounded-lg transition-all font-bold ${activeTab === 'services' ? 'bg-white text-brand-600 shadow-sm' : 'hover:text-brand-600 hover:bg-white'}`}
            >
              دليل الخدمات
            </button>
            <button 
              onClick={() => onOpenPrintCenter(devisList[0])}
              className="px-3 py-1.5 rounded-lg hover:text-brand-600 hover:bg-white transition-all flex items-center gap-1 font-bold text-slate-700"
            >
              <Printer className="w-3.5 h-3.5 text-brand-600" />
              <span>مركز الطباعة</span>
            </button>
            <button 
              onClick={() => {
                const sample = devisList[0];
                if (sample) setPublicPreviewDevis(sample);
              }}
              className="px-3 py-1.5 rounded-lg bg-teal-50 text-teal-700 border border-teal-200/60 hover:bg-teal-100/70 transition-all flex items-center gap-1.5 font-black"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>بوابة العميل</span>
            </button>
          </div>

          {/* Left Actions */}
          <div className="flex items-center gap-2.5">
            
            <button
              onClick={() => setIsMobileSimulatorOpen(true)}
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200/80 rounded-xl transition-colors border border-slate-200"
              title="معاينة منشئ العروض على الجوال"
            >
              <Smartphone className="w-4 h-4 text-brand-600" />
              <span>الجوال</span>
            </button>

            {/* Language Switch */}
            <div className="hidden sm:flex items-center bg-slate-100 rounded-xl p-0.5 border border-slate-200 text-xs font-bold text-slate-600">
              <button 
                onClick={() => setLanguage('ar')}
                className={`px-2 py-1 rounded-lg transition-all ${language === 'ar' ? 'bg-white text-brand-600 shadow-sm' : 'hover:text-slate-900'}`}
              >
                AR
              </button>
              <button 
                onClick={() => setLanguage('fr')}
                className={`px-2 py-1 rounded-lg transition-all ${language === 'fr' ? 'bg-white text-brand-600 shadow-sm' : 'hover:text-slate-900'}`}
              >
                FR
              </button>
            </div>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2.5 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors border border-slate-200/80"
                title="الإشعارات"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[9px] font-black rounded-full flex items-center justify-center border-2 border-white">
                  3
                </span>
              </button>

              {showNotifications && (
                <div className="absolute left-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-elevated border border-slate-200 py-3 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="px-4 pb-2 border-b border-slate-100 flex items-center justify-between">
                    <span className="font-bold text-slate-900 text-sm">الإشعارات النشطة</span>
                    <span className="text-xs text-brand-600 bg-brand-50 px-2 py-0.5 rounded-full font-bold">3 جديدة</span>
                  </div>
                  <div className="divide-y divide-slate-100 max-h-80 overflow-y-auto">
                    {notifications.map(n => (
                      <div
                        key={n.id}
                        onClick={() => {
                          setShowNotifications(false);
                          if (n.devisId) {
                            const found = devisList.find(d => d.id === n.devisId);
                            if (found) setPublicPreviewDevis(found);
                          } else if (n.tab) {
                            setActiveTab(n.tab);
                          }
                        }}
                        className="p-3.5 hover:bg-slate-50 transition-colors cursor-pointer flex gap-3 items-start"
                      >
                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                          n.type === 'success' ? 'bg-emerald-100 text-emerald-600' :
                          n.type === 'warning' ? 'bg-amber-100 text-amber-600' : 'bg-red-100 text-red-600'
                        }`}>
                          {n.type === 'success' ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                        </div>
                        <div className="flex-1">
                          <p className="text-xs font-bold text-slate-900">{n.title}</p>
                          <p className="text-[11px] text-slate-500 mt-0.5">{n.subtitle}</p>
                          <span className="text-[10px] text-slate-400 mt-1 block">{n.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Primary CTA: Create Devis */}
            <button
              onClick={() => setIsBuilderOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-brand-600 hover:bg-brand-700 active:scale-95 text-white text-xs font-black rounded-xl shadow-md shadow-brand-600/25 transition-all whitespace-nowrap"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>إنشاء عرض سعر</span>
            </button>

            {/* User Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-100 transition-colors border border-slate-200/80"
              >
                <div className="w-8 h-8 rounded-lg bg-brand-600 text-white font-black flex items-center justify-center text-xs">
                  {user.name ? user.name.charAt(0) : 'U'}
                </div>
                <div className="hidden lg:flex flex-col text-right">
                  <span className="text-xs font-black text-slate-900 leading-tight">{user.name}</span>
                  <span className={`text-[10px] font-bold ${user.plan === 'Pro' ? 'text-brand-600' : user.plan === 'Business' ? 'text-amber-600' : 'text-slate-400'}`}>
                    خطة {user.plan}
                  </span>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {showUserMenu && (
                <div className="absolute left-0 mt-2 w-64 bg-white rounded-2xl shadow-elevated border border-slate-200 p-2.5 z-50 animate-in fade-in space-y-1.5">
                  <div className="p-2 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="font-black text-slate-900 text-xs block">{user.name}</span>
                    <span className="text-[11px] text-slate-500 block truncate">{user.businessName}</span>
                    <span className="text-[10px] font-mono text-slate-400">{user.phone}</span>
                  </div>

                  <button
                    onClick={() => {
                      setShowUserMenu(false);
                      setIsUpgradeModalOpen(true);
                    }}
                    className="w-full text-right p-2 hover:bg-amber-50 rounded-xl text-xs font-bold text-amber-800 transition-colors flex items-center justify-between"
                  >
                    <span>ترقية الخطة والاشتراك</span>
                    <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  </button>

                  <button
                    onClick={() => {
                      setShowUserMenu(false);
                      onOpenLanding();
                    }}
                    className="w-full text-right p-2 hover:bg-slate-50 rounded-xl text-xs font-bold text-slate-700 transition-colors flex items-center justify-between"
                  >
                    <span>صفحة الهبوط (Landing)</span>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                  </button>

                  <button
                    onClick={() => {
                      setShowUserMenu(false);
                      logout();
                    }}
                    className="w-full text-right p-2 hover:bg-rose-50 rounded-xl text-xs font-bold text-rose-600 transition-colors flex items-center justify-between border-t border-slate-100 pt-2"
                  >
                    <span>تسجيل الخروج</span>
                    <LogOut className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </header>
  );
};
