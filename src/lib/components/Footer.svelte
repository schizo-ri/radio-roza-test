<footer>
  <div class="project">
    <p>Projekt je sufinancirala Europska unija iz Europskog socijalnog fonda.</p>
    <p>
      Izrada internet stranice sufinancirana je u okviru Operativnog programa Učinkoviti ljudski
      potencijali iz Europskog socijalnog fonda.
    </p>
    <p>Sadržaj komunikacije isključiva je odgovornost Udruge Ri Rock.</p>
    <p>
      <a class="link" href="https://strukturnifondovi.hr/">strukturnifondovi.hr</a> •
      <a class="link" href="http://www.esf.hr/">esf.hr</a>
    </p>
  </div>

  <ul class="socials">
    <li>
      <a href="https://facebook.com/radiorozha" class="social-icons">
        <span class="sr-only">Facebook</span>
        <img src="/icons/socials/facebook.svg" alt="Facebook" />
      </a>
    </li>
    <li>
      <a href="https://www.instagram.com/radio.rozari/" class="social-icons">
        <span class="sr-only">Instagram</span>
        <img src="/icons/socials/instagram.svg" alt="Instagram" />
      </a>
    </li>
    <li>
      <a href="https://mixcloud.com/RadioRoza" class="social-icons">
        <span class="sr-only">Mixcloud</span>
        <img src="/icons/socials/mixcloud.svg" alt="Mixcloud" />
      </a>
    </li>
    <li>
      <a href="https://youtube.com/@radioroza9811" class="social-icons">
        <span class="sr-only">YouTube</span>
        <img src="/icons/socials/youtube.svg" alt="YouTube" />
      </a>
    </li>
  </ul>

  <ul class="support">
    <li>
      <a target="_blank" rel="noopener noreferrer" href="https://www.zamp.hr/">
        <img src="/images/zamp.png" alt="Zamp" width="90px" />
      </a>
    </li>
    <li>
      <a target="_blank" rel="noopener noreferrer" href="https://www.pgz.hr/">
        <img src="/images/pgz.svg" width="90px" alt="Primorsko goranska županija" />
      </a>
    </li>
    <li>
      <a target="_blank" rel="noopener noreferrer" href="https://min-kulture.gov.hr/">
        <img src="/images/mk.svg" width="70px" alt="Ministarstvo kulture i medija" />
      </a>
    </li>
    <li>
      <a target="_blank" rel="noopener noreferrer" href="https://www.rijeka.hr/">
        <img src="/images/grad.png" width="70px" alt="ACF" />
      </a>
    </li>
  </ul>

  <p>
    <span>© {new Date().getFullYear()} - </span>
    <a class="link" href="https://www.mar-com.hr/">Mar-Com - Rijeka</a> • <span>Radio Roža</span>
  </p>
  <p>
    <a href="/impressum" class="link">Impressum</a> •
    <a href="/pravila-privatnosti" class="link">Pravila privatnosti</a>
  </p>

  <p>
    Izrađeno pomoću <a
      href="https://svelte.dev"
      target="_blank"
      rel="noopener noreferrer"
      class="link">Svelte 5</a
    >
    • Audio player pogoni
    <a href="https://hlsjs.video-dev.org" target="_blank" rel="noopener noreferrer" class="link"
      >HLS.js</a
    >
  </p>
</footer>

<style>
  footer {
    text-align: center;
    padding-top: 6rem;
    padding-bottom: 8rem;
    padding-left: 16px;
    padding-right: 16px;
    background-color: var(--tertiary-300);
  }

  p {
    margin-bottom: 0.5rem;
  }

  .link {
    text-decoration: none;
    font-weight: 800;
    color: var(--tertiary-900);
  }

  .link:hover {
    color: var(--tertiary-800);
    text-decoration: underline;
  }

  .project {
    margin-bottom: 2rem;
  }

  .socials {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    list-style: none;
    margin-bottom: 2rem;
  }

  .social-icons {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 64px;
    height: 64px;
  }

  .social-icons img {
    width: auto;
    height: 100%;
  }

  .support {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    list-style: none;
    margin-bottom: 2rem;
  }

  .support img {
    display: block;
  }
</style>
