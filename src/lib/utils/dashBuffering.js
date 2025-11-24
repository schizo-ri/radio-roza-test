/**
 * Advanced Dash.js Buffering Utility
 * Provides sophisticated buffering control and chunk preloading
 */

export class DashBufferingManager {
  constructor(dashPlayer, options = {}) {
    this.dash = dashPlayer;
    this.options = {
      // Buffer targets in seconds
      initialBufferTarget: 10, // Target buffer before allowing play
      maxPreBuffer: 30, // Maximum prebuffer
      minBufferForPlay: 5, // Minimum buffer to consider "ready"
      rebufferThreshold: 2, // Rebuffer if buffer drops below this

      // Quality settings
      useAdaptiveBitrate: true,
      preferredBitrate: null, // null = auto, or specify kbps

      // Callbacks
      onBufferReady: null,
      onBuffering: null,
      onBufferProgress: null,
      onError: null,

      // Debug
      enableLogging: true,
      ...options,
    };

    this.state = {
      isBuffering: false,
      bufferLevel: 0,
      bufferProgress: 0,
      isReady: false,
      hasError: false,
      lastBufferCheck: 0,
    };

    this.eventListeners = [];
    this.bufferCheckInterval = null;
    this.chunks = new Map(); // Track loaded chunks
    this.init();
  }

  init() {
    this.setupBufferConfiguration();
    this.attachEventListeners();
    this.startBufferMonitoring();
  }

  /**
   * Configure Dash.js for optimal buffering
   */
  setupBufferConfiguration() {
    const settings = {
      streaming: {
        // Use supported buffer settings for current Dash.js version
        buffer: {
          stableBufferTime: Math.min(this.options.maxPreBuffer, 30),
          bufferTimeAtTopQuality: Math.min(this.options.maxPreBuffer + 10, 60),
          bufferToKeep: Math.min(this.options.maxPreBuffer, 30),
          bufferPruningInterval: 30,
        },

        // Gap jumping settings
        gaps: {
          jumpGaps: true,
          jumpLargeGaps: true,
          smallGapLimit: 1.5,
          threshold: 0.3,
        },

        // Quality settings
        abr: {
          autoSwitchBitrate: {
            audio: this.options.useAdaptiveBitrate,
            video: this.options.useAdaptiveBitrate,
          },
          initialBitrate: {
            audio: this.options.preferredBitrate || -1,
          },
          maxBitrate: {
            audio: -1,
            video: -1,
          },
        },

        // Low latency disabled for better buffering
        lowLatencyEnabled: false,
      },

      debug: {
        logLevel: this.options.enableLogging ? 4 : 0, // 4 = INFO, 0 = NONE
      },
    };

    try {
      this.dash.updateSettings(settings);
      this.log('Buffer configuration applied');
    } catch (error) {
      this.logError('Failed to apply buffer configuration:', error);
    }
  }

  /**
   * Attach event listeners to monitor buffering
   */
  attachEventListeners() {
    const events = [
      {
        event: 'streamInitialized',
        handler: this.onStreamInitialized.bind(this),
      },
      {
        event: 'bufferLoaded',
        handler: this.onBufferLoaded.bind(this),
      },
      {
        event: 'bufferLevelUpdated',
        handler: this.onBufferLevelUpdated.bind(this),
      },
      {
        event: 'playbackWaiting',
        handler: this.onPlaybackWaiting.bind(this),
      },
      {
        event: 'playbackPlaying',
        handler: this.onPlaybackPlaying.bind(this),
      },
      {
        event: 'canPlay',
        handler: this.onCanPlay.bind(this),
      },
      {
        event: 'fragmentLoadingCompleted',
        handler: this.onFragmentLoaded.bind(this),
      },
      {
        event: 'error',
        handler: this.onError.bind(this),
      },
    ];

    events.forEach(({ event, handler }) => {
      try {
        this.dash.on(event, handler);
        this.eventListeners.push({ event, handler });
        this.log(`Attached listener for ${event}`);
      } catch (error) {
        this.logError(`Failed to attach ${event} listener:`, error);
      }
    });
  }

  /**
   * Start periodic buffer monitoring
   */
  startBufferMonitoring() {
    if (this.bufferCheckInterval) {
      clearInterval(this.bufferCheckInterval);
    }

    this.bufferCheckInterval = setInterval(() => {
      this.checkBufferStatus();
    }, 500); // Check every 500ms
  }

  /**
   * Check current buffer status
   */
  checkBufferStatus() {
    try {
      // Check if dash player is ready
      if (!this.dash || !this.dash.isReady()) {
        this.log('Dash player not ready yet, skipping buffer check');
        return;
      }

      const audioBufferLength = this.dash.getBufferLength('audio');
      const now = Date.now();

      // Handle NaN values
      const bufferLength = isNaN(audioBufferLength) ? 0 : audioBufferLength;

      this.state.bufferLevel = bufferLength;
      this.state.bufferProgress = Math.min(
        (bufferLength / this.options.initialBufferTarget) * 100,
        100
      );

      // Check if ready to play
      const wasReady = this.state.isReady;
      this.state.isReady = bufferLength >= this.options.minBufferForPlay;

      // Check if buffering
      const wasBuffering = this.state.isBuffering;
      this.state.isBuffering = bufferLength < this.options.rebufferThreshold;

      // Call callbacks if state changed
      if (!wasReady && this.state.isReady && this.options.onBufferReady) {
        this.options.onBufferReady(this.state);
      }

      if (wasBuffering !== this.state.isBuffering && this.options.onBuffering) {
        this.options.onBuffering(this.state.isBuffering, this.state);
      }

      if (this.options.onBufferProgress) {
        this.options.onBufferProgress(this.state);
      }

      this.state.lastBufferCheck = now;

      this.log(
        `Buffer: ${bufferLength.toFixed(2)}s (${this.state.bufferProgress.toFixed(1)}%) - Ready: ${this.state.isReady}`
      );
    } catch (error) {
      this.logError('Buffer check failed:', error);
    }
  }

  /**
   * Preload chunks without starting playback
   */
  async preloadChunks() {
    return new Promise((resolve, reject) => {
      if (this.state.isReady) {
        resolve(this.state);
        return;
      }

      this.state.isBuffering = true;
      let timeout;

      const checkReady = () => {
        if (this.state.isReady) {
          this.state.isBuffering = false;
          if (timeout) clearTimeout(timeout);
          resolve(this.state);
        } else if (this.state.hasError) {
          if (timeout) clearTimeout(timeout);
          reject(new Error('Buffering failed due to stream error'));
        }
      };

      // Set timeout for preloading
      timeout = setTimeout(() => {
        this.state.isBuffering = false;
        reject(new Error('Preloading timeout - stream may not be available'));
      }, 15000); // 15 second timeout

      // Set up temporary listeners
      const originalOnReady = this.options.onBufferReady;
      const originalOnError = this.options.onError;

      this.options.onBufferReady = () => {
        this.options.onBufferReady = originalOnReady;
        this.options.onError = originalOnError;
        checkReady();
      };

      this.options.onError = (error) => {
        this.options.onBufferReady = originalOnReady;
        this.options.onError = originalOnError;
        this.state.hasError = true;
        reject(error);
      };

      // Start loading
      try {
        if (!this.dash || !this.dash.isReady()) {
          this.log('Waiting for dash to initialize before preloading');
          // Stream not initialized yet, wait for it
          const onStreamReady = () => {
            this.dash.off('streamInitialized', onStreamReady);
            // For live streams, just wait for buffer to build up
            this.log('Stream initialized, monitoring buffer levels');
          };
          this.dash.on('streamInitialized', onStreamReady);
        } else {
          this.log('Dash ready, monitoring buffer levels');
        }
      } catch (error) {
        if (timeout) clearTimeout(timeout);
        reject(error);
      }
    });
  }

  /**
   * Force load more chunks
   */
  forceBufferMore() {
    try {
      // Temporarily increase buffer targets using supported settings
      this.dash.updateSettings({
        streaming: {
          buffer: {
            stableBufferTime: Math.min(this.options.maxPreBuffer + 10, 60),
            bufferTimeAtTopQuality: Math.min(this.options.maxPreBuffer + 20, 90),
          },
        },
      });

      this.log('Forced additional buffering');
    } catch (error) {
      this.logError('Failed to force buffer more:', error);
    }
  }

  /**
   * Get current buffer statistics
   */
  getBufferStats() {
    try {
      if (!this.dash || !this.dash.isReady()) {
        return {
          ...this.state,
          audioBuffer: 0,
          bufferRange: 0,
          chunks: this.chunks.size,
          settings: {
            initialTarget: this.options.initialBufferTarget,
            maxPreBuffer: this.options.maxPreBuffer,
            minForPlay: this.options.minBufferForPlay,
          },
        };
      }

      const audioBufferLength = this.dash.getBufferLength('audio');
      const bufferLength = isNaN(audioBufferLength) ? 0 : audioBufferLength;

      return {
        ...this.state,
        audioBuffer: bufferLength,
        bufferRange: bufferLength,
        chunks: this.chunks.size,
        settings: {
          initialTarget: this.options.initialBufferTarget,
          maxPreBuffer: this.options.maxPreBuffer,
          minForPlay: this.options.minBufferForPlay,
        },
      };
    } catch (error) {
      this.logError('Failed to get buffer stats:', error);
      return this.state;
    }
  }

  /**
   * Event handlers
   */
  onStreamInitialized() {
    this.log('Stream initialized - starting prebuffering');
    this.state.hasError = false;
    // Start checking buffer immediately after stream is initialized
    setTimeout(() => {
      this.checkBufferStatus();
    }, 500);
  }

  onBufferLoaded(e) {
    this.log(`Buffer loaded for ${e.mediaType}`);
    this.checkBufferStatus();
  }

  onBufferLevelUpdated() {
    this.checkBufferStatus();
  }

  onPlaybackWaiting() {
    this.log('Playback waiting - buffering');
    this.state.isBuffering = true;
    if (this.options.onBuffering) {
      this.options.onBuffering(true, this.state);
    }
  }

  onPlaybackPlaying() {
    this.log('Playback playing');
    this.state.isBuffering = false;
    if (this.options.onBuffering) {
      this.options.onBuffering(false, this.state);
    }
  }

  onCanPlay() {
    this.log('Can play - sufficient buffer available');
    this.state.isReady = true;
    this.state.isBuffering = false;
    if (this.options.onBufferReady) {
      this.options.onBufferReady(this.state);
    }
  }

  onFragmentLoaded(e) {
    const key = `${e.mediaType}_${e.request.index}`;
    this.chunks.set(key, {
      mediaType: e.mediaType,
      index: e.request.index,
      bytesLoaded: e.request.bytesLoaded,
      timestamp: Date.now(),
    });

    this.log(`Fragment loaded: ${key} (${e.request.bytesLoaded} bytes)`);
  }

  onError(e) {
    this.logError('Dash error:', e.error);
    this.state.hasError = true;
    if (this.options.onError) {
      this.options.onError(e.error);
    }
  }

  /**
   * Cleanup
   */
  destroy() {
    // Clear interval
    if (this.bufferCheckInterval) {
      clearInterval(this.bufferCheckInterval);
      this.bufferCheckInterval = null;
    }

    // Remove event listeners
    this.eventListeners.forEach(({ event, handler }) => {
      try {
        this.dash.off(event, handler);
      } catch (error) {
        this.logError(`Failed to remove ${event} listener:`, error);
      }
    });
    this.eventListeners = [];

    // Clear chunks
    this.chunks.clear();

    this.log('DashBufferingManager destroyed');
  }

  /**
   * Logging utilities
   */
  log(...args) {
    if (this.options.enableLogging) {
      console.log('[DashBuffering]', ...args);
    }
  }

  logError(...args) {
    if (this.options.enableLogging) {
      console.error('[DashBuffering ERROR]', ...args);
    }
  }
}

/**
 * Create buffering manager with common presets
 */
export function createBufferingManager(dashPlayer, preset = 'balanced', customOptions = {}) {
  const presets = {
    fast: {
      initialBufferTarget: 3,
      maxPreBuffer: 10,
      minBufferForPlay: 2,
      rebufferThreshold: 1,
    },
    balanced: {
      initialBufferTarget: 8,
      maxPreBuffer: 20,
      minBufferForPlay: 4,
      rebufferThreshold: 2,
    },
    conservative: {
      initialBufferTarget: 15,
      maxPreBuffer: 45,
      minBufferForPlay: 8,
      rebufferThreshold: 4,
    },
    aggressive: {
      initialBufferTarget: 20,
      maxPreBuffer: 60,
      minBufferForPlay: 12,
      rebufferThreshold: 6,
    },
  };

  const options = {
    ...presets[preset],
    ...customOptions,
  };

  return new DashBufferingManager(dashPlayer, options);
}

/**
 * Utility function to wait for buffer readiness
 */
export function waitForBuffer(bufferManager, timeout = 30000) {
  return new Promise((resolve, reject) => {
    if (bufferManager.state.isReady) {
      resolve(bufferManager.state);
      return;
    }

    const timeoutId = setTimeout(() => {
      reject(new Error('Buffer timeout exceeded'));
    }, timeout);

    const originalOnReady = bufferManager.options.onBufferReady;
    bufferManager.options.onBufferReady = (state) => {
      clearTimeout(timeoutId);
      bufferManager.options.onBufferReady = originalOnReady;
      resolve(state);
    };
  });
}
