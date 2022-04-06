<script context="module" lang="ts">
    export async function load(ctx) {
        let data = ctx.params;

        if (data.mode !== 'pp' && data.mode !== 'star') {
            return {
                status: 302,
                redirect: '/calculator'
            };
        }

        return { props: { mode: data.mode } };
    }
</script>

<script lang="ts">
    import CurveSelector from '$lib/CurveSelector.svelte';
    import PpCalculator from '$lib/PPCalculator.svelte';
    import PpMatrix from '$lib/PPMatrix.svelte';
    import { curves, type Curve } from '$lib/pp/curves';
    import StarModifierSelector from '$lib/StarModifierSelector.svelte';
    import StarCalculator from '$lib/StarCalculator.svelte';
    import StarMatrix from '$lib/StarMatrix.svelte';

    type CalculatorMode = 'pp' | 'star';

    let curve: Curve = curves[0];
    let starMultiplier: number;
    export let mode: CalculatorMode = 'pp';
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

    <div class="tabs mb-4 tabs-boxed">
        <a class="tab tab-lg" href="/calculator/pp" class:tab-active={mode === 'pp'}>Performance points</a>
        <a class="tab tab-lg" href="/calculator/star" class:tab-active={mode === 'star'}>Stars</a>
    </div>

    {#if mode === 'pp'}
        <PpCalculator {curve} {starMultiplier} />
        <div class="divider" />
        <PpMatrix {curve} {starMultiplier} />
    {/if}

    {#if mode === 'star'}
        <StarCalculator {curve} {starMultiplier} />
        <div class="divider" />
        <StarMatrix {curve} {starMultiplier} />
    {/if}
</section>
