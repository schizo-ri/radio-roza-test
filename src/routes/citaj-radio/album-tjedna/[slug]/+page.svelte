<script>
  import { formatDate } from '$lib/utils/dates.js';
  import { generateAuthorAvatarUrl } from '$lib/utils/placeholders.js';
  import AlbumCard from '$lib/components/AlbumCard.svelte';
  import Wrapper from '$lib/components/Wrapper.svelte';
  import Breadcrumb from '$lib/components/Breadcrumb.svelte';
  import BackLink from '$lib/components/BackLink.svelte';

  let { data } = $props();

  const album = $derived(data.album);
  const otherAlbums = $derived(data.otherAlbums);
  const genres = $derived(album?.genre ? album.genre.split(';') : []);
  const authorAvatar = $derived(album ? generateAuthorAvatarUrl(album.author.name, 48) : '');

  const breadcrumbItems = $derived([
    { label: 'Citaj radio', href: '/citaj-radio' },
    { label: 'Album tjedna', href: '/citaj-radio/album-tjedna' },
    { label: album?.albumTitle || '' },
  ]);
</script>

<svelte:head>
  {#if album}
    <title>{album.title} - Album tjedna - Radio Roza</title>
    <meta name="description" content={album.description} />
    <meta property="og:type" content="article" />
    <meta property="og:title" content={album.title} />
    <meta property="og:description" content={album.description} />
    <meta property="og:image" content={album.cover} />
  {/if}
</svelte:head>

<article class="album-page">
  <Breadcrumb items={breadcrumbItems} />

  {#if album}
    <header class="album-header">
      <div class="cover-wrapper">
        <img src={album.cover} alt="{album.artist} - {album.albumTitle}" class="cover" />
      </div>

      <div class="header-content">
        <span class="label">Album tjedna</span>
        <h1 class="title">{album.title}</h1>
        <p class="description">{album.description}</p>

        {#if genres.length > 0}
          <div class="genres">
            {#each genres as genre (genre)}
              <span class="genre">{genre}</span>
            {/each}
          </div>
        {/if}

        <div class="meta">
          <div class="author-info">
            <img src={authorAvatar} alt={album.author.name} class="author-avatar" />
            <div class="author-details">
              <span class="author-name">{album.author.name}</span>
              <time class="publish-date" datetime={album.publishDate}>
                {formatDate(album.publishDate)}
              </time>
            </div>
          </div>
        </div>
      </div>
    </header>

    <div class="album-content">
      <!-- eslint-disable-next-line svelte/no-at-html-tags -->
      {@html album.content}
    </div>
  {/if}
</article>

{#if otherAlbums && otherAlbums.length > 0}
  <Wrapper>
    <aside class="more-albums">
      <h2>Vise albuma tjedna</h2>
      <div class="albums-grid">
        {#each otherAlbums as otherAlbum (otherAlbum.id)}
          <AlbumCard album={otherAlbum} />
        {/each}
      </div>
    </aside>
  </Wrapper>
{/if}

<BackLink href="/citaj-radio/album-tjedna" label="Album tjedna" />

<style>
  .album-page {
    min-height: 100vh;
    padding: 2rem 1rem;
    max-width: 900px;
    margin: 0 auto;
  }

  .album-header {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
    margin-bottom: 3rem;
  }

  @media (min-width: 600px) {
    .album-header {
      grid-template-columns: 250px 1fr;
    }
  }

  @media (min-width: 800px) {
    .album-header {
      grid-template-columns: 300px 1fr;
    }
  }

  .cover-wrapper {
    aspect-ratio: 1;
    overflow: hidden;
    border-radius: 8px;
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.2);
    background: var(--secondary-100);
    max-width: 300px;
    margin: 0 auto;
  }

  @media (min-width: 600px) {
    .cover-wrapper {
      max-width: none;
      margin: 0;
    }
  }

  .cover {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .header-content {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    justify-content: center;
  }

  .label {
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--secondary-600);
  }

  .title {
    margin: 0;
    font-size: 1.75rem;
    line-height: 1.3;
    font-family: var(--display-font);
    color: var(--dark);
  }

  @media (min-width: 600px) {
    .title {
      font-size: 2rem;
    }
  }

  .description {
    color: var(--muted);
    line-height: 1.6;
    margin: 0;
    font-size: 1.1rem;
  }

  .genres {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .genre {
    background: var(--secondary-100);
    color: var(--secondary-700);
    padding: 0.3rem 0.8rem;
    border-radius: 16px;
    font-size: 0.85rem;
    font-weight: 500;
  }

  .meta {
    margin-top: 0.5rem;
  }

  .author-info {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .author-avatar {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid var(--secondary-200);
  }

  .author-details {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
  }

  .author-name {
    font-weight: 600;
    color: var(--dark);
    font-size: 0.95rem;
  }

  .publish-date {
    color: var(--muted);
    font-size: 0.8rem;
  }

  .album-content {
    margin: 0 auto;
    line-height: 1.8;
    font-size: 1.05rem;
    color: var(--dark);
  }

  .album-content :global(p) {
    margin-bottom: 1.5rem;
  }

  .album-content :global(p:first-child) {
    font-size: 1.15rem;
  }

  .more-albums {
    margin-top: 4rem;
    margin-bottom: 2rem;
  }

  .more-albums h2 {
    font-family: var(--display-font);
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
    color: var(--dark);
  }

  .albums-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1.5rem;
  }

  @media (max-width: 600px) {
    .album-page {
      padding: 1rem 0.75rem;
    }
  }
</style>
