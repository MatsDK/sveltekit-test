<script lang="ts">
	import Icon from '@iconify/svelte';
	import type { Folder, Link } from '@prisma/client';

	export let links: Link[] = [];
	export let folders: Folder[] = [];
	export let title: string;
	export let isDefaultFolder = false;

	let isCollapsed = false;
	let isDropdownOpen = false;

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
						}}
					>
						Add Tab
					</li>
					{#if !isDefaultFolder}<li class="">Rename Folder</li>{/if}
					<li class="">Clear Folder</li>
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
				<span class="whitespace-nowrap overflow-ellipsis overflow-hidden">{folder.name}</span>
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
				<div class="w-6 h-6 rounded-lg overflow-hidden">
					<img class="w-6 h-6" src={link.icon} alt={link.alias} />
				</div>
				<span class="group-hover:underline whitespace-nowrap overflow-ellipsis overflow-hidden"
					>{link.alias}</span
				>
			</a>
		{/each}
	{/if}
</div>
