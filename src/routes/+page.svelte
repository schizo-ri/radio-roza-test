<script>
  import MixcloudLatest from '$lib/components/MixcloudLatest.svelte';
  import ArticlesLatest from '$lib/components/ArticlesLatest.svelte';
  import FullBleed from '$lib/components/FullBleed.svelte';
  import Wrapper from '$lib/components/Wrapper.svelte';
  import SectionHeader from '$lib/components/SectionHeader.svelte';
  import Player from '$lib/components/Player.svelte';

  let { data } = $props();
</script>

<svelte:head>
  <title>Radio Roža</title>
  <meta
    name="description"
    content="Radio Roža je internetski community radio nastao iz želje i potrebe za praćenjem nezavisne kulturne scene i raznih kulturnih aktera u Rijeci, promocijom najrazličitijih (underground) žanrova, te ljubavi prema gramofonskim pločama. U međuvremenu, Radio Roža je prerastao iz radija posvećenog glazbi i kulturi u platformu za participativno novinarstvo, edukaciju te aktivno uključivanje mladih i ranjivih skupina, potičući društvenu uključenost, kritičko mišljenje i medijsku pismenost."
  />
</svelte:head>

<FullBleed>
  <div class="player-container">
    <Player src="https://radio.radio-roza.org/hls/radioroza/live.m3u8" />
  </div>
  <!-- <header class="header">
    <img src="/images/rr_logo.png" alt="Radio Roža Logo" class="logo" />
    <h1 class="title">Radio zajednice</h1>
    <p class="description">Internetski radio | Rijeka</p>
  </header> -->
</FullBleed>

<div class="spacer">
  <Wrapper>
    <SectionHeader title="Novo na Radio Roži" link="Pogledaj sve" href="/emisije" />
  </Wrapper>
  <MixcloudLatest data={data.mixcloudData} />
</div>

<div class="spacer">
  <Wrapper>
    <SectionHeader title="Čitaj radio" link="Pogledaj sve" href="/citaj-radio" />
  </Wrapper>
  <ArticlesLatest />
</div>

<Wrapper>
  <section class="join">
    <h3>Želiš nam se pridružiti?</h3>
    <p>
      Imaš ideju za emisiju ili želiš biti dio emisije? Lorem ipsum dolor sit amet, consectetur
      adipiscing elit. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
      doloremque laudantium.
    </p>
    <a class="join-donate-link join-link" href="/o-nama/kontakt">
      <img src="/icons/lightbulb.png" alt="Idea" width="32" height="32" />
      <span>Pošalji nam svoju ideju</span>
    </a>
  </section>
</Wrapper>

<FullBleed variant="secondary">
  <section class="donate">
    <h3>Sviđa ti se što radimo?</h3>
    <a href="/donate" class="join-donate-link donate-link">
      <img src="/icons/socials/bmc-full-logo.svg" alt="Donate" width="146" height="32" />
      <span class="sr-only">Podrži nas</span>
    </a>
  </section>
</FullBleed>

<style>
  .header {
    display: grid;
    grid-template-columns: 120px minmax(0, 1fr);
    grid-template-rows: repeat(2, 60px);
    grid-template-areas:
      'logo title'
      'logo description';
    grid-gap: 1rem;
    align-content: center;
    padding-top: 4rem;
    padding-bottom: 4rem;

    max-width: var(--max-content-width);
    flex-grow: 1;
  }

  .logo {
    grid-area: logo;
    width: 100%;
    height: auto;
    display: block;
  }

  .title {
    grid-area: title;
    /*font-family: var(--display-font);*/
    font-size: 3.2rem;
    font-weight: 500;
    /*letter-spacing: -2px;*/
    /*text-transform: uppercase;*/
    color: white;
  }

  .description {
    grid-area: description;
    /*font-family: var(--display-font);*/
    font-size: 1.6rem;
    font-weight: 400;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: white;
  }

  .spacer {
    padding-top: 2rem;
    padding-bottom: 2rem;
  }

  .join {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 4rem;
  }

  .join h3 {
    color: var(--primary-700);
    font-family: var(--display-font);
    font-size: 2.4rem;
    font-weight: 800;
    margin-bottom: 1rem;
    text-align: center;
  }

  .join p {
    font-size: 1.2rem;
    color: var(--dark);
    margin-bottom: 1rem;
    max-width: 640px;
    text-align: center;
  }

  .donate {
    padding-top: 4rem;
    padding-bottom: 4rem;
    text-align: center;
  }

  .donate h3 {
    color: white;
    font-family: var(--display-font);
    font-size: 2rem;
    font-weight: 400;
    opacity: 0.9;
    margin-bottom: 1rem;
  }

  .join-donate-link {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    padding: 1rem;
    background-color: white;
    border: 2px solid var(--yellow);
    border-radius: 32px;
    color: var(--dark);
    text-decoration: none;
    font-weight: 800;
    width: 380px;
    transition: transform 0.1s ease-in-out;
  }

  .join-donate-link:hover {
    transform: scale(1.05);
  }

  .player-container {
    /*display: flex;*/
    /*justify-content: center;*/
    /*align-items: center;*/
    padding: 2rem;
  }
</style>
