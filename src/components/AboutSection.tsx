import React from 'react';
import { COMPANY_INFO, ABOUT_PILLARS } from '../data/companyData';
import { AboutCanvas } from './AboutCanvas';
import { CheckCircle2 } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="relative py-24 sm:py-32 bg-gray-950/80 border-t border-white/[0.04]">
      <ScrollReveal variant="3d-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Editorial Content */}
          <div className="lg:col-span-7">
            <ScrollReveal variant="fade-up">
              <div className="text-xs font-mono tracking-[0.25em] text-cyan-400 uppercase mb-3">
                About AIVION TECH
              </div>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-6">
                {COMPANY_INFO.aboutHeading}
              </h2>
              <p className="text-base sm:text-lg text-gray-300 font-normal leading-relaxed mb-10">
                {COMPANY_INFO.aboutText}
              </p>
            </ScrollReveal>

            {/* 6 Core Focus Pillars with Staggered Scroll Reveal */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-6 border-t border-white/[0.08]">
              {ABOUT_PILLARS.map((pillar, index) => (
                <ScrollReveal
                  key={pillar.title}
                  variant="3d-stagger"
                  delay={index * 80}
                >
                  <div className="p-4 rounded-lg bg-gray-900/40 border border-white/[0.05] hover:border-cyan-500/30 transition-colors h-full">
                    <div className="flex items-center gap-2.5 mb-1.5">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                      <h3 className="font-display font-semibold text-white text-sm tracking-wide">
                        {pillar.title}
                      </h3>
                    </div>
                    <p className="text-xs text-gray-400 leading-relaxed pl-6">
                      {pillar.desc}
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>

          {/* Right Column: Floating 3D Digital Core */}
          <div className="lg:col-span-5 relative flex flex-col items-center justify-center">
            <ScrollReveal variant="fade-scale" delay={200} className="w-full">
              <div className="relative w-full aspect-square max-w-md mx-auto rounded-2xl bg-gradient-to-b from-gray-900/60 to-gray-950/80 border border-white/[0.08] shadow-2xl p-4 flex flex-col items-center justify-center overflow-hidden">
                <div className="absolute top-4 left-4 z-10 font-mono text-[10px] tracking-widest text-cyan-400/80 uppercase">
                  AIVION DIGITAL CORE
                </div>
                <div className="absolute bottom-4 right-4 z-10 font-mono text-[10px] tracking-widest text-gray-500">
                  AXIS // 3D KINETIC
                </div>

                {/* 3D WebGL Digital Core Canvas */}
                <AboutCanvas />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
};
