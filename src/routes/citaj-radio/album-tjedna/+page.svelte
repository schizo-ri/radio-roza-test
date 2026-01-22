<script>
  import PageTitle from '$lib/components/PageTitle.svelte';
  import Wrapper from '$lib/components/Wrapper.svelte';
  import AlbumCard from '$lib/components/AlbumCard.svelte';

  let { data } = $props();

  const albums = $derived(data.albums);
</script>

<svelte:head>
  <title>Album tjedna - Radio Roza</title>
  <meta
    name="description"
    content="Radio Roza svesrdno preporuca dobru glazbu. Pregledajte nase tjedne preporuke albuma."
  />
</svelte:head>

<PageTitle title="Album tjedna" />

<Wrapper>
  <p class="intro">Radio Roza svesrdno preporuca dobru glazbu.</p>

  <nav class="breadcrumb" aria-label="Breadcrumb">
    <ol>
      <li><a href="/citaj-radio">Citaj radio</a></li>
      <li aria-current="page">Album tjedna</li>
    </ol>
  </nav>

  <section class="albums-grid">
    {#each albums as album (album.id)}
      <AlbumCard {album} />
    {/each}
  </section>
</Wrapper>

<style>
  .intro {
    color: var(--muted);
    font-size: 1.1rem;
    margin-bottom: 1rem;
  }

  .breadcrumb {
    margin-bottom: 2rem;
  }

  .breadcrumb ol {
    display: flex;
    list-style: none;
    padding: 0;
    margin: 0;
    gap: 0.5rem;
    align-items: center;
  }

  .breadcrumb li {
    color: var(--muted);
    font-size: 0.875rem;
  }

  .breadcrumb li:not(:last-child)::after {
    content: '/';
    margin-left: 0.5rem;
    color: var(--secondary-200);
  }

  .breadcrumb a {
    color: var(--secondary-600);
    text-decoration: none;
    transition: color 0.2s;
  }

  .breadcrumb a:hover {
    color: var(--secondary-800);
    text-decoration: underline;
  }

  .breadcrumb li[aria-current='page'] {
    color: var(--dark);
    font-weight: 500;
  }

  .albums-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 2rem;
    padding-top: 1rem;
    padding-bottom: 3rem;
  }
</style>
