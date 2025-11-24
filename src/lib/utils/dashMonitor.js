/**
 * Dash.js Monitoring Utility
 * Provides comprehensive event monitoring for dash.js MediaPlayer instances
 */

export class DashMonitor {
  constructor(options = {}) {
    this.options = {
      logLevel: 'all', // 'error', 'warn', 'info', 'all'
      includeMetrics: false,
      includeFragmentDetails: false,
      logPrefix: '[DASH]',
      ...options,
    };
    this.dash = null;
    this.eventListeners = new Map();
  }

  /**
   * Initialize monitoring for a dash.js MediaPlayer instance
   * @param {Object} dashPlayer - The dash.js MediaPlayer instance
   * @param {Object} dashjs - The dashjs module
   */
  init(dashPlayer, dashjs) {
    this.dash = dashPlayer;
    this.dashjs = dashjs;
    this.setupEventListeners();
  }

  /**
   * Setup all event listeners based on configuration
   */
  setupEventListeners() {
    if (!this.dash || !this.dashjs) return;

    // Essential events - always monitored
    this.addListener('ERROR', this.handleError.bind(this));
    this.addListener('PLAYBACK_STARTED', this.handlePlaybackEvent.bind(this));
    this.addListener('PLAYBACK_PAUSED', this.handlePlaybackEvent.bind(this));
    this.addListener('PLAYBACK_ENDED', this.handlePlaybackEvent.bind(this));
    this.addListener('STREAM_INITIALIZED', this.handleStreamEvent.bind(this));
    this.addListener('MANIFEST_LOADED', this.handleManifestEvent.bind(this));

    // Quality and buffer events (only critical ones)
    this.addListener('BUFFER_EMPTY', this.handleBufferEvent.bind(this));

    // Playback state events (only problems)
    this.addListener('PLAYBACK_WAITING', this.handlePlaybackStateEvent.bind(this));
    this.addListener('PLAYBACK_STALLED', this.handlePlaybackStateEvent.bind(this));

    // Optional detailed monitoring
    if (this.options.includeQualityEvents) {
      this.addListener('QUALITY_CHANGE_REQUESTED', this.handleQualityEvent.bind(this));
      this.addListener('QUALITY_CHANGE_RENDERED', this.handleQualityEvent.bind(this));
    }

    if (this.options.includeBufferEvents) {
      this.addListener('BUFFER_LOADED', this.handleBufferEvent.bind(this));
    }

    if (this.options.includeSeekEvents) {
      this.addListener('PLAYBACK_SEEKING', this.handlePlaybackStateEvent.bind(this));
      this.addListener('PLAYBACK_SEEKED', this.handlePlaybackStateEvent.bind(this));
    }

    // Optional fragment monitoring
    if (this.options.includeFragmentDetails) {
      this.addListener('FRAGMENT_LOADING_STARTED', this.handleFragmentEvent.bind(this));
      this.addListener('FRAGMENT_LOADING_COMPLETED', this.handleFragmentEvent.bind(this));
      this.addListener('FRAGMENT_LOADING_ABANDONED', this.handleFragmentEvent.bind(this));
    }

    // Optional metrics monitoring (very verbose)
    if (this.options.includeMetrics) {
      this.addListener('METRIC_ADDED', this.handleMetricEvent.bind(this));
      this.addListener('METRIC_UPDATED', this.handleMetricEvent.bind(this));
    }

    // Period switching for multi-period content
    if (this.options.includePeriodEvents) {
      this.addListener('PERIOD_SWITCH_STARTED', this.handlePeriodEvent.bind(this));
      this.addListener('PERIOD_SWITCH_COMPLETED', this.handlePeriodEvent.bind(this));
    }

    // Log events (only if explicitly enabled)
    if (this.options.includeDashLogs) {
      this.addListener('LOG', this.handleLogEvent.bind(this));
    }
  }

  /**
   * Add an event listener
   * @param {string} eventName - The event name (without MediaPlayer.events prefix)
   * @param {Function} handler - The event handler function
   */
  addListener(eventName, handler) {
    const eventConstant = this.dashjs.MediaPlayer.events[eventName];
    if (eventConstant) {
      this.dash.on(eventConstant, handler);
      this.eventListeners.set(eventName, handler);
    }
  }

  /**
   * Handle error events with detailed logging
   */
  handleError(e) {
    const error = e.error;
    const errorInfo = {
      timestamp: new Date().toISOString(),
      code: error.code,
      message: error.message,
      data: error.data,
      event: error.event,
    };

    // Map error codes to human-readable descriptions
    const errorDescriptions = {
      [this.dashjs.MediaPlayer.errors.MANIFEST_LOADER_PARSING_FAILURE_ERROR_CODE]:
        'Manifest parsing failed',
      [this.dashjs.MediaPlayer.errors.MANIFEST_LOADER_LOADING_FAILURE_ERROR_CODE]:
        'Manifest loading failed',
      [this.dashjs.MediaPlayer.errors.XLINK_LOADER_LOADING_FAILURE_ERROR_CODE]:
        'XLink loading failed',
      [this.dashjs.MediaPlayer.errors.SEGMENT_BASE_LOADER_ERROR_CODE]:
        'Segment base loading failed',
      [this.dashjs.MediaPlayer.errors.TIME_SYNC_FAILED_ERROR_CODE]: 'Time synchronization failed',
      [this.dashjs.MediaPlayer.errors.FRAGMENT_LOADER_LOADING_FAILURE_ERROR_CODE]:
        'Fragment loading failed',
      [this.dashjs.MediaPlayer.errors.FRAGMENT_LOADER_NULL_REQUEST_ERROR_CODE]:
        'Fragment loader null request',
      [this.dashjs.MediaPlayer.errors.MEDIA_KEYERR_CODE]: 'Media key error',
      [this.dashjs.MediaPlayer.errors.MEDIA_KEYERR_UNKNOWN_CODE]: 'Unknown media key error',
    };

    errorInfo.description = errorDescriptions[error.code] || 'Unknown error';

    console.error(`${this.options.logPrefix} ERROR:`, errorInfo);

    // Emit custom event for component to handle
    this.emitCustomEvent('dashMonitorError', errorInfo);
  }

  /**
   * Handle playback events
   */
  handlePlaybackEvent(e) {
    const eventData = {
      timestamp: new Date().toISOString(),
      event: this.getEventName(e),
      time: e.time,
    };

    this.log('info', 'Playback Event:', eventData);
    this.emitCustomEvent('dashMonitorPlayback', eventData);
  }

  /**
   * Handle stream events
   */
  handleStreamEvent(e) {
    const eventData = {
      timestamp: new Date().toISOString(),
      event: this.getEventName(e),
      streamInfo: e.streamInfo,
    };

    this.log('info', 'Stream Event:', eventData);
    this.emitCustomEvent('dashMonitorStream', eventData);
  }

  /**
   * Handle manifest events
   */
  handleManifestEvent(e) {
    const eventData = {
      timestamp: new Date().toISOString(),
      event: this.getEventName(e),
      url: e.data?.url,
      loadTime: e.data?.requestTime,
    };

    this.log('info', 'Manifest Event:', eventData);
    this.emitCustomEvent('dashMonitorManifest', eventData);
  }

  /**
   * Handle quality change events
   */
  handleQualityEvent(e) {
    const eventData = {
      timestamp: new Date().toISOString(),
      event: this.getEventName(e),
      mediaType: e.mediaType,
      oldQuality: e.oldQuality,
      newQuality: e.newQuality,
      streamInfo: e.streamInfo,
    };

    this.log('info', 'Quality Event:', eventData);
    this.emitCustomEvent('dashMonitorQuality', eventData);
  }

  /**
   * Handle buffer events
   */
  handleBufferEvent(e) {
    const eventData = {
      timestamp: new Date().toISOString(),
      event: this.getEventName(e),
      mediaType: e.mediaType,
      bufferedRange: e.bufferedRange,
    };

    const logLevel = this.getEventName(e).includes('EMPTY') ? 'warn' : 'info';
    this.log(logLevel, 'Buffer Event:', eventData);
    this.emitCustomEvent('dashMonitorBuffer', eventData);
  }

  /**
   * Handle playback state events (waiting, stalled, seeking)
   */
  handlePlaybackStateEvent(e) {
    const eventData = {
      timestamp: new Date().toISOString(),
      event: this.getEventName(e),
      seekTime: e.seekTime,
      time: e.time,
    };

    const logLevel = ['WAITING', 'STALLED'].some((state) => this.getEventName(e).includes(state))
      ? 'warn'
      : 'info';

    this.log(logLevel, 'Playback State Event:', eventData);
    this.emitCustomEvent('dashMonitorPlaybackState', eventData);
  }

  /**
   * Handle fragment loading events
   */
  handleFragmentEvent(e) {
    const eventData = {
      timestamp: new Date().toISOString(),
      event: this.getEventName(e),
      mediaType: e.mediaType,
      url: e.request?.url,
      bytesLoaded: e.request?.bytesLoaded,
      responseTime: e.request?.responseTime,
    };

    const logLevel = this.getEventName(e).includes('ABANDONED') ? 'warn' : 'info';
    this.log(logLevel, 'Fragment Event:', eventData);
    this.emitCustomEvent('dashMonitorFragment', eventData);
  }

  /**
   * Handle metric events
   */
  handleMetricEvent(e) {
    const eventData = {
      timestamp: new Date().toISOString(),
      event: this.getEventName(e),
      mediaType: e.mediaType,
      metric: e.metric,
    };

    this.log('info', 'Metric Event:', eventData);
    this.emitCustomEvent('dashMonitorMetric', eventData);
  }

  /**
   * Handle period switch events
   */
  handlePeriodEvent(e) {
    const eventData = {
      timestamp: new Date().toISOString(),
      event: this.getEventName(e),
      fromStreamInfo: e.fromStreamInfo,
      toStreamInfo: e.toStreamInfo,
    };

    this.log('info', 'Period Event:', eventData);
    this.emitCustomEvent('dashMonitorPeriod', eventData);
  }

  /**
   * Handle log events from dash.js
   */
  handleLogEvent(e) {
    if (this.shouldLogLevel(e.level)) {
      const logMethod = e.level === 'error' ? 'error' : e.level === 'warn' ? 'warn' : 'log';
      console[logMethod](`${this.options.logPrefix} [${e.level.toUpperCase()}]`, e.message);
    }
  }

  /**
   * Get event name from event object
   */
  getEventName(eventObj) {
    // Find the event name by looking up the event constant
    for (const [name, constant] of Object.entries(this.dashjs.MediaPlayer.events)) {
      if (eventObj.type === constant) {
        return name;
      }
    }
    return 'UNKNOWN_EVENT';
  }

  /**
   * Emit custom events for component integration
   */
  emitCustomEvent(eventName, data) {
    if (typeof window !== 'undefined' && window.dispatchEvent) {
      const customEvent = new CustomEvent(eventName, { detail: data });
      window.dispatchEvent(customEvent);
    }
  }

  /**
   * Log based on configured log level
   */
  log(level, message, data) {
    if (!this.shouldLogLevel(level)) return;

    const logMethod = level === 'error' ? 'error' : level === 'warn' ? 'warn' : 'log';

    console[logMethod](`${this.options.logPrefix} ${message}`, data);
  }

  /**
   * Check if should log based on configured log level
   */
  shouldLogLevel(level) {
    const levels = { error: 0, warn: 1, info: 2, all: 3 };
    const currentLevel = levels[this.options.logLevel] || 3;
    const messageLevel = levels[level] || 2;
    return messageLevel <= currentLevel;
  }

  /**
   * Get current monitoring statistics
   */
  getStats() {
    if (!this.dash) return null;

    try {
      return {
        version: this.dash.getVersion(),
        activeStream: this.dash.getActiveStream(),
        currentTime: this.dash.time(),
        duration: this.dash.duration(),
        isDynamic: this.dash.isDynamic(),
        bitrateInfoListFor: {
          video: this.dash.getBitrateInfoListFor('video'),
          audio: this.dash.getBitrateInfoListFor('audio'),
        },
        qualityFor: {
          video: this.dash.getQualityFor('video'),
          audio: this.dash.getQualityFor('audio'),
        },
      };
    } catch (error) {
      console.error(`${this.options.logPrefix} Error getting stats:`, error);
      return null;
    }
  }

  /**
   * Cleanup - remove all event listeners
   */
  destroy() {
    if (this.dash) {
      for (const [eventName, handler] of this.eventListeners) {
        const eventConstant = this.dashjs.MediaPlayer.events[eventName];
        if (eventConstant) {
          this.dash.off(eventConstant, handler);
        }
      }
    }

    this.eventListeners.clear();
    this.dash = null;
    this.dashjs = null;
  }
}

/**
 * Factory function to create and configure a DashMonitor instance
 */
export function createDashMonitor(options = {}) {
  return new DashMonitor(options);
}

/**
 * Quick setup function for basic monitoring
 */
export function setupBasicDashMonitoring(dashPlayer, dashjs, options = {}) {
  const monitor = createDashMonitor({
    logLevel: 'warn',
    includeMetrics: false,
    includeFragmentDetails: false,
    includeQualityEvents: false,
    includeBufferEvents: false,
    includeSeekEvents: false,
    includePeriodEvents: false,
    includeDashLogs: false,
    ...options,
  });

  monitor.init(dashPlayer, dashjs);
  return monitor;
}

/**
 * Quick setup function for detailed monitoring (development mode)
 */
export function setupDetailedDashMonitoring(dashPlayer, dashjs, options = {}) {
  const monitor = createDashMonitor({
    logLevel: 'info',
    includeMetrics: false,
    includeFragmentDetails: true,
    includeQualityEvents: true,
    includeBufferEvents: true,
    includeSeekEvents: true,
    includePeriodEvents: true,
    includeDashLogs: false,
    ...options,
  });

  monitor.init(dashPlayer, dashjs);
  return monitor;
}
