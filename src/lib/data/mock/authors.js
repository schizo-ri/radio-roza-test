// Mock Authors for Radio Roža
// Autori članaka i emisija (mogu biti vezani uz korisnike ili biti gosti)

export const authors = [
  {
    id: 'auth_001',
    firstName: 'Ana',
    lastName: 'Horvat',
    nickname: 'Ana H.',
    slug: 'ana-horvat',
    email: 'ana.horvat@radio-roza.org',
    phone: '+385 91 234 5678',
    bio: 'Glazbena urednica i voditeljica s više od 10 godina iskustva u radijskom eteru. Specijalizirana za alternativnu i indie glazbu.',
    avatar: '/avatars/ana-horvat.jpg',
    userId: 'usr_002', // Vezana uz korisnika
    isActive: true,
    joinedDate: '2021-03-20T09:00:00Z',
    social: {
      twitter: 'https://twitter.com/anahrvt',
      instagram: 'https://instagram.com/ana.horvat.music',
      facebook: 'https://facebook.com/ana.horvat.roza',
      linkedin: 'https://linkedin.com/in/ana-horvat',
      website: 'https://anahrvt.com',
      bandcamp: null,
      soundcloud: null,
      mixcloud: 'https://mixcloud.com/anahrvt'
    },
    expertise: ['glazbeno novinarstvo', 'indie glazba', 'intervjui', 'glazbena produkcija'],
    stats: {
      articlesCount: 127,
      showsCount: 3,
      episodesCount: 156
    }
  },
  {
    id: 'auth_002',
    firstName: 'Marko',
    lastName: 'Novak',
    nickname: 'DJ Novak',
    slug: 'marko-novak',
    email: 'marko.novak@radio-roza.org',
    phone: '+385 98 765 4321',
    bio: 'DJ i producent elektroničke glazbe. Vodi emisiju "Elektronski Puls" svake subote od 22h.',
    avatar: '/avatars/marko-novak.jpg',
    userId: 'usr_003',
    isActive: true,
    joinedDate: '2021-06-10T12:00:00Z',
    social: {
      twitter: 'https://twitter.com/djnovak',
      instagram: 'https://instagram.com/djnovak_official',
      facebook: null,
      linkedin: null,
      website: 'https://djnovak.hr',
      bandcamp: 'https://djnovak.bandcamp.com',
      soundcloud: 'https://soundcloud.com/djnovak',
      mixcloud: 'https://mixcloud.com/djnovak'
    },
    expertise: ['elektronička glazba', 'techno', 'house', 'DJ mixevi'],
    stats: {
      articlesCount: 45,
      showsCount: 1,
      episodesCount: 89
    }
  },
  {
    id: 'auth_003',
    firstName: 'Petra',
    lastName: 'Šimić',
    nickname: 'Petra',
    slug: 'petra-simic',
    email: 'petra.simic@radio-roza.org',
    phone: null,
    bio: 'Kulturna novinarka i kritičarka. Piše o kazalištu, filmu i suvremenoj umjetnosti.',
    avatar: '/avatars/petra-simic.jpg',
    userId: 'usr_004',
    isActive: true,
    joinedDate: '2022-01-05T14:30:00Z',
    social: {
      twitter: null,
      instagram: 'https://instagram.com/petra.arts',
      facebook: 'https://facebook.com/petra.simic.journalist',
      linkedin: 'https://linkedin.com/in/petra-simic',
      website: null,
      bandcamp: null,
      soundcloud: null,
      mixcloud: null
    },
    expertise: ['kulturno novinarstvo', 'kazalište', 'film', 'suvremena umjetnost'],
    stats: {
      articlesCount: 89,
      showsCount: 2,
      episodesCount: 67
    }
  },
  {
    id: 'auth_004',
    firstName: 'Ivan',
    lastName: 'Babić',
    nickname: 'Baba',
    slug: 'ivan-babic',
    email: 'ivan.babic@radio-roza.org',
    phone: '+385 95 111 2222',
    bio: 'Voditelj jutarnjeg programa i humorist. Poznati po satiričnim komentarima društvenih tema.',
    avatar: '/avatars/ivan-babic.jpg',
    userId: 'usr_005',
    isActive: true,
    joinedDate: '2022-09-12T11:00:00Z',
    social: {
      twitter: 'https://twitter.com/babajutarnji',
      instagram: 'https://instagram.com/baba_jutarnji',
      facebook: 'https://facebook.com/ivan.babic.comedy',
      linkedin: null,
      website: null,
      bandcamp: null,
      soundcloud: null,
      mixcloud: null,
      youtube: 'https://youtube.com/@babajutarnji'
    },
    expertise: ['humor', 'satira', 'jutarnji program', 'stand-up'],
    stats: {
      articlesCount: 23,
      showsCount: 1,
      episodesCount: 234
    }
  },
  {
    id: 'auth_005',
    firstName: 'Lucija',
    lastName: 'Kovačević',
    nickname: 'Lucy',
    slug: 'lucija-kovacevic',
    email: 'lucija.k@gmail.com',
    phone: null,
    bio: 'Freelance glazbena novinarka i fotografkinja. Specijalizirana za punk i hardcore scenu.',
    avatar: '/avatars/lucija-kovacevic.jpg',
    userId: null, // Gost autor, nema korisnički račun
    isActive: true,
    joinedDate: '2023-02-15T10:00:00Z',
    social: {
      twitter: null,
      instagram: 'https://instagram.com/lucy_punk_photos',
      facebook: null,
      linkedin: null,
      website: 'https://lucypunkphotos.com',
      bandcamp: null,
      soundcloud: null,
      mixcloud: null
    },
    expertise: ['punk glazba', 'hardcore', 'koncertna fotografija', 'glazbeno novinarstvo'],
    stats: {
      articlesCount: 34,
      showsCount: 0,
      episodesCount: 12
    }
  },
  {
    id: 'auth_006',
    firstName: 'Tomislav',
    lastName: 'Jurić',
    nickname: 'Tomo',
    slug: 'tomislav-juric',
    email: 'tomo.juric@outlook.com',
    phone: '+385 99 333 4444',
    bio: 'Jazz entuzijast i saksofonist. Vodi emisiju "Jazz Corner" svakog četvrtka.',
    avatar: '/avatars/tomislav-juric.jpg',
    userId: null, // Vanjski suradnik
    isActive: true,
    joinedDate: '2020-11-01T14:00:00Z',
    social: {
      twitter: 'https://twitter.com/tomojazz',
      instagram: 'https://instagram.com/tomo.jazz.sax',
      facebook: null,
      linkedin: null,
      website: null,
      bandcamp: 'https://tomojazz.bandcamp.com',
      soundcloud: 'https://soundcloud.com/tomojazz',
      mixcloud: null
    },
    expertise: ['jazz', 'saksofon', 'glazbena teorija', 'improvizacija'],
    stats: {
      articlesCount: 56,
      showsCount: 1,
      episodesCount: 178
    }
  },
  {
    id: 'auth_007',
    firstName: 'Maja',
    lastName: 'Vuković',
    nickname: 'Maja V.',
    slug: 'maja-vukovic',
    email: 'maja.vukovic@radio-roza.org',
    phone: null,
    bio: 'Voditeljica emisije o društvenim temama i aktivistica. Bavi se pitanjima jednakosti i ljudskih prava.',
    avatar: '/avatars/maja-vukovic.jpg',
    userId: null,
    isActive: true,
    joinedDate: '2021-09-20T09:30:00Z',
    social: {
      twitter: 'https://twitter.com/majavuk',
      instagram: 'https://instagram.com/maja.vukovic.activism',
      facebook: 'https://facebook.com/maja.vukovic.roza',
      linkedin: 'https://linkedin.com/in/maja-vukovic',
      website: null,
      bandcamp: null,
      soundcloud: null,
      mixcloud: null
    },
    expertise: ['društvene teme', 'aktivizam', 'ljudska prava', 'feminizam'],
    stats: {
      articlesCount: 102,
      showsCount: 2,
      episodesCount: 145
    }
  },
  {
    id: 'auth_008',
    firstName: 'Damir',
    lastName: 'Pavić',
    nickname: null,
    slug: 'damir-pavic',
    email: 'damir.pavic@gmail.com',
    phone: null,
    bio: 'Glazbeni producent i inženjer zvuka. Stručnjak za audio produkciju i mastering.',
    avatar: '/avatars/damir-pavic.jpg',
    userId: null,
    isActive: false, // Trenutno neaktivan
    joinedDate: '2020-05-10T11:00:00Z',
    social: {
      twitter: null,
      instagram: null,
      facebook: null,
      linkedin: 'https://linkedin.com/in/damir-pavic-audio',
      website: 'https://pavicaudio.hr',
      bandcamp: null,
      soundcloud: 'https://soundcloud.com/pavicaudio',
      mixcloud: null
    },
    expertise: ['audio produkcija', 'mastering', 'mixing', 'zvučna tehnika'],
    stats: {
      articlesCount: 12,
      showsCount: 0,
      episodesCount: 34
    }
  }
];

// Helper funkcije za rad s autorima
export function getAuthorById(id) {
  return authors.find(author => author.id === id);
}

export function getAuthorBySlug(slug) {
  return authors.find(author => author.slug === slug);
}

export function getAuthorByUserId(userId) {
  return authors.find(author => author.userId === userId);
}

export function getActiveAuthors() {
  return authors.filter(author => author.isActive);
}

export function getGuestAuthors() {
  return authors.filter(author => author.userId === null);
}

export function getAuthorFullName(authorId) {
  const author = getAuthorById(authorId);
  if (!author) return null;
  return author.nickname || `${author.firstName} ${author.lastName}`;
}

export function getAuthorsByExpertise(expertise) {
  return authors.filter(author =>
    author.expertise.some(exp =>
      exp.toLowerCase().includes(expertise.toLowerCase())
    )
  );
}

export function getAuthorsWithShows() {
  return authors.filter(author => author.stats.showsCount > 0);
}

export default authors;
