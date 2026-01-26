<script>
  import PageTitle from '$lib/components/PageTitle.svelte';
  import Wrapper from '$lib/components/Wrapper.svelte';
  import AlbumCard from '$lib/components/AlbumCard.svelte';
  import Breadcrumb from '$lib/components/Breadcrumb.svelte';
  import BackLink from '$lib/components/BackLink.svelte';

  let { data } = $props();

  const albums = $derived(data.albums);

  const breadcrumbItems = [
    { label: 'Citaj radio', href: '/citaj-radio' },
    { label: 'Album tjedna' },
  ];
</script>

<svelte:head>
  <title>Album tjedna - Radio Roza</title>
  <meta
    name="description"
    content="Radio Roza svesrdno preporuca dobru glazbu. Pregledajte nase tjedne preporuke albuma."
  />
</svelte:head>

<PageTitle title="Album tjedna" subtitle="Radio Roza svesrdno preporuca dobru glazbu" />

<Wrapper>
  <Breadcrumb items={breadcrumbItems} />

  <section class="albums-grid">
    {#each albums as album (album.id)}
      <AlbumCard {album} />
    {/each}
  </section>

  <BackLink href="/citaj-radio" label="Citaj radio" />
</Wrapper>

<style>
  .albums-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 2rem;
    padding-bottom: 2rem;
  }
</style>
