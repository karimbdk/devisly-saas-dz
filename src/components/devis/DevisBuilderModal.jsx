import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  Plus,
  Trash2,
  User,
  Calendar,
  DollarSign,
  FileText,
  Sparkles,
  Share2,
  Eye,
  Check,
  Zap
} from 'lucide-react';

export const DevisBuilderModal = () => {
  const {
    isBuilderOpen,
    setIsBuilderOpen,
    editingDevis,
    setEditingDevis,
    clients,
    addClient,
    services,
    saveDevis,
    formatDZD,
    setPublicPreviewDevis
  } = useApp();

  // Form State
  const [selectedClientId, setSelectedClientId] = useState('');
  const [showNewClientForm, setShowNewClientForm] = useState(false);
  const [newClientName, setNewClientName] = useState('');
  const [newClientPhone, setNewClientPhone] = useState('');
  const [newClientAddress, setNewClientAddress] = useState('');

  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [expiryDays, setExpiryDays] = useState(15);
  
  const [items, setItems] = useState([
    { id: 'item-1', name: 'تركيب السيراميك والبورسلان', unit: 'م²', quantity: 50, price: 1200, total: 60000 },
    { id: 'item-2', name: 'دهان داخلي فينيل فاخر', unit: 'م²', quantity: 25, price: 1000, total: 25000 }
  ]);

  const [discountType, setDiscountType] = useState('fixed'); // 'fixed' | 'percentage'
  const [discountValue, setDiscountValue] = useState(0);
  const [taxRate, setTaxRate] = useState(0); // 0 or 19%
  const [depositPercent, setDepositPercent] = useState(30);
  const [paymentTerms, setPaymentTerms] = useState('30% عربون عند الاتفاق، و70% عند الانتهاء والتسليم.');
  const [notes, setNotes] = useState('يشمل السعر اليد العاملة والمعدات مع ضمان الجودة والإتقان.');

  // Prepopulate if editing
  useEffect(() => {
    if (editingDevis) {
      setSelectedClientId(editingDevis.clientId || '');
      setDate(editingDevis.date || new Date().toISOString().split('T')[0]);
      setItems(editingDevis.items || []);
      setDiscountType(editingDevis.discountType || 'fixed');
      setDiscountValue(editingDevis.discountValue || 0);
      setTaxRate(editingDevis.taxRate || 0);
      setPaymentTerms(editingDevis.paymentTerms || '');
      setNotes(editingDevis.notes || '');
      if (editingDevis.total > 0 && editingDevis.depositRequired > 0) {
        setDepositPercent(Math.round((editingDevis.depositRequired / editingDevis.total) * 100));
      }
    } else {
      // Default to first client if available
      if (clients.length > 0 && !selectedClientId) {
        setSelectedClientId(clients[0].id);
      }
    }
  }, [editingDevis, clients, isBuilderOpen]);

  if (!isBuilderOpen) return null;

  // Item helpers
  const handleItemChange = (index, field, value) => {
    const updated = [...items];
    updated[index][field] = value;
    
    // Auto-calculate line total
    const qty = Number(field === 'quantity' ? value : updated[index].quantity) || 0;
    const prc = Number(field === 'price' ? value : updated[index].price) || 0;
    updated[index].total = qty * prc;
    setItems(updated);
  };

  const addItem = (preset = null) => {
    if (preset) {
      setItems(prev => [
        ...prev,
        {
          id: `item-${Date.now()}`,
          name: preset.name,
          unit: preset.unit,
          quantity: 1,
          price: preset.price,
          total: preset.price
        }
      ]);
    } else {
      setItems(prev => [
        ...prev,
        {
          id: `item-${Date.now()}`,
          name: '',
          unit: 'م²',
          quantity: 1,
          price: 0,
          total: 0
        }
      ]);
    }
  };

  const removeItem = (index) => {
    if (items.length <= 1) return;
    setItems(items.filter((_, i) => i !== index));
  };

  // Calculations
  const subtotal = items.reduce((sum, item) => sum + (Number(item.total) || 0), 0);
  
  let calculatedDiscount = 0;
  if (discountType === 'percentage') {
    calculatedDiscount = (subtotal * (Number(discountValue) || 0)) / 100;
  } else {
    calculatedDiscount = Number(discountValue) || 0;
  }

  const taxableAmount = Math.max(0, subtotal - calculatedDiscount);
  const taxAmount = (taxableAmount * (Number(taxRate) || 0)) / 100;
  const total = taxableAmount + taxAmount;
  const depositRequired = (total * (Number(depositPercent) || 0)) / 100;

  // Calculate Expiry Date
  const expiryDate = new Date(new Date(date).getTime() + expiryDays * 24 * 60 * 60 * 1000)
    .toISOString().split('T')[0];

  const handleSave = (status = 'مسودة', openPreview = false) => {
    let client = clients.find(c => c.id === selectedClientId);

    if (showNewClientForm && newClientName.trim()) {
      client = addClient({
        name: newClientName.trim(),
        phone: newClientPhone.trim(),
        address: newClientAddress.trim(),
        wilaya: 'الجزائر'
      });
    }

    if (!client) {
      alert('الرجاء اختيار العميل أو إضافة عميل جديد');
      return;
    }

    const devisPayload = {
      ...(editingDevis || {}),
      clientId: client.id,
      clientName: client.name,
      clientPhone: client.phone,
      clientAddress: client.address,
      date,
      expiryDate,
      status: editingDevis ? editingDevis.status : status,
      items,
      subtotal,
      discountType,
      discountValue: Number(discountValue),
      taxRate: Number(taxRate),
      taxAmount,
      total,
      depositRequired,
      paymentTerms,
      notes
    };

    saveDevis(devisPayload);

    if (openPreview) {
      setPublicPreviewDevis(devisPayload);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div className="bg-white rounded-3xl w-full max-w-4xl shadow-elevated border border-slate-200 overflow-hidden flex flex-col max-h-[92vh] animate-in zoom-in-95">
        
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-brand-50 border border-brand-100 flex items-center justify-center text-brand-600">
              <FileText className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-900">
                {editingDevis ? `تعديل عرض السعر (${editingDevis.number})` : 'إنشاء عرض سعر جديد'}
              </h2>
              <p className="text-xs text-slate-400">
                أدخل تفاصيل الخدمات والأسعار وسيقوم النظام بحساب الإجمالي فورياً
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              setIsBuilderOpen(false);
              setEditingDevis(null);
            }}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          
          {/* Section 1: Client & Date */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 p-5 bg-slate-50/80 rounded-2xl border border-slate-200/60">
            {/* Client Select */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-black text-slate-700">العميل</label>
                <button
                  type="button"
                  onClick={() => setShowNewClientForm(!showNewClientForm)}
                  className="text-xs font-bold text-brand-600 hover:underline"
                >
                  {showNewClientForm ? 'اختيار من القائمة' : '+ عميل جديد'}
                </button>
              </div>

              {!showNewClientForm ? (
                <select
                  value={selectedClientId}
                  onChange={(e) => setSelectedClientId(e.target.value)}
                  className="w-full bg-white px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-bold text-slate-800 outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-500/20"
                >
                  {clients.map(c => (
                    <option key={c.id} value={c.id}>
                      {c.name} — {c.phone} ({c.address})
                    </option>
                  ))}
                </select>
              ) : (
                <div className="space-y-2">
                  <input
                    type="text"
                    placeholder="اسم العميل أو المؤسسة"
                    value={newClientName}
                    onChange={(e) => setNewClientName(e.target.value)}
                    className="w-full bg-white px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-bold"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="رقم الهاتف"
                      value={newClientPhone}
                      onChange={(e) => setNewClientPhone(e.target.value)}
                      className="bg-white px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold"
                    />
                    <input
                      type="text"
                      placeholder="العنوان"
                      value={newClientAddress}
                      onChange={(e) => setNewClientAddress(e.target.value)}
                      className="bg-white px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Date & Validity */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-black text-slate-700 mb-1.5">تاريخ العرض</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-white px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-800 outline-none focus:border-brand-600"
                />
              </div>
              <div>
                <label className="block text-xs font-black text-slate-700 mb-1.5">مدة الصلاحية</label>
                <select
                  value={expiryDays}
                  onChange={(e) => setExpiryDays(Number(e.target.value))}
                  className="w-full bg-white px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-800 outline-none focus:border-brand-600"
                >
                  <option value={7}>7 أيام</option>
                  <option value={15}>15 يوماً (افتراضي)</option>
                  <option value={30}>30 يوماً</option>
                  <option value={60}>60 يوماً</option>
                </select>
              </div>
            </div>
          </div>

          {/* Quick Presets from Catalog */}
          <div>
            <span className="text-xs font-extrabold text-slate-500 mb-2 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span>إضافة سريعة من دليل الخدمات:</span>
            </span>
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              {services.slice(0, 5).map(s => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => addItem(s)}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-brand-50 hover:text-brand-700 hover:border-brand-200 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 transition-all shrink-0 flex items-center gap-1.5"
                >
                  <Plus className="w-3 h-3 text-brand-600" />
                  <span>{s.name}</span>
                  <span className="text-[10px] text-slate-400 font-mono font-normal">({formatDZD(s.price)})</span>
                </button>
              ))}
            </div>
          </div>

          {/* Section 2: Items Table */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-black text-slate-900">الخدمات والمواد (البنود)</h3>
              <button
                type="button"
                onClick={() => addItem()}
                className="inline-flex items-center gap-1.5 text-xs font-black text-brand-600 hover:text-brand-700 bg-brand-50 hover:bg-brand-100/70 px-3 py-1.5 rounded-xl transition-colors"
              >
                <Plus className="w-4 h-4 stroke-[3]" />
                <span>إضافة بند جديد</span>
              </button>
            </div>

            <div className="space-y-2.5">
              {items.map((item, idx) => (
                <div
                  key={item.id || idx}
                  className="p-3.5 bg-white rounded-2xl border border-slate-200 shadow-sm hover:border-slate-300 transition-all grid grid-cols-12 gap-2.5 items-center"
                >
                  <div className="col-span-12 sm:col-span-5">
                    <label className="text-[10px] font-bold text-slate-400 block mb-1">وصف الخدمة / البند #{idx + 1}</label>
                    <input
                      type="text"
                      placeholder="مثال: تركيب السيراميك والبورسلان"
                      value={item.name}
                      onChange={(e) => handleItemChange(idx, 'name', e.target.value)}
                      className="w-full bg-slate-50/70 px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-900 outline-none focus:bg-white focus:border-brand-500"
                    />
                  </div>

                  <div className="col-span-4 sm:col-span-2">
                    <label className="text-[10px] font-bold text-slate-400 block mb-1">الوحدة</label>
                    <select
                      value={item.unit}
                      onChange={(e) => handleItemChange(idx, 'unit', e.target.value)}
                      className="w-full bg-slate-50/70 px-2 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 outline-none focus:bg-white focus:border-brand-500"
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

                  <div className="col-span-4 sm:col-span-2">
                    <label className="text-[10px] font-bold text-slate-400 block mb-1">الكمية</label>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => handleItemChange(idx, 'quantity', e.target.value)}
                      className="w-full bg-slate-50/70 px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-900 text-center outline-none focus:bg-white focus:border-brand-500"
                    />
                  </div>

                  <div className="col-span-4 sm:col-span-2">
                    <label className="text-[10px] font-bold text-slate-400 block mb-1">سعر الوحدة (دج)</label>
                    <input
                      type="number"
                      min="0"
                      value={item.price}
                      onChange={(e) => handleItemChange(idx, 'price', e.target.value)}
                      className="w-full bg-slate-50/70 px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-900 text-center outline-none focus:bg-white focus:border-brand-500"
                    />
                  </div>

                  <div className="col-span-12 sm:col-span-1 flex items-center justify-between sm:justify-end gap-2 pt-1 sm:pt-0">
                    <span className="sm:hidden text-xs font-extrabold text-brand-700">
                      الإجمالي: {formatDZD(item.total)}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeItem(idx)}
                      disabled={items.length <= 1}
                      className={`p-2 rounded-xl transition-colors ${
                        items.length <= 1
                          ? 'text-slate-300 cursor-not-allowed'
                          : 'text-rose-400 hover:text-rose-600 hover:bg-rose-50'
                      }`}
                      title="حذف البند"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Financial Calculations & Terms */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
            
            {/* Left Col: Terms & Notes */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-black text-slate-700 mb-1.5">شروط الدفع</label>
                <textarea
                  rows="2"
                  value={paymentTerms}
                  onChange={(e) => setPaymentTerms(e.target.value)}
                  className="w-full bg-slate-50/70 px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 outline-none focus:bg-white focus:border-brand-500"
                />
              </div>

              <div>
                <label className="block text-xs font-black text-slate-700 mb-1.5">ملاحظات وشروط الضمان</label>
                <textarea
                  rows="2"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-slate-50/70 px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 outline-none focus:bg-white focus:border-brand-500"
                />
              </div>
            </div>

            {/* Right Col: Totals Box */}
            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-3">
              {/* Subtotal */}
              <div className="flex items-center justify-between text-xs font-bold text-slate-600">
                <span>المجموع الفرعي:</span>
                <span className="font-mono text-slate-900">{formatDZD(subtotal)}</span>
              </div>

              {/* Discount Input */}
              <div className="flex items-center justify-between gap-3 text-xs font-bold text-slate-600">
                <span>الخصم:</span>
                <div className="flex items-center gap-1.5">
                  <input
                    type="number"
                    min="0"
                    value={discountValue}
                    onChange={(e) => setDiscountValue(e.target.value)}
                    className="w-20 bg-white px-2.5 py-1 rounded-lg border border-slate-300 text-xs font-bold text-center"
                  />
                  <select
                    value={discountType}
                    onChange={(e) => setDiscountType(e.target.value)}
                    className="bg-white px-2 py-1 rounded-lg border border-slate-300 text-xs font-bold"
                  >
                    <option value="fixed">دج</option>
                    <option value="percentage">%</option>
                  </select>
                </div>
              </div>

              {/* Tax TVA */}
              <div className="flex items-center justify-between gap-3 text-xs font-bold text-slate-600">
                <span>الضريبة (TVA):</span>
                <select
                  value={taxRate}
                  onChange={(e) => setTaxRate(Number(e.target.value))}
                  className="bg-white px-2 py-1 rounded-lg border border-slate-300 text-xs font-bold"
                >
                  <option value={0}>معفى (0%)</option>
                  <option value={19}>19% رسم القيمة المضافة</option>
                  <option value={9}>9% رسم مخفض</option>
                </select>
              </div>

              {/* Total Final */}
              <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
                <span className="text-sm font-black text-slate-900">المجموع الكلي:</span>
                <span className="text-xl font-black text-brand-600 font-mono">
                  {formatDZD(total)}
                </span>
              </div>

              {/* Deposit Required */}
              <div className="p-3 bg-brand-50/80 rounded-xl border border-brand-100 flex items-center justify-between text-xs font-black text-brand-900">
                <div className="flex items-center gap-1.5">
                  <span>العربون المطلوب ({depositPercent}%):</span>
                </div>
                <span className="font-mono text-brand-700">{formatDZD(depositRequired)}</span>
              </div>
            </div>

          </div>

        </div>

        {/* Modal Footer Actions */}
        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => handleSave('مسودة', false)}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-100 text-xs font-bold text-slate-700 transition-all"
          >
            حفظ كمسودة
          </button>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => handleSave('بانتظار الرد', true)}
              className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2.5 bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold rounded-xl transition-all shadow-sm"
            >
              <Eye className="w-4 h-4" />
              <span>معاينة الرابط كعميل</span>
            </button>

            <button
              type="button"
              onClick={() => handleSave('بانتظار الرد', false)}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2.5 bg-brand-600 hover:bg-brand-700 active:scale-95 text-white text-xs font-black rounded-xl shadow-md shadow-brand-600/25 transition-all"
            >
              <Share2 className="w-4 h-4" />
              <span>حفظ وإرسال للعميل</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
