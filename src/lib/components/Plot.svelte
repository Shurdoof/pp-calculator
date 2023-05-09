<script lang="ts">
    import { calculatePP } from '$lib/pp/calculator';
    import type { Curve } from '$lib/pp/curves';
    import { generateRangeArray } from '$lib/utils/numbers';
    import Chart, { Tooltip, type ChartType, type TooltipPositionerFunction } from 'chart.js/auto';

    export let curves: Curve[];
    export let selectedCurve: Curve;
    let container: HTMLCanvasElement;

    function generateRangeArrayWithoutLast(start: number, end: number, step: number = 1) {
        return generateRangeArray(start, end, step).slice(0, -1);
    }

    const accPoints = [
        ...generateRangeArrayWithoutLast(0, 60, 10),
        ...generateRangeArrayWithoutLast(60, 80, 5),
        ...generateRangeArrayWithoutLast(80, 90, 1),
        ...generateRangeArrayWithoutLast(90, 95, 0.5),
        ...generateRangeArrayWithoutLast(95, 98, 0.25),
        ...generateRangeArray(98, 100.001, 0.1)
    ];

    function generateData(curve: Curve) {
        return accPoints.map(x => calculatePP(curve, x, 1, 1));
    }

    let chart: Chart | null = null;

    // const customPositioner: TooltipPositionerFunction<ChartType> = function (elements, eventPosition) {
    //     const tooltip = this;

    //     return {
    //         yAlign: 'bottom',
    //         xAlign: 'center',
    //         x: eventPosition.x,
    //         y: 0
    //     };
    // };
    // (Tooltip.positioners as any).mouse = customPositioner;

    $: {
        if (chart) {
            chart.destroy();
        }

        if (container) {
            // const rawDataSets = curves.map(x => generateData(x));
            chart = new Chart(container, {
                type: 'line',
                data: {
                    labels: accPoints.map(x => x.toFixed(2) + '%'),
                    datasets: curves.map(curve => ({
                        label: curve.name,
                        data: generateData(curve).map(x => x.pp),
                        // pointStyle: false,
                        pointRadius: 2,
                        hidden: selectedCurve !== curve
                    }))
                },
                options: {
                    interaction: {
                        intersect: false,
                        mode: 'index'
                    },
                    elements: {
                        line: {
                            tension: 0
                        }
                    },
                    plugins: {
                        // tooltip: {
                        //     position: 'mouse' as any
                        // },
                        legend: {
                            display: curves.length > 0
                        }
                    }
                }
            });
        }
    }
</script>

<canvas bind:this={container} />
