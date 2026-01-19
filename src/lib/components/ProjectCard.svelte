<script>
  let { title, href, description = '', image = '' } = $props();
</script>

<article class="card">
  <a {href} class="card-link">
    <div class="image-container">
      {#if image}
        <img src={image} alt={title} loading="lazy" />
      {:else}
        <div class="placeholder">
          <span class="initial">{title.charAt(0)}</span>
        </div>
      {/if}
    </div>

    <div class="content">
      <h3 class="title">{title}</h3>
      {#if description}
        <p class="description">{description}</p>
      {/if}
      <span class="read-more">Saznaj više →</span>
    </div>
  </a>
</article>

<style>
  .card {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    background: white;
    border-radius: 12px;
    box-shadow:
      0 1px 3px rgb(0 0 0 / 0.1),
      0 1px 2px rgb(0 0 0 / 0.06);
    transition:
      transform 0.2s ease,
      box-shadow 0.2s ease;
  }

  .card:hover {
    transform: translateY(-4px);
    box-shadow:
      0 10px 15px -3px rgb(0 0 0 / 0.1),
      0 4px 6px -4px rgb(0 0 0 / 0.1);
  }

  .card-link {
    display: flex;
    flex-direction: column;
    text-decoration: none;
    color: inherit;
    height: 100%;
  }

  .image-container {
    position: relative;
    width: 100%;
    aspect-ratio: 16 / 9;
    overflow: hidden;
  }

  .image-container img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  .card:hover .image-container img {
    transform: scale(1.05);
  }

  .placeholder {
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, var(--primary-500) 0%, var(--primary-700) 100%);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .initial {
    font-family: var(--display-font);
    font-size: 4rem;
    font-weight: 800;
    color: white;
    opacity: 0.3;
  }

  .content {
    padding: 1.25rem;
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  .title {
    font-size: 1.25rem;
    font-weight: 600;
    line-height: 1.3;
    margin: 0 0 0.5rem 0;
    color: var(--dark);
    transition: color 0.2s ease;
  }

  .card:hover .title {
    color: var(--primary-700);
  }

  .description {
    font-size: 0.9rem;
    line-height: 1.5;
    color: var(--muted);
    margin: 0 0 1rem 0;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    flex: 1;
  }

  .read-more {
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--primary-600);
    transition: color 0.2s ease;
  }

  .card:hover .read-more {
    color: var(--primary-800);
  }
</style>
