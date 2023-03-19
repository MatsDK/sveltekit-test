module.exports = {
	root: true,
	parser: '@typescript-eslint/parser',
	plugins: ['prettier', '@typescript-eslint'],
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:prettier/recommended',
	],
	parserOptions: {
		ecmaVersion: 2020,
		sourceType: 'module',
		ecmaFeatures: {
			jsx: true,
		},
	},
	env: {
		browser: true,
		amd: true,
		node: true,
	},
	ignorePatterns: ['*.cjs', 'node_modules', 'dist'],
}
