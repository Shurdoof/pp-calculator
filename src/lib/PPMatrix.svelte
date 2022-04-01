<script lang="ts">
	import { calculatePP } from '../pp/calculator';
	import { curves, type Curve } from '../pp/curves';
	type HoverState = { star: number; acc: number };
	type HighlightType = 'cell' | 'row/column' | 'none';

	function range(start: number, end: number) {
		return Array.from(new Array(end - start + 1), (x, i) => i + start);
	}

	export let curve: Curve = curves[0];

	export let minStars = 1;
	export let maxStars = 13;

	export let minAcc = 85;
	export let maxAcc = 100;

	let currentHover: HoverState | null = null;
</script>

<div>
	<table class="table table-compact pp-matrix">
		<thead>
			<tr>
				<th />
				{#each range(minStars, maxStars) as star}
					<th class:highlight={star === currentHover?.star}>{star} ★</th>
				{/each}
			</tr>
		</thead>
		<tbody>
			{#each range(minAcc, maxAcc) as acc}
				<tr>
					<th class:highlight={acc === currentHover?.acc}>
						{acc}%
					</th>
					{#each range(minStars, maxStars) as star}
						<td
							class:hover={star === currentHover?.star && acc === currentHover?.acc}
							class:highlight={star === currentHover?.star || acc === currentHover?.acc}
							on:mouseenter={e => (currentHover = { star, acc })}
							on:mouseleave={e => (currentHover = null)}>{calculatePP(curve.points, star, acc).pp.toFixed(2)}</td
						>
					{/each}
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<style>
	.pp-matrix {
		table-layout: fixed;
	}
	.pp-matrix td,
	.pp-matrix th {
		width: 70px;
		text-align: right;
	}
	.highlight {
		@apply bg-base-200;
	}

	th.highlight {
		@apply text-info;
	}

	.hover {
		@apply bg-base-300;
		@apply text-info;
	}
</style>
