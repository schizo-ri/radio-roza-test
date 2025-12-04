<script>
  import {
    generateAuthorAvatarUrl,
    generateArticleImageSet,
    getThemeFromCategory,
  } from '$lib/utils/placeholders.js';
  import { formatDate } from '$lib/utils/dates.js';

  let { article } = $props();

  // Generate placeholder images for articles
  function getArticleImages(article) {
    const theme = getThemeFromCategory(article.category.slug);
    return generateArticleImageSet(article.title, theme);
  }

  const images = getArticleImages(article);
  const authorAvatar = generateAuthorAvatarUrl(article.author.name, 48);
</script>

<article class="card">
  <!-- Article image -->
  <!-- <div class="image">
    <img src={images.medium} alt={images.alt} loading="lazy" />
    <div class="category-tag" style="background-color: {article.category.color}">
      {article.category.name}
    </div>
  </div> -->

  <!-- Article content -->
  <div class="content">
    <h2 class="title">
      <a href="/citaj-radio/{article.slug}">
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
          <span class="author-name">{article.author.name}</span>
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
    {#if article.tags && article.tags.length > 0}
      <div class="tags">
        {#each article.tags.slice(0, 3) as tag (tag)}
          <span class="tag">#{tag}</span>
        {/each}
        {#if article.tags.length > 3}
          <span class="tag-more">+{article.tags.length - 3} more</span>
        {/if}
      </div>
    {/if}

    <!-- Embeds indicator -->
    <!-- {#if article.embeds}
      <div class="embeds-indicator">
        {#if article.embeds.bandcamp}
          <span class="embed-badge bandcamp">🎵 Bandcamp</span>
        {/if}
        {#if article.embeds.youtube}
          <span class="embed-badge youtube">▶️ Video</span>
        {/if}
      </div>
    {/if} -->
  </div>
</article>

<style>
  .card {
    border: 2px solid transparent;
    box-shadow: 0 2px 16px -4px rgba(0, 0, 0, 0.05);
    width: clamp(280px, 320px, 400px);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    transition: border-color 0.15s;
    position: relative;
  }

  .card:hover {
    border-color: var(--secondary-500);
  }

  .image {
    position: relative;
    height: 200px;
    overflow: hidden;
  }

  .image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  /*.category-tag {
    position: absolute;
    bottom: 1rem;
    left: 1rem;
    color: white;
    padding: 0.25rem 0.75rem;
    border-radius: 20px;
    font-size: 0.75rem;
    font-weight: 600;
    backdrop-filter: blur(4px);
  }*/

  .content {
    padding: 1.5rem;
  }

  .title {
    margin: 0 0 0.75rem 0;
    font-size: 1.25rem;
    line-height: 1.4;
  }

  .title a {
    color: var(--dark);
    text-decoration: none;
    transition: color 0.15s ease;
  }

  .title a:hover {
    color: var(--secondary-700);
  }

  .excerpt {
    color: var(--muted);
    line-height: 1.6;
    margin: 0 0 1rem 0;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
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
    border: 2px solid #e5e7eb;
  }

  .author-details {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .author-name {
    font-weight: 600;
    color: #1f2937;
    font-size: 0.875rem;
  }

  .publish-date {
    color: #6b7280;
    font-size: 0.75rem;
  }

  .read-time {
    color: #6b7280;
    font-size: 0.75rem;
    font-weight: 500;
  }

  .tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }

  .tag {
    background: #f3f4f6;
    color: #374151;
    padding: 0.25rem 0.5rem;
    border-radius: 12px;
    font-size: 0.75rem;
    font-weight: 500;
  }

  .tag-more {
    color: #6b7280;
    font-size: 0.75rem;
    font-style: italic;
  }

  .embeds-indicator {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
  }

  .embed-badge {
    padding: 0.25rem 0.5rem;
    border-radius: 8px;
    font-size: 0.75rem;
    font-weight: 500;
  }

  .embed-badge.bandcamp {
    background: #1da1f2;
    color: white;
  }

  .embed-badge.youtube {
    background: #ff0000;
    color: white;
  }
</style>
