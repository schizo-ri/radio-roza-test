<script>
  import ArticleView from '$lib/components/ArticleView.svelte';
  import { getRelatedArticles } from '$lib/data/mockArticles.js';

  export let data;

  $: article = data.article;
  $: relatedArticles = article ? getRelatedArticles(article, 3) : [];
</script>

<svelte:head>
  {#if article}
    <title>{article.seo?.metaTitle || article.title} - Roza</title>
    <meta name="description" content={article.seo?.metaDescription || article.excerpt} />
    {#if article.seo?.keywords}
      <meta name="keywords" content={article.seo.keywords.join(', ')} />
    {/if}

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="article" />
    <meta property="og:title" content={article.title} />
    <meta property="og:description" content={article.excerpt} />
    <meta property="og:article:author" content={article.author.name} />
    <meta property="og:article:published_time" content={article.publishedDate} />
    {#each article.tags as tag (tag)}
      <meta property="og:article:tag" content={tag} />
    {/each}

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={article.title} />
    <meta name="twitter:description" content={article.excerpt} />

    <!-- Schema.org structured data -->
    <script type="application/ld+json">
      {JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": article.title,
        "description": article.excerpt,
        "author": {
          "@type": "Person",
          "name": article.author.name,
          "description": article.author.bio
        },
        "datePublished": article.publishedDate,
        "dateModified": article.publishedDate,
        "articleSection": article.category.name,
        "keywords": article.tags.join(', '),
        "wordCount": article.content.replace(/<[^>]*>/g, '').split(' ').length,
        "timeRequired": `PT${article.readTime}M`
      })}
    </script>
  {/if}
</svelte:head>

<div class="article-page">
  <!-- Breadcrumb navigation -->
  <nav class="breadcrumb" aria-label="Breadcrumb">
    <ol>
      <li><a href="/citaj-radio">Čitaj radio</a></li>
      {#if article}
        <li>
          <a href="/citaj-radio?category={article.category.slug}">{article.category.name}</a>
        </li>
        <li aria-current="page">{article.title}</li>
      {/if}
    </ol>
  </nav>

  <!-- Main article content -->
  <main>
    <ArticleView {article} />
  </main>

  <!-- Related articles section -->
  {#if relatedArticles.length > 0}
    <aside class="related-section">
      <h2>Related Articles</h2>
      <div class="related-articles">
        {#each relatedArticles as relatedArticle (relatedArticle.id)}
          <div class="related-card">
            <h3>
              <a href="/citaj-radio/{relatedArticle.slug}">
                {relatedArticle.title}
              </a>
            </h3>
            <p class="related-excerpt">{relatedArticle.excerpt}</p>
            <div class="related-meta">
              <span class="related-category" style="color: {relatedArticle.category.color}">
                {relatedArticle.category.name}
              </span>
              <span class="related-read-time">{relatedArticle.readTime} min read</span>
            </div>
          </div>
        {/each}
      </div>
    </aside>
  {/if}

  <!-- Back to articles link -->
  <div class="navigation-footer">
    <a href="/citaj-radio" class="back-link"> ← Back to All Articles </a>
  </div>
</div>

<style>
  .article-page {
    min-height: 100vh;
    /*background: #f9fafb;*/
    padding: 2rem 1rem;
  }

  .breadcrumb {
    max-width: 800px;
    margin: 0 auto 2rem auto;
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
    color: #6b7280;
    font-size: 0.875rem;
  }

  .breadcrumb li:not(:last-child)::after {
    content: '/';
    margin-left: 0.5rem;
    color: #d1d5db;
  }

  .breadcrumb a {
    color: #3b82f6;
    text-decoration: none;
    transition: color 0.2s;
  }

  .breadcrumb a:hover {
    color: #2563eb;
  }

  .breadcrumb li[aria-current='page'] {
    color: #1f2937;
    font-weight: 500;
    /* Truncate long titles */
    max-width: 300px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  main {
    margin-bottom: 4rem;
  }

  .related-section {
    max-width: 800px;
    margin: 0 auto 3rem auto;
    /*padding: 2rem;*/
    /*background: white;*/
    /*border-radius: 12px;*/
    /*box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);*/
  }

  .related-section h2 {
    color: var(--dark);
    margin: 0 0 1.5rem 0;
    font-size: 1.5rem;
  }

  .related-articles {
    display: grid;
    gap: 1.5rem;
  }

  .related-card {
    padding: 1.5rem;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    transition: all 0.2s;
    background: #fafafa;
  }

  .related-card:hover {
    border-color: #d1d5db;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    background: white;
  }

  .related-card h3 {
    margin: 0 0 0.75rem 0;
    font-size: 1.125rem;
  }

  .related-card h3 a {
    color: #1f2937;
    text-decoration: none;
    transition: color 0.2s;
  }

  .related-card h3 a:hover {
    color: #3b82f6;
  }

  .related-excerpt {
    color: #6b7280;
    line-height: 1.5;
    margin: 0 0 1rem 0;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .related-meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.875rem;
  }

  .related-category {
    font-weight: 600;
  }

  .related-read-time {
    color: #9ca3af;
  }

  .navigation-footer {
    max-width: 800px;
    margin: 0 auto;
    text-align: center;
  }

  .back-link {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    color: #3b82f6;
    text-decoration: none;
    font-weight: 500;
    padding: 0.75rem 1.5rem;
    border: 2px solid #3b82f6;
    border-radius: 8px;
    transition: all 0.2s;
  }

  .back-link:hover {
    background: #3b82f6;
    color: white;
    transform: translateY(-1px);
  }

  @media (max-width: 768px) {
    .article-page {
      padding: 1rem 0.5rem;
    }

    .breadcrumb {
      margin-bottom: 1rem;
    }

    .breadcrumb li[aria-current='page'] {
      max-width: 200px;
    }

    .related-section {
      padding: 1.5rem;
    }

    .related-card {
      padding: 1rem;
    }

    .related-meta {
      flex-direction: column;
      align-items: flex-start;
      gap: 0.25rem;
    }
  }
</style>
