// Mock Categories for Radio Roža
// Kategorije za članke i sadržaje

export const categories = [
  {
    id: 'cat_001',
    title: 'Glazba',
    slug: 'glazba',
    description: 'Sve o glazbi - od recenzija albuma do intervjua s glazbenicima, od koncertnih najava do glazbene teorije.',
    color: '#FF6B6B',
    icon: 'music',
    parentId: null,
    order: 1,
    isActive: true,
    articleCount: 234,
    featuredImage: '/images/categories/glazba.jpg',
    seo: {
      metaTitle: 'Glazba - Članci i novosti | Radio Roža',
      metaDescription: 'Najnovije glazbene vijesti, recenzije, intervjui i najave koncerata.',
      keywords: ['glazba', 'koncerti', 'recenzije', 'intervjui', 'albumi']
    }
  },
  {
    id: 'cat_002',
    title: 'Kultura',
    slug: 'kultura',
    description: 'Kulturna događanja, kazalište, film, književnost, vizualne umjetnosti i sve što čini kulturnu scenu.',
    color: '#4ECDC4',
    icon: 'theater',
    parentId: null,
    order: 2,
    isActive: true,
    articleCount: 189,
    featuredImage: '/images/categories/kultura.jpg',
    seo: {
      metaTitle: 'Kultura - Vijesti i događanja | Radio Roža',
      metaDescription: 'Kulturna događanja, kazališne premijere, filmske recenzije i umjetnički projekti.',
      keywords: ['kultura', 'kazalište', 'film', 'umjetnost', 'književnost']
    }
  },
  {
    id: 'cat_003',
    title: 'Društvo',
    slug: 'drustvo',
    description: 'Društvene teme, aktivizam, ljudska prava, ekologija i pitanja koja oblikuju našu zajednicu.',
    color: '#95E1D3',
    icon: 'people',
    parentId: null,
    order: 3,
    isActive: true,
    articleCount: 156,
    featuredImage: '/images/categories/drustvo.jpg',
    seo: {
      metaTitle: 'Društvo - Teme i rasprave | Radio Roža',
      metaDescription: 'Društvene teme, aktivizam, ljudska prava i pitanja koja oblikuju našu zajednicu.',
      keywords: ['društvo', 'aktivizam', 'ljudska prava', 'ekologija', 'zajednica']
    }
  },
  {
    id: 'cat_004',
    title: 'Tehnologija',
    slug: 'tehnologija',
    description: 'Tehnološke inovacije, audio oprema, broadcasting, digitalni trendovi i DIY projekti.',
    color: '#A8E6CF',
    icon: 'technology',
    parentId: null,
    order: 4,
    isActive: true,
    articleCount: 78,
    featuredImage: '/images/categories/tehnologija.jpg',
    seo: {
      metaTitle: 'Tehnologija - Inovacije i trendovi | Radio Roža',
      metaDescription: 'Tehnološke vijesti, audio oprema, broadcasting tehnologije i digitalni trendovi.',
      keywords: ['tehnologija', 'audio', 'broadcasting', 'digitalno', 'inovacije']
    }
  },
  {
    id: 'cat_005',
    title: 'Elektronička glazba',
    slug: 'elektronicka-glazba',
    description: 'Techno, house, trance, drum and bass i svi pravci elektroničke glazbe.',
    color: '#FFD93D',
    icon: 'electronic',
    parentId: 'cat_001', // Podkategorija Glazbe
    order: 1,
    isActive: true,
    articleCount: 67,
    featuredImage: '/images/categories/elektronicka-glazba.jpg',
    seo: {
      metaTitle: 'Elektronička glazba | Radio Roža',
      metaDescription: 'Sve o elektroničkoj glazbi - techno, house, trance, drum and bass.',
      keywords: ['elektronička glazba', 'techno', 'house', 'trance', 'dj']
    }
  },
  {
    id: 'cat_006',
    title: 'Indie & Alternativa',
    slug: 'indie-alternativa',
    description: 'Nezavisna glazbena scena, alternativni rock, shoegaze, post-punk i underground.',
    color: '#6BCB77',
    icon: 'alternative',
    parentId: 'cat_001', // Podkategorija Glazbe
    order: 2,
    isActive: true,
    articleCount: 89,
    featuredImage: '/images/categories/indie-alternativa.jpg',
    seo: {
      metaTitle: 'Indie & Alternativa | Radio Roža',
      metaDescription: 'Nezavisna i alternativna glazbena scena, underground bendovi i DIY kultura.',
      keywords: ['indie', 'alternativa', 'underground', 'nezavisna glazba']
    }
  },
  {
    id: 'cat_007',
    title: 'Jazz & Blues',
    slug: 'jazz-blues',
    description: 'Klasični i suvremeni jazz, blues, fusion i improvizacijska glazba.',
    color: '#4D96FF',
    icon: 'jazz',
    parentId: 'cat_001', // Podkategorija Glazbe
    order: 3,
    isActive: true,
    articleCount: 45,
    featuredImage: '/images/categories/jazz-blues.jpg',
    seo: {
      metaTitle: 'Jazz & Blues | Radio Roža',
      metaDescription: 'Jazz i blues glazba, od klasika do suvremenih eksperimenata.',
      keywords: ['jazz', 'blues', 'fusion', 'bebop', 'improvizacija']
    }
  },
  {
    id: 'cat_008',
    title: 'Vijesti',
    slug: 'vijesti',
    description: 'Najnovije vijesti iz svijeta glazbe, kulture i Radio Rože.',
    color: '#FF6B9D',
    icon: 'news',
    parentId: null,
    order: 5,
    isActive: true,
    articleCount: 312,
    featuredImage: '/images/categories/vijesti.jpg',
    seo: {
      metaTitle: 'Vijesti | Radio Roža',
      metaDescription: 'Najnovije vijesti iz svijeta glazbe, kulture i Radio Rože.',
      keywords: ['vijesti', 'novosti', 'glazbene vijesti', 'kulturne vijesti']
    }
  },
  {
    id: 'cat_009',
    title: 'Intervjui',
    slug: 'intervjui',
    description: 'Ekskluzivni razgovori s glazbenicima, umjetnicima i kulturnim djelatnicima.',
    color: '#C9B6E4',
    icon: 'interview',
    parentId: null,
    order: 6,
    isActive: true,
    articleCount: 98,
    featuredImage: '/images/categories/intervjui.jpg',
    seo: {
      metaTitle: 'Intervjui | Radio Roža',
      metaDescription: 'Ekskluzivni intervjui s glazbenicima, umjetnicima i kulturnim djelatnicima.',
      keywords: ['intervjui', 'razgovori', 'glazbenici', 'umjetnici']
    }
  },
  {
    id: 'cat_010',
    title: 'Recenzije',
    slug: 'recenzije',
    description: 'Recenzije albuma, koncerata, predstava i kulturnih događanja.',
    color: '#FEDEFF',
    icon: 'review',
    parentId: null,
    order: 7,
    isActive: true,
    articleCount: 145,
    featuredImage: '/images/categories/recenzije.jpg',
    seo: {
      metaTitle: 'Recenzije | Radio Roža',
      metaDescription: 'Stručne recenzije albuma, koncerata, predstava i kulturnih događanja.',
      keywords: ['recenzije', 'kritike', 'albumi', 'koncerti', 'predstave']
    }
  },
  {
    id: 'cat_011',
    title: 'Podcast',
    slug: 'podcast',
    description: 'Podcast epizode, audio sadržaji i snimke emisija.',
    color: '#A0E7E5',
    icon: 'podcast',
    parentId: null,
    order: 8,
    isActive: true,
    articleCount: 234,
    featuredImage: '/images/categories/podcast.jpg',
    seo: {
      metaTitle: 'Podcast | Radio Roža',
      metaDescription: 'Slušajte podcast epizode i snimke emisija Radio Rože.',
      keywords: ['podcast', 'audio', 'emisije', 'snimke']
    }
  },
  {
    id: 'cat_012',
    title: 'Aktivizam',
    slug: 'aktivizam',
    description: 'Društveni pokreti, građanske inicijative i borba za promjene.',
    color: '#FFAEBC',
    icon: 'activism',
    parentId: 'cat_003', // Podkategorija Društva
    order: 1,
    isActive: true,
    articleCount: 56,
    featuredImage: '/images/categories/aktivizam.jpg',
    seo: {
      metaTitle: 'Aktivizam | Radio Roža',
      metaDescription: 'Društveni pokreti, građanske inicijative i borba za pozitivne promjene.',
      keywords: ['aktivizam', 'društveni pokreti', 'inicijative', 'promjene']
    }
  }
];

// Helper funkcije za rad s kategorijama
export function getCategoryById(id) {
  return categories.find(category => category.id === id);
}

export function getCategoryBySlug(slug) {
  return categories.find(category => category.slug === slug);
}

export function getActiveCategories() {
  return categories.filter(category => category.isActive);
}

export function getMainCategories() {
  return categories.filter(category => category.parentId === null && category.isActive);
}

export function getSubcategories(parentId) {
  return categories.filter(category => category.parentId === parentId && category.isActive);
}

export function getCategoryWithSubcategories(categoryId) {
  const category = getCategoryById(categoryId);
  if (!category) return null;

  return {
    ...category,
    subcategories: getSubcategories(categoryId)
  };
}

export function getCategoryPath(categoryId) {
  const category = getCategoryById(categoryId);
  if (!category) return [];

  const path = [category];
  if (category.parentId) {
    const parent = getCategoryById(category.parentId);
    if (parent) path.unshift(parent);
  }

  return path;
}

export function getCategoriesSorted() {
  return categories
    .filter(category => category.isActive)
    .sort((a, b) => a.order - b.order);
}

export function getCategoryTree() {
  const mainCategories = getMainCategories();
  return mainCategories.map(category => ({
    ...category,
    subcategories: getSubcategories(category.id)
  }));
}

export function getCategoriesWithArticleCount() {
  return categories.map(category => ({
    ...category,
    hasArticles: category.articleCount > 0
  }));
}

export default categories;
