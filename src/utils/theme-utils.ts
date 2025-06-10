
/**
 * Theme utilities for the application
 * Centralizes theme configuration and helper functions
 */

// Orthodox theme colors
export const themeColors = {
  gold: "#D4AF37",
  byzantine: "#702963",
  byzantineDark: "#4A1942",
  // Add more theme colors as needed
};

// Theme mode helpers
export enum ThemeMode {
  LIGHT = 'light',
  DARK = 'dark'
}

// Get or set current theme mode
export const toggleTheme = (currentMode: ThemeMode): ThemeMode => {
  return currentMode === ThemeMode.LIGHT ? ThemeMode.DARK : ThemeMode.LIGHT;
};

// Check if current mode is dark
export const isDarkMode = (mode: ThemeMode): boolean => {
  return mode === ThemeMode.DARK;
};

// Get theme-specific class for an element
export const getThemeClass = (element: string, mode: ThemeMode): string => {
  switch (element) {
    case 'body':
      return mode === ThemeMode.DARK 
        ? 'bg-[#0a0d16] text-white' 
        : 'bg-white text-gray-900';
    case 'card':
      return mode === ThemeMode.DARK 
        ? 'bg-[#1A1F2C]/60 border-gold/20' 
        : 'bg-white border-gray-200';
    default:
      return '';
  }
};
