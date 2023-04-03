<script>
	import '../app.postcss';
	import './styles.css';
</script>

<div class="bg-primary  text-white h-screen overflow-auto">
	<main class="overflow-auto">
		<slot />
	</main>

	<footer />
</div>
