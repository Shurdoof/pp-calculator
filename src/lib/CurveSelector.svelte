<script lang="ts">
    import { curves, type Curve } from '$lib/pp/curves';
    import { parseCurve, stringifyCurve, StringifyCurveOptions } from './pp/parser';
    import { addUserCurve, getUserCurves, removeUserCurve } from './pp/userCurves';

    let userCurves = getUserCurves();
    export let temporaryCurves: Curve[] = [];
    export let value: Curve;

    let customCurveName: string = 'New curve';
    let customCurveData: string = '';

    let stringifyOptions = StringifyCurveOptions.defaults();

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

        {#if temporaryCurves.length}
            <optgroup label="Temporary">
                {#each temporaryCurves as curve}
                    <option value={curve}>
                        {curve.name}
                    </option>
                {/each}
            </optgroup>
        {/if}
    </select>

    <a href="#show-curve" class="btn">Curve details</a>
    {#if isCustomCurveSelected}
        <a href="#delete-curve" class="btn">Delete curve</a>
    {/if}
    <a href="#add-curve" class="btn" on:click={resetDialog}>Add curve</a>
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
            <a href={'#'} class="btn">Cancel</a>
            <a href={'#'} class="btn btn-primary" on:click={handleAddCurve}>Add</a>
        </div>
    </div>
</div>

<div class="modal" id="delete-curve">
    <div class="modal-box">
        <h3 class="font-bold text-lg mb-4">Delete curve</h3>
        <p class="py-4">Are you sure you want to delete curve {value.name}?</p>
        <div class="modal-action">
            <a href={'#'} class="btn">Cancel</a>
            <a href={'#'} class="btn btn-error" on:click={handleDeleteCurve}>Delete</a>
        </div>
    </div>
</div>

<div class="modal" id="show-curve">
    <div class="modal-box">
        <h3 class="font-bold text-lg mb-4">Curve details</h3>

        <div>
            <div class="form-control inline-block">
                <label class="label cursor-pointer">
                    <input type="checkbox" bind:checked={stringifyOptions.pretty} class="checkbox" />
                    <span class="label-text ml-2">Prettify</span>
                </label>
            </div>
        </div>

        <div>
            <div class="form-control inline-block">
                <label class="label cursor-pointer">
                    <input type="checkbox" bind:checked={stringifyOptions.includeMetadata} class="checkbox" />
                    <span class="label-text ml-2">Include metadata</span>
                </label>
            </div>
        </div>

        <div>
            <div class="form-control inline-block">
                <label class="label cursor-pointer">
                    <input type="radio" bind:group={stringifyOptions.direction} value="desc" class="radio" />
                    <span class="label-text ml-2">Descending</span>
                </label>
            </div>
            <div class="form-control inline-block">
                <label class="label cursor-pointer">
                    <input type="radio" bind:group={stringifyOptions.direction} value="asc" class="radio" />
                    <span class="label-text ml-2">Ascending</span>
                </label>
            </div>
        </div>
        <div>
            Curve has {value.points.length} points
        </div>

        <div class="form-control">
            <textarea rows={14} value={stringifyCurve(value, stringifyOptions)} class="textarea textarea-bordered" readonly />
        </div>

        <div class="modal-action">
            <a href={'#'} class="btn">Close</a>
        </div>
    </div>
</div>
