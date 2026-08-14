import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  ArrowRight,
  Plus,
  Trash2,
  Send,
  Building,
  CheckCircle2,
  ChevronDown,
  Sparkles
} from 'lucide-react';

export const MobileSimulatorModal = () => {
  const {
    isMobileSimulatorOpen,
    setIsMobileSimulatorOpen,
    clients,
    services,
    formatDZD,
    saveDevis,
    setPublicPreviewDevis,
    showToast
  } = useApp();

  const [selectedClientIndex, setSelectedClientIndex] = useState(0);
  const [mobileItems, setMobileItems] = useState([
    { id: 'm-1', name: 'تركيب السيراميك', unit: 'م²', quantity: 50, price: 1200, total: 60000 },
    { id: 'm-2', name: 'دهان داخلي', unit: 'م²', quantity: 25, price: 1000, total: 25000 },
  ]);

  if (!isMobileSimulatorOpen) return null;

  const currentClient = clients[selectedClientIndex] || clients[0];

  const handleMobileItemChange = (idx, field, val) => {
    const next = [...mobileItems];
    next[idx][field] = val;
    const qty = Number(field === 'quantity' ? val : next[idx].quantity) || 0;
    const prc = Number(field === 'price' ? val : next[idx].price) || 0;
    next[idx].total = qty * prc;
    setMobileItems(next);
  };

  const addMobileItem = () => {
    setMobileItems([
      ...mobileItems,
      { id: `m-${Date.now()}`, name: 'خدمة جديدة', unit: 'م²', quantity: 10, price: 1500, total: 15000 }
    ]);
  };

  const removeMobileItem = (idx) => {
    if (mobileItems.length <= 1) return;
    setMobileItems(mobileItems.filter((_, i) => i !== idx));
  };

  const subtotal = mobileItems.reduce((acc, i) => acc + i.total, 0);
  const discount = 0;
  const total = subtotal - discount;

  const handleSendToClient = () => {
    const payload = {
      clientId: currentClient.id,
      clientName: currentClient.name,
      clientPhone: currentClient.phone,
      clientAddress: currentClient.address,
      items: mobileItems,
      subtotal,
      discountType: 'fixed',
      discountValue: 0,
      taxRate: 0,
      taxAmount: 0,
      total,
      depositRequired: total * 0.3,
      paymentTerms: '30% عربون والباقي عند التسليم',
      notes: 'تم الإنشاء عبر تطبيق Devisly للجوال',
      status: 'بانتظار الرد'
    };

    saveDevis(payload);
    showToast('تم إرسال عرض السعر للعميل عبر WhatsApp بنجاح!');
    setIsMobileSimulatorOpen(false);
    setPublicPreviewDevis(payload);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      {/* Modal Container */}
      <div className="relative flex flex-col items-center">
        
        {/* Close Button Top */}
        <button
          onClick={() => setIsMobileSimulatorOpen(false)}
          className="absolute -top-12 left-0 sm:-left-12 p-2 bg-white/20 hover:bg-white/30 text-white rounded-full transition-all"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Smartphone Hardware Frame */}
        <div className="w-[360px] sm:w-[380px] h-[740px] bg-slate-950 rounded-[48px] p-3.5 shadow-2xl border-4 border-slate-800 relative flex flex-col overflow-hidden">
          
          {/* Dynamic Island / Notch */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-4 bg-slate-900 rounded-full z-30 flex items-center justify-center">
            <div className="w-2.5 h-2.5 bg-slate-950 rounded-full ml-3" />
            <div className="w-2 h-2 bg-blue-950 rounded-full" />
          </div>

          {/* Screen Content (White background) */}
          <div className="w-full h-full bg-white rounded-[36px] overflow-hidden flex flex-col relative font-sans text-right select-none">
            
            {/* Status Bar */}
            <div className="pt-3 px-6 pb-2 flex items-center justify-between text-[11px] font-bold text-slate-800 z-20">
              <span className="font-mono">9:41</span>
              <div className="flex items-center gap-1.5 text-slate-700">
                <span className="text-[10px]">5G</span>
                <div className="w-5 h-2.5 border border-slate-800 rounded-sm p-0.5 flex items-center">
                  <div className="w-full h-full bg-slate-800 rounded-2xs" />
                </div>
              </div>
            </div>

            {/* Mobile Header matching mockup */}
            <div className="px-5 py-3 border-b border-slate-100 flex items-center justify-between">
              <button
                onClick={() => setIsMobileSimulatorOpen(false)}
                className="p-1 text-slate-600 hover:text-slate-900 rounded-lg"
              >
                <ArrowRight className="w-5 h-5 stroke-[2.5]" />
              </button>
              <h3 className="text-base font-black text-slate-900">إنشاء عرض سعر</h3>
              <div className="w-5" />
            </div>

            {/* Mobile Scrollable Form */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
              
              {/* Client Selector Box */}
              <div>
                <label className="block text-[11px] font-black text-slate-400 mb-1">العميل</label>
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 flex items-start justify-between">
                  <div className="flex items-start gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-brand-100 text-brand-700 flex items-center justify-center shrink-0">
                      <Building className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-black text-slate-900 text-xs">{currentClient.name}</h4>
                      <p className="text-[10px] text-slate-500 mt-0.5">العنوان: {currentClient.address}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setSelectedClientIndex((selectedClientIndex + 1) % clients.length)}
                    className="text-slate-400 hover:text-brand-600 p-1"
                    title="تبديل العميل"
                  >
                    <ChevronDown className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Services List */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-black text-slate-400">الخدمات</label>
                </div>

                {mobileItems.map((item, idx) => (
                  <div key={item.id} className="p-3 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-800 text-xs">{idx + 1}. {item.name}</span>
                      <button
                        onClick={() => removeMobileItem(idx)}
                        className="text-rose-400 hover:text-rose-600 p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-white p-2 rounded-xl border border-slate-200 flex items-center justify-between">
                        <span className="text-[10px] text-slate-400 font-bold">الكمية:</span>
                        <input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => handleMobileItemChange(idx, 'quantity', e.target.value)}
                          className="w-12 text-center text-xs font-black outline-none"
                        />
                        <span className="text-[10px] text-slate-500">{item.unit}</span>
                      </div>

                      <div className="bg-white p-2 rounded-xl border border-slate-200 flex items-center justify-between">
                        <span className="text-[10px] text-slate-400 font-bold">السعر:</span>
                        <input
                          type="number"
                          value={item.price}
                          onChange={(e) => handleMobileItemChange(idx, 'price', e.target.value)}
                          className="w-14 text-center text-xs font-black outline-none"
                        />
                        <span className="text-[9px] text-slate-500">دج</span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center text-[11px] pt-1 border-t border-slate-100">
                      <span className="text-slate-400 font-bold">الإجمالي:</span>
                      <span className="font-black text-brand-700">{formatDZD(item.total)}</span>
                    </div>
                  </div>
                ))}

                {/* Add Service Button */}
                <button
                  type="button"
                  onClick={addMobileItem}
                  className="w-full py-2 border-2 border-dashed border-brand-300 text-brand-600 bg-brand-50/50 hover:bg-brand-50 rounded-2xl font-black text-xs flex items-center justify-center gap-1 transition-all"
                >
                  <Plus className="w-3.5 h-3.5 stroke-[3]" />
                  <span>إضافة خدمة</span>
                </button>
              </div>

              {/* Mobile Totals Breakdown */}
              <div className="p-3.5 bg-slate-100/70 rounded-2xl space-y-1.5 text-xs font-bold text-slate-700">
                <div className="flex justify-between">
                  <span className="text-slate-500">المجموع الفرعي:</span>
                  <span className="font-mono">{formatDZD(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">خصم:</span>
                  <span className="font-mono">0 دج</span>
                </div>
                <div className="flex justify-between text-brand-700 text-sm font-black pt-1.5 border-t border-slate-200">
                  <span>المجموع الكلي:</span>
                  <span className="font-mono text-base">{formatDZD(total)}</span>
                </div>
              </div>

            </div>

            {/* Mobile Bottom Action: إرسال للعميل */}
            <div className="p-4 bg-white border-t border-slate-100">
              <button
                onClick={handleSendToClient}
                className="w-full py-3.5 bg-brand-600 hover:bg-brand-700 text-white font-black text-sm rounded-2xl shadow-lg shadow-brand-500/30 flex items-center justify-center gap-2 active:scale-95 transition-all"
              >
                <Send className="w-4 h-4 -scale-x-100" />
                <span>إرسال للعميل</span>
              </button>
            </div>

            {/* Home Indicator Bar */}
            <div className="pb-1.5 pt-0.5 flex justify-center bg-white">
              <div className="w-32 h-1 bg-slate-300 rounded-full" />
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
