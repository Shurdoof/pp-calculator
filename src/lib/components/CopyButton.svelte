<script lang="ts">
    import type { CalculationResult } from '$lib/pp/calculator';
    import { generatePermalink } from '$lib/pp/permalink';

    export let calculation: CalculationResult;
    let loading = false;
    let copied = false;

    $: handleClick = async () => {
        const url = generatePermalink(calculation, 'image');

        loading = true;

        try {
            const response = await fetch(url);
            const blob = await response.blob();

            const data = [new ClipboardItem({ [blob.type]: blob })];
            navigator.clipboard.write(data);

            copied = true;
            setTimeout(() => {
                copied = false;
            }, 2000);
        } finally {
            loading = false;
        }
    };
</script>

<button class="btn btn-sm" class:loading on:click={handleClick} disabled={loading}>
    {#if copied}
        Copied!
    {:else}
        Copy
    {/if}
</button>

<style>
    button {
        vertical-align: top;
    }
</style>
