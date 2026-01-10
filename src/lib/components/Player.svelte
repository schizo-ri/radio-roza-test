<script>
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';
  import Hls from 'hls.js';
  import SpinningVinyl from './SpinningVinyl.svelte';
  import Wrapper from '$lib/components/Wrapper.svelte';
  // temporary solution until we have a better way to handle program
  import { getCurrentShow, getNextShow } from '$lib/utils/program';
  import { getAlbumArt } from '$lib/utils/artwork';

  const src = 'https://radio.radio-roza.org/hls/radioroza/live.m3u8';
  let { autoplay = false, fullsize = false, class: className = '', ...props } = $props();

  let showStickyPlayer = $state(false);
  let mainPlayerElement;

  let audioElement = $state();
  let hls = $state();
  let isPlaying = $state(false);
  let userInteracted = $state(false);
  let currentTime = $state(0);
  let duration = $state(0);
  let volume = $state(1);
  let muted = $state(false);
  let loading = $state(false);
  let error = $state(null);

  // Add a reactive time variable that updates every minute
  let currentTimeForShows = $state(new Date());

  let currentShow = $state(getCurrentShow());
  let nextShow = $state(getNextShow());

  // React to time changes and update shows
  $effect(() => {
    // This will run whenever currentTimeForShows changes
    currentTimeForShows; // Access the reactive variable to trigger the effect
    currentShow = getCurrentShow();
    nextShow = getNextShow();
  });

  // Intersection Observer za detekciju kada glavni player izlazi iz viewport-a
  $effect(() => {
    if (typeof window !== 'undefined' && mainPlayerElement) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            // Pokazuj sticky player kada glavni izađe iz viewport-a
            showStickyPlayer = !entry.isIntersecting;
          });
        },
        {
          rootMargin: '0px 0px -100px 0px', // Trigger malo prije nego što potpuno izađe
        }
      );

      observer.observe(mainPlayerElement);

      return () => observer.disconnect();
    }
  });

  let nowPlayingInterval = $state(null);
  let nowPlaying = $state({
    artist: 'Radio Roza',
    title: 'Live Stream',
    album: 'Radio Roza Live Stream',
    genre: 'Radio',
    art: '/images/popi_cover_edit.png',
    text: 'Radio Roža - Live Stream',
  });

  // Helper function to get the best artwork size for the context
  function getArtworkSrc(size = 'medium') {
    // First check if we have structured artwork from getAlbumArt
    if (nowPlaying.artwork) {
      switch (size) {
        case 'thumbnail':
          return nowPlaying.artwork.thumbnail;
        case 'medium':
          return nowPlaying.artwork.medium || nowPlaying.artwork.thumbnail;
        case 'large':
          return (
            nowPlaying.artwork.large || nowPlaying.artwork.medium || nowPlaying.artwork.thumbnail
          );
        default:
          return nowPlaying.artwork.medium || nowPlaying.artwork.thumbnail;
      }
    }

    // Fallback to old art field with default replacement
    const art = nowPlaying.art;

    return art;
  }

  function updateMediaSessionMetadata() {
    if (!nowPlaying.title || !nowPlaying.artist) return;

    const thumbnailSrc = getArtworkSrc('thumbnail');
    const mediumSrc = getArtworkSrc('medium');
    const largeSrc = getArtworkSrc('large');

    const getMimeType = (src) => (src.endsWith('.png') ? 'image/png' : 'image/jpeg');

    try {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: nowPlaying.title,
        artist: nowPlaying.artist,
        album: nowPlaying.album,
        artwork: [
          { src: thumbnailSrc, sizes: '96x96', type: getMimeType(thumbnailSrc) },
          { src: thumbnailSrc, sizes: '128x128', type: getMimeType(thumbnailSrc) },
          { src: mediumSrc, sizes: '192x192', type: getMimeType(mediumSrc) },
          { src: mediumSrc, sizes: '256x256', type: getMimeType(mediumSrc) },
          { src: largeSrc, sizes: '384x384', type: getMimeType(largeSrc) },
          { src: largeSrc, sizes: '512x512', type: getMimeType(largeSrc) },
        ],
      });
    } catch (error) {
      console.warn('MediaSession not supported or failed:', error);
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
      if (!userInteracted) {
        userInteracted = true;
        loading = true; // Show loading state during initial seek

        // For first-time play, seek to live edge seamlessly
        const seekAndPlay = () => {
          let targetTime = 0;

          try {
            if (duration > 0 && isFinite(duration)) {
              targetTime = Math.max(0, duration - 5);
            } else if (hls && typeof hls.liveSyncPosition !== 'undefined') {
              targetTime = Math.max(0, hls.liveSyncPosition - 5);
            } else {
              const buffered = audioElement.buffered;
              if (buffered.length > 0) {
                const bufferedEnd = buffered.end(buffered.length - 1);
                targetTime = Math.max(0, bufferedEnd - 5);
              }
            }

            if (targetTime > 0) {
              // Set time before any play attempt to avoid audio skip
              audioElement.currentTime = targetTime;
            }
          } catch (e) {
            console.warn('Failed to seek to live edge:', e);
          }

          // Clear loading state and start playback
          loading = false;
          audioElement.play().catch((e) => {
            console.error('Play failed:', e);
            error = 'Playback failed';
            loading = false;
          });
        };

        // Wait for enough data to be available before seeking and playing
        if (audioElement.readyState >= 3) {
          // HAVE_FUTURE_DATA - ready to seek and play
          setTimeout(seekAndPlay, 50); // Brief delay for smoother UX
        } else {
          // Wait for data to be ready
          const handleCanPlay = () => {
            audioElement.removeEventListener('canplay', handleCanPlay);
            // Small delay to ensure buffer stability
            setTimeout(seekAndPlay, 100);
          };
          audioElement.addEventListener('canplay', handleCanPlay);

          // Fallback timeout to prevent infinite loading
          setTimeout(() => {
            if (loading) {
              console.warn('Initial seek timeout, starting playback anyway');
              loading = false;
              audioElement.play().catch((e) => {
                console.error('Play failed:', e);
                error = 'Playback failed';
              });
            }
          }, 3000);
        }

        return; // Don't call play() immediately
      }

      // Normal playback for subsequent plays
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
      error = null;
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

  const ignore_artists = ['radio roža', 'radio roza', 'jingl'];

  const fetchNowPlaying = async () => {
    try {
      console.log('Fetching now playing...');
      const res = await fetch(nowPlayingFullUrl);
      const data = await res.json();

      if (!data?.now_playing?.song) {
        return;
      }

      const { artist, title, text, album, genre, art } = data.now_playing.song;

      // Update basic now playing info
      nowPlaying = { artist, title, text, album, genre, art };

      // Update album art using iTunes API
      if (artist && !ignore_artists.includes(artist.toLowerCase())) {
        const albumArt = await getAlbumArt(artist, title);
        nowPlaying.artwork = albumArt;
      }

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
      // if jingle skip change
      // we don't know if it is jingle or show for now, so skipping
      // we should check duration if available in future
      // if (ignore_artists.includes(data.split(' - ').at(0).toLowerCase())) {
      //   return;
      // }

      if (data !== nowPlaying.text) {
        fetchNowPlaying();
        updateMediaSessionMetadata();
      }
    } catch (error) {
      console.error('Error fetching now playing:', error);
    }
  };

  const skipToLive = () => {
    if (audioElement) {
      if (duration > 0 && isFinite(duration)) {
        audioElement.currentTime = Math.max(0, duration - 5);
      } else if (hls && typeof hls.liveSyncPosition !== 'undefined') {
        audioElement.currentTime = Math.max(0, hls.liveSyncPosition - 5);
      } else {
        // For live streams, use buffered range end
        const buffered = audioElement.buffered;
        if (buffered.length > 0) {
          const bufferedEnd = buffered.end(buffered.length - 1);
          audioElement.currentTime = Math.max(0, bufferedEnd - 5);
        } else {
          // Fallback: seek to a large value and let browser clamp it
          audioElement.currentTime = 99999;
        }
      }
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
              error = 'Došlo je do greške prilikom povezivanja. Pokušavam ponovno...';
              hls.startLoad();
              break;
            case Hls.ErrorTypes.MEDIA_ERROR:
              error = 'Došlo je do greške prilikom reprodukcije. Pokušavam ponovno...';
              hls.recoverMediaError();
              break;
            default:
              error = 'Došlo je do nepoznate greške. Probajte osvježiti stranicu.';
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

    const handleLoadedMetadata = () => {
      // Update duration when metadata is loaded (important for live streams)
      duration = audioElement.duration || 0;
    };

    const handleProgress = () => {
      // For live streams, duration might change as more content is loaded
      if (audioElement.duration && audioElement.duration !== duration) {
        duration = audioElement.duration;
      }
    };

    audioElement.addEventListener('timeupdate', updateTime);
    audioElement.addEventListener('play', updatePlayState);
    audioElement.addEventListener('pause', updatePlayState);
    audioElement.addEventListener('loadstart', handleLoadStart);
    audioElement.addEventListener('canplay', handleCanPlay);
    audioElement.addEventListener('loadedmetadata', handleLoadedMetadata);
    audioElement.addEventListener('progress', handleProgress);

    // Setup Media Session API
    setupMediaSessionHandlers();
    updateMediaSessionMetadata();
    // Fetch immediately
    fetchNowPlaying();

    // Then fetch every second
    nowPlayingInterval = setInterval(fetchNowPlayingSimple, 1000);

    // Update time every minute to trigger show updates
    const timeUpdateInterval = setInterval(() => {
      currentTimeForShows = new Date();
    }, 60000); // Update every minute

    return () => {
      clearInterval(nowPlayingInterval);
      clearInterval(timeUpdateInterval);
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

<div class="player-container">
  <audio bind:this={audioElement} bind:volume bind:muted preload="none"></audio>
  <Wrapper>
    <div class="background-overlay" style="--album-art: url({getArtworkSrc('large')})"></div>
    <!-- Main Player -->
    <div class="audio-player {className}" class:fullsize bind:this={mainPlayerElement} {...props}>
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
        <img src={getArtworkSrc('medium')} alt={nowPlaying.title} width="200" height="200" />
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
          step="0.01"
          bind:value={volume}
          onchange={() => setVolume(volume)}
          aria-label="Volume"
        />
      </section>

      {#if error}
        <div class="error">
          <img src="/icons/warning-white.svg" alt="Error" />
          {error}
        </div>
      {/if}
    </div>

    <!-- Sticky Mini Player -->
    <div class="sticky-player" class:visible={showStickyPlayer}>
      <Wrapper>
        <div class="mini-grid">
          <div class="mini-content">
            <img
              class="mini-cover"
              src={getArtworkSrc('thumbnail')}
              alt={nowPlaying.title}
              width="40"
              height="40"
            />
            <button class="mini-play" onclick={togglePlay} disabled={loading}>
              {#if isPlaying}
                <img src="/icons/stop_fill_white.svg" alt="Stop" width="20" height="20" />
              {:else}
                <img src="/icons/play_fill_white.svg" alt="Play" width="24" height="24" />
              {/if}
            </button>
            <div class="mini-info">
              <div class="mini-title">{nowPlaying.title}</div>
              <div class="mini-artist">{nowPlaying.artist}</div>
            </div>
          </div>
          <section class="volume-control">
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
              step="0.01"
              bind:value={volume}
              onchange={() => setVolume(volume)}
              aria-label="Volume"
            />
          </section>
        </div>
      </Wrapper>
    </div>
  </Wrapper>
</div>

<style>
  .player-container {
    position: relative;
  }

  .audio-player {
    display: grid;
    grid-template-areas:
      'play now-playing now-playing'
      'play now-playing now-playing'
      'play progress progress'
      'show-info show-info show-info'
      'error error volume';
    grid-template-columns: 60px minmax(200px, 1fr) minmax(0, 120px);
    grid-template-rows: 25px 25px 12px 50px 25px;
    grid-column-gap: 16px;
    grid-row-gap: 8px;
    position: relative;
    overflow: hidden;
  }

  .background-overlay {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    background-image: var(--album-art);
    /*background-size: auto calc(100% - 60px);*/
    background-size: 100%;
    /*background-position: left 0 top 60px;*/
    background-repeat: no-repeat;
    z-index: -1;
  }

  .background-overlay::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      45deg,
      rgba(220, 38, 38, 0.8),
      rgba(185, 28, 28, 0.85) 20%,
      rgba(153, 27, 27, 0.9) 75%,
      rgba(127, 29, 29, 0.92) 90%,
      rgba(69, 10, 10, 0.95) 100%
    );
    z-index: 1;
  }

  .audio-player > *:not(.background-overlay) {
    position: relative;
    z-index: 2;
  }

  .error {
    grid-area: error;
    color: #fff;
    font-size: 12px;
    align-self: start;
    padding-top: 8px;
    display: flex;
    gap: 1ch;
    align-items: center;
  }

  .albumart {
    display: none;
  }

  .albumart img {
    border-radius: 4px;
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
    text-shadow: 2px 2px 4px var(--primary-800);
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
    text-shadow: 2px 2px 4px var(--primary-800);
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
    display: none;
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
    filter: drop-shadow(0px 0px 2px var(--primary-900));
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
    filter: drop-shadow(0px 0px 2px var(--primary-900));
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
    outline: 2px solid var(--primary-600);
    outline-offset: 2px;
  }

  /* Mini Player Styles */
  .sticky-player {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 999;
    background: var(--white, white);
    border-top: 1px solid #eee;
    box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.1);
    transform: translateY(100%);
    transition: transform 0.2s ease-out;
  }

  .sticky-player.visible {
    transform: translateY(0);
  }

  .mini-content {
    grid-area: content;
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0.75rem 0;
    max-height: 60px;
  }

  .mini-cover {
    width: 44px;
    height: 44px;
    border-radius: 4px;
    flex-shrink: 0;
    object-fit: cover;
  }

  /* Sakrij na malim ekranima */
  @media (max-width: 640px) {
    .mini-cover {
      display: none;
    }
  }

  .mini-info {
    flex: 1;
    min-width: 0; /* Za text truncation */
    min-height: 40px;
    display: flex;
    flex-direction: column;
  }

  .mini-title {
    font-weight: 800;
    line-height: 1.2;
    color: var(--dark);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin: 0;
    flex: 1;
  }

  .mini-artist {
    font-size: 0.9rem;
    line-height: 1.2;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin: 0;
    flex: 1;
  }

  .mini-play {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background: var(--primary-600);
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .mini-play:hover {
    background: var(--primary-700);
  }

  .mini-play:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }

  .mini-play > * {
    pointer-events: none;
  }

  @media (min-width: 768px) {
    .audio-player {
      grid-template-areas:
        'albumart play now-playing now-playing'
        'albumart play now-playing now-playing'
        'albumart play progress progress'
        'albumart show-info show-info show-info'
        'albumart error error volume';
      grid-template-columns: 200px 60px minmax(200px, 1fr) minmax(0, 120px);
      grid-template-rows: 25px 25px 12px 50px 56px;
    }

    .albumart {
      display: block;
      grid-area: albumart;
    }

    .background-overlay {
      background-image: none;
    }

    .mini-grid {
      display: grid;
      grid-template-areas: 'content volume';
      grid-template-columns: minmax(200px, 1fr) 120px;
    }

    .volume-control {
      display: flex;
    }
  }
</style>
