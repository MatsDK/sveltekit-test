<script>
	import BorderGradientButton from '../BorderGradientButton.svelte';
</script>

<section class="px-5 pt-header-height ">
	<div class="max-w-max-page-width mx-auto flex flex-col justify-center">
		<h1 class=" text-5xl md:text-8xl font-bold text-center mb-10 mt-20 md:mt-28 animate-fade-in">
			<span class="text-transparent bg-clip-text bg-main-gradient">Optimize</span>
			your browser experience
		</h1>

		<span
			class="text-center text-md md:text-xl text-offwhite animate-fade-in [animation-delay:100ms]"
			>A tool for organizing your browser environment in one place <br class="hidden md:block" />to
			streamline your workflow.
		</span>
		<div
			class="flex flex-col md:flex-row justify-center gap-4 md:gap-10 mt-12 px-12 animate-fade-in [animation-delay:250ms]"
		>
			<button
				class=" h-12 px-6 bg-white text-black rounded-md font-medium text-base flex justify-center gap-3 items-center hover:text-white hover:bg-transparent transition-colors border border-white"
			>
				Get started
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="w-5 h-5"
				>
					<path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
				</svg>
			</button>
			<button class="hover:text-offwhite transition-colors font-medium">Add extension</button>
		</div>
	</div>
</section>
