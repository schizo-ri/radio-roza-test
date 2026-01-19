<script>
  import PageTitle from '$lib/components/PageTitle.svelte';
  import TextWrapper from '$lib/components/TextWrapper.svelte';
  import ProjectParagraph from '$lib/components/ProjectParagraph.svelte';
  import Hr from '$lib/components/Hr.svelte';
  import ProjectList from '$lib/components/ProjectList.svelte';
</script>

<svelte:head>
  <title>Projekt Odašiljač - Radio Roža</title>
  <meta
    name="description"
    content="Projekt Odašiljač okuplja novinare iz tri partnerske udruge: Udruge Ri Rock, S.O.S. Rijeka i Pariter. Cilj je izgradnja stručnih kadrova koji će adekvatno izvještavati o ranjivim skupinama."
  />
  <meta name="keywords" content="Odašiljač, Radio Roža, Rijeka, Europski socijalni fond" />
</svelte:head>

<PageTitle title="Projekt Odašiljač" />

<TextWrapper>
  <ProjectParagraph>
    Projekt Odašiljač okuplja novinare iz tri partnerske udruge: <strong
      >Udruge Ri Rock, S.O.S. Rijeka i Pariter.</strong
    >
    Cilj je izgradnja stručnih kadrova koji će adekvatno izvještavati o ranjivim skupinama unutar tri
    radijske emisije emitirane na riječkom radiju zajednice (Community radio) – Radio Roži. Putem emisija
    javnost će biti informirana o trima temama: djeca i mladi; rodna ravnopravnost, diskriminacija i
    ženska prava; žrtve nasilja.
  </ProjectParagraph>

  <Hr />

  <ProjectParagraph>
    <strong>Ciljevi i očekivani rezultati projekta:</strong>
  </ProjectParagraph>

  <ProjectParagraph>Projektom Odašiljač stvorit će se resursni preduvjeti za:</ProjectParagraph>

  <ProjectList>
    <li>
      Jačanje stručnih kapaciteta medijskih djelatnika putem usavršavanja i osposobljavanja za
      medijsko izvještavanje, vezano uz rodnu ravnopravnost, rodno uvjetovano nasilje, žrtve
      nasilja, komunikaciju s djecom i mladima, pristup mladima s teškoćama u učenju te pristup
      mladima koji imaju traumatična iskustva (bullying, verbalno zlostavljanje), ciljeve održivog
      razvoja, medijskog pristupa djeci i mladima romske nacionalne manjine
    </li>
    <li>Osiguranje stručnog, stalnog i stabilnog tima za razvoj programa</li>
    <li>Stvaranje preduvjeta za održivo djelovanje</li>
    <li>Povećanje vidljivosti</li>
    <li>Proizvodnju i objavu programskog sadržaja radija</li>
  </ProjectList>

  <Hr />

  <ProjectParagraph>
    <strong>Ukupna vrijednost projekta i iznos koji sufinancira EU</strong>
  </ProjectParagraph>

  <ProjectParagraph>
    Ukupna vrijednost projekta iznosi 1.385.072,28 HRK, od čega je 85% (1.177.311,44 HRK) osigurano
    iz Europskog socijalnog fonda, dok je preostalih 15% (207.760,84 HRK) osigurano iz Državnog
    proračuna Republike Hrvatske.
  </ProjectParagraph>

  <Hr />

  <ProjectParagraph>
    <strong>Razdoblje provedbe projekta:</strong> Od 21. kolovoza 2020. do 21. kolovoza 2022.
  </ProjectParagraph>

  <Hr />

  <ProjectParagraph>
    <strong>Kontakt osoba za više informacija:</strong> Marina Jakšić, voditeljica projekta, +385 99
    795 2969
  </ProjectParagraph>

  <Hr />

  <ProjectParagraph>
    <strong>Dodatno:</strong>
  </ProjectParagraph>

  <div class="links">
    <a href="https://strukturnifondovi.hr/" target="_blank" rel="noopener noreferrer">
      www.strukturnifondovi.hr
    </a>
    <a href="http://www.esf.hr/operativni-program/" target="_blank" rel="noopener noreferrer">
      www.esf.hr
    </a>
  </div>

  <div class="eu-notice">
    <p><strong>Projekt je sufinancirala Europska unija iz Europskog socijalnog fonda.</strong></p>
    <img
      src="/images/projekti/odasiljac/eu_logosi_odasiljac.png"
      alt="EU logotipi - Europski socijalni fond"
    />
  </div>
</TextWrapper>

<style>
  .links {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin: 1rem 0;
  }

  .links a {
    color: var(--primary-600);
    text-decoration: none;
    font-size: 1rem;
  }

  .links a:hover {
    text-decoration: underline;
    color: var(--primary-800);
  }

  .eu-notice {
    margin-top: 2rem;
    padding: 1.5rem;
    background: var(--light);
    border-radius: 8px;
    text-align: center;
  }

  .eu-notice p {
    margin: 0 0 1.5rem 0;
    font-size: 1rem;
    color: var(--dark);
  }

  .eu-notice img {
    max-width: 100%;
    height: auto;
  }
</style>
