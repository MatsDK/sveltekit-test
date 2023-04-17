<script lang="ts">
	import { page } from '$app/stores';
	import { trpc } from '$lib/trpc/client';
	import Icon from '@iconify/svelte';

	export let showModal: boolean;
	export let hideCreateFolder = false;
	export let home = false;
	export let folderId: string | undefined = undefined;

	let ref: HTMLInputElement;

	$: if (ref) {
		ref.focus();
	}

	const createTab = async (event: Event) => {
		const formData = new FormData(event.target as HTMLFormElement);

		const alias = formData.get('alias')?.toString().trim() || '';
		const href = formData.get('href')?.toString().trim() || '';

		if (selectedLocation === 'home') {
			await trpc($page).tabs.create.mutate({
				alias,
				href,
				home: true
			});
		} else if (selectedLocation === 'recent') {
			await trpc($page).tabs.create.mutate({
				alias,
				href
			});
		} else {
			await trpc($page).tabs.create.mutate({
				alias,
				href,
				folderId: selectedLocation
			});
		}

		showModal = false;
	};

	const createFolder = async (event: Event) => {
		const formData = new FormData(event.target as HTMLFormElement);

		const name = formData.get('name')?.toString() || '';

		const res = await trpc($page).folders.create.mutate({ name });
		if (res.success) showModal = false;
	};

	const loadFolders = async () => {
		return await trpc($page).folders.getAll.query();
	};

	let selectedLocation = folderId ?? (home ? 'home' : 'recent');
</script>

<div
	class="absolute inset-0 z-20 flex h-screen w-screen items-center justify-center bg-black/20"
	on:click|self={() => (showModal = false)}
>
	<div class="flex w-[440px] flex-col rounded-md border border-border-color bg-secondary p-3">
		<div class="mb-3 flex flex-row justify-between">
			<h2 class="text-lg font-semibold">Create a new tab</h2>
			<button on:click={() => (showModal = false)}>
				<Icon
					icon="ic:baseline-close"
					class="text-2xl text-gray-text transition-colors hover:text-white"
				/>
			</button>
		</div>

		<div class="flex items-center gap-2 border-t border-border-color py-2">
			<p class="font-semibold text-light-gray-text">Location</p>

			<select
				bind:value={selectedLocation}
				class="border border-border-color bg-secondary px-2 text-white outline-none"
			>
				<option value="recent">Recently added</option>
				<option value="home">Home</option>
				{#await loadFolders() then folders}
					{#each folders as folder}
						<option value={folder.uid} selected={folderId == folder.uid}>{folder.name}</option>
					{/each}
				{/await}
			</select>
		</div>
		<form on:submit|preventDefault={createTab} class="py-2">
			<div class="flex flex-col gap-1 ">
				<label class="font-semibold text-light-gray-text">Tab url</label>
				<input
					class="rounded-md bg-border-color px-2 py-1 text-white outline-none"
					type="text"
					placeholder="www.example.com"
					name="href"
					required
					bind:this={ref}
				/>
			</div>
			<div class="mt-5 flex flex-col gap-1">
				<label class="font-semibold text-light-gray-text">Name</label>
				<input
					class="rounded-md bg-border-color px-2 py-1 text-white outline-none"
					type="text"
					placeholder="Example website"
					name="alias"
					required
				/>
			</div>
			<button
				type="submit"
				class="mt-5 w-full rounded-lg bg-white py-1 font-semibold text-gray-900 hover:text-black "
				>Create Tab</button
			>
		</form>

		{#if !hideCreateFolder}
			<div class="mt-2 border-t border-border-color">
				<h2 class="text-lg font-semibold">Create a new folder</h2>
				<form on:submit|preventDefault={createFolder}>
					<div class="mt-3 flex flex-col gap-1">
						<label class="font-semibold text-light-gray-text">Folder name</label>
						<input
							class="rounded-md bg-border-color px-2 py-1 text-white outline-none"
							type="text"
							placeholder="Example folder"
							name="name"
							required
						/>
					</div>
					<button
						type="submit"
						class="mt-5 w-full rounded-lg bg-white py-1 font-semibold text-gray-900 hover:text-black"
						>Create Folder</button
					>
				</form>
			</div>
		{/if}
	</div>
</div>
