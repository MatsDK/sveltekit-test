<script lang="ts">
	import { trpc } from '$lib/trpc/client';
	import Icon from '@iconify/svelte';
	import type { Folder, Link } from '@prisma/client';
	import NewLinkModal from './NewLinkModal.svelte';
	import { page } from '$app/stores';

	export let links: Link[] = [];
	export let folders: Folder[] = [];
	export let title: string;
	export let isDefaultFolder = false;
	export let folderId: string | undefined = undefined;

	let isCollapsed = false;
	let isDropdownOpen = false;
	let showNewLinkModal = false;

	const clickOutside = (element: HTMLElement, callbackFunction: () => void) => {
		const onClick = (event: Event) => {
			if (
				isDropdownOpen &&
				event.target instanceof HTMLElement &&
				!element.contains(event.target)
			) {
				callbackFunction();
			}
		};

		document.body.addEventListener('click', onClick);

		return {
			update(newCallbackFunction: () => void) {
				callbackFunction = newCallbackFunction;
			},
			destroy() {
				document.body.removeEventListener('click', onClick);
			}
		};
	};

	const clearFolder = async () => {
		// TODO: ask if user is sure he wants to delete everything in folder

		const res = await trpc($page).folders.clear.mutate({ folderId });
		console.log(res);
	};

	const renameFolder = async () => {
		if (!folderId) return;

		const newName = prompt('Enter a new name')?.trim();
		if (!newName) return alert('invalid name');

		const res = await trpc($page).folders.rename.mutate({ folderId, newName });
		console.log(res);
	};
</script>

<div class="w-80 shrink-0 border border-border-color rounded-md h-fit">
	<div
		class="group h-10 border-b border-border-color flex items-center justify-between bg-secondary relative"
	>
		<button title="collapse" class="px-2" on:click={() => (isCollapsed = !isCollapsed)}>
			<Icon
				icon="material-symbols:keyboard-arrow-down"
				class="text-xl opacity-0 group-hover:opacity-100 transition-opacity {isCollapsed
					? 'rotate-180'
					: 'rotate-0'}"
			/>
		</button>
		<h1 class="font-semibold">{title}</h1>
		<button
			class="px-2"
			title="menu"
			on:click|stopPropagation={() => (isDropdownOpen = !isDropdownOpen)}
		>
			<Icon
				icon="mdi:dots-vertical"
				class="text-xl opacity-0 group-hover:opacity-100 transition-opacity"
			/>
		</button>
		{#if isDropdownOpen}
			<div
				use:clickOutside={() => (isDropdownOpen = false)}
				class="absolute right-2 top-12 border border-border-color bg-secondary rounded-md py-2 shadow-black shadow-2xl"
			>
				<ul
					class="[&>li]:text-gray-400 [&>li]:px-4 [&>li]:cursor-pointer  [&>li:hover]:bg-primary [&>*]:transition-colors [&>*:hover]:text-white"
				>
					<li
						on:click={() => {
							// isCollapsed = false;
							isDropdownOpen = false;
							showNewLinkModal = true;
						}}
					>
						Add Tab
					</li>
					{#if !isDefaultFolder}<li class="" on:click={renameFolder}>Rename Folder</li>{/if}
					<li class="" on:click={clearFolder}>Clear Folder</li>
					{#if !isDefaultFolder}<li class="">Delete Folder</li>{/if}
				</ul>
			</div>
		{/if}
	</div>
	{#if !isCollapsed}
		{#each folders as folder}
			<div
				class="flex items-center overflow-hidden gap-4 px-5 h-7 hover:bg-secondary transition-colors "
				title={folder.name}
			>
				<span class="whitespace-nowrap overflow-ellipsis overflow-hidden ">{folder.name}</span>
			</div>
		{/each}
		{#each links as link}
			<a
				href={link.href}
				class="flex items-center overflow-hidden gap-4 px-5 h-7 hover:bg-secondary transition-colors group"
				title={link.alias}
				on:click|preventDefault={() => {
					window.open(link.href, '_blank');
				}}
			>
				<div class="w-6 h-6 rounded-lg overflow-hidden ">
					<img class="w-6 h-6 object-contain" src={link.icon} alt={link.alias} />
				</div>
				<span class="group-hover:underline whitespace-nowrap overflow-ellipsis overflow-hidden"
					>{link.alias}</span
				>
			</a>
		{/each}
	{/if}
</div>

{#if showNewLinkModal}
	<NewLinkModal hideCreateFolder bind:showModal={showNewLinkModal} {folderId} />
{/if}
