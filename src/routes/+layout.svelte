<script>
	import '../app.postcss';
	import Header from './Header.svelte';
	import "./styles.css"
</script>

<div class="bg-primary min-h-screen text-white">
	<Header />

	<main >
		<slot />
	</main>

	<footer>
	</footer>
</div>
