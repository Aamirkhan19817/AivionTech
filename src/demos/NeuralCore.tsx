import React, { useState, useEffect } from 'react';
import { DemoHeader } from './DemoHeader';
import { Cpu, Terminal, Play, RotateCcw, Zap, GitBranch, Layers, ShieldAlert, CheckCircle2 } from 'lucide-react';

export const NeuralCore: React.FC = () => {
  const [modelType, setModelType] = useState<'transformer' | 'diffusion' | 'vision'>('transformer');
  const [promptInput, setPromptInput] = useState('Synthesize predictive market equilibrium tensors.');
  const [isInferencing, setIsInferencing] = useState(false);
  const [tokensPerSec, setTokensPerSec] = useState(148);
  const [inferenceLogs, setInferenceLogs] = useState<string[]>([
    '[INIT] Tensor parallel shards loaded across 8x H100 clusters.',
    '[WEIGHTS] FP8 quantized checkpoints mounted (48.2 GB VRAM).',
    '[READY] Ready for streaming autonomous tensor evaluation.',
  ]);

  const triggerInference = () => {
    setIsInferencing(true);
    setInferenceLogs((prev) => [
      ...prev,
      `[PROMPT] Received inference trigger: "${promptInput}"`,
      '[ATTENTION] Multi-head flash attention matrix calculating (128k context)...',
    ]);

    setTimeout(() => {
      setInferenceLogs((prev) => [
        ...prev,
        `[COMPLETE] Emitted 512 tokens with 99.4% cross-entropy confidence score.`,
      ]);
      setIsInferencing(false);
      setTokensPerSec(Math.floor(140 + Math.random() * 25));
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#040808] text-[#e6fcf5] font-sans selection:bg-emerald-500/30">
      <DemoHeader currentDemoId="ai" />

      {/* NeuralCore Navbar */}
      <nav className="border-b border-emerald-950/80 bg-[#040808]/90 backdrop-blur-md px-6 py-4 sticky top-11 z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded bg-emerald-500/20 border border-emerald-400 flex items-center justify-center font-mono font-bold text-emerald-300">
              NC
            </div>
            <span className="font-mono font-bold text-lg tracking-widest text-white">
              NEURALCORE
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-xs font-mono text-gray-400">
            <a href="#playground" className="hover:text-emerald-400 transition-colors">Inference Playground</a>
            <a href="#pipeline" className="hover:text-emerald-400 transition-colors">MLOps Pipeline</a>
            <a href="#benchmarks" className="hover:text-emerald-400 transition-colors">Latency Benchmarks</a>
            <a href="#endpoints" className="hover:text-emerald-400 transition-colors">API Specs</a>
          </div>

          <a
            href="#playground"
            className="px-4 py-2 text-xs font-mono font-semibold bg-emerald-500 hover:bg-emerald-400 text-black rounded transition-all shadow-[0_0_15px_rgba(16,185,129,0.4)]"
          >
            Deploy Endpoint
          </a>
        </div>
      </nav>

      {/* AI Hero */}
      <section className="py-20 px-6 max-w-6xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-xs font-mono text-emerald-400 mb-6">
          <Cpu className="w-3.5 h-3.5" />
          <span>Autonomous Machine Intelligence Platform // V5.2</span>
        </div>

        <h1 className="font-display text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight mb-6">
          Enterprise Multi-Modal Neural Infrastructure
        </h1>

        <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed mb-12">
          Train, quantize, and orchestrate custom foundation models with mathematical latency guarantees and deterministic agentic safeguards.
        </p>

        {/* Live Interactive Neural Topology & Playground */}
        <div id="playground" className="rounded-2xl bg-gray-950/90 border border-emerald-500/40 p-6 sm:p-8 text-left shadow-2xl backdrop-blur-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-emerald-950 mb-6">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
              <h2 className="font-mono text-sm sm:text-base font-bold text-white uppercase tracking-wider">
                Live Tensor Engine Simulator
              </h2>
            </div>

            <div className="flex items-center gap-2">
              {(['transformer', 'diffusion', 'vision'] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => setModelType(m)}
                  className={`px-3 py-1 text-xs font-mono uppercase rounded transition-colors ${
                    modelType === m
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/60'
                      : 'bg-gray-900 text-gray-500 border border-transparent'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          {/* Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
            <div className="p-3.5 rounded-lg bg-gray-900/60 border border-emerald-900/40">
              <div className="text-[11px] font-mono text-gray-400 uppercase">Throughput</div>
              <div className="text-xl font-mono font-bold text-emerald-400 mt-1">{tokensPerSec} t/sec</div>
            </div>
            <div className="p-3.5 rounded-lg bg-gray-900/60 border border-emerald-900/40">
              <div className="text-[11px] font-mono text-gray-400 uppercase">Time To First Token</div>
              <div className="text-xl font-mono font-bold text-white mt-1">14.2 ms</div>
            </div>
            <div className="p-3.5 rounded-lg bg-gray-900/60 border border-emerald-900/40">
              <div className="text-[11px] font-mono text-gray-400 uppercase">Quantization</div>
              <div className="text-xl font-mono font-bold text-cyan-400 mt-1">FP8 AWQ</div>
            </div>
            <div className="p-3.5 rounded-lg bg-gray-900/60 border border-emerald-900/40">
              <div className="text-[11px] font-mono text-gray-400 uppercase">Perplexity</div>
              <div className="text-xl font-mono font-bold text-white mt-1">3.12 (Optimal)</div>
            </div>
          </div>

          {/* Live Interactive Neural Architecture Topology Canvas / Visualizer */}
          <div className="p-4 rounded-xl bg-black/80 border border-emerald-950 mb-6 font-mono text-xs">
            <div className="flex items-center justify-between text-gray-400 mb-3 pb-2 border-b border-white/10">
              <span className="text-emerald-400">ACTIVE MODEL TOPOLOGY // 128 ATTENTION HEADS</span>
              <span className="text-[10px] text-gray-500">FP8 CHECKPOINT WEIGHT MATRIX</span>
            </div>
            <svg viewBox="0 0 700 130" className="w-full h-28 text-emerald-400">
              <defs>
                <linearGradient id="nodeGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#065f46" />
                </linearGradient>
              </defs>
              {/* Connection lines between layers */}
              {[30, 65, 100].map((y1, i) =>
                [20, 50, 80, 110].map((y2, j) => (
                  <line key={`l1-${i}-${j}`} x1="80" y1={y1} x2="220" y2={y2} stroke="#064e3b" strokeWidth="1" strokeOpacity="0.6" />
                ))
              )}
              {[20, 50, 80, 110].map((y1, i) =>
                [25, 65, 105].map((y2, j) => (
                  <line key={`l2-${i}-${j}`} x1="220" y1={y1} x2="400" y2={y2} stroke="#059669" strokeWidth="1.2" strokeOpacity="0.8" />
                ))
              )}
              {[25, 65, 105].map((y1, i) =>
                [35, 65, 95].map((y2, j) => (
                  <line key={`l3-${i}-${j}`} x1="400" y1={y1} x2="580" y2={y2} stroke="#10b981" strokeWidth="1.5" strokeOpacity="0.9" />
                ))
              )}

              {/* Layer 1: Input Embeddings */}
              {[30, 65, 100].map((y, idx) => (
                <g key={`in-${idx}`}>
                  <circle cx="80" cy={y} r="8" fill="url(#nodeGrad)" stroke="#34d399" strokeWidth="1.5" />
                  <circle cx="80" cy={y} r="3" fill="#ffffff" />
                </g>
              ))}

              {/* Layer 2: Multi-Head Flash Attention */}
              {[20, 50, 80, 110].map((y, idx) => (
                <g key={`att-${idx}`}>
                  <circle cx="220" cy={y} r="9" fill="#047857" stroke="#6ee7b7" strokeWidth="1.5" />
                  <circle cx="220" cy={y} r="3.5" fill="#a7f3d0" />
                </g>
              ))}

              {/* Layer 3: Feed-Forward Shards */}
              {[25, 65, 105].map((y, idx) => (
                <g key={`ff-${idx}`}>
                  <circle cx="400" cy={y} r="10" fill="#065f46" stroke="#10b981" strokeWidth="2" />
                  <circle cx="400" cy={y} r="4" fill="#ffffff" />
                </g>
              ))}

              {/* Layer 4: Output Logits */}
              {[35, 65, 95].map((y, idx) => (
                <g key={`out-${idx}`}>
                  <circle cx="580" cy={y} r="8" fill="#10b981" stroke="#a7f3d0" strokeWidth="2" />
                  <circle cx="580" cy={y} r="3" fill="#ffffff" />
                </g>
              ))}

              {/* Layer Labels */}
              <text x="80" y="125" textAnchor="middle" fill="#6b7280" fontSize="9" fontFamily="monospace">EMBEDDINGS</text>
              <text x="220" y="125" textAnchor="middle" fill="#6b7280" fontSize="9" fontFamily="monospace">FLASH-ATTN</text>
              <text x="400" y="125" textAnchor="middle" fill="#6b7280" fontSize="9" fontFamily="monospace">MLP TENSORS</text>
              <text x="580" y="125" textAnchor="middle" fill="#6b7280" fontSize="9" fontFamily="monospace">LOGITS</text>
            </svg>
          </div>

          {/* Interactive Prompt Input */}
          <div className="space-y-4 mb-6">
            <label className="block text-xs font-mono uppercase tracking-wider text-gray-400">
              Inference Payload Instruction:
            </label>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={promptInput}
                onChange={(e) => setPromptInput(e.target.value)}
                className="flex-1 bg-gray-900 border border-emerald-900/60 rounded px-4 py-2.5 text-xs font-mono text-white focus:outline-none focus:border-emerald-400"
              />
              <button
                disabled={isInferencing}
                onClick={triggerInference}
                className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-black font-mono font-bold text-xs uppercase rounded flex items-center justify-center gap-2 transition-colors"
              >
                {isInferencing ? (
                  <>
                    <RotateCcw className="w-3.5 h-3.5 animate-spin" />
                    Inferencing...
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5" />
                    Execute Run
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Real-time Streaming Log Window */}
          <div className="p-4 rounded-xl bg-black border border-emerald-950 font-mono text-xs text-gray-300 space-y-1.5 max-h-48 overflow-y-auto">
            {inferenceLogs.map((log, idx) => (
              <div
                key={idx}
                className={log.includes('[COMPLETE]') ? 'text-emerald-400 font-semibold' : log.includes('[PROMPT]') ? 'text-cyan-300' : 'text-gray-400'}
              >
                {log}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MLOps Pipeline Features */}
      <section id="pipeline" className="py-20 px-6 max-w-6xl mx-auto border-t border-emerald-950">
        <h2 className="font-mono text-2xl font-bold text-white mb-8 text-center uppercase tracking-wider">
          Automated MLOps Pipeline Architecture
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-xl bg-gray-950 border border-emerald-950 hover:border-emerald-500/40 transition-colors">
            <GitBranch className="w-6 h-6 text-emerald-400 mb-4" />
            <h3 className="font-mono font-bold text-base text-white mb-2">Automated RLHF & DPO</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Continuous alignment loop with automated adversarial red-teaming and human preference matrix weighting.
            </p>
          </div>
          <div className="p-6 rounded-xl bg-gray-950 border border-emerald-950 hover:border-emerald-500/40 transition-colors">
            <Layers className="w-6 h-6 text-emerald-400 mb-4" />
            <h3 className="font-mono font-bold text-base text-white mb-2">Heterogeneous Sharding</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Dynamically partition 70B+ parameter architectures across multi-cloud GPU instances with zero bandwidth bottlenecks.
            </p>
          </div>
          <div className="p-6 rounded-xl bg-gray-950 border border-emerald-950 hover:border-emerald-500/40 transition-colors">
            <ShieldAlert className="w-6 h-6 text-emerald-400 mb-4" />
            <h3 className="font-mono font-bold text-base text-white mb-2">Deterministic Guardrails</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Sub-1ms token-level semantic filtering guaranteeing zero unauthorized data exfiltration or hallucinated responses.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-emerald-950 bg-[#020505] py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-gray-500 font-mono">
          <div>
            <span className="font-bold text-white tracking-widest uppercase">NEURALCORE</span>
            <div className="text-[11px] mt-0.5">AI/ML Demonstration built by AIVION TECH</div>
          </div>
          <div>
            <a href="/" className="text-emerald-400 hover:underline">← Return to AIVION TECH Software House</a>
          </div>
        </div>
      </footer>
    </div>
  );
};
