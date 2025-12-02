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
</div>

{#if controls}
  <Wrapper>
    <div class="controls">
      <button type="button" class="arrow" onclick={scrollLeft}>
        <img src="/icons/arrow-fat-left.svg" width="32" height="32" alt="Scroll left" />
      </button>
      <button type="button" class="arrow" onclick={scrollRight}>
        <img src="/icons/arrow-fat-right.svg" width="32" height="32" alt="Scroll right" />
      </button>
    </div>
  </Wrapper>
{/if}

<style>
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
    position: absolute;
    inset: 0;
    align-items: center;
    display: flex;
    justify-content: space-between;
    /*gap: 0.5rem;*/
    padding-bottom: 1.5rem;
    padding-top: 1.5rem;
  }

  .controls button {
    position: absolute;
    cursor: pointer;
    flex-shrink: 0;
  }

  .controls button:nth-child(1) {
    left: calc(var(--whitespace) - 32px);
  }

  .controls button:nth-child(2) {
    right: calc(var(--whitespace) - 32px);
  }

  .arrow {
    all: unset;
    align-items: center;
    background: var(--primary-600);
    border: 1px solid var(--primary-600);
    color: white;
    border-radius: 50%;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.4);
    display: flex;
    justify-content: center;
    height: 64px;
    width: 64px;
    opacity: 0.5;
    transition: opacity 0.2s ease-in-out;
  }

  .arrow:hover {
    opacity: 1;
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
</style>
