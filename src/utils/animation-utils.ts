
/**
 * Animation utilities for consistent animations across components
 * With enhanced performance optimizations
 */

import { fadeIn, staggerContainer, slideIn, scaleIn, floating, archReveal, iconGlow, candleFlicker, smoothSection, pageEnter } from '@/components/ui/animation';

// Export all animation presets
export const animations = {
  fadeIn,
  staggerContainer,
  slideIn,
  scaleIn,
  floating,
  archReveal,
  iconGlow,
  candleFlicker,
  smoothSection,
  pageEnter
};

// Common animation variants for reuse
export const pageTransition = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.4 } // Reduced from 0.5 for better performance
};

export const staggerChildren = {
  initial: "hidden",
  whileInView: "visible",
  viewport: { once: true, margin: "-100px" }
};

// Enhanced section transitions for Orthodox theme
export const sectionTransition = {
  initial: { opacity: 0, y: 20 }, // Reduced y-offset from 30 for better performance
  whileInView: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.6, // Reduced from 0.8 for better performance
      ease: [0.22, 1, 0.36, 1] // Custom easing for smoother transitions
    }
  },
  viewport: { once: true, margin: "-50px" }
};

// Byzantine-inspired decorative element animations - optimized
export const iconReveal = {
  initial: { opacity: 0, scale: 0.95, filter: "blur(5px)" }, // Reduced blur for better performance
  whileInView: { 
    opacity: 1, 
    scale: 1, 
    filter: "blur(0px)",
    transition: { 
      duration: 0.8, // Reduced from 1.2 for better performance
      ease: "easeOut"
    }
  },
  viewport: { once: true }
};

// Helper to create animation delay sequences
export const createStaggerDelay = (items: any[], baseDelay: number = 0.08) => { // Reduced delay from 0.1
  return items.map((_, index) => ({
    transition: { delay: baseDelay * index }
  }));
};

// New additions for smoother deployment animations
export const deploymentTransition = {
  initial: { opacity: 0, scale: 0.97 }, // Increased scale from 0.95 for subtler effect
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5, // Reduced from 0.6 for better performance
      ease: [0.22, 1, 0.36, 1]
    }
  },
  exit: {
    opacity: 0,
    scale: 0.97, // Increased scale from 0.95 for subtler effect
    transition: {
      duration: 0.25, // Reduced from 0.3 for better performance
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

// Optimized animations for production mode
export const getOptimizedAnimation = (animation: any, isProduction: boolean = false) => {
  if (isProduction) {
    // Simpler animations for production to improve performance
    return {
      ...animation,
      transition: {
        ...animation.transition,
        duration: (animation.transition?.duration || 0.4) * 0.75 // Further reduction from 0.8 to 0.75
      }
    };
  }
  return animation;
};

// New reduced motion optimizations
export const shouldReduceMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Get appropriate animations based on user preferences
export const getAccessibleAnimation = (fullAnimation: any, reducedAnimation: any = { opacity: [0, 1] }) => {
  return shouldReduceMotion() ? reducedAnimation : fullAnimation;
};
