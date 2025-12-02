<script>
  import { onMount } from 'svelte';
  import PageTitle from '$lib/components/PageTitle.svelte';
  import { getProgramOnWeekday, blocks } from '$lib/utils/program.js';

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

  // Stanje
  let today = $state('');
  // let currentTime = $state('');
  let selectedDay = $state('Monday');
  let currentShow = $state(null);
  let programContent = $state(null);

  onMount(() => {
    today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
    selectedDay = today; // Postavi današnji dan kao default

    // Ažuriraj trenutno vrijeme i trenutni show
    const updateTimeAndShow = () => {
      const now = new Date();
      // currentTime = now.toLocaleTimeString('hr-HR', {
      //   hour: '2-digit',
      //   minute: '2-digit',
      // });

      // Pronađi trenutni show
      if (selectedDay === today) {
        const todayProgram = getGroupedProgram()[today];
        const currentTimeMinutes = now.getHours() * 60 + now.getMinutes();

        let activeShow = null;
        for (const show of todayProgram) {
          const [hours, minutes] = show.show_start.split(':').map(Number);
          const showTimeMinutes = hours * 60 + minutes;

          if (showTimeMinutes <= currentTimeMinutes) {
            activeShow = show;
          } else {
            break;
          }
        }
        currentShow = activeShow;
      } else {
        currentShow = null;
      }
    };

    updateTimeAndShow();
    const timeInterval = setInterval(updateTimeAndShow, 10000);

    return () => {
      clearInterval(timeInterval);
    };
  });

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

  // Funkcija za prebacivanje dana sa animacijom
  function switchToDay(day) {
    if (day === selectedDay) return;

    // Dodaj slide-out animaciju
    if (programContent) {
      programContent.classList.add('slide-out');

      setTimeout(() => {
        selectedDay = day;
        programContent.classList.remove('slide-out');
        programContent.classList.add('slide-in');

        setTimeout(() => {
          programContent.classList.remove('slide-in');
        }, 300);
      }, 150);
    } else {
      selectedDay = day;
    }
  }

  // Provjeri da li je show trenutno aktivan
  function isCurrentShow(show) {
    return (
      currentShow && show.full_date === currentShow.full_date && show.title === currentShow.title
    );
  }
</script>

<svelte:head>
  <title>Program - Radio Roža</title>
  <meta name="description" content="Tjedni program Radio Rože" />
</svelte:head>

<main class="program-container">
  <PageTitle title="Tjedni Program" />

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
  <div class="program-content" bind:this={programContent}>
    <div class="day-column">
      <!-- <div class="day-header">
        <h2>{dayNames[selectedDay]}</h2>
        {#if selectedDay === today}
          <span class="live-indicator">🔴 UŽIVO</span>
        {/if}
      </div> -->

      <div class="shows-list">
        {#each groupedProgram[selectedDay] as show (show.full_date + show.title)}
          <div class="show-item" class:current-show={isCurrentShow(show)}>
            <div class="show-time">
              {show.show_start}
              {#if isCurrentShow(show)}
                <span class="live-dot"></span>
              {/if}
            </div>
            <div class="show-info">
              <h3 class="show-title">
                {show.title}
                {#if isCurrentShow(show)}
                  <span class="current-label">SADA</span>
                {/if}
              </h3>
              <p class="show-description">{getShowDescription(show.title)}</p>
            </div>
          </div>
        {/each}

        {#if groupedProgram[selectedDay].length === 0}
          <div class="no-shows">
            <p>Nema programa za ovaj dan</p>
          </div>
        {/if}
      </div>
    </div>
  </div>
</main>

<style>
  .program-container {
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
    /*border-radius: 12px 12px 0 0;*/
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
    /*border-color: var(--primary-400);*/
  }

  .tab.active {
    background: var(--primary-600);
    color: white;
    border-color: var(--primary-600);
    /*transform: translateY(-2px);*/
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

  /*.program-content.slide-out {
    opacity: 0;
    transform: translateX(-20px);
  }*/

  /*.program-content.slide-in {
    opacity: 0;
    transform: translateX(20px);
    animation: slideInAnimation 0.15s ease forwards;
  }*/

  @keyframes slideInAnimation {
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  .day-column {
    /*background: white;*/
    border-radius: 0 0 12px 12px;
    border-left: 1px solid var(--light);
    border-right: 1px solid var(--light);
    border-bottom: 1px solid var(--light);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
    overflow: hidden;
  }

  /*.day-header {
    background: linear-gradient(135deg, var(--primary-600) 0%, var(--primary-700) 100%);
    padding: 1.5rem;
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }*/

  /*.day-header h2 {
    font-family: var(--display-font);
    font-size: 1.5rem;
    font-weight: 800;
    margin: 0;
  }*/

  /*.live-indicator {
    background: var(--red);
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 800;
    animation: pulse 2s infinite;
  }*/

  .shows-list {
    padding: 1rem;
    /*max-height: 70vh;*/
    /*overflow-y: auto;*/
  }

  .show-item {
    display: flex;
    gap: 1rem;
    padding: 1rem;
    margin-bottom: 0.5rem;
    border-radius: 8px;
    transition: all 0.2s ease;
    border-left: 4px solid transparent;
  }

  .show-item:not(:last-child) {
    border-bottom: 1px solid var(--light);
  }

  .show-item:hover {
    background-color: var(--primary-50);
    border-left: 4px solid var(--primary-200);
  }

  .show-item.current-show {
    background: linear-gradient(135deg, var(--secondary-800) 0%, var(--secondary-600) 100%);
    color: white;
    border-left-color: var(--yellow);
    animation: currentShowPulse 3s ease-in-out infinite;
    box-shadow: 0 4px 12px hsl(177deg 50% 65% / 0.2);
  }

  /*.show-item.past-show {
    opacity: 0.6;
    background-color: var(--light);
  }*/

  .show-item.current-show:hover {
    background: linear-gradient(135deg, var(--secondary-700) 0%, var(--secondary-600) 100%);
  }

  @keyframes currentShowPulse {
    0%,
    100% {
      box-shadow: 0 4px 12px hsl(177deg 50% 65% / 0.2);
    }
    50% {
      box-shadow: 0 6px 20px hsl(177deg 50% 70% / 0.6);
    }
  }

  .show-time {
    font-weight: 800;
    color: var(--primary-700);
    font-family: var(--display-font);
    font-size: 1.1rem;
    min-width: 70px;
    flex-shrink: 0;
    position: relative;
  }

  .current-show .show-time {
    color: white;
  }

  .live-dot {
    position: absolute;
    top: -2px;
    right: -10px;
    width: 8px;
    height: 8px;
    background: var(--red);
    border-radius: 50%;
    animation: liveBlink 1s infinite;
  }

  @keyframes liveBlink {
    0%,
    50% {
      opacity: 1;
    }
    51%,
    100% {
      opacity: 0.3;
    }
  }

  .show-info {
    flex: 1;
    min-width: 0;
  }

  .show-title {
    font-size: 1.1rem;
    font-weight: 600;
    color: var(--dark);
    margin: 0 0 0.5rem 0;
    line-height: 1.3;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .current-show .show-title {
    color: white;
  }

  .current-label {
    background: var(--yellow);
    color: var(--dark);
    font-size: 0.7rem;
    font-weight: 800;
    padding: 0.2rem 0.5rem;
    border-radius: 4px;
    animation: pulse 2s infinite;
  }

  .show-description {
    font-size: 0.9rem;
    color: var(--muted);
    margin: 0;
    line-height: 1.4;
  }

  .current-show .show-description {
    color: rgba(255, 255, 255, 0.9);
  }

  .no-shows {
    padding: 3rem 1rem;
    text-align: center;
  }

  .no-shows p {
    color: var(--muted);
    font-style: italic;
    margin: 0;
    font-size: 1.1rem;
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

  /* Responsive adjustments */
  @media (max-width: 767px) {
    .header h1 {
      font-size: 2rem;
    }

    .tabs-container {
      margin: 0 -var(--whitespace) 2rem;
      padding: 0 var(--whitespace);
    }

    .tab {
      min-width: 120px;
      padding: 0.8rem 1rem;
    }

    /*.day-header {
      flex-direction: column;
      gap: 0.5rem;
      align-items: flex-start;
    }*/

    .shows-list {
      max-height: none;
    }

    .show-item {
      flex-direction: column;
      gap: 0.5rem;
    }

    .show-time {
      min-width: auto;
    }
  }

  /* Scroll styling */
  .shows-list::-webkit-scrollbar,
  .tabs-container::-webkit-scrollbar {
    width: 4px;
    height: 4px;
  }

  .shows-list::-webkit-scrollbar-track,
  .tabs-container::-webkit-scrollbar-track {
    background: var(--light);
    border-radius: 2px;
  }

  .shows-list::-webkit-scrollbar-thumb,
  .tabs-container::-webkit-scrollbar-thumb {
    background: var(--primary-300);
    border-radius: 2px;
  }

  .shows-list::-webkit-scrollbar-thumb:hover,
  .tabs-container::-webkit-scrollbar-thumb:hover {
    background: var(--primary-400);
  }

  /* Firefox scrollbar */
  .shows-list,
  .tabs-container {
    scrollbar-width: thin;
    scrollbar-color: var(--primary-300) var(--light);
  }
</style>
