<script>
  const { href, children } = $props();
</script>

<a {href}>
  {@render children()}
</a>

<style>
  a {
    color: var(--primary-700);
    font-weight: 500;
    text-decoration: none;
  }

  a:hover {
    color: var(--primary-600);
    text-decoration: underline;
  }

  a:focus {
    text-decoration: underline;
  }
</style>
