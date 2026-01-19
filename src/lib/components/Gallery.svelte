<script>
  import GalleryLightbox from './GalleryLightbox.svelte';

  /**
   * @typedef {Object} GalleryImage
   * @property {string} src - Image source URL
   * @property {string} [alt] - Alt text for the image
   * @property {string} [caption] - Optional caption
   * @property {string} [thumbnail] - Optional thumbnail URL (uses src if not provided)
   */

  /** @type {GalleryImage[]} */
  let { images, columns = 3 } = $props();

  let lightboxOpen = $state(false);
  let currentIndex = $state(0);

  function openLightbox(index) {
    currentIndex = index;
    lightboxOpen = true;
  }

  function closeLightbox() {
    lightboxOpen = false;
  }

  function handleKeydown(event, index) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openLightbox(index);
    }
  }
</script>

<section class="gallery" aria-label="Galerija slika">
  <ul
    class="gallery-grid"
    style="--columns: {columns}"
    role="list"
  >
    {#each images as image, index (image.src)}
      <li class="gallery-item">
        <figure>
          <button
            type="button"
            class="gallery-button"
            onclick={() => openLightbox(index)}
            onkeydown={(e) => handleKeydown(e, index)}
            aria-label="Otvori sliku {index + 1} od {images.length}{image.alt ? `: ${image.alt}` : ''}"
          >
            <img
              src={image.thumbnail || image.src}
              alt={image.alt || `Slika ${index + 1}`}
              loading="lazy"
              decoding="async"
            />
            <span class="gallery-overlay">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.35-4.35"/>
                <path d="M11 8v6M8 11h6"/>
              </svg>
            </span>
          </button>
          {#if image.caption}
            <figcaption class="gallery-caption">{image.caption}</figcaption>
          {/if}
        </figure>
      </li>
    {/each}
  </ul>
</section>

{#if lightboxOpen}
  <GalleryLightbox
    {images}
    {currentIndex}
    onclose={closeLightbox}
    onnavigate={(index) => currentIndex = index}
  />
{/if}

<style>
  .gallery {
    width: 100%;
  }

  .gallery-grid {
    display: grid;
    grid-template-columns: repeat(var(--columns, 3), 1fr);
    gap: 1rem;
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .gallery-item {
    margin: 0;
  }

  .gallery-item figure {
    margin: 0;
  }

  .gallery-button {
    all: unset;
    position: relative;
    display: block;
    width: 100%;
    aspect-ratio: 1;
    cursor: pointer;
    border-radius: 8px;
    overflow: hidden;
    background: var(--light);
  }

  .gallery-button:focus-visible {
    outline: 3px solid var(--primary-600);
    outline-offset: 2px;
  }

  .gallery-button img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  .gallery-button:hover img,
  .gallery-button:focus img {
    transform: scale(1.05);
  }

  .gallery-overlay {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.4);
    color: white;
    opacity: 0;
    transition: opacity 0.2s ease;
  }

  .gallery-button:hover .gallery-overlay,
  .gallery-button:focus .gallery-overlay {
    opacity: 1;
  }

  .gallery-caption {
    margin-top: 0.5rem;
    font-size: 0.875rem;
    color: var(--muted);
    text-align: center;
  }

  @media (max-width: 768px) {
    .gallery-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 0.75rem;
    }
  }

  @media (max-width: 480px) {
    .gallery-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 0.5rem;
    }
  }
</style>
