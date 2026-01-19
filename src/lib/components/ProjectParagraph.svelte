<script>
  const { children } = $props();
</script>

<p>{@render children()}</p>

<style>
  p {
    font-size: var(--project-font-size);
    line-height: 2;
    margin-top: 1rem;
    margin-bottom: 1rem;
  }
</style>
