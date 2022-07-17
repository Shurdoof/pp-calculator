<script lang="ts">
    import type { CalculationResult } from '$lib/pp/calculator';
    import { generatePermalink } from '$lib/pp/permalink';
    import { updateClipboard } from '$lib/utils/clipboard';
    import { page } from '$app/stores';

    export let calculation: CalculationResult;
    export let cssClass: string;
    $: link = calculation ? generatePermalink(calculation, 'web', $page.url.origin) : '';
    let copied = false;

    function handleCopyClick(e) {
        updateClipboard(link, () => {
            copied = true;

            setTimeout(() => {
                copied = false;
            }, 2000);
        });
    }

    function handleInputClick(e) {
        e.target.select();
    }
</script>

<a href="#share" class={cssClass}>Share</a>

<div class="modal" id="share">
    <div class="modal-box">
        <h3 class="font-bold text-lg">Share</h3>
        <div class="input-group">
            <input type="text" value={link} class="form-control input input-bordered w-full" readonly on:click={handleInputClick} />
            <button class="btn w-20" on:click={handleCopyClick}>
                {#if copied}
                    Copied!
                {:else}
                    Copy
                {/if}
            </button>
        </div>
        <!-- <p class="mt-4">

            This link will direct to this page with the current parameters, including custom curves.<br />
            It will also show the calculation result in the preview if posted in Discord.
        </p> -->
        <div class="modal-action">
            <a href={'#'} class="btn w-20">Close</a>
        </div>
    </div>
</div>
