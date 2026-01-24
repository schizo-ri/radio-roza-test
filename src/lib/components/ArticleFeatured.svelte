<script>
  import { getFeaturedArticle } from '$lib/data/mockArticles.js';
  import { onMount } from 'svelte';
  import ArticleCardFeatured from '$lib/components/ArticleCardFeatured.svelte';

  // State
  let article = null;
  // Categories loaded for potential future use
  let loading = true;

  onMount(() => {
    // Load articles based on props
    article = getFeaturedArticle();

    // Categories available for future filtering functionality

    loading = false;
  });
</script>

<section>
  {#if loading}
    <p>Učitavanje članka...</p>
  {:else}
    <ArticleCardFeatured {article} showTags={true} />
  {/if}
</section>

<style>
  section {
    margin-bottom: 2rem;
  }
</style>
