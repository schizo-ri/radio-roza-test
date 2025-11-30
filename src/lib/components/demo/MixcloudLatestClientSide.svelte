<!-- Client-side data loading using proper Svelte 5 patterns -->
<script>
  let { limit = 8 } = $props();

  // Create a reactive resource pattern
  async function fetchMixcloudData(limit) {
    const response = await fetch(
      `https://api.mixcloud.com/${encodeURIComponent('RadioRoža')}/cloudcasts/?limit=${limit}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  // Use a derived value that returns a promise
  let mixcloudPromise = $derived(fetchMixcloudData(limit));
</script>

<section class="mixcloud-latest">
  <h2>Latest Mixes</h2>

  {#await mixcloudPromise}
    <div class="loading">
      <div class="loading-spinner"></div>
      <p>Loading mixes...</p>
    </div>
  {:then data}
    {#if data?.data && data.data.length > 0}
      <div class="mixes-grid">
        {#each data.data as mix (mix.key)}
          <div class="mix-card">
            <button
              class="mix-link"
              onclick={() => window.open(mix.url, '_blank', 'noopener,noreferrer')}
              type="button"
            >
              <div class="mix-image">
                <img src={mix.pictures.medium} alt="{mix.name} cover" />
                <div class="play-overlay">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <polygon points="5,3 19,12 5,21" />
                  </svg>
                </div>
              </div>
              <div class="mix-info">
                <h3>{mix.name}</h3>
                <p class="mix-user">{mix.user.name}</p>
                <p class="mix-date">{new Date(mix.created_time).toLocaleDateString()}</p>
                {#if mix.audio_length}
                  <p class="mix-duration">
                    {Math.floor(mix.audio_length / 60)}:{String(mix.audio_length % 60).padStart(
                      2,
                      '0'
                    )}
                  </p>
                {/if}
              </div>
            </button>
          </div>
        {/each}
      </div>
    {:else}
      <div class="no-data">
        <p>No mixes found.</p>
      </div>
    {/if}
  {:catch error}
    <div class="error">
      <p>Error loading mixes: {error.message}</p>
      <button onclick={() => window.location.reload()}>Retry</button>
    </div>
  {/await}
</section>

<style>
  .mixcloud-latest {
    padding: 2rem;
    max-width: 1200px;
    margin: 0 auto;
  }

  .mixcloud-latest h2 {
    font-size: 2rem;
    margin-bottom: 1.5rem;
    text-align: center;
    color: var(--text-primary, #333);
  }

  .loading {
    text-align: center;
    padding: 3rem 1rem;
  }

  .loading-spinner {
    width: 40px;
    height: 40px;
    border: 4px solid #f3f3f3;
    border-top: 4px solid var(--primary-600, #667eea);
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin: 0 auto 1rem auto;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  .error,
  .no-data {
    text-align: center;
    padding: 3rem 1rem;
  }

  .error {
    color: #e74c3c;
  }

  .error button {
    margin-top: 1rem;
    padding: 0.5rem 1rem;
    background: #e74c3c;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.2s;
  }

  .error button:hover {
    background: #c0392b;
  }

  .mixes-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1.5rem;
  }

  .mix-card {
    background: white;
    border: 1px solid #e1e5e9;
    border-radius: 12px;
    overflow: hidden;
    transition: all 0.3s ease;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .mix-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  }

  .mix-link {
    width: 100%;
    text-decoration: none;
    color: inherit;
    display: block;
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    text-align: left;
  }

  .mix-image {
    position: relative;
    overflow: hidden;
  }

  .mix-image img {
    width: 100%;
    height: 200px;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  .mix-card:hover .mix-image img {
    transform: scale(1.05);
  }

  .play-overlay {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(0, 0, 0, 0.7);
    color: white;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .mix-card:hover .play-overlay {
    opacity: 1;
  }

  .mix-info {
    padding: 1.2rem;
  }

  .mix-info h3 {
    margin: 0 0 0.5rem 0;
    font-size: 1.1rem;
    line-height: 1.4;
    font-weight: 600;
    color: var(--text-primary, #2c3e50);
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .mix-user {
    margin: 0 0 0.4rem 0;
    font-weight: 500;
    color: var(--primary-600, #667eea);
    font-size: 0.9rem;
  }

  .mix-date {
    margin: 0 0 0.4rem 0;
    font-size: 0.85rem;
    color: var(--text-secondary, #718096);
  }

  .mix-duration {
    margin: 0;
    font-size: 0.85rem;
    color: var(--text-secondary, #718096);
    font-weight: 500;
  }

  @media (max-width: 768px) {
    .mixcloud-latest {
      padding: 1rem;
    }

    .mixes-grid {
      grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
      gap: 1rem;
    }

    .mix-image img {
      height: 160px;
    }
  }
</style>
