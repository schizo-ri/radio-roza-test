// Mock Episodes for Radio Roža
// Epizode emisija s detaljnim informacijama

export const episodes = [
  // Jutarnji Program epizode
  {
    id: 'ep_001',
    showId: 'show_001',
    episodeNumber: 234,
    title: 'Novo jutro, novi početak',
    slug: 'novo-jutro-novi-pocetak',
    description: 'Razgovaramo o novogodišnjim rezolucijama i kako ih održati duže od siječnja.',
    longDescription: `U današnjoj epizodi Jutarnjeg programa bavimo se fenomenom novogodišnjih rezolucija.
    Zašto ih postavljamo, zašto ih prekidamo i kako možemo biti uspješniji u njihovom ostvarivanju.
    Gostovali su psiholozi i life coachevi koji su podijelili praktične savjete.`,
    cover: null, // Koristi cover emisije
    airDate: '2024-01-10T07:00:00Z',
    duration: 180, // u minutama
    authors: ['auth_004'], // Ivan Babić
    guests: [
      {
        name: 'Dr. Martina Horvat',
        role: 'Psihologinja',
        bio: 'Stručnjakinja za motivaciju i promjenu navika'
      }
    ],
    status: 'published', // draft, published, archived
    isLive: true,
    recordingDate: '2024-01-10T07:00:00Z',
    links: {
      mixcloud: 'https://mixcloud.com/radio-roza/jutarnji-program-2024-01-10',
      youtube: null,
      spotify: null,
      appleMusic: null,
      soundcloud: null
    },
    segments: [
      {
        title: 'Uvod i vijesti',
        startTime: '00:00',
        endTime: '15:00'
      },
      {
        title: 'Razgovor s gošćom',
        startTime: '15:00',
        endTime: '45:00'
      },
      {
        title: 'Glazbeni blok',
        startTime: '45:00',
        endTime: '60:00'
      }
    ],
    playlist: [
      {
        artist: 'Haustor',
        title: 'Šal od svile',
        startTime: '45:00'
      },
      {
        artist: 'Azra',
        title: 'Usne vrele višnje',
        startTime: '52:00'
      }
    ],
    tags: ['novogodišnje rezolucije', 'psihologija', 'motivacija', 'jutro'],
    stats: {
      plays: 1234,
      likes: 89,
      comments: 12,
      shares: 23
    },
    metadata: {
      language: 'hr',
      explicit: false,
      transcript: false,
      closedCaptions: false
    }
  },
  {
    id: 'ep_002',
    showId: 'show_001',
    episodeNumber: 233,
    title: 'Zimske radosti i izazovi',
    slug: 'zimske-radosti-i-izazovi',
    description: 'Kako se nositi sa zimskom depresijom i pronaći radost u hladnim danima.',
    longDescription: `Razgovaramo o sezonskom afektivnom poremećaju i načinima kako održati dobro
    raspoloženje tijekom zimskih mjeseci. Posebno se fokusiramo na važnost vitamin D,
    tjelesne aktivnosti i održavanja socijalnih kontakata.`,
    cover: null,
    airDate: '2024-01-09T07:00:00Z',
    duration: 180,
    authors: ['auth_004'],
    guests: [],
    status: 'published',
    isLive: true,
    recordingDate: '2024-01-09T07:00:00Z',
    links: {
      mixcloud: 'https://mixcloud.com/radio-roza/jutarnji-program-2024-01-09',
      youtube: null,
      spotify: null,
      appleMusic: null,
      soundcloud: null
    },
    segments: [],
    playlist: [],
    tags: ['zima', 'zdravlje', 'depresija', 'vitamin d'],
    stats: {
      plays: 987,
      likes: 67,
      comments: 8,
      shares: 15
    },
    metadata: {
      language: 'hr',
      explicit: false,
      transcript: false,
      closedCaptions: false
    }
  },

  // Elektronski Puls epizode
  {
    id: 'ep_003',
    showId: 'show_002',
    episodeNumber: 89,
    title: 'Berlin Techno Special',
    slug: 'berlin-techno-special',
    description: 'Dva sata najkvalitetnijeg berlinskog techna uz ekskluzivni guest mix.',
    longDescription: `Večeras vas vodimo na zvučno putovanje u Berlin, svjetsku prijestolnicu techno glazbe.
    Predstavljamo najnovija izdanja legendarnih labela poput Tresor, Ostgut Ton i Berghain.
    Poseban gost večeri je DJ Klaus Mueller koji nam donosi ekskluzivni mix snimljen u Berghain klubu.`,
    cover: '/images/episodes/ep-003-berlin-special.jpg',
    airDate: '2024-01-06T22:00:00Z',
    duration: 120,
    authors: ['auth_002'], // DJ Novak
    guests: [
      {
        name: 'Klaus Mueller',
        role: 'DJ/Producer',
        bio: 'Rezident Berghain kluba'
      }
    ],
    status: 'published',
    isLive: true,
    recordingDate: '2024-01-06T22:00:00Z',
    links: {
      mixcloud: 'https://mixcloud.com/elektronskipuls/berlin-techno-special',
      youtube: 'https://youtube.com/watch?v=abc123',
      spotify: null,
      appleMusic: null,
      soundcloud: 'https://soundcloud.com/elektronskipuls/berlin-special'
    },
    segments: [
      {
        title: 'Uvod i najave',
        startTime: '00:00',
        endTime: '05:00'
      },
      {
        title: 'Warm-up mix',
        startTime: '05:00',
        endTime: '30:00'
      },
      {
        title: 'Guest mix - Klaus Mueller',
        startTime: '30:00',
        endTime: '90:00'
      },
      {
        title: 'Peak time techno',
        startTime: '90:00',
        endTime: '120:00'
      }
    ],
    playlist: [
      {
        artist: 'Ben Klock',
        title: 'Subzero',
        startTime: '05:00'
      },
      {
        artist: 'DVS1',
        title: 'Evolve',
        startTime: '12:00'
      },
      {
        artist: 'Dax J',
        title: 'Kill False Prophets',
        startTime: '18:00'
      }
    ],
    tags: ['techno', 'berlin', 'berghain', 'tresor', 'electronic'],
    stats: {
      plays: 3456,
      likes: 234,
      comments: 45,
      shares: 67
    },
    metadata: {
      language: 'hr',
      explicit: false,
      transcript: false,
      closedCaptions: false
    }
  },
  {
    id: 'ep_004',
    showId: 'show_002',
    episodeNumber: 88,
    title: 'Croatian Electronic Showcase',
    slug: 'croatian-electronic-showcase',
    description: 'Predstavljamo najbolje iz domaće elektroničke scene.',
    longDescription: `Posebna epizoda posvećena hrvatskim elektroničkim umjetnicima.
    Od veterana poput Petra Dundova do novih imena koja osvajaju svjetsku scenu.`,
    cover: null,
    airDate: '2023-12-30T22:00:00Z',
    duration: 120,
    authors: ['auth_002'],
    guests: [],
    status: 'published',
    isLive: true,
    recordingDate: '2023-12-30T22:00:00Z',
    links: {
      mixcloud: 'https://mixcloud.com/elektronskipuls/croatian-showcase',
      youtube: null,
      spotify: null,
      appleMusic: null,
      soundcloud: null
    },
    segments: [],
    playlist: [
      {
        artist: 'Petar Dundov',
        title: 'Oasis',
        startTime: '10:00'
      },
      {
        artist: 'Ilija Rudman',
        title: 'In the Moods',
        startTime: '25:00'
      }
    ],
    tags: ['croatian', 'electronic', 'techno', 'house'],
    stats: {
      plays: 2890,
      likes: 189,
      comments: 34,
      shares: 56
    },
    metadata: {
      language: 'hr',
      explicit: false,
      transcript: false,
      closedCaptions: false
    }
  },

  // Jazz Corner epizode
  {
    id: 'ep_005',
    showId: 'show_003',
    episodeNumber: 178,
    title: 'Miles Davis Retrospektiva',
    slug: 'miles-davis-retrospektiva',
    description: 'Putovanje kroz karijeru jednog od najvećih jazz inovatora svih vremena.',
    longDescription: `Večeras istražujemo evoluciju Milesa Davisa od bebopa preko cool jazza
    do fusiona. Slušamo rijetke snimke, analiziramo njegov utjecaj na jazz i razgovaramo
    o njegovom revolucionarnom pristupu glazbi.`,
    cover: '/images/episodes/ep-005-miles-davis.jpg',
    airDate: '2024-01-04T20:00:00Z',
    duration: 120,
    authors: ['auth_006'], // Tomislav Jurić
    guests: [],
    status: 'published',
    isLive: false,
    recordingDate: '2024-01-03T15:00:00Z',
    links: {
      mixcloud: 'https://mixcloud.com/jazzcorner/miles-davis-retrospektiva',
      youtube: null,
      spotify: null,
      appleMusic: null,
      soundcloud: null
    },
    segments: [
      {
        title: 'Bebop era',
        startTime: '00:00',
        endTime: '30:00'
      },
      {
        title: 'Cool jazz period',
        startTime: '30:00',
        endTime: '60:00'
      },
      {
        title: 'Electric fusion',
        startTime: '60:00',
        endTime: '90:00'
      }
    ],
    playlist: [
      {
        artist: 'Miles Davis',
        title: 'So What',
        startTime: '05:00'
      },
      {
        artist: 'Miles Davis',
        title: 'Kind of Blue',
        startTime: '35:00'
      },
      {
        artist: 'Miles Davis',
        title: 'Bitches Brew',
        startTime: '65:00'
      }
    ],
    tags: ['jazz', 'miles davis', 'bebop', 'cool jazz', 'fusion'],
    stats: {
      plays: 1567,
      likes: 145,
      comments: 23,
      shares: 34
    },
    metadata: {
      language: 'hr',
      explicit: false,
      transcript: false,
      closedCaptions: false
    }
  },

  // Indie Vibes epizode
  {
    id: 'ep_006',
    showId: 'show_004',
    episodeNumber: 145,
    title: 'Novo iz Hrvatske indie scene',
    slug: 'novo-iz-hrvatske-indie-scene',
    description: 'Predstavljamo najnovije albume i singlove domaćih indie bendova.',
    longDescription: `Fokus na svježim izdanjima hrvatske alternativne scene. Premijerno predstavljamo
    novi singl benda Vlasta Popić, razgovaramo s članovima grupe Svemirko o njihovom
    nadolazećem albumu i slušamo demo snimke obećavajućih novih bendova.`,
    cover: null,
    airDate: '2024-01-08T19:00:00Z',
    duration: 120,
    authors: ['auth_001'], // Ana Horvat
    guests: [
      {
        name: 'Vlasta Popić',
        role: 'Bend',
        bio: 'Zagrebački indie rock band'
      }
    ],
    status: 'published',
    isLive: true,
    recordingDate: '2024-01-08T19:00:00Z',
    links: {
      mixcloud: 'https://mixcloud.com/indievibes/hrvatska-indie-scena',
      youtube: 'https://youtube.com/watch?v=xyz789',
      spotify: null,
      appleMusic: null,
      soundcloud: null
    },
    segments: [
      {
        title: 'Uvod i novosti',
        startTime: '00:00',
        endTime: '10:00'
      },
      {
        title: 'Intervju - Vlasta Popić',
        startTime: '10:00',
        endTime: '40:00'
      },
      {
        title: 'Nova izdanja',
        startTime: '40:00',
        endTime: '80:00'
      }
    ],
    playlist: [
      {
        artist: 'Vlasta Popić',
        title: 'Novi dan',
        startTime: '42:00'
      },
      {
        artist: 'Svemirko',
        title: 'Pluton',
        startTime: '55:00'
      },
      {
        artist: 'Nemanja',
        title: 'Tišina',
        startTime: '68:00'
      }
    ],
    tags: ['indie', 'croatian', 'alternative', 'rock', 'nova glazba'],
    stats: {
      plays: 2345,
      likes: 178,
      comments: 29,
      shares: 41
    },
    metadata: {
      language: 'hr',
      explicit: false,
      transcript: true,
      closedCaptions: false
    }
  },

  // Kulturni Puls epizode
  {
    id: 'ep_007',
    showId: 'show_005',
    episodeNumber: 98,
    title: 'Kazališna sezona 2024',
    slug: 'kazalisna-sezona-2024',
    description: 'Pregled nadolazećih premijera i razgovor s redateljima.',
    longDescription: `Analiziramo repertoare hrvatskih kazališta za 2024. godinu.
    Razgovaramo s redateljima o njihovim novim projektima i dramaturzima o
    trendovima u suvremenoj dramaturgiji.`,
    cover: null,
    airDate: '2024-01-03T18:00:00Z',
    duration: 90,
    authors: ['auth_003', 'auth_001'], // Petra Šimić, Ana Horvat
    guests: [
      {
        name: 'Ivica Buljan',
        role: 'Redatelj',
        bio: 'Umjetnički ravnatelj HNK Split'
      }
    ],
    status: 'published',
    isLive: false,
    recordingDate: '2024-01-02T14:00:00Z',
    links: {
      mixcloud: null,
      youtube: null,
      spotify: null,
      appleMusic: null,
      soundcloud: null
    },
    segments: [],
    playlist: [],
    tags: ['kazalište', 'kultura', 'drama', 'premijere', '2024'],
    stats: {
      plays: 876,
      likes: 65,
      comments: 12,
      shares: 18
    },
    metadata: {
      language: 'hr',
      explicit: false,
      transcript: true,
      closedCaptions: true
    }
  },

  // Društveni Kompas epizode
  {
    id: 'ep_008',
    showId: 'show_006',
    episodeNumber: 112,
    title: 'Klimatske promjene i lokalna zajednica',
    slug: 'klimatske-promjene-lokalna-zajednica',
    description: 'Kako građanske inicijative mogu doprinijeti borbi protiv klimatskih promjena.',
    longDescription: `Razgovaramo o ulozi lokalnih zajednica u mitigaciji klimatskih promjena.
    Predstavljamo uspješne primjere zelenih inicijativa iz Hrvatske i svijeta,
    te dajemo praktične savjete kako pojedinci mogu doprinijeti.`,
    cover: '/images/episodes/ep-008-climate.jpg',
    airDate: '2024-01-02T17:00:00Z',
    duration: 90,
    authors: ['auth_007'], // Maja Vuković
    guests: [
      {
        name: 'Dr. Marina Zelić',
        role: 'Ekologinja',
        bio: 'Stručnjakinja za klimatske promjene'
      },
      {
        name: 'Pero Kvrgić',
        role: 'Aktivist',
        bio: 'Osnivač inicijative Zeleni Zagreb'
      }
    ],
    status: 'published',
    isLive: true,
    recordingDate: '2024-01-02T17:00:00Z',
    links: {
      mixcloud: 'https://mixcloud.com/drustveni-kompas/klimatske-promjene',
      youtube: null,
      spotify: null,
      appleMusic: null,
      soundcloud: null
    },
    segments: [
      {
        title: 'Uvod - globalna situacija',
        startTime: '00:00',
        endTime: '15:00'
      },
      {
        title: 'Lokalne inicijative',
        startTime: '15:00',
        endTime: '45:00'
      },
      {
        title: 'Praktični savjeti',
        startTime: '45:00',
        endTime: '70:00'
      }
    ],
    playlist: [],
    tags: ['klima', 'ekologija', 'aktivizam', 'zelena energija', 'održivost'],
    stats: {
      plays: 1432,
      likes: 98,
      comments: 34,
      shares: 52
    },
    metadata: {
      language: 'hr',
      explicit: false,
      transcript: true,
      closedCaptions: false
    }
  }
];

// Mapping tablica za many-to-many vezu između epizoda i autora
export const episodeAuthors = [
  { episodeId: 'ep_001', authorId: 'auth_004' },
  { episodeId: 'ep_002', authorId: 'auth_004' },
  { episodeId: 'ep_003', authorId: 'auth_002' },
  { episodeId: 'ep_004', authorId: 'auth_002' },
  { episodeId: 'ep_005', authorId: 'auth_006' },
  { episodeId: 'ep_006', authorId: 'auth_001' },
  { episodeId: 'ep_007', authorId: 'auth_003' },
  { episodeId: 'ep_007', authorId: 'auth_001' },
  { episodeId: 'ep_008', authorId: 'auth_007' }
];

// Helper funkcije za rad s epizodama
export function getEpisodeById(id) {
  return episodes.find(episode => episode.id === id);
}

export function getEpisodeBySlug(slug) {
  return episodes.find(episode => episode.slug === slug);
}

export function getEpisodesByShow(showId) {
  return episodes
    .filter(episode => episode.showId === showId)
    .sort((a, b) => b.episodeNumber - a.episodeNumber);
}

export function getEpisodesByAuthor(authorId) {
  const episodeIds = episodeAuthors
    .filter(ea => ea.authorId === authorId)
    .map(ea => ea.episodeId);
  return episodes.filter(episode => episodeIds.includes(episode.id));
}

export function getLatestEpisodes(limit = 10) {
  return episodes
    .filter(episode => episode.status === 'published')
    .sort((a, b) => new Date(b.airDate) - new Date(a.airDate))
    .slice(0, limit);
}

export function getEpisodesByDateRange(startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  return episodes.filter(episode => {
    const airDate = new Date(episode.airDate);
    return airDate >= start && airDate <= end;
  });
}

export function getEpisodesByTag(tag) {
  return episodes.filter(episode =>
    episode.tags.includes(tag.toLowerCase())
  );
}

export function getLiveEpisodes() {
  return episodes.filter(episode => episode.isLive);
}

export function getEpisodesWithGuests() {
  return episodes.filter(episode => episode.guests && episode.guests.length > 0);
}

export function getEpisodeAuthors(episodeId) {
  const authorIds = episodeAuthors
    .filter(ea => ea.episodeId === episodeId)
    .map(ea => ea.authorId);
  return authorIds;
}

export function getMostPlayedEpisodes(limit = 10) {
  return episodes
    .filter(episode => episode.status === 'published')
    .sort((a, b) => b.stats.plays - a.stats.plays)
    .slice(0, limit);
}

export function searchEpisodes(query) {
  const searchTerm = query.toLowerCase();
  return episodes.filter(episode =>
    episode.title.toLowerCase().includes(searchTerm) ||
    episode.description.toLowerCase().includes(searchTerm) ||
    episode.tags.some(tag => tag.includes(searchTerm))
  );
}

export default episodes;
