<script lang="ts">
    import { page } from '$app/stores';

    import { builtInStarMultipliers, type CalculationResult } from './pp/calculator';

    export let calculation: CalculationResult;

    let title: string = 'PP calculator';
    let description: string = '';
    let imageUrl = null;

    const isShareUrl = !!$page.url.search;

    const starMultiplierName = builtInStarMultipliers.find(x => x.value === calculation.starMultiplier)?.name;

    if (isShareUrl) {
        const isCustomCurve = !calculation.curve.id;
        // if (calculation.calculationType === 'pp') {
        //     title = `${calculation.acc}% on ${calculation.stars.toFixed(2)}★ is ${calculation.pp.toFixed(2)}pp`;
        // } else if (calculation.calculationType === 'stars') {
        //     title = `To get ${calculation.pp.toFixed(2)}pp on ${calculation.stars.toFixed(2)}★ ${calculation.acc}% is needed `;
        // }
        title = `${calculation.acc}% on ${calculation.stars.toFixed(2)}★ is ${calculation.pp.toFixed(2)}pp`;
        description = `Curve: ${calculation.curve.name} ${isCustomCurve ? ' (custom)' : ''}
        Star value: ${calculation.starMultiplier.toFixed(2)} ${starMultiplierName ? `(${starMultiplierName})` : ''}`;

        imageUrl = $page.url.origin + $page.url.pathname + '/preview' + $page.url.search;
    }
</script>

<svelte:head>
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://beatsaber.shurdoof.com" />
    <meta property="og:site_name" content="PP Calculator" />
    {#if imageUrl}
        <meta property="og:image" content={imageUrl} />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="450" />
        <meta property="og:image:height" content="110" />
        <meta name="twitter:card" content="summary_large_image" />
    {/if}
</svelte:head>
