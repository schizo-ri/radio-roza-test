<script>
  import { generateAuthorAvatarUrl } from '$lib/utils/placeholders.js';
  import { formatDate } from '$lib/utils/dates.js';
  import TagList from './TagList.svelte';

  let { article, currentTags = [] } = $props();

  const authorAvatar = $derived(article ? generateAuthorAvatarUrl(article.author.name, 48) : null);
</script>

{#if article}
  <article class="card">
    <img src={article.images.large} alt={article.title} class="featured-image" />
    <!-- Article content -->
    <div class="content">
      <h2 class="title">
        <a href="/citaj-radio/{article.category.slug}/{article.slug}">
          {article.title}
        </a>
      </h2>

      <p class="excerpt">
        {article.excerpt}
      </p>

      <!-- Meta information -->
      <div class="meta">
        <div class="author-info">
          <img src={authorAvatar} alt="{article.author.name} avatar" class="author-avatar" />
          <div class="author-details">
            <a href="/citaj-radio?autor={article.author.slug}" class="author-name">
              {article.author.name}
            </a>
            <time class="publish-date" datetime={article.publishedDate}>
              {formatDate(article.publishedDate)}
            </time>
          </div>
        </div>

        <div class="read-time">
          {article.readTime} min read
        </div>
      </div>

      <!-- Tags -->
      <div class="tags-wrapper">
        <TagList category={article.category} tags={article.tags || []} {currentTags} />
      </div>
    </div>
  </article>
{/if}

<style>
  .card {
    /*width: clamp(300px, 1000px, 420px);*/
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    grid-template-rows: minmax(200px, 1fr) auto;
    gap: 2rem;
    overflow: hidden;
    position: relative;
  }

  .featured-image {
    display: block;
    width: 100%;
    height: auto;
    border-radius: 8px;
  }

  @media (min-width: 900px) {
    .card {
      grid-template-columns: minmax(150px, 350px) minmax(0, 1fr);
    }
  }

  .content {
    display: flex;
    flex-direction: column;
  }

  .title {
    margin: 0 0 0.75rem 0;
    font-size: 1.25rem;
    line-height: 1.25;
  }

  .title a {
    color: var(--dark);
    text-decoration: none;
    transition: color 0.15s ease;
  }

  .title a:hover {
    color: var(--secondary-700);
    text-decoration: underline;
  }

  .excerpt {
    color: var(--muted);
    margin: 0 0 1rem 0;
  }

  .meta {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;
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
    border: 2px solid var(--dark);
  }

  .author-details {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .author-name {
    font-weight: 500;
    color: var(--dark);
    font-size: 0.875rem;
    text-decoration: none;
    transition: color 0.2s;
  }

  .author-name:hover {
    color: var(--secondary-700);
    text-decoration: underline;
  }

  .publish-date {
    color: #6b7280;
    font-size: 0.75rem;
  }

  .read-time {
    color: var(--muted);
    font-size: 0.75rem;
    font-weight: 500;
  }

  .tags-wrapper {
    margin-bottom: 1rem;
  }
</style>
