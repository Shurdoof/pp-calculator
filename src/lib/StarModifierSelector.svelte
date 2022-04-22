<script lang="ts">
    import { builtInStarMultipliers } from './pp/calculator';

    type Value = number | 'custom';

    let selectValue: Value;
    let customValue: number = 50;
    export let value: number;

    $: value = selectValue === 'custom' ? customValue : selectValue;

    if (value !== undefined) {
        const initialBuiltInValue = builtInStarMultipliers.find(x => x.value === value);
        if (initialBuiltInValue) {
            selectValue = initialBuiltInValue.value;
        } else {
            selectValue = 'custom';
            customValue = value;
        }
    }
</script>

<div class="input-group">
    <span class="label">
        <span class="label-text">Star value</span>
    </span>

    <select bind:value={selectValue} class="select select-bordered flex-1 w-1 md:w-auto md:flex-initial">
        {#each builtInStarMultipliers as item}
            <option value={item.value}>
                {item.value} ({item.name})
            </option>
        {/each}

        <option value="custom">Other...</option>
    </select>

    {#if selectValue === 'custom'}
        <input type="number" bind:value={customValue} class="input input-bordered" />
    {/if}
</div>
