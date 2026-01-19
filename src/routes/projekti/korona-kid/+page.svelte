<script>
  import PageTitle from '$lib/components/PageTitle.svelte';
  import TextWrapper from '$lib/components/TextWrapper.svelte';
  import ProjectParagraph from '$lib/components/ProjectParagraph.svelte';
  import Hr from '$lib/components/Hr.svelte';
  import EpisodesSection from '$lib/components/EpisodesSection.svelte';
</script>

<svelte:head>
  <title>Korona Kid - Radio Roža</title>
  <meta
    name="description"
    content="Projekt Korona kid potiče djecu i mlade na građanski angažman i brigu za druge kroz usvajanje novih znanja i vještina građanskoga odgoja."
  />
  <meta name="keywords" content="Korona Kid, djeca, mladi, Radio Roža, Rijeka" />
</svelte:head>

<PageTitle title="Korona Kid" />

<TextWrapper>
  <div class="hero-image">
    <img
      src="/images/projekti/korona-kid/kk_logo.png"
      alt="Korona Kid logo"
      class="logo-centered"
    />
  </div>

  <ProjectParagraph>
    Interaktivni, tehnološki napredni, ali istovremeno zabavni načini učenja, pokazali su svoju
    važnost u novoj stvarnosti koju nam je stvorila pandemija korone. Kako bismo učinili sve da naša
    djeca i mladi što lakše shvate, a onda se i prilagode novonastaloj situaciji, pokrenuli smo
    projekt <strong>Korona kid</strong>.
  </ProjectParagraph>

  <Hr />

  <ProjectParagraph>
    <strong
      >Projekt Korona kid provodimo sa svojim višegodišnjim partnerima, Udrugom za razvoj
      umjetnosti, kulture i edukacije - RUKE - (Vijeće mladih Benčić) i Gradskom knjižnicom Rijeka,
      a cilj projekta je</strong
    > poticanje djece i mladih na građanski angažman i brigu za druge kroz usvajanje novih znanja i vještina
    građanskoga odgoja, primjenu novih tehnologija i socijalizaciju!
  </ProjectParagraph>

  <ProjectParagraph>
    Vijeće mladih Benčić (Udruga RUKE) nositelj je i koordinator projekta kojem doprinosi širokim
    iskustvom i znanjima u domeni neformalnoga obrazovanja djece i mladih, a partner Gradska
    knjižnica Rijeka donosi nam znanja vezana za kreiranje i uređivanje sadržaja, te Udruga Ri Rock
    znanja vezana za snimanja i montažu zvuka.
  </ProjectParagraph>

  <ProjectParagraph>
    Naši brojni stručni suradnici vrijedno rade na člancima posebno prilagođenima za djecu i mlade,
    kojima punimo naš portal <a
      class="link"
      href="https://brickzine.hr/"
      target="_blank"
      rel="noopener noreferrer">Brickzine.hr</a
    >. Edukativni i zanimljivi tekstovi pokrivaju područja kulture, umjetnosti, građanskog odgoja,
    psihologije, kulture „uradi sam"…
  </ProjectParagraph>

  <Hr />

  <ProjectParagraph>
    Ono što cijelu stvar čini još uzbudljivijom jest način na koji smo osigurali da baš svatko može
    uživati i konzumirati naš sadržaj. Sve spomenute članke ćemo, kroz naše online radionice,
    pretvoriti u uzbudljive radijske emisije koje će se moći pronaći i slušati na portalu
    Brickzine.hr, ali također i na stranicama Vijeća mladih Benčić te na Radiju Roži.
  </ProjectParagraph>

  <ProjectParagraph>
    Tijekom <strong
      >osam online radionica, članke će audio digitalizirati desetoro djece i mladih pod mentorstvom
      stručnih suradnika.</strong
    > Audio digitalizacija provodit će se putem individualnih i grupnih online radionica koje će se održavati
    putem platforme Zoom. Vježbat ćemo govor, dikciju i izgovaranje (dramatizacija) tekstova pod mentorstvom
    riječke glumice – Petre Šarac.
  </ProjectParagraph>

  <ProjectParagraph>
    Nakon vježbe slijede snimanje govora i interpretacija tekstova koji će se također raditi online,
    a potom slijedi i prikupljanje zvukova i efekata koji ilustriraju događaje iz tekstova. Nakon
    radionice, audio snimke će montirati partner Udruga Ri Rock u konačan oblik podcasta/radijske
    emisije koja će zatim postati dostupna online svim našim čitateljima i slušateljima.
  </ProjectParagraph>

  <ProjectParagraph>
    Kako bismo naše mlade slušatelje i čitatelje dodatno angažirali, sudionici naših radionica će u
    svakoj radijskoj emisiji osmisliti po jedan poziv na akciju kako bismo prikupili reakcije i
    kreativne radove naših slušatelja i čitatelja i uključili ih u buduće emisije i objave tijekom
    projekta!
  </ProjectParagraph>

  <ProjectParagraph>
    Korona kid će do kraja srpnja čitateljima i slušateljima donijeti 12 zanimljivih i raznolikih
    članaka koji će biti objavljivani u <strong>online magazinu Brickzine</strong> i čak četiri
    radijske emisije koje će biti dostupne <strong>na mrežnim stranicama Radio Rože</strong>, ali i
    na stranicama Vijeća mladih Benčić te portalu
    <a class="link" href="https://brickzine.hr/" target="_blank" rel="noopener noreferrer"
      >Brickzine.hr</a
    >.
  </ProjectParagraph>

  <Hr />

  <div class="funding-notice">
    <p>
      <strong
        >Projekt Korona Kid je podržan sa € 4.997,00 financijske podrške Islanda, Lihtenštajna i
        Norveške u okviru EGP i Norveških grantova.</strong
      >
    </p>
    <img src="/images/projekti/korona-kid/ACF-logo-s.png" alt="Active Citizens Fund" />
  </div>

  <div class="hero-image">
    <img src="/images/projekti/korona-kid/kk_cover.png" alt="Korona Kid cover" />
  </div>
</TextWrapper>

<EpisodesSection playlistUrl="https://www.mixcloud.com/RadioRoza/playlists/korona-kid/" />

<style>
  .hero-image {
    margin: 1.5rem 0;
    text-align: center;
  }

  .hero-image img {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
  }

  .hero-image img.logo-centered {
    max-width: 200px;
  }

  .funding-notice {
    margin: 2rem 0;
    padding: 1.5rem;
    background: var(--light);
    border-radius: 8px;
    text-align: center;
  }

  .funding-notice p {
    margin: 0 0 1rem 0;
    font-size: 0.95rem;
    color: var(--dark);
  }

  .funding-notice img {
    max-width: 200px;
    height: auto;
  }
</style>
