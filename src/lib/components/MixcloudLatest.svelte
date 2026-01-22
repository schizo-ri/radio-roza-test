<!-- Display latest mixes from Mixcloud for user RadioRoza -->
<script>
  let { data } = $props();

  import HorizontalScroller from '$lib/components/HorizontalScroller.svelte';
  import MixCardOverlay from '$lib/components/MixCardOverlay.svelte';
</script>

{#if data}
  <section class="mixcloud-latest">
    {#if data.data && data.data.length > 0}
      <HorizontalScroller>
        {#each data.data as mix, index (`${mix.url}-${index}`)}
          <MixCardOverlay {mix} showTags={true} />
        {/each}
      </HorizontalScroller>
    {:else}
      <p>No mixes found.</p>
    {/if}
  </section>
{:else}
  <section class="placeholders">
    <p>Učitavanje emisija...</p>
  </section>
{/if}
