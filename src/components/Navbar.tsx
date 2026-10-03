import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  onNavigate?: (id: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'About', href: '#about' },
    { name: 'Team', href: '#team' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Technology', href: '#technology' },
    { name: 'Process', href: '#process' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleLinkClick = (href: string) => {
    setIsMobileMenuOpen(false);
    if (onNavigate) {
      onNavigate(href.replace('#', ''));
    } else {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-gray-950/80 backdrop-blur-md border-b border-white/[0.08] shadow-2xl py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Lockup */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleLinkClick('#home');
          }}
          className="group flex flex-col focus-visible:outline-none"
        >
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-sm bg-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.8)] group-hover:rotate-45 transition-transform duration-300" />
            <span className="font-display text-lg sm:text-xl font-bold tracking-wider text-white">
              AIVION TECH
            </span>
          </div>
          <span className="text-[10px] tracking-[0.25em] text-cyan-400/80 font-mono ml-4 -mt-0.5">
            SOFTWARE HOUSE
          </span>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick(link.href);
              }}
              className="relative text-sm text-gray-400 hover:text-white transition-colors duration-200 py-1"
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-400 transition-all duration-200 hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Primary CTA Button */}
        <div className="hidden sm:flex items-center">
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('#contact');
            }}
            className="group relative inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold tracking-wider uppercase text-cyan-300 border border-cyan-500/30 hover:border-cyan-400 bg-cyan-950/20 hover:bg-cyan-500/10 rounded-sm transition-all duration-200"
          >
            <span>Let's Build</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex items-center lg:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="p-2 text-gray-400 hover:text-white rounded-md focus-visible:outline-none"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-gray-950/95 backdrop-blur-xl border-b border-white/10 px-6 py-5 transition-all">
          <nav className="flex flex-col space-y-3.5">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.href);
                }}
                className="text-base text-gray-300 hover:text-cyan-400 transition-colors py-1"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-3 border-t border-white/10">
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick('#contact');
                }}
                className="w-full text-center block py-2.5 px-4 text-xs font-semibold tracking-wider uppercase text-cyan-300 border border-cyan-500/40 bg-cyan-950/30 rounded-sm"
              >
                Let's Build
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};





