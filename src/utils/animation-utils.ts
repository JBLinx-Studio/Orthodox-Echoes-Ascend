
/**
 * Animation utilities for consistent animations across components
 */

import { fadeIn, staggerContainer, slideIn, scaleIn, floatingEffect, pulseEffect, glowEffect, shineEffect, candleFlicker, cinematic } from '@/components/ui/animation';

// Export all animation presets
export const animations = {
  fadeIn,
  staggerContainer,
  slideIn,
  scaleIn,
  floatingEffect,
  pulseEffect,
  glowEffect,
  shineEffect,
  candleFlicker,
  cinematic
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

// Helper to create animation delay sequences
export const createStaggerDelay = (items: any[], baseDelay: number = 0.1) => {
  return items.map((_, index) => ({
    transition: { delay: baseDelay * index }
  }));
};

// Enhanced transitions for cinematic sections
export const cinematicTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1.2, ease: [0.43, 0.13, 0.23, 0.96] }
};

// Performance-friendly light effects
export const subtlePulse = {
  animate: {
    opacity: [0.7, 1, 0.7],
    scale: [1, 1.02, 1], 
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

// Scroll-triggered reveal animation
export const revealOnScroll = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.8, ease: "easeOut" }
};

// Background decorative elements animation
export const backgroundSymbol = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 0.1,
    transition: { duration: 1.5 }
  },
  hover: { 
    opacity: 0.2, 
    scale: 1.05,
    transition: { duration: 0.3 }
  }
};
