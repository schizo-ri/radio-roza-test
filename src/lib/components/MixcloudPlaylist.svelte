<script>
  import { onMount } from 'svelte';
  import MixCardRow from './MixCardRow.svelte';

  let { playlistUrl } = $props();

  let episodes = $state([]);
  let loading = $state(true);
  let error = $state(null);

  // Extract playlist path from URL
  // e.g., "https://www.mixcloud.com/RadioRoza/playlists/nevidljive/" -> "/RadioRoza/playlists/nevidljive/"
  function getPlaylistPath(url) {
    try {
      const urlObj = new URL(url);
      return urlObj.pathname;
    } catch {
      return url.startsWith('/') ? url : `/${url}`;
    }
  }

  async function fetchPlaylistEpisodes() {
    loading = true;
    error = null;

    try {
      const path = getPlaylistPath(playlistUrl);
      // Mixcloud API for playlist cloudcasts
      const apiUrl = `https://api.mixcloud.com${path}cloudcasts/`;

      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error(`Failed to fetch playlist: ${response.status}`);
      }

      const data = await response.json();
      episodes = data.data || [];
    } catch (e) {
      console.error('Failed to fetch Mixcloud playlist:', e);
      error = e.message;
    } finally {
      loading = false;
    }
  }

  onMount(() => {
    if (playlistUrl) {
      fetchPlaylistEpisodes();
    }
  });
</script>

<div class="playlist">
  {#if loading}
    <div class="loading">
      <div class="spinner"></div>
      <span>Učitavanje epizoda...</span>
    </div>
  {:else if error}
    <div class="error">
      <p>Nije moguće učitati epizode.</p>
      <a href={playlistUrl} target="_blank" rel="noopener noreferrer">
        Pogledaj na Mixcloudu
      </a>
    </div>
  {:else if episodes.length === 0}
    <div class="empty">
      <p>Nema dostupnih epizoda.</p>
    </div>
  {:else}
    <div class="episodes-list">
      {#each episodes as mix, index (`${mix.url}-${index}`)}
        <MixCardRow {mix} showTags={false} />
      {/each}
    </div>
  {/if}
</div>

<style>
  .playlist {
    width: 100%;
  }

  .loading {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    padding: 3rem 1rem;
    color: var(--muted);
  }

  .spinner {
    width: 24px;
    height: 24px;
    border: 3px solid var(--light);
    border-top-color: var(--primary-600);
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  .error,
  .empty {
    text-align: center;
    padding: 2rem;
    background: var(--light);
    border-radius: 8px;
  }

  .error p,
  .empty p {
    margin: 0 0 1rem 0;
    color: var(--muted);
  }

  .error a {
    color: var(--primary-600);
    text-decoration: none;
  }

  .error a:hover {
    text-decoration: underline;
  }

  .episodes-list {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }
</style>
