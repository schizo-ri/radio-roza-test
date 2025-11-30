<svelte:head>
  <title>Impressum - Radio Roza</title>
</svelte:head>

<div class="impressum-container">
  <h2>Impressum</h2>

  <dl class="impressum-list">
    <dt>Nakladnik:</dt>
    <dd>Udruga Ri Rock, Delta 5, 51000 Rijeka, Hrvatska</dd>

    <dt>Za nakladnika:</dt>
    <dd>Jelena Martinčić, <a href="mailto:jelena@leprinka.hr">jelena@leprinka.hr</a></dd>

    <dt>E-mail redakcije:</dt>
    <dd><a href="mailto:radiorozari@gmail.com">radiorozari@gmail.com</a></dd>

    <dt>Glavni urednik:</dt>
    <dd>Davor Popdankovski, <a href="mailto:davor.poppy@gmail.com">davor.poppy@gmail.com</a></dd>

    <dt>Redakcija:</dt>
    <dd>Sebastijan Tomažin, Marina Jakšić, Ivan Dragnić, Martina Blečić, Edin Vesković</dd>

    <dt>Informatička podrška:</dt>
    <dd>
      David Dubrović, (ANTERES) <a href="mailto:info@antares.hr">info@antares.hr</a>
    </dd>
  </dl>
</div>

<style>
  .impressum-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem;
    font-size: 1.1rem;
  }

  h2 {
    text-align: center;
    margin-bottom: 2rem;
    color: #333;
    font-size: 2rem;
  }

  .impressum-list {
    background: #f9f9f9;
    border-radius: 8px;
    padding: 2rem;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }

  dt {
    font-weight: bold;
    color: #2c3e50;
    margin-top: 1.5rem;
    margin-bottom: 0.5rem;
    font-size: 1.2rem;
  }

  dt:first-child {
    margin-top: 0;
  }

  dd {
    margin-left: 1rem;
    margin-bottom: 0.5rem;
    line-height: 1.6;
    color: #555;
  }

  a {
    color: var(--primary-800);
    text-decoration: none;
    transition: color 0.1s ease;
  }

  a:hover {
    color: var(--primary-600);
    text-decoration: underline;
  }

  /* Responsive design */
  @media (max-width: 768px) {
    .impressum-container {
      padding: 1rem;
    }

    .impressum-list {
      padding: 1.5rem;
    }

    h2 {
      font-size: 1.5rem;
    }

    dt {
      font-size: 1.1rem;
    }

    dd {
      margin-left: 0.5rem;
    }
  }
</style>
