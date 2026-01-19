<script>
  import MixCard from '$lib/components/MixCard.svelte';
  import MixCardOverlay from '$lib/components/MixCardOverlay.svelte';
  import MixCardRow from '$lib/components/MixCardRow.svelte';
  import HorizontalScroller from '$lib/components/HorizontalScroller.svelte';
  import Wrapper from '$lib/components/Wrapper.svelte';
  import SectionHeader from '$lib/components/SectionHeader.svelte';

  // Mock data matching Mixcloud structure
  const mockMixes = [
    {
      url: 'https://mixcloud.com/RadioRoza/berlin-techno-special',
      name: 'Berlin Techno Special - Klaus Mueller Guest Mix',
      pictures: {
        '320wx320h': 'https://picsum.photos/seed/mix1/320/320',
        large: 'https://picsum.photos/seed/mix1/640/640'
      },
      audio_length: 7200,
      created_time: '2024-01-06T22:00:00Z',
      tags: [
        { name: 'techno', url: 'https://mixcloud.com/discover/techno/' },
        { name: 'berlin', url: 'https://mixcloud.com/discover/berlin/' },
        { name: 'electronic', url: 'https://mixcloud.com/discover/electronic/' }
      ]
    },
    {
      url: 'https://mixcloud.com/RadioRoza/jazz-corner-miles-davis',
      name: 'Miles Davis Retrospektiva',
      pictures: {
        '320wx320h': 'https://picsum.photos/seed/mix2/320/320',
        large: 'https://picsum.photos/seed/mix2/640/640'
      },
      audio_length: 5400,
      created_time: '2024-01-04T20:00:00Z',
      tags: [
        { name: 'jazz', url: 'https://mixcloud.com/discover/jazz/' },
        { name: 'miles davis', url: 'https://mixcloud.com/discover/miles-davis/' },
        { name: 'bebop', url: 'https://mixcloud.com/discover/bebop/' }
      ]
    },
    {
      url: 'https://mixcloud.com/RadioRoza/indie-vibes-hrvatska',
      name: 'Novo iz Hrvatske indie scene',
      pictures: {
        '320wx320h': 'https://picsum.photos/seed/mix3/320/320',
        large: 'https://picsum.photos/seed/mix3/640/640'
      },
      audio_length: 7200,
      created_time: '2024-01-08T19:00:00Z',
      tags: [
        { name: 'indie', url: 'https://mixcloud.com/discover/indie/' },
        { name: 'croatian', url: 'https://mixcloud.com/discover/croatian/' },
        { name: 'alternative', url: 'https://mixcloud.com/discover/alternative/' }
      ]
    },
    {
      url: 'https://mixcloud.com/RadioRoza/elektronski-puls-croatian',
      name: 'Croatian Electronic Showcase',
      pictures: {
        '320wx320h': 'https://picsum.photos/seed/mix4/320/320',
        large: 'https://picsum.photos/seed/mix4/640/640'
      },
      audio_length: 7200,
      created_time: '2023-12-30T22:00:00Z',
      tags: [
        { name: 'electronic', url: 'https://mixcloud.com/discover/electronic/' },
        { name: 'house', url: 'https://mixcloud.com/discover/house/' },
        { name: 'techno', url: 'https://mixcloud.com/discover/techno/' }
      ]
    },
    {
      url: 'https://mixcloud.com/RadioRoza/jutarnji-program-jan10',
      name: 'Novo jutro, novi početak',
      pictures: {
        '320wx320h': 'https://picsum.photos/seed/mix5/320/320',
        large: 'https://picsum.photos/seed/mix5/640/640'
      },
      audio_length: 10800,
      created_time: '2024-01-10T07:00:00Z',
      tags: [
        { name: 'talk', url: 'https://mixcloud.com/discover/talk/' },
        { name: 'morning', url: 'https://mixcloud.com/discover/morning/' },
        { name: 'lifestyle', url: 'https://mixcloud.com/discover/lifestyle/' }
      ]
    },
    {
      url: 'https://mixcloud.com/RadioRoza/funk-soul-friday',
      name: 'Funk & Soul Friday Night Grooves',
      pictures: {
        '320wx320h': 'https://picsum.photos/seed/mix6/320/320',
        large: 'https://picsum.photos/seed/mix6/640/640'
      },
      audio_length: 5700,
      created_time: '2024-01-05T21:00:00Z',
      tags: [
        { name: 'funk', url: 'https://mixcloud.com/discover/funk/' },
        { name: 'soul', url: 'https://mixcloud.com/discover/soul/' },
        { name: 'disco', url: 'https://mixcloud.com/discover/disco/' }
      ]
    }
  ];
</script>

<svelte:head>
  <title>MixCard Design Demo | Radio Roža</title>
</svelte:head>

<div class="demo-page">
  <Wrapper>
    <header class="demo-header">
      <h1>MixCard Design Demo</h1>
      <p>Comparing different card designs for Mixcloud episodes</p>
    </header>
  </Wrapper>

  <!-- Design 1: Current -->
  <section class="demo-section">
    <Wrapper>
      <SectionHeader title="Current Design" />
      <p class="section-desc">The existing MixCard component</p>
    </Wrapper>
    <HorizontalScroller>
      {#each mockMixes as mix, index (`current-${mix.url}-${index}`)}
        <MixCard {mix} showTags={true} />
      {/each}
    </HorizontalScroller>
  </section>

  <!-- Design 2: Overlay Stack -->
  <section class="demo-section">
    <Wrapper>
      <SectionHeader title="Design 2: Overlay Stack" />
      <p class="section-desc">Modern overlay with duration/play on image, cleaner info below</p>
    </Wrapper>
    <HorizontalScroller>
      {#each mockMixes as mix, index (`overlay-${mix.url}-${index}`)}
        <MixCardOverlay {mix} showTags={true} />
      {/each}
    </HorizontalScroller>
  </section>

  <!-- Design 3: List Row -->
  <section class="demo-section">
    <Wrapper>
      <SectionHeader title="Design 3: List Row" />
      <p class="section-desc">Horizontal layout, ideal for episode listings on show pages</p>
    </Wrapper>
    <Wrapper>
      <div class="row-list">
        {#each mockMixes as mix, index (`row-${mix.url}-${index}`)}
          <MixCardRow {mix} showTags={true} />
        {/each}
      </div>
    </Wrapper>
  </section>

  <!-- Design 3: Compact variant -->
  <section class="demo-section">
    <Wrapper>
      <SectionHeader title="Design 3: List Row (Compact)" />
      <p class="section-desc">Compact variant for sidebar or mobile</p>
    </Wrapper>
    <Wrapper>
      <div class="row-list compact-list">
        {#each mockMixes.slice(0, 4) as mix, index (`compact-${mix.url}-${index}`)}
          <MixCardRow {mix} showTags={false} compact={true} />
        {/each}
      </div>
    </Wrapper>
  </section>

  <!-- Side by side comparison -->
  <section class="demo-section">
    <Wrapper>
      <SectionHeader title="Side by Side Comparison" />
      <p class="section-desc">Current vs Overlay Stack</p>
      <div class="comparison">
        <div class="comparison-item">
          <h4>Current</h4>
          <MixCard mix={mockMixes[0]} showTags={true} />
        </div>
        <div class="comparison-item">
          <h4>Overlay Stack</h4>
          <MixCardOverlay mix={mockMixes[0]} showTags={true} />
        </div>
      </div>
    </Wrapper>
  </section>
</div>

<style>
  .demo-page {
    padding-bottom: 4rem;
  }

  .demo-header {
    padding: 3rem 0 2rem;
    text-align: center;
  }

  .demo-header h1 {
    font-family: var(--display-font);
    font-size: 2.5rem;
    color: var(--primary-700);
    margin-bottom: 0.5rem;
  }

  .demo-header p {
    color: var(--muted);
    font-size: 1.1rem;
  }

  .demo-section {
    padding: 2rem 0;
    border-bottom: 1px solid var(--light);
  }

  .section-desc {
    color: var(--muted);
    font-size: 0.9rem;
    margin-bottom: 1.5rem;
  }

  .row-list {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    max-width: 700px;
  }

  .compact-list {
    max-width: 400px;
  }

  .comparison {
    display: flex;
    gap: 3rem;
    flex-wrap: wrap;
    justify-content: center;
    padding: 2rem 0;
  }

  .comparison-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }

  .comparison-item h4 {
    font-size: 0.9rem;
    color: var(--muted);
    font-weight: 500;
  }
</style>
