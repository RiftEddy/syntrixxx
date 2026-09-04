import React from 'react';
import { TESTIMONIALS } from '../data';
import { Quote, Star } from 'lucide-react';

export const Testimonials: React.FC = () => {
  return (
    <section className="py-24 sm:py-32 bg-black text-white relative border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-white/10 gap-6">
          <div>
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-[1px] bg-[#FFD700]" />
              <span className="text-xs uppercase tracking-[0.4em] font-bold text-white">Executive Endorsements</span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-black italic tracking-tighter text-white">
              TRUSTED BY CATEGORY-DEFINING <br />
              <span className="text-[#FFD700]">FOUNDERS & LEADERS.</span>
            </h2>
          </div>
          <div className="flex items-center gap-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-[#FFD700] text-[#FFD700]" />
            ))}
            <span className="text-xs font-mono text-white/50 ml-2">5.0 / 5.0 CLIENT RATING</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="p-8 bg-white/5 border border-white/10 flex flex-col justify-between hover:border-[#FFD700] transition-all duration-300"
            >
              <div>
                <Quote className="w-7 h-7 text-[#FFD700] mb-6" />
                <p className="text-white/80 text-sm sm:text-base leading-relaxed mb-8 italic">
                  "{t.quote}"
                </p>
              </div>

              <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                <div>
                  <div className="text-white font-bold text-sm tracking-tight">{t.author}</div>
                  <div className="text-xs text-white/50">{t.role}</div>
                  <div className="text-xs text-[#FFD700] font-bold mt-0.5">{t.company}</div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-mono px-2 py-1 bg-black text-[#FFD700] border border-white/10 font-bold block">
                    {t.metric}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

