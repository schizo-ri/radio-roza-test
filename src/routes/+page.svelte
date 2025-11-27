<script>
  import MixcloudLatest from '$lib/components/MixcloudLatest.svelte';

  /** @type {import('./$types').PageData} */
  let { data } = $props();
</script>

<svelte:head>
  <title>Radio Roža</title>
  <meta
    name="description"
    content="Radio Roža je internetski community radio nastao iz želje i potrebe za praćenjem nezavisne kulturne scene i raznih kulturnih aktera u Rijeci, promocijom najrazličitijih (underground) žanrova, te ljubavi prema gramofonskim pločama. U međuvremenu, Radio Roža je prerastao iz radija posvećenog glazbi i kulturi u platformu za participativno novinarstvo, edukaciju te aktivno uključivanje mladih i ranjivih skupina, potičući društvenu uključenost, kritičko mišljenje i medijsku pismenost."
  />
</svelte:head>

<header class="header">
  <div class="header-content">
    <img src="/images/rr_logo.png" alt="Radio Roža Logo" class="logo" />
    <h1 class="title">Radio zajednice</h1>
    <p class="description">Internetski radio | Rijeka</p>
  </div>
</header>

<MixcloudLatest data={data.mixcloudData} />

<footer class="footer">
  <p>
    Built with <a href="https://svelte.dev" target="_blank">Svelte 5</a> • Powered by
    <a href="https://github.com/Dash-Industry-Forum/dash.js" target="_blank">Dash.js</a>
  </p>
</footer>

<style>
  .header {
    --_noise-texture: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 300'><defs><filter id='n' x='0' y='0' width='100%' height='100%' color-interpolation-filters='sRGB'><feTurbulence type='fractalNoise' baseFrequency='0.3' numOctaves='3' stitchTiles='stitch' result='t'/><feColorMatrix type='saturate' values='0' in='t' result='g'/><feComponentTransfer in='g' result='a'><feFuncA type='linear' slope='0.5'/></feComponentTransfer></filter></defs><rect width='100%' height='100%' filter='url(%23n)'/></svg>");

    --_noise-size: 6.5%;
    /*--_gradient: --_noise-size: 6.5%;*/
    --_gradient: linear-gradient(
      45deg,
      var(--primary-400),
      var(--primary-500) 5%,
      var(--primary-600) 40%,
      var(--primary-700) 75%,
      var(--primary-800) 90%,
      var(--primary-900) 100%
    );

    background-image: var(--_noise-texture), var(--_gradient);
    background-size: var(--_noise-size), auto;
    background-position: center, center;
    padding-top: 4rem;
    padding-bottom: 4rem;

    display: flex;
    justify-content: center;
  }

  .header-content {
    display: grid;
    grid-template-columns: 120px minmax(0, 1fr);
    grid-template-rows: repeat(2, 60px);
    grid-template-areas:
      'logo title'
      'logo description';
    grid-gap: 1rem;
    align-content: center;

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
</style>
