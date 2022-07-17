<script lang="ts">
    import CopyImageButton from './CopyImageButton.svelte';
    import CopyLinkButton from './CopyLinkButton.svelte';
    import type { CalculationResult } from '$lib/pp/calculator';

    export let calculation: CalculationResult;
</script>

<div class="btn-group md:btn-group-vertical inline-flex md:w-32 align-top mt-1 md:mt-0">
    <CopyImageButton {calculation} cssClass="btn btn-sm md:mb-1 mr-1 md:mr-0" />
    <CopyLinkButton {calculation} cssClass="btn btn-sm" />
</div>
