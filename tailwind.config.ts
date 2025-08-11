
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
			fontFamily: {
				'inter': ['Inter', 'sans-serif'],
				'space': ['Space Grotesk', 'sans-serif'],
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				'neon-green': 'hsl(var(--neon-green))',
				'soft-purple': 'hsl(var(--soft-purple))',
				'black-matte': 'hsl(var(--black-matte))',
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
				}
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
				'orbit-rotate': {
					'0%': { transform: 'rotate(0deg)' },
					'100%': { transform: 'rotate(360deg)' }
				},
				'icon-flow': {
					'0%': { opacity: '0', transform: 'translateX(-50px) scale(0.5)' },
					'50%': { opacity: '1', transform: 'translateX(-25px) scale(0.8)' },
					'100%': { opacity: '0', transform: 'translateX(0) scale(1)' }
				},
				'orb-pulse': {
					'0%, 100%': { 
						transform: 'scale(1)',
						boxShadow: '0 0 20px hsl(158 100% 50% / 0.6), 0 0 40px hsl(258 100% 71% / 0.3)'
					},
					'50%': { 
						transform: 'scale(1.05)',
						boxShadow: '0 0 30px hsl(158 100% 50% / 0.8), 0 0 60px hsl(258 100% 71% / 0.5)'
					}
				},
				'typing-bubble': {
					'0%': { transform: 'translateX(-100px)', opacity: '0' },
					'50%': { transform: 'translateX(-20px)', opacity: '0.8' },
					'100%': { transform: 'translateX(0)', opacity: '1' }
				},
				'card-float-in': {
					'0%': { opacity: '0', transform: 'translateY(30px) scale(0.9)' },
					'100%': { opacity: '1', transform: 'translateY(0) scale(1)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.3s ease-out',
				'orbit-rotate': 'orbit-rotate 20s linear infinite',
				'icon-flow': 'icon-flow 2s cubic-bezier(0.22, 1, 0.36, 1) forwards',
				'orb-pulse': 'orb-pulse 3s ease-in-out infinite',
				'typing-bubble': 'typing-bubble 1.5s cubic-bezier(0.22, 1, 0.36, 1) forwards',
				'card-float-in': 'card-float-in 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
