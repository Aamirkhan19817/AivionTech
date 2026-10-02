import React from 'react';
import { PROCESS_STEPS } from '../data/companyData';
import { Compass, Palette, Terminal, Rocket } from 'lucide-react';

const stepIcons: Record<string, React.ReactNode> = {
  '01': <Compass className="w-5 h-5 text-cyan-400" />,
  '02': <Palette className="w-5 h-5 text-blue-400" />,
  '03': <Terminal className="w-5 h-5 text-teal-400" />,
  '04': <Rocket className="w-5 h-5 text-sky-400" />,
};

export const ProcessSection: React.FC = () => {
  return (
    <section id="process" className="relative py-24 sm:py-32 bg-gray-950/70 overflow-hidden border-t border-white/[0.04]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="text-xs font-mono tracking-[0.25em] text-cyan-400 uppercase mb-3">
            METHODOLOGY
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            DEVELOPMENT PROCESS
          </h2>
          <p className="mt-3 text-base text-gray-400">
            A disciplined four-phase pipeline transforming complex vision into battle-tested production software.
          </p>
        </div>

        {/* 4 Process Stages with Connected Line */}
        <div className="relative">
          {/* Animated Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 -translate-y-8 bg-gradient-to-r from-cyan-500/20 via-cyan-400/60 to-cyan-500/20 z-0">
            <div className="absolute inset-0 bg-cyan-400/30 blur-[2px]" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 relative z-10">
            {PROCESS_STEPS.map((stage) => (
              <div
                key={stage.step}
                className="group relative p-6 sm:p-8 rounded-xl bg-gray-900/60 border border-white/[0.08] hover:border-cyan-400/50 backdrop-blur-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Step Badge & Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-2xl font-bold text-cyan-400/90 group-hover:text-cyan-300">
                      {stage.step}
                    </span>
                    <div className="w-10 h-10 rounded-lg bg-gray-950/90 border border-white/10 flex items-center justify-center group-hover:border-cyan-400/40">
                      {stepIcons[stage.step]}
                    </div>
                  </div>

                  {/* Stage Title */}
                  <h3 className="font-display text-xl font-bold text-white mb-2 tracking-wide">
                    {stage.title}
                  </h3>

                  {/* Short Summary */}
                  <p className="text-cyan-300/90 text-xs font-mono mb-4 leading-relaxed">
                    {stage.description}
                  </p>

                  {/* Detailed Description */}
                  <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                    {stage.detail}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                  <span className="text-[11px] font-mono text-gray-400 tracking-wider">
                    PHASE {stage.step} DELIVERABLE
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
