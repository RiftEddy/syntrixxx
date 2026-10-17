import React, { useState } from 'react';
import { Layers, Check, ArrowRight, Sparkles, Send, Mail, CheckCircle } from 'lucide-react';
import { AGENCY_EMAIL } from '../data';

interface ScopePlannerProps {
  onApplyScopeToContact: (scopeSummary: {
    serviceType: string;
    timeline: string;
    selectedFeatures: string[];
  }) => void;
}

export const ScopePlanner: React.FC<ScopePlannerProps> = ({ onApplyScopeToContact }) => {
  const [projectType, setProjectType] = useState<'flagship' | 'ecommerce' | 'saas' | 'rebrand'>('flagship');
  const [timeline, setTimeline] = useState<'rush' | 'standard' | 'extended'>('standard');
  const [selectedAddons, setSelectedAddons] = useState<string[]>([
    'Custom Motion & Micro-Interactions',
    'Sub-Second Performance Guarantee'
  ]);

  // Integrated Direct Scope Form State
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formCompany, setFormCompany] = useState('');
  const [formBudget, setFormBudget] = useState('25');
  const [formNotes, setFormNotes] = useState('');
  const [formBudgetError, setFormBudgetError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const projectTypes = [
    {
      id: 'flagship',
      name: 'Flagship Web Presence',
      description: 'Bespoke corporate or brand sanctuary with haute typography and editorial layouts.'
    },
    {
      id: 'ecommerce',
      name: 'Luxury E-Commerce',
      description: 'High-ticket shopping experience, custom checkout flows, and catalog architecture.'
    },
    {
      id: 'saas',
      name: 'SaaS / Tech Application',
      description: 'Complex dashboard, developer documentation, authentication, and interactive systems.'
    },
    {
      id: 'rebrand',
      name: 'Complete Brand & Digital Overhaul',
      description: 'Visual identity system, logo suite, design tokens, and flagship web engineering.'
    }
  ];

  const timelineOptions = [
    { id: 'rush', name: 'Rapid Sprint (3–4 Weeks)', description: 'Expedited dual-lead sprint' },
    { id: 'standard', name: 'Standard Sprint (5–7 Weeks)', description: 'Balanced craft & review cycles' },
    { id: 'extended', name: 'Comprehensive Architecture (8–12 Weeks)', description: 'Deep iterative engineering' }
  ];

  const availableAddons = [
    { name: 'Custom Motion & Micro-Interactions', tag: 'Motion Design' },
    { name: 'Interactive 3D / WebGL Visualizer', tag: 'Interactive 3D' },
    { name: 'Headless CMS (Sanity / Strapi / Custom)', tag: 'Content Engine' },
    { name: 'Enterprise Design System Tokens', tag: 'Design System' },
    { name: 'Sub-Second Performance Guarantee', tag: 'Edge Speed' },
    { name: 'Comprehensive SEO & Structured Data Suite', tag: 'SEO & Meta' }
  ];

  const toggleAddon = (name: string) => {
    if (selectedAddons.includes(name)) {
      setSelectedAddons(selectedAddons.filter((a) => a !== name));
    } else {
      setSelectedAddons([...selectedAddons, name]);
    }
  };

  const currentProject = projectTypes.find((p) => p.id === projectType) || projectTypes[0];
  const currentTimeline = timelineOptions.find((t) => t.id === timeline) || timelineOptions[0];

  const handleTransferToBrief = () => {
    onApplyScopeToContact({
      serviceType: currentProject.name,
      timeline: currentTimeline.name,
      selectedFeatures: selectedAddons
    });
  };

  const generateScopeMailtoUrl = () => {
    const numericBudget = parseFloat(formBudget);
    const formattedBudget = !isNaN(numericBudget) ? `$${numericBudget.toLocaleString()} USD` : `$${formBudget} USD`;
    const subject = `[Syntrix Scope Brief] ${currentProject.name} - ${formCompany || formName || 'Client'}`;
    const body = `Hello Niale & Syntrix Studio,

I have configured our project scope using the Syntrix Interactive Scope Planner and would like to initiate discovery.

CONFIGURED SCOPE SPECIFICATIONS:
------------------------------------------
• Architecture: ${currentProject.name}
• Delivery Cadence: ${currentTimeline.name}
• Active Modules (${selectedAddons.length}):
${selectedAddons.length > 0 ? selectedAddons.map((a) => `  - ${a}`).join('\n') : '  - Standard Core Architecture'}

CLIENT DETAILS & ALLOCATION:
------------------------------------------
• Name: ${formName}
• Email: ${formEmail}
• Company / Brand: ${formCompany || 'N/A'}
• Allocation Amount: ${formattedBudget}

PROJECT VISION & NOTES:
------------------------------------------
${formNotes || 'Ready to initiate architectural discovery and schedule kickoff.'}

------------------------------------------
Transmitted via Syntrix Scope Planner directly to ${AGENCY_EMAIL}`;

    return `mailto:${AGENCY_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const handleDirectScopeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formEmail.trim()) return;

    const parsedBudget = parseFloat(formBudget);
    if (isNaN(parsedBudget) || parsedBudget < 25) {
      setFormBudgetError('Allocation amount must be at least $25 USD.');
      return;
    }

    setFormBudgetError('');
    setIsSubmitted(true);

    // Keep contact component synchronized
    onApplyScopeToContact({
      serviceType: currentProject.name,
      timeline: currentTimeline.name,
      selectedFeatures: selectedAddons
    });

    // Launch mail client
    window.location.href = generateScopeMailtoUrl();
  };

  return (
    <section id="planner" className="py-24 sm:py-32 bg-black text-white relative border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-14">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-12 h-[1px] bg-[#FFD700]" />
            <span className="text-xs uppercase tracking-wider font-bold text-white">Interactive Scope Planner</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-black italic tracking-tighter text-white mb-4">
            PLAN YOUR SCOPE. <br />
            <span className="text-[#FFD700]">TAILORED & TRANSPARENT.</span>
          </h2>
          <p className="text-white/60 text-base leading-relaxed">
            Configure your project parameters to define architecture, delivery cadence, and core feature modules. Submit your brief directly from this planner or transfer your configured scope to the Initiate section.
          </p>
        </div>

        {/* Planner Workspace Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Scope Selectors */}
          <div className="lg:col-span-7 space-y-8">
            {/* Step 1: Project Type */}
            <div className="p-6 bg-white/5 border border-white/10">
              <label className="text-xs uppercase tracking-widest font-bold text-white/50 block mb-4">
                1. Select Engagement Archetype
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {projectTypes.map((pt) => (
                  <button
                    key={pt.id}
                    onClick={() => setProjectType(pt.id as any)}
                    className={`p-4 text-left border transition-all cursor-pointer ${
                      projectType === pt.id
                        ? 'bg-white/10 border-[#FFD700]'
                        : 'bg-black border-white/10 hover:border-white/30'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className={`text-sm font-bold uppercase tracking-tight ${projectType === pt.id ? 'text-[#FFD700]' : 'text-white'}`}>
                        {pt.name}
                      </span>
                      {projectType === pt.id && <Check className="w-4 h-4 text-[#FFD700]" />}
                    </div>
                    <p className="text-xs text-white/60 leading-relaxed">
                      {pt.description}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Timeline Target */}
            <div className="p-6 bg-white/5 border border-white/10">
              <label className="text-xs uppercase tracking-widest font-bold text-white/50 block mb-4">
                2. Target Delivery Cadence
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {timelineOptions.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setTimeline(opt.id as any)}
                    className={`p-4 text-left border transition-all cursor-pointer ${
                      timeline === opt.id
                        ? 'bg-white/10 border-[#FFD700]'
                        : 'bg-black border-white/10 hover:border-white/30'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className={`text-xs font-bold uppercase tracking-tight ${timeline === opt.id ? 'text-[#FFD700]' : 'text-white'}`}>
                        {opt.name.split(' (')[0]}
                      </span>
                      {timeline === opt.id && <Check className="w-3.5 h-3.5 text-[#FFD700]" />}
                    </div>
                    <span className="text-[10px] text-[#FFD700] block mb-1 font-mono">
                      {opt.name.match(/\((.*?)\)/)?.[1]}
                    </span>
                    <p className="text-[11px] text-white/50 leading-relaxed">
                      {opt.description}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Key Feature Modules */}
            <div className="p-6 bg-white/5 border border-white/10">
              <div className="flex items-center justify-between mb-4">
                <label className="text-xs uppercase tracking-widest font-bold text-white/50">
                  3. Select Active Feature Modules
                </label>
                <span className="text-[10px] font-mono text-[#FFD700]">
                  {selectedAddons.length} Modules Active
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {availableAddons.map((addon) => {
                  const isChecked = selectedAddons.includes(addon.name);
                  return (
                    <div
                      key={addon.name}
                      onClick={() => toggleAddon(addon.name)}
                      className={`p-3.5 border flex items-center justify-between transition-all cursor-pointer select-none ${
                        isChecked
                          ? 'bg-white/10 border-[#FFD700]'
                          : 'bg-black border-white/10 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-4 h-4 rounded-none border flex items-center justify-center shrink-0 ${
                            isChecked
                              ? 'bg-[#FFD700] border-[#FFD700] text-black'
                              : 'border-white/30 bg-black'
                          }`}
                        >
                          {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <span className="text-xs font-medium text-white/90">{addon.name}</span>
                      </div>
                      <span className="text-[10px] font-mono text-white/40 uppercase tracking-wider">
                        {addon.tag}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Scope Summary & Direct Scope Brief Form */}
          <div className="lg:col-span-5 sticky top-28 space-y-6">
            <div className="p-6 sm:p-7 bg-white/5 border border-white/20 shadow-2xl relative">
              {/* Scope Spec Header */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-[#FFD700]" />
                  <span className="text-xs uppercase tracking-widest font-bold text-white">
                    Plan The Scope Form
                  </span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 bg-[#FFD700] text-black font-bold uppercase tracking-wider">
                  SPECIFICATION
                </span>
              </div>

              {/* Dynamic Summary Badges */}
              <div className="grid grid-cols-2 gap-2 mb-4">
                <div className="p-2.5 bg-black border border-white/10">
                  <span className="text-[9px] uppercase tracking-wider text-white/40 block">Architecture</span>
                  <span className="text-xs font-bold text-white uppercase truncate block">
                    {currentProject.name}
                  </span>
                </div>
                <div className="p-2.5 bg-black border border-white/10">
                  <span className="text-[9px] uppercase tracking-wider text-white/40 block">Cadence</span>
                  <span className="text-xs font-bold text-white uppercase truncate block">
                    {currentTimeline.name.split(' (')[0]}
                  </span>
                </div>
              </div>

              {/* Active Modules Preview */}
              <div className="p-3 bg-black/60 border border-white/10 mb-5">
                <div className="flex justify-between items-center mb-1.5 text-[10px] uppercase font-mono text-white/50">
                  <span>Selected Modules</span>
                  <span className="text-[#FFD700] font-bold">{selectedAddons.length} Included</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {selectedAddons.map((item, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] bg-white/10 text-white/80 px-2 py-0.5 border border-white/10"
                    >
                      {item}
                    </span>
                  ))}
                  {selectedAddons.length === 0 && (
                    <span className="text-[10px] text-white/40 italic">
                      No optional modules selected (Core platform only).
                    </span>
                  )}
                </div>
              </div>

              {/* DIRECT BRIEF FORM IN PLAN THE SCOPE SECTION */}
              {isSubmitted ? (
                <div className="text-center py-6 space-y-4 bg-black p-5 border border-[#FFD700]">
                  <div className="w-12 h-12 bg-[#FFD700]/10 border border-[#FFD700] flex items-center justify-center mx-auto">
                    <CheckCircle className="w-6 h-6 text-[#FFD700]" />
                  </div>
                  <h4 className="text-lg font-black italic tracking-tight text-white uppercase">
                    Scope Brief Prepared for Niale
                  </h4>
                  <p className="text-white/70 text-xs leading-relaxed">
                    Thank you <strong className="text-white">{formName}</strong>. Your tailored scope brief has been formatted for <strong className="text-[#FFD700]">{AGENCY_EMAIL}</strong>.
                  </p>
                  <div className="pt-2 space-y-2">
                    <a
                      href={generateScopeMailtoUrl()}
                      className="w-full py-3 bg-[#FFD700] hover:bg-white text-black font-bold text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Dispatch via Email App</span>
                    </a>
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="w-full py-2.5 bg-white/5 hover:bg-white/10 text-white text-[11px] uppercase tracking-wider border border-white/10 transition-colors cursor-pointer"
                    >
                      Edit Scope / Submit Another
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleDirectScopeSubmit} className="space-y-4">
                  <div className="text-[11px] text-white/60 uppercase tracking-wider font-mono flex items-center gap-1.5 border-b border-white/10 pb-2">
                    <Sparkles className="w-3.5 h-3.5 text-[#FFD700]" />
                    <span>Submit Direct Scope Brief:</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-white/60 mb-1">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                        placeholder="Elena Vance"
                        className="w-full px-3 py-2 bg-black border border-white/10 focus:border-[#FFD700] text-xs text-white placeholder-white/30 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-white/60 mb-1">
                        Work Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formEmail}
                        onChange={(e) => setFormEmail(e.target.value)}
                        placeholder="elena@company.com"
                        className="w-full px-3 py-2 bg-black border border-white/10 focus:border-[#FFD700] text-xs text-white placeholder-white/30 outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-white/60 mb-1">
                        Company or Brand
                      </label>
                      <input
                        type="text"
                        value={formCompany}
                        onChange={(e) => setFormCompany(e.target.value)}
                        placeholder="Acme Ventures"
                        className="w-full px-3 py-2 bg-black border border-white/10 focus:border-[#FFD700] text-xs text-white placeholder-white/30 outline-none"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <label className="block text-[10px] uppercase tracking-wider text-white/60">
                          Allocation ($ USD) *
                        </label>
                        <span className="text-[9px] text-[#FFD700] font-mono">Min $25</span>
                      </div>
                      <div className="relative">
                        <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-white/40 font-mono text-xs">
                          $
                        </span>
                        <input
                          type="number"
                          min={25}
                          required
                          value={formBudget}
                          onChange={(e) => {
                            setFormBudget(e.target.value);
                            if (formBudgetError && parseFloat(e.target.value) >= 25) {
                              setFormBudgetError('');
                            }
                          }}
                          placeholder="25"
                          className="w-full pl-6 pr-3 py-2 bg-black border border-white/10 focus:border-[#FFD700] text-xs text-white font-mono placeholder-white/30 outline-none"
                        />
                      </div>
                      {formBudgetError && (
                        <p className="text-[10px] text-red-400 mt-1 font-mono">{formBudgetError}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-white/60 mb-1">
                      Project Notes / Specifics
                    </label>
                    <textarea
                      rows={2}
                      value={formNotes}
                      onChange={(e) => setFormNotes(e.target.value)}
                      placeholder={`Tell us about your ${currentProject.name} goals or launch vision...`}
                      className="w-full px-3 py-2 bg-black border border-white/10 focus:border-[#FFD700] text-xs text-white placeholder-white/30 outline-none resize-none"
                    />
                  </div>

                  {/* Primary Submit Button */}
                  <button
                    type="submit"
                    className="w-full py-3.5 px-4 bg-[#FFD700] hover:bg-white text-black font-bold text-xs uppercase tracking-widest transition-all duration-200 flex items-center justify-center gap-2 group cursor-pointer"
                  >
                    <span>Transmit Scope Brief to Niale</span>
                    <Send className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </button>

                  {/* Secondary Transfer Button */}
                  <button
                    type="button"
                    onClick={handleTransferToBrief}
                    className="w-full py-2.5 px-3 bg-white/5 hover:bg-white/10 text-white/80 hover:text-white text-[11px] font-bold uppercase tracking-wider border border-white/10 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Or Transfer & Open in Initiate Section ↓</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}

              <p className="text-[10px] text-white/40 text-center mt-3 uppercase tracking-wider">
                Direct dispatch to {AGENCY_EMAIL} • NDA upon request
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
