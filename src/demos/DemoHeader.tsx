import React, { useState } from 'react';
import { ArrowLeft, ChevronDown, Layers } from 'lucide-react';
import { DEMO_PROJECTS } from '../data/companyData';

interface DemoHeaderProps {
  currentDemoId: string;
  theme?: 'dark' | 'warm' | 'minimal' | 'tech';
}

export const DemoHeader: React.FC<DemoHeaderProps> = ({ currentDemoId }) => {
  const [isSwitcherOpen, setIsSwitcherOpen] = useState(false);
  const currentDemo = DEMO_PROJECTS.find((p) => p.id === currentDemoId) || DEMO_PROJECTS[0];

  return (
    <div className="sticky top-0 z-50 bg-gray-950/90 backdrop-blur-md border-b border-white/10 px-4 py-2.5">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Back to AIVION TECH Link */}
        <a
          href="/"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono tracking-wider text-cyan-400 hover:text-cyan-300 transition-colors py-1 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="font-semibold">← Back to AIVION TECH</span>
        </a>

        {/* Current Demo Tag and Switcher Dropdown */}
        <div className="relative flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 text-xs font-mono text-gray-400">
            <span className="text-gray-500">Live Client Demo:</span>
            <span className="text-white font-bold">{currentDemo.name}</span>
            <span className="text-gray-600">·</span>
            <span className="text-cyan-400/80">{currentDemo.category}</span>
          </div>

          <button
            onClick={() => setIsSwitcherOpen(!isSwitcherOpen)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono bg-gray-900 border border-white/15 hover:border-cyan-400/50 rounded text-gray-200 hover:text-white transition-all"
          >
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">Switch Demo</span>
            <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
          </button>

          {isSwitcherOpen && (
            <div className="absolute right-0 top-full mt-2 w-64 rounded-xl bg-gray-950 border border-white/15 shadow-2xl p-2 z-50">
              <div className="text-[10px] font-mono uppercase tracking-widest text-gray-500 px-3 py-1.5">
                All 8 AIVION TECH Demos
              </div>
              <div className="max-h-80 overflow-y-auto space-y-1">
                {DEMO_PROJECTS.map((demo) => {
                  const isActive = demo.id === currentDemoId;
                  return (
                    <a
                      key={demo.id}
                      href={demo.htmlPath}
                      onClick={() => setIsSwitcherOpen(false)}
                      className={`block px-3 py-2 rounded-lg text-xs transition-colors ${
                        isActive
                          ? 'bg-cyan-500/20 text-cyan-300 font-semibold'
                          : 'text-gray-300 hover:bg-gray-900 hover:text-white'
                      }`}
                    >
                      <div className="font-bold">{demo.name}</div>
                      <div className="text-[11px] text-gray-400 font-mono">{demo.category}</div>
                    </a>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
