import React, { useState } from 'react';
import { SERVICES } from '../data';
import { Service } from '../types';
import { 
  Monitor, 
  Layers, 
  PenTool, 
  Terminal, 
  Sparkles, 
  Gauge, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  ChevronRight,
  X
} from 'lucide-react';

interface ServicesProps {
  onSelectService: (serviceName: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ onSelectService }) => {
  const [activeModalService, setActiveModalService] = useState<Service | null>(null);

  const getServiceIcon = (id: string) => {
    switch (id) {
      case 'web-design':
        return <Monitor className="w-6 h-6 text-[#FFD700]" />;
      case 'ui-ux':
        return <Layers className="w-6 h-6 text-[#FFD700]" />;
      case 'creative-branding':
        return <PenTool className="w-6 h-6 text-[#FFD700]" />;
      case 'headless-engineering':
        return <Terminal className="w-6 h-6 text-[#FFD700]" />;
      case 'motion-3d':
        return <Sparkles className="w-6 h-6 text-[#FF0000]" />;
      case 'performance-seo':
        return <Gauge className="w-6 h-6 text-[#FFD700]" />;
      default:
        return <Monitor className="w-6 h-6 text-[#FFD700]" />;
    }
  };

  return (
    <section id="services" className="py-24 sm:py-32 bg-black text-white relative border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-white/10 gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-[1px] bg-[#FFD700]" />
              <span className="text-xs uppercase tracking-[0.4em] font-bold text-white">Core Capabilities</span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-black italic tracking-tighter text-white">
              ENGINEERED FOR IMPACT.{' '}
              <span className="text-[#FFD700]">EXECUTED WITHOUT COMPROMISE.</span>
            </h2>
          </div>
          <p className="text-white/60 text-base sm:text-lg max-w-md leading-relaxed">
            Every engagement is a bespoke partnership. We combine haute aesthetics with high-performance software engineering to build category-leading digital assets.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {SERVICES.map((service) => (
            <div
              key={service.id}
              id={`service-card-${service.id}`}
              className="group relative flex flex-col justify-between p-8 bg-white/5 border border-white/10 hover:border-[#FFD700] transition-all duration-300"
            >
              <div>
                {/* Header: Number & Icon */}
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
                  <span className="text-3xl font-black italic text-[#FFD700]">
                    {service.number}
                  </span>
                  <div className="p-2.5 bg-black border border-white/10 group-hover:border-[#FFD700] transition-colors">
                    {getServiceIcon(service.id)}
                  </div>
                </div>

                {/* Title & Subtitle */}
                <h3 className="text-xl sm:text-2xl font-black italic tracking-tight text-white group-hover:text-[#FFD700] transition-colors mb-2">
                  {service.title}
                </h3>
                <p className="text-[10px] uppercase tracking-widest font-bold text-white/50 mb-4">
                  {service.subtitle}
                </p>

                {/* Description */}
                <p className="text-sm text-white/70 leading-relaxed mb-6 font-normal">
                  {service.description}
                </p>

                {/* Key Deliverables Bullet Points */}
                <div className="space-y-2.5 mb-6 pt-4 border-t border-white/10">
                  {service.deliverables.slice(0, 3).map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-white/60">
                      <span className="w-1.5 h-1.5 bg-[#FFD700] shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                {/* Timeline & Ideal For Badge */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-white/50 mb-5">
                  <span className="flex items-center gap-1.5 text-white/80 font-mono text-[11px]">
                    <Clock className="w-3.5 h-3.5 text-[#FFD700]" />
                    {service.timeline}
                  </span>
                  <button
                    onClick={() => setActiveModalService(service)}
                    className="text-[10px] font-bold uppercase tracking-widest text-white/50 hover:text-[#FFD700] cursor-pointer"
                  >
                    Details →
                  </button>
                </div>

                {/* Action Button */}
                <button
                  onClick={() => onSelectService(service.title)}
                  className="w-full py-3 px-4 bg-[#FFD700] hover:bg-white text-black font-bold text-xs uppercase tracking-widest transition-all duration-200 flex items-center justify-center gap-2 group/btn cursor-pointer"
                >
                  <span>Inquire For This</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Service Detail Modal */}
      {activeModalService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
          <div className="relative w-full max-w-2xl bg-black border border-white/20 p-6 sm:p-10 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col justify-between">
            <div className="overflow-y-auto pr-2">
              <div className="flex items-start justify-between pb-4 border-b border-white/10 mb-6">
                <div>
                  <span className="text-xs font-mono text-[#FFD700] font-bold tracking-widest uppercase">
                    SERVICE // {activeModalService.number}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black italic tracking-tight text-white mt-1">
                    {activeModalService.title}
                  </h3>
                  <p className="text-xs uppercase tracking-widest text-white/50 mt-1">
                    {activeModalService.subtitle}
                  </p>
                </div>
                <button
                  onClick={() => setActiveModalService(null)}
                  className="p-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-6 text-sm text-white/80">
                <div>
                  <h4 className="text-xs uppercase tracking-widest font-bold text-[#FFD700] mb-2">
                    Scope & Methodology
                  </h4>
                  <p className="leading-relaxed text-white/70">
                    {activeModalService.description}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs uppercase tracking-widest font-bold text-[#FFD700] mb-2">
                    Included Deliverables
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {activeModalService.deliverables.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 bg-white/5 p-3 border border-white/10">
                        <CheckCircle2 className="w-4 h-4 text-[#FFD700] shrink-0 mt-0.5" />
                        <span className="text-xs text-white/90">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-xs uppercase tracking-widest font-bold text-[#FFD700] mb-2">
                    Technologies & Tools
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {activeModalService.techStack.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-white/5 border border-white/10 text-xs font-mono text-[#FFD700]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-white/5 border border-white/10 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-white/40 block">Sprint Timeline</span>
                    <span className="text-sm font-bold text-white">{activeModalService.timeline}</span>
                  </div>
                  <div className="text-right max-w-xs">
                    <span className="text-[10px] uppercase tracking-widest text-white/40 block">Recommended For</span>
                    <span className="text-xs text-white/80">{activeModalService.idealFor}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-end gap-4">
              <button
                onClick={() => setActiveModalService(null)}
                className="px-4 py-2.5 text-xs font-bold uppercase tracking-widest text-white/50 hover:text-white"
              >
                Close
              </button>
              <button
                onClick={() => {
                  const sTitle = activeModalService.title;
                  setActiveModalService(null);
                  onSelectService(sTitle);
                }}
                className="px-6 py-3 bg-[#FFD700] text-black font-bold text-xs uppercase tracking-widest hover:bg-white transition-all"
              >
                Inquire For This Service
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
