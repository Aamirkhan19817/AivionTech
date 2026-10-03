import React, { useState } from 'react';
import { DemoHeader } from './DemoHeader';
import { Globe2, TrendingUp, ShieldCheck, Briefcase, Users, ChevronRight, CheckCircle2 } from 'lucide-react';

export const VertexGroup: React.FC = () => {
  const [inquirySubmitted, setInquirySubmitted] = useState(false);

  return (
    <div className="min-h-screen bg-[#060910] text-[#f1f5f9] font-sans selection:bg-slate-500/30">
      <DemoHeader currentDemoId="corporate" />

      {/* Vertex Navbar */}
      <nav className="border-b border-white/[0.08] bg-[#060910]/90 backdrop-blur-md px-6 py-4 sticky top-11 z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded bg-slate-800 border border-slate-600 flex items-center justify-center font-serif font-bold text-white">
              V
            </div>
            <span className="font-serif font-bold text-lg tracking-widest text-white uppercase">
              VERTEX GROUP
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-xs font-mono uppercase tracking-widest text-gray-400">
            <a href="#about" className="hover:text-white transition-colors">Overview</a>
            <a href="#practices" className="hover:text-white transition-colors">Practices</a>
            <a href="#governance" className="hover:text-white transition-colors">Governance</a>
            <a href="#contact" className="hover:text-white transition-colors">Institutional Inquiries</a>
          </div>

          <a
            href="#contact"
            className="px-4 py-2 text-xs font-mono uppercase tracking-wider bg-slate-800 hover:bg-slate-700 text-white rounded border border-white/10 transition-colors"
          >
            Client Portal
          </a>
        </div>
      </nav>

      {/* Corporate Hero */}
      <section className="relative py-24 px-6 max-w-6xl mx-auto text-center overflow-hidden">
        {/* Background Skyscraper Backdrop */}
        <div className="relative rounded-2xl overflow-hidden mb-12 aspect-[21/9] border border-white/10 shadow-2xl">
          <img
            src="/AivionTech/assets/images/vertex_corporate_hq_1790954179058.jpg"
            alt="Vertex Group Global Headquarters"
            className="w-full h-full object-cover brightness-[0.45] contrast-110"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#060910] via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 text-left">
            <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase bg-slate-900/80 px-2.5 py-1 rounded border border-white/10">
              GLOBAL HQ // LONDON Â· NEW YORK Â· SINGAPORE
            </span>
            <div className="font-serif text-xl sm:text-2xl text-white font-normal mt-2">
              Sovereign Capital & Cross-Border Advisory
            </div>
          </div>
        </div>

        <div className="text-xs font-mono uppercase tracking-[0.3em] text-slate-400 mb-4">
          Strategic Capital & Global Institutional Advisory
        </div>
        <h1 className="font-serif text-4xl sm:text-6xl font-normal text-white mb-6 leading-tight max-w-4xl mx-auto">
          Navigating Complexity. Architecting Sovereign Growth.
        </h1>
        <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed mb-12">
          Vertex Group advises multinational corporations, sovereign wealth funds, and critical infrastructure operators on complex cross-border capitalization and enterprise transformation.
        </p>

        {/* 4 Quantitative Key Indicators */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 rounded-2xl bg-gray-900/60 border border-white/[0.08] backdrop-blur-xl">
          <div className="text-center">
            <div className="font-serif text-3xl sm:text-4xl text-white font-normal">$48B+</div>
            <div className="text-[11px] font-mono text-gray-400 uppercase mt-1">Transaction Value</div>
          </div>
          <div className="text-center">
            <div className="font-serif text-3xl sm:text-4xl text-white font-normal">28</div>
            <div className="text-[11px] font-mono text-gray-400 uppercase mt-1">Global Enclaves</div>
          </div>
          <div className="text-center">
            <div className="font-serif text-3xl sm:text-4xl text-white font-normal">99.8%</div>
            <div className="text-[11px] font-mono text-gray-400 uppercase mt-1">Execution Certainty</div>
          </div>
          <div className="text-center">
            <div className="font-serif text-3xl sm:text-4xl text-white font-normal">450+</div>
            <div className="text-[11px] font-mono text-gray-400 uppercase mt-1">Advisory Mandates</div>
          </div>
        </div>
      </section>

      {/* Strategic Practices */}
      <section id="practices" className="py-20 px-6 max-w-7xl mx-auto border-t border-white/[0.08]">
        <div className="max-w-2xl mb-12">
          <div className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-2">Practice Disciplines</div>
          <h2 className="font-serif text-3xl text-white">Institutional Capabilities</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-8 rounded-xl bg-gray-900/40 border border-white/10 hover:border-slate-500 transition-colors">
            <TrendingUp className="w-6 h-6 text-slate-300 mb-4" />
            <h3 className="font-serif text-xl text-white mb-2">Cross-Border Mergers & Acquisitions</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Bespoke structural structuring for high-complexity corporate acquisitions, carve-outs, and strategic joint ventures.
            </p>
          </div>
          <div className="p-8 rounded-xl bg-gray-900/40 border border-white/10 hover:border-slate-500 transition-colors">
            <Globe2 className="w-6 h-6 text-slate-300 mb-4" />
            <h3 className="font-serif text-xl text-white mb-2">Sovereign Infrastructure Finance</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Syndicated debt and equity financing for telecommunications, clean energy grid transitions, and strategic logistics.
            </p>
          </div>
          <div className="p-8 rounded-xl bg-gray-900/40 border border-white/10 hover:border-slate-500 transition-colors">
            <ShieldCheck className="w-6 h-6 text-slate-300 mb-4" />
            <h3 className="font-serif text-xl text-white mb-2">Enterprise Crisis & Restructuring</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Stabilizing distressed balance sheets, liquidity recapitalization, and executive fiduciary governance turnaround.
            </p>
          </div>
        </div>
      </section>

      {/* Sovereign Governance & Executive Boardroom */}
      <section id="governance" className="py-20 px-6 max-w-7xl mx-auto border-t border-white/[0.08]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="text-xs font-mono uppercase tracking-[0.25em] text-slate-400">
              Executive Fiduciary Advisory
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-white font-normal leading-tight">
              Direct Senior Counsel to Sovereign Boards & Global Enclaves.
            </h2>
            <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
              Every Vertex advisory engagement is personally orchestrated by former sovereign treasury officials, senior infrastructure fellows, and cross-border M&A partners. We safeguard institutional longevity across geopolitical volatility.
            </p>
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10 font-mono text-xs">
              <div className="p-4 rounded-xl bg-gray-900/60 border border-white/10">
                <div className="text-slate-400 uppercase text-[10px]">Confidentiality Standard</div>
                <div className="text-white font-bold text-base mt-1">Air-Gapped Briefings</div>
              </div>
              <div className="p-4 rounded-xl bg-gray-900/60 border border-white/10">
                <div className="text-slate-400 uppercase text-[10px]">Lead Partner Ratio</div>
                <div className="text-white font-bold text-base mt-1">1:2 Mandate Density</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl group">
              <img
                src="/AivionTech/assets/images/vertex_boardroom_1790954515205.jpg"
                alt="Vertex Group Global Boardroom"
                className="w-full h-80 sm:h-96 object-cover brightness-90 group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6">
                <div>
                  <div className="text-xs font-serif text-white">Vertex Sovereign Advisory Chamber</div>
                  <div className="text-[11px] font-mono text-gray-400 mt-0.5">London / Mayfair Executive Enclave</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Institutional Inquiry Form */}
      <section id="contact" className="py-20 px-6 max-w-3xl mx-auto border-t border-white/[0.08]">
        <div className="rounded-2xl bg-gray-900/70 border border-white/10 p-8 shadow-2xl">
          {inquirySubmitted ? (
            <div className="py-8 text-center space-y-3">
              <CheckCircle2 className="w-10 h-10 text-slate-300 mx-auto" />
              <h3 className="font-serif text-2xl text-white">Mandate Inquiry Received</h3>
              <p className="text-xs text-gray-400">
                A Senior Managing Director from Vertex Group will reach out via encrypted communication channels.
              </p>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setInquirySubmitted(true);
              }}
              className="space-y-4"
            >
              <h3 className="font-serif text-2xl text-white mb-2">Initiate Confidential Advisory Mandate</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  required
                  placeholder="Principal Name"
                  className="bg-gray-950 border border-white/10 rounded px-3 py-2 text-xs text-white"
                />
                <input
                  type="email"
                  required
                  placeholder="Institutional Email"
                  className="bg-gray-950 border border-white/10 rounded px-3 py-2 text-xs text-white"
                />
              </div>
              <textarea
                required
                rows={3}
                placeholder="Scope of advisory engagement..."
                className="w-full bg-gray-950 border border-white/10 rounded px-3 py-2 text-xs text-white resize-none"
              />
              <button
                type="submit"
                className="w-full py-3 text-xs font-mono uppercase tracking-widest bg-slate-200 text-black hover:bg-white rounded transition-colors font-bold"
              >
                Submit Advisory Mandate
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/[0.08] bg-[#030508] py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-gray-500 font-mono">
          <div>
            <span className="font-serif text-white tracking-widest uppercase">VERTEX GROUP</span>
            <div className="text-[11px] mt-0.5">Corporate Demonstration built by AIVION TECH</div>
          </div>
          <div>
            <a href="/" className="text-slate-400 hover:underline">â† Return to AIVION TECH Software House</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

