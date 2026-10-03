import React, { useState, useEffect } from 'react';
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

// Import Demo components
import { NoorTable } from './demos/NoorTable';
import { VantaStore } from './demos/VantaStore';
import { FlowStack } from './demos/FlowStack';
import { NeuralCore } from './demos/NeuralCore';
import { PulseApp } from './demos/PulseApp';
import { Arcstone } from './demos/Arcstone';
import { VertexGroup } from './demos/VertexGroup';
import { MonoStudio } from './demos/MonoStudio';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [currentSearch, setCurrentSearch] = useState(window.location.search);

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
      setCurrentSearch(window.location.search);
    };

    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  // Determine if a specific demo route is requested
  const searchParams = new URLSearchParams(currentSearch);
  const demoQuery = searchParams.get('demo');

  const normalizedPath = currentPath.toLowerCase();

  // EXPLICIT DEMO ROUTING:
  // Valid demo routes MUST NEVER fall back to the AIVION TECH homepage.
  if (
    normalizedPath.includes('/demos/restaurant') ||
    normalizedPath.endsWith('restaurant.html') ||
    demoQuery === 'restaurant'
  ) {
    return <NoorTable />;
  }

  if (
    normalizedPath.includes('/demos/ecommerce') ||
    normalizedPath.endsWith('ecommerce.html') ||
    demoQuery === 'ecommerce'
  ) {
    return <VantaStore />;
  }

  if (
    normalizedPath.includes('/demos/saas') ||
    normalizedPath.endsWith('saas.html') ||
    demoQuery === 'saas'
  ) {
    return <FlowStack />;
  }

  if (
    normalizedPath.includes('/demos/ai') ||
    normalizedPath.endsWith('ai.html') ||
    demoQuery === 'ai'
  ) {
    return <NeuralCore />;
  }

  if (
    normalizedPath.includes('/demos/mobile-app') ||
    normalizedPath.endsWith('mobile-app.html') ||
    demoQuery === 'mobile-app'
  ) {
    return <PulseApp />;
  }

  if (
    normalizedPath.includes('/demos/real-estate') ||
    normalizedPath.endsWith('real-estate.html') ||
    demoQuery === 'real-estate'
  ) {
    return <Arcstone />;
  }

  if (
    normalizedPath.includes('/demos/corporate') ||
    normalizedPath.endsWith('corporate.html') ||
    demoQuery === 'corporate'
  ) {
    return <VertexGroup />;
  }

  if (
    normalizedPath.includes('/demos/creative-studio') ||
    normalizedPath.endsWith('creative-studio.html') ||
    demoQuery === 'creative-studio'
  ) {
    return <MonoStudio />;
  }

  // AIVION TECH MAIN HOMEPAGE
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

      {/* 1. Navigation */}
      <Navbar />

      {/* 2. Hero Section (with Three.js Tunnel/Particle/Geometry Canvas & Readability Radial Darkening) */}
      <HeroSection />

      {/* 3. Services Section (4 Premium Interactive Service Cards) */}
      <ServicesSection />

      {/* 3D Flow Wave Section Transition */}
      <FlowWaveCanvas />

      {/* 4. About AIVION TECH (with 3D Digital Core Canvas & 6 Pillars) */}
      <AboutSection />

      {/* 5. Our Team (CEO, HR, CTO, CMO with 3D Holographic Avatars & Digital Room Environment) */}
      <TeamSection />

      {/* 6. Mirror Hall Portfolio (Futuristic Digital Gallery of 8 Working Demos) */}
      <MirrorHallSection />

      {/* 7. Technology Stack (3D Tech Orbit Canvas & Capability Categories) */}
      <TechSection />

      {/* 8. Development Process (4 Steps with Glowing Pipeline Connection) */}
      <ProcessSection />

      {/* Testimonials & Enterprise Client Endorsements */}
      <TestimonialsSection />

      {/* 9. Contact (Inquiry Form, Phone, Email, Office Address) */}
      <ContactSection />

      {/* 10. Footer */}
      <Footer />
      </div>
    </>
  );
}
