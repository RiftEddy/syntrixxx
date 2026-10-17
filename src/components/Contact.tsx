import React, { useState, useEffect } from 'react';
import { SOCIAL_LINKS, AGENCY_EMAIL } from '../data';
import { ContactFormData } from '../types';
import { 
  Send, 
  CheckCircle, 
  Copy, 
  Mail, 
  Clock, 
  Calendar, 
  Instagram, 
  ArrowUpRight,
  Sparkles,
  MessageSquare,
  RefreshCw,
  FileText
} from 'lucide-react';

interface ContactProps {
  initialService?: string;
  scopeSummary?: {
    serviceType: string;
    timeline: string;
    selectedFeatures: string[];
  } | null;
}

const DEFAULT_INITIATE_MESSAGE = `Hi Niale, I would like to initiate discovery for a new digital project with Syntrix. We want to craft an uncompromising, high-velocity digital presence and explore architecture and launch timeline options. Looking forward to connecting.`;

export const Contact: React.FC<ContactProps> = ({ initialService = '', scopeSummary = null }) => {
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: '',
    email: '',
    company: '',
    service: initialService || 'Glacier • Website (No Hosting) – 15K KES ($115)',
    budget: '25',
    timeline: 'Within 4–8 Weeks',
    message: DEFAULT_INITIATE_MESSAGE
  });

  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [budgetError, setBudgetError] = useState('');
  const [activeMessagePreset, setActiveMessagePreset] = useState<'default' | 'scope' | 'flagship' | 'commerce' | 'rebrand' | 'custom'>(
    scopeSummary ? 'scope' : 'default'
  );

  const buildScopeMessage = (scope: { serviceType: string; timeline: string; selectedFeatures: string[] }) => {
    const modulesList = scope.selectedFeatures.length > 0
      ? scope.selectedFeatures.map((f) => `  - ${f}`).join('\n')
      : '  - Standard Core Architecture';

    return `Hi Niale, I've configured our project scope using the Syntrix Scope Planner:

• Architecture Archetype: ${scope.serviceType}
• Delivery Cadence: ${scope.timeline}
• Active Feature Modules (${scope.selectedFeatures.length}):
${modulesList}

We are looking to initiate discovery and discuss next steps for this project.`;
  };

  // Update when scopeSummary or initialService changes
  useEffect(() => {
    if (scopeSummary) {
      setFormData((prev) => ({
        ...prev,
        service: scopeSummary.serviceType,
        timeline: scopeSummary.timeline,
        message: buildScopeMessage(scopeSummary)
      }));
      setActiveMessagePreset('scope');
    } else if (initialService) {
      setFormData((prev) => ({
        ...prev,
        service: initialService,
        message: prev.message === DEFAULT_INITIATE_MESSAGE
          ? `Hi Niale, I would like to initiate discovery regarding the ${initialService} tier. We're eager to discuss timeline, deliverables, and launch velocity.`
          : prev.message
      }));
    }
  }, [scopeSummary, initialService]);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(AGENCY_EMAIL);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSelectPreset = (preset: 'default' | 'scope' | 'flagship' | 'commerce' | 'rebrand') => {
    setActiveMessagePreset(preset);
    if (preset === 'default') {
      setFormData((prev) => ({ ...prev, message: DEFAULT_INITIATE_MESSAGE }));
    } else if (preset === 'scope') {
      if (scopeSummary) {
        setFormData((prev) => ({ ...prev, message: buildScopeMessage(scopeSummary) }));
      } else {
        setFormData((prev) => ({
          ...prev,
          message: `Hi Niale, I'm planning our project scope for ${formData.service}. We require a robust frontend, sub-second performance, and tailored feature integrations. Looking forward to initiating discovery.`
        }));
      }
    } else if (preset === 'flagship') {
      setFormData((prev) => ({
        ...prev,
        message: `Hi Niale, we're planning a flagship digital platform for our brand. We require bespoke motion design, sub-second edge performance, and an uncompromising editorial aesthetic. Let's schedule our discovery session.`
      }));
    } else if (preset === 'commerce') {
      setFormData((prev) => ({
        ...prev,
        message: `Hi Niale, we want to launch a high-conversion digital commerce platform integrated with Safaricom M-Pesa instant checkout and frictionless payment flows. Let's discuss architecture and timeline.`
      }));
    } else if (preset === 'rebrand') {
      setFormData((prev) => ({
        ...prev,
        message: `Hi Niale, we are preparing a comprehensive brand overhaul and haute digital presence, including custom 3D visualizers, bespoke design tokens, and creative direction. Looking forward to connecting.`
      }));
    }
  };

  const generateMailtoUrl = () => {
    const numericBudget = parseFloat(formData.budget);
    const formattedBudget = !isNaN(numericBudget) ? `$${numericBudget.toLocaleString()} USD` : `$${formData.budget} USD`;
    const subject = `[Syntrix Discovery Brief] ${formData.service} - ${formData.company || formData.fullName}`;
    const body = `Hello Niale & Syntrix Studio,

I would like to initiate discovery for a new digital project.

CLIENT & PROJECT SPECIFICATIONS:
------------------------------------------
• Name: ${formData.fullName}
• Email: ${formData.email}
• Company / Brand: ${formData.company || 'N/A'}
• Requested Architecture: ${formData.service}
• Allocation Amount: ${formattedBudget}
• Target Launch Timeline: ${formData.timeline}

PROJECT VISION & OBJECTIVES:
------------------------------------------
${formData.message || 'No additional notes provided.'}

------------------------------------------
Transmitted via Syntrix Discovery directly to ${AGENCY_EMAIL}`;

    return `mailto:${AGENCY_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email) return;

    const parsedBudget = parseFloat(formData.budget);
    if (isNaN(parsedBudget) || parsedBudget < 25) {
      setBudgetError('Allocation amount must be at least $25 USD.');
      return;
    }

    setBudgetError('');
    setSubmitted(true);
    // Automatically open default mail client addressed to thef1nanceguy@hotmail.com
    window.location.href = generateMailtoUrl();
  };

  return (
    <section id="contact" className="py-24 sm:py-32 bg-black text-white relative border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-12 h-[1px] bg-[#FFD700]" />
            <span className="text-xs uppercase tracking-[0.4em] font-bold text-white">Initiate Discovery</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-black italic tracking-tighter text-white mb-4">
            LET’S ENGINEER SOMETHING <br />
            <span className="text-[#FFD700]">EXTRAORDINARY TOGETHER.</span>
          </h2>
          <p className="text-white/60 text-base sm:text-lg leading-relaxed">
            Whether launching a flagship product or executing a category-defining rebrand, we partner directly with founders to craft uncompromising digital assets.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Inquiries & Founder Direct Line */}
          <div className="lg:col-span-5 space-y-8">
            {/* Direct Email Box */}
            <div className="p-6 sm:p-8 bg-white/5 border border-white/10">
              <span className="text-xs uppercase tracking-widest font-bold text-white/50 block mb-2">
                Direct Inquiries
              </span>
              <div className="flex items-center justify-between p-3.5 bg-black border border-white/10">
                <a
                  href={`mailto:${AGENCY_EMAIL}`}
                  className="font-mono text-sm sm:text-base text-white hover:text-[#FFD700] transition-colors select-all truncate pr-2"
                  title={`Email ${AGENCY_EMAIL}`}
                >
                  {AGENCY_EMAIL}
                </a>
                <div className="flex items-center gap-1.5 shrink-0">
                  <a
                    href={`mailto:${AGENCY_EMAIL}`}
                    className="p-2 bg-white/5 hover:bg-[#FFD700] text-white/70 hover:text-black transition-colors"
                    title={`Send email to ${AGENCY_EMAIL}`}
                  >
                    <Mail className="w-4 h-4" />
                  </a>
                  <button
                    onClick={handleCopyEmail}
                    className="p-2 bg-white/5 hover:bg-[#FFD700] text-white/70 hover:text-black transition-colors cursor-pointer"
                    title="Copy email to clipboard"
                  >
                    {copiedEmail ? <CheckCircle className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              {copiedEmail && (
                <span className="text-[11px] text-[#FFD700] mt-2 block font-mono">
                  Copied {AGENCY_EMAIL} to clipboard!
                </span>
              )}
              <span className="text-xs text-white/40 block mt-3 leading-relaxed">
                Direct inquiries receive founder response within 24 business hours. Standard studio mutual confidentiality protocols apply.
              </span>
            </div>

            {/* Founder Direct Line */}
            <div className="p-6 sm:p-8 bg-white/5 border border-white/10 space-y-4">
              <span className="text-xs uppercase tracking-widest font-bold text-white/50 block">
                Executive Leadership
              </span>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-white text-base">Niale Kaeti</h3>
                  <p className="text-xs text-[#FFD700] font-mono mt-0.5">Founder & Creative Director</p>
                </div>
                <a
                  href={SOCIAL_LINKS.founder.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 bg-black hover:bg-white/10 border border-white/10 hover:border-[#FFD700] text-[#FFD700] transition-colors flex items-center gap-1.5 text-xs font-mono"
                  title="Founder Instagram"
                >
                  <Instagram className="w-4 h-4" />
                  <span className="hidden sm:inline">{SOCIAL_LINKS.founder.handle}</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>
              <p className="text-xs text-white/60 leading-relaxed pt-2 border-t border-white/10">
                Directly leads creative direction and architecture on every atelier engagement. No intermediate account executives or outsourced handoffs.
              </p>
            </div>

            {/* Availability Badges */}
            <div className="p-4 bg-black border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-white/60">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#FFD700]" />
                <span>Nairobi, KE (EAT / UTC+3)</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#FFD700]" />
                <span>Currently booking Q3 & Q4 2026 sprints</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Brief Form in Initiate Section */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 bg-white/5 border border-white/10 shadow-2xl relative">
              {submitted ? (
                <div className="text-center py-12 space-y-6">
                  <div className="w-16 h-16 bg-white/5 border border-[#FFD700] flex items-center justify-center mx-auto">
                    <CheckCircle className="w-8 h-8 text-[#FFD700]" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black italic tracking-tight text-white uppercase">
                    Brief Directed to {AGENCY_EMAIL}
                  </h3>
                  <p className="text-white/70 text-sm max-w-md mx-auto leading-relaxed">
                    Thank you, <strong className="text-white">{formData.fullName}</strong>. Your project brief has been formatted and addressed directly to <strong className="text-[#FFD700]">{AGENCY_EMAIL}</strong>.
                  </p>
                  <p className="text-white/50 text-xs max-w-sm mx-auto">
                    If your email application did not launch automatically, click the button below to dispatch it directly:
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                    <a
                      href={generateMailtoUrl()}
                      className="w-full sm:w-auto px-6 py-3.5 bg-[#FFD700] hover:bg-white text-black text-xs font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-2"
                    >
                      <Mail className="w-4 h-4" />
                      <span>Send via Email Directly</span>
                    </a>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="w-full sm:w-auto px-6 py-3.5 bg-white/5 hover:bg-white/10 text-white text-xs font-bold uppercase tracking-widest transition-colors border border-white/10 cursor-pointer"
                    >
                      Submit Another Brief
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {scopeSummary && (
                    <div className="p-3.5 bg-[#FFD700]/10 border border-[#FFD700]/30 flex items-center justify-between gap-2.5 text-xs text-[#FFD700]">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 shrink-0" />
                        <span>Transferred configured scope: <strong>{scopeSummary.serviceType}</strong> • {scopeSummary.timeline}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleSelectPreset('scope')}
                        className="underline text-[11px] uppercase tracking-wider font-bold hover:text-white cursor-pointer shrink-0"
                      >
                        Refresh Scope Message
                      </button>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Full Name */}
                    <div>
                      <label htmlFor="contact-name" className="block text-xs uppercase tracking-widest font-bold text-white/70 mb-2">
                        Your Name *
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="Elena Vance"
                        className="w-full px-4 py-3 bg-black border border-white/10 focus:border-[#FFD700] text-sm text-white placeholder-white/30 outline-none transition-all"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="contact-email" className="block text-xs uppercase tracking-widest font-bold text-white/70 mb-2">
                        Work Email *
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="elena@company.com"
                        className="w-full px-4 py-3 bg-black border border-white/10 focus:border-[#FFD700] text-sm text-white placeholder-white/30 outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Company */}
                    <div>
                      <label htmlFor="contact-company" className="block text-xs uppercase tracking-widest font-bold text-white/70 mb-2">
                        Company or Brand
                      </label>
                      <input
                        id="contact-company"
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="Acme Ventures"
                        className="w-full px-4 py-3 bg-black border border-white/10 focus:border-[#FFD700] text-sm text-white placeholder-white/30 outline-none transition-all"
                      />
                    </div>

                    {/* Service */}
                    <div>
                      <label htmlFor="contact-service" className="block text-xs uppercase tracking-widest font-bold text-white/70 mb-2">
                        Core Objective
                      </label>
                      <select
                        id="contact-service"
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full px-4 py-3 bg-black border border-white/10 focus:border-[#FFD700] text-sm text-white outline-none transition-all"
                      >
                        <option value="Glacier • Website (No Hosting) – 15K KES ($115)">Glacier • Website (No Hosting) – 15K KES ($115)</option>
                        <option value="Phantom • Website + 1-Yr Hosting – 25K KES ($192)">Phantom • Website + 1-Yr Hosting – 25K KES ($192)</option>
                        <option value="Vanguard • Google Identification & Maps – 38K KES ($292)">Vanguard • Google Identification & Maps – 38K KES ($292)</option>
                        <option value="Apex • Growth Web & Marketing – 65K KES ($500)">Apex • Growth Web & Marketing – 65K KES ($500)</option>
                        <option value="Spectre • Agile Retainer & Task Sprint – 110.5K KES ($850)">Spectre • Agile Retainer & Task Sprint – 110.5K KES ($850)</option>
                        <option value="Obsidian • Commerce & M-Pesa Engine – 120K KES ($920)">Obsidian • Commerce & M-Pesa Engine – 120K KES ($920)</option>
                        <option value="Monolith • Sprint Launch – 325K KES ($2,500)">Monolith • Sprint Launch – 325K KES ($2,500)</option>
                        <option value="Aether • Flagship Platform – 754K KES ($5,800)">Aether • Flagship Platform – 754K KES ($5,800)</option>
                        <option value="Hyperion • Haute Architecture & Rebrand – 1.625M KES ($12,500)">Hyperion • Haute Architecture & Rebrand – 1.625M KES ($12,500)</option>
                        <option value="Flagship Web Presence (Custom)">Flagship Web Presence (Custom)</option>
                        <option value="Luxury E-Commerce (Custom)">Luxury E-Commerce (Custom)</option>
                        <option value="SaaS / Tech Application (Custom)">SaaS / Tech Application (Custom)</option>
                        <option value="Bespoke Custom Engineering">Bespoke Custom Engineering</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Allocation Amount Text Box (Min $25) */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label htmlFor="contact-budget" className="block text-xs uppercase tracking-widest font-bold text-white/70">
                          Allocation Amount *
                        </label>
                        <span className="text-[10px] font-mono text-[#FFD700] uppercase tracking-wider">
                          Min. $25 USD
                        </span>
                      </div>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 font-mono text-sm pointer-events-none select-none">
                          $
                        </span>
                        <input
                          id="contact-budget"
                          type="number"
                          min={25}
                          step="any"
                          required
                          value={formData.budget}
                          onChange={(e) => {
                            const val = e.target.value;
                            setFormData({ ...formData, budget: val });
                            if (budgetError) {
                              const num = parseFloat(val);
                              if (!isNaN(num) && num >= 25) {
                                setBudgetError('');
                              }
                            }
                          }}
                          onBlur={() => {
                            if (formData.budget) {
                              const num = parseFloat(formData.budget);
                              if (isNaN(num) || num < 25) {
                                setBudgetError('Allocation amount must be at least $25 USD.');
                              } else {
                                setBudgetError('');
                              }
                            }
                          }}
                          placeholder="e.g. 5000 (Min. $25)"
                          className={`w-full pl-8 pr-4 py-3 bg-black border text-sm text-white placeholder-white/30 outline-none font-mono transition-all ${
                            budgetError
                              ? 'border-red-500 focus:border-red-500 text-red-100'
                              : 'border-white/10 focus:border-[#FFD700]'
                          }`}
                        />
                      </div>
                      {budgetError ? (
                        <p className="text-[11px] text-red-400 mt-1.5 font-mono">
                          {budgetError}
                        </p>
                      ) : (
                        <span className="text-[10px] text-white/40 mt-1 block font-mono">
                          USD • Minimum allocation $25
                        </span>
                      )}
                    </div>

                    {/* Timeline */}
                    <div>
                      <label htmlFor="contact-timeline" className="block text-xs uppercase tracking-widest font-bold text-white/70 mb-2">
                        Target Launch Date
                      </label>
                      <select
                        id="contact-timeline"
                        value={formData.timeline}
                        onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                        className="w-full px-4 py-3 bg-black border border-white/10 focus:border-[#FFD700] text-sm text-white outline-none transition-all"
                      >
                        <option value="Rush (Under 4 Weeks)">Rush (Under 4 Weeks)</option>
                        <option value="Within 4–8 Weeks">Within 4–8 Weeks</option>
                        <option value="Q3/Q4 2026">Q3/Q4 2026</option>
                        <option value="Flexible / Strategic">Flexible / Strategic</option>
                      </select>
                    </div>
                  </div>

                  {/* Project Details with Message Creator Controls */}
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <label htmlFor="contact-message" className="text-xs uppercase tracking-widest font-bold text-white/70 flex items-center gap-1.5">
                        <MessageSquare className="w-3.5 h-3.5 text-[#FFD700]" />
                        <span>Project Vision & Context (Initiate Message)</span>
                      </label>
                      <span className="text-[10px] text-[#FFD700] font-mono uppercase tracking-wider flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        <span>Message Created & Ready</span>
                      </span>
                    </div>

                    {/* Quick Message Starter Generators */}
                    <div className="mb-2.5 flex flex-wrap items-center gap-1.5">
                      <span className="text-[10px] uppercase text-white/40 tracking-wider font-mono mr-1">
                        Create Message:
                      </span>
                      {scopeSummary && (
                        <button
                          type="button"
                          onClick={() => handleSelectPreset('scope')}
                          className={`text-[10px] px-2.5 py-1 border transition-all cursor-pointer flex items-center gap-1 ${
                            activeMessagePreset === 'scope'
                              ? 'bg-[#FFD700] text-black border-[#FFD700] font-bold'
                              : 'bg-black text-white/80 border-white/20 hover:border-[#FFD700]'
                          }`}
                        >
                          <FileText className="w-2.5 h-2.5" />
                          <span>Scope Specs</span>
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => handleSelectPreset('flagship')}
                        className={`text-[10px] px-2.5 py-1 border transition-all cursor-pointer ${
                          activeMessagePreset === 'flagship'
                            ? 'bg-[#FFD700] text-black border-[#FFD700] font-bold'
                            : 'bg-black text-white/80 border-white/20 hover:border-[#FFD700]'
                        }`}
                      >
                        🚀 Flagship
                      </button>
                      <button
                        type="button"
                        onClick={() => handleSelectPreset('commerce')}
                        className={`text-[10px] px-2.5 py-1 border transition-all cursor-pointer ${
                          activeMessagePreset === 'commerce'
                            ? 'bg-[#FFD700] text-black border-[#FFD700] font-bold'
                            : 'bg-black text-white/80 border-white/20 hover:border-[#FFD700]'
                        }`}
                      >
                        🛒 Commerce & M-Pesa
                      </button>
                      <button
                        type="button"
                        onClick={() => handleSelectPreset('rebrand')}
                        className={`text-[10px] px-2.5 py-1 border transition-all cursor-pointer ${
                          activeMessagePreset === 'rebrand'
                            ? 'bg-[#FFD700] text-black border-[#FFD700] font-bold'
                            : 'bg-black text-white/80 border-white/20 hover:border-[#FFD700]'
                        }`}
                      >
                        💎 Haute Rebrand
                      </button>
                      <button
                        type="button"
                        onClick={() => handleSelectPreset('default')}
                        className="text-[10px] px-2.5 py-1 bg-white/5 hover:bg-white/10 text-white/60 hover:text-white border border-white/10 transition-all cursor-pointer flex items-center gap-1"
                        title="Reset to default initiate message"
                      >
                        <RefreshCw className="w-2.5 h-2.5" />
                        <span>Reset</span>
                      </button>
                    </div>

                    <textarea
                      id="contact-message"
                      rows={4}
                      value={formData.message}
                      onChange={(e) => {
                        setFormData({ ...formData, message: e.target.value });
                        setActiveMessagePreset('custom');
                      }}
                      placeholder="Tell us about your brand goals, target audience, aesthetic inspirations, or specific requirements..."
                      className="w-full px-4 py-3 bg-black border border-white/10 focus:border-[#FFD700] text-sm text-white placeholder-white/30 outline-none transition-all leading-relaxed"
                    />
                    <div className="flex justify-between items-center mt-1 text-[10px] text-white/40 font-mono">
                      <span>Click any preset above to instantly generate a tailored message.</span>
                      <span>{formData.message.length} chars</span>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    id="submit-project-brief"
                    type="submit"
                    className="w-full py-4 bg-[#FFD700] hover:bg-white text-black font-bold text-xs uppercase tracking-widest transition-all duration-200 flex items-center justify-center gap-2 group cursor-pointer"
                  >
                    <span>Transmit Project Brief to {AGENCY_EMAIL}</span>
                    <Send className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>

                  <p className="text-[11px] text-white/40 text-center uppercase tracking-wider">
                    Transmits directly to {AGENCY_EMAIL}. All conversations protected by standard studio confidentiality (NDA upon request).
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
