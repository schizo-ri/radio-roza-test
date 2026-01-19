<script>
  import PageTitle from '$lib/components/PageTitle.svelte';
  import TextWrapper from '$lib/components/TextWrapper.svelte';
  import ProjectParagraph from '$lib/components/ProjectParagraph.svelte';
  import Hr from '$lib/components/Hr.svelte';
  import ProjectList from '$lib/components/ProjectList.svelte';
  import EpisodesSection from '$lib/components/EpisodesSection.svelte';
</script>

<svelte:head>
  <title>Inkluzivni Kotač - Radio Roža</title>
  <meta
    name="description"
    content="Projekt Inkluzivni kotač jača građansku svijest i angažman u vezi romskih tema kroz inkluzivne prakse i poticanje pozitivnog diskursa o Romima."
  />
  <meta name="keywords" content="Inkluzivni kotač, Romi, inkluzija, Radio Roža, Rijeka" />
</svelte:head>

<PageTitle title="Inkluzivni Kotač" />

<TextWrapper>
  <div class="hero-image">
    <img src="/images/projekti/inkluzivni-kotac/kotac2.jpg" alt="Inkluzivni Kotač" />
  </div>

  <Hr />

  <ProjectParagraph>
    <strong
      >Opći cilj projekta je jačanje građanske svijesti i angažmana u vezi romskih tema kroz
      inkluzivne prakse i poticanje pozitivnog diskursa o Romima, a specifični ciljevi su:</strong
    >
  </ProjectParagraph>

  <ProjectList
    items={[
      'osnažiti mlade Rome uključivanjem u obrazovne, društvene, kulturno-umjetničke i poslovne procese',
      'poboljšati novinarske kompetencije u izvještavanju o Romima i ostalim ranjivim skupinama kroz razvijanje novih metoda rada',
      'međusektorska i unutar sektorska suradnja i sinergija u razvoju regionalnih politika usmjerenih na Rome',
    ]}
  />

  <Hr />

  <ProjectParagraph>
    <strong>Ciljevi će se postići kroz aktivnosti:</strong>
  </ProjectParagraph>

  <ProjectList
    items={[
      'edukacije budućih medijskih djelatnika',
      'proizvodnje i objave medijskih sadržaja namijenjenih kvalitetnom izvještavanju o Romima (radijske emisije i časopis)',
      'organizacije kulturno-umjetničkih manifestacija posvećenih romskoj kulturi i umjetnosti',
      'organizacije okruglog stola na kojem će se donijeti smjernice za daljnju međusektorsku i unutar sektorsku suradnju pri pisanju Akcijskog plana za uključivanje Roma u Primorsko-goranskoj županiji',
      'radionice radijskog izvještavanja o ranjivim skupinama i proizvodnja medijskog sadržaja',
      'radionice izrade Akcijskog plana za uključivanje Roma u Primorsko-goranskoj županiji',
    ]}
  />

  <Hr />

  <ProjectParagraph>
    <strong>Ciljane skupine projekta su:</strong>
  </ProjectParagraph>

  <ProjectList
    items={[
      'mladi Romi/Romkinje – novinari/novinarke',
      'osobe romske nacionalnosti i osobe neromske nacionalnosti uključene u radionice',
      'predstavnici lokalne i regionalne samouprave Primorsko-goranske županije uključena u radionice',
      'organizacije civilnog društva',
      'profitne ili neprofitne radijske postaje u RH',
    ]}
  />

  <Hr />

  <h3 class="section-title">Kontakt osobe</h3>

  <div class="contacts">
    <div class="contact-card">
      <strong>Martina Blečić</strong>
      <span>voditeljica projekta</span>
      <a href="mailto:inkluzivnikotac@gmail.com">inkluzivnikotac@gmail.com</a>
    </div>
    <div class="contact-card">
      <strong>Siniša - Senad Musić</strong>
      <span>koordinator projekta</span>
      <a href="mailto:smusic@romhr.hr">smusic@romhr.hr</a>
    </div>
  </div>

  <Hr />

  <h3 class="section-title">Partner u projektu</h3>

  <div class="partner-logo">
    <img src="/images/projekti/inkluzivni-kotac/romhr_logo.png" alt="ROMHR" />
  </div>

  <Hr />

  <h3 class="section-title">Radioemisiju "Inkluzivni kotač" možete slušati na</h3>

  <div class="radio-stations">
    <a href="https://klfm.org/" target="_blank" rel="noopener noreferrer">
      <img src="/images/projekti/inkluzivni-kotac/klfm.png" alt="KLFM" />
    </a>
    <a href="http://radio.rojc.eu/" target="_blank" rel="noopener noreferrer">
      <img src="/images/projekti/inkluzivni-kotac/rojc.png" alt="Radio Rojc" />
    </a>
    <a href="https://www.radiokastav.com/" target="_blank" rel="noopener noreferrer">
      <img src="/images/projekti/inkluzivni-kotac/kastav.png" alt="Radio Kastav" />
    </a>
  </div>
</TextWrapper>

<EpisodesSection
  playlistUrl="https://www.mixcloud.com/RadioRoza/playlists/inkluzivni-kota%C4%8D/"
/>

<style>
  .hero-image {
    margin-bottom: 1.5rem;
  }

  .hero-image img {
    width: 100%;
    height: auto;
    border-radius: 8px;
  }

  .section-title {
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--primary-700);
    margin: 1.5rem 0 1rem;
  }

  .contacts {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1rem;
    margin: 1rem 0;
  }

  .contact-card {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    padding: 1rem;
    background: var(--light);
    border-radius: 8px;
  }

  .contact-card strong {
    color: var(--dark);
  }

  .contact-card span {
    font-size: 0.9rem;
    color: var(--muted);
  }

  .contact-card a {
    color: var(--primary-600);
    text-decoration: none;
    font-size: 0.9rem;
  }

  .contact-card a:hover {
    text-decoration: underline;
  }

  .partner-logo {
    margin: 1rem 0;
  }

  .partner-logo img {
    max-width: 200px;
    height: auto;
  }

  .radio-stations {
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;
    align-items: center;
    margin: 1rem 0;
  }

  .radio-stations a {
    display: block;
  }

  .radio-stations img {
    height: 90px;
    width: auto;
  }
</style>
