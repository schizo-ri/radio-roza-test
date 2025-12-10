<script>
  const { title, href } = $props();
</script>

<section>
  <a {href}>{title}</a>
</section>

<style>
  section {
    width: clamp(300px, 600px, 90cqw);
    margin: 0 auto;
  }

  a {
    display: block;
    width: min-content;
    white-space: nowrap;
    padding: 2rem 3rem;
    border-radius: 1rem;
    transform-origin: left top;
    transform: skewX(0deg);
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    cursor: pointer;
    font-family: var(--display-font);
    font-weight: 800;
    font-size: 2.25rem;
    text-decoration: none;
    margin-bottom: 2rem;
    /*box-shadow:
      0 4px 6px -1px rgb(0 0 0 / 0.1),
      0 2px 4px -2px rgb(0 0 0 / 0.1);*/
  }

  section:nth-child(odd) a {
    color: var(--primary-700);
    border: 4px solid var(--primary-700);
    animation: slideInLeftSkew 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
  }

  section:nth-child(odd) a:hover {
    box-shadow:
      0 20px 25px -5px rgb(0 0 0 / 0.1),
      0 8px 10px -6px rgb(0 0 0 / 0.1);
    background-color: var(--primary-50);
  }

  section:nth-child(even) a {
    color: var(--secondary-700);
    border: 4px solid var(--secondary-700);
    margin-left: auto;
    animation: slideInRightSkew 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
  }

  section:nth-child(even) a:hover {
    box-shadow:
      0 20px 25px -5px rgb(0 0 0 / 0.1),
      0 8px 10px -6px rgb(0 0 0 / 0.1);
    background-color: var(--secondary-50);
  }

  @keyframes slideInLeftSkew {
    from {
      transform: skewX(0deg);
    }
    to {
      transform: skewX(5deg);
    }
  }

  @keyframes slideInRightSkew {
    from {
      transform: skewX(0deg);
    }
    to {
      transform: skewX(-5deg);
    }
  }

  @media (min-width: 600px) {
    a {
      font-size: 3rem;
    }
  }
</style>
