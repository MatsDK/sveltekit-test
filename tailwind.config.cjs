const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			colors: {
				primary: '#000208',
				secondary: '#101013',
				offwhite: '#bfbfbf',
				blue: '#0ea5e9',
				'border-color': '#18181b',
				'gray-text': '#7a7c7d',
				'light-gray-text': '#9facb5'
			},
			maxWidth: {
				'max-page-width': '1200px'
			},
			spacing: {
				'header-height': '64px'
			},
			backgroundImage: {
				'main-gradient': 'linear-gradient(to right, #4338ca, #0ea5e9)',
				'hero-gradient':
					'radial-gradient(ellipse 80% 50% at 50% -20%,#0b2e8750,rgba(255, 255, 255, 0))'
			},
			keyframes: {
				'fade-in': {
					from: { opacity: 0, transform: 'translateY(-10px)' },
					to: { opacity: 1, transform: 'none' }
				}
			},
			animation: {
				'fade-in': 'fade-in 1000ms var(--animation-delay, 0ms) ease forwards'
			}
		}
	},

	plugins: []
};

module.exports = config;
