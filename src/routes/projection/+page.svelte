<script lang="ts">
  import './page.css';
  import Projection from '$lib/Projection/Projection.svelte';
  import { feature } from 'topojson-client';
  import type { PageData } from './$types';

  export let data: PageData;
  export let width = 720;
  export let duration = 1500;
  export let name = '';

  //@ts-ignore the types package for this is wrong
  $: countries = feature(data.world, data.world.objects.countries).features;
</script>

<Projection {width} {name} {duration} world={data.world} />
<label>
  width:
  <input type="number" bind:value={width} />
</label>
<label>
  duration:
  <input type="number" bind:value={duration} />
</label>
<label>
  country:
<select bind:value={name}>
  <option value="" selected disabled>Select a country</option>
  {#each countries as country}
    {@const countryName = country.properties?.name}
    <option value={countryName}>{countryName}</option>
  {/each}
</select>
</label>
<style>
  label {
    color: white
  }
</style>