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
