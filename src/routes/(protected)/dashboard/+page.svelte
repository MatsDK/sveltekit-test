<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
	console.log(data);

	let showModal = false;
	let ref: HTMLInputElement | null = null;

	$: if (ref) {
		ref.focus();
	}
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section class="h-screen ">
	<div>
		hello world
		{data.session.user?.name}
		<button on:click={() => (showModal = true)}> Create New Home Link </button>
	</div>
	{#each data.links as link}
		<div class="flex gap-5">
			<a
				on:click={() => {
					window.open(link.href, '_blank');
				}}>{link.alias}</a
			>
			<div>{link.href}</div>
		</div>
	{/each}
</section>

{#if showModal}
	<div class="absolute inset-0 w-screen h-screen flex items-center justify-center">
		<div class="w-96 h-64 bg-secondary flex flex-col">
			<div class="flex flex-row justify-between">
				<h2>Add Home Link</h2>
				<button on:click={() => (showModal = false)}> Close </button>
			</div>

			<form method="POST" action="?/create-home-link">
				<input type="text" placeholder="href" bind:this={ref} name="href" />
				<input type="text" placeholder="alias" name="alias" />
				<button type="submit">Create</button>
			</form>
		</div>
	</div>
{/if}
