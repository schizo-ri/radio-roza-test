<script>
  import { onMount } from 'svelte';
  import ProgramDay from './ProgramDay.svelte';

  const daysOrder = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const dayNames = {
    Monday: 'Ponedjeljak',
    Tuesday: 'Utorak',
    Wednesday: 'Srijeda',
    Thursday: 'Četvrtak',
    Friday: 'Petak',
    Saturday: 'Subota',
    Sunday: 'Nedjelja',
  };

  let today = $state('');
  let selectedDay = $state('Monday');

  // Scroll state
  let tabsContainer = $state(null);
  let canScrollLeft = $state(false);
  let canScrollRight = $state(false);
  let isOverflowing = $state(false);

  onMount(() => {
    today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
    selectedDay = today;

    // Check overflow and scroll position
    const checkScroll = () => {
      if (!tabsContainer) return;
      const { scrollLeft, scrollWidth, clientWidth } = tabsContainer;
      isOverflowing = scrollWidth > clientWidth;
      canScrollLeft = scrollLeft > 1;
      canScrollRight = scrollLeft < scrollWidth - clientWidth - 1;
    };

    checkScroll();

    // Observe resize
    const resizeObserver = new ResizeObserver(checkScroll);
    if (tabsContainer) {
      resizeObserver.observe(tabsContainer);
      tabsContainer.addEventListener('scroll', checkScroll);
    }

    return () => {
      resizeObserver.disconnect();
      tabsContainer?.removeEventListener('scroll', checkScroll);
    };
  });

  function switchToDay(day) {
    if (day !== selectedDay) {
      selectedDay = day;
    }
  }

  function scrollTabs(direction) {
    if (!tabsContainer) return;
    const scrollAmount = 200;
    tabsContainer.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  }
</script>

<div class="program-week">
  <!-- Tab Navigation -->
  <div class="tabs-wrapper" class:has-overflow={isOverflowing}>
    {#if isOverflowing && canScrollLeft}
      <button
        class="scroll-btn scroll-left"
        onclick={() => scrollTabs('left')}
        aria-label="Scroll left"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>
    {/if}

    <div class="tabs-container" bind:this={tabsContainer}>
      <div class="tabs">
        {#each daysOrder as day (day)}
          <button
            class="tab"
            class:active={selectedDay === day}
            class:today={today === day}
            onclick={() => switchToDay(day)}
          >
            <span class="tab-name">{dayNames[day]}</span>
            {#if today === day}
              <span class="today-indicator">DANAS</span>
            {/if}
          </button>
        {/each}
      </div>
    </div>

    {#if isOverflowing && canScrollRight}
      <button
        class="scroll-btn scroll-right"
        onclick={() => scrollTabs('right')}
        aria-label="Scroll right"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>
    {/if}
  </div>

  <!-- Program Content -->
  <div class="program-content">
    <ProgramDay day={selectedDay} showCurrentIndicator={selectedDay === today} />
  </div>
</div>

<style>
  .program-week {
    max-width: 100%;
    overflow: hidden;
  }

  /* Tabs Wrapper with arrows */
  .tabs-wrapper {
    position: relative;
    display: flex;
    align-items: stretch;
    max-width: 100%;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  }

  .scroll-btn {
    display: none;
    position: absolute;
    top: 0;
    bottom: 4px;
    width: 36px;
    background: white;
    border: 2px solid var(--primary-200);
    background-color: var(--white);
    color: var(--primary-600);
    cursor: pointer;
    z-index: 2;
    align-items: center;
    justify-content: center;
    transition: all 0.15s ease;
  }

  .scroll-btn:hover {
    background: var(--tertiary-100);
    color: var(--primary-700);
  }

  .scroll-left {
    left: 0;
    border-right: none;
  }

  .scroll-right {
    right: 0;
    border-left: none;
  }

  /* Show arrows only on non-touch devices */
  @media (hover: hover) and (pointer: fine) {
    .scroll-btn {
      display: flex;
    }

    .tabs-wrapper.has-overflow .tabs-container {
      padding-left: 36px;
      padding-right: 36px;
    }

    /* Hide scrollbar on desktop when we have arrows */
    .tabs-wrapper.has-overflow .tabs-container {
      scrollbar-width: none;
    }

    .tabs-wrapper.has-overflow .tabs-container::-webkit-scrollbar {
      display: none;
    }
  }

  /* Tab Navigation */
  .tabs-container {
    flex: 1;
    min-width: 0;
    overflow-x: auto;
    overflow-y: hidden;
    scroll-behavior: smooth;
  }

  .tabs {
    display: flex;
    padding-bottom: 4px;
  }

  .tab {
    background: white;
    border-top: 2px solid var(--primary-200);
    border-right: 2px solid var(--primary-200);
    border-bottom: 2px solid var(--primary-200);
    border-left: 0;
    padding: 0.75rem 1rem;
    font-family: var(--display-font);
    font-weight: 800;
    color: var(--primary-600);
    cursor: pointer;
    transition: all 0.15s ease;
    position: relative;
    min-width: 120px;
    flex: 1 0 auto;
    text-align: center;
    white-space: nowrap;
  }

  .tab:first-child {
    border-left: 2px solid var(--primary-200);
  }

  .tab:hover {
    background: var(--primary-50);
  }

  .tab.active {
    background: var(--primary-600);
    color: white;
    border-color: var(--primary-600);
  }

  .tab.today:not(.active) {
    border-color: var(--tertiary-500);
    background: var(--tertiary-50);
  }

  .tab-name {
    display: block;
    font-size: 1rem;
  }

  .today-indicator {
    display: block;
    font-size: 0.7rem;
    font-weight: 800;
    margin-top: 0.1rem;
    color: var(--tertiary-500);
  }

  .tab.active .today-indicator {
    color: var(--tertiary-500);
  }

  /* Program Content */
  .program-content {
    transition: all 0.15s ease;
  }

  /* Override ProgramDay styles for week view */
  .program-content :global(.program-day) {
    margin-top: 0;
  }

  .program-content :global(.shows-list) {
    border-radius: 0 0 8px 8px;
    border-top: none;
  }

  /* Responsive - touch devices */
  @media (max-width: 767px) {
    .tabs-container {
      margin: 0 calc(-1 * var(--whitespace, 1rem));
      padding: 0 var(--whitespace, 1rem);
    }

    .tab {
      min-width: 110px;
      padding: 0.6rem 0.75rem;
    }

    .tab-name {
      font-size: 0.9rem;
    }
  }

  @media (min-width: 1000px) {
    .tabs-wrapper {
      padding-left: 0;
      padding-right: 0;
    }

    .tabs {
      padding-bottom: 0;
    }
  }

  /* Scroll styling for touch devices */
  @media (hover: none), (pointer: coarse) {
    .tabs-container::-webkit-scrollbar {
      width: 4px;
      height: 4px;
    }

    .tabs-container::-webkit-scrollbar-track {
      background: var(--light);
      border-radius: 2px;
    }

    .tabs-container::-webkit-scrollbar-thumb {
      background: var(--primary-300);
      border-radius: 2px;
    }

    .tabs-container::-webkit-scrollbar-thumb:hover {
      background: var(--primary-400);
    }

    .tabs-container {
      scrollbar-width: thin;
      scrollbar-color: var(--primary-300) var(--light);
    }
  }
</style>
