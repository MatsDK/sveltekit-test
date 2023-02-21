<script lang="ts">
	import type { Folder, Link } from '@prisma/client';

	export let links: Link[] = [];
	export let folders: Folder[] = [];
	export let title: string;
</script>

<div class="w-80 shrink-0 border border-border-color rounded-md">
	<div
		class="h-10 border-b border-border-color flex items-center justify-center bg-secondary font-semibold"
	>
		<h1>{title}</h1>
	</div>
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
</div>
