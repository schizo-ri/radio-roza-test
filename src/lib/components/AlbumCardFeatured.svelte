<script>
  import { generateAuthorAvatarUrl } from '$lib/utils/placeholders.js';

  let { album } = $props();

  const genres = album.genre ? album.genre.split(';') : [];
  const authorAvatar = generateAuthorAvatarUrl(album.author.name, 40);
</script>

<article class="featured-album">
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
        <span class="author-name">{album.author.name}</span>
      </div>
    </div>
  </div>
</article>

<style>
  .featured-album {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;
    /*background: linear-gradient(135deg, var(--secondary-50) 0%, var(--primary-50) 100%);*/
    border-radius: 16px;
    overflow: hidden;
    /*padding: 1.5rem;*/
  }

  @media (min-width: 600px) {
    .featured-album {
      grid-template-columns: 200px 1fr;
      /*padding: 2rem;*/
    }
  }

  @media (min-width: 900px) {
    .featured-album {
      grid-template-columns: 280px 1fr;
    }
  }

  .cover-link {
    display: block;
  }

  .cover {
    aspect-ratio: 1;
    overflow: hidden;
    border-radius: 8px;
    /*box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);*/
    background: var(--secondary-100);
  }

  .cover img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.3s ease;
  }

  .cover:hover img {
    transform: scale(1.03);
  }

  .content {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    justify-content: center;
  }

  .title {
    margin: 0;
    font-size: 1.5rem;
    line-height: 1.3;
    font-family: var(--display-font);
  }

  @media (min-width: 600px) {
    .title {
      font-size: 1.75rem;
    }
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
    line-height: 1.6;
    margin: 0;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .genres {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .genre {
    background: var(--secondary-200);
    color: var(--secondary-800);
    padding: 0.25rem 0.75rem;
    border-radius: 16px;
    font-size: 0.8rem;
    font-weight: 500;
  }

  .meta {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-top: 0.5rem;
  }

  .author-info {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .author-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid var(--dark);
  }

  .author-name {
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--dark);
  }
</style>
