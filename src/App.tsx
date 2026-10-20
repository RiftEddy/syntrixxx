import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { Packages } from './components/Packages';
import { About } from './components/About';
import { ScopePlanner } from './components/ScopePlanner';
import { Testimonials } from './components/Testimonials';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { AdminPortal } from './components/AdminPortal';
import { trackVisit, trackSectionView } from './utils/adminStore';
import { getStoredAccentColor, applyAccentColor } from './utils/accentTheme';

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [preselectedService, setPreselectedService] = useState('');
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [scopeSummary, setScopeSummary] = useState<{
    serviceType: string;
    timeline: string;
    selectedFeatures: string[];
  } | null>(null);

  // Initialize visit tracking, theme, and secret hotkeys on mount
  useEffect(() => {
    trackVisit();
    applyAccentColor(getStoredAccentColor());

    // Check for #admin in URL hash or ?admin in query
    if (window.location.hash === '#admin' || window.location.search.includes('admin=')) {
      setIsAdminOpen(true);
    }

    // Listen for secret hotkey: Ctrl+Shift+A or Cmd+Shift+A
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        setIsAdminOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Smooth scroll handler
  const handleNavigate = (sectionId: string) => {
    trackSectionView(sectionId);
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // When user clicks "Inquire For This Service" in Services
  const handleSelectService = (serviceName: string) => {
    setPreselectedService(serviceName);
    handleNavigate('contact');
  };

  // When user clicks "Transfer Scope to Brief" in ScopePlanner
  const handleApplyScopeToContact = (scope: {
    serviceType: string;
    timeline: string;
    selectedFeatures: string[];
  }) => {
    setScopeSummary(scope);
    handleNavigate('contact');
  };

  // Track active section on scroll
  useEffect(() => {
    const sectionIds = ['hero', 'services', 'packages', 'about', 'planner', 'contact'];
    let lastRecordedSection = '';

    const handleScroll = () => {
      const scrollY = window.scrollY + 250;
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollY >= top && scrollY < top + height) {
            setActiveSection(id);
            if (id !== lastRecordedSection) {
              lastRecordedSection = id;
              trackSectionView(id);
            }
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white selection:bg-[#FFD700] selection:text-black">
      {/* Navigation Header */}
      <Navbar onNavigate={handleNavigate} activeSection={activeSection} />

      {/* Main Content Sections */}
      <main id="main-content">
        {/* Hero Section */}
        <Hero
          onStartProject={() => handleNavigate('contact')}
          onViewPackages={() => handleNavigate('packages')}
          onExploreWork={() => handleNavigate('services')}
        />

        {/* Services Section */}
        <Services onSelectService={handleSelectService} />

        {/* Fixed Packages & Buy Now Section (Dual Currency USD / KSH) */}
        <Packages
          onSelectPackageForBrief={(pkgName) => {
            handleSelectService(pkgName);
          }}
        />

        {/* About Agency & Niale Kaeti Section */}
        <About />

        {/* Interactive Scope & Cost Planner */}
        <ScopePlanner onApplyScopeToContact={handleApplyScopeToContact} />

        {/* Executive Testimonials */}
        <Testimonials />

        {/* Discovery & Contact Section */}
        <Contact
          initialService={preselectedService}
          scopeSummary={scopeSummary}
        />
      </main>

      {/* Footer with Logo, Instagram & Secret Admin Touchpoint */}
      <Footer
        onNavigate={handleNavigate}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Secret Hidden Admin Portal & Telemetry */}
      <AdminPortal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
      />
    </div>
  );
}
