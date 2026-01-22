import { error } from '@sveltejs/kit';
import { getAlbumBySlug, getAlbumsOfTheWeek } from '$lib/data/mock/album-of-the-week.js';

export function load({ params }) {
  const album = getAlbumBySlug(params.slug);

  if (!album) {
    throw error(404, {
      message: 'Album not found',
      details: `The album with slug "${params.slug}" could not be found.`,
    });
  }

  // Get other albums for "more albums" section, excluding current
  const otherAlbums = getAlbumsOfTheWeek({ limit: 4 }).filter((a) => a.id !== album.id).slice(0, 3);

  return {
    album,
    otherAlbums,
  };
}
