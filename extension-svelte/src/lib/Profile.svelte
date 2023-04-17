<script lang="ts">
	import { session } from './store'
	import { checkSession, serverUrl } from './utils'

	const signOut = async () => {
		await chrome.cookies.remove({
			name: 'next-auth.session-token',
			url: serverUrl,
		})

		checkSession()
	}
</script>

{#if $session?.user}
	<h1 class="font-semibold">
		Welcome {$session.user.name}
		<button on:click={signOut}>Sign out</button>
	</h1>
{/if}
