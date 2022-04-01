<script lang="ts">
	import PPMatrix from '../lib/PPMatrix.svelte';
	import { calculatePP } from '../pp/calculator';
	import { curves, type Curve } from '../pp/curves';

	let stars: number = 7;
	let acc = 95;
	let curve: Curve = curves[0];
</script>

<div>
	<select bind:value={curve}>
		{#each curves as curve}
			<option value={curve}>
				{curve.name}
			</option>
		{/each}
	</select>

	<input type="text" bind:value={stars} />
	<input type="text" bind:value={acc} />
	<div>{calculatePP(curve.points, stars, acc).pp.toFixed(2)}</div>

	<PPMatrix {curve} />
</div>
