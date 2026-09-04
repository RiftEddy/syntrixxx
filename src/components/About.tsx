import React from 'react';
import { SOCIAL_LINKS } from '../data';
import { Instagram, ArrowUpRight, Flame, Shield, Compass, Cpu } from 'lucide-react';
import { Logo } from './Logo';

export const About: React.FC = () => {
  const values = [
    {
      icon: <Flame className="w-5 h-5 text-[#FF0000]" />,
      title: 'Anti-Template Creed',
      description: 'The web has become an ocean of interchangeable pastel cards and cookie-cutter SaaS layouts. We reject this utterly. Every project is built from clean, bespoke ground up.'
    },
    {
      icon: <Cpu className="w-5 h-5 text-[#FFD700]" />,
      title: 'Algorithmic Precision',
      description: 'Haute couture design is hollow without mathematical engineering. We write strict TypeScript, optimize critical render paths, and achieve sub-second TTFB on edge networks.'
    },
    {
      icon: <Shield className="w-5 h-5 text-[#FFD700]" />,
      title: 'Direct Founder Access',
      description: 'No account managers or bureaucratic middlemen. Clients collaborate directly with Niale Kaeti and senior creative technologists throughout the entire sprint lifecycle.'
    },
    {
      icon: <Compass className="w-5 h-5 text-white" />,
      title: 'Commercial Velocity',
      description: 'We measure visual glory by commercial resonance. A website must convert prospective partners, command pricing power, and immortalize the brand.'
    }
  ];

  return (
    <section id="about" className="py-24 sm:py-32 bg-black text-white relative border-b border-white/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-12 h-[1px] bg-[#FFD700]" />
            <span className="text-xs uppercase tracking-[0.4em] font-bold text-white">Agency Heritage & Leadership</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-black italic tracking-tighter text-white mb-6">
            BESPOKE CRAFT FOR THE <br />
            <span className="text-[#FFD700]">ARCHITECTS OF TOMORROW.</span>
          </h2>
          <p className="text-white/60 text-base sm:text-lg leading-relaxed">
            Syntrix was founded on an unapologetic premise: the internet deserves visual masterpieces that function with the reliability of Swiss chronographs.
          </p>
        </div>

        {/* Founder & Atelier Spotlight Card */}
        <div className="bg-white/5 border border-white/10 p-8 sm:p-12 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Column: Story & Philosophy */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-white/10">
                <Logo size="md" showIcon={true} />
              </div>

              <h3 className="text-2xl sm:text-3xl font-black italic tracking-tight text-white leading-tight">
                "Design is not decoration. In the modern economy, design is an asymmetric weapon for market leadership."
              </h3>

              <div className="space-y-4 text-white/70 text-sm sm:text-base leading-relaxed">
                <p>
                  Led by Creative Technologist <strong>Niale Kaeti</strong>, Syntrix operates as an intimate digital atelier. Instead of taking on fifty overlapping client engagements, we partner with a strictly limited cohort of visionary founders each quarter.
                </p>
                <p>
                  From high-end luxury e-commerce to cutting-edge AI computing infrastructure, our work marries stark, monolithic contrast (deep blacks, electric gold, and surgical accents) with ultra-fluid web performance.
                </p>
              </div>

              {/* Founder Signature & Instagram Quick Connects */}
              <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="text-sm font-bold text-white flex items-center gap-2">
                    <span>Niale Kaeti</span>
                    <span className="text-xs font-mono text-[#FF0000] px-2 py-0.5 bg-white/5 border border-white/10">
                      FOUNDER & PRINCIPAL
                    </span>
                  </div>
                  <div className="text-xs text-white/40 mt-1 uppercase tracking-wider">Syntrix by nialekaeti</div>
                </div>

                <div className="flex items-center gap-3">
                  {/* Founder IG */}
                  <a
                    href={SOCIAL_LINKS.founder.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3.5 py-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#FF0000] text-xs font-semibold text-white/90 hover:text-white transition-all group"
                  >
                    <Instagram className="w-4 h-4 text-[#FF0000] group-hover:scale-110 transition-transform" />
                    <span>{SOCIAL_LINKS.founder.handle}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
                  </a>

                  {/* Company IG */}
                  <a
                    href={SOCIAL_LINKS.company.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3.5 py-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#FFD700] text-xs font-semibold text-white/90 hover:text-[#FFD700] transition-all group"
                  >
                    <Instagram className="w-4 h-4 text-[#FFD700] group-hover:scale-110 transition-transform" />
                    <span>{SOCIAL_LINKS.company.handle}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column: Visual Emblem & Principles Box */}
            <div className="lg:col-span-5 flex flex-col justify-center items-center p-8 bg-black border border-white/10 relative text-center">
              {/* Gold/Red Geometric Emblem */}
              <div className="w-24 h-24 sm:w-28 sm:h-28 bg-black border border-white/20 flex items-center justify-center mb-6 relative group">
                <svg viewBox="0 0 60 60" className="w-16 h-16" fill="none">
                  <path
                    d="M42 18C40 14 36 12 30 12C22 12 17 16.5 17 23.5C17 31 25 33 32 35C39 37 42 39 42 43.5C42 48 37 52 30 52C21 52 17 47 15 41"
                    stroke="#FFD700"
                    strokeWidth="5"
                    strokeLinecap="round"
                  />
                  <circle cx="43" cy="44" r="3.5" fill="#FF0000" />
                </svg>
              </div>

              <div className="text-lg font-black italic tracking-tight uppercase text-white mb-1">
                The Atelier Standard
              </div>
              <p className="text-xs text-white/50 max-w-xs mb-6">
                Bespoke design tokens, zero external template dependencies, 100% bespoke engineering.
              </p>

              {/* Fast Stats Mini Grid */}
              <div className="grid grid-cols-2 gap-3 w-full border-t border-white/10 pt-5">
                <div className="p-3 bg-white/5 border border-white/10">
                  <div className="text-lg font-black italic text-[#FFD700]">4–6 WEEKS</div>
                  <div className="text-[10px] uppercase tracking-widest text-white/40">Average Sprint</div>
                </div>
                <div className="p-3 bg-white/5 border border-white/10">
                  <div className="text-lg font-black italic text-white">LIMITED</div>
                  <div className="text-[10px] uppercase tracking-widest text-white/40">Quarterly Cohort</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Agency Values / Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v, idx) => (
            <div
              key={idx}
              className="p-6 bg-white/5 border border-white/10 hover:border-[#FFD700] transition-colors flex flex-col justify-between"
            >
              <div className="mb-4">
                <div className="p-2.5 w-fit bg-black border border-white/10 mb-4">
                  {v.icon}
                </div>
                <h4 className="text-base font-black italic tracking-tight text-white mb-2">
                  {v.title}
                </h4>
                <p className="text-xs text-white/60 leading-relaxed">
                  {v.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
