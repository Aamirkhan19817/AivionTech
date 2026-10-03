import React, { useState } from 'react';
import { SERVICES } from '../data/companyData';
import { Globe, Smartphone, Cpu, Code, ArrowRight } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

const iconMap: Record<string, React.ReactNode> = {
  Globe: <Globe className="w-6 h-6 text-cyan-400" />,
  Smartphone: <Smartphone className="w-6 h-6 text-blue-400" />,
  Cpu: <Cpu className="w-6 h-6 text-teal-400" />,
  Code: <Code className="w-6 h-6 text-sky-400" />,
};

export const ServicesSection: React.FC = () => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const handleConsultClick = (title: string) => {
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="services" className="relative py-24 sm:py-32 bg-gray-950">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyan-600/10 blur-[120px] rounded-full pointer-events-none" />

      <ScrollReveal variant="3d-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <ScrollReveal variant="fade-up">
          <div className="max-w-2xl mb-16 sm:mb-20">
            <div className="text-xs font-mono tracking-[0.25em] text-cyan-400 uppercase mb-3">
              Capabilities & Disciplines
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
              Engineered for Impact. Built to Scale.
            </h2>
            <p className="mt-4 text-base text-gray-400 leading-relaxed">
              We architect and engineer robust digital products across four core technological pillars, combining deep domain proficiency with bespoke craft.
            </p>
          </div>
        </ScrollReveal>

        {/* 4 Premium Service Cards with Staggered Scroll Reveal */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {SERVICES.map((service, index) => {
            const isHovered = hoveredIdx === index;

            return (
              <ScrollReveal
                key={service.number}
                variant="3d-card"
                delay={index * 120}
                className="h-full"
              >
                <div
                  onMouseEnter={() => setHoveredIdx(index)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  className={`group relative rounded-xl p-8 sm:p-10 transition-all duration-300 transform h-full ${
                    isHovered
                      ? 'translate-y-[-4px] shadow-[0_15px_35px_-5px_rgba(6,182,212,0.15)] border-cyan-500/50 bg-gray-900/90'
                      : 'border-white/[0.08] bg-gray-900/50 hover:bg-gray-900/70'
                  } border backdrop-blur-xl flex flex-col justify-between`}
                  style={{
                    perspective: '1000px',
                  }}
                >
                  {/* Border highlight animation */}
                  <div
                    className={`absolute inset-0 rounded-xl pointer-events-none transition-opacity duration-300 ${
                      isHovered ? 'opacity-100' : 'opacity-0'
                    }`}
                    style={{
                      background:
                        'radial-gradient(400px circle at top left, rgba(6, 182, 212, 0.12), transparent 70%)',
                    }}
                  />

                  <div>
                    {/* Top Bar with Number and Icon */}
                    <div className="flex items-center justify-between mb-8">
                      <div className="w-12 h-12 rounded-lg bg-gray-950/80 border border-white/10 flex items-center justify-center group-hover:border-cyan-500/40 group-hover:bg-cyan-950/30 transition-colors">
                        {iconMap[service.icon]}
                      </div>
                      <span className="font-mono text-sm tracking-widest text-gray-500 group-hover:text-cyan-400 transition-colors">
                        SERVICE {service.number}
                      </span>
                    </div>

                    {/* Title & Description */}
                    <h3 className="font-display text-2xl font-bold text-white mb-3 group-hover:text-cyan-200 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-gray-400 text-sm sm:text-base leading-relaxed mb-6">
                      {service.description}
                    </p>

                    {/* Deliverables / Capabilities list */}
                    <ul className="space-y-2 mb-8 pt-4 border-t border-white/[0.06]">
                      {service.features.map((feature, fIdx) => (
                        <li key={fIdx} className="text-xs sm:text-sm text-gray-400 flex items-center gap-2.5">
                          <span className="w-1 h-1 rounded-full bg-cyan-400/80 shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Card Action Link */}
                  <button
                    onClick={() => handleConsultClick(service.title)}
                    className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-cyan-400 hover:text-cyan-300 transition-colors pt-2 group-hover:translate-x-1 duration-200"
                  >
                    <span>Inquire About {service.title}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </ScrollReveal>
    </section>
  );
};





