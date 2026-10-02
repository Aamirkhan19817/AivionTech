import React from 'react';
import { TECH_STACK } from '../data/companyData';
import { TechOrbitCanvas } from './TechOrbitCanvas';
import { Code2, Server, Smartphone, Cpu, Database } from 'lucide-react';

const categoryIcons: Record<string, React.ReactNode> = {
  Frontend: <Code2 className="w-5 h-5 text-cyan-400" />,
  Backend: <Server className="w-5 h-5 text-blue-400" />,
  Mobile: <Smartphone className="w-5 h-5 text-teal-400" />,
  AI: <Cpu className="w-5 h-5 text-indigo-400" />,
  Database: <Database className="w-5 h-5 text-sky-400" />,
};

export const TechSection: React.FC = () => {
  return (
    <section id="technology" className="relative py-24 sm:py-32 bg-gray-950 overflow-hidden border-t border-white/[0.04]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-xs font-mono tracking-[0.25em] text-cyan-400 uppercase mb-3">
            TECHNICAL ARSENAL
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            TECHNOLOGY WE WORK WITH
          </h2>
          <p className="mt-3 text-base text-gray-400">
            Engineered with modern, battle-tested tools across full-stack systems, cross-platform mobile, and machine intelligence.
          </p>
        </div>

        {/* 3D Technology Orbit Visualization */}
        <div className="relative mb-12">
          <TechOrbitCanvas />
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center bg-gray-950/80 px-4 py-1.5 rounded-full border border-cyan-500/30 backdrop-blur-md">
              <span className="font-display font-bold text-xs tracking-widest text-cyan-300">
                AIVION TECH CORE
              </span>
            </div>
          </div>
        </div>

        {/* 5 Capability Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
          {Object.entries(TECH_STACK).map(([category, items]) => (
            <div
              key={category}
              className="p-6 rounded-xl bg-gray-900/40 border border-white/[0.06] hover:border-cyan-500/40 hover:bg-gray-900/70 transition-all duration-200"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-gray-950/80 border border-white/[0.08]">
                  {categoryIcons[category]}
                </div>
                <h3 className="font-display font-bold text-white text-base">
                  {category}
                </h3>
              </div>

              <div className="space-y-2">
                {items.map((tech) => (
                  <div
                    key={tech}
                    className="text-xs font-mono text-gray-300 bg-gray-950/50 px-3 py-1.5 rounded border border-white/[0.04] flex items-center justify-between"
                  >
                    <span>{tech}</span>
                    <span className="w-1 h-1 rounded-full bg-cyan-400" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
