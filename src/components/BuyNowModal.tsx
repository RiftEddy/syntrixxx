import React, { useState, useEffect } from 'react';
import {
  X,
  Clock,
  ArrowRight,
  ShieldCheck,
  Copy,
  Check,
  ExternalLink,
  Sparkles,
  Smartphone,
  CheckCircle2,
  PhoneCall,
  CheckCircle,
  HelpCircle,
  Lock,
  AlertCircle
} from 'lucide-react';
import { PricingPackage, BillingCycle } from '../types';
import { AGENCY_EMAIL, SOCIAL_LINKS, MPESA_PAYMENT_INFO } from '../data';
import { saveOrder, trackCheckoutOpen } from '../utils/adminStore';

interface BuyNowModalProps {
  pkg: PricingPackage | null;
  isOpen: boolean;
  onClose: () => void;
  currencyPreference: 'BOTH' | 'USD' | 'KSH';
  initialBillingCycle?: BillingCycle;
}

export const BuyNowModal: React.FC<BuyNowModalProps> = ({
  pkg,
  isOpen,
  onClose,
  currencyPreference,
  initialBillingCycle = 'one-time'
}) => {
  if (!isOpen || !pkg) return null;

  const [billingCycle, setBillingCycle] = useState<BillingCycle>(initialBillingCycle);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [paymentMethod] = useState<'mpesa'>('mpesa');
  const [notes, setNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedInvoice, setCopiedInvoice] = useState(false);
  const [orderId] = useState(() => `SYN-${Date.now().toString().slice(-6)}`);

  // M-Pesa Send Money State
  const [mpesaReceiptCode, setMpesaReceiptCode] = useState('');
  const [isMpesaConfirmed, setIsMpesaConfirmed] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [copiedAmount, setCopiedAmount] = useState(false);
  const [copiedRef, setCopiedRef] = useState(false);
  const [copiedReceipt, setCopiedReceipt] = useState(false);
  const [appRedirectAttempted, setAppRedirectAttempted] = useState(false);
  const [autoCopiedPhoneOnLaunch, setAutoCopiedPhoneOnLaunch] = useState(false);

  // Track checkout open on mount
  useEffect(() => {
    trackCheckoutOpen();
  }, []);

  // Update billing cycle if parent prop changes
  useEffect(() => {
    if (initialBillingCycle) {
      setBillingCycle(initialBillingCycle);
    }
  }, [initialBillingCycle]);

  // Determine active price by billing cycle
  const currentUsd =
    billingCycle === 'monthly'
      ? pkg.monthlyUsd
      : billingCycle === 'yearly'
      ? pkg.yearlyUsd
      : pkg.priceUsd;

  const currentKsh =
    billingCycle === 'monthly'
      ? pkg.monthlyKsh
      : billingCycle === 'yearly'
      ? pkg.yearlyKsh
      : pkg.priceKsh;

  const cycleSuffix =
    billingCycle === 'monthly' ? '/ month' : billingCycle === 'yearly' ? '/ year' : '';

  const cycleLabel =
    billingCycle === 'one-time'
      ? 'One-Time Ownership'
      : billingCycle === 'monthly'
      ? 'Monthly Subscription'
      : 'Yearly Plan (Save ~20%)';

  const formattedUsd = `$${currentUsd.toLocaleString()} USD${cycleSuffix ? ' ' + cycleSuffix : ''}`;
  const formattedKsh = `KSh ${currentKsh.toLocaleString()} KES${cycleSuffix ? ' ' + cycleSuffix : ''}`;

  // Form completion and validation checks
  const isNameValid = fullName.trim().length >= 2;
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  const isPhoneValid = phone.trim().replace(/[^0-9+]/g, '').length >= 9;
  const isFormValid = isNameValid && isEmailValid && isPhoneValid;

  const completedFieldsCount = (isNameValid ? 1 : 0) + (isEmailValid ? 1 : 0) + (isPhoneValid ? 1 : 0);
  const missingFields: string[] = [];
  if (!isNameValid) missingFields.push('Full Name');
  if (!isEmailValid) missingFields.push('Valid Email');
  if (!isPhoneValid) missingFields.push('Phone Number');

  // Direct redirect to M-Pesa App (Send Money) with 1-tap auto-copy of recipient number
  const handleOpenMpesaApp = () => {
    setAppRedirectAttempted(true);
    setAutoCopiedPhoneOnLaunch(true);

    // Auto-copy recipient phone number so user can simply tap 'Paste' in M-Pesa
    try {
      navigator.clipboard.writeText(MPESA_PAYMENT_INFO.phone);
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 5000);
    } catch {
      // Ignore writeText errors in restricted contexts
    }

    const isAndroid = /android/i.test(navigator.userAgent);
    const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);

    if (isAndroid) {
      // Try Android Intent for M-Pesa Lifestyle / Super App
      window.location.href =
        'intent://sendmoney#Intent;package=com.safaricom.mpesa.lifestyle;scheme=mpesa;end;';
      setTimeout(() => {
        // Fallback to standard URI scheme
        window.location.href = 'mpesa://sendmoney';
      }, 500);
    } else if (isIOS) {
      // iOS M-Pesa App URI Scheme
      window.location.href = 'mpesa://sendmoney';
      setTimeout(() => {
        window.location.href = 'mpesa://';
      }, 500);
    } else {
      // Desktop / other
      window.location.href = 'mpesa://sendmoney';
    }
  };

  const copyToClipboard = (text: string, type: 'phone' | 'amount' | 'ref' | 'invoice' | 'receipt') => {
    navigator.clipboard.writeText(text);
    if (type === 'phone') {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2500);
    } else if (type === 'amount') {
      setCopiedAmount(true);
      setTimeout(() => setCopiedAmount(false), 2500);
    } else if (type === 'ref') {
      setCopiedRef(true);
      setTimeout(() => setCopiedRef(false), 2500);
    } else if (type === 'receipt') {
      setCopiedReceipt(true);
      setTimeout(() => setCopiedReceipt(false), 2500);
    } else if (type === 'invoice') {
      setCopiedInvoice(true);
      setTimeout(() => setCopiedInvoice(false), 2500);
    }
  };

  const generateOrderSummary = (code?: string) => {
    const verifiedCode = code || mpesaReceiptCode;
    return `==========================================
SYNTRIX DIGITAL ATELIER - OFFICIAL ORDER REQUISITION
Order Reference: ${orderId}
${verifiedCode ? `M-PESA CONFIRMATION CODE: ${verifiedCode.trim().toUpperCase()} (VERIFIED)` : ''}
==========================================

PACKAGE: ${pkg.name} (${pkg.badge || 'Bespoke'})
BILLING PLAN: ${cycleLabel.toUpperCase()}
INVESTMENT: ${formattedUsd} / ${formattedKsh}
TIMELINE: ${pkg.timeline}

CLIENT DETAILS:
- Full Name: ${fullName || 'Valued Client'}
- Email: ${email || 'Pending verification'}
- Phone / WhatsApp: ${phone || 'N/A'}
- Company / Brand: ${company || 'N/A'}
- Payment Channel: M-Pesa (Send Money to ${MPESA_PAYMENT_INFO.phone})${verifiedCode ? ` [Code: ${verifiedCode}]` : ''}

SPECIAL INSTRUCTIONS:
${notes || 'Standard flagship execution as specified in package deliverables.'}

DELIVERABLES INCLUDED:
${pkg.deliverables.map((d) => `• ${d}`).join('\n')}

==========================================
Direct Routing: ${AGENCY_EMAIL}
Creative Lead: ${SOCIAL_LINKS.founder.name} (${SOCIAL_LINKS.founder.handle})
==========================================`;
  };

  const handleMpesaVerificationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid || !mpesaReceiptCode.trim()) return;
    setIsMpesaConfirmed(true);

    // Record into admin audit ledger
    saveOrder({
      id: orderId,
      fullName: fullName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      company: company.trim() || undefined,
      packageId: pkg.id,
      packageName: pkg.name,
      category: pkg.badge,
      billingCycle,
      amountUsd: currentUsd,
      amountKsh: currentKsh,
      paymentMethod: 'mpesa',
      mpesaCode: mpesaReceiptCode.trim().toUpperCase(),
      notes: notes.trim() || undefined,
    });
  };

  const handleCompleteOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;

    setIsSubmitted(true);

    // Record into admin audit ledger
    saveOrder({
      id: orderId,
      fullName: fullName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      company: company.trim() || undefined,
      packageId: pkg.id,
      packageName: pkg.name,
      category: pkg.badge,
      billingCycle,
      amountUsd: currentUsd,
      amountKsh: currentKsh,
      paymentMethod: 'mpesa',
      mpesaCode: mpesaReceiptCode.trim().toUpperCase() || undefined,
      notes: notes.trim() || undefined,
    });

    const subject = encodeURIComponent(
      `[BUY NOW ORDER ${orderId}] ${pkg.name} (${cycleLabel}) - ${company || fullName}`
    );
    const body = encodeURIComponent(generateOrderSummary());
    const mailtoUrl = `mailto:${AGENCY_EMAIL}?subject=${subject}&body=${body}`;

    window.location.href = mailtoUrl;
  };

  // WhatsApp concierge preloaded message
  const waText = encodeURIComponent(
    `Hello Niale, I'm completing my order for *${pkg.name}* (${cycleLabel}) [Ref: *${orderId}*].\n` +
      `${mpesaReceiptCode ? `*M-Pesa Code:* ${mpesaReceiptCode.trim().toUpperCase()}\n` : ''}` +
      `*Amount:* ${formattedUsd} / ${formattedKsh}\n` +
      `*Client:* ${fullName || 'Client'} (${email || phone})\n` +
      `*Payment:* M-PESA (SEND MONEY)`
  );
  const waLink = `https://wa.me/?text=${waText}`;

  return (
    <div
      id="buy-now-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        id="buy-now-modal-container"
        className="relative w-full max-w-3xl bg-[#0A0A0A] border border-white/20 text-white shadow-2xl my-auto overflow-hidden animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Top Accent Line */}
        <div className="h-1 w-full bg-gradient-to-r from-[#00D09C] via-[#FFD700] to-[#FF0000]" />

        {/* Modal Header */}
        <div className="p-5 sm:p-7 border-b border-white/10 flex items-start justify-between bg-black/50">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[10px] uppercase font-mono tracking-widest px-2 py-0.5 bg-[#FFD700] text-black font-bold">
                Instant Acquisition
              </span>
              <span className="text-[10px] font-mono text-white/40 uppercase">
                Ref: {orderId}
              </span>
              {isMpesaConfirmed && (
                <span className="text-[10px] uppercase font-mono tracking-wider px-2 py-0.5 bg-[#00D09C] text-black font-black flex items-center gap-1">
                  <Check className="w-3 h-3" /> M-Pesa Verified
                </span>
              )}
            </div>
            <h3 className="text-xl sm:text-2xl font-black italic tracking-tight text-white flex flex-wrap items-baseline gap-2">
              <span className="uppercase font-sans">{pkg.name}</span>
              {pkg.subDescription && (
                <span className="text-xs font-mono font-bold text-[#FFD700] tracking-wider uppercase">
                  • {pkg.subDescription}
                </span>
              )}
              <span className="text-sm font-normal not-italic text-white/50 font-mono">
                ({pkg.timeline})
              </span>
            </h3>
          </div>

          <button
            id="close-buy-modal-btn"
            onClick={onClose}
            className="p-2 text-white/50 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* VERIFIED M-PESA RECEIPT VIEW */}
        {isMpesaConfirmed ? (
          <div className="p-6 sm:p-10 space-y-6 text-center animate-in fade-in zoom-in-95 duration-200">
            <div className="w-18 h-18 mx-auto bg-[#00D09C]/10 border-2 border-[#00D09C] flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-[#00D09C]" />
            </div>

            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#00D09C] font-bold block mb-2">
                • M-Pesa Payment Registered •
              </span>
              <h4 className="text-2xl sm:text-3xl font-black italic tracking-tight text-white mb-2">
                REQUISITION CONFIRMED
              </h4>
              <p className="text-white/60 text-sm max-w-lg mx-auto">
                Transaction code <strong className="text-[#00D09C] font-mono">{mpesaReceiptCode.trim().toUpperCase()}</strong> attached to order for <strong className="text-white">{pkg.name}</strong> ({cycleLabel}).
              </p>
            </div>

            {/* Receipt Summary Card */}
            <div className="p-5 bg-white/5 border border-[#00D09C]/40 max-w-lg mx-auto text-left space-y-3 font-mono text-xs shadow-lg">
              <div className="flex justify-between items-center py-1.5 border-b border-white/10">
                <span className="text-white/60">M-Pesa Transaction Code:</span>
                <span className="text-[#00D09C] font-black text-sm tracking-wider">
                  {mpesaReceiptCode.trim().toUpperCase()}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/10 text-white/60">
                <span>Order Reference:</span>
                <span className="text-[#FFD700] font-bold">{orderId}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/10 text-white/60">
                <span>Package & Plan:</span>
                <span className="text-white">{pkg.name} ({cycleLabel})</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/10 text-white/60">
                <span>Amount Paid:</span>
                <span className="text-white font-bold">{formattedKsh}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/10 text-white/60">
                <span>Recipient:</span>
                <span className="text-white">{MPESA_PAYMENT_INFO.recipientName} ({MPESA_PAYMENT_INFO.phone})</span>
              </div>
              <div className="flex justify-between py-1 text-white/60">
                <span>Project Kickoff Lead:</span>
                <span className="text-white">{SOCIAL_LINKS.founder.name}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2 max-w-lg mx-auto">
              <a
                id="mpesa-whatsapp-btn"
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-5 py-3 bg-[#25D366] text-black font-bold uppercase text-xs tracking-widest hover:bg-white transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <span>Notify WhatsApp Concierge</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button
                type="button"
                id="copy-receipt-btn"
                onClick={() => copyToClipboard(mpesaReceiptCode.trim().toUpperCase(), 'receipt')}
                className="w-full sm:w-auto px-5 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-mono uppercase tracking-widest text-white flex items-center justify-center gap-2 cursor-pointer transition-all"
              >
                {copiedReceipt ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#00D09C]" />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Code</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto px-5 py-3 border border-white/10 text-white/70 hover:text-white text-xs uppercase tracking-widest transition-all cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        ) : !isSubmitted ? (
          <form onSubmit={handleCompleteOrder} className="p-5 sm:p-7 space-y-6">
            {/* Billing Cycle Option Selector */}
            <div className="space-y-2">
              <span className="text-[11px] uppercase tracking-wider text-white/60 font-mono block">
                Select Billing Frequency:
              </span>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setBillingCycle('one-time')}
                  className={`p-2.5 text-center border transition-all cursor-pointer ${
                    billingCycle === 'one-time'
                      ? 'border-[#FFD700] bg-[#FFD700]/10 text-white font-bold'
                      : 'border-white/10 bg-white/5 text-white/60 hover:text-white'
                  }`}
                >
                  <div className="text-xs font-bold uppercase tracking-tight">One-Time</div>
                  <div className="text-[10px] text-white/50">Full Ownership</div>
                </button>

                <button
                  type="button"
                  onClick={() => setBillingCycle('monthly')}
                  className={`p-2.5 text-center border transition-all cursor-pointer ${
                    billingCycle === 'monthly'
                      ? 'border-[#FFD700] bg-[#FFD700]/10 text-white font-bold'
                      : 'border-white/10 bg-white/5 text-white/60 hover:text-white'
                  }`}
                >
                  <div className="text-xs font-bold uppercase tracking-tight">Monthly</div>
                  <div className="text-[10px] text-white/50">Hosting & Care</div>
                </button>

                <button
                  type="button"
                  onClick={() => setBillingCycle('yearly')}
                  className={`p-2.5 text-center border transition-all cursor-pointer relative ${
                    billingCycle === 'yearly'
                      ? 'border-[#FFD700] bg-[#FFD700]/10 text-white font-bold'
                      : 'border-white/10 bg-white/5 text-white/60 hover:text-white'
                  }`}
                >
                  <span className="absolute -top-2 right-2 px-1.5 py-0.2 bg-[#FFD700] text-black font-black text-[8px] uppercase tracking-wider">
                    Save 20%
                  </span>
                  <div className="text-xs font-bold uppercase tracking-tight">Yearly</div>
                  <div className="text-[10px] text-white/50">2 Months Free</div>
                </button>
              </div>
            </div>

            {/* Price Banner */}
            <div className="p-4 sm:p-5 bg-white/5 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] uppercase font-mono tracking-widest text-white/50 block mb-1">
                  Package Total ({cycleLabel})
                </span>
                <div className="flex items-baseline gap-3">
                  <span className="text-2xl sm:text-3xl font-black font-mono text-[#FFD700]">
                    {currencyPreference === 'KSH' ? formattedKsh : formattedUsd}
                  </span>
                  {currencyPreference !== 'KSH' && (
                    <span className="text-sm font-mono text-white/60">
                      / {formattedKsh}
                    </span>
                  )}
                  {currencyPreference === 'KSH' && (
                    <span className="text-sm font-mono text-white/60">
                      / {formattedUsd}
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-white/40 mt-1">
                  {billingCycle === 'one-time'
                    ? 'Includes full production design, code delivery, and deployment hypercare.'
                    : billingCycle === 'monthly'
                    ? 'Covers ongoing high-speed cloud hosting, SSL, security patching & regular updates.'
                    : 'Billed annually with ~20% savings. Covers domain renewals, cloud hosting & continuous support.'}
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs font-mono text-white/60 bg-black/60 px-3 py-2 border border-white/10 self-start sm:self-center">
                <Clock className="w-3.5 h-3.5 text-[#FFD700]" />
                <span>Sprint: {pkg.timeline}</span>
              </div>
            </div>

            {/* Client Information Fields - STEP 1 (REQUIRED BEFORE BUY BUTTON UNLOCKS) */}
            <div className="space-y-4 p-4 sm:p-5 bg-black/70 border border-white/15">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#FFD700] text-black text-[11px] font-black flex items-center justify-center">
                    1
                  </span>
                  <span className="text-xs uppercase tracking-widest font-black text-white">
                    Client Details <span className="text-[#FFD700]">(Required First)</span>
                  </span>
                </div>
                <span
                  className={`text-[10px] font-mono px-2.5 py-1 border transition-all self-start sm:self-auto ${
                    isFormValid
                      ? 'border-[#00D09C]/50 bg-[#00D09C]/10 text-[#00D09C] font-bold flex items-center gap-1.5'
                      : 'border-white/20 bg-white/5 text-white/60 flex items-center gap-1.5'
                  }`}
                >
                  {isFormValid ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#00D09C]" />
                      <span>Form Complete • Buy Unlocked</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-3 h-3 text-[#FFD700]" />
                      <span>{completedFieldsCount} of 3 fields filled</span>
                    </>
                  )}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label htmlFor="buy-fullname" className="text-[11px] uppercase tracking-wider text-white/80 font-mono font-semibold">
                      Full Name *
                    </label>
                    {isNameValid ? (
                      <span className="text-[10px] text-[#00D09C] font-mono flex items-center gap-1">
                        <Check className="w-3 h-3" /> Valid
                      </span>
                    ) : fullName.length > 0 ? (
                      <span className="text-[10px] text-[#FFD700] font-mono">Min 2 characters</span>
                    ) : (
                      <span className="text-[10px] text-white/40 font-mono">Required</span>
                    )}
                  </div>
                  <input
                    id="buy-fullname"
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Victoria Sterling"
                    className={`w-full px-4 py-2.5 bg-black border text-sm text-white placeholder-white/30 outline-none transition-all ${
                      isNameValid
                        ? 'border-[#00D09C]/60 focus:border-[#00D09C]'
                        : fullName.length > 0
                        ? 'border-[#FFD700]/50 focus:border-[#FFD700]'
                        : 'border-white/20 focus:border-[#FFD700]'
                    }`}
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label htmlFor="buy-email" className="text-[11px] uppercase tracking-wider text-white/80 font-mono font-semibold">
                      Email Address *
                    </label>
                    {isEmailValid ? (
                      <span className="text-[10px] text-[#00D09C] font-mono flex items-center gap-1">
                        <Check className="w-3 h-3" /> Valid
                      </span>
                    ) : email.length > 0 ? (
                      <span className="text-[10px] text-[#FFD700] font-mono">Valid email required</span>
                    ) : (
                      <span className="text-[10px] text-white/40 font-mono">Required</span>
                    )}
                  </div>
                  <input
                    id="buy-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    className={`w-full px-4 py-2.5 bg-black border text-sm text-white placeholder-white/30 outline-none transition-all ${
                      isEmailValid
                        ? 'border-[#00D09C]/60 focus:border-[#00D09C]'
                        : email.length > 0
                        ? 'border-[#FFD700]/50 focus:border-[#FFD700]'
                        : 'border-white/20 focus:border-[#FFD700]'
                    }`}
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label htmlFor="buy-phone" className="text-[11px] uppercase tracking-wider text-white/80 font-mono font-semibold">
                      Phone / WhatsApp *
                    </label>
                    {isPhoneValid ? (
                      <span className="text-[10px] text-[#00D09C] font-mono flex items-center gap-1">
                        <Check className="w-3 h-3" /> Valid
                      </span>
                    ) : phone.length > 0 ? (
                      <span className="text-[10px] text-[#FFD700] font-mono">Min 9 digits</span>
                    ) : (
                      <span className="text-[10px] text-white/40 font-mono">Required</span>
                    )}
                  </div>
                  <input
                    id="buy-phone"
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. 0712 345 678 / +254..."
                    className={`w-full px-4 py-2.5 bg-black border text-sm text-white placeholder-white/30 outline-none font-mono transition-all ${
                      isPhoneValid
                        ? 'border-[#00D09C]/60 focus:border-[#00D09C]'
                        : phone.length > 0
                        ? 'border-[#FFD700]/50 focus:border-[#FFD700]'
                        : 'border-white/20 focus:border-[#FFD700]'
                    }`}
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label htmlFor="buy-company" className="text-[11px] uppercase tracking-wider text-white/60 font-mono">
                      Company / Brand Name
                    </label>
                    <span className="text-[10px] text-white/30 font-mono">Optional</span>
                  </div>
                  <input
                    id="buy-company"
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="e.g. Apex Luxury Labs"
                    className="w-full px-4 py-2.5 bg-black border border-white/20 focus:border-[#FFD700] text-sm text-white placeholder-white/30 outline-none transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Payment Channel: Direct M-Pesa */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#00D09C] text-black text-[11px] font-black flex items-center justify-center">
                  2
                </span>
                <span className="text-xs uppercase tracking-widest font-black text-white">
                  Payment Method: M-Pesa (Send Money)
                </span>
              </div>
              <span className="text-[10px] font-mono text-[#00D09C] bg-[#00D09C]/10 border border-[#00D09C]/30 px-2.5 py-1 font-bold flex items-center gap-1.5 self-start sm:self-auto">
                <CheckCircle2 className="w-3 h-3 text-[#00D09C]" />
                Direct Send Money App & USSD
              </span>
            </div>

            {/* M-PESA SEND MONEY REDIRECT & PAYMENT PANEL */}
            <div className="p-4 sm:p-5 bg-black border-2 border-[#00D09C]/40 space-y-4">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#00D09C]" />
                    <span className="text-xs font-mono uppercase tracking-widest text-[#00D09C] font-black">
                      Send Money to M-Pesa
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-mono text-white/60">
                    <span>Recipient:</span>
                    <strong className="text-white font-semibold">{MPESA_PAYMENT_INFO.recipientName}</strong>
                  </div>
                </div>

                {/* Primary Action Buttons: Open M-Pesa App & Dial USSD */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <button
                    type="button"
                    id="open-mpesa-app-btn"
                    onClick={isFormValid ? handleOpenMpesaApp : undefined}
                    disabled={!isFormValid}
                    className={`py-3 px-4 uppercase text-xs tracking-widest transition-all flex items-center justify-center gap-2 relative ${
                      isFormValid
                        ? 'bg-[#00D09C] hover:bg-white text-black font-black cursor-pointer shadow-lg'
                        : 'bg-white/5 border border-white/10 text-white/30 cursor-not-allowed'
                    }`}
                  >
                    {!isFormValid ? <Lock className="w-3.5 h-3.5 text-white/30" /> : <Smartphone className="w-4 h-4" />}
                    <div className="flex flex-col items-center">
                      <span>Open M-Pesa App</span>
                      {isFormValid && (
                        <span className="text-[9px] text-black/75 font-mono tracking-normal normal-case font-bold">
                          (Auto-copies {MPESA_PAYMENT_INFO.phone} to paste)
                        </span>
                      )}
                    </div>
                  </button>

                  {isFormValid ? (
                    <a
                      id="dial-mpesa-ussd-btn"
                      href={`tel:${encodeURIComponent(MPESA_PAYMENT_INFO.ussdCode)}`}
                      className="py-3 px-4 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold uppercase text-xs tracking-widest transition-all flex items-center justify-center gap-2 cursor-pointer text-center"
                    >
                      <PhoneCall className="w-4 h-4 text-[#00D09C]" />
                      <span>Dial {MPESA_PAYMENT_INFO.ussdCode} (Instant USSD)</span>
                    </a>
                  ) : (
                    <button
                      type="button"
                      disabled
                      className="py-3 px-4 bg-white/5 border border-white/10 text-white/30 uppercase text-xs tracking-widest flex items-center justify-center gap-2 cursor-not-allowed"
                    >
                      <Lock className="w-3.5 h-3.5 text-white/30" />
                      <span>Dial {MPESA_PAYMENT_INFO.ussdCode} (Locked)</span>
                    </button>
                  )}
                </div>

                {!isFormValid && (
                  <div className="p-2.5 bg-[#FFD700]/10 border border-[#FFD700]/30 text-[11px] text-white/80 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 text-[#FFD700]" />
                    <span>
                      Fill in your <strong className="text-white">Full Name, Email & Phone</strong> in Step 1 above to enable M-Pesa app launch.
                    </span>
                  </div>
                )}

                {autoCopiedPhoneOnLaunch && (
                  <div className="p-3 bg-[#00D09C]/15 border-2 border-[#00D09C] text-xs text-white space-y-1.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 font-bold text-[#00D09C]">
                        <CheckCircle2 className="w-4 h-4 text-[#00D09C] shrink-0" />
                        <span>Phone Number Auto-Copied to Clipboard!</span>
                      </div>
                      <span className="text-[10px] font-mono bg-[#00D09C] text-black px-2 py-0.5 font-black uppercase tracking-wider">
                        Ready to Paste
                      </span>
                    </div>
                    <p className="text-white/90 text-[11px] font-mono leading-relaxed pl-6">
                      Recipient <strong className="text-white bg-black/60 px-1.5 py-0.5 border border-[#00D09C]/40 font-bold">{MPESA_PAYMENT_INFO.phone}</strong> ({MPESA_PAYMENT_INFO.recipientName}) is copied to your clipboard.
                      <br />
                      In M-Pesa: Tap <strong>Send Money</strong> &rarr; Long-press and tap <strong>Paste</strong> &rarr; Enter <strong className="text-[#FFD700] font-bold">{formattedKsh}</strong> & your PIN.
                    </p>
                  </div>
                )}

                {appRedirectAttempted && !autoCopiedPhoneOnLaunch && (
                  <div className="p-2.5 bg-[#00D09C]/10 border border-[#00D09C]/20 text-[11px] text-white/80 flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 shrink-0 text-[#00D09C]" />
                    <span>
                      Redirecting to M-Pesa App... If the app did not open automatically, copy the mobile number below or dial <strong>{MPESA_PAYMENT_INFO.ussdCode}</strong> on your phone.
                    </span>
                  </div>
                )}

                {/* Recipient Details & 1-Click Copy Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1 font-mono text-xs">
                  {/* Phone Number */}
                  <div className="p-3 bg-white/5 border border-white/10 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] uppercase text-white/50 block mb-1">M-Pesa Mobile Number:</span>
                      <span className="text-sm font-bold text-white block">{MPESA_PAYMENT_INFO.phone}</span>
                      <span className="text-[10px] text-white/40">{MPESA_PAYMENT_INFO.formattedPhone}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(MPESA_PAYMENT_INFO.phone, 'phone')}
                      className="mt-2.5 py-1.5 px-2 bg-white/10 hover:bg-white/20 text-[10px] uppercase tracking-wider text-white font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                    >
                      {copiedPhone ? (
                        <>
                          <Check className="w-3 h-3 text-[#00D09C]" />
                          <span className="text-[#00D09C]">Phone Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy Number</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Amount to Send */}
                  <div className="p-3 bg-white/5 border border-white/10 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] uppercase text-white/50 block mb-1">Amount to Transfer:</span>
                      <span className="text-sm font-bold text-[#FFD700] block">{formattedKsh}</span>
                      <span className="text-[10px] text-white/40">Exact KES Equivalent</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(String(currentKsh), 'amount')}
                      className="mt-2.5 py-1.5 px-2 bg-white/10 hover:bg-white/20 text-[10px] uppercase tracking-wider text-white font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                    >
                      {copiedAmount ? (
                        <>
                          <Check className="w-3 h-3 text-[#00D09C]" />
                          <span className="text-[#00D09C]">Amount Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy Amount</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Order Reference */}
                  <div className="p-3 bg-white/5 border border-white/10 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] uppercase text-white/50 block mb-1">Payment Reference:</span>
                      <span className="text-sm font-bold text-white block">{orderId}</span>
                      <span className="text-[10px] text-white/40">Include as note</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(orderId, 'ref')}
                      className="mt-2.5 py-1.5 px-2 bg-white/10 hover:bg-white/20 text-[10px] uppercase tracking-wider text-white font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                    >
                      {copiedRef ? (
                        <>
                          <Check className="w-3 h-3 text-[#00D09C]" />
                          <span className="text-[#00D09C]">Ref Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy Reference</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* 3 Step Instructions */}
                <div className="p-3 bg-white/5 border border-white/10 text-xs text-white/70 space-y-1.5">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#00D09C] font-bold block">
                    Quick Steps:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] leading-snug">
                    <div>
                      <strong className="text-white">1. Open M-Pesa:</strong> Tap the button above or open your M-Pesa / Safaricom App.
                    </div>
                    <div>
                      <strong className="text-white">2. Send Money:</strong> Enter phone <code className="text-[#00D09C]">{MPESA_PAYMENT_INFO.phone}</code>, amount <code className="text-[#FFD700]">{currentKsh}</code>, and your PIN.
                    </div>
                    <div>
                      <strong className="text-white">3. Paste Code:</strong> Enter the SMS confirmation code below to verify immediately.
                    </div>
                  </div>
                </div>

                {/* Enter M-Pesa Confirmation Code to verify right away */}
                <div className="pt-2 border-t border-white/10">
                  <label htmlFor="mpesa-code-input" className="block text-[11px] uppercase tracking-wider text-[#00D09C] mb-1.5 font-mono font-bold">
                    Already Sent? Enter M-Pesa Confirmation Code:
                  </label>
                  <div className="flex gap-2">
                    <input
                      id="mpesa-code-input"
                      type="text"
                      value={mpesaReceiptCode}
                      onChange={(e) => setMpesaReceiptCode(e.target.value)}
                      placeholder="e.g. QK8912KL9X"
                      className="flex-1 px-4 py-2.5 bg-black border border-white/20 focus:border-[#00D09C] text-sm font-mono text-white placeholder-white/30 uppercase tracking-widest outline-none transition-all"
                    />
                    <button
                      type="button"
                      id="confirm-mpesa-code-btn"
                      onClick={handleMpesaVerificationSubmit}
                      disabled={!isFormValid || !mpesaReceiptCode.trim()}
                      className="px-5 py-2.5 bg-[#00D09C] hover:bg-white text-black font-bold uppercase text-xs font-mono tracking-wider transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                    >
                      Confirm Payment
                    </button>
                  </div>
                  <span className="text-[10px] text-white/40 font-mono mt-1 block">
                    Received in your Safaricom SMS receipt right after sending.
                  </span>
                </div>
              </div>

            {/* Optional Notes */}
            <div>
              <label htmlFor="buy-notes" className="block text-[11px] uppercase tracking-wider text-white/60 mb-1.5 font-mono">
                Project Vision or Launch Target (Optional)
              </label>
              <textarea
                id="buy-notes"
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Briefly tell us about your brand, domain, or key milestone dates..."
                className="w-full px-4 py-2.5 bg-black border border-white/10 focus:border-[#FFD700] text-sm text-white placeholder-white/30 outline-none resize-none transition-all"
              />
            </div>

            {/* Deliverables Checklist Recap */}
            <div className="p-4 bg-black border border-white/10">
              <span className="text-[10px] uppercase font-mono tracking-widest text-white/50 block mb-2">
                Included Deliverables:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-white/80">
                {pkg.deliverables.slice(0, 6).map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#FFD700] shrink-0" />
                    <span className="truncate">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Submit / Action Buttons */}
            <div className="pt-2 space-y-3">
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <button
                  type="submit"
                  id="confirm-buy-btn"
                  disabled={!isFormValid}
                  className={`w-full sm:flex-1 py-4 px-6 uppercase text-xs tracking-widest transition-all flex items-center justify-center gap-2 select-none ${
                    isFormValid
                      ? 'bg-[#FFD700] hover:bg-white text-black font-black cursor-pointer shadow-xl shadow-[#FFD700]/20 ring-1 ring-[#FFD700]'
                      : 'bg-white/10 border border-white/10 text-white/30 font-bold cursor-not-allowed opacity-50'
                  }`}
                >
                  {isFormValid ? (
                    <>
                      <span>
                        Buy Now — {currencyPreference === 'KSH' ? formattedKsh : formattedUsd}
                      </span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4 text-white/30" />
                      <span>Buy Now (Fill Form Above to Enable)</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  className="w-full sm:w-auto px-6 py-4 border border-white/10 text-white/60 hover:text-white hover:bg-white/5 text-xs uppercase tracking-widest font-bold transition-all cursor-pointer"
                >
                  Cancel
                </button>
              </div>

              {/* Dynamic Validation Status / Guidance Banner */}
              {!isFormValid ? (
                <div className="p-3 bg-white/5 border border-white/10 flex items-center justify-center gap-2 text-xs text-white/60 font-mono text-center">
                  <AlertCircle className="w-4 h-4 text-[#FFD700] shrink-0" />
                  <span>
                    Buy button is greyed out. Please fill:{' '}
                    <strong className="text-[#FFD700] font-bold">{missingFields.join(', ')}</strong>.
                  </span>
                </div>
              ) : (
                <div className="p-3 bg-[#00D09C]/10 border border-[#00D09C]/30 flex items-center justify-center gap-2 text-xs text-[#00D09C] font-mono text-center">
                  <CheckCircle2 className="w-4 h-4 text-[#00D09C] shrink-0" />
                  <span>
                    Contact form verified! Click "Buy Now" to finalize order requisition.
                  </span>
                </div>
              )}
            </div>

            <div className="flex items-center justify-center gap-2 text-[11px] text-white/40 font-mono text-center">
              <ShieldCheck className="w-3.5 h-3.5 text-[#FFD700]" />
              <span>Direct requisition issued to studio atelier • Non-disclosure protection included</span>
            </div>
          </form>
        ) : (
          /* Confirmation State for Requisition */
          <div className="p-6 sm:p-10 space-y-6 text-center">
            <div className="w-16 h-16 mx-auto bg-[#FFD700]/10 border border-[#FFD700] flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-[#FFD700]" />
            </div>

            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#FFD700] block mb-2">
                Order Requisition Dispatched
              </span>
              <h4 className="text-2xl sm:text-3xl font-black italic tracking-tight text-white mb-2">
                THANK YOU, {fullName.toUpperCase()}.
              </h4>
              <p className="text-white/60 text-sm max-w-lg mx-auto">
                Your order for the <strong className="text-white">{pkg.name}</strong> has been created with reference{' '}
                <span className="font-mono text-[#FFD700] font-bold">{orderId}</span>.
              </p>
            </div>

            {/* Summary Box */}
            <div className="p-5 bg-white/5 border border-white/10 max-w-lg mx-auto text-left space-y-2.5 font-mono text-xs">
              <div className="flex justify-between py-1 border-b border-white/10 text-white/60">
                <span>Selected Package:</span>
                <span className="text-white font-bold">{pkg.name}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/10 text-white/60">
                <span>Total Amount:</span>
                <span className="text-[#FFD700] font-bold">
                  {formattedUsd} ({formattedKsh})
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/10 text-white/60">
                <span>Payment Channel:</span>
                <span className="text-[#00D09C] uppercase font-bold">
                  M-Pesa (Send Money)
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/10 text-white/60">
                <span>Delivery Cadence:</span>
                <span className="text-white">{pkg.timeline}</span>
              </div>
              <div className="flex justify-between py-1 text-white/60">
                <span>Routing Recipient:</span>
                <span className="text-white">{AGENCY_EMAIL}</span>
              </div>
            </div>

            {/* Payment Action Instructions */}
            <div className="p-4 bg-[#00D09C]/10 border border-[#00D09C]/30 text-left max-w-lg mx-auto text-xs space-y-2">
              <div className="font-bold text-[#00D09C] uppercase tracking-wider">
                M-Pesa Transfer Details:
              </div>
              <div className="text-white/80">
                Send <strong className="text-white font-mono">{formattedKsh}</strong> to{' '}
                <strong className="text-[#00D09C] font-mono">{MPESA_PAYMENT_INFO.phone}</strong> ({MPESA_PAYMENT_INFO.recipientName}).
              </div>
              <div className="text-white/80">
                Reference / Note: <strong className="text-[#FFD700] font-mono">{orderId}</strong>
              </div>
              <div className="text-white/70 text-[11px] pt-1">
                Once sent, notify concierge via WhatsApp or reply to the email invoice sent to {email}.
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2 max-w-lg mx-auto">
              <button
                type="button"
                id="copy-order-details-btn"
                onClick={() => copyToClipboard(generateOrderSummary(), 'invoice')}
                className="w-full sm:w-auto px-5 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-mono uppercase tracking-widest text-white flex items-center justify-center gap-2 cursor-pointer transition-all"
              >
                {copiedInvoice ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#FFD700]" />
                    <span>Copied Invoice</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Invoice Summary</span>
                  </>
                )}
              </button>

              <a
                id="whatsapp-concierge-btn"
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-5 py-3 bg-[#25D366] text-black font-bold uppercase text-xs tracking-widest hover:bg-white transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>WhatsApp Concierge</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto px-5 py-3 border border-white/10 text-white/70 hover:text-white text-xs uppercase tracking-widest transition-all cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
