<script>
  import PageTitle from '$lib/components/PageTitle.svelte';
  import Wrapper from '$lib/components/Wrapper.svelte';
  import ArticleCard from '$lib/components/ArticleCard.svelte';
  import Breadcrumb from '$lib/components/Breadcrumb.svelte';
  import BackLink from '$lib/components/BackLink.svelte';

  let { category, articles } = $props();

  const breadcrumbItems = $derived([
    { label: 'Citaj radio', href: '/citaj-radio' },
    { label: category.title },
  ]);
</script>

<svelte:head>
  <title>{category.title} - Radio Roza</title>
  <meta name="description" content={category.description} />
</svelte:head>

<PageTitle title={category.title} subtitle={category.description} />

<Wrapper>
  <Breadcrumb items={breadcrumbItems} />

  {#if articles && articles.length > 0}
    <section class="articles-grid">
      {#each articles as article (article.id)}
        <ArticleCard {article} />
      {/each}
    </section>
  {:else}
    <div class="no-articles">
      <p>Nema clanaka u ovoj kategoriji.</p>
    </div>
  {/if}

  <BackLink href="/citaj-radio" label="Citaj radio" />
</Wrapper>

<style>
  .articles-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
    padding-bottom: 2rem;
  }

  @media (min-width: 600px) {
    .articles-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (min-width: 1000px) {
    .articles-grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  .no-articles {
    text-align: center;
    padding: 3rem 1rem;
    color: var(--muted);
  }

  .no-articles p {
    font-size: 1.1rem;
  }
</style>
