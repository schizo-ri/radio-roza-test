<script>
  import PageTitle from '$lib/components/PageTitle.svelte';
  import TextWrapper from '$lib/components/TextWrapper.svelte';
  import ProjectParagraph from '$lib/components/ProjectParagraph.svelte';
  import Hr from '$lib/components/Hr.svelte';
  import ProjectList from '$lib/components/ProjectList.svelte';
  import EpisodesSection from '$lib/components/EpisodesSection.svelte';
</script>

<svelte:head>
  <title>Digitalne Rožice - Radio Roža</title>
  <meta
    name="description"
    content="Digitalne rožice je europski projekt koji u fokus postavlja opću populaciju djece i mladih te djecu i mlade s teškoćama u razvoju."
  />
  <meta
    name="keywords"
    content="Digitalne Rožice, djeca, mladi, Radio Roža, Rijeka, Europski socijalni fond"
  />
</svelte:head>

<PageTitle title="Digitalne Rožice" />

<TextWrapper>
  <div class="hero-image">
    <img src="/images/projekti/digitalne-rozice/art-dr.png" alt="Digitalne Rožice" />
  </div>

  <a
    href="https://www.rirock.hr/digitalne-rozice/"
    target="_blank"
    rel="noopener noreferrer"
    class="brochure-link"
  >
    Otvori online brošuru Digitalne Rožice
  </a>

  <Hr />

  <h3 class="section-title">Informacije o projektu</h3>

  <ProjectParagraph>
    Digitalne rožice europski je projekt koji u fokus postavlja opću populaciju djece i mladih te
    djecu i mlade s teškoćama u razvoju. U suradnji s partnerskim udrugama (RUKE, Muzikopter) koje
    već dugi niz godina provode programske aktivnosti koje uključuju rad s djecom i mladima, nastoji
    se utjecati na niz pozitivnih promjena: kulturnu i umjetničku edukaciju, razvoj samostalnosti,
    poboljšanje slike o sebi te poboljšanje socio-emocionalnog kontakta, izgradnju interpersonalnih
    odnosa, osobni rast i razvoj kroz oslobađanje kreativnosti i individualnosti djece i mladih.
  </ProjectParagraph>

  <ProjectParagraph>
    Uslijed novonastale situacije povezane s pandemijom COVID-19 dogodile su se promjene u obliku
    prestanka ili reorganizacije svakidašnjih aktivnosti, što se očitovalo kroz niz negativnih
    utjecaja na djecu i mlade:
  </ProjectParagraph>

  <ProjectList
    type="ordered"
    items={[
      'izdvajanje – segregacija iz kulturnog i društvenog života zajednice',
      'nedostupnost interaktivnih online programa neformalnih kulturnih i umjetničkih aktivnosti',
      'nedostupnost online programa muzikoterapije koji bi kreativnim nekonvencionalnim pristupom omogućili glazbenu edukaciju i rehabilitaciju djece s teškoćama u razvoju',
      '„gušenje" značajnih kreativnih, umjetničkih i socijalnih potencijala – ograničavanje ekspresije vlastitih misli i afiniteta, zbog čega djeca i mladi, naročito oni s teškoćama u razvoju posustaju u razvitku svojih potencijala, doživljava osjećaje poput anksioznosti, brige, tjeskobe i straha',
      'škole su se u vrlo kratkom roku reorganizirale i omogućile pohađanje nastave putem digitalnih platformi, ali djeca i mladi su izgubili svakodnevnu strukturu i poticaj koji je školsko okruženje donosilo',
    ]}
  />

  <ProjectParagraph>
    Sve to potaknulo je nužnu intervenciju udruge Ri Rock i projektnih partnera da kroz sustav
    podrške djeci i mladima ponude načine za izražavanje osjećaja, želja i potreba kroz online
    kreativne, zabavne i stvaralačke aktivnosti.
  </ProjectParagraph>

  <ProjectParagraph>
    Svrha projekta „Digitalne rožice" jest provedbom participativnih online kulturnih i umjetničkih
    aktivnosti razviti kreativne i socijalne vještine, doprinijeti socijalnom uključivanju te
    poboljšati pristup kulturnim i umjetničkim sadržajima djeci i mladima na području PGŽ-a.
    Aktivnosti projekta podrazumijevaju:
  </ProjectParagraph>

  <ProjectList
    type="ordered"
    items={[
      'online radionice audio digitalizacije kulturno-umjetničkih sadržaja te montaže radijskih emisija za djecu i mlade, a koji će svojim angažmanom ponuditi prilagođene i aktualne sadržaje svojim vršnjacima, uključujući djecu s poteškoćama u čitanju te slijepu i slabovidnu djecu',
      'online radionice muzikoterapije za djecu i mlade s teškoćama u razvoju',
      'online emitiranje emisija s interaktivnim audiovizualnim sadržajima iz područja kulture i umjetnosti u suradnji s osnovnim školama',
    ]}
  />

  <Hr />

  <h3 class="section-title">Ciljevi i očekivani rezultati projekta</h3>

  <ProjectParagraph>
    Sudjelovanjem u aktivnostima audiodigitalizacije, djeca i mladi promiču se u aktivne
    stvaratelje, kritičare i komentatore, potaknut će se razvoj vještina čitanja s razumijevanjem te
    razvoj samopouzdanja i pozitivnih osjećaja vezanih za čitanje.
  </ProjectParagraph>

  <ProjectParagraph>Stvaranje dostupnije i uključivije kulture.</ProjectParagraph>

  <ProjectParagraph>
    Razvijat će se novi oblici interdisciplinarnih medijskih sadržaja kojima će se istraživati
    mogućnosti kreativnije i zabavnije upotrebe tradicionalnih medija, ponuditi siguran sadržaj i
    povećati konzumacija kulturnih i umjetničkih sadržaja među djecom i mladima.
  </ProjectParagraph>

  <ProjectParagraph>
    Online radionice muzikoterapije potaknuti će kreativnost, izražavanje, razvoj i poboljšanje
    komunikacijskih sposobnosti, motoričkih funkcija te kognitivnog i emocionalnog funkcioniranja
    djece i mladih s teškoćama u razvoju.
  </ProjectParagraph>

  <ProjectParagraph>
    Projektom „Digitalne rožice" razviti će se kreativne i socijalne vještine, doprinijeti
    socijalnom uključivanju te poboljšati pristup kulturnim i umjetničkim sadržajima djeci i mladima
    te djeci i mladima s poteškoćama u razvoju na području PGŽ-a.
  </ProjectParagraph>

  <Hr />

  <h3 class="section-title">Vrijednost</h3>

  <ProjectParagraph>
    Ukupna vrijednost projekta iznosi 458.380,15 HRK (85% sredstava sufinancirano je iz Europske
    unije iz Europskog socijalnog fonda, 15% sredstava osigurava Republika Hrvatska iz Državnog
    proračuna).
  </ProjectParagraph>

  <Hr />

  <h3 class="section-title">Partneri</h3>

  <ProjectList>
    <li>
      <a
        class="link"
        href="https://vijecemladihbencic.com/"
        target="_blank"
        rel="noopener noreferrer"
        >Udruga za Razvoj Umjetnosti, Kulture i Edukacije (Vijeće mladih Benčić)</a
      >
    </li>
    <li>
      <a
        class="link"
        href="http://www.facebook.com/muzikopter/"
        target="_blank"
        rel="noopener noreferrer"
        >Udruga za muzikoterapiju i edukacijsko rehabilitacijski rad Muzikopter</a
      >
    </li>
    <li>
      <a class="link" href="https://gkr.hr/" target="_blank" rel="noopener noreferrer"
        >Gradska knjižnica Rijeka</a
      >
    </li>
  </ProjectList>

  <Hr />

  <h3 class="section-title">Razdoblje provedbe projekta</h3>

  <ProjectParagraph>1. travnja 2021. do 1. travnja 2022.</ProjectParagraph>

  <Hr />

  <h3 class="section-title">Kontakt osoba za više informacija</h3>

  <ProjectParagraph>
    Katerina Jovanović, voditeljica projekta
    <a class="link" href="mailto:katerina.jovanoviic@gmail.com">katerina.jovanoviic@gmail.com</a>
  </ProjectParagraph>

  <Hr />

  <h3 class="section-title">Za više informacija o EU projektima</h3>

  <div class="links">
    <a href="https://strukturnifondovi.hr/" target="_blank" rel="noopener noreferrer"
      >www.strukturnifondovi.hr</a
    >
    <a href="http://www.esf.hr/operativni-program/" target="_blank" rel="noopener noreferrer"
      >www.esf.hr</a
    >
  </div>

  <div class="eu-notice">
    <p>Sadržaj web stranice isključiva je odgovornost Udruge Ri Rock.</p>
    <p><strong>Projekt je sufinancirala Europska unija iz Europskog socijalnog fonda.</strong></p>
    <img src="/images/projekti/digitalne-rozice/logosi-dr.png" alt="EU logotipi" />
  </div>
</TextWrapper>

<EpisodesSection
  playlistUrl="https://www.mixcloud.com/RadioRoza/playlists/digitalne-ro%C5%BEice/"
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

  .brochure-link {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.5rem;
    background: var(--primary-600);
    color: white;
    text-decoration: none;
    border-radius: 8px;
    font-weight: 500;
    transition: background-color 0.2s ease;
  }

  .brochure-link:hover {
    background: var(--primary-700);
  }

  .section-title {
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--primary-700);
    margin: 1.5rem 0 1rem;
  }

  .links {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin: 1rem 0;
  }

  .links a {
    color: var(--primary-600);
    text-decoration: none;
  }

  .links a:hover {
    text-decoration: underline;
  }

  .eu-notice {
    margin-top: 2rem;
    padding: 1.5rem;
    background: var(--light);
    border-radius: 8px;
    text-align: center;
  }

  .eu-notice p {
    margin: 0 0 0.5rem 0;
    font-size: 0.95rem;
    color: var(--dark);
  }

  .eu-notice img {
    margin-top: 1rem;
    max-width: 100%;
    height: auto;
  }
</style>
