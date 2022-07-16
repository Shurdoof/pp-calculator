<script lang="ts">
    import { clamp, parseNullableNumber } from '$lib/utils/numbers';

    export let min: number | string | null = null;
    export let max: number | string | null = null;
    export let value: number | null = 1;
    export let step: number = 1;

    $: setValue = v => {
        value = clamp(v, parseNullableNumber(min), parseNullableNumber(max));
    };

    $: handleBlur = e => {
        setValue(value);
    };

    let mouseDownValue: number | null = null;
    let mouseDownChange: number | null = null;
    let spinnerInterval: number | null = null;
    let spinnerDelayTimeout: number | null = null;
    $: handleMouseDown = (change: number) => {
        mouseDownValue = value;
        mouseDownChange = change;

        spinnerDelayTimeout = window.setTimeout(() => {
            if (!spinnerInterval) {
                spinnerInterval = window.setInterval(() => setValue(value + change), 75);
            }
        }, 150);
    };

    $: handleMouseUp = () => {
        if (spinnerDelayTimeout) {
            window.clearTimeout(spinnerDelayTimeout);
            spinnerDelayTimeout = null;
        }

        if (spinnerInterval) {
            window.clearInterval(spinnerInterval);
            spinnerInterval = null;
        }

        if (mouseDownChange && mouseDownValue == value) {
            setValue(value + mouseDownChange);
            mouseDownValue = null;
            mouseDownChange = null;
        }
    };
</script>

<div class="input-group">
    <button class="btn btn-sm btn-square" on:mousedown={e => handleMouseDown(-step)} on:mouseup={handleMouseUp} on:mouseleave={handleMouseUp}>-</button>
    <input type="number" bind:value on:blur={handleBlur} class="input input-bordered input-sm" {min} {max} {step} />
    <button class="btn btn-sm btn-square" on:mousedown={e => handleMouseDown(+step)} on:mouseup={handleMouseUp} on:mouseleave={handleMouseUp}>+</button>
</div>

<style>
    input {
        font-weight: normal;
    }
</style>
