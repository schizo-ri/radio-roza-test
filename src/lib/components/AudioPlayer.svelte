<script>
  import { onMount, onDestroy } from 'svelte';
  import { browser } from '$app/environment';
  // import { getCurrentShow, getNextShow } from '$lib/utils/program';
  import SpinningVinyl from './SpinningVinyl.svelte';
  // import { getNowPlayingInfo, getBestImageUrl } from '$lib/utils/musicScraper.js';

  // Component props
  let {
    children = null,
    streamUrl = 'https://radio-roza.org/stream/dash/live.mpd',
    fallbackUrl = 'https://stream.radio-roza.org/live.mp3',
  } = $props();

  // Svelte 5 runes for reactive state
  let player = $state();
  let dash = $state();
  let url = $state(streamUrl);

  let bufferProgress = $state(0);
  let bufferSeconds = $state(0);
  let onAir = $state(false);
  let isPlaying = $state(false);

  let bufferingStuckTimer = $state(null);
  let dataStuckTimer = $state(null);
  let lastKnownTime = $state(0);
  // Track when playback last occurred to detect stale buffers
  let lastPlaybackTime = $state(0);
  let interruptionCheckTimer = $state(null);
  // Timer to periodically check if buffer has become stale
  let bufferStaleCheckTimer = $state(null);
  let audioContext = $state(null);
  let isRecovering = $state(false);

  // let volume = $state(1);
  // let muted = $state(false);

  let nowPlaying = $state({
    artist: 'Radio Roza',
    title: 'Live Stream',
  });

  // let currentShow = $state(getCurrentShow());
  // let nextShow = $state(getNextShow());

  // let musicMetadata = $state({
  //   artist: null,
  //   album: null,
  //   track: ''
  // });

  let hasError = $state(false);
  let errorMessage = $state('');

  const dashSettings = (dashjs) => ({
    streaming: {
      // cacheInitSegments: true,
      delay: {
        liveDelay: 8,
        liveDelayFragmentCount: 4,
      },
      buffer: {
        // Optimized buffer settings for live radio streaming
        // initialBufferLevel: 8,
        bufferTimeDefault: 16,
        bufferTimeAtTopQuality: 20,
        bufferToKeep: 2, // Reduced from 4 to keep less old buffer for live radio
        bufferPruningInterval: 1, // More frequent pruning (every 1 second instead of 2)
        fastSwitchEnabled: true,
        // Additional settings for better live streaming buffer management
        stallThreshold: 0.5, // Lower threshold before considering stalled
        bufferTimeAtTopQualityLongForm: 20,
        longFormContentDurationThreshold: 600, // Treat as long form after 10 minutes
      },
      gaps: {
        jumpGaps: true, // Enable gap jumping for live streams
        jumpLargeGaps: true,
        smallGapLimit: 1.0, // Jump smaller gaps more aggressively
      },
      abr: {
        initialBitrate: {
          audio: 64000,
        },
        autoSwitchBitrate: {
          audio: true,
        },
      },
    },
    debug: {
      logLevel: dashjs.Debug.LOG_LEVEL_WARN,
    },
  });

  onMount(async () => {
    if (browser && player) {
      try {
        // Initialize lastPlaybackTime to track buffer staleness
        lastPlaybackTime = Date.now();
        // Create AudioContext for interruption monitoring
        try {
          audioContext = new (window.AudioContext || window.webkitAudioContext)();

          // Monitor AudioContext state changes
          audioContext.addEventListener('statechange', () => {
            // Guard against null audioContext
            if (!audioContext) {
              return;
            }
            console.log('AudioContext state changed to:', audioContext.state);
            if (audioContext.state === 'suspended' && isPlaying) {
              console.warn('AudioContext suspended - audio likely interrupted');
              isPlaying = false;
              handleError('Audio context suspended');
            } else if (audioContext.state === 'running' && !isPlaying && onAir) {
              console.log('AudioContext resumed');
            }
          });
        } catch (audioError) {
          console.warn('Failed to create AudioContext:', audioError);
          audioContext = null;
        }

        const dashjs = await import('dashjs');
        dash = dashjs.MediaPlayer().create();

        // Configure buffering settings for better prebuffering
        dash.updateSettings(dashSettings(dashjs));

        dash.initialize(player, url, false); // Don't auto-play initially

        // Setup all dash event listeners
        setupDashEventListeners(dashjs);

        // Check if audio is muted or volume is 0
        player.addEventListener('loadedmetadata', () => {
          console.log('Audio metadata loaded');
          console.log('Audio muted:', player.muted);
          console.log('Audio volume:', player.volume);
          console.log('Audio duration:', player.duration);
        });

        player.addEventListener('canplay', () => {
          console.log('Audio can play');
          onAir = true;
        });

        player.addEventListener('playing', () => {
          console.log('Audio element playing');
          // isPlaying = true;
          clearTimeout(bufferingStuckTimer);
          clearTimeout(dataStuckTimer);
        });

        player.addEventListener('waiting', () => {
          console.log('Audio waiting for data');
          dataStuckTimer = setTimeout(() => {
            console.log('Waiting data too long');
            dash.destroy();
            dash = dashjs.MediaPlayer().create();
            dash.updateSettings(dashSettings(dashjs));
            dash.initialize(player, url, true);
          }, 4000);
        });

        player.addEventListener('volumechange', () => {
          console.log('Volume changed - muted:', player.muted, 'volume:', player.volume);
          // volume = player.volume;
          // muted = player.muted;
        });

        // Listen for audio device changes
        if (navigator.mediaDevices) {
          navigator.mediaDevices.addEventListener('devicechange', () => {
            console.log('Audio devices changed');
            // Check if playback is still working after device change
            if (isPlaying && player && !player.paused) {
              setTimeout(() => checkForInterruption(), 1000);
            }
          });
        }

        // Listen for when audio becomes interrupted (like device disconnect)
        player.addEventListener('pause', () => {
          console.log('Audio paused');
          // Only update state if we didn't pause it ourselves
          if (isPlaying && !player.ended) {
            console.warn('Audio paused unexpectedly - likely interrupted');
            isPlaying = false;
            lastPlaybackTime = Date.now();
          }
        });

        // Listen for when audio resumes after interruption
        player.addEventListener('play', () => {
          console.log('Audio play event');
          lastKnownTime = player.currentTime;
          lastPlaybackTime = Date.now();
        });

        // Start periodic interruption checking only once
        if (!interruptionCheckTimer) {
          interruptionCheckTimer = setInterval(checkForInterruption, 5000);
        }

        // Start periodic buffer staleness checking for live radio
        // This prevents stale audio from being played after long idle periods
        if (!bufferStaleCheckTimer) {
          bufferStaleCheckTimer = setInterval(checkBufferStaleness, 10000); // Check every 10 seconds
        }
      } catch (error) {
        console.error('Failed to load dashjs:', error);
      }
    }

    return () => {
      dash?.destroy();
    };
  });

  onDestroy(() => {
    cleanup();
  });

  // Function to update buffer status
  function updateBufferStatus() {
    if (!dash) return;

    try {
      const bufferLength = dash.getBufferLength('audio') || 0;
      const targetBuffer = 16; // Initial buffer target in seconds
      bufferSeconds = bufferLength.toFixed(2);
      bufferProgress = Math.min((bufferLength / targetBuffer) * 100, 100);
    } catch (error) {
      console.log('Could not get buffer length:', error.message);
    }
  }

  // Function to detect audio interruption by monitoring playback progress
  function checkForInterruption() {
    if (!player || player.paused || player.ended || !isPlaying) {
      return;
    }

    // If currentTime hasn't changed but player claims to be playing, likely interrupted
    if (player.currentTime === lastKnownTime && isPlaying && !player.paused) {
      console.warn('Audio interruption detected - playback stuck');
      isPlaying = false;
      handleError('Audio output interrupted - click play to resume');

      // Attempt automatic recovery (only once)
      setTimeout(() => {
        if (hasError && !isPlaying && !isRecovering) {
          attemptRecovery();
        }
      }, 2000);
    }

    lastKnownTime = player.currentTime;
  }

  /**
   * Checks if the audio buffer has become stale due to inactivity.
   * For live radio, old buffered content should not be played after long idle periods.
   */
  function checkBufferStaleness() {
    if (!player || !lastPlaybackTime) {
      return;
    }

    const now = Date.now();
    const timeSinceLastPlayback = (now - lastPlaybackTime) / 1000;

    // If buffer has been idle for more than 16 seconds and we're not currently playing
    if (timeSinceLastPlayback > 16 && !isPlaying) {
      console.log(`Buffer stale for ${timeSinceLastPlayback.toFixed(1)}s, will purge on next play`);
      // We could optionally purge here, but it's better to wait until play() is called
      // to avoid interrupting any potential background processes
    }
  }

  // Function to attempt recovery from audio interruption
  async function attemptRecovery() {
    if (isRecovering) {
      console.log('Recovery already in progress, skipping...');
      return;
    }

    isRecovering = true;
    console.log('Attempting audio recovery...');

    try {
      // Clear error state
      hasError = false;
      errorMessage = '';

      // Resume AudioContext if suspended
      if (audioContext && audioContext.state === 'suspended') {
        await audioContext.resume();
      }

      // Reinitialize dash player if needed
      if (dash && player) {
        dash.destroy();
        const dashjs = await import('dashjs');
        dash = dashjs.MediaPlayer().create();
        dash.updateSettings(dashSettings(dashjs));
        dash.initialize(player, url, false);

        // Re-add all dash event listeners
        setupDashEventListeners(dashjs);

        // Wait a moment then try to play
        setTimeout(async () => {
          try {
            await player.play();
            console.log('Audio recovery successful');
          } catch (error) {
            console.error('Recovery play failed:', error);
            handleError('Recovery failed - please try manually');
          }
        }, 1000);
      }
    } catch (error) {
      console.error('Recovery attempt failed:', error);
      handleError('Auto-recovery failed - please refresh');
    } finally {
      isRecovering = false;
    }
  }

  // Extract dash event listener setup into reusable function
  function setupDashEventListeners(dashjs) {
    // Add safety checks for event constants
    if (!dashjs.MediaPlayer?.events) {
      console.error('Dash.js events not available');
      return;
    }

    const events = dashjs.MediaPlayer.events;

    if (events.ERROR) {
      dash.on(events.ERROR, (e) => {
        console.log('Dash error', e.error?.message);
        if (e.error?.code === dashjs.MediaPlayer.errorCodes?.RESOURCE_MISSING) {
          console.log('Falling back to mp3', e.error?.code);
          player.src = fallbackUrl;
          onAir = true;
        }
      });
    }

    if (events.STREAM_INITIALIZED) {
      dash.on(events.STREAM_INITIALIZED, async () => {
        console.log('Stream initialized');
        updateBufferStatus();
        onAir = true;
      });
    }

    if (events.PLAYBACK_WAITING) {
      dash.on(events.PLAYBACK_WAITING, () => {
        console.log('Playback waiting (buffering)');
        bufferingStuckTimer = setTimeout(() => {
          console.log('Buffering stuck');
          attemptRecovery();
        }, 4000);
      });
    }

    if (events.PLAYBACK_PAUSED) {
      dash.on(events.PLAYBACK_PAUSED, () => {
        console.log('Dash playback paused');
        if (isPlaying) {
          console.warn('Dash playback interrupted unexpectedly');
          isPlaying = false;
          lastPlaybackTime = Date.now();
        }
      });
    }

    if (events.PLAYBACK_PLAYING) {
      dash.on(events.PLAYBACK_PLAYING, () => {
        console.log('Dash playback playing');
        isPlaying = true;
        lastKnownTime = player.currentTime;
        lastPlaybackTime = Date.now();
        clearTimeout(bufferingStuckTimer);
        clearTimeout(dataStuckTimer);
      });
    }

    if (events.PLAYBACK_STALLED) {
      dash.on(events.PLAYBACK_STALLED, () => {
        console.log('Dash playback stalled');
        if (isPlaying && !player.paused) {
          console.warn('Playback stalled - possible audio interruption');
          handleError('Audio playback stalled');
        }
      });
    }

    if (events.CONNECTION_CLOSED) {
      dash.on(events.CONNECTION_CLOSED, () => {
        console.log('Dash connection closed');
        handleError('Audio connection lost');
      });
    }

    if (events.BUFFER_LEVEL_UPDATED) {
      dash.on(events.BUFFER_LEVEL_UPDATED, () => {
        updateBufferStatus();
      });
    }

    if (events.CAN_PLAY) {
      dash.on(events.CAN_PLAY, () => {
        console.log('Dash can play');
        onAir = true;
      });
    }

    if (events.QUALITY_CHANGE_REQUESTED) {
      dash.on(events.QUALITY_CHANGE_REQUESTED, function (e) {
        const quality = e.newRepresentation?.bitrateInKbit || 'unknown';
        console.log('Promena kvaliteta zahtevana:', quality, 'za tip:', e.mediaType);
      });
    }

    if (events.QUALITY_CHANGE_RENDERED) {
      dash.on(events.QUALITY_CHANGE_RENDERED, function (e) {
        const quality = e.newRepresentation?.bitrateInKbit || 'unknown';
        console.log('Novi kvalitet aktiviran:', quality, 'buffer:', bufferSeconds);
      });
    }
  }

  function handleError(message) {
    hasError = true;
    errorMessage = message;
    onAir = false;
    console.error('❌ Player error:', message);
  }

  /**
   * Resets the dash.js buffer by destroying and recreating the player instance.
   * This ensures that stale audio content is purged and fresh live content is loaded.
   * Essential for live radio to prevent playing cached audio from hours ago.
   */
  async function resetDashBuffer() {
    if (dash) {
      console.log('Resetting dash buffer for fresh streaming');

      // Store current URL and destroy player
      const currentUrl = url;
      dash.destroy();

      // Create new player instance with fresh buffer
      const dashjs = await import('dashjs');
      dash = dashjs.MediaPlayer().create();
      dash.updateSettings(dashSettings(dashjs));
      dash.initialize(player, currentUrl, false);
      setupDashEventListeners(dashjs);

      // Wait a bit for initialization
      return new Promise((resolve) => {
        setTimeout(resolve, 100);
      });
    }
  }

  async function play() {
    if (!player) {
      return;
    }

    try {
      // Buffer staleness check: Prevent playing old cached audio in live radio
      // If more than 16 seconds have passed since last playback, purge the buffer
      const now = Date.now();
      const timeSinceLastPlayback = (now - lastPlaybackTime) / 1000;

      if (lastPlaybackTime > 0 && timeSinceLastPlayback > 16) {
        console.log(`Buffer idle for ${timeSinceLastPlayback.toFixed(1)}s, purging stale buffer`);
        await resetDashBuffer();
      }

      // Resume AudioContext if suspended
      if (audioContext && audioContext.state === 'suspended') {
        await audioContext.resume();
      }

      await player.play();
      isPlaying = true;
      hasError = false; // Clear any previous interruption errors
      onAir = true;
      lastKnownTime = player.currentTime;
      lastPlaybackTime = now;
      updateMediaSessionPlaybackState();
    } catch (error) {
      console.error('Play failed:', error);
      handleError('Playback failed');
    }
  }

  async function pause() {
    if (player && isPlaying) {
      await player.pause();
      isPlaying = false;
      lastPlaybackTime = Date.now();
      updateMediaSessionPlaybackState();
    }
  }

  async function togglePlay() {
    if (isPlaying) {
      await pause();
    } else {
      await play();
    }
  }

  // function setVolume(newVolume) {
  //   if (player) {
  //     const clampedVolume = Math.max(0, Math.min(1, newVolume));
  //     player.volume = clampedVolume;
  //     volume = clampedVolume;
  //   }
  // }

  // function toggleMute() {
  //   if (player) {
  //     player.muted = !player.muted;
  //     muted = player.muted;
  //   }
  // }

  function cleanup() {
    if (interruptionCheckTimer) {
      clearInterval(interruptionCheckTimer);
      interruptionCheckTimer = null;
    }
    if (bufferStaleCheckTimer) {
      clearInterval(bufferStaleCheckTimer);
      bufferStaleCheckTimer = null;
    }
    if (bufferingStuckTimer) {
      clearTimeout(bufferingStuckTimer);
    }
    if (dataStuckTimer) {
      clearTimeout(dataStuckTimer);
    }
    if (audioContext) {
      try {
        if (audioContext.state !== 'closed') {
          audioContext.close();
        }
      } catch (e) {
        console.warn('Error closing AudioContext:', e);
      }
      audioContext = null;
    }
    if (dash) {
      try {
        dash.destroy();
      } catch (e) {
        console.warn('Error cleaning up dash:', e);
      }
      dash = null;
    }
    // Reset recovery flag
    isRecovering = false;
  }

  // Media Session API functions
  function setupMediaSessionHandlers() {
    if (!browser || !('mediaSession' in navigator)) {
      return;
    }

    try {
      navigator.mediaSession.setActionHandler('play', () => {
        play();
      });

      navigator.mediaSession.setActionHandler('pause', () => {
        pause();
      });

      navigator.mediaSession.setActionHandler('stop', () => {
        pause();
      });

      // For radio streams, we don't typically support seeking
      // navigator.mediaSession.setActionHandler('seekbackward', null);
      // navigator.mediaSession.setActionHandler('seekforward', null);
      // navigator.mediaSession.setActionHandler('previoustrack', null);
      // navigator.mediaSession.setActionHandler('nexttrack', null);
    } catch (error) {
      console.warn('Error setting up Media Session handlers:', error);
    }
  }

  function updateMediaSessionMetadata() {
    if (!browser || !('mediaSession' in navigator)) {
      return;
    }

    try {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: nowPlaying.title,
        artist: nowPlaying.artist,
        album: 'Radio Roza Live Stream',
        artwork: [
          {
            src: '/images/rr_logo-square_red_192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/images/rr_logo-square_red_512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      });
    } catch (error) {
      console.warn('Error updating Media Session metadata:', error);
    }
  }

  function updateMediaSessionPlaybackState() {
    if (!browser || !('mediaSession' in navigator)) {
      return;
    }

    try {
      navigator.mediaSession.playbackState = isPlaying ? 'playing' : 'paused';
    } catch (error) {
      console.warn('Error updating Media Session playback state:', error);
    }
  }

  // Move nowPlaying fetch outside of $effect to avoid reactive loops
  const nowPlayingUrl = 'https://stream.radio-roza.org/status-json.xsl';

  const fetchNowPlaying = async () => {
    try {
      const res = await fetch(nowPlayingUrl);
      const data = await res.json();

      if (!data?.icestats) {
        return;
      }

      const sources = data.icestats.source;
      const source = sources.find((s) => s.artist);
      if (!source) {
        console.log('No source found');
        return;
      }
      const artist = source.artist;
      const title = source.title;

      // Update basic now playing info
      nowPlaying = { artist, title };

      // Update Media Session metadata when nowPlaying changes
      updateMediaSessionMetadata();

      // Fetch extended metadata (artist images, album covers)
      // if (artist && artist !== 'Radio Roza') {
      //   try {
      //     const metadata = await getNowPlayingInfo(artist, title);
      //     musicMetadata = {
      //       artist: metadata.artist,
      //       album: metadata.album,
      //       track: title
      //     };
      //     console.log('Music metadata:', musicMetadata);
      //   } catch (metadataError) {
      //     console.error('Error fetching music metadata:', metadataError);
      //   }
      // } else {
      //   // Reset metadata for generic content
      //   musicMetadata = { artist: null, album: null, track: '' };
      // }
    } catch (error) {
      console.error('Error fetching now playing:', error);
    }
  };

  // Reactive effect to update Media Session metadata when nowPlaying changes
  $effect(() => {
    updateMediaSessionMetadata();
  });

  // Set up nowPlaying fetch interval - separate onMount to avoid conflicts
  onMount(() => {
    // Setup Media Session API
    setupMediaSessionHandlers();
    updateMediaSessionMetadata();

    // Fetch immediately
    fetchNowPlaying();

    // Then fetch every 5 seconds
    const nowPlayingInterval = setInterval(fetchNowPlaying, 5000);

    // Cleanup
    onDestroy(() => {
      clearInterval(nowPlayingInterval);
    });
  });

  // Function to start playback (can be called by parent component)
  // function startPlayback() {
  //   if (player && onAir) {
  //     player.play();
  //   } else if (player) {
  //     player.load();
  //     const playWhenReady = () => {
  //       if (onAir) {
  //         player.play();
  //         player.removeEventListener('canplay', playWhenReady);
  //       }
  //     };
  //     player.addEventListener('canplay', playWhenReady);
  //   }
  // }

  // Expose the startPlayback function
  // export function getStartPlayback() {
  //   return startPlayback;
  // }
</script>

<div class="wrapper">
  <div class="container">
    {#if hasError}
      <div class="error-message">
        <img src="/icons/error.svg" alt="Error" />
        <span>{errorMessage}</span>
        {#if errorMessage.includes('interrupted') || errorMessage.includes('stalled') || errorMessage.includes('connection')}
          <button class="recovery-btn" onclick={attemptRecovery}> Try Recovery </button>
        {/if}
      </div>
    {/if}

    <div class="actions">
      <div class="on-air">
        {#if onAir}
          <div class="player-status">
            <span class="dot green"></span> <span class="sr-only">On Air</span>
          </div>
        {:else if hasError}
          <div class="player-status">
            <span class="dot red"></span> <span class="sr-only">Error</span>
          </div>
        {:else}
          <div class="player-status">
            <span class="dot warning"></span> <span class="sr-only">Connecting...</span>
          </div>
        {/if}
      </div>
      <div class="expand">
        {#if children}
          {@render children()}
        {/if}
      </div>
    </div>

    <div class="controls">
      <div class="toggle-container">
        <SpinningVinyl bind:playing={isPlaying} style="position: absolute; inset: 0; z-index: 1;" />
        <button class="play" onclick={togglePlay} disabled={!onAir}>
          {#if isPlaying}
            <img src="/icons/stop_fill_white.svg" alt="Stop" width="20" height="20" />
          {:else}
            <img src="/icons/play_fill_white.svg" alt="Play" width="24" height="24" />
          {/if}
        </button>
      </div>
    </div>

    <section class="now-playing" aria-label="Now playing">
      <dl class="track-info" aria-live="polite">
        <dt class="sr-only">Track title</dt>
        <dd class="track-title">{nowPlaying.title}</dd>
        <dt class="sr-only">Artist</dt>
        <dd class="track-artist">{nowPlaying.artist}</dd>
      </dl>
      <!-- Buffer status indicator -->
      <div class="buffer">
        <progress class="buffer-progress" value={bufferProgress} max="100"></progress>
      </div>
    </section>

    <!-- Current program -->
    <!-- {#if currentShow?.title}
    <div class="program">
      <dl class="program-info" aria-live="polite">
        <dt class="sr-only">Trenutno</dt>
        <dd class="current-show">
          {currentShow?.show_start}
          {currentShow?.title || '-'}
        </dd>
        <dt class="sr-only">Slijedi</dt>
        <dd class="next-show">
          {nextShow?.show_start}
          {nextShow?.title || '-'}
        </dd>
      </dl>
    </div>
  {/if} -->

    <!-- <div class="volume-control">
    <button class="volume-btn" onclick={toggleMute}>
      {#if muted}
        <img src="/icons/volume-x.svg" alt="Muted" />
      {:else if volume < 0.25}
        <img src="/icons/volume.svg" alt="Low Volume" />
      {:else if volume > 0.75}
        <img src="/icons/volume-2.svg" alt="High Volume" />
      {:else}
        <img src="/icons/volume-1.svg" alt="Medium Volume" />
      {/if}
    </button>
    <input
      type="range"
      class="volume-slider"
      min="0"
      max="1"
      step="0.1"
      value={volume}
      oninput={(e) => setVolume(parseFloat(e.target.value))}
    />
  </div> -->

    <!-- Audio element (hidden controls since we're managing playback) -->
    <audio id="audioPlayer" src={url} bind:this={player} preload="none"></audio>
  </div>

  <p>some info</p>
  <p>some info</p>
  <p>some info</p>
  <p>some info</p>
  <p>some info</p>
</div>

<style>
  .container {
    display: grid;
    grid-template-columns: 16px 50px minmax(0, 1fr);
    grid-template-areas: 'actions controls now-playing';
    column-gap: 12px;
    row-gap: 4px;
    min-width: 300px;
    padding-top: 8px;
    padding-bottom: 8px;
    padding-right: 16px;
  }

  .error-message {
    grid-column: 1 / -1;
    display: flex;
    align-items: center;
    gap: 8px;
    background: #fee2e2;
    border: 1px solid #fecaca;
    border-radius: 6px;
    padding: 8px 12px;
    margin-bottom: 8px;
    font-size: 0.875rem;
    color: #dc2626;
  }

  .error-message img {
    width: 16px;
    height: 16px;
    opacity: 0.8;
  }

  .recovery-btn {
    background: #dc2626;
    color: white;
    border: none;
    padding: 4px 12px;
    border-radius: 4px;
    font-size: 0.75rem;
    cursor: pointer;
    margin-left: auto;
    transition: background-color 0.2s ease;
  }

  .recovery-btn:hover {
    background: #b91c1c;
  }

  .recovery-btn:active {
    transform: translateY(1px);
  }

  .actions {
    grid-area: actions;
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-rows: repeat(2, 25px);
  }

  .on-air {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }

  .player-status {
    font-size: 0.5rem;
    text-transform: uppercase;
  }

  .dot {
    border-radius: 50%;
    width: 8px;
    height: 8px;
    background-color: var(--yellow);
    display: block;
  }

  .dot.green {
    background-color: var(--green);
  }

  .dot.red {
    background-color: var(--red);
  }

  .dot.warning {
    background-color: var(--orange);
  }

  .controls {
    grid-area: controls;
  }

  .toggle-container {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    aspect-ratio: 1;
    width: 100%;
    height: auto;
  }

  .play {
    outline: none;
    /*background-color: var(--primary-600);*/
    background-color: transparent;
    /*border: 1px solid black;*/
    border: none;
    border-radius: 50%;
    aspect-ratio: 1;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 1;
    cursor: pointer;
    z-index: 2;
  }

  .play > * {
    pointer-events: none;
  }

  .now-playing {
    grid-area: now-playing;
    display: grid;
    grid-template-rows: minmax(0, 1fr) 1px;
  }

  .track-info {
    margin: 0;
    padding: 0;
    align-self: center;
  }

  .track-title {
    margin: 0;
    font-size: 22px;
    font-weight: 800;
    line-height: 1.2;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .track-artist {
    margin: 0;
    font-size: 0.9rem;
    font-weight: 500;
    letter-spacing: -0.5px;
    line-height: 1.2;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-transform: uppercase;
  }

  .buffer {
    position: relative;
    height: 1px;
    width: 100%;
  }

  .buffer-progress {
    width: 100%;
    height: 1px;
    appearance: none;
    border: none;
    background: var(--primary-200);
    position: absolute;
    inset: 0;
  }

  .buffer-progress::-webkit-progress-bar {
    background: var(--primary-200);
  }

  .buffer-progress::-webkit-progress-value {
    background: var(--primary-600);
    transition: width 0.3s ease;
  }

  .buffer-progress::-moz-progress-bar {
    background: var(--primary-600);
  }

  /*.volume-control {
    grid-area: volume;
    display: flex;
    align-items: center;
    gap: 8px;
    position: relative;
  }*/

  /*.volume-btn {
    outline: 0;
    border: 0;
    background-color: transparent;
    padding: 0;
    cursor: pointer;
    aspect-ratio: 1;
    width: 16px;
  }*/

  /*.volume-slider {
    appearance: none;
    width: 80px;
    height: 4px;
    border-radius: 4px;
    background: var(--primary-300);
    outline: none;
    cursor: pointer;
  }*/

  /* WebKit browsers (Chrome, Safari, Edge) */
  /*.volume-slider::-webkit-slider-track {
    width: 100%;
    height: 4px;
    cursor: pointer;
    background: var(--primary-400);
    border-radius: 4px;
    border: none;
  }*/

  /*.volume-slider::-webkit-slider-thumb {
    appearance: none;
    height: 8px;
    width: 8px;
    border-radius: 50%;
    background: white;
    cursor: pointer;
    border: 2px solid var(--primary-600);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
    transition: all 0.2s ease;
  }*/

  /*.volume-slider::-webkit-slider-thumb:hover {
    background: var(--primary-700);
    transform: scale(1.1);
  }*/

  /* Firefox */
  /*.volume-slider::-moz-range-track {
    width: 100%;
    height: 4px;
    cursor: pointer;
    background: var(--primary-400);
    border-radius: 4px;
    border: none;
  }*/

  /*.volume-slider::-moz-range-thumb {
    height: 8px;
    width: 8px;
    border-radius: 50%;
    background: white;
    cursor: pointer;
    border: 2px solid var(--primary-600);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
    transition: all 0.2s ease;
  }*/

  /*.volume-slider::-moz-range-thumb:hover {
    background: var(--primary-700);
    transform: scale(1.1);
  }*/

  /* Focus styles for accessibility */
  /*.volume-slider:focus-visible {
    outline: 2px solid var(--primary-500);
    outline-offset: 2px;
  }*/

  /*.volume-slider:focus-visible::-webkit-slider-thumb {
    outline: 2px solid var(--primary-500);
    outline-offset: 1px;
  }*/

  /*.program {
    grid-area: program;
  }*/

  /*.current-show {
    font-weight: 500;
    font-size: 0.875rem;
    color: var(--dark);
  }*/

  /*.next-show {
    font-size: 0.75rem;
    color: var(--muted);
  }*/
</style>
