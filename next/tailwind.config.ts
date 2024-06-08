import plugin from 'tailwindcss/plugin'
import type { Config } from 'tailwindcss'

const config: Config = {
	content: ['./src/{app,ui}/**/*.{ts,tsx}'],
	theme: {
		extend: {
			colors: {
				ink: '#000',
				canvas: '#fff',
			},
			fontFamily: {
				sans: ['Lora', 'serif'],
			},
			maxHeight: {
				fold: 'calc(100svh - var(--header-height))',
			},
			keyframes: {
				'slide-in-left': {
					'0%': { transform: 'translateX(-100%)', opacity: '0' },
					'100%': { transform: 'translateX(0)', opacity: '1' },
				},
			},
			animation: {
				'slide-in-left': 'slide-in-left 1.5s ease-out forwards',
			},
		},
	},
	plugins: [
		require('tailwindcss-patterns'),
		plugin(function ({ addVariant }) {
			addVariant('header-open', 'body:has(#header-open:checked) &')
			addVariant('header-closed', 'body:has(#header-open:not(:checked)) &')
		}),
	],
	safelist: ['action', 'ghost'],
}

export default config
