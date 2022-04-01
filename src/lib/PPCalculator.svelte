<script lang="ts">
	import PPMatrix from '../lib/PPMatrix.svelte';
	import { calculatePP } from '../pp/calculator';
	import { curves, type Curve } from '../pp/curves';

	let stars: number = 7;
	let acc = 95;
	let curve: Curve = curves[0];
</script>

<div class="p-4">
	<select bind:value={curve} class="select select-bordered">
		{#each curves as curve}
			<option value={curve}>
				{curve.name}
			</option>
		{/each}
	</select>
	<div class="divider" />


	<div class="stats bg-base-200">
		<div class="stat">
			<div class="stat-figure text-primary" />
			<div class="stat-title">Accuracy %</div>

			<div class="stat-value">
				<input type="number" bind:value={acc} class="input input-bordered input-sm" min="0" max="100" />
			</div>
		</div>

		<div class="stat">
			<div class="stat-figure text-primary" />
			<div class="stat-title">Star rating ★</div>

			<div class="stat-value">
				<input type="number" bind:value={stars} class="input input-bordered input-sm" min="0" max="100" />
			</div>
		</div>

		<div class="stat">
			<div class="stat-figure text-primary" />
			<div class="stat-title">Performance Points</div>

			<div class="stat-value text-primary">
				{calculatePP(curve.points, stars, acc).pp.toFixed(2)}
			</div>
		</div>
	</div>

	<!-- <div class="form-control w-full max-w-xs">
		<span class="label">
			<span class="label-text">Accuracy (0-100)</span>
		</span>
		<input type="number" bind:value={acc} class="input input-primary input-sm" min="0" max="100" />
	</div>

	<div class="form-control w-full max-w-xs">
		<span class="label">
			<span class="label-text">Star rating</span>
		</span>
		<input type="text" bind:value={stars} class="input input-bordered input-sm w-full max-w-xs" />
	</div>

	<input type="text" bind:value={stars} class="input input-primary input-sm" />
	<input type="text" bind:value={acc} class="input input-primary input-sm" />
	<span> = </span>
	<input type="text" disabled value={calculatePP(curve.points, stars, acc).pp.toFixed(2)} class="input input-primary input-sm" /> -->

	<div class="divider" />

	<PPMatrix {curve} />
</div>
