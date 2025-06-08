
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				orthodox: {
					blue: '#1A1F2C',
					deepblue: '#101423',
					gold: '#D4AF37',
					burgundy: '#800020',
					red: '#9B2335',
					ivory: '#FFFFF0',
					stone: '#E5E4D7',
				},
				// Custom colors
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
			fontFamily: {
				serif: ['Garamond', 'Georgia', 'serif'],
				display: ['Playfair Display', 'serif'],
				body: ['Source Serif Pro', 'serif'],
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'fade-in': {
					'0%': {
						opacity: '0',
						transform: 'translateY(10px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'fade-out': {
					'0%': {
						opacity: '1',
						transform: 'translateY(0)'
					},
					'100%': {
						opacity: '0',
						transform: 'translateY(10px)'
					}
				},
				'icon-glow': {
					'0%, 100%': {
						filter: 'drop-shadow(0 0 5px rgba(212, 175, 55, 0.2))'
					},
					'50%': {
						filter: 'drop-shadow(0 0 15px rgba(212, 175, 55, 0.5))'
					}
				},
				'gentle-pulse': {
					'0%, 100%': {
						opacity: '0.6',
						transform: 'scale(1)'
					},
					'50%': {
						opacity: '1',
						transform: 'scale(1.05)'
					}
				},
				'candle-flicker': {
					'0%, 100%': {
						opacity: '0.8',
						transform: 'rotate(-1deg) scale(0.98)'
					},
					'25%': {
						opacity: '1',
						transform: 'rotate(0deg) scale(1)'
					},
					'50%': {
						opacity: '0.9',
						transform: 'rotate(1deg) scale(0.99)'
					},
					'75%': {
						opacity: '1',
						transform: 'rotate(0deg) scale(1.01)'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.5s ease-out',
				'fade-out': 'fade-out 0.5s ease-out',
				'icon-glow': 'icon-glow 3s ease-in-out infinite',
				'gentle-pulse': 'gentle-pulse 4s ease-in-out infinite',
				'candle-flicker': 'candle-flicker 4s ease-in-out infinite',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
