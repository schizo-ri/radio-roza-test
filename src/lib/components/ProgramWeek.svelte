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

  onMount(() => {
    today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
    selectedDay = today;
  });

  function switchToDay(day) {
    if (day !== selectedDay) {
      selectedDay = day;
    }
  }
</script>

<div class="program-week">
  <!-- Tab Navigation -->
  <div class="tabs-container">
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

  <!-- Program Content -->
  <div class="program-content">
    <ProgramDay day={selectedDay} showCurrentIndicator={selectedDay === today} />
  </div>
</div>

<style>
  .program-week {
    max-width: 1000px;
    margin: 0 auto;
  }

  /* Tab Navigation */
  .tabs-container {
    overflow-x: auto;
    overflow-y: hidden;
    scroll-behavior: smooth;
  }

  .tabs {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    align-items: end;
    padding-bottom: 0.5rem;
  }

  .tab {
    background: white;
    border-top: 2px solid var(--primary-200);
    border-right: 2px solid var(--primary-200);
    border-bottom: 2px solid var(--primary-200);
    border-left: 0;
    padding: 0.75rem 1rem;
    font-family: var(--display-font);
    font-weight: 600;
    color: var(--primary-600);
    cursor: pointer;
    transition: all 0.15s ease;
    position: relative;
    min-width: 140px;
    text-align: center;
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
    box-shadow: 0 4px 12px rgba(211, 50, 58, 0.3);
  }

  .tab.today {
    border-radius: 8px 8px 0 0;
  }

  .tab.today:not(.active) {
    border-color: var(--yellow);
    background: var(--primary-50);
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
    color: var(--yellow);
  }

  .tab.active .today-indicator {
    color: var(--yellow);
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

  /* Responsive adjustments */
  @media (max-width: 767px) {
    .tabs-container {
      margin: 0 calc(-1 * var(--whitespace, 1rem));
      padding: 0 var(--whitespace, 1rem);
    }

    .tab {
      min-width: 120px;
      padding: 0.8rem 1rem;
    }
  }

  /* Scroll styling */
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
</style>
