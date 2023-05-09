<script lang="ts">
    import CurveSelector from '$lib/components/CurveSelector.svelte';
    import PpCalculator from '$lib/components/PPCalculator.svelte';
    import PpMatrix from '$lib/components/PPMatrix.svelte';
    import StarModifierSelector from '$lib/components/StarModifierSelector.svelte';
    import StarCalculator from '$lib/components/StarCalculator.svelte';
    import StarMatrix from '$lib/components/StarMatrix.svelte';
    import { curves, getInitialCurve, type Curve } from '$lib/pp/curves';
    import { page } from '$app/stores';
    import { parseNullableNumber } from '$lib/utils/numbers';
    import type { CalculatorMode, QueryParams } from './_types';

    let query = $page.url.searchParams;

    function parseQueryStringNumber(value: string, defaultValue?: number) {
        const result = parseNullableNumber(value);

        if (result === null) {
            return defaultValue;
        }

        return result;
    }

    function getQueryValue(...keys: (keyof QueryParams)[]) {
        for (const key of keys) {
            const value = query.get(key);
            if (value != null) {
                return value;
            }
        }

        return undefined;
    }

    interface PageData {
        mode: CalculatorMode;
    }
    
    export let data: PageData;

    export let acc = parseQueryStringNumber(getQueryValue('acc'), 95);
    export let starRating = parseQueryStringNumber(getQueryValue('sr'), 7);
    export let targetPP = parseQueryStringNumber(getQueryValue('pp'), 300);
    export let starValue = parseQueryStringNumber(getQueryValue('sv'), 42.11);
    export let curve = getInitialCurve(getQueryValue('c'));

    const tempCurves: Curve[] = [];
    if (!curves.includes(curve)) {
        tempCurves.push(curve);
    }
</script>

<svelte:head>
    <title>PP Calculator</title>
</svelte:head>

<section>
    <div class="my-4">
        <StarModifierSelector bind:value={starValue} />
    </div>
    <div class="my-4">
        <CurveSelector bind:value={curve} temporaryCurves={tempCurves} />
    </div>

    <div class="tabs mb-4 tabs-boxed">
        <a class="tab tab-lg" data-sveltekit-prefetch href={`/calculator/pp`} class:tab-active={data.mode === 'pp'}>Performance points</a>
        <a class="tab tab-lg" data-sveltekit-prefetch href={`/calculator/stars`} class:tab-active={data.mode === 'stars'}>Stars</a>
    </div>

    {#if data.mode === 'pp'}
        <div class="md:flex justify-between items-center">
            <PpCalculator {curve} starMultiplier={starValue} bind:acc bind:starRating />
        </div>
        <div class="divider" />
        <PpMatrix {curve} starMultiplier={starValue} />
    {/if}

    {#if data.mode === 'stars'}
        <div class="md:flex justify-between items-center">
            <StarCalculator {curve} starMultiplier={starValue} bind:acc bind:targetPP />
        </div>
        <div class="divider" />
        <StarMatrix {curve} starMultiplier={starValue} />
    {/if}
</section>
