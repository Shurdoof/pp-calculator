<script lang="ts">
    type Value = number | 'custom';

    const builtInValues = [
        { name: 'ScoreSaber', value: 42.11 },
        { name: 'Hitbloq', value: 50 }
    ];

    let selectValue: Value = builtInValues[0].value;
    let customValue: number = 50;

    export let value: number;

    $: value = selectValue === 'custom' ? customValue : selectValue;
</script>

<div class="input-group">
    <span class="label">
        <span class="label-text">Star value</span>
    </span>

    <select bind:value={selectValue} class="select select-bordered">
        {#each builtInValues as item}
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
