<script lang="ts">
  import RadarChart from '$lib/charts/radar-chart.svelte';
  import {
    Chart as ChartJS,
    RadarController,
    LineElement,
    PointElement,
    RadialLinearScale,
    Title,
    Legend,
    Filler,
    type ChartData,
    type ChartOptions,
  } from 'chart.js';
  ChartJS.register(
    RadarController,
    LineElement,
    PointElement,
    RadialLinearScale,
    Filler,
    Title,
    Legend
  );

  const data: ChartData<'radar'> = {
    labels: ['Increasing Y', 'Increasing X', 'Decreasing X'],
    datasets: [
      {
        data: [404, 301, 200],
        label: 'Scanning For Dataset 1...',
        backgroundColor: 'yellow'
      },
      {
        data: [301, 200, 404],
        label: 'Scanning For Dataset 2...',
        backgroundColor: 'green'
      },
      {
        data: [200, 404, 301],
        label: 'Scanning For Dataset 3...',
        backgroundColor: 'red'
      }
    ]
  };

  const options: ChartOptions<'radar'> = {};

</script>

<RadarChart {data} {options} chartID="radar-chart-1" />
