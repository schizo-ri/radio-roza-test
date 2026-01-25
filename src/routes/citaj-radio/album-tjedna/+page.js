import { getAlbumsOfTheWeek } from '$lib/data/articles.js';

export function load() {
  const albums = getAlbumsOfTheWeek();

  return {
    albums,
  };
}
