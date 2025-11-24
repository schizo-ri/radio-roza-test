/**
 * Configuration file for external API keys
 *
 * To use these APIs, you'll need to get API keys:
 * - Last.fm: https://www.last.fm/api/account/create
 * - AudioDB: https://www.theaudiodb.com/api_apply.php (optional, for premium features)
 */

// Environment variables (recommended approach)
export const API_CONFIG = {
  lastfm: {
    apiKey: import.meta.env.VITE_LASTFM_API_KEY || '',
    baseUrl: 'https://ws.audioscrobbler.com/2.0/'
  },

  audiodb: {
    apiKey: import.meta.env.VITE_AUDIODB_API_KEY || '', // Optional - free tier available
    baseUrl: 'https://www.theaudiodb.com/api/v1/json'
  },

  itunes: {
    baseUrl: 'https://itunes.apple.com/search' // No API key needed
  }
};

// Fallback configuration (not recommended for production)
// Only use this for development/testing
export const FALLBACK_CONFIG = {
  lastfm: {
    apiKey: 'YOUR_LASTFM_API_KEY_HERE', // Replace with your actual API key
    baseUrl: 'https://ws.audioscrobbler.com/2.0/'
  }
};

// Helper to check if APIs are configured
export function isConfigured() {
  return {
    lastfm: !!(API_CONFIG.lastfm.apiKey || FALLBACK_CONFIG.lastfm.apiKey !== 'YOUR_LASTFM_API_KEY_HERE'),
    audiodb: !!API_CONFIG.audiodb.apiKey,
    itunes: true // Always available
  };
}

// Get active API key for Last.fm
export function getLastfmApiKey() {
  return API_CONFIG.lastfm.apiKey ||
    (FALLBACK_CONFIG.lastfm.apiKey !== 'YOUR_LASTFM_API_KEY_HERE' ? FALLBACK_CONFIG.lastfm.apiKey : null);
}
