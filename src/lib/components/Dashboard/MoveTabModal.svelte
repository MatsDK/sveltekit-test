<script lang="ts">
	import { moveTabModal } from './modal';

	const closeMoveTabModal = () => {
		moveTabModal.set({ active: false });
	};
</script>

{#if $moveTabModal.active && $moveTabModal.id}
	<div
		class="absolute inset-0 z-20 flex h-screen w-screen items-center justify-center bg-black/20"
		on:click|self={closeMoveTabModal}
	>
		<div class="flex w-[440px] flex-col rounded-md border border-border-color bg-primary p-3">
			test
		</div>
	</div>
{/if}
