<script>
  import { getArticles } from '$lib/data/mockArticles.js';
  import { onMount } from 'svelte';
  // import HorizontalScroller from '$lib/components/HorizontalScroller.svelte';
  import Wrapper from '$lib/components/Wrapper.svelte';
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
  <Wrapper>
    <section class="articles-latest">
      <h2>Čitaj radio</h2>
      <p>Učitavanje članaka...</p>
    </section>
  </Wrapper>
{:else}
  <section class="articles-latest">
    <Wrapper>
      <header class="header">
        <h2>Čitaj radio</h2>
        <a href="/citaj-radio" class="link">Pogledaj sve</a>
      </header>
      {#if articles && articles.length > 0}
        <!-- <HorizontalScroller> -->
        <div class="grid">
          {#each articles as article (article.id)}
            <ArticleCard {article} showTags={true} />
          {/each}
        </div>
        <!-- </HorizontalScroller> -->
      {:else}
        <p>Nema članaka za prikazati</p>
      {/if}
    </Wrapper>
  </section>
{/if}

<style>
  .articles-latest {
    padding-top: 2rem;
    padding-bottom: 2rem;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 1rem;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: 1.5rem;
  }

  .articles-latest h2 {
    font-size: 2rem;
  }
</style>
