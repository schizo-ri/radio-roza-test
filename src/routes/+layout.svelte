<script>
  import { page } from '$app/state';
  import favicon from '$lib/assets/favicon.svg';
  import '../app.css';

  import Footer from '$lib/components/Footer.svelte';
  import AudioPlayer from '$lib/components/AudioPlayer.svelte';

  let { children } = $props();
  let expanded = $state(page.url.pathname === '/');

  function handleScroll() {
    if (expanded) {
      expanded = false;
    }
  }
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

<svelte:window onscroll={handleScroll} />

<section class="header" class:expanded>
  <div class="header-content">
    <AudioPlayer>
      <button class="expand-btn" onclick={() => (expanded = !expanded)}>
        {#if expanded}
          <img src="/icons/caret_up.svg" alt="Up" width="20" height="20" />
        {:else}
          <img src="/icons/caret_down.svg" alt="Down" width="20" height="20" />
        {/if}
      </button>
    </AudioPlayer>
    <nav>
      <ul>
        <li>
          <a href="/" class="link" aria-current={page.url.pathname === '/' ? 'page' : undefined}
            >Home</a
          >
        </li>
        <li>
          <a
            href="/citaj-radio"
            class="link"
            aria-current={page.url.pathname === '/citaj-radio' ? 'page' : undefined}>Čitaj radio</a
          >
        </li>
        <li>
          <a
            href="/program"
            class="link"
            aria-current={page.url.pathname === '/program' ? 'page' : undefined}>Program</a
          >
        </li>
        <li>
          <a
            href="/emisije"
            class="link"
            aria-current={page.url.pathname === '/emisije' ? 'page' : undefined}>Emisije</a
          >
        </li>
        <li>
          <a
            href="/o-nama"
            class="link"
            aria-current={page.url.pathname === '/o-nama' ? 'page' : undefined}>O nama</a
          >
        </li>
        <li>
          <a
            href="/projekti"
            class="link"
            aria-current={page.url.pathname === '/projekti' ? 'page' : undefined}>Projekti</a
          >
        </li>
        <li>
          <a href="https://facebook.com/radiorozha" class="social-icons">
            <span class="sr-only">Facebook</span>
            <img src="/icons/socials/facebook.svg" alt="Facebook" />
          </a>
        </li>
        <li>
          <a href="https://www.instagram.com/radio.rozari/" class="social-icons">
            <span class="sr-only">Instagram</span>
            <img src="/icons/socials/instagram.svg" alt="Instagram" />
          </a>
        </li>
        <li>
          <a href="https://mixcloud.com/RadioRoza" class="social-icons">
            <span class="sr-only">Mixcloud</span>
            <img src="/icons/socials/mixcloud.svg" alt="Mixcloud" />
          </a>
        </li>
        <li>
          <a href="https://youtube.com/@radioroza9811" class="social-icons">
            <span class="sr-only">YouTube</span>
            <img src="/icons/socials/youtube.svg" alt="YouTube" />
          </a>
        </li>
        <li>
          <a href="https://buymeacoffee.com//RadioRoza" class="social-icons">
            <span class="sr-only">Buy me a coffee</span>
            <img src="/icons/socials/bmc-logo.svg" alt="Buy me a coffee" height="24" />
          </a>
        </li>
      </ul>
    </nav>
  </div>
</section>

<main>
  {@render children()}
</main>

<Footer />

<style>
  .header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    border-bottom: 1px solid #eee;
    background-color: white;
    box-shadow: 0 8px 48px hsl(4deg 5% 2% / 0.2);
    transition:
      height 0.15s ease-out,
      box-shadow 0.15s ease-out;
    height: var(--header-height, 70px);
    overflow: hidden;
  }

  .header.expanded {
    --header-height: 240px; /* ili koliko treba */
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }

  .header-content {
    position: relative;
    display: flex;
    align-items: start;
    background-color: white;
    height: 70px; /* bazna visina */
    padding: 0 1rem;
  }

  /*.expanded-content {
    padding: 0 1rem;
    transform: translateY(-20px);
    opacity: 0;
    transition:
      transform 0.3s ease-out,
      opacity 0.3s ease-out;
  }*/

  /*.header.expanded .expanded-content {
    transform: translateY(0);
    opacity: 1;
  }*/

  main {
    padding-top: var(--header-height, 70px);
    min-height: 100vh;
    transition: padding-top 0.3s ease-out;
  }

  .expand-btn {
    margin: 0;
    padding: 0;
    background: none;
    border: 0;
    outline: 0;
    width: 20px;
    height: 20px;
    cursor: pointer;
    font-size: 20px;
    /*font-weight: 800;*/
    line-height: 1;
    /*color: var(--muted);*/
  }

  .expand-btn img {
    display: block;
    width: 20px;
    height: 20px;
  }

  nav {
    display: flex;
    align-items: center;
    margin-left: auto;
    padding: 1rem 0;
  }

  nav ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .link {
    position: relative;
    padding: 0.5rem;
    text-decoration: none;
    /*font-family: var(--display-font);*/
    color: var(--dark);
    font-weight: 400;
    font-size: 1.1rem;
    letter-spacing: -0.5px;
    text-transform: uppercase;
    white-space: nowrap;
  }

  .link::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: var(--primary-600);
    transform: scaleX(0);
    transition: transform 0.15s ease-out;
  }

  .link:hover {
    color: var(--primary-700);
  }

  .link:hover::after {
    transform: scaleX(1);
  }

  .link:focus::after {
    transform: scaleX(1);
  }

  .link[aria-current='page'] {
    color: var(--primary-600);
  }

  .social-icons {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    margin-left: 0.5rem;
  }

  .social-icons img {
    width: auto;
    height: 100%;
  }

  nav ul li:last-child > .social-icons > img {
    height: 24px;
  }
</style>
