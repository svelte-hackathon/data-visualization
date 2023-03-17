<script lang="ts">
  import LineChart from '$lib/charts/line-chart.svelte';
  import {
    Chart as ChartJS,
    LinearScale,
    LineController,
    CategoryScale,
    LineElement,
    PointElement,
    Title,
    Legend,
    Filler,
    type ChartOptions,
    type ChartData,
    type ScriptableLineSegmentContext
  } from 'chart.js';
  ChartJS.register(
    LineController,
    LinearScale,
    CategoryScale,
    LineElement,
    PointElement,
    Filler,
    Title,
    Legend
  );

  function headingUp(context: ScriptableLineSegmentContext, value: string): string | undefined {
    return context.p0.parsed.y < context.p1.parsed.y ? value : undefined;
  }
  function headingDown(context: ScriptableLineSegmentContext, value: string): string | undefined {
    return context.p0.parsed.y > context.p1.parsed.y ? value : undefined;
  }
  const data: ChartData<'line'> = {
    labels: ['Point 1', 'Point 2', 'Point 3', 'Point 4', 'Point 5'],
    datasets: [
      {
        data: [404, 301, 200, 256, 110],
        label: 'Black Line',
        backgroundColor: 'yellow',
        borderColor: 'black',
        borderWidth: 2,
        hoverBackgroundColor: 'white',
        fill: true,
        segment: {
          borderColor: (context) =>
            headingUp(context, 'rgb(0,0,0,0.2)') || headingDown(context, 'rgb(192,75,75)')
        }
      }
    ]
  };

  const options: ChartOptions<'line'> = {
    indexAxis: 'x',
    scales: {
      y: {
        beginAtZero: true
      }
    },
    plugins: {
      title: {
        display: true,
        text: 'Cleverer Title'
      },
      legend: {
        display: true
      }
    }
  };
</script>

<LineChart {data} {options} chartID="line-chart-1" />
