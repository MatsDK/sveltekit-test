<script lang="ts">
	import HomeLinks from '$lib/components/Dashboard/HomeLinks.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<HomeLinks links={data.links} userId={data.session.user?.id} />
<section class="h-screen">
	<div>
		hello world
		{data.session.user?.name}
	</div>
	<h1>Folders</h1>
	{#each data.folders as folder}
		<div class="flex gap-5">
			<div>{folder.name}</div>
		</div>
	{/each}
</section>
