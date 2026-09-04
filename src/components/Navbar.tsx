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
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Services', id: 'services' },
    { label: 'Portfolio', id: 'portfolio' },
    { label: 'About', id: 'about' },
    { label: 'Scope Planner', id: 'planner' },
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
          ? 'bg-black/95 backdrop-blur-md border-b border-white/10 py-3'
          : 'bg-black/80 backdrop-blur-sm border-b border-white/10 py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo Section */}
          <Logo
            size="md"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-10 text-xs uppercase tracking-widest font-semibold" aria-label="Main Navigation">
            {navItems.map((item) => (
              <button
                key={item.id}
                id={`nav-link-${item.id}`}
                onClick={() => handleLinkClick(item.id)}
                className={`transition-colors duration-200 relative py-1 cursor-pointer ${
                  activeSection === item.id
                    ? 'text-[#FFD700]'
                    : 'text-white/80 hover:text-[#FFD700]'
                }`}
              >
                {item.label}
                {activeSection === item.id && (
                  <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#FFD700]" />
                )}
              </button>
            ))}
          </nav>

          {/* Header Socials & Action Button (Desktop) */}
          <div className="hidden sm:flex items-center gap-4">
            {/* Instagram Social Links in Header */}
            <div className="flex items-center gap-2 pr-3 border-r border-white/10">
              {/* Company Instagram */}
              <a
                id="header-social-company"
                href={SOCIAL_LINKS.company.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider font-semibold px-2.5 py-1 bg-white/5 text-white/80 hover:text-[#FFD700] hover:bg-white/10 border border-white/10 hover:border-[#FFD700] transition-all duration-200 group"
                title="Syntrix on Instagram"
              >
                <Instagram className="w-3.5 h-3.5 text-[#FFD700] group-hover:scale-110 transition-transform" />
                <span className="hidden xl:inline text-white/40">Syntrix:</span>
                <span>{SOCIAL_LINKS.company.handle}</span>
              </a>

              {/* Personal / Founder Instagram */}
              <a
                id="header-social-founder"
                href={SOCIAL_LINKS.founder.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider font-semibold px-2.5 py-1 bg-white/5 text-white/80 hover:text-white hover:bg-white/10 border border-white/10 hover:border-[#FF0000] transition-all duration-200 group"
                title="Niale Kaeti (Founder) on Instagram"
              >
                <Instagram className="w-3.5 h-3.5 text-[#FF0000] group-hover:scale-110 transition-transform" />
                <span className="hidden xl:inline text-white/40">Founder:</span>
                <span className="text-white group-hover:text-white">{SOCIAL_LINKS.founder.handle}</span>
              </a>
            </div>

            {/* Primary Action Button */}
            <button
              id="header-cta-button"
              onClick={() => handleLinkClick('contact')}
              className="relative inline-flex items-center justify-center px-4 py-2 text-xs uppercase tracking-widest font-bold text-black bg-[#FFD700] hover:bg-white transition-all duration-200 cursor-pointer"
            >
              <span>Initiate</span>
              <ArrowUpRight className="w-3.5 h-3.5 ml-1 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-white bg-white/5 border border-white/10 focus:outline-none focus:border-[#FFD700]"
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-[#FFD700]" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-drawer"
          className="sm:hidden fixed inset-x-0 top-[60px] bg-black border-b border-white/10 px-6 py-6 shadow-2xl transition-all"
        >
          <div className="flex flex-col gap-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleLinkClick(item.id)}
                className={`text-left text-sm uppercase tracking-widest font-bold py-2 border-b border-white/5 flex items-center justify-between ${
                  activeSection === item.id ? 'text-[#FFD700]' : 'text-white/80'
                }`}
              >
                <span>{item.label}</span>
                <ArrowUpRight className="w-4 h-4 opacity-60" />
              </button>
            ))}

            {/* Mobile Social Links */}
            <div className="pt-4 border-t border-white/10 flex flex-col gap-2.5">
              <span className="text-xs uppercase tracking-widest text-zinc-400 font-bold">
                Follow On Instagram
              </span>
              <div className="grid grid-cols-2 gap-2">
                <a
                  href={SOCIAL_LINKS.company.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-xs font-semibold text-zinc-300 hover:text-[#FFD700]"
                >
                  <Instagram className="w-4 h-4 text-[#FFD700]" />
                  <div>
                    <div className="text-[10px] text-zinc-400">Company</div>
                    <div className="font-bold text-[#FFD700]">{SOCIAL_LINKS.company.handle}</div>
                  </div>
                </a>

                <a
                  href={SOCIAL_LINKS.founder.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-xs font-semibold text-zinc-300 hover:text-white"
                >
                  <Instagram className="w-4 h-4 text-[#FF0000]" />
                  <div>
                    <div className="text-[10px] text-zinc-400">Founder</div>
                    <div className="font-bold text-white">{SOCIAL_LINKS.founder.handle}</div>
                  </div>
                </a>
              </div>
            </div>

            {/* Mobile CTA */}
            <button
              onClick={() => handleLinkClick('contact')}
              className="mt-3 w-full py-3 text-center text-sm uppercase tracking-wider font-bold text-black bg-[#FFD700] rounded-lg shadow-[0_0_20px_rgba(255,215,0,0.35)]"
            >
              Start a Project
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
