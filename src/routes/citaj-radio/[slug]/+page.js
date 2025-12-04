import { error } from '@sveltejs/kit';
import { getArticle } from '$lib/data/mockArticles.js';

export function load({ params }) {
  const article = getArticle(params.slug);

  if (!article) {
    throw error(404, {
      message: 'Article not found',
      details: `The article with slug "${params.slug}" could not be found.`,
    });
  }

  return {
    article,
  };
}
