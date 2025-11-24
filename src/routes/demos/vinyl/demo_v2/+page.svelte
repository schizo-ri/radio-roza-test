<script>
  import SpinningVinyl from '$lib/components/SpinningVinyl.svelte';

  let playing = $state(false);
  let size = $state(250);
  let speed = $state(3);
</script>

<div class="demo-container">
  <h1>🎵 Vinyl Record with Play Button</h1>

  <p class="description">
    Notice how the partial grooves and light reflections give a clear sense of rotation even when
    the center is covered by the play button!
  </p>

  <div class="vinyl-showcase">
    <div class="vinyl-player">
      <SpinningVinyl bind:playing {size} {speed} />

      <!-- Play/Pause button overlay -->
      <button
        class="play-button"
        class:playing
        onclick={() => (playing = !playing)}
        aria-label={playing ? 'Pause' : 'Play'}
      >
        {#if playing}
          <!-- Pause icon -->
          <svg viewBox="0 0 24 24" width="40" height="40">
            <rect x="6" y="4" width="4" height="16" fill="currentColor" />
            <rect x="14" y="4" width="4" height="16" fill="currentColor" />
          </svg>
        {:else}
          <!-- Play icon -->
          <svg viewBox="0 0 24 24" width="40" height="40">
            <polygon points="8,5 19,12 8,19" fill="currentColor" />
          </svg>
        {/if}
      </button>
    </div>
  </div>

  <div class="controls">
    <div class="control-group">
      <label for="size">Size: {size}px</label>
      <input id="size" type="range" min="200" max="350" bind:value={size} />
    </div>

    <div class="control-group">
      <label for="speed">Speed: {speed}s per rotation</label>
      <input id="speed" type="range" min="1" max="8" step="0.5" bind:value={speed} />
    </div>
  </div>

  <div class="features">
    <h2>Enhanced Rotation Indicators</h2>
    <div class="feature-grid">
      <div class="feature">
        <h3>✨ Partial Groove Lines</h3>
        <p>Curved grooves visible on opposite sides that fade in and out during rotation</p>
      </div>
      <div class="feature">
        <h3>💎 Light Reflections</h3>
        <p>
          Angled white lines that shimmer and change opacity to simulate light bouncing off the
          vinyl
        </p>
      </div>
      <div class="feature">
        <h3>🎯 Perfect for Buttons</h3>
        <p>Rotation remains clearly visible even when the center is covered by play controls</p>
      </div>
    </div>
  </div>
</div>

<style>
  .demo-container {
    max-width: 900px;
    margin: 0 auto;
    padding: 2rem;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background: linear-gradient(135deg, #2d1b69 0%, #11998e 100%);
    min-height: 100vh;
    color: white;
  }

  h1 {
    text-align: center;
    margin-bottom: 1rem;
    font-size: 2.8rem;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.4);
  }

  .description {
    text-align: center;
    font-size: 1.1rem;
    margin-bottom: 3rem;
    opacity: 0.9;
    line-height: 1.6;
  }

  .vinyl-showcase {
    display: flex;
    justify-content: center;
    margin: 3rem 0;
    padding: 3rem;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 25px;
    backdrop-filter: blur(15px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3);
  }

  .vinyl-player {
    position: relative;
    display: inline-block;
  }

  .play-button {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80px;
    height: 80px;
    border-radius: 50%;
    border: none;
    background: rgba(255, 255, 255, 0.95);
    color: #333;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(10px);
  }

  .play-button:hover {
    background: rgba(255, 255, 255, 1);
    transform: translate(-50%, -50%) scale(1.1);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.4);
  }

  .play-button:active {
    transform: translate(-50%, -50%) scale(0.95);
  }

  .play-button.playing {
    background: rgba(255, 100, 100, 0.95);
    color: white;
  }

  .play-button.playing:hover {
    background: rgba(255, 100, 100, 1);
  }

  .controls {
    display: grid;
    gap: 2rem;
    margin: 3rem 0;
    padding: 2rem;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 20px;
    backdrop-filter: blur(10px);
  }

  .control-group {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
  }

  .control-group label {
    font-weight: 600;
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
  }

  .control-group input[type='range'] {
    width: 100%;
    height: 10px;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 8px;
    outline: none;
    appearance: none;
    -webkit-appearance: none;
    cursor: pointer;
  }

  .control-group input[type='range']::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 24px;
    height: 24px;
    background: linear-gradient(135deg, #ff6b6b, #feca57);
    border-radius: 50%;
    cursor: pointer;
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.4);
    transition: transform 0.2s ease;
  }

  .control-group input[type='range']::-webkit-slider-thumb:hover {
    transform: scale(1.2);
  }

  .control-group input[type='range']::-moz-range-thumb {
    width: 24px;
    height: 24px;
    background: linear-gradient(135deg, #ff6b6b, #feca57);
    border-radius: 50%;
    cursor: pointer;
    border: none;
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.4);
  }

  .features {
    margin-top: 4rem;
    padding: 2rem;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 20px;
    backdrop-filter: blur(10px);
  }

  .features h2 {
    margin-top: 0;
    margin-bottom: 2rem;
    font-size: 2rem;
    text-align: center;
  }

  .feature-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 2rem;
  }

  .feature {
    padding: 1.5rem;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 15px;
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  .feature h3 {
    margin-top: 0;
    margin-bottom: 1rem;
    font-size: 1.3rem;
    color: #feca57;
  }

  .feature p {
    margin: 0;
    line-height: 1.6;
    opacity: 0.9;
  }

  @media (max-width: 768px) {
    .demo-container {
      padding: 1rem;
    }

    h1 {
      font-size: 2.2rem;
    }

    .vinyl-showcase {
      padding: 2rem 1rem;
    }

    .play-button {
      width: 70px;
      height: 70px;
    }

    .play-button svg {
      width: 35px;
      height: 35px;
    }

    .feature-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
