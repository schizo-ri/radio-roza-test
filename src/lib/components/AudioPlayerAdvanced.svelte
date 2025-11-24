<!-- Advanced Audio Player with sophisticated buffering control -->
<!-- Uses the DashBufferingManager for optimal chunk preloading -->

<script>
  import { onMount, onDestroy } from 'svelte';
  import { browser } from '$app/environment';
  import { createBufferingManager } from '$lib/utils/dashBuffering.js';

  // Component props
  let {
    streamUrl = 'https://radio-roza.org/stream/dash/live.mpd',
    fallbackUrl = 'https://stream.radio-roza.org/live.mp3',
    bufferPreset = 'balanced', // fast, balanced, conservative, aggressive
    autoPlay = false,
    showProgress = true,
    showControls = true,
  } = $props();

  // Svelte 5 reactive state
  let player = $state();
  let dash = $state();
  let bufferManager = $state();

  // Player state
  let isPlaying = $state(false);
  let isBuffering = $state(false);
  let bufferProgress = $state(0);
  let bufferLevel = $state(0);
  let canPlay = $state(false);
  let hasError = $state(false);
  let errorMessage = $state('');

  // Audio metadata
  let currentTime = $state(0);
  let duration = $state(0);
  let volume = $state(1);
  let muted = $state(false);

  // Loading states
  let isInitializing = $state(true);
  let chunksLoaded = $state(0);

  onMount(async () => {
    if (browser && player) {
      await initializeDashPlayer();
    }
  });

  onDestroy(() => {
    cleanup();
  });

  async function initializeDashPlayer() {
    try {
      console.log('Starting Dash.js initialization...');
      const dashjs = await import('dashjs');
      dash = dashjs.MediaPlayer().create();

      console.log('Dash player created, checking stream URL:', streamUrl);

      // Validate stream URL
      if (!streamUrl || !streamUrl.includes('.mpd')) {
        throw new Error('Invalid DASH stream URL: ' + streamUrl);
      }

      // First, let's try to fetch and inspect the manifest manually
      await debugManifest(streamUrl);

      // Create advanced buffering manager
      bufferManager = createBufferingManager(dash, bufferPreset, {
        onBufferReady: handleBufferReady,
        onBuffering: handleBuffering,
        onBufferProgress: handleBufferProgress,
        onError: handleStreamError,
        enableLogging: true,
      });

      // Set up additional event listeners first
      setupEventListeners(dashjs);

      // Initialize the stream with error handling
      console.log('Initializing DASH stream...');
      dash.initialize(player, streamUrl, false); // Don't auto-play

      // Wait for stream to be ready before proceeding
      await waitForStreamReady();

      // Start preloading chunks
      if (autoPlay) {
        await preloadAndPlay();
      } else {
        setTimeout(async () => {
          try {
            await preloadChunks();
          } catch (preloadError) {
            console.warn('Preload failed, but continuing:', preloadError);
            // Don't fail completely, just log the warning
          }
        }, 1000); // Give stream time to initialize
      }

      isInitializing = false;
    } catch (error) {
      console.error('Failed to initialize Dash player:', error);
      handleInitError(error);
    }
  }

  // Debug function to inspect manifest
  async function debugManifest(url) {
    try {
      console.log('🔍 Inspecting manifest:', url);
      const response = await fetch(url, {
        method: 'HEAD',
        mode: 'no-cors',
      });
      console.log('📡 Manifest HEAD response status:', response.status);
    } catch (headError) {
      console.log('ℹ️  HEAD request failed, trying GET:', headError.message);

      try {
        const response = await fetch(url);
        console.log('📡 Manifest GET response status:', response.status);
        console.log('📋 Response headers:', [...response.headers.entries()]);

        if (response.ok) {
          const text = await response.text();
          console.log('📄 Manifest content length:', text.length);
          console.log('📄 Manifest first 500 chars:', text.substring(0, 500));

          // Check if it's valid XML/MPD
          if (text.includes('<MPD') || text.includes('<?xml')) {
            console.log('✅ Manifest appears to be valid XML/MPD');

            // Look for common DASH elements
            const hasAdaptationSets = text.includes('<AdaptationSet');
            const hasRepresentations = text.includes('<Representation');
            const hasSegmentTemplate = text.includes('<SegmentTemplate');
            const hasSegmentList = text.includes('<SegmentList');
            const hasBaseURL = text.includes('<BaseURL');

            console.log('🔍 Manifest analysis:', {
              hasAdaptationSets,
              hasRepresentations,
              hasSegmentTemplate,
              hasSegmentList,
              hasBaseURL,
            });

            // Check if it's a live stream
            const isLive = text.includes('type="dynamic"') || text.includes("type='dynamic'");
            console.log('📺 Stream type:', isLive ? 'Live' : 'VOD');
          } else {
            console.error('❌ Manifest does not appear to be valid XML:', text.substring(0, 200));
            throw new Error('Invalid manifest format');
          }
        } else {
          console.error('❌ Manifest request failed:', response.status, response.statusText);
          throw new Error(`Manifest HTTP error: ${response.status}`);
        }
      } catch (fetchError) {
        console.error('❌ Failed to fetch manifest:', fetchError);
        throw new Error(`Cannot access manifest: ${fetchError.message}`);
      }
    }
  }

  // Wait for stream to be properly initialized
  function waitForStreamReady(timeout = 10000) {
    return new Promise((resolve, reject) => {
      if (dash && dash.isReady()) {
        resolve();
        return;
      }

      let timeoutId = setTimeout(() => {
        reject(new Error('Stream initialization timeout'));
      }, timeout);

      const checkReady = () => {
        if (dash && dash.isReady()) {
          clearTimeout(timeoutId);
          console.log('Stream is ready');
          resolve();
        }
      };

      // Listen for stream initialized event
      const onStreamReady = () => {
        clearTimeout(timeoutId);
        dash.off('streamInitialized', onStreamReady);
        console.log('Stream initialized event received');
        resolve();
      };

      dash.on('streamInitialized', onStreamReady);

      // Check periodically in case we missed the event
      const checkInterval = setInterval(() => {
        if (dash && dash.isReady()) {
          clearInterval(checkInterval);
          clearTimeout(timeoutId);
          resolve();
        }
      }, 100);
    });
  }

  function setupEventListeners(dashjs) {
    // Stream events
    dash.on(dashjs.MediaPlayer.events.STREAM_INITIALIZED, () => {
      console.log('✅ Stream initialized successfully');
      hasError = false;
    });

    dash.on(dashjs.MediaPlayer.events.MANIFEST_LOADED, () => {
      console.log('📄 Manifest loaded successfully');
    });

    dash.on(dashjs.MediaPlayer.events.ERROR, (e) => {
      console.error('❌ Dash error:', e.error);
      if (
        e.error?.code === dashjs.MediaPlayer.errorCodes.RESOURCE_MISSING ||
        e.error?.code === dashjs.MediaPlayer.errorCodes.MANIFEST_LOAD_ERROR
      ) {
        console.log('🔄 Falling back to MP3 stream');
        fallbackToMp3();
      } else {
        handleStreamError(e.error);
      }
    });

    // Debug function to inspect loaded manifest
    function debugLoadedManifest() {
      try {
        if (!dash.isReady()) {
          console.log('⏳ Dash not ready yet for manifest inspection');
          return;
        }

        // Get available bitrates/qualities
        const audioBitrates = dash.getBitrateInfoListFor('audio');
        const videoBitrates = dash.getBitrateInfoListFor('video');

        console.log('🎵 Available audio bitrates:', audioBitrates);
        console.log('📺 Available video bitrates:', videoBitrates);

        // Get current quality info
        const currentAudioQuality = dash.getQualityFor('audio');
        const currentVideoQuality = dash.getQualityFor('video');

        console.log('🎵 Current audio quality:', currentAudioQuality);
        console.log('📺 Current video quality:', currentVideoQuality);

        // Get stream info
        const streamInfo = dash.getStreamsFromManifest();
        console.log('📡 Stream info:', streamInfo);

        // Check if it's a live stream
        const isDynamic = dash.isDynamic();
        console.log('📺 Is dynamic (live) stream:', isDynamic);

        if (audioBitrates.length === 0 && videoBitrates.length === 0) {
          console.warn('⚠️ No audio or video representations found in manifest');
          throw new Error('No playable streams found in manifest');
        }
      } catch (error) {
        console.error('❌ Error inspecting loaded manifest:', error);
      }
    }

    // Additional debugging events
    dash.on(dashjs.MediaPlayer.events.MANIFEST_LOADING_STARTED, () => {
      console.log('📡 Starting to load manifest...');
    });

    dash.on(dashjs.MediaPlayer.events.MANIFEST_LOADING_FINISHED, (e) => {
      console.log('📦 Manifest loading finished:', e.error ? 'with error' : 'successfully');
      if (e.error) {
        console.error('❌ Manifest loading error:', e.error);
        console.error('❌ Error details:', {
          code: e.error.code,
          message: e.error.message,
          data: e.error.data,
        });
        fallbackToMp3();
      } else {
        console.log('✅ Manifest loaded successfully, checking periods and adaptation sets...');
        debugLoadedManifest();
      }
    });

    // Debug events for stream info
    dash.on(dashjs.MediaPlayer.events.STREAM_INITIALIZING, () => {
      console.log('🔄 Stream initializing...');
    });

    dash.on(dashjs.MediaPlayer.events.PERIOD_SWITCH_STARTED, (e) => {
      console.log('🔄 Period switch started:', e);
    });

    dash.on(dashjs.MediaPlayer.events.ADAPTATION_SET_REMOVED_NO_CAPABILITIES, (e) => {
      console.warn('⚠️ Adaptation set removed (no capabilities):', e);
    });

    dash.on(dashjs.MediaPlayer.events.REPRESENTATION_UPDATE_COMPLETED, (e) => {
      console.log('✅ Representation update completed:', e.mediaType);
    });

    // Fragment loading events for detailed debugging
    dash.on(dashjs.MediaPlayer.events.FRAGMENT_LOADING_STARTED, (e) => {
      console.log('📦 Fragment loading started:', e.mediaType, e.request?.url);
    });

    dash.on(dashjs.MediaPlayer.events.FRAGMENT_LOADING_COMPLETED, (e) => {
      console.log('✅ Fragment loaded:', e.mediaType, 'bytes:', e.request?.bytesLoaded);
    });

    dash.on(dashjs.MediaPlayer.events.FRAGMENT_LOADING_ABANDONED, (e) => {
      console.warn('⚠️ Fragment loading abandoned:', e.mediaType, e.request?.url);
    });

    // Player events
    player.addEventListener('loadedmetadata', () => {
      duration = player.duration;
      console.log('🎵 Audio metadata loaded, duration:', duration);
      console.log('🎵 Audio info:', {
        currentSrc: player.currentSrc,
        networkState: player.networkState,
        readyState: player.readyState,
        buffered:
          player.buffered.length > 0
            ? `${player.buffered.start(0)}-${player.buffered.end(0)}`
            : 'none',
      });
    });

    player.addEventListener('timeupdate', () => {
      currentTime = player.currentTime;
    });

    player.addEventListener('play', () => {
      isPlaying = true;
      console.log('Playback started');
    });

    player.addEventListener('pause', () => {
      isPlaying = false;
      console.log('Playback paused');
    });

    player.addEventListener('volumechange', () => {
      volume = player.volume;
      muted = player.muted;
    });

    player.addEventListener('ended', () => {
      isPlaying = false;
      console.log('Playback ended');
    });
  }

  // Preload chunks without starting playback
  async function preloadChunks() {
    if (!bufferManager) {
      console.warn('Buffer manager not available');
      return;
    }

    if (!dash || !dash.isReady()) {
      console.warn('Dash player not ready, cannot preload chunks');
      // Try to set ready state anyway for fallback streams
      setTimeout(() => {
        if (!canPlay && !hasError) {
          console.log('Setting ready state for fallback stream');
          canPlay = true;
          isBuffering = false;
        }
      }, 2000);
      return;
    }

    try {
      isBuffering = true;
      console.log('🔄 Starting chunk preloading...');

      const bufferState = await bufferManager.preloadChunks();
      console.log('✅ Chunks preloaded successfully:', bufferState);
    } catch (error) {
      console.error('❌ Preloading failed:', error);
      // Don't treat preloading failure as fatal
      console.log('🔄 Attempting fallback...');
      fallbackToMp3();
    }
  }

  // Preload and start playing
  async function preloadAndPlay() {
    try {
      await preloadChunks();
      if (canPlay) {
        await startPlayback();
      }
    } catch (error) {
      console.error('Preload and play failed:', error);
      handleStreamError(error);
    }
  }

  // Start playback
  async function startPlayback() {
    if (!player) return;

    try {
      if (!canPlay) {
        console.log('Not ready to play yet, preloading...');
        await preloadChunks();
      }

      if (canPlay) {
        await player.play();
        console.log('Playback started successfully');
      } else {
        console.warn('Still not ready to play after preloading');
      }
    } catch (error) {
      console.error('Failed to start playback:', error);
      handleStreamError(error);
    }
  }

  // Pause playback
  function pausePlayback() {
    if (player && !player.paused) {
      player.pause();
    }
  }

  // Toggle play/pause
  async function togglePlayback() {
    if (isPlaying) {
      pausePlayback();
    } else {
      await startPlayback();
    }
  }

  // Fallback to MP3 stream
  function fallbackToMp3() {
    console.log('🔄 Falling back to MP3 stream:', fallbackUrl);

    // Clean up dash player
    if (bufferManager) {
      bufferManager.destroy();
      bufferManager = null;
    }

    if (dash) {
      try {
        dash.destroy();
      } catch (e) {
        console.warn('Error destroying dash player:', e);
      }
      dash = null;
    }

    if (player) {
      player.src = fallbackUrl;
      player.load();

      // Set up simple event listeners for MP3
      const onCanPlay = () => {
        console.log('✅ MP3 stream ready');
        canPlay = true;
        isBuffering = false;
        hasError = false;
        player.removeEventListener('canplay', onCanPlay);
      };

      const onError = (e) => {
        console.error('❌ MP3 stream error:', e);
        handleStreamError(new Error('Both DASH and MP3 streams failed'));
        player.removeEventListener('error', onError);
      };

      player.addEventListener('canplay', onCanPlay);
      player.addEventListener('error', onError);
    }
  }

  // Event handlers for buffer manager
  function handleBufferReady(state) {
    console.log('Buffer ready:', state);
    canPlay = true;
    isBuffering = false;
    bufferLevel = state.bufferLevel;
    bufferProgress = state.bufferProgress;
  }

  function handleBuffering(isBufferingNow, state) {
    console.log('Buffering state changed:', isBufferingNow);
    isBuffering = isBufferingNow;
    bufferLevel = state.bufferLevel;
  }

  function handleBufferProgress(state) {
    bufferProgress = state.bufferProgress;
    bufferLevel = state.bufferLevel;

    // Update chunks count if available
    const stats = bufferManager?.getBufferStats();
    if (stats) {
      chunksLoaded = stats.chunks;
    }
  }

  function handleStreamError(error) {
    console.error('Stream error:', error);
    hasError = true;
    errorMessage = error?.message || 'Stream error occurred';
    isBuffering = false;
    canPlay = false;
  }

  function handleInitError(error) {
    console.error('❌ Initialization error:', error);
    hasError = true;
    errorMessage = error?.message || 'Failed to initialize audio player';
    isInitializing = false;

    // Try fallback after a short delay
    setTimeout(() => {
      console.log('🔄 Attempting MP3 fallback after init error');
      fallbackToMp3();
    }, 1000);
  }

  // Retry connection
  async function retryConnection() {
    hasError = false;
    errorMessage = '';
    isInitializing = true;
    canPlay = false;
    isBuffering = false;

    cleanup();

    // Add a small delay to ensure cleanup is complete
    setTimeout(async () => {
      await initializeDashPlayer();
    }, 500);
  }

  // Force more buffering
  function forceMoreBuffering() {
    if (bufferManager) {
      bufferManager.forceBufferMore();
    }
  }

  // Cleanup
  function cleanup() {
    if (bufferManager) {
      bufferManager.destroy();
      bufferManager = null;
    }
    if (dash) {
      dash.destroy();
      dash = null;
    }
  }

  // Seek to position
  function seek(time) {
    if (player && !isNaN(time)) {
      player.currentTime = time;
    }
  }

  // Set volume
  function setVolume(newVolume) {
    if (player) {
      player.volume = Math.max(0, Math.min(1, newVolume));
    }
  }

  // Toggle mute
  function toggleMute() {
    if (player) {
      player.muted = !player.muted;
    }
  }

  // Format time display
  function formatTime(seconds) {
    if (!seconds || isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }
</script>

<div class="audio-player">
  <!-- Loading state -->
  {#if isInitializing}
    <div class="loading-state">
      <div class="spinner"></div>
      <p>Initializing audio player...</p>
    </div>
  {/if}

  <!-- Error state -->
  {#if hasError}
    <div class="error-state">
      <div class="error-icon">⚠️</div>
      <p class="error-message">{errorMessage}</p>
      <button class="retry-button" onclick={retryConnection}> Retry Connection </button>
    </div>
  {/if}

  <!-- Buffering progress -->
  {#if showProgress && (isBuffering || (!canPlay && !hasError && !isInitializing))}
    <div class="buffer-state">
      <div class="buffer-info">
        <span class="buffer-label">
          {isBuffering ? 'Buffering...' : 'Preloading chunks...'}
        </span>
        <span class="buffer-stats">
          {bufferLevel.toFixed(1)}s buffered ({chunksLoaded} chunks)
        </span>
      </div>

      <div class="buffer-progress">
        <div class="buffer-bar" style="width: {bufferProgress}%"></div>
      </div>

      <div class="buffer-percentage">
        {Math.round(bufferProgress)}%
      </div>

      {#if !isBuffering && bufferProgress > 50}
        <button class="force-buffer-button" onclick={forceMoreBuffering}> Load More </button>
      {/if}
    </div>
  {/if}

  <!-- Main player controls -->
  {#if !isInitializing && !hasError}
    <div class="player-controls">
      <!-- Play/Pause button -->
      <button
        class="play-button {canPlay ? 'ready' : 'disabled'}"
        onclick={togglePlayback}
        disabled={!canPlay}
      >
        {#if isBuffering}
          <div class="mini-spinner"></div>
        {:else if isPlaying}
          ⏸️
        {:else}
          ▶️
        {/if}
      </button>

      <!-- Time and progress -->
      {#if showControls && duration > 0}
        <div class="time-controls">
          <span class="time-display">{formatTime(currentTime)}</span>

          <input
            type="range"
            class="seek-bar"
            min="0"
            max={duration || 0}
            value={currentTime}
            oninput={(e) => seek(parseFloat(e.target.value))}
          />

          <span class="time-display">{formatTime(duration)}</span>
        </div>
      {/if}

      <!-- Volume controls -->
      {#if showControls}
        <div class="volume-controls">
          <button class="mute-button" onclick={toggleMute}>
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
      {/if}
    </div>

    <!-- Stream status indicator -->
    {#if canPlay}
      <div class="stream-status ready">
        <span class="status-dot"></span>
        Stream ready ({bufferLevel.toFixed(1)}s buffered)
      </div>
    {:else if !isBuffering}
      <div class="stream-status loading">
        <span class="status-dot"></span>
        Preparing stream...
      </div>
    {/if}
  {/if}

  <!-- Hidden audio element -->
  <audio bind:this={player} preload="none" style="display: none;"></audio>
</div>

<style>
  .audio-player {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1.5rem;
    background: linear-gradient(135deg, #f8f9fa, #e9ecef);
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    max-width: 500px;
    margin: 0 auto;
  }

  .loading-state,
  .error-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    padding: 2rem;
    text-align: center;
  }

  .spinner {
    width: 40px;
    height: 40px;
    border: 4px solid #e9ecef;
    border-top: 4px solid #007bff;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  .mini-spinner {
    width: 16px;
    height: 16px;
    border: 2px solid #ffffff60;
    border-top: 2px solid #ffffff;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  .error-state {
    color: #dc3545;
  }

  .error-icon {
    font-size: 2rem;
  }

  .error-message {
    margin: 0;
    font-weight: 500;
  }

  .retry-button {
    background: #dc3545;
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 6px;
    cursor: pointer;
    font-weight: 500;
    transition: background-color 0.2s;
  }

  .retry-button:hover {
    background: #c82333;
  }

  .buffer-state {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 1rem;
    background: rgba(0, 123, 255, 0.1);
    border-radius: 8px;
    border-left: 4px solid #007bff;
  }

  .buffer-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.9rem;
  }

  .buffer-label {
    font-weight: 600;
    color: #007bff;
  }

  .buffer-stats {
    color: #6c757d;
    font-size: 0.8rem;
  }

  .buffer-progress {
    width: 100%;
    height: 8px;
    background: rgba(0, 123, 255, 0.2);
    border-radius: 4px;
    overflow: hidden;
  }

  .buffer-bar {
    height: 100%;
    background: linear-gradient(90deg, #007bff, #0056b3);
    transition: width 0.3s ease;
    border-radius: 4px;
  }

  .buffer-percentage {
    text-align: center;
    font-weight: 600;
    color: #007bff;
    font-size: 0.9rem;
  }

  .force-buffer-button {
    background: #007bff;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.8rem;
    align-self: flex-end;
  }

  .force-buffer-button:hover {
    background: #0056b3;
  }

  .player-controls {
    display: flex;
    align-items: center;
    gap: 1rem;
    background: white;
    padding: 1rem;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  .play-button {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: none;
    font-size: 1.2rem;
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .play-button.ready {
    background: linear-gradient(135deg, #28a745, #20c997);
    color: white;
    box-shadow: 0 4px 8px rgba(40, 167, 69, 0.3);
  }

  .play-button.ready:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(40, 167, 69, 0.4);
  }

  .play-button.disabled {
    background: #e9ecef;
    color: #6c757d;
    cursor: not-allowed;
  }

  .time-controls {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    flex: 1;
  }

  .time-display {
    font-size: 0.9rem;
    font-weight: 500;
    color: #495057;
    min-width: 40px;
  }

  .seek-bar {
    flex: 1;
    height: 6px;
    background: #e9ecef;
    border-radius: 3px;
    outline: none;
    cursor: pointer;
  }

  .seek-bar::-webkit-slider-thumb {
    appearance: none;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: #007bff;
    cursor: pointer;
  }

  .volume-controls {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .mute-button {
    background: none;
    border: none;
    font-size: 1.1rem;
    cursor: pointer;
    padding: 0.25rem;
  }

  .volume-slider {
    width: 80px;
    height: 4px;
    background: #e9ecef;
    border-radius: 2px;
    outline: none;
    cursor: pointer;
  }

  .volume-slider::-webkit-slider-thumb {
    appearance: none;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: #6c757d;
    cursor: pointer;
  }

  .stream-status {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.85rem;
    padding: 0.5rem 0.75rem;
    border-radius: 6px;
  }

  .stream-status.ready {
    background: rgba(40, 167, 69, 0.1);
    color: #155724;
    border: 1px solid rgba(40, 167, 69, 0.2);
  }

  .stream-status.loading {
    background: rgba(255, 193, 7, 0.1);
    color: #856404;
    border: 1px solid rgba(255, 193, 7, 0.2);
  }

  .status-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    animation: pulse 2s infinite;
  }

  .ready .status-dot {
    background: #28a745;
  }

  .loading .status-dot {
    background: #ffc107;
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

  @media (max-width: 480px) {
    .audio-player {
      padding: 1rem;
    }

    .player-controls {
      flex-direction: column;
      gap: 0.75rem;
    }

    .time-controls {
      width: 100%;
    }

    .volume-controls {
      align-self: flex-end;
    }
  }
</style>
