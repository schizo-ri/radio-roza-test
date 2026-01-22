/**
 * Mock Album of the Week Data
 *
 * This file contains sample albums for the "Album tjedna" (Album of the Week)
 * section of Radio Roža.
 */

export const mockAlbumAuthors = [
  {
    id: 1,
    name: 'Marina Jakšić',
    slug: 'marina-jaksic',
    avatar: '/images/authors/marina-jaksic.svg',
  },
  {
    id: 2,
    name: 'Ivan Gjuro Dragnić',
    slug: 'ivan-dragnic',
    avatar: '/images/authors/ivan-dragnic.svg',
  },
  {
    id: 3,
    name: 'Davor Popi Popdankovski',
    slug: 'davor-popdankovski',
    avatar: '/images/authors/davor-popdankovski.svg',
  },
  {
    id: 4,
    name: 'Tomislav Mile Milićević',
    slug: 'tomislav-milicevic',
    avatar: '/images/authors/tomislav-milicevic.svg',
  },
  {
    id: 5,
    name: 'Martina Blečić',
    slug: 'martina-blecic',
    avatar: '/images/authors/martina-blecic.svg',
  },
];

export const mockAlbumsOfTheWeek = [
  {
    id: 1,
    author: mockAlbumAuthors[0],
    artist: 'Emily Scott Robinson',
    albumTitle: 'Appalachia',
    title: 'Emily Scott Robinson, "Appalachia"',
    description:
      'The new LP from the country singer-songwriter is shot through with a much-needed sentiment: Hope.',
    cover: '/images/mock/a0193936775_16.jpg',
    releaseDate: '2025-01-10',
    genre: 'Country;Folk',
    publishDate: '2026-01-20',
    slug: 'emily-scott-robinson-appalachia',
    content: `<p>When it was time to record her new album—the follow-up to 2021's excellent American Siren—country-folk singer-songwriter Emily Scott Robinson chose to do so at Dreamland Recording Studios, housed in a 130-year-old church sanctuary hidden in the trees outside of Kingston, New York. But the setting and the spiritual center of her work can be found hundreds of miles to the southwest of that location: "Oh, my heart for Appalachia/ Oh, my heart for these blue hills," Robinson sings in "Appalachia," the album's bluegrass-y title track. "Oh, my heart forever captured, beating still."</p>
      <p>The song is both an ode to that magical, mountainous region in the eastern United States and a celebration of resilience, community, and hope framed by the destruction Hurricane Helene brought to western North Carolina in 2024. It's also a showcase for Robinson's stop-you-in-your-tracks voice—crystal-clear, tinged with twang—and her skillful songwriting, which got her signed to Oh Boy Records, the label co-founded by John Prine in 1981.</p>
      <p>Robinson's specialty is telling stories about the human condition in ways that are seemingly simple yet vivid and evocative—like pencil sketches that bloom into Technicolor daydreams when you close your eyes. Appalachia is filled with examples of that gift: The quietly folky "Cast Iron Heart" depicts heartbreak and redemptive love without overdoing its namesake metaphor. "Time Traveler" is a slow-building tune spilling over with precise details about an elderly woman in cognitive decline. On "Dirtbag Saloon," Robinson turns a lilting country waltz into sharp commentary on economic inequality, gentrification, and "progress" at any cost, while in "Bless It All," she pieces together a stirring tale about struggle and perseverance using only an acoustic guitar, a memorable melody, and a lyrical collage of unpaid bills, tested faith, and shoulders to cry on.</p>
      <p>And then there's "The Time for Flowers," a song Robinson released as a single in 2020, catching the attention of the folks at Oh Boy. Written during the dark days of the Covid-19 pandemic, it's a gorgeous meditation on life's ups and downs, the interconnectedness of existence and the indisputable importance of hope. Against softly plucked guitar strings, Robinson sings, loud and clear: "The time for flowers will come again/ Maybe in one year, maybe in ten/ There are days despair will win/ But the time for flowers will come again."</p>
      <p>The sentiment is not an easy one to remember right now. It helps to have gifted songwriters like Robinson to remind us.</p>`,
  },
  {
    id: 2,
    author: mockAlbumAuthors[1],
    artist: 'Fontaines D.C.',
    albumTitle: 'Romance',
    title: 'Fontaines D.C., "Romance"',
    description:
      'Irish post-punk titans deliver their most ambitious and sonically diverse album yet.',
    cover: '/images/mock/Romance_Fontaines_D.C._album_cover.jpg',
    releaseDate: '2024-08-23',
    genre: 'Post-Punk;Alternative Rock',
    publishDate: '2026-01-13',
    slug: 'fontaines-dc-romance',
    content: `<p>Fontaines D.C. have always been a band in motion, each album marking a distinct evolution from the last. With Romance, their fourth studio album, the Dublin quintet has made their biggest leap yet—trading the raw, pub-ready energy of their earlier work for something grander, more cinematic, and unexpectedly tender.</p>
      <p>The album opens with "Romance," a track that immediately signals the band's new direction. Synthesizers wash over Grian Chatten's distinctive vocals as he navigates themes of love, loss, and the peculiar loneliness of fame. It's a far cry from the scrappy post-punk of Dogrel, yet it feels like a natural progression rather than a betrayal of their roots.</p>
      <p>"Starburster" showcases the band's ability to build tension like few others in contemporary rock. The track simmers and swells, Chatten's delivery oscillating between a whisper and a scream, before exploding into a cathartic chorus that demands repeated listens.</p>
      <p>Throughout Romance, producer James Ford (Arctic Monkeys, Depeche Mode) helps the band achieve a sound that's simultaneously massive and intimate. The production is rich with detail—listen closely and you'll hear layers of texture that reveal themselves over time, from the subtle electronic flourishes to the carefully placed acoustic moments.</p>
      <p>Lyrically, Chatten has never been more vulnerable. "In the Modern World" finds him grappling with anxiety and the pressure of expectations, while "Favourite" is a love song stripped of pretense, its simplicity making it all the more affecting.</p>
      <p>Romance isn't just Fontaines D.C.'s best album—it's a statement of intent from a band refusing to be confined by genre expectations or their own past successes.</p>`,
  },
  {
    id: 3,
    author: mockAlbumAuthors[2],
    artist: 'Arooj Aftab',
    albumTitle: 'Night Reign',
    title: 'Arooj Aftab, "Night Reign"',
    description:
      'The Grammy-winning vocalist crafts nocturnal soundscapes that blur the lines between jazz, ambient, and South Asian classical music.',
    cover: '/images/mock/arooj.jpg',
    releaseDate: '2024-10-18',
    genre: 'Jazz;Ambient;World',
    publishDate: '2026-01-06',
    slug: 'arooj-aftab-night-reign',
    content: `<p>Arooj Aftab's Night Reign arrives as a meditation on darkness—not as absence, but as presence. The Brooklyn-based, Pakistani-born vocalist and composer has built a career on creating music that exists in the liminal spaces between genres, and this album may be her most fully realized vision yet.</p>
      <p>Opening with "Whiskey," Aftab immediately establishes the album's atmosphere: intimate, unhurried, and deeply textured. Her voice floats over sparse instrumentation, each note placed with intention, each silence as meaningful as the sounds that surround it.</p>
      <p>The production, handled by Aftab alongside longtime collaborator Gyan Riley, favors space over density. Instruments appear and recede like figures in fog—a guitar phrase here, a synth pad there, occasional percussion that feels more felt than heard. It's an approach that demands patient listening but rewards it generously.</p>
      <p>"Autumn Leaves," a Ghazal-influenced piece, showcases Aftab's ability to honor South Asian classical traditions while speaking a thoroughly contemporary musical language. The track unfolds over seven minutes, its gradual build mirroring the seasonal transformation of its title.</p>
      <p>Night Reign is music for the hours between midnight and dawn, when the world is quiet enough to hear your own thoughts. It's an album that doesn't demand attention so much as invite contemplation—a rare and precious quality in an age of constant noise.</p>`,
  },
  {
    id: 4,
    author: mockAlbumAuthors[3],
    artist: 'Adrianne Lenker',
    albumTitle: 'Bright Future',
    title: 'Adrianne Lenker, "Bright Future"',
    description:
      "Big Thief's frontwoman delivers her most personal and sonically expansive solo work to date.",
    cover: '/images/mock/Adrianne-Lenker-Bright-Future-767x767.jpeg',
    releaseDate: '2024-03-22',
    genre: 'Folk;Indie Folk',
    publishDate: '2025-12-30',
    slug: 'adrianne-lenker-bright-future',
    content: `<p>Adrianne Lenker has always possessed the rare ability to make deeply personal songwriting feel universal. With Bright Future, her fourth solo album, the Big Thief frontwoman expands her sonic palette while maintaining the intimate, handcrafted quality that has defined her work.</p>
      <p>Recorded largely live with a small group of collaborators, Bright Future captures the magic of musicians playing together in a room—something increasingly rare in modern production. The result is an album that breathes, its imperfections serving as reminders that real humans made these sounds.</p>
      <p>"Real House" opens the record with fingerpicked guitar and Lenker's voice, multitracked into gentle harmonies. It's a deceptively simple arrangement that reveals new details with each listen: the creak of a chair, the distant hum of an amplifier, the natural reverb of the recording space.</p>
      <p>The album's centerpiece, "Sadness As A Gift," finds Lenker at her most philosophical. Over swelling strings and subtle piano, she examines the role of melancholy in a fully lived life, arriving at conclusions that feel earned rather than prescribed.</p>
      <p>Throughout Bright Future, Lenker proves herself one of the most vital singer-songwriters of her generation—an artist capable of transforming the mundane into the magical through sheer force of observation and expression.</p>`,
  },
  {
    id: 5,
    author: mockAlbumAuthors[4],
    artist: 'IDLES',
    albumTitle: 'TANGK',
    title: 'IDLES, "TANGK"',
    description:
      "Bristol's beloved punk provocateurs trade aggression for vulnerability on their fifth studio album.",
    cover: '/images/mock/tangk.png',
    releaseDate: '2024-02-16',
    genre: 'Post-Punk;Alternative Rock',
    publishDate: '2025-12-23',
    slug: 'idles-tangk',
    content: `<p>IDLES have built their reputation on righteous anger—songs that confront toxic masculinity, nationalism, and class inequality with unrelenting intensity. TANGK, their fifth album, doesn't abandon these concerns, but it approaches them from an unexpected angle: love.</p>
      <p>"Gift Horse," the album's opening track, sets the tone with Joe Talbot declaring "I want to be loved" over surprisingly gentle instrumentation. It's a vulnerable admission from a frontman better known for screaming than serenading, and it signals the album's willingness to explore emotional territory the band has previously avoided.</p>
      <p>That's not to say TANGK lacks punch. "Roy" is as propulsive as anything in the band's catalog, its driving rhythm and shouted vocals recalling the intensity of their debut. But even here, the lyrics speak to tenderness rather than rage.</p>
      <p>Producer Nigel Godrich (Radiohead, Beck) brings a new sonic dimension to the band's sound. The guitars are more textured, the arrangements more spacious, allowing individual elements room to breathe. It's a mature production for a band maturing in real-time.</p>
      <p>"Grace," the album's emotional peak, features Talbot at his most exposed, singing about fatherhood and the transformative power of caring for another person. It's a long way from the band that once declared "I'm scum," and that distance feels like growth rather than compromise.</p>`,
  },
  {
    id: 6,
    author: mockAlbumAuthors[5],
    artist: 'Kim Gordon',
    albumTitle: 'The Collective',
    title: 'Kim Gordon, "The Collective"',
    description:
      'The Sonic Youth legend continues her solo evolution with an abrasive, experimental collection.',
    cover: '/images/mock/kim-gordon.jpg',
    releaseDate: '2024-03-08',
    genre: 'Experimental;Noise Rock;Electronic',
    publishDate: '2025-12-16',
    slug: 'kim-gordon-the-collective',
    content: `<p>At 71, Kim Gordon continues to make music that sounds like nothing else. The Collective, her second solo album, pushes even further into the experimental territory she explored on 2019's No Home Record, creating something that's part noise collage, part industrial meditation, and entirely her own.</p>
      <p>Working primarily with producer Justin Raisen, Gordon has crafted an album that rewards patience and challenges expectations. Opening track "BYE BYE" layers distorted vocals over churning electronics, establishing an atmosphere of beautiful unease that persists throughout the record.</p>
      <p>"I'm a Man" finds Gordon interrogating masculinity with characteristic wit and bite. The production is intentionally abrasive—guitars that sound like machinery, drums that hit like hammer blows—yet there's an underlying groove that makes the whole thing strangely danceable.</p>
      <p>The Collective isn't an easy listen, nor is it meant to be. Gordon has never been interested in accessibility for its own sake. Instead, she creates spaces where conventional song structure gives way to texture and atmosphere, where melody emerges from noise only to dissolve back into it.</p>
      <p>For those willing to meet Gordon on her terms, The Collective offers something increasingly rare: genuinely challenging music from an artist with nothing to prove and everything to explore.</p>`,
  },
];

/**
 * Get all albums of the week, sorted by publish date (newest first)
 */
export function getAlbumsOfTheWeek(options = {}) {
  let albums = [...mockAlbumsOfTheWeek];

  // Sort by publish date (newest first)
  albums.sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate));

  if (options.limit) {
    albums = albums.slice(0, options.limit);
  }

  return albums;
}

/**
 * Get the current (most recent) album of the week
 */
export function getCurrentAlbumOfTheWeek() {
  const albums = getAlbumsOfTheWeek({ limit: 1 });
  return albums[0] || null;
}

/**
 * Get a single album by slug
 */
export function getAlbumBySlug(slug) {
  return mockAlbumsOfTheWeek.find((album) => album.slug === slug);
}

/**
 * Get albums by author
 */
export function getAlbumsByAuthor(authorSlug) {
  return mockAlbumsOfTheWeek
    .filter((album) => album.author.slug === authorSlug)
    .sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate));
}
