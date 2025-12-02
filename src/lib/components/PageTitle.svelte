<script>
  const { title, subtitle } = $props();
</script>

<header>
  <h1>{title}</h1>
  <p>{subtitle}</p>
</header>

<style>
  header {
    text-align: center;
    margin-top: 2rem;
    margin-bottom: 2rem;
  }

  header h1 {
    font-family: var(--display-font);
    font-size: 3rem;
    font-weight: 800;
    color: var(--primary-700);
  }

  header p {
    font-size: 1.25rem;
    font-weight: 400;
    color: var(--primary-500);
  }
</style>
