<script>
  let { mix, showTags = true, showDuration = true } = $props();

  import { formatDate } from '../utils/dates.js';

  function handleClick() {
    window.open(mix.url, '_blank', 'noopener,noreferrer');
  }
</script>

<div class="mix-card">
  <button class="mix-link" onclick={handleClick} type="button">
    <picture class="mix-cover">
      <source srcset={mix.pictures['320wx320h']} type="image/jpeg" />
      <img src={mix.pictures['320wx320h']} width="260" height="260" alt="{mix.name} cover" />
    </picture>
    <div class="hug">
      <h3 class="mix-name">{mix.name}</h3>
    </div>
  </button>

  {#if showTags && mix.tags && mix.tags.length > 0}
    <div class="mix-tags hug">
      {#each mix.tags as tag (tag.key)}
        <button
          type="button"
          class="mix-tag"
          onclick={(e) => {
            e.stopPropagation();
            window.open(tag.url, '_blank', 'noopener,noreferrer');
          }}>#{tag.name}</button
        >
      {/each}
    </div>
  {/if}

  <div class="mix-extras hug">
    {#if showDuration && mix.audio_length}
      <span class="mix-duration">
        <img src="/icons/duration.svg" alt="Duration" width="12" height="12" />
        {Math.floor(mix.audio_length / 60)}:{String(mix.audio_length % 60).padStart(2, '0')}
      </span>
    {/if}
    <span class="mix-date">
      <img src="/icons/calendar.svg" alt="Published" width="12" height="12" />
      {formatDate(new Date(mix.created_time))}
    </span>
  </div>
</div>

<style>
  .mix-card {
    border: 2px solid transparent;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    width: 260px;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding-bottom: 1rem;
    overflow: hidden;
    transition: border-color 0.2s;
  }

  .mix-card:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
    border-color: var(--primary-500);
  }

  .mix-link {
    width: 100%;
    text-decoration: none;
    color: inherit;
    display: flex;
    flex-direction: column;
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    text-align: left;
  }

  .mix-link:hover {
    color: var(--primary-700);
  }

  .mix-cover {
    width: 100%;
    height: auto;
    object-fit: cover;
  }

  .hug {
    padding-left: 1rem;
    padding-right: 1rem;
  }

  .mix-name {
    padding-top: 0.5rem;
    font-size: 1rem;
  }

  .mix-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .mix-tag {
    text-decoration: none;
    display: inline-block;
    padding: 0.1rem 0.4rem;
    border-radius: 12px;
    border: 1px solid var(--primary-100);
    /*color: var(--primary-700);*/
    font-size: 0.75rem;
    /*font-weight: 500;*/
    background-color: var(--light);
    cursor: pointer;
    font-family: inherit;
    transition: background-color 0.2s ease;
  }

  .mix-tag:hover {
    background-color: var(--primary-100);
  }

  .mix-extras {
    display: flex;
    justify-content: space-between;
    gap: 0.5rem;
    margin-top: auto;
  }

  .mix-date {
    margin: 0;
    margin-top: auto;
    font-size: 0.9rem;
    color: var(--muted);
    display: flex;
    gap: 1ch;
    align-items: center;
  }

  .mix-duration {
    margin: 0;
    font-size: 0.9rem;
    color: var(--text-secondary, #718096);
    display: flex;
    gap: 1ch;
    align-items: center;
  }
</style>
