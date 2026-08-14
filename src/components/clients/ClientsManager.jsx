import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Users, Plus, Search, Phone, Mail, MapPin, Building, MessageSquare, X } from 'lucide-react';

export const ClientsManager = () => {
  const { clients, addClient, formatDZD, setIsBuilderOpen, setEditingDevis } = useApp();
  const [search, setSearch] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New Client Form State
  const [name, setName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [wilaya, setWilaya] = useState('الجزائر');

  const filtered = clients.filter(c => {
    return c.name.toLowerCase().includes(search.toLowerCase()) ||
           c.phone.includes(search) ||
           (c.contactPerson && c.contactPerson.toLowerCase().includes(search.toLowerCase()));
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    addClient({
      name,
      contactPerson,
      phone,
      email,
      address,
      wilaya
    });

    setName('');
    setContactPerson('');
    setPhone('');
    setEmail('');
    setAddress('');
    setIsAddModalOpen(false);
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            دليل العملاء والشركات (CRM)
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            سجل العملاء، أرقام التواصل، والتعاملات السابقة
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center justify-center gap-2 px-5 py-2.5 bg-brand-600 hover:bg-brand-700 active:scale-95 text-white text-xs font-black rounded-xl shadow-md shadow-brand-600/25 transition-all"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>إضافة عميل جديد</span>
        </button>
      </div>

      {/* Search */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-soft">
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            placeholder="بحث باسم العميل أو رقم الهاتف..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-50 pl-4 pr-10 py-2 rounded-xl border border-slate-200 text-xs font-bold outline-none focus:bg-white focus:border-brand-500"
          />
          <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
        </div>
      </div>

      {/* Clients Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((client) => (
          <div
            key={client.id}
            className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-soft hover:shadow-card transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start gap-3 mb-3">
                <div className="w-11 h-11 rounded-2xl bg-brand-50 border border-brand-100 flex items-center justify-center text-brand-600 shrink-0 font-black">
                  <Building className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-black text-slate-900 text-sm leading-tight">{client.name}</h3>
                  {client.contactPerson && (
                    <span className="text-[11px] text-slate-500 font-medium block mt-0.5">
                      المسؤول: {client.contactPerson}
                    </span>
                  )}
                </div>
              </div>

              <div className="space-y-2 text-xs text-slate-600 py-3 border-y border-slate-100">
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="font-mono">{client.phone}</span>
                </div>
                {client.email && (
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{client.email}</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">{client.address}</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between mt-3">
              <div className="text-[11px]">
                <span className="text-slate-400 block font-bold">إجمالي التعاملات</span>
                <span className="font-mono font-black text-brand-700">{formatDZD(client.totalSpent || 0)}</span>
              </div>

              <div className="flex items-center gap-1.5">
                <a
                  href={`https://wa.me/${client.phone?.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-xl transition-colors"
                  title="مراسلة عبر واتساب"
                >
                  <MessageSquare className="w-4 h-4" />
                </a>

                <button
                  onClick={() => {
                    setEditingDevis(null);
                    setIsBuilderOpen(true);
                  }}
                  className="px-3 py-1.5 bg-brand-50 hover:bg-brand-100 text-brand-700 rounded-xl text-xs font-bold transition-colors"
                >
                  + عرض سعر
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Client Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-slate-200 animate-in zoom-in-95 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-black text-slate-900 text-base">إضافة عميل جديد</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 text-xs font-bold">
              <div>
                <label className="block text-slate-700 mb-1">اسم المؤسسة أو العميل *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="مثال: مؤسسة البناء والتعمير"
                  className="w-full p-2.5 bg-slate-50 rounded-xl border border-slate-300 outline-none focus:border-brand-600"
                />
              </div>

              <div>
                <label className="block text-slate-700 mb-1">الشخص المسؤول للتواصل</label>
                <input
                  type="text"
                  value={contactPerson}
                  onChange={(e) => setContactPerson(e.target.value)}
                  placeholder="مثال: السيد أحمد"
                  className="w-full p-2.5 bg-slate-50 rounded-xl border border-slate-300 outline-none focus:border-brand-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-700 mb-1">رقم الهاتف *</label>
                  <input
                    type="text"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+213 555..."
                    className="w-full p-2.5 bg-slate-50 rounded-xl border border-slate-300 outline-none focus:border-brand-600"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 mb-1">الولاية</label>
                  <input
                    type="text"
                    value={wilaya}
                    onChange={(e) => setWilaya(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 rounded-xl border border-slate-300 outline-none focus:border-brand-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 mb-1">العنوان التفصيلي</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="حي، بلدية..."
                  className="w-full p-2.5 bg-slate-50 rounded-xl border border-slate-300 outline-none focus:border-brand-600"
                />
              </div>

              <div className="pt-3 flex gap-2">
                <button
                  type="submit"
                  className="flex-1 py-3 bg-brand-600 hover:bg-brand-700 text-white rounded-xl transition-all font-black"
                >
                  حفظ العميل
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
