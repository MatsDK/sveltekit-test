<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData } from './$types';

	export let data: PageData;

	let showModal = false;
	let ref: HTMLInputElement;

	$: if (ref) {
		ref.focus();
	}
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section class="h-screen ">
	<div>
		hello world
		{data.session.user?.name}
		<button on:click={() => (showModal = true)}> Create New Home Link </button>
	</div>
	<h1>Links</h1>
	{#each data.links as link}
		<div class="flex gap-5">
			<button
				on:click={() => {
					window.open(link.href, '_blank');
				}}>{link.alias}</button
			>
			<div>{link.href}</div>
		</div>
	{/each}
	<h1>Folders</h1>
	{#each data.folders as folder}
		<div class="flex gap-5">
			<div>{folder.name}</div>
		</div>
	{/each}
</section>

{#if showModal}
	<div class="absolute inset-0 w-screen h-screen flex items-center justify-center">
		<div class="w-96 h-64 bg-secondary flex flex-col">
			<div class="flex flex-row justify-between">
				<h2>Add Home Link</h2>
				<button on:click={() => (showModal = false)}> Close </button>
			</div>

			<form
				method="POST"
				action="?/create-home-link"
				use:enhance={async ({ data: formData, cancel }) => {
					const href = formData.get('href')?.toString();
					if (!href) return cancel();

					let userId = data.session.user?.id;
					if (!userId) return cancel();

					formData.set('userId', userId);
					showModal = false;
					// return async ({ result }) => {
					// 	if (result.type === 'success') showModal = false;
					// };
				}}
			>
				<input type="text" placeholder="href" bind:this={ref} name="href" />
				<input type="text" placeholder="alias" name="alias" />
				<button type="submit">Create</button>
			</form>

			<hr />
			<h2>Add Home Folder</h2>
			<form
				method="POST"
				action="?/create-home-folder"
				use:enhance={async ({ data: formData, cancel }) => {
					let userId = data.session.user?.id;
					if (!userId) return cancel();

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
