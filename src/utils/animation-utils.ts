
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
  transition: { duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }
};

export const staggerChildren = {
  initial: "hidden",
  whileInView: "visible",
  viewport: { once: true, margin: "-50px" }
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
  transition: { duration: 1.5, ease: [0.43, 0.13, 0.23, 0.96] }
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
    opacity: 0.15,
    transition: { duration: 1.5 }
  },
  hover: { 
    opacity: 0.25, 
    scale: 1.05,
    transition: { duration: 0.3 }
  }
};

// New smoother section transitions
export const sectionTransition = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 1.2 }
};

// Cathedral glow animation for sacred elements
export const cathedralGlow = {
  animate: {
    boxShadow: ['0 0 15px rgba(212,175,55,0.2)', '0 0 30px rgba(212,175,55,0.4)', '0 0 15px rgba(212,175,55,0.2)'],
    opacity: [0.7, 0.9, 0.7],
    transition: {
      duration: 5,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

// Improved candle flicker for better performance
export const improvedCandleFlicker = {
  animate: {
    opacity: [0.7, 0.9, 0.8, 0.95, 0.7],
    scale: [1, 1.05, 0.98, 1.02, 1],
    filter: ['blur(1px)', 'blur(1.5px)', 'blur(1px)', 'blur(2px)', 'blur(1px)'],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
      times: [0, 0.25, 0.5, 0.75, 1]
    }
  }
};

// Scroll reveal variants for better section transitions
export const scrollRevealBottom = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut"
    }
  }
};

export const scrollRevealLeft = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut"
    }
  }
};

export const scrollRevealRight = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut"
    }
  }
};
