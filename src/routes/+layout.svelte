<script>
	import '../app.postcss';
	import './styles.css';
</script>

<div class="h-screen  overflow-auto bg-primary text-white">
	<main class="overflow-auto">
		<slot />
	</main>

	<footer />
</div>
