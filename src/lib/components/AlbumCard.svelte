<script>
  import { formatDate } from '$lib/utils/dates.js';
  import TagList from './TagList.svelte';

  let { album } = $props();

  const genres = $derived(album.genre ? album.genre.split(';') : []);
</script>

<article class="card">
  <a href="/citaj-radio/album-tjedna/{album.slug}" class="cover-link">
    <div class="cover">
      <img src={album.cover} alt="{album.artist} - {album.albumTitle}" />
    </div>
  </a>

  <div class="content">
    <h2 class="title">
      <a href="/citaj-radio/album-tjedna/{album.slug}">
        {album.title}
      </a>
    </h2>

    <p class="description">
      {album.description}
    </p>

    <div class="meta">
      <time class="publish-date" datetime={album.publishDate}>
        {formatDate(album.publishDate)}
      </time>
    </div>

    {#if genres.length > 0}
      <TagList tags={genres} />
    {/if}
  </div>
</article>

<style>
  .card {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    background: white;
  }

  .cover-link {
    display: block;
  }

  .cover {
    position: relative;
    aspect-ratio: 1;
    overflow: hidden;
    background: var(--secondary-100);
    border-radius: 8px;
  }

  .cover img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    border-radius: 8px;
    transition: transform 0.3s ease;
  }

  .card:hover .cover img {
    transform: scale(1.05);
  }

  .content {
    padding-top: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .title {
    margin: 0;
    font-size: 1.125rem;
    line-height: 1.4;
    font-family: var(--display-font);
  }

  .title a {
    color: var(--dark);
    text-decoration: none;
    transition: color 0.15s ease;
  }

  .title a:hover {
    color: var(--secondary-700);
  }

  .description {
    color: var(--muted);
    line-height: 1.5;
    margin: 0;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    font-size: 0.9rem;
  }

  .meta {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .publish-date {
    color: var(--muted);
    font-size: 0.8rem;
  }
</style>
