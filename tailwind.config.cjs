const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			colors: {
				primary: '#000208',
				offwhite: '#b4bcd0',
				blue: '#0ea5e9'
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
				'fade-in': 'fade-in 1000ms var(--animation-delay, 0ms) ease'
			}
		}
	},

	plugins: []
};

module.exports = config;
