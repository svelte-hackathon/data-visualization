<script lang="ts">
  import {
    geoPath,
    geoOrthographic,
    geoCentroid,
    geoInterpolate,
    type GeoPermissibleObjects,
    type ExtendedFeatureCollection
  } from 'd3-geo';
  import { tween } from './tween';
  import { feature } from 'topojson-client';
  import { Versor } from './Versor';

  export let width = 720;
  export let tilt = 20;
  export let name = ''; //name of country
  export let world: TopoJSON.Topology;

  const sphere: GeoPermissibleObjects = { type: 'Sphere' };

  let land: GeoPermissibleObjects | null;
  let countryGraphic: GeoPermissibleObjects | null = null;
  let arc: GeoPermissibleObjects | null = null;
  let projection = geoOrthographic();
  let position1: [number, number] = [0, 0];
  let position2: [number, number] = [0, 0];
  let r1: [number, number, number] = [0, 0, 0];
  let r2: [number, number, number] = [0, 0, 0];
  let interpolatePosition: (t: number) => [number, number];
  let interpolateVersor: (t: number) => [number, number, number];
  let inAnimation: Promise<void> | null = null;
  let outAnimation: Promise<void> | null = null;

  function getHeight(width: number) {
    const [[x0, y0], [x1, y1]] = geoPath(projection.fitWidth(width, sphere)).bounds(sphere);
    const dy = Math.ceil(y1 - y0);
    const l = Math.min(Math.ceil(x1 - x0), dy);
    projection.scale((projection.scale() * (l - 1)) / l).precision(0.2);
    projection = projection;
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

  async function worldTour(countryName: string) {
    //see if an animation is currently running
    if (inAnimation) await inAnimation;
    if (outAnimation) await outAnimation;
    if (countryName != name) return; //Cancel old animations if people switch before it can complete

    const country = countries.find((country) => country?.properties?.name === countryName);

    if (!country) return;

    countryGraphic = country;

    (position1 = position2), (position2 = geoCentroid(countryGraphic));
    (r1 = r2), (r2 = [-position2[0], tilt - position2[1], 0]);

    interpolatePosition = geoInterpolate(position1, position2);
    interpolateVersor = Versor.interpolateAngles(r1, r2);

    inAnimation = tween.set(1);
    requestAnimationFrame(inAnimationFunc);
    await inAnimation;
    inAnimation = null;

    outAnimation = tween.set(0);
    interpolatePosition = geoInterpolate(position2, position1);
    requestAnimationFrame(outAnimationFunc);
    await outAnimation;
    outAnimation = null;
    arc = null;
  }

  const inAnimationFunc = () => {
    if (!inAnimation) return;
    projection.rotate(interpolateVersor($tween));
    projection = projection;
    arc = { type: 'LineString', coordinates: [position1, interpolatePosition($tween)] };
    requestAnimationFrame(inAnimationFunc);
  };

  const outAnimationFunc = () => {
    if (!outAnimation) return;
    arc = { type: 'LineString', coordinates: [interpolatePosition($tween), position2] };
    requestAnimationFrame(outAnimationFunc);
  };

  $: land = world ? feature(world, world.objects.land) : null;
  $: height = getHeight(width);
  $: countries = getCountries(world);
  $: worldTour(name);
  $: path = geoPath(projection);
</script>

<svg {width} {height} viewBox="0 0 {width} {height}">
  {#if land}
    <g>
      <path class="sphere" d={path(sphere)} stroke="#ccc" fill="white" />
      <path class="land" d={path(land)} stroke="none" fill="#ccc" />
      {#if countryGraphic}
        <path class="selected" d={path(countryGraphic)} fill="red" />
      {/if}
      {#if arc}
        <path class="arc" d={path(arc)} stroke="black" stroke-width="2" fill="none" />
      {/if}
    </g>
  {/if}
</svg>
