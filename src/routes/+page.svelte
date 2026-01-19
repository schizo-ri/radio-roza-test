<script>
  import MixcloudLatest from '$lib/components/MixcloudLatest.svelte';
  import ArticlesLatest from '$lib/components/ArticlesLatest.svelte';
  import Wrapper from '$lib/components/Wrapper.svelte';
  import SectionHeader from '$lib/components/SectionHeader.svelte';

  let { data } = $props();
</script>

<svelte:head>
  <title>Radio Roža</title>
  <meta
    name="description"
    content="Radio Roža je internetski community radio nastao iz želje i potrebe za praćenjem nezavisne kulturne scene i raznih kulturnih aktera u Rijeci, promocijom najrazličitijih (underground) žanrova, te ljubavi prema gramofonskim pločama. U međuvremenu, Radio Roža je prerastao iz radija posvećenog glazbi i kulturi u platformu za participativno novinarstvo, edukaciju te aktivno uključivanje mladih i ranjivih skupina, potičući društvenu uključenost, kritičko mišljenje i medijsku pismenost."
  />
</svelte:head>

<div class="spacer">
  <Wrapper>
    <SectionHeader title="Novo na Radio Roži" link="Pogledaj sve" href="/emisije" />
  </Wrapper>
  <MixcloudLatest data={data.mixcloudData} />
</div>

<div class="spacer">
  <Wrapper>
    <SectionHeader title="Čitaj radio" link="Pogledaj sve" href="/citaj-radio" />
  </Wrapper>
  <ArticlesLatest />
</div>

<style>
  .spacer {
    padding-top: 2rem;
    padding-bottom: 2rem;
  }
</style>
