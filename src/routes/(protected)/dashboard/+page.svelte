<script lang="ts">
	import HomeLinks from '$lib/components/Dashboard/HomeLinks.svelte';
	import LinksContainer from '$lib/components/Dashboard/LinksContainer.svelte';
	import NewLinkModal from '$lib/components/Dashboard/NewLinkModal.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	let showModal = false;
</script>

<svelte:head>
	<title>Dashboard</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<HomeLinks links={data.links} />
<section class="">
	<div>
		<button class="absolute top-0 z-10 my-2 h-header-height" on:click={() => (showModal = true)}>
			New
		</button>
	</div>
	<div class="mt-header-height flex flex-wrap justify-center gap-10 px-32 py-10">
		<LinksContainer
			isDefaultFolder
			title="Recently added"
			links={data.links.filter((link) => !link.home)}
		/>
		{#each data.folders as folder}
			<LinksContainer
				title={folder.name}
				links={folder.links}
				folders={folder.folders}
				folderId={folder.uid}
			/>
		{/each}
	</div>
</section>

{#if showModal}
	<NewLinkModal bind:showModal />
{/if}
