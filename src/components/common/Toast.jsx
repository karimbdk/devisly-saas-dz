import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';

export const Toast = () => {
  const { toastMessage } = useApp();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 left-6 z-60 animate-in slide-in-from-bottom-5 duration-200">
      <div className={`px-4 py-3 rounded-2xl shadow-elevated border flex items-center gap-2.5 text-xs font-bold ${
        toastMessage.type === 'info'
          ? 'bg-slate-900 text-white border-slate-800'
          : toastMessage.type === 'danger'
          ? 'bg-rose-600 text-white border-rose-700'
          : 'bg-emerald-600 text-white border-emerald-700'
      }`}>
        {toastMessage.type === 'danger' ? (
          <AlertCircle className="w-4 h-4" />
        ) : toastMessage.type === 'info' ? (
          <Info className="w-4 h-4" />
        ) : (
          <CheckCircle2 className="w-4 h-4" />
        )}
        <span>{toastMessage.message}</span>
      </div>
    </div>
  );
};
