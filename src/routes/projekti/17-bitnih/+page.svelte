<script>
  import PageTitle from '$lib/components/PageTitle.svelte';
  import TextWrapper from '$lib/components/TextWrapper.svelte';
  import ProjectParagraph from '$lib/components/ProjectParagraph.svelte';
  import Hr from '$lib/components/Hr.svelte';
  import ProjectList from '$lib/components/ProjectList.svelte';
  import EpisodesSection from '$lib/components/EpisodesSection.svelte';
  import GallerySection from '$lib/components/GallerySection.svelte';

  const galleryImages = [
    { src: '/images/projekti/17-bitnih/17-1.jpg', alt: '17 Bitnih - slika 1' },
    { src: '/images/projekti/17-bitnih/17-2.jpg', alt: '17 Bitnih - slika 2' },
    { src: '/images/projekti/17-bitnih/17-3.jpg', alt: '17 Bitnih - slika 3' },
    { src: '/images/projekti/17-bitnih/17-4.jpg', alt: '17 Bitnih - slika 4' },
    { src: '/images/projekti/17-bitnih/17-5.jpg', alt: '17 Bitnih - slika 5' },
    { src: '/images/projekti/17-bitnih/17-6.jpg', alt: '17 Bitnih - slika 6' },
    { src: '/images/projekti/17-bitnih/17-7.jpg', alt: '17 Bitnih - slika 7' },
    { src: '/images/projekti/17-bitnih/17-8.jpg', alt: '17 Bitnih - slika 8' },
    { src: '/images/projekti/17-bitnih/17-9.jpg', alt: '17 Bitnih - slika 9' },
    { src: '/images/projekti/17-bitnih/17-10.jpg', alt: '17 Bitnih - slika 10' },
  ];
</script>

<svelte:head>
  <title>17 Bitnih - Radio Roža</title>
  <meta
    name="description"
    content="Radijska emisija 17 bitnih okuplja 17 voditelja koji kroz 17 epizoda razgovaraju s gostima o ciljevima održivog razvoja."
  />
  <meta name="keywords" content="17 bitnih, održivi razvoj, Radio Roža, Rijeka" />
</svelte:head>

<PageTitle title="17 Bitnih" />

<TextWrapper>
  <div class="hero-image">
    <img src="/images/projekti/17-bitnih/main17.png" alt="17 bitnih" />
  </div>

  <Hr />

  <h3 class="section-title">Kratki opis projekta</h3>

  <ProjectParagraph>
    Radijska emisija "17 bitnih" okuplja 17 voditelja koji kroz 17 epizoda razgovaraju s gostima o
    ciljevima održivog razvoja. Emisija se emitira svakog utorka i petka točno u podne na Radio
    Roži.
  </ProjectParagraph>

  <ProjectParagraph>
    Nisu svi čuli za ciljeve održivog razvoja i zato se udruga Ri Rock prihvatila mikrofona, okupila
    17 mladih voditelja i putem on-line streaminga odlučila ući u domove diljem hrvatske.
  </ProjectParagraph>

  <ProjectParagraph>
    Prije pet godina <strong>Ujedinjeni narodi</strong> su usvojili i svijetu predstavili
    <strong>17 ciljeva održivog razvoja</strong> sa željom da se oni postignu do 2030. godine. Hrvatska
    je kao jedna od članica UN-a aktivna u ostvarivanju ovih ciljeva od početka, a osnovano je i Nacionalno
    vijeće za održivi razvoj koje predlaže mjere, aktivnosti i prioritete te prati, analizira i koordinira
    njihovu provedbu. Evo koji su to ciljevi:
  </ProjectParagraph>

  <ProjectList
    type="ordered"
    items={[
      'Iskorjenjivanje siromaštva (iskorijeniti siromaštvo svuda i u svim oblicima)',
      'Iskorjenjivanje gladi (iskorijeniti glad, postići sigurnost hrane i poboljšanu ishranu te promovirati održivu poljoprivredu)',
      'Zdravlje i dobrobit (osigurati zdrav život i promovirati blagostanje za ljude svih generacija)',
      'Kvalitetno obrazovanje (osigurati uključivo i kvalitetno obrazovanje te promovirati mogućnosti cjeloživotnog učenja)',
      'Rodna ravnopravnost (postići rodnu ravnopravnost i osnažiti sve žene i djevojke)',
      'Pitka voda i higijenski uvjeti (osigurati pristup pitkoj vodi za sve, održivo upravljati vodama te osigurati higijenske uvjete za sve)',
      'Pristupačna i čista energija (osigurati pristup pouzdanoj, održivoj i suvremenoj energiji po pristupačnim cijenama za sve)',
      'Dostojanstven rad i gospodarski rast (promovirati uključiv i održiv gospodarski rast, punu zaposlenost i dostojanstven rad za sve)',
      'Industrija, inovacije i infrastruktura (izgraditi prilagodljivu infrastrukturu, promovirati uključivu i održivu industrijalizaciju i poticati inovativnost)',
      'Smanjiti nejednakosti (smanjiti nejednakost unutar i između država)',
      'Održivi gradovi i održive zajednice (učiniti gradove i naselja uključivim, sigurnim, prilagodljivim i održivim)',
      'Odgovorna potrošnja i proizvodnja (osigurati održive oblike potrošnje i proizvodnje)',
      'Odgovor na klimatske promjene (poduzeti hitne akcije u borbi protiv klimatskih promjena i njihovih posljedice)',
      'Život ispod vode (očuvati i održivo koristiti oceane, mora i morske resurse za održiv razvoj)',
      'Život na kopnu (zaštititi, uspostaviti i promovirati održivo korištenje kopnenih ekosustava, održivo upravljati šumama, suzbiti dezertifikaciju, zaustaviti degradaciju tla te spriječiti uništavanje biološke raznolikosti)',
      'Mir, pravda i snažne institucije (promovirati miroljubiva i uključiva društva za održivi razvoj, osigurati pristup pravdi za sve i izgraditi učinkovite, odgovorne i uključive institucije na svim razinama)',
      'Partnerstvo za ciljeve (ojačati načine provedbe te učvrstiti globalno partnerstvo za održivi razvoj)',
    ]}
  />

  <ProjectParagraph>
    Radio Roža je radio zajednice (community radio) nastao iz želje i potrebe za praćenjem nezavisne
    kulturne scene i raznih kulturnih aktera u Rijeci, promocijom najrazličitijih (underground)
    žanrova, te ljubavi prema gramofonskim pločama.
  </ProjectParagraph>

  <ProjectParagraph>
    <strong>Glavni urednik Radio Rože, Davor Popdankovski kaže:</strong>
  </ProjectParagraph>

  <blockquote class="quote">
    "Iako je prošlo već 5 godina od predstavljanja ciljeva, postoji veliki broj građana koji još
    uvijek nije čuo za ciljeve održivog razvoja. Šteta, jer kad bi svaka osoba s jednom malom gestom
    pridonijela ostvarenju ovih ciljeva, svijet bi do 2030. godine bi puno, puno ljepše mjesto za
    život. S radijskom emisijom '17 bitnih!' želimo povećati svijest o postojanju održivih ciljeva i
    želimo potaknuti svakog slušatelja da se uključi u globalni pokret"
  </blockquote>

  <Hr />

  <ProjectParagraph>
    Dodatni materijal za proučavanje:
    <a
      class="link"
      href="https://sustainabledevelopment.un.org/"
      target="_blank"
      rel="noopener noreferrer"
    >
      sustainabledevelopment.un.org
    </a>
  </ProjectParagraph>

  <div class="logos">
    <img src="/images/projekti/17-bitnih/17_logos.png" alt="Partneri projekta 17 Bitnih" />
  </div>
</TextWrapper>

<GallerySection images={galleryImages} columns={5} />

<EpisodesSection playlistUrl="https://www.mixcloud.com/RadioRoza/playlists/17-bitnih/" />

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

  .quote {
    font-size: 1.1rem;
    font-style: italic;
    color: var(--dark);
    margin: 1.5rem 0;
    padding: 1rem 1.5rem;
    background: var(--light);
    border-left: 3px solid var(--primary-300);
    border-radius: 0 8px 8px 0;
    line-height: 1.6;
  }

  .logos {
    margin-top: 2rem;
    text-align: center;
  }

  .logos img {
    max-width: 100%;
    height: auto;
  }
</style>
