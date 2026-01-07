// Mock Shows for Radio Roža
// Radijske emisije - tematski blokovi i govorne emisije

export const shows = [
  {
    id: 'show_001',
    title: 'Jutarnji Program',
    slug: 'jutarnji-program',
    type: 'govorna_emisija', // 'tematski_blok' ili 'govorna_emisija'
    description: 'Započnite dan uz dobru glazbu, aktualne informacije i dozu humora. Jutarnji program koji vas budi s osmijehom.',
    longDescription: `Jutarnji program Radio Rože je vaš svakodnevni pratitelj od 7 do 10 sati.
    Kombinacija dobre glazbe, aktualnih informacija, vremenskih prognoza i humorističnih umetaka
    čini ovaj program omiljenim jutarnjim ritualom mnogih slušatelja. Voditelj Ivan Babić poznat
    je po svojim satiričnim komentarima društvenih tema i sposobnosti da i najteže jutro učini podnošljivim.`,
    isExternal: false, // false = interni suradnici, true = vanjski suradnici
    isActive: true,
    startDate: '2022-09-15T00:00:00Z',
    endDate: null, // null znači da je još uvijek aktivna
    cover: {
      small: '/images/shows/jutarnji-program-small.jpg',
      medium: '/images/shows/jutarnji-program-medium.jpg',
      large: '/images/shows/jutarnji-program-large.jpg',
      alt: 'Jutarnji Program cover'
    },
    hosts: ['auth_004'], // ID-jevi autora koji vode emisiju
    schedule: {
      dayOfWeek: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
      startTime: '07:00',
      endTime: '10:00',
      timezone: 'Europe/Zagreb',
      frequency: 'weekly',
      isLive: true
    },
    categories: ['razgovor', 'humor', 'vijesti', 'glazba'],
    tags: ['jutro', 'humor', 'satira', 'aktualno', 'live'],
    social: {
      facebook: 'https://facebook.com/jutarnjiprogram.roza',
      instagram: 'https://instagram.com/jutarnji.roza',
      twitter: null,
      youtube: 'https://youtube.com/@jutarnjiprogram',
      website: null,
      email: 'jutarnji@radio-roza.org'
    },
    stats: {
      totalEpisodes: 234,
      averageListeners: 1250,
      rating: 4.8
    },
    metadata: {
      language: 'hr',
      targetAudience: 'opća publika',
      productionType: 'live',
      recordingLocation: 'Studio A, Radio Roža'
    }
  },
  {
    id: 'show_002',
    title: 'Elektronski Puls',
    slug: 'elektronski-puls',
    type: 'tematski_blok',
    description: 'Najbolja elektronička glazba - od techna do housea, od tranca do drum\'n\'bassa.',
    longDescription: `Elektronski Puls je emisija posvećena ljubiteljima elektroničke glazbe.
    Svake subote od 22 do ponoći, DJ Novak vodi vas kroz najnovije trendove elektroničke scene,
    premijerno predstavlja nove izdanja domaćih i stranih umjetnika te mixa ekskluzivne setove.
    Emisija redovito ugošćuje poznate DJ-e i producente koji dijele svoje glazbene priče.`,
    isExternal: false,
    isActive: true,
    startDate: '2021-06-20T00:00:00Z',
    endDate: null,
    cover: {
      small: '/images/shows/elektronski-puls-small.jpg',
      medium: '/images/shows/elektronski-puls-medium.jpg',
      large: '/images/shows/elektronski-puls-large.jpg',
      alt: 'Elektronski Puls cover'
    },
    hosts: ['auth_002'],
    schedule: {
      dayOfWeek: ['saturday'],
      startTime: '22:00',
      endTime: '00:00',
      timezone: 'Europe/Zagreb',
      frequency: 'weekly',
      isLive: true
    },
    categories: ['glazba', 'elektronička glazba'],
    tags: ['techno', 'house', 'trance', 'drum and bass', 'dj mix', 'elektronika'],
    social: {
      facebook: 'https://facebook.com/elektronskipuls',
      instagram: 'https://instagram.com/elektronski.puls',
      twitter: 'https://twitter.com/epuls_roza',
      youtube: null,
      website: 'https://elektronskipuls.hr',
      email: 'epuls@radio-roza.org',
      mixcloud: 'https://mixcloud.com/elektronskipuls'
    },
    stats: {
      totalEpisodes: 89,
      averageListeners: 2100,
      rating: 4.9
    },
    metadata: {
      language: 'hr',
      targetAudience: 'ljubitelji elektroničke glazbe',
      productionType: 'live',
      recordingLocation: 'Studio B, Radio Roža'
    }
  },
  {
    id: 'show_003',
    title: 'Jazz Corner',
    slug: 'jazz-corner',
    type: 'tematski_blok',
    description: 'Otkrijte čari jazza - od klasika do suvremenih eksperimenata.',
    longDescription: `Jazz Corner je emisija koja slavi bogatu tradiciju i konstantnu evoluciju jazz glazbe.
    Voditelj Tomislav Jurić, sam jazz saksofonist, donosi vam najkvalitetniju selekciju jazz standarda,
    bebopa, cool jazza, fusion i suvremenih jazz eksperimenata. Emisija često uključuje intervjue s
    domaćim i stranim jazz glazbenicima te ekskluzivne snimke s koncerata.`,
    isExternal: true, // Vanjski suradnik
    isActive: true,
    startDate: '2020-11-05T00:00:00Z',
    endDate: null,
    cover: {
      small: '/images/shows/jazz-corner-small.jpg',
      medium: '/images/shows/jazz-corner-medium.jpg',
      large: '/images/shows/jazz-corner-large.jpg',
      alt: 'Jazz Corner cover'
    },
    hosts: ['auth_006'],
    schedule: {
      dayOfWeek: ['thursday'],
      startTime: '20:00',
      endTime: '22:00',
      timezone: 'Europe/Zagreb',
      frequency: 'weekly',
      isLive: false
    },
    categories: ['glazba', 'jazz'],
    tags: ['jazz', 'bebop', 'swing', 'fusion', 'improvizacija', 'saksofon'],
    social: {
      facebook: 'https://facebook.com/jazzcorner.roza',
      instagram: 'https://instagram.com/jazz.corner.roza',
      twitter: 'https://twitter.com/jazzcorner_hr',
      youtube: null,
      website: null,
      email: 'jazz@radio-roza.org'
    },
    stats: {
      totalEpisodes: 178,
      averageListeners: 890,
      rating: 4.7
    },
    metadata: {
      language: 'hr',
      targetAudience: 'jazz ljubitelji',
      productionType: 'pre-recorded',
      recordingLocation: 'External Studio'
    }
  },
  {
    id: 'show_004',
    title: 'Indie Vibes',
    slug: 'indie-vibes',
    type: 'tematski_blok',
    description: 'Najbolja alternativna i indie glazba iz Hrvatske i svijeta.',
    longDescription: `Indie Vibes je emisija posvećena alternativnoj i nezavisnoj glazbenoj sceni.
    Ana Horvat svaki ponedjeljak predstavlja najnovija izdanja indie bendova, intervjue s glazbenicima
    te ekskluzivne akustične sessione. Emisija je poznata po otkrivanju novih talenata i praćenju
    underground scene.`,
    isExternal: false,
    isActive: true,
    startDate: '2021-03-25T00:00:00Z',
    endDate: null,
    cover: {
      small: '/images/shows/indie-vibes-small.jpg',
      medium: '/images/shows/indie-vibes-medium.jpg',
      large: '/images/shows/indie-vibes-large.jpg',
      alt: 'Indie Vibes cover'
    },
    hosts: ['auth_001'],
    schedule: {
      dayOfWeek: ['monday'],
      startTime: '19:00',
      endTime: '21:00',
      timezone: 'Europe/Zagreb',
      frequency: 'weekly',
      isLive: true
    },
    categories: ['glazba', 'alternativa'],
    tags: ['indie', 'alternative', 'rock', 'shoegaze', 'dream pop', 'post-punk'],
    social: {
      facebook: 'https://facebook.com/indievibes.roza',
      instagram: 'https://instagram.com/indie.vibes.roza',
      twitter: null,
      youtube: 'https://youtube.com/@indievibesroza',
      website: null,
      email: 'indie@radio-roza.org'
    },
    stats: {
      totalEpisodes: 145,
      averageListeners: 1670,
      rating: 4.8
    },
    metadata: {
      language: 'hr',
      targetAudience: 'mladi odrasli',
      productionType: 'live',
      recordingLocation: 'Studio A, Radio Roža'
    }
  },
  {
    id: 'show_005',
    title: 'Kulturni Puls',
    slug: 'kulturni-puls',
    type: 'govorna_emisija',
    description: 'Razgovori o kulturi, umjetnosti, kazalištu i filmu.',
    longDescription: `Kulturni Puls je emisija koja prati kulturna zbivanja u gradu i šire.
    Petra Šimić i Ana Horvat razgovaraju s umjetnicima, kritičarima i kulturnim djelatnicima
    o aktualnim događanjima, premijerama, izložbama i festivalima. Emisija donosi recenzije,
    najave i ekskluzivne intervjue.`,
    isExternal: false,
    isActive: true,
    startDate: '2022-01-10T00:00:00Z',
    endDate: null,
    cover: {
      small: '/images/shows/kulturni-puls-small.jpg',
      medium: '/images/shows/kulturni-puls-medium.jpg',
      large: '/images/shows/kulturni-puls-large.jpg',
      alt: 'Kulturni Puls cover'
    },
    hosts: ['auth_003', 'auth_001'],
    schedule: {
      dayOfWeek: ['wednesday'],
      startTime: '18:00',
      endTime: '19:30',
      timezone: 'Europe/Zagreb',
      frequency: 'weekly',
      isLive: false
    },
    categories: ['kultura', 'razgovor', 'umjetnost'],
    tags: ['kultura', 'kazalište', 'film', 'izložbe', 'književnost', 'umjetnost'],
    social: {
      facebook: 'https://facebook.com/kulturnipuls.roza',
      instagram: 'https://instagram.com/kulturni.puls',
      twitter: null,
      youtube: null,
      website: null,
      email: 'kultura@radio-roza.org'
    },
    stats: {
      totalEpisodes: 98,
      averageListeners: 1120,
      rating: 4.6
    },
    metadata: {
      language: 'hr',
      targetAudience: 'ljubitelji kulture',
      productionType: 'pre-recorded',
      recordingLocation: 'Studio A, Radio Roža'
    }
  },
  {
    id: 'show_006',
    title: 'Društveni Kompas',
    slug: 'drustveni-kompas',
    type: 'govorna_emisija',
    description: 'Emisija o društvenim temama, aktivizmu i ljudskim pravima.',
    longDescription: `Društveni Kompas je emisija koja se bavi aktualnim društvenim pitanjima,
    od ljudskih prava do ekologije, od rodne ravnopravnosti do socijalnih pitanja.
    Maja Vuković razgovara s aktivistima, stručnjacima i građanima koji mijenjaju društvo nabolje.`,
    isExternal: false,
    isActive: true,
    startDate: '2021-09-25T00:00:00Z',
    endDate: null,
    cover: {
      small: '/images/shows/drustveni-kompas-small.jpg',
      medium: '/images/shows/drustveni-kompas-medium.jpg',
      large: '/images/shows/drustveni-kompas-large.jpg',
      alt: 'Društveni Kompas cover'
    },
    hosts: ['auth_007'],
    schedule: {
      dayOfWeek: ['tuesday'],
      startTime: '17:00',
      endTime: '18:30',
      timezone: 'Europe/Zagreb',
      frequency: 'weekly',
      isLive: true
    },
    categories: ['društvo', 'razgovor', 'aktivizam'],
    tags: ['društvo', 'aktivizam', 'ljudska prava', 'ekologija', 'feminizam', 'jednakost'],
    social: {
      facebook: 'https://facebook.com/drustveni.kompas',
      instagram: 'https://instagram.com/drustveni.kompas',
      twitter: 'https://twitter.com/dkompas_roza',
      youtube: null,
      website: null,
      email: 'drustvo@radio-roza.org'
    },
    stats: {
      totalEpisodes: 112,
      averageListeners: 980,
      rating: 4.7
    },
    metadata: {
      language: 'hr',
      targetAudience: 'društveno angažirani građani',
      productionType: 'live',
      recordingLocation: 'Studio C, Radio Roža'
    }
  },
  {
    id: 'show_007',
    title: 'Noćni Ritam',
    slug: 'nocni-ritam',
    type: 'tematski_blok',
    description: 'Glazba za kasne sate - ambient, chill-out i downtempo.',
    longDescription: `Noćni Ritam je emisija dizajnirana za opuštanje i kontemplaciju.
    Od ponoći do 2 ujutro vikendom, emisija donosi pažljivo odabranu ambient, chill-out
    i downtempo glazbu koja stvara savršenu atmosferu za kasne noćne sate.`,
    isExternal: false,
    isActive: false, // Trenutno neaktivna
    startDate: '2020-02-01T00:00:00Z',
    endDate: '2023-12-31T23:59:59Z',
    cover: {
      small: '/images/shows/nocni-ritam-small.jpg',
      medium: '/images/shows/nocni-ritam-medium.jpg',
      large: '/images/shows/nocni-ritam-large.jpg',
      alt: 'Noćni Ritam cover'
    },
    hosts: ['auth_008'],
    schedule: {
      dayOfWeek: ['friday', 'saturday'],
      startTime: '00:00',
      endTime: '02:00',
      timezone: 'Europe/Zagreb',
      frequency: 'weekly',
      isLive: false
    },
    categories: ['glazba', 'ambient'],
    tags: ['ambient', 'chill-out', 'downtempo', 'relaxation', 'night'],
    social: {
      facebook: null,
      instagram: null,
      twitter: null,
      youtube: null,
      website: null,
      email: 'nocni@radio-roza.org'
    },
    stats: {
      totalEpisodes: 180,
      averageListeners: 560,
      rating: 4.5
    },
    metadata: {
      language: 'hr',
      targetAudience: 'noćne ptice',
      productionType: 'pre-recorded',
      recordingLocation: 'Studio B, Radio Roža'
    }
  }
];

// Helper funkcije za rad s emisijama
export function getShowById(id) {
  return shows.find(show => show.id === id);
}

export function getShowBySlug(slug) {
  return shows.find(show => show.slug === slug);
}

export function getActiveShows() {
  return shows.filter(show => show.isActive);
}

export function getInactiveShows() {
  return shows.filter(show => !show.isActive);
}

export function getShowsByType(type) {
  return shows.filter(show => show.type === type);
}

export function getShowsByHost(authorId) {
  return shows.filter(show => show.hosts.includes(authorId));
}

export function getExternalShows() {
  return shows.filter(show => show.isExternal);
}

export function getInternalShows() {
  return shows.filter(show => !show.isExternal);
}

export function getShowsByDayOfWeek(day) {
  return shows.filter(show =>
    show.schedule.dayOfWeek.includes(day.toLowerCase())
  );
}

export function getLiveShows() {
  return shows.filter(show =>
    show.schedule.isLive && show.isActive
  );
}

export function getShowsByCategory(category) {
  return shows.filter(show =>
    show.categories.includes(category.toLowerCase())
  );
}

export function getShowsByTag(tag) {
  return shows.filter(show =>
    show.tags.includes(tag.toLowerCase())
  );
}

export default shows;
