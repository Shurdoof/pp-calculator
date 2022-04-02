<script lang="ts">
    import type { Curve } from '$lib/pp/curves';
    import { calculatePP } from '$lib/pp/calculator';

    type HoverState = { starRating: number; acc: number };

    function range(start: number, end: number) {
        return Array.from(new Array(end - start + 1), (x, i) => i + start);
    }

    export let curve: Curve;
    export let starMultiplier: number;

    export let minStars = 1;
    export let maxStars = 20;

    export let minAcc = 85;
    export let maxAcc = 100;

    let currentHover: HoverState | null = null;
</script>

<div class="overflow-x-auto">
    <table class="table table-compact pp-matrix">
        <thead>
            <tr>
                <th />
                {#each range(minStars, maxStars) as starRating}
                    <th class:highlight={starRating === currentHover?.starRating}>{starRating} ★</th>
                {/each}
                <th />
            </tr>
        </thead>
        <tbody>
            {#each range(minAcc, maxAcc) as acc}
                <tr>
                    <th class:highlight={acc === currentHover?.acc}>
                        {acc}%
                    </th>
                    {#each range(minStars, maxStars) as starRating}
                        <td
                            class:hover={starRating === currentHover?.starRating && acc === currentHover?.acc}
                            class:highlight={starRating === currentHover?.starRating || acc === currentHover?.acc}
                            on:mouseenter={e => (currentHover = { starRating, acc })}
                            on:mouseleave={e => (currentHover = null)}>{calculatePP(curve.points, acc, starRating, starMultiplier).pp.toFixed(2)}</td
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
                {#each range(minStars, maxStars) as starRating}
                    <th class:highlight={starRating === currentHover?.starRating}>{starRating} ★</th>
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
