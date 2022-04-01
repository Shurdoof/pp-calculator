<script lang="ts">
	import { calculatePP } from '../pp/calculator';
	import { curves, type Curve } from '../pp/curves';

	function range(start: number, end: number) {
		return Array.from(new Array(end - start + 1), (x, i) => i + start);
	}

	export let curve: Curve = curves[0];

	export let minStars = 1;
	export let maxStars = 13;

	export let minAcc = 85;
	export let maxAcc = 100;
</script>

<div>
	<table>
		<thead>
			<tr>
				<th />
				{#each range(minStars, maxStars) as star}
					<th>{star}★</th>
				{/each}
			</tr>
		</thead>
		<tbody>
			{#each range(minAcc, maxAcc) as acc}
				<tr>
					<th>
						{acc}%
					</th>
					{#each range(minStars, maxStars) as star}
						<td>{calculatePP(curve.points, star, acc).pp.toFixed(2)}</td>
					{/each}
				</tr>
			{/each}
		</tbody>
	</table>
</div>
