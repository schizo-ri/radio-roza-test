<script>
  import { onMount } from 'svelte';
  import AudioPlayer from '$lib/components/AudioPlayer.svelte';
  import { browser } from '$app/environment';

  let testResults = $state([]);
  let simulatedInterruption = $state(false);
  let testAudioContext = $state(null);

  function addTestResult(message, type = 'info') {
    testResults = [
      ...testResults,
      {
        timestamp: new Date().toLocaleTimeString(),
        message,
        type,
      },
    ];
  }

  async function simulateAudioContextSuspension() {
    if (browser && testAudioContext) {
      try {
        await testAudioContext.suspend();
        addTestResult('AudioContext suspended (simulated device change)', 'warning');
        simulatedInterruption = true;

        setTimeout(async () => {
          if (testAudioContext) {
            await testAudioContext.resume();
            addTestResult('AudioContext resumed', 'success');
            simulatedInterruption = false;
          }
        }, 3000);
      } catch (error) {
        addTestResult(`Error simulating suspension: ${error.message}`, 'error');
      }
    }
  }

  function simulateDeviceChange() {
    addTestResult('Simulating audio device change...', 'info');

    // Dispatch a custom devicechange event
    if (browser && navigator.mediaDevices) {
      const event = new Event('devicechange');
      navigator.mediaDevices.dispatchEvent(event);
      addTestResult('Device change event dispatched', 'warning');
    }
  }

  function clearResults() {
    testResults = [];
  }

  // Initialize test audio context
  onMount(() => {
    if (browser) {
      testAudioContext = new (window.AudioContext || window.webkitAudioContext)();

      testAudioContext.addEventListener('statechange', () => {
        addTestResult(
          `AudioContext state: ${testAudioContext.state}`,
          testAudioContext.state === 'suspended' ? 'warning' : 'success'
        );
      });
    }
  });
</script>

<svelte:head>
  <title>Audio Interruption Detection Test - Radio Roza</title>
  <meta name="description" content="Test page for audio interruption detection features" />
</svelte:head>

<div class="test-container">
  <h1>Audio Interruption Detection Test</h1>

  <div class="description">
    <p>
      This page demonstrates the audio interruption detection features implemented in the
      AudioPlayer component:
    </p>
    <ul>
      <li><strong>Device Change Detection:</strong> Monitors when audio output devices change</li>
      <li><strong>AudioContext Suspension:</strong> Detects when audio context is suspended</li>
      <li>
        <strong>Playback Progress Monitoring:</strong> Checks if audio is stuck while claiming to play
      </li>
      <li><strong>Dash.js Event Monitoring:</strong> Listens for stream interruption events</li>
      <li><strong>Automatic Recovery:</strong> Attempts to recover from interruptions</li>
    </ul>
  </div>

  <div class="player-section">
    <h2>Audio Player</h2>
    <AudioPlayer />
  </div>

  <div class="test-controls">
    <h2>Interruption Tests</h2>
    <div class="buttons">
      <button onclick={simulateAudioContextSuspension} disabled={simulatedInterruption}>
        Simulate AudioContext Suspension
      </button>
      <button onclick={simulateDeviceChange}> Simulate Device Change </button>
      <button onclick={clearResults} class="secondary"> Clear Test Results </button>
    </div>

    {#if simulatedInterruption}
      <p class="status warning">⚠️ AudioContext suspension test in progress...</p>
    {/if}
  </div>

  <div class="test-results">
    <h2>Test Results & Console Log</h2>
    {#if testResults.length === 0}
      <p class="empty">
        No test results yet. Try the buttons above or check browser console for detailed logs.
      </p>
    {:else}
      <div class="results-list">
        {#each testResults as result, index (index)}
          <div class="result-item {result.type}">
            <span class="timestamp">{result.timestamp}</span>
            <span class="message">{result.message}</span>
          </div>
        {/each}
      </div>
    {/if}
  </div>

  <div class="instructions">
    <h2>Manual Testing Instructions</h2>
    <div class="instruction-grid">
      <div class="instruction">
        <h3>🎧 Change Audio Output Device</h3>
        <p>
          1. Start audio playback<br />
          2. Change your system's audio output device<br />
          3. Watch for interruption detection and recovery
        </p>
      </div>

      <div class="instruction">
        <h3>🔌 Unplug Headphones</h3>
        <p>
          1. Start playback with headphones<br />
          2. Unplug headphones during playback<br />
          3. Check if player detects the interruption
        </p>
      </div>

      <div class="instruction">
        <h3>💻 System Audio Focus</h3>
        <p>
          1. Start playback<br />
          2. Play audio from another application<br />
          3. Observe audio focus handling
        </p>
      </div>

      <div class="instruction">
        <h3>📱 Tab Switching (Mobile)</h3>
        <p>
          1. Start playback on mobile<br />
          2. Switch to another app or browser tab<br />
          3. Return and check if player state is correct
        </p>
      </div>
    </div>
  </div>

  <div class="technical-details">
    <h2>Technical Implementation</h2>
    <details>
      <summary>Detection Methods Used</summary>
      <ul>
        <li>
          <strong>navigator.mediaDevices.devicechange:</strong> Browser API for device changes
        </li>
        <li><strong>AudioContext.statechange:</strong> Web Audio API state monitoring</li>
        <li>
          <strong>Periodic Progress Checking:</strong> Monitors currentTime to detect stuck playback
        </li>
        <li><strong>HTML5 Audio Events:</strong> pause, play, waiting, stalled events</li>
        <li>
          <strong>Dash.js Events:</strong> PLAYBACK_PAUSED, PLAYBACK_STALLED, CONNECTION_CLOSED
        </li>
      </ul>
    </details>

    <details>
      <summary>Recovery Strategies</summary>
      <ul>
        <li><strong>AudioContext Resume:</strong> Attempts to resume suspended audio context</li>
        <li><strong>Player Reinitialization:</strong> Recreates dash.js player instance</li>
        <li><strong>Automatic Retry:</strong> Attempts playback after brief delay</li>
        <li><strong>Fallback Handling:</strong> Falls back to MP3 stream if DASH fails</li>
        <li><strong>User Recovery Button:</strong> Manual recovery option in error UI</li>
      </ul>
    </details>
  </div>
</div>

<style>
  .test-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
    font-family:
      system-ui,
      -apple-system,
      sans-serif;
  }

  h1 {
    color: #1f2937;
    margin-bottom: 1rem;
  }

  h2 {
    color: #374151;
    margin: 2rem 0 1rem 0;
    border-bottom: 2px solid #e5e7eb;
    padding-bottom: 0.5rem;
  }

  .description {
    background: #f3f4f6;
    padding: 1.5rem;
    border-radius: 8px;
    margin-bottom: 2rem;
  }

  .description ul {
    margin: 1rem 0 0 0;
    padding-left: 1.5rem;
  }

  .description li {
    margin-bottom: 0.5rem;
  }

  .player-section {
    background: white;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    padding: 1.5rem;
    margin-bottom: 2rem;
  }

  .test-controls {
    background: #fef3c7;
    padding: 1.5rem;
    border-radius: 8px;
    margin-bottom: 2rem;
  }

  .buttons {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    margin-bottom: 1rem;
  }

  button {
    background: #3b82f6;
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 6px;
    cursor: pointer;
    font-size: 0.875rem;
    transition: background-color 0.2s;
  }

  button:hover {
    background: #2563eb;
  }

  button:disabled {
    background: #9ca3af;
    cursor: not-allowed;
  }

  button.secondary {
    background: #6b7280;
  }

  button.secondary:hover {
    background: #4b5563;
  }

  .status {
    margin: 0;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    font-weight: 500;
  }

  .status.warning {
    background: #fef3c7;
    color: #92400e;
    border: 1px solid #fcd34d;
  }

  .test-results {
    background: white;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    padding: 1.5rem;
    margin-bottom: 2rem;
  }

  .empty {
    color: #6b7280;
    font-style: italic;
    text-align: center;
    padding: 2rem;
  }

  .results-list {
    max-height: 300px;
    overflow-y: auto;
    border: 1px solid #f3f4f6;
    border-radius: 4px;
  }

  .result-item {
    display: flex;
    gap: 1rem;
    padding: 0.75rem;
    border-bottom: 1px solid #f3f4f6;
    font-family: monospace;
    font-size: 0.875rem;
  }

  .result-item:last-child {
    border-bottom: none;
  }

  .result-item.info {
    background: #f0f9ff;
  }

  .result-item.success {
    background: #f0fdf4;
    color: #166534;
  }

  .result-item.warning {
    background: #fffbeb;
    color: #92400e;
  }

  .result-item.error {
    background: #fef2f2;
    color: #dc2626;
  }

  .timestamp {
    color: #6b7280;
    min-width: 80px;
  }

  .instructions {
    margin-bottom: 2rem;
  }

  .instruction-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;
    margin-top: 1rem;
  }

  .instruction {
    background: white;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    padding: 1.5rem;
  }

  .instruction h3 {
    margin: 0 0 1rem 0;
    color: #1f2937;
  }

  .instruction p {
    margin: 0;
    line-height: 1.6;
    color: #4b5563;
  }

  .technical-details {
    background: #f9fafb;
    padding: 1.5rem;
    border-radius: 8px;
  }

  details {
    margin-bottom: 1rem;
  }

  summary {
    cursor: pointer;
    font-weight: 600;
    color: #374151;
    padding: 0.5rem 0;
  }

  details ul {
    margin: 1rem 0 0 0;
    padding-left: 1.5rem;
  }

  details li {
    margin-bottom: 0.5rem;
    line-height: 1.5;
  }

  @media (max-width: 768px) {
    .test-container {
      padding: 1rem;
    }

    .buttons {
      flex-direction: column;
    }

    .instruction-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
