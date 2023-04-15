<script lang="ts">
	import { onMount } from 'svelte'
	import { session, windowState } from './store'
	import { serverUrl } from './utils'
	import Back from './icons/Back.svelte'

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
	<header
		class="border-b border-border-color flex items-center justify-between px-2 py-1 fixed top-0 z-10 h-header-height w-full backdrop-blur-md backdrop-saturate-150"
	>
		<div class="flex items-center gap-2">
			{#if $windowState !== 'home'}
				<button on:click={() => windowState.set('home')}><Back /></button>
			{/if}
			<a href={`${serverUrl}/dashboard`} target="_blank" class="font-semibold">
				Go to dashboard
			</a>
		</div>
		<!-- <h1 class="font-semibold">
			Welcome {$session.user.name}
			<button on:click={signOut}>Sign out</button>
		</h1> -->
		<button
			class="w-7 h-7 rounded-full overflow-hidden"
			on:click={() => windowState.set('profile')}
		>
			<img src={$session.user.image} alt="profile" width={28} height={28} />
		</button>
	</header>
{:else}
	<div>
		<button on:click={signIn}>Sign in</button>
	</div>
{/if}
