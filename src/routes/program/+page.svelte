<script>
  import { getProgramOnWeekday, blocks } from '$lib/utils/program.js';
  import { onMount } from 'svelte';

  // Grupa program po danima
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

  // Dohvati današnji dan
  let today = $state('');
  let currentTime = $state('');
  let programContainer = $state(null);
  let showScrollHint = $state(true);
  let canScrollLeft = $state(false);
  let canScrollRight = $state(true);

  onMount(() => {
    today = new Date().toLocaleDateString('en-US', { weekday: 'long' });

    // Ažuriraj trenutno vrijeme
    const updateTime = () => {
      currentTime = new Date().toLocaleTimeString('hr-HR', {
        hour: '2-digit',
        minute: '2-digit',
      });
    };

    updateTime();
    const timeInterval = setInterval(updateTime, 1000);

    // Auto-centriranje na današnji dan
    if (programContainer && today) {
      const todayIndex = daysOrder.indexOf(today);
      if (todayIndex !== -1) {
        // Čekamo da se komponente rendiraju
        setTimeout(() => {
          const dayColumn = programContainer.querySelector(`[data-day="${today}"]`);
          if (dayColumn) {
            dayColumn.scrollIntoView({
              behavior: 'smooth',
              block: 'nearest',
              inline: 'center',
            });
            // Sakrij hint nakon auto-skroliranja
            setTimeout(() => {
              showScrollHint = false;
            }, 2000);
          }
        }, 100);
      }
    }

    // Event listener za praćenje scroll pozicije
    if (programContainer) {
      const updateScrollButtons = () => {
        const { scrollLeft, scrollWidth, clientWidth } = programContainer;
        canScrollLeft = scrollLeft > 0;
        canScrollRight = scrollLeft < scrollWidth - clientWidth - 10;
      };

      programContainer.addEventListener('scroll', updateScrollButtons);
      // Provjeri na početku
      setTimeout(updateScrollButtons, 200);

      return () => {
        programContainer.removeEventListener('scroll', updateScrollButtons);
        clearInterval(timeInterval);
      };
    }
  });

  // Funkcije za skroliranje lijevo/desno
  function scrollLeft() {
    if (programContainer) {
      programContainer.scrollBy({ left: -340, behavior: 'smooth' });
    }
  }

  function scrollRight() {
    if (programContainer) {
      programContainer.scrollBy({ left: 340, behavior: 'smooth' });
    }
  }

  // Grupa program po danima i sortiraj po vremenu
  function getGroupedProgram() {
    const grouped = {};

    daysOrder.forEach((day) => {
      const dayProgram = getProgramOnWeekday(day);
      grouped[day] = dayProgram.sort((a, b) => {
        return a.show_start.localeCompare(b.show_start);
      });
    });

    return grouped;
  }

  const groupedProgram = getGroupedProgram();

  // Funkcija za kreiranje opisa bloka prema nazivu
  function getShowDescription(title) {
    return blocks[title] || 'Radijski program';
  }
</script>

<svelte:head>
  <title>Program - Radio Roža</title>
  <meta name="description" content="Tjedni program Radio Rože" />
</svelte:head>

<main class="program-container">
  <div class="header">
    <h1>Tjedni Program</h1>
    <p class="subtitle">Radio Roža</p>
    <div class="current-time">
      <span class="time-label">Trenutno vrijeme:</span>
      <span class="time-value">{currentTime}</span>
    </div>
  </div>

  <!-- Scroll hint -->
  {#if showScrollHint}
    <div class="scroll-hint">
      <span>← Pomjeri za pregled ostalih dana →</span>
    </div>
  {/if}

  <!-- Navigation buttons -->
  <div class="scroll-controls">
    <button
      class="scroll-btn scroll-btn-left"
      class:visible={canScrollLeft}
      onclick={scrollLeft}
      aria-label="Skrolaj lijevo"
    >
      ←
    </button>
    <button
      class="scroll-btn scroll-btn-right"
      class:visible={canScrollRight}
      onclick={scrollRight}
      aria-label="Skrolaj desno"
    >
      →
    </button>
  </div>

  <div class="program-wrapper" bind:this={programContainer}>
    <div class="program-grid">
      {#each daysOrder as day (day)}
        <div class="day-column" class:today={today === day} data-day={day}>
          <div class="day-header">
            <h2>{dayNames[day]}</h2>
            {#if today === day}
              <span class="today-indicator">DANAS</span>
            {/if}
          </div>

          <div class="shows-list">
            {#each groupedProgram[day] as show (show.full_date + show.title)}
              <div class="show-item">
                <div class="show-time">{show.show_start}</div>
                <div class="show-info">
                  <h3 class="show-title">{show.title}</h3>
                  <p class="show-description">{getShowDescription(show.title)}</p>
                </div>
              </div>
            {/each}

            {#if groupedProgram[day].length === 0}
              <div class="no-shows">
                <p>Nema programa</p>
              </div>
            {/if}
          </div>
        </div>
      {/each}
    </div>
  </div>
</main>

<style>
  .program-container {
    padding: var(--whitespace);
    max-width: var(--max-content-width);
    margin: 0 auto;
  }

  .header {
    text-align: center;
    margin-bottom: 3rem;
  }

  .header h1 {
    font-family: var(--display-font);
    font-size: 3rem;
    font-weight: 800;
    color: var(--primary-700);
    margin-bottom: 0.5rem;
  }

  .subtitle {
    font-size: 1.25rem;
    color: var(--muted);
    font-weight: 500;
  }

  .current-time {
    margin-top: 1rem;
    font-size: 1rem;
    color: var(--dark);
  }

  .time-label {
    color: var(--muted);
    margin-right: 0.5rem;
  }

  .time-value {
    font-family: var(--display-font);
    font-weight: 800;
    color: var(--primary-700);
    font-size: 1.25rem;
  }

  .program-wrapper {
    overflow-x: auto;
    overflow-y: hidden;
    margin-top: 2rem;
    padding-bottom: 1rem;
    scroll-behavior: smooth;
  }

  .program-grid {
    display: flex;
    gap: 1.5rem;
    min-width: fit-content;
    padding: 0 1rem;
  }

  @media (max-width: 767px) {
    .program-wrapper {
      overflow-x: visible;
    }

    .program-grid {
      flex-direction: column;
      padding: 0;
    }
  }

  .day-column {
    background: white;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    transition: all 0.3s ease;
    min-width: 320px;
    flex-shrink: 0;
  }

  .day-column:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  .day-column.today {
    border: 3px solid var(--primary-600);
    box-shadow: 0 4px 16px rgba(211, 50, 58, 0.2);
  }

  .day-header {
    background: linear-gradient(135deg, var(--primary-600) 0%, var(--primary-700) 100%);
    padding: 1rem;
    color: white;
    position: relative;
  }

  .day-column.today .day-header {
    background: linear-gradient(135deg, var(--primary-700) 0%, var(--primary-800) 100%);
  }

  .day-header h2 {
    font-family: var(--display-font);
    font-size: 1.25rem;
    font-weight: 800;
    margin: 0;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .today-indicator {
    position: absolute;
    top: 0.5rem;
    right: 1rem;
    background: var(--yellow);
    color: var(--dark);
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    font-size: 0.75rem;
    font-weight: 800;
    animation: pulse 2s infinite;
  }

  @keyframes pulse {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0.7;
    }
  }

  .shows-list {
    padding: 0.5rem;
    max-height: 80vh;
    overflow-y: auto;
  }

  .show-item {
    display: flex;
    gap: 1rem;
    padding: 0.75rem;
    margin-bottom: 0.5rem;
    border-radius: 8px;
    transition: background-color 0.2s ease;
  }

  .show-item:hover {
    background-color: var(--primary-50);
  }

  .day-column.today .show-item:hover {
    background-color: var(--primary-100);
  }

  .show-time {
    font-weight: 800;
    color: var(--primary-700);
    font-family: var(--display-font);
    font-size: 1rem;
    min-width: 50px;
    flex-shrink: 0;
  }

  .show-info {
    flex: 1;
    min-width: 0;
  }

  .show-title {
    font-size: 0.95rem;
    font-weight: 600;
    color: var(--dark);
    margin: 0 0 0.25rem 0;
    line-height: 1.3;
  }

  .show-description {
    font-size: 0.8rem;
    color: var(--muted);
    margin: 0;
    line-height: 1.4;
  }

  .no-shows {
    padding: 2rem 1rem;
    text-align: center;
  }

  .no-shows p {
    color: var(--muted);
    font-style: italic;
    margin: 0;
  }

  /* Responsive adjustments */
  @media (max-width: 767px) {
    .header h1 {
      font-size: 2rem;
    }

    .day-column {
      margin-bottom: 1rem;
      min-width: auto;
    }

    .shows-list {
      max-height: none;
    }
  }

  /* Scroll hint */
  .scroll-hint {
    text-align: center;
    margin: 1rem 0;
    animation: fadeInOut 4s ease-in-out;
  }

  .scroll-hint span {
    background: var(--primary-100);
    color: var(--primary-700);
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-size: 0.9rem;
    font-weight: 500;
  }

  @keyframes fadeInOut {
    0%,
    100% {
      opacity: 0;
    }
    20%,
    80% {
      opacity: 1;
    }
  }

  /* Scroll controls */
  .scroll-controls {
    position: relative;
    height: 0;
  }

  .scroll-btn {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: var(--primary-600);
    color: white;
    border: none;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    font-size: 1.5rem;
    cursor: pointer;
    z-index: 10;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    transition: all 0.3s ease;
    opacity: 0;
    pointer-events: none;
  }

  .scroll-btn:hover {
    background: var(--primary-700);
    transform: translateY(-50%) scale(1.1);
  }

  .scroll-btn.visible {
    opacity: 1;
    pointer-events: auto;
  }

  .scroll-btn-left {
    left: -24px;
  }

  .scroll-btn-right {
    right: -24px;
  }

  @media (max-width: 767px) {
    .scroll-controls {
      display: none;
    }

    .scroll-hint {
      display: none;
    }
  }

  /* Scroll styling */
  .shows-list::-webkit-scrollbar,
  .program-wrapper::-webkit-scrollbar {
    width: 4px;
    height: 6px;
  }

  .shows-list::-webkit-scrollbar-track,
  .program-wrapper::-webkit-scrollbar-track {
    background: var(--light);
    border-radius: 3px;
  }

  .shows-list::-webkit-scrollbar-thumb,
  .program-wrapper::-webkit-scrollbar-thumb {
    background: var(--primary-300);
    border-radius: 3px;
  }

  .shows-list::-webkit-scrollbar-thumb:hover,
  .program-wrapper::-webkit-scrollbar-thumb:hover {
    background: var(--primary-400);
  }

  /* Firefox scrollbar styling */
  .program-wrapper {
    scrollbar-width: thin;
    scrollbar-color: var(--primary-300) var(--light);
  }
</style>
