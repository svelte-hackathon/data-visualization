import type { PageLoad } from './$types';
import { error } from '@sveltejs/kit'

export const load = (async ({ fetch }) => {
  try {
    const res = await fetch('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json');
    const world = await res.json();

    return { world };
  }
  catch (ex) {
    throw error(500, { message: 'Unexpected Server Error' })
  }
}) satisfies PageLoad;
