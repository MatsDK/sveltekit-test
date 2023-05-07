<script lang="ts">
	import { trpc } from '$lib/trpc/client';
	import Icon from '@iconify/svelte';
	import { page } from '$app/stores';
	import { renameModal, closeRenameModal } from './modal';
	import { invalidateAll } from '$app/navigation';

	let inputRef: HTMLInputElement;

	$: if (inputRef) {
		inputRef.focus();
		inputRef.select();
	}

	const renameFolder = async (event: Event) => {
		if (!$renameModal.id) return;
		const formData = new FormData(event.target as HTMLFormElement);

		const newName = formData.get('name')?.toString().trim() || '';
		if (!newName) return alert('invalid name');

		if ($renameModal.type === 'folder') {
			const res = await trpc($page).folders.rename.mutate({
				folderId: $renameModal.id,
				newName
			});
			if (res.success) renameModal.set({ active: false });
			console.log(res);
		} else if ($renameModal.type === 'tab') {
			const res = await trpc($page).tabs.rename.mutate({
				tabId: $renameModal.id,
				newName
			});
			if (res.success) renameModal.set({ active: false });
			console.log(res);
		}

		await invalidateAll();
	};
</script>

{#if $renameModal.active && $renameModal.id}
	<div
		class="absolute inset-0 z-20 flex h-screen w-screen items-center justify-center bg-black/20"
		on:click|self={closeRenameModal}
	>
		<div class="flex w-[440px] flex-col rounded-md border border-border-color bg-primary p-3">
			<div class="mb-3 flex flex-row justify-between">
				<h2 class="text-lg font-semibold">Rename {$renameModal.type}</h2>
				<button on:click={closeRenameModal}>
					<Icon
						icon="ic:baseline-close"
						class="text-2xl text-gray-text transition-colors hover:text-white"
					/>
				</button>
			</div>

			<form on:submit|preventDefault={renameFolder} class="py-2">
				<div class="flex flex-col gap-1 ">
					<label class="font-semibold text-light-gray-text">New name</label>
					<input
						class="rounded-md bg-border-color px-2 py-1 text-white outline-none"
						type="text"
						value={$renameModal.name}
						name="name"
						required
						bind:this={inputRef}
					/>
				</div>
				<button
					type="submit"
					class="mt-5 w-full rounded-lg bg-white py-1 font-semibold text-gray-900 hover:text-black "
					>Rename {$renameModal.type}</button
				>
			</form>
		</div>
	</div>
{/if}
