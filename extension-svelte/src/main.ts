import './app.postcss'
import App from './App.svelte'

const app = new App({
	// eslint-disable-next-line  @typescript-eslint/no-non-null-assertion
	target: document.getElementById('app')!,
})

export default app
