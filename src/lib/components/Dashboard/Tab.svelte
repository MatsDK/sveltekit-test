<script lang="ts">
	import type { Link } from '@prisma/client';
	import { fade } from 'svelte/transition';

	export let link: Link;

	let showMenu = false;
	let pos = { x: 0, y: 0 };

	const onRightClick = async (e: MouseEvent) => {
		if (showMenu) {
			showMenu = false;
			await new Promise((res) => setTimeout(res, 100));
		}

		pos = { x: e.clientX, y: e.clientY };
		showMenu = true;
	};

	let menuEl: HTMLDivElement;
	const onPageClick = (e: Event) => {
		if (e.target === menuEl || (e.target instanceof HTMLElement && menuEl.contains(e.target)))
			return;
		showMenu = false;
	};
</script>

<a
	href={link.href}
	class="flex items-center overflow-hidden gap-4 px-5 h-7 hover:bg-secondary transition-colors group"
	title={link.alias}
	on:click|preventDefault={() => {
		window.open(link.href, '_blank');
	}}
	on:contextmenu|preventDefault={onRightClick}
>
	<div class="w-6 h-6 rounded-lg overflow-hidden ">
		<img class="w-6 h-6 object-contain" src={link.icon} alt={link.alias} />
	</div>
	<span class="group-hover:underline whitespace-nowrap overflow-ellipsis overflow-hidden"
		>{link.alias}</span
	>
</a>

<svelte:body on:click={onPageClick} />

{#if showMenu}
	<div
		transition:fade={{ duration: 100 }}
		bind:this={menuEl}
		style="top: {pos.y}px; left: {pos.x}px;"
	/>
{/if}
