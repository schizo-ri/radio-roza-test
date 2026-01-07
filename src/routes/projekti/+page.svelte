<script>
  import PageTitle from '$lib/components/PageTitle.svelte';
  import Wrapper from '$lib/components/Wrapper.svelte';
  import ProjectCard from '$lib/components/ProjectCard.svelte';

  const projects = [
    { title: 'Žiroskop', href: '/projekti/ziroskop' },
    { title: 'Korona Kid', href: '/projekti/koronakid' },
    { title: '17 bitnih', href: '/projekti/17bitnih' },
    { title: 'Odašiljač', href: '/projekti/odasiljac' },
    { title: 'Digitalne Rožice', href: '/projekti/digitalne-rozice' },
    { title: 'Inkluzivni kotač', href: '/projekti/inkluzivni-kotac' },
  ];
</script>

<PageTitle title="Projekti" subtitle="Projekti provedeni na Radio Roži" />

<Wrapper>
  {#each projects as project (project.href)}
    <ProjectCard title={project.title} href={project.href} />
  {/each}
</Wrapper>
