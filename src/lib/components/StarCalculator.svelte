<script lang="ts">
    import { calculateStars } from '$lib/pp/calculator';
    import type { Curve } from '$lib/pp/curves';
    import CalculatorButtons from './CalculatorButtons.svelte';
    import NumberSpinnerInput from './NumberSpinnerInput.svelte';
    import PpCalculationMeta from './PPCalculationMeta.svelte';

    export let targetPP: number;
    export let acc: number;

    export let curve: Curve;
    export let starMultiplier: number;

    $: calculation = calculateStars(curve, acc, targetPP, starMultiplier);
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
            <div class="stat-title">Target performance points</div>

            <div class="stat-value">
                <NumberSpinnerInput bind:value={targetPP} step={10} min="0" />
            </div>
        </div>

        <div class="stat">
            <div class="stat-title">Star rating</div>

            <div class="stat-value text-primary">
                {calculation.stars.toFixed(2)} ★
            </div>
        </div>
    </div>
    <CalculatorButtons {calculation} />
</div>
