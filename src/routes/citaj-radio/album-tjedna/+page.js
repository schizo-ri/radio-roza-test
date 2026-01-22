import { getAlbumsOfTheWeek } from '$lib/data/mock/album-of-the-week.js';

export function load() {
  const albums = getAlbumsOfTheWeek();

  return {
    albums,
  };
}
