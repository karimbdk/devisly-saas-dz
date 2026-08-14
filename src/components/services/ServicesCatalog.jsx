import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Wrench, Plus, Search, Tag, DollarSign, X } from 'lucide-react';

export const ServicesCatalog = () => {
  const { services, addService, formatDZD } = useApp();
  const [search, setSearch] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [name, setName] = useState('');
  const [unit, setUnit] = useState('م²');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('عام');

  const filtered = services.filter(s => {
    return s.name.toLowerCase().includes(search.toLowerCase()) ||
           (s.category && s.category.toLowerCase().includes(search.toLowerCase()));
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !price) return;

    addService({
      name,
      unit,
      price: Number(price),
      category
    });

    setName('');
    setPrice('');
    setIsAddModalOpen(false);
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            دليل الخدمات والأسعار (Services)
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            قائمة الخدمات الجاهزة وأسعار الوحدات الافتراضية للإدراج السريع في عروض الأسعار
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center justify-center gap-2 px-5 py-2.5 bg-brand-600 hover:bg-brand-700 active:scale-95 text-white text-xs font-black rounded-xl shadow-md shadow-brand-600/25 transition-all"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>إضافة خدمة جديدة</span>
        </button>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-soft">
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            placeholder="بحث بالخدمة أو التصنيف..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-50 pl-4 pr-10 py-2 rounded-xl border border-slate-200 text-xs font-bold outline-none focus:bg-white focus:border-brand-500"
          />
          <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((service) => (
          <div
            key={service.id}
            className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-soft hover:shadow-card transition-all flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600">
                <Wrench className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-black text-slate-900 text-xs">{service.name}</h3>
                <span className="text-[10px] text-brand-600 bg-brand-50 px-2 py-0.5 rounded-full font-bold inline-block mt-1">
                  {service.category || 'عام'}
                </span>
              </div>
            </div>

            <div className="text-left font-mono">
              <span className="text-sm font-black text-slate-900 block">{formatDZD(service.price)}</span>
              <span className="text-[10px] text-slate-400 font-sans">لكل {service.unit}</span>
            </div>
          </div>
        ))}
      </div>

      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-slate-200 animate-in zoom-in-95 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-black text-slate-900 text-base">إضافة خدمة إلى الدليل</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 text-xs font-bold">
              <div>
                <label className="block text-slate-700 mb-1">اسم الخدمة أو المادة *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="مثال: تركيب شبكة كاميرات IP"
                  className="w-full p-2.5 bg-slate-50 rounded-xl border border-slate-300 outline-none focus:border-brand-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-700 mb-1">الوحدة</label>
                  <select
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 rounded-xl border border-slate-300 outline-none focus:border-brand-600"
                  >
                    <option value="م²">م² (متر مربع)</option>
                    <option value="متر">متر طولي</option>
                    <option value="قطعة">قطعة</option>
                    <option value="ساعة">ساعة</option>
                    <option value="يومية">يومية</option>
                    <option value="نقطة">نقطة</option>
                    <option value="كاميرا">كاميرا</option>
                    <option value="خدمة">خدمة كاملة</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 mb-1">السعر المبدئي (دج) *</label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 rounded-xl border border-slate-300 outline-none focus:border-brand-600 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 mb-1">التصنيف</label>
                <input
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="مثال: تشطيب، كهرباء، صيانة..."
                  className="w-full p-2.5 bg-slate-50 rounded-xl border border-slate-300 outline-none focus:border-brand-600"
                />
              </div>

              <div className="pt-3 flex gap-2">
                <button
                  type="submit"
                  className="flex-1 py-3 bg-brand-600 hover:bg-brand-700 text-white rounded-xl transition-all font-black"
                >
                  حفظ الخدمة
                </button>
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl"
                >
                  إلغاء
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
