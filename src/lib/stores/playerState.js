/**
 * Global player state store for coordinating between stream player and Mixcloud embeds.
 * When one player starts, the other should pause.
 */
import { writable, get } from 'svelte/store';

// Which player is currently active: 'stream' | 'mixcloud' | null
export const activePlayer = writable(null);

// Current Mixcloud mix being played (if any)
export const currentMixcloudMix = writable(null);

// Stream player state (set by Player.svelte)
export const streamPlayerPlaying = writable(false);

// Callbacks for controlling the stream player (set by Player.svelte)
let streamPauseCallback = null;

export function registerStreamPlayer(pauseFn) {
  streamPauseCallback = pauseFn;
}

export function unregisterStreamPlayer() {
  streamPauseCallback = null;
}

// Call this when Mixcloud player starts playing
export function onMixcloudPlay(mix) {
  activePlayer.set('mixcloud');
  currentMixcloudMix.set(mix);

  // Pause stream if it's playing
  if (get(streamPlayerPlaying) && streamPauseCallback) {
    streamPauseCallback();
  }
}

// Call this when Mixcloud player stops/pauses
export function onMixcloudStop() {
  const current = get(activePlayer);
  if (current === 'mixcloud') {
    activePlayer.set(null);
  }
}

// Call this when stream player starts playing
export function onStreamPlay() {
  activePlayer.set('stream');
  streamPlayerPlaying.set(true);
}

// Call this when stream player stops
export function onStreamStop() {
  streamPlayerPlaying.set(false);
  const current = get(activePlayer);
  if (current === 'stream') {
    activePlayer.set(null);
  }
}

// Close the Mixcloud player
export function closeMixcloudPlayer() {
  currentMixcloudMix.set(null);
  activePlayer.set(null);
}
