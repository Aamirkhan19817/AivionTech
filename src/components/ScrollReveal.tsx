import React, { useEffect, useRef, useState } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  variant?: 'fade-up' | 'fade-in' | 'fade-scale' | 'fade-left' | 'fade-right' | '3d-section' | '3d-stagger' | '3d-card';
  delay?: number;
  duration?: number;
  className?: string;
  threshold?: number;
  once?: boolean;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  variant = 'fade-up',
  delay = 0,
  duration = 800,
  className = '',
  threshold = 0.12,
  once = false,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Small delay so the browser renders the element in its HIDDEN state first
    // Then the observer fires and animates it in â€” this gives page-load animations too
    const startTimer = setTimeout(() => {
      observerRef.current = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (once) observerRef.current?.unobserve(element);
          } else if (!once) {
            setIsVisible(false);
          }
        },
        {
          threshold,
          rootMargin: '0px 0px -40px 0px',
        }
      );
      observerRef.current.observe(element);
    }, 100); // 100ms so hidden state renders first

    return () => {
      clearTimeout(startTimer);
      observerRef.current?.disconnect();
    };
  }, [threshold, once]);

  // â”€â”€â”€ Transform definitions â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

  const getHiddenTransform = () => {
    switch (variant) {
      case '3d-section':
        return 'perspective(1000px) translateY(80px) translateZ(-200px) rotateX(18deg) scale(0.85)';
      case '3d-stagger':
        return 'perspective(900px) translateY(60px) translateZ(-100px) rotateX(12deg) scale(0.88)';
      case '3d-card':
        return 'perspective(800px) translateY(50px) translateZ(-80px) rotateX(10deg) scale(0.90)';
      case 'fade-up':
        return 'translateY(50px)';
      case 'fade-scale':
        return 'translateY(25px) scale(0.92)';
      case 'fade-left':
        return 'translateX(-50px)';
      case 'fade-right':
        return 'translateX(50px)';
      case 'fade-in':
      default:
        return 'translateY(0)';
    }
  };

  const getVisibleTransform = () => {
    if (variant.startsWith('3d')) {
      return 'perspective(1000px) translateY(0) translateZ(0) rotateX(0deg) scale(1)';
    }
    return 'translateY(0) translateX(0) scale(1)';
  };

  const getHiddenFilter = () => {
    if (variant === '3d-section') return 'blur(10px)';
    if (variant === '3d-stagger') return 'blur(6px)';
    if (variant === '3d-card') return 'blur(4px)';
    return 'blur(0px)';
  };

  // â”€â”€â”€ Build final style â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

  const style: React.CSSProperties = {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? getVisibleTransform() : getHiddenTransform(),
    filter: isVisible ? 'blur(0px)' : getHiddenFilter(),
    transition: `opacity ${duration}ms, transform ${duration}ms, filter ${duration}ms`,
    transitionDelay: `${delay}ms`,
    transitionTimingFunction: variant.startsWith('3d')
      ? 'cubic-bezier(0.22, 1, 0.36, 1)'   // dramatic ease-out
      : 'cubic-bezier(0.25, 0.46, 0.45, 0.94)', // smooth ease-out
    willChange: 'opacity, transform, filter',
  };

  return (
    <div ref={elementRef} className={className} style={style}>
      {children}
    </div>
  );
};





