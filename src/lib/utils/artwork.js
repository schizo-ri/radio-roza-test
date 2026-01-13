// Simple in-memory caches to avoid repeated API calls
const artworkCache = new Map();
const fanartCache = new Map();

async function getAlbumArtItunes(artist, track) {
  const query = `${artist} ${track}`;
  const url = `https://itunes.apple.com/search?term=${encodeURIComponent(query)}&entity=song&limit=1`;

  const response = await fetch(url);
  const data = await response.json();

  if (data.results && data.results.length > 0) {
    const artwork = data.results[0].artworkUrl100;
    return {
      thumbnail: artwork, // 100x100
      medium: artwork.replace('100x100bb', '300x300bb'), // 300x300
      large: artwork.replace('100x100bb', '600x600bb'), // 600x600
    };
  }
  return null;
}

async function searchMusicBrainz(artist, track) {
  const query = `artist:"${artist}" AND recording:"${track}"`;
  const url = `https://musicbrainz.org/ws/2/recording/?query=${encodeURIComponent(query)}&fmt=json&limit=1`;

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'RadioRoza/1.0 (radio-rozari@gmail.com)',
      },
    });

    if (response.status === 404) {
      console.log('MusicBrainz not found');
      return null;
    }

    const data = await response.json();

    if (data.recordings && data.recordings.length > 0) {
      const recording = data.recordings[0];
      // Dohvati prvi release (album) iz snimke
      if (recording.releases && recording.releases.length > 0) {
        return recording.releases[0].id; // Ovo je MBID
      }
    }

    return null;
  } catch (error) {
    console.error('Error searching MusicBrainz:', error);
    return null;
  }
}

async function getCoverArt(mbid) {
  const url = `https://coverartarchive.org/release/${mbid}`;

  try {
    const response = await fetch(url);

    if (response.status === 404) {
      console.log('CoverArt not found');
      return null;
    }

    const data = await response.json();
    // Dohvati front cover
    const frontCover = data.images.find((img) => img.front === true);

    return {
      thumbnail: frontCover.thumbnails.small, // 250px
      medium: frontCover.thumbnails.large, // 500px (renamed for consistency)
      large: frontCover.image, // Full size (original as large)
    };
  } catch (error) {
    console.error('Nema cover art za ovaj release', error.message);
    return null;
  }
}

async function getAlbumArtMusicBrainz(artist, track) {
  // Korak 1: Pronađi MBID
  const mbid = await searchMusicBrainz(artist, track);

  if (!mbid) {
    console.log('Nije pronađen u MusicBrainz');
    return null;
  }

  // Korak 2: Dohvati slike
  const coverArt = await getCoverArt(mbid);
  return coverArt;
}

async function getAlbumArt(artist, track) {
  const cacheKey = `${artist}|${track}`.toLowerCase();

  // Check cache first
  if (artworkCache.has(cacheKey)) {
    return artworkCache.get(cacheKey);
  }

  // 1. probaj MusicBrainz
  const coverArt = await getAlbumArtMusicBrainz(artist, track);

  if (coverArt) {
    artworkCache.set(cacheKey, coverArt);
    return coverArt;
  }

  console.log('Trying iTunes');
  // 2. probaj Itunes
  const coverArtItunes = await getAlbumArtItunes(artist, track);

  if (coverArtItunes) {
    artworkCache.set(cacheKey, coverArtItunes);
    return coverArtItunes;
  }

  // Cache null results too to avoid repeated failed lookups
  artworkCache.set(cacheKey, null);
  return null;
}

async function getArtistFanart(artist) {
  const cacheKey = artist.toLowerCase();

  // Check cache first
  if (fanartCache.has(cacheKey)) {
    return fanartCache.get(cacheKey);
  }

  try {
    const url = `https://www.theaudiodb.com/api/v1/json/2/search.php?s=${encodeURIComponent(artist)}`;

    const response = await fetch(url);

    if (response.status === 404) {
      fanartCache.set(cacheKey, null);
      return null;
    }

    const data = await response.json();

    if (data.artists && data.artists.length > 0) {
      const artistData = data.artists[0];
      const result = {
        fanart: artistData.strArtistFanart, // Landscape pozadina
        fanart2: artistData.strArtistFanart2,
        fanart3: artistData.strArtistFanart3,
        banner: artistData.strArtistBanner, // Wide banner
        logo: artistData.strArtistLogo,
        thumb: artistData.strArtistThumb,
        bio: artistData.strArtistBiographyEN,
        genre: artistData.strArtistGenre,
      };
      fanartCache.set(cacheKey, result);
      return result;
    }

    // Cache null results too
    fanartCache.set(cacheKey, null);
    return null;
  } catch (error) {
    console.error('Nema fanart za ovog artista', error.message);
    fanartCache.set(cacheKey, null);
    return null;
  }
}

export { getAlbumArt, getArtistFanart };
