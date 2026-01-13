<script>
  const { children } = $props();
</script>

<h2>{@render children()}</h2>

<style>
  h2 {
    font-family: var(--display-font);
    font-size: 1.8rem;
    font-weight: 800;
  }
</style>
