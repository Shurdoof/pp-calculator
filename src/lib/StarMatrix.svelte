<script lang="ts">
    import type { Curve } from '$lib/pp/curves';
    import { calculatePP, calculateStars } from '$lib/pp/calculator';
    import { generateRangeArray } from './utils/numbers';

    type HoverState = { starRating: number; acc: number };

    export let curve: Curve;
    export let starMultiplier: number;

    export let ppMin = 50;
    export let ppMax = 1000;
    export let ppStep = 50;

    export let accMin = 85;
    export let accMax = 100;

    let currentHover: HoverState | null = null;

    $: accRange = generateRangeArray(accMin, accMax);
    $: ppRange = generateRangeArray(ppMin, ppMax, ppStep);
</script>

<div class="overflow-x-auto">
    <table class="table table-compact pp-matrix">
        <thead>
            <tr>
                <th />
                {#each ppRange as pp}
                    <th class:highlight={pp === currentHover?.starRating}>{pp}pp</th>
                {/each}
                <th />
            </tr>
        </thead>
        <tbody>
            {#each accRange as acc}
                <tr>
                    <th class:highlight={acc === currentHover?.acc}>
                        {acc}%
                    </th>
                    {#each ppRange as pp}
                        <td
                            class:hover={pp === currentHover?.starRating && acc === currentHover?.acc}
                            class:highlight={pp === currentHover?.starRating || acc === currentHover?.acc}
                            on:mouseenter={e => (currentHover = { starRating: pp, acc })}
                            on:mouseleave={e => (currentHover = null)}>{calculateStars(curve.points, acc, pp, starMultiplier).stars.toFixed(2)} ★</td
                        >
                    {/each}

                    <th class:highlight={acc === currentHover?.acc}>
                        {acc}%
                    </th>
                </tr>
            {/each}
        </tbody>

        <tfoot>
            <tr>
                <th />
                {#each ppRange as pp}
                    <th class:highlight={pp === currentHover?.starRating}>{pp}pp</th>
                {/each}
                <th />
            </tr>
        </tfoot>
    </table>
</div>

<style>
    .pp-matrix {
        table-layout: fixed;
    }
    .pp-matrix td,
    .pp-matrix th {
        width: 70px;
        text-align: right;
        text-transform: none;
    }

    .pp-matrix th {
        @apply bg-base-200;
    }
    .highlight {
        @apply bg-base-200;
    }

    th.highlight {
        @apply text-info;
    }

    .hover {
        @apply bg-base-300;
        @apply text-info;
    }
</style>
