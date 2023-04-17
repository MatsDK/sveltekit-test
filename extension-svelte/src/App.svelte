<script lang="ts">
	import Header from './lib/Header.svelte'
	import Home from './lib/Home.svelte'
	import SaveTabTo from './lib/SaveTabTo.svelte'
	import Profile from './lib/Profile.svelte'
	import { session, windowState } from './lib/store'
</script>

<main class="w-screen h-screen border border-border-color bg-primary overflow-hidden">
	<Header />
	<section class="pt-header-height overflow-auto h-screen scrollbar-hide">
		{#if $session?.user}
			{#if $windowState === 'home'}
				<Home />
			{:else if $windowState === 'save-to'}
				<SaveTabTo />
			{:else if $windowState === 'profile'}
				<Profile />
			{/if}
		{/if}
	</section>
</main>
