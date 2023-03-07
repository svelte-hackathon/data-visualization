<script lang="ts">
  import { onMount, afterUpdate, onDestroy } from 'svelte';
  import { Chart as ChartJS } from 'chart.js';
  import type {
    ChartTypeRegistry,
    ChartData,
    ChartOptions,
    ChartItem,
    ChartConfiguration
  } from 'chart.js';

  export let type: keyof ChartTypeRegistry,
    data: ChartData,
    options: ChartOptions,
    chartID: ChartItem;

  let ref: HTMLCanvasElement;
  let chart: ChartJS | null;
  const config: ChartConfiguration = {
    type,
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
