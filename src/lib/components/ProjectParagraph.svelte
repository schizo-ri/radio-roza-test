<script>
  const { children } = $props();
</script>

<p>{@render children()}</p>

<style>
  p {
    font-size: clamp(1rem, 1.75vw, 1.25rem);
    line-height: 2;
    margin-top: 1rem;
    margin-bottom: 1rem;
  }
</style>
