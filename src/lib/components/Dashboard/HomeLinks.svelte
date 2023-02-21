<script lang="ts">
	import type { Link } from '@prisma/client';
	import Icon from '@iconify/svelte';
	import NewHomeLinkModal from './NewHomeLinkModal.svelte';

	export let links: Link[];
	export let userId: string | undefined;
	let showModal = false;
</script>

<div class=" absolute w-full flex items-center justify-center pointer-events-none">
	<!-- <div
		class="bg-secondary border border-border-color w-full mx-10 max-w-max-page-width my-8 rounded-md text-white flex justify-center gap-4 pointer-events-auto p-3"
	> -->
	<div
		class="border-b border-border-color  max-w-max-page-width px-5 rounded-md text-white gap-4 pointer-events-auto flex w-full overflow-x-auto py-4 justify-center"
	>
		{#each links.filter((link) => link.home) as link}
			<a
				href={link.href}
				class="flex flex-col items-center animate-fade-in overflow-hidden justify-center w-12 shrink-0"
				title={link.alias}
				on:click|preventDefault={() => {
					window.open(link.href, '_blank');
				}}
			>
				<div class="w-10 h-10 rounded-lg overflow-hidden">
					<img class="w-10 h-10" src={link.icon} alt={link.alias} />
				</div>
			</a>
		{/each}
		<button
			class="border border-border-color rounded-lg w-12 h-12 flex items-center justify-center bg-secondary animate-fade-i shrink-0"
			on:click={() => (showModal = !showModal)}
		>
			<Icon icon="mdi:plus" class="text-2xl text-white" />
		</button>
	</div>
</div>

{#if showModal && userId}
	<NewHomeLinkModal {userId} bind:showModal />
{/if}
