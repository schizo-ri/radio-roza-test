<script>
  import { getArticles } from '$lib/data/articles.js';
  import { onMount } from 'svelte';
  import ArticleCard from '$lib/components/ArticleCard.svelte';

  // Props
  export let featured = false;
  export let category = null;
  export let limit = 4;

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

{#if loading}
  <section class="placeholders">
    <p>Učitavanje članaka...</p>
  </section>
{:else}
  <section class="articles-latest">
    {#if articles && articles.length > 0}
      <!-- <HorizontalScroller> -->
      <div class="articles-grid">
        {#each articles as article (article.id)}
          <ArticleCard {article} showTags={true} />
        {/each}
      </div>
      <!-- </HorizontalScroller> -->
    {:else}
      <p>Nema članaka za prikazati</p>
    {/if}
  </section>
{/if}

<style>
  .articles-grid {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    gap: 2rem;
  }

  @media (min-width: 600px) {
    .articles-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      grid-auto-rows: minmax(200px, auto);
    }
  }

  @media (min-width: 1000px) {
    .articles-grid {
      grid-template-columns: repeat(3, minmax(0, 1fr));
      grid-auto-rows: auto;
    }

    :global(.articles-grid > *:last-child) {
      display: none;
    }
  }

  @media (min-width: 1440px) {
    .articles-grid {
      grid-template-columns: repeat(4, minmax(0, 1fr));
      grid-auto-rows: auto;
    }

    :global(.articles-grid > *:last-child) {
      display: flex;
    }
  }
</style>
