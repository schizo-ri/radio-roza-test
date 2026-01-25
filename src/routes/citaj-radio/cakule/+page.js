import { getArticles, getCategory } from '$lib/data/articles.js';

export function load() {
  const category = getCategory('cakule');
  const articles = getArticles({ category: 'cakule' });

  return {
    category,
    articles,
  };
}
