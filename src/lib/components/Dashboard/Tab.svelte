<script lang="ts">
	import type { Link } from '@prisma/client';
	import { contextMenu } from './store';

	export let link: Link;

	let { showMenu, tab, ...pos } = $contextMenu;

	const onRightClick = async (e: MouseEvent) => {
		if (showMenu) {
			contextMenu.set({ ...pos, showMenu: false, tab });
			await new Promise((res) => setTimeout(res, 100));
		}

		contextMenu.set({ x: e.clientX, y: e.clientY, showMenu: true, tab: link });
	};
</script>

<a
	href={link.href}
	class="group flex h-7 items-center gap-4 overflow-hidden px-5 transition-colors hover:bg-secondary"
	title={link.alias}
	on:click|preventDefault={() => {
		window.open(link.href, '_blank');
	}}
	on:contextmenu|preventDefault={onRightClick}
>
	<div class="h-6 w-6 shrink-0 overflow-hidden rounded-lg">
		<img class="h-6 w-6" src={link.icon} alt={link.alias} />
	</div>
	<span class="overflow-hidden overflow-ellipsis whitespace-nowrap group-hover:underline"
		>{link.alias}</span
	>
</a>
