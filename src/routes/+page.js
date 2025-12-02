export async function load({ fetch }) {
  const url = `https://api.mixcloud.com/${encodeURIComponent('RadioRoža')}/cloudcasts/?limit=12`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed with status ${response.status}`);
    }

    const data = await response.json();

    return {
      mixcloudData: data,
    };
  } catch (error) {
    console.error('Error with URL:', url, error);
  }

  return {
    mixcloudData: null,
    error: 'Failed to load data from any URL variant',
  };
}
