<svelte:head>
  <title>Kontakt - Radio Roža</title>
  <meta name="description" content="Kontaktirajte Radio Rožu - nezavisnu riječku internetsku radio stanicu." />
</svelte:head>

<div class="kontakt-container">
  <h1>Kontakt</h1>

  <section class="contact-section">
    <h2>E-mail</h2>
    <dl class="contact-list">
      <dt>Redakcija:</dt>
      <dd><a href="mailto:redakcija.radioroza@gmail.com">redakcija.radioroza@gmail.com</a></dd>

      <dt>Glazbeno uredništvo:</dt>
      <dd><a href="mailto:glazba.radioroza@gmail.com">glazba.radioroza@gmail.com</a></dd>

      <dt>Općenito:</dt>
      <dd><a href="mailto:radio.rozari@gmail.com">radio.rozari@gmail.com</a></dd>
    </dl>
  </section>

  <section class="contact-section">
    <h2>Kontakti</h2>
    <div class="people-grid">
      <div class="person-card">
        <h3>Davor Popdankovski</h3>
        <p class="role">Glavni urednik</p>
      </div>

      <div class="person-card">
        <h3>Sebastijan Tomažin</h3>
        <p class="role">Audio tehničar i tonac</p>
        <a href="mailto:tomazin.sebastijan@gmail.com">tomazin.sebastijan@gmail.com</a>
      </div>

      <div class="person-card">
        <h3>Edin Vesković</h3>
        <p class="role">WEB & Informatička podrška</p>
        <a href="mailto:edin.lockedin@gmail.com">edin.lockedin@gmail.com</a>
      </div>
    </div>
  </section>

  <section class="contact-section">
    <h2>Pratite nas</h2>
    <div class="social-links">
      <a href="https://facebook.com/radiorozha" class="social-link" target="_blank" rel="noopener noreferrer">
        <img src="/icons/socials/facebook.svg" alt="" width="24" height="24" />
        <span>Facebook</span>
      </a>
      <a href="https://www.instagram.com/radio.rozari/" class="social-link" target="_blank" rel="noopener noreferrer">
        <img src="/icons/socials/instagram.svg" alt="" width="24" height="24" />
        <span>Instagram</span>
      </a>
      <a href="https://mixcloud.com/RadioRoza" class="social-link" target="_blank" rel="noopener noreferrer">
        <img src="/icons/socials/mixcloud.svg" alt="" width="24" height="24" />
        <span>Mixcloud</span>
      </a>
      <a href="https://youtube.com/@radioroza9811" class="social-link" target="_blank" rel="noopener noreferrer">
        <img src="/icons/socials/youtube.svg" alt="" width="24" height="24" />
        <span>YouTube</span>
      </a>
    </div>
  </section>
</div>

<style>
  .kontakt-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem;
  }

  h1 {
    text-align: center;
    margin-bottom: 2.5rem;
    color: var(--dark);
    font-family: var(--display-font);
    font-size: 2.5rem;
    font-weight: 800;
  }

  .contact-section {
    margin-bottom: 3rem;
  }

  h2 {
    color: var(--primary-700);
    font-size: 1.4rem;
    font-weight: 600;
    margin-bottom: 1.25rem;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid var(--primary-100);
  }

  .contact-list {
    background: var(--light);
    border-radius: 8px;
    padding: 1.5rem 2rem;
  }

  dt {
    font-weight: 600;
    color: var(--dark);
    margin-top: 1rem;
    margin-bottom: 0.25rem;
  }

  dt:first-child {
    margin-top: 0;
  }

  dd {
    margin-left: 0;
    color: var(--muted);
  }

  dd a {
    color: var(--primary-600);
    text-decoration: none;
    transition: color 0.15s ease;
  }

  dd a:hover {
    color: var(--primary-800);
    text-decoration: underline;
  }

  .people-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 1rem;
  }

  .person-card {
    background: var(--light);
    border-radius: 8px;
    padding: 1.25rem 1.5rem;
    transition: box-shadow 0.2s ease;
  }

  .person-card:hover {
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  }

  .person-card h3 {
    font-size: 1.1rem;
    font-weight: 600;
    color: var(--dark);
    margin: 0 0 0.25rem 0;
  }

  .person-card .role {
    font-size: 0.9rem;
    color: var(--muted);
    margin: 0 0 0.5rem 0;
  }

  .person-card a {
    font-size: 0.9rem;
    color: var(--primary-600);
    text-decoration: none;
    word-break: break-all;
  }

  .person-card a:hover {
    color: var(--primary-800);
    text-decoration: underline;
  }

  .social-links {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
  }

  .social-link {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.25rem;
    background: var(--light);
    border-radius: 8px;
    text-decoration: none;
    color: var(--dark);
    font-weight: 500;
    transition: background-color 0.15s ease, transform 0.15s ease;
  }

  .social-link:hover {
    background: var(--primary-100);
    transform: translateY(-2px);
  }

  .social-link img {
    width: 24px;
    height: 24px;
  }

  @media (max-width: 600px) {
    .kontakt-container {
      padding: 1.5rem 1rem;
    }

    h1 {
      font-size: 2rem;
    }

    .contact-list {
      padding: 1rem 1.25rem;
    }

    .people-grid {
      grid-template-columns: 1fr;
    }

    .social-links {
      flex-direction: column;
    }

    .social-link {
      justify-content: center;
    }
  }
</style>
