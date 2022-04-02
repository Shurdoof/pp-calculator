<script lang="ts">
    import { curves, type Curve } from '$lib/pp/curves';
    import { parseCurve, stringifyCurve } from './pp/parser';
    import { addUserCurve, getUserCurves, removeUserCurve } from './pp/userCurves';

    let userCurves = getUserCurves();
    export let value: Curve = curves[0];

    let customCurveName: string = '';
    let customCurveData: string = '';

    $: isCustomCurveSelected = userCurves.includes(value);

    $: handleAddCurve = () => {
        const curve = parseCurve(customCurveName, customCurveData);

        if (curve) {
            userCurves = addUserCurve(curve);
            value = curve;
        }
    };

    $: handleDeleteCurve = () => {
        const index = userCurves.indexOf(value);
        if (index > -1) {
            userCurves = removeUserCurve(index);
            value = curves[0];
        }
    };

    $: resetDialog = () => {
        customCurveName = 'New curve';
        customCurveData = '';
    };

    // function prettyJson(obj) {
    //     return JSON.stringify(value, (a, b) => (Array.isArray(b) && b.length === 2 ? JSON.stringify(b) : b), 4);
    // }
</script>

<div class="input-group">
    <span class="label">
        <span class="label-text">Curve</span>
    </span>

    <select bind:value class="select select-bordered">
        {#each curves as curve}
            <option value={curve}>
                {curve.name}
            </option>
        {/each}

        {#if userCurves.length}
            <optgroup label="User">
                {#each userCurves as curve}
                    <option value={curve}>
                        {curve.name}
                    </option>
                {/each}
            </optgroup>
        {/if}
    </select>

    <a href="#add-curve" class="btn" on:click={resetDialog}>Add curve</a>
    {#if isCustomCurveSelected}
        <a href="#delete-curve" class="btn">Delete curve</a>
    {/if}
    <a href="#show-curve" class="btn">Show curve</a>
</div>

<div class="modal" id="add-curve">
    <div class="modal-box">
        <h3 class="font-bold text-lg">Add custom curve</h3>
        <div class="form-control my-4">
            <input type="text" bind:value={customCurveName} class="input input-bordered" />
        </div>

        <div class="form-control my-4">
            <textarea rows={14} bind:value={customCurveData} class="textarea textarea-bordered" />
        </div>
        <p class="my-4">Custom curves are stored locally on the browser!</p>
        <div class="modal-action">
            <a href="#" class="btn">Cancel</a>
            <a href="#" class="btn btn-primary" on:click={handleAddCurve}>Add</a>
        </div>
    </div>
</div>

<div class="modal" id="delete-curve">
    <div class="modal-box">
        <h3 class="font-bold text-lg mb-4">Delete curve</h3>
        <p class="py-4">Are you sure you want to delete curve {value.name}?</p>
        <div class="modal-action">
            <a href="#" class="btn">Cancel</a>
            <a href="#" class="btn btn-error" on:click={handleDeleteCurve}>Delete</a>
        </div>
    </div>
</div>

<div class="modal" id="show-curve">
    <div class="modal-box">
        <h3 class="font-bold text-lg mb-4">Curve info</h3>
        <div class="form-control">
            <textarea rows={14} value={stringifyCurve(value)} class="textarea textarea-bordered" readonly />
        </div>
        <div class="modal-action">
            <a href="#" class="btn">Okay</a>
        </div>
    </div>
</div>
