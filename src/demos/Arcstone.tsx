import React, { useState } from 'react';
import { DemoHeader } from './DemoHeader';
import { Building2, Bed, Bath, Maximize, MapPin, CheckCircle2, X, ChevronRight, Phone } from 'lucide-react';

interface Property {
  id: string;
  title: string;
  location: string;
  price: string;
  beds: number;
  baths: number;
  sqft: string;
  image: string;
  archetype: 'Coastal Villa' | 'Alpine Chalet' | 'Urban Penthouse' | 'Desert Villa' | 'Forest Retreat' | 'Contemporary Mansion';
  desc: string;
}

export const Arcstone: React.FC = () => {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [activeArchetype, setActiveArchetype] = useState<string>('All');
  const [inquirySent, setInquirySent] = useState(false);

  const properties: Property[] = [
    {
      id: 'prop-01',
      title: 'The Monolith Cliffside Villa',
      location: 'Big Sur, California',
      price: '$18,500,000',
      beds: 5,
      baths: 6,
      sqft: '8,400 sq ft',
      image: '/AivionTech/assets/images/arcstone_luxury_villa_1790952149752.jpg',
      archetype: 'Coastal Villa',
      desc: 'Cantilevered architectural residence anchored into sea cliffs with radiant infinity pool and subterranean wine cellar.',
    },
    {
      id: 'prop-02',
      title: 'Obsidian Horizon Glass Penthouse',
      location: 'Tribeca, New York',
      price: '$24,000,000',
      beds: 4,
      baths: 5,
      sqft: '6,200 sq ft',
      image: '/AivionTech/assets/images/arcstone_penthouse_1790954114244.jpg',
      archetype: 'Urban Penthouse',
      desc: '360-degree skyline panorama with private elevator vestibule, wrap-around limestone terrace, and custom Boffi kitchen.',
    },
    {
      id: 'prop-03',
      title: 'Valser Quartz Alpine Sanctuary',
      location: 'Zermatt, Switzerland',
      price: '$16,200,000',
      beds: 6,
      baths: 7,
      sqft: '7,800 sq ft',
      image: '/AivionTech/assets/images/arcstone_chalet_1790954133304.jpg',
      archetype: 'Alpine Chalet',
      desc: 'Geothermal ski-in chalet carved from natural alpine stone with heated outdoor mineral plunge pool and Matterhorn views.',
    },
    {
      id: 'prop-04',
      title: 'Solitude Cove Waterfront Estate',
      location: 'Kailua-Kona, Hawaii',
      price: '$21,800,000',
      beds: 5,
      baths: 6,
      sqft: '9,100 sq ft',
      image: '/AivionTech/assets/images/arcstone_coastal_1790954148486.jpg',
      archetype: 'Coastal Villa',
      desc: 'Private gated oceanfront promontory surrounded by black basalt rock, lush botanical gardens, and deep water yacht mooring.',
    },
    {
      id: 'prop-05',
      title: 'Kurogane Monolith City Residence',
      location: 'Minato-ku, Tokyo',
      price: '$19,400,000',
      beds: 4,
      baths: 5,
      sqft: '6,800 sq ft',
      image: '/AivionTech/assets/images/arcstone_city_residence_1790954617128.jpg',
      archetype: 'Urban Penthouse',
      desc: 'Brutalist urban sanctuary with textured volcanic stone facades, illuminated internal zen courtyard, and subterranean motor vault.',
    },
    {
      id: 'prop-06',
      title: 'Mirage Rammed-Earth Desert Villa',
      location: 'Palm Springs, California',
      price: '$14,900,000',
      beds: 5,
      baths: 6,
      sqft: '7,500 sq ft',
      image: '/AivionTech/assets/images/arcstone_desert_villa_1790954585486.jpg',
      archetype: 'Desert Villa',
      desc: 'Minimalist desert pavilion constructed of thermal rammed earth with vast cantilevered rooflines, sunset infinity reflection pool, and desert mountain vistas.',
    },
    {
      id: 'prop-07',
      title: 'Pine Ridge Cantilever Forest Retreat',
      location: 'Aspen, Colorado',
      price: '$17,600,000',
      beds: 5,
      baths: 6,
      sqft: '8,100 sq ft',
      image: '/AivionTech/assets/images/arcstone_forest_retreat_1790954602098.jpg',
      archetype: 'Forest Retreat',
      desc: 'Modernist glass and charred cedar retreat suspended gracefully over a misty mountain stream with glowing hearth and floor-to-ceiling thermal glazing.',
    },
    {
      id: 'prop-08',
      title: 'Curvatura Sculptural Concrete Home',
      location: 'Lugano, Switzerland',
      price: '$22,500,000',
      beds: 6,
      baths: 7,
      sqft: '9,400 sq ft',
      image: '/AivionTech/assets/images/arcstone_contemporary_home_1790954634423.jpg',
      archetype: 'Contemporary Mansion',
      desc: 'Avant-garde sculptural concrete home with sweeping curvilinear white surfaces, double-height curved glass curtain walls, and tranquil perimeter reflection pools.',
    },
  ];

  const filteredProperties = properties.filter(
    (p) => activeArchetype === 'All' || p.archetype === activeArchetype
  );

  return (
    <div className="min-h-screen bg-[#090b10] text-[#f8fafc] font-sans selection:bg-amber-500/30">
      <DemoHeader currentDemoId="real-estate" />

      {/* Arcstone Navbar */}
      <nav className="border-b border-white/[0.08] bg-[#090b10]/90 backdrop-blur-md px-6 py-4 sticky top-11 z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-serif text-2xl font-bold tracking-[0.25em] text-amber-100 uppercase">
              ARCSTONE
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-xs font-mono tracking-widest uppercase text-gray-400">
            <a href="#properties" className="hover:text-amber-300 transition-colors">Residences</a>
            <a href="#locations" className="hover:text-amber-300 transition-colors">Global Enclaves</a>
            <a href="#advisory" className="hover:text-amber-300 transition-colors">Private Advisory</a>
          </div>

          <button
            onClick={() => setSelectedProperty(properties[0])}
            className="px-5 py-2 text-xs font-serif uppercase tracking-widest text-[#090b10] bg-amber-400 hover:bg-amber-300 transition-colors rounded-sm"
          >
            Schedule Showing
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative min-h-[80vh] flex items-center justify-center px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/AivionTech/assets/images/arcstone_luxury_villa_1790952149752.jpg"
            alt="Arcstone Luxury Villa"
            className="w-full h-full object-cover brightness-[0.35]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#090b10] via-[#090b10]/60 to-transparent" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="text-xs font-mono uppercase tracking-[0.3em] text-amber-400 mb-4">
            Private Portfolio // 2026 Collection
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal text-white mb-6 leading-tight">
            Architectural Sanctuaries for the Discerning Few.
          </h1>
          <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto font-serif italic mb-8">
            Curated residences engineered with sculptural concrete, expansive structural glass, and indelible natural landscapes.
          </p>
          <a
            href="#properties"
            className="inline-block px-8 py-3.5 text-xs font-serif uppercase tracking-widest bg-amber-400 text-black hover:bg-amber-300 transition-all rounded-sm shadow-[0_0_25px_rgba(245,158,11,0.3)]"
          >
            Explore Available Estates
          </a>
        </div>
      </section>

      {/* Search & Filter Toolbar */}
      <section id="properties" className="py-16 px-6 max-w-7xl mx-auto border-b border-white/[0.06]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h2 className="font-serif text-3xl text-white">Curated Enclaves</h2>
            <p className="text-xs font-mono text-gray-400 mt-1 uppercase tracking-widest">
              Verified Title & Sovereign Ownership
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {['All', 'Coastal Villa', 'Alpine Chalet', 'Urban Penthouse', 'Desert Villa', 'Forest Retreat', 'Contemporary Mansion'].map((arch) => (
              <button
                key={arch}
                onClick={() => setActiveArchetype(arch)}
                className={`px-4 py-2 text-xs font-mono uppercase rounded-sm transition-colors ${
                  activeArchetype === arch
                    ? 'bg-amber-400 text-black font-bold'
                    : 'bg-gray-900 text-gray-400 border border-white/10 hover:text-white'
                }`}
              >
                {arch}
              </button>
            ))}
          </div>
        </div>

        {/* Property Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProperties.map((prop) => (
            <div
              key={prop.id}
              onClick={() => setSelectedProperty(prop)}
              className="group cursor-pointer rounded-xl bg-gray-900/40 border border-white/10 hover:border-amber-400/50 overflow-hidden transition-all duration-300"
            >
              <div className="relative aspect-video overflow-hidden bg-gray-950">
                {prop.image ? (
                  <img
                    src={prop.image}
                    alt={prop.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-950 text-gray-600 font-serif text-lg">
                    {prop.archetype}
                  </div>
                )}
                <div className="absolute top-4 left-4 bg-gray-950/80 backdrop-blur-md px-3 py-1 rounded text-xs font-mono text-amber-300 border border-white/10">
                  {prop.price}
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-1.5 text-xs font-mono text-gray-400 mb-2">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  <span>{prop.location}</span>
                </div>
                <h3 className="font-serif text-2xl text-white mb-2 group-hover:text-amber-200 transition-colors">
                  {prop.title}
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed mb-6">
                  {prop.desc}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-white/[0.08] text-xs font-mono text-gray-300">
                  <span className="flex items-center gap-1.5"><Bed className="w-3.5 h-3.5 text-amber-400" /> {prop.beds} Beds</span>
                  <span className="flex items-center gap-1.5"><Bath className="w-3.5 h-3.5 text-amber-400" /> {prop.baths} Baths</span>
                  <span className="flex items-center gap-1.5"><Maximize className="w-3.5 h-3.5 text-amber-400" /> {prop.sqft}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Property Details Modal */}
      {selectedProperty && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-2xl bg-gray-950 border border-amber-500/30 rounded-2xl p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedProperty(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            {inquirySent ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-12 h-12 rounded-full bg-amber-400/20 text-amber-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-2xl text-white">Private Showing Requested</h3>
                <p className="text-xs text-gray-300">
                  Our private client advisory desk has dispatched security credentials for {selectedProperty.title}.
                </p>
                <button
                  onClick={() => {
                    setInquirySent(false);
                    setSelectedProperty(null);
                  }}
                  className="px-6 py-2.5 text-xs font-serif uppercase tracking-widest bg-amber-400 text-black rounded"
                >
                  Close Dossier
                </button>
              </div>
            ) : (
              <div>
                <div className="relative aspect-video rounded-xl overflow-hidden mb-6 bg-gray-900 border border-white/10">
                  <img
                    src={selectedProperty.image}
                    alt={selectedProperty.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 bg-gray-950/80 px-3 py-1 rounded text-xs font-mono text-amber-300">
                    {selectedProperty.price}
                  </div>
                </div>

                <div className="text-xs font-mono uppercase tracking-widest text-amber-400 mb-1">
                  Estate Dossier // {selectedProperty.archetype}
                </div>
                <h2 className="font-serif text-3xl text-white mb-2">{selectedProperty.title}</h2>
                <div className="text-sm font-mono text-amber-300 mb-6">{selectedProperty.price} Â· {selectedProperty.location}</div>

                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed mb-6">
                  {selectedProperty.desc} Designed with monolithic structural concrete, floor-to-ceiling thermal glazing, bespoke Italian joinery, and uninterrupted panoramic orientations.
                </p>

                <div className="grid grid-cols-3 gap-3 p-4 rounded-xl bg-gray-900 border border-white/10 text-center font-mono text-xs mb-8">
                  <div>
                    <div className="text-gray-400 text-[10px]">Bedrooms</div>
                    <div className="text-white font-bold text-base mt-0.5">{selectedProperty.beds} Suites</div>
                  </div>
                  <div>
                    <div className="text-gray-400 text-[10px]">Bathrooms</div>
                    <div className="text-white font-bold text-base mt-0.5">{selectedProperty.baths} Marble Baths</div>
                  </div>
                  <div>
                    <div className="text-gray-400 text-[10px]">Interior Area</div>
                    <div className="text-white font-bold text-base mt-0.5">{selectedProperty.sqft}</div>
                  </div>
                </div>

                <button
                  onClick={() => setInquirySent(true)}
                  className="w-full py-3.5 text-xs font-serif uppercase tracking-widest bg-amber-400 hover:bg-amber-300 text-black rounded transition-colors"
                >
                  Request Confidential Showing
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Architectural Gallery & Material Curation */}
      <section id="locations" className="py-20 px-6 max-w-7xl mx-auto border-t border-white/[0.06]">
        <div className="max-w-2xl mb-12">
          <div className="text-xs font-mono uppercase tracking-[0.25em] text-amber-400 mb-2">
            Material Masterpieces
          </div>
          <h2 className="font-serif text-3xl text-white">Curated Spatial Perspectives</h2>
          <p className="text-xs font-mono text-gray-400 mt-2">
            Every Arcstone sanctuary integrates raw minerals, continuous thermal glazing, and organic natural horizons.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="group relative rounded-xl overflow-hidden aspect-[4/3] bg-gray-950 border border-white/10">
            <img
              src="/AivionTech/assets/images/arcstone_luxury_villa_1790952149752.jpg"
              alt="Coastal Cantilever Villa"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
              <span className="text-xs font-serif text-white">Cliffside Cantilever Â· Big Sur</span>
            </div>
          </div>

          <div className="group relative rounded-xl overflow-hidden aspect-[4/3] bg-gray-950 border border-white/10">
            <img
              src="/AivionTech/assets/images/arcstone_penthouse_1790954114244.jpg"
              alt="Skyline Penthouse Salon"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
              <span className="text-xs font-serif text-white">Panorama Salon Â· New York</span>
            </div>
          </div>

          <div className="group relative rounded-xl overflow-hidden aspect-[4/3] bg-gray-950 border border-white/10">
            <img
              src="/AivionTech/assets/images/arcstone_chalet_1790954133304.jpg"
              alt="Alpine Stone Chalet"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
              <span className="text-xs font-serif text-white">Alpine Thermal Hearth Â· Zermatt</span>
            </div>
          </div>

          <div className="group relative rounded-xl overflow-hidden aspect-[4/3] bg-gray-950 border border-white/10">
            <img
              src="/AivionTech/assets/images/arcstone_coastal_1790954148486.jpg"
              alt="Basalt Ocean Mooring"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
              <span className="text-xs font-serif text-white">Basalt Cove Mooring Â· Hawaii</span>
            </div>
          </div>

          <div className="group relative rounded-xl overflow-hidden aspect-[4/3] bg-gray-950 border border-white/10">
            <img
              src="/AivionTech/assets/images/arcstone_city_residence_1790954617128.jpg"
              alt="Volcanic Stone City Residence"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
              <span className="text-xs font-serif text-white">Zen Motor Court Â· Tokyo</span>
            </div>
          </div>

          <div className="group relative rounded-xl overflow-hidden aspect-[4/3] bg-gray-950 border border-white/10">
            <img
              src="/AivionTech/assets/images/arcstone_desert_villa_1790954585486.jpg"
              alt="Rammed Earth Desert Pavilion"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
              <span className="text-xs font-serif text-white">Rammed Earth Pavilion Â· Palm Springs</span>
            </div>
          </div>

          <div className="group relative rounded-xl overflow-hidden aspect-[4/3] bg-gray-950 border border-white/10">
            <img
              src="/AivionTech/assets/images/arcstone_forest_retreat_1790954602098.jpg"
              alt="Misty Stream Forest Retreat"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
              <span className="text-xs font-serif text-white">Suspended Forest Cantilever Â· Aspen</span>
            </div>
          </div>

          <div className="group relative rounded-xl overflow-hidden aspect-[4/3] bg-gray-950 border border-white/10">
            <img
              src="/AivionTech/assets/images/arcstone_contemporary_home_1790954634423.jpg"
              alt="Curvilinear Concrete Home"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
              <span className="text-xs font-serif text-white">Curvilinear Water Pavilion Â· Lugano</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/[0.08] bg-[#050608] py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-gray-500 font-mono">
          <div>
            <span className="font-serif text-lg text-amber-200 tracking-wider">ARCSTONE</span>
            <div className="text-[11px] mt-0.5">Real Estate Demonstration built by AIVION TECH</div>
          </div>
          <div>
            <a href="/" className="text-amber-400 hover:underline">â† Return to AIVION TECH Software House</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

