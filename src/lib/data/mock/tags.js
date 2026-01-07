// Mock Tags for Radio Roža
// Tagovi za označavanje i kategorizaciju sadržaja

export const tags = [
  // Glazbeni žanrovi
  {
    id: 'tag_001',
    name: 'techno',
    slug: 'techno',
    description: 'Elektronička glazba karakterizirana repetitivnim ritmovima',
    count: 89,
    color: '#000000',
    category: 'music_genre'
  },
  {
    id: 'tag_002',
    name: 'house',
    slug: 'house',
    description: 'Elektronička plesna glazba nastala u Chicagu',
    count: 67,
    color: '#FF6B6B',
    category: 'music_genre'
  },
  {
    id: 'tag_003',
    name: 'jazz',
    slug: 'jazz',
    description: 'Glazbeni žanr karakteriziran improvizacijom',
    count: 45,
    color: '#4ECDC4',
    category: 'music_genre'
  },
  {
    id: 'tag_004',
    name: 'indie',
    slug: 'indie',
    description: 'Nezavisna glazba izvan mainstream industrije',
    count: 102,
    color: '#95E1D3',
    category: 'music_genre'
  },
  {
    id: 'tag_005',
    name: 'punk',
    slug: 'punk',
    description: 'Brza, energična glazba s DIY etikom',
    count: 78,
    color: '#FF1744',
    category: 'music_genre'
  },
  {
    id: 'tag_006',
    name: 'alternative',
    slug: 'alternative',
    description: 'Alternativna rock glazba',
    count: 93,
    color: '#A8E6CF',
    category: 'music_genre'
  },
  {
    id: 'tag_007',
    name: 'electronic',
    slug: 'electronic',
    description: 'Elektronička glazba svih vrsta',
    count: 156,
    color: '#FFD93D',
    category: 'music_genre'
  },
  {
    id: 'tag_008',
    name: 'rock',
    slug: 'rock',
    description: 'Rock glazba i svi njezini podžanrovi',
    count: 134,
    color: '#6BCB77',
    category: 'music_genre'
  },
  {
    id: 'tag_009',
    name: 'hip-hop',
    slug: 'hip-hop',
    description: 'Hip-hop kultura i rap glazba',
    count: 56,
    color: '#4D96FF',
    category: 'music_genre'
  },
  {
    id: 'tag_010',
    name: 'ambient',
    slug: 'ambient',
    description: 'Atmosferska, ambijentalna glazba',
    count: 34,
    color: '#C9B6E4',
    category: 'music_genre'
  },

  // Lokacije i scena
  {
    id: 'tag_011',
    name: 'zagreb',
    slug: 'zagreb',
    description: 'Događanja i scena u Zagrebu',
    count: 234,
    color: '#FF6B9D',
    category: 'location'
  },
  {
    id: 'tag_012',
    name: 'split',
    slug: 'split',
    description: 'Događanja i scena u Splitu',
    count: 67,
    color: '#A0E7E5',
    category: 'location'
  },
  {
    id: 'tag_013',
    name: 'rijeka',
    slug: 'rijeka',
    description: 'Događanja i scena u Rijeci',
    count: 45,
    color: '#FFAEBC',
    category: 'location'
  },
  {
    id: 'tag_014',
    name: 'hrvatska glazba',
    slug: 'hrvatska-glazba',
    description: 'Domaća glazbena scena',
    count: 189,
    color: '#FEC8D8',
    category: 'location'
  },
  {
    id: 'tag_015',
    name: 'berlin',
    slug: 'berlin',
    description: 'Berlinska glazbena scena',
    count: 23,
    color: '#000000',
    category: 'location'
  },

  // Događaji i formati
  {
    id: 'tag_016',
    name: 'koncerti',
    slug: 'koncerti',
    description: 'Koncerti i live nastupe',
    count: 145,
    color: '#FF5722',
    category: 'event'
  },
  {
    id: 'tag_017',
    name: 'festivali',
    slug: 'festivali',
    description: 'Glazbeni i kulturni festivali',
    count: 89,
    color: '#E91E63',
    category: 'event'
  },
  {
    id: 'tag_018',
    name: 'intervju',
    slug: 'intervju',
    description: 'Intervjui s umjetnicima',
    count: 112,
    color: '#9C27B0',
    category: 'format'
  },
  {
    id: 'tag_019',
    name: 'recenzija',
    slug: 'recenzija',
    description: 'Recenzije albuma i koncerata',
    count: 98,
    color: '#673AB7',
    category: 'format'
  },
  {
    id: 'tag_020',
    name: 'premijera',
    slug: 'premijera',
    description: 'Premijerni sadržaji',
    count: 45,
    color: '#3F51B5',
    category: 'format'
  },

  // Društvene teme
  {
    id: 'tag_021',
    name: 'aktivizam',
    slug: 'aktivizam',
    description: 'Društveni aktivizam i pokret',
    count: 67,
    color: '#009688',
    category: 'society'
  },
  {
    id: 'tag_022',
    name: 'klimatske promjene',
    slug: 'klimatske-promjene',
    description: 'Klimatska kriza i ekologija',
    count: 34,
    color: '#4CAF50',
    category: 'society'
  },
  {
    id: 'tag_023',
    name: 'ljudska prava',
    slug: 'ljudska-prava',
    description: 'Borba za ljudska prava',
    count: 45,
    color: '#8BC34A',
    category: 'society'
  },
  {
    id: 'tag_024',
    name: 'feminizam',
    slug: 'feminizam',
    description: 'Feminizam i rodna ravnopravnost',
    count: 38,
    color: '#FF4081',
    category: 'society'
  },
  {
    id: 'tag_025',
    name: 'ekologija',
    slug: 'ekologija',
    description: 'Ekološke teme i održivost',
    count: 52,
    color: '#00E676',
    category: 'society'
  },

  // Kultura
  {
    id: 'tag_026',
    name: 'kazalište',
    slug: 'kazaliste',
    description: 'Kazališne predstave i drama',
    count: 76,
    color: '#D50000',
    category: 'culture'
  },
  {
    id: 'tag_027',
    name: 'film',
    slug: 'film',
    description: 'Filmska umjetnost i kino',
    count: 89,
    color: '#C51162',
    category: 'culture'
  },
  {
    id: 'tag_028',
    name: 'umjetnost',
    slug: 'umjetnost',
    description: 'Vizualne i performing umjetnosti',
    count: 102,
    color: '#AA00FF',
    category: 'culture'
  },
  {
    id: 'tag_029',
    name: 'književnost',
    slug: 'knjizevnost',
    description: 'Književnost i pisana riječ',
    count: 45,
    color: '#6200EA',
    category: 'culture'
  },
  {
    id: 'tag_030',
    name: 'fotografia',
    slug: 'fotografia',
    description: 'Fotografska umjetnost',
    count: 34,
    color: '#311B92',
    category: 'culture'
  },

  // Tehnologija
  {
    id: 'tag_031',
    name: 'diy',
    slug: 'diy',
    description: 'Do It Yourself kultura i projekti',
    count: 56,
    color: '#FF6D00',
    category: 'technology'
  },
  {
    id: 'tag_032',
    name: 'audio',
    slug: 'audio',
    description: 'Audio tehnologija i produkcija',
    count: 67,
    color: '#FF9100',
    category: 'technology'
  },
  {
    id: 'tag_033',
    name: 'broadcasting',
    slug: 'broadcasting',
    description: 'Radio broadcasting i streaming',
    count: 23,
    color: '#FFC400',
    category: 'technology'
  },
  {
    id: 'tag_034',
    name: 'podcast',
    slug: 'podcast',
    description: 'Podcast produkcija',
    count: 89,
    color: '#FFEA00',
    category: 'technology'
  },
  {
    id: 'tag_035',
    name: 'streaming',
    slug: 'streaming',
    description: 'Online streaming i platforme',
    count: 45,
    color: '#C6FF00',
    category: 'technology'
  },

  // Emisije i sadržaj
  {
    id: 'tag_036',
    name: 'elektronski puls',
    slug: 'elektronski-puls',
    description: 'Emisija Elektronski Puls',
    count: 89,
    color: '#00BFA5',
    category: 'show'
  },
  {
    id: 'tag_037',
    name: 'jazz corner',
    slug: 'jazz-corner',
    description: 'Emisija Jazz Corner',
    count: 67,
    color: '#00ACC1',
    category: 'show'
  },
  {
    id: 'tag_038',
    name: 'indie vibes',
    slug: 'indie-vibes',
    description: 'Emisija Indie Vibes',
    count: 78,
    color: '#0097A7',
    category: 'show'
  },
  {
    id: 'tag_039',
    name: 'jutarnji program',
    slug: 'jutarnji-program',
    description: 'Jutarnji Program Radio Rože',
    count: 234,
    color: '#00838F',
    category: 'show'
  },
  {
    id: 'tag_040',
    name: 'društveni kompas',
    slug: 'drustveni-kompas',
    description: 'Emisija Društveni Kompas',
    count: 56,
    color: '#006064',
    category: 'show'
  },

  // Ostalo
  {
    id: 'tag_041',
    name: 'novosti',
    slug: 'novosti',
    description: 'Najnovije vijesti',
    count: 345,
    color: '#263238',
    category: 'other'
  },
  {
    id: 'tag_042',
    name: 'najave',
    slug: 'najave',
    description: 'Najave događanja',
    count: 123,
    color: '#37474F',
    category: 'other'
  },
  {
    id: 'tag_043',
    name: 'arhiva',
    slug: 'arhiva',
    description: 'Arhivski sadržaji',
    count: 67,
    color: '#455A64',
    category: 'other'
  },
  {
    id: 'tag_044',
    name: 'community',
    slug: 'community',
    description: 'Community radio i zajednica',
    count: 89,
    color: '#546E7A',
    category: 'other'
  },
  {
    id: 'tag_045',
    name: 'live',
    slug: 'live',
    description: 'Live sadržaji i prijenosi',
    count: 145,
    color: '#607D8B',
    category: 'other'
  }
];

// Helper funkcije za rad s tagovima
export function getTagById(id) {
  return tags.find(tag => tag.id === id);
}

export function getTagBySlug(slug) {
  return tags.find(tag => tag.slug === slug);
}

export function getTagsByCategory(category) {
  return tags.filter(tag => tag.category === category);
}

export function getPopularTags(limit = 10) {
  return tags
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);
}

export function getTagsByIds(tagIds) {
  return tags.filter(tag => tagIds.includes(tag.id));
}

export function getTagsByNames(tagNames) {
  return tags.filter(tag => tagNames.includes(tag.name));
}

export function getTagCloud() {
  const maxCount = Math.max(...tags.map(tag => tag.count));
  const minCount = Math.min(...tags.map(tag => tag.count));
  const range = maxCount - minCount;

  return tags.map(tag => ({
    ...tag,
    size: Math.round(((tag.count - minCount) / range) * 4) + 1 // Size from 1-5
  }));
}

export function searchTags(query) {
  const searchTerm = query.toLowerCase();
  return tags.filter(tag =>
    tag.name.toLowerCase().includes(searchTerm) ||
    tag.description.toLowerCase().includes(searchTerm)
  );
}

export function getRelatedTags(tagId, limit = 5) {
  const tag = getTagById(tagId);
  if (!tag) return [];

  // Return tags from same category, excluding the original tag
  return tags
    .filter(t => t.category === tag.category && t.id !== tagId)
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);
}

export function getTagCategories() {
  const categories = new Set(tags.map(tag => tag.category));
  return Array.from(categories).map(category => ({
    name: category,
    tags: getTagsByCategory(category)
  }));
}

export default tags;
