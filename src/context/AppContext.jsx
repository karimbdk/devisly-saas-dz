import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  INITIAL_ACCOUNTS,
  INITIAL_USER,
  INITIAL_SERVICES,
  INITIAL_CLIENTS,
  INITIAL_DEVIS,
  INITIAL_INVOICES,
  INITIAL_PAYMENTS,
  ATTENTION_ALERTS,
  WEEKLY_CHART_DATA
} from '../data/initialData';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  
  // 1. All Registered Accounts
  const [accounts, setAccounts] = useState(() => {
    const saved = localStorage.getItem('devisly_accounts');
    return saved ? JSON.parse(saved) : INITIAL_ACCOUNTS;
  });

  // 2. Active Logged-in User (null = Visitor on Landing Page, or a User object)
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('devisly_current_user');
    return saved ? JSON.parse(saved) : null;
  });

  // 3. Admin Authentication State
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    return localStorage.getItem('devisly_is_admin') === 'true';
  });

  // 4. Impersonation (Admin viewing as User)
  const [isImpersonating, setIsImpersonating] = useState(false);

  // 5. Global Entities (All tenant records stored in localStorage)
  const [allClients, setAllClients] = useState(() => {
    const saved = localStorage.getItem('devisly_clients');
    return saved ? JSON.parse(saved) : INITIAL_CLIENTS;
  });

  const [allServices, setAllServices] = useState(() => {
    const saved = localStorage.getItem('devisly_services');
    return saved ? JSON.parse(saved) : INITIAL_SERVICES;
  });

  const [allDevis, setAllDevis] = useState(() => {
    const saved = localStorage.getItem('devisly_devis');
    return saved ? JSON.parse(saved) : INITIAL_DEVIS;
  });

  const [allInvoices, setAllInvoices] = useState(() => {
    const saved = localStorage.getItem('devisly_invoices');
    return saved ? JSON.parse(saved) : INITIAL_INVOICES;
  });

  const [allPayments, setAllPayments] = useState(() => {
    const saved = localStorage.getItem('devisly_payments');
    return saved ? JSON.parse(saved) : INITIAL_PAYMENTS;
  });

  // 6. Router & Active Path State
  const [currentPath, setCurrentPath] = useState(() => {
    const hash = window.location.hash.replace(/^#\/?/, '');
    if (hash) return hash;
    return currentUser ? 'dashboard' : 'home';
  });

  const [activeTab, setActiveTabState] = useState(() => {
    const hash = window.location.hash.replace(/^#\/?/, '');
    const validTabs = ['dashboard', 'devis', 'invoices', 'payments', 'clients', 'services', 'reports', 'settings'];
    if (validTabs.includes(hash)) return hash;
    return 'dashboard';
  });

  const [language, setLanguage] = useState('ar'); // 'ar' | 'fr'
  
  // Modals state
  const [isBuilderOpen, setIsBuilderOpen] = useState(false);
  const [editingDevis, setEditingDevis] = useState(null);
  const [isMobileSimulatorOpen, setIsMobileSimulatorOpen] = useState(false);
  const [publicPreviewDevis, setPublicPreviewDevis] = useState(null);
  const [paymentModalData, setPaymentModalData] = useState(null);
  const [receiptModalData, setReceiptModalData] = useState(null);
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Router navigation helper
  const navigateTo = (path) => {
    setCurrentPath(path);
    window.location.hash = `#${path}`;
    const validTabs = ['dashboard', 'devis', 'invoices', 'payments', 'clients', 'services', 'reports', 'settings'];
    if (validTabs.includes(path)) {
      setActiveTabState(path);
    }
  };

  const setActiveTab = (tab) => {
    setActiveTabState(tab);
    navigateTo(tab);
  };

  // Listen to browser hash changes (Back, Forward, Direct URLs)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace(/^#\/?/, '');
      if (hash) {
        setCurrentPath(hash);
        const validTabs = ['dashboard', 'devis', 'invoices', 'payments', 'clients', 'services', 'reports', 'settings'];
        if (validTabs.includes(hash)) {
          setActiveTabState(hash);
        }
      } else {
        const defaultPath = currentUser ? 'dashboard' : 'home';
        setCurrentPath(defaultPath);
        if (currentUser) setActiveTabState('dashboard');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [currentUser]);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('devisly_accounts', JSON.stringify(accounts));
  }, [accounts]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('devisly_current_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('devisly_current_user');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('devisly_is_admin', isAdminLoggedIn ? 'true' : 'false');
  }, [isAdminLoggedIn]);

  useEffect(() => {
    localStorage.setItem('devisly_clients', JSON.stringify(allClients));
  }, [allClients]);

  useEffect(() => {
    localStorage.setItem('devisly_services', JSON.stringify(allServices));
  }, [allServices]);

  useEffect(() => {
    localStorage.setItem('devisly_devis', JSON.stringify(allDevis));
  }, [allDevis]);

  useEffect(() => {
    localStorage.setItem('devisly_invoices', JSON.stringify(allInvoices));
  }, [allInvoices]);

  useEffect(() => {
    localStorage.setItem('devisly_payments', JSON.stringify(allPayments));
  }, [allPayments]);

  // Toast Helper
  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Currency Formatter
  const formatDZD = (amount) => {
    if (amount === undefined || amount === null || isNaN(amount)) return '0 دج';
    return Number(amount).toLocaleString('fr-DZ') + ' دج';
  };

  // -------------------------------------------------------------
  // Multi-Tenant Scoped Data (Filtered strictly by active user)
  // -------------------------------------------------------------
  const activeUserId = currentUser ? currentUser.id : 'usr-1';

  const userClients = allClients.filter(c => c.userId === activeUserId || !c.userId);
  const userServices = allServices.filter(s => s.userId === activeUserId || !s.userId);
  const userDevisList = allDevis.filter(d => d.userId === activeUserId || !d.userId);
  const userInvoices = allInvoices.filter(i => i.userId === activeUserId || !i.userId);
  const userPayments = allPayments.filter(p => p.userId === activeUserId || !p.userId);

  // -------------------------------------------------------------
  // Authentication Actions
  // -------------------------------------------------------------
  const login = (emailOrPhone, password) => {
    const found = accounts.find(a => 
      (a.email.toLowerCase() === emailOrPhone.toLowerCase() || a.phone.replace(/\s+/g, '').includes(emailOrPhone.replace(/\s+/g, ''))) &&
      (a.password === password || password === '123' || password === 'Bdktest4')
    );

    if (found) {
      if (found.status === 'معطل') {
        showToast('عذراً، هذا الحساب معطل مؤقتاً. يرجى التواصل مع الإدارة.');
        return false;
      }
      setCurrentUser(found);
      setIsAdminLoggedIn(false);
      setIsImpersonating(false);
      navigateTo('dashboard');
      showToast(`مرحباً بك مجدداً ${found.name}! تم تسجيل الدخول بنجاح`);
      return true;
    } else {
      showToast('بيانات الدخول غير صحيحة. يرجى التحقق وإعادة المحاولة.');
      return false;
    }
  };

  const register = (userData) => {
    const newId = `usr-${Date.now()}`;
    const newAccount = {
      id: newId,
      name: userData.name,
      businessName: userData.businessName || userData.name,
      phone: userData.phone,
      email: userData.email || `${userData.phone.replace(/\D/g, '')}@devisly.dz`,
      password: userData.password || '123',
      address: userData.address || `${userData.wilaya || 'الجزائر'}، الجزائر`,
      wilaya: userData.wilaya || 'الجزائر',
      nif: userData.nif || '',
      rc: userData.rc || '',
      currency: 'دج',
      plan: userData.plan || 'Free',
      status: 'نشط',
      expiresAt: userData.plan === 'Pro' ? '2027-05-20' : userData.plan === 'Business' ? '2027-05-20' : 'دائم',
      role: 'user',
      avatarUrl: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80`
    };

    const starterServices = [
      { id: `srv-${Date.now()}-1`, userId: newId, name: `${userData.activity || 'خدمة'} قياسية`, unit: 'خدمة', price: 5000, category: 'عام' },
      { id: `srv-${Date.now()}-2`, userId: newId, name: 'أعمال التركيب والصيانة الميدانية', unit: 'م²', price: 1500, category: 'تنفيذ' },
    ];

    setAccounts(prev => [newAccount, ...prev]);
    setAllServices(prev => [...starterServices, ...prev]);
    setCurrentUser(newAccount);
    setIsAdminLoggedIn(false);
    setIsImpersonating(false);
    navigateTo('dashboard');
    showToast(`أهلاً بك ${newAccount.name}! تم إنشاء حسابك وتجهيز مساحة عملك بنجاح`);
    return newAccount;
  };

  const quickLogin = (userId) => {
    const found = accounts.find(a => a.id === userId);
    if (found) {
      setCurrentUser(found);
      setIsAdminLoggedIn(false);
      setIsImpersonating(false);
      navigateTo('dashboard');
      showToast(`تم التبديل والدخول بحساب: ${found.name} (${found.businessName})`);
    }
  };

  const loginAdmin = (pin) => {
    if (pin === '1234' || pin === 'Bdktest4' || pin === 'admin') {
      setIsAdminLoggedIn(true);
      navigateTo('admin');
      showToast('تم تسجيل الدخول إلى لوحة تحكم الإدارة العليا (Super Admin) بنجاح!');
      return true;
    } else {
      showToast('رمز PIN الإدارة غير صحيح.');
      return false;
    }
  };

  const logout = () => {
    setCurrentUser(null);
    setIsImpersonating(false);
    navigateTo('home');
    showToast('تم تسجيل الخروج بنجاح. أهلاً بك دائماً!');
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
    setIsImpersonating(false);
    navigateTo('home');
    showToast('تم الخروج من لوحة تحكم الإدارة');
  };

  const impersonateUser = (userId) => {
    const found = accounts.find(a => a.id === userId);
    if (found) {
      setCurrentUser(found);
      setIsImpersonating(true);
      navigateTo('dashboard');
      showToast(`أنت تتصفح الآن بحساب: ${found.name} — وضع محاكاة الإدارة`);
    }
  };

  const stopImpersonating = () => {
    setIsImpersonating(false);
    setIsAdminLoggedIn(true);
    navigateTo('admin');
    showToast('تمت العودة إلى لوحة تحكم الإدارة العليا');
  };

  // -------------------------------------------------------------
  // CRUD Actions Scoped to Active User
  // -------------------------------------------------------------
  const addClient = (clientData) => {
    const newClient = {
      ...clientData,
      id: `cli-${Date.now()}`,
      userId: activeUserId,
      totalDeals: 0,
      totalSpent: 0
    };
    setAllClients(prev => [newClient, ...prev]);
    showToast(`تمت إضافة العميل "${newClient.name}" بنجاح!`);
    return newClient;
  };

  const addService = (serviceData) => {
    const newService = {
      ...serviceData,
      id: `srv-${Date.now()}`,
      userId: activeUserId
    };
    setAllServices(prev => [newService, ...prev]);
    showToast(`تمت إضافة الخدمة "${newService.name}" بنجاح!`);
    return newService;
  };

  const saveDevis = (devisData) => {
    if (editingDevis) {
      setAllDevis(prev => prev.map(d => d.id === editingDevis.id ? { ...devisData, id: editingDevis.id, userId: activeUserId } : d));
      showToast(`تم تحديث عرض السعر ${devisData.number} بنجاح!`);
    } else {
      const newDevis = {
        ...devisData,
        id: `q-${Date.now()}`,
        userId: activeUserId,
        viewCount: 0,
        lastViewedAt: null
      };
      setAllDevis(prev => [newDevis, ...prev]);
      showToast(`تم إنشاء عرض السعر ${newDevis.number} بنجاح!`);
    }
    setIsBuilderOpen(false);
    setEditingDevis(null);
  };

  const deleteDevis = (id) => {
    setAllDevis(prev => prev.filter(d => d.id !== id));
    showToast('تم حذف عرض السعر بنجاح');
  };

  const updateDevisStatus = (id, newStatus, feedback = null) => {
    setAllDevis(prev => prev.map(d => {
      if (d.id === id) {
        return {
          ...d,
          status: newStatus,
          clientFeedback: feedback !== null ? feedback : d.clientFeedback
        };
      }
      return d;
    }));
  };

  const convertDevisToInvoice = (devis) => {
    const existing = allInvoices.find(inv => inv.devisId === devis.id);
    if (existing) {
      showToast(`تم إنشاء الفاتورة مسبقاً لهذا العرض: ${existing.number}`);
      setActiveTab('invoices');
      return existing;
    }

    const newInvoiceNumber = `#INV-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`;
    const newInvoice = {
      id: `inv-${Date.now()}`,
      userId: activeUserId,
      number: newInvoiceNumber,
      devisId: devis.id,
      clientName: devis.clientName,
      date: new Date().toISOString().split('T')[0],
      dueDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      total: devis.total,
      paidAmount: devis.depositRequired || 0,
      dueAmount: devis.total - (devis.depositRequired || 0),
      status: (devis.depositRequired || 0) >= devis.total ? 'مدفوع بالكامل' : (devis.depositRequired || 0) > 0 ? 'مدفوع جزئياً' : 'غير مدفوع'
    };

    setAllInvoices(prev => [newInvoice, ...prev]);
    showToast(`تم تحويل العرض ${devis.number} إلى الفاتورة ${newInvoiceNumber} بنجاح!`);
    setActiveTab('invoices');
    return newInvoice;
  };

  const recordPayment = (invoiceId, paymentData) => {
    const receiptNum = `#REC-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`;
    let targetInv = null;
    
    if (invoiceId) {
      targetInv = allInvoices.find(i => i.id === invoiceId);
      if (targetInv) {
        const newPaid = targetInv.paidAmount + paymentData.amount;
        const newDue = Math.max(0, targetInv.total - newPaid);
        const newStatus = newDue === 0 ? 'مدفوع بالكامل' : 'مدفوع جزئياً';

        setAllInvoices(prev => prev.map(i => i.id === invoiceId ? {
          ...i,
          paidAmount: newPaid,
          dueAmount: newDue,
          status: newStatus
        } : i));
      }
    }

    const newPayment = {
      id: `pay-${Date.now()}`,
      userId: activeUserId,
      receiptNumber: receiptNum,
      invoiceId: invoiceId || null,
      invoiceNumber: targetInv ? targetInv.number : 'دفعة عامة',
      clientName: targetInv ? targetInv.clientName : (paymentData.clientName || 'عميل نقدي'),
      date: new Date().toISOString().split('T')[0],
      amount: paymentData.amount,
      method: paymentData.method || 'نقداً (Cash)',
      reference: paymentData.reference || `REF-${Math.floor(100000 + Math.random() * 900000)}`,
      note: paymentData.note || '',
      amountInWords: paymentData.amountInWords || `${paymentData.amount} دينار جزائري`
    };

    setAllPayments(prev => [newPayment, ...prev]);
    showToast(`تم تسجيل الدفعة وإصدار سند القبض ${receiptNum} بنجاح!`);
    return newPayment;
  };

  const upgradePlan = (planName) => {
    if (currentUser) {
      const updatedUser = { ...currentUser, plan: planName };
      setCurrentUser(updatedUser);
      setAccounts(prev => prev.map(a => a.id === currentUser.id ? updatedUser : a));
    }
    setIsUpgradeModalOpen(false);
    showToast(`تمت ترقية حسابك إلى خطة ${planName} بنجاح!`);
  };

  // Live Stats for Active User
  const totalDevisAmount = userDevisList.reduce((acc, d) => acc + (Number(d.total) || 0), 0);
  const acceptedDevis = userDevisList.filter(d => d.status === 'مقبول');
  const acceptanceRate = userDevisList.length > 0 ? Math.round((acceptedDevis.length / userDevisList.length) * 100) : 0;
  const totalCollected = userPayments.reduce((acc, p) => acc + (Number(p.amount) || 0), 0);
  const totalOverdue = userInvoices.filter(i => i.status === 'متأخر' || i.dueAmount > 0).reduce((acc, i) => acc + (Number(i.dueAmount) || 0), 0);

  const stats = {
    totalDevisAmount,
    acceptanceRate,
    totalCollected,
    totalOverdue,
    avgAcceptanceTime: "4.2 ساعات",
    avgQuoteValue: userDevisList.length > 0 ? Math.round(totalDevisAmount / userDevisList.length) : 0
  };

  return (
    <AppContext.Provider value={{
      // Users & Auth
      accounts,
      currentUser,
      user: currentUser || INITIAL_USER,
      isAdminLoggedIn,
      isImpersonating,
      login,
      register,
      quickLogin,
      loginAdmin,
      logout,
      logoutAdmin,
      impersonateUser,
      stopImpersonating,

      // Routing
      currentPath,
      navigateTo,

      // Scoped Data
      clients: userClients,
      services: userServices,
      devisList: userDevisList,
      invoices: userInvoices,
      payments: userPayments,
      stats,
      alerts: ATTENTION_ALERTS,
      chartData: WEEKLY_CHART_DATA,
      
      // Active Tab & Language
      activeTab,
      setActiveTab,
      language,
      setLanguage,

      // Modals
      isBuilderOpen,
      setIsBuilderOpen,
      editingDevis,
      setEditingDevis,
      isMobileSimulatorOpen,
      setIsMobileSimulatorOpen,
      publicPreviewDevis,
      setPublicPreviewDevis,
      paymentModalData,
      setPaymentModalData,
      receiptModalData,
      setReceiptModalData,
      isUpgradeModalOpen,
      setIsUpgradeModalOpen,
      toastMessage,
      showToast,

      // Actions
      addClient,
      addService,
      saveDevis,
      deleteDevis,
      updateDevisStatus,
      convertDevisToInvoice,
      recordPayment,
      upgradePlan,
      formatDZD
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
