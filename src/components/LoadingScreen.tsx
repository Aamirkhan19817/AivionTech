import React, { useEffect, useState } from 'react';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<'counting' | 'welcome' | 'exit'>('counting');
  const [displayNumber, setDisplayNumber] = useState(0);

  useEffect(() => {
    // Phase 1: Count from 0 to 100
    const totalDuration = 2200; // ms for counting
    const steps = 100;
    const stepTime = totalDuration / steps;

    let current = 0;
    const counter = setInterval(() => {
      current += 1;

      // Easing: slow at start, fast in middle, slow at end
      const easedProgress = current < 30
        ? current * 0.8
        : current < 70
        ? current * 1.0
        : current;

      setDisplayNumber(current);
      setProgress(Math.min(easedProgress, 100));

      if (current >= 100) {
        clearInterval(counter);

        // Phase 2: Show "Welcome to Aivion Tech"
        setTimeout(() => {
          setPhase('welcome');

          // Phase 3: Exit animation
          setTimeout(() => {
            setPhase('exit');

            // Done — reveal main site
            setTimeout(() => {
              onComplete();
            }, 700);
          }, 1800);
        }, 300);
      }
    }, stepTime);

    return () => clearInterval(counter);
  }, [onComplete]);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 9999,
        background: '#030712',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        transition: phase === 'exit' ? 'opacity 0.7s ease-in-out, transform 0.7s ease-in-out' : 'none',
        opacity: phase === 'exit' ? 0 : 1,
        transform: phase === 'exit' ? 'scale(1.04)' : 'scale(1)',
      }}
    >
      {/* Background grid pattern */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(rgba(6,182,212,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.03) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Ambient glows */}
      <div style={{
        position: 'absolute',
        top: '30%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '600px',
        height: '300px',
        background: 'radial-gradient(ellipse, rgba(6,182,212,0.08) 0%, transparent 70%)',
        filter: 'blur(40px)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute',
        bottom: '20%',
        left: '30%',
        width: '400px',
        height: '200px',
        background: 'radial-gradient(ellipse, rgba(139,92,246,0.06) 0%, transparent 70%)',
        filter: 'blur(60px)',
        pointerEvents: 'none',
      }} />

      {/* ─── COUNTING PHASE ─── */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          textAlign: 'center',
          transition: 'opacity 0.5s ease-out, transform 0.5s ease-out',
          opacity: phase === 'welcome' || phase === 'exit' ? 0 : 1,
          transform: phase === 'welcome' || phase === 'exit' ? 'translateY(-30px)' : 'translateY(0)',
          display: phase === 'welcome' || phase === 'exit' ? 'none' : 'block',
        }}
      >
        {/* Logo / Brand Mark */}
        <div style={{
          fontFamily: 'Space Grotesk, sans-serif',
          fontSize: '11px',
          letterSpacing: '0.4em',
          color: 'rgba(6,182,212,0.8)',
          textTransform: 'uppercase',
          marginBottom: '48px',
        }}>
          AIVION TECH
        </div>

        {/* Counter */}
        <div style={{
          fontFamily: 'Space Grotesk, sans-serif',
          fontSize: 'clamp(80px, 15vw, 160px)',
          fontWeight: 800,
          lineHeight: 1,
          color: 'white',
          letterSpacing: '-4px',
          marginBottom: '8px',
          position: 'relative',
        }}>
          <span style={{
            background: 'linear-gradient(135deg, #ffffff 0%, #06b6d4 60%, #7c3aed 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            {displayNumber}
          </span>
          <span style={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontSize: 'clamp(24px, 4vw, 48px)',
            fontWeight: 400,
            color: 'rgba(6,182,212,0.7)',
            verticalAlign: 'super',
            marginLeft: '4px',
          }}>
            %
          </span>
        </div>

        {/* Progress Bar */}
        <div style={{
          width: '280px',
          height: '2px',
          background: 'rgba(255,255,255,0.06)',
          borderRadius: '99px',
          overflow: 'hidden',
          margin: '20px auto 0',
        }}>
          <div style={{
            height: '100%',
            width: `${progress}%`,
            background: 'linear-gradient(90deg, #06b6d4, #7c3aed)',
            borderRadius: '99px',
            boxShadow: '0 0 12px rgba(6,182,212,0.7)',
            transition: 'width 0.05s linear',
          }} />
        </div>

        {/* Loading label */}
        <div style={{
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '10px',
          letterSpacing: '0.2em',
          color: 'rgba(148,163,184,0.5)',
          textTransform: 'uppercase',
          marginTop: '16px',
        }}>
          Initializing Experience
        </div>
      </div>

      {/* ─── WELCOME PHASE ─── */}
      {(phase === 'welcome' || phase === 'exit') && (
        <div style={{
          position: 'relative',
          zIndex: 10,
          textAlign: 'center',
          animation: 'welcomeIn 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        }}>
          {/* Decorative line above */}
          <div style={{
            width: '60px',
            height: '1px',
            background: 'linear-gradient(90deg, transparent, #06b6d4, transparent)',
            margin: '0 auto 24px',
            animation: 'expandLine 0.6s ease-out 0.3s both',
            transform: 'scaleX(0)',
          }} />

          <div style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '11px',
            letterSpacing: '0.4em',
            color: 'rgba(6,182,212,0.9)',
            textTransform: 'uppercase',
            marginBottom: '16px',
            animation: 'fadeUp 0.5s ease-out 0.1s both',
            opacity: 0,
          }}>
            ✦ Welcome To ✦
          </div>

          <div style={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontSize: 'clamp(36px, 8vw, 80px)',
            fontWeight: 800,
            letterSpacing: '-2px',
            lineHeight: 1.05,
            background: 'linear-gradient(135deg, #ffffff 0%, #06b6d4 50%, #7c3aed 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            animation: 'fadeUp 0.6s ease-out 0.25s both',
            opacity: 0,
          }}>
            AIVION TECH
          </div>

          <div style={{
            fontFamily: 'Plus Jakarta Sans, sans-serif',
            fontSize: '14px',
            color: 'rgba(148,163,184,0.7)',
            marginTop: '12px',
            animation: 'fadeUp 0.5s ease-out 0.45s both',
            opacity: 0,
          }}>
            Premium Software Engineering
          </div>

          {/* Decorative line below */}
          <div style={{
            width: '60px',
            height: '1px',
            background: 'linear-gradient(90deg, transparent, #7c3aed, transparent)',
            margin: '20px auto 0',
            animation: 'expandLine 0.6s ease-out 0.5s both',
            transform: 'scaleX(0)',
          }} />
        </div>
      )}

      <style>{`
        @keyframes welcomeIn {
          from { opacity: 0; transform: scale(0.92) translateY(20px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes expandLine {
          from { transform: scaleX(0); opacity: 0; }
          to { transform: scaleX(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
};
