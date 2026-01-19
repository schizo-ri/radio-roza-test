<script>
  // import { page } from '$app/stores';
  import PageTitle from '$lib/components/PageTitle.svelte';
  import Wrapper from '$lib/components/Wrapper.svelte';
  import ArticleCard from '$lib/components/ArticleCard.svelte';

  export let data;

  $: articles = data.articles;
  $: categories = data.categories;
  // $: authors = data.authors;
  // $: filters = data.filters;

  // function getFeaturedToggleUrl() {
  //   const url = new URL($page.url);
  //   if (filters.featured) {
  //     url.searchParams.delete('featured');
  //   } else {
  //     url.searchParams.set('featured', 'true');
  //   }
  //   return url.toString();
  // }

  // function getRemoveFilterUrl(filterName) {
  //   const url = new URL($page.url);
  //   url.searchParams.delete(filterName);
  //   return url.toString();
  // }
</script>

<PageTitle title="Čitaj radio" />

<Wrapper>
  <section class="categories">
    {#each categories as category (category.id)}
      <a href={`/citaj-radio/?kategorija=${category.slug}`} class="category">
        <h2>{category.title}</h2>
        <p>{category.description}</p>
      </a>
    {/each}
  </section>
</Wrapper>

<Wrapper>
  <section class="new">
    <h3 class="subtitle">Novo na Radio Roži</h3>
    <div class="news-grid">
      {#each articles as article (article.id)}
        <ArticleCard {article} showTags={true} />
      {/each}
    </div>
  </section>
</Wrapper>

<style>
  .categories {
    display: grid;
    grid-template-columns: auto;
    grid-template-columns: repeat(2, minmax(120px, 1fr));
    grid-template-rows: repeat(2, min-content);
    gap: 1rem;
    margin-bottom: 2rem;
  }

  .category {
    padding: 1rem;
    border: 1px solid var(--secondary-200);
    border-radius: 24px;
    text-decoration: none;
    color: inherit;
    text-align: center;
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
    color: var(--muted);
    display: none;
  }

  .news-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    grid-template-rows: auto;
    row-gap: 2rem;
    padding-top: 2rem;
    padding-bottom: 2rem;
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

  @media (min-width: 700px) {
    .categories {
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      grid-template-rows: auto;
    }
  }

  @media (min-width: 1000px) {
    .category {
      text-align: start;
    }

    .category p {
      display: initial;
    }
  }
</style>
