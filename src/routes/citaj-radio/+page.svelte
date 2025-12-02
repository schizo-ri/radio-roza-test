<script>
  import { onMount } from 'svelte';
  import PageTitle from '$lib/components/PageTitle.svelte';
  import Wrapper from '$lib/components/Wrapper.svelte';
  import ArticleCard from '$lib/components/ArticleCard.svelte';
  import { getArticles } from '$lib/data/mockArticles.js';

  const categories = [
    {
      id: 1,
      slug: 'aktualno',
      title: 'Aktualno',
      description: 'Novo na Radio Roži',
    },
    {
      id: 2,
      slug: 'album-tjedna',
      title: 'Album tjedna',
      description: 'Album tjedna je radio program koji se bavi najnovijim albumima i izdanjima.',
    },
    {
      id: 3,
      slug: 'komentar',
      title: 'Komentar',
      description: 'Komentar je radio program koji se bavi najnovijim komentarima i izdanjima.',
    },
    {
      id: 4,
      slug: 'cakule',
      title: 'Čakule',
      description: 'Čakule je radio program koji se bavi najnovijim čakulama i izdanjima.',
    },
  ];

  // Props
  let featured = false;
  let category = null;
  let limit = 8;

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
</script>

<PageTitle title="Čitaj radio" />

<Wrapper>
  <section class="categories">
    {#each categories as category (category.id)}
      <a href={`/citaj-radio/${category.slug}`} class="category">
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
