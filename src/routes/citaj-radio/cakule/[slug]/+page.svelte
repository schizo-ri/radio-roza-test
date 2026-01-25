<script>
  import ArticlePage from '$lib/components/ArticlePage.svelte';

  let { data } = $props();
</script>

<ArticlePage article={data.article} category={data.category} relatedArticles={data.relatedArticles} />
