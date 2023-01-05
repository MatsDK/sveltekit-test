<script lang="ts">
	import { page } from "$app/stores";
</script>

<section>
	Hello world 
	<form method="POST" action="?/create">
		<input name="text" type="text" required>
		<button type="submit">Create</button>
	</form>
</section>