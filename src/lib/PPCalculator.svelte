<script lang="ts">
	import { calculatePP } from '$lib/pp/calculator';
	import type { Curve } from '$lib/pp/curves';

	let stars: number = 7;
	let acc = 95;
	export let curve: Curve;
</script>

<div class="p-4">
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
</div>
