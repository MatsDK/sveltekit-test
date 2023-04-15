<script lang="ts">
	import Header from './lib/Header.svelte'
	import Home from './lib/Home.svelte'
	import SaveTabTo from './lib/SaveTabTo.svelte'
	import { session, windowState } from './lib/store'
</script>

<main class="w-screen h-screen border border-border-color bg-primary">
	<Header />
	{#if $session?.user}
		{#if $windowState === 'home'}
			<Home />
		{:else if $windowState === 'save-to'}
			<SaveTabTo />
		{:else if $windowState === 'profile'}
			<div>Profile</div>
		{/if}
	{/if}
</main>
