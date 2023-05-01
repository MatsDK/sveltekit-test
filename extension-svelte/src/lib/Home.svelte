<script lang="ts">
	import { onMount } from 'svelte'
	import Close from './icons/Close.svelte'
	import { windowState } from './store'
	import { trpc } from './trpc'
	import { getCurrentTab } from './utils'

	const saveCurrentTab = async () => {
		const currentTab = await getCurrentTab()
		if (!currentTab) return

		const res = await trpc.tabs.create.mutate({
			alias: currentTab.title || '',
			href: currentTab.url || '',
			icon: currentTab.favIconUrl,
		})
		console.log(res)
	}

	let searchTerm: string | null = null
	let showSearch = false
	let searchRef: HTMLInputElement

	onMount(() => {
		const focusSearch = (e: KeyboardEvent) => {
			if (e.key !== '/' || !searchRef) return
			searchRef.focus()
			showSearch = true
			e.preventDefault()
		}

		document.addEventListener('keydown', focusSearch)

		return () => document.removeEventListener('keydown', focusSearch)
	})

	$: console.log(searchTerm)

	$: if (searchTerm != null) showSearch = true

	$: if (searchRef) {
		searchRef.focus()
	}
</script>

<div class="flex flex-wrap items-center p-2 pt-3 gap-2">
	<button
		on:click={saveCurrentTab}
		class="bg-secondary rounded-md px-2 py-1 font-semibold text-neutral-300 hover:text-white transition-colors"
		>Save current tab</button
	>
	<button
		class="bg-secondary rounded-md px-2 py-1 font-semibold text-neutral-300 hover:text-white transition-colors"
		on:click={() => windowState.set('save-to')}>Save tab to</button
	>
	<button
		class="bg-secondary rounded-md px-2 py-1 font-semibold text-neutral-400 hover:text-white transition-colors"
		>Save all windows</button
	>
</div>

{#await trpc.tabs.getHomeLinks.query() then { folders, links }}
	<div class="flex flex-wrap items-center gap-4 py-2 justify-center">
		{#each links.filter((l) => l.home) as link}
			<a
				href={link.href}
				class="flex flex-col items-center overflow-hidden justify-center w-7 shrink-0"
				title={link.alias}
				on:click|preventDefault={() => {
					window.open(link.href, '_blank')
				}}
			>
				<div class="w-7 h-7 rounded-lg overflow-hidden">
					<img class="w-7 h-7" width="28" height="28" src={link.icon} alt={link.alias} />
				</div>
			</a>
		{/each}
	</div>

	<div
		class="flex items-center justify-between gap-3 transition-opacity duration-300 m-2 border border-border-color rounded-md {showSearch
			? 'relative'
			: 'absolute -translate-x-full'} {showSearch ? 'opacity-100' : 'opacity-0'} "
	>
		<input
			type="text"
			placeholder="Search..."
			bind:value={searchTerm}
			bind:this={searchRef}
			class="flex-1 bg-primary px-2 py-1 text-white outline-none"
		/>
		<button
			class="p-1"
			tabIndex="-1" 
			on:click={() => {
				searchTerm = null
				showSearch = false
			}}
		>
			<Close />
		</button>
	</div>

	{#each folders as folder}
		<div>
			Folder: {folder.name}
		</div>
	{/each}

	{@const recentLinks = links.filter((l) => !l.home)}
	{@const filteredLinks = searchTerm
		? links.filter(
				(l) =>
					l.alias.toLowerCase().includes(searchTerm?.trim().toLowerCase() ?? '') ||
					l.href.toLowerCase().includes(searchTerm?.trim().toLowerCase() ?? ''),
		  )
		: recentLinks}
	{#each filteredLinks as link}
		<a
			href={link.href}
			class="group flex h-7 items-center gap-4 overflow-hidden px-5 transition-colors hover:bg-secondary"
			title={link.alias}
			on:click|preventDefault={() => {
				window.open(link.href, '_blank')
			}}
		>
			<div class="h-6 w-6 shrink-0 overflow-hidden rounded-lg">
				<img class="h-6 w-6" src={link.icon} alt={link.alias} />
			</div>
			<span class="overflow-hidden overflow-ellipsis whitespace-nowrap group-hover:underline"
				>{link.alias}</span
			>
		</a>
	{/each}
{/await}
