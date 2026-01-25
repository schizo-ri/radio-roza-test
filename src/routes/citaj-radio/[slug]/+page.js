import { redirect } from '@sveltejs/kit';
import { getArticle } from '$lib/data/articles.js';

export function load({ params }) {
  const article = getArticle(params.slug);

  if (article) {
    // Redirect to the new nested URL structure
    throw redirect(301, `/citaj-radio/${article.category.slug}/${article.slug}`);
  }

  // If no article found, let it fall through to 404
  return {};
}
