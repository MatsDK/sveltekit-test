<script>
	import { page } from '$app/stores';
	import { signIn, signOut } from '@auth/sveltekit/client';
	import Logo from '../Logo.svelte';
</script>

<header class="fixed z-10 w-full top-0 h-header-height backdrop-blur-md backdrop-saturate-150">
	<nav class=" max-w-max-page-width max-page-width mx-auto w-full h-full px-5">
		<ul
			class="flex gap-5 items-center h-full relative after:absolute after:h-px after:w-full after:bottom-0 after:bg-white/10 font-medium"
		>
			<li class="">
				<a href="/" class="">
					<Logo />
				</a>
			</li>
			<li class="md:block hidden hover:text-offwhite transition-colors">
				<a href="/">Home</a>
			</li>
			<li class="md:block hidden hover:text-offwhite transition-colors">
				<a href="/">Features</a>
			</li>

			{#if $page.data.session}
				<!-- <span class="ml-auto">
					<small>Signed in as</small>
					<strong>{$page.data.session.user?.name}</strong>
				</span> -->

				<li class="ml-auto">
					<a
						href="/dashboard"
						class="border-white border px-3 py-[2px] rounded-lg hover:text-white text-black bg-white transition-colors hover:bg-transparent"
					>
						Dashboard
					</a>
				</li>
				{#if $page.data.session.user?.image}
					<img
						src={$page.data.session.user.image}
						alt="User image"
						class="rounded-full w-10 h-10 bg-main-gradient"
					/>
				{/if}
				<button on:click={() => signOut()}> Log out </button>
				<!-- <a href="/auth/signout" class="button">Log out</a> -->
			{:else}
				<li class="ml-auto">
					<button
						class="border-white border px-3 py-[2px] rounded-lg hover:text-white text-black bg-white transition-colors hover:bg-transparent"
						on:click={() => signIn('github')}>Log in</button
					>
				</li>
			{/if}
		</ul>
	</nav>
</header>
