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
		<button class="h-header-height my-2 absolute z-10 top-0" on:click={() => (showModal = true)}>
			New
		</button>
	</div>
	<div class="flex px-32 py-10 gap-10 flex-wrap justify-center mt-header-height">
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
