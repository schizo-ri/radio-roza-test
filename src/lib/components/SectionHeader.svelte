<script>
  import SectionTitle from './SectionTitle.svelte';
  import SectionLink from './SectionLink.svelte';
  const { title, href, link, children } = $props();
</script>

<header>
  <SectionTitle>{title}</SectionTitle>

  {#if link}
    <SectionLink {href}>{link}</SectionLink>
  {/if}

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
</style>
