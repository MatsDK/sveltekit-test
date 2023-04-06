<script lang="ts">
	import { onMount } from 'svelte'
	import { session } from './lib/store'
	import { trpc } from './lib/trpc'
	import { serverUrl } from './lib/utils'

	const CREATE_TAB_POST_URL = `${serverUrl}/api/create`

	onMount(() => {
		checkSession()
	})

	async function getCurrentTab() {
		const queryOptions = { active: true, lastFocusedWindow: true }
		const [tab] = await chrome.tabs.query(queryOptions)
		return tab
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
			session.set(s)
		})
	}

	const signIn = async () => {
		chrome.tabs.create({ url: serverUrl })
	}

	const signOut = async () => {
		await chrome.cookies.remove({
			name: 'next-auth.session-token',
			url: serverUrl,
		})
		checkSession()
	}
</script>

<main class="w-screen h-screen border border-border-color bg-primary">
	<button on:click={saveCurrentTab} class="">Save current tab</button>
	{#if !!$session}
		<div>
			<h1>Welcome {$session.user.name}</h1>
			<img src={$session.user.image} alt="profile" width={25} height={25} />
			<button on:click={signOut}>Sign out</button>
		</div>
	{:else}
		<div>
			<button on:click={signIn}>Sign in</button>
		</div>
	{/if}

	{#await trpc.folders.getAll.query() then folders}
		{#each folders as folder}
			<div>
				Folder: {folder.name}
			</div>
		{/each}
	{/await}
</main>
