<script>
  let {
    manifestUpdates = 0,
    streamType = 'unknown',
    updateInterval = null,
    manifestSize = 0,
    isExpanded = false,
  } = $props();

  function formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  function getEfficiencyColor(updates, size) {
    const totalData = updates * size;
    if (totalData < 10000) return '#4ade80'; // Green
    if (totalData < 50000) return '#fbbf24'; // Yellow
    if (totalData < 100000) return '#fb923c'; // Orange
    return '#ef4444'; // Red
  }
</script>

<div class="manifest-explainer">
  <button class="toggle-btn" onclick={() => (isExpanded = !isExpanded)} aria-expanded={isExpanded}>
    <span class="icon">{isExpanded ? '📖' : '❓'}</span>
    Why is the manifest downloading repeatedly?
    <span class="chevron {isExpanded ? 'expanded' : ''}">{isExpanded ? '▲' : '▼'}</span>
  </button>

  {#if isExpanded}
    <div class="content">
      <div class="explanation">
        <h3>🔄 DASH Manifest Updates Explained</h3>

        <div class="current-stats">
          <div class="stat-card">
            <span class="stat-label">Stream Type</span>
            <span class="stat-value {streamType}">{streamType}</span>
          </div>

          {#if streamType === 'dynamic'}
            <div class="stat-card">
              <span class="stat-label">Updates</span>
              <span class="stat-value">{manifestUpdates}</span>
            </div>

            {#if updateInterval}
              <div class="stat-card">
                <span class="stat-label">Frequency</span>
                <span class="stat-value">{updateInterval / 1000}s</span>
              </div>
            {/if}

            <div class="stat-card">
              <span class="stat-label">Data Used</span>
              <span
                class="stat-value"
                style="color: {getEfficiencyColor(manifestUpdates, manifestSize)}"
              >
                {formatBytes(manifestUpdates * manifestSize)}
              </span>
            </div>
          {/if}
        </div>

        <div class="why-section">
          <h4>🤔 Why This Happens</h4>

          {#if streamType === 'dynamic'}
            <div class="reason-card live">
              <div class="reason-header">
                <span class="reason-icon">📺</span>
                <strong>Live Stream Detected</strong>
              </div>
              <p>
                Your manifest has <code>type="dynamic"</code>, which means it's a
                <strong>live stream</strong>. For live streams, the manifest must be updated
                regularly to:
              </p>
              <ul>
                <li>📦 Get URLs for newly available segments</li>
                <li>⏰ Update the segment timeline as time progresses</li>
                <li>🗑️ Remove expired segments from the timeline</li>
                <li>🎯 Keep the player synchronized with the live edge</li>
              </ul>
            </div>

            <div class="reason-card technical">
              <div class="reason-header">
                <span class="reason-icon">⚙️</span>
                <strong>Your Manifest Settings</strong>
              </div>
              <ul>
                <li>
                  <code>minimumUpdatePeriod="PT2S"</code> → Updates every <strong>2 seconds</strong>
                </li>
                <li>
                  <code>timeShiftBufferDepth="PT20.2S"</code> → Only keeps
                  <strong>20 seconds</strong> of segments
                </li>
                <li>Short buffer means frequent updates are necessary</li>
              </ul>
            </div>
          {:else if streamType === 'static'}
            <div class="reason-card vod">
              <div class="reason-header">
                <span class="reason-icon">📄</span>
                <strong>VOD Stream</strong>
              </div>
              <p>
                This is a Video-on-Demand stream. The manifest should only be downloaded <strong
                  >once</strong
                >
                since all segments are pre-generated and don't change.
              </p>
            </div>
          {:else}
            <div class="reason-card unknown">
              <div class="reason-header">
                <span class="reason-icon">❔</span>
                <strong>Stream Type Unknown</strong>
              </div>
              <p>Unable to determine stream characteristics. Check console for more details.</p>
            </div>
          {/if}
        </div>

        {#if streamType === 'dynamic'}
          <div class="optimization-section">
            <h4>🚀 Optimization Strategies</h4>

            <div class="strategy-card">
              <div class="strategy-header">
                <span class="strategy-icon">✅</span>
                <strong>Normal Behavior</strong>
              </div>
              <p>
                The frequent manifest updates are <strong>completely normal</strong> for live streams.
                This is how DASH maintains synchronization with live content.
              </p>
            </div>

            <div class="strategy-card">
              <div class="strategy-header">
                <span class="strategy-icon">📊</span>
                <strong>Data Usage</strong>
              </div>
              <p>
                Each manifest update downloads ~{formatBytes(manifestSize)}. Over time this adds up,
                but it's necessary for live streaming functionality.
              </p>
              <div class="data-breakdown">
                <div class="data-item">
                  <span>Per hour:</span>
                  <span>{formatBytes(manifestSize * (3600 / (updateInterval / 1000)))}</span>
                </div>
                <div class="data-item">
                  <span>Per day:</span>
                  <span>{formatBytes(manifestSize * (86400 / (updateInterval / 1000)))}</span>
                </div>
              </div>
            </div>

            <div class="strategy-card">
              <div class="strategy-header">
                <span class="strategy-icon">⚡</span>
                <strong>Optimizations Applied</strong>
              </div>
              <ul>
                <li>Reduced buffer requirements for faster startup</li>
                <li>Intelligent caching of manifest responses</li>
                <li>Segment timeline calculations to minimize updates</li>
                <li>Network failure retry delays</li>
              </ul>
            </div>
          </div>

          <div class="server-suggestions">
            <h4>🛠️ Server-Side Optimizations</h4>
            <div class="suggestion-card">
              <h5>Increase Update Interval</h5>
              <p>
                Consider increasing <code>minimumUpdatePeriod</code> to 5-10 seconds if acceptable latency
                increase.
              </p>
              <code>minimumUpdatePeriod="PT5S"</code>
            </div>

            <div class="suggestion-card">
              <h5>Longer Buffer Depth</h5>
              <p>Increase <code>timeShiftBufferDepth</code> to reduce update frequency.</p>
              <code>timeShiftBufferDepth="PT60S"</code>
            </div>

            <div class="suggestion-card">
              <h5>HTTP Caching Headers</h5>
              <p>Add appropriate cache headers to manifest responses.</p>
              <code>Cache-Control: max-age=2, must-revalidate</code>
            </div>
          </div>
        {/if}
      </div>
    </div>
  {/if}
</div>

<style>
  .manifest-explainer {
    margin-top: 1rem;
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 8px;
    overflow: hidden;
    background: rgba(0, 0, 0, 0.1);
  }

  .toggle-btn {
    width: 100%;
    padding: 1rem;
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.9rem;
    transition: background-color 0.3s ease;
  }

  .toggle-btn:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  .icon {
    font-size: 1.1rem;
  }

  .chevron {
    margin-left: auto;
    transition: transform 0.3s ease;
  }

  .chevron.expanded {
    transform: rotate(180deg);
  }

  .content {
    padding: 1rem;
    background: rgba(255, 255, 255, 0.05);
    animation: slideDown 0.3s ease;
  }

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .explanation h3,
  .explanation h4 {
    margin: 0 0 1rem 0;
    color: #ffffff;
  }

  .explanation h4 {
    font-size: 1rem;
    margin-top: 2rem;
  }

  .current-stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 0.5rem;
    margin-bottom: 2rem;
  }

  .stat-card {
    background: rgba(255, 255, 255, 0.1);
    padding: 0.75rem;
    border-radius: 6px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .stat-label {
    font-size: 0.7rem;
    opacity: 0.8;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .stat-value {
    font-weight: bold;
    font-size: 0.9rem;
    margin-top: 0.25rem;
  }

  .stat-value.dynamic {
    color: #fbbf24;
  }

  .stat-value.static {
    color: #4ade80;
  }

  .reason-card,
  .strategy-card,
  .suggestion-card {
    background: rgba(255, 255, 255, 0.08);
    border-radius: 8px;
    padding: 1rem;
    margin-bottom: 1rem;
    border-left: 4px solid;
  }

  .reason-card.live {
    border-left-color: #fbbf24;
  }

  .reason-card.technical {
    border-left-color: #8b5cf6;
  }

  .reason-card.vod {
    border-left-color: #4ade80;
  }

  .reason-card.unknown {
    border-left-color: #6b7280;
  }

  .strategy-card {
    border-left-color: #06b6d4;
  }

  .suggestion-card {
    border-left-color: #10b981;
  }

  .reason-header,
  .strategy-header {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.5rem;
  }

  .reason-icon,
  .strategy-icon {
    font-size: 1.1rem;
  }

  .reason-card p,
  .strategy-card p {
    margin: 0.5rem 0;
    line-height: 1.5;
    opacity: 0.9;
  }

  .reason-card ul,
  .strategy-card ul {
    margin: 0.5rem 0;
    padding-left: 1.5rem;
    opacity: 0.9;
  }

  .reason-card li,
  .strategy-card li {
    margin: 0.25rem 0;
  }

  .data-breakdown {
    margin-top: 0.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .data-item {
    display: flex;
    justify-content: space-between;
    font-size: 0.85rem;
    opacity: 0.8;
  }

  .server-suggestions {
    margin-top: 2rem;
  }

  .suggestion-card h5 {
    margin: 0 0 0.5rem 0;
    color: #10b981;
    font-size: 0.9rem;
  }

  .suggestion-card p {
    margin: 0 0 0.5rem 0;
    font-size: 0.85rem;
    opacity: 0.9;
  }

  code {
    background: rgba(0, 0, 0, 0.3);
    padding: 0.125rem 0.25rem;
    border-radius: 3px;
    font-family: 'Fira Code', 'Consolas', monospace;
    font-size: 0.8rem;
    color: #fbbf24;
  }

  .suggestion-card code {
    display: block;
    margin-top: 0.5rem;
    padding: 0.5rem;
    background: rgba(0, 0, 0, 0.4);
    border-radius: 4px;
    color: #4ade80;
  }

  @media (max-width: 480px) {
    .current-stats {
      grid-template-columns: repeat(2, 1fr);
    }

    .toggle-btn {
      font-size: 0.85rem;
    }

    .content {
      padding: 0.75rem;
    }
  }
</style>
