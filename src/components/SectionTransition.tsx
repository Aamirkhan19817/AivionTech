import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SectionId } from '../types/navigation';

interface SectionTransitionProps {
  sectionId: SectionId;
  activeSection: SectionId;
  children: React.ReactNode;
}

// Detect prefers-reduced-motion at module load time
const prefersReducedMotion =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Motion variants for cinematic entrance / exit
const variants = {
  hidden: prefersReducedMotion
    ? { opacity: 0 }
    : {
        opacity: 0,
        y: 18,
        filter: 'blur(6px)',
        scale: 0.985,
      },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    scale: 1,
  },
  exit: prefersReducedMotion
    ? { opacity: 0 }
    : {
        opacity: 0,
        y: -14,
        filter: 'blur(4px)',
        scale: 0.99,
      },
};

const transition = {
  duration: prefersReducedMotion ? 0.15 : 0.38,
  ease: [0.22, 1, 0.36, 1] as const,
};

export const SectionTransition: React.FC<SectionTransitionProps> = ({
  sectionId,
  activeSection,
  children,
}) => {
  const isActive = sectionId === activeSection;

  return (
    <AnimatePresence mode="wait" initial={false}>
      {isActive && (
        <motion.div
          key={sectionId}
          variants={variants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={transition}
          // Allow full-width layout without overflow interference
          style={{ width: '100%', willChange: 'opacity, transform, filter' }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
