<script context="module" lang="ts">
    export async function load({ params }) {
        if (params.mode !== 'pp' && params.mode !== 'stars') {
            return {
                status: 302,
                redirect: '/calculator'
            };
        }

        return { props: { mode: params.mode } };
    }
</script>

<script lang="ts">
    import CurveSelector from '$lib/CurveSelector.svelte';
    import PpCalculator from '$lib/PPCalculator.svelte';
    import PpMatrix from '$lib/PPMatrix.svelte';
    import { curves, getCurveById, getInitialCurve, type Curve } from '$lib/pp/curves';
    import StarModifierSelector from '$lib/StarModifierSelector.svelte';
    import StarCalculator from '$lib/StarCalculator.svelte';
    import StarMatrix from '$lib/StarMatrix.svelte';
    import { page } from '$app/stores';
    import { parseNullableNumber } from '$lib/utils/numbers';
    import { toBase64Safe } from '$lib/utils/base64';
    import { stringifyCurve } from '$lib/pp/parser';
    import ShareButton from '$lib/ShareButton.svelte';
    import type { CalculatorMode, QueryParams } from './_types';

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

    export let mode: CalculatorMode = 'pp';
    let query = $page.url.searchParams;

    export let acc = parseQueryStringNumber(getQueryValue('acc'), 95);
    export let starRating = parseQueryStringNumber(getQueryValue('sr'), 7);
    export let targetPP = parseQueryStringNumber(getQueryValue('pp'), 300);
    export let starValue = parseQueryStringNumber(getQueryValue('sv'), 42.11);
    export let curve = getInitialCurve(getQueryValue('c'));

    const tempCurves: Curve[] = [];
    if (!curves.includes(curve)) {
        tempCurves.push(curve);
    }

    $: generatePermalink = () => {
        const isBuiltInCurve = curve.id && getCurveById(curve.id);
        const queryValues: QueryParams = {
            acc,
            sr: starRating,
            pp: targetPP,
            sv: starValue,
            c: isBuiltInCurve ? curve.id : toBase64Safe(stringifyCurve(curve, { pretty: false, includeMetadata: true }))
        };

        if (mode === 'pp') {
            delete queryValues.pp;
        } else if (mode === 'stars') {
            delete queryValues.sr;
        }

        const params = new URLSearchParams();
        for (const key of Object.keys(queryValues)) {
            if (queryValues[key] != null) {
                params.set(key, queryValues[key]);
            }
        }

        return `${$page.url.protocol}//${$page.url.host}${$page.url.pathname}?${params.toString()}`;
    };
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
        <a class="tab tab-lg" sveltekit:prefetch href={`/calculator/pp`} class:tab-active={mode === 'pp'}>Performance points</a>
        <a class="tab tab-lg" sveltekit:prefetch href={`/calculator/stars`} class:tab-active={mode === 'stars'}>Stars</a>
    </div>

    {#if mode === 'pp'}
        <div class="md:flex justify-between items-center">
            <PpCalculator {curve} starMultiplier={starValue} bind:acc bind:starRating />
            <ShareButton link={generatePermalink()} />
        </div>
        <div class="divider" />
        <PpMatrix {curve} starMultiplier={starValue} />
    {/if}

    {#if mode === 'stars'}
        <div class="md:flex justify-between items-center">
            <StarCalculator {curve} starMultiplier={starValue} bind:acc bind:targetPP />
            <ShareButton link={generatePermalink()} />
        </div>
        <div class="divider" />
        <StarMatrix {curve} starMultiplier={starValue} />
    {/if}
</section>
