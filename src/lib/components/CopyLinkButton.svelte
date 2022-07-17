<script lang="ts">
    import type { CalculationResult } from '$lib/pp/calculator';
    import { generatePermalink } from '$lib/pp/permalink';
    import { page } from '$app/stores';

    export let calculation: CalculationResult;
    export let cssClass: string;

    let copied = false;

    $: handleClick = async () => {
        const url = generatePermalink(calculation, 'web', $page.url.origin);

        navigator.clipboard.writeText(url);

        copied = true;
        setTimeout(() => {
            copied = false;
        }, 2000);
    };
</script>

<button class={cssClass} on:click={handleClick}>
    {#if copied}
        Copied!
    {:else}
        Copy link
    {/if}
</button>
