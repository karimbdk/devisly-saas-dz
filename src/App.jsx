import React, { useState } from 'react';
import { useApp } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { Dashboard } from './components/dashboard/Dashboard';
import { DevisList } from './components/devis/DevisList';
import { InvoicesList } from './components/invoices/InvoicesList';
import { PaymentsList } from './components/payments/PaymentsList';
import { ClientsManager } from './components/clients/ClientsManager';
import { ServicesCatalog } from './components/services/ServicesCatalog';
import { ReportsView } from './components/reports/ReportsView';
import { SettingsView } from './components/settings/SettingsView';
import { DevisBuilderModal } from './components/devis/DevisBuilderModal';
import { MobileSimulatorModal } from './components/mobile/MobileSimulatorModal';
import { ClientPublicView } from './components/portal/ClientPublicView';
import { PaymentReceiptModal } from './components/payments/PaymentReceiptModal';
import { UpgradeSubscriptionModal } from './components/payments/UpgradeSubscriptionModal';
import { PrintCenterModal } from './components/print/PrintCenterModal';
import { WorkOrderModal } from './components/workorders/WorkOrderModal';
import { AdminPortal } from './components/admin/AdminPortal';
import { AdminLoginPage } from './components/admin/AdminLoginPage';
import { LandingPage } from './components/landing/LandingPage';
import { AuthPage } from './components/auth/AuthPage';
import { Toast } from './components/common/Toast';
import {
  LayoutDashboard,
  FileText,
  Plus,
  Wallet,
  Lock
} from 'lucide-react';

export function App() {
  const {
    currentPath,
    navigateTo,
    activeTab,
    setActiveTab,
    language,
    setIsBuilderOpen,
    currentUser,
    isAdminLoggedIn,
    logout,
    devisList
  } = useApp();

  const [printCenterDoc, setPrintCenterDoc] = useState(null);
  const [workOrderDevis, setWorkOrderDevis] = useState(null);

  // 1. Secret Admin Route (/admin or #admin)
  if (currentPath === 'admin') {
    if (isAdminLoggedIn) {
      return (
        <>
          <AdminPortal />
          <Toast />
        </>
      );
    } else {
      return (
        <>
          <AdminLoginPage onCancel={() => navigateTo('home')} />
          <Toast />
        </>
      );
    }
  }

  // 2. Auth Routes (/login & /register)
  if (currentPath === 'login') {
    return (
      <>
        <LandingPage onOpenAuth={(mode) => navigateTo(mode)} />
        <AuthPage initialMode="login" onClose={() => navigateTo('home')} />
        <Toast />
      </>
    );
  }

  if (currentPath === 'register') {
    return (
      <>
        <LandingPage onOpenAuth={(mode) => navigateTo(mode)} />
        <AuthPage initialMode="register" onClose={() => navigateTo('home')} />
        <Toast />
      </>
    );
  }

  // 3. Public Landing Route (/home or / or when not logged in)
  if (!currentUser || currentPath === 'home') {
    return (
      <>
        <LandingPage onOpenAuth={(mode) => navigateTo(mode)} />
        <Toast />
      </>
    );
  }

  // 4. Logged-in User Workspace with Path-based Content
  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard onOpenPrintCenter={(doc) => setPrintCenterDoc(doc)} onOpenWorkOrder={(doc) => setWorkOrderDevis(doc)} />;
      case 'devis':
        return <DevisList onOpenPrintCenter={(doc) => setPrintCenterDoc(doc)} onOpenWorkOrder={(doc) => setWorkOrderDevis(doc)} />;
      case 'invoices':
        return <InvoicesList onOpenPrintCenter={(doc) => setPrintCenterDoc(doc)} />;
      case 'payments':
        return <PaymentsList />;
      case 'clients':
        return <ClientsManager />;
      case 'services':
        return <ServicesCatalog />;
      case 'reports':
        return <ReportsView />;
      case 'settings':
        return <SettingsView />;
      default:
        return <Dashboard onOpenPrintCenter={(doc) => setPrintCenterDoc(doc)} onOpenWorkOrder={(doc) => setWorkOrderDevis(doc)} />;
    }
  };

  return (
    <div className={`min-h-screen bg-slate-50 flex flex-col font-sans ${language === 'ar' ? 'rtl' : 'ltr'}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
      
      {/* Top Navbar */}
      <Navbar onOpenPrintCenter={(doc) => setPrintCenterDoc(doc)} onOpenLanding={logout} />

      {/* Main Layout Area */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        {/* Sidebar */}
        <Sidebar />

        {/* Content Container */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0 overflow-y-auto">
          {renderContent()}
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 px-3 py-2 flex items-center justify-around shadow-lg no-print">
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`flex flex-col items-center gap-1 text-[10px] font-bold ${
            activeTab === 'dashboard' ? 'text-brand-600' : 'text-slate-500'
          }`}
        >
          <LayoutDashboard className="w-5 h-5" />
          <span>الرئيسية</span>
        </button>

        <button
          onClick={() => setActiveTab('devis')}
          className={`flex flex-col items-center gap-1 text-[10px] font-bold ${
            activeTab === 'devis' ? 'text-brand-600' : 'text-slate-500'
          }`}
        >
          <FileText className="w-5 h-5" />
          <span>العروض</span>
        </button>

        <button
          onClick={() => setIsBuilderOpen(true)}
          className="w-12 h-12 bg-brand-600 hover:bg-brand-700 text-white rounded-2xl flex items-center justify-center -mt-5 shadow-lg shadow-brand-500/30 active:scale-95 transition-transform"
        >
          <Plus className="w-6 h-6 stroke-[3]" />
        </button>

        <button
          onClick={() => setActiveTab('payments')}
          className={`flex flex-col items-center gap-1 text-[10px] font-bold ${
            activeTab === 'payments' ? 'text-brand-600' : 'text-slate-500'
          }`}
        >
          <Wallet className="w-5 h-5" />
          <span>الدفعات</span>
        </button>

        <button
          onClick={logout}
          className="flex flex-col items-center gap-1 text-[10px] font-bold text-slate-500"
        >
          <Lock className="w-5 h-5 text-slate-400" />
          <span>خروج</span>
        </button>
      </div>

      {/* Global Modals */}
      <DevisBuilderModal />
      <MobileSimulatorModal />
      <ClientPublicView />
      <PaymentReceiptModal />
      <UpgradeSubscriptionModal />
      
      {printCenterDoc && (
        <PrintCenterModal
          documentData={printCenterDoc}
          documentType="devis"
          onClose={() => setPrintCenterDoc(null)}
        />
      )}

      {workOrderDevis && (
        <WorkOrderModal
          devis={workOrderDevis}
          onClose={() => setWorkOrderDevis(null)}
        />
      )}

      <Toast />
    </div>
  );
}

export default App;
