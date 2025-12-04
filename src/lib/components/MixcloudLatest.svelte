<!-- Display latest mixes from Mixcloud for user RadioRoza -->
<script>
  let { data } = $props();

  import HorizontalScroller from '$lib/components/HorizontalScroller.svelte';
  import Wrapper from '$lib/components/Wrapper.svelte';
  import MixCard from '$lib/components/MixCard.svelte';
</script>

{#if data}
  <section class="mixcloud-latest">
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
  <Wrapper>
    <section class="placeholders">
      <p>Učitavanje emisija...</p>
    </section>
  </Wrapper>
{/if}

<style>
  .mixcloud-latest {
    padding-top: 2rem;
    padding-bottom: 2rem;
  }
</style>
