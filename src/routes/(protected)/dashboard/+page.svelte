<script lang="ts">
	import { enhance } from '$app/forms';
	import HomeLinks from '$lib/components/Dashboard/HomeLinks.svelte';
	import LinksContainer from '$lib/components/Dashboard/LinksContainer.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	let userId = data.session.user?.id;
	let showModal = false;
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<HomeLinks links={data.links} userId={data.session.user?.id} />
<section class="h-screen">
	<div>
		<button class="h-header-height my-2" on:click={() => (showModal = true)}> New </button>
	</div>
	<div class="flex px-32 py-10 gap-10 flex-wrap">
		<LinksContainer title="Recently added" links={data.links.filter((link) => !link.home)} />
		{#each data.folders as folder}
			<LinksContainer title={folder.name} links={folder.links} folders={folder.folders} />
		{/each}
	</div>
</section>

{#if showModal && userId}
	<div
		class="absolute inset-0 w-screen h-screen flex items-center justify-center bg-black/20"
		on:click|self={() => (showModal = false)}
	>
		<div class="w-96 h-64 bg-secondary flex flex-col">
			<div class="flex flex-row justify-between">
				<h2>Add Link</h2>
				<button on:click={() => (showModal = false)}> Close </button>
			</div>

			<form
				method="POST"
				action="?/create-link"
				use:enhance={async ({ data: formData, cancel }) => {
					const href = formData.get('href')?.toString();
					if (!href) return cancel();

					formData.set('userId', userId);
					showModal = false;
					// return async ({ result }) => {
					// 	if (result.type === 'success') showModal = false;
					// };
				}}
			>
				<input type="text" placeholder="href" name="href" />
				<input type="text" placeholder="alias" name="alias" />
				<button type="submit">Create</button>
			</form>

			<hr />
			<h2>Add Folder</h2>
			<form
				method="POST"
				action="?/create-folder"
				use:enhance={async ({ data: formData }) => {
					formData.set('userId', userId);
					showModal = false;
					// return async ({ result }) => {
					// 	if (result.type === 'success') showModal = false;
					// };
				}}
			>
				<input type="text" placeholder="name" name="name" />
				<button type="submit">Create</button>
			</form>
		</div>
	</div>
{/if}
