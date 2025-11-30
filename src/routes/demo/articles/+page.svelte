<script>
  import ArticleList from '$lib/components/demo/ArticleList.svelte';
  import { getArticleStats, getCategories } from '$lib/data/mockArticles.js';
  import { onMount } from 'svelte';

  let stats = {};
  let categories = [];
  // Authors data available for future use
  let selectedCategory = null;
  let showFeaturedOnly = false;

  onMount(() => {
    stats = getArticleStats();
    categories = getCategories();
    // Authors loaded for potential future functionality
  });

  function handleCategoryFilter(category) {
    selectedCategory = selectedCategory === category ? null : category;
  }

  function toggleFeatured() {
    showFeaturedOnly = !showFeaturedOnly;
  }
</script>

<svelte:head>
  <title>Mock Articles Demo - Roza</title>
  <meta
    name="description"
    content="Demo page showcasing the mock articles system for testing CMS functionality."
  />
</svelte:head>

<div class="demo-page">
  <header class="demo-header">
    <h1>Mock Articles Demo</h1>
    <p class="subtitle">
      This page demonstrates the mock articles system for testing your CMS pages before
      implementation.
    </p>

    <!-- Statistics -->
    <div class="stats-grid">
      <div class="stat-card">
        <h3>{stats.totalArticles}</h3>
        <p>Total Articles</p>
      </div>
      <div class="stat-card">
        <h3>{stats.featuredArticles}</h3>
        <p>Featured</p>
      </div>
      <div class="stat-card">
        <h3>{stats.categories}</h3>
        <p>Categories</p>
      </div>
      <div class="stat-card">
        <h3>{stats.authors}</h3>
        <p>Authors</p>
      </div>
      <div class="stat-card">
        <h3>{stats.averageReadTime} min</h3>
        <p>Avg. Read Time</p>
      </div>
      <div class="stat-card">
        <h3>{stats.articlesWithEmbeds}</h3>
        <p>With Embeds</p>
      </div>
    </div>
  </header>

  <!-- Filters -->
  <div class="filters-section">
    <h2>Filter Articles</h2>

    <div class="filter-controls">
      <button class="filter-button {showFeaturedOnly ? 'active' : ''}" on:click={toggleFeatured}>
        ⭐ Featured Only
      </button>

      <div class="category-filters">
        <span class="filter-label">Categories:</span>
        {#each categories as category (category.id)}
          <button
            class="category-button {selectedCategory === category.slug ? 'active' : ''}"
            style="background-color: {selectedCategory === category.slug
              ? category.color
              : 'transparent'};
                   border-color: {category.color};
                   color: {selectedCategory === category.slug ? 'white' : category.color}"
            on:click={() => handleCategoryFilter(category.slug)}
          >
            {category.name}
          </button>
        {/each}
        {#if selectedCategory}
          <button class="clear-filter" on:click={() => (selectedCategory = null)}> Clear </button>
        {/if}
      </div>
    </div>
  </div>

  <!-- Articles List -->
  <section class="articles-section">
    <h2>
      {#if showFeaturedOnly}
        Featured Articles
      {:else if selectedCategory}
        {categories.find((cat) => cat.slug === selectedCategory)?.name || selectedCategory} Articles
      {:else}
        All Articles
      {/if}
    </h2>

    <ArticleList featured={showFeaturedOnly} category={selectedCategory} limit={20} />
  </section>

  <!-- Features Overview -->
  <section class="features-overview">
    <h2>Mock Data Features</h2>
    <div class="features-grid">
      <div class="feature-card">
        <h3>📝 Rich Content</h3>
        <p>
          Articles include HTML-formatted content with headings, lists, tables, and blockquotes.
        </p>
      </div>

      <div class="feature-card">
        <h3>👥 Authors</h3>
        <p>Each article has detailed author information with bio, avatar, and social links.</p>
      </div>

      <div class="feature-card">
        <h3>🏷️ Categories & Tags</h3>
        <p>Organized content with colored categories and descriptive tags for filtering.</p>
      </div>

      <div class="feature-card">
        <h3>🖼️ Responsive Images</h3>
        <p>Multiple image sizes (thumb, small, medium, large) with SVG placeholders.</p>
      </div>

      <div class="feature-card">
        <h3>🎵 Media Embeds</h3>
        <p>Sample Bandcamp and YouTube embeds for multimedia content testing.</p>
      </div>

      <div class="feature-card">
        <h3>🔍 SEO Ready</h3>
        <p>Meta titles, descriptions, and keywords for search optimization.</p>
      </div>

      <div class="feature-card">
        <h3>⭐ Featured Content</h3>
        <p>Featured article system for highlighting important content.</p>
      </div>

      <div class="feature-card">
        <h3>🔗 Related Articles</h3>
        <p>Smart related articles algorithm based on categories and tags.</p>
      </div>
    </div>
  </section>

  <!-- Usage Examples -->
  <section class="usage-section">
    <h2>Usage Examples</h2>
    <div class="code-examples">
      <div class="code-example">
        <h3>Get All Articles</h3>
        <pre><code
            >import {`{ getArticles }`} from '$lib/data/mockArticles.js';
const articles = getArticles();</code
          ></pre>
      </div>

      <div class="code-example">
        <h3>Get Featured Articles</h3>
        <pre><code>const featured = getArticles({`{ featured: true, limit: 5 }`});</code></pre>
      </div>

      <div class="code-example">
        <h3>Get Articles by Category</h3>
        <pre><code>const electronic = getArticles({`{ category: 'electronic' }`});</code></pre>
      </div>

      <div class="code-example">
        <h3>Get Single Article</h3>
        <pre><code
            >import {`{ getArticle }`} from '$lib/data/mockArticles.js';
const article = getArticle('article-slug');</code
          ></pre>
      </div>

      <div class="code-example">
        <h3>Generate Placeholder Images</h3>
        <pre><code
            >import {`{ generateAuthorAvatarUrl, generateArticleImageSet }`} from '$lib/utils/placeholders.js';
const avatar = generateAuthorAvatarUrl('Author Name');
const images = generateArticleImageSet('Article Title', 'electronic');</code
          ></pre>
      </div>
    </div>
  </section>
</div>

<style>
  .demo-page {
    max-width: 1400px;
    margin: 0 auto;
    padding: 2rem 1rem;
  }

  .demo-header {
    text-align: center;
    margin-bottom: 3rem;
  }

  .demo-header h1 {
    font-size: 3rem;
    color: #1f2937;
    margin-bottom: 0.5rem;
  }

  .subtitle {
    font-size: 1.25rem;
    color: #6b7280;
    margin-bottom: 2rem;
  }

  .stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 1rem;
    max-width: 800px;
    margin: 0 auto;
  }

  .stat-card {
    background: white;
    padding: 1.5rem;
    border-radius: 12px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    border: 1px solid #e5e7eb;
    text-align: center;
  }

  .stat-card h3 {
    font-size: 2rem;
    color: #3b82f6;
    margin: 0 0 0.5rem 0;
  }

  .stat-card p {
    color: #6b7280;
    margin: 0;
    font-size: 0.875rem;
  }

  .filters-section {
    background: white;
    padding: 2rem;
    border-radius: 12px;
    margin-bottom: 2rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    border: 1px solid #e5e7eb;
  }

  .filters-section h2 {
    margin: 0 0 1.5rem 0;
    color: #1f2937;
  }

  .filter-controls {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    align-items: center;
  }

  .filter-button {
    padding: 0.5rem 1rem;
    border: 2px solid #3b82f6;
    background: transparent;
    color: #3b82f6;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 500;
    transition: all 0.2s ease;
  }

  .filter-button:hover,
  .filter-button.active {
    background: #3b82f6;
    color: white;
  }

  .category-filters {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    align-items: center;
  }

  .filter-label {
    font-weight: 600;
    color: #374151;
    margin-right: 0.5rem;
  }

  .category-button {
    padding: 0.375rem 0.75rem;
    border: 2px solid;
    background: transparent;
    border-radius: 20px;
    cursor: pointer;
    font-size: 0.875rem;
    font-weight: 500;
    transition: all 0.2s ease;
  }

  .category-button:hover {
    transform: translateY(-1px);
  }

  .clear-filter {
    padding: 0.375rem 0.75rem;
    border: none;
    background: #ef4444;
    color: white;
    border-radius: 8px;
    cursor: pointer;
    font-size: 0.875rem;
    font-weight: 500;
  }

  .articles-section {
    margin-bottom: 3rem;
  }

  .articles-section h2 {
    color: #1f2937;
    margin-bottom: 1rem;
    font-size: 2rem;
  }

  .features-overview {
    margin-bottom: 3rem;
  }

  .features-overview h2 {
    text-align: center;
    color: #1f2937;
    margin-bottom: 2rem;
    font-size: 2rem;
  }

  .features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
  }

  .feature-card {
    background: white;
    padding: 1.5rem;
    border-radius: 12px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    border: 1px solid #e5e7eb;
  }

  .feature-card h3 {
    color: #1f2937;
    margin: 0 0 0.75rem 0;
    font-size: 1.125rem;
  }

  .feature-card p {
    color: #6b7280;
    margin: 0;
    line-height: 1.5;
  }

  .usage-section h2 {
    text-align: center;
    color: #1f2937;
    margin-bottom: 2rem;
    font-size: 2rem;
  }

  .code-examples {
    display: grid;
    gap: 1.5rem;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  }

  .code-example {
    background: #1f2937;
    border-radius: 12px;
    overflow: hidden;
  }

  .code-example h3 {
    background: #374151;
    color: white;
    padding: 1rem 1.5rem;
    margin: 0;
    font-size: 1rem;
  }

  .code-example pre {
    margin: 0;
    padding: 1.5rem;
    overflow-x: auto;
  }

  .code-example code {
    color: #e5e7eb;
    font-family: 'SF Mono', Monaco, Menlo, Consolas, monospace;
    font-size: 0.875rem;
    line-height: 1.5;
  }

  @media (max-width: 768px) {
    .demo-page {
      padding: 1rem 0.5rem;
    }

    .demo-header h1 {
      font-size: 2rem;
    }

    .stats-grid {
      grid-template-columns: repeat(2, 1fr);
    }

    .filter-controls {
      flex-direction: column;
      align-items: flex-start;
    }

    .code-examples {
      grid-template-columns: 1fr;
    }

    .code-example {
      min-width: 0;
    }
  }
</style>
