import React, { useEffect, useState, useRef } from 'react';
import { ScrollReveal } from './ScrollReveal';
import { Zap, ShieldCheck, Layers, Gauge } from 'lucide-react';

interface MetricItem {
  id: string;
  label: string;
  value: number;
  suffix: string;
  prefix?: string;
  description: string;
  icon: React.ReactNode;
}

const METRICS: MetricItem[] = [
  {
    id: 'deployments',
    label: 'Enterprise Deployments',
    value: 50,
    suffix: '+',
    description: 'Mission-critical web, mobile & cloud systems delivered globally',
    icon: <Layers className="w-5 h-5 text-cyan-400" />,
  },
  {
    id: 'uptime',
    label: 'Platform Reliability',
    value: 99.98,
    suffix: '%',
    description: 'Continuous operational uptime with zero unhandled regressions',
    icon: <ShieldCheck className="w-5 h-5 text-emerald-400" />,
  },
  {
    id: 'demos',
    label: 'Working Production Demos',
    value: 8,
    suffix: ' Live',
    description: 'Fully functional e-commerce, SaaS, AI & spatial exhibits',
    icon: <Zap className="w-5 h-5 text-purple-400" />,
  },
  {
    id: 'latency',
    label: 'Average Response Benchmark',
    value: 120,
    suffix: 'ms',
    prefix: '<',
    description: 'Ultra-low latency real-time data streaming & graphics pipelines',
    icon: <Gauge className="w-5 h-5 text-sky-400" />,
  },
];

const AnimatedCounter: React.FC<{
  target: number;
  suffix: string;
  prefix?: string;
  isDecimal?: boolean;
}> = ({ target, suffix, prefix = '', isDecimal = false }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    let startTime: number | null = null;
    const duration = 1600; // ms

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // Ease out expo
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = isDecimal
        ? parseFloat((target * easeProgress).toFixed(2))
        : Math.floor(target * easeProgress);

      setDisplayValue(current);

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setDisplayValue(target);
      }
    };

    requestAnimationFrame(step);
  }, [hasStarted, target, isDecimal]);

  return (
    <div ref={elementRef} className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
      <span>{prefix}</span>
      <span>{displayValue}</span>
      <span className="text-cyan-400">{suffix}</span>
    </div>
  );
};

export const StatisticsSection: React.FC = () => {
  return (
    <section className="relative py-16 sm:py-20 bg-gray-950/90 border-y border-white/[0.06] overflow-hidden">
      {/* Subtle ambient cyan glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-24 bg-cyan-500/[0.04] blur-[90px] pointer-events-none" />

      <ScrollReveal variant="3d-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {METRICS.map((metric, idx) => (
            <ScrollReveal
              key={metric.id}
              variant="3d-stagger"
              delay={idx * 100}
              className="h-full"
            >
              <div className="group relative p-6 sm:p-7 rounded-xl bg-gray-900/40 hover:bg-gray-900/70 border border-white/[0.06] hover:border-cyan-500/40 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-[0_12px_28px_rgba(6,182,212,0.12)] flex flex-col justify-between h-full">
                {/* Top icon and label */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2.5 rounded-lg bg-gray-950 border border-white/[0.08] group-hover:border-cyan-500/40 transition-colors">
                      {metric.icon}
                    </div>
                    <span className="font-mono text-[10px] tracking-widest uppercase text-gray-500 group-hover:text-cyan-400 transition-colors">
                      STAT 0{idx + 1}
                    </span>
                  </div>

                  <AnimatedCounter
                    target={metric.value}
                    suffix={metric.suffix}
                    prefix={metric.prefix}
                    isDecimal={metric.value % 1 !== 0}
                  />

                  <h3 className="font-display font-semibold text-sm text-gray-200 mt-2 mb-1.5 tracking-wide">
                    {metric.label}
                  </h3>

                  <p className="text-xs text-gray-400 leading-relaxed">
                    {metric.description}
                  </p>
                </div>

                {/* Bottom subtle progress line */}
                <div className="mt-5 pt-3 border-t border-white/[0.04] flex items-center justify-between">
                  <div className="h-0.5 w-full bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-cyan-500 to-teal-400 rounded-full transition-all duration-1000 group-hover:w-full"
                      style={{ width: `${80 + idx * 5}%` }}
                    />
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </ScrollReveal>
    </section>
  );
};





