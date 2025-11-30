<script>
  import MixcloudLatest from '$lib/components/MixcloudLatest.svelte';
  import ArticlesLatest from '$lib/components/ArticlesLatest.svelte';
  import FullBleed from '$lib/components/FullBleed.svelte';
  import Wrapper from '$lib/components/Wrapper.svelte';

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
  <header class="header">
    <img src="/images/rr_logo.png" alt="Radio Roža Logo" class="logo" />
    <h1 class="title">Radio zajednice</h1>
    <p class="description">Internetski radio | Rijeka</p>
  </header>
</FullBleed>

<MixcloudLatest data={data.mixcloudData} />

<div class="spacer">
  <ArticlesLatest />
</div>

<FullBleed variant="split">
  <div class="join-donate">
    <section class="join">
      <h3>Želiš li nam se pridružiti?</h3>
      <a class="join-donate-link" href="/o-nama/kontakt">
        <img src="/icons/lightbulb.png" alt="Idea" width="32" height="32" />
        <span>Pošalji nam svoju ideju</span>
      </a>
    </section>
    <section class="donate">
      <h3>Sviđa ti se što radimo?</h3>
      <a href="/donate" class="join-donate-link donate-link">
        <img src="/icons/socials/bmc-full-logo.svg" alt="Donate" width="146" height="32" />
        <span class="sr-only">Podrži nas</span>
      </a>
    </section>
  </div>
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
    font-family: var(--display-font);
    font-size: 3.2rem;
    font-weight: 500;
    /*letter-spacing: -2px;*/
    /*text-transform: uppercase;*/
    color: white;
  }

  .description {
    grid-area: description;
    font-family: var(--display-font);
    font-size: 1.6rem;
    font-weight: 400;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: white;
  }

  .spacer {
    padding-bottom: 4rem;
  }

  .join-donate {
    padding: 6rem 0;
    display: grid;
    grid-template-columns: repeat(2, 50%);
  }

  .join {
    text-align: right;
    padding-right: 2rem;
    /*border-right: 1px solid white;*/
  }

  .donate {
    padding-left: 2rem;
  }
  /*
  .join,
  .donate {
    text-align: center;
  }*/

  .join h3,
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

  .donate-link {
    /*border: 2px solid var(--primary);*/
  }
</style>
