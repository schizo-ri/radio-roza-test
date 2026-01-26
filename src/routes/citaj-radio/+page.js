import { getArticles, getCategories, getAuthors } from '$lib/data/articles.js';

export function load({ url }) {
  const kategorija = url.searchParams.get('kategorija');
  const tags = url.searchParams.getAll('tag'); // Support multiple tags
  const autor = url.searchParams.get('autor');
  const featuredParam = url.searchParams.get('featured');
  const limit = parseInt(url.searchParams.get('limit')) || 20;

  const articles = getArticles({
    category: kategorija,
    tags: tags.length > 0 ? tags : undefined, // Pass array of tags
    author: autor,
    // Only filter by featured if explicitly set in URL
    ...(featuredParam !== null ? { featured: featuredParam === 'true' } : {}),
    limit,
  });

  return {
    articles,
    categories: getCategories(),
    authors: getAuthors(),
    filters: {
      kategorija,
      tags, // Now an array
      autor,
      featured: featuredParam,
    },
    totalArticles: articles.length,
  };
}
