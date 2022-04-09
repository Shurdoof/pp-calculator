<script lang="ts">
    import { updateClipboard } from './utils/clipboard';

    export let link: string;
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

<a href="#share" class="btn btn-lg">Share</a>

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
        <div class="modal-action">
            <a href={'#'} class="btn w-20">Close</a>
        </div>
    </div>
</div>
