<script>
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';

  /**
   * @typedef {Object} GalleryImage
   * @property {string} src
   * @property {string} [alt]
   * @property {string} [caption]
   */

  /** @type {GalleryImage[]} */
  let { images, currentIndex = 0, onclose, onnavigate } = $props();

  let dialogElement = $state(null);
  let imageLoaded = $state(false);
  let isAnimating = $state(false);
  let slideDirection = $state('none');
  let previousActiveElement = $state(null);

  let currentImage = $derived(images[currentIndex]);
  let hasPrevious = $derived(currentIndex > 0);
  let hasNext = $derived(currentIndex < images.length - 1);

  function navigate(direction) {
    if (isAnimating) return;

    const newIndex = currentIndex + direction;
    if (newIndex < 0 || newIndex >= images.length) return;

    isAnimating = true;
    slideDirection = direction > 0 ? 'left' : 'right';
    imageLoaded = false;

    setTimeout(() => {
      onnavigate(newIndex);
      slideDirection = 'none';
      isAnimating = false;
    }, 200);
  }

  function goToFirst() {
    if (currentIndex !== 0) {
      onnavigate(0);
      imageLoaded = false;
    }
  }

  function goToLast() {
    if (currentIndex !== images.length - 1) {
      onnavigate(images.length - 1);
      imageLoaded = false;
    }
  }

  function handleKeydown(event) {
    switch (event.key) {
      case 'Escape':
        event.preventDefault();
        onclose();
        break;
      case 'ArrowLeft':
        event.preventDefault();
        navigate(-1);
        break;
      case 'ArrowRight':
        event.preventDefault();
        navigate(1);
        break;
      case 'Home':
        event.preventDefault();
        goToFirst();
        break;
      case 'End':
        event.preventDefault();
        goToLast();
        break;
    }
  }

  function handleBackdropClick(event) {
    if (event.target === event.currentTarget) {
      onclose();
    }
  }

  function handleImageLoad() {
    imageLoaded = true;
  }

  // Touch/swipe support
  let touchStartX = $state(0);
  let touchEndX = $state(0);

  function handleTouchStart(event) {
    touchStartX = event.changedTouches[0].screenX;
  }

  function handleTouchEnd(event) {
    touchEndX = event.changedTouches[0].screenX;
    handleSwipe();
  }

  function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0 && hasNext) {
        navigate(1);
      } else if (diff < 0 && hasPrevious) {
        navigate(-1);
      }
    }
  }

  onMount(() => {
    if (!browser) return;

    // Store current active element to restore focus later
    previousActiveElement = document.activeElement;

    // Prevent body scroll
    document.body.style.overflow = 'hidden';

    // Focus the dialog
    dialogElement?.focus();

    return () => {
      document.body.style.overflow = '';
      // Restore focus
      previousActiveElement?.focus();
    };
  });
</script>

<div
  class="lightbox-backdrop"
  role="dialog"
  aria-modal="true"
  aria-label="Preglednik galerije"
  bind:this={dialogElement}
  tabindex="-1"
  onclick={handleBackdropClick}
  onkeydown={handleKeydown}
  ontouchstart={handleTouchStart}
  ontouchend={handleTouchEnd}
>
  <div class="lightbox-content">
    <!-- Close button -->
    <button
      type="button"
      class="lightbox-close"
      onclick={onclose}
      aria-label="Zatvori galeriju"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
        <path d="M18 6 6 18M6 6l12 12"/>
      </svg>
    </button>

    <!-- Navigation: Previous -->
    <button
      type="button"
      class="lightbox-nav lightbox-prev"
      onclick={() => navigate(-1)}
      disabled={!hasPrevious}
      aria-label="Prethodna slika"
    >
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
        <path d="m15 18-6-6 6-6"/>
      </svg>
    </button>

    <!-- Main image -->
    <figure class="lightbox-figure" class:slide-left={slideDirection === 'left'} class:slide-right={slideDirection === 'right'}>
      <div class="lightbox-image-container">
        {#if !imageLoaded}
          <div class="lightbox-loader" aria-label="Učitavanje slike">
            <span class="spinner"></span>
          </div>
        {/if}
        {#key currentImage.src}
          <img
            src={currentImage.src}
            alt={currentImage.alt || `Slika ${currentIndex + 1}`}
            class="lightbox-image"
            class:loaded={imageLoaded}
            onload={handleImageLoad}
            draggable="false"
          />
        {/key}
      </div>
      {#if currentImage.caption || currentImage.alt}
        <figcaption class="lightbox-caption">
          {currentImage.caption || currentImage.alt}
        </figcaption>
      {/if}
    </figure>

    <!-- Navigation: Next -->
    <button
      type="button"
      class="lightbox-nav lightbox-next"
      onclick={() => navigate(1)}
      disabled={!hasNext}
      aria-label="Sljedeća slika"
    >
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
        <path d="m9 18 6-6-6-6"/>
      </svg>
    </button>

    <!-- Counter -->
    <div class="lightbox-counter" aria-live="polite" aria-atomic="true">
      <span class="sr-only">Slika</span>
      {currentIndex + 1} / {images.length}
    </div>

    <!-- Keyboard hints (visible on focus) -->
    <div class="lightbox-hints" aria-hidden="true">
      <kbd>←</kbd> <kbd>→</kbd> navigacija
      <kbd>Esc</kbd> zatvori
    </div>
  </div>
</div>

<style>
  .lightbox-backdrop {
    position: fixed;
    inset: 0;
    z-index: 2000;
    background: rgba(0, 0, 0, 0.95);
    display: flex;
    align-items: center;
    justify-content: center;
    animation: fadeIn 0.2s ease;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  .lightbox-content {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .lightbox-close {
    position: absolute;
    top: 1rem;
    right: 1rem;
    z-index: 10;
    padding: 0.75rem;
    background: rgba(255, 255, 255, 0.1);
    border: none;
    border-radius: 50%;
    color: white;
    cursor: pointer;
    transition: background-color 0.2s ease, transform 0.2s ease;
  }

  .lightbox-close:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: scale(1.1);
  }

  .lightbox-close:focus-visible {
    outline: 2px solid white;
    outline-offset: 2px;
  }

  .lightbox-nav {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 10;
    padding: 1rem;
    background: rgba(255, 255, 255, 0.1);
    border: none;
    border-radius: 50%;
    color: white;
    cursor: pointer;
    transition: background-color 0.2s ease, opacity 0.2s ease, transform 0.2s ease;
  }

  .lightbox-nav:hover:not(:disabled) {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-50%) scale(1.1);
  }

  .lightbox-nav:focus-visible {
    outline: 2px solid white;
    outline-offset: 2px;
  }

  .lightbox-nav:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }

  .lightbox-prev {
    left: 1rem;
  }

  .lightbox-next {
    right: 1rem;
  }

  .lightbox-figure {
    margin: 0;
    max-width: calc(100% - 8rem);
    max-height: calc(100% - 8rem);
    display: flex;
    flex-direction: column;
    align-items: center;
    transition: transform 0.2s ease, opacity 0.2s ease;
  }

  .lightbox-figure.slide-left {
    transform: translateX(-20px);
    opacity: 0.5;
  }

  .lightbox-figure.slide-right {
    transform: translateX(20px);
    opacity: 0.5;
  }

  .lightbox-image-container {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 200px;
    min-height: 200px;
  }

  .lightbox-loader {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .spinner {
    width: 40px;
    height: 40px;
    border: 3px solid rgba(255, 255, 255, 0.2);
    border-top-color: white;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  .lightbox-image {
    max-width: 100%;
    max-height: calc(100vh - 10rem);
    object-fit: contain;
    border-radius: 4px;
    opacity: 0;
    transition: opacity 0.3s ease;
    user-select: none;
  }

  .lightbox-image.loaded {
    opacity: 1;
  }

  .lightbox-caption {
    margin-top: 1rem;
    padding: 0.75rem 1.5rem;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 4px;
    color: white;
    font-size: 0.95rem;
    text-align: center;
    max-width: 600px;
  }

  .lightbox-counter {
    position: absolute;
    bottom: 1.5rem;
    left: 50%;
    transform: translateX(-50%);
    padding: 0.5rem 1rem;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 4px;
    color: white;
    font-size: 0.875rem;
    font-variant-numeric: tabular-nums;
  }

  .lightbox-hints {
    position: absolute;
    bottom: 1.5rem;
    right: 1.5rem;
    color: rgba(255, 255, 255, 0.5);
    font-size: 0.75rem;
    display: none;
  }

  .lightbox-backdrop:focus-within .lightbox-hints {
    display: block;
  }

  .lightbox-hints kbd {
    display: inline-block;
    padding: 0.15rem 0.4rem;
    background: rgba(255, 255, 255, 0.15);
    border-radius: 3px;
    font-family: inherit;
    font-size: 0.7rem;
  }

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  @media (max-width: 768px) {
    .lightbox-nav {
      padding: 0.75rem;
    }

    .lightbox-prev {
      left: 0.5rem;
    }

    .lightbox-next {
      right: 0.5rem;
    }

    .lightbox-figure {
      max-width: calc(100% - 5rem);
      max-height: calc(100% - 6rem);
    }

    .lightbox-image {
      max-height: calc(100vh - 8rem);
    }

    .lightbox-caption {
      font-size: 0.875rem;
      padding: 0.5rem 1rem;
    }

    .lightbox-hints {
      display: none !important;
    }
  }

  @media (max-width: 480px) {
    .lightbox-nav {
      padding: 0.5rem;
    }

    .lightbox-nav svg {
      width: 24px;
      height: 24px;
    }

    .lightbox-figure {
      max-width: calc(100% - 3rem);
    }
  }
</style>
