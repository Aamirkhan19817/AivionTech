import React, { useState } from 'react';
import { DemoHeader } from './DemoHeader';
import { ShoppingBag, Heart, Search, X, Plus, Minus, ArrowRight, ShieldCheck, Truck, RefreshCw, CheckCircle2 } from 'lucide-react';

interface CartItem {
  id: string;
  name: string;
  price: number;
  qty: number;
  image?: string;
  category: string;
}

export const VantaStore: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([
    {
      id: 'vanta-01',
      name: 'Vanta Obsidian ANC Headphones',
      price: 480,
      qty: 1,
      image: '/src/assets/images/vanta_minimal_audio_1790952130423.jpg',
      category: 'Acoustics',
    },
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [wishlist, setWishlist] = useState<string[]>(['vanta-01']);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutComplete, setCheckoutComplete] = useState(false);

  const products = [
    {
      id: 'vanta-01',
      name: 'Vanta Obsidian ANC Headphones',
      category: 'Acoustics',
      price: 480,
      image: '/src/assets/images/vanta_minimal_audio_1790952130423.jpg',
      desc: 'Bespoke planar magnetic drivers encased in matte bead-blasted aircraft titanium.',
    },
    {
      id: 'vanta-02',
      name: 'Monolith Solid Aluminum Keyboard',
      category: 'Peripherals',
      price: 360,
      image: '/src/assets/images/vanta_keyboard_product_1790954217600.jpg',
      desc: 'Gasket-mounted bespoke tactile switches with hand-lathed PVD brass counterweight.',
    },
    {
      id: 'vanta-03',
      name: 'Linear Desk Lamp in Cold Black',
      category: 'Workspace',
      price: 240,
      image: '/src/assets/images/vanta_desk_lamp_1790954420042.jpg',
      desc: '98 CRI continuous circadian spectrum illumination with rotary dimmer dial.',
    },
    {
      id: 'vanta-04',
      name: 'Precision Wireless Trackball Mouse',
      category: 'Peripherals',
      price: 190,
      image: '/src/assets/images/vanta_mouse_1790954436474.jpg',
      desc: 'Optical ceramic sensor ball with silent tactile switches and carbon shell.',
    },
    {
      id: 'vanta-05',
      name: 'Acoustic Desktop Resonance Blocks',
      category: 'Acoustics',
      price: 150,
      image: '/src/assets/images/vanta_speakers_1790954452315.jpg',
      desc: 'Dense composite damping isolation wedges designed for studio monitors.',
    },
    {
      id: 'vanta-06',
      name: 'Sovereign Leather Desk Mat (XL)',
      category: 'Workspace',
      price: 110,
      image: '/src/assets/images/vanta_desk_setup_1790954467516.jpg',
      desc: 'Vegetable-tanned full-grain matte Tuscan hide with non-slip suede underlay.',
    },
  ];

  const addToCart = (product: typeof products[0]) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { id: product.id, name: product.name, price: product.price, qty: 1, image: product.image, category: product.category }];
    });
    setIsCartOpen(true);
  };

  const toggleWishlist = (id: string) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const updateCartQty = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, qty: item.qty + delta } : item))
        .filter((item) => item.qty > 0)
    );
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const filteredProducts = products.filter((p) => {
    const matchesCat = activeCategory === 'All' || p.category === activeCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#07090e] text-[#f1f5f9] font-sans selection:bg-cyan-500/30">
      <DemoHeader currentDemoId="ecommerce" />

      {/* Vanta Store Navbar */}
      <nav className="sticky top-11 z-40 bg-[#07090e]/95 backdrop-blur-md border-b border-white/[0.08] px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-8">
            <a href="#" className="font-display font-black text-xl tracking-[0.25em] text-white uppercase">
              VANTA STORE
            </a>
            <div className="hidden md:flex items-center gap-6 text-xs uppercase font-mono tracking-widest text-gray-400">
              {['All', 'Acoustics', 'Peripherals', 'Workspace'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`transition-colors ${activeCategory === cat ? 'text-cyan-400 font-bold' : 'hover:text-white'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Search Input */}
            <div className="relative hidden sm:block">
              <Search className="w-3.5 h-3.5 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search catalog..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 pr-3 py-1.5 bg-gray-900 border border-white/10 rounded-full text-xs text-white focus:outline-none focus:border-cyan-400 w-36 sm:w-48"
              />
            </div>

            {/* Wishlist */}
            <button
              onClick={() => setIsWishlistOpen(true)}
              className="relative p-2 text-gray-300 hover:text-white"
              aria-label="Wishlist"
            >
              <Heart className="w-4 h-4" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-cyan-400" />
              )}
            </button>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-gray-300 hover:text-white flex items-center gap-1.5"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="text-xs font-mono font-bold text-cyan-400">
                {cart.reduce((s, i) => s + i.qty, 0)}
              </span>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Showcase */}
      <section className="relative py-20 px-6 max-w-7xl mx-auto border-b border-white/[0.06]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="text-xs font-mono uppercase tracking-[0.25em] text-cyan-400">
              Flagship Release 01 // 2026 Edition
            </div>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-tight">
              Acoustic Purity in Matte Obsidian.
            </h1>
            <p className="text-gray-400 text-base leading-relaxed">
              Designed with precision aerospace alloys and custom 50mm planar transducers. Experience zero acoustic compromise, calibrated isolation, and sculpted ergonomics.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <span className="text-2xl font-mono font-bold text-white">$480 USD</span>
              <button
                onClick={() => addToCart(products[0])}
                className="px-6 py-3 text-xs uppercase tracking-widest font-semibold bg-cyan-400 hover:bg-cyan-300 text-black rounded transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)]"
              >
                Add To Cart
              </button>
            </div>
            <div className="flex items-center gap-6 pt-4 text-xs font-mono text-gray-500">
              <span className="flex items-center gap-1.5"><Truck className="w-3.5 h-3.5 text-cyan-400" /> Complimentary Global Express</span>
              <span className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-cyan-400" /> 5-Year Studio Warranty</span>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-gray-900 group">
              <img
                src="/src/assets/images/vanta_minimal_audio_1790952130423.jpg"
                alt="Vanta Obsidian Headphones"
                className="w-full aspect-square object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 right-4 bg-gray-950/80 px-3 py-1 rounded text-[11px] font-mono text-cyan-400 backdrop-blur-md">
                IN STOCK // SHIPS TODAY
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Catalog Grid */}
      <section className="py-20 max-w-7xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
          <div>
            <h2 className="font-display text-2xl font-bold text-white">Curated Collection</h2>
            <p className="text-xs text-gray-400 font-mono mt-1">Showing {filteredProducts.length} precision instruments</p>
          </div>

          <div className="flex gap-2">
            {['All', 'Acoustics', 'Peripherals', 'Workspace'].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 text-xs font-mono rounded ${activeCategory === cat ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'bg-gray-900 text-gray-400 border border-white/[0.06]'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((p) => {
            const isWished = wishlist.includes(p.id);
            return (
              <div
                key={p.id}
                className="rounded-xl bg-gray-900/40 border border-white/[0.08] hover:border-cyan-500/40 p-5 flex flex-col justify-between transition-all duration-200 group"
              >
                <div>
                  <div className="relative aspect-square rounded-lg bg-gray-950 mb-4 overflow-hidden border border-white/[0.05] flex items-center justify-center">
                    {p.image ? (
                      <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
                    ) : (p as any).renderSvg ? (
                      <div className="w-full h-full flex items-center justify-center bg-gray-950/80 group-hover:scale-105 transition-transform duration-500">
                        {(p as any).renderSvg}
                      </div>
                    ) : (
                      <div className="text-gray-600 font-mono text-xs uppercase tracking-widest">
                        {p.category}
                      </div>
                    )}
                    <button
                      onClick={() => toggleWishlist(p.id)}
                      aria-label="Save to Wishlist"
                      className="absolute top-3 right-3 p-2 rounded-full bg-gray-950/80 text-gray-400 hover:text-red-400 transition-colors"
                    >
                      <Heart className={`w-4 h-4 ${isWished ? 'fill-red-500 text-red-500' : ''}`} />
                    </button>
                  </div>

                  <div className="text-[11px] font-mono text-cyan-400 uppercase tracking-widest mb-1">
                    {p.category}
                  </div>
                  <h3 className="font-display text-lg font-bold text-white mb-1.5">{p.name}</h3>
                  <p className="text-xs text-gray-400 leading-relaxed mb-4">{p.desc}</p>
                </div>

                <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
                  <span className="font-mono text-lg font-bold text-white">${p.price}</span>
                  <button
                    onClick={() => addToCart(p)}
                    className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-black bg-cyan-400 hover:bg-cyan-300 rounded transition-colors"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Shopping Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-md bg-gray-950 border-l border-white/10 h-full p-6 flex flex-col justify-between shadow-2xl">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-cyan-400" />
                  <span className="font-display font-bold text-lg text-white">Your Cart</span>
                </div>
                <button onClick={() => setIsCartOpen(false)} className="text-gray-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {cart.length === 0 ? (
                <div className="text-center py-12 text-gray-400 text-sm">
                  Your cart is currently empty.
                </div>
              ) : (
                <div className="space-y-4 max-h-[55vh] overflow-y-auto pr-1">
                  {cart.map((item) => (
                    <div key={item.id} className="p-3 rounded-lg bg-gray-900 border border-white/[0.06] flex items-center justify-between">
                      <div>
                        <div className="text-xs font-bold text-white">{item.name}</div>
                        <div className="text-xs text-cyan-400 font-mono mt-0.5">${item.price} each</div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 bg-gray-950 px-2 py-1 rounded border border-white/10">
                          <button onClick={() => updateCartQty(item.id, -1)} className="text-gray-400 hover:text-white">
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-mono">{item.qty}</span>
                          <button onClick={() => updateCartQty(item.id, 1)} className="text-gray-400 hover:text-white">
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <span className="text-xs font-mono font-bold text-white w-12 text-right">
                          ${item.price * item.qty}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="pt-6 border-t border-white/10 space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-400 font-mono uppercase">Subtotal</span>
                  <span className="font-mono font-bold text-xl text-white">${cartTotal} USD</span>
                </div>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    setIsCheckoutOpen(true);
                  }}
                  className="w-full py-3.5 text-xs font-semibold uppercase tracking-widest bg-cyan-400 hover:bg-cyan-300 text-black rounded transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)] flex items-center justify-center gap-2"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Wishlist Modal */}
      {isWishlistOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-md bg-gray-950 border border-white/15 rounded-xl p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
              <div className="flex items-center gap-2 font-display font-bold text-white">
                <Heart className="w-4 h-4 text-cyan-400 fill-cyan-400" />
                <span>Saved Items ({wishlist.length})</span>
              </div>
              <button onClick={() => setIsWishlistOpen(false)} className="text-gray-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>
            {wishlist.length === 0 ? (
              <p className="text-xs text-gray-400 py-6 text-center">No items saved yet.</p>
            ) : (
              <div className="space-y-2.5">
                {products
                  .filter((p) => wishlist.includes(p.id))
                  .map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-2 rounded bg-gray-900 border border-white/10">
                      <div>
                        <div className="text-xs font-bold text-white">{item.name}</div>
                        <div className="text-[11px] font-mono text-cyan-400">${item.price}</div>
                      </div>
                      <button
                        onClick={() => {
                          addToCart(item);
                          setIsWishlistOpen(false);
                        }}
                        className="px-3 py-1 text-[11px] bg-cyan-400 text-black font-semibold rounded"
                      >
                        Add to Cart
                      </button>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Checkout Concept Modal */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-lg bg-gray-950 border border-cyan-500/30 rounded-2xl p-6 sm:p-8 shadow-2xl">
            {checkoutComplete ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-12 h-12 rounded-full bg-cyan-400/20 text-cyan-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="font-display font-bold text-2xl text-white">Order Confirmed</h3>
                <p className="text-xs text-gray-300">
                  Thank you for your order. Tracking reference #VNT-8924 has been generated.
                </p>
                <button
                  onClick={() => {
                    setCheckoutComplete(false);
                    setIsCheckoutOpen(false);
                    setCart([]);
                  }}
                  className="px-6 py-2.5 text-xs font-semibold uppercase tracking-wider bg-cyan-400 text-black rounded"
                >
                  Return to Store
                </button>
              </div>
            ) : (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-display font-bold text-xl text-white">Express Checkout</h3>
                  <button onClick={() => setIsCheckoutOpen(false)} className="text-gray-400 hover:text-white">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-[11px] font-mono uppercase text-gray-400 mb-1">Shipping Destination</label>
                    <input type="text" defaultValue="742 Evergreen Terrace, Seattle WA" className="w-full bg-gray-900 border border-white/10 rounded p-2.5 text-xs text-white" />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono uppercase text-gray-400 mb-1">Payment Method</label>
                    <div className="p-3 rounded bg-gray-900 border border-cyan-400/30 text-xs text-cyan-300 font-mono">
                      Apple Pay / Obsidian Concierge Token (Demo)
                    </div>
                  </div>
                  <div className="pt-4 border-t border-white/10 flex justify-between font-mono">
                    <span className="text-xs text-gray-400">Total Charged</span>
                    <span className="text-base font-bold text-white">${cartTotal} USD</span>
                  </div>
                  <button
                    onClick={() => setCheckoutComplete(true)}
                    className="w-full py-3 text-xs font-semibold uppercase tracking-widest bg-cyan-400 hover:bg-cyan-300 text-black rounded"
                  >
                    Place Demonstration Order
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-white/[0.08] bg-[#05060a] py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-gray-500">
          <div>
            <span className="font-display font-bold text-white tracking-widest uppercase">VANTA STORE</span>
            <div className="text-[11px] font-mono mt-0.5">E-Commerce Demonstration built by AIVION TECH</div>
          </div>
          <div>
            <a href="/" className="text-cyan-400 hover:underline">← Return to AIVION TECH Software House</a>
          </div>
        </div>
      </footer>
    </div>
  );
};
