/**
 * Music metadata scraper utility
 * Fetches artist images, album covers, and metadata from various APIs
 */

import { API_CONFIG, getLastfmApiKey } from './config.js';

/**
 * Fetches artist information including images and bio
 * @param {string} artistName - Name of the artist
 * @returns {Promise<Object|null>} Artist data or null if not found
 */
export async function getArtistInfo(artistName) {
  if (!artistName) return null;

  try {
    // Try Last.fm first (requires API key)
    const lastfmApiKey = getLastfmApiKey();
    if (lastfmApiKey) {
      const lastfmData = await fetchFromLastfm('artist.getinfo', {
        artist: artistName,
        autocorrect: 1
      });

      if (lastfmData?.artist) {
        const artist = lastfmData.artist;
        return {
          name: artist.name,
          bio: artist.bio?.summary || '',
          images: {
            small: artist.image?.find(img => img.size === 'small')?.['#text'] || '',
            medium: artist.image?.find(img => img.size === 'medium')?.['#text'] || '',
            large: artist.image?.find(img => img.size === 'large')?.['#text'] || '',
            extralarge: artist.image?.find(img => img.size === 'extralarge')?.['#text'] || ''
          },
          tags: artist.tags?.tag?.map(tag => tag.name) || [],
          similar: artist.similar?.artist?.map(a => a.name) || [],
          source: 'lastfm'
        };
      }
    }

    // Fallback to iTunes (no API key needed)
    const itunesData = await fetchFromItunes(artistName, 'musicArtist');
    if (itunesData?.results?.[0]) {
      const artist = itunesData.results[0];
      return {
        name: artist.artistName,
        bio: '',
        images: {
          small: artist.artworkUrl60 || '',
          medium: artist.artworkUrl100 || '',
          large: artist.artworkUrl100?.replace('100x100', '300x300') || '',
          extralarge: artist.artworkUrl100?.replace('100x100', '600x600') || ''
        },
        tags: [],
        similar: [],
        source: 'itunes'
      };
    }

    return null;
  } catch (error) {
    console.error('Error fetching artist info:', error);
    return null;
  }
}

/**
 * Fetches album information including cover art
 * @param {string} artistName - Name of the artist
 * @param {string} albumName - Name of the album
 * @returns {Promise<Object|null>} Album data or null if not found
 */
export async function getAlbumInfo(artistName, albumName) {
  if (!artistName || !albumName) return null;

  try {
    // Try Last.fm first
    const lastfmApiKey = getLastfmApiKey();
    if (lastfmApiKey) {
      const lastfmData = await fetchFromLastfm('album.getinfo', {
        artist: artistName,
        album: albumName,
        autocorrect: 1
      });

      if (lastfmData?.album) {
        const album = lastfmData.album;
        return {
          name: album.name,
          artist: album.artist,
          images: {
            small: album.image?.find(img => img.size === 'small')?.['#text'] || '',
            medium: album.image?.find(img => img.size === 'medium')?.['#text'] || '',
            large: album.image?.find(img => img.size === 'large')?.['#text'] || '',
            extralarge: album.image?.find(img => img.size === 'extralarge')?.['#text'] || ''
          },
          tracks: album.tracks?.track?.map(track => ({
            name: track.name,
            duration: track.duration
          })) || [],
          tags: album.tags?.tag?.map(tag => tag.name) || [],
          releaseDate: album.wiki?.published || '',
          source: 'lastfm'
        };
      }
    }

    // Fallback to iTunes
    const searchQuery = `${artistName} ${albumName}`;
    const itunesData = await fetchFromItunes(searchQuery, 'album');

    if (itunesData?.results?.[0]) {
      const album = itunesData.results[0];
      return {
        name: album.collectionName,
        artist: album.artistName,
        images: {
          small: album.artworkUrl60 || '',
          medium: album.artworkUrl100 || '',
          large: album.artworkUrl100?.replace('100x100', '300x300') || '',
          extralarge: album.artworkUrl100?.replace('100x100', '600x600') || ''
        },
        tracks: [],
        tags: [],
        releaseDate: album.releaseDate || '',
        source: 'itunes'
      };
    }

    return null;
  } catch (error) {
    console.error('Error fetching album info:', error);
    return null;
  }
}

/**
 * Smart search that tries to find the best match for current track
 * @param {string} artistName - Name of the artist
 * @param {string} trackTitle - Title of the track
 * @returns {Promise<Object>} Combined artist and possible album info
 */
export async function getNowPlayingInfo(artistName, trackTitle) {
  if (!artistName) return { artist: null, album: null };

  try {
    // Get artist info
    const artistInfo = await getArtistInfo(artistName);

    // Try to get track info to find album
    let albumInfo = null;
    const lastfmApiKey = getLastfmApiKey();
    if (trackTitle && lastfmApiKey) {
      const trackData = await fetchFromLastfm('track.getinfo', {
        artist: artistName,
        track: trackTitle,
        autocorrect: 1
      });

      if (trackData?.track?.album) {
        const albumName = trackData.track.album.title;
        albumInfo = await getAlbumInfo(artistName, albumName);
      }
    }

    return {
      artist: artistInfo,
      album: albumInfo,
      track: trackTitle || ''
    };
  } catch (error) {
    console.error('Error fetching now playing info:', error);
    return { artist: null, album: null };
  }
}

/**
 * Helper function to fetch data from Last.fm API
 * @private
 */
async function fetchFromLastfm(method, params) {
  const url = new URL(API_CONFIG.lastfm.baseUrl);
  url.searchParams.append('method', method);
  url.searchParams.append('api_key', getLastfmApiKey());
  url.searchParams.append('format', 'json');

  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, value);
  });

  const response = await fetch(url.toString());
  if (!response.ok) throw new Error(`Last.fm API error: ${response.status}`);

  return await response.json();
}

/**
 * Helper function to fetch data from iTunes API
 * @private
 */
async function fetchFromItunes(term, entity = 'musicArtist') {
  const url = new URL(API_CONFIG.itunes.baseUrl);
  url.searchParams.append('term', term);
  url.searchParams.append('entity', entity);
  url.searchParams.append('limit', '5');

  const response = await fetch(url.toString());
  if (!response.ok) throw new Error(`iTunes API error: ${response.status}`);

  return await response.json();
}

/**
 * Utility function to get the best available image URL
 * @param {Object} images - Images object with different sizes
 * @param {string} preferredSize - Preferred size ('small', 'medium', 'large', 'extralarge')
 * @returns {string} Best available image URL
 */
export function getBestImageUrl(images, preferredSize = 'large') {
  if (!images) return '';

  // Try preferred size first
  if (images[preferredSize]) return images[preferredSize];

  // Fallback order
  const fallbackOrder = ['extralarge', 'large', 'medium', 'small'];
  for (const size of fallbackOrder) {
    if (images[size]) return images[size];
  }

  return '';
}

/**
 * Cache for storing fetched data to avoid repeated API calls
 * Simple in-memory cache with TTL
 */
const cache = new Map();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

function getCacheKey(type, ...args) {
  return `${type}:${args.join(':')}`;
}

function getCached(key) {
  const cached = cache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data;
  }
  cache.delete(key);
  return null;
}

function setCache(key, data) {
  cache.set(key, {
    data,
    timestamp: Date.now()
  });
}

// Enhanced functions with caching
export async function getArtistInfoCached(artistName) {
  const cacheKey = getCacheKey('artist', artistName.toLowerCase());
  const cached = getCached(cacheKey);
  if (cached) return cached;

  const data = await getArtistInfo(artistName);
  if (data) setCache(cacheKey, data);
  return data;
}

export async function getAlbumInfoCached(artistName, albumName) {
  const cacheKey = getCacheKey('album', artistName.toLowerCase(), albumName.toLowerCase());
  const cached = getCached(cacheKey);
  if (cached) return cached;

  const data = await getAlbumInfo(artistName, albumName);
  if (data) setCache(cacheKey, data);
  return data;
}
