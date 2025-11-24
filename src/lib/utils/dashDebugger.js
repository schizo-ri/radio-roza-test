/**
 * Dash.js Development Debugger
 * Provides additional debugging utilities and UI for development
 */

export class DashDebugger {
  constructor(monitor, options = {}) {
    this.monitor = monitor;
    this.options = {
      enableConsoleCommands: true,
      enableDebugPanel: false,
      enableEventLog: true,
      maxLogEntries: 100,
      ...options,
    };

    this.eventLog = [];
    this.debugPanel = null;
    this.isAttached = false;
  }

  /**
   * Attach debugger to the page
   */
  attach() {
    if (this.isAttached) return;

    if (this.options.enableConsoleCommands) {
      this.setupConsoleCommands();
    }

    if (this.options.enableDebugPanel) {
      this.createDebugPanel();
    }

    if (this.options.enableEventLog) {
      this.setupEventLogging();
    }

    this.isAttached = true;
    console.log('[DASH DEBUGGER] Attached. Type dashDebug.help() for available commands.');
  }

  /**
   * Setup console debugging commands
   */
  setupConsoleCommands() {
    if (typeof window === 'undefined') return;

    window.dashDebug = {
      help: () => {
        console.log(`
🎵 Dash.js Debugger Commands:

📊 Status & Info:
  dashDebug.status()       - Show current dash.js status
  dashDebug.stats()        - Get detailed statistics
  dashDebug.version()      - Show dash.js version
  dashDebug.config()       - Show current configuration

📋 Logging:
  dashDebug.logs()         - Show recent event log
  dashDebug.clearLogs()    - Clear event log
  dashDebug.logLevel(level)- Set log level ('error', 'warn', 'info', 'all')

🔧 Debugging:
  dashDebug.qualities()    - Show available qualities
  dashDebug.switchQuality(index) - Force quality switch
  dashDebug.buffer()       - Show buffer information
  dashDebug.metrics()      - Show performance metrics

🎮 Controls:
  dashDebug.play()         - Start playback
  dashDebug.pause()        - Pause playback
  dashDebug.seek(time)     - Seek to time (seconds)

🐛 Debug Tools:
  dashDebug.debugPanel()   - Toggle debug panel
  dashDebug.simulate.error() - Simulate error
  dashDebug.simulate.stall() - Simulate playback stall
        `);
      },

      status: () => {
        const stats = this.monitor?.getStats();
        if (!stats) {
          console.log('❌ Dash.js not initialized');
          return;
        }

        console.log('📊 Dash.js Status:', {
          currentTime: stats.currentTime,
          duration: stats.duration,
          isDynamic: stats.isDynamic,
          activeStream: stats.activeStream,
          version: stats.version,
        });
      },

      stats: () => {
        const stats = this.monitor?.getStats();
        console.log('📈 Detailed Statistics:', stats);
      },

      version: () => {
        const stats = this.monitor?.getStats();
        console.log('🏷️  Dash.js Version:', stats?.version || 'Unknown');
      },

      config: () => {
        if (!this.monitor?.dash) {
          console.log('❌ Dash.js not initialized');
          return;
        }

        console.log('⚙️  Configuration:', {
          settings: this.monitor.dash.getSettings(),
          debug: this.monitor.dash.getDebug(),
        });
      },

      logs: (count = 20) => {
        const recentLogs = this.eventLog.slice(-count);
        console.table(recentLogs);
      },

      clearLogs: () => {
        this.eventLog = [];
        console.log('🧹 Event log cleared');
      },

      logLevel: (level) => {
        if (!level) {
          console.log('Current log level:', this.monitor?.options.logLevel);
          return;
        }

        if (this.monitor) {
          this.monitor.options.logLevel = level;
          console.log(`📝 Log level set to: ${level}`);
        }
      },

      qualities: () => {
        const stats = this.monitor?.getStats();
        if (!stats) {
          console.log('❌ Dash.js not initialized');
          return;
        }

        console.log('🎬 Available Qualities:');
        console.log('Video:', stats.bitrateInfoListFor.video);
        console.log('Audio:', stats.bitrateInfoListFor.audio);
        console.log('Current Video Quality:', stats.qualityFor.video);
        console.log('Current Audio Quality:', stats.qualityFor.audio);
      },

      switchQuality: (mediaType, qualityIndex) => {
        if (!this.monitor?.dash) {
          console.log('❌ Dash.js not initialized');
          return;
        }

        this.monitor.dash.setQualityFor(mediaType, qualityIndex);
        console.log(`🔄 Switched ${mediaType} quality to index ${qualityIndex}`);
      },

      buffer: () => {
        if (!this.monitor?.dash) {
          console.log('❌ Dash.js not initialized');
          return;
        }

        const bufferLength = this.monitor.dash.getBufferLength();
        console.log('🔄 Buffer Information:', {
          video: bufferLength('video'),
          audio: bufferLength('audio'),
        });
      },

      metrics: () => {
        if (!this.monitor?.dash) {
          console.log('❌ Dash.js not initialized');
          return;
        }

        const metrics = this.monitor.dash.getMetricsFor('video');
        console.log('📊 Performance Metrics:', metrics);
      },

      play: () => {
        if (!this.monitor?.dash) {
          console.log('❌ Dash.js not initialized');
          return;
        }

        this.monitor.dash.play();
        console.log('▶️  Playback started');
      },

      pause: () => {
        if (!this.monitor?.dash) {
          console.log('❌ Dash.js not initialized');
          return;
        }

        this.monitor.dash.pause();
        console.log('⏸️  Playback paused');
      },

      seek: (time) => {
        if (!this.monitor?.dash) {
          console.log('❌ Dash.js not initialized');
          return;
        }

        this.monitor.dash.seek(time);
        console.log(`⏩ Seeking to ${time}s`);
      },

      debugPanel: () => {
        this.toggleDebugPanel();
      },

      simulate: {
        error: () => {
          console.warn('🚨 Simulating error...');
          // Trigger a custom error event
          window.dispatchEvent(
            new CustomEvent('dashMonitorError', {
              detail: {
                timestamp: new Date().toISOString(),
                code: 'SIMULATED_ERROR',
                message: 'This is a simulated error for testing',
                description: 'Simulated error',
              },
            })
          );
        },

        stall: () => {
          console.warn('⏳ Simulating playback stall...');
          window.dispatchEvent(
            new CustomEvent('dashMonitorPlaybackState', {
              detail: {
                timestamp: new Date().toISOString(),
                event: 'PLAYBACK_STALLED',
              },
            })
          );
        },
      },
    };
  }

  /**
   * Setup event logging
   */
  setupEventLogging() {
    if (typeof window === 'undefined') return;

    const events = [
      'dashMonitorError',
      'dashMonitorPlayback',
      'dashMonitorStream',
      'dashMonitorManifest',
      'dashMonitorBuffer',
      'dashMonitorPlaybackState',
      'dashMonitorFragment',
      'dashMonitorQuality',
    ];

    events.forEach((eventName) => {
      window.addEventListener(eventName, (e) => {
        this.logEvent(eventName, e.detail);
      });
    });
  }

  /**
   * Log event to internal log
   */
  logEvent(eventName, data) {
    this.eventLog.push({
      timestamp: data.timestamp || new Date().toISOString(),
      event: eventName,
      details: data,
    });

    // Keep log size manageable
    if (this.eventLog.length > this.options.maxLogEntries) {
      this.eventLog = this.eventLog.slice(-this.options.maxLogEntries);
    }
  }

  /**
   * Create debug panel UI
   */
  createDebugPanel() {
    if (typeof window === 'undefined' || typeof document === 'undefined') return;

    const panel = document.createElement('div');
    panel.id = 'dash-debug-panel';
    panel.innerHTML = `
      <div style="
        position: fixed;
        top: 10px;
        right: 10px;
        width: 300px;
        max-height: 400px;
        background: rgba(0, 0, 0, 0.9);
        color: white;
        padding: 10px;
        border-radius: 5px;
        font-family: monospace;
        font-size: 12px;
        z-index: 10000;
        overflow-y: auto;
        display: none;
      ">
        <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
          <h3 style="margin: 0; color: #00ff00;">Dash.js Debug</h3>
          <button onclick="document.getElementById('dash-debug-panel').style.display='none'">×</button>
        </div>
        <div id="dash-debug-content">
          <div>Status: <span id="debug-status">Unknown</span></div>
          <div>Events: <span id="debug-event-count">0</span></div>
          <div style="margin-top: 10px;">
            <h4>Recent Events:</h4>
            <div id="debug-recent-events" style="max-height: 200px; overflow-y: auto;"></div>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(panel);
    this.debugPanel = panel;

    // Update panel every second
    setInterval(() => {
      this.updateDebugPanel();
    }, 1000);
  }

  /**
   * Toggle debug panel visibility
   */
  toggleDebugPanel() {
    if (!this.debugPanel) {
      this.createDebugPanel();
    }

    const panel = this.debugPanel.querySelector('div');
    panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
  }

  /**
   * Update debug panel content
   */
  updateDebugPanel() {
    if (!this.debugPanel) return;

    const statusEl = this.debugPanel.querySelector('#debug-status');
    const eventCountEl = this.debugPanel.querySelector('#debug-event-count');
    const eventsEl = this.debugPanel.querySelector('#debug-recent-events');

    if (statusEl) {
      const stats = this.monitor?.getStats();
      statusEl.textContent = stats ? 'Active' : 'Inactive';
      statusEl.style.color = stats ? '#00ff00' : '#ff0000';
    }

    if (eventCountEl) {
      eventCountEl.textContent = this.eventLog.length;
    }

    if (eventsEl) {
      const recentEvents = this.eventLog.slice(-5);
      eventsEl.innerHTML = recentEvents
        .map(
          (log) => `
        <div style="margin: 2px 0; padding: 2px; background: rgba(255,255,255,0.1); border-radius: 2px;">
          <small>${new Date(log.timestamp).toLocaleTimeString()}</small><br>
          <strong>${log.event}</strong>
        </div>
      `
        )
        .join('');
    }
  }

  /**
   * Generate debug report
   */
  generateReport() {
    const stats = this.monitor?.getStats();
    const recentLogs = this.eventLog.slice(-50);

    const report = {
      timestamp: new Date().toISOString(),
      dashjs: {
        version: stats?.version,
        stats: stats,
      },
      monitoring: {
        logLevel: this.monitor?.options.logLevel,
        includeMetrics: this.monitor?.options.includeMetrics,
        includeFragmentDetails: this.monitor?.options.includeFragmentDetails,
      },
      recentEvents: recentLogs,
      browser: {
        userAgent: navigator.userAgent,
        url: window.location.href,
      },
    };

    return report;
  }

  /**
   * Export debug report as JSON file
   */
  exportReport() {
    const report = this.generateReport();
    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `dash-debug-report-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    console.log('📄 Debug report exported');
  }

  /**
   * Detach debugger
   */
  detach() {
    if (typeof window !== 'undefined') {
      delete window.dashDebug;
    }

    if (this.debugPanel) {
      this.debugPanel.remove();
      this.debugPanel = null;
    }

    this.isAttached = false;
  }
}

/**
 * Create and attach debugger to a monitor instance
 */
export function createDashDebugger(monitor, options = {}) {
  const debug = new DashDebugger(monitor, options);
  debug.attach();
  return debug;
}

/**
 * Quick setup for development debugging
 */
export function enableDashDebugging(monitor, options = {}) {
  if (typeof process !== 'undefined' && process.env.NODE_ENV === 'production') {
    console.warn('Dash debugging should not be enabled in production');
    return null;
  }

  return createDashDebugger(monitor, {
    enableConsoleCommands: true,
    enableDebugPanel: true,
    enableEventLog: true,
    ...options,
  });
}
