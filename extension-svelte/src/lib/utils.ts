export const serverUrl = `http://127.0.0.1:5173`

export const getCurrentTab = async () => {
	const queryOptions = { active: true, lastFocusedWindow: true }
	const [tab] = await chrome.tabs.query(queryOptions)
	return tab
}
