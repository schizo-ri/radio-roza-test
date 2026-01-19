<script>
  import Gallery from './Gallery.svelte';

  /**
   * @typedef {Object} GalleryImage
   * @property {string} src
   * @property {string} [alt]
   * @property {string} [caption]
   * @property {string} [thumbnail]
   */

  /** @type {GalleryImage[]} */
  let { images, columns = 3, title = 'Galerija' } = $props();
</script>

<section class="gallery-section">
  <h2>{title}</h2>
  <Gallery {images} {columns} />
</section>

<style>
  .gallery-section {
    max-width: 900px;
    margin: 3rem auto 0;
    padding: 0 1rem;
  }

  .gallery-section h2 {
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--dark);
    margin-bottom: 1.5rem;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid var(--primary-100);
  }
</style>
