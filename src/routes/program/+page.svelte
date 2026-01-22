<script>
  import PageTitle from '$lib/components/PageTitle.svelte';
  import ProgramWeek from '$lib/components/ProgramWeek.svelte';
</script>

<svelte:head>
  <title>Program - Radio Roža</title>
  <meta name="description" content="Tjedni program Radio Rože" />
</svelte:head>

<main class="program-container">
  <PageTitle title="Tjedni Program" />
  <ProgramWeek />
</main>

<style>
  .program-container {
    max-width: 1000px;
    margin: 0 auto;
  }
</style>
