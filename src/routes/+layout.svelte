<script>
  import { page } from '$app/state';
  import favicon from '$lib/assets/favicon.svg';
  import '../app.css';

  import Footer from '$lib/components/Footer.svelte';
  // import AudioPlayer from '$lib/components/AudioPlayer.svelte';

  let { children } = $props();
  // let expanded = $state(page.url.pathname === '/');
  let projectsVisible = $state(false);

  // function handleScroll() {
  //   if (expanded) {
  //     expanded = false;
  //   }
  // }

  function handleClickOutside(event) {
    if (projectsVisible && !event.target.closest('.projects')) {
      projectsVisible = false;
    }
  }
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

<!-- <svelte:window onscroll={handleScroll} onclick={handleClickOutside} /> -->
<svelte:window onclick={handleClickOutside} />

<!-- <section class="header" class:expanded> -->
<section class="header">
  <div class="header-content">
    <!-- <AudioPlayer {expanded}>
      <button class="expand-btn" onclick={() => (expanded = !expanded)}>
        {#if expanded}
          <img src="/icons/caret_up.svg" alt="Up" width="20" height="20" />
        {:else}
          <img src="/icons/caret_down.svg" alt="Down" width="20" height="20" />
        {/if}
      </button>
    </AudioPlayer> -->
    <a
      href="/about"
      class="logo-link"
      aria-current={page.url.pathname === '/about' ? 'page' : undefined}
    >
      <img src="/brand/rr_red_outline_transparent_rounded.svg" alt="Logo" width="50" height="50" />
      <span class="sr-only">Radio Roža</span></a
    >
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
        <li class="projects">
          <a
            href="/projekti"
            class="link"
            aria-current={page.url.pathname === '/projekti' ? 'page' : undefined}>Projekti</a
          >
          <button
            type="button"
            class="submenu-toggle"
            aria-label="Toggle submenu"
            onclick={() => (projectsVisible = !projectsVisible)}
          >
            <span class="sr-only">Pokaži projekte</span>
            <img src="/icons/caret_down.svg" alt="Down" width="20" height="20" />
          </button>
          <ul class="submenu" style:visibility={projectsVisible ? 'visible' : 'hidden'}>
            <li>
              <a href="/projekti/ziroskop" onclick={() => (projectsVisible = false)}>Žiroskop</a>
            </li>
            <li>
              <a href="/projekti/korona-kid" onclick={() => (projectsVisible = false)}>Korona kid</a
              >
            </li>
            <li>
              <a href="/projekti/odasiljac" onclick={() => (projectsVisible = false)}>Odašiljač</a>
            </li>
            <li>
              <a href="/projekti/17-bitnih" onclick={() => (projectsVisible = false)}>17-bitnih</a>
            </li>
          </ul>
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
    box-shadow: 0 4px 32px hsl(4deg 5% 2% / 0.1);
    transition:
      height 0.15s ease-out,
      box-shadow 0.15s ease-out;
    height: var(--header-height, 70px);
    /*overflow: hidden;*/
  }

  /*.header.expanded {
    --header-height: 240px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }*/

  .header-content {
    position: relative;
    display: flex;
    align-items: start;
    background-color: white;
    height: 70px; /* bazna visina */
    padding: 0 1rem;
  }

  .logo-link {
    display: flex;
    align-items: center;
    height: 100%;
  }

  .logo-link img {
    display: block;
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

  /*.expand-btn {
    margin: 0;
    padding: 0;
    background: none;
    border: 0;
    outline: 0;
    width: 20px;
    height: 20px;
    cursor: pointer;
    font-size: 20px;
    line-height: 1;
  }*/

  /*.expand-btn img {
    display: block;
    width: 20px;
    height: 20px;
  }*/

  nav {
    display: flex;
    align-items: center;
    margin-left: auto;
    padding: 1rem 0;
  }

  nav > ul {
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

  .projects {
    position: relative;
    display: flex;
    align-items: center;
  }

  .submenu-toggle {
    outline: none;
    border: 0;
    background-color: transparent;
    padding-top: 0;
    padding-bottom: 0;
    width: 28px;
    height: 100%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  .submenu-toggle:focus-visible {
    outline: 2px solid var(--primary-600);
  }

  .submenu-toggle > * {
    pointer-events: none;
  }

  .submenu {
    position: absolute;
    top: 100%;
    left: 0;
    background-color: var(--white, white);
    border: 1px solid #eee;
    border-radius: 4px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    padding: 0.5rem 0;
    margin: 0;
    list-style: none;
    z-index: 1001;
    min-width: 150px;
  }

  .submenu li {
    margin: 0;
  }

  .submenu a {
    display: block;
    padding: 0.5rem 1rem;
    text-decoration: none;
    color: var(--dark);
    white-space: nowrap;
    transition: background-color 0.15s ease;
  }

  .submenu a:hover {
    background-color: var(--primary-50);
    color: var(--primary-700);
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
