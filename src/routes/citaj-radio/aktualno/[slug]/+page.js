import { error } from '@sveltejs/kit';
import { getArticle, getRelatedArticles, getCategory } from '$lib/data/articles.js';

export function load({ params }) {
  const article = getArticle(params.slug);

  if (!article) {
    throw error(404, {
      message: 'Clanak nije pronaden',
      details: `Clanak "${params.slug}" ne postoji.`,
    });
  }

  // Verify article belongs to this category
  if (article.category.slug !== 'aktualno') {
    throw error(404, {
      message: 'Clanak nije pronaden',
      details: `Clanak ne pripada ovoj kategoriji.`,
    });
  }

  const category = getCategory('aktualno');
  const relatedArticles = getRelatedArticles(article, 3);

  return {
    article,
    category,
    relatedArticles,
  };
}
