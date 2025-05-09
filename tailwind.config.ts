import type { Config } from "tailwindcss";

export default {
  darkMode: "class", // Enable dark mode based on class toggles

  // Paths where Tailwind will scan for classes
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],

  // Default prefix for Tailwind classes
  prefix: "",

  theme: {
    extend: {
      // Customizing container defaults
      container: {
        center: true,
        padding: '2rem',
        screens: {
          '2xl': '1400px',
        },
      },

      // Extending color palette with custom colors
      colors: {
        orthodox: {
          blue: '#1A1F2C',
          deepblue: '#101423',
          gold: '#D4AF37',
          burgundy: '#800020',
          red: '#9B2335',
          ivory: '#FFFFF0',
          stone: '#E5E4D7',
        },
        byzantine: {
          DEFAULT: '#9B2335',
          dark: '#800020',
          light: '#C13349',
        },
        gold: {
          DEFAULT: '#D4AF37',
          dark: '#AA8C2C',
          light: '#F0CB5A',
        },
      },

      // Extending font families for various use cases
      fontFamily: {
        serif: ['Garamond', 'Georgia', 'serif'],
        display: ['Playfair Display', 'serif'],
        body: ['Source Serif Pro', 'serif'],
      },

      // Customizing border radius values
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },

      // Defining custom keyframes for animations
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-out': {
          '0%': { opacity: '1', transform: 'translateY(0)' },
          '100%': { opacity: '0', transform: 'translateY(10px)' },
        },
        'icon-glow': {
          '0%, 100%': { filter: 'drop-shadow(0 0 5px rgba(212, 175, 55, 0.2))' },
          '50%': { filter: 'drop-shadow(0 0 15px rgba(212, 175, 55, 0.5))' },
        },
        'gentle-pulse': {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
        },
        'candle-flicker': {
          '0%, 100%': { opacity: '0.8', transform: 'rotate(-1deg) scale(0.98)' },
          '25%': { opacity: '1', transform: 'rotate(0deg) scale(1)' },
          '50%': { opacity: '0.9', transform: 'rotate(1deg) scale(0.99)' },
          '75%': { opacity: '1', transform: 'rotate(0deg) scale(1.01)' },
        },
      },

      // Configuring animations for specific effects
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in': 'fade-in 0.5s ease-out',
        'fade-out': 'fade-out 0.5s ease-out',
        'icon-glow': 'icon-glow 3s ease-in-out infinite',
        'gentle-pulse': 'gentle-pulse 4s ease-in-out infinite',
        'candle-flicker': 'candle-flicker 4s ease-in-out infinite',
      },
    },
  },

  // Adding Tailwind plugins for extended functionalities
  plugins: [
    require("tailwindcss-animate"), // Animation utilities
    // Add more plugins as needed
  ],
} as Config;
