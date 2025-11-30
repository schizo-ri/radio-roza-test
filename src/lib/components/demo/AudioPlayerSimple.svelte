<!-- Simplified Audio Player with working Dash.js buffering -->
<script>
  import { onMount, onDestroy } from 'svelte';
  import { browser } from '$app/environment';

  // Component props
  let {
    streamUrl = 'https://radio-roza.org/stream/dash/live.mpd',
    fallbackUrl = 'https://stream.radio-roza.org/live.mp3',
    autoPlay = false,
    showProgress = true,
  } = $props();

  // Reactive state
  let player = $state();
  let dash = $state();
  let isPlaying = $state(false);
  let isBuffering = $state(true);
  let bufferLevel = $state(0);
  let canPlay = $state(false);
  let hasError = $state(false);
  let errorMessage = $state('');
  let currentTime = $state(0);
  let duration = $state(0);
  let volume = $state(1);
  let muted = $state(false);

  onMount(async () => {
    if (browser && player) {
      await initializePlayer();
    }
  });

  onDestroy(() => {
    cleanup();
  });

  async function initializePlayer() {
    try {
      console.log('🎵 Initializing audio player with:', streamUrl);

      const dashjs = await import('dashjs');
      dash = dashjs.MediaPlayer().create();

      // Configure with only supported settings
      dash.updateSettings({
        streaming: {
          buffer: {
            stableBufferTime: 10,
            bufferToKeep: 20,
          },
          gaps: {
            jumpGaps: true,
            jumpLargeGaps: true,
          },
          lowLatencyEnabled: false,
          // Live stream manifest update optimization
          manifestUpdateRetryInterval: 5000, // Wait 5s before retrying failed updates
          liveDelayFragmentCount: 2, // Stay 2 segments behind live edge for stability
          cacheLoadThresholds: {
            video: 50,
            audio: 5,
          },
        },
        debug: {
          logLevel: dashjs.Debug.LOG_LEVEL_WARN,
        },
      });

      setupEventListeners(dashjs);

      // Initialize stream
      dash.initialize(player, streamUrl, autoPlay);

      console.log('✅ Dash.js initialized');

      // Log manifest update frequency for debugging
      console.log('ℹ️ Live stream will update manifest every 2 seconds (as specified in MPD)');
    } catch (error) {
      console.error('❌ Failed to initialize player:', error);
      handleError(error.message || 'Failed to initialize player');
      fallbackToMp3();
    }
  }

  function setupEventListeners(dashjs) {
    // Log manifest updates for debugging
    dash.on(dashjs.MediaPlayer.events.MANIFEST_LOADING_STARTED, () => {
      console.log('📡 Manifest update started...');
    });

    dash.on(dashjs.MediaPlayer.events.MANIFEST_LOADED, () => {
      console.log('✅ Manifest updated');
    });
    // Dash events
    dash.on(dashjs.MediaPlayer.events.STREAM_INITIALIZED, () => {
      console.log('✅ Stream initialized');
      isBuffering = false;
      canPlay = true;
      hasError = false;
    });

    dash.on(dashjs.MediaPlayer.events.CAN_PLAY, () => {
      console.log('✅ Can play - buffer ready');
      canPlay = true;
      isBuffering = false;
    });

    dash.on(dashjs.MediaPlayer.events.PLAYBACK_WAITING, () => {
      console.log('⏳ Buffering...');
      isBuffering = true;
    });

    dash.on(dashjs.MediaPlayer.events.PLAYBACK_PLAYING, () => {
      console.log('▶️ Playing');
      isBuffering = false;
      isPlaying = true;
    });

    dash.on(dashjs.MediaPlayer.events.PLAYBACK_PAUSED, () => {
      console.log('⏸️ Paused');
      isPlaying = false;
    });

    dash.on(dashjs.MediaPlayer.events.ERROR, (e) => {
      console.error('❌ Dash error:', e.error);
      handleError(e.error?.message || 'Streaming error');
      fallbackToMp3();
    });

    // Monitor buffer levels
    dash.on(dashjs.MediaPlayer.events.BUFFER_LEVEL_UPDATED, () => {
      updateBufferStatus();
    });

    // HTML5 audio events
    player.addEventListener('loadedmetadata', () => {
      duration = player.duration;
      console.log('📄 Metadata loaded');
    });

    player.addEventListener('timeupdate', () => {
      currentTime = player.currentTime;
    });

    player.addEventListener('play', () => {
      isPlaying = true;
    });

    player.addEventListener('pause', () => {
      isPlaying = false;
    });

    player.addEventListener('volumechange', () => {
      volume = player.volume;
      muted = player.muted;
    });

    player.addEventListener('canplay', () => {
      console.log('✅ Player can play');
      canPlay = true;
      isBuffering = false;
    });

    player.addEventListener('waiting', () => {
      isBuffering = true;
    });

    player.addEventListener('error', (e) => {
      console.error('❌ Audio element error:', e);
      handleError('Audio playback error');
    });
  }

  function updateBufferStatus() {
    if (!dash) return;

    try {
      const audioBuffer = dash.getBufferLength('audio');
      bufferLevel = isNaN(audioBuffer) ? 0 : audioBuffer;

      if (bufferLevel > 3 && !canPlay) {
        canPlay = true;
        isBuffering = false;
        console.log(`✅ Buffer ready: ${bufferLevel.toFixed(1)}s`);
      }
    } catch (error) {
      console.warn('Buffer check failed:', error);
    }
  }

  function fallbackToMp3() {
    console.log('🔄 Falling back to MP3 stream');

    if (dash) {
      try {
        dash.destroy();
      } catch (e) {
        console.warn('Error destroying dash:', e);
      }
      dash = null;
    }

    if (player) {
      player.src = fallbackUrl;
      player.load();

      player.addEventListener(
        'canplay',
        () => {
          console.log('✅ MP3 fallback ready');
          canPlay = true;
          isBuffering = false;
          hasError = false;
        },
        { once: true }
      );
    }
  }

  function handleError(message) {
    hasError = true;
    errorMessage = message;
    isBuffering = false;
    console.error('❌ Player error:', message);
  }

  async function play() {
    if (!player) return;

    try {
      await player.play();
    } catch (error) {
      console.error('Play failed:', error);
      handleError('Playback failed');
    }
  }

  function pause() {
    if (player && !player.paused) {
      player.pause();
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
    if (player) {
      player.volume = Math.max(0, Math.min(1, newVolume));
    }
  }

  function toggleMute() {
    if (player) {
      player.muted = !player.muted;
    }
  }

  function retry() {
    hasError = false;
    errorMessage = '';
    isBuffering = true;
    canPlay = false;

    cleanup();

    setTimeout(() => {
      initializePlayer();
    }, 500);
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

  function formatTime(seconds) {
    if (!seconds || isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }
</script>

<div class="audio-player">
  <!-- Error State -->
  {#if hasError}
    <div class="error-panel">
      <div class="error-icon">⚠️</div>
      <p class="error-text">{errorMessage}</p>
      <button class="retry-btn" onclick={retry}>Try Again</button>
    </div>
  {/if}

  <!-- Buffering State -->
  {#if isBuffering && !hasError}
    <div class="loading-panel">
      <div class="spinner"></div>
      <p>Loading stream...</p>
      {#if bufferLevel > 0}
        <small>{bufferLevel.toFixed(1)}s buffered</small>
      {/if}
    </div>
  {/if}

  <!-- Main Controls -->
  {#if !hasError && !isBuffering}
    <div class="controls">
      <button
        class="play-btn {canPlay ? 'ready' : 'disabled'}"
        onclick={togglePlay}
        disabled={!canPlay}
      >
        {#if isPlaying}
          <img src="/icons/pause.svg" alt="Pause" />
        {:else}
          <img src="/icons/play.svg" alt="Play" />
        {/if}
      </button>

      <div class="info">
        <div class="stream-status">
          {#if canPlay}
            <span class="status-dot ready"></span>
            Ready ({bufferLevel.toFixed(1)}s buffered)
          {:else}
            <span class="status-dot loading"></span>
            Preparing...
          {/if}
        </div>

        {#if showProgress && duration > 0}
          <div class="progress">
            <span class="time">{formatTime(currentTime)}</span>
            <div class="progress-bar">
              <div class="progress-fill" style="width: {(currentTime / duration) * 100}%"></div>
            </div>
            <span class="time">{formatTime(duration)}</span>
          </div>
        {/if}
      </div>

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
  {/if}

  <!-- Hidden Audio Element -->
  <audio
    bind:this={player}
    preload="none"
    style="position: fixed; left: -100vw; width: 1px; height: 1px; visibility: hidden;"
  ></audio>
</div>

<style>
  .audio-player {
    max-width: 600px;
    margin: 0 auto;
    padding: 1.5rem;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 12px;
    color: white;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  }

  .error-panel,
  .loading-panel {
    text-align: center;
    padding: 2rem;
  }

  .error-icon {
    font-size: 2rem;
    margin-bottom: 1rem;
  }

  .error-text {
    margin: 0 0 1rem 0;
    opacity: 0.9;
  }

  .retry-btn {
    background: rgba(255, 255, 255, 0.2);
    color: white;
    border: 1px solid rgba(255, 255, 255, 0.3);
    padding: 0.75rem 1.5rem;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .retry-btn:hover {
    background: rgba(255, 255, 255, 0.3);
  }

  .spinner {
    width: 40px;
    height: 40px;
    border: 3px solid rgba(255, 255, 255, 0.3);
    border-top: 3px solid white;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin: 0 auto 1rem auto;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  .controls {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .play-btn {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    border: none;
    background: rgba(255, 255, 255, 0.9);
    color: #667eea;
    font-size: 1.5rem;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .play-btn.ready:hover {
    background: white;
    transform: scale(1.05);
  }

  .play-btn.disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .info {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .stream-status {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.9rem;
    opacity: 0.9;
  }

  .status-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    animation: pulse 2s infinite;
  }

  .status-dot.ready {
    background: #4ade80;
  }

  .status-dot.loading {
    background: #fbbf24;
  }

  @keyframes pulse {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }

  .progress {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.8rem;
  }

  .time {
    min-width: 40px;
    text-align: center;
  }

  .progress-bar {
    flex: 1;
    height: 4px;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 2px;
    overflow: hidden;
  }

  .progress-fill {
    height: 100%;
    background: white;
    transition: width 0.3s ease;
  }

  .volume-controls {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .volume-btn {
    background: none;
    border: none;
    color: white;
    font-size: 1.1rem;
    cursor: pointer;
    padding: 0.5rem;
    border-radius: 4px;
    transition: background 0.3s ease;
  }

  .volume-btn:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  .volume-slider {
    width: 80px;
    height: 4px;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 2px;
    outline: none;
    cursor: pointer;
    -webkit-appearance: none;
  }

  .volume-slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: white;
    cursor: pointer;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }

  .volume-slider::-moz-range-thumb {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: white;
    cursor: pointer;
    border: none;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 480px) {
    .audio-player {
      padding: 1rem;
    }

    .controls {
      flex-direction: column;
      gap: 1rem;
    }

    .volume-controls {
      align-self: stretch;
      justify-content: center;
    }

    .play-btn {
      width: 80px;
      height: 80px;
    }
  }
</style>
