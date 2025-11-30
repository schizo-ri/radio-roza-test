<!-- Display latest mixes from Mixcloud for user RadioRoza -->
<script>
  let { data } = $props();

  import HorizontalScroller from '$lib/components/HorizontalScroller.svelte';
  import Wrapper from '$lib/components/Wrapper.svelte';
  import MixCard from '$lib/components/MixCard.svelte';
</script>

{#if data}
  <section class="mixcloud-latest">
    <Wrapper>
      <header class="header">
        <h2>Novo na Radio Roži</h2>
        <a href="/emisije" class="link">Pogledaj sve</a>
      </header>
    </Wrapper>
    {#if data.data && data.data.length > 0}
      <HorizontalScroller>
        {#each data.data as mix (mix.key)}
          <MixCard {mix} showTags={true} />
        {/each}
      </HorizontalScroller>
    {:else}
      <p>No mixes found.</p>
    {/if}
  </section>
{:else}
  <section class="mixcloud-latest">
    <h2>Novo na Radio Roži</h2>
    <p>Loading mixes...</p>
  </section>
{/if}

<style>
  .mixcloud-latest {
    padding-top: 2rem;
    padding-bottom: 2rem;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: 1.5rem;
  }

  .mixcloud-latest h2 {
    font-size: 2rem;
  }
</style>
