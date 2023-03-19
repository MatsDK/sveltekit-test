const CREATE_TAB_POST_URL = 'http://127.0.0.1:5173/api/create'

async function getCurrentTab() {
	const queryOptions = { active: true, lastFocusedWindow: true }
	const [tab] = await chrome.tabs.query(queryOptions)
	return tab
}

export function App() {
	const saveCurrentTab = async () => {
		const currentTab = await getCurrentTab()
		if (!currentTab) return

		const body = {
			title: currentTab.title,
			url: currentTab.url,
			favicon_url: currentTab.favIconUrl,
		}

		await fetch(CREATE_TAB_POST_URL, {
			method: 'POST',
			body: JSON.stringify(body),
		})
	}

	return (
		<div class="w-screen h-screen border border-border-color bg-primary">
			<button onClick={saveCurrentTab}>Save current tab</button>
		</div>
	)
}
