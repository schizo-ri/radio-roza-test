<script>
  let { mix, showTags = true, compact = false } = $props();

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
</script>

<article class="card" class:compact>
  <button class="card-link" onclick={handleClick} type="button">
    <div class="thumbnail">
      <picture>
        <source srcset={mix.pictures?.['320wx320h'] || mix.pictures?.large} type="image/jpeg" />
        <img
          src={mix.pictures?.['320wx320h'] || mix.pictures?.large || '/images/placeholder-mix.jpg'}
          width={compact ? 64 : 80}
          height={compact ? 64 : 80}
          alt="{mix.name} cover"
          loading="lazy"
        />
      </picture>
      <div class="play-overlay">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M8 5v14l11-7z" />
        </svg>
      </div>
    </div>

    <div class="content">
      <h3 class="title">{mix.name}</h3>
      <div class="meta">
        <time datetime={mix.created_time}>
          {formatDate(new Date(mix.created_time))}
        </time>
        <span class="separator">·</span>
        <span class="duration">{formatDuration(mix.audio_length)}</span>
      </div>

      {#if showTags && mix.tags && mix.tags.length > 0 && !compact}
        <div class="tags">
          {#each mix.tags.slice(0, 3) as tag, index (`${tag.url}-${index}`)}
            <a class="tag" href={tag.url} target="_blank" rel="noopener noreferrer">#{tag.name}</a>
          {/each}
        </div>
      {/if}
    </div>

    <div class="action">
      <svg
        class="arrow"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
      >
        <path d="M9 18l6-6-6-6" />
      </svg>
    </div>
  </button>
</article>

<style>
  .card {
    width: 100%;
    background: white;
    border: 1px solid var(--light);
    border-radius: 8px;
    transition: border-color 0.2s ease;
  }

  .card:hover {
    border-color: var(--primary-300);
  }

  .card-link {
    all: unset;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0.75rem;
    width: 100%;
    box-sizing: border-box;
  }

  .thumbnail {
    position: relative;
    flex-shrink: 0;
    width: 80px;
    height: 80px;
    border-radius: 6px;
    overflow: hidden;
  }

  .compact .thumbnail {
    width: 64px;
    height: 64px;
  }

  .thumbnail img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .play-overlay {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.4);
    color: white;
    opacity: 0;
    transition: opacity 0.2s ease;
  }

  .card:hover .play-overlay {
    opacity: 1;
  }

  .content {
    flex: 1;
    min-width: 0;
  }

  .title {
    font-size: 1rem;
    font-weight: 600;
    line-height: 1.4;
    margin: 0 0 0.25rem 0;
    color: var(--dark);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    transition: color 0.2s ease;
    text-align: left;
  }

  .compact .title {
    font-size: 0.9rem;
  }

  .card:hover .title {
    color: var(--primary-700);
  }

  .meta {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.8rem;
    color: var(--muted);
  }

  .separator {
    opacity: 0.5;
  }

  .duration {
    font-variant-numeric: tabular-nums;
  }

  .tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-top: 0.5rem;
  }

  .tag {
    all: unset;
    cursor: pointer;
    font-size: 0.7rem;
    color: var(--muted);
    padding: 0.15rem 0.4rem;
    background: var(--light);
    border-radius: 4px;
    transition:
      background-color 0.2s ease,
      color 0.2s ease;
  }

  .tag:hover {
    background: var(--primary-100);
    color: var(--primary-700);
  }

  .action {
    flex-shrink: 0;
    padding-right: 0.5rem;
  }

  .arrow {
    color: var(--muted);
    opacity: 0;
    transform: translateX(-4px);
    transition:
      opacity 0.2s ease,
      transform 0.2s ease;
  }

  .card:hover .arrow {
    opacity: 1;
    transform: translateX(0);
  }

  /* Mobile adjustments */
  @media (max-width: 480px) {
    .thumbnail {
      width: 64px;
      height: 64px;
    }

    .title {
      font-size: 0.9rem;
    }

    .tags {
      display: none;
    }
  }
</style>
