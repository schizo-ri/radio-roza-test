<script>
  import { onMount, onDestroy } from 'svelte';
  import { browser } from '$app/environment';
  // import { getCurrentShow, getNextShow } from '$lib/utils/program';
  import SpinningVinyl from './SpinningVinyl.svelte';
  // import { getNowPlayingInfo, getBestImageUrl } from '$lib/utils/musicScraper.js';

  // Component props
  let {
    children,
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
        // initialBufferLevel: 8,
        bufferTimeDefault: 16,
        bufferTimeAtTopQuality: 32,
        bufferToKeep: 4,
        bufferPruningInterval: 2,
        fastSwitchEnabled: true,
      },
      gaps: {
        // jumpGaps: true,
        // jumpLargeGaps: true,
        // smallGapLimit: 1.5,
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
        const dashjs = await import('dashjs');
        dash = dashjs.MediaPlayer().create();

        // Configure buffering settings for better prebuffering
        dash.updateSettings(dashSettings(dashjs));

        dash.initialize(player, url, false); // Don't auto-play initially

        dash.on(dashjs.MediaPlayer.events.ERROR, (e) => {
          console.log('Dash error', e.error?.message);
          // if connection error or resource missing fallback to mp3
          if (e.error?.code === dashjs.MediaPlayer.errorCodes?.RESOURCE_MISSING) {
            console.log('Falling back to mp3', e.error?.code);
            player.src = fallbackUrl;
            onAir = true;
          }
        });

        dash.on(dashjs.MediaPlayer.events.STREAM_INITIALIZED, async () => {
          console.log('Stream initialized');
          // player.muted = true;
          // await player.play();
          updateBufferStatus();
          // await player.pause();
          // player.muted = false;
          onAir = true;
        });

        dash.on(dashjs.MediaPlayer.events.PLAYBACK_WAITING, () => {
          console.log('Playback waiting (buffering)');
          // add timeout to check if buffering is stuck
          // if timeout is reached after 4 seconds
          // then reinitialze player
          // on play start clear timeout
          bufferingStuckTimer = setTimeout(() => {
            console.log('Buffering stuck');
            dash.destroy();
            dash = dashjs.MediaPlayer().create();
            dash.updateSettings(dashSettings(dashjs));
            dash.initialize(player, url, true);
          }, 4000);
        });

        dash.on(dashjs.MediaPlayer.events.BUFFER_LEVEL_UPDATED, () => {
          updateBufferStatus();
        });

        dash.on(dashjs.MediaPlayer.events.CAN_PLAY, () => {
          console.log('Dash can play');
          onAir = true;
        });

        dash.on(dashjs.MediaPlayer.events.QUALITY_CHANGE_REQUESTED, function (e) {
          const quality = e.newRepresentation?.bitrateInKbit || 'unknown';
          console.log('Promena kvaliteta zahtevana:', quality, 'za tip:', e.mediaType);
        });

        dash.on(dashjs.MediaPlayer.events.QUALITY_CHANGE_RENDERED, function (e) {
          const quality = e.newRepresentation?.bitrateInKbit || 'unknown';
          console.log('Novi kvalitet aktiviran:', quality, 'buffer:', bufferSeconds);
        });

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
        });

        player.addEventListener('waiting', () => {
          console.log('Audio waiting for data');
        });

        player.addEventListener('volumechange', () => {
          console.log('Volume changed - muted:', player.muted, 'volume:', player.volume);
          // volume = player.volume;
          // muted = player.muted;
        });
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

  function handleError(message) {
    hasError = true;
    errorMessage = message;
    onAir = false;
    console.error('❌ Player error:', message);
  }

  async function play() {
    if (!player) {
      return;
    }

    try {
      await player.play();
      isPlaying = true;
    } catch (error) {
      console.error('Play failed:', error);
      handleError('Playback failed');
    }
  }

  async function pause() {
    if (player && isPlaying) {
      await player.pause();
      isPlaying = false;
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
    if (dash) {
      try {
        dash.destroy();
      } catch (e) {
        console.warn('Error cleaning up dash:', e);
      }
      dash = null;
    }
  }

  $effect(() => {
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

    // Fetch immediately
    fetchNowPlaying();

    // Then fetch every 5 seconds
    const interval = setInterval(fetchNowPlaying, 5000);

    // Cleanup function
    return () => {
      clearInterval(interval);
    };
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

<div class="container">
  {#if hasError}
    <div class="error-message">
      <img src="/icons/error.svg" alt="Error" />
      <span>{errorMessage}</span>
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
      {@render children()}
    </div>
  </div>

  <div class="controls">
    <div class="toggle-container">
      <SpinningVinyl bind:playing={isPlaying} style="position: absolute; inset: 0; z-index: 1;" />
      <button class="play" onclick={togglePlay} disabled={!onAir}>
        {#if isPlaying}
          <img src="/icons/stop_fill_white.svg" alt="Stop" />
        {:else}
          <img src="/icons/play_fill_white.svg" alt="Play" />
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
