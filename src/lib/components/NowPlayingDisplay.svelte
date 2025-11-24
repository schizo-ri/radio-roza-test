<script>
  import { getBestImageUrl } from '$lib/utils/musicScraper.js';

  // Props from parent component
  let {
    nowPlaying = { artist: '', title: '' },
    musicMetadata = { artist: null, album: null, track: '' }
  } = $props();

  // Reactive values for images
  const artistImage = $derived(() => {
    return musicMetadata.artist ? getBestImageUrl(musicMetadata.artist.images, 'large') : '';
  });

  const albumCover = $derived(() => {
    return musicMetadata.album ? getBestImageUrl(musicMetadata.album.images, 'medium') : '';
  });

  const hasMetadata = $derived(() => {
    return musicMetadata.artist || musicMetadata.album;
  });

  // Fallback placeholder images
  const placeholderArtist = '/placeholder-artist.jpg';
  const placeholderAlbum = '/placeholder-album.jpg';
</script>

<div class="now-playing">
  <div class="now-playing-header">
    <h3>Now Playing</h3>
  </div>

  <div class="current-track">
    <div class="track-info">
      <div class="artist">{nowPlaying.artist || 'Radio Roza'}</div>
      <div class="title">{nowPlaying.title || 'Live Stream'}</div>
    </div>

    {#if hasMetadata}
      <div class="metadata-section">
        <!-- Artist Information -->
        {#if musicMetadata.artist}
          <div class="artist-section">
            <div class="artist-image">
              <img
                src={artistImage || placeholderArtist}
                alt={musicMetadata.artist.name}
                on:error={(e) => { e.target.src = placeholderArtist; }}
              />
            </div>
            <div class="artist-details">
              <h4>{musicMetadata.artist.name}</h4>
              {#if musicMetadata.artist.bio}
                <p class="bio">{musicMetadata.artist.bio.substring(0, 150)}...</p>
              {/if}
              {#if musicMetadata.artist.tags?.length > 0}
                <div class="tags">
                  {#each musicMetadata.artist.tags.slice(0, 3) as tag}
                    <span class="tag">{tag}</span>
                  {/each}
                </div>
              {/if}
            </div>
          </div>
        {/if}

        <!-- Album Information -->
        {#if musicMetadata.album}
          <div class="album-section">
            <div class="album-cover">
              <img
                src={albumCover || placeholderAlbum}
                alt={musicMetadata.album.name}
                on:error={(e) => { e.target.src = placeholderAlbum; }}
              />
            </div>
            <div class="album-details">
              <h5>{musicMetadata.album.name}</h5>
              <p class="album-artist">{musicMetadata.album.artist}</p>
              {#if musicMetadata.album.releaseDate}
                <p class="release-date">
                  Released: {new Date(musicMetadata.album.releaseDate).getFullYear()}
                </p>
              {/if}
            </div>
          </div>
        {/if}

        <!-- Data Source Attribution -->
        <div class="attribution">
          <small>
            Metadata from:
            {musicMetadata.artist?.source || musicMetadata.album?.source || 'Various sources'}
          </small>
        </div>
      </div>
    {:else}
      <!-- Fallback when no metadata is available -->
      <div class="no-metadata">
        <div class="placeholder-image">
          <img src={placeholderArtist} alt="Radio Roza" />
        </div>
        <p class="status">Live radio stream</p>
      </div>
    {/if}
  </div>
</div>

<style>
  .now-playing {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 12px;
    padding: 20px;
    color: white;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  .now-playing-header h3 {
    margin: 0 0 16px 0;
    font-size: 1.2rem;
    font-weight: 600;
    text-align: center;
  }

  .current-track {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .track-info {
    text-align: center;
    padding: 16px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 8px;
  }

  .artist {
    font-size: 1.1rem;
    font-weight: 600;
    margin-bottom: 4px;
  }

  .title {
    font-size: 0.95rem;
    opacity: 0.9;
  }

  .metadata-section {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .artist-section {
    display: flex;
    gap: 12px;
    align-items: center;
    padding: 12px;
    background: rgba(255, 255, 255, 0.08);
    border-radius: 8px;
  }

  .artist-image img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid rgba(255, 255, 255, 0.2);
  }

  .artist-details h4 {
    margin: 0 0 4px 0;
    font-size: 1rem;
    font-weight: 600;
  }

  .bio {
    margin: 4px 0;
    font-size: 0.85rem;
    opacity: 0.8;
    line-height: 1.4;
  }

  .tags {
    display: flex;
    gap: 4px;
    flex-wrap: wrap;
    margin-top: 8px;
  }

  .tag {
    background: rgba(255, 255, 255, 0.2);
    padding: 2px 6px;
    border-radius: 12px;
    font-size: 0.75rem;
    font-weight: 500;
  }

  .album-section {
    display: flex;
    gap: 12px;
    align-items: center;
    padding: 12px;
    background: rgba(255, 255, 255, 0.08);
    border-radius: 8px;
  }

  .album-cover img {
    width: 50px;
    height: 50px;
    border-radius: 4px;
    object-fit: cover;
    border: 1px solid rgba(255, 255, 255, 0.2);
  }

  .album-details h5 {
    margin: 0 0 2px 0;
    font-size: 0.9rem;
    font-weight: 600;
  }

  .album-artist {
    margin: 0 0 2px 0;
    font-size: 0.8rem;
    opacity: 0.8;
  }

  .release-date {
    margin: 0;
    font-size: 0.75rem;
    opacity: 0.7;
  }

  .no-metadata {
    text-align: center;
    padding: 20px;
  }

  .placeholder-image img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    object-fit: cover;
    opacity: 0.7;
    margin-bottom: 12px;
  }

  .status {
    margin: 0;
    font-size: 0.9rem;
    opacity: 0.8;
  }

  .attribution {
    text-align: center;
    margin-top: 12px;
    padding-top: 12px;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
  }

  .attribution small {
    opacity: 0.6;
    font-size: 0.75rem;
  }

  /* Responsive design */
  @media (max-width: 640px) {
    .now-playing {
      padding: 16px;
    }

    .artist-section,
    .album-section {
      flex-direction: column;
      text-align: center;
    }

    .artist-image img,
    .album-cover img {
      margin: 0 auto;
    }
  }

  /* Loading animation for images */
  img {
    transition: opacity 0.3s ease;
  }

  img[src=""] {
    opacity: 0;
  }

  /* Hover effects */
  .artist-section:hover,
  .album-section:hover {
    background: rgba(255, 255, 255, 0.12);
    transition: background 0.3s ease;
  }
</style>
