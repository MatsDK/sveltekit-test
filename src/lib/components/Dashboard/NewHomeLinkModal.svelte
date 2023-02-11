<script lang="ts">
	import { enhance } from '$app/forms';

	export let userId: string;
	export let showModal: boolean;

	let ref: HTMLInputElement;

	$: if (ref) {
		ref.focus();
	}
</script>

<div
	class="absolute inset-0 w-screen h-screen flex items-center justify-center bg-black/20"
	on:click|self={() => (showModal = false)}
>
	<div class="w-96 h-64 bg-secondary flex flex-col">
		<div class="flex flex-row justify-between">
			<h2>Add Home Link</h2>
			<button on:click={() => (showModal = false)}> Close </button>
		</div>

		<form
			method="POST"
			action="?/create-home-link"
			use:enhance={async ({ data: formData, cancel }) => {
				const href = formData.get('href')?.toString();
				if (!href) return cancel();

				formData.set('userId', userId);
				showModal = false;
				// return async ({ result }) => {
				// 	if (result.type === 'success') showModal = false;
				// };
			}}
		>
			<input type="text" placeholder="href" bind:this={ref} name="href" />
			<input type="text" placeholder="alias" name="alias" />
			<button type="submit">Create</button>
		</form>

		<hr />
		<h2>Add Home Folder</h2>
		<form
			method="POST"
			action="?/create-home-folder"
			use:enhance={async ({ data: formData, cancel }) => {
				formData.set('userId', userId);
				showModal = false;
				// return async ({ result }) => {
				// 	if (result.type === 'success') showModal = false;
				// };
			}}
		>
			<input type="text" placeholder="name" name="name" />
			<button type="submit">Create</button>
		</form>
	</div>
</div>
