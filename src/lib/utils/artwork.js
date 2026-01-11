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
  // 1. probaj MusicBrainz
  const coverArt = await getAlbumArtMusicBrainz(artist, track);

  if (coverArt) {
    return coverArt;
  }
  console.log('Trying iTunes');
  // 2. probaj Itunes
  const coverArtItunes = await getAlbumArtItunes(artist, track);

  if (coverArtItunes) {
    return coverArtItunes;
  }

  return null;
}

async function getArtistFanart(artist) {
  try {
    const url = `https://www.theaudiodb.com/api/v1/json/2/search.php?s=${encodeURIComponent(artist)}`;

    console.log('Fetching artist data from TheAudioDB');

    const response = await fetch(url);

    if (response.status === 404) {
      console.log('Artist not found');
      return null;
    }

    const data = await response.json();

    console.log('Fanart', data);

    if (data.artists && data.artists.length > 0) {
      const artistData = data.artists[0];
      return {
        fanart: artistData.strArtistFanart, // Landscape pozadina
        fanart2: artistData.strArtistFanart2,
        fanart3: artistData.strArtistFanart3,
        banner: artistData.strArtistBanner, // Wide banner
        logo: artistData.strArtistLogo,
        thumb: artistData.strArtistThumb,
        bio: artistData.strArtistBiographyEN,
        genre: artistData.strArtistGenre,
      };
    }

    console.log('No fanart found for this artist');

    return null;
  } catch (error) {
    console.error('Nema fanart za ovog artista', error.message);
    return null;
  }
}

export { getAlbumArt, getArtistFanart };
