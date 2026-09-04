import React, { useState, useEffect, useRef } from 'react';
import { Logo } from './Logo';
import { SOCIAL_LINKS, AGENCY_STATS } from '../data';
import { ArrowRight, Sparkles, Instagram, ShieldCheck, Zap, Code2, Layers } from 'lucide-react';

interface HeroProps {
  onStartProject: () => void;
  onExploreWork: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartProject, onExploreWork }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    };

    const currentRef = heroRef.current;
    if (currentRef) {
      currentRef.addEventListener('mousemove', handleMouseMove);
    }
    return () => {
      if (currentRef) {
        currentRef.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen pt-32 pb-20 flex flex-col justify-between overflow-hidden bg-black text-white"
    >
      {/* Background Interactive Radial Glow & Matrix Grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-40 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255, 215, 0, 0.08), transparent 80%)`
        }}
      />

      {/* Cybernetic High-Tech Grid Backdrop */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(to right, #1f1f23 1px, transparent 1px),
            linear-gradient(to bottom, #1f1f23 1px, transparent 1px)
          `,
          backgroundSize: '4rem 4rem'
        }}
      />

      {/* Subtle Ambient Gold Ring in top right */}
      <div className="absolute top-1/4 -right-24 w-96 h-96 rounded-full bg-[#FFD700]/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 -left-20 w-80 h-80 rounded-full bg-[#FF0000]/5 blur-[100px] pointer-events-none" />

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto">
        {/* Clean Minimalism 12-Column Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 border border-white/10 bg-black">
          {/* Left Column (col-span-7) */}
          <section className="lg:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col justify-between lg:border-r border-b lg:border-b-0 border-white/10">
            <div>
              {/* Brand Signature */}
              <div className="mb-6">
                <Logo size="lg" showIcon={true} />
              </div>

              {/* High-Impact Headline */}
              <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black italic tracking-tighter leading-[0.85] text-[#FFD700] mb-8">
                WE DESIGN<br />FOR THE<br />ELITE.
              </h1>

              <p className="text-white/70 max-w-lg text-base sm:text-lg leading-relaxed mb-8">
                A high-end web design agency specialized in crafting luxury digital ecosystems for global disruptors. We merge brutalist precision with premium aesthetics.
              </p>

              {/* Action Buttons & Socials */}
              <div className="flex flex-wrap items-center gap-4 mb-10">
                <button
                  id="hero-cta-start"
                  onClick={onStartProject}
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 font-bold uppercase tracking-widest text-xs bg-[#FFD700] text-black hover:bg-white transition-all duration-200 cursor-pointer group"
                >
                  <span>Initiate Project</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                </button>

                <button
                  id="hero-cta-portfolio"
                  onClick={onExploreWork}
                  className="inline-flex items-center justify-center gap-3 px-7 py-4 font-bold uppercase tracking-widest text-xs bg-white/5 text-white border border-white/10 hover:border-[#FFD700] hover:text-[#FFD700] transition-all duration-200 cursor-pointer"
                >
                  <span>Explore Portfolio</span>
                  <Layers className="w-4 h-4" />
                </button>

                {/* Direct Instagram Links */}
                <div className="flex items-center gap-2 pt-2 sm:pt-0 sm:pl-2">
                  <a
                    id="hero-instagram-company"
                    href={SOCIAL_LINKS.company.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-2 bg-white/5 border border-white/10 hover:border-[#FFD700] text-xs font-semibold text-white/80 hover:text-[#FFD700] transition-all"
                    title="Syntrix Instagram"
                  >
                    <Instagram className="w-4 h-4 text-[#FFD700]" />
                    <span className="font-bold">{SOCIAL_LINKS.company.handle}</span>
                  </a>

                  <a
                    id="hero-instagram-founder"
                    href={SOCIAL_LINKS.founder.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-2 bg-white/5 border border-white/10 hover:border-[#FF0000] text-xs font-semibold text-white/80 hover:text-white transition-all"
                    title="Founder Niale Kaeti Instagram"
                  >
                    <Instagram className="w-4 h-4 text-[#FF0000]" />
                    <span className="font-bold">{SOCIAL_LINKS.founder.handle}</span>
                  </a>
                </div>
              </div>
            </div>

            {/* The Agency Story Micro-Callout */}
            <div className="pt-6 border-t border-white/10">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-[1px] bg-[#FFD700]" />
                <span className="text-xs uppercase tracking-[0.4em] font-bold text-white">The Agency Story</span>
              </div>
              <p className="mt-3 text-xs sm:text-sm text-white/40 max-w-md leading-relaxed">
                Founded by nialekaeti, Syntrix was born from the need for digital experiences that command attention without begging for it.
              </p>
            </div>
          </section>

          {/* Right Column (col-span-5) */}
          <section className="lg:col-span-5 flex flex-col justify-between">
            {/* Core Services Block in Signature Yellow */}
            <div className="p-8 sm:p-10 border-b border-white/10 bg-[#FFD700] text-black flex flex-col justify-between flex-1">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-xs uppercase font-black tracking-widest block">Core Services</span>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 border border-black/20">Atelier Standard</span>
                </div>
                <ul className="space-y-4">
                  <li
                    onClick={onExploreWork}
                    className="flex justify-between items-end border-b border-black/20 pb-2 cursor-pointer hover:translate-x-1 transition-transform"
                  >
                    <span className="text-2xl sm:text-3xl font-black italic tracking-tight">01 UI/UX</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider">Immersive</span>
                  </li>
                  <li
                    onClick={onExploreWork}
                    className="flex justify-between items-end border-b border-black/20 pb-2 cursor-pointer hover:translate-x-1 transition-transform"
                  >
                    <span className="text-2xl sm:text-3xl font-black italic tracking-tight">02 BRANDING</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider">Identity</span>
                  </li>
                  <li
                    onClick={onExploreWork}
                    className="flex justify-between items-end border-b border-black/20 pb-2 cursor-pointer hover:translate-x-1 transition-transform"
                  >
                    <span className="text-2xl sm:text-3xl font-black italic tracking-tight">03 WEB DEV</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider">Scalable</span>
                  </li>
                  <li
                    onClick={onExploreWork}
                    className="flex justify-between items-end border-b border-black/20 pb-2 cursor-pointer hover:translate-x-1 transition-transform"
                  >
                    <span className="text-2xl sm:text-3xl font-black italic tracking-tight">04 3D MOTION</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider">WebGL</span>
                  </li>
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t border-black/10 flex items-center justify-between text-xs font-bold uppercase tracking-widest">
                <span>Sub-400ms TTFB</span>
                <span>Zero Templates</span>
              </div>
            </div>

            {/* Recent Work Grid */}
            <div className="p-8 sm:p-10 flex flex-col justify-between bg-black flex-1">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs uppercase font-black tracking-widest text-[#FFD700]">Recent Work</span>
                <button
                  onClick={onExploreWork}
                  className="text-[10px] font-bold uppercase text-white/40 hover:text-[#FFD700] tracking-widest cursor-pointer"
                >
                  View All Cases
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3 flex-grow my-2">
                <div
                  onClick={onExploreWork}
                  className="bg-white/5 border border-white/10 h-20 sm:h-24 flex flex-col items-center justify-center group cursor-pointer hover:border-[#FFD700] transition-all p-3 text-center"
                >
                  <span className="text-[10px] font-mono uppercase tracking-widest text-white/50 group-hover:text-white transition-colors">
                    Aura
                  </span>
                  <span className="text-[9px] uppercase tracking-tighter text-[#FFD700] mt-1">Horlogerie</span>
                </div>

                <div
                  onClick={onExploreWork}
                  className="bg-white/5 border border-white/10 h-20 sm:h-24 flex flex-col items-center justify-center group cursor-pointer hover:border-[#FFD700] transition-all p-3 text-center"
                >
                  <span className="text-[10px] font-mono uppercase tracking-widest text-white/50 group-hover:text-white transition-colors">
                    Vortex
                  </span>
                  <span className="text-[9px] uppercase tracking-tighter text-[#FFD700] mt-1">GPU Cloud</span>
                </div>

                <div
                  onClick={onExploreWork}
                  className="bg-white/5 border border-white/10 h-20 sm:h-24 flex flex-col items-center justify-center group cursor-pointer hover:border-[#FFD700] transition-all p-3 text-center"
                >
                  <span className="text-[10px] font-mono uppercase tracking-widest text-white/50 group-hover:text-white transition-colors">
                    Onyx
                  </span>
                  <span className="text-[9px] uppercase tracking-tighter text-[#FFD700] mt-1">Prime Bank</span>
                </div>

                <div
                  onClick={onExploreWork}
                  className="bg-[#FFD700]/10 border border-[#FFD700]/40 h-20 sm:h-24 flex items-center justify-center group cursor-pointer hover:bg-[#FFD700] hover:text-black transition-all p-3 text-center"
                >
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#FFD700] group-hover:text-black transition-colors">
                    View (4) →
                  </span>
                </div>
              </div>

              {/* Status Indicator */}
              <div className="flex items-center gap-2 pt-4 border-t border-white/10 text-xs text-white/40">
                <span className="w-2 h-2 rounded-full bg-[#FFD700] animate-pulse" />
                <span className="uppercase tracking-widest text-[10px] font-semibold text-white/70">
                  Accepting Q3 & Q4 Engagements
                </span>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Hero Bottom Metric Strip */}
      <div className="relative z-10 w-full border-t border-white/10 bg-black mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 divide-y md:divide-y-0 md:divide-x divide-white/10">
            {AGENCY_STATS.map((stat, idx) => (
              <div
                key={stat.label}
                className={`flex flex-col items-center text-center ${
                  idx > 0 ? 'pt-4 md:pt-0' : ''
                }`}
              >
                <span className="text-3xl sm:text-4xl lg:text-5xl font-black italic tracking-tighter text-[#FFD700]">
                  {stat.value}
                </span>
                <span className="text-[10px] sm:text-xs font-bold text-white/50 uppercase tracking-[0.25em] mt-2">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
