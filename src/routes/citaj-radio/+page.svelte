<script>
  import PageTitle from '$lib/components/PageTitle.svelte';
  import Wrapper from '$lib/components/Wrapper.svelte';
  import ArticleCard from '$lib/components/ArticleCard.svelte';
  import ArticleCardFeatured from '$lib/components/ArticleCardFeatured.svelte';
  import ArticleCardSmall from '$lib/components/ArticleCardSmall.svelte';

  let { data } = $props();

  let articles = $derived(data.articles);
  let categories = $derived(data.categories);

  // 1 featured article
  let featuredArticle = $derived(articles.find((article) => article.featured));

  // 4 normal articles
  let normalArticles = $derived(articles.filter((article) => !article.featured).slice(0, 4));

  // 8 small articles
  let smallArticles = $derived(articles.filter((article) => !article.featured).slice(4, 12));
</script>

<PageTitle title="Čitaj radio" variant="secondary" />

<Wrapper>
  <section class="categories">
    {#each categories as category (category.id)}
      <a href="/citaj-radio/{category.slug}" class="category">
        <h2>{category.title}</h2>
        <p>{category.description}</p>
      </a>
    {/each}
  </section>
</Wrapper>

<Wrapper>
  <section class="new">
    <ArticleCardFeatured article={featuredArticle} />
    <div class="latest-grid">
      {#each normalArticles as article (article.id)}
        <ArticleCard {article} showTags={true} />
      {/each}
    </div>
    <div class="small-grid">
      {#each smallArticles as article (article.id)}
        <ArticleCardSmall {article} showTags={false} />
      {/each}
    </div>
  </section>
  <!-- Load more button -->
  <div class="load-more-container">
    <button type="button" class="load-more">Učitaj više</button>
  </div>
</Wrapper>

<style>
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
    margin-bottom: 3rem;
  }

  .category {
    padding: 1rem;
    border: 2px solid var(--dark);
    border-radius: 12px;
    background-color: var(--white);
    text-decoration: none;
    text-align: center;
    transition: background-color 0.15s ease;
  }

  .category:hover {
    background-color: var(--secondary-50);
  }

  .category h2 {
    font-family: var(--display-font);
    color: var(--secondary-800);
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
      text-align: start;
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
