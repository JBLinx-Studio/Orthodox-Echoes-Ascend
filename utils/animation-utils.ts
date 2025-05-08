
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

// Helper to create animation delay sequences
export const createStaggerDelay = (items: any[], baseDelay: number = 0.1) => {
  return items.map((_, index) => ({
    transition: { delay: baseDelay * index }
  }));
};

