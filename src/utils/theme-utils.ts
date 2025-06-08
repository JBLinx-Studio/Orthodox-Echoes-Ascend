
/**
 * Theme utilities for Orthodox Echoes
 * Provides functions for dynamic theming and visual effects
 */

// Color palette utilities
export const orthodoxColors = {
  primary: {
    gold: '#D4AF37',
    goldDark: '#AA8C2C',
    goldLight: '#F0CB5A',
  },
  secondary: {
    byzantine: '#9B2335',
    byzantineDark: '#800020',
    byzantineLight: '#C13349',
  },
  neutral: {
    deepBlue: '#101423',
    navyBlue: '#1A1F2C',
    ivory: '#FFFFF0',
    stone: '#E5E4D7',
  }
};

// Gradient utilities
export const createGradient = (colors: string[], direction = 'to right') => {
  return `linear-gradient(${direction}, ${colors.join(', ')})`;
};

// Orthodox-themed gradients
export const orthodoxGradients = {
  cathedral: createGradient(['#101423', '#1A1F2C', '#0a0d16']),
  divine: createGradient(['#9B2335', '#D4AF37'], 'to bottom'),
  sacred: createGradient(['#000000', '#1A1F2C', '#000000'], 'to bottom'),
  heavenly: createGradient(['#D4AF37', '#F0CB5A', '#D4AF37'], 'to right'),
};

// Animation utilities
export const getAnimationDelay = (index: number, baseDelay = 0.1) => {
  return `${index * baseDelay}s`;
};

// Theme application functions
export const applyOrthodoxTheme = () => {
  const root = document.documentElement;
  
  // Apply CSS variables
  root.style.setProperty('--orthodox-gold', orthodoxColors.primary.gold);
  root.style.setProperty('--orthodox-byzantine', orthodoxColors.secondary.byzantine);
  root.style.setProperty('--orthodox-deep-blue', orthodoxColors.neutral.deepBlue);
  root.style.setProperty('--orthodox-navy', orthodoxColors.neutral.navyBlue);
};

// Utility for creating orthodox-style box shadows
export const orthodoxShadows = {
  glow: '0 0 20px rgba(212, 175, 55, 0.3)',
  divine: '0 4px 20px rgba(0, 0, 0, 0.8)',
  sacred: '0 8px 32px rgba(155, 35, 53, 0.2)',
  ethereal: '0 0 40px rgba(212, 175, 55, 0.4), inset 0 0 20px rgba(255, 255, 255, 0.1)',
};

// Background pattern utilities
export const orthodoxPatterns = {
  cross: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(212, 175, 55, 0.1) 10px, rgba(212, 175, 55, 0.1) 20px)',
  cathedral: 'radial-gradient(circle at center, rgba(212, 175, 55, 0.1) 0%, transparent 50%)',
  divine: 'conic-gradient(from 0deg, rgba(155, 35, 53, 0.1), rgba(212, 175, 55, 0.1), rgba(155, 35, 53, 0.1))',
};

// Responsive utilities
export const getResponsiveValue = (mobile: string, tablet: string, desktop: string) => {
  return {
    mobile,
    tablet,
    desktop,
  };
};

export default {
  orthodoxColors,
  orthodoxGradients,
  orthodoxShadows,
  orthodoxPatterns,
  createGradient,
  getAnimationDelay,
  applyOrthodoxTheme,
  getResponsiveValue,
};
