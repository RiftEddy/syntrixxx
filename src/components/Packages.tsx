import React, { useState, useMemo } from 'react';
import {
  Check,
  Zap,
  ArrowRight,
  Shield,
  CreditCard,
  Smartphone,
  Building2,
  Clock,
  Sparkles,
  HelpCircle,
  Filter,
  ArrowUpDown,
  Search,
  Globe,
  MapPin,
  TrendingUp,
  ShoppingCart,
  Layers,
  ChevronDown,
  ChevronUp,
  Calendar,
  Repeat,
  BadgePercent
} from 'lucide-react';
import { PACKAGES, EXCHANGE_RATE_USD_KSH } from '../data';
import { PricingPackage, BillingCycle } from '../types';
import { BuyNowModal } from './BuyNowModal';
import { trackPackageView } from '../utils/adminStore';

interface PackagesProps {
  onSelectPackageForBrief?: (packageName: string) => void;
}

type CategoryFilter = 'all' | 'starter' | 'growth' | 'flagship';
type SortOrder = 'asc' | 'desc';

export const Packages: React.FC<PackagesProps> = ({ onSelectPackageForBrief }) => {
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('one-time');
  const [currency, setCurrency] = useState<'BOTH' | 'USD' | 'KSH'>('BOTH');
  const [category, setCategory] = useState<CategoryFilter>('all');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
  const [searchQuery, setSearchQuery] = useState('');
  const [activePackageForCheckout, setActivePackageForCheckout] = useState<PricingPackage | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const handleBuyNow = (pkg: PricingPackage) => {
    trackPackageView(pkg.id);
    setActivePackageForCheckout(pkg);
    setIsModalOpen(true);
  };

  // Filter and sort packages
  const filteredPackages = useMemo(() => {
    let result = [...PACKAGES];

    if (category !== 'all') {
      result = result.filter((pkg) => pkg.category === category);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (pkg) =>
          pkg.name.toLowerCase().includes(q) ||
          (pkg.subDescription && pkg.subDescription.toLowerCase().includes(q)) ||
          pkg.tagline.toLowerCase().includes(q) ||
          pkg.deliverables.some((d) => d.toLowerCase().includes(q)) ||
          pkg.idealFor.toLowerCase().includes(q)
      );
    }

    result.sort((a, b) => {
      const priceA =
        billingCycle === 'monthly'
          ? a.monthlyKsh
          : billingCycle === 'yearly'
          ? a.yearlyKsh
          : a.priceKsh;
      const priceB =
        billingCycle === 'monthly'
          ? b.monthlyKsh
          : billingCycle === 'yearly'
          ? b.yearlyKsh
          : b.priceKsh;

      if (sortOrder === 'asc') {
        return priceA - priceB;
      } else {
        return priceB - priceA;
      }
    });

    return result;
  }, [category, searchQuery, sortOrder, billingCycle]);

  const faqs = [
    {
      q: 'How does the M-Pesa Send Money checkout work?',
      a: 'When you click "Buy Now" on any package and select M-Pesa, you can tap "Open M-Pesa App" to immediately launch the M-Pesa Super App on your phone, or tap "Dial *334#" for instant USSD transfer. The recipient phone number (0712 345 678), exact KSh amount, and order reference are displayed with 1-click copy buttons. After transferring, simply enter your M-Pesa confirmation code to generate your official verified project requisition and notify our concierge.'
    },
    {
      q: 'How do the One-Time vs. Monthly vs. Yearly plans differ?',
      a: 'One-Time is a single upfront investment giving you 100% intellectual property and full production code transfer (you own the files completely). Monthly plans are flexible subscriptions covering ongoing cloud hosting, SSL encryption, security patches, and monthly content/design updates with zero long-term lock-in. Yearly plans include everything in monthly plans billed annually at an approximate 20% discount (equal to 2 months completely free) with free annual domain renewals.'
    },
    {
      q: 'Can I start with a One-Time package and add Monthly maintenance later?',
      a: 'Yes, absolutely. Many clients start with a One-Time build (such as the 15k or 25k package), launch their platform, and then subscribe to a 2.5k–5.5k monthly care plan whenever they want hands-off updates, backups, and uptime monitoring.'
    },
    {
      q: 'What is the difference between "Website (No Hosting - 15k)" and "Website With Hosting (25k)"?',
      a: 'In the 15,000 KES tier, we build a sleek, high-speed custom website and deliver the complete production code files (or upload to your existing cPanel/hosting). In the 25,000 KES tier, we provide a complete turnkey launch: we buy & configure your custom .com/.co.ke domain, provide 1 full year of cloud hosting, install SSL encryption, and set up official branded emails.'
    },
    {
      q: 'What is included in the Google Identification & Maps Pack (38k)?',
      a: 'This includes the full 25k website with 1-year hosting, PLUS official Google Business Profile setup (Google Maps listing & verification pin), Google Search Console sitemap indexing so your pages appear on Google Search, Google Analytics 4 tracking, and Local SEO schema markup.'
    },
    {
      q: 'Can I cancel or pause my Monthly subscription anytime?',
      a: 'Yes. Monthly plans have no long-term contracts. You can pause or cancel at the end of any billing cycle, and your website code remains 100% yours.'
    },
    {
      q: 'How does M-Pesa payment work for orders?',
      a: 'When you click "Buy Now" or "Subscribe", you can choose M-Pesa (Kenya). You will receive an immediate order reference code and automated Till/Paybill instructions or STK push confirmation in Kenyan Shillings.'
    }
  ];

  return (
    <section id="packages" className="py-24 sm:py-32 bg-black text-white relative border-b border-white/10 overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#FFD700]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-red-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-4xl mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 mb-6">
            <Zap className="w-3.5 h-3.5 text-[#FFD700]" />
            <span className="text-xs uppercase tracking-[0.3em] font-bold text-white">
              Instant Acquisition • Flexible Billing Cycles
            </span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-black italic tracking-tighter text-white mb-4">
            PACKAGES & PRICING. <br />
            <span className="text-[#FFD700]">ONE-TIME, MONTHLY & YEARLY.</span>
          </h2>
          <p className="text-white/60 text-base sm:text-lg leading-relaxed">
            Choose your preferred billing model: full upfront <strong className="text-white">One-Time Ownership</strong> (current fixed prices from 15K KSh), flexible <strong className="text-white">Monthly Subscriptions</strong> for ongoing care, or <strong className="text-white">Yearly Plans</strong> with 2 months free (~20% savings).
          </p>
        </div>

        {/* Primary Billing Model Switcher: One-Time vs Monthly vs Yearly */}
        <div className="mb-10 p-2 sm:p-2.5 bg-white/5 border border-white/15 max-w-2xl">
          <div className="flex items-center justify-between text-[11px] font-mono text-white/50 px-1 mb-2">
            <span className="uppercase tracking-wider font-bold text-[#FFD700] flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              Select Payment Cadence
            </span>
            <span className="hidden sm:inline">Transparent pricing in KES & USD</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {/* One-Time Option */}
            <button
              type="button"
              id="plan-toggle-onetime"
              onClick={() => setBillingCycle('one-time')}
              className={`p-3 text-left transition-all cursor-pointer border ${
                billingCycle === 'one-time'
                  ? 'bg-[#FFD700] text-black border-[#FFD700] shadow-md'
                  : 'bg-black/60 text-white/70 border-white/10 hover:border-white/30 hover:text-white'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-black uppercase tracking-wider">One-Time</span>
                <Shield className={`w-3.5 h-3.5 ${billingCycle === 'one-time' ? 'text-black' : 'text-white/40'}`} />
              </div>
              <div className={`text-[11px] leading-tight ${billingCycle === 'one-time' ? 'text-black/80 font-medium' : 'text-white/40'}`}>
                Current Price • 100% Code Ownership
              </div>
            </button>

            {/* Monthly Option */}
            <button
              type="button"
              id="plan-toggle-monthly"
              onClick={() => setBillingCycle('monthly')}
              className={`p-3 text-left transition-all cursor-pointer border ${
                billingCycle === 'monthly'
                  ? 'bg-[#FFD700] text-black border-[#FFD700] shadow-md'
                  : 'bg-black/60 text-white/70 border-white/10 hover:border-white/30 hover:text-white'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-black uppercase tracking-wider">Monthly</span>
                <Repeat className={`w-3.5 h-3.5 ${billingCycle === 'monthly' ? 'text-black' : 'text-white/40'}`} />
              </div>
              <div className={`text-[11px] leading-tight ${billingCycle === 'monthly' ? 'text-black/80 font-medium' : 'text-white/40'}`}>
                Hosting, SSL & Monthly Maintenance
              </div>
            </button>

            {/* Yearly Option */}
            <button
              type="button"
              id="plan-toggle-yearly"
              onClick={() => setBillingCycle('yearly')}
              className={`p-3 text-left transition-all cursor-pointer border relative ${
                billingCycle === 'yearly'
                  ? 'bg-[#FFD700] text-black border-[#FFD700] shadow-md'
                  : 'bg-black/60 text-white/70 border-white/10 hover:border-white/30 hover:text-white'
              }`}
            >
              <span className="absolute -top-2.5 right-2 px-1.5 py-0.5 bg-red-600 text-white font-black text-[9px] uppercase tracking-wider shadow">
                Save ~20%
              </span>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-black uppercase tracking-wider">Yearly</span>
                <BadgePercent className={`w-3.5 h-3.5 ${billingCycle === 'yearly' ? 'text-black' : 'text-white/40'}`} />
              </div>
              <div className={`text-[11px] leading-tight ${billingCycle === 'yearly' ? 'text-black/80 font-medium' : 'text-white/40'}`}>
                2 Months Free • Domain & Cloud Care
              </div>
            </button>
          </div>
        </div>

        {/* Gradual Ascending Pricing Ladder Quick Selector */}
        <div className="mb-10 p-4 sm:p-5 bg-white/5 border border-white/10">
          <div className="flex items-center justify-between gap-2 mb-3">
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#FFD700] font-bold flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5" />
              Ascending Tier Progression ({billingCycle === 'one-time' ? 'One-Time Build' : billingCycle === 'monthly' ? 'Monthly Retainer' : 'Yearly Retainer'})
            </span>
            <span className="text-[10px] font-mono text-white/50 hidden sm:inline">
              Click any tier to jump directly to it
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 text-xs">
            {PACKAGES.slice(0, 5).map((pkg) => {
              const activeKsh =
                billingCycle === 'monthly'
                  ? pkg.monthlyKsh
                  : billingCycle === 'yearly'
                  ? pkg.yearlyKsh
                  : pkg.priceKsh;
              const suffix =
                billingCycle === 'monthly' ? '/mo' : billingCycle === 'yearly' ? '/yr' : '';

              return (
                <button
                  key={pkg.id}
                  onClick={() => {
                    const el = document.getElementById(`package-card-${pkg.id}`);
                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  }}
                  className="p-2.5 bg-black/60 border border-white/10 hover:border-[#FFD700] text-left transition-all group cursor-pointer"
                >
                  <div className="text-[9px] font-mono uppercase tracking-wider text-[#FFD700]">
                    KSh {activeKsh.toLocaleString()} {suffix}
                  </div>
                  <div className="font-bold text-white text-[11px] truncate group-hover:text-[#FFD700] transition-colors flex items-center gap-1.5">
                    <span>{pkg.name}</span>
                    {pkg.subDescription && (
                      <span className="text-[9px] font-normal text-white/40 truncate hidden sm:inline">
                        • {pkg.subDescription}
                      </span>
                    )}
                  </div>
                  <div className="text-[10px] text-white/40">{pkg.timeline}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Controls: Currency Switcher, Category Tabs, Search & Sort */}
        <div className="space-y-4 mb-10">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-4 bg-white/5 border border-white/10">
            {/* Currency Switcher */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-xs uppercase tracking-widest font-bold text-white/50">
                Display Currency:
              </span>
              <div className="inline-flex p-1 bg-black border border-white/10">
                <button
                  type="button"
                  id="currency-toggle-both"
                  onClick={() => setCurrency('BOTH')}
                  className={`px-3 py-1.5 text-xs font-mono font-bold tracking-wider uppercase transition-all cursor-pointer ${
                    currency === 'BOTH'
                      ? 'bg-[#FFD700] text-black'
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  Both (KSH & USD)
                </button>
                <button
                  type="button"
                  id="currency-toggle-ksh"
                  onClick={() => setCurrency('KSH')}
                  className={`px-3 py-1.5 text-xs font-mono font-bold tracking-wider uppercase transition-all cursor-pointer ${
                    currency === 'KSH'
                      ? 'bg-[#FFD700] text-black'
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  KSH (KSh)
                </button>
                <button
                  type="button"
                  id="currency-toggle-usd"
                  onClick={() => setCurrency('USD')}
                  className={`px-3 py-1.5 text-xs font-mono font-bold tracking-wider uppercase transition-all cursor-pointer ${
                    currency === 'USD'
                      ? 'bg-[#FFD700] text-black'
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  USD ($)
                </button>
              </div>
            </div>

            {/* Exchange Rate Badge & Payment methods */}
            <div className="flex items-center gap-3 text-xs font-mono text-white/50">
              <span className="px-2.5 py-1 bg-black border border-white/10 text-white/80 font-bold">
                1 USD ≈ {EXCHANGE_RATE_USD_KSH} KES
              </span>
              <span className="hidden md:flex items-center gap-1.5 text-[#00D09C] font-semibold text-xs font-mono">
                <span className="w-2 h-2 rounded-full bg-[#00D09C] inline-block" />
                M-Pesa App (Send Money) Accepted
              </span>
            </div>
          </div>

          {/* Secondary Filter & Search Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            {/* Category Pills */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                id="filter-category-all"
                onClick={() => setCategory('all')}
                className={`px-3.5 py-2 text-xs uppercase tracking-wider font-mono font-bold transition-all cursor-pointer ${
                  category === 'all'
                    ? 'bg-white text-black'
                    : 'bg-white/5 text-white/70 hover:text-white border border-white/10'
                }`}
              >
                All Tiers ({PACKAGES.length})
              </button>
              <button
                type="button"
                id="filter-category-starter"
                onClick={() => setCategory('starter')}
                className={`px-3.5 py-2 text-xs uppercase tracking-wider font-mono font-bold transition-all cursor-pointer ${
                  category === 'starter'
                    ? 'bg-[#FFD700] text-black'
                    : 'bg-white/5 text-white/70 hover:text-white border border-white/10'
                }`}
              >
                Starter Essentials (15k – 38k)
              </button>
              <button
                type="button"
                id="filter-category-growth"
                onClick={() => setCategory('growth')}
                className={`px-3.5 py-2 text-xs uppercase tracking-wider font-mono font-bold transition-all cursor-pointer ${
                  category === 'growth'
                    ? 'bg-[#FFD700] text-black'
                    : 'bg-white/5 text-white/70 hover:text-white border border-white/10'
                }`}
              >
                Growth & Ads (65k – 120k)
              </button>
              <button
                type="button"
                id="filter-category-flagship"
                onClick={() => setCategory('flagship')}
                className={`px-3.5 py-2 text-xs uppercase tracking-wider font-mono font-bold transition-all cursor-pointer ${
                  category === 'flagship'
                    ? 'bg-[#FFD700] text-black'
                    : 'bg-white/5 text-white/70 hover:text-white border border-white/10'
                }`}
              >
                Atelier Flagship (325k+)
              </button>
            </div>

            {/* Sort & Search */}
            <div className="flex items-center gap-2">
              <div className="relative flex-1 sm:w-56">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
                <input
                  type="text"
                  placeholder="Search features..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 bg-black border border-white/10 text-xs text-white placeholder-white/30 focus:border-[#FFD700] outline-none"
                />
              </div>

              <button
                type="button"
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                className="px-3 py-2 bg-white/5 border border-white/10 text-xs font-mono text-white/70 hover:text-white flex items-center gap-1.5 cursor-pointer"
                title="Toggle price sorting"
              >
                <ArrowUpDown className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{sortOrder === 'asc' ? 'Low → High' : 'High → Low'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {filteredPackages.map((pkg) => {
            const isPopular = pkg.popular;
            const activeKsh =
              billingCycle === 'monthly'
                ? pkg.monthlyKsh
                : billingCycle === 'yearly'
                ? pkg.yearlyKsh
                : pkg.priceKsh;
            const activeUsd =
              billingCycle === 'monthly'
                ? pkg.monthlyUsd
                : billingCycle === 'yearly'
                ? pkg.yearlyUsd
                : pkg.priceUsd;
            const cycleSuffix =
              billingCycle === 'monthly'
                ? '/ mo'
                : billingCycle === 'yearly'
                ? '/ yr'
                : '';
            const cycleSubtitle =
              billingCycle === 'one-time'
                ? 'One-Time Ownership (Current Price)'
                : billingCycle === 'monthly'
                ? 'Monthly Managed Plan (Hosting & Care)'
                : 'Annual Plan (Save 20% • 2 Mo Free)';

            return (
              <div
                key={pkg.id}
                id={`package-card-${pkg.id}`}
                className={`relative flex flex-col justify-between p-6 sm:p-7 transition-all duration-300 ${
                  isPopular
                    ? 'bg-[#0E0E0E] border-2 border-[#FFD700] shadow-[0_0_35px_rgba(255,215,0,0.15)]'
                    : 'bg-white/5 border border-white/10 hover:border-white/30'
                }`}
              >
                {/* Popular / Tier Badge */}
                {pkg.badge && (
                  <div className="absolute -top-3 left-6">
                    <span
                      className={`text-[10px] font-mono uppercase tracking-widest font-black px-3 py-1 shadow-md ${
                        isPopular
                          ? 'bg-[#FFD700] text-black'
                          : 'bg-white text-black'
                      }`}
                    >
                      {pkg.badge}
                    </span>
                  </div>
                )}

                <div>
                  {/* Title & Tagline */}
                  <div className="pt-2 mb-5">
                    <div className="flex flex-col gap-1 mb-2">
                      <h3 className="text-2xl sm:text-3xl font-black italic tracking-tight text-white uppercase font-sans">
                        {pkg.name}
                      </h3>
                      {pkg.subDescription && (
                        <div className="text-xs font-mono font-bold text-[#FFD700] tracking-wider uppercase flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 bg-[#FFD700] rounded-full inline-block" />
                          <span>{pkg.subDescription}</span>
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-white/60 leading-relaxed min-h-[38px]">
                      {pkg.tagline}
                    </p>
                  </div>

                  {/* Dual Price Box */}
                  <div className="p-4 bg-black border border-white/10 mb-5">
                    <div className="text-[10px] font-mono uppercase tracking-widest text-[#FFD700] mb-1 font-bold">
                      {cycleSubtitle}
                    </div>

                    {/* Currency Display Based on Selection */}
                    {currency === 'BOTH' && (
                      <div className="space-y-0.5">
                        <div className="text-2xl sm:text-3xl font-black font-mono text-[#FFD700]">
                          KSh {activeKsh.toLocaleString()}{' '}
                          <span className="text-xs font-normal text-white/60 font-sans">KES {cycleSuffix}</span>
                        </div>
                        <div className="text-sm font-bold font-mono text-white/70">
                          ${activeUsd.toLocaleString()}{' '}
                          <span className="text-xs font-normal text-white/40 font-sans">USD {cycleSuffix}</span>
                        </div>
                      </div>
                    )}

                    {currency === 'KSH' && (
                      <div>
                        <div className="text-2xl sm:text-3xl font-black font-mono text-[#FFD700]">
                          KSh {activeKsh.toLocaleString()}{' '}
                          <span className="text-xs font-normal text-white/60 font-sans">KES {cycleSuffix}</span>
                        </div>
                        <div className="text-xs font-mono text-white/40 mt-1">
                          ≈ ${activeUsd.toLocaleString()} USD {cycleSuffix}
                        </div>
                      </div>
                    )}

                    {currency === 'USD' && (
                      <div>
                        <div className="text-2xl sm:text-3xl font-black font-mono text-[#FFD700]">
                          ${activeUsd.toLocaleString()}{' '}
                          <span className="text-xs font-normal text-white/60 font-sans">USD {cycleSuffix}</span>
                        </div>
                        <div className="text-xs font-mono text-white/40 mt-1">
                          ≈ KSh {activeKsh.toLocaleString()} KES {cycleSuffix}
                        </div>
                      </div>
                    )}

                    {/* Timeline */}
                    <div className="flex items-center gap-2 mt-3 pt-3 border-t border-white/10 text-xs font-mono text-white/70">
                      <Clock className="w-3.5 h-3.5 text-[#FFD700]" />
                      <span>Delivery Sprint: {pkg.timeline}</span>
                    </div>
                  </div>

                  {/* Highlights Pill Tags */}
                  {pkg.highlights && pkg.highlights.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {pkg.highlights.map((h, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 bg-white/5 border border-white/10 text-[10px] font-mono text-white/70"
                        >
                          {h}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Ideal For */}
                  <div className="mb-5">
                    <span className="text-[10px] uppercase font-mono tracking-widest text-white/40 block mb-1">
                      Tailored For:
                    </span>
                    <p className="text-xs text-white/80 leading-relaxed">
                      {pkg.idealFor}
                    </p>
                  </div>

                  {/* Deliverables List */}
                  <div className="space-y-2 mb-6">
                    <span className="text-[10px] uppercase font-mono tracking-widest text-white/40 block mb-1.5">
                      Deliverables Included:
                    </span>
                    {pkg.deliverables.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-white/80">
                        <div className="w-3.5 h-3.5 rounded-full bg-[#FFD700]/10 border border-[#FFD700]/30 flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-2 h-2 text-[#FFD700]" />
                        </div>
                        <span className="leading-snug">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Actions */}
                <div className="space-y-2 pt-4 border-t border-white/10">
                  <button
                    type="button"
                    id={`buy-now-btn-${pkg.id}`}
                    onClick={() => handleBuyNow(pkg)}
                    className={`w-full py-3.5 px-5 font-black uppercase text-xs tracking-widest transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md ${
                      isPopular
                        ? 'bg-[#FFD700] text-black hover:bg-white hover:text-black'
                        : 'bg-white text-black hover:bg-[#FFD700] hover:text-black'
                    }`}
                  >
                    <span>
                      {billingCycle === 'one-time'
                        ? 'Buy Now'
                        : billingCycle === 'monthly'
                        ? 'Subscribe Monthly'
                        : 'Subscribe Yearly'}{' '}
                      (
                      {currency === 'USD'
                        ? `$${activeUsd.toLocaleString()}${cycleSuffix}`
                        : `KSh ${activeKsh.toLocaleString()}${cycleSuffix}`}
                      )
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  {onSelectPackageForBrief && (
                    <button
                      type="button"
                      id={`inquire-brief-btn-${pkg.id}`}
                      onClick={() => onSelectPackageForBrief(`${pkg.name} (${billingCycle.toUpperCase()})`)}
                      className="w-full py-2 text-center text-[11px] font-mono uppercase tracking-wider text-white/50 hover:text-white transition-colors cursor-pointer"
                    >
                      Inquire via Project Brief →
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick FAQ Accordion */}
        <div className="mb-16 p-6 sm:p-8 bg-white/5 border border-white/10 max-w-4xl mx-auto">
          <div className="flex items-center gap-2 mb-6">
            <HelpCircle className="w-4 h-4 text-[#FFD700]" />
            <h3 className="text-lg font-bold uppercase tracking-wider text-white">
              Pricing Clarity & Frequently Asked Questions
            </h3>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = expandedFaq === idx;
              return (
                <div key={idx} className="border border-white/10 bg-black/40">
                  <button
                    type="button"
                    onClick={() => setExpandedFaq(isOpen ? null : idx)}
                    className="w-full p-4 text-left text-xs sm:text-sm font-bold text-white flex items-center justify-between gap-4 cursor-pointer hover:text-[#FFD700] transition-colors"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-[#FFD700] shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-white/50 shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 pt-1 text-xs text-white/70 leading-relaxed border-t border-white/5">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Acquisition Guarantees & Payment Channels */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-8 border-t border-white/10 text-xs">
          <div className="p-4 bg-white/5 border border-white/10 flex items-start gap-3">
            <Smartphone className="w-4 h-4 text-[#00D09C] shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-white uppercase tracking-wider text-[11px] mb-0.5">
                M-Pesa Kenya Express
              </div>
              <div className="text-white/50 text-[11px]">
                Instant checkout in Kenyan Shillings (KES) via automated Till / Paybill and STK push.
              </div>
            </div>
          </div>

          <div className="p-4 bg-white/5 border border-white/10 flex items-start gap-3">
            <Globe className="w-4 h-4 text-[#FFD700] shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-white uppercase tracking-wider text-[11px] mb-0.5">
                Hosting & Domains
              </div>
              <div className="text-white/50 text-[11px]">
                High-speed cloud servers, free .com / .co.ke registration, SSL, and business emails.
              </div>
            </div>
          </div>

          <div className="p-4 bg-white/5 border border-white/10 flex items-start gap-3">
            <Shield className="w-4 h-4 text-white shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-white uppercase tracking-wider text-[11px] mb-0.5">
                Full Code Ownership
              </div>
              <div className="text-white/50 text-[11px]">
                100% intellectual property, design tokens, and Git repositories transferred upon completion.
              </div>
            </div>
          </div>

          <div className="p-4 bg-white/5 border border-white/10 flex items-start gap-3">
            <CreditCard className="w-4 h-4 text-[#FFD700] shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-white uppercase tracking-wider text-[11px] mb-0.5">
                Global Cards & Wire
              </div>
              <div className="text-white/50 text-[11px]">
                Visa, Mastercard, and SWIFT corporate invoicing in USD and KES.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Buy Now Modal */}
      <BuyNowModal
        pkg={activePackageForCheckout}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        currencyPreference={currency}
        initialBillingCycle={billingCycle}
      />
    </section>
  );
};
