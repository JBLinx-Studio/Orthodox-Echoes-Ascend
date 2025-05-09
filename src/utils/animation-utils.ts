
/**
 * Animation utilities for consistent animations across components
 */

import { fadeIn, staggerContainer, slideIn, scaleIn, floating } from '@/components/ui/animation';

// Export all animation presets
export const animations = {
  fadeIn,
  staggerContainer,
  slideIn,
  scaleIn,
  floating
};

// Common animation variants for reuse
export const pageTransition = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.5 }
};

export const staggerChildren = {
  initial: "hidden",
  whileInView: "visible",
  viewport: { once: true, margin: "-100px" }
};

// Enhanced section transitions for Orthodox theme
export const sectionTransition = {
  initial: { opacity: 0, y: 30 },
  whileInView: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1] // Custom easing for smoother transitions
    }
  },
  viewport: { once: true, margin: "-50px" }
};

// Byzantine-inspired decorative element animations
export const iconReveal = {
  initial: { opacity: 0, scale: 0.9, filter: "blur(8px)" },
  whileInView: { 
    opacity: 1, 
    scale: 1, 
    filter: "blur(0px)",
    transition: { 
      duration: 1.2,
      ease: "easeOut"
    }
  },
  viewport: { once: true }
};

// Helper to create animation delay sequences
export const createStaggerDelay = (items: any[], baseDelay: number = 0.1) => {
  return items.map((_, index) => ({
    transition: { delay: baseDelay * index }
  }));
};
