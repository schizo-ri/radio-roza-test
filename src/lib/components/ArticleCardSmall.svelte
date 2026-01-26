<script>
  import TagList from './TagList.svelte';

  let { article, currentTags = [] } = $props();
</script>

<article class="card">
  <!-- Article content -->
  <div class="content">
    <h2 class="title">
      <a href="/citaj-radio/{article.category.slug}/{article.slug}">
        {article.title}
      </a>
    </h2>

    <!-- Tags -->
    <div class="tags-wrapper">
      <TagList category={article.category} tags={article.tags || []} {currentTags} maxRows={2} />
    </div>
  </div>
</article>

<style>
  .card {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    position: relative;
  }

  .title {
    margin: 0 0 0.75rem 0;
    font-size: 1rem;
    line-height: 1.25;
  }

  .title a {
    color: var(--dark);
    text-decoration: none;
    transition: color 0.15s ease;
  }

  .title a:hover {
    color: var(--secondary-700);
    text-decoration: underline;
  }

  .tags-wrapper {
    margin-bottom: 1rem;
  }
</style>
