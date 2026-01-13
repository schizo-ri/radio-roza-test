<script>
  import SectionTitle from './SectionTitle.svelte';
  // import SectionLink from './SectionLink.svelte';
  const { title, href, link, children } = $props();
</script>

<header>
  <SectionTitle>
    {#if link}
      <a {href}>{title}</a>
    {:else}
      {title}
    {/if}
  </SectionTitle>

  <!-- {#if link}
    <SectionLink {href}>{link}</SectionLink>
  {/if} -->

  {#if children}
    {@render children()}
  {/if}
</header>

<style>
  header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    position: relative;
  }

  a {
    color: var(--primary-800);
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }
</style>
