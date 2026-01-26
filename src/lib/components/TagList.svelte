<script>
  import { SvelteURLSearchParams } from 'svelte/reactivity';
  import { tick } from 'svelte';

  /**
   * TagList - Unified component for displaying tags and categories
   *
   * @prop {Object} category - Optional category object with {title, slug}
   * @prop {string[]} tags - Array of tag strings (displayed as links with #prefix)
   * @prop {string[]} currentTags - Currently active tags for additive filtering
   * @prop {number} maxRows - Max number of rows to show (0 = unlimited)
   */
  let { category = null, tags = [], currentTags = [], maxRows = 0 } = $props();

  // For row-limited mode
  let containerEl = $state(null);
  let visibleCount = $state(tags.length);

  // Row height in pixels (measured: 1 row=26px, 2 rows=60px, 3 rows=94px)
  const ROW_HEIGHT = 26;
  const GAP = 8; // 0.5rem

  // Helper to wait for next frame after DOM update
  function waitForRender() {
    return new Promise((resolve) => {
      tick().then(() => {
        requestAnimationFrame(() => {
          requestAnimationFrame(resolve); // Double rAF for safety
        });
      });
    });
  }

  // Recalculate when tags or maxRows change
  $effect(() => {
    // Dependencies: tags, maxRows, containerEl
    const _ = [tags, maxRows, containerEl];

    if (maxRows <= 0 || !containerEl) {
      visibleCount = tags.length;
      return;
    }

    // Start fresh with all tags
    visibleCount = tags.length;

    // Async measurement loop
    (async () => {
      const maxHeight = maxRows * ROW_HEIGHT + (maxRows - 1) * GAP;
      let current = tags.length;

      while (current > 0) {
        await waitForRender();

        if (!containerEl) break;
        if (containerEl.scrollHeight <= maxHeight) break;

        current--;
        visibleCount = current;
      }
    })();
  });

  let displayTags = $derived(maxRows > 0 ? tags.slice(0, visibleCount) : tags);
  let hiddenCount = $derived(tags.length - visibleCount);

  // Build tag URL that adds to existing tags (if not already present)
  function buildTagUrl(tag) {
    const params = new SvelteURLSearchParams();
    if (currentTags && currentTags.length > 0) {
      currentTags.forEach((t) => params.append('tag', t));
    }
    if (!currentTags || !currentTags.includes(tag)) {
      params.append('tag', tag);
    }
    return `/citaj-radio?${params.toString()}`;
  }

  function isTagActive(tag) {
    return currentTags && currentTags.includes(tag);
  }
</script>

<div class="tag-list" class:tag-list--limited={maxRows > 0} bind:this={containerEl}>
  {#if category}
    <a href="/citaj-radio/{category.slug}" class="category">{category.title}</a>
  {/if}

  {#each displayTags as tag (tag)}
    <a href={buildTagUrl(tag)} class="tag" class:tag--active={isTagActive(tag)}>#{tag}</a>
  {/each}

  {#if hiddenCount > 0}
    <span class="more">+{hiddenCount}</span>
  {/if}
</div>

<style>
  .tag-list {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .tag-list--limited {
    overflow: hidden;
  }

  .category {
    background-color: var(--tertiary-300);
    border-radius: 12px;
    padding: 0.25rem 0.5rem;
    color: var(--dark);
    font-size: 0.75rem;
    font-weight: 500;
    text-decoration: none;
    display: inline-block;
    transition: background-color 0.15s ease;
  }

  .category:hover {
    background: var(--tertiary-500);
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
    transition: all 0.15s ease;
  }

  .tag:hover {
    background: var(--secondary-700);
    color: white;
  }

  .tag--active {
    background: var(--secondary-700);
    color: white;
  }

  .more {
    background: var(--light);
    color: var(--dark);
    padding: 0.25rem 0.5rem;
    border-radius: 12px;
    font-size: 0.75rem;
    font-weight: 500;
  }
</style>
