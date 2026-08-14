import React from 'react';
import { ArrowUpRight, ArrowDownRight, FileText, TrendingUp, Wallet, AlertCircle } from 'lucide-react';

export const KpiCard = ({ title, value, change, isPositive, iconType, color = "blue", subtitle = "من الشهر الماضي" }) => {
  const getIcon = () => {
    switch (iconType) {
      case 'file':
        return <FileText className="w-5 h-5 text-blue-600" />;
      case 'chart':
        return <TrendingUp className="w-5 h-5 text-amber-600" />;
      case 'wallet':
        return <Wallet className="w-5 h-5 text-emerald-600" />;
      case 'alert':
        return <AlertCircle className="w-5 h-5 text-rose-600" />;
      default:
        return <FileText className="w-5 h-5 text-blue-600" />;
    }
  };

  const getIconBg = () => {
    switch (iconType) {
      case 'file':
        return 'bg-blue-50 border-blue-100';
      case 'chart':
        return 'bg-amber-50 border-amber-100';
      case 'wallet':
        return 'bg-emerald-50 border-emerald-100';
      case 'alert':
        return 'bg-rose-50 border-rose-100';
      default:
        return 'bg-blue-50 border-blue-100';
    }
  };

  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-soft hover:shadow-card transition-all group flex flex-col justify-between">
      <div className="flex items-start justify-between mb-3">
        <div className="flex flex-col">
          <span className="text-xs font-bold text-slate-500 mb-1">{title}</span>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {value}
          </div>
        </div>
        <div className={`w-11 h-11 rounded-2xl flex items-center justify-center border ${getIconBg()} group-hover:scale-105 transition-transform`}>
          {getIcon()}
        </div>
      </div>

      <div className="flex items-center gap-1.5 text-xs">
        <span className={`inline-flex items-center gap-0.5 font-extrabold ${isPositive ? 'text-emerald-600' : 'text-rose-600'}`}>
          {isPositive ? (
            <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
          ) : (
            <ArrowDownRight className="w-3.5 h-3.5 stroke-[2.5]" />
          )}
          {change}
        </span>
        <span className="text-slate-400 font-medium">{subtitle}</span>
      </div>
    </div>
  );
};
