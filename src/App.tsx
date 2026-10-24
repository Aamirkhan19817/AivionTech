import React, { useState, useEffect, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ServicesSection } from './components/ServicesSection';
import { FlowWaveCanvas } from './components/FlowWaveCanvas';
import { AboutSection } from './components/AboutSection';
import { TeamSection } from './components/TeamSection';
import { MirrorHallSection } from './components/MirrorHallSection';
import { TechSection } from './components/TechSection';
import { ProcessSection } from './components/ProcessSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { CustomCursor } from './components/CustomCursor';
import { LoadingScreen } from './components/LoadingScreen';
import { SectionTransition } from './components/SectionTransition';
import { SectionId } from './types/navigation';

// Import Demo components
import { NoorTable } from './demos/NoorTable';
import { VantaStore } from './demos/VantaStore';
import { FlowStack } from './demos/FlowStack';
import { NeuralCore } from './demos/NeuralCore';
import { PulseApp } from './demos/PulseApp';
import { Arcstone } from './demos/Arcstone';
import { VertexGroup } from './demos/VertexGroup';
import { MonoStudio } from './demos/MonoStudio';

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Read the hash from the URL and return a valid SectionId, or null */
function getSectionFromHash(): SectionId | null {
  const hash = window.location.hash.replace('#', '').toLowerCase() as SectionId;
  const valid: SectionId[] = [
    'home', 'services', 'about', 'team',
    'portfolio', 'technology', 'process', 'contact',
  ];
  return valid.includes(hash) ? hash : null;
}

/** Determine if the current URL is a demo route */
function getDemoFromPath(path: string, search: string): string | null {
  const normalizedPath = path.toLowerCase();
  const searchParams = new URLSearchParams(search);
  const demoQuery = searchParams.get('demo');

  if (normalizedPath.includes('/demos/restaurant') || normalizedPath.endsWith('restaurant.html') || demoQuery === 'restaurant') return 'restaurant';
  if (normalizedPath.includes('/demos/ecommerce') || normalizedPath.endsWith('ecommerce.html') || demoQuery === 'ecommerce') return 'ecommerce';
  if (normalizedPath.includes('/demos/saas') || normalizedPath.endsWith('saas.html') || demoQuery === 'saas') return 'saas';
  if (normalizedPath.includes('/demos/ai') || normalizedPath.endsWith('ai.html') || demoQuery === 'ai') return 'ai';
  if (normalizedPath.includes('/demos/mobile-app') || normalizedPath.endsWith('mobile-app.html') || demoQuery === 'mobile-app') return 'mobile-app';
  if (normalizedPath.includes('/demos/real-estate') || normalizedPath.endsWith('real-estate.html') || demoQuery === 'real-estate') return 'real-estate';
  if (normalizedPath.includes('/demos/corporate') || normalizedPath.endsWith('corporate.html') || demoQuery === 'corporate') return 'corporate';
  if (normalizedPath.includes('/demos/creative-studio') || normalizedPath.endsWith('creative-studio.html') || demoQuery === 'creative-studio') return 'creative-studio';
  return null;
}

// ─── Main App ─────────────────────────────────────────────────────────────────

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [currentSearch, setCurrentSearch] = useState(window.location.search);

  // Initialise activeSection from URL hash (supports direct links / browser back)
  const [activeSection, setActiveSection] = useState<SectionId>(
    () => getSectionFromHash() ?? 'home'
  );

  // Sync URL hash changes (browser back/forward) to active section
  useEffect(() => {
    const handleHashChange = () => {
      const section = getSectionFromHash();
      if (section) setActiveSection(section);
    };
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
      setCurrentSearch(window.location.search);
    };

    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('popstate', handleLocationChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, []);

  // Scroll to top of window whenever the active section changes so content always starts from the top
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [activeSection]);

  /** Navigate to a section: update state and push a hash URL so the browser Back button works */
  const handleNavigate = useCallback((section: SectionId) => {
    setActiveSection(section);
    // Update hash in the URL without full reload
    window.history.pushState(null, '', `#${section}`);
  }, []);

  // ─── Demo routing (stays the same) ────────────────────────────────────────
  const demoKey = getDemoFromPath(currentPath, currentSearch);

  if (demoKey === 'restaurant') return <NoorTable />;
  if (demoKey === 'ecommerce') return <VantaStore />;
  if (demoKey === 'saas') return <FlowStack />;
  if (demoKey === 'ai') return <NeuralCore />;
  if (demoKey === 'mobile-app') return <PulseApp />;
  if (demoKey === 'real-estate') return <Arcstone />;
  if (demoKey === 'corporate') return <VertexGroup />;
  if (demoKey === 'creative-studio') return <MonoStudio />;

  // ─── AIVION TECH MAIN HOMEPAGE ────────────────────────────────────────────
  return (
    <>
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      <div
        className="relative min-h-screen bg-[#030712] text-white selection:bg-cyan-500/30 font-sans"
        style={{
          opacity: isLoading ? 0 : 1,
          transition: 'opacity 0.5s ease-in-out',
        }}
      >
        {/* Custom Desktop Cursor */}
        <CustomCursor />

        {/* Navigation — always visible, receives active state */}
        <Navbar activeSection={activeSection} onNavigate={handleNavigate} />

        {/* ── Single-section view with cinematic transitions ─────────────── */}
        {/*
          Each section is wrapped in SectionTransition so only the active one
          is rendered in the DOM. AnimatePresence handles enter/exit animations.
          The outer container keeps the navbar from shifting.
        */}
        <div className="relative overflow-x-hidden">

          {/* HOME */}
          <SectionTransition sectionId="home" activeSection={activeSection}>
            <HeroSection onNavigate={(id) => handleNavigate(id as SectionId)} />
          </SectionTransition>

          {/* SERVICES */}
          <SectionTransition sectionId="services" activeSection={activeSection}>
            <div className="min-h-screen">
              <ServicesSection onNavigate={(id) => handleNavigate(id as SectionId)} />
            </div>
          </SectionTransition>

          {/* ABOUT */}
          <SectionTransition sectionId="about" activeSection={activeSection}>
            {/* Keep the decorative flow canvas transition visible on About */}
            <div className="min-h-screen">
              <FlowWaveCanvas />
              <AboutSection />
            </div>
          </SectionTransition>

          {/* TEAM */}
          <SectionTransition sectionId="team" activeSection={activeSection}>
            <div className="min-h-screen">
              <TeamSection />
            </div>
          </SectionTransition>

          {/* PORTFOLIO */}
          <SectionTransition sectionId="portfolio" activeSection={activeSection}>
            <div className="min-h-screen">
              <MirrorHallSection />
            </div>
          </SectionTransition>

          {/* TECHNOLOGY */}
          <SectionTransition sectionId="technology" activeSection={activeSection}>
            <div className="min-h-screen">
              <TechSection />
            </div>
          </SectionTransition>

          {/* PROCESS */}
          <SectionTransition sectionId="process" activeSection={activeSection}>
            <div className="min-h-screen">
              <ProcessSection />
            </div>
          </SectionTransition>

          {/* CONTACT */}
          <SectionTransition sectionId="contact" activeSection={activeSection}>
            <div className="min-h-screen">
              <TestimonialsSection />
              <ContactSection />
            </div>
          </SectionTransition>
        </div>

        {/* Footer is always visible below the active section */}
        <Footer onNavigate={handleNavigate} />
      </div>
    </>
  );
}
