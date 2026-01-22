<script>
  import { onMount } from 'svelte';
  import ProgramDay from './ProgramDay.svelte';

  let { showLink = true } = $props();

  let today = $state('');

  onMount(() => {
    today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
  });
</script>

<div>
  {#if today}
    <ProgramDay day={today} />
  {/if}

  {#if showLink}
    <a href="/program" class="full-program-link">Pogledaj cijeli tjedni program</a>
  {/if}
</div>

<style>
  .full-program-link {
    display: inline-block;
    margin-top: 1rem;
    color: var(--primary-600);
    font-weight: 600;
    text-decoration: none;
    font-size: 0.9rem;
  }

  .full-program-link:hover {
    text-decoration: underline;
  }
</style>
