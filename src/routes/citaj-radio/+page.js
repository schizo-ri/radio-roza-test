import { getArticles, getCategories, getAuthors } from '$lib/data/mockArticles.js';

export function load({ url }) {
  const kategorija = url.searchParams.get('kategorija');
  const tag = url.searchParams.get('tag');
  const autor = url.searchParams.get('autor');
  const featured = url.searchParams.get('featured') === 'true';
  const limit = parseInt(url.searchParams.get('limit')) || 8;

  const articles = getArticles({
    category: kategorija,
    tag: tag,
    author: autor,
    featured,
    limit
  });

  return {
    articles,
    categories: getCategories(),
    authors: getAuthors(),
    filters: {
      kategorija,
      tag,
      autor,
      featured
    },
    totalArticles: articles.length
  };
}
