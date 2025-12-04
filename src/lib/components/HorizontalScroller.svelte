<script>
  import Wrapper from './Wrapper.svelte';

  let { children, class: className = '', controls = true, ...rest } = $props();

  let containerRef;

  const scrollLeft = () => {
    if (containerRef) {
      const scrollAmount = containerRef.clientWidth * 0.8; // Scroll 80% of container width
      containerRef.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (containerRef) {
      const scrollAmount = containerRef.clientWidth * 0.8; // Scroll 80% of container width
      containerRef.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };
</script>

<div class="wrap">
  <section class="container {className}" bind:this={containerRef} {...rest}>
    {@render children()}
  </section>
  {#if controls}
    <div class="controls">
      <button type="button" class="arrow left" onclick={scrollLeft}>
        <img src="/icons/arrow-fat-left.svg" width="16" height="16" alt="Scroll left" />
      </button>
      <button type="button" class="arrow right" onclick={scrollRight}>
        <img src="/icons/arrow-fat-right.svg" width="16" height="16" alt="Scroll right" />
      </button>
    </div>
  {/if}
</div>

<style>
  .wrap {
    position: relative;
  }

  .container {
    --space: var(--whitespace);
    --negative-space: calc(-1 * var(--space));
    align-self: start;
    /* Set up container positioning */
    display: grid;
    grid-auto-columns: auto;
    grid-auto-flow: column;
    gap: 1rem;
    /* Enable overflow along our scroll axis */
    overflow-x: auto;
    /* overflow-x: auto; */
    overflow-y: hidden;
    /* Define axis and scroll type, where `mandatory` means any scroll attempt will cause a scroll to the next item */
    scroll-snap-type: x mandatory;
    scroll-padding: 1rem;

    padding-top: 1rem;
    padding-bottom: 1rem;
    padding-right: var(--space);
    padding-left: var(--space);

    margin-top: -1rem;
    margin-bottom: -1rem;
    margin-right: 0;
    margin-left: 0;

    max-width: 100cqw;
    position: relative;

    -webkit-overflow-scrolling: touch;
    scroll-behavior: smooth;
  }

  .container {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  .container::-webkit-scrollbar {
    display: none;
  }

  .controls {
    position: relative;
    height: 64px;
  }

  .arrow {
    all: unset;
    display: none;
    position: absolute;
    /*top: calc(50% - 32px);*/
    top: 16px;
    cursor: pointer;
    flex-shrink: 0;
    align-items: center;
    background: var(--primary-600);
    border: 1px solid var(--primary-600);
    color: white;
    border-radius: 50%;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.4);
    justify-content: center;
    height: 32px;
    width: 32px;
    opacity: 0.6;
    transition: opacity 0.2s ease-in-out;
  }

  .arrow:hover {
    opacity: 1;
  }

  .left {
    /*left: 12px;*/
    left: calc(50% - 64px);
  }

  .right {
    /*right: 12px;*/
    right: calc(50% - 64px);
  }

  @media (min-width: 768px) {
    .arrow {
      display: flex;
    }
  }

  @media (min-width: 1344px) {
    .container {
      margin-right: var(--negative-space);
      margin-left: var(--negative-space);
    }

    .wrap {
      padding-left: 0;
      padding-right: 0;
      margin-left: var(--whitespace);
      margin-right: var(--whitespace);
    }
  }

  @media (min-width: 1440px) {
    /*.left {
      left: -32px;
    }*/

    /*.right {
      right: -32px;
    }*/
  }
</style>
