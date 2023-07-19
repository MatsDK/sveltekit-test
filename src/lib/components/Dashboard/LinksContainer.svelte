<script lang="ts" generic="T">
	import { invalidateAll } from '$app/navigation';
	import { page } from '$app/stores';
	import { trpc } from '$lib/trpc/client';
	import Icon from '@iconify/svelte';
	import type { Folder, Link } from '@prisma/client';
	import { fade } from 'svelte/transition';
	import { moveTabModal, renameModal } from './modal';
	import NewLinkModal from './NewLinkModal.svelte';
	import { contextMenu } from './store';
	import Tab from './Tab.svelte';

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
			if (event.target instanceof HTMLElement && !element.contains(event.target)) {
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

	const deleteFolder = async () => {
		if (!folderId) return;

		const res = await trpc($page).folders.delete.mutate({ folderId });
		console.log(res);
		await invalidateAll();
	};

	const hideContextMenu = () => {
		contextMenu.set({ x: 0, y: 0, showMenu: false, tab: null });
	};

	const deleteTab = async () => {
		if (!folderId || !$contextMenu.tab) return;

		const res = await trpc($page).tabs.delete.mutate({ tabId: $contextMenu.tab.uid });
		console.log(res);
		await invalidateAll();
	};

	const makeHomeTab = async () => {
		if (!folderId || !$contextMenu.tab) return;

		const res = await trpc($page).tabs.makeHome.mutate({ tabId: $contextMenu.tab.uid });
		console.log(res);
		await invalidateAll();
	};

	const moveTab = async () => {
		if (!$contextMenu.tab) return;

		moveTabModal.set({
			active: true,
			currentLocation: $contextMenu.tab.folder_id
				? $contextMenu.tab.folder_id
				: $contextMenu.tab.home
				? 'home'
				: undefined,
			id: $contextMenu.tab.uid
		});
	};

	const renameFolder = () => {
		if (!folderId) return;
		renameModal.set({ active: true, name: title, id: folderId, type: 'folder' });
	};

	const renameTab = () => {
		if (!folderId || !$contextMenu.tab) return;

		renameModal.set({
			active: true,
			name: $contextMenu.tab.alias,
			id: $contextMenu.tab.uid,
			type: 'tab'
		});
	};
</script>

<div class="h-fit w-80 shrink-0 rounded-md border border-border-color">
	<div
		class="group relative flex h-10 items-center justify-between border-b border-border-color bg-secondary"
	>
		<button title="collapse" class="px-2" on:click={() => (isCollapsed = !isCollapsed)}>
			<Icon
				icon="material-symbols:keyboard-arrow-down"
				class="text-xl opacity-0 transition-opacity group-hover:opacity-100 {isCollapsed
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
				class="text-xl opacity-0 transition-opacity group-hover:opacity-100"
			/>
		</button>
		{#if isDropdownOpen}
			<div
				use:clickOutside={() => (isDropdownOpen = false)}
				class="absolute right-2 top-12 rounded-md border border-border-color bg-secondary py-2 shadow-2xl shadow-black"
			>
				<ul
					class="[&>li]:cursor-pointer [&>li]:px-4 [&>li]:text-gray-400  [&>li:hover]:bg-primary [&>*]:transition-colors [&>*:hover]:text-white"
				>
					<li
						on:click={() => {
							isDropdownOpen = false;
							showNewLinkModal = true;
						}}
					>
						Add Tab
					</li>
					<li class="" on:click={clearFolder}>Clear Folder</li>
					{#if !isDefaultFolder}<li class="" on:click={deleteFolder}>Delete Folder</li>{/if}
					{#if !isDefaultFolder}<li class="" on:click={renameFolder}>Rename Folder</li>{/if}
				</ul>
			</div>
		{/if}
	</div>
	{#if !isCollapsed}
		{#each folders as folder}
			<div
				class="flex h-7 items-center gap-4 overflow-hidden px-5 transition-colors hover:bg-secondary "
				title={folder.name}
			>
				<span class="overflow-hidden overflow-ellipsis whitespace-nowrap ">{folder.name}</span>
			</div>
		{/each}
		{#each links as link}
			<Tab {link} />
		{/each}
	{/if}
</div>

{#if showNewLinkModal}
	<NewLinkModal hideCreateFolder bind:showModal={showNewLinkModal} {folderId} />
{/if}

{#if $contextMenu.showMenu && $contextMenu.tab}
	{@const { tab, x, y } = $contextMenu}
	<div
		transition:fade={{ duration: 100 }}
		use:clickOutside={() => hideContextMenu()}
		style="top: {y}px; left: {x}px;"
		class="absolute z-50 w-52 rounded-md border border-border-color bg-primary py-1 shadow-lg shadow-black"
	>
		<ul
			class="[&>li]:cursor-pointer [&>li]:px-4 [&>li]:text-gray-400 [&>li:hover]:bg-primary [&>*]:transition-colors [&>*:hover]:text-white"
		>
			<li
				on:click={() => {
					window.open(tab.href, '_blank');
				}}
			>
				Open tab
			</li>
			<li on:click={deleteTab}>Delete tab</li>
			<li on:click={renameTab}>Rename tab</li>
			{#if !tab.home}
				<li on:click={makeHomeTab}>Move to home row</li>
			{/if}
			<li on:click={moveTab}>Move tab</li>
		</ul>
	</div>
{/if}
