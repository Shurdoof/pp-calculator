<script lang="ts">
    import { calculatePP } from '$lib/pp/calculator';
    import type { Curve } from '$lib/pp/curves';
    import CopyButton from './CopyButton.svelte';
    import NumberSpinnerInput from './NumberSpinnerInput.svelte';
    import PpCalculationMeta from './PPCalculationMeta.svelte';

    export let starRating: number;
    export let acc: number;

    export let curve: Curve;
    export let starMultiplier: number;

    $: calculation = calculatePP(curve, acc, starRating, starMultiplier);
</script>

<PpCalculationMeta {calculation} />

<div>
    <div class="stats stats-vertical w-full md:stats-horizontal md:w-auto bg-base-200">
        <div class="stat">
            <div class="stat-title">Accuracy %</div>

            <div class="stat-value">
                <NumberSpinnerInput bind:value={acc} min="0" max="100" />
            </div>
        </div>

        <div class="stat">
            <div class="stat-title">Star rating ★</div>

            <div class="stat-value">
                <NumberSpinnerInput bind:value={starRating} min="0" max="10000" />
            </div>
        </div>

        <div class="stat">
            <div class="stat-title">Performance Points</div>

            <div class="stat-value text-primary">
                {calculation.pp.toFixed(2)}
            </div>
        </div>
    </div>
    <CopyButton {calculation} />
</div>
