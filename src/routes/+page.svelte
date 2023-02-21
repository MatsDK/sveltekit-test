<script lang="ts">
	import Hero from '$lib/components/Home/Hero.svelte';
	import Header from '$lib/components/Home/Header.svelte';
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<Header />
<Hero />
<section class="h-[100vh]" />
