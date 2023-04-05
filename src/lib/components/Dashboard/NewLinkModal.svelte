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

		const alias = formData.get('alias')?.toString() || '';
		const href = formData.get('href')?.toString() || '';

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
	class="absolute inset-0 w-screen h-screen flex items-center justify-center bg-black/20 z-20"
	on:click|self={() => (showModal = false)}
>
	<div class="w-[440px] bg-secondary flex flex-col border border-border-color rounded-md p-3">
		<div class="flex flex-row justify-between mb-3">
			<h2 class="font-semibold text-lg">Create a new tab</h2>
			<button on:click={() => (showModal = false)}>
				<Icon
					icon="ic:baseline-close"
					class="text-2xl text-gray-text hover:text-white transition-colors"
				/>
			</button>
		</div>

		<div class="py-2 border-t border-border-color flex items-center gap-2">
			<p class="text-light-gray-text font-semibold">Location</p>

			<select
				bind:value={selectedLocation}
				class="text-white border border-border-color bg-secondary outline-none px-2"
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
					class="rounded-md bg-border-color outline-none px-2 py-1 text-white"
					type="text"
					placeholder="www.example.com"
					name="href"
					required
					bind:this={ref}
				/>
			</div>
			<div class="flex flex-col gap-1 mt-5">
				<label class="font-semibold text-light-gray-text">Name</label>
				<input
					class="rounded-md bg-border-color outline-none px-2 py-1 text-white"
					type="text"
					placeholder="Example website"
					name="alias"
					required
				/>
			</div>
			<button
				type="submit"
				class="w-full bg-white font-semibold text-gray-900 hover:text-black rounded-lg py-1 mt-5"
				>Create Tab</button
			>
		</form>

		{#if !hideCreateFolder}
			<div class="border-t border-border-color mt-2">
				<h2 class="font-semibold text-lg">Create a new folder</h2>
				<form on:submit|preventDefault={createFolder}>
					<div class="flex flex-col gap-1 mt-3">
						<label class="font-semibold text-light-gray-text">Folder name</label>
						<input
							class="rounded-md bg-border-color outline-none px-2 py-1 text-white"
							type="text"
							placeholder="Example folder"
							name="name"
							required
						/>
					</div>
					<button
						type="submit"
						class="w-full bg-white font-semibold text-gray-900 hover:text-black rounded-lg py-1 mt-5"
						>Create Folder</button
					>
				</form>
			</div>
		{/if}
	</div>
</div>
