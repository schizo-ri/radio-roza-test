<script>
  import { onMount, onDestroy } from 'svelte';
  import { browser } from '$app/environment';
  import Hls from 'hls.js';
  import SpinningVinyl from './SpinningVinyl.svelte';
  // temporary solution until we have a better way to handle program
  import { getCurrentShow, getNextShow } from '$lib/utils/program';

  let {
    src = 'https://radio.radio-roza.org/hls/radioroza/live.m3u8',
    autoplay = false,
    ...props
  } = $props();

  let audioElement = $state();
  let hls = $state();
  let isPlaying = $state(false);
  let currentTime = $state(0);
  let duration = $state(0);
  let volume = $state(1);
  let muted = $state(false);
  let loading = $state(false);
  let error = $state(null);

  let currentShow = $state(getCurrentShow());
  let nextShow = $state(getNextShow());

  let nowPlayingInterval = $state(null);
  let nowPlaying = $state({
    artist: 'Radio Roza',
    title: 'Live Stream',
    album: 'Radio Roza Live Stream',
    genre: 'Radio',
    art: '/images/rr_logo-square_red_192.png',
    text: 'Radio Roža - Live Stream',
  });

  function updateMediaSessionMetadata() {
    if (!browser || !('mediaSession' in navigator)) {
      return;
    }

    try {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: nowPlaying.title,
        artist: nowPlaying.artist,
        album: nowPlaying.album,
        genre: nowPlaying.genre,
        artwork: nowPlaying.art,
      });
    } catch (error) {
      console.warn('Error updating Media Session metadata:', error);
    }
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
    } catch (error) {
      console.warn('Error setting up Media Session handlers:', error);
    }
  }

  function play() {
    if (audioElement) {
      audioElement.play().catch((e) => {
        console.error('Play failed:', e);
        error = 'Playback failed';
      });
    }
  }

  function pause() {
    if (audioElement) {
      audioElement.pause();
    }
  }

  function togglePlay() {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  }

  function setVolume(newVolume) {
    volume = Math.max(0, Math.min(1, newVolume));
    if (audioElement) {
      audioElement.volume = volume;
    }
  }

  function toggleMute() {
    muted = !muted;
    if (audioElement) {
      audioElement.muted = muted;
    }
  }

  function seek(time) {
    if (audioElement && duration > 0) {
      audioElement.currentTime = Math.max(0, Math.min(duration, time));
    }
  }

  function formatTime(seconds) {
    if (!seconds || !isFinite(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }

  const nowPlayingFullUrl = 'https://radio.radio-roza.org/api/nowplaying_static/radioroza.json';
  const nowPlayingSimpleUrl = 'https://radio.radio-roza.org/api/nowplaying_static/radioroza.txt';

  const fetchNowPlaying = async () => {
    try {
      const res = await fetch(nowPlayingFullUrl);
      const data = await res.json();

      if (!data?.now_playing?.song) {
        return;
      }

      const { artist, title, text, album, genre, art } = data.now_playing.song;

      // Update basic now playing info
      nowPlaying = { artist, title, text, album, genre, art };

      // Update Media Session metadata when nowPlaying changes
      updateMediaSessionMetadata();
    } catch (error) {
      console.error('Error fetching now playing:', error);
    }
  };

  const fetchNowPlayingSimple = async () => {
    try {
      const res = await fetch(nowPlayingSimpleUrl);
      const data = await res.text();

      if (!data) {
        return;
      }

      if (data !== nowPlaying.text) {
        fetchNowPlaying();
        updateMediaSessionMetadata();
      }
    } catch (error) {
      console.error('Error fetching now playing:', error);
    }
  };

  const skipToLive = () => {
    if (audioElement && duration > 0) {
      // duration minus 1 second
      audioElement.currentTime = duration - 3;
    }
  };

  onMount(() => {
    if (Hls.isSupported()) {
      hls = new Hls({
        enableWorker: true,
        lowLatencyMode: true,
      });

      hls.loadSource(src);
      hls.attachMedia(audioElement);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        loading = false;
        if (autoplay) {
          play();
        }
      });

      hls.on(Hls.Events.ERROR, (event, data) => {
        console.error('HLS Error:', data);
        if (data.fatal) {
          switch (data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
              error = 'Network error occurred';
              hls.startLoad();
              break;
            case Hls.ErrorTypes.MEDIA_ERROR:
              error = 'Media error occurred';
              hls.recoverMediaError();
              break;
            default:
              error = 'Fatal error occurred';
              hls.destroy();
              break;
          }
        }
      });
    } else if (audioElement.canPlayType('application/vnd.apple.mpegurl')) {
      // Safari native HLS support
      audioElement.src = src;
      if (autoplay) {
        play();
      }
    } else {
      error = 'HLS not supported in this browser';
    }

    // Audio event listeners
    const updateTime = () => {
      currentTime = audioElement.currentTime;
      duration = audioElement.duration || 0;
    };

    const updatePlayState = () => {
      isPlaying = !audioElement.paused;
    };

    const handleLoadStart = () => {
      loading = true;
    };

    const handleCanPlay = () => {
      loading = false;
    };

    audioElement.addEventListener('timeupdate', updateTime);
    audioElement.addEventListener('play', updatePlayState);
    audioElement.addEventListener('pause', updatePlayState);
    audioElement.addEventListener('loadstart', handleLoadStart);
    audioElement.addEventListener('canplay', handleCanPlay);

    // Setup Media Session API
    setupMediaSessionHandlers();
    updateMediaSessionMetadata();
    // Fetch immediately
    fetchNowPlaying();

    // Then fetch every second
    nowPlayingInterval = setInterval(fetchNowPlayingSimple, 1000);

    return () => {
      clearInterval(nowPlayingInterval);
      if (hls) {
        hls.destroy();
      }
      if (audioElement) {
        audioElement.removeEventListener('timeupdate', updateTime);
        audioElement.removeEventListener('play', updatePlayState);
        audioElement.removeEventListener('pause', updatePlayState);
        audioElement.removeEventListener('loadstart', handleLoadStart);
        audioElement.removeEventListener('canplay', handleCanPlay);
      }
    };
  });
</script>

<div class="audio-player" {...props}>
  <audio bind:this={audioElement} bind:volume bind:muted preload="none"></audio>

  <div class="toggle-container">
    <SpinningVinyl bind:playing={isPlaying} style="position: absolute; inset: 0; z-index: 1;" />
    <button class="play" onclick={togglePlay} disabled={loading}>
      {#if isPlaying}
        <img src="/icons/stop_fill_white.svg" alt="Stop" width="24" height="24" />
      {:else}
        <img src="/icons/play_fill_white.svg" alt="Play" width="28" height="28" />
      {/if}
    </button>
  </div>

  <section class="now-playing" aria-label="Now playing">
    <dl class="track-info" aria-live="polite">
      <dt class="sr-only">Track title</dt>
      <dd class="track-title">{nowPlaying.title}</dd>
      <dt class="sr-only">Artist</dt>
      <dd class="track-artist">{nowPlaying.artist}</dd>
    </dl>
  </section>

  <section class="albumart">
    <img
      src={nowPlaying.art ===
      'https://radio.radio-roza.org/static/uploads/radioroza/album_art.1767654832.png'
        ? '/images/popi_cover_edit.png'
        : nowPlaying.art}
      alt={nowPlaying.title}
      width="200"
      height="200"
    />
  </section>

  {#if duration > 0}
    <section class="progress">
      <div class="progress-container">
        <div class="progress-visual">
          <div class="progress-played" style="width: {(currentTime / duration) * 100}%"></div>
          <div class="progress-remaining"></div>
        </div>
        <input
          type="range"
          class="progress-input"
          min="0"
          max={duration}
          step="1"
          bind:value={currentTime}
          onchange={() => seek(currentTime)}
          aria-label="Seek"
        />
      </div>
      <button class="skip-to-live" onclick={skipToLive}>
        <img src="/icons/skip-to-end.svg" alt="Skip to End" />
      </button>
      <div class="time-display">
        <span class="current-time">{formatTime(currentTime)}</span>
        {#if duration > 0}
          <span class="separator">/</span>
          <span class="duration">{formatTime(duration)}</span>
        {/if}
      </div>
    </section>
  {/if}

  <section class="show-info">
    {#if currentShow}
      <div class="current-show">
        <span class="show-start">{currentShow.show_start}</span>
        <span class="show-title">{currentShow.title}</span>
      </div>
    {/if}

    {#if nextShow}
      <div class="next-show">
        <span class="show-start">{nextShow.show_start}</span>
        <span class="show-title">{nextShow.title}</span>
      </div>
    {/if}
  </section>

  <section class="volume-control">
    <button class="volume-btn" onclick={toggleMute}>
      {#if muted}
        <img src="/icons/volume-x-white.svg" alt="Muted" />
      {:else if volume < 0.25}
        <img src="/icons/volume-white.svg" alt="Low Volume" />
      {:else if volume > 0.75}
        <img src="/icons/volume-2-white.svg" alt="High Volume" />
      {:else}
        <img src="/icons/volume-1-white.svg" alt="Medium Volume" />
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
  </section>

  {#if error}
    <div class="error">
      <span>⚠️ {error}</span>
    </div>
  {/if}
</div>

<style>
  .audio-player {
    display: grid;
    grid-template-areas:
      'play now-playing now-playing albumart'
      'play now-playing now-playing albumart'
      'play progress progress albumart'
      'show-info show-info volume albumart'
      'error error error error';
    grid-template-columns: 60px minmax(200px, 1fr) minmax(0, 120px) 200px;
    grid-template-rows: 24px 24px 12px 48px 92px;
    grid-column-gap: 8px;
    grid-row-gap: 8px;
  }

  .error {
    grid-area: error;
    background: #fee;
    color: #c33;
    padding: 8px;
    border-radius: 4px;
    margin-bottom: 12px;
    text-align: center;
    font-size: 14px;
  }

  .toggle-container {
    grid-area: play;
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
    align-items: center;
  }

  .track-info {
    margin: 0;
    padding: 0;
  }

  .track-title {
    margin: 0;
    color: var(--white, #fff);
    font-size: 22px;
    font-weight: 800;
    line-height: 1.2;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .track-artist {
    margin: 0;
    color: var(--white, #fff);
    font-size: 0.9rem;
    font-weight: 500;
    letter-spacing: -0.5px;
    line-height: 1.2;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-transform: uppercase;
  }

  .progress {
    grid-area: progress;
    display: grid;
    grid-template-columns: minmax(0, 1fr) 20px min-content;
    gap: 8px;
    align-items: center;
  }

  .progress-container {
    position: relative;
  }

  .progress-visual {
    position: relative;
    width: 100%;
    height: 1px;
    background: var(--primary-300);
  }

  .progress-played {
    position: absolute;
    top: 0;
    left: 0;
    height: 1px;
    background: var(--primary-600);
    transition: width 0.1s ease;
  }

  .progress-remaining {
    position: absolute;
    top: 0;
    right: 0;
    height: 1px;
    background: var(--primary-300);
    width: 100%;
    z-index: -1;
  }

  .progress-input {
    position: absolute;
    top: -3.5px;
    left: 0;
    width: 100%;
    height: 8px;
    background: transparent;
    cursor: pointer;
    -webkit-appearance: none;
    appearance: none;
    outline: none;
    margin: 0;
    padding: 0;
  }

  .progress-input::-webkit-slider-thumb {
    appearance: none;
    width: 0;
    height: 0;
    background: transparent;
    cursor: pointer;
    border: none;
  }

  .progress-input::-moz-range-thumb {
    width: 0;
    height: 0;
    background: transparent;
    cursor: pointer;
    border: none;
    appearance: none;
  }

  .progress-input::-webkit-slider-track {
    height: 8px;
    background: transparent;
  }

  .progress-input::-moz-range-track {
    height: 8px;
    background: transparent;
    border: none;
  }

  .skip-to-live {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    background: transparent;
    border: 0;
    outline: none;
    cursor: pointer;
  }

  .skip-to-live:focus-visible {
    outline: 2px solid var(--primary-500);
  }

  .time-display {
    font-size: 12px;
    font-weight: 500;
    color: var(--white, #fff);
    min-width: 10ch;
    font-variant-numeric: tabular-nums;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: right;
  }

  .separator {
    margin: 0;
  }

  .show-info {
    grid-area: show-info;
  }

  .current-show {
    color: var(--white, #fff);
    font-weight: 500;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .next-show {
    color: var(--white, #fff);
    font-size: 0.9rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    opacity: 0.8;
  }

  .volume-control {
    grid-area: volume;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 8px;
    position: relative;
  }

  .volume-btn {
    outline: 0;
    border: 0;
    background-color: transparent;
    padding: 0;
    cursor: pointer;
    aspect-ratio: 1;
    width: 16px;
  }

  .volume-slider {
    appearance: none;
    width: 80px;
    height: 2px;
    background: var(--primary-200);
    outline: none;
    cursor: pointer;
  }

  /* WebKit browsers (Chrome, Safari, Edge) */
  .volume-slider::-webkit-slider-track {
    width: 100%;
    height: 2px;
    cursor: pointer;
    background: var(--primary-200);
    border: none;
  }

  .volume-slider::-webkit-slider-thumb {
    appearance: none;
    height: 8px;
    width: 8px;
    border-radius: 50%;
    background: var(--dark);
    cursor: pointer;
    border: 0;
  }

  .volume-slider::-webkit-slider-thumb:hover {
    background: var(--primary-700);
    transform: scale(1.1);
  }

  /* Firefox */
  .volume-slider::-moz-range-track {
    width: 100%;
    height: 2px;
    cursor: pointer;
    background: var(--primary-400);
    border-radius: 4px;
    border: none;
  }

  .volume-slider::-moz-range-thumb {
    height: 8px;
    width: 8px;
    border-radius: 50%;
    background: white;
    cursor: pointer;
    border: 0;
  }

  .volume-slider::-moz-range-thumb:hover {
    transform: scale(1.2);
  }

  /* Focus styles for accessibility */
  .volume-slider:focus-visible {
    outline: 2px solid var(--primary-500);
    outline-offset: 2px;
    transform: scale(1.2);
  }

  .volume-slider:focus-visible::-webkit-slider-thumb {
    outline: 2px solid var(--primary-500);
    outline-offset: 1px;
    transform: scale(1.2);
  }
</style>
