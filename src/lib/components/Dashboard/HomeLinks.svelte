<script lang="ts">
	import type { Link } from '@prisma/client';

	export let links: Link[];
</script>

<div class=" absolute w-full flex items-center justify-center pointer-events-none">
	<div
		class="bg-white w-full mx-10 max-w-max-page-width my-8 rounded-md text-black flex justify-center gap-5 pointer-events-auto p-3"
	>
		{#each links as link}
			<button
				class="flex flex-col items-center w-12 animate-fade-in"
				title={link.href}
				on:click={() => {
					window.open(link.href, '_blank');
				}}
			>
				<img class="w-10 h-10" src={link.icon} alt={link.alias} />
				<!-- <span class="font-semibold">{link.alias}</span> -->
			</button>
		{/each}
	</div>
</div>
