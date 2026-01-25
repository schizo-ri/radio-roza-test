import { getArticles, getCategory } from '$lib/data/articles.js';

export function load() {
  const category = getCategory('aktualno');
  const articles = getArticles({ category: 'aktualno' });

  return {
    category,
    articles,
  };
}
