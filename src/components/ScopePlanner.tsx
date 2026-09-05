import React, { useState } from 'react';
import { Layers, Check, ArrowRight, Sparkles } from 'lucide-react';

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

  const handleTransferToBrief = () => {
    const currentProjectName = projectTypes.find((p) => p.id === projectType)?.name || 'Flagship Web Presence';
    const currentTimelineName = timelineOptions.find((t) => t.id === timeline)?.name || 'Standard Sprint (5–7 Weeks)';

    onApplyScopeToContact({
      serviceType: currentProjectName,
      timeline: currentTimelineName,
      selectedFeatures: selectedAddons
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
            PLAN YOUR SCOPE. <br />
            <span className="text-[#FFD700]">TAILORED & TRANSPARENT.</span>
          </h2>
          <p className="text-white/60 text-base leading-relaxed">
            Configure your project parameters to define architecture, delivery cadence, and core feature modules. Transfer your tailored scope directly into the project brief.
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
                      {opt.description}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: High-Impact Modules & Addons */}
            <div className="p-6 bg-white/5 border border-white/10">
              <label className="text-xs uppercase tracking-widest font-bold text-white/50 block mb-4">
                3. High-Impact Enhancements & Modules
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
                      <span className="text-[10px] font-mono text-white/40 uppercase tracking-wider">
                        {addon.tag}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Scope Summary Card */}
          <div className="lg:col-span-4 sticky top-28 p-6 sm:p-8 bg-white/5 border border-white/20 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <span className="text-xs uppercase tracking-widest font-bold text-white/50">
                Scope Summary
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 bg-[#FFD700] text-black font-bold uppercase tracking-wider">
                SPECIFICATION
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

            {/* Custom Allocation Notice */}
            <div className="p-4 bg-black border border-white/10 mb-6">
              <span className="text-[10px] uppercase tracking-widest text-white/40 block mb-1">
                Project Capital Allocation
              </span>
              <div className="text-lg sm:text-xl font-black italic tracking-tight text-[#FFD700]">
                Client-Specified
              </div>
              <span className="text-[10px] text-white/40 block mt-1 leading-relaxed">
                We do not use automatic price estimators. Define your custom allocation amount (min. $25 USD) directly in the brief form.
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
              No commitment required. Pre-fills your project specifications below.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
