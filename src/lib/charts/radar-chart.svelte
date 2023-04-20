<script lang="ts">
  import type { ChartData, ChartOptions, ChartItem } from 'chart.js';
  import Chart from './chart.svelte';
  export let data: ChartData<'radar'>,
    options: ChartOptions<'radar'>,
    chartID: ChartItem;
</script>

<Chart type="radar" {data} {options} {chartID} />
