<script>
  import { SvelteURLSearchParams } from 'svelte/reactivity';
  import PageTitle from '$lib/components/PageTitle.svelte';
  import Wrapper from '$lib/components/Wrapper.svelte';
  import ArticleCard from '$lib/components/ArticleCard.svelte';
  import ArticleCardFeatured from '$lib/components/ArticleCardFeatured.svelte';
  import ArticleCardSmall from '$lib/components/ArticleCardSmall.svelte';

  let { data } = $props();

  let articles = $derived(data.articles);
  let categories = $derived(data.categories);
  let filters = $derived(data.filters);
  let authors = $derived(data.authors);

  // Check if any filter is active
  let hasActiveFilters = $derived(
    (filters.tags && filters.tags.length > 0) || filters.autor || filters.kategorija
  );

  // Find author name from slug
  let activeAuthorName = $derived(
    filters.autor ? authors.find((a) => a.slug === filters.autor)?.name : null
  );

  // Find category name from slug
  let activeCategoryName = $derived(
    filters.kategorija ? categories.find((c) => c.slug === filters.kategorija)?.title : null
  );

  // Build URL without specific filter (or specific tag)
  function buildFilterUrl(excludeFilter, excludeTagValue = null) {
    const params = new SvelteURLSearchParams();
    // Handle multiple tags
    if (filters.tags && filters.tags.length > 0) {
      filters.tags.forEach((tag) => {
        // Skip this tag if we're removing it specifically
        if (excludeFilter === 'tag' && excludeTagValue === tag) return;
        // Skip all tags if removing all tags
        if (excludeFilter === 'tags') return;
        params.append('tag', tag);
      });
    }
    if (filters.autor && excludeFilter !== 'autor') params.set('autor', filters.autor);
    if (filters.kategorija && excludeFilter !== 'kategorija')
      params.set('kategorija', filters.kategorija);
    const query = params.toString();
    return query ? `/citaj-radio?${query}` : '/citaj-radio';
  }

  // 1 featured article
  let featuredArticle = $derived(articles.find((article) => article.featured));

  // 4 normal articles
  let normalArticles = $derived(articles.filter((article) => !article.featured).slice(0, 4));

  // 8 small articles
  let smallArticles = $derived(articles.filter((article) => !article.featured).slice(4));
</script>

<PageTitle title="Čitaj radio" />

{#if hasActiveFilters}
  <Wrapper>
    <div class="filter-bar">
      <span class="filter-label">Filtrirano:</span>
      <div class="active-filters">
        {#if filters.kategorija}
          <a href={buildFilterUrl('kategorija')} class="filter-chip filter-chip--category">
            <span>{activeCategoryName || filters.kategorija}</span>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.5"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </a>
        {/if}
        {#if filters.tags && filters.tags.length > 0}
          {#each filters.tags as tag (tag)}
            <a href={buildFilterUrl('tag', tag)} class="filter-chip">
              <span>#{tag}</span>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.5"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </a>
          {/each}
        {/if}
        {#if filters.autor}
          <a href={buildFilterUrl('autor')} class="filter-chip filter-chip--author">
            <span>{activeAuthorName || filters.autor}</span>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.5"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </a>
        {/if}
      </div>
      <a href="/citaj-radio" class="clear-all">Obriši sve</a>
    </div>
  </Wrapper>
{/if}

{#if !hasActiveFilters}
  <Wrapper>
    <section class="categories">
      {#each categories as category (category.id)}
        <a href="/citaj-radio/{category.slug}" class="category">
          <h2>{category.title}</h2>
          <!-- <p>{category.description}</p> -->
        </a>
      {/each}
    </section>
  </Wrapper>
{/if}

<Wrapper>
  <section class="new">
    <ArticleCardFeatured article={featuredArticle} currentTags={filters.tags} />
    <div class="latest-grid">
      {#each normalArticles as article (article.id)}
        <ArticleCard {article} currentTags={filters.tags} />
      {/each}
    </div>
    <div class="small-grid">
      {#each smallArticles as article (article.id)}
        <ArticleCardSmall {article} currentTags={filters.tags} />
      {/each}
    </div>
  </section>
  <!-- Load more button -->
  <div class="load-more-container">
    <button type="button" class="load-more">Učitaj više</button>
  </div>
</Wrapper>

<style>
  .filter-bar {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 0.75rem;
    padding: 1rem;
    margin-top: 1.5rem;
    background: var(--light);
    border-radius: 12px;
  }

  .filter-label {
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--muted);
  }

  .active-filters {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    flex: 1;
  }

  .filter-chip {
    display: inline-flex;
    align-items: center;
    gap: 0.375rem;
    background: var(--secondary-700);
    color: white;
    padding: 0.375rem 0.625rem;
    border-radius: 12px;
    font-size: 0.8125rem;
    font-weight: 500;
    text-decoration: none;
    transition: background-color 0.15s ease;
  }

  .filter-chip:hover {
    background: var(--secondary-800);
  }

  .filter-chip--category {
    background: var(--tertiary-500);
    color: var(--dark);
  }

  .filter-chip--category:hover {
    background: var(--tertiary-600);
  }

  .filter-chip--author {
    background: var(--primary-600);
  }

  .filter-chip--author:hover {
    background: var(--primary-700);
  }

  .filter-chip svg {
    flex-shrink: 0;
  }

  .clear-all {
    font-size: 0.8125rem;
    color: var(--muted);
    text-decoration: none;
    font-weight: 500;
    transition: color 0.15s ease;
  }

  .clear-all:hover {
    color: var(--dark);
    text-decoration: underline;
  }

  .new {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    row-gap: 2rem;
    margin-top: 2rem;
    margin-bottom: 2rem;
  }

  .categories {
    display: grid;
    grid-template-columns: auto;
    grid-template-columns: repeat(2, minmax(120px, 1fr));
    grid-template-rows: repeat(2, min-content);
    gap: 1rem;
    margin-top: 2rem;
    margin-bottom: 3rem;
  }

  .category {
    padding: 0.5rem 1rem;
    border: 2px solid var(--dark);
    border-radius: 12px;
    background-color: var(--white);
    text-decoration: none;
    text-align: center;
    transition: background-color 0.15s ease;
  }

  .category:hover {
    background-color: var(--primary-50);
  }

  .category h2 {
    font-family: var(--display-font);
    color: var(--primary-700);
    font-size: 1rem;
    font-weight: bold;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .category p {
    font-size: 0.9rem;
    color: var(--secondary-800);
    display: none;
  }

  .latest-grid {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    gap: 2rem;
  }

  .small-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1rem;
  }

  .load-more-container {
    display: flex;
    justify-content: center;
  }

  .load-more {
    padding: 1rem 2rem;
    border: 2px solid var(--dark);
    border-radius: 12px;
    background-color: var(--white);
    text-decoration: none;
    text-align: center;
    color: var(--dark);
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.15s ease;
  }

  .load-more:hover {
    background-color: var(--secondary-50);
  }

  @media (min-width: 700px) {
    .categories {
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      grid-template-rows: auto;
    }

    .latest-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      grid-auto-rows: minmax(200px, auto);
    }

    .small-grid {
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 1.5rem;
    }
  }

  @media (min-width: 1000px) {
    .category {
      /*text-align: start;*/
    }

    .category p {
      display: initial;
    }

    .latest-grid {
      grid-template-columns: repeat(3, minmax(0, 1fr));
      grid-auto-rows: auto;
    }

    :global(.latest-grid > *:last-child) {
      display: none;
    }

    .small-grid {
      grid-template-columns: repeat(5, minmax(0, 1fr));
    }
  }

  @media (min-width: 1440px) {
    .latest-grid {
      grid-template-columns: repeat(4, minmax(0, 1fr));
      grid-auto-rows: auto;
    }

    :global(.latest-grid > *:last-child) {
      display: flex;
    }
  }

  /*.no-articles {
    text-align: center;
    padding: 3rem 1rem;
    color: var(--muted);
  }*/

  /*.no-articles p {
    margin-bottom: 1rem;
    font-size: 1.1rem;
  }*/

  /*.clear-btn {
    background: var(--primary-600);
    color: white;
    text-decoration: none;
    padding: 0.75rem 1.5rem;
    border-radius: 8px;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.2s;
    display: inline-block;
  }*/

  /*.clear-btn:hover {
    background: var(--primary-700);
  }*/
</style>
