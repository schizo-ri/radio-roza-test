<script>
  import favicon from '$lib/assets/favicon.svg';
  import '../app.css';

  import AudioPlayer from '$lib/components/AudioPlayer.svelte';

  let { children } = $props();
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

<nav>
  <AudioPlayer />
  <ul>
    <li><a href="/">Home</a></li>
    <li><a href="/citaj-radio">Čitaj radio</a></li>
    <li><a href="/program">Program</a></li>
    <li><a href="/emisije">Emisije</a></li>
    <li><a href="/o-nama">O nama</a></li>
    <li><a href="/projekti">Projekti</a></li>
  </ul>
</nav>

{@render children()}

<style>
  nav {
    display: flex;
    align-items: center;
    padding: 1rem;
    background-color: white;
  }

  nav ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  nav li {
    padding: 0 1rem;
  }

  nav a {
    text-decoration: none;
    color: var(--primary-700);
    font-weight: 500;
    text-transform: uppercase;
  }

  nav a:hover {
    color: var(--primary-900);
  }
</style>
