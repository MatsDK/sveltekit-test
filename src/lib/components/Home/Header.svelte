<script>
	import { page } from '$app/stores';
	import { signIn, signOut } from '@auth/sveltekit/client';
	import Logo from '../Logo.svelte';
</script>

<header class="fixed top-0 z-10 h-header-height w-full backdrop-blur-md backdrop-saturate-150">
	<nav class=" max-page-width mx-auto h-full w-full max-w-max-page-width px-5">
		<ul
			class="relative flex h-full items-center gap-5 font-medium after:absolute after:bottom-0 after:h-px after:w-full after:bg-white/10"
		>
			<li class="">
				<a href="/" class="">
					<Logo />
				</a>
			</li>
			<li class="hidden transition-colors hover:text-offwhite md:block">
				<a href="/">Home</a>
			</li>
			<li class="hidden transition-colors hover:text-offwhite md:block">
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
						class="rounded-lg border border-white bg-white px-3 py-[2px] text-black transition-colors hover:bg-transparent hover:text-white"
					>
						Dashboard
					</a>
				</li>
				{#if $page.data.session.user?.image}
					<img
						src={$page.data.session.user.image}
						alt="User image"
						class="h-10 w-10 rounded-full bg-main-gradient"
					/>
				{/if}
				<button on:click={() => signOut()}> Log out </button>
				<!-- <a href="/auth/signout" class="button">Log out</a> -->
			{:else}
				<li class="ml-auto">
					<button
						class="rounded-lg border border-white bg-white px-3 py-[2px] text-black transition-colors hover:bg-transparent hover:text-white"
						on:click={() => signIn('github')}>Log in</button
					>
				</li>
			{/if}
		</ul>
	</nav>
</header>
