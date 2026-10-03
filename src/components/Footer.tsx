import React from 'react';
import { COMPANY_INFO, SERVICES } from '../data/companyData';
import { ArrowUp, Mail, Phone, MapPin } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'About', href: '#about' },
    { name: 'Team', href: '#team' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Technology', href: '#technology' },
    { name: 'Process', href: '#process' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <footer className="relative bg-gray-950 border-t border-white/[0.08] pt-16 pb-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <ScrollReveal variant="fade-up" delay={0}>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-3 h-3 rounded-sm bg-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.8)]" />
                <span className="font-display text-2xl font-bold tracking-wider text-white">
                  {COMPANY_INFO.name}
                </span>
              </div>
              <div className="text-xs font-mono tracking-[0.25em] text-cyan-400 mb-4">
                {COMPANY_INFO.subtitle}
              </div>
              <div className="text-sm font-serif italic text-gray-300 mb-6">
                "{COMPANY_INFO.tagline}"
              </div>
              <p className="text-xs text-gray-400 leading-relaxed max-w-sm">
                AIVION TECH builds modern websites, mobile applications, AI solutions and custom software engineered for enterprise scale and mathematical precision.
              </p>
            </ScrollReveal>
          </div>

          {/* Quick Links */}
          <div>
            <ScrollReveal variant="fade-up" delay={100}>
              <div className="text-xs font-mono tracking-widest text-cyan-400 uppercase mb-4">
                Quick Links
              </div>
              <ul className="space-y-2.5">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-xs text-gray-400 hover:text-white transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          </div>

          {/* Services */}
          <div>
            <ScrollReveal variant="fade-up" delay={200}>
              <div className="text-xs font-mono tracking-widest text-cyan-400 uppercase mb-4">
                Services
              </div>
              <ul className="space-y-2.5">
                {SERVICES.map((s) => (
                  <li key={s.number}>
                    <a
                      href="#services"
                      className="text-xs text-gray-400 hover:text-white transition-colors"
                    >
                      {s.title}
                    </a>
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          </div>

          {/* Contact Details */}
          <div>
            <ScrollReveal variant="fade-up" delay={300}>
              <div className="text-xs font-mono tracking-widest text-cyan-400 uppercase mb-4">
                Contact
              </div>
              <div className="space-y-3 text-xs text-gray-400">
                <div className="flex items-start gap-2.5">
                  <Mail className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                  <a
                    href={`mailto:${COMPANY_INFO.email}`}
                    className="hover:text-cyan-300 transition-colors break-all"
                  >
                    {COMPANY_INFO.email}
                  </a>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <a
                    href={`tel:${COMPANY_INFO.phone}`}
                    className="hover:text-cyan-300 transition-colors"
                  >
                    {COMPANY_INFO.phone}
                  </a>
                </div>
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                  <span>{COMPANY_INFO.address}</span>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* Bottom Bar */}
        <ScrollReveal variant="fade-in" delay={400}>
          <div className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-gray-400 font-mono">
              © {new Date().getFullYear()} {COMPANY_INFO.name}. All rights reserved.
            </div>

            <div className="flex items-center gap-6">
              <span className="text-[11px] font-mono text-gray-400">
                SOFTWARE HOUSE · {COMPANY_INFO.tagline}
              </span>
              <button
                onClick={scrollToTop}
                aria-label="Scroll to top"
                className="p-2 rounded-full border border-white/10 hover:border-cyan-400/50 text-gray-400 hover:text-cyan-400 transition-colors"
              >
                <ArrowUp className="w-4 h-4" />
              </button>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </footer>
  );
};
