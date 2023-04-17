<script lang="ts">
	import { onMount } from 'svelte'
	import { trpc } from './trpc'
	import { getCurrentTab } from './utils'

	let currentTab: chrome.tabs.Tab | null = null

	onMount(() => {
		getCurrentTab().then((tab) => {
			currentTab = tab ?? null
			href = currentTab?.url ?? ''
			alias = currentTab?.title ?? ''
		})
	})

	let selectedLocation = 'recent',
		href = '',
		alias = ''

	const saveCurrentTab = async () => {
		if (!currentTab) return

		href = href.trim()
		alias = alias.trim()

		if (selectedLocation === 'home') {
			await trpc.tabs.create.mutate({
				alias,
				href,
				home: true,
			})
		} else if (selectedLocation === 'recent') {
			await trpc.tabs.create.mutate({
				alias,
				href,
			})
		} else {
			await trpc.tabs.create.mutate({
				alias,
				href,
				folderId: selectedLocation,
			})
		}
	}
</script>

<section class="p-2">
	<div class="flex items-center gap-2 py-2">
		<p class="font-semibold text-light-gray-text">Location</p>

		<select
			bind:value={selectedLocation}
			class="border border-border-color bg-secondary px-2 text-white outline-none"
		>
			<option value="recent">Recently added</option>
			<option value="home">Home</option>
			{#await trpc.folders.getAll.query() then folders}
				{#each folders as folder}
					<option value={folder.uid}>{folder.name}</option>
				{/each}
			{/await}
		</select>
	</div>
	<form on:submit|preventDefault={saveCurrentTab} class="py-2">
		<div class="flex flex-col gap-1">
			<label for="href-input" class="font-semibold text-light-gray-text">Tab url</label>
			<input
				class="rounded-md bg-border-color px-2 py-1 text-white outline-none"
				id="href-input"
				type="text"
				placeholder="www.example.com"
				name="href"
				required
				bind:value={href}
			/>
		</div>
		<div class="mt-5 flex flex-col gap-1">
			<label for="alias-input" class="font-semibold text-light-gray-text">Name</label>
			<input
				class="rounded-md bg-border-color px-2 py-1 text-white outline-none"
				id="alias-input"
				type="text"
				placeholder="Example website"
				name="alias"
				required
				bind:value={alias}
			/>
		</div>
		<button
			type="submit"
			class="mt-5 w-full rounded-lg bg-white py-1 font-semibold text-gray-900 hover:text-black"
		>
			Create Tab
		</button>
	</form>
</section>
