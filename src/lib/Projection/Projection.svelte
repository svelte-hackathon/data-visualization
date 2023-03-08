<script lang="ts">
  import {
    geoPath,
    geoOrthographic,
    type GeoPermissibleObjects,
    type ExtendedFeatureCollection,
    geoCentroid,
    geoInterpolate
  } from 'd3-geo';
  import { tweened } from 'svelte/motion';
  import { afterUpdate } from 'svelte';
  import { feature } from 'topojson-client';
  import { Versor } from './Versor';

  export let width = 720;
  export let tilt = 20;

  export let name = ''; //name of country

  export let world: TopoJSON.Topology;

  let land: GeoPermissibleObjects | null;
  let countryGraphic: GeoPermissibleObjects | null = null;
  let ref: HTMLCanvasElement;
  let projection = geoOrthographic();
  let arcCompleted = false;

  const sphere: GeoPermissibleObjects = { type: 'Sphere' };

  function render(land: GeoPermissibleObjects | null, ref: HTMLCanvasElement) {
    if (!ref) {
      return;
    }

    const context = ref.getContext('2d');

    if (!context) {
      console.error('NO Context');
      return;
    }

    if (!land) {
      console.error('NO LAND');
      return;
    }

    const path = geoPath(projection, context);

    context.clearRect(0, 0, width, height);

    context.beginPath(), path(sphere), (context.fillStyle = '#fff'), context.fill();

    context.beginPath(), path(land), (context.fillStyle = '#000'), context.fill();

    context.beginPath(), path(sphere), context.stroke();

    if (countryGraphic) {
      context.beginPath(), path(countryGraphic), (context.fillStyle = '#f00'), context.fill();
    }
    if (arc) {
      context.beginPath(), path(arc), context.stroke();
    }
  }

  function getHeight(width: number) {
    const [[x0, y0], [x1, y1]] = geoPath(projection.fitWidth(width, sphere)).bounds(sphere);
    const dy = Math.ceil(y1 - y0);
    const l = Math.min(Math.ceil(x1 - x0), dy);
    projection.scale((projection.scale() * (l - 1)) / l).precision(0.2);
    return dy;
  }

  function getCountries(world: TopoJSON.Topology) {
    if (!world) return [];

    const collection = feature(world, world.objects.countries) as ExtendedFeatureCollection;

    if (collection.features) {
      return collection.features;
    }

    return [];
  }

  let p1:[number, number], p2: [number, number] = [0, 0], r1, r2 = [0, 0, 0];
  let ip = () => [];
  let iv = () => [];
  function worldTour(countryName: string) {
    const country = countries.find((country) => country?.properties?.name === countryName);

    if (!country) return;

    countryGraphic = country;
    arcCompleted = false;

    p1 = p2, p2 = geoCentroid(countryGraphic);
    r1 = r2, r2 = [-p2[0], tilt - p2[1], 0];

    ip = geoInterpolate(p1, p2);
    iv = Versor.interpolateAngles(r1, r2);
    $t = 1;
  }

  const t = tweened(0, {
    duration: 1250
  });

  $: land = world ? feature(world, world.objects.land) : null;
  $: height = getHeight(width);
  $: countries = getCountries(world);
  $: worldTour(name);

  $: projection.rotate(arcCompleted ? iv(1) as [number, number, number] : iv($t) as [number, number, number]);
  $: arc = { type: 'LineString', coordinates: [p1, ip($t)] };

  $: if($t === 1) {
    arcCompleted = true;
    $t = 0;
  }
 
  afterUpdate(() => {
    render(land, ref);
  });
</script>

<canvas {width} {height} bind:this={ref} />

