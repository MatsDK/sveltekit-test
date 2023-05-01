<script lang="ts">
	import type { Link } from '@prisma/client';
	import Icon from '@iconify/svelte';
	import NewLinkModal from './NewLinkModal.svelte';
	import { contextMenu } from './store';

	export let links: Link[];
	let showModal = false;

	let { showMenu, tab, ...pos } = $contextMenu;

	const onRightClick = async (e: MouseEvent, tab: Link) => {
		if (showMenu) {
			contextMenu.set({ ...pos, showMenu: false, tab });
			await new Promise((res) => setTimeout(res, 100));
		}

		contextMenu.set({ x: e.clientX, y: e.clientY, showMenu: true, tab });
	};
</script>

<div
	class="pointer-events-none z-10 flex w-full items-center justify-center backdrop-blur-md backdrop-saturate-150 border-b border-border-color h-header-height py-10"
>
	<div
		class="pointer-events-auto flex w-full max-w-max-page-width justify-center gap-4 overflow-x-auto rounded-md  px-5 py-4 text-white"
	>
		{#each links.filter((link) => link.home) as link}
			<a
				href={link.href}
				class="flex w-12 shrink-0 animate-fade-in flex-col items-center justify-center overflow-hidden"
				title={link.alias}
				on:click|preventDefault={() => {
					window.open(link.href, '_blank');
				}}
				on:contextmenu|preventDefault={(e) => onRightClick(e, link)}
			>
				<div class="h-10 w-10 overflow-hidden rounded-lg">
					<img class="h-10 w-10" src={link.icon} alt={link.alias} />
				</div>
			</a>
		{/each}
		<button
			class="animate-fade-i flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-border-color bg-secondary"
			on:click={() => (showModal = !showModal)}
		>
			<Icon icon="mdi:plus" class="text-2xl text-white" />
		</button>
	</div>
</div>

{#if showModal}
	<NewLinkModal home hideCreateFolder bind:showModal />
{/if}
