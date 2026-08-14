import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Lock,
  ShieldCheck,
  KeyRound,
  ArrowRight,
  Sparkles,
  Server,
  Eye,
  EyeOff
} from 'lucide-react';

export const AdminLoginPage = ({ onCancel }) => {
  const { loginAdmin } = useApp();
  const [adminPassword, setAdminPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = loginAdmin(adminPassword.trim());
    if (!success) {
      setError(true);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4 font-sans selection:bg-amber-500 selection:text-slate-950" dir="rtl">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl space-y-6 relative overflow-hidden">
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
        
        <div className="text-center space-y-2">
          <div className="w-16 h-16 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-amber-500/10">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <span className="text-[10px] font-black text-amber-400 uppercase tracking-widest bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full inline-block">
            بوابة الإدارة العليا المشفرة
          </span>
          <h1 className="text-2xl font-black text-white">Devisly Super Admin Portal</h1>
          <p className="text-xs text-slate-400">
            لوحة تحكم إدارة الحسابات الحقيقية والاشتراكات والتحصيل المالي
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs font-bold">
          <div>
            <label className="block text-slate-300 mb-2">كلمة مرور الإدارة القوية</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                autoFocus
                placeholder="ادخل كلمة مرور الإدارة المشفرة"
                value={adminPassword}
                onChange={(e) => { setAdminPassword(e.target.value); setError(false); }}
                className={`w-full bg-slate-950 border pl-10 pr-10 py-3.5 rounded-2xl text-white outline-none font-mono text-sm tracking-wider transition-all ${
                  error ? 'border-rose-500 focus:border-rose-500' : 'border-slate-800 focus:border-amber-500'
                }`}
              />
              <Lock className="w-4 h-4 text-slate-500 absolute right-3.5 top-1/2 -translate-y-1/2" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {error && (
              <span className="text-[11px] text-rose-400 mt-1.5 block text-center font-bold">
                كلمة المرور غير صحيحة، يرجى التأكد وإعادة المحاولة
              </span>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-amber-500 hover:bg-amber-400 active:scale-95 text-slate-950 rounded-2xl font-black text-sm shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2"
          >
            <KeyRound className="w-4 h-4" />
            <span>دخول لوحة التحكم العليا</span>
          </button>

          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="w-full py-2.5 text-slate-500 hover:text-slate-300 text-xs font-bold transition-colors"
            >
              ← العودة للموقع العام
            </button>
          )}
        </form>

        <div className="pt-4 border-t border-slate-800/80 text-center text-[10px] text-slate-500">
          مسار محمي ومخصص لمالك المنصة وإدارة الاشتراكات فقط 🔒
        </div>
      </div>
    </div>
  );
};
