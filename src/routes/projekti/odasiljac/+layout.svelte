<script>
  import { page } from '$app/state';

  let { children } = $props();

  const tabs = [
    { href: '/projekti/odasiljac', label: 'O projektu' },
    { href: '/projekti/odasiljac/nevidljive', label: 'Nevidljive' },
    { href: '/projekti/odasiljac/sos', label: 'S.O.S.' },
    { href: '/projekti/odasiljac/skolica', label: 'Školica' },
  ];

  function isActive(href) {
    return page.url.pathname === href;
  }
</script>

<div class="odasiljac-layout">
  <nav class="tabs" aria-label="Odasiljač navigacija">
    <ul>
      {#each tabs as tab (tab.href)}
        <li>
          <a
            href={tab.href}
            class="tab"
            class:active={isActive(tab.href)}
            aria-current={isActive(tab.href) ? 'page' : undefined}
          >
            {tab.label}
          </a>
        </li>
      {/each}
    </ul>
  </nav>

  <div class="content">
    {@render children()}
  </div>
</div>

<style>
  .odasiljac-layout {
    width: 100%;
  }

  .tabs {
    position: sticky;
    top: var(--header-height, 60px);
    z-index: 100;
    background: var(--tertiary-400);
    /*border-bottom: 1px solid var(--primary-300);*/
    margin-bottom: 2rem;
  }

  .tabs ul {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
    list-style: none;
    margin: 0;
    padding: 0.75rem 1rem;
    max-width: 800px;
    margin: 0 auto;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }

  .tab {
    display: block;
    padding: 0.6rem 1.25rem;
    text-decoration: none;
    color: var(--primary-800);
    font-weight: 500;
    border-radius: 6px;
    white-space: nowrap;
    transition:
      background-color 0.15s ease,
      color 0.15s ease;
  }

  .tab:hover {
    background: var(--tertiary-200);
    color: var(--primary-900);
  }

  .tab.active {
    background: var(--tertiary-100);
    color: var(--primary-900);
  }

  .content {
    padding-bottom: 3rem;
  }

  @media (max-width: 600px) {
    .tabs ul {
      justify-content: flex-start;
      padding: 0.5rem;
      gap: 0.25rem;
    }

    .tab {
      padding: 0.5rem 1rem;
      font-size: 0.875rem;
    }
  }
</style>
