import { getArticles, getCategories, getAuthors } from '$lib/data/articles.js';

export function load({ url }) {
  const kategorija = url.searchParams.get('kategorija');
  const tag = url.searchParams.get('tag');
  const autor = url.searchParams.get('autor');
  const featuredParam = url.searchParams.get('featured');
  const limit = parseInt(url.searchParams.get('limit')) || 16;

  const articles = getArticles({
    category: kategorija,
    tag: tag,
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
      tag,
      autor,
      featured: featuredParam,
    },
    totalArticles: articles.length,
  };
}
