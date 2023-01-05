<script lang="ts">
	import Hero from './Hero.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<Hero />
<section class="h-[500vh] my-32">
	<a href="/create">Create a todo</a>

	<ul>
		{#each data.todos as todo}
		<li>
			{todo.text}
		</li>
		{/each}
	</ul>
</section>
