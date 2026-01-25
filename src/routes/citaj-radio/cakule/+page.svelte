<script>
  import CategoryPage from '$lib/components/CategoryPage.svelte';

  let { data } = $props();
</script>

<CategoryPage category={data.category} articles={data.articles} />
