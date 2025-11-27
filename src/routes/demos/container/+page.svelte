<script>
	import { Container, HorizontalScroller, NewsCard } from '$lib';

	// Sample news data
	const newsData = [
		{
			id: 1,
			title: 'Nova emisija na Radio Rozi',
			excerpt: 'Pridružite nam se u novoj emisiji koja donosi najnovije vijesti iz svijeta glazbe.',
			imageUrl: 'https://picsum.photos/400/200?random=1',
			author: 'Marko Marić',
			publishedAt: '2024-01-15',
			category: 'Glazba',
			readTime: 3,
			href: '#'
		},
		{
			id: 2,
			title: 'Intervju s poznatim glazbenikom',
			excerpt: 'Ekskluzivni razgovor s jednim od najpoznatijih hrvatskih glazbenika o novom albumu.',
			imageUrl: 'https://picsum.photos/400/200?random=2',
			author: 'Ana Anić',
			publishedAt: '2024-01-14',
			category: 'Intervju',
			readTime: 5,
			href: '#'
		},
		{
			id: 3,
			title: 'Festival glazbe u Zagrebu',
			excerpt: 'Najavljujemo veliki festival koji će se održati ovog ljeta u glavnom gradu.',
			imageUrl: 'https://picsum.photos/400/200?random=3',
			author: 'Petar Perić',
			publishedAt: '2024-01-13',
			category: 'Događaji',
			readTime: 4,
			href: '#'
		},
		{
			id: 4,
			title: 'Tehnologija u radio produkciji',
			excerpt: 'Kako nova tehnologija mijenja način na koji stvaramo i emitiramo radio sadržaj.',
			imageUrl: 'https://picsum.photos/400/200?random=4',
			author: 'Ivana Ivanović',
			publishedAt: '2024-01-12',
			category: 'Tehnologija',
			readTime: 6,
			href: '#'
		},
		{
			id: 5,
			title: 'Historia radio stanice',
			excerpt: 'Putovanje kroz povijest naše radio stanice i najvažnije trenutke.',
			imageUrl: 'https://picsum.photos/400/200?random=5',
			author: 'Tomislav Tomić',
			publishedAt: '2024-01-11',
			category: 'Historia',
			readTime: 7,
			href: '#'
		},
		{
			id: 6,
			title: 'Mladi talenti na sceni',
			excerpt: 'Predstavljamo mlade glazbenike koji će definirati budućnost hrvatske glazbe.',
			imageUrl: 'https://picsum.photos/400/200?random=6',
			author: 'Maja Majić',
			publishedAt: '2024-01-10',
			category: 'Talenti',
			readTime: 4,
			href: '#'
		}
	];

	const products = [
		{
			id: 1,
			name: 'Radio Roza majica',
			price: '120 kn',
			image: 'https://picsum.photos/300/300?random=7'
		},
		{
			id: 2,
			name: 'Radio Roza šalica',
			price: '45 kn',
			image: 'https://picsum.photos/300/300?random=8'
		},
		{
			id: 3,
			name: 'Radio Roza torba',
			price: '85 kn',
			image: 'https://picsum.photos/300/300?random=9'
		},
		{
			id: 4,
			name: 'Radio Roza kapa',
			price: '65 kn',
			image: 'https://picsum.photos/300/300?random=10'
		},
		{
			id: 5,
			name: 'Radio Roza naljepnica',
			price: '15 kn',
			image: 'https://picsum.photos/300/300?random=11'
		}
	];
</script>

<svelte:head>
	<title>Container & Horizontal Scroller Demo - Radio Roza</title>
	<meta name="description" content="Demo stranica za Container i HorizontalScroller komponente" />
</svelte:head>

<main>
	<!-- Hero sekcija s ograničenim sadržajem -->
	<section class="hero">
		<Container>
			<div class="hero-content">
				<h1>Container & Horizontal Scroller Demo</h1>
				<p>
					Ova stranica demonstrira kako koristiti Container komponentu za ograničavanje širine
					sadržaja i HorizontalScroller komponentu za horizontalne skrolere koji mogu
					"overflowati" izvan kontejnera.
				</p>
			</div>
		</Container>
	</section>

	<!-- Sekcija s vijestima - horizontalni skroler -->
	<section class="news-section">
		<Container>
			<h2>Najnovije vijesti</h2>
			<p>Skrolirajte horizontalno da vidite sve vijesti</p>
		</Container>

		<Container allowOverflow={true}>
			<HorizontalScroller gap="1.5rem" itemMinWidth="320px" showScrollbar={false}>
				{#each newsData as news (news.id)}
					<div class="scroll-item">
						<NewsCard {...news} />
					</div>
				{/each}
			</HorizontalScroller>
		</Container>
	</section>

	<!-- Obični sadržaj s ograničenim kontejnerom -->
	<section class="content-section">
		<Container>
			<h2>O našoj radio stanici</h2>
			<div class="text-content">
				<p>
					Radio Roza je moderna radio stanica koja već godinama donosi kvalitetan
					sadržaj svojoj publici. Naš tim stručnjaka radi na tome da vam pružimo
					najbolje moguće iskustvo slušanja.
				</p>
				<p>
					Ova Container komponenta automatski ograničava širinu sadržaja na maksimalno
					1200px i centrira ga na stranici. Na manjim ekranima, komponenta se prilagođava
					širini ekrana s odgovarajućim paddingom.
				</p>
			</div>
		</Container>
	</section>

	<!-- Još jedan horizontalni skroler s proizvodima -->
	<section class="products-section">
		<Container>
			<h2>Radio Roza shop</h2>
			<p>Pronađite naše ekskluzivne proizvode</p>
		</Container>

		<Container allowOverflow={true}>
			<HorizontalScroller
				gap="1rem"
				itemMinWidth="250px"
				snapToItems={true}
				showScrollbar={true}
			>
				{#each products as product (product.id)}
					<div class="scroll-item product-card">
						<img src={product.image} alt={product.name} />
						<div class="product-info">
							<h3>{product.name}</h3>
							<p class="price">{product.price}</p>
							<button class="btn">Dodaj u košaricu</button>
						</div>
					</div>
				{/each}
			</HorizontalScroller>
		</Container>
	</section>

	<!-- Tekst koji objašnjava pristup -->
	<section class="explanation-section">
		<Container>
			<h2>Kako funkcionira?</h2>
			<div class="explanation-grid">
				<div class="explanation-card">
					<h3>Container komponenta</h3>
					<ul>
						<li><strong>max-width:</strong> Ograničava širinu na 1200px</li>
						<li><strong>margin: 0 auto:</strong> Centrira kontejner</li>
						<li><strong>padding:</strong> Dodaje prazan prostor s obje strane</li>
						<li><strong>allowOverflow:</strong> Omogućava sadržaju da "pobjegne"</li>
					</ul>
				</div>
				<div class="explanation-card">
					<h3>HorizontalScroller</h3>
					<ul>
						<li><strong>Negativni margin:</strong> Proširuje do ruba ekrana</li>
						<li><strong>Vlastiti padding:</strong> Održava prazan prostor</li>
						<li><strong>overflow-x: auto:</strong> Omogućava horizontalni skrol</li>
						<li><strong>Snap scroll:</strong> Opcionalno lijepljenje na stavke</li>
					</ul>
				</div>
			</div>
		</Container>
	</section>

	<!-- Footer -->
	<footer>
		<Container>
			<p>&copy; 2024 Radio Roza. Sva prava pridržana.</p>
		</Container>
	</footer>
</main>

<style>
	main {
		min-height: 100vh;
	}

	.hero {
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		color: white;
		padding: 4rem 0;
	}

	.hero-content {
		text-align: center;
		max-width: 800px;
		margin: 0 auto;
	}

	.hero h1 {
		font-size: 3rem;
		margin-bottom: 1rem;
		font-weight: 700;
	}

	.hero p {
		font-size: 1.25rem;
		line-height: 1.6;
		margin: 0;
		opacity: 0.9;
	}

	.news-section,
	.content-section,
	.products-section,
	.explanation-section {
		padding: 4rem 0;
	}

	.news-section {
		background: #f8f9fa;
	}

	.products-section {
		background: #f8f9fa;
	}

	.news-section h2,
	.content-section h2,
	.products-section h2,
	.explanation-section h2 {
		font-size: 2.5rem;
		margin-bottom: 0.5rem;
		color: #1a1a1a;
	}

	.news-section p,
	.products-section p {
		font-size: 1.1rem;
		color: #666;
		margin-bottom: 2rem;
	}

	.text-content {
		max-width: 800px;
		margin: 2rem 0;
	}

	.text-content p {
		font-size: 1.1rem;
		line-height: 1.7;
		margin-bottom: 1.5rem;
		color: #333;
	}

	.product-card {
		background: white;
		border-radius: 12px;
		overflow: hidden;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
		transition: transform 0.2s ease;
		min-width: 250px;
	}

	.product-card:hover {
		transform: translateY(-2px);
	}

	.product-card img {
		width: 100%;
		height: 200px;
		object-fit: cover;
	}

	.product-info {
		padding: 1.5rem;
	}

	.product-info h3 {
		font-size: 1.25rem;
		margin-bottom: 0.5rem;
		color: #1a1a1a;
	}

	.price {
		font-size: 1.5rem;
		font-weight: 700;
		color: #667eea;
		margin-bottom: 1rem;
	}

	.btn {
		background: #667eea;
		color: white;
		border: none;
		padding: 0.75rem 1.5rem;
		border-radius: 6px;
		cursor: pointer;
		font-size: 1rem;
		font-weight: 600;
		transition: background 0.2s ease;
		width: 100%;
	}

	.btn:hover {
		background: #5a67d8;
	}

	.explanation-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 2rem;
		margin-top: 2rem;
	}

	.explanation-card {
		background: white;
		padding: 2rem;
		border-radius: 12px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
	}

	.explanation-card h3 {
		font-size: 1.5rem;
		margin-bottom: 1rem;
		color: #1a1a1a;
	}

	.explanation-card ul {
		list-style: none;
		padding: 0;
	}

	.explanation-card li {
		padding: 0.5rem 0;
		border-bottom: 1px solid #eee;
		font-size: 1rem;
		line-height: 1.5;
	}

	.explanation-card li:last-child {
		border-bottom: none;
	}

	footer {
		background: #1a1a1a;
		color: white;
		padding: 2rem 0;
		text-align: center;
	}

	/* Responsive design */
	@media (max-width: 768px) {
		.hero h1 {
			font-size: 2rem;
		}

		.hero p {
			font-size: 1.1rem;
		}

		.news-section h2,
		.content-section h2,
		.products-section h2,
		.explanation-section h2 {
			font-size: 2rem;
		}

		.news-section,
		.content-section,
		.products-section,
		.explanation-section {
			padding: 2rem 0;
		}
	}
</style>
