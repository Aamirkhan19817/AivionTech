import React, { useState } from 'react';
import { DemoHeader } from './DemoHeader';
import { Activity, Shield, Zap, Database, Check, ChevronDown, ChevronUp, ArrowRight, BarChart2, Layers, Cpu } from 'lucide-react';

export const FlowStack: React.FC = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');
  const [activeTab, setActiveTab] = useState<'telemetry' | 'deployments' | 'security'>('telemetry');
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [simulatedLoad, setSimulatedLoad] = useState(84);

  const pricingPlans = [
    {
      name: 'Developer',
      desc: 'Ideal for early-stage prototypes and autonomous engineers.',
      price: billingCycle === 'annual' ? 39 : 49,
      features: ['Up to 5 microservices', '100,000 monthly events', 'Continuous rollback engine', 'Community Discord support'],
    },
    {
      name: 'Growth Cluster',
      popular: true,
      desc: 'Engineered for scaling startups demanding high-throughput SLA.',
      price: billingCycle === 'annual' ? 119 : 149,
      features: ['Unlimited microservices', '10M monthly events', 'Automated multi-region failover', '99.99% uptime guarantee', '24/7 Dedicated engineer response'],
    },
    {
      name: 'Enterprise Mesh',
      desc: 'Dedicated single-tenant infrastructure with custom compliance.',
      price: billingCycle === 'annual' ? 349 : 429,
      features: ['Custom VPC peering', 'Bespoke telemetry retention', 'SOC2 & HIPAA certified pipelines', 'Designated lead systems architect'],
    },
  ];

  const faqs = [
    {
      q: 'How does FlowStack integrate with our existing Kubernetes cluster?',
      a: 'FlowStack ships with a lightweight zero-overhead daemon that installs with a single Helm chart command, provisioning end-to-end telemetry within 90 seconds.',
    },
    {
      q: 'Can we run FlowStack in air-gapped on-premise infrastructure?',
      a: 'Yes. Enterprise Mesh licenses allow full offline on-premise deployments with zero external telemetry egress.',
    },
    {
      q: 'What is the average latency penalty incurred by the edge proxy?',
      a: 'Our Rust-based proxy benchmarks at sub-0.4 millisecond median overhead at peak loads exceeding 50,000 requests per second.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#070b14] text-[#f1f5f9] font-sans selection:bg-blue-500/30">
      <DemoHeader currentDemoId="saas" />

      {/* FlowStack Navbar */}
      <nav className="border-b border-white/[0.08] bg-[#070b14]/90 backdrop-blur-md px-6 py-4 sticky top-11 z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded bg-blue-600 flex items-center justify-center font-bold text-white shadow-[0_0_12px_rgba(59,130,246,0.5)]">
              F
            </div>
            <span className="font-display font-bold text-lg tracking-wider text-white">
              FLOWSTACK
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-xs font-mono text-gray-400">
            <a href="#features" className="hover:text-blue-400 transition-colors">Platform</a>
            <a href="#dashboard" className="hover:text-blue-400 transition-colors">Live Telemetry</a>
            <a href="#pricing" className="hover:text-blue-400 transition-colors">Pricing</a>
            <a href="#faq" className="hover:text-blue-400 transition-colors">Documentation</a>
          </div>

          <div className="flex items-center gap-3">
            <button className="hidden sm:inline-block text-xs font-mono text-gray-300 hover:text-white px-3 py-2">
              Sign In
            </button>
            <a
              href="#pricing"
              className="px-4 py-2 text-xs font-semibold bg-blue-500 hover:bg-blue-400 text-white rounded transition-colors shadow-[0_0_15px_rgba(59,130,246,0.4)]"
            >
              Start Free Trial
            </a>
          </div>
        </div>
      </nav>

      {/* SaaS Hero */}
      <section className="relative py-24 px-6 text-center max-w-5xl mx-auto overflow-hidden">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-xs font-mono text-blue-400 mb-6">
          <Zap className="w-3.5 h-3.5" />
          <span>FlowStack 4.0 // Autonomous Cloud Mesh</span>
        </div>

        <h1 className="font-display text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight mb-6">
          Zero-Downtime Microservice Orchestration & Observability
        </h1>

        <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed mb-10">
          Unify container orchestration, predictive canary deployments, and sub-millisecond edge routing into one sovereign engineering control plane.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <button className="w-full sm:w-auto px-8 py-3.5 text-xs font-semibold uppercase tracking-wider bg-blue-500 hover:bg-blue-400 text-white rounded shadow-[0_0_20px_rgba(59,130,246,0.4)] flex items-center justify-center gap-2">
            <span>Deploy First Cluster</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button className="w-full sm:w-auto px-8 py-3.5 text-xs font-semibold uppercase tracking-wider bg-gray-900 border border-white/10 hover:border-blue-400 text-gray-300 rounded">
            Book Technical Architecture Call
          </button>
        </div>

        {/* Interactive Dashboard Preview */}
        <div id="dashboard" className="rounded-2xl bg-gray-900/80 border border-blue-500/30 shadow-2xl p-6 sm:p-8 text-left backdrop-blur-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10 mb-6">
            <div>
              <div className="text-xs font-mono text-blue-400 uppercase tracking-widest">CLUSTER STATUS // US-EAST-VIRGINIA</div>
              <h2 className="font-display font-bold text-xl text-white">Live Cluster Ingress Telemetry</h2>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-xs font-mono text-emerald-400 font-semibold">ALL 128 NODES HEALTHY</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className="p-4 rounded-xl bg-gray-950/70 border border-white/10">
              <div className="text-xs font-mono text-gray-400">Total Throughput</div>
              <div className="text-2xl font-mono font-bold text-white mt-1">42,890 req/s</div>
              <div className="text-[11px] text-emerald-400 font-mono mt-1">↑ +14% vs previous 24h</div>
            </div>
            <div className="p-4 rounded-xl bg-gray-950/70 border border-white/10">
              <div className="text-xs font-mono text-gray-400">P99 Edge Latency</div>
              <div className="text-2xl font-mono font-bold text-cyan-400 mt-1">0.38 ms</div>
              <div className="text-[11px] text-gray-400 font-mono mt-1">Global median: 0.22ms</div>
            </div>
            <div className="p-4 rounded-xl bg-gray-950/70 border border-white/10">
              <div className="text-xs font-mono text-gray-400">Mesh CPU Utilization</div>
              <div className="text-2xl font-mono font-bold text-blue-400 mt-1">{simulatedLoad}%</div>
              <div className="text-[11px] text-blue-300 font-mono mt-1">Autoscaling headroom: OK</div>
            </div>
          </div>

          {/* Interactive Load Tester Slider */}
          <div className="p-4 rounded-xl bg-gray-950/50 border border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
            <span className="text-xs font-mono text-gray-300">Simulate Cluster Stress Load:</span>
            <input
              type="range"
              min="20"
              max="98"
              value={simulatedLoad}
              onChange={(e) => setSimulatedLoad(Number(e.target.value))}
              className="w-full sm:w-64 accent-blue-500"
            />
            <span className="text-xs font-mono font-bold text-blue-400">{simulatedLoad}% Peak Load</span>
          </div>

          {/* High-Fidelity Telemetry Chart Canvas / Sparklines UI */}
          <div className="p-5 rounded-xl bg-black/60 border border-blue-500/20 font-mono text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-white/10 text-gray-400 mb-4">
              <span>REAL-TIME PACKET FLOW // INGRESS SHARDS 01-08</span>
              <span className="text-blue-400">FPS: 60.0 · LOSS: 0.000%</span>
            </div>
            {/* Visual SVG Telemetry Waveform */}
            <svg viewBox="0 0 600 120" className="w-full h-24 text-blue-400">
              <defs>
                <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              <path
                d="M 0 80 Q 50 20, 100 60 T 200 40 T 300 75 T 400 30 T 500 50 T 600 25 L 600 120 L 0 120 Z"
                fill="url(#chartGrad)"
              />
              <path
                d="M 0 80 Q 50 20, 100 60 T 200 40 T 300 75 T 400 30 T 500 50 T 600 25"
                fill="none"
                stroke="#3b82f6"
                strokeWidth="2.5"
              />
              {/* Secondary latency curve */}
              <path
                d="M 0 100 Q 80 85, 160 95 T 320 88 T 480 92 T 600 85"
                fill="none"
                stroke="#06b6d4"
                strokeWidth="1.5"
                strokeDasharray="4 4"
              />
            </svg>
            <div className="flex items-center justify-between text-[11px] text-gray-500 mt-2">
              <span>00:00:00 (T-60s)</span>
              <span>LIVE EDGE INGESTION BUFFER</span>
              <span className="text-emerald-400 font-bold">NORMALIZED</span>
            </div>
          </div>
        </div>

        {/* Feature Mockup Cards Grid */}
        <div id="features" className="mt-20 pt-12 border-t border-white/[0.08] text-left">
          <div className="max-w-2xl mb-10">
            <div className="text-xs font-mono uppercase tracking-[0.25em] text-blue-400 mb-2">Platform Capabilities</div>
            <h2 className="font-display text-3xl font-bold text-white">Full-Stack Cloud Infrastructure Control</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1: Canary Deployments UI */}
            <div className="rounded-xl bg-gray-900/60 border border-white/10 p-6 flex flex-col justify-between">
              <div>
                <div className="w-full aspect-video rounded-lg bg-black/80 border border-blue-500/20 mb-4 p-3 font-mono text-[10px] text-gray-300 flex flex-col justify-between">
                  <div className="flex justify-between items-center text-blue-400 border-b border-white/10 pb-1.5">
                    <span>CANARY ROLLOUT v4.8</span>
                    <span className="text-emerald-400">90% TRAFFIC</span>
                  </div>
                  <div className="space-y-1.5 my-auto">
                    <div className="flex justify-between text-gray-400">
                      <span>Baseline (v4.7)</span>
                      <span>10%</span>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-1.5 overflow-hidden">
                      <div className="bg-gray-500 h-full w-[10%]" />
                    </div>
                    <div className="flex justify-between text-blue-300 font-semibold">
                      <span>Canary (v4.8)</span>
                      <span>90%</span>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-1.5 overflow-hidden">
                      <div className="bg-blue-500 h-full w-[90%]" />
                    </div>
                  </div>
                  <div className="text-emerald-400 flex items-center gap-1 text-[9px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    Automated health checks passing (0 err)
                  </div>
                </div>
                <h3 className="font-display font-bold text-lg text-white mb-1.5">Autonomous Canary Shifting</h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Traffic automatically migrates to healthy pods based on live statistical error budgets and P99 latency alerts.
                </p>
              </div>
            </div>

            {/* Card 2: Edge Routing Mesh UI */}
            <div className="rounded-xl bg-gray-900/60 border border-white/10 p-6 flex flex-col justify-between">
              <div>
                <div className="w-full aspect-video rounded-lg bg-black/80 border border-cyan-500/20 mb-4 p-3 font-mono text-[10px] text-gray-300 flex flex-col justify-between">
                  <div className="flex justify-between items-center text-cyan-400 border-b border-white/10 pb-1.5">
                    <span>GLOBAL EDGE TOPOLOGY</span>
                    <span className="text-white">42 POPS</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 my-auto text-[10px]">
                    <div className="p-1.5 rounded bg-gray-900 border border-white/5">
                      <div className="text-gray-400">Tokyo Edge</div>
                      <div className="text-cyan-300 font-bold">0.18ms</div>
                    </div>
                    <div className="p-1.5 rounded bg-gray-900 border border-white/5">
                      <div className="text-gray-400">Frankfurt Edge</div>
                      <div className="text-cyan-300 font-bold">0.24ms</div>
                    </div>
                    <div className="p-1.5 rounded bg-gray-900 border border-white/5">
                      <div className="text-gray-400">Virginia Edge</div>
                      <div className="text-cyan-300 font-bold">0.12ms</div>
                    </div>
                    <div className="p-1.5 rounded bg-gray-900 border border-white/5">
                      <div className="text-gray-400">Singapore Edge</div>
                      <div className="text-cyan-300 font-bold">0.21ms</div>
                    </div>
                  </div>
                  <div className="text-cyan-400 text-[9px]">BGP Anycast routing enabled</div>
                </div>
                <h3 className="font-display font-bold text-lg text-white mb-1.5">Sub-Millisecond Edge Mesh</h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Anycast routing terminates TLS within 50km of 98% of world internet users, eliminating round-trip latency.
                </p>
              </div>
            </div>

            {/* Card 3: Distributed Trace UI */}
            <div className="rounded-xl bg-gray-900/60 border border-white/10 p-6 flex flex-col justify-between">
              <div>
                <div className="w-full aspect-video rounded-lg bg-black/80 border border-teal-500/20 mb-4 p-3 font-mono text-[10px] text-gray-300 flex flex-col justify-between">
                  <div className="flex justify-between items-center text-teal-400 border-b border-white/10 pb-1.5">
                    <span>DISTRIBUTED TRACE #TRC-809</span>
                    <span className="text-emerald-400">200 OK</span>
                  </div>
                  <div className="space-y-1.5 my-auto">
                    <div className="flex items-center gap-1.5">
                      <span className="w-16 text-gray-400 truncate">api-gw</span>
                      <div className="flex-1 bg-gray-800 h-2 rounded overflow-hidden">
                        <div className="bg-teal-500 h-full w-[95%]" />
                      </div>
                      <span className="text-[9px] text-gray-400">1.2ms</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-16 text-gray-400 truncate">auth-srv</span>
                      <div className="flex-1 bg-gray-800 h-2 rounded overflow-hidden ml-4">
                        <div className="bg-blue-400 h-full w-[40%]" />
                      </div>
                      <span className="text-[9px] text-gray-400">0.4ms</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-16 text-gray-400 truncate">sql-db</span>
                      <div className="flex-1 bg-gray-800 h-2 rounded overflow-hidden ml-8">
                        <div className="bg-emerald-400 h-full w-[30%]" />
                      </div>
                      <span className="text-[9px] text-gray-400">0.3ms</span>
                    </div>
                  </div>
                  <div className="text-gray-400 text-[9px]">Root cause span: 0 anomalies detected</div>
                </div>
                <h3 className="font-display font-bold text-lg text-white mb-1.5">Instant Distributed Tracing</h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Pinpoint microservice latency regressions down to exact database queries and remote procedure calls with zero sampling loss.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section with Monthly/Annual Switch */}
      <section id="pricing" className="py-20 px-6 max-w-6xl mx-auto border-t border-white/[0.08]">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-xs font-mono uppercase tracking-[0.25em] text-blue-400 mb-2">Predictable Pricing</div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">Invest in Engineering Velocity</h2>
          <div className="flex items-center justify-center gap-3 mt-6">
            <span className={`text-xs font-mono ${billingCycle === 'monthly' ? 'text-white font-bold' : 'text-gray-400'}`}>Monthly</span>
            <button
              onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'annual' : 'monthly')}
              className="w-12 h-6 rounded-full bg-blue-600/40 border border-blue-400/50 p-0.5 flex items-center transition-colors"
            >
              <div className={`w-5 h-5 rounded-full bg-blue-400 transition-transform ${billingCycle === 'annual' ? 'translate-x-6' : 'translate-x-0'}`} />
            </button>
            <span className={`text-xs font-mono ${billingCycle === 'annual' ? 'text-white font-bold' : 'text-gray-400'}`}>
              Annual <span className="text-emerald-400 font-semibold">(Save 20%)</span>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pricingPlans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-2xl p-8 border flex flex-col justify-between transition-all duration-200 ${
                plan.popular
                  ? 'bg-blue-950/30 border-blue-500/50 shadow-[0_0_30px_rgba(59,130,246,0.2)]'
                  : 'bg-gray-900/40 border-white/[0.08]'
              }`}
            >
              <div>
                {plan.popular && (
                  <span className="text-[10px] font-mono uppercase tracking-widest text-blue-400 bg-blue-950 px-2 py-0.5 rounded border border-blue-500/40">
                    Recommended Scale
                  </span>
                )}
                <h3 className="font-display font-bold text-xl text-white mt-3">{plan.name}</h3>
                <p className="text-xs text-gray-400 mt-1 mb-6">{plan.desc}</p>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="font-mono text-4xl font-extrabold text-white">${plan.price}</span>
                  <span className="text-xs text-gray-400 font-mono">/ month</span>
                </div>
                <ul className="space-y-3 pt-6 border-t border-white/[0.08] mb-8">
                  {plan.features.map((feat, i) => (
                    <li key={i} className="text-xs text-gray-300 flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <button
                className={`w-full py-3 text-xs font-semibold uppercase tracking-wider rounded transition-colors ${
                  plan.popular
                    ? 'bg-blue-500 hover:bg-blue-400 text-white shadow-[0_0_15px_rgba(59,130,246,0.3)]'
                    : 'bg-gray-900 hover:bg-gray-800 text-gray-200 border border-white/10'
                }`}
              >
                Choose {plan.name}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Accordion */}
      <section id="faq" className="py-20 px-6 max-w-4xl mx-auto border-t border-white/[0.08]">
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-white text-center mb-8">
          Frequently Answered Inquiries
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="rounded-xl bg-gray-900/40 border border-white/[0.08] overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full p-5 text-left flex items-center justify-between gap-4"
              >
                <span className="font-display font-semibold text-sm text-white">{faq.q}</span>
                {openFaq === idx ? <ChevronUp className="w-4 h-4 text-blue-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
              </button>
              {openFaq === idx && (
                <div className="p-5 pt-0 text-xs text-gray-400 leading-relaxed border-t border-white/[0.04]">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/[0.08] bg-[#04060c] py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-gray-500">
          <div>
            <span className="font-display font-bold text-white tracking-widest uppercase">FLOWSTACK</span>
            <div className="text-[11px] font-mono mt-0.5">SaaS Platform Demonstration built by AIVION TECH</div>
          </div>
          <div>
            <a href="/" className="text-blue-400 hover:underline">← Return to AIVION TECH Software House</a>
          </div>
        </div>
      </footer>
    </div>
  );
};
