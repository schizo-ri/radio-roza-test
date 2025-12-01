<script>
  import AudioPlayer from '$lib/components/AudioPlayer.svelte';
  import AudioPlayerAdvanced from '$lib/components/demo/AudioPlayerAdvanced.svelte';
  import AudioPlayerSimple from '$lib/components/demo/AudioPlayerSimple.svelte';
  import AudioPlayerOptimized from '$lib/components/demo/AudioPlayerOptimized.svelte';
  import BufferedRadioPlayer from '$lib/components/demo/BufferedRadioPlayer.svelte';
  import ManifestExplainer from '$lib/components/demo/ManifestExplainer.svelte';
  import { validateManifest, ManifestChecker } from '$lib/utils/manifestChecker.js';

  let selectedDemo = $state('buffered');
  let bufferPreset = $state('balanced');
  let testStreamUrl = $state('https://dash.akamaized.net/akamai/bbb_30fps/bbb_30fps.mpd');
  let fallbackUrl = $state('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3');
  let useTestStreams = $state(true);

  // Debug state
  let manifestCheckResult = $state(null);
  let isCheckingManifest = $state(false);

  // Manifest tracking for explainer
  let manifestUpdates = $state(0);
  let streamType = $state('unknown');
  let updateInterval = $state(null);
  let manifestSize = $state(0);

  const presetDescriptions = {
    fast: 'Minimal buffering for quick start (3s target)',
    balanced: 'Good balance of reliability and speed (8s target)',
    conservative: 'Maximum reliability with longer buffering (15s target)',
    aggressive: 'Heavy prebuffering for uninterrupted playback (20s target)',
  };

  const streamOptions = {
    production: {
      dash: 'https://radio-roza.org/stream/dash/live.mpd',
      fallback: 'https://stream.radio-roza.org/live.mp3',
    },
    test: {
      dash: 'https://dash.akamaized.net/akamai/bbb_30fps/bbb_30fps.mpd',
      fallback: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    },
  };

  // Update URLs when switching between test and production
  $effect(() => {
    if (useTestStreams) {
      testStreamUrl = streamOptions.test.dash;
      fallbackUrl = streamOptions.test.fallback;
    } else {
      testStreamUrl = streamOptions.production.dash;
      fallbackUrl = streamOptions.production.fallback;
    }
  });

  // Debug function to check manifest
  async function checkManifest(url = null) {
    const urlToCheck =
      url || (useTestStreams ? streamOptions.test.dash : streamOptions.production.dash);

    isCheckingManifest = true;
    manifestCheckResult = null;

    try {
      console.log('🔍 Checking manifest:', urlToCheck);
      const checker = new ManifestChecker(urlToCheck);
      await checker.validate();
      manifestCheckResult = checker.getReport();
      checker.printReport();
    } catch (error) {
      console.error('❌ Manifest check failed:', error);
      manifestCheckResult = {
        valid: false,
        error: error.message,
        url: urlToCheck,
      };
    } finally {
      isCheckingManifest = false;
    }
  }
</script>

<svelte:head>
  <title>Roza Audio Player - Buffering Demo</title>
  <meta name="description" content="Demo of advanced audio streaming with chunk buffering" />
</svelte:head>

<div class="page">
  <header class="header">
    <h1>🎵 Roza Audio Player</h1>
    <p class="subtitle">Advanced streaming with intelligent chunk buffering</p>
  </header>

  <div class="demo-selector">
    <h2>Choose Demo Version</h2>

    <!-- Stream Selection -->
    <div class="stream-selector">
      <label class="stream-option">
        <input type="radio" bind:group={useTestStreams} value={true} />
        <span>🧪 Test Streams (Reliable for testing)</span>
      </label>
      <label class="stream-option">
        <input type="radio" bind:group={useTestStreams} value={false} />
        <span>📻 Production Streams (Your radio stream)</span>
      </label>
    </div>

    <div class="current-streams">
      <small>
        <strong>DASH:</strong>
        {testStreamUrl}<br />
        <strong>Fallback:</strong>
        {fallbackUrl}
      </small>
    </div>

    <!-- Manifest Checker -->
    <div class="manifest-checker">
      <button
        class="check-manifest-btn"
        onclick={() => checkManifest()}
        disabled={isCheckingManifest}
      >
        {#if isCheckingManifest}
          🔄 Checking Manifest...
        {:else}
          🔍 Check Current Manifest
        {/if}
      </button>

      {#if manifestCheckResult}
        <div class="manifest-result {manifestCheckResult.valid ? 'valid' : 'invalid'}">
          <h4>
            {manifestCheckResult.valid ? '✅ Manifest Valid' : '❌ Manifest Issues Found'}
          </h4>

          {#if manifestCheckResult.error}
            <p class="error">Error: {manifestCheckResult.error}</p>
          {:else if manifestCheckResult.summary}
            <div class="manifest-summary">
              <p><strong>Stream Type:</strong> {manifestCheckResult.summary.streamType}</p>
              <p><strong>Audio Tracks:</strong> {manifestCheckResult.summary.audioTracks}</p>
              <p><strong>Video Tracks:</strong> {manifestCheckResult.summary.videoTracks}</p>
              <p>
                <strong>Segments Accessible:</strong>
                {manifestCheckResult.summary.segmentsAccessible ? '✅' : '❌'}
              </p>
            </div>

            {#if manifestCheckResult.issues.length > 0}
              <div class="issues">
                <h5>Issues:</h5>
                <ul>
                  {#each manifestCheckResult.issues as issue}
                    <li>[{issue.type}] {issue.message}</li>
                  {/each}
                </ul>
              </div>
            {/if}

            {#if manifestCheckResult.warnings.length > 0}
              <div class="warnings">
                <h5>Warnings:</h5>
                <ul>
                  {#each manifestCheckResult.warnings as warning}
                    <li>[{warning.type}] {warning.message}</li>
                  {/each}
                </ul>
              </div>
            {/if}
          {/if}
        </div>
      {/if}
    </div>

    <div class="demo-tabs">
      <button
        class="tab-button {selectedDemo === 'buffered' ? 'active' : ''}"
        onclick={() => (selectedDemo = 'buffered')}
      >
        📻 Buffered Radio
      </button>
      <button
        class="tab-button {selectedDemo === 'optimized' ? 'active' : ''}"
        onclick={() => (selectedDemo = 'optimized')}
      >
        🚀 Optimized Player
      </button>
      <button
        class="tab-button {selectedDemo === 'simple' ? 'active' : ''}"
        onclick={() => (selectedDemo = 'simple')}
      >
        Simple Player
      </button>
      <button
        class="tab-button {selectedDemo === 'basic' ? 'active' : ''}"
        onclick={() => (selectedDemo = 'basic')}
      >
        Basic Player
      </button>
      <button
        class="tab-button {selectedDemo === 'advanced' ? 'active' : ''}"
        onclick={() => (selectedDemo = 'advanced')}
      >
        Advanced Buffering
      </button>
    </div>
  </div>

  {#if selectedDemo === 'buffered'}
    <section class="demo-section">
      <h3>📻 Buffered Radio Player</h3>
      <p>
        <strong>Designed specifically for stable radio streaming!</strong>
        Builds large buffers and stays behind the live edge to completely eliminate jankiness.
      </p>

      <div class="features">
        <h4>Anti-Jank Features:</h4>
        <ul>
          <li>🎯 <strong>15-second target buffer</strong> before allowing playback</li>
          <li>⏰ Stays 15+ seconds behind live edge for maximum stability</li>
          <li>📊 Real-time buffer health monitoring</li>
          <li>🛡️ Prevents playback until buffer is fully built</li>
          <li>🔧 Automatically handles buffer management</li>
          <li>⚡ Graceful fallback to MP3 if needed</li>
          <li>💪 Prioritizes <em>smooth playback</em> over <em>low latency</em></li>
        </ul>
      </div>

      <div class="buffer-config">
        <h4>📈 Buffer Strategy:</h4>
        <div class="config-grid">
          <div class="config-item">
            <span class="config-label">Target Buffer:</span>
            <span class="config-value">15 seconds</span>
          </div>
          <div class="config-item">
            <span class="config-label">Max Buffer:</span>
            <span class="config-value">45 seconds</span>
          </div>
          <div class="config-item">
            <span class="config-label">Live Delay:</span>
            <span class="config-value">15+ seconds</span>
          </div>
          <div class="config-item">
            <span class="config-label">Strategy:</span>
            <span class="config-value">Stability First</span>
          </div>
        </div>
      </div>

      <div class="player-container">
        <BufferedRadioPlayer
          streamUrl={testStreamUrl}
          {fallbackUrl}
          autoPlay={false}
          targetBuffer={15}
          maxBuffer={45}
        />
      </div>
    </section>
  {:else if selectedDemo === 'optimized'}
    <section class="demo-section">
      <h3>🚀 Optimized Audio Player</h3>
      <p>
        Intelligent manifest update handling with detailed monitoring and explanations.
        <strong>Best for understanding and optimizing live streams!</strong>
      </p>

      <div class="features">
        <h4>Features:</h4>
        <ul>
          <li>✅ Automatic stream type detection</li>
          <li>📊 Real-time manifest update monitoring</li>
          <li>🔍 Detailed network usage statistics</li>
          <li>⚡ Intelligent update frequency optimization</li>
          <li>📖 Built-in educational explanations</li>
          <li>🎯 Live stream specific optimizations</li>
          <li>📈 Network efficiency tracking</li>
        </ul>
      </div>

      <div class="player-container">
        <AudioPlayerOptimized
          streamUrl={testStreamUrl}
          {fallbackUrl}
          autoPlay={false}
          enableManifestOptimization={true}
        />

        <!-- Manifest update explainer -->
        <ManifestExplainer
          {manifestUpdates}
          {streamType}
          {updateInterval}
          {manifestSize}
          isExpanded={false}
        />
      </div>
    </section>
  {:else if selectedDemo === 'simple'}
    <section class="demo-section">
      <h3>Simple Audio Player</h3>
      <p>Clean, working implementation with modern Dash.js settings.</p>

      <div class="features">
        <h4>Features:</h4>
        <ul>
          <li>✅ Modern Dash.js buffering (10s stable buffer)</li>
          <li>✅ Automatic MP3 fallback</li>
          <li>✅ Real-time buffer monitoring</li>
          <li>✅ Clean error handling</li>
          <li>✅ No deprecated settings warnings</li>
          <li>✅ Beautiful responsive design</li>
        </ul>
      </div>

      <div class="player-container">
        <AudioPlayerSimple streamUrl={testStreamUrl} {fallbackUrl} autoPlay={false} />
      </div>
    </section>
  {:else if selectedDemo === 'basic'}
    <section class="demo-section">
      <h3>Basic Audio Player</h3>
      <p>Original implementation with basic Dash.js buffering configuration.</p>

      <div class="features">
        <h4>Features:</h4>
        <ul>
          <li>✅ Automatic Dash.js buffering</li>
          <li>✅ MP3 fallback support</li>
          <li>✅ Buffer status indicators</li>
          <li>✅ Play when ready functionality</li>
        </ul>
      </div>

      <div class="player-container">
        <AudioPlayer streamUrl={testStreamUrl} {fallbackUrl} />
      </div>
    </section>
  {:else if selectedDemo === 'advanced'}
    <section class="demo-section">
      <h3>Advanced Buffering Manager</h3>
      <p>Sophisticated buffering control with chunk preloading and multiple buffer strategies.</p>

      <div class="buffer-preset-selector">
        <h4>Buffering Strategy:</h4>
        <div class="preset-options">
          {#each Object.entries(presetDescriptions) as [preset, description] (preset)}
            <label class="preset-option">
              <input type="radio" bind:group={bufferPreset} value={preset} />
              <div class="preset-info">
                <span class="preset-name">{preset.charAt(0).toUpperCase() + preset.slice(1)}</span>
                <span class="preset-desc">{description}</span>
              </div>
            </label>
          {/each}
        </div>
      </div>

      <div class="features">
        <h4>Advanced Features:</h4>
        <ul>
          <li>🚀 Intelligent chunk preloading</li>
          <li>📊 Real-time buffer monitoring</li>
          <li>⚙️ Configurable buffer strategies</li>
          <li>🔄 Automatic quality adaptation</li>
          <li>📈 Detailed buffering statistics</li>
          <li>🛠️ Force buffer controls</li>
          <li>🎯 Optimized for streaming radio</li>
        </ul>
      </div>

      <div class="player-container">
        <AudioPlayerAdvanced
          streamUrl={testStreamUrl}
          {fallbackUrl}
          {bufferPreset}
          autoPlay={false}
          showProgress={true}
          showControls={true}
        />
      </div>
    </section>
  {/if}

  <section class="info-section">
    <h2>How Chunk Buffering Works</h2>

    <div class="info-grid">
      <div class="info-card">
        <h3>🧩 Chunk Loading</h3>
        <p>
          The player loads audio segments (chunks) ahead of playback. Each chunk typically contains
          2-6 seconds of audio.
        </p>
      </div>

      <div class="info-card">
        <h3>⏰ Buffer Targets</h3>
        <p>
          Different strategies target different buffer levels:
          <br /><strong>Fast:</strong> 3s minimum
          <br /><strong>Balanced:</strong> 8s target
          <br /><strong>Conservative:</strong> 15s+ buffer
        </p>
      </div>

      <div class="info-card">
        <h3>🎯 Smart Prebuffering</h3>
        <p>
          Before you press play, the player can preload several chunks, ensuring smooth playback
          from the start.
        </p>
      </div>

      <div class="info-card">
        <h3>🔄 Adaptive Loading</h3>
        <p>
          The system monitors network conditions and adjusts buffer targets dynamically for optimal
          performance.
        </p>
      </div>
    </div>
  </section>

  <section class="technical-info">
    <h2>Technical Implementation</h2>

    <div class="tech-details">
      <div class="tech-item">
        <h4>🎵 Dash.js Integration</h4>
        <p>Uses industry-standard MPEG-DASH streaming with configurable buffer management.</p>
      </div>

      <div class="tech-item">
        <h4>🔧 Buffer Configuration</h4>
        <code>
          streaming.buffer.stableBufferTime: 10s<br />
          streaming.buffer.bufferToKeep: 20s<br />
          streaming.gaps.jumpGaps: true
        </code>
      </div>

      <div class="tech-item">
        <h4>📡 Fallback Support</h4>
        <p>Automatically falls back to MP3 stream if DASH manifest is unavailable.</p>
      </div>
    </div>
  </section>

  <footer class="footer">
    <p>
      Built with <a href="https://svelte.dev" target="_blank">Svelte 5</a> • Powered by
      <a href="https://github.com/Dash-Industry-Forum/dash.js" target="_blank">Dash.js</a>
    </p>
  </footer>
</div>

<style>
  .page {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    line-height: 1.6;
    color: #333;
  }

  .header {
    text-align: center;
    margin-bottom: 3rem;
  }

  .header h1 {
    font-size: 3rem;
    margin: 0;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .subtitle {
    font-size: 1.2rem;
    color: #666;
    margin: 0.5rem 0 0 0;
  }

  .demo-selector {
    margin-bottom: 2rem;
  }

  .demo-selector h2 {
    text-align: center;
    margin-bottom: 1rem;
  }

  .stream-selector {
    display: flex;
    justify-content: center;
    gap: 2rem;
    margin-bottom: 1rem;
    padding: 1rem;
    background: white;
    border-radius: 8px;
    border: 1px solid #e1e8ff;
  }

  .stream-option {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
    padding: 0.5rem;
    border-radius: 4px;
    transition: background-color 0.2s;
  }

  .stream-option:hover {
    background: #f8f9ff;
  }

  .current-streams {
    text-align: center;
    margin-bottom: 1rem;
    padding: 0.75rem;
    background: #f8f9ff;
    border-radius: 6px;
    font-family: monospace;
    word-break: break-all;
  }

  .current-streams small {
    color: #666;
    line-height: 1.4;
  }

  .manifest-checker {
    margin: 1rem 0;
    padding: 1rem;
    background: white;
    border-radius: 8px;
    border: 1px solid #e1e8ff;
  }

  .check-manifest-btn {
    background: #667eea;
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 6px;
    cursor: pointer;
    font-weight: 600;
    transition: all 0.3s ease;
    width: 100%;
  }

  .check-manifest-btn:hover:not(:disabled) {
    background: #5a67d8;
  }

  .check-manifest-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .manifest-result {
    margin-top: 1rem;
    padding: 1rem;
    border-radius: 6px;
    border: 1px solid;
  }

  .manifest-result.valid {
    background: rgba(40, 167, 69, 0.1);
    border-color: #28a745;
    color: #155724;
  }

  .manifest-result.invalid {
    background: rgba(220, 53, 69, 0.1);
    border-color: #dc3545;
    color: #721c24;
  }

  .manifest-result h4 {
    margin: 0 0 1rem 0;
  }

  .manifest-summary {
    margin: 0.5rem 0;
  }

  .manifest-summary p {
    margin: 0.25rem 0;
  }

  .issues,
  .warnings {
    margin-top: 1rem;
  }

  .issues h5,
  .warnings h5 {
    margin: 0 0 0.5rem 0;
    color: #dc3545;
  }

  .warnings h5 {
    color: #856404;
  }

  .issues ul,
  .warnings ul {
    margin: 0;
    padding-left: 1.5rem;
  }

  .issues li,
  .warnings li {
    margin: 0.25rem 0;
    font-size: 0.9rem;
  }

  .error {
    color: #dc3545;
    font-weight: 600;
  }

  .demo-tabs {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 2rem;
  }

  .tab-button {
    padding: 0.75rem 1.5rem;
    border: 2px solid #667eea;
    background: white;
    color: #667eea;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 600;
    transition: all 0.3s ease;
  }

  .tab-button.active {
    background: #667eea;
    color: white;
  }

  .tab-button:hover:not(.active) {
    background: #f8f9ff;
  }

  .demo-section {
    margin-bottom: 3rem;
    padding: 2rem;
    background: #f8f9ff;
    border-radius: 12px;
    border: 1px solid #e1e8ff;
  }

  .demo-section h3 {
    margin-top: 0;
    color: #4c51bf;
  }

  .buffer-preset-selector {
    margin: 1.5rem 0;
    padding: 1.5rem;
    background: white;
    border-radius: 8px;
    border: 1px solid #e1e8ff;
  }

  .buffer-preset-selector h4 {
    margin-top: 0;
    margin-bottom: 1rem;
  }

  .preset-options {
    display: grid;
    gap: 0.75rem;
  }

  .preset-option {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem;
    border-radius: 6px;
    cursor: pointer;
    transition: background-color 0.2s;
  }

  .preset-option:hover {
    background: #f8f9ff;
  }

  .preset-info {
    display: flex;
    flex-direction: column;
  }

  .preset-name {
    font-weight: 600;
    color: #4c51bf;
  }

  .preset-desc {
    font-size: 0.9rem;
    color: #666;
  }

  .features {
    margin: 1.5rem 0;
    padding: 1.5rem;
    background: white;
    border-radius: 8px;
    border: 1px solid #e1e8ff;
  }

  .features h4 {
    margin-top: 0;
    margin-bottom: 1rem;
    color: #4c51bf;
  }

  .features ul {
    margin: 0;
    padding-left: 1.5rem;
  }

  .features li {
    margin-bottom: 0.5rem;
  }

  .buffer-config {
    margin: 1.5rem 0;
    padding: 1.5rem;
    background: rgba(255, 193, 7, 0.1);
    border-radius: 8px;
    border: 1px solid rgba(255, 193, 7, 0.2);
  }

  .buffer-config h4 {
    margin-top: 0;
    margin-bottom: 1rem;
    color: #856404;
  }

  .config-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 1rem;
  }

  .config-item {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    padding: 0.75rem;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 6px;
  }

  .config-label {
    font-size: 0.8rem;
    opacity: 0.8;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .config-value {
    font-weight: bold;
    color: #856404;
  }

  .player-container {
    margin-top: 2rem;
    padding: 2rem;
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  .info-section {
    margin: 3rem 0;
  }

  .info-section h2 {
    text-align: center;
    margin-bottom: 2rem;
    color: #4c51bf;
  }

  .info-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
  }

  .info-card {
    padding: 1.5rem;
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    border: 1px solid #e1e8ff;
  }

  .info-card h3 {
    margin-top: 0;
    margin-bottom: 1rem;
    color: #4c51bf;
  }

  .info-card p {
    margin: 0;
    color: #666;
  }

  .technical-info {
    margin: 3rem 0;
    padding: 2rem;
    background: #f1f5f9;
    border-radius: 12px;
  }

  .technical-info h2 {
    text-align: center;
    margin-bottom: 2rem;
    color: #334155;
  }

  .tech-details {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
  }

  .tech-item {
    padding: 1.5rem;
    background: white;
    border-radius: 8px;
    border: 1px solid #cbd5e1;
  }

  .tech-item h4 {
    margin-top: 0;
    margin-bottom: 1rem;
    color: #475569;
  }

  .tech-item code {
    display: block;
    padding: 1rem;
    background: #f8fafc;
    border-radius: 4px;
    font-family: 'Fira Code', 'Consolas', monospace;
    font-size: 0.9rem;
    color: #475569;
    border: 1px solid #e2e8f0;
  }

  .tech-item p {
    margin: 0;
    color: #64748b;
  }

  .footer {
    margin-top: 4rem;
    padding: 2rem 0;
    text-align: center;
    color: #666;
    border-top: 1px solid #e1e8ff;
  }

  .footer a {
    color: #667eea;
    text-decoration: none;
  }

  .footer a:hover {
    text-decoration: underline;
  }

  @media (max-width: 768px) {
    .page {
      padding: 1rem;
    }

    .header h1 {
      font-size: 2rem;
    }

    .stream-selector {
      flex-direction: column;
      align-items: center;
    }

    .demo-tabs {
      flex-direction: column;
      align-items: center;
    }

    .tab-button {
      width: 200px;
    }

    .demo-section {
      padding: 1rem;
    }

    .info-grid {
      grid-template-columns: 1fr;
    }

    .tech-details {
      grid-template-columns: 1fr;
    }
  }
</style>
