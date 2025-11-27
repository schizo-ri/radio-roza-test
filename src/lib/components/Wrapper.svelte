<script>
  let { children, ...rest } = $props();
</script>

<section {...rest}>
  <div>
    {@render children()}
  </div>
</section>

<style>
  div {
    --space: var(--whitespace);
    --negative-space: calc(-1 * var(--space));
    align-self: start;
    /* Set up container positioning */
    display: grid;

    padding-right: var(--space);
    padding-left: var(--space);

    margin-right: 0;
    margin-left: 0;

    max-width: 100cqw;
  }

  @media (min-width: 1344px) {
    section {
      padding-left: 0;
      padding-right: 0;
      margin-left: var(--whitespace);
      margin-right: var(--whitespace);
    }

    div {
      padding-right: var(--space);
      padding-left: var(--space);

      margin-right: var(--negative-space);
      margin-left: var(--negative-space);
    }
  }
</style>
