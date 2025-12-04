<script>
  import { generateAuthorAvatarUrl } from '$lib/utils/placeholders.js';
  import { onMount } from 'svelte';

  export let article;

  let formattedDate = '';
  let authorAvatar = '';

  onMount(() => {
    if (article) {
      // Format the publication date
      const date = new Date(article.publishedDate);
      formattedDate = date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });

      // Generate author avatar
      authorAvatar = generateAuthorAvatarUrl(article.author.name, 80);
    }
  });

  function renderBandcampEmbed(embed) {
    return `
      <iframe
        style="border: 0; width: 100%; height: 120px;"
        src="https://bandcamp.com/EmbeddedPlayer/album=${embed.id}/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false/artwork=small/transparent=true/"
        seamless>
        <a href="#">${embed.title}</a>
      </iframe>
    `;
  }

  function renderYouTubeEmbed(embed) {
    return `
      <iframe
        width="100%"
        height="315"
        src="https://www.youtube.com/embed/${embed.id}"
        title="${embed.title}"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen>
      </iframe>
    `;
  }
</script>

{#if article}
  <article class="article-view">
    <!-- Featured badge -->
    <!-- {#if article.featured}
      <div class="featured-badge">⭐ Featured Article</div>
    {/if} -->

    <!-- Article header -->
    <header class="article-header">
      <div class="category-tag" style="background-color: {article.category.color}">
        {article.category.name}
      </div>

      <h1 class="article-title">{article.title}</h1>

      <p class="article-excerpt">{article.excerpt}</p>

      <!-- Meta information -->
      <div class="article-meta">
        <div class="author-section">
          <img src={authorAvatar} alt="{article.author.name} avatar" class="author-avatar" />
          <div class="author-info">
            <h3 class="author-name">{article.author.name}</h3>
            <p class="author-bio">{article.author.bio}</p>

            <!-- Social links -->
            {#if article.author.social}
              <div class="social-links">
                {#if article.author.social.twitter}
                  <a
                    href="https://twitter.com/{article.author.social.twitter}"
                    target="_blank"
                    rel="noopener"
                  >
                    🐦 Twitter
                  </a>
                {/if}
                {#if article.author.social.instagram}
                  <a
                    href="https://instagram.com/{article.author.social.instagram}"
                    target="_blank"
                    rel="noopener"
                  >
                    📷 Instagram
                  </a>
                {/if}
                {#if article.author.social.bandcamp}
                  <a
                    href="https://{article.author.social.bandcamp}.bandcamp.com"
                    target="_blank"
                    rel="noopener"
                  >
                    🎵 Bandcamp
                  </a>
                {/if}
                {#if article.author.social.youtube}
                  <a
                    href="https://youtube.com/@{article.author.social.youtube}"
                    target="_blank"
                    rel="noopener"
                  >
                    ▶️ YouTube
                  </a>
                {/if}
                {#if article.author.social.soundcloud}
                  <a
                    href="https://soundcloud.com/{article.author.social.soundcloud}"
                    target="_blank"
                    rel="noopener"
                  >
                    🎧 SoundCloud
                  </a>
                {/if}
              </div>
            {/if}
          </div>
        </div>

        <div class="publication-info">
          <time class="publish-date" datetime={article.publishedDate}>
            Published {formattedDate}
          </time>
          <div class="read-time">
            {article.readTime} minute read
          </div>
        </div>
      </div>
    </header>

    <!-- Article content -->
    <div class="article-content">
      {@html article.content}
    </div>

    <!-- Media embeds -->
    {#if article.embeds}
      <div class="embeds-section">
        <h2>Related Media</h2>

        {#if article.embeds.bandcamp}
          <div class="embed-container">
            <h3>🎵 Listen on Bandcamp</h3>
            {@html renderBandcampEmbed(article.embeds.bandcamp)}
          </div>
        {/if}

        {#if article.embeds.youtube}
          <div class="embed-container">
            <h3>▶️ Watch on YouTube</h3>
            {@html renderYouTubeEmbed(article.embeds.youtube)}
          </div>
        {/if}
      </div>
    {/if}

    <!-- Tags -->
    {#if article.tags && article.tags.length > 0}
      <div class="tags-section">
        <h3>Tags</h3>
        <div class="tags-list">
          {#each article.tags as tag (tag)}
            <span class="tag">#{tag}</span>
          {/each}
        </div>
      </div>
    {/if}

    <!-- Article footer -->
    <footer class="article-footer">
      <div class="share-section">
        <h3>Share this article</h3>
        <div class="share-buttons">
          <a
            href="https://twitter.com/intent/tweet?text={encodeURIComponent(
              article.title
            )}&url={encodeURIComponent(window?.location?.href || '')}"
            target="_blank"
            rel="noopener"
            class="share-button twitter"
          >
            🐦 Twitter
          </a>
          <a
            href="https://www.facebook.com/sharer/sharer.php?u={encodeURIComponent(
              window?.location?.href || ''
            )}"
            target="_blank"
            rel="noopener"
            class="share-button facebook"
          >
            📘 Facebook
          </a>
          <button
            class="share-button copy"
            on:click={() => {
              if (navigator.clipboard) {
                navigator.clipboard.writeText(window.location.href);
                alert('Link copied to clipboard!');
              }
            }}
          >
            📋 Copy Link
          </button>
        </div>
      </div>
    </footer>
  </article>
{:else}
  <div class="no-article">
    <h1>Article not found</h1>
    <p>The requested article could not be loaded.</p>
  </div>
{/if}

<style>
  .article-view {
    max-width: 800px;
    margin: 0 auto;
    /*padding: 2rem 1rem;*/
    /*background: white;*/
    /*border-radius: 12px;*/
    /*box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);*/
  }

  .featured-badge {
    display: inline-block;
    background: linear-gradient(135deg, #fbbf24, #f59e0b);
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 25px;
    font-size: 0.875rem;
    font-weight: 600;
    margin-bottom: 1rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }

  .article-header {
    border-bottom: 1px solid #e5e7eb;
    padding-bottom: 2rem;
    margin-bottom: 2rem;
  }

  .category-tag {
    display: inline-block;
    color: white;
    padding: 0.375rem 1rem;
    border-radius: 20px;
    font-size: 0.875rem;
    font-weight: 600;
    margin-bottom: 1rem;
  }

  .article-title {
    font-size: 2.5rem;
    line-height: 1.2;
    color: var(--dark);
    margin: 0 0 1rem 0;
  }

  .article-excerpt {
    font-size: 1.25rem;
    color: #6b7280;
    line-height: 1.6;
    margin: 0 0 2rem 0;
    font-style: italic;
  }

  .article-meta {
    display: flex;
    gap: 2rem;
    align-items: flex-start;
  }

  .author-section {
    display: flex;
    gap: 1rem;
    flex: 1;
  }

  .author-avatar {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    object-fit: cover;
    border: 3px solid #e5e7eb;
    flex-shrink: 0;
  }

  .author-info {
    flex: 1;
  }

  .author-name {
    font-size: 1.125rem;
    color: var(--dark);
    margin: 0 0 0.5rem 0;
  }

  .author-bio {
    color: #6b7280;
    font-size: 0.875rem;
    line-height: 1.5;
    margin: 0 0 0.75rem 0;
  }

  .social-links {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
  }

  .social-links a {
    color: #3b82f6;
    text-decoration: none;
    font-size: 0.75rem;
    padding: 0.25rem 0.5rem;
    background: #eff6ff;
    border-radius: 12px;
    transition: background-color 0.2s;
  }

  .social-links a:hover {
    background: #dbeafe;
  }

  .publication-info {
    text-align: right;
    flex-shrink: 0;
  }

  .publish-date {
    display: block;
    color: #6b7280;
    font-size: 0.875rem;
    margin-bottom: 0.5rem;
  }

  .read-time {
    color: #9ca3af;
    font-size: 0.75rem;
    font-weight: 500;
  }

  .article-content {
    line-height: 1.8;
    color: #374151;
    margin-bottom: 3rem;
  }

  .article-content :global(h2) {
    font-size: 1.875rem;
    color: var(--dark);
    margin: 2rem 0 1rem 0;
    border-bottom: 2px solid #e5e7eb;
    padding-bottom: 0.5rem;
  }

  .article-content :global(h3) {
    font-size: 1.5rem;
    color: var(--dark);
    margin: 1.5rem 0 0.75rem 0;
  }

  .article-content :global(p) {
    margin: 1rem 0;
  }

  .article-content :global(blockquote) {
    border-left: 4px solid #3b82f6;
    padding-left: 1rem;
    margin: 1.5rem 0;
    background: #f8fafc;
    padding: 1rem 1rem 1rem 2rem;
    border-radius: 0 8px 8px 0;
    font-style: italic;
  }

  .article-content :global(blockquote cite) {
    display: block;
    margin-top: 0.5rem;
    color: #6b7280;
    font-size: 0.875rem;
    font-style: normal;
  }

  .article-content :global(ul),
  .article-content :global(ol) {
    padding-left: 1.5rem;
    margin: 1rem 0;
  }

  .article-content :global(li) {
    margin: 0.5rem 0;
  }

  .article-content :global(table) {
    width: 100%;
    border-collapse: collapse;
    margin: 1.5rem 0;
    background: white;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }

  .article-content :global(th),
  .article-content :global(td) {
    padding: 0.75rem 1rem;
    text-align: left;
    border-bottom: 1px solid #e5e7eb;
  }

  .article-content :global(th) {
    background: #f9fafb;
    font-weight: 600;
    color: var(--dark);
  }

  .article-content :global(code) {
    background: #f3f4f6;
    padding: 0.125rem 0.25rem;
    border-radius: 4px;
    font-family: 'SF Mono', Monaco, Consolas, monospace;
    font-size: 0.875em;
  }

  .embeds-section {
    margin: 3rem 0;
    /*padding: 2rem;*/
    /*background: #f9fafb;*/
    /*border-radius: 12px;*/
    /*border: 1px solid #e5e7eb;*/
  }

  .embeds-section h2 {
    color: var(--dark);
    margin: 0 0 1.5rem 0;
  }

  .embed-container {
    margin-bottom: 2rem;
  }

  .embed-container:last-child {
    margin-bottom: 0;
  }

  .embed-container h3 {
    color: #374151;
    margin: 0 0 1rem 0;
    font-size: 1.125rem;
  }

  .embed-container :global(iframe) {
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .tags-section {
    margin: 3rem 0;
    padding: 1.5rem;
    background: #f8fafc;
    border-radius: 12px;
  }

  .tags-section h3 {
    color: var(--dark);
    margin: 0 0 1rem 0;
  }

  .tags-list {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .tag {
    background: #e2e8f0;
    color: #475569;
    padding: 0.375rem 0.75rem;
    border-radius: 16px;
    font-size: 0.875rem;
    font-weight: 500;
    transition: all 0.2s;
  }

  .tag:hover {
    background: #cbd5e1;
    cursor: pointer;
  }

  .article-footer {
    border-top: 1px solid #e5e7eb;
    padding-top: 2rem;
    margin-top: 3rem;
  }

  .share-section h3 {
    color: var(--dark);
    margin: 0 0 1rem 0;
  }

  .share-buttons {
    display: flex;
    gap: 0.75rem;
    flex-wrap: wrap;
  }

  .share-button {
    padding: 0.5rem 1rem;
    border-radius: 8px;
    text-decoration: none;
    font-size: 0.875rem;
    font-weight: 500;
    transition: all 0.2s;
    border: none;
    cursor: pointer;
  }

  .share-button.twitter {
    background: #1da1f2;
    color: white;
  }

  .share-button.facebook {
    background: #4267b2;
    color: white;
  }

  .share-button.copy {
    background: #6b7280;
    color: white;
  }

  .share-button:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  .no-article {
    text-align: center;
    padding: 4rem 2rem;
    color: #6b7280;
  }

  @media (max-width: 768px) {
    .article-view {
      padding: 1rem 0.5rem;
    }

    .article-title {
      font-size: 2rem;
    }

    .article-excerpt {
      font-size: 1.125rem;
    }

    .article-meta {
      flex-direction: column;
      gap: 1rem;
    }

    .publication-info {
      text-align: left;
    }

    .author-section {
      gap: 0.75rem;
    }

    .author-avatar {
      width: 60px;
      height: 60px;
    }

    .share-buttons {
      flex-direction: column;
    }

    .share-button {
      text-align: center;
    }
  }
</style>
