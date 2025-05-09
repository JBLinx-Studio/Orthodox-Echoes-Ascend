
/**
 * Theme utilities for the application
 * Centralizes theme configuration and helper functions for Orthodox and Cathedral themes
 */

import React from 'react';

// Enhanced Orthodox theme colors
export const themeColors = {
  gold: "#D4AF37",
  goldLight: "#F0CB5A",
  goldDark: "#AA8C2C",
  byzantine: "#9B2335",
  byzantineLight: "#C13349",
  byzantineDark: "#800020",
  deepBlue: "#101423",
  nightBlue: "#0a0d16",
  muted: "#8A898C",
  candle: "#FFF4E0",
  incense: "#E5E4D7",
  iconBlue: "#1A3E5F",
  iconRed: "#9B2335",
};

// Theme mode helpers
export enum ThemeMode {
  LIGHT = 'light',
  DARK = 'dark',
  CATHEDRAL = 'cathedral'
}

// Get or set current theme mode
export const toggleTheme = (currentMode: ThemeMode): ThemeMode => {
  // Cycle through theme modes: dark -> cathedral -> light -> dark
  if (currentMode === ThemeMode.DARK) {
    return ThemeMode.CATHEDRAL;
  } else if (currentMode === ThemeMode.CATHEDRAL) {
    return ThemeMode.LIGHT;
  } else {
    return ThemeMode.DARK;
  }
};

// Check if current mode is dark
export const isDarkMode = (mode: ThemeMode): boolean => {
  return mode === ThemeMode.DARK || mode === ThemeMode.CATHEDRAL;
};

// Get theme-specific class for an element
export const getThemeClass = (element: string, mode: ThemeMode): string => {
  switch (element) {
    case 'body':
      if (mode === ThemeMode.CATHEDRAL) {
        return 'bg-gradient-to-b from-[#0a0d16] to-[#101423] text-white';
      } else if (mode === ThemeMode.DARK) {
        return 'bg-[#0a0d16] text-white';
      } else {
        return 'bg-white text-gray-900';
      }
    case 'card':
      if (mode === ThemeMode.CATHEDRAL) {
        return 'bg-[#1A1F2C]/60 backdrop-blur-sm border-gold/20';
      } else if (mode === ThemeMode.DARK) {
        return 'bg-[#1A1F2C]/90 border-gold/10';
      } else {
        return 'bg-white border-gray-200';
      }
    case 'button':
      if (mode === ThemeMode.CATHEDRAL) {
        return 'bg-byzantine hover:bg-byzantine-dark text-white border border-gold/20';
      } else if (mode === ThemeMode.DARK) {
        return 'bg-byzantine hover:bg-byzantine-dark text-white';
      } else {
        return 'bg-byzantine hover:bg-byzantine-dark text-white';
      }
    case 'nav':
      if (mode === ThemeMode.CATHEDRAL) {
        return 'bg-[#0a0d16]/80 backdrop-blur-md border-b border-gold/20';
      } else if (mode === ThemeMode.DARK) {
        return 'bg-[#0a0d16] border-b border-gray-800/50';
      } else {
        return 'bg-white border-b border-gray-200';
      }
    case 'input':
      if (mode === ThemeMode.CATHEDRAL) {
        return 'bg-[#1A1F2C]/60 border-gold/30 text-white placeholder:text-gray-400';
      } else if (mode === ThemeMode.DARK) {
        return 'bg-[#1A1F2C] border-gray-700 text-white placeholder:text-gray-500';
      } else {
        return 'bg-white border-gray-300 text-gray-900 placeholder:text-gray-400';
      }
    default:
      return '';
  }
};

/**
 * Get cathedral-themed decorative elements for UI components
 */
export const getCathedralDecoration = (type: 'header' | 'divider' | 'card' | 'footer'): JSX.Element | null => {
  switch (type) {
    case 'header':
      return (
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold/50 to-transparent"></div>
      );
    case 'divider':
      return (
        <div className="flex items-center w-full my-4">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent"></div>
          <span className="px-2 text-gold">☦</span>
          <div className="flex-1 h-px bg-gradient-to-r from-gold/30 via-transparent to-transparent"></div>
        </div>
      );
    case 'card':
      return (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gold/20"></div>
          <div className="absolute top-1 left-1 w-2 h-2 border-t border-l border-gold/60"></div>
          <div className="absolute top-1 right-1 w-2 h-2 border-t border-r border-gold/60"></div>
          <div className="absolute bottom-1 left-1 w-2 h-2 border-b border-l border-gold/60"></div>
          <div className="absolute bottom-1 right-1 w-2 h-2 border-b border-r border-gold/60"></div>
        </div>
      );
    case 'footer':
      return (
        <div className="absolute bottom-0 left-0 right-0 h-6 overflow-hidden opacity-20 pointer-events-none">
          <div className="flex justify-center">
            <svg width="800" height="24" viewBox="0 0 800 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0,12 C100,4 200,20 300,12 C400,4 500,20 600,12 C700,4 800,20 800,12" stroke="#D4AF37" strokeWidth="1" fill="none"/>
              <path d="M0,12 C100,20 200,4 300,12 C400,20 500,4 600,12 C700,20 800,4 800,12" stroke="#D4AF37" strokeWidth="1" fill="none"/>
            </svg>
          </div>
        </div>
      );
    default:
      return null;
  }
};

// SVG pattern data for cathedral backgrounds - properly formatted string literals
export const patternData = {
  crosses: `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 10v40M15 30h30' stroke='%23D4AF37' stroke-width='1' fill='none' opacity='.2'/%3E%3C/svg%3E")`,
  domes: `url("data:image/svg+xml,%3Csvg width='100' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 60C25 20 75 20 100 60' stroke='%23D4AF37' stroke-width='1' fill='none' opacity='.1'/%3E%3C/svg%3E")`,
  arches: `url("data:image/svg+xml,%3Csvg width='80' height='40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 40C20 10 60 10 80 40' stroke='%23D4AF37' stroke-width='.8' fill='none' opacity='.15'/%3E%3C/svg%3E")`,
  icons: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='100' height='100' fill='none' stroke='%23D4AF37' stroke-width='.5' opacity='.1'/%3E%3Cpath d='M50 25v50M30 50h40' stroke='%23D4AF37' stroke-width='.7' opacity='.2'/%3E%3C/svg%3E")`
};

/**
 * Get cathedral-themed pattern backgrounds
 */
export const getCathedralPattern = (type: 'crosses' | 'domes' | 'arches' | 'icons'): string => {
  return patternData[type] || '';
};
