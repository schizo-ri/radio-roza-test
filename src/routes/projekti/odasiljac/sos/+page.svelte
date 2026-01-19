<script>
  import PageTitle from '$lib/components/PageTitle.svelte';
  import TextWrapper from '$lib/components/TextWrapper.svelte';
  import ProjectParagraph from '$lib/components/ProjectParagraph.svelte';
  import EpisodesSection from '$lib/components/EpisodesSection.svelte';
</script>

<svelte:head>
  <title>S.O.S. - Projekt Odašiljač - Radio Roža</title>
  <meta
    name="description"
    content="Emisija S.O.S. obrađuje teme pružanja primarne pravne i psihološke pomoći žrtvama obiteljskog, partnerskog i seksualnog nasilja."
  />
</svelte:head>

<PageTitle title="Emisija S.O.S." />

<TextWrapper>
  <div class="show-header">
    <div class="show-image">
      <img src="/images/projekti/odasiljac/sos.png" alt="Emisija S.O.S." />
    </div>
    <div class="show-meta">
      <span class="organization">Udruga SOS Rijeka - Centar za nenasilje i ljudska prava</span>
      <blockquote class="quote">
        "Teme o kojima se rijetko priča, a o kojima je bitno govoriti."
      </blockquote>
    </div>
  </div>

  <ProjectParagraph>
    Obradit će se teme pružanja primarne pravne i psihološke pomoći žrtvama obiteljskog, partnerskog
    i seksualnog nasilja, pojedini aspekti radnog prava vezani uz nasilje i uznemiravanje na radnom
    mjestu te važnosti rada s mladima u svrhu prevencije i edukacije o nasilju.
  </ProjectParagraph>

  <ProjectParagraph>
    Omogućit će se da se žrtve nasilja zauzmu za sebe kroz progovaranje o svojim doživljajima te da
    „dobiju svoj glas". Izlazak u javnost s vlastitom pričom na neke od njih djeluje terapeutski,
    ali je i iznimno korisno za druge osobe u sličnim situacijama i za društvo općenito.
    Predstavljanje neće biti intruzivno te pruža mogućnost zadržavanja anonimnosti.
  </ProjectParagraph>

  <ProjectParagraph>
    Gosti emisije bit će korisnici/e Udruge, stručnjaci/kinje i volonteri/ke koji s njima rade te
    istraživači/ce koje se bave temom socijalno marginaliziranih i ranjivih skupina.
  </ProjectParagraph>
</TextWrapper>

<EpisodesSection playlistUrl="https://www.mixcloud.com/RadioRoza/playlists/sos/" />

<style>
  .show-header {
    display: flex;
    gap: 2rem;
    margin-bottom: 2rem;
    align-items: flex-start;
  }

  .show-image {
    flex-shrink: 0;
    width: 180px;
    height: 180px;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  .show-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .show-meta {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .organization {
    display: inline-block;
    font-size: 0.875rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--primary-600);
    margin-bottom: 1rem;
  }

  .quote {
    font-size: 1.5rem;
    font-style: italic;
    color: var(--dark);
    margin: 0;
    padding-left: 1rem;
    border-left: 3px solid var(--primary-300);
    line-height: 1.4;
  }

  @media (max-width: 600px) {
    .show-header {
      flex-direction: column;
      align-items: center;
      text-align: center;
    }

    .show-image {
      width: 150px;
      height: 150px;
    }

    .quote {
      font-size: 1.25rem;
      border-left: none;
      padding-left: 0;
      border-top: 3px solid var(--primary-300);
      padding-top: 1rem;
    }
  }
</style>
