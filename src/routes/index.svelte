<script context="module" lang="ts">
    export const prerender = true;
</script>

<script lang="ts">
    import CurveSelector from '$lib/CurveSelector.svelte';
    import PpCalculator from '$lib/PPCalculator.svelte';
    import PpMatrix from '$lib/PPMatrix.svelte';
    import { curves, type Curve } from '$lib/pp/curves';
    import StarModifierSelector from '$lib/StarModifierSelector.svelte';

    let curve: Curve = curves[0];
    let starMultiplier: number;
</script>

<svelte:head>
    <title>PP Calculator</title>
</svelte:head>

<section>
    <div class="my-4">
        <StarModifierSelector bind:value={starMultiplier} />
    </div>
    <div class="my-4">
        <CurveSelector bind:value={curve} />
    </div>
    <div class="divider" />
    <PpCalculator {curve} {starMultiplier} />
    <div class="divider" />
    <PpMatrix {curve} {starMultiplier} />
</section>
