<script>
  import Wrapper from './Wrapper.svelte';

  let { children, ...rest } = $props();
</script>

<Wrapper>
  <section {...rest}>
    {@render children()}
  </section>
</Wrapper>

<style>
  section {
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
  }
</style>
