import React, { useState, useEffect } from 'react';
import { Logo } from './Logo';
import { SOCIAL_LINKS } from '../data';
import { Instagram, Menu, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate, activeSection }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const navItems = [
    { label: 'Services', id: 'services' },
    { label: 'Packages', id: 'packages' },
    { label: 'Scope', id: 'planner' },
    { label: 'About', id: 'about' },
    { label: 'Contact', id: 'contact' }
  ];

  const handleLinkClick = (id: string) => {
    setMobileMenuOpen(false);
    onNavigate(id);
  };

  return (
    <header
      id="main-navigation"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-black/95 backdrop-blur-md border-b border-white/10 shadow-2xl py-3'
          : 'bg-black/85 backdrop-blur-sm border-b border-white/5 py-4 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          {/* Logo Section */}
          <div className="flex-shrink-0">
            <Logo
              size="md"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          </div>

          {/* Desktop Navigation Links */}
          <nav
            className="hidden lg:flex items-center space-x-8 xl:space-x-10 text-xs uppercase tracking-[0.2em] font-medium"
            aria-label="Main Navigation"
          >
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => handleLinkClick(item.id)}
                  className={`relative py-1 transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'text-[#FFD700] font-semibold'
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#FFD700] shadow-[0_0_8px_rgba(255,215,0,0.8)]" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Header Actions & Minimal Socials */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Desktop Minimal Instagram Icons */}
            <div className="hidden lg:flex items-center gap-2 pr-3 border-r border-white/10">
              {/* Company Instagram */}
              <a
                id="header-social-company"
                href={SOCIAL_LINKS.company.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-white/60 hover:text-[#FFD700] px-2 py-1 bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 hover:border-[#FFD700]/40 transition-all duration-200 group"
                title={`Syntrix Instagram: ${SOCIAL_LINKS.company.handle}`}
              >
                <Instagram className="w-3.5 h-3.5 text-[#FFD700] group-hover:scale-110 transition-transform" />
                <span className="hidden xl:inline">{SOCIAL_LINKS.company.handle}</span>
              </a>

              {/* Founder Instagram */}
              <a
                id="header-social-founder"
                href={SOCIAL_LINKS.founder.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-white/60 hover:text-white px-2 py-1 bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 hover:border-[#FF0000]/40 transition-all duration-200 group"
                title={`Founder Instagram: ${SOCIAL_LINKS.founder.handle}`}
              >
                <Instagram className="w-3.5 h-3.5 text-[#FF0000] group-hover:scale-110 transition-transform" />
                <span className="hidden xl:inline">{SOCIAL_LINKS.founder.handle}</span>
              </a>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex items-center gap-2">
              <button
                id="header-buy-button"
                onClick={() => handleLinkClick('packages')}
                className="hidden md:inline-flex items-center justify-center px-3 py-1.5 text-xs uppercase tracking-widest font-semibold text-white/70 hover:text-[#FFD700] hover:bg-white/5 transition-all duration-200 cursor-pointer"
              >
                <span>Packages</span>
              </button>

              <button
                id="header-cta-button"
                onClick={() => handleLinkClick('contact')}
                className="group relative inline-flex items-center justify-center px-3.5 sm:px-4 py-2 text-xs uppercase tracking-widest font-bold text-black bg-[#FFD700] hover:bg-white transition-all duration-200 shadow-[0_0_15px_rgba(255,215,0,0.2)] cursor-pointer"
              >
                <span>Initiate</span>
                <ArrowUpRight className="w-3.5 h-3.5 ml-1 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </div>

            {/* Mobile / Tablet Menu Toggle Button */}
            <div className="flex lg:hidden items-center">
              <button
                id="mobile-menu-toggle"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-white bg-white/5 border border-white/10 hover:border-[#FFD700] transition-colors focus:outline-none"
                aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5 text-[#FFD700]" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile / Tablet Drawer Menu - Seamlessly docked to header bottom */}
      {mobileMenuOpen && (
        <div
          id="mobile-drawer"
          className="lg:hidden absolute top-full left-0 right-0 w-full bg-black/98 backdrop-blur-2xl border-b border-white/10 shadow-2xl transition-all animate-in fade-in slide-in-from-top-2 duration-200"
        >
          <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col gap-5">
            {/* Nav list */}
            <div className="flex flex-col divide-y divide-white/5">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleLinkClick(item.id)}
                    className={`text-left text-sm uppercase tracking-widest font-bold py-3 flex items-center justify-between transition-colors ${
                      isActive ? 'text-[#FFD700]' : 'text-white/80 hover:text-white'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      {isActive && <span className="w-1.5 h-1.5 bg-[#FFD700]" />}
                      {item.label}
                    </span>
                    <ArrowUpRight className="w-4 h-4 opacity-50" />
                  </button>
                );
              })}
            </div>

            {/* Instagram Touchpoints */}
            <div className="pt-3 border-t border-white/10">
              <div className="text-[10px] uppercase tracking-widest text-white/40 font-mono mb-3">
                Atelier Instagram Channels
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <a
                  href={SOCIAL_LINKS.company.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 bg-white/[0.03] border border-white/10 hover:border-[#FFD700] transition-colors group"
                >
                  <div className="flex items-center gap-2.5">
                    <Instagram className="w-4 h-4 text-[#FFD700]" />
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-white/40">Company</div>
                      <div className="text-xs font-mono font-bold text-white group-hover:text-[#FFD700] transition-colors">
                        {SOCIAL_LINKS.company.handle}
                      </div>
                    </div>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-white/30 group-hover:text-[#FFD700] transition-colors" />
                </a>

                <a
                  href={SOCIAL_LINKS.founder.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 bg-white/[0.03] border border-white/10 hover:border-[#FF0000] transition-colors group"
                >
                  <div className="flex items-center gap-2.5">
                    <Instagram className="w-4 h-4 text-[#FF0000]" />
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-white/40">Founder</div>
                      <div className="text-xs font-mono font-bold text-white group-hover:text-[#FF0000] transition-colors">
                        {SOCIAL_LINKS.founder.handle}
                      </div>
                    </div>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-white/30 group-hover:text-[#FF0000] transition-colors" />
                </a>
              </div>
            </div>

            {/* Quick Actions in Mobile Menu */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => handleLinkClick('packages')}
                className="py-3 px-4 text-center text-xs uppercase tracking-widest font-bold text-white bg-white/5 border border-white/15 hover:border-[#FFD700] hover:text-[#FFD700] transition-colors"
              >
                Packages
              </button>
              <button
                onClick={() => handleLinkClick('contact')}
                className="py-3 px-4 text-center text-xs uppercase tracking-widest font-bold text-black bg-[#FFD700] hover:bg-white transition-colors"
              >
                Initiate
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
