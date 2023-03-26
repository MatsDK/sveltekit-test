import { useEffect, useState } from 'preact/hooks'
const CREATE_TAB_POST_URL = 'http://127.0.0.1:5173/api/create'

async function getCurrentTab() {
	const queryOptions = { active: true, lastFocusedWindow: true }
	const [tab] = await chrome.tabs.query(queryOptions)
	return tab
}

type Session = {
	expires: string
	user: User
}

type User = {
	email: string
	id: string
	name: string
	image: string
}

export function App() {
	const [session, setSession] = useState<Session | null>(null)

	useEffect(() => {
		checkSession()
	}, [])

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

	console.log(session)

	const checkSession = async () => {
		// chrome.cookies.get({
		// 	name: "next-auth.session-token",
		// 	"url": "http://127.0.0.1:5173/",
		// }, (cookie) => {
		// 	console.log(cookie);
		// })

		chrome.runtime.sendMessage({ action: 'AUTH_CHECK' }, (session) => {
			setSession(session)
			// if (session) {
			// 	setSession(session)
			// 	console.log(session);
			// } else {
			// 	setSession(null)
			// }
		})
	}

	const signIn = async () => {
		chrome.tabs.create({ url: 'http://127.0.0.1:5173/' })
	}

	const signOut = async () => {
		await chrome.cookies.remove({
			name: 'next-auth.session-token',
			url: 'http://127.0.0.1:5173/',
		})
		checkSession()
	}

	return (
		<div class="w-screen h-screen border border-border-color bg-primary">
			<button onClick={saveCurrentTab}>Save current tab</button>
			{!!session && (
				<div>
					<h1>Welcome {session.user.name}</h1>
					<img src={session.user.image} alt="profile image" width={25} height={25} />
					<button onClick={signOut}>Sign out</button>
				</div>
			)}
			{!session && <button onClick={signIn}>Sign in</button>}
		</div>
	)
}
