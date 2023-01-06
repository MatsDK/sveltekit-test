const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			colors: {
				primary: "#000208",
			},
			maxWidth: {
				'max-page-width': "1200px",
			},
			spacing: {
				'header-height': "64px"
			},
			backgroundImage: {
				'main-gradient': "linear-gradient(to right, #4338ca, #0ea5e9)",
			}
		}
	},

	plugins: []
};

module.exports = config;
