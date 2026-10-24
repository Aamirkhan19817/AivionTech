import React, { useState } from 'react';
import { DEMO_PROJECTS } from '../data/companyData';
import { MirrorHallCanvas } from './MirrorHallCanvas';
import { ExternalLink, Layers, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

export const MirrorHallSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeProject = DEMO_PROJECTS[activeIndex];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? DEMO_PROJECTS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === DEMO_PROJECTS.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="portfolio" className="relative py-24 sm:py-36 bg-gray-950 border-t border-white/[0.04]">
      {/* 3D WebGL Mirror Hall Environment (Reflective floor, floating glass portals, ambient fog) */}
      <MirrorHallCanvas activeIndex={activeIndex} />

      <ScrollReveal variant="3d-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <ScrollReveal variant="fade-up">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.25em] text-cyan-400 uppercase mb-3">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Digital Exhibition</span>
              <span className="text-gray-600">·</span>
              <span>8 Live Production Demos</span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight">
              MIRROR HALL
            </h2>
            <p className="mt-3 text-base sm:text-lg text-gray-400">
              Explore Our Digital Work
            </p>
          </div>
        </ScrollReveal>

        {/* Exhibition Selector Ribbon (Interactive 8 project tabs) */}
        <ScrollReveal variant="fade-in" delay={100}>
          <div className="flex items-center justify-start sm:justify-center overflow-x-auto pb-4 mb-8 sm:mb-12 gap-2 no-scrollbar px-2">
            {DEMO_PROJECTS.map((project, idx) => {
              const isActive = idx === activeIndex;
              return (
                <button
                  key={project.id}
                  onClick={() => setActiveIndex(idx)}
                  className={`px-4 py-2 text-xs font-mono tracking-wider whitespace-nowrap rounded-md transition-all duration-200 flex items-center gap-2 ${
                    isActive
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/60 shadow-[0_0_15px_rgba(6,182,212,0.25)]'
                      : 'text-gray-400 hover:text-white bg-gray-900/40 hover:bg-gray-900/70 border border-white/[0.05]'
                  }`}
                >
                  <span className="text-[10px] text-gray-500">0{idx + 1}</span>
                  <span>{project.name}</span>
                </button>
              );
            })}
          </div>
        </ScrollReveal>

        {/* Central Spotlight Exhibition Stage */}
        <ScrollReveal variant="fade-scale" delay={200}>
          <div className="relative max-w-5xl mx-auto">
            {/* Controls: Prev / Next */}
            <div className="hidden sm:flex absolute -left-12 top-1/2 -translate-y-1/2 z-20">
              <button
                onClick={handlePrev}
                aria-label="Previous exhibition"
                className="p-3 rounded-full bg-gray-900/80 border border-white/10 hover:border-cyan-400/50 text-gray-300 hover:text-cyan-400 transition-all backdrop-blur-md"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            </div>
            <div className="hidden sm:flex absolute -right-12 top-1/2 -translate-y-1/2 z-20">
              <button
                onClick={handleNext}
                aria-label="Next exhibition"
                className="p-3 rounded-full bg-gray-900/80 border border-white/10 hover:border-cyan-400/50 text-gray-300 hover:text-cyan-400 transition-all backdrop-blur-md"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Active Featured Project Card */}
            <div className="relative rounded-2xl bg-gray-900/85 border border-cyan-500/30 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(6,182,212,0.15)] overflow-hidden transition-all duration-300">
              {/* Top Bar inside Card */}
              <div className="px-6 py-4 bg-gray-950/70 border-b border-white/[0.08] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-red-500/60" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500/60" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/60" />
                  <span className="text-xs font-mono text-gray-400 ml-2 hidden sm:inline">
                    MIRROR HALL // PORTAL {activeIndex + 1} OF 8
                  </span>
                </div>
                <div className="text-xs font-mono tracking-widest text-cyan-400">
                  {activeProject.category}
                </div>
              </div>

              {/* Project Content Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-10 items-center">
                {/* Left Column: Visual Exhibition Panel */}
                <div className="lg:col-span-6 relative group">
                  <div className="relative rounded-xl overflow-hidden aspect-video border border-white/10 bg-gray-950 shadow-2xl">
                    {activeProject.image ? (
                      <img
                        src={activeProject.image}
                        alt={activeProject.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      /* High-tech styled abstract preview for projects without generated photo */
                      <div className="w-full h-full bg-gradient-to-br from-gray-900 via-cyan-950/40 to-gray-950 flex flex-col items-center justify-center p-6 text-center">
                        <Layers className="w-12 h-12 text-cyan-400/60 mb-3 animate-pulse" />
                        <div className="font-display font-bold text-xl text-white">
                          {activeProject.name}
                        </div>
                        <div className="text-xs font-mono text-cyan-400/70 mt-1">
                          {activeProject.tagline}
                        </div>
                      </div>
                    )}

                    {/* Glass reflective overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-transparent to-transparent pointer-events-none" />

                    {/* Bottom tag on image */}
                    <div className="absolute bottom-3 left-3 text-[11px] font-mono tracking-wider text-cyan-300 bg-gray-950/80 px-2.5 py-1 rounded backdrop-blur-sm border border-white/10">
                      {activeProject.style}
                    </div>
                  </div>
                </div>

                {/* Right Column: Project Details & Action */}
                <div className="lg:col-span-6 flex flex-col justify-between">
                  <div>
                    <div className="text-xs font-mono tracking-widest text-gray-400 uppercase mb-1">
                      EXHIBITION DEMO 0{activeIndex + 1}
                    </div>
                    <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white mb-2">
                      {activeProject.name}
                    </h3>
                    <p className="text-cyan-400 text-sm font-medium mb-4">
                      {activeProject.tagline}
                    </p>
                    <p className="text-gray-300 text-sm leading-relaxed mb-6">
                      {activeProject.description}
                    </p>

                    {/* Highlights */}
                    <div className="space-y-2 mb-8">
                      <span className="text-xs font-mono tracking-wider text-gray-400 uppercase">
                        Architecture & Features:
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                        {activeProject.highlights.map((item, i) => (
                          <div key={i} className="text-xs text-gray-300 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* CRITICAL DEMO LINK */}
                  <div className="pt-4 border-t border-white/[0.08] flex flex-wrap items-center gap-4">
                    <a
                      href={activeProject.htmlPath}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2.5 px-6 py-3 text-xs sm:text-sm font-semibold tracking-wider uppercase text-gray-950 bg-gradient-to-r from-cyan-400 to-teal-400 hover:from-cyan-300 hover:to-teal-300 rounded-sm shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all duration-200 transform hover:-translate-y-0.5"
                    >
                      <span>View Demo</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>

                    <a
                      href={activeProject.path}
                      className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-cyan-400 transition-colors py-2 px-3"
                    >
                      <span>Open in this tab</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Prev / Next Buttons */}
            <div className="flex sm:hidden items-center justify-between mt-4">
              <button
                onClick={handlePrev}
                className="px-4 py-2 text-xs font-mono text-gray-300 bg-gray-900 border border-white/10 rounded flex items-center gap-1"
              >
                <ChevronLeft className="w-4 h-4" /> Previous
              </button>
              <span className="text-xs font-mono text-gray-400">
                {activeIndex + 1} / {DEMO_PROJECTS.length}
              </span>
              <button
                onClick={handleNext}
                className="px-4 py-2 text-xs font-mono text-gray-300 bg-gray-900 border border-white/10 rounded flex items-center gap-1"
              >
                Next <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </ScrollReveal>

        {/* 8 Demos Quick Grid */}
        <ScrollReveal variant="fade-up" delay={250}>
          <div className="mt-20 pt-16 border-t border-white/[0.06]">
            <div className="text-center mb-10">
              <h3 className="font-display text-xl font-bold text-white mb-2">
                All 8 Demo Environments
              </h3>
              <p className="text-xs font-mono text-gray-400 uppercase tracking-widest">
                Direct Access to Real Working Demonstrations
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {DEMO_PROJECTS.map((project, idx) => (
                <a
                  key={project.id}
                  href={project.htmlPath}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setActiveIndex(idx)}
                  className="group p-3.5 rounded-xl bg-gray-900/40 hover:bg-gray-900/80 border border-white/[0.06] hover:border-cyan-400/50 transition-all duration-200 flex flex-col justify-between"
                >
                  <div>
                    <div className="relative aspect-video rounded-lg overflow-hidden mb-3 bg-gray-950 border border-white/5">
                      {project.image && (
                        <img
                          src={project.image}
                          alt={project.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          referrerPolicy="no-referrer"
                        />
                      )}
                      <div className="absolute top-2 left-2 text-[10px] font-mono text-cyan-300 bg-black/70 px-1.5 py-0.5 rounded backdrop-blur-xs border border-white/10">
                        0{idx + 1}
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-[11px] font-mono text-gray-500 mb-1">
                      <span>{project.category}</span>
                      <ExternalLink className="w-3 h-3 text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="font-display font-bold text-sm text-white group-hover:text-cyan-300 transition-colors">
                      {project.name}
                    </div>
                  </div>
                  <div className="mt-3 text-[10px] font-mono text-cyan-400/90 tracking-wider flex items-center justify-between pt-2 border-t border-white/5">
                    <span>Launch Demo</span>
                    <span>→</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </ScrollReveal>
    </section>
  );
};
