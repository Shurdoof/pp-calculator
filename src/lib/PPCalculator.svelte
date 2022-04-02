<script lang="ts">
    import { calculatePP } from '$lib/pp/calculator';
    import type { Curve } from '$lib/pp/curves';
    import { clamp } from '$lib/utils/numbers';

    let stars: number = 7;
    let acc = 95;

    $: modifyStars = (value: number) => {
        stars = clamp(stars + value, 0, 100);
    };

    $: modifyAcc = (value: number) => {
        acc = clamp(acc + value, 0, 100);
    };

    export let curve: Curve;
</script>

<div class="p-4">
    <div class="stats bg-base-200">
        <div class="stat">
            <div class="stat-figure text-primary" />
            <div class="stat-title">Accuracy %</div>

            <div class="stat-value">
                <div class="input-group">
                    <button class="btn btn-sm btn-square" on:click={e => modifyAcc(-1)}>-</button>
                    <input type="number" bind:value={acc} class="input input-bordered input-sm" min="0" max="100" />
                    <button class="btn btn-sm btn-square" on:click={e => modifyAcc(+1)}>+</button>
                </div>
            </div>
        </div>

        <div class="stat">
            <div class="stat-figure text-primary" />
            <div class="stat-title">Star rating ★</div>

            <div class="stat-value">
                <div class="input-group">
                    <button class="btn btn-sm btn-square" on:click={e => modifyStars(-1)}>-</button>
                    <input type="number" bind:value={stars} class="input input-bordered input-sm" min="0" max="100" />
                    <button class="btn btn-sm btn-square" on:click={e => modifyStars(+1)}>+</button>
                </div>
            </div>
        </div>

        <div class="stat">
            <div class="stat-figure text-primary" />
            <div class="stat-title">Performance Points</div>

            <div class="stat-value text-primary">
                {calculatePP(curve.points, stars, acc).pp.toFixed(2)}
            </div>
        </div>
    </div>
</div>
