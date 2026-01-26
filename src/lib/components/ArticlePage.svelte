<script>
  import ArticleView from '$lib/components/ArticleView.svelte';
  import Breadcrumb from '$lib/components/Breadcrumb.svelte';
  import BackLink from '$lib/components/BackLink.svelte';
  import Wrapper from '$lib/components/Wrapper.svelte';
  import ArticleCard from '$lib/components/ArticleCard.svelte';

  let { article, category, relatedArticles = [] } = $props();

  const breadcrumbItems = $derived([
    { label: 'Citaj radio', href: '/citaj-radio' },
    { label: category.title, href: `/citaj-radio/${category.slug}` },
    { label: article?.title || '' },
  ]);
</script>

<svelte:head>
  {#if article}
    <title>{article.seo?.metaTitle || article.title} - Radio Roza</title>
    <meta name="description" content={article.seo?.metaDescription || article.excerpt} />
    {#if article.seo?.keywords}
      <meta name="keywords" content={article.seo.keywords.join(', ')} />
    {/if}

    <meta property="og:type" content="article" />
    <meta property="og:title" content={article.title} />
    <meta property="og:description" content={article.excerpt} />
    <meta property="og:article:author" content={article.author.name} />
    <meta property="og:article:published_time" content={article.publishedDate} />
    {#each article.tags as tag (tag)}
      <meta property="og:article:tag" content={tag} />
    {/each}

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={article.title} />
    <meta name="twitter:description" content={article.excerpt} />
  {/if}
</svelte:head>

<div class="article-page">
  <div class="article-container">
    <Breadcrumb items={breadcrumbItems} />

    <main>
      <ArticleView {article} />
    </main>
  </div>

  {#if relatedArticles.length > 0}
    <Wrapper>
      <aside class="related-section">
        <h2>Povezani članci</h2>
        <div class="related-articles">
          {#each relatedArticles as relatedArticle (relatedArticle.id)}
            <ArticleCard article={relatedArticle} />
          {/each}
        </div>
      </aside>
    </Wrapper>
  {/if}

  <BackLink href="/citaj-radio/{category.slug}" label={category.title} />
</div>

<style>
  .article-page {
    min-height: 100vh;
    padding-top: 2rem;
  }

  .article-container {
    max-width: 900px;
    margin: 0 auto;
    padding: 0 1rem;
  }

  main {
    margin-bottom: 3rem;
  }

  .related-section {
    margin-top: 2rem;
    margin-bottom: 2rem;
  }

  .related-section h2 {
    font-family: var(--display-font);
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
    color: var(--dark);
  }

  .related-articles {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  @media (min-width: 600px) {
    .related-articles {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (min-width: 900px) {
    .related-articles {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  @media (max-width: 600px) {
    .article-page {
      padding-top: 1rem;
    }

    .article-container {
      padding: 0 0.75rem;
    }
  }
</style>
