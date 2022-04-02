<script context="module" lang="ts">
    export const prerender = true;
</script>

<script lang="ts">
    import CurveSelector from '$lib/CurveSelector.svelte';
    import PpCalculator from '$lib/PPCalculator.svelte';
    import PpMatrix from '$lib/PPMatrix.svelte';
    import { curves, type Curve } from '$lib/pp/curves';

    let curve: Curve = curves[0];
    // let curve: Curve;
</script>

<svelte:head>
    <title>PP Calculator</title>
</svelte:head>

<section>
    <CurveSelector bind:value={curve} />
    <div class="divider" />
    <PpCalculator {curve} />
    <div class="divider" />
    <PpMatrix {curve} />
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
