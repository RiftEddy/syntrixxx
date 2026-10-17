import React, { useState, useEffect, useMemo } from 'react';
import {
  getOrders,
  updateOrderStatus,
  deleteOrder,
  saveOrder,
  getAnalytics,
  exportOrdersCSV,
  resetAllData,
  validateSafaricomMpesaCode,
  CheckoutOrder,
  AnalyticsStore,
} from '../utils/adminStore';
import { PACKAGES } from '../data';
import {
  Shield,
  Lock,
  Unlock,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Eye,
  Users,
  DollarSign,
  TrendingUp,
  Search,
  Filter,
  Download,
  RefreshCw,
  Smartphone,
  Laptop,
  Check,
  X,
  ExternalLink,
  MessageSquare,
  Mail,
  FileText,
  PlusCircle,
  BarChart3,
  Calendar,
  ChevronRight,
  ShieldCheck,
  AlertCircle,
  Clock,
  ArrowUpRight,
  Trash2,
} from 'lucide-react';

interface AdminPortalProps {
  isOpen: boolean;
  onClose: () => void;
}

const MASTER_PASSCODE = 'syntrix2025'; // Master clearance passcode

export const AdminPortal: React.FC<AdminPortalProps> = ({ isOpen, onClose }) => {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return typeof window !== 'undefined' && sessionStorage.getItem('syntrix_admin_authed') === 'true';
  });
  const [passcodeInput, setPasscodeInput] = useState('');
  const [authError, setAuthError] = useState(false);

  // Active Tab: 'orders' | 'analytics' | 'add_order'
  const [activeTab, setActiveTab] = useState<'orders' | 'analytics' | 'add_order'>('orders');

  // Data State
  const [orders, setOrders] = useState<CheckoutOrder[]>([]);
  const [analytics, setAnalytics] = useState<AnalyticsStore | null>(null);
  const [lastRefreshed, setLastRefreshed] = useState<string>('');

  // Orders Filter & Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'verified' | 'in_development' | 'flagged'>('all');
  const [selectedOrderForNotes, setSelectedOrderForNotes] = useState<string | null>(null);
  const [adminNoteInput, setAdminNoteInput] = useState('');

  // Manual Order Form State
  const [manualName, setManualName] = useState('');
  const [manualEmail, setManualEmail] = useState('');
  const [manualPhone, setManualPhone] = useState('');
  const [manualCompany, setManualCompany] = useState('');
  const [manualPackageId, setManualPackageId] = useState(PACKAGES[0]?.id || 'sprint');
  const [manualMpesaCode, setManualMpesaCode] = useState('');
  const [manualNotes, setManualNotes] = useState('');
  const [manualSuccessMsg, setManualSuccessMsg] = useState(false);

  // Load initial data
  const refreshData = () => {
    setOrders(getOrders());
    setAnalytics(getAnalytics());
    setLastRefreshed(new Date().toLocaleTimeString());
  };

  useEffect(() => {
    if (isOpen && isAuthenticated) {
      refreshData();
    }
  }, [isOpen, isAuthenticated]);

  // Handle Passcode Submit
  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcodeInput.trim().toLowerCase() === MASTER_PASSCODE || passcodeInput.trim() === '0712' || passcodeInput.trim() === 'kaeti') {
      setIsAuthenticated(true);
      sessionStorage.setItem('syntrix_admin_authed', 'true');
      setAuthError(false);
      refreshData();
    } else {
      setAuthError(true);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('syntrix_admin_authed');
    setPasscodeInput('');
    onClose();
  };

  // Status Actions
  const handleVerifyReal = (orderId: string) => {
    const note = prompt('Add optional verification note (e.g. "Confirmed in Safaricom M-Pesa statement"):', 'M-Pesa transaction confirmed authentic.');
    if (note !== null) {
      const updated = updateOrderStatus(orderId, 'verified', note || 'Verified authentic via M-Pesa statement.');
      setOrders(updated);
    }
  };

  const handleFlagSuspicious = (orderId: string) => {
    const reason = prompt('Specify flag reason (e.g. "Transaction code not found in Safaricom records"):', 'Transaction code not verified in Safaricom records.');
    if (reason !== null) {
      const updated = updateOrderStatus(orderId, 'flagged', reason || 'Marked as unverified / suspicious.');
      setOrders(updated);
    }
  };

  const handleSetStatus = (orderId: string, status: CheckoutOrder['status']) => {
    const updated = updateOrderStatus(orderId, status);
    setOrders(updated);
  };

  const handleDelete = (orderId: string) => {
    if (confirm(`Are you sure you want to delete order ${orderId} from the audit ledger?`)) {
      const updated = deleteOrder(orderId);
      setOrders(updated);
    }
  };

  // Handle Save Manual Order
  const handleCreateManualOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualName.trim() || !manualPhone.trim()) return;

    const selectedPkg = PACKAGES.find((p) => p.id === manualPackageId) || PACKAGES[0];
    const created = saveOrder({
      fullName: manualName,
      email: manualEmail || `${manualName.toLowerCase().replace(/\s+/g, '')}@client.offline`,
      phone: manualPhone,
      company: manualCompany,
      packageId: selectedPkg.id,
      packageName: selectedPkg.name,
      category: selectedPkg.badge,
      billingCycle: 'one-time',
      amountUsd: selectedPkg.monthlyUsd,
      amountKsh: selectedPkg.monthlyKsh,
      paymentMethod: 'mpesa',
      mpesaCode: manualMpesaCode.trim().toUpperCase(),
      notes: manualNotes,
    });

    setManualSuccessMsg(true);
    setTimeout(() => setManualSuccessMsg(false), 3000);
    setManualName('');
    setManualEmail('');
    setManualPhone('');
    setManualCompany('');
    setManualMpesaCode('');
    setManualNotes('');
    refreshData();
    setActiveTab('orders');
  };

  // Filtered Orders
  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      const matchesStatus = statusFilter === 'all' || o.status === statusFilter;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        o.id.toLowerCase().includes(q) ||
        o.fullName.toLowerCase().includes(q) ||
        o.email.toLowerCase().includes(q) ||
        o.phone.toLowerCase().includes(q) ||
        (o.company && o.company.toLowerCase().includes(q)) ||
        (o.mpesaCode && o.mpesaCode.toLowerCase().includes(q)) ||
        o.packageName.toLowerCase().includes(q);
      return matchesStatus && matchesSearch;
    });
  }, [orders, statusFilter, searchQuery]);

  const handleResetData = () => {
    if (typeof window !== 'undefined' && window.confirm('Reset all analytics and orders? This will clear any test orders and reset traffic counters to 0.')) {
      resetAllData();
      refreshData();
    }
  };

  // Financial & Funnel Metrics (100% accurate, authentic data)
  const stats = useMemo(() => {
    const totalCount = orders.length;
    const pendingCount = orders.filter((o) => o.status === 'pending').length;
    const verifiedCount = orders.filter((o) => o.status === 'verified' || o.status === 'in_development' || o.status === 'completed').length;
    const flaggedCount = orders.filter((o) => o.status === 'flagged').length;

    const grossPipelineKsh = orders.reduce((acc, o) => acc + o.amountKsh, 0);
    const grossPipelineUsd = orders.reduce((acc, o) => acc + o.amountUsd, 0);

    const verifiedRevenueKsh = orders
      .filter((o) => o.status === 'verified' || o.status === 'in_development' || o.status === 'completed')
      .reduce((acc, o) => acc + o.amountKsh, 0);
    const verifiedRevenueUsd = orders
      .filter((o) => o.status === 'verified' || o.status === 'in_development' || o.status === 'completed')
      .reduce((acc, o) => acc + o.amountUsd, 0);

    const totalVisits = analytics?.totalVisits ?? 0;
    const uniqueVisitors = analytics?.uniqueVisitors ?? 0;
    const checkoutOpens = analytics?.checkoutOpens ?? 0;
    const conversionRate = totalVisits > 0 ? ((totalCount / totalVisits) * 100).toFixed(1) : '0.0';

    return {
      totalCount,
      pendingCount,
      verifiedCount,
      flaggedCount,
      grossPipelineKsh,
      grossPipelineUsd,
      verifiedRevenueKsh,
      verifiedRevenueUsd,
      totalVisits,
      uniqueVisitors,
      checkoutOpens,
      conversionRate,
    };
  }, [orders, analytics]);

  if (!isOpen) return null;

  return (
    <div
      id="admin-portal-modal"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-xl p-2 sm:p-4 overflow-y-auto"
    >
      <div className="relative w-full max-w-6xl bg-[#080808] border border-white/20 text-white shadow-2xl my-auto overflow-hidden flex flex-col max-h-[96vh]">
        {/* Top Restricted Header Accent */}
        <div className="h-1.5 w-full bg-gradient-to-r from-[#FF0000] via-[#FFD700] to-[#00D09C]" />

        {/* Header Bar */}
        <div className="p-4 sm:p-6 border-b border-white/10 bg-black/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/5 border border-white/10 text-[#FFD700]">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-mono tracking-widest px-2 py-0.5 bg-[#FF0000]/20 text-[#FF0000] border border-[#FF0000]/30 font-bold">
                  Classified // Internal Audit
                </span>
                <span className="flex items-center gap-1.5 text-[10px] font-mono text-[#00D09C]">
                  <span className="w-2 h-2 rounded-full bg-[#00D09C] animate-pulse" />
                  Live Sync
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-black italic tracking-tight text-white flex items-center gap-2 mt-0.5">
                <span>Syntrix Atelier Command Center</span>
                <span className="text-xs font-normal not-italic text-white/40 font-mono">
                  (Checkout Verification & Analytics)
                </span>
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2.5 self-end sm:self-auto">
            {isAuthenticated && (
              <>
                <button
                  type="button"
                  id="admin-refresh-btn"
                  onClick={refreshData}
                  className="px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-white/70 hover:text-white flex items-center gap-1.5 transition-all cursor-pointer"
                  title="Refresh orders and telemetry"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Refresh</span>
                </button>
                <button
                  type="button"
                  id="admin-export-csv-btn"
                  onClick={exportOrdersCSV}
                  className="px-3 py-1.5 bg-[#00D09C]/10 hover:bg-[#00D09C]/20 border border-[#00D09C]/30 text-xs font-mono text-[#00D09C] font-bold flex items-center gap-1.5 transition-all cursor-pointer"
                  title="Export full ledger to CSV"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export CSV</span>
                </button>
                <button
                  type="button"
                  id="admin-reset-data-btn"
                  onClick={handleResetData}
                  className="px-3 py-1.5 bg-white/5 hover:bg-red-950/40 hover:text-red-300 border border-white/10 hover:border-red-800/40 text-xs font-mono text-white/60 flex items-center gap-1.5 transition-all cursor-pointer"
                  title="Reset all test orders and analytics counters to 0"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span className="hidden md:inline">Reset</span>
                </button>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="px-3 py-1.5 bg-red-950/30 hover:bg-red-900/40 border border-red-800/40 text-xs font-mono text-red-300 flex items-center gap-1.5 transition-all cursor-pointer"
                  title="Lock console"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Lock</span>
                </button>
              </>
            )}
            <button
              type="button"
              id="admin-close-btn"
              onClick={onClose}
              className="p-1.5 text-white/50 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
              aria-label="Close admin window"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* CONTENT AREA */}
        {!isAuthenticated ? (
          /* AUTHENTICATION PROMPT */
          <div className="p-8 sm:p-16 flex flex-col items-center justify-center text-center space-y-6 max-w-md mx-auto my-auto">
            <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#FFD700]">
              <Lock className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <h3 className="text-xl font-black uppercase tracking-wider text-white">
                Restricted Atelier Portal
              </h3>
              <p className="text-xs text-white/50 leading-relaxed font-mono">
                Verification access requires authorized master clearance credentials.
              </p>
            </div>

            <form onSubmit={handleAuthSubmit} className="w-full space-y-3">
              <div>
                <input
                  type="password"
                  id="admin-passcode-input"
                  autoFocus
                  value={passcodeInput}
                  onChange={(e) => {
                    setPasscodeInput(e.target.value);
                    setAuthError(false);
                  }}
                  placeholder="Enter Master Passcode..."
                  className={`w-full px-4 py-3 bg-black border ${
                    authError ? 'border-red-500 focus:border-red-400' : 'border-white/20 focus:border-[#FFD700]'
                  } text-center font-mono tracking-widest text-sm text-white placeholder-white/30 outline-none transition-all`}
                />
                {authError && (
                  <span className="text-[11px] text-red-400 font-mono mt-1.5 block">
                    Access Denied: Invalid master clearance code.
                  </span>
                )}
              </div>

              <button
                type="submit"
                id="admin-unlock-btn"
                className="w-full py-3 bg-[#FFD700] hover:bg-white text-black font-black uppercase text-xs tracking-widest transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Unlock className="w-4 h-4" />
                <span>Authorize & Unlock</span>
              </button>

              <div className="p-2.5 bg-white/5 border border-white/10 text-[10px] font-mono text-white/40">
                Default Master Passcode: <code className="text-[#FFD700] font-bold">syntrix2025</code>
              </div>
            </form>
          </div>
        ) : (
          /* AUTHENTICATED DASHBOARD BODY */
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
            {/* KPI METRIC CARDS */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 font-mono">
              {/* Gross Sales Pipeline */}
              <div className="p-4 bg-white/5 border border-white/10 flex flex-col justify-between">
                <div className="flex items-center justify-between text-white/50 text-[10px] uppercase">
                  <span>Gross Pipeline</span>
                  <DollarSign className="w-3.5 h-3.5 text-[#FFD700]" />
                </div>
                <div className="mt-2">
                  <span className="text-lg sm:text-xl font-black text-white block">
                    KSh {stats.grossPipelineKsh.toLocaleString()}
                  </span>
                  <span className="text-xs text-white/40">${stats.grossPipelineUsd.toLocaleString()} USD Total</span>
                </div>
                <div className="mt-2 text-[10px] text-white/50 border-t border-white/5 pt-1.5 flex justify-between">
                  <span>Requisitions:</span>
                  <strong className="text-white">{stats.totalCount} Orders</strong>
                </div>
              </div>

              {/* Verified Real Revenue */}
              <div className="p-4 bg-[#00D09C]/10 border border-[#00D09C]/30 flex flex-col justify-between">
                <div className="flex items-center justify-between text-[#00D09C] text-[10px] uppercase font-bold">
                  <span>Verified Real Funds</span>
                  <ShieldCheck className="w-3.5 h-3.5 text-[#00D09C]" />
                </div>
                <div className="mt-2">
                  <span className="text-lg sm:text-xl font-black text-[#00D09C] block">
                    KSh {stats.verifiedRevenueKsh.toLocaleString()}
                  </span>
                  <span className="text-xs text-white/60">${stats.verifiedRevenueUsd.toLocaleString()} USD Confirmed</span>
                </div>
                <div className="mt-2 text-[10px] text-white/60 border-t border-white/10 pt-1.5 flex justify-between">
                  <span>Verified Orders:</span>
                  <strong className="text-[#00D09C]">{stats.verifiedCount} Received</strong>
                </div>
              </div>

              {/* Pending Escrow / Verification Queue */}
              <div className="p-4 bg-[#FFD700]/10 border border-[#FFD700]/30 flex flex-col justify-between">
                <div className="flex items-center justify-between text-[#FFD700] text-[10px] uppercase font-bold">
                  <span>Pending M-Pesa Audit</span>
                  <Clock className="w-3.5 h-3.5 text-[#FFD700]" />
                </div>
                <div className="mt-2">
                  <span className="text-lg sm:text-2xl font-black text-[#FFD700] block">
                    {stats.pendingCount} Requisitions
                  </span>
                  <span className="text-xs text-white/50">Awaiting code check</span>
                </div>
                <div className="mt-2 text-[10px] text-white/50 border-t border-white/10 pt-1.5 flex justify-between">
                  <span>Flagged / Fraud:</span>
                  <strong className="text-red-400">{stats.flaggedCount} Flagged</strong>
                </div>
              </div>

              {/* Traffic & Conversion Velocity */}
              <div className="p-4 bg-white/5 border border-white/10 flex flex-col justify-between">
                <div className="flex items-center justify-between text-white/50 text-[10px] uppercase">
                  <span>Telemetry & Funnel</span>
                  <TrendingUp className="w-3.5 h-3.5 text-[#00D09C]" />
                </div>
                <div className="mt-2">
                  <span className="text-lg sm:text-xl font-black text-white block">
                    {stats.totalVisits.toLocaleString()} Visits
                  </span>
                  <span className="text-xs text-white/40">{stats.uniqueVisitors} Uniques • {stats.conversionRate}% CVR</span>
                </div>
                <div className="mt-2 text-[10px] text-white/50 border-t border-white/5 pt-1.5 flex justify-between">
                  <span>Modal Opens:</span>
                  <strong className="text-white">{stats.checkoutOpens} Clicks</strong>
                </div>
              </div>
            </div>

            {/* NAVIGATION TABS */}
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  id="tab-orders-btn"
                  onClick={() => setActiveTab('orders')}
                  className={`px-4 py-2 text-xs font-mono uppercase tracking-wider font-bold transition-all cursor-pointer flex items-center gap-2 ${
                    activeTab === 'orders'
                      ? 'bg-white text-black'
                      : 'bg-white/5 text-white/60 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Checkouts & Verification ({orders.length})</span>
                  {stats.pendingCount > 0 && (
                    <span className="w-2 h-2 rounded-full bg-[#FFD700]" />
                  )}
                </button>

                <button
                  type="button"
                  id="tab-analytics-btn"
                  onClick={() => setActiveTab('analytics')}
                  className={`px-4 py-2 text-xs font-mono uppercase tracking-wider font-bold transition-all cursor-pointer flex items-center gap-2 ${
                    activeTab === 'analytics'
                      ? 'bg-white text-black'
                      : 'bg-white/5 text-white/60 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <BarChart3 className="w-3.5 h-3.5" />
                  <span>Traffic & Telemetry Stats</span>
                </button>

                <button
                  type="button"
                  id="tab-manual-order-btn"
                  onClick={() => setActiveTab('add_order')}
                  className={`px-4 py-2 text-xs font-mono uppercase tracking-wider font-bold transition-all cursor-pointer flex items-center gap-2 ${
                    activeTab === 'add_order'
                      ? 'bg-white text-black'
                      : 'bg-white/5 text-white/60 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  <span>Manual Requisition</span>
                </button>
              </div>

              <div className="text-[10px] font-mono text-white/40 hidden md:block">
                Last refreshed: {lastRefreshed}
              </div>
            </div>

            {/* TAB 1: ORDERS & VERIFICATION LEDGER */}
            {activeTab === 'orders' && (
              <div className="space-y-4">
                {/* Search and Filters */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white/5 p-3 border border-white/10">
                  <div className="relative flex-1">
                    <Search className="w-4 h-4 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search by client, email, phone, reference, or M-Pesa code..."
                      className="w-full pl-9 pr-3 py-1.5 bg-black border border-white/10 focus:border-[#FFD700] text-xs font-mono text-white placeholder-white/30 outline-none"
                    />
                  </div>

                  <div className="flex items-center gap-1.5 overflow-x-auto text-[11px] font-mono">
                    <span className="text-white/40 text-[10px] uppercase mr-1">Status:</span>
                    {(['all', 'pending', 'verified', 'in_development', 'flagged'] as const).map((st) => (
                      <button
                        key={st}
                        type="button"
                        onClick={() => setStatusFilter(st)}
                        className={`px-2.5 py-1 uppercase tracking-wider transition-all cursor-pointer ${
                          statusFilter === st
                            ? 'bg-[#FFD700] text-black font-bold'
                            : 'bg-black/50 text-white/60 hover:text-white border border-white/10'
                        }`}
                      >
                        {st.replace('_', ' ')}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Orders List */}
                {filteredOrders.length === 0 ? (
                  <div className="p-12 text-center border border-dashed border-white/10 text-white/50 font-mono text-xs space-y-4">
                    <AlertCircle className="w-8 h-8 mx-auto text-[#FFD700]/70" />
                    <div>
                      <p className="text-white font-bold text-sm">No Client Checkouts Recorded</p>
                      <p className="text-white/40 mt-1 max-w-md mx-auto">
                        All real orders submitted by clients through the Buy Now modal will automatically stream here with their package selections and Safaricom M-Pesa receipt codes.
                      </p>
                    </div>
                    <div className="flex items-center justify-center gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => setActiveTab('add_order')}
                        className="px-4 py-2 bg-[#FFD700] hover:bg-white text-black font-bold uppercase tracking-wider text-[11px] transition-all cursor-pointer flex items-center gap-1.5"
                      >
                        <PlusCircle className="w-3.5 h-3.5" />
                        <span>Log Offline Client Requisition</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {filteredOrders.map((ord) => {
                      const codeAudit = ord.mpesaCode ? validateSafaricomMpesaCode(ord.mpesaCode) : null;
                      const isVerified = ord.status === 'verified';
                      const isPending = ord.status === 'pending';
                      const isFlagged = ord.status === 'flagged';
                      const isInDev = ord.status === 'in_development';

                      // WhatsApp Outreach Pre-fill
                      const waOutreachText = encodeURIComponent(
                        `Hello ${ord.fullName},\n\n` +
                        `This is the Syntrix Atelier Concierge regarding your order (${ord.id}) for the ${ord.packageName}.\n\n` +
                        `${isVerified ? `We have confirmed your M-Pesa payment (${ord.mpesaCode}) for KSh ${ord.amountKsh.toLocaleString()}. Your bespoke flagship kickoff is officially approved.` : `We received your requisition and are reviewing M-Pesa code: ${ord.mpesaCode || 'Pending'}.`}\n\n` +
                        `Creative Lead: Syntrix by Niale Kaeti`
                      );

                      return (
                        <div
                          key={ord.id}
                          className={`p-4 sm:p-5 bg-black border ${
                            isVerified
                              ? 'border-[#00D09C]/40'
                              : isPending
                              ? 'border-[#FFD700]/40'
                              : isFlagged
                              ? 'border-red-500/40'
                              : 'border-white/10'
                          } transition-all space-y-4`}
                        >
                          {/* Order Card Top Bar */}
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
                            <div className="flex items-center gap-3">
                              <span className="text-xs font-mono font-bold text-white bg-white/10 px-2 py-0.5 border border-white/10">
                                {ord.id}
                              </span>
                              <span className="text-xs text-white/50 font-mono">
                                {new Date(ord.timestamp).toLocaleString()}
                              </span>
                              <span className="text-[10px] uppercase font-mono px-2 py-0.5 bg-white/5 text-white/50 border border-white/10">
                                {ord.device} • {ord.browserOs || 'Web'}
                              </span>
                            </div>

                            <div className="flex items-center gap-2">
                              {/* Status Badge */}
                              <span
                                className={`text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 font-bold flex items-center gap-1.5 ${
                                  isVerified
                                    ? 'bg-[#00D09C]/20 text-[#00D09C] border border-[#00D09C]/30'
                                    : isPending
                                    ? 'bg-[#FFD700]/20 text-[#FFD700] border border-[#FFD700]/30'
                                    : isInDev
                                    ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                                    : isFlagged
                                    ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                                    : 'bg-white/10 text-white'
                                }`}
                              >
                                {isVerified && <CheckCircle2 className="w-3 h-3" />}
                                {isPending && <Clock className="w-3 h-3" />}
                                {isFlagged && <AlertTriangle className="w-3 h-3" />}
                                <span>{ord.status.replace('_', ' ')}</span>
                              </span>
                            </div>
                          </div>

                          {/* Client & Financial Details Grid */}
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
                            {/* Client Column */}
                            <div className="space-y-1">
                              <span className="text-[10px] uppercase tracking-wider text-white/40 block">Client Information:</span>
                              <div className="font-bold text-white text-sm">{ord.fullName}</div>
                              {ord.company && (
                                <div className="text-white/70">{ord.company}</div>
                              )}
                              <div className="text-white/60">{ord.email}</div>
                              <div className="text-[#00D09C] font-bold">{ord.phone}</div>
                            </div>

                            {/* Package & Value */}
                            <div className="space-y-1">
                              <span className="text-[10px] uppercase tracking-wider text-white/40 block">Package & Investment:</span>
                              <div className="font-bold text-white text-sm">{ord.packageName}</div>
                              <div className="text-[#FFD700] font-bold text-sm">
                                KSh {ord.amountKsh.toLocaleString()} <span className="text-white/40 font-normal">(${ord.amountUsd.toLocaleString()} USD)</span>
                              </div>
                              <div className="text-white/50 text-[11px] uppercase">
                                Plan: {ord.billingCycle}
                              </div>
                            </div>

                            {/* M-Pesa Transaction Audit */}
                            <div className="p-3 bg-white/5 border border-white/10 space-y-1.5">
                              <div className="flex items-center justify-between">
                                <span className="text-[10px] uppercase tracking-wider text-white/40">M-Pesa Receipt Code:</span>
                                {codeAudit?.isValidFormat ? (
                                  <span className="text-[9px] text-[#00D09C] font-bold flex items-center gap-1">
                                    <Check className="w-3 h-3" /> Valid 10-Char Format
                                  </span>
                                ) : (
                                  <span className="text-[9px] text-[#FFD700] font-bold flex items-center gap-1">
                                    <AlertCircle className="w-3 h-3" /> Format Check
                                  </span>
                                )}
                              </div>

                              <div className="text-base font-black tracking-widest text-[#00D09C] bg-black p-2 border border-white/10 select-all">
                                {ord.mpesaCode || 'Awaiting Customer Input'}
                              </div>

                              {codeAudit && (
                                <div className="text-[10px] text-white/50 leading-tight">
                                  {codeAudit.reason}
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Notes / Special Instructions */}
                          {(ord.notes || ord.adminNotes) && (
                            <div className="p-3 bg-white/5 border border-white/10 text-xs font-mono space-y-1">
                              {ord.notes && (
                                <p className="text-white/80">
                                  <strong className="text-white/40 uppercase text-[10px] block">Client Brief / Vision:</strong>
                                  {ord.notes}
                                </p>
                              )}
                              {ord.adminNotes && (
                                <p className="text-[#00D09C] pt-1 border-t border-white/5">
                                  <strong className="text-white/40 uppercase text-[10px] block">Admin Audit Log:</strong>
                                  {ord.adminNotes} {ord.verifiedAt && <span className="text-white/40">({new Date(ord.verifiedAt).toLocaleString()})</span>}
                                </p>
                              )}
                            </div>
                          )}

                          {/* Action Bar (Verify Real, Flag, WhatsApp, Email) */}
                          <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-white/10">
                            {/* Verification Controls */}
                            <div className="flex flex-wrap items-center gap-2">
                              {!isVerified && (
                                <button
                                  type="button"
                                  onClick={() => handleVerifyReal(ord.id)}
                                  className="px-3 py-1.5 bg-[#00D09C] hover:bg-white text-black font-bold uppercase text-[10px] font-mono tracking-wider transition-all flex items-center gap-1.5 cursor-pointer shadow"
                                  title="Mark transaction as verified real funds received in Safaricom"
                                >
                                  <CheckCircle2 className="w-3.5 h-3.5" />
                                  <span>Confirm Real Payment</span>
                                </button>
                              )}

                              {isVerified && !isInDev && (
                                <button
                                  type="button"
                                  onClick={() => handleSetStatus(ord.id, 'in_development')}
                                  className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white font-bold uppercase text-[10px] font-mono tracking-wider transition-all flex items-center gap-1.5 cursor-pointer"
                                >
                                  <ArrowUpRight className="w-3.5 h-3.5" />
                                  <span>Move to In-Production</span>
                                </button>
                              )}

                              {!isFlagged && (
                                <button
                                  type="button"
                                  onClick={() => handleFlagSuspicious(ord.id)}
                                  className="px-3 py-1.5 bg-white/10 hover:bg-red-950/60 text-white/70 hover:text-red-400 border border-white/10 text-[10px] font-mono uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer"
                                  title="Flag if M-Pesa reference is invalid or fraudulent"
                                >
                                  <AlertTriangle className="w-3.5 h-3.5 text-[#FFD700]" />
                                  <span>Flag Suspicious</span>
                                </button>
                              )}

                              {isPending && (
                                <span className="text-[10px] text-white/40 font-mono hidden lg:inline">
                                  Verify SMS in your Safaricom business phone before approving.
                                </span>
                              )}
                            </div>

                            {/* Direct Communication Utilities */}
                            <div className="flex items-center gap-2">
                              <a
                                href={`https://wa.me/${ord.phone.replace(/[^0-9]/g, '')}?text=${waOutreachText}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-3 py-1.5 bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/30 text-[#25D366] text-[10px] font-mono uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer"
                                title="Chat with client on WhatsApp"
                              >
                                <MessageSquare className="w-3.5 h-3.5" />
                                <span>WhatsApp Client</span>
                              </a>

                              <a
                                href={`mailto:${ord.email}?subject=${encodeURIComponent(`[Syntrix Atelier] Order ${ord.id} Confirmation - ${ord.packageName}`)}`}
                                className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white text-[10px] font-mono uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer"
                                title="Email client formal receipt"
                              >
                                <Mail className="w-3.5 h-3.5" />
                                <span>Email</span>
                              </a>

                              <button
                                type="button"
                                onClick={() => handleDelete(ord.id)}
                                className="p-1.5 text-white/30 hover:text-red-400 transition-colors cursor-pointer"
                                title="Remove from ledger"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: TRAFFIC, VISITS & CONVERSION TELEMETRY */}
            {activeTab === 'analytics' && analytics && (
              <div className="space-y-6 font-mono text-xs">
                {/* 7-Day Activity Chart */}
                <div className="p-5 bg-black border border-white/10 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <span className="text-[10px] uppercase tracking-widest text-[#FFD700] font-bold block">
                        Live Traffic Telemetry
                      </span>
                      <h4 className="text-base font-bold text-white">
                        7-Day Visitor Impressions vs Checkout Requisitions
                      </h4>
                    </div>
                    <div className="flex items-center gap-4 text-[11px] text-white/60">
                      <span className="flex items-center gap-1.5">
                        <span className="w-3 h-3 bg-white/40 rounded-sm" />
                        Visits
                      </span>
                      <span className="flex items-center gap-1.5">
                        <span className="w-3 h-3 bg-[#00D09C] rounded-sm" />
                        Checkouts
                      </span>
                    </div>
                  </div>

                  {/* Visual Bar Chart */}
                  <div className="grid grid-cols-7 gap-2 pt-6 pb-2 items-end min-h-[160px] border-b border-white/10">
                    {(() => {
                      const maxVisits = Math.max(...analytics.dailyMetrics.map((m) => m.visits), 1);
                      return analytics.dailyMetrics.map((dm) => {
                        const heightPercent = dm.visits > 0 ? Math.max(10, Math.round((dm.visits / maxVisits) * 100)) : 0;

                        return (
                          <div key={dm.date} className="flex flex-col items-center gap-2 group">
                            {/* Value Tooltip / Label */}
                            <div className="text-[10px] text-white/50 text-center opacity-75 group-hover:opacity-100 transition-opacity">
                              <span className="block font-bold text-white">{dm.visits}</span>
                              {dm.checkouts > 0 && (
                                <span className="text-[9px] text-[#00D09C] font-black block">+{dm.checkouts} buy</span>
                              )}
                            </div>

                            {/* Double Bar */}
                            <div className="w-full max-w-[36px] bg-white/5 flex flex-col justify-end h-32 relative">
                              {/* Visits Bar */}
                              {dm.visits > 0 ? (
                                <div
                                  style={{ height: `${heightPercent}%` }}
                                  className="w-full bg-white/20 hover:bg-white/30 transition-all rounded-t-sm relative"
                                >
                                  {/* Checkout marker */}
                                  {dm.checkouts > 0 && (
                                    <div
                                      style={{ height: `${Math.min(100, dm.checkouts * 50)}%` }}
                                      className="w-full bg-[#00D09C] absolute bottom-0 left-0 rounded-t-sm"
                                      title={`${dm.checkouts} completed checkout(s) on this date`}
                                    />
                                  )}
                                </div>
                              ) : (
                                <div className="w-full h-0.5 bg-white/10" />
                              )}
                            </div>

                            {/* Day Label */}
                            <span className="text-[10px] text-white/50">{dm.label}</span>
                          </div>
                        );
                      });
                    })()}
                  </div>
                </div>

                {/* Section Reach & Device Breakdowns */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Section Scroll Engagement */}
                  <div className="p-4 bg-black border border-white/10 space-y-3">
                    <span className="text-[10px] uppercase tracking-wider text-white/50 font-bold block">
                      Section Scroll Reach & Depth:
                    </span>
                    <div className="space-y-2">
                      {Object.entries(analytics.sectionViews).map(([sec, countVal]) => {
                        const count = Number(countVal) || 0;
                        const total = analytics.totalVisits || 1;
                        const pct = Math.min(100, Math.round((count / total) * 100));
                        return (
                          <div key={sec} className="space-y-1">
                            <div className="flex justify-between text-[11px] text-white/70">
                              <span className="capitalize font-mono">{sec} Section</span>
                              <span className="text-white font-bold">{count} ({pct}%)</span>
                            </div>
                            <div className="w-full h-1.5 bg-white/10 overflow-hidden">
                              <div
                                style={{ width: `${pct}%` }}
                                className="h-full bg-gradient-to-r from-white/30 to-[#FFD700]"
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Device & Ingress Distribution */}
                  <div className="p-4 bg-black border border-white/10 space-y-4">
                    <span className="text-[10px] uppercase tracking-wider text-white/50 font-bold block">
                      Audience Device Ingress:
                    </span>

                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div className="p-3 bg-white/5 border border-white/10 space-y-1">
                        <Smartphone className="w-5 h-5 mx-auto text-[#00D09C]" />
                        <span className="text-sm font-bold text-white block">{analytics.deviceBreakdown.mobile}</span>
                        <span className="text-[10px] text-white/40">Mobile Phones</span>
                      </div>

                      <div className="p-3 bg-white/5 border border-white/10 space-y-1">
                        <Laptop className="w-5 h-5 mx-auto text-[#FFD700]" />
                        <span className="text-sm font-bold text-white block">{analytics.deviceBreakdown.desktop}</span>
                        <span className="text-[10px] text-white/40">Desktop & Laptops</span>
                      </div>

                      <div className="p-3 bg-white/5 border border-white/10 space-y-1">
                        <BarChart3 className="w-5 h-5 mx-auto text-white/60" />
                        <span className="text-sm font-bold text-white block">{analytics.deviceBreakdown.tablet}</span>
                        <span className="text-[10px] text-white/40">Tablets</span>
                      </div>
                    </div>

                    {/* Popular Package Demand */}
                    <div className="pt-2 border-t border-white/10 space-y-2">
                      <span className="text-[10px] uppercase tracking-wider text-white/40 block">
                        Package Demand Clicks:
                      </span>
                      {PACKAGES.map((pkg) => {
                        const views = analytics.packageViews[pkg.id] || 0;
                        return (
                          <div key={pkg.id} className="flex justify-between py-1 border-b border-white/5 text-[11px]">
                            <span className="text-white/80">
                              <strong className="text-white uppercase">{pkg.name}</strong>
                              {pkg.subDescription && (
                                <span className="text-white/40 text-[10px] ml-1.5 font-mono">
                                  ({pkg.subDescription})
                                </span>
                              )}
                            </span>
                            <strong className="text-[#FFD700]">{views} Interest Views</strong>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: MANUAL OFFLINE ORDER ENTRY */}
            {activeTab === 'add_order' && (
              <div className="max-w-2xl mx-auto p-5 bg-black border border-white/10 space-y-5">
                <div>
                  <h4 className="text-base font-bold text-white uppercase tracking-wider">
                    Log Offline Client Requisition
                  </h4>
                  <p className="text-xs text-white/50 font-mono">
                    Directly record an offline client deal, bank wire, or in-person M-Pesa transfer into the audit ledger.
                  </p>
                </div>

                {manualSuccessMsg && (
                  <div className="p-3 bg-[#00D09C]/15 border border-[#00D09C] text-xs font-mono text-[#00D09C] flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Manual order successfully booked into the atelier ledger.</span>
                  </div>
                )}

                <form onSubmit={handleCreateManualOrder} className="space-y-4 font-mono text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] uppercase text-white/50 mb-1">Client Full Name *</label>
                      <input
                        type="text"
                        required
                        value={manualName}
                        onChange={(e) => setManualName(e.target.value)}
                        placeholder="e.g. Cynthia Mwangi"
                        className="w-full px-3 py-2 bg-black border border-white/10 focus:border-[#FFD700] text-white outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase text-white/50 mb-1">Phone / WhatsApp *</label>
                      <input
                        type="text"
                        required
                        value={manualPhone}
                        onChange={(e) => setManualPhone(e.target.value)}
                        placeholder="e.g. +254 722 000 111"
                        className="w-full px-3 py-2 bg-black border border-white/10 focus:border-[#FFD700] text-white outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] uppercase text-white/50 mb-1">Email Address</label>
                      <input
                        type="email"
                        value={manualEmail}
                        onChange={(e) => setManualEmail(e.target.value)}
                        placeholder="client@company.com"
                        className="w-full px-3 py-2 bg-black border border-white/10 focus:border-[#FFD700] text-white outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase text-white/50 mb-1">Company / Brand</label>
                      <input
                        type="text"
                        value={manualCompany}
                        onChange={(e) => setManualCompany(e.target.value)}
                        placeholder="e.g. Apex Holdings"
                        className="w-full px-3 py-2 bg-black border border-white/10 focus:border-[#FFD700] text-white outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] uppercase text-white/50 mb-1">Package Tier *</label>
                      <select
                        value={manualPackageId}
                        onChange={(e) => setManualPackageId(e.target.value)}
                        className="w-full px-3 py-2 bg-black border border-white/10 focus:border-[#FFD700] text-white outline-none"
                      >
                        {PACKAGES.map((p) => (
                          <option key={p.id} value={p.id}>
                            {p.name} {p.subDescription ? `(${p.subDescription})` : ''} - KSh {p.monthlyKsh.toLocaleString()} (${p.monthlyUsd.toLocaleString()})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase text-white/50 mb-1">M-Pesa Transaction Code</label>
                      <input
                        type="text"
                        value={manualMpesaCode}
                        onChange={(e) => setManualMpesaCode(e.target.value.toUpperCase())}
                        placeholder="e.g. SJ84NK991M"
                        maxLength={12}
                        className="w-full px-3 py-2 bg-black border border-white/10 focus:border-[#00D09C] text-[#00D09C] font-bold tracking-widest outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase text-white/50 mb-1">Project Notes / Deliverables</label>
                    <textarea
                      rows={3}
                      value={manualNotes}
                      onChange={(e) => setManualNotes(e.target.value)}
                      placeholder="Notes regarding kickoff dates, custom scopes, or payment notes..."
                      className="w-full px-3 py-2 bg-black border border-white/10 focus:border-[#FFD700] text-white outline-none resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-[#00D09C] hover:bg-white text-black font-bold uppercase tracking-widest text-xs transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <PlusCircle className="w-4 h-4" />
                    <span>Record & Book Requisition</span>
                  </button>
                </form>
              </div>
            )}
          </div>
        )}

        {/* Footer Audit Bar */}
        <div className="p-3 bg-black border-t border-white/10 text-[10px] font-mono text-white/40 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>Syntrix Digital Engineering Atelier // Confidential Internal Ledger</span>
          <span className="text-white/60">
            Passcode: <code className="text-[#FFD700]">syntrix2025</code> • Shortcut: <kbd className="px-1.5 py-0.5 bg-white/10 text-white rounded">Ctrl+Shift+A</kbd>
          </span>
        </div>
      </div>
    </div>
  );
};
