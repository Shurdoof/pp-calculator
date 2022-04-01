<script context="module" lang="ts">
	export const prerender = true;
</script>

<script lang="ts">
	import PpCalculator from '$lib/PPCalculator.svelte';
</script>

<svelte:head>
	<title>PP Calculator</title>
</svelte:head>

<section>
	<PpCalculator />
</section>
<!-- 
<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 1;
	}
</style> -->
