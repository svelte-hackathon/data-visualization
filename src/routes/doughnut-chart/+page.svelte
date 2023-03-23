<script lang="ts">
    import DoughnutChart from '$lib/charts/doughnut-chart.svelte';
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

    const data: ChartData<'doughnut'> = {
      labels: ['Yellow Slice', 'Green Slice', 'Red Slice'],
      datasets: [
        {
          data: [404, 301, 200],
          label: 'Mmmmm Pie',
          backgroundColor: ['yellow', 'green', 'red']
        }
      ]
    };

    const options: ChartOptions<'doughnut'> = {
      radius: "50%"
    }
  </script>

  <DoughnutChart {data} {options} chartID="doughnut-chart-1" />
