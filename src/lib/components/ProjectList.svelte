<script>
  let { items = [], type = 'unordered', children } = $props();

  const hasItems = $derived(items.length > 0);
  const hasChildren = $derived(!!children);
</script>

{#if hasItems}
  {#if type === 'ordered'}
    <ol>
      {#each items as item, i (i)}
        <li>{item}</li>
      {/each}
    </ol>
  {:else}
    <ul>
      {#each items as item, i (i)}
        <li>{item}</li>
      {/each}
    </ul>
  {/if}
{:else if hasChildren}
  {#if type === 'ordered'}
    <ol>
      {@render children()}
    </ol>
  {:else}
    <ul>
      {@render children()}
    </ul>
  {/if}
{/if}

<style>
  ul {
    margin: 1rem 0 1rem 1.5rem;
  }

  ul > li,
  ol > li {
    margin-bottom: 1rem;
    color: var(--dark);
    font-size: var(--project-font-size);
    line-height: 2;
  }
</style>
