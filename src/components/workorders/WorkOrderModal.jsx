import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  Printer,
  FileCheck,
  CheckCircle2,
  Building,
  Calendar,
  Wrench,
  ShieldCheck,
  Share2
} from 'lucide-react';

export const WorkOrderModal = ({ devis, onClose }) => {
  const { user, formatDZD, showToast } = useApp();

  const [technicianName, setTechnicianName] = useState('فريق التركيب والصيانة رقم 1');
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [targetDate, setTargetDate] = useState(
    new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  );
  const [workNotes, setWorkNotes] = useState(
    'يرجى الالتزام بمعايير السلامة المهنية ومطابقة القياسات قبل بدء التثبيت.'
  );

  if (!devis) return null;

  const workOrderNumber = `#WO-${devis.number.replace('#Q-', '')}`;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-60 bg-slate-900/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white rounded-3xl w-full max-w-4xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[94vh] animate-in zoom-in-95">
        
        {/* Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between no-print">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center font-black">
              <Wrench className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-black">أمر العمل ومحضر الإنجاز (Bon de Travail & PV)</h2>
              <p className="text-xs text-slate-400">وثيقة التكليف الميداني للأشغال ومحضر التسليم النهائي</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white text-xs font-black rounded-xl flex items-center gap-1.5 transition-colors"
            >
              <Printer className="w-4 h-4" />
              <span>طباعة أمر العمل</span>
            </button>
            <button onClick={onClose} className="p-2 text-slate-400 hover:text-white rounded-xl">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Body */}
        <div className="p-6 sm:p-10 overflow-y-auto flex-1 space-y-6 bg-slate-50/40" id="printable-workorder">
          
          {/* Header */}
          <div className="flex items-start justify-between border-b-2 border-slate-300 pb-5">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 border border-amber-200 rounded-full text-amber-800 text-xs font-bold mb-2">
                <FileCheck className="w-4 h-4 text-amber-600" />
                <span>أمر تنفيذ ومحضر استلام أشغال</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900">{user.businessName}</h1>
              <p className="text-xs text-slate-500 font-medium">{user.address} | هاتف: {user.phone}</p>
            </div>

            <div className="text-right">
              <span className="text-xs text-slate-400 font-bold block">رقم أمر العمل:</span>
              <span className="text-lg font-black font-mono text-amber-700">{workOrderNumber}</span>
              <span className="text-xs text-slate-500 font-mono block mt-1">المرجع: {devis.number}</span>
            </div>
          </div>

          {/* Project & Client Card */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-soft text-xs">
            <div>
              <span className="text-slate-400 font-bold block mb-1">العميل وموقع الورشة:</span>
              <h3 className="font-black text-slate-900 text-sm">{devis.clientName}</h3>
              <p className="text-slate-600 mt-0.5">{devis.clientAddress}</p>
              <p className="font-mono text-slate-700 mt-1">هاتف: {devis.clientPhone}</p>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between">
                <span className="text-slate-400 font-bold">الفريق المكلف:</span>
                <span className="font-bold text-slate-900">{technicianName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 font-bold">تاريخ البدء المتوقع:</span>
                <span className="font-mono font-bold text-slate-800">{startDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 font-bold">موعد التسليم المتوقع:</span>
                <span className="font-mono font-bold text-amber-700">{targetDate}</span>
              </div>
            </div>
          </div>

          {/* Items & Tasks Table */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-soft overflow-hidden">
            <div className="px-4 py-2.5 bg-slate-100/80 border-b border-slate-200 font-black text-xs text-slate-700">
              قائمة البنود والأشغال المطلوبة للتنفيذ الميداني:
            </div>
            <table className="w-full text-right border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 font-bold text-[11px]">
                  <th className="py-2.5 px-4">#</th>
                  <th className="py-2.5 px-4">بيان الخدمة والأشغال</th>
                  <th className="py-2.5 px-4 text-center">الوحدة</th>
                  <th className="py-2.5 px-4 text-center">الكمية المقررة</th>
                  <th className="py-2.5 px-4 text-center">حالة الإنجاز</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {devis.items?.map((item, idx) => (
                  <tr key={idx}>
                    <td className="py-3 px-4 font-mono text-slate-400">{idx + 1}</td>
                    <td className="py-3 px-4 font-bold text-slate-900">{item.name}</td>
                    <td className="py-3 px-4 text-center text-slate-600">{item.unit}</td>
                    <td className="py-3 px-4 text-center font-mono font-bold text-slate-900">{item.quantity}</td>
                    <td className="py-3 px-4 text-center">
                      <span className="w-4 h-4 border-2 border-slate-300 rounded inline-block" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* PV de Réception - محضر الاستلام والمطابقة */}
          <div className="bg-white p-5 rounded-2xl border-2 border-slate-300 space-y-3 text-xs">
            <h3 className="font-black text-slate-900 text-sm border-b border-slate-100 pb-2 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>محضر استلام ومطابقة الأشغال (PV de Réception)</span>
            </h3>
            <p className="text-slate-600 leading-relaxed">
              أقر أنا الموقع أسفله (العميل) بأن الأشغال والخدمات المذكورة أعلاه قد تم إنجازها وتسليمها بالكامل وفق المواصفات والاتفاق، وبحالة سليمة ومطابقة تماماً.
            </p>
            
            <div className="grid grid-cols-2 gap-6 pt-6 border-t border-slate-200">
              <div className="text-center p-3 border border-slate-200 rounded-xl">
                <span className="text-slate-400 font-bold block mb-8">توقيع وملاحظات المشرف التقني</span>
                <span className="font-black text-slate-800">{user.name}</span>
              </div>

              <div className="text-center p-3 border border-slate-200 rounded-xl">
                <span className="text-slate-400 font-bold block mb-8">توقيع وختم العميل بالاستلام (مع كتابة: قرئ وصودق عليه)</span>
                <span className="font-black text-slate-800">{devis.clientName}</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
