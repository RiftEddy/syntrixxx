import React, { useState } from 'react';
import { PROJECTS } from '../data';
import { Project, ProjectCategory } from '../types';
import { ExternalLink, ArrowUpRight, CheckCircle, Award, Sparkles, X, Eye } from 'lucide-react';

export const Portfolio: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('All');
  const [activeProjectModal, setActiveProjectModal] = useState<Project | null>(null);

  const categories: ProjectCategory[] = [
    'All',
    'Luxury & E-Commerce',
    'SaaS & Tech',
    'FinTech',
    'Architecture & Culture'
  ];

  const filteredProjects = selectedCategory === 'All'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === selectedCategory);

  // Render stylized bespoke UI mockup graphic based on project ID
  const renderProjectMockup = (project: Project) => {
    switch (project.id) {
      case 'aura-horlogerie':
        return (
          <div className="relative w-full h-56 sm:h-64 bg-gradient-to-br from-zinc-950 via-black to-zinc-900 overflow-hidden flex items-center justify-center p-6 border-b border-zinc-900 group-hover:border-[#FFD700]/30 transition-colors">
            {/* Ambient luxury glow */}
            <div className="absolute w-40 h-40 rounded-full bg-[#FFD700]/10 blur-2xl" />
            {/* Watch Movement Geometric Skeleton Graphic */}
            <div className="relative w-36 h-36 rounded-full border-2 border-[#FFD700]/40 flex items-center justify-center shadow-[0_0_30px_rgba(255,215,0,0.15)] group-hover:scale-105 transition-transform duration-500">
              <div className="w-28 h-28 rounded-full border border-dashed border-[#FFD700]/60 animate-[spin_60s_linear_infinite] flex items-center justify-center">
                <div className="w-16 h-16 rounded-full border border-zinc-700 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                  <div className="w-3 h-3 rounded-full bg-[#FFD700]" />
                </div>
              </div>
              {/* Hands */}
              <div className="absolute w-0.5 h-12 bg-white -top-2 left-1/2 origin-bottom rotate-45 shadow-sm" />
              <div className="absolute w-1 h-8 bg-[#FFD700] top-4 left-1/2 origin-bottom -rotate-60 shadow-sm" />
              <div className="absolute w-0.5 h-14 bg-[#FF0000] top-0 left-1/2 origin-bottom rotate-120 shadow-sm" />
            </div>
            {/* Floating Tag */}
            <div className="absolute top-4 right-4 px-2.5 py-1 rounded bg-black/80 border border-[#FFD700]/30 text-[10px] font-mono text-[#FFD700]">
              CHRONO-CALIBRE 01
            </div>
          </div>
        );

      case 'vortex-gpu':
        return (
          <div className="relative w-full h-56 sm:h-64 bg-zinc-950 overflow-hidden flex flex-col justify-between p-5 border-b border-zinc-900 group-hover:border-[#FFD700]/30 transition-colors">
            {/* Terminal Mockup Header */}
            <div className="flex items-center justify-between border-b border-zinc-900 pb-2">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#FFD700]/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
              </div>
              <span className="text-[10px] font-mono text-zinc-400">cluster-node-us-east // 99.98%</span>
            </div>
            {/* Code / Telemetry visual */}
            <div className="font-mono text-xs text-zinc-300 space-y-1.5 py-2">
              <div className="text-zinc-400">$ vortex cluster alloc --nodes 64 --gpu h100-sxm5</div>
              <div className="text-[#FFD700] flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-[#FFD700] animate-pulse" />
                <span>Cluster Provisioned: 64x Tensor Core active</span>
              </div>
              <div className="text-zinc-400">Latency: 0.28ms | FLOPS: 128.4 PFLOPS | Ready</div>
            </div>
            {/* Cluster Mini Bar Graph */}
            <div className="grid grid-cols-8 gap-1 pt-2 border-t border-zinc-900">
              {[80, 95, 60, 100, 85, 90, 75, 98].map((val, i) => (
                <div key={i} className="h-6 bg-zinc-900 rounded-sm flex items-end">
                  <div
                    className="w-full bg-[#FFD700]/70 rounded-sm"
                    style={{ height: `${val}%` }}
                  />
                </div>
              ))}
            </div>
          </div>
        );

      case 'aetheria-fintech':
        return (
          <div className="relative w-full h-56 sm:h-64 bg-zinc-950 overflow-hidden flex flex-col justify-between p-5 border-b border-zinc-900 group-hover:border-[#FFD700]/30 transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#FFD700]">
                Institutional Terminal
              </span>
              <span className="text-[10px] text-zinc-400">Yield: +14.82% ARR</span>
            </div>
            {/* Dynamic Financial Yield Curve Visual */}
            <div className="relative h-28 flex items-end justify-between px-2">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 200 60">
                <defs>
                  <linearGradient id="yieldGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#FFD700" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#FFD700" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path
                  d="M0,50 Q40,45 70,30 T140,20 T200,5 L200,60 L0,60 Z"
                  fill="url(#yieldGrad)"
                />
                <path
                  d="M0,50 Q40,45 70,30 T140,20 T200,5"
                  fill="none"
                  stroke="#FFD700"
                  strokeWidth="2.5"
                />
                <circle cx="200" cy="5" r="4" fill="#FF0000" />
              </svg>
            </div>
            <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400 border-t border-zinc-900 pt-2">
              <span>VAULT SECURED</span>
              <span className="text-white font-bold">$500,000,000+ AUM</span>
            </div>
          </div>
        );

      case 'monolith-atelier':
        return (
          <div className="relative w-full h-56 sm:h-64 bg-zinc-950 overflow-hidden flex items-center justify-center p-6 border-b border-zinc-900 group-hover:border-zinc-700 transition-colors">
            {/* Brutalist Architectural Blueprint Geometry */}
            <div className="relative w-44 h-32 border border-zinc-700 bg-black/80 flex flex-col justify-between p-3">
              <div className="flex justify-between items-start text-[9px] font-mono text-zinc-400">
                <span>ELEVATION A-1</span>
                <span>CONCRETE / WOOD</span>
              </div>
              <div className="grid grid-cols-3 gap-2 my-auto">
                <div className="h-12 border-l border-t border-zinc-600 bg-zinc-900/40" />
                <div className="h-12 border-l border-t border-zinc-500 bg-zinc-800/60" />
                <div className="h-12 border-l border-t border-white/40 bg-zinc-700/80" />
              </div>
              <div className="text-[9px] font-mono text-white text-right">
                35°40'N 139°46'E
              </div>
            </div>
            <div className="absolute bottom-3 left-4 text-[10px] font-mono text-zinc-400">
              BRUTALIST ARCHITECTURE
            </div>
          </div>
        );

      case 'hyperion-hypercars':
        return (
          <div className="relative w-full h-56 sm:h-64 bg-zinc-950 overflow-hidden flex flex-col justify-between p-5 border-b border-zinc-900 group-hover:border-red-500/50 transition-colors">
            <div className="flex justify-between items-center text-[10px] font-mono">
              <span className="text-[#FF0000] font-bold">AERODYNAMICS HUD</span>
              <span className="text-zinc-400">0-100 KM/H: 1.84s</span>
            </div>
            {/* Aerodynamic Wind Tunnel Vector graphic */}
            <div className="relative h-24 flex items-center justify-center">
              <svg className="w-full h-full" viewBox="0 0 200 60">
                <path d="M10,25 C50,15 110,12 180,25" stroke="#FF0000" strokeWidth="2" fill="none" opacity="0.9" />
                <path d="M10,32 C40,28 120,24 190,32" stroke="#FFD700" strokeWidth="2.5" fill="none" />
                <path d="M10,40 C60,38 130,36 185,42" stroke="#FF0000" strokeWidth="1.5" fill="none" opacity="0.7" />
              </svg>
            </div>
            <div className="flex justify-between items-center text-xs font-mono border-t border-zinc-900 pt-2">
              <span className="text-zinc-400">DOWNFORCE: 920KG</span>
              <span className="text-[#FFD700] font-bold">CONFIG ACTIVE</span>
            </div>
          </div>
        );

      default:
        return (
          <div className="relative w-full h-56 sm:h-64 bg-zinc-950 overflow-hidden flex items-center justify-center p-6 border-b border-zinc-900">
            <div className="w-20 h-20 rounded-full border border-[#FFD700]/30 flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-[#FFD700]" />
            </div>
          </div>
        );
    }
  };

  return (
    <section id="portfolio" className="py-24 sm:py-32 bg-black text-white relative border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-white/10 gap-6">
          <div>
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-[1px] bg-[#FFD700]" />
              <span className="text-xs uppercase tracking-[0.4em] font-bold text-white">Curated Works</span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-black italic tracking-tighter text-white">
              SELECTED WORKS & <br />
              <span className="text-[#FFD700]">CASE STUDIES</span>
            </h2>
          </div>
          <p className="text-white/60 text-base max-w-md leading-relaxed">
            A portfolio of flagship web platforms engineered for category leaders. Explore our challenges, technical architecture, and measurable outcomes.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-12 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-widest whitespace-nowrap transition-all duration-200 cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#FFD700] text-black'
                  : 'bg-white/5 text-white/50 hover:text-white border border-white/10 hover:border-[#FFD700]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              id={`portfolio-card-${project.id}`}
              className="group flex flex-col justify-between bg-white/5 border border-white/10 overflow-hidden hover:border-[#FFD700] transition-all duration-300"
            >
              <div>
                {/* Visual Mockup Area */}
                {renderProjectMockup(project)}

                {/* Card Body */}
                <div className="p-6">
                  {/* Category & Year */}
                  <div className="flex items-center justify-between text-xs font-mono text-white/50 mb-3">
                    <span className="text-[#FFD700] uppercase font-bold">{project.category}</span>
                    <span>{project.year}</span>
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="text-2xl font-black italic tracking-tight text-white group-hover:text-[#FFD700] transition-colors mb-2">
                    {project.title}
                  </h3>
                  <p className="text-xs text-white/60 line-clamp-2 mb-5 leading-relaxed">
                    {project.tagline}
                  </p>

                  {/* High-Impact Metric Strip */}
                  <div className="grid grid-cols-3 gap-2 py-3 px-3.5 bg-black border border-white/10 mb-5">
                    {project.metrics.map((metric, idx) => (
                      <div key={idx} className="text-center">
                        <div className="text-sm sm:text-base font-black text-[#FFD700] font-mono">
                          {metric.value}
                        </div>
                        <div className="text-[10px] uppercase tracking-wider text-white/40 truncate">
                          {metric.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {project.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 text-[10px] font-mono bg-black text-white/60 border border-white/10"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer Action */}
              <div className="px-6 pb-6 pt-2">
                <button
                  onClick={() => setActiveProjectModal(project)}
                  className="w-full py-3 px-4 bg-[#FFD700] hover:bg-white text-black font-bold text-xs uppercase tracking-widest transition-all duration-200 flex items-center justify-center gap-2 group/btn cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Inspect Case Study</span>
                  <ArrowUpRight className="w-3.5 h-3.5 ml-auto transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Case Study Full Inspector Modal */}
      {activeProjectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
          <div className="relative w-full max-w-3xl bg-black border border-white/20 p-6 sm:p-10 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col justify-between">
            {/* Header */}
            <div className="flex items-start justify-between pb-5 border-b border-white/10 mb-6">
              <div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-[#FFD700] font-bold uppercase">
                    {activeProjectModal.category}
                  </span>
                  <span className="text-white/30">/</span>
                  <span className="text-xs font-mono text-white/50">Client: {activeProjectModal.client}</span>
                  <span className="text-white/30">/</span>
                  <span className="text-xs font-mono text-white/50">{activeProjectModal.year}</span>
                </div>
                <h3 className="text-2xl sm:text-4xl font-black italic tracking-tight text-white mt-1">
                  {activeProjectModal.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveProjectModal(null)}
                className="p-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Modal Content */}
            <div className="overflow-y-auto pr-2 space-y-6 text-sm text-white/80">
              {/* Highlight Banner */}
              <div className="p-4 bg-white/5 border border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#FFD700] font-bold block">
                    Flagship Key Result
                  </span>
                  <span className="text-base font-bold text-white">
                    {activeProjectModal.previewDetails.heroMetric}
                  </span>
                </div>
                <span className="text-xs font-mono text-white/50">Sprint: {activeProjectModal.previewDetails.timeline}</span>
              </div>

              {/* Challenge & Solution */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 bg-white/5 border border-white/10">
                  <h4 className="text-xs uppercase tracking-widest font-bold text-[#FF0000] mb-2">
                    The Strategic Challenge
                  </h4>
                  <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                    {activeProjectModal.challenge}
                  </p>
                </div>

                <div className="p-4 bg-white/5 border border-white/10">
                  <h4 className="text-xs uppercase tracking-widest font-bold text-[#FFD700] mb-2">
                    Syntrix Engineered Solution
                  </h4>
                  <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                    {activeProjectModal.solution}
                  </p>
                </div>
              </div>

              {/* Deliverables */}
              <div>
                <h4 className="text-xs uppercase tracking-widest font-bold text-white mb-3">
                  Scope & Engineered Deliverables
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {activeProjectModal.previewDetails.deliverables.map((del, i) => (
                    <div key={i} className="flex items-center gap-2 p-2.5 bg-white/5 border border-white/10">
                      <CheckCircle className="w-3.5 h-3.5 text-[#FFD700] shrink-0" />
                      <span className="text-xs text-white/90">{del}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Testimonial Quote */}
              {activeProjectModal.previewDetails.testimonial && (
                <div className="p-5 bg-white/5 border-l-2 border-l-[#FFD700] border border-white/10">
                  <p className="text-sm italic text-white/80 mb-3">
                    "{activeProjectModal.previewDetails.testimonial.quote}"
                  </p>
                  <div className="flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-white block">
                        {activeProjectModal.previewDetails.testimonial.author}
                      </span>
                      <span className="text-white/40">
                        {activeProjectModal.previewDetails.testimonial.role}
                      </span>
                    </div>
                    <Award className="w-5 h-5 text-[#FFD700]" />
                  </div>
                </div>
              )}
            </div>

            {/* Modal Bottom Actions */}
            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs text-white/40">
                Crafted by <strong className="text-white">Syntrix by nialekaeti</strong>
              </span>
              <button
                onClick={() => setActiveProjectModal(null)}
                className="px-6 py-3 bg-[#FFD700] text-black font-bold text-xs uppercase tracking-widest hover:bg-white transition-colors cursor-pointer"
              >
                Close Case Study
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
