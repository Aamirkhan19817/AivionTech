import React, { useState } from 'react';
import { DemoHeader } from './DemoHeader';
import { Calendar, Clock, Users, Wine, Utensils, Star, CheckCircle2, ChevronRight, X, Phone, MapPin } from 'lucide-react';

export const NoorTable: React.FC = () => {
  const [isResModalOpen, setIsResModalOpen] = useState(false);
  const [activeMenuCategory, setActiveMenuCategory] = useState<'tasting' | 'mains' | 'cellar'>('tasting');
  const [reservationSubmitted, setReservationSubmitted] = useState(false);
  const [resForm, setResForm] = useState({
    date: '2026-10-15',
    time: '19:30',
    guests: '2',
    name: '',
    email: '',
    phone: '',
    notes: '',
  });

  const handleReservation = (e: React.FormEvent) => {
    e.preventDefault();
    setReservationSubmitted(true);
  };

  const tastingMenu = [
    {
      name: 'Smoked Saffron Hokkaido Scallop',
      description: 'Osetra caviar, wild coastal sea herbs, charred dashi emulsion, preserved Meyer lemon foam.',
      price: '$42',
      pairing: 'Dom PÃ©rignon Vintage 2013',
    },
    {
      name: 'Charred A5 Miyazaki Wagyu',
      description: 'Black winter truffle crust, smoked parsnip puree, bone marrow glaze, pickled chanterelles.',
      price: '$98',
      pairing: 'ChÃ¢teau Margaux Premier Grand Cru',
    },
    {
      name: 'Aged Duck Breast in Spiced Fig',
      description: 'Crisped heirloom skin, lavender blossom honey, roasted beetroot reduction, Romanesco florets.',
      price: '$56',
      pairing: 'Barolo DOCG Brunate 2018',
    },
    {
      name: 'Valrhona Noir 72% Sphere',
      description: 'Smoked cardamom ganache, edible gold leaf, bourbon barrel Madagascar vanilla bean cream.',
      price: '$28',
      pairing: 'Taylor Fladgate 40-Year Tawny Port',
    },
  ];

  const mainsMenu = [
    {
      name: 'Chilean Sea Bass en Papillote',
      description: 'Saffron bouillon, braised fennel bulb, kalamata crisp, baby leeks.',
      price: '$64',
    },
    {
      name: 'Dry-Aged Ribeye Cap (10 oz)',
      description: '45-day Himalayan salt dry-aged, black garlic jus, pomme puree.',
      price: '$85',
    },
    {
      name: 'Wild Morel & Truffle Risotto',
      description: 'Acquerello carnaroli, 36-month Parmigiano Reggiano, shaved alba white truffles.',
      price: '$48',
    },
  ];

  const cellarMenu = [
    { name: 'Krug Clos dâ€™Ambonnay Champagne', region: 'Reims, France Â· 2008', price: '$2,800' },
    { name: 'Domaine de la RomanÃ©e-Conti', region: 'Burgundy, France Â· 2017', price: '$4,200' },
    { name: 'Screaming Eagle Cabernet Sauvignon', region: 'Oakville, Napa Valley Â· 2019', price: '$3,600' },
  ];

  return (
    <div className="min-h-screen bg-[#0a0706] text-[#f4efe8] font-sans selection:bg-amber-600/30">
      {/* Universal Demo Header with Back to AIVION TECH */}
      <DemoHeader currentDemoId="restaurant" />

      {/* Noor Table Navigation */}
      <nav className="border-b border-[#2d221c] bg-[#110c0a]/90 backdrop-blur-md px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.8)]" />
            <span className="font-serif text-2xl tracking-[0.2em] uppercase font-bold text-amber-100">
              NOOR TABLE
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-xs uppercase tracking-widest text-[#c2b2a3]">
            <a href="#about" className="hover:text-amber-400 transition-colors">Philosophy</a>
            <a href="#menu" className="hover:text-amber-400 transition-colors">Menu</a>
            <a href="#cellar" className="hover:text-amber-400 transition-colors">Cellar</a>
            <a href="#private" className="hover:text-amber-400 transition-colors">Private Dining</a>
          </div>

          <button
            onClick={() => setIsResModalOpen(true)}
            className="px-5 py-2.5 text-xs font-semibold uppercase tracking-widest text-[#0a0706] bg-amber-400 hover:bg-amber-300 transition-colors rounded-sm shadow-[0_0_15px_rgba(245,158,11,0.3)]"
          >
            Reserve Table
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20 overflow-hidden">
        {/* Background Image with warm dark scrim */}
        <div className="absolute inset-0 z-0">
          <img
            src="/AivionTech/assets/images/culinary_noor_table_1790952115305.jpg"
            alt="Noor Table Gastronomy"
            className="w-full h-full object-cover brightness-[0.38] contrast-125 scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0706] via-[#0a0706]/70 to-transparent" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.3em] uppercase text-amber-400/90 mb-6">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>Michelin Guide Recognized Â· Artisan Culinary Sanctuary</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal tracking-tight text-white mb-6 leading-tight">
            An Intimate Ode to Fire, Flavor & Shadow
          </h1>

          <p className="text-base sm:text-lg text-[#c5b8ac] max-w-2xl mx-auto mb-10 font-serif italic leading-relaxed">
            Curated tasting journeys celebrating micro-seasonal coastal foragings, heritage heirloom spices, and rare cellar vintages.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => setIsResModalOpen(true)}
              className="w-full sm:w-auto px-8 py-3.5 text-xs font-semibold uppercase tracking-widest text-[#0a0706] bg-amber-400 hover:bg-amber-300 transition-all rounded-sm shadow-[0_0_25px_rgba(245,158,11,0.4)]"
            >
              Book An Experience
            </button>
            <a
              href="#menu"
              className="w-full sm:w-auto px-8 py-3.5 text-xs font-semibold uppercase tracking-widest text-amber-200 border border-amber-500/30 hover:border-amber-400 bg-[#160f0c]/60 transition-all rounded-sm text-center"
            >
              Explore Autumn Menu
            </a>
          </div>
        </div>
      </section>

      {/* About / Philosophy Section */}
      <section id="about" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="text-xs font-mono uppercase tracking-[0.25em] text-amber-400">
              The Philosophy
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-amber-100 font-normal leading-snug">
              Every dish is composed as an ephemeral sensory sculpture.
            </h2>
            <p className="text-sm sm:text-base text-[#b09f90] leading-relaxed">
              At Noor Table, dining transcends nourishment. Under the guidance of our executive culinary masters, every course explores the dialogue between ancient charcoal fire and avant-garde molecular precision.
            </p>
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-[#2d221c]">
              <div>
                <div className="font-serif text-3xl text-amber-300">14</div>
                <div className="text-[11px] font-mono uppercase tracking-wider text-[#8e7e72] mt-1">Course Tasting</div>
              </div>
              <div>
                <div className="font-serif text-3xl text-amber-300">800+</div>
                <div className="text-[11px] font-mono uppercase tracking-wider text-[#8e7e72] mt-1">Cellar Labels</div>
              </div>
              <div>
                <div className="font-serif text-3xl text-amber-300">24</div>
                <div className="text-[11px] font-mono uppercase tracking-wider text-[#8e7e72] mt-1">Covers Nightly</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-lg overflow-hidden border border-[#3c2e26] shadow-2xl">
              <img
                src="/AivionTech/assets/images/noor_cellar_interior_1790954232863.jpg"
                alt="Culinary Preparation"
                className="w-full h-96 object-cover brightness-90 hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-[#110c0a]/90 backdrop-blur-md p-4 rounded border border-[#2d221c] flex items-center justify-between">
                <div>
                  <div className="text-xs font-serif text-amber-200">The Vaulted Cellar Sanctuary</div>
                  <div className="text-[11px] text-[#8e7e72]">Hand-carved stone tasting vault with rare Grand Cru vintages</div>
                </div>
                <Wine className="w-5 h-5 text-amber-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Featured Signature Plating Showcase */}
        <div className="mt-16 pt-12 border-t border-[#241a15]">
          <div className="text-xs font-mono uppercase tracking-[0.25em] text-amber-400 mb-2">
            Signature Degustation Highlights
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="group rounded-xl overflow-hidden bg-[#140e0b] border border-[#2d221c] p-4 flex flex-col sm:flex-row gap-5 items-center">
              <div className="relative w-full sm:w-44 aspect-square rounded-lg overflow-hidden shrink-0">
                <img
                  src="/AivionTech/assets/images/culinary_noor_table_1790952115305.jpg"
                  alt="Smoked Saffron Hokkaido Scallop"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <span className="text-[11px] font-mono text-amber-400 uppercase tracking-widest">COURSE 03</span>
                <h3 className="font-serif text-lg text-amber-100 font-normal mt-1">Smoked Saffron Hokkaido Scallop</h3>
                <p className="text-xs text-[#9e8d80] mt-1.5 leading-relaxed">
                  Osetra caviar, wild coastal sea herbs, charred dashi emulsion, preserved Meyer lemon foam.
                </p>
                <div className="text-sm font-mono text-amber-400 font-bold mt-3">$42 Â· Pair with Dom PÃ©rignon</div>
              </div>
            </div>

            <div className="group rounded-xl overflow-hidden bg-[#140e0b] border border-[#2d221c] p-4 flex flex-col sm:flex-row gap-5 items-center">
              <div className="relative w-full sm:w-44 aspect-square rounded-lg overflow-hidden shrink-0">
                <img
                  src="/AivionTech/assets/images/noor_wagyu_dish_1790954163919.jpg"
                  alt="Charred A5 Miyazaki Wagyu"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <span className="text-[11px] font-mono text-amber-400 uppercase tracking-widest">COURSE 07</span>
                <h3 className="font-serif text-lg text-amber-100 font-normal mt-1">Charred A5 Miyazaki Wagyu</h3>
                <p className="text-xs text-[#9e8d80] mt-1.5 leading-relaxed">
                  Black winter truffle crust, smoked parsnip puree, bone marrow glaze, pickled chanterelles.
                </p>
                <div className="text-sm font-mono text-amber-400 font-bold mt-3">$98 Â· Pair with ChÃ¢teau Margaux</div>
              </div>
            </div>

            <div className="group rounded-xl overflow-hidden bg-[#140e0b] border border-[#2d221c] p-4 flex flex-col sm:flex-row gap-5 items-center">
              <div className="relative w-full sm:w-44 aspect-square rounded-lg overflow-hidden shrink-0">
                <img
                  src="/AivionTech/assets/images/noor_dessert_1790954482632.jpg"
                  alt="Valrhona Noir 72% Sphere"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <span className="text-[11px] font-mono text-amber-400 uppercase tracking-widest">COURSE 11</span>
                <h3 className="font-serif text-lg text-amber-100 font-normal mt-1">Valrhona Noir 72% Sphere</h3>
                <p className="text-xs text-[#9e8d80] mt-1.5 leading-relaxed">
                  Smoked cardamom ganache, edible 24k gold leaf, bourbon barrel Madagascar vanilla bean infusion.
                </p>
                <div className="text-sm font-mono text-amber-400 font-bold mt-3">$28 Â· Pair with 40-Year Tawny Port</div>
              </div>
            </div>

            <div className="group rounded-xl overflow-hidden bg-[#140e0b] border border-[#2d221c] p-4 flex flex-col sm:flex-row gap-5 items-center">
              <div className="relative w-full sm:w-44 aspect-square rounded-lg overflow-hidden shrink-0">
                <img
                  src="/AivionTech/assets/images/noor_chef_1790954498436.jpg"
                  alt="Executive Culinary Hearth"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <span className="text-[11px] font-mono text-amber-400 uppercase tracking-widest">ATELIER HEARTH</span>
                <h3 className="font-serif text-lg text-amber-100 font-normal mt-1">Live Fire Artisanal Plating</h3>
                <p className="text-xs text-[#9e8d80] mt-1.5 leading-relaxed">
                  Watch our Michelin-starred culinary brigade compose delicate seasonal courses right before your eyes.
                </p>
                <div className="text-sm font-mono text-amber-400 font-bold mt-3">Chefâ€™s Counter Exclusive</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-24 bg-[#0d0908] border-t border-b border-[#241a15]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="text-xs font-mono uppercase tracking-[0.25em] text-amber-400 mb-2">
              Culinary Portfolio
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-amber-100 font-normal">
              Autumn Nocturne Degustation
            </h2>
            <div className="flex justify-center gap-3 mt-8">
              {(['tasting', 'mains', 'cellar'] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveMenuCategory(cat)}
                  className={`px-5 py-2 text-xs uppercase tracking-widest font-mono rounded-sm transition-colors ${
                    activeMenuCategory === cat
                      ? 'bg-amber-400 text-[#0a0706] font-bold'
                      : 'text-[#9c8b7e] hover:text-white bg-[#1a120f] border border-[#2d221c]'
                  }`}
                >
                  {cat === 'tasting' ? 'Tasting Menu' : cat === 'mains' ? 'Ã€ La Carte' : 'Grand Cellar'}
                </button>
              ))}
            </div>
          </div>

          {/* Menu Items Display */}
          <div className="space-y-8">
            {activeMenuCategory === 'tasting' &&
              tastingMenu.map((item, idx) => (
                <div key={idx} className="pb-8 border-b border-[#221814] last:border-none">
                  <div className="flex items-baseline justify-between gap-4 mb-2">
                    <h3 className="font-serif text-xl text-amber-100 font-normal">{item.name}</h3>
                    <span className="font-mono text-amber-400 font-semibold">{item.price}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#9e8d80] leading-relaxed mb-3">
                    {item.description}
                  </p>
                  <div className="flex items-center gap-2 text-xs font-mono text-[#786a60]">
                    <Wine className="w-3.5 h-3.5 text-amber-500/80" />
                    <span>Pairing: {item.pairing}</span>
                  </div>
                </div>
              ))}

            {activeMenuCategory === 'mains' &&
              mainsMenu.map((item, idx) => (
                <div key={idx} className="pb-8 border-b border-[#221814] last:border-none">
                  <div className="flex items-baseline justify-between gap-4 mb-2">
                    <h3 className="font-serif text-xl text-amber-100 font-normal">{item.name}</h3>
                    <span className="font-mono text-amber-400 font-semibold">{item.price}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#9e8d80] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}

            {activeMenuCategory === 'cellar' &&
              cellarMenu.map((item, idx) => (
                <div key={idx} className="pb-8 border-b border-[#221814] last:border-none flex items-center justify-between">
                  <div>
                    <h3 className="font-serif text-lg text-amber-100 font-normal">{item.name}</h3>
                    <p className="text-xs text-[#827266] font-mono mt-1">{item.region}</p>
                  </div>
                  <span className="font-mono text-amber-400 font-semibold">{item.price}</span>
                </div>
              ))}
          </div>

          <div className="text-center mt-12 pt-8 border-t border-[#221814]">
            <button
              onClick={() => setIsResModalOpen(true)}
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-amber-400 hover:text-amber-300 transition-colors"
            >
              <span>Inquire For Private Hearth Reservations</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Reservation Modal */}
      {isResModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-md bg-[#160f0c] border border-amber-500/30 rounded-xl p-6 sm:p-8 shadow-2xl text-[#f4efe8]">
            <button
              onClick={() => setIsResModalOpen(false)}
              className="absolute top-4 right-4 text-[#8a796e] hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            {reservationSubmitted ? (
              <div className="py-8 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-amber-400/20 text-amber-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-2xl text-amber-100">Table Reserved</h3>
                <p className="text-xs text-[#a39285] leading-relaxed">
                  We look forward to welcoming you on {resForm.date} at {resForm.time} for {resForm.guests} guests. A confirmation concierge dossier has been dispatched to {resForm.email}.
                </p>
                <button
                  onClick={() => {
                    setReservationSubmitted(false);
                    setIsResModalOpen(false);
                  }}
                  className="px-6 py-2.5 text-xs font-semibold uppercase tracking-widest bg-amber-400 text-black rounded-sm"
                >
                  Close Confirmation
                </button>
              </div>
            ) : (
              <div>
                <h3 className="font-serif text-2xl text-amber-100 mb-1">Reserve Your Table</h3>
                <p className="text-xs text-[#9c8b7e] mb-6">Experience our signature 14-course autumn tasting.</p>

                <form onSubmit={handleReservation} className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-mono uppercase text-[#8e7e72] mb-1">Date</label>
                      <input
                        type="date"
                        required
                        value={resForm.date}
                        onChange={(e) => setResForm({ ...resForm, date: e.target.value })}
                        className="w-full bg-[#0d0908] border border-[#2d221c] rounded p-2 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono uppercase text-[#8e7e72] mb-1">Time</label>
                      <select
                        value={resForm.time}
                        onChange={(e) => setResForm({ ...resForm, time: e.target.value })}
                        className="w-full bg-[#0d0908] border border-[#2d221c] rounded p-2 text-xs text-white"
                      >
                        <option value="18:00">18:00 Sitting</option>
                        <option value="19:30">19:30 Sitting</option>
                        <option value="21:00">21:00 Sitting</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase text-[#8e7e72] mb-1">Party Size</label>
                    <select
                      value={resForm.guests}
                      onChange={(e) => setResForm({ ...resForm, guests: e.target.value })}
                      className="w-full bg-[#0d0908] border border-[#2d221c] rounded p-2 text-xs text-white"
                    >
                      <option value="1">1 Guest Â· Chef's Counter</option>
                      <option value="2">2 Guests Â· Intimate Table</option>
                      <option value="4">4 Guests Â· Main Dining</option>
                      <option value="6">6 Guests Â· Private Alcove</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase text-[#8e7e72] mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Lord / Lady Harwood"
                      value={resForm.name}
                      onChange={(e) => setResForm({ ...resForm, name: e.target.value })}
                      className="w-full bg-[#0d0908] border border-[#2d221c] rounded p-2 text-xs text-white placeholder-[#55463e]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase text-[#8e7e72] mb-1">Email</label>
                    <input
                      type="email"
                      required
                      placeholder="client@sanctuary.com"
                      value={resForm.email}
                      onChange={(e) => setResForm({ ...resForm, email: e.target.value })}
                      className="w-full bg-[#0d0908] border border-[#2d221c] rounded p-2 text-xs text-white placeholder-[#55463e]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 mt-4 text-xs font-semibold uppercase tracking-widest bg-amber-400 hover:bg-amber-300 text-black rounded transition-colors"
                  >
                    Confirm Tasting Reservation
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Noor Table Footer */}
      <footer className="border-t border-[#221814] bg-[#070504] py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-[#7e6e62]">
          <div>
            <span className="font-serif text-lg text-amber-200 tracking-wider">NOOR TABLE</span>
            <div className="text-[11px] font-mono mt-0.5">Crafted for AIVION TECH Portfolio Demonstration</div>
          </div>
          <div className="flex gap-6">
            <span>Valet Parking Available</span>
            <span>Â·</span>
            <span>Formal Attire Recommended</span>
            <span>Â·</span>
            <span>Reservations 30 Days in Advance</span>
          </div>
          <div>
            <a href="/" className="text-amber-400 hover:underline">â† Return to AIVION TECH Software House</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

