<script lang="ts">
  import { onMount, afterUpdate, onDestroy } from 'svelte';
  import { Chart as ChartJS } from 'chart.js';
  import type {
    ChartData,
    ChartOptions,
    ChartItem,
    ChartConfiguration
  } from 'chart.js';

  export let data: ChartData<'doughnut'>,
    options: ChartOptions<'doughnut'>,
    chartID: ChartItem;

  let ref: HTMLCanvasElement;
  let chart: ChartJS<'doughnut'> | null;
  const config: ChartConfiguration<'doughnut'> = {
    type: 'doughnut',
    data,
    options
  };
  const id = String(chartID);
  onMount(() => {
    chart = new ChartJS(ref, config);
  });
  afterUpdate(() => {
    if (!chart) return;
    chart.data = data;
    Object.assign(chart.options, options);
  });
  onDestroy(() => {
    if (chart) chart.destroy();
    chart = null;
  });
</script>

<canvas bind:this={ref} {id} />
