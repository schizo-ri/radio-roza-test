<script>
  import { getArticles } from '$lib/data/mockArticles.js';
  import {
    generateAuthorAvatarUrl,
    generateArticleImageSet,
    getThemeFromCategory,
  } from '$lib/utils/placeholders.js';
  import { onMount } from 'svelte';

  // Props
  export let featured = false;
  export let category = null;
  export let limit = 6;

  // State
  let articles = [];
  // Categories loaded for potential future use
  let loading = true;

  onMount(() => {
    // Load articles based on props
    articles = getArticles({
      featured,
      category,
      limit,
    });

    // Categories available for future filtering functionality

    loading = false;
  });

  // Format date for display
  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  // Generate placeholder images for articles
  function getArticleImages(article) {
    const theme = getThemeFromCategory(article.category.slug);
    return generateArticleImageSet(article.title, theme);
  }
</script>

<div class="article-list">
  {#if loading}
    <div class="loading">
      <p>Loading articles...</p>
    </div>
  {:else if articles.length === 0}
    <div class="empty-state">
      <p>No articles found.</p>
    </div>
  {:else}
    <div class="articles-grid">
      {#each articles as article (article.id)}
        {@const images = getArticleImages(article)}
        {@const authorAvatar = generateAuthorAvatarUrl(article.author.name, 48)}

        <article class="article-card">
          <!-- Featured badge -->
          {#if article.featured}
            <div class="featured-badge">⭐ Featured</div>
          {/if}

          <!-- Article image -->
          <div class="article-image">
            <img src={images.medium} alt={images.alt} loading="lazy" />
            <div class="category-tag" style="background-color: {article.category.color}">
              {article.category.name}
            </div>
          </div>

          <!-- Article content -->
          <div class="article-content">
            <h2 class="article-title">
              <a href="/demo/articles/{article.slug}">
                {article.title}
              </a>
            </h2>

            <p class="article-excerpt">
              {article.excerpt}
            </p>

            <!-- Meta information -->
            <div class="article-meta">
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
              <div class="article-tags">
                {#each article.tags.slice(0, 3) as tag (tag)}
                  <span class="tag">#{tag}</span>
                {/each}
                {#if article.tags.length > 3}
                  <span class="tag-more">+{article.tags.length - 3} more</span>
                {/if}
              </div>
            {/if}

            <!-- Embeds indicator -->
            {#if article.embeds}
              <div class="embeds-indicator">
                {#if article.embeds.bandcamp}
                  <span class="embed-badge bandcamp">🎵 Bandcamp</span>
                {/if}
                {#if article.embeds.youtube}
                  <span class="embed-badge youtube">▶️ Video</span>
                {/if}
              </div>
            {/if}
          </div>
        </article>
      {/each}
    </div>
  {/if}
</div>

<style>
  .article-list {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem 1rem;
  }

  .loading,
  .empty-state {
    text-align: center;
    padding: 4rem 2rem;
    color: #666;
  }

  .articles-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 2rem;
    margin-top: 2rem;
  }

  .article-card {
    background: white;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    transition: all 0.3s ease;
    position: relative;
    border: 1px solid #e5e7eb;
  }

  .article-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
  }

  .featured-badge {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: linear-gradient(135deg, #fbbf24, #f59e0b);
    color: white;
    padding: 0.25rem 0.75rem;
    border-radius: 20px;
    font-size: 0.75rem;
    font-weight: 600;
    z-index: 2;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }

  .article-image {
    position: relative;
    height: 200px;
    overflow: hidden;
  }

  .article-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  .article-card:hover .article-image img {
    transform: scale(1.05);
  }

  .category-tag {
    position: absolute;
    bottom: 1rem;
    left: 1rem;
    color: white;
    padding: 0.25rem 0.75rem;
    border-radius: 20px;
    font-size: 0.75rem;
    font-weight: 600;
    backdrop-filter: blur(4px);
  }

  .article-content {
    padding: 1.5rem;
  }

  .article-title {
    margin: 0 0 0.75rem 0;
    font-size: 1.25rem;
    line-height: 1.4;
  }

  .article-title a {
    color: #1f2937;
    text-decoration: none;
    transition: color 0.2s ease;
  }

  .article-title a:hover {
    color: #3b82f6;
  }

  .article-excerpt {
    color: #6b7280;
    line-height: 1.6;
    margin: 0 0 1rem 0;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .article-meta {
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

  .article-tags {
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

  @media (max-width: 768px) {
    .articles-grid {
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }

    .article-list {
      padding: 1rem 0.5rem;
    }
  }
</style>
