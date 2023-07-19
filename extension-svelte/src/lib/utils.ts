import { session } from './store'

// export const serverUrl = `http://127.0.0.1:5173`
export const serverUrl = `https://sveltekit-test-matsdk.vercel.app/`

export const getCurrentTab = async () => {
	const queryOptions = { active: true, lastFocusedWindow: true }
	const [tab] = await chrome.tabs.query(queryOptions)
	return tab
}

export const checkSession = async () => {
	chrome.runtime.sendMessage({ action: 'AUTH_CHECK' }, (s) => {
		console.log(s)
		session.set(s)
	})
}
