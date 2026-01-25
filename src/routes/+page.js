import { getCurrentAlbumOfTheWeek } from '$lib/data/articles.js';

export async function load({ fetch }) {
  const url = `https://api.mixcloud.com/${encodeURIComponent('RadioRoža')}/cloudcasts/?limit=12`;

  let mixcloudData = null;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed with status ${response.status}`);
    }

    mixcloudData = await response.json();
  } catch (error) {
    console.error('Error with URL:', url, error);
  }

  const albumOfTheWeek = getCurrentAlbumOfTheWeek();

  return {
    mixcloudData,
    albumOfTheWeek,
    error: mixcloudData ? null : 'Failed to load data from any URL variant',
  };
}
