<script>
  import PageTitle from '$lib/components/PageTitle.svelte';
  import ProgramWeek from '$lib/components/ProgramWeek.svelte';
  import TextWrapper from '$lib/components/TextWrapper.svelte';
</script>

<svelte:head>
  <title>Program - Radio Roža</title>
  <meta name="description" content="Tjedni program Radio Rože" />
</svelte:head>

<PageTitle title="Tjedni Program" />

<section class="wrapper-section">
  <!-- <TextWrapper> -->
  <ProgramWeek />
  <!-- </TextWrapper> -->
</section>

<style>
  .wrapper-section {
    max-width: 1000px;
    margin: 0 auto;
  }
</style>
