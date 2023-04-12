<script lang="ts">
	import Header from './lib/Header.svelte'
	import Home from './lib/Home.svelte'
	import { session } from './lib/store'
</script>

<main class="w-screen h-screen border border-border-color bg-primary">
	<Header />
	{#if $session?.user}
		<Home />
	{/if}
</main>
