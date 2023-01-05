<script>
	import Button from "./Button.svelte"
</script>

<header class="sticky w-full top-0 h-header-height backdrop-blur-md backdrop-saturate-150">
	<nav class=" max-w-max-page-width max-page-width mx-auto w-full h-full px-5">
		<ul class="flex gap-5 items-center h-full relative after:absolute after:h-px after:w-full after:bottom-0 after:bg-white/10 font-medium">
			<li class="md:block hidden">
				<a href="/">Home</a>
			</li>
			<li class="md:block hidden">
				<a href="/">Features</a>
			</li>
			<li class="ml-auto">
				<a href="/">Log in</a>
			</li>
			<li class="">
				<Button><a href="/">Sign up</a></Button>
			</li>
		</ul>
	</nav>
</header>
