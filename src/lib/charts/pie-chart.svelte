<script lang="ts">
  import type { ChartData, ChartOptions, ChartItem } from 'chart.js';
  import Chart from './chart.svelte';
  export let data: ChartData<'pie'>,
    options: ChartOptions<'pie'>,
    chartID: ChartItem;
</script>

<Chart type="pie" {data} {options} {chartID} />
