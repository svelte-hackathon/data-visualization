<script lang="ts">
  import type { ChartData, ChartOptions, ChartItem } from 'chart.js';
  import Chart from './chart.svelte';
  export let data: ChartData<'line'>,
    options: ChartOptions<'line'>,
    chartID: ChartItem;
</script>

<Chart type="line" {data} {options} {chartID} />
