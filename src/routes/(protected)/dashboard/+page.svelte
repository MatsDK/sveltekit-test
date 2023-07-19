<script lang="ts">
	import HomeLinks from '$lib/components/Dashboard/HomeLinks.svelte';
	import LinksContainer from '$lib/components/Dashboard/LinksContainer.svelte';
	import NewLinkModal from '$lib/components/Dashboard/NewLinkModal.svelte';
	import type { PageData } from './$types';
	import Logo from '$lib/components/Logo.svelte';
	import Icon from '@iconify/svelte';
	import { page } from '$app/stores';
	import RenameModal from '$lib/components/Dashboard/RenameModal.svelte';
	import MoveTabModal from '$lib/components/Dashboard/MoveTabModal.svelte';

	export let data: PageData;
	let showModal = false;

	$: console.log(import.meta.env.MODE);
</script>

<svelte:head>
	<title>Dashboard</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section class="flex h-screen overflow-hidden">
	<div
		class="flex h-screen w-header-height flex-col items-center gap-4 border-r border-border-color py-7"
	>
		<a href="/">
			<Logo />
		</a>
		<button class="" on:click={() => (showModal = true)}>
			<Icon icon="mdi:plus" class="text-2xl text-white" />
		</button>

		{#if $page.data.session?.user?.image}
			<div class="mt-auto">
				<img
					src={$page.data.session?.user.image}
					alt="User image"
					class="h-8 w-8 rounded-full bg-main-gradient"
				/>
			</div>
		{/if}
	</div>
	<div class="flex-1 overflow-auto">
		<HomeLinks links={data.links} />
		<div class="mt-16 flex flex-wrap justify-center gap-10">
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
	</div>
</section>

{#if showModal}
	<NewLinkModal bind:showModal />
{/if}

<RenameModal />
<MoveTabModal />
