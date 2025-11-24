<script>
  import { onMount, onDestroy } from 'svelte';
  import { browser } from '$app/environment';
  import SpinningVinyl from './SpinningVinyl.svelte';
  // import { getNowPlayingInfo, getBestImageUrl } from '$lib/utils/musicScraper.js';

  // Component props
  let {
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

  let volume = $state(1);
  let muted = $state(false);

  // vinyl props
  let size = $state(120);
  let speed = $state(3);

  let nowPlaying = $state({
    artist: 'Radio Roza',
    title: 'Live Stream',
  });

  // let musicMetadata = $state({
  //   artist: null,
  //   album: null,
  //   track: ''
  // });

  let hasError = $state(false);
  let errorMessage = $state('');

  onMount(async () => {
    if (browser && player) {
      try {
        const dashjs = await import('dashjs');
        dash = dashjs.MediaPlayer().create();

        // Configure buffering settings for better prebuffering
        dash.updateSettings({
          streaming: {
            buffer: {
              bufferToKeep: 20,
              bufferPruningInterval: 30,
            },
            gaps: {
              jumpGaps: true,
              jumpLargeGaps: true,
              smallGapLimit: 1.5,
            },
            abr: {
              autoSwitchBitrate: {
                audio: true,
              },
            },
          },
          debug: {
            logLevel: dashjs.Debug.LOG_LEVEL_WARN,
          },
        });

        dash.initialize(player, url, false); // Don't auto-play initially

        dash.on(dashjs.MediaPlayer.events.ERROR, (e) => {
          console.log('Dash error', e.error?.message);
          // if connection error or resource missing fallback to mp3
          if (e.error?.code === dashjs.MediaPlayer.errorCodes.RESOURCE_MISSING) {
            console.log('Falling back to mp3');
            player.src = fallbackUrl;
            onAir = true;
          }
        });

        dash.on(dashjs.MediaPlayer.events.STREAM_INITIALIZED, async () => {
          console.log('Stream initialized');
          player.muted = true;
          await player.play();
          updateBufferStatus();
          await player.pause();
          player.muted = false;
          onAir = true;
        });

        dash.on(dashjs.MediaPlayer.events.PLAYBACK_WAITING, () => {
          console.log('Playback waiting (buffering)');
        });

        dash.on(dashjs.MediaPlayer.events.BUFFER_LEVEL_UPDATED, () => {
          updateBufferStatus();
        });

        dash.on(dashjs.MediaPlayer.events.CAN_PLAY, () => {
          console.log('Dash can play');
          onAir = true;
        });

        dash.on(dashjs.MediaPlayer.events.QUALITY_CHANGE_REQUESTED, function (e) {
          console.log('Promena kvaliteta zahtevana:', e.newQuality, 'za tip:', e.mediaType);
        });

        dash.on(dashjs.MediaPlayer.events.QUALITY_CHANGE_RENDERED, function (e) {
          console.log('Novi kvalitet aktiviran:', e.newQuality);
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
        });

        player.addEventListener('waiting', () => {
          console.log('Audio waiting for data');
        });

        player.addEventListener('volumechange', () => {
          console.log('Volume changed - muted:', player.muted, 'volume:', player.volume);
          volume = player.volume;
          muted = player.muted;
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
    if (player && !isPlaying) {
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

  function setVolume(newVolume) {
    if (player) {
      const clampedVolume = Math.max(0, Math.min(1, newVolume));
      player.volume = clampedVolume;
      volume = clampedVolume;
    }
  }

  function toggleMute() {
    if (player) {
      player.muted = !player.muted;
      muted = player.muted;
    }
  }

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
  <!-- Buffer status indicator -->
  <div class="buffer-status">
    <div class="buffer-progress">
      <div class="buffer-bar" style="width: {bufferProgress}%"></div>
    </div>
    <span class="buffer-text"
      >Buffering... {Number(bufferProgress || 0).toFixed(0)}%, {Number(bufferSeconds || 0).toFixed(
        0
      )}s</span
    >
  </div>

  {#if hasError}
    <div class="error-message">
      <img src="/icons/error.svg" alt="Error" />
      <span>{errorMessage}</span>
    </div>
  {/if}

  <div class="controls">
    <SpinningVinyl bind:isPlaying {size} {speed} />

    <button class="play-btn {onAir ? 'ready' : 'disabled'}" onclick={togglePlay} disabled={!onAir}>
      {#if isPlaying}
        <img src="/icons/pause.svg" alt="Pause" />
      {:else}
        <img src="/icons/play.svg" alt="Play" />
      {/if}
    </button>

    <div class="volume-controls">
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
    </div>
  </div>

  <div class="now-playing">
    <div class="track-info">
      <span class="track-title">{nowPlaying.title}</span>
      <span class="track-artist">{nowPlaying.artist}</span>
    </div>
  </div>

  <!-- Audio element (hidden controls since we're managing playback) -->
  <audio id="audioPlayer" src={url} bind:this={player} preload="none"></audio>
</div>

<style>
  .container {
    width: 100%;
  }
</style>
