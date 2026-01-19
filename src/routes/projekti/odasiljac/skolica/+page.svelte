<script>
  import PageTitle from '$lib/components/PageTitle.svelte';
  import TextWrapper from '$lib/components/TextWrapper.svelte';
  import ProjectParagraph from '$lib/components/ProjectParagraph.svelte';
  import EpisodesSection from '$lib/components/EpisodesSection.svelte';
</script>

<svelte:head>
  <title>Školica - Projekt Odašiljač - Radio Roža</title>
  <meta
    name="description"
    content="Emisija Školica adresira probleme djece i mladih u različitoj dobi. Mladi i mlađi, zanimljive priče o onima na kojima svijet ostaje."
  />
</svelte:head>

<PageTitle title="Školica" />

<TextWrapper>
  <div class="show-header">
    <div class="show-image">
      <img src="/images/projekti/odasiljac/skolica.png" alt="Emisija Školica" />
    </div>
    <div class="show-meta">
      <span class="organization">Udruga Ri Rock</span>
      <blockquote class="quote">
        "Mladi i mlađi, zanimljive priče o onima na kojima svijet ostaje."
      </blockquote>
    </div>
  </div>

  <ProjectParagraph>
    Adresirat će probleme djece i mladih u različitoj dobi - prve godine života, vrtić, predškolska
    dob, niži i viši razredi osnovne škole, srednja škola te fakultetsko doba. Osim tema povezanih
    sa samim školovanjem (bullying, poteškoće s učenjem), obradit će se i teme vezane uz obiteljski
    život (problemi u ponašanju, zanemarivanost od strane roditelja, popravne institucije) te
    svakodnevne aktivnosti (pronalazak zaposlenja, hobiji).
  </ProjectParagraph>

  <ProjectParagraph>
    U emisiji će gostovati djeca i mladi (s dozvolom roditelja/staratelja), predstavnici
    institucija, voditelji izvannastavnih aktivnosti i dr. dionici čiji rad uključuje rad s djecom i
    mladima. Ugostit će se gosti iz drugih županija kako bi se mogla usporediti situacija PGŽ-a i
    ostatka Hrvatske.
  </ProjectParagraph>

  <ProjectParagraph>
    Cilj emisije je osvijestiti javnost o problemima djece i mladih, njihovom pogledu na svijet i
    percepciji stvarnosti. Bitno je javno progovarati o mladima i njihovim pravima jer su oni
    budućnost, a problem s kojima se susreću mogu izazvati trajne posljedice na njih i njihovo
    okruženje.
  </ProjectParagraph>
</TextWrapper>

<EpisodesSection playlistUrl="https://www.mixcloud.com/RadioRoza/playlists/skolica/" />

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
