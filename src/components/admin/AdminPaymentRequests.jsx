import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  ShieldAlert,
  CheckCircle2,
  XCircle,
  Clock,
  ExternalLink,
  MessageSquare,
  Search,
  Check,
  X,
  FileText,
  DollarSign,
  Zap,
  Sparkles,
  Lock
} from 'lucide-react';

export const AdminPaymentRequests = () => {
  const { formatDZD, showToast, upgradePlan } = useApp();

  const [search, setSearch] = useState('');
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [rejectReasonModal, setRejectReasonModal] = useState(false);
  const [rejectReason, setRejectReason] = useState('');

  const [requests, setRequests] = useState([
    {
      id: "req-881",
      number: "#REQ-2024-881",
      userName: "كريم بن سالم",
      userPhone: "+213 555 12 34 56",
      userEmail: "contact@alofok-services.dz",
      planName: "Pro",
      billingCycle: "سنوي (12 شهر)",
      amount: 15000,
      paymentMethod: "BaridiMob (تطبيق بريدي موب)",
      reference: "BM-99824109",
      date: "2024-05-21 14:30",
      status: "بانتظار المراجعة", // بانتظار المراجعة, مفعل, مرفوض, بانتظار معلومات
      slipImage: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400&auto=format&fit=crop&q=80",
      notes: "تم إرسال وصل بريدي موب عبر واتساب المبيعات"
    },
    {
      id: "req-880",
      number: "#REQ-2024-880",
      userName: "فاتح بوخالفة",
      userPhone: "+213 658 44 33 22",
      userEmail: "hadada.setif@gmail.com",
      planName: "Pro",
      billingCycle: "شهري",
      amount: 1500,
      paymentMethod: "تحويل بريدي CCP",
      reference: "CCP-487125",
      date: "2024-05-20 11:15",
      status: "مفعل",
      slipImage: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400&auto=format&fit=crop&q=80",
      notes: "تم التحقق من الحساب البريدي وتفعيل الخطة"
    },
    {
      id: "req-879",
      number: "#REQ-2024-879",
      userName: "سمير قادري",
      userPhone: "+213 770 11 22 33",
      userEmail: "nour.electrique@gmail.com",
      planName: "Business",
      billingCycle: "شهري",
      amount: 3500,
      paymentMethod: "البطاقة الذهبية (Chargily Pay)",
      reference: "CHRG-991204",
      date: "2024-05-19 16:00",
      status: "مفعل",
      slipImage: null,
      notes: "دفع إلكتروني آلي معتمد"
    }
  ]);

  const handleApprove = (req) => {
    setRequests(prev => prev.map(r => r.id === req.id ? { ...r, status: "مفعل" } : r));
    upgradePlan(req.planName);
    showToast(`تمت الموافقة على طلب الدفع ${req.number} وتفعيل خطة ${req.planName} للمستخدم فورياً!`);
    setSelectedRequest(null);
  };

  const handleReject = () => {
    if (!selectedRequest || !rejectReason.trim()) return;
    setRequests(prev => prev.map(r => r.id === selectedRequest.id ? { ...r, status: "مرفوض", rejectReason } : r));
    showToast(`تم رفض الطلب ${selectedRequest.number} وإشعار المستخدم عبر WhatsApp`);
    setRejectReasonModal(false);
    setSelectedRequest(null);
    setRejectReason('');
  };

  const filtered = requests.filter(r => {
    return r.userName.toLowerCase().includes(search.toLowerCase()) ||
           r.number.toLowerCase().includes(search.toLowerCase()) ||
           r.reference.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div className="space-y-6 pb-12 animate-in fade-in">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 text-white p-6 rounded-3xl shadow-card">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-brand-600 flex items-center justify-center text-white">
            <Lock className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-black bg-brand-500/20 text-brand-300 border border-brand-400/30 px-2.5 py-0.5 rounded-full">
                قسم الإدارة والمبيعات (Admin Desk)
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black mt-1">مراجعة وتفعيل اشتراكات WhatsApp والتحويلات</h2>
            <p className="text-xs text-slate-400">فحص وصولات الدفع وتفعيل الخطط للمستخدمين فوراً (Section 47)</p>
          </div>
        </div>

        <div className="flex items-center gap-3 font-mono text-xs">
          <div className="bg-slate-800/80 px-4 py-2 rounded-xl border border-slate-700">
            <span className="text-slate-400 block text-[10px] font-sans">إجمالي مبيعات الاشتراكات</span>
            <span className="text-emerald-400 font-black text-sm">
              {formatDZD(requests.filter(r => r.status === 'مفعل').reduce((a, b) => a + b.amount, 0))}
            </span>
          </div>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-soft flex items-center justify-between">
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            placeholder="بحث برقم الطلب، العميل أو رقم المرجع..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-50 pl-4 pr-10 py-2 rounded-xl border border-slate-200 text-xs font-bold outline-none focus:bg-white focus:border-brand-500"
          />
          <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
        </div>
      </div>

      {/* Requests Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right border-collapse text-xs font-bold">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-black text-slate-400 uppercase">
                <th className="py-3.5 px-4">رقم الطلب</th>
                <th className="py-3.5 px-4">المستخدم</th>
                <th className="py-3.5 px-4">الخطة والدورة</th>
                <th className="py-3.5 px-4">طريقة الدفع</th>
                <th className="py-3.5 px-4">المرجع</th>
                <th className="py-3.5 px-4">المبلغ</th>
                <th className="py-3.5 px-4 text-center">الحالة</th>
                <th className="py-3.5 px-4 text-center">إجراءات المراجعة</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filtered.map((req) => (
                <tr key={req.id} className="hover:bg-slate-50/60">
                  <td className="py-3.5 px-4 font-mono font-black text-brand-600">{req.number}</td>
                  <td className="py-3.5 px-4">
                    <span className="font-black text-slate-900 block">{req.userName}</span>
                    <span className="text-[10px] text-slate-400 font-mono">{req.userPhone}</span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded-md bg-brand-50 text-brand-700 text-[11px] font-black">
                      {req.planName} ({req.billingCycle})
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-600">{req.paymentMethod}</td>
                  <td className="py-3.5 px-4 font-mono text-slate-500">{req.reference}</td>
                  <td className="py-3.5 px-4 font-mono font-black text-slate-900">{formatDZD(req.amount)}</td>
                  <td className="py-3.5 px-4 text-center">
                    <span className={`px-2.5 py-1 rounded-lg text-xs font-black border ${
                      req.status === 'مفعل' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                      req.status === 'مرفوض' ? 'bg-rose-50 text-rose-700 border-rose-200' :
                      'bg-amber-50 text-amber-700 border-amber-200'
                    }`}>
                      {req.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <div className="flex items-center justify-center gap-1.5">
                      {req.status === 'بانتظار المراجعة' ? (
                        <>
                          <button
                            onClick={() => handleApprove(req)}
                            className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-black flex items-center gap-1 shadow-sm transition-all"
                            title="الموافقة والتفعيل الفوري"
                          >
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                            <span>تفعيل</span>
                          </button>

                          <button
                            onClick={() => {
                              setSelectedRequest(req);
                              setRejectReasonModal(true);
                            }}
                            className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors"
                            title="رفض الطلب"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </>
                      ) : (
                        <span className="text-slate-400 text-xs font-bold">تمت المعالجة</span>
                      )}

                      <a
                        href={`https://wa.me/${req.userPhone.replace(/\D/g, '')}`}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                        title="محادثة المستخدم على WhatsApp"
                      >
                        <MessageSquare className="w-4 h-4" />
                      </a>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Reject Modal */}
      {rejectReasonModal && selectedRequest && (
        <div className="fixed inset-0 z-60 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-slate-200 space-y-4">
            <h3 className="font-black text-slate-900 text-base">رفض طلب الدفع {selectedRequest.number}</h3>
            <p className="text-xs text-slate-500">اذكر سبب الرفض ليتم إرساله للمستخدم وتوثيقه في السجل:</p>
            <textarea
              rows="3"
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="مثال: رقم العملية غير متطابق مع كشف الحساب أو الوصل غير واضح..."
              className="w-full p-3 bg-slate-50 rounded-xl border border-slate-300 text-xs font-bold outline-none focus:border-rose-500"
            />
            <div className="flex gap-2">
              <button
                onClick={handleReject}
                className="flex-1 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-black"
              >
                تأكيد الرفض
              </button>
              <button
                onClick={() => setRejectReasonModal(false)}
                className="px-4 py-2.5 bg-slate-100 text-slate-700 rounded-xl text-xs font-bold"
              >
                إلغاء
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
