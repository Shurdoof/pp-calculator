<script lang="ts">
    import { calculateStars } from '$lib/pp/calculator';
    import type { Curve } from '$lib/pp/curves';
    import NumberSpinnerInput from './NumberSpinnerInput.svelte';

    let targetPP: number = 300;
    let acc = 95;

    export let curve: Curve;
    export let starMultiplier: number;
</script>

<div>
    <div class="stats bg-base-200">
        <div class="stat">
            <div class="stat-figure text-primary" />
            <div class="stat-title">Accuracy %</div>

            <div class="stat-value">
                <NumberSpinnerInput bind:value={acc} min="0" max="100" />
            </div>
        </div>

        <div class="stat">
            <div class="stat-figure text-primary" />
            <div class="stat-title">Target performance points</div>

            <div class="stat-value">
                <NumberSpinnerInput bind:value={targetPP} spinnerValue={10} min="0" />
            </div>
        </div>

        <div class="stat">
            <div class="stat-figure text-primary" />
            <div class="stat-title">Star rating</div>

            <div class="stat-value text-primary">
                {calculateStars(curve.points, acc, targetPP, starMultiplier).stars.toFixed(2)} ★
            </div>
        </div>
    </div>
</div>
