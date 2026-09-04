import React, { useState } from 'react';
import { Calculator, Check, ArrowRight, Sparkles, HelpCircle } from 'lucide-react';

interface ScopePlannerProps {
  onApplyScopeToContact: (scopeSummary: {
    serviceType: string;
    timeline: string;
    budgetRange: string;
    selectedFeatures: string[];
    estimatedTotal: string;
  }) => void;
}

export const ScopePlanner: React.FC<ScopePlannerProps> = ({ onApplyScopeToContact }) => {
  const [projectType, setProjectType] = useState<'flagship' | 'ecommerce' | 'saas' | 'rebrand'>('flagship');
  const [timeline, setTimeline] = useState<'rush' | 'standard' | 'extended'>('standard');
  const [selectedAddons, setSelectedAddons] = useState<string[]>([
    'Custom Motion & Micro-Interactions',
    'Sub-Second Performance Guarantee'
  ]);

  const projectTypes = [
    {
      id: 'flagship',
      name: 'Flagship Web Presence',
      base: 7500,
      description: 'Bespoke corporate, portfolio, or brand sanctuary with haute typography.'
    },
    {
      id: 'ecommerce',
      name: 'Luxury E-Commerce',
      base: 11500,
      description: 'High-ticket shopping experience, custom checkout flows, catalog architecture.'
    },
    {
      id: 'saas',
      name: 'SaaS / Tech Application',
      base: 13500,
      description: 'Complex dashboard, developer documentation, authentication, interactive charts.'
    },
    {
      id: 'rebrand',
      name: 'Complete Brand & Digital Overhaul',
      base: 16000,
      description: 'Visual identity system, logo design, 3D assets, and flagship web engineering.'
    }
  ];

  const timelineOptions = [
    { id: 'rush', name: 'Rapid Sprint (3–4 Weeks)', multiplier: 1.25 },
    { id: 'standard', name: 'Standard Sprint (5–7 Weeks)', multiplier: 1.0 },
    { id: 'extended', name: 'Comprehensive Architecture (8–12 Weeks)', multiplier: 1.15 }
  ];

  const availableAddons = [
    { name: 'Custom Motion & Micro-Interactions', price: 2000 },
    { name: 'Interactive 3D / WebGL Visualizer', price: 3500 },
    { name: 'Headless CMS (Sanity / Strapi / Custom)', price: 2500 },
    { name: 'Enterprise Design System Tokens', price: 3000 },
    { name: 'Sub-Second Performance Guarantee', price: 1500 },
    { name: 'Comprehensive SEO & Structured Data Suite', price: 1800 }
  ];

  const toggleAddon = (name: string) => {
    if (selectedAddons.includes(name)) {
      setSelectedAddons(selectedAddons.filter((a) => a !== name));
    } else {
      setSelectedAddons([...selectedAddons, name]);
    }
  };

  // Calculate dynamic estimation
  const currentBase = projectTypes.find((p) => p.id === projectType)?.base || 7500;
  const currentMultiplier = timelineOptions.find((t) => t.id === timeline)?.multiplier || 1.0;
  const addonsTotal = selectedAddons.reduce((sum, item) => {
    const found = availableAddons.find((a) => a.name === item);
    return sum + (found ? found.price : 0);
  }, 0);

  const rawEstimate = Math.round((currentBase + addonsTotal) * currentMultiplier);
  const lowBracket = Math.round((rawEstimate * 0.9) / 500) * 500;
  const highBracket = Math.round((rawEstimate * 1.15) / 500) * 500;
  const budgetBracketString = `$${lowBracket.toLocaleString()} – $${highBracket.toLocaleString()} USD`;

  const handleTransferToBrief = () => {
    const currentProjectName = projectTypes.find((p) => p.id === projectType)?.name || 'Flagship Web Presence';
    const currentTimelineName = timelineOptions.find((t) => t.id === timeline)?.name || 'Standard Sprint (5–7 Weeks)';

    onApplyScopeToContact({
      serviceType: currentProjectName,
      timeline: currentTimelineName,
      budgetRange: budgetBracketString,
      selectedFeatures: selectedAddons,
      estimatedTotal: budgetBracketString
    });
  };

  return (
    <section id="planner" className="py-24 sm:py-32 bg-black text-white relative border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-14">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-12 h-[1px] bg-[#FFD700]" />
            <span className="text-xs uppercase tracking-[0.4em] font-bold text-white">Interactive Scope Planner</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-black italic tracking-tighter text-white mb-4">
            PLAN YOUR INVESTMENT. <br />
            <span className="text-[#FFD700]">CLEAR & TRANSPARENT.</span>
          </h2>
          <p className="text-white/60 text-base leading-relaxed">
            Configure your project parameters to estimate sprint timeline and approximate capital requirement. You can send this configured scope directly to Niale Kaeti.
          </p>
        </div>

        {/* Planner Workspace Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Scope Selectors */}
          <div className="lg:col-span-8 space-y-8">
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
                        ? 'bg-white/10 border-[#FFD700] text-white'
                        : 'bg-black border-white/10 text-white/50 hover:border-white/30 hover:text-white'
                    }`}
                  >
                    <div className="text-xs font-bold uppercase tracking-tight text-white mb-1">{opt.name}</div>
                    <div className="text-[10px] text-white/40">
                      {opt.id === 'rush' ? 'Dedicated dual-lead sprint' : 'Balanced craft & review cycles'}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: High-Impact Modules & Addons */}
            <div className="p-6 bg-white/5 border border-white/10">
              <label className="text-xs uppercase tracking-widest font-bold text-white/50 block mb-4">
                3. High-Impact Enhancements & Add-ons
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {availableAddons.map((addon) => {
                  const isChecked = selectedAddons.includes(addon.name);
                  return (
                    <div
                      key={addon.name}
                      onClick={() => toggleAddon(addon.name)}
                      className={`p-3.5 border flex items-center justify-between cursor-pointer transition-all ${
                        isChecked
                          ? 'bg-white/10 border-[#FFD700]'
                          : 'bg-black border-white/10 hover:border-white/30'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-4 h-4 flex items-center justify-center border transition-colors ${
                            isChecked
                              ? 'bg-[#FFD700] border-[#FFD700] text-black'
                              : 'border-white/30 bg-black'
                          }`}
                        >
                          {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <span className="text-xs font-medium text-white/90">{addon.name}</span>
                      </div>
                      <span className="text-[11px] font-mono text-white/50">
                        +${addon.price.toLocaleString()}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Estimated Investment Summary Card */}
          <div className="lg:col-span-4 sticky top-28 p-6 sm:p-8 bg-white/5 border border-white/20 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <span className="text-xs uppercase tracking-widest font-bold text-white/50">
                Scope Summary
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 bg-[#FFD700] text-black font-bold uppercase">
                ESTIMATE
              </span>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-white/40 block">Selected Architecture</span>
                <span className="text-sm font-bold text-white uppercase tracking-tight">
                  {projectTypes.find((p) => p.id === projectType)?.name}
                </span>
              </div>

              <div>
                <span className="text-[10px] uppercase tracking-wider text-white/40 block">Delivery Cadence</span>
                <span className="text-sm font-bold text-white uppercase tracking-tight">
                  {timelineOptions.find((t) => t.id === timeline)?.name}
                </span>
              </div>

              <div>
                <span className="text-[10px] uppercase tracking-wider text-white/40 block mb-1">
                  Active Modules ({selectedAddons.length})
                </span>
                <div className="space-y-1">
                  {selectedAddons.map((item, idx) => (
                    <div key={idx} className="text-xs text-white/70 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-[#FFD700]" />
                      <span className="truncate">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Estimated Total Bracket */}
            <div className="p-4 bg-black border border-white/10 mb-6">
              <span className="text-[10px] uppercase tracking-widest text-white/40 block mb-1">
                Estimated Capital Allocation
              </span>
              <div className="text-2xl sm:text-3xl font-black italic tracking-tight text-[#FFD700] font-mono">
                {budgetBracketString}
              </div>
              <span className="text-[10px] text-white/40 block mt-1">
                Includes all design tokens, responsive code, and production deployment.
              </span>
            </div>

            {/* Action button to populate contact form */}
            <button
              onClick={handleTransferToBrief}
              className="w-full py-4 px-4 bg-[#FFD700] hover:bg-white text-black font-bold text-xs uppercase tracking-widest transition-all duration-200 flex items-center justify-center gap-2 group cursor-pointer"
            >
              <span>Transfer Scope to Brief</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            <p className="text-[11px] text-white/40 text-center mt-3 uppercase tracking-wider">
              No immediate commitment required. Pre-populates the project brief below.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
