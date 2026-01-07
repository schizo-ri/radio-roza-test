// Mock Articles for Radio Roža
// Poboljšana struktura članaka s dodatnim poljima i vezama

export const articles = [
  {
    id: 'art_001',
    title: 'Nova sezona Elektronskog Pulsa donosi svjetske DJ zvijezde',
    slug: 'nova-sezona-elektronskog-pulsa-svjetske-dj-zvijezde',
    excerpt: 'DJ Novak najavljuje ekskluzivne goste iz Berlina, Londona i Detroita koji će obilježiti proljetnu sezonu najpopularnije elektroničke emisije.',
    content: `<p>Nakon uspješne zimske sezone, emisija Elektronski Puls priprema niz uzbudljivih epizoda s gostima koji definiraju svjetsku elektroničku scenu. DJ Novak ekskluzivno za Radio Rožu otkriva imena koja će gostovati u emisiji tijekom sljedećih mjeseci.</p>

    <p>"Ova sezona bit će posebna jer dovodimo umjetnike koji rijetko gostuju u Hrvatskoj. Razgovarali smo s nekoliko legendarnih imena iz Berghaina, fabric-a i Movement festivala," kaže Novak.</p>

    <h2>Berghain zvijezde u eteru</h2>
    <p>Među potvrdenim gostima su rezidenti kultnog berlinskog kluba Berghain - Ben Klock i Marcel Dettmann. Obojica će pripremiti ekskluzivne mixeve za našu publiku, a Klock će čak održati i online masterclass o techno produkciji.</p>

    <p>"Ben Klock je ikona berlinskog techna. Njegov pristup je minimalistički ali iznimno moćan. Mix koji priprema za nas bit će snimljen u njegovom studiju i sadržavat će nekoliko neobjavljenih tracka," objašnjava Novak.</p>

    <h2>Detroit techno legende</h2>
    <p>Iz Detroita, rodnog grada techna, stiže Jeff Mills koji će u posebnoj dvodijelnoj epizodi predstaviti svoju viziju budućnosti elektroničke glazbe. Mills, poznat po svom futurističkom pristupu, pripremit će i ekskluzivni sci-fi techno set.</p>

    <blockquote>"Techno je uvijek bio glazba budućnosti. U Radio Roži prepoznajem platformu koja dijeli tu viziju," izjavio je Mills.</blockquote>

    <h2>Domaći talenti</h2>
    <p>Emisija neće zaboraviti ni domaću scenu. Planiran je showcase mladih hrvatskih producenata koji osvajaju svjetske dance floor-ove. Petar Dundov, Ilija Rudman i mladi talent Volster pripremat će posebne setove.</p>

    <p>Sve epizode možete slušati subotom od 22 do ponoći na Radio Roži, a snimke su dostupne na našem Mixcloud profilu.</p>`,
    authorId: 'auth_001', // Ana Horvat
    categoryId: 'cat_001', // Glazba
    tags: ['elektronička glazba', 'techno', 'berlin', 'detroit', 'dj', 'elektronski puls'],
    featuredImage: {
      small: '/images/articles/elektronski-puls-nova-sezona-small.jpg',
      medium: '/images/articles/elektronski-puls-nova-sezona-medium.jpg',
      large: '/images/articles/elektronski-puls-nova-sezona-large.jpg',
      alt: 'DJ Novak u studiju Radio Rože',
      caption: 'DJ Novak priprema novu sezonu Elektronskog Pulsa',
      credits: 'Foto: Marko Špoljar'
    },
    gallery: [
      {
        small: '/images/articles/gallery/berghain-small.jpg',
        medium: '/images/articles/gallery/berghain-medium.jpg',
        large: '/images/articles/gallery/berghain-large.jpg',
        alt: 'Berghain klub u Berlinu',
        caption: 'Legendardni Berghain odakle dolaze gosti emisije'
      }
    ],
    status: 'published', // draft, published, archived, scheduled
    publishedDate: '2024-01-10T10:00:00Z',
    updatedDate: '2024-01-10T14:30:00Z',
    scheduledDate: null,
    featured: true,
    sticky: false,
    readTime: 5, // minuta
    viewCount: 2345,
    relatedArticles: ['art_003', 'art_005'],
    relatedShows: ['show_002'],
    relatedEpisodes: ['ep_003', 'ep_004'],
    embeds: [
      {
        type: 'mixcloud',
        url: 'https://www.mixcloud.com/widget/iframe/?feed=/elektronskipuls/preview/',
        title: 'Elektronski Puls - Preview Mix'
      }
    ],
    seo: {
      metaTitle: 'Nova sezona Elektronskog Pulsa - Svjetske DJ zvijezde | Radio Roža',
      metaDescription: 'DJ Novak najavljuje ekskluzivne goste iz Berlina, Londona i Detroita. Ben Klock, Marcel Dettmann i Jeff Mills u emisiji Elektronski Puls.',
      keywords: ['elektronski puls', 'techno', 'dj novak', 'berghain', 'ben klock', 'jeff mills', 'radio roža'],
      ogImage: '/images/articles/elektronski-puls-nova-sezona-og.jpg',
      ogType: 'article',
      canonicalUrl: 'https://radio-roza.org/clanci/nova-sezona-elektronskog-pulsa-svjetske-dj-zvijezde'
    },
    comments: {
      enabled: true,
      count: 23,
      featured: [
        {
          id: 'comm_001',
          author: 'TechnoLover',
          content: 'Jedva čekam Jeff Mills epizodu!',
          date: '2024-01-10T11:30:00Z'
        }
      ]
    }
  },
  {
    id: 'art_002',
    title: 'Intervju: Vlasta Popić o novom albumu "Sjena Grada"',
    slug: 'intervju-vlasta-popic-novi-album-sjena-grada',
    excerpt: 'Razgovarali smo s članovima benda Vlasta Popić o njihovom drugom studijskom albumu koji istražuje urbanu alijenaciju i nostalgiju.',
    content: `<p>Nakon dvije godine od uspješnog debitantskog albuma, zagrebački indie rock bend Vlasta Popić vraća se s ambicioznim projektom "Sjena Grada". Album koji izlazi 15. veljače predstavlja zreliji i mračniji zvuk benda.</p>

    <h2>Evolucija zvuka</h2>
    <p>Frontmen Matija Vlašić objašnjava kako je bend evoluirao: "Prvi album bio je sirov i energičan, snimljen u garaži. Za 'Sjenu Grada' smo ušli u pravi studio i eksperimentirali s analognim sintesajzerima i ambijentnim zvukovima."</p>

    <p>Gitarist Luka Novak dodaje: "Htjeli smo uhvatiti osjećaj života u gradu koji se mijenja prenaglo. Zagreb više nije grad u kojem smo odrasli, i ta nostalgija prožima cijeli album."</p>

    <h2>Tematski koncept</h2>
    <p>Album je konceptualan, s deset pjesama koje prate protagonista kroz jedan dan u gradu. Od jutarnje gužve do noćnih lutanja, svaka pjesma predstavlja drugo emocionalno stanje.</p>

    <blockquote>"Htjeli smo da album bude poput soundtracka za film koji se nikad nije snimio," kaže basist Ana Kovač.</blockquote>

    <h2>Produkcija i gosti</h2>
    <p>Album je producirao Damir Martinović Mrle, što je benddu dalo novu dimenziju. "Mrle nas je gurnuo izvan zone komfora. Natjerao nas je da svaku pjesmu rastavimo do temelja i ponovno izgradimo," objašnjava Vlašić.</p>

    <p>Na albumu gostuju i Svemirko na pjesmi "Pluton" te Ida Prester koja pjeva backing vokale na "Noćnoj Vožnji".</p>

    <h2>Promocija i koncerti</h2>
    <p>Promocijski koncert održat će se 20. veljače u Tvornici kulture, a bend najavljuje i mini turneju po regionalnim klubovima.</p>

    <p>"Uživo ćemo pjesme predstaviti s proširenom postavom - dovodimo violončelo i dodatne sintesajzere," otkriva Novak.</p>

    <p>Album "Sjena Grada" bit će dostupan na svim streaming platformama, a limitirana vinilna izdanja mogu se predbilježiti preko Bandcampa.</p>`,
    authorId: 'auth_003', // Petra Šimić
    categoryId: 'cat_002', // Kultura
    tags: ['vlasta popić', 'indie rock', 'novi album', 'intervju', 'hrvatska glazba', 'zagreb'],
    featuredImage: {
      small: '/images/articles/vlasta-popic-intervju-small.jpg',
      medium: '/images/articles/vlasta-popic-intervju-medium.jpg',
      large: '/images/articles/vlasta-popic-intervju-large.jpg',
      alt: 'Bend Vlasta Popić',
      caption: 'Vlasta Popić u studiju tijekom snimanja albuma',
      credits: 'Foto: Igor Pavlović'
    },
    gallery: [],
    status: 'published',
    publishedDate: '2024-01-09T12:00:00Z',
    updatedDate: '2024-01-09T12:00:00Z',
    scheduledDate: null,
    featured: true,
    sticky: false,
    readTime: 7,
    viewCount: 1890,
    relatedArticles: ['art_004', 'art_006'],
    relatedShows: ['show_004'],
    relatedEpisodes: ['ep_006'],
    embeds: [
      {
        type: 'youtube',
        url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        title: 'Vlasta Popić - Sjena Grada (Official Video)'
      },
      {
        type: 'bandcamp',
        url: 'https://bandcamp.com/EmbeddedPlayer/album=1234567890',
        title: 'Sjena Grada - Album Stream'
      }
    ],
    seo: {
      metaTitle: 'Intervju: Vlasta Popić o novom albumu "Sjena Grada" | Radio Roža',
      metaDescription: 'Ekskluzivni intervju s bendom Vlasta Popić o njihovom drugom albumu koji istražuje urbanu alijenaciju i nostalgiju Zagreba.',
      keywords: ['vlasta popić', 'sjena grada', 'indie rock', 'hrvatski bend', 'novi album', 'intervju'],
      ogImage: '/images/articles/vlasta-popic-intervju-og.jpg',
      ogType: 'article',
      canonicalUrl: 'https://radio-roza.org/clanci/intervju-vlasta-popic-novi-album-sjena-grada'
    },
    comments: {
      enabled: true,
      count: 45,
      featured: []
    }
  },
  {
    id: 'art_003',
    title: 'Klimatski aktivizam kroz glazbu: Kako umjetnici podižu svijest',
    slug: 'klimatski-aktivizam-kroz-glazbu',
    excerpt: 'Od Radioheada do lokalnih punk bendova - istražujemo kako glazbenici koriste svoju platformu za borbu protiv klimatskih promjena.',
    content: `<p>Glazba oduvijek je bila moćan alat društvenih promjena, a danas sve više umjetnika koristi svoj utjecaj za podizanje svijesti o klimatskoj krizi. Od globalnih zvijezda do underground bendova, glazbena industrija se mobilizira.</p>

    <h2>Globalni pokret</h2>
    <p>Radiohead prednjači s carbon-neutral turnejama, Billie Eilish eliminira jednokratnu plastiku s koncerata, dok Massive Attack radi na istraživanju kako smanjiti ugljični otisak live nastupa.</p>

    <p>"Ne možemo pjevati o budućnosti ako je ne štitimo," izjavila je Billie Eilish na klimatskom summitu.</p>

    <h2>Lokalna scena se budi</h2>
    <p>U Hrvatskoj, punk bend Klimatske Promjene (da, tako se stvarno zovu) organizira koncerte na solarnu energiju. "Htjeli smo pokazati da se može. Naš posljednji koncert u Medici bio je potpuno na obnovljivu energiju," kaže gitarist Marko.</p>

    <p>Elektronički duo EkoRave organizira "plogging" evente - kombinaciju trcanja, čišćenja okoliša i rejvanja.</p>

    <h2>Festivali mijenjaju praksu</h2>
    <p>INmusic festival uveo je sustav recikliranja i besplatan ulaz za one koji dođu biciklom. Outlook festival ima vlastitu solarnu elektranu.</p>

    <blockquote>"Festivali imaju ogromnu odgovornost. Okupljamo tisuće mladih ljudi - moramo biti primjer," kaže organizator INmusic-a.</blockquote>

    <h2>Kritike i izazovi</h2>
    <p>Neki kritiziraju "greenwashing" - površno zeleno brendiranje bez stvarnih promjena. "Nije dovoljno imati recikliranje ako dovodiš bendove privatnim avionima," upozorava aktivist Pero Kvrgić.</p>

    <p>Ipak, promjena je vidljiva. Mladi glazbenici sve češće odbijaju sponzorstva fosilnih kompanija i traže eko-friendly venue.</p>

    <h2>Što možete učiniti?</h2>
    <ul>
    <li>Idite na koncerte javnim prijevozom ili biciklom</li>
    <li>Nosite svoju bocu za vodu</li>
    <li>Podržite umjetnike koji se zalažu za klimu</li>
    <li>Zahtijevajte od festivala zelene opcije</li>
    </ul>

    <p>Glazba može biti soundtrack revolucije - klimatske revolucije koju trebamo sada.</p>`,
    authorId: 'auth_007', // Maja Vuković
    categoryId: 'cat_003', // Društvo
    tags: ['klimatske promjene', 'aktivizam', 'glazba', 'ekologija', 'festivali', 'održivost'],
    featuredImage: {
      small: '/images/articles/klimatski-aktivizam-glazba-small.jpg',
      medium: '/images/articles/klimatski-aktivizam-glazba-medium.jpg',
      large: '/images/articles/klimatski-aktivizam-glazba-large.jpg',
      alt: 'Koncert na solarnu energiju',
      caption: 'Bend Klimatske Promjene na solar-powered koncertu',
      credits: 'Foto: Ana Zelenko'
    },
    gallery: [],
    status: 'published',
    publishedDate: '2024-01-08T09:00:00Z',
    updatedDate: '2024-01-08T15:20:00Z',
    scheduledDate: null,
    featured: false,
    sticky: false,
    readTime: 8,
    viewCount: 3210,
    relatedArticles: ['art_007', 'art_008'],
    relatedShows: ['show_006'],
    relatedEpisodes: ['ep_008'],
    embeds: [],
    seo: {
      metaTitle: 'Klimatski aktivizam kroz glazbu - Kako umjetnici podižu svijest | Radio Roža',
      metaDescription: 'Istražujemo kako glazbenici od Radioheada do lokalnih punk bendova koriste svoju platformu za borbu protiv klimatskih promjena.',
      keywords: ['klimatske promjene', 'glazba', 'aktivizam', 'ekologija', 'održivost', 'festivali'],
      ogImage: '/images/articles/klimatski-aktivizam-glazba-og.jpg',
      ogType: 'article',
      canonicalUrl: 'https://radio-roza.org/clanci/klimatski-aktivizam-kroz-glazbu'
    },
    comments: {
      enabled: true,
      count: 67,
      featured: []
    }
  },
  {
    id: 'art_004',
    title: 'Jazz u Hrvatskoj: Scena koja ne prestaje iznenađivati',
    slug: 'jazz-u-hrvatskoj-scena-koja-iznenadjuje',
    excerpt: 'Od zagrebačkih klubova do splitskih festivala - hrvatska jazz scena doživljava renesansu s novom generacijom glazbenika.',
    content: `<p>Dok mnogi misle da je jazz "mrtva" glazba, hrvatska scena dokazuje suprotno. Nova generacija glazbenika spaja tradiciju s modernim pristupom, stvarajući jedinstveni zvuk koji privlači sve širu publiku.</p>

    <h2>Mladi jazzmeni preuzimaju scenu</h2>
    <p>Elvis Penava, 25-godišnji saksofonist iz Splita, osvaja europske jazz klubove. "Jazz nije muzejski eksponat. To je živa, evolucijska forma koja apsorbira sve oko sebe," kaže Penava.</p>

    <p>Njegov kvartet nedavno je nastupio u londonskom Ronnie Scott's klubu, jednom od najprestižnijih jazz venue u svijetu.</p>

    <h2>Klubovi i jam sessioni</h2>
    <p>Zagreb ima živahnu jazz scenu s redovitim jam sessionima u Boogaloo klubu svakog utorka. "Dolaze i veterani i klinci od 16 godina. Ta mješavina generacija čini scenu živom," objašnjava vlasnik kluba.</p>

    <p>U Splitu, Jazz bar Diocletian privlači turiste i lokale. Rijeka ima festival Jazz Time koji raste svake godine.</p>

    <h2>Fuzija žanrova</h2>
    <p>Najzanimljiviji projekti spajaju jazz s drugim žanrovima. Grupa Elektro Jazz Mašina kombinira elektroniku s bebopom, dok Black Coffee Residency miješa jazz s hip-hopom.</p>

    <blockquote>"Jazz je uvijek bio o fuziji. Charlie Parker slušao je Stravinskog, Miles Davis je svirao s rockerima. Mi samo nastavljamo tu tradiciju," kaže pianist Matija Dedić.</blockquote>

    <h2>Edukacija i budućnost</h2>
    <p>Muzička akademija u Zagrebu proizvodi izvrsne jazz glazbenike, ali mnogi odlaze van. "Trebamo više prilika za mlade jazzmene kod kuće," upozorava Tomislav Jurić iz emisije Jazz Corner.</p>

    <h2>Festivali rastu</h2>
    <p>Croatian Jazz Festival, Zagreb Jazz Festival, Jazz.hr/jesen - festivala ima sve više. "Publika je gladna kvalitetnog jazza. Rasprodajemo karte mjesecima unaprijed," kaže organizatorica ZJF-a.</p>

    <p>Scena možda nije velika kao u New Yorku ili Londonu, ali hrvatska jazz zajednica dokazuje da strast i talent ne poznaju granice.</p>`,
    authorId: 'auth_006', // Tomislav Jurić
    categoryId: 'cat_001', // Glazba
    tags: ['jazz', 'hrvatska glazba', 'klubovi', 'festivali', 'mladi glazbenici'],
    featuredImage: {
      small: '/images/articles/jazz-hrvatska-small.jpg',
      medium: '/images/articles/jazz-hrvatska-medium.jpg',
      large: '/images/articles/jazz-hrvatska-large.jpg',
      alt: 'Jazz jam session u Boogaloo klubu',
      caption: 'Tipična večer na jam sessionu u zagrebačkom Boogaloo klubu',
      credits: 'Foto: Marko Jazz Photography'
    },
    gallery: [],
    status: 'published',
    publishedDate: '2024-01-07T14:00:00Z',
    updatedDate: '2024-01-07T14:00:00Z',
    scheduledDate: null,
    featured: false,
    sticky: false,
    readTime: 6,
    viewCount: 1567,
    relatedArticles: ['art_002', 'art_006'],
    relatedShows: ['show_003'],
    relatedEpisodes: ['ep_005'],
    embeds: [
      {
        type: 'spotify',
        url: 'https://open.spotify.com/embed/playlist/37i9dQZF1DX4wta20PHgwo',
        title: 'Jazz Hrvatska Playlist'
      }
    ],
    seo: {
      metaTitle: 'Jazz u Hrvatskoj: Scena koja ne prestaje iznenađivati | Radio Roža',
      metaDescription: 'Hrvatska jazz scena doživljava renesansu. Od zagrebačkih klubova do splitskih festivala, nova generacija glazbenika stvara jedinstveni zvuk.',
      keywords: ['jazz', 'hrvatska', 'klubovi', 'festivali', 'glazbenici', 'zagreb', 'split'],
      ogImage: '/images/articles/jazz-hrvatska-og.jpg',
      ogType: 'article',
      canonicalUrl: 'https://radio-roza.org/clanci/jazz-u-hrvatskoj-scena-koja-iznenadjuje'
    },
    comments: {
      enabled: true,
      count: 34,
      featured: []
    }
  },
  {
    id: 'art_005',
    title: 'DIY kultura: Kako osnovati community radio',
    slug: 'diy-kultura-kako-osnovati-community-radio',
    excerpt: 'Praktični vodič za osnivanje nezavisne radio stanice - od legalne procedure do tehničke opreme.',
    content: `<p>Community radio stanice su glas lokalnih zajednica. Ako razmišljate o osnivanju vlastite, evo što trebate znati.</p>

    <h2>Zašto community radio?</h2>
    <p>Za razliku od komercijalnih stanica, community radio služi zajednici, ne profitu. Daje glas manjinama, promovira lokalnu kulturu i obrazuje.</p>

    <h2>Pravni okvir u Hrvatskoj</h2>
    <p>Trebate koncesiju od HAKOM-a. Postupak traje 6-12 mjeseci i uključuje:</p>
    <ul>
    <li>Registraciju udruge ili neprofitne organizacije</li>
    <li>Elaborat o programskoj koncepciji</li>
    <li>Tehnički plan</li>
    <li>Financijski plan</li>
    <li>Dokaz o prostoru za studio</li>
    </ul>

    <h2>Tehnička oprema - minimum</h2>
    <p>Za početak trebate:</p>
    <ul>
    <li>Audio mikser (od 1500€)</li>
    <li>2-3 mikrofona (300€ po komadu)</li>
    <li>Računalo s audio karticom (1000€)</li>
    <li>Broadcast software (BUTT, RadioDJ - besplatno)</li>
    <li>Odašiljač (5000-15000€ ovisno o snazi)</li>
    </ul>

    <h2>Prostor i akustika</h2>
    <p>"Ne trebate skup studio. Mi smo počeli u podrumu s jaja kartonima na zidovima," kaže osnivač Radio Študent Ljubljana.</p>

    <h2>Financiranje</h2>
    <p>Izvori financiranja:</p>
    <ul>
    <li>Lokalna samouprava</li>
    <li>EU fondovi (Creative Europe)</li>
    <li>Donacije slušatelja</li>
    <li>Crowdfunding</li>
    <li>Kulturni programi</li>
    </ul>

    <blockquote>"Prva godina je najteža. Ali kad community vidi da ste tu za njih, podrška dolazi," kaže Ana Horvat iz Radio Rože.</blockquote>

    <h2>Programska shema</h2>
    <p>Počnite skromno - 4-6 sati programa dnevno. Kvaliteta > kvantiteta. Uključite:</p>
    <ul>
    <li>Lokalne vijesti</li>
    <li>Glazbu lokalnih umjetnika</li>
    <li>Obrazovne sadržaje</li>
    <li>Emisije na manjinskim jezicima</li>
    </ul>

    <h2>Online prisutnost</h2>
    <p>Stream je obavezan. Koristite:</p>
    <ul>
    <li>Icecast server za streaming</li>
    <li>Web stranicu (WordPress je OK)</li>
    <li>Društvene mreže za promociju</li>
    <li>Podcast platforme za arhivu</li>
    </ul>

    <h2>Najveće greške početnika</h2>
    <ul>
    <li>Prevelike ambicije na početku</li>
    <li>Zanemarivanje pravnih obveza</li>
    <li>Loša tehnička kvaliteta</li>
    <li>Nedosljednost u programu</li>
    <li>Ignoriranje community-ja</li>
    </ul>

    <p>Community radio nije lak posao, ali je nevjerojatno nagrađujuć. Dajete glas onima koji ga nemaju i stvarate nešto što zaista pripada zajednici.</p>`,
    authorId: 'auth_001', // Ana Horvat
    categoryId: 'cat_004', // Tehnologija
    tags: ['diy', 'community radio', 'vodič', 'radio', 'nezavisni mediji', 'tehnologija'],
    featuredImage: {
      small: '/images/articles/diy-community-radio-small.jpg',
      medium: '/images/articles/diy-community-radio-medium.jpg',
      large: '/images/articles/diy-community-radio-large.jpg',
      alt: 'DIY radio studio setup',
      caption: 'Osnovni setup za community radio stanicu',
      credits: 'Foto: Radio Roža arhiva'
    },
    gallery: [
      {
        small: '/images/articles/gallery/studio-setup-small.jpg',
        medium: '/images/articles/gallery/studio-setup-medium.jpg',
        large: '/images/articles/gallery/studio-setup-large.jpg',
        alt: 'Studio setup',
        caption: 'Primjer osnovnog studio setupa'
      },
      {
        small: '/images/articles/gallery/mixer-small.jpg',
        medium: '/images/articles/gallery/mixer-medium.jpg',
        large: '/images/articles/gallery/mixer-large.jpg',
        alt: 'Audio mixer',
        caption: 'Profesionalni audio mixer za radio'
      }
    ],
    status: 'published',
    publishedDate: '2024-01-06T11:00:00Z',
    updatedDate: '2024-01-06T16:45:00Z',
    scheduledDate: null,
    featured: true,
    sticky: true,
    readTime: 10,
    viewCount: 4567,
    relatedArticles: ['art_008'],
    relatedShows: [],
    relatedEpisodes: [],
    embeds: [],
    seo: {
      metaTitle: 'DIY: Kako osnovati community radio - Praktični vodič | Radio Roža',
      metaDescription: 'Detaljni vodič za osnivanje nezavisne radio stanice. Od pravne procedure i tehničke opreme do programske sheme i financiranja.',
      keywords: ['community radio', 'diy', 'radio stanica', 'vodič', 'oprema', 'hakom', 'koncesija'],
      ogImage: '/images/articles/diy-community-radio-og.jpg',
      ogType: 'article',
      canonicalUrl: 'https://radio-roza.org/clanci/diy-kultura-kako-osnovati-community-radio'
    },
    comments: {
      enabled: true,
      count: 89,
      featured: [
        {
          id: 'comm_002',
          author: 'BudućiRadijaš',
          content: 'Hvala na ovom vodiču! Baš razmišljamo o pokretanju radio stanice u Osijeku.',
          date: '2024-01-06T15:30:00Z'
        }
      ]
    }
  },
  {
    id: 'art_006',
    title: 'Punk nije mrtav: Underground scena cvjeta u hrvatskim gradovima',
    slug: 'punk-nije-mrtav-underground-scena-hrvatska',
    excerpt: 'Od zagrebačke Močvare do riječkog Palača, punk i hardcore scena pokazuje vitalnost kakvu nije imala desetljećima.',
    content: `<p>Dok mainstream mediji ignoriraju, hrvatska punk i hardcore scena prolazi kroz zlatno doba. Novi bendovi nicaju, stari se vraćaju, a publika je gladnija nego ikad.</p>

    <h2>Nova generacija preuzima</h2>
    <p>Bendovi poput Nered, Čudna Šuma i Nezadovoljni Građani pune klubove diljem Hrvatske. "Mladi su ljuti i imaju razloga biti. Punk je njihov ventil," kaže Lucija Kovačević, fotografkinja scene.</p>

    <h2>Močvara - epicentar scene</h2>
    <p>Zagrebačka
