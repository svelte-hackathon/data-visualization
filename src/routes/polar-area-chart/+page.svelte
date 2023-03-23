<script lang="ts">
  import PolarAreaChart from '$lib/charts/polar-area-chart.svelte';
  import {
    Chart as ChartJS,
    PolarAreaController,
    ArcElement,
    RadialLinearScale,
    Title,
    Legend,
    Filler,
    type ChartData,
    type ChartOptions,
  } from 'chart.js';
  ChartJS.register(
    PolarAreaController,
    ArcElement,
    RadialLinearScale,
    Filler,
    Title,
    Legend
  );

  const data: ChartData<'polarArea'> = {
    labels: ['Yellow Slice', 'Green Slice', 'Red Slice'],
    datasets: [
      {
        data: [404, 301, 200],
        label: 'Polar Area Chart Number One',
        backgroundColor: ['yellow', 'green', 'red']
      }
    ]
  };

  const options: ChartOptions<'polarArea'> = {
    animation: {
      animateRotate: false,
    },
  }

</script>

<PolarAreaChart {data} {options} chartID="pie-chart-1" />
