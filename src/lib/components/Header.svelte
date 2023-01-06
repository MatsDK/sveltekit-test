<script>
	import Button from './Button.svelte';
	import { page } from '$app/stores';
	console.log($page);
</script>

<header class="sticky w-full top-0 h-header-height backdrop-blur-md backdrop-saturate-150">
	<nav class=" max-w-max-page-width max-page-width mx-auto w-full h-full px-5">
		<ul
			class="flex gap-5 items-center h-full relative after:absolute after:h-px after:w-full after:bottom-0 after:bg-white/10 font-medium"
		>
			<li class="md:block hidden">
				<a href="/">Home</a>
			</li>
			<li class="md:block hidden">
				<a href="/">Features</a>
			</li>

			{#if $page.data.session}
				<span class="ml-auto">
					<small>Signed in as</small>
					<strong>{$page.data.session.user?.name}</strong>
				</span>
				{#if $page.data.session.user?.image}
					<img
						src={$page.data.session.user.image}
						alt="User image"
						class="rounded-full w-10 h-10 bg-main-gradient"
					/>
				{/if}
				<a href="/auth/signout" class="button">Log out</a>
			{:else}
				<li class="ml-auto">
					<a href="/auth/signin">Log in</a>
				</li>
				<li class="">
					<Button><a href="/auth/signup">Sign up</a></Button>
				</li>
			{/if}
		</ul>
	</nav>
</header>
