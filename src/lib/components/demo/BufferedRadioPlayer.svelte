<!-- Buffered Radio Player - Favors stability over low latency -->
<script>
  import { onMount, onDestroy } from 'svelte';
  import { browser } from '$app/environment';

  // Component props
  let {
    streamUrl = 'https://radio-roza.org/stream/dash/live.mpd',
    fallbackUrl = 'https://stream.radio-roza.org/live.mp3',
    autoPlay = false,
    showProgress = true,
    targetBuffer = 8, // Target 8 seconds of buffer (realistic for live streams)
    maxBuffer = 18, // Maximum 18 seconds (respects DASH timeShiftBufferDepth)
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
  let liveLatency = $state(0);

  // Buffer monitoring
  let bufferHealth = $state('building'); // building, healthy, low, critical
  let bufferPercentage = $state(0);

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
      console.log('🎵 Initializing buffered radio player with delayed strategy');
      console.log('🎯 Target buffer:', targetBuffer, 'seconds');

      const dashjs = await import('dashjs');
      dash = dashjs.MediaPlayer().create();

      // Configure for maximum stability over low latency - using only supported settings
      const settings = {
        streaming: {
          buffer: {
            stableBufferTime: Math.min(targetBuffer, 10),
            bufferToKeep: Math.min(maxBuffer, 15), // Must be less than timeShiftBufferDepth
            bufferPruningInterval: 20,
          },

          gaps: {
            jumpGaps: true,
            jumpLargeGaps: true,
            smallGapLimit: 1.5,
          },

          // Quality adaptation - more conservative for live
          abr: {
            autoSwitchBitrate: {
              audio: true,
            },
            maxBitrate: {
              audio: 96000, // Lower bitrate for better buffering
            },
          },

          // Minimal delay for live streams
          liveDelay: Math.min(targetBuffer, 8),
        },

        debug: {
          logLevel: 2, // WARN level
        },
      };

      // Apply settings with error handling for unsupported parameters
      try {
        dash.updateSettings(settings);
        console.log('✅ Buffer settings applied - targeting', targetBuffer + 's buffer');
      } catch (settingsError) {
        console.warn(
          '⚠️ Some settings not supported, trying minimal config:',
          settingsError.message
        );

        // Fallback to most basic settings
        try {
          dash.updateSettings({
            streaming: {
              buffer: {
                stableBufferTime: 5, // Very minimal for live streams
              },
              gaps: {
                jumpGaps: true,
              },
            },
            debug: { logLevel: 2 },
          });
          console.log('✅ Minimal buffer settings applied for live stream');
        } catch (fallbackError) {
          console.warn('⚠️ Using default Dash.js settings - this may work better for dynamic MPD');
        }
      }

      setupEventListeners(dashjs);

      // Initialize stream without autoplay to build buffer first
      dash.initialize(player, streamUrl, false);

      console.log('✅ Player initialized - building buffer before playback');
    } catch (error) {
      console.error('❌ Failed to initialize player:', error);
      handleError(error.message || 'Failed to initialize player');
      fallbackToMp3();
    }
  }

  function setupEventListeners(dashjs) {
    // Stream events
    dash.on(dashjs.MediaPlayer.events.STREAM_INITIALIZED, () => {
      console.log('✅ Stream initialized - starting buffer build');
      isBuffering = true;
      startBufferMonitoring();
    });

    dash.on(dashjs.MediaPlayer.events.CAN_PLAY, () => {
      console.log('✅ Basic playback capability ready');
    });

    dash.on(dashjs.MediaPlayer.events.PLAYBACK_WAITING, () => {
      console.log('⏳ Playback waiting - rebuilding buffer');
      isBuffering = true;
      bufferHealth = 'building';
    });

    dash.on(dashjs.MediaPlayer.events.PLAYBACK_PLAYING, () => {
      console.log('▶️ Playback started');
      isBuffering = false;
      isPlaying = true;
    });

    dash.on(dashjs.MediaPlayer.events.PLAYBACK_PAUSED, () => {
      console.log('⏸️ Playback paused');
      isPlaying = false;
    });

    dash.on(dashjs.MediaPlayer.events.ERROR, (e) => {
      console.error('❌ Dash error:', e.error);
      handleError(e.error?.message || 'Streaming error');
      fallbackToMp3();
    });

    // Buffer monitoring events
    dash.on(dashjs.MediaPlayer.events.BUFFER_LEVEL_UPDATED, () => {
      updateBufferStatus();
    });

    dash.on(dashjs.MediaPlayer.events.BUFFER_LOADED, (e) => {
      if (e.mediaType === 'audio') {
        console.log('📦 Audio buffer loaded');
        updateBufferStatus();
      }
    });

    // Manifest update tracking
    let manifestUpdates = 0;
    dash.on(dashjs.MediaPlayer.events.MANIFEST_LOADED, () => {
      manifestUpdates++;
      if (manifestUpdates % 30 === 0) {
        console.log('📊 Manifest updates:', manifestUpdates, '- Buffer strategy working');
      }
    });

    // HTML5 audio events
    player.addEventListener('loadedmetadata', () => {
      duration = player.duration;
      console.log('📄 Metadata loaded');
    });

    player.addEventListener('timeupdate', () => {
      currentTime = player.currentTime;
      calculateLiveLatency();
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
        console.log('✅ HTML5 audio ready for playback');
      }
    });

    player.addEventListener('waiting', () => {
      console.log('⏳ HTML5 audio waiting - buffer underrun');
      isBuffering = true;
      bufferHealth = 'critical';
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
        setTimeout(checkBuffer, 1000);
      }
    };
    checkBuffer();
  }

  function updateBufferStatus() {
    if (!dash) return;

    try {
      const audioBuffer = dash.getBufferLength('audio');
      bufferLevel = isNaN(audioBuffer) ? 0 : audioBuffer;
      bufferPercentage = Math.min((bufferLevel / targetBuffer) * 100, 100);

      // Very lenient buffer logic for dynamic MPD with limited timeShiftBufferDepth
      if (bufferLevel >= Math.min(targetBuffer, 8)) {
        bufferHealth = 'healthy';
        if (!canPlay) {
          canPlay = true;
          isBuffering = false;
          console.log(
            `🎯 Target buffer reached: ${bufferLevel.toFixed(1)}s - Ready for stable playback!`
          );
          // Auto-start playback if configured
          if (autoPlay && player && player.paused) {
            setTimeout(() => play(), 500);
          }
        }
      } else if (bufferLevel >= 4) {
        bufferHealth = 'good';
        canPlay = true;
        isBuffering = false;
        console.log(`✅ Good buffer level: ${bufferLevel.toFixed(1)}s - Ready to play`);
      } else if (bufferLevel >= 2) {
        bufferHealth = 'low';
        canPlay = true;
        isBuffering = false;
        console.log(`⚡ Low buffer but playable: ${bufferLevel.toFixed(1)}s`);
      } else if (bufferLevel >= 1) {
        bufferHealth = 'building';
        canPlay = true; // Allow play with just 1s minimum for live streams
        isBuffering = false;
        console.log(`⚡ Minimal buffer reached: ${bufferLevel.toFixed(1)}s - Allowing playback`);
      } else {
        bufferHealth = 'building';
        canPlay = false;
        isBuffering = true;
      }
    } catch (error) {
      console.warn('Buffer check failed:', error);
    }
  }

  function calculateLiveLatency() {
    if (dash && dash.isDynamic && dash.isDynamic()) {
      try {
        const liveEdge = dash.duration();
        if (liveEdge && currentTime) {
          liveLatency = liveEdge - currentTime;
        }
      } catch (error) {
        // Ignore - live latency calculation not critical
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
      player.src = fallbackUrl;
      player.load();

      // For MP3, we can't control buffering as much, but it's more reliable
      player.addEventListener(
        'canplay',
        () => {
          console.log('✅ MP3 fallback ready');
          canPlay = true;
          isBuffering = false;
          hasError = false;
          bufferHealth = 'healthy';
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
    bufferLevel = 0;
    bufferHealth = 'building';

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

  function getBufferHealthColor() {
    switch (bufferHealth) {
      case 'healthy':
        return '#10b981';
      case 'good':
        return '#22c55e';
      case 'low':
        return '#f59e0b';
      case 'building':
        return '#3b82f6';
      case 'critical':
        return '#ef4444';
      default:
        return '#6b7280';
    }
  }

  function getBufferHealthText() {
    switch (bufferHealth) {
      case 'healthy':
        return 'Excellent Buffer';
      case 'good':
        return 'Good Buffer';
      case 'low':
        return 'Low Buffer';
      case 'building':
        return 'Building Buffer';
      case 'critical':
        return 'Critical - Buffering';
      default:
        return 'Unknown';
    }
  }
</script>

<div class="radio-player">
  <!-- Error State -->
  {#if hasError}
    <div class="error-panel">
      <div class="error-icon">⚠️</div>
      <p class="error-text">{errorMessage}</p>
      <button class="retry-btn" onclick={retry}>Try Again</button>
    </div>
  {/if}

  <!-- Buffer Building State -->
  {#if (isBuffering || !canPlay) && !hasError}
    <div class="loading-panel">
      <div class="spinner"></div>
      <h3>Building Stable Buffer</h3>
      <p>Please wait while we build a {Math.min(targetBuffer, 8)}s buffer for smooth playback...</p>
      <small>Live streams have limited buffer capacity (~20s max)</small>

      {#if bufferLevel >= 1}
        <p class="early-play-hint">
          <button class="early-play-btn" onclick={play} disabled={!canPlay}>
            ▶️ Start Early ({bufferLevel.toFixed(1)}s buffered)
          </button>
        </p>
      {/if}

      <div class="buffer-progress">
        <div class="buffer-bar">
          <div
            class="buffer-fill"
            style="width: {bufferPercentage}%; background-color: {getBufferHealthColor()}"
          ></div>
        </div>
        <div class="buffer-stats">
          <span>{bufferLevel.toFixed(1)}s / {targetBuffer}s</span>
          <span>{Math.round(bufferPercentage)}%</span>
        </div>
      </div>

      <div class="buffer-strategy">
        <h4>🎯 Delayed Streaming Strategy</h4>
        <ul>
          <li>Building {Math.min(targetBuffer, 8)}s buffer to prevent interruptions</li>
          <li>Limited by live stream timeShiftBufferDepth (~20s max)</li>
          <li>Prioritizing smooth playback over real-time</li>
          <li>Will allow playback at 2-4s for live streams</li>
        </ul>
      </div>
    </div>
  {/if}

  <!-- Main Controls -->
  {#if !hasError && canPlay}
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
            <span class="status-dot" style="background-color: {getBufferHealthColor()}"></span>
            {getBufferHealthText()} ({bufferLevel.toFixed(1)}s)
          </div>

          <div class="latency-info">
            {#if liveLatency > 0}
              <span class="latency-badge">
                📡 {liveLatency.toFixed(1)}s behind live
              </span>
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

        <!-- Buffer Health Indicator -->
        <div class="buffer-indicator">
          <div class="buffer-bar-mini">
            <div
              class="buffer-fill-mini"
              style="width: {Math.min(
                (bufferLevel / maxBuffer) * 100,
                100
              )}%; background-color: {getBufferHealthColor()}"
            ></div>
          </div>
          <span class="buffer-text">{bufferLevel.toFixed(1)}s buffered</span>
        </div>
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

    <!-- Additional Info Panel -->
    <div class="info-panel">
      <details>
        <summary>📊 Buffer Statistics</summary>
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-label">Buffer Health</span>
            <span class="stat-value" style="color: {getBufferHealthColor()}"
              >{getBufferHealthText()}</span
            >
          </div>
          <div class="stat">
            <span class="stat-label">Current Buffer</span>
            <span class="stat-value">{bufferLevel.toFixed(1)}s</span>
          </div>
          <div class="stat">
            <span class="stat-label">Target Buffer</span>
            <span class="stat-value">{targetBuffer}s</span>
          </div>
          <div class="stat">
            <span class="stat-label">Max Buffer</span>
            <span class="stat-value">{maxBuffer}s</span>
          </div>
          {#if liveLatency > 0}
            <div class="stat">
              <span class="stat-label">Live Latency</span>
              <span class="stat-value">{liveLatency.toFixed(1)}s</span>
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
  .radio-player {
    max-width: 700px;
    margin: 0 auto;
    padding: 2rem;
    background: linear-gradient(135deg, #1e40af 0%, #7c3aed 100%);
    border-radius: 16px;
    color: white;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  }

  .error-panel,
  .loading-panel {
    text-align: center;
    padding: 2rem;
  }

  .error-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
  }

  .error-text {
    margin: 0 0 2rem 0;
    opacity: 0.9;
    font-size: 1.1rem;
  }

  .retry-btn {
    background: rgba(255, 255, 255, 0.2);
    color: white;
    border: 1px solid rgba(255, 255, 255, 0.3);
    padding: 1rem 2rem;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 1rem;
  }

  .retry-btn:hover {
    background: rgba(255, 255, 255, 0.3);
  }

  .loading-panel h3 {
    margin: 1rem 0;
    font-size: 1.5rem;
  }

  .loading-panel p {
    margin: 0 0 2rem 0;
    opacity: 0.9;
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

  .buffer-progress {
    margin: 2rem 0;
  }

  .buffer-bar {
    width: 100%;
    height: 12px;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 6px;
    overflow: hidden;
    margin-bottom: 0.5rem;
  }

  .buffer-fill {
    height: 100%;
    border-radius: 6px;
    transition: all 0.5s ease;
  }

  .buffer-stats {
    display: flex;
    justify-content: space-between;
    font-size: 0.9rem;
    opacity: 0.9;
  }

  .buffer-strategy {
    text-align: left;
    background: rgba(255, 255, 255, 0.1);
    padding: 1.5rem;
    border-radius: 8px;
    margin-top: 2rem;
  }

  .buffer-strategy h4 {
    margin: 0 0 1rem 0;
    color: #fbbf24;
  }

  .buffer-strategy ul {
    margin: 0;
    padding-left: 1.5rem;
    opacity: 0.9;
  }

  .buffer-strategy li {
    margin: 0.5rem 0;
  }

  .early-play-hint {
    margin: 1rem 0;
    padding: 1rem;
    background: rgba(34, 197, 94, 0.1);
    border-radius: 6px;
    border: 1px solid rgba(34, 197, 94, 0.3);
  }

  .early-play-btn {
    background: rgba(34, 197, 94, 0.2);
    color: white;
    border: 1px solid rgba(34, 197, 94, 0.5);
    padding: 0.75rem 1.5rem;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .early-play-btn:hover:not(:disabled) {
    background: rgba(34, 197, 94, 0.3);
  }

  .early-play-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .controls {
    display: flex;
    align-items: center;
    gap: 1.5rem;
  }

  .play-btn {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    border: none;
    background: rgba(255, 255, 255, 0.95);
    color: #1e40af;
    font-size: 2rem;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }

  .play-btn.ready:hover {
    background: white;
    transform: scale(1.05);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.3);
  }

  .play-btn.disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .info {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .stream-info {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .stream-status {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    font-size: 1rem;
    font-weight: 600;
  }

  .latency-info {
    display: flex;
    align-items: center;
  }

  .latency-badge {
    background: rgba(255, 255, 255, 0.15);
    padding: 0.25rem 0.75rem;
    border-radius: 6px;
    font-size: 0.8rem;
    opacity: 0.9;
  }

  .status-dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    animation: pulse 2s infinite;
  }

  @keyframes pulse {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0.6;
    }
  }

  .buffer-indicator {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .buffer-bar-mini {
    flex: 1;
    height: 6px;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 3px;
    overflow: hidden;
  }

  .buffer-fill-mini {
    height: 100%;
    border-radius: 3px;
    transition: all 0.3s ease;
  }

  .buffer-text {
    font-size: 0.85rem;
    opacity: 0.9;
    min-width: 80px;
    text-align: right;
  }

  .progress {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    font-size: 0.9rem;
  }

  .time {
    min-width: 50px;
    text-align: center;
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

  .volume-controls {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .volume-btn {
    background: none;
    border: none;
    color: white;
    font-size: 1.5rem;
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
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: white;
    cursor: pointer;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  }

  .volume-slider::-moz-range-thumb {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: white;
    cursor: pointer;
    border: none;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  }

  .info-panel {
    margin-top: 2rem;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 8px;
    overflow: hidden;
  }

  .info-panel summary {
    padding: 1rem;
    cursor: pointer;
    font-weight: 600;
    transition: background 0.3s ease;
  }

  .info-panel summary:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  .stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 1rem;
    padding: 1rem;
  }

  .stat {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .stat-label {
    font-size: 0.8rem;
    opacity: 0.8;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .stat-value {
    font-weight: bold;
    font-size: 1rem;
  }

  @media (max-width: 480px) {
    .radio-player {
      padding: 1.5rem;
    }

    .controls {
      flex-direction: column;
      gap: 1.5rem;
    }

    .volume-controls {
      align-self: stretch;
      justify-content: center;
    }

    .play-btn {
      width: 100px;
      height: 100px;
    }

    .stats-grid {
      grid-template-columns: 1fr 1fr;
    }
  }
</style>
