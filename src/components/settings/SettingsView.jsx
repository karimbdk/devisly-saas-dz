import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Settings, Building, ShieldCheck, Check, Save } from 'lucide-react';

export const SettingsView = () => {
  const { user, setUser, showToast } = useApp();

  const [formData, setFormData] = useState({ ...user });

  const handleChange = (field, val) => {
    setFormData(prev => ({ ...prev, [field]: val }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    setUser(formData);
    showToast('تم حفظ إعدادات المؤسسة بنجاح');
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in max-w-4xl">
      <div>
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
          إعدادات النشاط التجاري والوثائق
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          تخصيص الهوية التجارية، المعلومات القانونية والشروط الافتراضية للظهور على الوثائق
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        
        {/* Business Identity */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-soft space-y-4">
          <h3 className="text-sm font-black text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
            <Building className="w-4 h-4 text-brand-600" />
            <span>بيانات المؤسسة أو الحرفي</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-bold">
            <div>
              <label className="block text-slate-700 mb-1">اسم المؤسسة / الاسم التجاري *</label>
              <input
                type="text"
                required
                value={formData.businessName}
                onChange={(e) => handleChange('businessName', e.target.value)}
                className="w-full p-2.5 bg-slate-50 rounded-xl border border-slate-300 outline-none focus:border-brand-600"
              />
            </div>

            <div>
              <label className="block text-slate-700 mb-1">اسم المسؤول / الحرفي *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                className="w-full p-2.5 bg-slate-50 rounded-xl border border-slate-300 outline-none focus:border-brand-600"
              />
            </div>

            <div>
              <label className="block text-slate-700 mb-1">رقم الهاتف الرسمي للتواصل والواتساب *</label>
              <input
                type="text"
                required
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                className="w-full p-2.5 bg-slate-50 rounded-xl border border-slate-300 outline-none focus:border-brand-600 font-mono"
              />
            </div>

            <div>
              <label className="block text-slate-700 mb-1">البريد الإلكتروني</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                className="w-full p-2.5 bg-slate-50 rounded-xl border border-slate-300 outline-none focus:border-brand-600"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-slate-700 mb-1">العنوان التجاري</label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => handleChange('address', e.target.value)}
                className="w-full p-2.5 bg-slate-50 rounded-xl border border-slate-300 outline-none focus:border-brand-600"
              />
            </div>
          </div>
        </div>

        {/* Legal Info */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-soft space-y-4">
          <h3 className="text-sm font-black text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
            <ShieldCheck className="w-4 h-4 text-teal-600" />
            <span>المعلومات الجبائية والقانونية (اختياري)</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-bold">
            <div>
              <label className="block text-slate-700 mb-1">رقم التعريف الجبائي (NIF)</label>
              <input
                type="text"
                value={formData.nif || ''}
                onChange={(e) => handleChange('nif', e.target.value)}
                placeholder="0019..."
                className="w-full p-2.5 bg-slate-50 rounded-xl border border-slate-300 outline-none focus:border-brand-600 font-mono"
              />
            </div>

            <div>
              <label className="block text-slate-700 mb-1">رقم السجل التجاري أو بطاقة الحرفي (RC)</label>
              <input
                type="text"
                value={formData.rc || ''}
                onChange={(e) => handleChange('rc', e.target.value)}
                placeholder="16/00-..."
                className="w-full p-2.5 bg-slate-50 rounded-xl border border-slate-300 outline-none focus:border-brand-600 font-mono"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="flex items-center gap-2 px-8 py-3 bg-brand-600 hover:bg-brand-700 active:scale-95 text-white font-black text-xs rounded-xl shadow-md transition-all"
          >
            <Save className="w-4 h-4" />
            <span>حفظ الإعدادات</span>
          </button>
        </div>

      </form>
    </div>
  );
};
