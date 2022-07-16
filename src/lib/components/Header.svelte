<script lang="ts">
    import { page } from '$app/stores';
</script>

<header>
    <div class="navbar bg-base-300">
        <div class="flex-1">
            <a sveltekit:prefetch href="/" class="btn btn-ghost normal-case text-xl">PP Calculator</a>
        </div>
        <div class="flex-none">
            <a href="https://github.com/Shurdoof/pp-calculator" rel="external" class="btn btn-ghost normal-case" target="_blank">GitHub</a>
        </div>
    </div>

    <!-- <nav>
		<svg viewBox="0 0 2 3" aria-hidden="true">
			<path d="M0,0 L1,2 C1.5,3 1.5,3 2,3 L2,0 Z" />
		</svg>
		<ul>
			<li class:active={$page.url.pathname === '/'}>
				<a sveltekit:prefetch href="/">Home</a>
			</li>
			<li class:active={$page.url.pathname === '/about'}>
				<a sveltekit:prefetch href="/about">About</a>
			</li>
			<li class:active={$page.url.pathname === '/todos'}>
				<a sveltekit:prefetch href="/todos">Todos</a>
			</li>
		</ul>
		<svg viewBox="0 0 2 3" aria-hidden="true">
			<path d="M0,0 L0,3 C0.5,3 0.5,3 1,2 L2,0 Z" />
		</svg>
	</nav> -->
</header>
