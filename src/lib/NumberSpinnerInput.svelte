<script lang="ts">
    import { clamp, parseNullableNumber } from './utils/numbers';

    export let min: number | string | null = null;
    export let max: number | string | null = null;
    export let value: number | null = 1;
    export let spinnerValue: number = 1;

    $: setValue = v => {
        value = clamp(v, parseNullableNumber(min), parseNullableNumber(max));
    };

    $: handleSpinnerClick = (change: number) => {
        setValue(value + change);
    };

    $: handleBlur = e => {
        setValue(value);
    };
</script>

<div class="input-group">
    <button class="btn btn-sm btn-square" on:click={e => handleSpinnerClick(-spinnerValue)}>-</button>
    <input type="number" bind:value on:blur={handleBlur} class="input input-bordered input-sm" {min} {max} />
    <button class="btn btn-sm btn-square" on:click={e => handleSpinnerClick(+spinnerValue)}>+</button>
</div>
