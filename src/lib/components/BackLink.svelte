<script>
  let { href, label } = $props();
</script>

<div class="navigation-footer">
  <a {href} class="back-link">
    <span class="back-arrow" aria-hidden="true">←</span>
    {label}
  </a>
</div>

<style>
  .navigation-footer {
    display: flex;
    justify-content: center;
    padding: 2rem 0 3rem;
  }

  .back-link {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--secondary-700);
    text-decoration: none;
    font-weight: 500;
    padding: 0.75rem 1.5rem;
    border: 2px solid var(--secondary-500);
    border-radius: 8px;
    transition: all 0.2s;
  }

  .back-link:hover {
    background: var(--secondary-700);
    border-color: var(--secondary-700);
    color: white;
  }

  .back-arrow {
    font-size: 1.1rem;
  }
</style>
