# Music Scraper Utility

A utility for fetching music metadata including artist images, album covers, and additional information from various APIs.

## Features

- 🎵 Artist information (images, bio, tags, similar artists)
- 💿 Album information (covers, track lists, release dates)
- 🔄 Smart fallback system (Last.fm → iTunes)
- 💾 Built-in caching (5-minute TTL)
- 🚀 Easy integration with Svelte 5

## Setup

### 1. Get API Keys

**Last.fm API (Recommended)**
- Visit: https://www.last.fm/api/account/create
- Free tier: 5,000 requests per hour
- Best for: Artist images, album covers, detailed metadata

**AudioDB (Optional)**
- Visit: https://www.theaudiodb.com/api_apply.php
- Free tier: 1,000 requests per month
- Best for: High-quality images

### 2. Configure Environment Variables

Create a `.env` file in your project root:

```env
VITE_LASTFM_API_KEY=your_actual_api_key_here
VITE_AUDIODB_API_KEY=your_audiodb_key_here
```

### 3. Import and Use

```javascript
import { getNowPlayingInfo, getArtistInfo, getAlbumInfo } from '$lib/utils/musicScraper.js';

// Get combined artist and album info for current track
const metadata = await getNowPlayingInfo('Radiohead', 'Creep');

// Get only artist info
const artistInfo = await getArtistInfo('Radiohead');

// Get only album info
const albumInfo = await getAlbumInfo('Radiohead', 'OK Computer');
```

## API Reference

### `getNowPlayingInfo(artistName, trackTitle)`

Fetches combined artist and album information for a track.

**Parameters:**
- `artistName` (string): Name of the artist
- `trackTitle` (string): Title of the track

**Returns:** Promise resolving to:
```javascript
{
  artist: {
    name: "Artist Name",
    bio: "Artist biography...",
    images: {
      small: "url",
      medium: "url", 
      large: "url",
      extralarge: "url"
    },
    tags: ["rock", "alternative"],
    similar: ["Similar Artist 1", "Similar Artist 2"],
    source: "lastfm"
  },
  album: {
    name: "Album Name",
    artist: "Artist Name",
    images: { /* same structure */ },
    tracks: [{ name: "Track 1", duration: "240" }],
    releaseDate: "2023-01-01",
    source: "lastfm"
  },
  track: "Track Title"
}
```

### `getArtistInfo(artistName)`

Fetches detailed artist information.

### `getAlbumInfo(artistName, albumName)`

Fetches detailed album information.

### `getBestImageUrl(images, preferredSize)`

Helper to get the best available image URL.

**Parameters:**
- `images` (object): Images object from API response
- `preferredSize` (string): 'small', 'medium', 'large', or 'extralarge'

**Returns:** Best available image URL (string)

## Usage in Svelte 5 Components

### Basic Integration

```svelte
<script>
  import { getNowPlayingInfo } from '$lib/utils/musicScraper.js';

  let nowPlaying = $state({ artist: '', title: '' });
  let musicMetadata = $state({ artist: null, album: null });

  $effect(() => {
    const fetchData = async () => {
      if (nowPlaying.artist) {
        const metadata = await getNowPlayingInfo(nowPlaying.artist, nowPlaying.title);
        musicMetadata = metadata;
      }
    };

    fetchData();
  });
</script>
```

### With Caching (Recommended)

```javascript
import { getArtistInfoCached, getAlbumInfoCached } from '$lib/utils/musicScraper.js';

// These functions include 5-minute caching
const artistInfo = await getArtistInfoCached('Radiohead');
const albumInfo = await getAlbumInfoCached('Radiohead', 'OK Computer');
```

### Periodic Updates (Radio Stream)

```svelte
<script>
  import { getNowPlayingInfo } from '$lib/utils/musicScraper.js';

  let nowPlaying = $state({ artist: '', title: '' });
  let musicMetadata = $state({ artist: null, album: null });

  $effect(() => {
    const fetchNowPlaying = async () => {
      // Your radio API call here
      const radioData = await fetch('/api/now-playing').then(r => r.json());
      nowPlaying = { artist: radioData.artist, title: radioData.title };

      // Fetch metadata if we have artist info
      if (radioData.artist && radioData.artist !== 'Radio Station') {
        const metadata = await getNowPlayingInfo(radioData.artist, radioData.title);
        musicMetadata = metadata;
      }
    };

    fetchNowPlaying(); // Initial fetch
    const interval = setInterval(fetchNowPlaying, 5000); // Every 5 seconds

    return () => clearInterval(interval);
  });
</script>
```

## Error Handling

The utility includes built-in error handling:

- API failures fall back to the next available source
- Network errors are logged but don't break your app
- Invalid responses return `null`

```javascript
const metadata = await getNowPlayingInfo('Artist', 'Song');
if (metadata.artist) {
  // Use the data
} else {
  // Show fallback UI
}
```

## Image Fallback Example

```svelte
<script>
  import { getBestImageUrl } from '$lib/utils/musicScraper.js';

  let musicMetadata = $state({ artist: null });
  
  const artistImage = $derived(() => {
    return musicMetadata.artist 
      ? getBestImageUrl(musicMetadata.artist.images, 'large') 
      : '/fallback-artist.jpg';
  });
</script>

<img 
  src={artistImage} 
  alt="Artist"
  on:error={(e) => { e.target.src = '/fallback-artist.jpg'; }}
/>
```

## Performance Tips

1. **Use caching functions** for repeated requests
2. **Batch requests** when possible
3. **Set reasonable intervals** (5+ seconds for live data)
4. **Handle loading states** in your UI
5. **Implement image lazy loading** for better performance

## API Limitations

| Service | Free Limit | Rate Limit |
|---------|------------|------------|
| Last.fm | 5,000/hour | ~1.4 req/sec |
| iTunes  | Unlimited  | Reasonable use |
| AudioDB | 1,000/month| No official limit |

## Troubleshooting

**No metadata returned:**
- Check your API keys in `.env`
- Verify artist/song names are correct
- Check browser console for error messages

**Images not loading:**
- Some APIs return placeholder URLs
- Always implement fallback images
- Consider image proxy for CORS issues

**Rate limiting:**
- Implement exponential backoff
- Cache results appropriately
- Consider upgrading to paid tiers