<script>
  import { page } from '$app/state';
  import Player from '$lib/components/Player.svelte';
  import FullBleed from '$lib/components/FullBleed.svelte';
  import favicon from '$lib/assets/favicon.svg';
  import '../app.css';

  import Footer from '$lib/components/Footer.svelte';
  // import AudioPlayer from '$lib/components/AudioPlayer.svelte';

  let { children } = $props();
  // let expanded = $state(page.url.pathname === '/');
  let projectsVisible = $state(false);
  let mobileMenuOpen = $state(false);

  // Control body scroll when mobile menu is open
  $effect(() => {
    if (typeof document !== 'undefined') {
      if (mobileMenuOpen) {
        document.body.classList.add('mobile-menu-open');
      } else {
        document.body.classList.remove('mobile-menu-open');
      }
    }
  });

  function toggleMobileMenu() {
    mobileMenuOpen = !mobileMenuOpen;
  }

  function handleClickOutside(event) {
    if (projectsVisible && !event.target.closest('.projects')) {
      projectsVisible = false;
    }
    if (
      mobileMenuOpen &&
      !event.target.closest('.mobile-nav') &&
      !event.target.closest('.mobile-nav-trigger')
    ) {
      mobileMenuOpen = false;
    }
  }
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

<svelte:window onclick={handleClickOutside} />

<section class="header">
  <div class="header-content">
    <a
      href="/about"
      class="logo-link"
      aria-current={page.url.pathname === '/about' ? 'page' : undefined}
    >
      <img src="/brand/rr_red_outline_transparent_rounded.svg" alt="Logo" width="44" height="44" />
      <span class="sr-only">Radio Roža</span></a
    >

    <button
      class="mobile-nav-trigger"
      class:open={mobileMenuOpen}
      onclick={toggleMobileMenu}
      aria-label="Toggle navigation menu"
      aria-expanded={mobileMenuOpen}
    >
      Ima još...
    </button>

    <!-- Desktop navigation -->
    <nav class="desktop-nav">
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

    <!-- Mobile navigation -->
    <nav class="mobile-nav" class:open={mobileMenuOpen}>
      <ul>
        <li>
          <a
            href="/"
            class="mobile-link"
            aria-current={page.url.pathname === '/' ? 'page' : undefined}
            onclick={() => (mobileMenuOpen = false)}>Home</a
          >
        </li>
        <li>
          <a
            href="/citaj-radio"
            class="mobile-link"
            aria-current={page.url.pathname === '/citaj-radio' ? 'page' : undefined}
            onclick={() => (mobileMenuOpen = false)}>Čitaj radio</a
          >
        </li>
        <li>
          <a
            href="/program"
            class="mobile-link"
            aria-current={page.url.pathname === '/program' ? 'page' : undefined}
            onclick={() => (mobileMenuOpen = false)}>Program</a
          >
        </li>
        <li>
          <a
            href="/emisije"
            class="mobile-link"
            aria-current={page.url.pathname === '/emisije' ? 'page' : undefined}
            onclick={() => (mobileMenuOpen = false)}>Emisije</a
          >
        </li>
        <li>
          <a
            href="/o-nama"
            class="mobile-link"
            aria-current={page.url.pathname === '/o-nama' ? 'page' : undefined}
            onclick={() => (mobileMenuOpen = false)}>O nama</a
          >
        </li>
        <li class="mobile-projects">
          <a
            href="/projekti"
            class="mobile-link"
            aria-current={page.url.pathname === '/projekti' ? 'page' : undefined}
            onclick={() => (mobileMenuOpen = false)}>Projekti</a
          >
        </li>
        <li class="mobile-social-section">
          <div class="mobile-social-grid">
            <a href="https://facebook.com/radiorozha" class="mobile-social-link">
              <img src="/icons/socials/facebook.svg" width="36" height="36" alt="Facebook" />
              <span class="sr-only">Facebook</span>
            </a>
            <a href="https://www.instagram.com/radio.rozari/" class="mobile-social-link">
              <img src="/icons/socials/instagram.svg" width="36" height="36" alt="Instagram" />
              <span class="sr-only">Instagram</span>
            </a>
            <a href="https://mixcloud.com/RadioRoza" class="mobile-social-link">
              <img src="/icons/socials/mixcloud.svg" width="36" height="36" alt="Mixcloud" />
              <span class="sr-only">Mixcloud</span>
            </a>
            <a href="https://youtube.com/@radioroza9811" class="mobile-social-link">
              <img src="/icons/socials/youtube.svg" width="36" height="36" alt="YouTube" />
              <span class="sr-only">YouTube</span>
            </a>
          </div>
          <a href="https://buymeacoffee.com//RadioRoza" class="mobile-support-link">
            <img src="/icons/socials/bmc-logo.svg" height="24" alt="Buy me a coffee" />
            <span>Support us</span>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</section>

<FullBleed>
  <div class="player-container">
    <Player
      src="https://radio.radio-roza.org/hls/radioroza/live.m3u8"
      fullsize={page.url.pathname === '/'}
    />
  </div>
</FullBleed>

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
    height: var(--header-height, 60px);
    max-width: 100cqw;
  }

  .header-content {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: white;
    height: 60px; /* bazna visina */
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

  main {
    min-height: 100vh;
    transition: padding-top 0.3s ease-out;
  }

  /* Mobile nav trigger styles - Default: mobile */
  .mobile-nav-trigger {
    display: block;
    padding: 0.4rem 1rem;
    background: transparent;
    border: 2px solid var(--primary-900);
    color: var(--primary-900);
    font-weight: 500;
    /*letter-spacing: 0.5px;*/
    text-transform: uppercase;
    cursor: pointer;
    border-radius: 4px;
    transition: all 0.3s ease;
    z-index: 1002;
    flex-shrink: 0;
    position: relative;
    min-width: 100px;
    height: auto;
  }

  .mobile-nav-trigger:hover {
    background: var(--primary-600);
    color: white;
  }

  .mobile-nav-trigger:focus-visible {
    outline: 2px solid var(--primary-400);
    outline-offset: 2px;
  }

  .mobile-nav-trigger.open {
    background: var(--primary-600);
    color: white;
  }

  /* Desktop navigation - Default: hidden on mobile */
  .desktop-nav {
    display: none;
    align-items: center;
    padding: 1rem 0;
  }

  .desktop-nav > ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  /* Mobile navigation - Default: full-width mobile */
  .mobile-nav {
    position: fixed;
    top: 60px;
    right: 0;
    left: 0;
    width: 100vw;
    height: calc(100vh - 60px);
    background: white;
    border-top: 1px solid #eee;
    box-shadow: 0 -4px 32px rgba(0, 0, 0, 0.1);
    transform: translateX(100%);
    opacity: 0;
    visibility: hidden;
    transition: all 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    z-index: 999;
    overflow-y: auto;
  }

  .mobile-nav.open {
    transform: translateX(0);
    opacity: 1;
    visibility: visible;
  }

  .mobile-nav ul {
    list-style: none;
    margin: 0;
    padding: 1rem 0;
  }

  .mobile-nav li {
    margin: 0;
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

  .mobile-link {
    display: block;
    padding: 1rem 1.5rem;
    text-decoration: none;
    color: var(--dark);
    font-weight: 400;
    font-size: 1.1rem;
    letter-spacing: -0.5px;
    text-transform: uppercase;
    text-align: center;
    border-bottom: 1px solid #f5f5f5;
    transition: all 0.3s ease;
  }

  .mobile-link:hover {
    background-color: var(--primary-50);
    color: var(--primary-700);
    padding-left: 2rem;
  }

  .mobile-link[aria-current='page'] {
    color: var(--primary-600);
    background-color: var(--primary-50);
    border-left: 4px solid var(--primary-600);
  }

  .mobile-social-section {
    margin-top: 1rem;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    /*align-items: center;*/
    gap: 1rem;
  }

  .mobile-social-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(36px, 1fr));
    gap: 1rem;
    padding-top: 1rem;
    padding-bottom: 1rem;
  }

  .mobile-social-link {
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    transition: all 0.1s ease;
  }

  .mobile-social-link:hover {
    background-color: var(--primary-50);
    /*border-color: var(--primary-200);*/
    transform: translateY(-2px);
    /*box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);*/
  }

  .mobile-social-link img {
    width: 36px;
    height: 36px;
    display: block;
    pointer-events: none;
  }

  .mobile-social-link span {
    font-size: 0.9rem;
    font-weight: 500;
  }

  .mobile-support-link {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    padding: 0.75rem 1rem;
    text-decoration: none;
    color: var(--dark);
    background: white;
    border-radius: 8px;
    border: 1px solid #eee;
    transition: all 0.1s ease;
  }

  /* Mobile-first responsive breakpoints */

  /* Small phones */
  @media (min-width: 421px) {
    .mobile-nav {
      width: 300px;
      max-width: 85vw;
      left: auto;
      border-top: none;
      border-left: 1px solid #eee;
      box-shadow: -4px 0 32px rgba(0, 0, 0, 0.1);
    }

    .mobile-link {
      text-align: left;
    }
  }

  /* Tablets and up */
  @media (min-width: 481px) {
    .header-content {
      padding: 0 1rem;
    }
  }

  /* Desktop and up */
  @media (min-width: 1025px) {
    .desktop-nav {
      display: flex;
    }

    .mobile-nav-trigger {
      display: none;
    }
  }

  /* Prevent body scroll when mobile menu is open - mobile only */
  :global(body.mobile-menu-open) {
    overflow: hidden;
  }

  .player-container {
    padding-top: calc(var(--header-height, 60px) + 2rem);
    padding-bottom: 2rem;
  }
</style>
