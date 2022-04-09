<script lang="ts">
    import type { CalculationResult } from './pp/calculator';

    export let calculation: CalculationResult;

    const isCustomCurve = !calculation.curve.id;
    $: description = `${calculation.acc}% on ${calculation.stars.toFixed(2)}★ is ${calculation.pp.toFixed(2)}pp
Using curve "${calculation.curve.name}" ${isCustomCurve ? ' (custom)' : ''}`;
</script>

<svelte:head>
    <meta property="og:title" content="PP calculation result" />
    <meta property="og:description" content={description} />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://beatsaber.shurdoof.com" />
    <meta property="og:site_name" content="PP Calculator" />
</svelte:head>
