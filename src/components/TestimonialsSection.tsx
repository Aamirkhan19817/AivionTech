import React from 'react';
import { ScrollReveal } from './ScrollReveal';
import { Star, Quote, Building2, ShieldCheck, Sparkles } from 'lucide-react';

interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  avatarInitials: string;
  rating: number;
  accent: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    quote:
      'AIVION TECH transformed our legacy operations platform into a fluid, sub-second reactive architecture. Their attention to mathematical precision and graphics fidelity is unmatched.',
    author: 'Marcus Vance',
    role: 'Chief Technology Officer',
    company: 'Vanguard Global Systems',
    avatarInitials: 'MV',
    rating: 5,
    accent: '#06b6d4',
  },
  {
    id: 'test-2',
    quote:
      'From 3D product visualization down to resilient payment pipelines, they executed our e-commerce platform ahead of schedule with flawless production stability.',
    author: 'Elena Rostova',
    role: 'VP of Digital Experience',
    company: 'Aura Spatial Commerce',
    avatarInitials: 'ER',
    rating: 5,
    accent: '#8b5cf6',
  },
  {
    id: 'test-3',
    quote:
      'The engineering leadership delivered intelligent machine learning workflows that directly cut our data triage latency by 68%. True enterprise software artisans.',
    author: 'Devon K. Patel',
    role: 'Head of Engineering',
    company: 'NeuralSync Technologies',
    avatarInitials: 'DP',
    rating: 5,
    accent: '#14b8a6',
  },
];

export const TestimonialsSection: React.FC = () => {
  return (
    <section id="testimonials" className="relative py-24 sm:py-32 bg-gray-950 border-t border-white/[0.04]">
      {/* Ambient background glow */}
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-600/10 blur-[130px] rounded-full pointer-events-none" />

      <ScrollReveal variant="3d-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <ScrollReveal variant="fade-up">
          <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
            <div className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.25em] text-cyan-400 uppercase mb-3">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Client Endorsements</span>
              <span className="text-gray-600">·</span>
              <span>Enterprise Trust</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              PROVEN RESULTS. TRUSTED PARTNERS.
            </h2>
            <p className="mt-3 text-base sm:text-lg text-gray-400">
              See what engineering leaders and founders say about collaborating with AIVION TECH.
            </p>
          </div>
        </ScrollReveal>

        {/* Testimonials Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {TESTIMONIALS.map((item, idx) => (
            <ScrollReveal
              key={item.id}
              variant="3d-stagger"
              delay={idx * 120}
              className="h-full"
            >
              <div className="group relative rounded-xl p-8 bg-gray-900/40 hover:bg-gray-900/70 border border-white/[0.06] hover:border-cyan-500/40 transition-all duration-300 transform hover:-translate-y-1 backdrop-blur-xl flex flex-col justify-between h-full shadow-lg">
                <div>
                  {/* Top Bar: Rating Stars + Quote Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-1">
                      {[...Array(item.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-cyan-400 fill-cyan-400" />
                      ))}
                    </div>
                    <div className="p-2 rounded-lg bg-gray-950/80 border border-white/10 group-hover:border-cyan-500/30 transition-colors">
                      <Quote className="w-4 h-4 text-cyan-400" />
                    </div>
                  </div>

                  {/* Quote Body */}
                  <p className="text-sm sm:text-base text-gray-300 leading-relaxed italic mb-8 font-normal">
                    "{item.quote}"
                  </p>
                </div>

                {/* Author Info */}
                <div className="pt-5 border-t border-white/[0.06] flex items-center gap-3.5">
                  <div
                    className="w-11 h-11 rounded-full bg-gradient-to-br from-cyan-500/20 to-purple-600/30 border border-cyan-400/40 flex items-center justify-center font-display font-bold text-xs text-white shrink-0 shadow-[0_0_12px_rgba(6,182,212,0.2)]"
                  >
                    {item.avatarInitials}
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-sm text-white group-hover:text-cyan-200 transition-colors">
                      {item.author}
                    </h3>
                    <div className="text-xs text-cyan-400/90 font-mono">
                      {item.role}
                    </div>
                    <div className="text-[11px] text-gray-400 flex items-center gap-1 mt-0.5">
                      <Building2 className="w-3 h-3 text-gray-500" />
                      <span>{item.company}</span>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Trust Badges Bar */}
        <ScrollReveal variant="fade-scale" delay={300}>
          <div className="mt-14 pt-8 border-t border-white/[0.06] flex flex-wrap items-center justify-center gap-8 sm:gap-12 text-xs font-mono uppercase text-gray-500">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>SOC2 Type II Compliant Architectures</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>100% Code Ownership & IP Transfer</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-purple-400" />
              <span>Dedicated High-Velocity Engineering Squads</span>
            </div>
          </div>
        </ScrollReveal>
      </ScrollReveal>
    </section>
  );
};
