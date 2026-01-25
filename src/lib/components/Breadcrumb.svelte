<script>
  /**
   * @typedef {Object} BreadcrumbItem
   * @property {string} label - Display text
   * @property {string} [href] - Link URL (optional for current page)
   */

  /** @type {{ items: BreadcrumbItem[] }} */
  let { items } = $props();
</script>

<nav class="breadcrumb" aria-label="Breadcrumb">
  <ol>
    {#each items as item, index (index)}
      <li aria-current={index === items.length - 1 ? 'page' : undefined}>
        {#if item.href && index !== items.length - 1}
          <a href={item.href}>{item.label}</a>
        {:else}
          <span>{item.label}</span>
        {/if}
      </li>
    {/each}
  </ol>
</nav>

<style>
  .breadcrumb {
    margin-bottom: 2rem;
  }

  .breadcrumb ol {
    display: flex;
    list-style: none;
    padding: 0;
    margin: 0;
    gap: 0.5rem;
    align-items: center;
    flex-wrap: wrap;
  }

  .breadcrumb li {
    color: var(--muted);
    font-size: 0.875rem;
  }

  .breadcrumb li:not(:last-child)::after {
    content: '/';
    margin-left: 0.5rem;
    color: var(--secondary-200);
  }

  .breadcrumb a {
    color: var(--secondary-700);
    font-weight: 500;
    text-decoration: none;
    transition: color 0.2s;
  }

  .breadcrumb a:hover {
    color: var(--secondary-800);
    text-decoration: underline;
  }

  .breadcrumb li[aria-current='page'] {
    color: var(--dark);
    font-weight: 800;
  }

  .breadcrumb li[aria-current='page'] span {
    max-width: 200px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: inline-block;
    vertical-align: bottom;
  }

  @media (min-width: 600px) {
    .breadcrumb li[aria-current='page'] span {
      max-width: 300px;
    }
  }
</style>
