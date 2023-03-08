<script lang="ts">
  import Projection from '$lib/Projection/Projection.svelte';
  import { feature } from 'topojson-client';
  import type { PageData } from './$types';

  export let data: PageData;
  export let width = 720;
  export let name = '';

  $:countries = feature(data.world, data.world.objects.countries).features;
</script>

{#if data.world}
<Projection {width} {name} world={data.world}/>
{/if}

<input type="number" bind:value={width} />

<select bind:value={name}>
    {#each countries as country }
    {@const countryName = country.properties?.name}
        <option value={countryName}>{countryName}</option>
    {/each}
</select>