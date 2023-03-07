<script lang="ts">
  import type { ChartData, ChartOptions, ChartItem } from 'chart.js';
  import Chart from './chart.svelte';
  export let data: ChartData<'bar'>, options: ChartOptions<'bar'>, chartID: ChartItem;
</script>

<Chart type="bar" {data} {options} {chartID} />
