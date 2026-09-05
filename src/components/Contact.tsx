import React, { useState } from 'react';
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
  Sparkles
} from 'lucide-react';

interface ContactProps {
  initialService?: string;
  scopeSummary?: {
    serviceType: string;
    timeline: string;
    selectedFeatures: string[];
  } | null;
}

export const Contact: React.FC<ContactProps> = ({ initialService = '', scopeSummary = null }) => {
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: '',
    email: '',
    company: '',
    service: initialService || 'Bespoke Web Design',
    budget: '',
    timeline: 'Within 4–8 Weeks',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [budgetError, setBudgetError] = useState('');

  // Update if parent passes prefilled data
  React.useEffect(() => {
    if (scopeSummary) {
      setFormData((prev) => ({
        ...prev,
        service: scopeSummary.serviceType,
        timeline: scopeSummary.timeline,
        message: prev.message || `Hi Niale, I've configured our project scope using the Syntrix planner:\n- Architecture: ${scopeSummary.serviceType}\n- Desired Cadence: ${scopeSummary.timeline}\n- Key Features: ${scopeSummary.selectedFeatures.join(', ')}\n\nLooking forward to discussing our launch.`
      }));
    } else if (initialService) {
      setFormData((prev) => ({
        ...prev,
        service: initialService
      }));
    }
  }, [scopeSummary, initialService]);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(AGENCY_EMAIL);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
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
            </div>

            {/* Direct Social Channels */}
            <div className="p-6 sm:p-8 bg-white/5 border border-white/10">
              <span className="text-xs uppercase tracking-widest font-bold text-white/50 block mb-4">
                Follow On Instagram
              </span>
              <div className="space-y-3">
                {/* Company Link */}
                <a
                  href={SOCIAL_LINKS.company.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 bg-black border border-white/10 hover:border-[#FFD700] transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/5 border border-white/10 text-[#FFD700]">
                      <Instagram className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-white/40">Syntrix Agency</div>
                      <div className="text-sm font-bold text-white group-hover:text-[#FFD700] transition-colors">
                        {SOCIAL_LINKS.company.handle}
                      </div>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-white/40 group-hover:text-[#FFD700] transition-colors" />
                </a>

                {/* Founder Link */}
                <a
                  href={SOCIAL_LINKS.founder.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 bg-black border border-white/10 hover:border-[#FF0000] transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/5 border border-white/10 text-[#FF0000]">
                      <Instagram className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-white/40">Founder & Creative Lead</div>
                      <div className="text-sm font-bold text-white group-hover:text-red-400 transition-colors">
                        {SOCIAL_LINKS.founder.handle} ({SOCIAL_LINKS.founder.name})
                      </div>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-white/40 group-hover:text-white transition-colors" />
                </a>
              </div>
            </div>

            {/* Atelier Guarantees */}
            <div className="p-6 bg-white/5 border border-white/10 space-y-3 text-xs text-white/50">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#FFD700]" />
                <span>Typical response time: Under 12 hours</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#FFD700]" />
                <span>Currently booking Q3 & Q4 2026 sprints</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Brief Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 bg-white/5 border border-white/10 shadow-2xl relative">
              {submitted ? (
                <div className="text-center py-12 space-y-6">
                  <div className="w-16 h-16 bg-white/5 border border-[#FFD700] flex items-center justify-center mx-auto">
                    <CheckCircle className="w-8 h-8 text-[#FFD700]" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black italic tracking-tight text-white">
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
                    <div className="p-3.5 bg-[#FFD700]/10 border border-[#FFD700]/30 flex items-center gap-2.5 text-xs text-[#FFD700]">
                      <Sparkles className="w-4 h-4 shrink-0" />
                      <span>Transferred configured scope from Planner: <strong>{scopeSummary.serviceType}</strong> • {scopeSummary.timeline}</span>
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
                        <option value="Bespoke Web Design">Bespoke Web Design</option>
                        <option value="UI/UX & Product Strategy">UI/UX & Product Strategy</option>
                        <option value="Brand Identity & Creative Direction">Brand Identity & Direction</option>
                        <option value="Full-Stack Digital Engineering">Full-Stack Digital Engineering</option>
                        <option value="Motion & Interactive WebGL">Motion & Interactive WebGL</option>
                        <option value="Complete Atelier Package">Complete Atelier Package</option>
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

                  {/* Project Details */}
                  <div>
                    <label htmlFor="contact-message" className="block text-xs uppercase tracking-widest font-bold text-white/70 mb-2">
                      Project Vision & Context
                    </label>
                    <textarea
                      id="contact-message"
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us about your brand goals, target audience, aesthetic inspirations, or specific requirements..."
                      className="w-full px-4 py-3 bg-black border border-white/10 focus:border-[#FFD700] text-sm text-white placeholder-white/30 outline-none transition-all"
                    />
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
