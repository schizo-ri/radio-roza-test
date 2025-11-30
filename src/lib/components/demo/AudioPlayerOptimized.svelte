<!-- Optimized Audio Player with intelligent manifest update handling -->
<script>
  import { onMount, onDestroy } from 'svelte';
  import { browser } from '$app/environment';

  // Component props
  let {
    streamUrl = 'https://radio-roza.org/stream/dash/live.mpd',
    fallbackUrl = 'https://stream.radio-roza.org/live.mp3',
    autoPlay = false,
    showProgress = true,
    enableManifestOptimization = true,
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

  // Manifest optimization state
  let manifestUpdates = $state(0);
  let lastManifestUpdate = $state(null);
  let streamType = $state('unknown');
  let updateInterval = $state(null);
  let manifestSize = $state(0);

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
      console.log('🎵 Initializing optimized audio player with:', streamUrl);

      // First, analyze the manifest to determine optimization strategy
      await analyzeManifest();

      const dashjs = await import('dashjs');
      dash = dashjs.MediaPlayer().create();

      // Configure with stream-specific optimizations
      const settings = getOptimizedSettings();
      dash.updateSettings(settings);

      setupEventListeners(dashjs);

      // Initialize stream
      dash.initialize(player, streamUrl, autoPlay);

      console.log('✅ Dash.js initialized with optimized settings');
      console.log('📊 Stream type:', streamType);
      console.log('⚙️ Manifest optimization:', enableManifestOptimization ? 'enabled' : 'disabled');
    } catch (error) {
      console.error('❌ Failed to initialize player:', error);
      handleError(error.message || 'Failed to initialize player');
      fallbackToMp3();
    }
  }

  async function analyzeManifest() {
    try {
      console.log('🔍 Analyzing manifest for optimization...');

      const response = await fetch(streamUrl);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const manifestText = await response.text();
      manifestSize = manifestText.length;

      // Parse manifest to detect stream characteristics
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(manifestText, 'text/xml');
      const mpd = xmlDoc.querySelector('MPD');

      if (!mpd) throw new Error('Invalid manifest format');

      // Determine stream type and characteristics
      const type = mpd.getAttribute('type') || 'static';
      const minimumUpdatePeriod = mpd.getAttribute('minimumUpdatePeriod');
      const timeShiftBufferDepth = mpd.getAttribute('timeShiftBufferDepth');

      streamType = type;

      if (type === 'dynamic') {
        console.log('📺 Live stream detected');
        console.log('🔄 Update period:', minimumUpdatePeriod);
        console.log('⏰ Time shift buffer:', timeShiftBufferDepth);

        // Parse update interval
        if (minimumUpdatePeriod) {
          const match = minimumUpdatePeriod.match(/PT(\d+)S/);
          if (match) {
            updateInterval = parseInt(match[1]) * 1000; // Convert to milliseconds
            console.log(`📡 Manifest will update every ${updateInterval / 1000}s`);
          }
        }
      } else {
        console.log('📄 VOD stream detected - single manifest download');
      }

      console.log('📏 Manifest size:', manifestSize, 'bytes');
    } catch (error) {
      console.warn('⚠️ Could not analyze manifest, using default settings:', error);
      streamType = 'unknown';
    }
  }

  function getOptimizedSettings() {
    const baseSettings = {
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
      },
      debug: {
        logLevel: 2, // WARN level
      },
    };

    // Apply optimizations based on stream type
    if (enableManifestOptimization) {
      if (streamType === 'dynamic') {
        // Live stream optimizations
        baseSettings.streaming.liveDelayFragmentCount = 3; // Stay 3 segments behind for stability
        baseSettings.streaming.manifestUpdateRetryInterval = Math.max(updateInterval || 5000, 3000);
        baseSettings.streaming.cacheLoadThresholds = {
          video: 50,
          audio: 5, // Keep manifest cache small for audio-only streams
        };

        // Reduce manifest update frequency if possible
        if (updateInterval && updateInterval < 5000) {
          console.log('⚡ Very frequent updates detected, enabling additional optimizations');
          baseSettings.streaming.scheduleWhilePaused = false;
          baseSettings.streaming.calcSegmentAvailabilityRangeFromTimeline = true;
        }
      } else {
        // VOD stream optimizations
        baseSettings.streaming.scheduleWhilePaused = true;
        baseSettings.streaming.cacheLoadThresholds = {
          video: 100,
          audio: 20, // Larger cache for VOD
        };
      }
    }

    return baseSettings;
  }

  function setupEventListeners(dashjs) {
    // Manifest update tracking
    dash.on(dashjs.MediaPlayer.events.MANIFEST_LOADING_STARTED, () => {
      console.log('📡 Manifest update started...', manifestUpdates + 1);
    });

    dash.on(dashjs.MediaPlayer.events.MANIFEST_LOADED, (e) => {
      manifestUpdates++;
      lastManifestUpdate = new Date();

      if (manifestUpdates === 1) {
        console.log('✅ Initial manifest loaded');
      } else {
        console.log(`✅ Manifest updated (${manifestUpdates} total)`);

        // Log update frequency for monitoring
        if (manifestUpdates % 10 === 0) {
          console.log(
            `📊 Manifest update stats: ${manifestUpdates} updates, ~${manifestSize} bytes each`
          );
        }
      }

      if (e.error) {
        console.error('❌ Manifest update error:', e.error);
      }
    });

    // Stream events
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

    // Network efficiency events
    dash.on(dashjs.MediaPlayer.events.FRAGMENT_LOADING_COMPLETED, (e) => {
      if (e.mediaType === 'audio' && manifestUpdates % 20 === 0) {
        console.log('📈 Network efficiency check - fragments loading normally');
      }
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
          streamType = 'mp3-fallback';
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
    manifestUpdates = 0;
    lastManifestUpdate = null;

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

  function getNetworkEfficiency() {
    if (streamType === 'mp3-fallback') return 'Fallback Mode';
    if (manifestUpdates === 0) return 'Initializing';

    const avgSizePerUpdate = manifestSize;
    const totalData = manifestUpdates * avgSizePerUpdate;

    if (totalData < 10000) return 'Excellent';
    if (totalData < 50000) return 'Good';
    if (totalData < 100000) return 'Fair';
    return 'Heavy';
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
        {isPlaying ? '⏸️' : '▶️'}
      </button>

      <div class="info">
        <div class="stream-info">
          <div class="stream-status">
            {#if canPlay}
              <span class="status-dot ready"></span>
              Ready ({bufferLevel.toFixed(1)}s buffered)
            {:else}
              <span class="status-dot loading"></span>
              Preparing...
            {/if}
          </div>

          <div class="stream-details">
            <span class="stream-type">{streamType}</span>
            {#if streamType === 'dynamic'}
              <span class="manifest-updates">Updates: {manifestUpdates}</span>
              <span class="network-efficiency">Efficiency: {getNetworkEfficiency()}</span>
            {/if}
          </div>
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
          {muted ? '🔇' : '🔊'}
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

  <!-- Debug Info (can be hidden in production) -->
  {#if streamType === 'dynamic' && manifestUpdates > 0}
    <div class="debug-info">
      <details>
        <summary>📊 Stream Statistics</summary>
        <div class="stats">
          <div class="stat">
            <span class="label">Stream Type:</span>
            <span class="value">{streamType}</span>
          </div>
          <div class="stat">
            <span class="label">Manifest Updates:</span>
            <span class="value">{manifestUpdates}</span>
          </div>
          {#if updateInterval}
            <div class="stat">
              <span class="label">Update Frequency:</span>
              <span class="value">{updateInterval / 1000}s</span>
            </div>
          {/if}
          <div class="stat">
            <span class="label">Manifest Size:</span>
            <span class="value">{manifestSize} bytes</span>
          </div>
          <div class="stat">
            <span class="label">Total Downloaded:</span>
            <span class="value">{((manifestUpdates * manifestSize) / 1024).toFixed(1)} KB</span>
          </div>
          {#if lastManifestUpdate}
            <div class="stat">
              <span class="label">Last Update:</span>
              <span class="value">{lastManifestUpdate.toLocaleTimeString()}</span>
            </div>
          {/if}
        </div>
      </details>
    </div>
  {/if}

  <!-- Hidden Audio Element -->
  <audio bind:this={player} preload="none" style="display: none;"></audio>
</div>

<style>
  .audio-player {
    max-width: 700px;
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

  .stream-info {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .stream-status {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.9rem;
    opacity: 0.9;
  }

  .stream-details {
    display: flex;
    gap: 1rem;
    font-size: 0.75rem;
    opacity: 0.8;
  }

  .stream-type {
    background: rgba(255, 255, 255, 0.2);
    padding: 0.125rem 0.5rem;
    border-radius: 4px;
    text-transform: uppercase;
    font-weight: bold;
  }

  .manifest-updates,
  .network-efficiency {
    background: rgba(255, 255, 255, 0.1);
    padding: 0.125rem 0.5rem;
    border-radius: 4px;
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

  .debug-info {
    margin-top: 1rem;
    padding: 1rem;
    background: rgba(0, 0, 0, 0.2);
    border-radius: 8px;
    font-size: 0.85rem;
  }

  .debug-info summary {
    cursor: pointer;
    font-weight: bold;
    margin-bottom: 0.5rem;
  }

  .stats {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.5rem;
    margin-top: 0.5rem;
  }

  .stat {
    display: flex;
    justify-content: space-between;
    padding: 0.25rem 0;
  }

  .label {
    opacity: 0.8;
  }

  .value {
    font-weight: bold;
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

    .stream-details {
      flex-direction: column;
      gap: 0.25rem;
    }

    .stats {
      grid-template-columns: 1fr;
    }
  }
</style>
