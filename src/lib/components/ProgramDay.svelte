<script>
  import { onMount } from 'svelte';
  import { getProgramOnWeekday, blocks } from '$lib/utils/program.js';

  let { day = '', showCurrentIndicator = true } = $props();

  let currentShow = $state(null);
  let todayName = $state('');

  // Get program for the specified day, sorted by time
  let dayProgram = $derived.by(() => {
    if (!day) return [];
    return getProgramOnWeekday(day).sort((a, b) => a.show_start.localeCompare(b.show_start));
  });

  onMount(() => {
    todayName = new Date().toLocaleDateString('en-US', { weekday: 'long' });

    const updateCurrentShow = () => {
      if (!showCurrentIndicator || day !== todayName) {
        currentShow = null;
        return;
      }

      const now = new Date();
      const currentTimeMinutes = now.getHours() * 60 + now.getMinutes();

      let activeShow = null;
      for (const show of dayProgram) {
        const [hours, minutes] = show.show_start.split(':').map(Number);
        const showTimeMinutes = hours * 60 + minutes;

        if (showTimeMinutes <= currentTimeMinutes) {
          activeShow = show;
        } else {
          break;
        }
      }
      currentShow = activeShow;
    };

    updateCurrentShow();
    const interval = setInterval(updateCurrentShow, 60000);

    return () => clearInterval(interval);
  });

  function getShowDescription(title) {
    return blocks[title] || 'Radijski program';
  }

  function isCurrentShow(show) {
    if (!currentShow || !showCurrentIndicator) return false;
    return show.show_start === currentShow.show_start && show.title === currentShow.title;
  }
</script>

<div class="program-day">
  {#if dayProgram.length > 0}
    <div class="shows-list">
      {#each dayProgram as show, index (`${show.show_start}-${show.title}-${index}`)}
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
    </div>
  {:else}
    <div class="no-shows">
      <p>Nema programa za ovaj dan</p>
    </div>
  {/if}
</div>

<style>
  .shows-list {
    border-radius: 8px;
    overflow: hidden;
    border-bottom: 1px solid var(--light);
  }

  @media (min-width: 1000px) {
    .shows-list {
      border: 1px solid var(--light);
    }
  }

  .show-item {
    display: flex;
    gap: 1rem;
    padding: 1rem;
    transition: all 0.2s ease;
    border-left: 4px solid transparent;
  }

  .show-item:not(:last-child) {
    border-bottom: 1px solid var(--light);
  }

  .show-item:hover {
    background-color: var(--primary-50);
    border-left-color: var(--primary-200);
  }

  .show-item.current-show {
    background: linear-gradient(135deg, var(--primary-200) 0%, var(--primary-100) 100%);
    color: var(--primary-800);
    border-left-color: var(--yellow);
  }

  .show-item.current-show:hover {
    background: linear-gradient(135deg, var(--primary-300) 0%, var(--primary-200) 100%);
    color: var(--primary-900);
  }

  .show-time {
    font-weight: 800;
    color: var(--primary-700);
    font-family: var(--display-font);
    font-size: 1rem;
    min-width: 60px;
    flex-shrink: 0;
    position: relative;
  }

  .current-show .show-time {
    color: var(--primary-900);
  }

  .live-dot {
    position: absolute;
    top: -2px;
    right: -8px;
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
    font-size: 1rem;
    font-weight: 600;
    color: var(--dark);
    margin: 0 0 0.25rem 0;
    line-height: 1.3;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    flex-wrap: wrap;
  }

  .current-show .show-title {
    color: var(--primary-900);
  }

  .current-label {
    background: var(--yellow);
    color: var(--dark);
    font-size: 0.65rem;
    font-weight: 800;
    padding: 0.15rem 0.4rem;
    border-radius: 4px;
  }

  .show-description {
    font-size: 0.85rem;
    color: var(--muted);
    margin: 0;
    line-height: 1.4;
  }

  .current-show .show-description {
    color: var(--primary-800);
  }

  .no-shows {
    padding: 3rem 1rem;
    text-align: center;
  }

  .no-shows p {
    color: var(--muted);
    font-style: italic;
    margin: 0;
    font-size: 1rem;
  }

  @media (max-width: 767px) {
    .show-item {
      flex-direction: column;
      gap: 0.5rem;
    }

    .show-time {
      min-width: auto;
    }
  }
</style>
