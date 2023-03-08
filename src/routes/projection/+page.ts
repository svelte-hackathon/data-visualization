import type { PageLoad } from './$types';
 
export const load = (async ({ fetch }) => {

  const res = await fetch("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json")
  const world = await res.json();

  return {world}
}) satisfies PageLoad;
