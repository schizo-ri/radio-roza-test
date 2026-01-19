<script>
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';
  import {
    currentMixcloudMix,
    closeMixcloudPlayer,
    onMixcloudPlay,
    onMixcloudStop,
    activePlayer
  } from '$lib/stores/playerState.js';

  let iframeElement = $state(null);
  let widget = $state(null);
  let isPlaying = $state(false);
  let isLoading = $state(true);
  let progress = $state(0);
  let duration = $state(0);
  let currentPosition = $state(0);
  let widgetReady = $state(false);
  let lastMixUrl = $state(null);

  // Get the mix from the store
  let mix = $derived($currentMixcloudMix);
  let isVisible = $derived(mix !== null);
  let currentActivePlayer = $derived($activePlayer);

  // Pause Mixcloud when stream starts playing
  $effect(() => {
    if (currentActivePlayer === 'stream' && isPlaying && widget && widgetReady) {
      widget.pause();
    }
  });

  // Extract the Mixcloud path from URL (e.g., /RadioRoza/episode-name/)
  function getMixcloudPath(url) {
    if (!url) return null;
    try {
      const urlObj = new URL(url);
      return urlObj.pathname;
    } catch {
      // If it's already a path
      return url.startsWith('/') ? url : `/${url}`;
    }
  }

  function formatTime(seconds) {
    if (!seconds || !isFinite(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }

  function handleClose() {
    if (widget && widgetReady) {
      try {
        widget.pause();
      } catch (e) {
        console.warn('Failed to pause widget:', e);
      }
    }
    // Reset state
    isPlaying = false;
    widgetReady = false;
    widget = null;
    lastMixUrl = null;
    closeMixcloudPlayer();
  }

  function togglePlay() {
    if (!widget || !widgetReady) {
      console.warn('Widget not ready');
      return;
    }

    try {
      if (isPlaying) {
        widget.pause();
      } else {
        widget.play();
      }
    } catch (e) {
      console.error('Toggle play failed:', e);
    }
  }

  function handleOpenExternal() {
    if (mix?.url) {
      window.open(mix.url, '_blank', 'noopener,noreferrer');
    }
  }

  // Initialize widget when iframe loads
  function initWidget() {
    if (!browser || !iframeElement || !window.Mixcloud) {
      console.warn('Cannot init widget - missing requirements');
      return;
    }

    // Don't reinit for same mix
    if (lastMixUrl === mix?.url && widgetReady) {
      return;
    }

    try {
      // Reset state for new widget
      widgetReady = false;
      isPlaying = false;
      isLoading = true;
      progress = 0;
      duration = 0;
      currentPosition = 0;

      widget = window.Mixcloud.PlayerWidget(iframeElement);

      widget.ready.then(() => {
        widgetReady = true;
        isLoading = false;
        lastMixUrl = mix?.url;

        // Set up event listeners
        widget.events.play.on(() => {
          isPlaying = true;
          isLoading = false;
          onMixcloudPlay(mix);
        });

        widget.events.pause.on(() => {
          isPlaying = false;
          onMixcloudStop();
        });

        widget.events.ended.on(() => {
          isPlaying = false;
          onMixcloudStop();
        });

        widget.events.progress.on((pos, dur) => {
          currentPosition = pos;
          duration = dur;
          progress = dur > 0 ? (pos / dur) * 100 : 0;
        });

        widget.events.buffering.on(() => {
          isLoading = true;
        });

        // Auto-play after widget is ready
        setTimeout(() => {
          if (widget && widgetReady) {
            widget.play().catch((e) => {
              console.warn('Auto-play failed (may need user interaction):', e);
            });
          }
        }, 300);
      }).catch((e) => {
        console.error('Widget ready failed:', e);
        isLoading = false;
      });
    } catch (e) {
      console.error('Failed to initialize Mixcloud widget:', e);
      isLoading = false;
    }
  }

  // Handle iframe load event
  function onIframeLoad() {
    if (!browser || !window.Mixcloud) {
      // Wait for script to load
      const checkInterval = setInterval(() => {
        if (window.Mixcloud) {
          clearInterval(checkInterval);
          initWidget();
        }
      }, 100);
      // Cleanup after 5s
      setTimeout(() => clearInterval(checkInterval), 5000);
    } else {
      initWidget();
    }
  }

  // Load Mixcloud widget API script on mount
  onMount(() => {
    if (!browser) return;

    // Check if already loaded
    if (window.Mixcloud) {
      return;
    }

    const script = document.createElement('script');
    script.src = '//widget.mixcloud.com/media/js/widgetApi.js';
    script.async = true;
    document.head.appendChild(script);
  });

  // Reset widget when mix changes
  $effect(() => {
    if (mix && mix.url !== lastMixUrl) {
      // Reset for new mix - the iframe src change will trigger onload
      widgetReady = false;
      widget = null;
      isPlaying = false;
      isLoading = true;
      progress = 0;
      duration = 0;
      currentPosition = 0;
    }
  });
</script>

{#if isVisible && mix}
  <div class="mixcloud-player" class:visible={isVisible}>
    <div class="player-content">
      <div class="artwork">
        <img
          src={mix.pictures?.['320wx320h'] || mix.pictures?.large || '/images/placeholder-mix.jpg'}
          alt={mix.name}
          width="60"
          height="60"
        />
      </div>

      <div class="info">
        <h4 class="title">{mix.name}</h4>
        <div class="time">
          {formatTime(currentPosition)} / {formatTime(duration)}
        </div>
      </div>

      <div class="controls">
        <button class="control-btn play-btn" onclick={togglePlay} disabled={isLoading || !widgetReady}>
          {#if isLoading}
            <span class="spinner"></span>
          {:else if isPlaying}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <rect x="6" y="4" width="4" height="16"/>
              <rect x="14" y="4" width="4" height="16"/>
            </svg>
          {:else}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z"/>
            </svg>
          {/if}
        </button>

        <button class="control-btn external-btn" onclick={handleOpenExternal} title="Open on Mixcloud">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
            <polyline points="15,3 21,3 21,9"/>
            <line x1="10" y1="14" x2="21" y2="3"/>
          </svg>
        </button>

        <button class="control-btn close-btn" onclick={handleClose} title="Close">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>

      <!-- Progress bar -->
      <div class="progress-bar">
        <div class="progress-fill" style="width: {progress}%"></div>
      </div>
    </div>

    <!-- Hidden iframe for Mixcloud widget -->
    {#key mix.url}
      <iframe
        bind:this={iframeElement}
        onload={onIframeLoad}
        class="mixcloud-iframe"
        width="100%"
        height="60"
        src="https://www.mixcloud.com/widget/iframe/?hide_cover=1&mini=1&autoplay=1&feed={encodeURIComponent(getMixcloudPath(mix.url))}"
        frameborder="0"
        allow="autoplay"
        title="Mixcloud Player"
      ></iframe>
    {/key}
  </div>
{/if}

<style>
  .mixcloud-player {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    background: white;
    border-top: 1px solid var(--light);
    box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.15);
    transform: translateY(100%);
    transition: transform 0.3s ease;
  }

  .mixcloud-player.visible {
    transform: translateY(0);
  }

  .player-content {
    display: grid;
    grid-template-columns: 60px 1fr auto;
    grid-template-rows: 1fr 3px;
    gap: 1rem;
    padding: 0.75rem 1rem 0;
    max-width: 1440px;
    margin: 0 auto;
  }

  .artwork {
    grid-row: 1;
  }

  .artwork img {
    width: 60px;
    height: 60px;
    border-radius: 4px;
    object-fit: cover;
  }

  .info {
    grid-row: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-width: 0;
  }

  .title {
    font-size: 0.95rem;
    font-weight: 600;
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: var(--dark);
  }

  .time {
    font-size: 0.8rem;
    color: var(--muted);
    font-variant-numeric: tabular-nums;
  }

  .controls {
    grid-row: 1;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .control-btn {
    all: unset;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    transition: background-color 0.2s ease;
  }

  .control-btn:hover {
    background: var(--light);
  }

  .control-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .play-btn {
    background: var(--primary-600);
    color: white;
  }

  .play-btn:hover:not(:disabled) {
    background: var(--primary-700);
  }

  .external-btn,
  .close-btn {
    color: var(--muted);
  }

  .external-btn:hover,
  .close-btn:hover {
    color: var(--dark);
  }

  .progress-bar {
    grid-column: 1 / -1;
    grid-row: 2;
    height: 3px;
    background: var(--light);
    border-radius: 2px;
    overflow: hidden;
  }

  .progress-fill {
    height: 100%;
    background: var(--primary-600);
    transition: width 0.1s linear;
  }

  .spinner {
    width: 18px;
    height: 18px;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-top-color: white;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  /* Hide the actual Mixcloud iframe - we use our custom UI */
  .mixcloud-iframe {
    position: absolute;
    width: 1px;
    height: 1px;
    opacity: 0;
    pointer-events: none;
  }

  /* Mobile adjustments */
  @media (max-width: 480px) {
    .player-content {
      grid-template-columns: 50px 1fr auto;
      gap: 0.75rem;
      padding: 0.5rem 0.75rem 0;
    }

    .artwork img {
      width: 50px;
      height: 50px;
    }

    .title {
      font-size: 0.875rem;
    }

    .control-btn {
      width: 36px;
      height: 36px;
    }

    .external-btn {
      display: none;
    }
  }
</style>
