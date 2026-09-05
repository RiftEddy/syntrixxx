import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { About } from './components/About';
import { ScopePlanner } from './components/ScopePlanner';
import { Testimonials } from './components/Testimonials';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [preselectedService, setPreselectedService] = useState('');
  const [scopeSummary, setScopeSummary] = useState<{
    serviceType: string;
    timeline: string;
    selectedFeatures: string[];
  } | null>(null);

  // Smooth scroll handler
  const handleNavigate = (sectionId: string) => {
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
    const sectionIds = ['hero', 'services', 'about', 'planner', 'contact'];
    const handleScroll = () => {
      const scrollY = window.scrollY + 250;
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollY >= top && scrollY < top + height) {
            setActiveSection(id);
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
          onExploreWork={() => handleNavigate('services')}
        />

        {/* Services Section */}
        <Services onSelectService={handleSelectService} />

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

      {/* Footer with Logo & Instagram Social Links */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
