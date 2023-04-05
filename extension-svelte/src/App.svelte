<script lang="ts">
	import { onMount } from 'svelte'

	const CREATE_TAB_POST_URL = 'http://127.0.0.1:5173/api/create'

	let session: Session | null

	onMount(() => {
		checkSession()
	})

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

	const checkSession = async () => {
		chrome.runtime.sendMessage({ action: 'AUTH_CHECK' }, (s) => {
			session = s
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
</script>

<main class="w-screen h-screen border border-border-color bg-primary">
	<button on:click={saveCurrentTab} class="">Save current tab</button>
	{#if !!session}
		<div>
			<h1>Welcome {session.user.name}</h1>
			<img src={session.user.image} alt="profile" width={25} height={25} />
			<button on:click={signOut}>Sign out</button>
		</div>
	{:else}
		<div>
			<button on:click={signIn}>Sign in</button>
		</div>
	{/if}
</main>
