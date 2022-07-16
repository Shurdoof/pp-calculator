<script lang="ts">
    import Header from '$lib/components/Header.svelte';
    import '../app.css';
</script>

<Header />

<main class="container mx-auto">
    <slot />
</main>

<footer class="footer footer-center p-4 text-base-content">Made by Shurdoof</footer>
