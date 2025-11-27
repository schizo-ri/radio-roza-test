<script>
	let {
		title,
		excerpt,
		imageUrl,
		author,
		publishedAt,
		category,
		readTime,
		href = '#',
		class: className = '',
		...restProps
	} = $props();

	// Format date
	const formatDate = (dateString) => {
		const date = new Date(dateString);
		return date.toLocaleDateString('hr-HR', {
			day: 'numeric',
			month: 'short',
			year: 'numeric'
		});
	};
</script>

<article class="news-card {className}" {...restProps}>
	<a {href} class="card-link">
		{#if imageUrl}
			<div class="image-container">
				<img src={imageUrl} alt={title} loading="lazy" />
				{#if category}
					<span class="category-badge">{category}</span>
				{/if}
			</div>
		{/if}

		<div class="content">
			<h3 class="title">{title}</h3>

			{#if excerpt}
				<p class="excerpt">{excerpt}</p>
			{/if}

			<div class="meta">
				{#if author}
					<span class="author">{author}</span>
				{/if}

				{#if publishedAt}
					<time class="date" datetime={publishedAt}>
						{formatDate(publishedAt)}
					</time>
				{/if}

				{#if readTime}
					<span class="read-time">{readTime} min čitanja</span>
				{/if}
			</div>
		</div>
	</a>
</article>

<style>
	.news-card {
		background: white;
		border-radius: 12px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
		overflow: hidden;
		transition: transform 0.2s ease, box-shadow 0.2s ease;
		min-width: 300px;
		max-width: 400px;
		height: fit-content;
	}

	.news-card:hover {
		transform: translateY(-2px);
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
	}

	.card-link {
		display: block;
		text-decoration: none;
		color: inherit;
		height: 100%;
	}

	.image-container {
		position: relative;
		width: 100%;
		height: 200px;
		overflow: hidden;
	}

	.image-container img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform 0.3s ease;
	}

	.news-card:hover .image-container img {
		transform: scale(1.05);
	}

	.category-badge {
		position: absolute;
		top: 12px;
		left: 12px;
		background: rgba(0, 0, 0, 0.8);
		color: white;
		padding: 4px 12px;
		border-radius: 20px;
		font-size: 0.75rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.5px;
	}

	.content {
		padding: 20px;
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	.title {
		font-size: 1.25rem;
		font-weight: 700;
		line-height: 1.4;
		margin: 0;
		color: #1a1a1a;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.excerpt {
		font-size: 0.9rem;
		line-height: 1.5;
		color: #666;
		margin: 0;
		display: -webkit-box;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.meta {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
		font-size: 0.8rem;
		color: #888;
		margin-top: auto;
	}

	.author {
		font-weight: 600;
		color: #555;
	}

	.date {
		color: #888;
	}

	.read-time {
		color: #888;
	}

	.meta > *:not(:last-child)::after {
		content: '•';
		margin-left: 8px;
		color: #ccc;
	}

	/* Responsive design */
	@media (max-width: 768px) {
		.news-card {
			min-width: 280px;
			max-width: 350px;
		}

		.image-container {
			height: 180px;
		}

		.content {
			padding: 16px;
		}

		.title {
			font-size: 1.1rem;
		}

		.excerpt {
			font-size: 0.85rem;
		}
	}
</style>
