import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { SectionId, NAV_LINKS } from '../types/navigation';

interface NavbarProps {
  activeSection: SectionId;
  onNavigate: (section: SectionId) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredSection, setHoveredSection] = useState<SectionId | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (id: SectionId) => {
    setIsMobileMenuOpen(false);
    onNavigate(id);
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#030712]/90 backdrop-blur-xl border-b border-white/[0.08] shadow-[0_4px_30px_rgba(0,0,0,0.7)] py-3'
          : 'bg-[#030712]/75 backdrop-blur-md border-b border-white/[0.04] py-4 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Lockup */}
        <button
          onClick={() => handleLinkClick('home')}
          className="group flex flex-col items-start focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-sm text-left"
          aria-label="AIVION TECH — Go to Home section"
        >
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex rounded-sm h-2.5 w-2.5 bg-cyan-400 shadow-[0_0_12px_rgba(6,182,212,1)] group-hover:rotate-45 transition-transform duration-300" />
            </span>
            <span className="font-display text-lg sm:text-xl font-bold tracking-wider text-white group-hover:text-cyan-200 transition-colors">
              AIVION TECH
            </span>
          </div>
          <span className="text-[10px] tracking-[0.28em] text-cyan-400/80 font-mono ml-5 -mt-0.5 group-hover:text-cyan-300 transition-colors">
            SOFTWARE HOUSE
          </span>
        </button>

        {/* Desktop Nav Links */}
        <nav
          className="hidden lg:flex items-center gap-1.5 p-1 rounded-lg bg-gray-950/40 border border-white/[0.05] backdrop-blur-lg"
          aria-label="Primary Navigation"
        >
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.id;
            const isHovered = hoveredSection === link.id;

            return (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                onMouseEnter={() => setHoveredSection(link.id)}
                onMouseLeave={() => setHoveredSection(null)}
                className={`group relative px-3.5 py-1.5 text-xs font-mono tracking-wider transition-all duration-200 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 overflow-hidden ${
                  isActive
                    ? 'text-cyan-200 font-medium'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {/* 1. Active Persistent Glass Pill Background */}
                {isActive && (
                  <motion.div
                    layoutId="activeNavPill"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    className="absolute inset-0 bg-cyan-500/10 border border-cyan-400/30 rounded-md shadow-[inset_0_0_12px_rgba(6,182,212,0.18)]"
                  />
                )}

                {/* 2. Hover Background Highlight (if not active) */}
                {!isActive && (
                  <div className="absolute inset-0 bg-white/[0.04] border border-cyan-400/20 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none" />
                )}

                {/* 3. Futuristic Moving Light Sweep Beam on Hover */}
                <span
                  className="absolute inset-0 -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-700 ease-out bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent pointer-events-none"
                  aria-hidden="true"
                />

                {/* 4. Text Content with Lift on Hover & Text Glow */}
                <span
                  className={`relative z-10 block transition-transform duration-200 ease-out ${
                    isHovered ? '-translate-y-[2px]' : 'translate-y-0'
                  } ${
                    isActive
                      ? '[text-shadow:0_0_12px_rgba(6,182,212,0.65)]'
                      : 'group-hover:[text-shadow:0_0_10px_rgba(6,182,212,0.5)]'
                  }`}
                >
                  {link.name}
                </span>

                {/* 5. Active Cyan Glowing Underline (Animated via Motion) */}
                {isActive && (
                  <motion.div
                    layoutId="activeNavUnderline"
                    transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                    className="absolute bottom-0 inset-x-2 h-[2.5px] bg-gradient-to-r from-cyan-400 via-teal-300 to-cyan-400 rounded-full shadow-[0_0_10px_rgba(6,182,212,0.95),0_0_18px_rgba(6,182,212,0.5)] z-20"
                  />
                )}

                {/* 6. Hover Expanding Underline (for Inactive Items) */}
                {!isActive && (
                  <span
                    className="absolute bottom-0 inset-x-2 h-[2px] bg-gradient-to-r from-cyan-500/80 via-cyan-300 to-cyan-500/80 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-250 ease-out origin-center shadow-[0_0_8px_rgba(6,182,212,0.8)] z-10"
                    aria-hidden="true"
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Primary CTA Button ("Let's Build ↗") */}
        <div className="hidden sm:flex items-center">
          <button
            onClick={() => handleLinkClick('contact')}
            className={`group relative inline-flex items-center gap-2 px-5 py-2 text-xs font-mono font-semibold tracking-wider uppercase rounded-sm transition-all duration-300 overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
              activeSection === 'contact'
                ? 'text-cyan-200 bg-cyan-950/60 border border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.4)]'
                : 'text-cyan-300 bg-cyan-950/30 border border-cyan-500/30 hover:border-cyan-400 hover:bg-cyan-500/10 hover:shadow-[0_0_15px_rgba(6,182,212,0.25)] hover:-translate-y-0.5'
            }`}
          >
            {/* Shimmer sweep effect */}
            <span
              className="absolute inset-0 -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-700 ease-out bg-gradient-to-r from-transparent via-cyan-400/25 to-transparent pointer-events-none"
              aria-hidden="true"
            />
            <Sparkles className="w-3 h-3 text-cyan-400 animate-pulse" />
            <span>Let's Build</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex items-center lg:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isMobileMenuOpen}
            className="p-2 text-gray-300 hover:text-white rounded-md border border-white/10 hover:border-cyan-400/50 bg-gray-950/60 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5 text-cyan-400" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu (Animated with Motion) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden overflow-hidden bg-gray-950/98 backdrop-blur-2xl border-b border-cyan-500/20 shadow-2xl"
          >
            <nav className="flex flex-col p-5 space-y-2" aria-label="Mobile Navigation">
              {NAV_LINKS.map((link, idx) => {
                const isActive = activeSection === link.id;

                return (
                  <motion.button
                    key={link.id}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.03, duration: 0.2 }}
                    onClick={() => handleLinkClick(link.id)}
                    className={`flex items-center justify-between w-full px-4 py-3 rounded-md text-sm font-mono tracking-wider transition-all duration-200 text-left ${
                      isActive
                        ? 'bg-cyan-500/15 text-cyan-300 border-l-4 border-cyan-400 shadow-[inset_0_0_12px_rgba(6,182,212,0.15)] font-semibold'
                        : 'text-gray-300 hover:text-white hover:bg-white/[0.04]'
                    }`}
                  >
                    <span>{link.name}</span>
                    {isActive ? (
                      <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,1)]" />
                    ) : (
                      <span className="text-[11px] text-gray-600">0{idx + 1}</span>
                    )}
                  </motion.button>
                );
              })}

              {/* Mobile CTA */}
              <div className="pt-3 mt-2 border-t border-white/10">
                <button
                  onClick={() => handleLinkClick('contact')}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 text-xs font-mono font-semibold tracking-wider uppercase text-gray-950 bg-gradient-to-r from-cyan-400 to-teal-300 rounded-sm shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:brightness-110 transition-all"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Start a Project · Let's Build</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
