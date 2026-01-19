<script>
  let { mix, showTags = true } = $props();

  import { formatDate } from '../utils/dates.js';
  import { currentMixcloudMix } from '$lib/stores/playerState.js';

  function formatDuration(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
      return `${hours}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }
    return `${minutes}:${String(secs).padStart(2, '0')}`;
  }

  function handleClick() {
    // Open embedded Mixcloud player instead of external link
    currentMixcloudMix.set(mix);
  }

  function handleTagClick(e, tag) {
    e.stopPropagation();
    window.open(tag.url, '_blank', 'noopener,noreferrer');
  }
</script>

<article class="card">
  <button class="card-link" onclick={handleClick} type="button">
    <div class="image-container">
      <picture class="cover">
        <source srcset={mix.pictures?.['320wx320h'] || mix.pictures?.large} type="image/jpeg" />
        <img
          src={mix.pictures?.['320wx320h'] || mix.pictures?.large || '/images/placeholder-mix.jpg'}
          width="280"
          height="280"
          alt="{mix.name} cover"
          loading="lazy"
        />
      </picture>

      <div class="overlay-bar">
        <span class="duration">
          {formatDuration(mix.audio_length)}
        </span>
        <span class="play-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z"/>
          </svg>
        </span>
      </div>
    </div>

    <div class="content">
      <h3 class="title">{mix.name}</h3>
      <time class="date" datetime={mix.created_time}>
        {formatDate(new Date(mix.created_time))}
      </time>
    </div>
  </button>

  {#if showTags && mix.tags && mix.tags.length > 0}
    <div class="tags">
      {#each mix.tags.slice(0, 3) as tag, index (`${tag.url}-${index}`)}
        <button
          type="button"
          class="tag"
          onclick={(e) => handleTagClick(e, tag)}
        >#{tag.name}</button>
      {/each}
    </div>
  {/if}
</article>

<style>
  .card {
    width: 280px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    transition: transform 0.2s ease;
  }

  .card:hover {
    transform: translateY(-4px);
  }

  .card-link {
    all: unset;
    cursor: pointer;
    display: flex;
    flex-direction: column;
  }

  .image-container {
    position: relative;
    width: 100%;
    aspect-ratio: 1;
    overflow: hidden;
    border-radius: 8px;
  }

  .cover {
    display: block;
    width: 100%;
    height: 100%;
  }

  .cover img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  .card:hover .cover img {
    transform: scale(1.05);
  }

  .overlay-bar {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.75rem 1rem;
    background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
    color: white;
  }

  .duration {
    font-size: 0.875rem;
    font-weight: 500;
    font-variant-numeric: tabular-nums;
  }

  .play-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    background: var(--primary-600);
    border-radius: 50%;
    transition: transform 0.2s ease, background-color 0.2s ease;
  }

  .card:hover .play-icon {
    transform: scale(1.1);
    background: var(--primary-700);
  }

  .content {
    padding: 1rem 0.25rem;
  }

  .title {
    font-size: 1rem;
    font-weight: 600;
    line-height: 1.4;
    margin: 0 0 0.25rem 0;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    color: var(--dark);
    transition: color 0.2s ease;
  }

  .card:hover .title {
    color: var(--primary-700);
  }

  .date {
    font-size: 0.8rem;
    color: var(--muted);
  }

  .tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    padding: 0 0.25rem;
  }

  .tag {
    all: unset;
    cursor: pointer;
    font-size: 0.75rem;
    color: var(--muted);
    transition: color 0.2s ease;
  }

  .tag:hover {
    color: var(--primary-600);
  }
</style>
