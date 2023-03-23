<script lang="ts">
  import type { ChartData, ChartOptions, ChartItem } from 'chart.js';
  import Chart from './chart.svelte';
  export let data: ChartData<'doughnut'>,
    options: ChartOptions<'doughnut'>,
    chartID: ChartItem;
</script>

<Chart type="doughnut" {data} {options} {chartID} />
