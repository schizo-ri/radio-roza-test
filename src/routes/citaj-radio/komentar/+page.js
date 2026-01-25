import { getArticles, getCategory } from '$lib/data/articles.js';

export function load() {
  const category = getCategory('komentar');
  const articles = getArticles({ category: 'komentar' });

  return {
    category,
    articles,
  };
}
