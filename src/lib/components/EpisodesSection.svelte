<script>
  import MixcloudPlaylist from './MixcloudPlaylist.svelte';

  /** @type {string} */
  let { playlistUrl, title = 'Epizode' } = $props();
</script>

<section class="episodes">
  <h2>{title}</h2>
  <MixcloudPlaylist {playlistUrl} />
</section>

<style>
  .episodes {
    max-width: 900px;
    margin: 3rem auto 0;
    padding: 0 1rem;
  }

  .episodes h2 {
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--dark);
    margin-bottom: 1.5rem;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid var(--primary-100);
  }
</style>
