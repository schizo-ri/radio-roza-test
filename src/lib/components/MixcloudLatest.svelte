<!-- Display latest mixes from Mixcloud for user RadioRoza -->
<script>
  let { data } = $props();

  import HorizontalScroller from './HorizontalScroller.svelte';
  import Wrapper from './Wrapper.svelte';

  import { formatDate } from '../utils/dates.js';
</script>

{#if data}
  <section class="mixcloud-latest">
    <Wrapper>
      <header class="header">
        <h2>Najnovije epizode</h2>
        <a href="/emisije" class="link">Pogledaj sve</a>
      </header>
    </Wrapper>
    {#if data.data && data.data.length > 0}
      <HorizontalScroller>
        {#each data.data as mix (mix.key)}
          <div class="mix-card">
            <button
              class="mix-link"
              onclick={() => window.open(mix.url, '_blank', 'noopener,noreferrer')}
              type="button"
            >
              <picture>
                <source srcset={mix.pictures['320wx320h']} type="image/jpeg" />
                <img
                  src={mix.pictures['320wx320h']}
                  width="260"
                  height="260"
                  alt="{mix.name} cover"
                />
              </picture>
              <div class="mix-info">
                <h3>{mix.name}</h3>
                <!-- tags -->
                <div class="mix-tags">
                  {#each mix.tags as tag (tag.key)}
                    <a href={tag.url} class="mix-tag">{tag.name}</a>
                  {/each}
                </div>
                <!-- published date -->
                <p class="mix-date">{formatDate(new Date(mix.created_time))}</p>
              </div>
            </button>
          </div>
        {/each}
      </HorizontalScroller>
    {:else}
      <p>No mixes found.</p>
    {/if}
  </section>
{:else}
  <section class="mixcloud-latest">
    <h2>Latest Mixes</h2>
    <p>Loading mixes...</p>
  </section>
{/if}

<style>
  .mixcloud-latest {
    padding-top: 4rem;
    padding-bottom: 4rem;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: 1.5rem;
  }

  .mixcloud-latest h2 {
    font-size: 2rem;
  }

  .mix-card {
    border: 1px solid var(--light);
    /*box-shadow: 5px 5px 12px -4px rgba(0, 0, 0, 0.2);*/
    width: 260px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    transition: border-color 0.2s;
  }

  .mix-card:hover {
    border-color: var(--primary-500);
  }

  .mix-link {
    width: 100%;
    text-decoration: none;
    color: inherit;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    text-align: left;
  }

  .mix-card img {
    width: 100%;
    height: auto;
    object-fit: cover;
  }

  .mix-info {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  }

  .mix-info h3 {
    margin: 0 0 0.5rem 0;
    font-size: 1.1rem;
    line-height: 1.3;
  }

  .mix-tags {
    margin: 0 0 0.5rem 0;
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .mix-tag {
    text-decoration: none;
    display: inline-block;
    padding: 0.1rem 0.4rem;
    border-radius: 12px;
    /*background-color: var(--primary-100);*/
    border: 1px solid var(--primary-100);
    color: var(--primary-700);
    font-size: 0.75rem;
    font-weight: 500;
  }

  .mix-date {
    margin: 0;
    margin-top: auto;
    font-size: 0.9rem;
    color: var(--muted);
  }
</style>
