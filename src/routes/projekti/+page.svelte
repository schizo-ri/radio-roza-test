<script>
  import PageTitle from '$lib/components/PageTitle.svelte';
  import Wrapper from '$lib/components/Wrapper.svelte';
  import ProjectCard from '$lib/components/ProjectCard.svelte';

  const projects = [
    {
      title: 'Žiroskop',
      href: '/projekti/ziroskop',
      description:
        'Razvoj civilno-javnog partnerstva u upravljanju prostorima kulture u Rijeci - Filodrammatica, OKC Palach i HKD na Sušaku.',
      image: '',
    },
    {
      title: 'Korona Kid',
      href: '/projekti/korona-kid',
      description:
        'Poticanje djece i mladih na građanski angažman i brigu za druge kroz usvajanje novih znanja i vještina građanskog odgoja.',
      image: '/images/projekti/korona-kid/kk_cover.png',
    },
    {
      title: '17 Bitnih',
      href: '/projekti/17-bitnih',
      description:
        'Radijska emisija koja okuplja 17 voditelja koji kroz 17 epizoda razgovaraju s gostima o ciljevima održivog razvoja.',
      image: '/images/projekti/17-bitnih/main17.png',
    },
    {
      title: 'Odašiljač',
      href: '/projekti/odasiljac',
      description:
        'Izgradnja stručnih kadrova koji će adekvatno izvještavati o ranjivim skupinama unutar radijskih emisija na Radio Roži.',
      image: '/images/projekti/odasiljac/logo_red.png',
    },
    {
      title: 'Digitalne Rožice',
      href: '/projekti/digitalne-rozice',
      description:
        'Online kreativne i umjetničke aktivnosti za djecu i mlade te djecu i mlade s teškoćama u razvoju.',
      image: '/images/projekti/digitalne-rozice/art-dr.png',
    },
    {
      title: 'Inkluzivni Kotač',
      href: '/projekti/inkluzivni-kotac',
      description:
        'Jačanje građanske svijesti i angažmana u vezi romskih tema kroz inkluzivne prakse i poticanje pozitivnog diskursa.',
      image: '/images/projekti/inkluzivni-kotac/kotac2.jpg',
    },
  ];
</script>

<PageTitle title="Projekti" subtitle="Projekti provedeni na Radio Roži" />

<Wrapper>
  <div class="projects-grid">
    {#each projects as project (project.href)}
      <ProjectCard
        title={project.title}
        href={project.href}
        description={project.description}
        image={project.image}
      />
    {/each}
  </div>
</Wrapper>

<style>
  .projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 1.5rem;
  }
</style>
