<script>
  import ArticalCategory from './ArticalCategory.svelte';

  let { article } = $props();
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
    <div class="tags">
      {#if article.tags && article.tags.length > 0}
        <ArticalCategory category={article.category} />
        {#each article.tags.slice(0, 2) as tag (`${article.id}-${tag}`)}
          <a href="/citaj-radio?tag={encodeURIComponent(tag)}" class="tag">#{tag}</a>
        {/each}
        {#if article.tags.length > 2}
          <span class="more-tags">+{article.tags.length - 2} more</span>
        {/if}
      {/if}
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

  .tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }

  .tag {
    background: var(--light);
    color: var(--dark);
    padding: 0.25rem 0.5rem;
    border-radius: 12px;
    font-size: 0.75rem;
    font-weight: 500;
    text-decoration: none;
    display: inline-block;
    transition: all 0.15s;
  }

  .tag:hover {
    background: var(--secondary-700);
    color: white;
  }

  .more-tags {
    background: var(--light);
    color: var(--dark);
    padding: 0.25rem 0.5rem;
    border-radius: 12px;
    font-size: 0.75rem;
    font-weight: 500;
    text-decoration: none;
    display: inline-block;
    transition: all 0.15s;
  }
</style>
