<script lang="ts">
	import { onMount } from 'svelte'
	import { session } from './store'
	import { serverUrl } from './utils'

	console.log($session)

	onMount(() => checkSession())

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

	const checkSession = async () => {
		chrome.runtime.sendMessage({ action: 'AUTH_CHECK' }, (s) => {
			session.set(s)
		})
	}
</script>

{#if !!$session}
	<div class="border-b border-border-color flex items-center justify-between px-2 py-1">
		<a href={`${serverUrl}/dashboard`} target="_blank" class="font-semibold">Go to dashboard</a>
		<!-- <h1 class="font-semibold">
			Welcome {$session.user.name}
			<button on:click={signOut}>Sign out</button>
		</h1> -->
		<div class="w-7 h-7 rounded-full overflow-hidden">
			<img src={$session.user.image} alt="profile" width={28} height={28} />
		</div>
	</div>
{:else}
	<div>
		<button on:click={signIn}>Sign in</button>
	</div>
{/if}
