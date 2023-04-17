import { session } from './store'

export const serverUrl = `http://127.0.0.1:5173`

export const getCurrentTab = async () => {
	const queryOptions = { active: true, lastFocusedWindow: true }
	const [tab] = await chrome.tabs.query(queryOptions)
	return tab
}

export const checkSession = async () => {
	chrome.runtime.sendMessage({ action: 'AUTH_CHECK' }, (s) => {
		session.set(s)
	})
}
