<script>
  import { onMount } from 'svelte';
  import { getArticleStats } from '$lib/data/mockArticles.js';

  let stats = {};

  onMount(() => {
    stats = getArticleStats();
  });
</script>

<svelte:head>
  <title>Demo Pages - Roza</title>
  <meta name="description" content="Demo pages showcasing mock data systems for CMS development." />
</svelte:head>

<div class="demo-home">
  <header class="hero">
    <h1>Demo Pages</h1>
    <p class="hero-subtitle">
      Explore mock data systems and components for rapid CMS development
    </p>
  </header>

  <main class="content">
    <section class="demo-cards">
      <div class="card featured">
        <div class="card-header">
          <h2>📝 Mock Articles System</h2>
          <span class="status-badge">Ready</span>
        </div>

        <p class="card-description">
          Complete article management system with rich content, authors, categories, tags, and media embeds.
          Perfect for testing CMS functionality before backend implementation.
        </p>

        <div class="stats-mini">
          <div class="stat">
            <span class="stat-number">{stats.totalArticles || 0}</span>
            <span class="stat-label">Articles</span>
          </div>
          <div class="stat">
            <span class="stat-number">{stats.authors || 0}</span>
            <span class="stat-label">Authors</span>
          </div>
          <div class="stat">
            <span class="stat-number">{stats.categories || 0}</span>
            <span class="stat-label">Categories</span>
          </div>
        </div>

        <div class="features-list">
          <span class="feature">🖼️ Responsive Images</span>
          <span class="feature">🎵 Media Embeds</span>
          <span class="feature">🔍 SEO Ready</span>
          <span class="feature">⭐ Featured Content</span>
          <span class="feature">🏷️ Tags & Categories</span>
          <span class="feature">👤 Author Profiles</span>
        </div>

        <div class="card-actions">
          <a href="/demo/articles" class="button primary">
            View Articles Demo
          </a>
          <a href="/demo/articles/resurgence-modular-synthesis-contemporary-electronic" class="button secondary">
            Sample Article
          </a>
        </div>
      </div>

      <div class="card placeholder">
        <div class="card-header">
          <h2>🛍️ E-commerce System</h2>
          <span class="status-badge coming-soon">Coming Soon</span>
        </div>

        <p class="card-description">
          Complete product catalog with categories, variations, inventory, and shopping cart functionality.
        </p>

        <div class="placeholder-content">
          <div class="placeholder-icon">🚧</div>
          <p>Product listings, cart management, checkout flow, and order tracking.</p>
        </div>

        <div class="card-actions">
          <button class="button disabled" disabled>
            Coming Soon
          </button>
        </div>
      </div>

      <div class="card placeholder">
        <div class="card-header">
          <h2>👥 User Management</h2>
          <span class="status-badge coming-soon">Coming Soon</span>
        </div>

        <p class="card-description">
          User authentication, profiles, roles, and permissions system with social login integration.
        </p>

        <div class="placeholder-content">
          <div class="placeholder-icon">🚧</div>
          <p>User registration, authentication flows, profile management, and role-based access.</p>
        </div>

        <div class="card-actions">
          <button class="button disabled" disabled>
            Coming Soon
          </button>
        </div>
      </div>

      <div class="card placeholder">
        <div class="card-header">
          <h2>📊 Analytics Dashboard</h2>
          <span class="status-badge coming-soon">Coming Soon</span>
        </div>

        <p class="card-description">
          Interactive charts, metrics tracking, and data visualization components for admin interfaces.
        </p>

        <div class="placeholder-content">
          <div class="placeholder-icon">🚧</div>
          <p>Charts, graphs, KPI widgets, and real-time data visualization.</p>
        </div>

        <div class="card-actions">
          <button class="button disabled" disabled>
            Coming Soon
          </button>
        </div>
      </div>
    </section>

    <section class="info-section">
      <h2>About Demo Pages</h2>
      <div class="info-grid">
        <div class="info-card">
          <h3>🎯 Purpose</h3>
          <p>
            Demo pages provide realistic mock data and components to test your application's
            UI and functionality before implementing a real backend or CMS.
          </p>
        </div>

        <div class="info-card">
          <h3>🔧 Development</h3>
          <p>
            Perfect for rapid prototyping, client presentations, and frontend development
            when backend services aren't ready yet.
          </p>
        </div>

        <div class="info-card">
          <h3>📱 Responsive</h3>
          <p>
            All demo components are fully responsive and work across desktop, tablet,
            and mobile devices with modern design patterns.
          </p>
        </div>

        <div class="info-card">
          <h3>♿ Accessible</h3>
          <p>
            Built with accessibility in mind, including proper ARIA labels, semantic HTML,
            and keyboard navigation support.
          </p>
        </div>
      </div>
    </section>
  </main>
</div>

<style>
  .demo-home {
    min-height: 100vh;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    padding: 2rem 1rem;
  }

  .hero {
    text-align: center;
    color: white;
    margin-bottom: 4rem;
  }

  .hero h1 {
    font-size: 4rem;
    margin: 0 0 1rem 0;
    font-weight: 700;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  }

  .hero-subtitle {
    font-size: 1.5rem;
    margin: 0;
    opacity: 0.9;
    font-weight: 300;
  }

  .content {
    max-width: 1200px;
    margin: 0 auto;
  }

  .demo-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 2rem;
    margin-bottom: 4rem;
  }

  .card {
    background: white;
    border-radius: 16px;
    padding: 2rem;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  .card:hover {
    transform: translateY(-4px);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
  }

  .card.featured {
    border: 3px solid #fbbf24;
    position: relative;
  }

  .card.featured::before {
    content: "⭐ Featured";
    position: absolute;
    top: -12px;
    left: 2rem;
    background: #fbbf24;
    color: white;
    padding: 0.25rem 0.75rem;
    border-radius: 12px;
    font-size: 0.75rem;
    font-weight: 600;
  }

  .card.placeholder {
    opacity: 0.7;
    background: #f8fafc;
  }

  .card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;
  }

  .card-header h2 {
    margin: 0;
    color: #1f2937;
    font-size: 1.5rem;
  }

  .status-badge {
    padding: 0.25rem 0.75rem;
    border-radius: 12px;
    font-size: 0.75rem;
    font-weight: 600;
  }

  .status-badge:not(.coming-soon) {
    background: #10b981;
    color: white;
  }

  .status-badge.coming-soon {
    background: #f59e0b;
    color: white;
  }

  .card-description {
    color: #6b7280;
    line-height: 1.6;
    margin-bottom: 1.5rem;
  }

  .stats-mini {
    display: flex;
    gap: 1rem;
    margin-bottom: 1.5rem;
    padding: 1rem;
    background: #f9fafb;
    border-radius: 8px;
  }

  .stat {
    text-align: center;
  }

  .stat-number {
    display: block;
    font-size: 1.5rem;
    font-weight: 700;
    color: #3b82f6;
  }

  .stat-label {
    font-size: 0.75rem;
    color: #6b7280;
    font-weight: 500;
  }

  .features-list {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 2rem;
  }

  .feature {
    background: #e0f2fe;
    color: #0369a1;
    padding: 0.25rem 0.75rem;
    border-radius: 16px;
    font-size: 0.75rem;
    font-weight: 500;
  }

  .placeholder-content {
    text-align: center;
    padding: 2rem 1rem;
    margin-bottom: 2rem;
  }

  .placeholder-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
  }

  .placeholder-content p {
    color: #9ca3af;
    font-style: italic;
  }

  .card-actions {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
  }

  .button {
    padding: 0.75rem 1.5rem;
    border-radius: 8px;
    text-decoration: none;
    font-weight: 600;
    transition: all 0.2s;
    border: none;
    cursor: pointer;
    font-size: 0.875rem;
  }

  .button.primary {
    background: #3b82f6;
    color: white;
  }

  .button.primary:hover {
    background: #2563eb;
    transform: translateY(-1px);
  }

  .button.secondary {
    background: #e5e7eb;
    color: #374151;
  }

  .button.secondary:hover {
    background: #d1d5db;
    transform: translateY(-1px);
  }

  .button.disabled {
    background: #d1d5db;
    color: #9ca3af;
    cursor: not-allowed;
  }

  .info-section {
    background: white;
    padding: 3rem 2rem;
    border-radius: 16px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  }

  .info-section h2 {
    text-align: center;
    color: #1f2937;
    margin: 0 0 2rem 0;
    font-size: 2rem;
  }

  .info-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
  }

  .info-card {
    text-align: center;
  }

  .info-card h3 {
    color: #1f2937;
    margin: 0 0 1rem 0;
    font-size: 1.25rem;
  }

  .info-card p {
    color: #6b7280;
    line-height: 1.6;
    margin: 0;
  }

  @media (max-width: 768px) {
    .hero h1 {
      font-size: 2.5rem;
    }

    .hero-subtitle {
      font-size: 1.25rem;
    }

    .demo-cards {
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }

    .card {
      padding: 1.5rem;
    }

    .card-actions {
      flex-direction: column;
    }

    .button {
      text-align: center;
    }

    .stats-mini {
      flex-direction: column;
      gap: 0.5rem;
    }

    .info-section {
      padding: 2rem 1rem;
    }

    .info-grid {
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }
  }
</style>
