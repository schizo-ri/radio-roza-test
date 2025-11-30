<!-- Live Radio Player - Optimized for dynamic MPD with timeShiftBufferDepth limits -->
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

  // Live stream specific state
  let streamType = $state('unknown');
  let maxAvailableBuffer = $state(20);
  let isLiveStream = $state(false);
  let connectionAttempts = $state(0);

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
      console.log('🎵 Initializing Live Radio Player...');
      connectionAttempts++;

      // First analyze the manifest to understand the stream
      await analyzeManifest();

      const dashjs = await import('dashjs');
      dash = dashjs.MediaPlayer().create();

      // Configure specifically for live radio streams
      const settings = getLiveOptimizedSettings();

      try {
        dash.updateSettings(settings);
        console.log('✅ Live-optimized settings applied');
      } catch (settingsError) {
        console.warn('⚠️ Some settings not supported, using minimal config');
        // Just use basic settings if advanced ones fail
        dash.updateSettings({
          debug: { logLevel: 2 },
        });
      }

      setupEventListeners(dashjs);

      // Initialize stream
      dash.initialize(player, streamUrl, false);

      console.log('✅ Live Radio Player initialized');
    } catch (error) {
      console.error('❌ Failed to initialize live radio player:', error);
      handleError(error.message || 'Failed to initialize player');

      // Try fallback after short delay
      setTimeout(() => {
        fallbackToMp3();
      }, 1000);
    }
  }

  async function analyzeManifest() {
    try {
      const response = await fetch(streamUrl);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const manifestText = await response.text();
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(manifestText, 'text/xml');
      const mpd = xmlDoc.querySelector('MPD');

      if (!mpd) throw new Error('Invalid manifest');

      streamType = mpd.getAttribute('type') || 'static';
      isLiveStream = streamType === 'dynamic';

      if (isLiveStream) {
        const timeShiftBuffer = mpd.getAttribute('timeShiftBufferDepth');
        if (timeShiftBuffer) {
          const match = timeShiftBuffer.match(/PT([\d.]+)S/);
          if (match) {
            maxAvailableBuffer = Math.floor(parseFloat(match[1]) * 0.8); // Use 80% of available
            console.log(`📡 Live stream detected - max buffer: ${maxAvailableBuffer}s`);
          }
        }
      }
    } catch (error) {
      console.warn('Could not analyze manifest:', error);
      // Assume live stream with conservative buffer
      isLiveStream = true;
      maxAvailableBuffer = 15;
    }
  }

  function getLiveOptimizedSettings() {
    if (isLiveStream) {
      // Settings optimized for dynamic MPD live streams
      return {
        streaming: {
          buffer: {
            stableBufferTime: Math.min(5, maxAvailableBuffer * 0.3),
            bufferToKeep: Math.min(10, maxAvailableBuffer * 0.6),
          },
          gaps: {
            jumpGaps: true,
            jumpLargeGaps: true,
            smallGapLimit: 1,
          },
          abr: {
            autoSwitchBitrate: {
              audio: true,
            },
            maxBitrate: {
              audio: 128000,
            },
          },
        },
        debug: { logLevel: 2 },
      };
    } else {
      // Settings for VOD streams
      return {
        streaming: {
          buffer: {
            stableBufferTime: 15,
            bufferToKeep: 30,
          },
        },
        debug: { logLevel: 2 },
      };
    }
  }

  function setupEventListeners(dashjs) {
    // Stream initialization
    dash.on(dashjs.MediaPlayer.events.STREAM_INITIALIZED, () => {
      console.log('✅ Live stream initialized');
      isBuffering = true;
      startBufferMonitoring();
    });

    // Buffer events
    dash.on(dashjs.MediaPlayer.events.CAN_PLAY, () => {
      console.log('✅ Stream ready for playback');
      canPlay = true;
      isBuffering = false;
    });

    dash.on(dashjs.MediaPlayer.events.BUFFER_LEVEL_UPDATED, () => {
      updateBufferStatus();
    });

    // Playback events
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

    // Error handling
    dash.on(dashjs.MediaPlayer.events.ERROR, (e) => {
      console.error('❌ Dash error:', e.error);
      handleError(e.error?.message || 'Live stream error');

      // Auto-fallback to MP3 for live streams
      if (isLiveStream) {
        setTimeout(() => fallbackToMp3(), 2000);
      }
    });

    // HTML5 audio events
    player.addEventListener('loadedmetadata', () => {
      duration = player.duration;
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
      if (!canPlay) {
        console.log('✅ HTML5 audio ready');
        canPlay = true;
        isBuffering = false;
      }
    });

    player.addEventListener('waiting', () => {
      isBuffering = true;
    });

    player.addEventListener('error', (e) => {
      console.error('❌ HTML5 audio error:', e);
      handleError('Audio playback error');
    });
  }

  function startBufferMonitoring() {
    const checkBuffer = () => {
      if (dash && !hasError) {
        updateBufferStatus();
        setTimeout(checkBuffer, 500); // Check more frequently for live streams
      }
    };
    checkBuffer();
  }

  function updateBufferStatus() {
    if (!dash) return;

    try {
      const audioBuffer = dash.getBufferLength('audio');
      bufferLevel = isNaN(audioBuffer) ? 0 : audioBuffer;

      // For live streams, be very lenient with buffer requirements
      if (isLiveStream) {
        if (bufferLevel >= 2) {
          canPlay = true;
          isBuffering = false;
          if (!canPlay) {
            console.log(`✅ Live stream buffer ready: ${bufferLevel.toFixed(1)}s`);
          }
        } else if (bufferLevel >= 1) {
          canPlay = true;
          isBuffering = false;
          console.log(`⚡ Minimal live buffer: ${bufferLevel.toFixed(1)}s - starting anyway`);
        }
      } else {
        // VOD streams can afford to wait for more buffer
        if (bufferLevel >= 5) {
          canPlay = true;
          isBuffering = false;
        }
      }
    } catch (error) {
      console.warn('Buffer check failed:', error);
      // If buffer checks fail, just allow playback after a timeout
      if (!canPlay) {
        setTimeout(() => {
          canPlay = true;
          isBuffering = false;
          console.log('⚡ Buffer checks failed - allowing playback anyway');
        }, 3000);
      }
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
      streamType = 'mp3-fallback';
      player.src = fallbackUrl;
      player.load();

      const onCanPlay = () => {
        console.log('✅ MP3 fallback ready');
        canPlay = true;
        isBuffering = false;
        hasError = false;
        player.removeEventListener('canplay', onCanPlay);
      };

      const onError = (e) => {
        console.error('❌ MP3 fallback also failed:', e);
        handleError('Both DASH and MP3 streams failed');
        player.removeEventListener('error', onError);
      };

      player.addEventListener('canplay', onCanPlay);
      player.addEventListener('error', onError);

      // Set timeout to force ready state if needed
      setTimeout(() => {
        if (!canPlay) {
          canPlay = true;
          isBuffering = false;
          console.log('⚡ Forcing MP3 ready state');
        }
      }, 2000);
    }
  }

  function handleError(message) {
    hasError = true;
    errorMessage = message;
    isBuffering = false;
    console.error('❌ Live radio error:', message);
  }

  async function play() {
    if (!player) return;

    try {
      await player.play();
    } catch (error) {
      console.error('Play failed:', error);

      // For live streams, try fallback immediately
      if (isLiveStream) {
        fallbackToMp3();
      } else {
        handleError('Playback failed');
      }
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
    bufferLevel = 0;

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

  function getStreamTypeIcon() {
    switch (streamType) {
      case 'dynamic':
        return '📡';
      case 'static':
        return '📄';
      case 'mp3-fallback':
        return '🎵';
      default:
        return '❓';
    }
  }

  function getStreamTypeName() {
    switch (streamType) {
      case 'dynamic':
        return 'Live Stream';
      case 'static':
        return 'On-Demand';
      case 'mp3-fallback':
        return 'MP3 Fallback';
      default:
        return 'Detecting...';
    }
  }
</script>

<div class="live-radio-player">
  <!-- Error State -->
  {#if hasError}
    <div class="error-panel">
      <div class="error-icon">📻</div>
      <h3>Connection Error</h3>
      <p class="error-text">{errorMessage}</p>
      <div class="error-actions">
        <button class="retry-btn" onclick={retry}>Retry Connection</button>
        <button class="fallback-btn" onclick={fallbackToMp3}>Try MP3 Stream</button>
      </div>
    </div>
  {/if}

  <!-- Loading State -->
  {#if isBuffering && !canPlay && !hasError}
    <div class="loading-panel">
      <div class="spinner"></div>
      <h3>🎵 Connecting to Radio Roža</h3>
      <p>Establishing connection to live stream...</p>

      <div class="stream-info">
        <span class="stream-type">
          {getStreamTypeIcon()}
          {getStreamTypeName()}
        </span>
        {#if bufferLevel > 0}
          <span class="buffer-info">{bufferLevel.toFixed(1)}s buffered</span>
        {/if}
      </div>

      {#if connectionAttempts > 1}
        <p class="retry-info">Attempt #{connectionAttempts}</p>
      {/if}

      <!-- Show manual play option after a few seconds -->
      {#if canPlay || bufferLevel >= 1}
        <button class="manual-play-btn" onclick={play}> ▶️ Start Playing Now </button>
      {/if}
    </div>
  {/if}

  <!-- Main Player -->
  {#if !hasError && canPlay}
    <div class="player-interface">
      <!-- Main Play Button -->
      <button class="main-play-btn {isPlaying ? 'playing' : 'paused'}" onclick={togglePlay}>
        {#if isBuffering}
          <div class="play-spinner"></div>
        {:else if isPlaying}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <rect x="6" y="4" width="4" height="16" />
            <rect x="14" y="4" width="4" height="16" />
          </svg>
        {:else}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="9,4 9,20 21,12" />
          </svg>
        {/if}
      </button>

      <!-- Radio Info -->
      <div class="radio-info">
        <h2 class="station-name">Radio Roža</h2>
        <div class="stream-status">
          <span class="status-indicator {isLiveStream ? 'live' : 'vod'}">
            {getStreamTypeIcon()}
            {getStreamTypeName()}
          </span>
          {#if bufferLevel > 0}
            <span class="buffer-status">{bufferLevel.toFixed(1)}s buffered</span>
          {/if}
        </div>
      </div>

      <!-- Volume Control -->
      <div class="volume-section">
        <button class="volume-btn" onclick={toggleMute}>
          {#if muted}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"
              />
              <path d="m22 12-4-4v3H9v2h9v3l4-4z" />
            </svg>
          {:else}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"
              />
            </svg>
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

    <!-- Progress Bar (for non-live content) -->
    {#if showProgress && duration > 0 && !isLiveStream}
      <div class="progress-section">
        <span class="time">{formatTime(currentTime)}</span>
        <div class="progress-bar">
          <div class="progress-fill" style="width: {(currentTime / duration) * 100}%"></div>
        </div>
        <span class="time">{formatTime(duration)}</span>
      </div>
    {/if}
  {/if}

  <!-- Hidden Audio Element -->
  <audio bind:this={player} preload="none" style="display: none;"></audio>
</div>

<style>
  .live-radio-player {
    max-width: 500px;
    margin: 0 auto;
    padding: 2rem;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 20px;
    color: white;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
    text-align: center;
  }

  /* Error Panel */
  .error-panel {
    padding: 2rem;
  }

  .error-icon {
    font-size: 4rem;
    margin-bottom: 1rem;
  }

  .error-panel h3 {
    margin: 0 0 1rem 0;
    font-size: 1.5rem;
  }

  .error-text {
    margin: 0 0 2rem 0;
    opacity: 0.9;
  }

  .error-actions {
    display: flex;
    gap: 1rem;
    justify-content: center;
  }

  .retry-btn,
  .fallback-btn {
    padding: 0.75rem 1.5rem;
    border-radius: 8px;
    border: none;
    cursor: pointer;
    font-weight: 600;
    transition: all 0.3s ease;
  }

  .retry-btn {
    background: rgba(255, 255, 255, 0.2);
    color: white;
  }

  .fallback-btn {
    background: rgba(255, 255, 255, 0.9);
    color: #667eea;
  }

  .retry-btn:hover,
  .fallback-btn:hover {
    transform: translateY(-2px);
  }

  /* Loading Panel */
  .loading-panel {
    padding: 3rem 2rem;
  }

  .spinner {
    width: 60px;
    height: 60px;
    border: 4px solid rgba(255, 255, 255, 0.2);
    border-top: 4px solid white;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin: 0 auto 2rem auto;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  .loading-panel h3 {
    margin: 0 0 1rem 0;
    font-size: 1.5rem;
  }

  .loading-panel p {
    margin: 0 0 2rem 0;
    opacity: 0.9;
  }

  .stream-info {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin: 1rem 0;
  }

  .stream-type {
    background: rgba(255, 255, 255, 0.2);
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-size: 0.9rem;
  }

  .buffer-info {
    font-size: 0.8rem;
    opacity: 0.8;
  }

  .retry-info {
    font-size: 0.8rem;
    opacity: 0.7;
    margin: 1rem 0 0 0;
  }

  .manual-play-btn {
    background: rgba(255, 255, 255, 0.15);
    color: white;
    border: 2px solid rgba(255, 255, 255, 0.3);
    padding: 1rem 2rem;
    border-radius: 12px;
    cursor: pointer;
    font-size: 1.1rem;
    font-weight: 600;
    margin-top: 2rem;
    transition: all 0.3s ease;
  }

  .manual-play-btn:hover {
    background: rgba(255, 255, 255, 0.25);
    transform: translateY(-2px);
  }

  /* Player Interface */
  .player-interface {
    display: flex;
    align-items: center;
    gap: 2rem;
    padding: 2rem 0;
  }

  .main-play-btn {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    border: none;
    background: rgba(255, 255, 255, 0.95);
    color: #667eea;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }

  .main-play-btn:hover {
    background: white;
    transform: scale(1.05);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
  }

  .play-spinner {
    width: 24px;
    height: 24px;
    border: 2px solid rgba(102, 126, 234, 0.3);
    border-top: 2px solid #667eea;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  .radio-info {
    flex: 1;
    text-align: left;
  }

  .station-name {
    margin: 0 0 0.5rem 0;
    font-size: 1.8rem;
    font-weight: 800;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  }

  .stream-status {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .status-indicator {
    font-size: 0.9rem;
    opacity: 0.9;
  }

  .status-indicator.live {
    color: #4ade80;
  }

  .status-indicator.vod {
    color: #fbbf24;
  }

  .buffer-status {
    font-size: 0.8rem;
    opacity: 0.7;
  }

  .volume-section {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .volume-btn {
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    padding: 0.5rem;
    border-radius: 6px;
    transition: background 0.3s ease;
  }

  .volume-btn:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  .volume-slider {
    width: 100px;
    height: 6px;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 3px;
    outline: none;
    cursor: pointer;
    -webkit-appearance: none;
  }

  .volume-slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: white;
    cursor: pointer;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  }

  .volume-slider::-moz-range-thumb {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: white;
    cursor: pointer;
    border: none;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  }

  /* Progress Section */
  .progress-section {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 1px solid rgba(255, 255, 255, 0.2);
  }

  .time {
    font-size: 0.9rem;
    opacity: 0.8;
    min-width: 50px;
  }

  .progress-bar {
    flex: 1;
    height: 6px;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 3px;
    overflow: hidden;
  }

  .progress-fill {
    height: 100%;
    background: white;
    border-radius: 3px;
    transition: width 0.3s ease;
  }

  /* Mobile Responsive */
  @media (max-width: 480px) {
    .live-radio-player {
      padding: 1.5rem;
    }

    .player-interface {
      flex-direction: column;
      gap: 1.5rem;
      text-align: center;
    }

    .radio-info {
      text-align: center;
    }

    .station-name {
      font-size: 1.5rem;
    }

    .main-play-btn {
      width: 100px;
      height: 100px;
    }

    .error-actions {
      flex-direction: column;
    }

    .volume-section {
      justify-content: center;
    }
  }
</style>
