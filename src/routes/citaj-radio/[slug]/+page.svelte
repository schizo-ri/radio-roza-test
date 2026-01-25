<script>
  // This page handles redirects to the new nested URL structure
  // If you see this page, the article was not found
</script>

<div class="not-found">
  <h1>Clanak nije pronaden</h1>
  <p>Trazeni clanak ne postoji ili je premjesten.</p>
  <a href="/citaj-radio">Povratak na Citaj radio</a>
</div>

<style>
  .not-found {
    max-width: 600px;
    margin: 4rem auto;
    padding: 2rem;
    text-align: center;
  }

  .not-found h1 {
    color: var(--dark);
    margin-bottom: 1rem;
  }

  .not-found p {
    color: var(--muted);
    margin-bottom: 2rem;
  }

  .not-found a {
    color: var(--secondary-600);
    text-decoration: none;
    font-weight: 500;
    padding: 0.75rem 1.5rem;
    border: 2px solid var(--secondary-300);
    border-radius: 8px;
    transition: all 0.2s;
    display: inline-block;
  }

  .not-found a:hover {
    background: var(--secondary-600);
    border-color: var(--secondary-600);
    color: white;
  }
</style>
