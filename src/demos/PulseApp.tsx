import React, { useState } from 'react';
import { DemoHeader } from './DemoHeader';
import { Smartphone, Heart, Moon, Zap, Flame, QrCode, Download, Apple, Play, CheckCircle2, X } from 'lucide-react';

export const PulseApp: React.FC = () => {
  const [activeScreen, setActiveScreen] = useState<'vitals' | 'workout' | 'sleep'>('vitals');
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);
  const [hapticEnabled, setHapticEnabled] = useState(true);

  return (
    <div className="min-h-screen bg-[#08070d] text-[#fdf2f8] font-sans selection:bg-pink-500/30">
      <DemoHeader currentDemoId="mobile-app" />

      {/* Pulse Navbar */}
      <nav className="border-b border-pink-950/60 bg-[#08070d]/90 backdrop-blur-md px-6 py-4 sticky top-11 z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-pink-500 flex items-center justify-center text-white shadow-[0_0_12px_rgba(236,72,153,0.5)]">
              <Heart className="w-4 h-4 fill-white" />
            </div>
            <span className="font-display font-black text-xl tracking-wider text-white">
              PULSE
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-xs font-mono text-gray-400">
            <a href="#mockup" className="hover:text-pink-400 transition-colors">Interactive OS</a>
            <a href="#vitals" className="hover:text-pink-400 transition-colors">Biometrics</a>
            <a href="#recovery" className="hover:text-pink-400 transition-colors">Recovery Science</a>
          </div>

          <button
            onClick={() => setIsDownloadOpen(true)}
            className="px-4 py-2 text-xs font-semibold bg-pink-500 hover:bg-pink-400 text-white rounded-full transition-all shadow-[0_0_15px_rgba(236,72,153,0.4)] flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Get Pulse</span>
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-6 max-w-7xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-950/60 border border-pink-500/30 text-xs font-mono text-pink-400 mb-6">
          <Zap className="w-3.5 h-3.5" />
          <span>Autonomous Biometric Telemetry OS</span>
        </div>

        <h1 className="font-display text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight mb-6">
          The Human Operating System, Calibrated.
        </h1>

        <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed mb-12">
          Pulse synchronizes non-invasive cardiac telemetry, autonomic nervous system recovery metrics, and cellular metabolic recovery into real-time physical mastery.
        </p>

        {/* Interactive Phone Frame Mockup */}
        <div id="mockup" className="max-w-md mx-auto relative mb-16">
          {/* Screen Switcher Tabs */}
          <div className="flex justify-center gap-2 mb-6">
            {(['vitals', 'workout', 'sleep'] as const).map((screen) => (
              <button
                key={screen}
                onClick={() => setActiveScreen(screen)}
                className={`px-4 py-1.5 text-xs font-mono uppercase tracking-wider rounded-full transition-all ${
                  activeScreen === screen
                    ? 'bg-pink-500 text-white font-bold shadow-[0_0_12px_rgba(236,72,153,0.4)]'
                    : 'bg-gray-900 text-gray-400 border border-white/10'
                }`}
              >
                {screen === 'vitals' ? 'Cardio Vitals' : screen === 'workout' ? 'Strain Index' : 'Sleep Recovery'}
              </button>
            ))}
          </div>

          {/* Phone Enclosure Chassis */}
          <div className="relative mx-auto w-72 sm:w-80 h-[560px] rounded-[48px] bg-gray-950 border-[6px] border-gray-800 shadow-[0_0_50px_rgba(236,72,153,0.2)] p-4 flex flex-col justify-between overflow-hidden">
            {/* Dynamic Island */}
            <div className="absolute top-3 left-1/2 -translate-x-1/2 w-24 h-5 bg-black rounded-full z-20 flex items-center justify-center">
              <span className="w-2 h-2 rounded-full bg-pink-500/80 mr-2" />
              <span className="text-[9px] font-mono text-gray-400">PULSE LIVE</span>
            </div>

            {/* Screen Content */}
            <div className="pt-8 h-full flex flex-col justify-between text-left">
              {activeScreen === 'vitals' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-baseline pt-2">
                    <span className="text-[11px] font-mono text-gray-400 uppercase">Resting Pulse</span>
                    <span className="text-xs font-mono text-emerald-400">OPTIMAL</span>
                  </div>
                  <div className="text-4xl font-mono font-bold text-white flex items-baseline gap-2">
                    54 <span className="text-sm text-pink-400 font-sans">BPM</span>
                  </div>
                  <div className="h-20 bg-gray-900/60 rounded-xl p-3 border border-white/[0.06] flex items-center justify-center">
                    <div className="w-full flex items-end justify-between h-12 gap-1 px-2">
                      {[40, 55, 70, 65, 80, 52, 60, 48, 75, 54].map((val, i) => (
                        <div
                          key={i}
                          className="w-2 bg-pink-500 rounded-t"
                          style={{ height: `${val}%` }}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="p-3 bg-pink-950/40 rounded-xl border border-pink-500/30 text-xs">
                    <div className="text-pink-300 font-semibold mb-1">HRV Resilience: 88 ms</div>
                    <div className="text-[11px] text-gray-400">Autonomic nervous system is prime for peak physical exertion.</div>
                  </div>
                </div>
              )}

              {activeScreen === 'workout' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-baseline pt-2">
                    <span className="text-[11px] font-mono text-gray-400 uppercase">Daily Strain Index</span>
                    <span className="text-xs font-mono text-pink-400">ACTIVE SESSION</span>
                  </div>
                  <div className="text-4xl font-mono font-bold text-white flex items-baseline gap-2">
                    16.8 <span className="text-sm text-gray-400 font-sans">/ 21.0</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-2.5 rounded-lg bg-gray-900 border border-white/10">
                      <div className="text-[10px] text-gray-400 font-mono">Calories Burned</div>
                      <div className="text-base font-mono font-bold text-white mt-1">1,240 kcal</div>
                    </div>
                    <div className="p-2.5 rounded-lg bg-gray-900 border border-white/10">
                      <div className="text-[10px] text-gray-400 font-mono">Zone 4 Threshold</div>
                      <div className="text-base font-mono font-bold text-pink-400 mt-1">42 mins</div>
                    </div>
                  </div>
                </div>
              )}

              {activeScreen === 'sleep' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-baseline pt-2">
                    <span className="text-[11px] font-mono text-gray-400 uppercase">Sleep Architecture</span>
                    <span className="text-xs font-mono text-indigo-400">RESTORATIVE</span>
                  </div>
                  <div className="text-4xl font-mono font-bold text-white flex items-baseline gap-2">
                    8h 14m <span className="text-sm text-emerald-400 font-sans">96% score</span>
                  </div>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between text-[11px] text-gray-300">
                      <span>Deep Sleep</span>
                      <span className="font-mono text-pink-300">2h 18m</span>
                    </div>
                    <div className="w-full bg-gray-900 rounded-full h-1.5 overflow-hidden">
                      <div className="bg-pink-500 h-full w-[35%]" />
                    </div>
                    <div className="flex justify-between text-[11px] text-gray-300">
                      <span>REM Cognitive Sleep</span>
                      <span className="font-mono text-indigo-300">2h 45m</span>
                    </div>
                    <div className="w-full bg-gray-900 rounded-full h-1.5 overflow-hidden">
                      <div className="bg-indigo-500 h-full w-[45%]" />
                    </div>
                  </div>
                </div>
              )}

              {/* Bottom Nav inside Phone Frame */}
              <div className="pt-4 border-t border-white/[0.08] flex items-center justify-around text-gray-400">
                <Heart className={`w-5 h-5 ${activeScreen === 'vitals' ? 'text-pink-400' : ''}`} />
                <Flame className={`w-5 h-5 ${activeScreen === 'workout' ? 'text-pink-400' : ''}`} />
                <Moon className={`w-5 h-5 ${activeScreen === 'sleep' ? 'text-pink-400' : ''}`} />
              </div>
            </div>
          </div>
        </div>

        {/* Download Modal Trigger */}
        <div className="flex justify-center mb-20">
          <button
            onClick={() => setIsDownloadOpen(true)}
            className="px-8 py-3.5 text-xs font-semibold uppercase tracking-wider bg-pink-500 hover:bg-pink-400 text-white rounded-full transition-all shadow-[0_0_20px_rgba(236,72,153,0.4)] flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            <span>Download for iOS & Android</span>
          </button>
        </div>

        {/* Triple Phone Multi-Screen Showcase Section */}
        <div className="pt-16 border-t border-pink-950/60 text-left">
          <div className="max-w-2xl mb-12">
            <div className="text-xs font-mono uppercase tracking-[0.25em] text-pink-400 mb-2">
              Next-Gen Native UI Architecture
            </div>
            <h2 className="font-display text-3xl font-bold text-white">Three Synchronized Biometric Engines</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Screen 1: ECG Cardio Waveform */}
            <div className="rounded-2xl bg-gray-950/80 border border-pink-500/30 p-5 flex flex-col justify-between shadow-xl">
              <div>
                <div className="w-full aspect-[9/14] rounded-xl bg-black border border-white/10 p-4 font-mono text-xs flex flex-col justify-between mb-4">
                  <div className="flex justify-between items-center text-pink-400 pb-2 border-b border-white/10">
                    <span>LIVE CARDIO ECG</span>
                    <span className="text-emerald-400">SINUS 58 BPM</span>
                  </div>
                  {/* ECG Line */}
                  <svg viewBox="0 0 200 60" className="w-full h-16 text-pink-400 my-auto">
                    <path
                      d="M 0 30 L 40 30 L 48 30 L 52 10 L 58 50 L 64 25 L 70 30 L 100 30 L 108 30 L 112 10 L 118 50 L 124 25 L 130 30 L 200 30"
                      fill="none"
                      stroke="#ec4899"
                      strokeWidth="2.5"
                    />
                  </svg>
                  <div className="p-2.5 rounded bg-gray-900 border border-white/5 text-[10px]">
                    <div className="text-gray-400">Heart Rate Variability</div>
                    <div className="text-white font-bold text-sm mt-0.5">89 ms (Resilient)</div>
                  </div>
                </div>
                <h3 className="font-display font-bold text-lg text-white mb-1">Autonomous Cardio Telemetry</h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Real-time optical sensor stream processing detects arrhythmias and micro-fatigue before symptoms arise.
                </p>
              </div>
            </div>

            {/* Screen 2: Recovery Gauge */}
            <div className="rounded-2xl bg-gray-950/80 border border-pink-500/30 p-5 flex flex-col justify-between shadow-xl">
              <div>
                <div className="w-full aspect-[9/14] rounded-xl bg-black border border-white/10 p-4 font-mono text-xs flex flex-col justify-between mb-4">
                  <div className="flex justify-between items-center text-pink-400 pb-2 border-b border-white/10">
                    <span>DAILY RECOVERY</span>
                    <span className="text-emerald-400">PRIME STATE</span>
                  </div>
                  {/* Radial Gauge */}
                  <div className="relative w-28 h-28 mx-auto my-auto flex items-center justify-center">
                    <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                      <circle cx="50" cy="50" r="40" stroke="#1f2937" strokeWidth="8" fill="none" />
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        stroke="#ec4899"
                        strokeWidth="8"
                        strokeDasharray="251"
                        strokeDashoffset="25"
                        strokeLinecap="round"
                        fill="none"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="font-mono text-2xl font-bold text-white">92%</span>
                      <span className="text-[9px] text-gray-400 uppercase">Recovery</span>
                    </div>
                  </div>
                  <div className="p-2.5 rounded bg-gray-900 border border-white/5 text-[10px]">
                    <div className="text-gray-400">Target Strain Ceiling</div>
                    <div className="text-white font-bold text-sm mt-0.5">18.5 Max Exertion</div>
                  </div>
                </div>
                <h3 className="font-display font-bold text-lg text-white mb-1">Autonomous Recovery Index</h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Calculates autonomic nervous balance to prescribe exact daily training limits and metabolic rest.
                </p>
              </div>
            </div>

            {/* Screen 3: Sleep Architecture */}
            <div className="rounded-2xl bg-gray-950/80 border border-pink-500/30 p-5 flex flex-col justify-between shadow-xl">
              <div>
                <div className="w-full aspect-[9/14] rounded-xl bg-black border border-white/10 p-4 font-mono text-xs flex flex-col justify-between mb-4">
                  <div className="flex justify-between items-center text-indigo-400 pb-2 border-b border-white/10">
                    <span>SLEEP HYPNOGRAM</span>
                    <span className="text-indigo-300">8h 20m</span>
                  </div>
                  {/* Hypnogram Bars */}
                  <div className="space-y-2 my-auto">
                    <div>
                      <div className="flex justify-between text-[10px] text-gray-400 mb-1">
                        <span>Deep Physical Wave</span>
                        <span className="text-pink-400 font-bold">28% (2h 14m)</span>
                      </div>
                      <div className="w-full bg-gray-900 h-2 rounded overflow-hidden">
                        <div className="bg-pink-500 h-full w-[28%]" />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-[10px] text-gray-400 mb-1">
                        <span>REM Cognitive Consolidation</span>
                        <span className="text-indigo-400 font-bold">32% (2h 40m)</span>
                      </div>
                      <div className="w-full bg-gray-900 h-2 rounded overflow-hidden">
                        <div className="bg-indigo-500 h-full w-[32%]" />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-[10px] text-gray-400 mb-1">
                        <span>Light Core Restoration</span>
                        <span className="text-cyan-400 font-bold">40% (3h 26m)</span>
                      </div>
                      <div className="w-full bg-gray-900 h-2 rounded overflow-hidden">
                        <div className="bg-cyan-500 h-full w-[40%]" />
                      </div>
                    </div>
                  </div>
                  <div className="p-2.5 rounded bg-gray-900 border border-white/5 text-[10px]">
                    <div className="text-gray-400">Sleep Efficiency Score</div>
                    <div className="text-white font-bold text-sm mt-0.5">97% Optimal</div>
                  </div>
                </div>
                <h3 className="font-display font-bold text-lg text-white mb-1">Cellular Sleep Architecture</h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Continuously tracks sleep micro-stages to guarantee cognitive consolidation and growth hormone release.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Download Concept Modal */}
      {isDownloadOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-sm bg-gray-950 border border-pink-500/30 rounded-2xl p-6 text-center text-white shadow-2xl">
            <button
              onClick={() => setIsDownloadOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-12 h-12 rounded-xl bg-pink-500 text-white flex items-center justify-center mx-auto mb-4 shadow-[0_0_15px_rgba(236,72,153,0.5)]">
              <QrCode className="w-6 h-6" />
            </div>

            <h3 className="font-display font-bold text-xl mb-1">Scan to Install Pulse</h3>
            <p className="text-xs text-gray-400 mb-6">
              Instant App Clip preview compatible with iOS 18+ and Android 15+.
            </p>

            <div className="w-40 h-40 mx-auto bg-white p-3 rounded-xl mb-6 shadow-md flex items-center justify-center">
              {/* Simulated QR Code Pattern */}
              <div className="w-full h-full border-4 border-black border-dashed flex items-center justify-center text-black font-mono text-[10px] font-bold text-center">
                PULSE // APP CLIP DEMO
              </div>
            </div>

            <div className="space-y-2">
              <button
                onClick={() => setIsDownloadOpen(false)}
                className="w-full py-2.5 text-xs font-mono uppercase bg-gray-900 hover:bg-gray-800 text-gray-200 rounded border border-white/10"
              >
                App Store (iOS)
              </button>
              <button
                onClick={() => setIsDownloadOpen(false)}
                className="w-full py-2.5 text-xs font-mono uppercase bg-gray-900 hover:bg-gray-800 text-gray-200 rounded border border-white/10"
              >
                Google Play (Android)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-pink-950/60 bg-[#050408] py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-gray-500 font-mono">
          <div>
            <span className="font-bold text-white tracking-widest uppercase">PULSE</span>
            <div className="text-[11px] mt-0.5">Mobile Application Demonstration built by AIVION TECH</div>
          </div>
          <div>
            <a href="/" className="text-pink-400 hover:underline">â† Return to AIVION TECH Software House</a>
          </div>
        </div>
      </footer>
    </div>
  );
};





