<script>
  let { category } = $props();
</script>

<span>{category.title}</span>

<style>
  span {
    background-color: var(--tertiary-300);
    border-radius: 12px;
    padding: 0.25rem 0.5rem;
    color: var(--dark);
    font-size: 0.75rem;
    font-weight: 500;
    text-decoration: none;
    display: inline-block;
    cursor: pointer;
    transition: all 0.15s;
  }

  span:hover {
    background: var(--tertiary-500);
  }
</style>
