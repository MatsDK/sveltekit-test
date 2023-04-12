<script>
	import { trpc } from './trpc'

	const getCurrentTab = async () => {
		const queryOptions = { active: true, lastFocusedWindow: true }
		const [tab] = await chrome.tabs.query(queryOptions)
		return tab
	}

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
</script>

<div class="flex flex-wrap items-center p-2 pt-3 gap-2">
	<button
		on:click={saveCurrentTab}
		class="bg-secondary rounded-md px-2 py-1 font-semibold text-neutral-300 hover:text-white transition-colors"
		>Save current tab</button
	>
	<button
		class="bg-secondary rounded-md px-2 py-1 font-semibold text-neutral-300 hover:text-white transition-colors"
		>Save current window</button
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
	{#each folders as folder}
		<div>
			Folder: {folder.name}
		</div>
	{/each}
{/await}
