/** @type {import('./$types').PageLoad} */
export async function load({ fetch }) {
  // Try multiple URL encoding approaches
  const urls = [
    'https://api.mixcloud.com/RadioRo%C5%BEa/cloudcasts/?limit=8', // Pre-encoded
    `https://api.mixcloud.com/${encodeURIComponent('RadioRoža')}/cloudcasts/?limit=8`, // JS encoded
    'https://api.mixcloud.com/RadioRoza/cloudcasts/?limit=8', // ASCII fallback
  ];

  for (const url of urls) {
    try {
      console.log('Trying URL:', url);

      const response = await fetch(url);

      console.log('Response status:', response.status);
      console.log('Response ok:', response.ok);

      if (!response.ok) {
        console.log(`Failed with status ${response.status}, trying next URL...`);
        continue;
      }

      const data = await response.json();

      console.log('Data received:', data);
      console.log('Number of items:', data?.data?.length || 0);

      return {
        mixcloudData: data,
      };
    } catch (error) {
      console.error('Error with URL:', url, error);
      // Continue to next URL
    }
  }

  // If all URLs failed
  console.error('All URLs failed');
  return {
    mixcloudData: null,
    error: 'Failed to load data from any URL variant',
  };
}
