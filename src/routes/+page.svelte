<script lang="ts">
  import BarChart from '$lib/charts/bar-chart.svelte';
  import type { BarChartBar } from '$lib/types/bar-chart';
  import borderskipCheck from '$lib/utils/border-skip-check';
  import { mapDataset } from '$lib/utils/map-dataset';
  import {
    Chart as ChartJS,
    LinearScale,
    BarController,
    CategoryScale,
    BarElement,
    Title,
    Legend,
    type ChartOptions,
    type ChartData,
    type ChartDataset,
  } from 'chart.js';
  ChartJS.register(BarController, LinearScale, CategoryScale, BarElement, Title, Legend);
  const ingestedData: Array<BarChartBar> = [
    {
      data: 65,
      label: 'Yellow Bar',
      backgroundColor: 'yellow',
      borderColor: 'green',
      borderWidth: 2,
      borderSkipped: borderskipCheck('top'),
      borderRadius: 5,
      inflateAmount: 5,
      hoverBackgroundColor: 'green',
      hoverBorderColor: 'yellow',
      hoverBorderWidth: 4,
      hoverBorderRadius: 10,
    },
    {
      data: 135,
      label: 'Blue Bar',
      backgroundColor: 'blue',
      borderColor: 'red',
      borderWidth: 2,
      borderSkipped: borderskipCheck('top'),
      borderRadius: 5,
      inflateAmount: 5,
      hoverBackgroundColor: 'red',
      hoverBorderColor: 'blue',
      hoverBorderWidth: 4,
      hoverBorderRadius: 10
    },
    {
      data: 175,
      label: 'Black Bar',
      backgroundColor: 'black',
      borderColor: 'white',
      borderWidth: 2,
      borderSkipped: borderskipCheck('top'),
      borderRadius: 5,
      inflateAmount: 5,
      hoverBackgroundColor: 'white',
      hoverBorderColor: 'black',
      hoverBorderWidth: 4,
      hoverBorderRadius: 10
    },
    {
      data: 100,
      label: 'White Bar',
      backgroundColor: 'white',
      borderColor: 'black',
      borderWidth: 2,
      borderSkipped: borderskipCheck('top'),
      borderRadius: 5,
      inflateAmount: 5,
      hoverBackgroundColor: 'black',
      hoverBorderColor: 'white',
      hoverBorderWidth: 4,
      hoverBorderRadius: 10
    },
    {
      data: 200,
      label: 'Pink Bar',
      backgroundColor: 'pink',
      borderColor: 'purple',
      borderWidth: 2,
      borderSkipped: borderskipCheck('top'),
      borderRadius: 5,
      inflateAmount: 5,
      hoverBackgroundColor: 'purple',
      hoverBorderColor: 'pink',
      hoverBorderWidth: 4,
      hoverBorderRadius: 10,
    }
  ];

  const { labels, outputObject } = mapDataset({ initialData: ingestedData, setLabel: 'My First Dataset'})
  const data: ChartData<"bar"> = {
    labels,
    // @todo determine if there is a better way to handle this conversion, likely some sort of assertion function etc.
    datasets: [<unknown> outputObject as ChartDataset<"bar">],
  };

  const options: ChartOptions<"bar"> = {
    scales: {
      y: {
        beginAtZero: true
      }
    },
    plugins: {
      title: {
        display: true,
        text: 'Clever Title'
      },
      legend: {
        display: true
      }
    }
  };
</script>

<BarChart {data} {options} chartID="bar-chart-1" />
