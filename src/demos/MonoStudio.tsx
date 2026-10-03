import React, { useState } from 'react';
import { DemoHeader } from './DemoHeader';
import { ArrowUpRight, Sparkles, X, Plus } from 'lucide-react';

interface MonoProject {
  id: string;
  title: string;
  client: string;
  category: string;
  year: string;
  image?: string;
  desc: string;
}

export const MonoStudio: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<MonoProject | null>(null);
  const [activeCategory, setActiveCategory] = useState('All');

  const projects: MonoProject[] = [
    {
      id: 'mono-01',
      title: 'Monolithic Void Installation',
      client: 'Fondation dâ€™Art Moderne',
      category: 'Spatial Art',
      year: '2026',
      image: '/AivionTech/assets/images/mono_studio_art_1790952166074.jpg',
      desc: 'A brutalist kinetic sculpture reacting to ambient electromagnetic radiation and human proximity in a concrete gallery pavilion.',
    },
    {
      id: 'mono-02',
      title: 'Aura Zero Kinetic Typographer',
      client: 'Venice Biennale Architettura',
      category: 'Interactive Typography',
      year: '2026',
      image: '/AivionTech/assets/images/mono_typography_art_1790954200104.jpg',
      desc: 'Real-time generative typography engine morphing letterforms according to tidal rhythms and wind velocity.',
    },
    {
      id: 'mono-03',
      title: 'Ephemeral Chromatics Pavilion',
      client: 'Kyoto Design Triennale',
      category: 'Spatial Art',
      year: '2025',
      image: '/AivionTech/assets/images/mono_chromatics_pavilion_1790954653501.jpg',
      desc: 'Dichroic glass acoustic installation reflecting shifting daylight hues across raw monolithic cedar timber.',
    },
    {
      id: 'mono-04',
      title: 'Sub-Zero Virtual Brand Universe',
      client: 'Atelier Nocturne Paris',
      category: 'Digital Atelier',
      year: '2025',
      image: '/AivionTech/assets/images/mono_virtual_brand_1790954669064.jpg',
      desc: 'Hyper-minimalist 3D WebGL commerce experience sculpted with ray-traced shadows and ambient spatial audio.',
    },
  ];

  const filteredProjects = projects.filter(
    (p) => activeCategory === 'All' || p.category === activeCategory
  );

  return (
    <div className="min-h-screen bg-[#070709] text-[#e2e8f0] font-sans selection:bg-purple-500/30">
      <DemoHeader currentDemoId="creative-studio" />

      {/* Mono Studio Navbar */}
      <nav className="border-b border-white/[0.08] bg-[#070709]/90 backdrop-blur-md px-6 py-5 sticky top-11 z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-purple-500 rounded-none rotate-45" />
            <span className="font-display font-black text-xl tracking-[0.3em] uppercase text-white">
              MONO STUDIO
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-xs font-mono uppercase tracking-widest text-gray-400">
            <a href="#exhibits" className="hover:text-purple-400 transition-colors">Installations</a>
            <a href="#manifesto" className="hover:text-purple-400 transition-colors">Manifesto</a>
            <a href="#disciplines" className="hover:text-purple-400 transition-colors">Disciplines</a>
            <a href="#inquire" className="hover:text-purple-400 transition-colors">Commissions</a>
          </div>

          <a
            href="#inquire"
            className="text-xs font-mono uppercase tracking-widest text-purple-400 hover:text-white flex items-center gap-1"
          >
            <span>Commission Studio</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </nav>

      {/* Experimental Editorial Hero */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-xs font-mono uppercase tracking-[0.3em] text-purple-400 mb-6">
          Kinetic Spatial Design & Avant-Garde Digital Objects
        </div>
        <h1 className="font-display text-5xl sm:text-7xl md:text-8xl font-black text-white tracking-tighter uppercase leading-[0.95] mb-12">
          RADICAL FORM. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-300 to-white">
            KINETIC VOID.
          </span>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end pt-8 border-t border-white/[0.08]">
          <p className="md:col-span-7 text-gray-400 text-sm sm:text-base leading-relaxed">
            Mono Studio operates at the boundary of sculpture, computation, and architecture. We engineer physical installations, spatial brand universes, and generative digital artifacts.
          </p>
          <div className="md:col-span-5 flex md:justify-end gap-6 text-xs font-mono text-gray-500">
            <div>[01] SPATIAL COMPUTING</div>
            <div>[02] GENERATIVE SCULPTURE</div>
          </div>
        </div>
      </section>

      {/* Featured Installation Showcase */}
      <section id="exhibits" className="py-16 px-6 max-w-7xl mx-auto border-t border-white/[0.08]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
          <h2 className="font-display font-bold text-2xl uppercase tracking-wider text-white">
            Selected Installations
          </h2>
          <div className="flex gap-2">
            {['All', 'Spatial Art', 'Interactive Typography', 'Digital Atelier'].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 text-xs font-mono uppercase rounded transition-colors ${
                  activeCategory === cat
                    ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                    : 'bg-gray-900 text-gray-400 border border-white/[0.06]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((p) => (
            <div
              key={p.id}
              onClick={() => setSelectedProject(p)}
              className="group cursor-pointer rounded-xl bg-gray-900/40 border border-white/10 hover:border-purple-500/50 p-6 flex flex-col justify-between transition-all duration-300"
            >
              <div>
                <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-950 mb-6 border border-white/[0.06]">
                  {p.image ? (
                    <img
                      src={p.image}
                      alt={p.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gray-950 text-gray-600 font-mono text-xs uppercase tracking-widest">
                      <Sparkles className="w-6 h-6 text-purple-400/60 mb-2" />
                      {p.category}
                    </div>
                  )}
                  <div className="absolute top-3 left-3 bg-black/80 px-2.5 py-1 text-[11px] font-mono text-purple-300 backdrop-blur-md">
                    {p.year}
                  </div>
                </div>

                <div className="text-[11px] font-mono uppercase text-gray-400 mb-1">{p.client}</div>
                <h3 className="font-display font-bold text-2xl text-white group-hover:text-purple-300 transition-colors mb-2">
                  {p.title}
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed mb-4">{p.desc}</p>
              </div>

              <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono text-purple-400">
                <span>View Exhibition Study</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Studio Manifesto */}
      <section id="manifesto" className="py-20 px-6 max-w-4xl mx-auto border-t border-white/[0.08] text-center">
        <div className="text-xs font-mono uppercase tracking-[0.25em] text-purple-400 mb-4">
          The Mono Manifesto
        </div>
        <p className="font-display text-2xl sm:text-3xl md:text-4xl text-white font-medium leading-relaxed italic">
          "We reject decorative ornamentation. True spatial power arrives through austere materials, monolithic gravity, and the choreography of darkness."
        </p>
        <div className="mt-8 text-xs font-mono text-gray-500 uppercase tracking-widest">
          Mono Atelier // Tokyo Â· Paris Â· ZÃ¼rich
        </div>
      </section>

      {/* Project Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-2xl bg-gray-950 border border-purple-500/40 rounded-2xl p-6 sm:p-8 shadow-2xl">
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="text-xs font-mono uppercase text-purple-400 mb-1">{selectedProject.category} Â· {selectedProject.year}</div>
            <h2 className="font-display font-black text-3xl text-white mb-2">{selectedProject.title}</h2>
            <div className="text-xs font-mono text-gray-400 mb-6">Commissioned by {selectedProject.client}</div>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed mb-6">{selectedProject.desc}</p>
            <button
              onClick={() => setSelectedProject(null)}
              className="w-full py-3 text-xs font-mono uppercase tracking-widest bg-purple-500 hover:bg-purple-400 text-black font-bold rounded"
            >
              Close Exhibition View
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-white/[0.08] bg-[#040406] py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-gray-500 font-mono">
          <div>
            <span className="font-bold text-white tracking-widest uppercase">MONO STUDIO</span>
            <div className="text-[11px] mt-0.5">Creative Studio Demonstration built by AIVION TECH</div>
          </div>
          <div>
            <a href="/" className="text-purple-400 hover:underline">â† Return to AIVION TECH Software House</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

