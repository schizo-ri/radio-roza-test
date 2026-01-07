// Mock API for Radio Roža
// Glavni entry point za sve mock podatke i API simulacije

import { users, getUserById, getUserByUsername, getUserByEmail, getActiveUsers, getUsersByRole } from './users.js';
import { authors, getAuthorById, getAuthorBySlug, getAuthorByUserId, getActiveAuthors, getGuestAuthors, getAuthorFullName, getAuthorsWithShows } from './authors.js';
import { shows, getShowById, getShowBySlug, getActiveShows, getShowsByType, getShowsByHost, getLiveShows } from './shows.js';
import { episodes, episodeAuthors, getEpisodeById, getEpisodeBySlug, getEpisodesByShow, getEpisodesByAuthor, getLatestEpisodes, getMostPlayedEpisodes } from './episodes.js';
import { articles, getArticleById, getArticleBySlug, getLatestArticles, getArticlesByAuthor, getArticlesByCategory, getFeaturedArticles, searchArticles as searchArticlesHelper } from './articles.js';
import { categories, getCategoryById, getCategoryBySlug, getMainCategories, getSubcategories, getCategoryTree } from './categories.js';
import { tags, getTagById, getTagBySlug, getPopularTags, getTagCloud, getRelatedTags } from './tags.js';

// Simulacija API kašnjenja
const simulateDelay = (ms = 300) => new Promise(resolve => setTimeout(resolve, ms));

// Simulacija paginacije
function paginate(items, page = 1, perPage = 10) {
  const start = (page - 1) * perPage;
  const end = start + perPage;
  const paginatedItems = items.slice(start, end);

  return {
    items: paginatedItems,
    pagination: {
      page,
      perPage,
      total: items.length,
      totalPages: Math.ceil(items.length / perPage),
      hasNext: end < items.length,
      hasPrev: page > 1
    }
  };
}

// API funkcije sa simulacijom async poziva

// Users API
export const usersAPI = {
  async getAll() {
    await simulateDelay();
    return users;
  },

  async getById(id) {
    await simulateDelay();
    const user = getUserById(id);
    if (!user) throw new Error(`User with id ${id} not found`);
    return user;
  },

  async getByUsername(username) {
    await simulateDelay();
    const user = getUserByUsername(username);
    if (!user) throw new Error(`User with username ${username} not found`);
    return user;
  },

  async getByEmail(email) {
    await simulateDelay();
    return getUserByEmail(email);
  },

  async getActive() {
    await simulateDelay();
    return getActiveUsers();
  },

  async getByRole(role) {
    await simulateDelay();
    return getUsersByRole(role);
  }
};

// Authors API
export const authorsAPI = {
  async getAll(options = {}) {
    await simulateDelay();
    let result = authors;

    if (options.active) {
      result = result.filter(author => author.isActive);
    }

    if (options.page) {
      return paginate(result, options.page, options.perPage || 10);
    }

    return result;
  },

  async getById(id) {
    await simulateDelay();
    const author = getAuthorById(id);
    if (!author) throw new Error(`Author with id ${id} not found`);
    return author;
  },

  async getBySlug(slug) {
    await simulateDelay();
    const author = getAuthorBySlug(slug);
    if (!author) throw new Error(`Author with slug ${slug} not found`);
    return author;
  },

  async getByUserId(userId) {
    await simulateDelay();
    return getAuthorByUserId(userId);
  },

  async getActive() {
    await simulateDelay();
    return getActiveAuthors();
  },

  async getGuests() {
    await simulateDelay();
    return getGuestAuthors();
  },

  async getWithShows() {
    await simulateDelay();
    return getAuthorsWithShows();
  }
};

// Shows API
export const showsAPI = {
  async getAll(options = {}) {
    await simulateDelay();
    let result = shows;

    if (options.active !== undefined) {
      result = result.filter(show => show.isActive === options.active);
    }

    if (options.type) {
      result = result.filter(show => show.type === options.type);
    }

    if (options.external !== undefined) {
      result = result.filter(show => show.isExternal === options.external);
    }

    if (options.page) {
      return paginate(result, options.page, options.perPage || 10);
    }

    return result;
  },

  async getById(id) {
    await simulateDelay();
    const show = getShowById(id);
    if (!show) throw new Error(`Show with id ${id} not found`);
    return show;
  },

  async getBySlug(slug) {
    await simulateDelay();
    const show = getShowBySlug(slug);
    if (!show) throw new Error(`Show with slug ${slug} not found`);
    return show;
  },

  async getActive() {
    await simulateDelay();
    return getActiveShows();
  },

  async getByType(type) {
    await simulateDelay();
    return getShowsByType(type);
  },

  async getByHost(authorId) {
    await simulateDelay();
    return getShowsByHost(authorId);
  },

  async getLive() {
    await simulateDelay();
    return getLiveShows();
  }
};

// Episodes API
export const episodesAPI = {
  async getAll(options = {}) {
    await simulateDelay();
    let result = episodes;

    if (options.status) {
      result = result.filter(ep => ep.status === options.status);
    }

    if (options.showId) {
      result = result.filter(ep => ep.showId === options.showId);
    }

    if (options.isLive !== undefined) {
      result = result.filter(ep => ep.isLive === options.isLive);
    }

    // Sort by air date descending by default
    result = result.sort((a, b) => new Date(b.airDate) - new Date(a.airDate));

    if (options.page) {
      return paginate(result, options.page, options.perPage || 10);
    }

    return result;
  },

  async getById(id) {
    await simulateDelay();
    const episode = getEpisodeById(id);
    if (!episode) throw new Error(`Episode with id ${id} not found`);
    return episode;
  },

  async getBySlug(slug) {
    await simulateDelay();
    const episode = getEpisodeBySlug(slug);
    if (!episode) throw new Error(`Episode with slug ${slug} not found`);
    return episode;
  },

  async getByShow(showId, options = {}) {
    await simulateDelay();
    let result = getEpisodesByShow(showId);

    if (options.page) {
      return paginate(result, options.page, options.perPage || 10);
    }

    return result;
  },

  async getByAuthor(authorId, options = {}) {
    await simulateDelay();
    let result = getEpisodesByAuthor(authorId);

    if (options.page) {
      return paginate(result, options.page, options.perPage || 10);
    }

    return result;
  },

  async getLatest(limit = 10) {
    await simulateDelay();
    return getLatestEpisodes(limit);
  },

  async getMostPlayed(limit = 10) {
    await simulateDelay();
    return getMostPlayedEpisodes(limit);
  },

  async search(query, options = {}) {
    await simulateDelay();
    const searchTerm = query.toLowerCase();
    let result = episodes.filter(episode =>
      episode.title.toLowerCase().includes(searchTerm) ||
      episode.description.toLowerCase().includes(searchTerm) ||
      episode.tags.some(tag => tag.includes(searchTerm))
    );

    if (options.page) {
      return paginate(result, options.page, options.perPage || 10);
    }

    return result;
  }
};

// Articles API
export const articlesAPI = {
  async getAll(options = {}) {
    await simulateDelay();
    let result = articles;

    if (options.status) {
      result = result.filter(article => article.status === options.status);
    }

    if (options.featured !== undefined) {
      result = result.filter(article => article.featured === options.featured);
    }

    if (options.categoryId) {
      result = result.filter(article => article.categoryId === options.categoryId);
    }

    if (options.authorId) {
      result = result.filter(article => article.authorId === options.authorId);
    }

    if (options.tag) {
      result = result.filter(article => article.tags.includes(options.tag));
    }

    // Sort by published date descending by default
    result = result.sort((a, b) => new Date(b.publishedDate) - new Date(a.publishedDate));

    if (options.page) {
      return paginate(result, options.page, options.perPage || 10);
    }

    return result;
  },

  async getById(id) {
    await simulateDelay();
    const article = articles.find(a => a.id === id);
    if (!article) throw new Error(`Article with id ${id} not found`);

    // Increment view count
    article.viewCount++;

    // Get related data
    const author = getAuthorById(article.authorId);
    const category = getCategoryById(article.categoryId);
    const relatedArticles = article.relatedArticles ?
      articles.filter(a => article.relatedArticles.includes(a.id)) : [];

    return {
      ...article,
      author,
      category,
      relatedArticles
    };
  },

  async getBySlug(slug) {
    await simulateDelay();
    const article = articles.find(a => a.slug === slug);
    if (!article) throw new Error(`Article with slug ${slug} not found`);

    // Increment view count
    article.viewCount++;

    // Get related data
    const author = getAuthorById(article.authorId);
    const category = getCategoryById(article.categoryId);
    const relatedArticles = article.relatedArticles ?
      articles.filter(a => article.relatedArticles.includes(a.id)) : [];

    return {
      ...article,
      author,
      category,
      relatedArticles
    };
  },

  async getLatest(limit = 10) {
    await simulateDelay();
    return articles
      .filter(article => article.status === 'published')
      .sort((a, b) => new Date(b.publishedDate) - new Date(a.publishedDate))
      .slice(0, limit);
  },

  async getFeatured(limit = 5) {
    await simulateDelay();
    return articles
      .filter(article => article.featured && article.status === 'published')
      .sort((a, b) => new Date(b.publishedDate) - new Date(a.publishedDate))
      .slice(0, limit);
  },

  async getPopular(limit = 10) {
    await simulateDelay();
    return articles
      .filter(article => article.status === 'published')
      .sort((a, b) => b.viewCount - a.viewCount)
      .slice(0, limit);
  },

  async search(query, options = {}) {
    await simulateDelay();
    const searchTerm = query.toLowerCase();
    let result = articles.filter(article =>
      article.title.toLowerCase().includes(searchTerm) ||
      article.excerpt.toLowerCase().includes(searchTerm) ||
      article.content.toLowerCase().includes(searchTerm) ||
      article.tags.some(tag => tag.includes(searchTerm))
    );

    if (options.page) {
      return paginate(result, options.page, options.perPage || 10);
    }

    return result;
  }
};

// Categories API
export const categoriesAPI = {
  async getAll() {
    await simulateDelay();
    return categories;
  },

  async getTree() {
    await simulateDelay();
    return getCategoryTree();
  },

  async getById(id) {
    await simulateDelay();
    const category = getCategoryById(id);
    if (!category) throw new Error(`Category with id ${id} not found`);

    const subcategories = getSubcategories(id);
    return {
      ...category,
      subcategories
    };
  },

  async getBySlug(slug) {
    await simulateDelay();
    const category = getCategoryBySlug(slug);
    if (!category) throw new Error(`Category with slug ${slug} not found`);

    const subcategories = getSubcategories(category.id);
    return {
      ...category,
      subcategories
    };
  },

  async getMain() {
    await simulateDelay();
    return getMainCategories();
  }
};

// Tags API
export const tagsAPI = {
  async getAll() {
    await simulateDelay();
    return tags;
  },

  async getCloud() {
    await simulateDelay();
    return getTagCloud();
  },

  async getPopular(limit = 20) {
    await simulateDelay();
    return getPopularTags(limit);
  },

  async getById(id) {
    await simulateDelay();
    const tag = getTagById(id);
    if (!tag) throw new Error(`Tag with id ${id} not found`);
    return tag;
  },

  async getBySlug(slug) {
    await simulateDelay();
    const tag = getTagBySlug(slug);
    if (!tag) throw new Error(`Tag with slug ${slug} not found`);
    return tag;
  },

  async getRelated(tagId, limit = 5) {
    await simulateDelay();
    return getRelatedTags(tagId, limit);
  },

  async search(query) {
    await simulateDelay();
    const searchTerm = query.toLowerCase();
    return tags.filter(tag =>
      tag.name.toLowerCase().includes(searchTerm) ||
      tag.description.toLowerCase().includes(searchTerm)
    );
  }
};

// Search API - searches across all content types
export const searchAPI = {
  async searchAll(query, options = {}) {
    await simulateDelay();
    const searchTerm = query.toLowerCase();

    const results = {
      articles: [],
      episodes: [],
      shows: [],
      authors: [],
      tags: []
    };

    // Search articles
    results.articles = articles
      .filter(article =>
        article.title.toLowerCase().includes(searchTerm) ||
        article.excerpt.toLowerCase().includes(searchTerm)
      )
      .slice(0, options.limit || 5);

    // Search episodes
    results.episodes = episodes
      .filter(episode =>
        episode.title.toLowerCase().includes(searchTerm) ||
        episode.description.toLowerCase().includes(searchTerm)
      )
      .slice(0, options.limit || 5);

    // Search shows
    results.shows = shows
      .filter(show =>
        show.title.toLowerCase().includes(searchTerm) ||
        show.description.toLowerCase().includes(searchTerm)
      )
      .slice(0, options.limit || 5);

    // Search authors
    results.authors = authors
      .filter(author =>
        author.firstName.toLowerCase().includes(searchTerm) ||
        author.lastName.toLowerCase().includes(searchTerm) ||
        (author.nickname && author.nickname.toLowerCase().includes(searchTerm))
      )
      .slice(0, options.limit || 5);

    // Search tags
    results.tags = tags
      .filter(tag =>
        tag.name.toLowerCase().includes(searchTerm)
      )
      .slice(0, options.limit || 5);

    return results;
  }
};

// Stats API
export const statsAPI = {
  async getOverview() {
    await simulateDelay();
    return {
      users: {
        total: users.length,
        active: users.filter(u => u.isActive).length,
        byRole: {
          admin: users.filter(u => u.role === 'admin').length,
          editor: users.filter(u => u.role === 'editor').length,
          author: users.filter(u => u.role === 'author').length,
          contributor: users.filter(u => u.role === 'contributor').length,
          guest: users.filter(u => u.role === 'guest').length
        }
      },
      authors: {
        total: authors.length,
        active: authors.filter(a => a.isActive).length,
        withShows: authors.filter(a => a.stats.showsCount > 0).length,
        external: authors.filter(a => a.userId === null).length
      },
      shows: {
        total: shows.length,
        active: shows.filter(s => s.isActive).length,
        byType: {
          tematski_blok: shows.filter(s => s.type === 'tematski_blok').length,
          govorna_emisija: shows.filter(s => s.type === 'govorna_emisija').length
        },
        external: shows.filter(s => s.isExternal).length,
        live: shows.filter(s => s.schedule.isLive).length
      },
      episodes: {
        total: episodes.length,
        published: episodes.filter(e => e.status === 'published').length,
        live: episodes.filter(e => e.isLive).length,
        withGuests: episodes.filter(e => e.guests && e.guests.length > 0).length,
        totalPlays: episodes.reduce((sum, e) => sum + e.stats.plays, 0)
      },
      articles: {
        total: articles.length,
        published: articles.filter(a => a.status === 'published').length,
        featured: articles.filter(a => a.featured).length,
        totalViews: articles.reduce((sum, a) => sum + a.viewCount, 0),
        averageReadTime: Math.round(
          articles.reduce((sum, a) => sum + a.readTime, 0) / articles.length
        )
      },
      categories: {
        total: categories.length,
        active: categories.filter(c => c.isActive).length,
        main: categories.filter(c => c.parentId === null).length,
        subcategories: categories.filter(c => c.parentId !== null).length
      },
      tags: {
        total: tags.length,
        totalUsage: tags.reduce((sum, t) => sum + t.count, 0),
        mostUsed: tags.sort((a, b) => b.count - a.count)[0]
      }
    };
  },

  async getContentByDateRange(startDate, endDate) {
    await simulateDelay();
    const start = new Date(startDate);
    const end = new Date(endDate);

    return {
      articles: articles.filter(a => {
        const date = new Date(a.publishedDate);
        return date >= start && date <= end;
      }),
      episodes: episodes.filter(e => {
        const date = new Date(e.airDate);
        return date >= start && date <= end;
      })
    };
  }
};

// Export everything
export default {
  users: usersAPI,
  authors: authorsAPI,
  shows: showsAPI,
  episodes: episodesAPI,
  articles: articlesAPI,
  categories: categoriesAPI,
  tags: tagsAPI,
  search: searchAPI,
  stats: statsAPI
};

// Export raw data for direct access if needed
export {
  users as rawUsers,
  authors as rawAuthors,
  shows as rawShows,
  episodes as rawEpisodes,
  articles as rawArticles,
  categories as rawCategories,
  tags as rawTags
};
