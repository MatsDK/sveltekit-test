<script lang="ts">
	import { page } from '$app/stores';
	import { trpc } from '$lib/trpc/client';

	export let showModal: boolean;
	export let home = false;

	let ref: HTMLInputElement;

	$: if (ref) {
		ref.focus();
	}

	const createTab = async (event: Event) => {
		const formData = new FormData(event.target as HTMLFormElement);

		const alias = formData.get('alias')?.toString() || '';
		const href = formData.get('href')?.toString() || '';

		const res = await trpc($page).tabs.create.mutate({
			alias,
			href,
			home
		});
		console.log(res);
	};

	const createFolder = async (event: Event) => {
		const formData = new FormData(event.target as HTMLFormElement);

		const name = formData.get('name')?.toString() || '';

		const res = await trpc($page).folders.create.mutate({ name });
		console.log(res);
	};
</script>

<div
	class="absolute inset-0 w-screen h-screen flex items-center justify-center bg-black/20"
	on:click|self={() => (showModal = false)}
>
	<div class="w-96 h-64 bg-secondary flex flex-col">
		<div class="flex flex-row justify-between">
			<h2>Add Link</h2>
			<button on:click={() => (showModal = false)}> Close </button>
		</div>

		<form on:submit|preventDefault={createTab}>
			<input type="text" placeholder="href" name="href" bind:this={ref} />
			<input type="text" placeholder="alias" name="alias" />
			<button type="submit">Create</button>
		</form>

		{#if !home}
			<hr />
			<h2>Add Folder</h2>
			<form on:submit|preventDefault={createFolder}>
				<input type="text" placeholder="name" name="name" />
				<button type="submit">Create</button>
			</form>
		{/if}
	</div>
</div>
