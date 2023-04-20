<script lang="ts">
  import PieChart from '$lib/charts/pie-chart.svelte';
  import {
    Chart as ChartJS,
    PieController,
    ArcElement,
    Title,
    Legend,
    Filler,
    type ChartData,
    type ChartOptions,
  } from 'chart.js';
  ChartJS.register(
    PieController,
    ArcElement,
    Filler,
    Title,
    Legend
  );

  const data: ChartData<'pie'> = {
    labels: ['Yellow Slice', 'Green Slice', 'Red Slice'],
    datasets: [
      {
        data: [404, 301, 200],
        label: 'Mmmmm Pie',
        backgroundColor: ['yellow', 'green', 'red']
      }
    ]
  };

  const options: ChartOptions<'pie'> = {
    radius: "50%"
  }
</script>

<PieChart {data} {options} chartID="pie-chart-1" />
