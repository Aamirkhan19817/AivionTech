import React from 'react';
import { HeroCanvas } from './HeroCanvas';
import { ArrowDown, Sparkles, ChevronRight } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* 3D WebGL Multi-Layered Hero Canvas with integrated radial darkening */}
      <HeroCanvas />

      {/* Hero DOM Content Layer - High Visual Priority */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-16 sm:py-24">
        {/* Futuristic Sub-Tag / Kicker (Unboxed, clean) */}
        <div className="inline-flex items-center gap-2 mb-6 text-xs sm:text-sm font-mono tracking-[0.2em] text-cyan-400/90 uppercase">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          <span>Next-Generation Software House</span>
          <span className="text-gray-600">·</span>
          <span>Digital Laboratory</span>
        </div>

        {/* Main Heading: YOUR VISION. OUR CODE. */}
        <h1 className="font-display font-extrabold text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-white mb-6 leading-[1.08] select-none">
          <span className="block drop-shadow-[0_2px_24px_rgba(0,0,0,0.9)]">
            YOUR VISION.
          </span>
          <span className="block bg-gradient-to-r from-white via-cyan-100 to-cyan-400 bg-clip-text text-transparent drop-shadow-[0_4px_30px_rgba(6,182,212,0.4)]">
            OUR CODE.
          </span>
        </h1>

        {/* Supporting Text */}
        <p className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-gray-300 font-normal leading-relaxed mb-10 text-balance drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)]">
          We design and build modern digital experiences, intelligent applications, and powerful software solutions.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5">
          <button
            onClick={() => scrollTo('portfolio')}
            className="w-full sm:w-auto px-8 py-3.5 text-sm font-semibold tracking-wide text-gray-950 bg-gradient-to-r from-cyan-400 to-teal-400 hover:from-cyan-300 hover:to-teal-300 rounded-sm shadow-[0_0_25px_rgba(6,182,212,0.45)] hover:shadow-[0_0_35px_rgba(6,182,212,0.6)] transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2"
          >
            <span>Explore Our Work</span>
            <ChevronRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => scrollTo('contact')}
            className="w-full sm:w-auto px-8 py-3.5 text-sm font-semibold tracking-wide text-gray-200 border border-white/20 hover:border-cyan-400/60 bg-gray-900/60 hover:bg-gray-900/80 backdrop-blur-md rounded-sm transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0"
          >
            Start a Project
          </button>
        </div>

        {/* Scroll Indicator */}
        <div className="mt-16 sm:mt-20 flex flex-col items-center gap-2 opacity-60 hover:opacity-100 transition-opacity">
          <span className="text-[11px] font-mono tracking-widest uppercase text-gray-400">Scroll to Explore</span>
          <button
            onClick={() => scrollTo('services')}
            aria-label="Scroll to services"
            className="p-1.5 rounded-full border border-white/10 hover:border-cyan-400/40 text-cyan-400 transition-colors"
          >
            <ArrowDown className="w-4 h-4 animate-bounce" />
          </button>
        </div>
      </div>
    </section>
  );
};
