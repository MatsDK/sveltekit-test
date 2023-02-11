<script lang="ts">
	import Hero from '$lib/components/Home/Hero.svelte';
	import Header from '$lib/components/Home/Header.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<Header />
<Hero />
<section class="h-[500vh] my-32" />
