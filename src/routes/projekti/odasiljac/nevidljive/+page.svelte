<script>
  import PageTitle from '$lib/components/PageTitle.svelte';
  import TextWrapper from '$lib/components/TextWrapper.svelte';
  import ProjectParagraph from '$lib/components/ProjectParagraph.svelte';
  import EpisodesSection from '$lib/components/EpisodesSection.svelte';
</script>

<svelte:head>
  <title>Nevidljive - Projekt Odašiljač - Radio Roža</title>
  <meta
    name="description"
    content="Emisija Nevidljive obrađuje teme iz domene rodne ravnopravnosti i reproduktivne pravde. Gdje priče žena postaju vidljive."
  />
</svelte:head>

<PageTitle title="Nevidljive" />

<TextWrapper>
  <div class="show-header">
    <div class="show-image">
      <img src="/images/projekti/odasiljac/nevidljive.png" alt="Emisija Nevidljive" />
    </div>
    <div class="show-meta">
      <span class="organization">PaRiter</span>
      <blockquote class="quote">"Gdje priče žena postaju vidljive."</blockquote>
    </div>
  </div>

  <ProjectParagraph>
    Obrađivat će teme iz domene rodne ravnopravnosti i reproduktivne pravde. Kroz razgovore sa
    ženama pokrit će se aktualne teme iz politike, kulture i ekonomije iz pozicije rodne
    ravnopravnosti te omogućiti sudjelovanje ženama različitih profila, profesija i stupnja
    obrazovanja, a sve kako bi se aktivno radilo na uključivanju socijalno osjetljivijih skupina u
    javni i društveni život i kako bi se neispričanim pričama dala platforma za zahtijevanje
    promjena.
  </ProjectParagraph>

  <ProjectParagraph>
    Cilj emisije je informirati širu javnost o ženskim pravima te diskriminirajućim situacijama s
    kojima se ženske osobe susreću u javnom i privatnom životu te osnažiti ih za reagiranje na
    nepravdu i pokretanje promjena.
  </ProjectParagraph>
</TextWrapper>

<EpisodesSection playlistUrl="https://www.mixcloud.com/RadioRoza/playlists/nevidljive/" />

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
