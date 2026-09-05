import React from 'react';
import { Logo } from './Logo';
import { SOCIAL_LINKS, AGENCY_EMAIL } from '../data';
import { Instagram, ArrowUp, Mail, Shield, Sparkles } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="main-footer" className="bg-black text-white border-t border-white/10 pt-20 pb-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          {/* Brand Column */}
          <div className="lg:col-span-5 space-y-6">
            <Logo size="lg" showIcon={true} onClick={scrollToTop} />

            <p className="text-white/60 text-sm leading-relaxed max-w-md">
              Syntrix by nialekaeti is a high-end web design and digital engineering agency. We craft category-defining digital flagships for discerning founders, luxury institutions, and forward-thinking enterprises.
            </p>

            {/* Prominent Instagram Social Links in Footer as requested */}
            <div className="pt-2">
              <span className="text-xs uppercase tracking-widest font-bold text-white/50 block mb-3">
                Connect on Instagram
              </span>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                {/* Personal: @nialekaeti (label as "Founder" or "Niale Kaeti") */}
                <a
                  id="footer-social-founder"
                  href={SOCIAL_LINKS.founder.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#FF0000] transition-all group"
                  title="Founder Niale Kaeti on Instagram"
                >
                  <div className="p-1 bg-black text-[#FF0000]">
                    <Instagram className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-white/50 font-bold">
                      Founder
                    </div>
                    <div className="text-xs font-bold text-white group-hover:text-red-400 transition-colors">
                      {SOCIAL_LINKS.founder.handle} ({SOCIAL_LINKS.founder.name})
                    </div>
                  </div>
                </a>

                {/* Company: @syntrixdev (label as "Syntrix") */}
                <a
                  id="footer-social-company"
                  href={SOCIAL_LINKS.company.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#FFD700] transition-all group"
                  title="Syntrix Agency on Instagram"
                >
                  <div className="p-1 bg-black text-[#FFD700]">
                    <Instagram className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-white/50 font-bold">
                      Syntrix
                    </div>
                    <div className="text-xs font-bold text-white group-hover:text-[#FFD700] transition-colors">
                      {SOCIAL_LINKS.company.handle}
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs uppercase tracking-widest font-bold text-white">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs text-white/60">
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-[#FFD700] transition-colors cursor-pointer"
                >
                  Services & Expertise
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-[#FFD700] transition-colors cursor-pointer"
                >
                  About the Atelier
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('planner')}
                  className="hover:text-[#FFD700] transition-colors cursor-pointer"
                >
                  Scope & Cost Planner
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-[#FFD700] transition-colors cursor-pointer"
                >
                  Contact & Inquiries
                </button>
              </li>
            </ul>
          </div>

          {/* Capabilities */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs uppercase tracking-widest font-bold text-white">
              Atelier Capabilities
            </h4>
            <ul className="space-y-2.5 text-xs text-white/60">
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-[#FFD700]" />
                <span>Bespoke Web Design</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-[#FFD700]" />
                <span>UI/UX Architecture & Systems</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-[#FFD700]" />
                <span>Creative Direction & Identity</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-[#FF0000]" />
                <span>Motion & Interactive WebGL</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-[#FFD700]" />
                <span>High-Velocity TypeScript / Next.js</span>
              </li>
            </ul>
          </div>

          {/* Back to top & studio status */}
          <div className="lg:col-span-2 flex flex-col justify-between items-start lg:items-end">
            <button
              onClick={scrollToTop}
              className="p-3 bg-white/5 border border-white/10 hover:border-[#FFD700] hover:text-black hover:bg-[#FFD700] text-white/70 transition-all flex items-center gap-2 text-xs font-bold uppercase tracking-widest group cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-4 h-4 transition-transform group-hover:-translate-y-1" />
            </button>

            <div className="text-left lg:text-right mt-6 lg:mt-0 space-y-1">
              <span className="text-[10px] uppercase tracking-widest text-[#FFD700] font-mono block">
                GLOBAL ATELIER
              </span>
              <span className="text-xs text-white/50 block">
                Operating Globally / GMT & EST
              </span>
              <a
                href={`mailto:${AGENCY_EMAIL}`}
                className="text-xs text-[#FFD700] hover:underline font-mono block transition-colors"
                title={`Email ${AGENCY_EMAIL}`}
              >
                {AGENCY_EMAIL}
              </a>
            </div>
          </div>
        </div>

        {/* Sub-Footer Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()}</span>
            <strong className="text-white">syntrix by nialekaeti</strong>
            <span>All Rights Reserved.</span>
          </div>

          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-white/50">
              <Shield className="w-3.5 h-3.5 text-[#FFD700]" />
              <span>Bespoke Engineering Only</span>
            </span>
            <span className="flex items-center gap-1.5 text-white/50">
              <Sparkles className="w-3.5 h-3.5 text-[#FF0000]" />
              <span>No Generic Templates</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
