import React from 'react';
import { AlertCircle, Clock, Calendar, ChevronLeft, Bell } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AttentionAlerts = () => {
  const { attentionAlerts, setActiveTab } = useApp();

  const getAlertIcon = (type) => {
    switch (type) {
      case 'danger':
        return (
          <div className="w-10 h-10 rounded-2xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-600 shrink-0">
            <AlertCircle className="w-5 h-5 stroke-[2.2]" />
          </div>
        );
      case 'warning':
        return (
          <div className="w-10 h-10 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600 shrink-0">
            <Clock className="w-5 h-5 stroke-[2.2]" />
          </div>
        );
      case 'info':
        return (
          <div className="w-10 h-10 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0">
            <Calendar className="w-5 h-5 stroke-[2.2]" />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/80 shadow-soft flex flex-col justify-between h-full">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <h3 className="text-base font-extrabold text-slate-900">تحتاج انتباهك</h3>
            <Bell className="w-4 h-4 text-slate-400" />
          </div>
        </div>

        <div className="space-y-3">
          {attentionAlerts.map((alert) => (
            <div
              key={alert.id}
              onClick={() => setActiveTab(alert.targetTab)}
              className="p-3.5 rounded-2xl border border-slate-100 hover:border-slate-300/80 bg-slate-50/60 hover:bg-white transition-all cursor-pointer flex items-center justify-between gap-3 group"
            >
              <div className="flex items-center gap-3">
                {getAlertIcon(alert.type)}
                <div className="flex flex-col text-right">
                  <span className={`text-xs font-black ${
                    alert.type === 'danger' ? 'text-rose-600' :
                    alert.type === 'warning' ? 'text-amber-800' : 'text-blue-700'
                  }`}>
                    {alert.title}
                  </span>
                  <span className="text-[11px] text-slate-500 font-medium mt-0.5">
                    {alert.subtitle}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-4 mt-2 border-t border-slate-100 text-left">
        <button
          onClick={() => setActiveTab('devis')}
          className="inline-flex items-center gap-1 text-xs font-bold text-brand-600 hover:text-brand-700 transition-colors"
        >
          <span>عرض الكل</span>
          <ChevronLeft className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
