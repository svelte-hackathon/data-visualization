<script lang="ts">
  import type { ChartData, ChartOptions, ChartItem } from 'chart.js';
  import Chart from './chart.svelte';
  export let data: ChartData<'polarArea'>,
    options: ChartOptions<'polarArea'>,
    chartID: ChartItem;
</script>

<Chart type="polarArea" {data} {options} {chartID} />
