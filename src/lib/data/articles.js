/**
 * Unified Articles Data
 *
 * This file serves as the single source of truth for all article content,
 * including regular articles and album reviews. The structure mirrors
 * the recommended database schema for easy migration to a real backend.
 */

// =============================================================================
// AUTHORS
// =============================================================================

export const authors = [
  {
    id: 1,
    name: 'Elena Rodriguez',
    slug: 'elena-rodriguez',
    bio: 'Music journalist and electronic music enthusiast with over 10 years of experience covering underground scenes.',
    avatar: '/images/authors/elena-rodriguez.svg',
    social: {
      twitter: '@elenamusic',
      instagram: '@elena_sounds',
    },
  },
  {
    id: 2,
    name: 'Marcus Chen',
    slug: 'marcus-chen',
    bio: 'Sound engineer turned writer, specializing in ambient and experimental music.',
    avatar: '/images/authors/marcus-chen.svg',
    social: {
      twitter: '@marcussound',
      bandcamp: 'marcuschen',
    },
  },
  {
    id: 3,
    name: 'Zara Al-Mahmoud',
    slug: 'zara-al-mahmoud',
    bio: 'Cultural critic and DJ focusing on the intersection of technology and traditional music.',
    avatar: '/images/authors/zara-mahmoud.svg',
    social: {
      instagram: '@zarasounds',
      soundcloud: 'zara-al-mahmoud',
    },
  },
  {
    id: 4,
    name: 'Alex Thompson',
    slug: 'alex-thompson',
    bio: 'Freelance music writer covering indie rock, shoegaze, and post-punk revival.',
    avatar: '/images/authors/alex-thompson.svg',
    social: {
      twitter: '@alexwrites',
      youtube: 'AlexMusicReviews',
    },
  },
  // Album reviewers
  {
    id: 5,
    name: 'Marina Jakšić',
    slug: 'marina-jaksic',
    bio: 'Glazbena kritičarka s fokusom na country i folk glazbu.',
    avatar: '/images/authors/marina-jaksic.svg',
    social: {},
  },
  {
    id: 6,
    name: 'Ivan Gjuro Dragnić',
    slug: 'ivan-dragnic',
    bio: 'Rock novinar i promotor alternativne glazbe.',
    avatar: '/images/authors/ivan-dragnic.svg',
    social: {},
  },
  {
    id: 7,
    name: 'Davor Popi Popdankovski',
    slug: 'davor-popdankovski',
    bio: 'Jazz entuzijast i glazbeni producent.',
    avatar: '/images/authors/davor-popdankovski.svg',
    social: {},
  },
  {
    id: 8,
    name: 'Tomislav Mile Milićević',
    slug: 'tomislav-milicevic',
    bio: 'Folk i indie glazbeni kritičar.',
    avatar: '/images/authors/tomislav-milicevic.svg',
    social: {},
  },
  {
    id: 9,
    name: 'Martina Blečić',
    slug: 'martina-blecic',
    bio: 'Punk i alternativna glazba su njezina specijalnost.',
    avatar: '/images/authors/martina-blecic.svg',
    social: {},
  },
];

// =============================================================================
// CATEGORIES
// =============================================================================

export const categories = [
  {
    id: 1,
    slug: 'aktualno',
    title: 'Aktualno',
    description: 'Najnovije objave redakcije Radio Rože',
  },
  {
    id: 2,
    slug: 'album-tjedna',
    title: 'Album tjedna',
    description: 'Radio Roža svesrdno preporuča dobru glazbu',
  },
  {
    id: 3,
    slug: 'komentar',
    title: 'Komentar',
    description: 'Komentiramo aktualno i važno',
  },
  {
    id: 4,
    slug: 'cakule',
    title: 'Čakule',
    description: 'Preferiraš li pisano izdanje imamo koju čakulu za tebe',
  },
];

// =============================================================================
// TAGS
// =============================================================================

export const tags = [
  'synth-pop',
  'modular-synth',
  'field-recording',
  'drone',
  'minimal-techno',
  'post-rock',
  'shoegaze',
  'lo-fi',
  'vintage-gear',
  'diy',
  'cassette',
  'vinyl',
  'live-performance',
  'collaboration',
  'debut-album',
  'reissue',
  'interview',
  'gear-review',
  'festival',
  'underground',
  'country',
  'folk',
  'post-punk',
  'alternative-rock',
  'jazz',
  'ambient',
  'world',
  'indie-folk',
  'experimental',
  'noise-rock',
  'electronic',
];

// =============================================================================
// HELPER: Get author/category by ID
// =============================================================================

const getAuthorById = (id) => authors.find((a) => a.id === id);
const getCategoryById = (id) => categories.find((c) => c.id === id);

// =============================================================================
// ARTICLES (Unified)
// =============================================================================

export const articles = [
  // ---------------------------------------------------------------------------
  // AKTUALNO Articles
  // ---------------------------------------------------------------------------
  {
    id: 1,
    slug: 'resurgence-modular-synthesis-contemporary-electronic',
    title: 'The Resurgence of Modular Synthesis in Contemporary Electronic Music',
    excerpt:
      'Exploring how modular synthesizers are shaping the future of electronic music production, from bedroom producers to major label artists.',
    content: `
      <p>In recent years, <strong>modular synthesis</strong> has experienced an unprecedented renaissance. What was once considered esoteric equipment relegated to academic studios and experimental musicians has now found its way into mainstream electronic music production.</p>

      <h2>The Appeal of Modularity</h2>
      <p>The allure of modular synthesizers lies in their infinite possibility for customization. Unlike traditional synthesizers with fixed signal paths, modular systems allow musicians to create unique sonic architectures tailored to their creative vision.</p>

      <blockquote>
        <p>"Every patch is a new instrument. That's the magic of modular synthesis – you're not just playing music, you're designing the instrument itself."</p>
        <cite>– Suzanne Ciani, electronic music pioneer</cite>
      </blockquote>

      <h3>Key Players in the Modern Scene</h3>
      <ul>
        <li><strong>Make Noise</strong> - Pushing boundaries with modules like Maths and Erbe-Verb</li>
        <li><strong>Mutable Instruments</strong> - Open-source designs that democratize synthesis</li>
        <li><strong>Intellijel</strong> - Precision engineering meets creative functionality</li>
        <li><strong>4ms Company</strong> - Innovative interfaces and unique sound generation</li>
      </ul>

      <p>The community aspect cannot be overstated. Online forums, local meetups, and modular-focused festivals have created a supportive ecosystem where knowledge sharing flourishes.</p>

      <h2>Impact on Contemporary Music</h2>
      <p>Artists like <em>Kaitlyn Aurelia Smith</em>, <em>Alessandro Cortini</em>, and <em>Ben Frost</em> have demonstrated how modular synthesis can enhance both studio recordings and live performances, bringing an element of unpredictability and organic evolution to electronic music.</p>
    `,
    authorId: 1,
    categoryId: 1,
    tags: ['modular-synth', 'electronic', 'diy'],
    publishedDate: '2024-01-15T10:00:00Z',
    readTime: 8,
    featured: false,
    images: {
      thumb: '/images/articles/thumb/modular-synth-thumb.jpg',
      small: '/images/articles/small/modular-synth-small.jpg',
      medium: '/images/articles/medium/modular-synth-medium.jpg',
      large: '/images/articles/large/Rampage.jpeg',
      alt: 'Close-up of a modular synthesizer with patch cables',
    },
    embeds: {
      bandcamp: {
        type: 'album',
        id: '3590922313',
        title: 'Modular Memories by Various Artists',
      },
    },
    seo: {
      metaTitle: 'The Resurgence of Modular Synthesis in Contemporary Electronic Music',
      metaDescription:
        'Exploring how modular synthesizers are shaping electronic music production from bedroom producers to major artists.',
      keywords: ['modular synthesis', 'electronic music', 'synthesizers', 'music production'],
    },
  },

  {
    id: 4,
    slug: 'diy-revolution-bedroom-producers-electronic-music',
    title: 'The DIY Revolution: How Bedroom Producers Are Changing Electronic Music',
    excerpt:
      'Accessible technology and streaming platforms have democratized music production, leading to a new wave of innovative bedroom producers.',
    content: `
      <p>The barriers to music production have never been lower. With nothing more than a laptop and creativity, <strong>bedroom producers</strong> worldwide are crafting sounds that rival major label releases and developing devoted followings.</p>

      <h2>The Democratic Studio</h2>
      <p>What once required expensive studio time and professional engineers can now be accomplished in a spare bedroom. Software like <em>Ableton Live</em>, <em>FL Studio</em>, and even free options like <em>Reaper</em> provide professional-grade tools at accessible prices.</p>

      <h3>Essential Bedroom Producer Setup</h3>
      <table>
        <tr>
          <th>Component</th>
          <th>Budget Option</th>
          <th>Pro Option</th>
        </tr>
        <tr>
          <td>DAW</td>
          <td>Reaper ($60)</td>
          <td>Ableton Live Suite ($749)</td>
        </tr>
        <tr>
          <td>Audio Interface</td>
          <td>Focusrite Scarlett Solo ($130)</td>
          <td>Universal Audio Apollo Twin ($899)</td>
        </tr>
        <tr>
          <td>Monitors</td>
          <td>Yamaha HS5 ($400/pair)</td>
          <td>Adam Audio A7X ($1,500/pair)</td>
        </tr>
        <tr>
          <td>Headphones</td>
          <td>Audio-Technica ATH-M50x ($149)</td>
          <td>Focal Utopia ($4,000)</td>
        </tr>
      </table>

      <h2>Streaming Success Stories</h2>
      <p>Platforms like <strong>SoundCloud</strong>, <strong>Bandcamp</strong>, and <strong>Spotify</strong> have enabled bedroom producers to reach global audiences without traditional gatekeepers. Artists like <em>Clairo</em>, <em>Rex Orange County</em>, and <em>Boy Pablo</em> began in bedroom setups and achieved mainstream success.</p>

      <blockquote>
        <p>"The bedroom is the new recording studio. Some of my favorite albums were made on laptops in people's bedrooms."</p>
        <cite>– James Blake, electronic musician and producer</cite>
      </blockquote>

      <h3>Genre Innovation</h3>
      <p>Bedroom producers aren't just replicating existing sounds – they're creating entirely new genres:</p>
      <ul>
        <li><strong>Vaporwave</strong> - Nostalgic, slowed-down samples</li>
        <li><strong>Future Funk</strong> - Disco samples with electronic production</li>
        <li><strong>Lo-fi Hip Hop</strong> - Relaxed beats with vintage aesthetics</li>
        <li><strong>Synthwave</strong> - 80s-inspired electronic music</li>
      </ul>

      <h2>Community and Collaboration</h2>
      <p>Online communities on <em>Reddit</em>, <em>Discord</em>, and specialized forums have created support networks where producers share techniques, provide feedback, and collaborate across continents.</p>

      <p>The DIY ethos extends beyond production to marketing and distribution. Artists are learning to be entrepreneurs, managing their own social media presence and building direct relationships with fans.</p>

      <p>As technology continues to evolve and become more accessible, we can expect the bedroom producer movement to grow even stronger, continuing to democratize music creation and challenge traditional industry structures.</p>
    `,
    authorId: 1,
    categoryId: 1,
    tags: ['diy', 'electronic', 'lo-fi'],
    publishedDate: '2024-02-08T16:45:00Z',
    readTime: 7,
    featured: false,
    images: {
      thumb: '/images/articles/thumb/bedroom-producer-thumb.jpg',
      small: '/images/articles/small/bedroom-producer-small.jpg',
      medium: '/images/articles/medium/bedroom-producer-medium.jpg',
      large: '/images/articles/large/bedroom-producer-large.jpg',
      alt: 'Home studio setup with laptop, speakers, and MIDI controller',
    },
    embeds: {
      youtube: {
        type: 'playlist',
        id: 'PLx0sYbCqOb8TBPRdmBHs5Iftvv9TPboYG',
        title: 'Essential Bedroom Producer Tracks',
      },
    },
    seo: {
      metaTitle: 'The DIY Revolution: How Bedroom Producers Are Changing Electronic Music',
      metaDescription:
        'Discover how accessible technology has democratized music production, enabling bedroom producers to create innovative electronic music.',
      keywords: ['DIY music', 'bedroom producer', 'electronic music', 'home studio', 'music production'],
    },
  },

  {
    id: 7,
    slug: 'rijecka-underground-scena-zvukovi-iz-podruma',
    title: 'Riječka underground scena: Zvukovi iz podruma koji oblikuju budućnost',
    excerpt:
      'Istražujemo kako riječki underground prostori i kolektivi stvaraju jedinstvenu glazbenu kulturu koja odolijevia mainstream pritiscima.',
    content: `
      <p>Rijeka je oduvijek bila grad koji živi na marginama – geografski, kulturno i glazbeno. Upravo ta <strong>marginalna pozicija</strong> stvorila je plodno tlo za underground scenu koja danas privlači pažnju daleko izvan granica Hrvatske.</p>

      <h2>Prostori otpora</h2>
      <p>Od legendarnog <em>Palacha</em> do novijih inicijativa poput <strong>Pogona</strong> i raznih squat prostora, Rijeka je uvijek imala mjesta gdje se glazba mogla razvijati bez komercijalnih pritisaka.</p>

      <blockquote>
        <p>"U Rijeci nikad nismo imali novaca, ali smo uvijek imali prostor za eksperimentiranje. To je naše najveće bogatstvo."</p>
        <cite>– lokalni glazbenik</cite>
      </blockquote>

      <h3>Ključni kolektivi i organizatori</h3>
      <ul>
        <li><strong>Distune Records</strong> - Izdavačka kuća fokusirana na eksperimentalnu elektroniku</li>
        <li><strong>KSET Rijeka</strong> - Studentski centar kao inkubator novih bendova</li>
        <li><strong>Molekula</strong> - Centar za mlade i nezavisnu kulturu</li>
        <li><strong>Radio Roža</strong> - Community radio koji dokumentira lokalnu scenu</li>
      </ul>

      <h2>Glazbeni pravci</h2>
      <p>Riječka scena nikad nije bila homogena. Od <em>noise rocka</em> i <em>post-punka</em> do <em>ambijentalne elektronike</em> i <em>eksperimentalnog hip-hopa</em>, raznolikost je ono što definira ovaj grad.</p>

      <p>Mlađe generacije glazbenika sve više koriste digitalne alate, ali zadržavaju DIY etiku koja je uvijek bila srž riječkog undergrounda. Laptop produkcija susreće analognu toplinu u jedinstvenom zvuku koji je teško replicirati.</p>

      <h2>Budućnost scene</h2>
      <p>Unatoč ekonomskim izazovima i gentrifikaciji koja prijeti alternativnim prostorima, riječka underground scena pokazuje nevjerojatnu otpornost. Novi prostori se otvaraju, mladi glazbenici preuzimaju baklju, a digitalne platforme omogućuju globalnu vidljivost bez kompromitiranja umjetničke vizije.</p>
    `,
    authorId: 1,
    categoryId: 1,
    tags: ['underground', 'diy', 'festival'],
    publishedDate: '2024-02-25T10:00:00Z',
    readTime: 6,
    featured: true,
    images: {
      thumb: '/images/articles/thumb/modular-synth-thumb.jpg',
      small: '/images/articles/small/modular-synth-small.jpg',
      medium: '/images/articles/medium/modular-synth-medium.jpg',
      large: '/images/articles/large/Rampage.jpeg',
      alt: 'Underground koncert u Rijeci',
    },
    seo: {
      metaTitle: 'Riječka underground scena: Zvukovi iz podruma koji oblikuju budućnost',
      metaDescription: 'Kako riječki underground prostori i kolektivi stvaraju jedinstvenu glazbenu kulturu.',
      keywords: ['rijeka', 'underground', 'glazbena scena', 'DIY', 'alternativna kultura'],
    },
  },

  // ---------------------------------------------------------------------------
  // ALBUM-TJEDNA Articles
  // ---------------------------------------------------------------------------
  {
    id: 2,
    slug: 'field-recordings-found-sound-hidden-orchestra',
    title: "Field Recordings and Found Sound: Capturing the World's Hidden Orchestra",
    excerpt:
      'How contemporary artists are transforming everyday sounds into compelling musical narratives through field recording techniques.',
    content: `
      <p>The art of <strong>field recording</strong> transforms our sonic environment into raw musical material. From the hum of electrical transformers to the rhythmic clatter of train wheels, artists are discovering orchestras hidden in plain sight.</p>

      <h2>Pioneers of Environmental Sound</h2>
      <p>The practice isn't new – composers like <em>R. Murray Schafer</em> and <em>Hildegard Westerkamp</em> laid the groundwork for what we now call <strong>soundscape composition</strong>. However, modern technology has democratized the process, making high-quality field recording accessible to anyone with a smartphone.</p>

      <h3>Essential Equipment for Modern Field Recording</h3>
      <ul>
        <li><strong>Zoom H5/H6</strong> - Versatile handheld recorders with XLR inputs</li>
        <li><strong>Rode VideoMic Pro</strong> - Directional microphone for focused capture</li>
        <li><strong>Audio-Technica AT875R</strong> - Shotgun mic for distant sources</li>
        <li><strong>Windscreens and shock mounts</strong> - Essential for outdoor recording</li>
      </ul>

      <blockquote>
        <p>"I'm not trying to record nature – I'm trying to record my relationship with nature."</p>
        <cite>– Christina Kubisch, sound artist</cite>
      </blockquote>

      <p>Contemporary artists like <em>Tim Hecker</em>, <em>Grouper</em>, and <em>Thomas Köner</em> seamlessly blend field recordings with traditional instrumentation, creating immersive sonic environments that transport listeners to specific places and times.</p>

      <h2>Technical Considerations</h2>
      <p>Successful field recording requires patience, preparation, and technical knowledge. Understanding <strong>signal-to-noise ratios</strong>, proper gain staging, and environmental factors can mean the difference between capturing magic and recording disappointment.</p>

      <p>The editing process is equally crucial. Modern DAWs offer powerful tools for cleaning, processing, and manipulating field recordings while preserving their essential character.</p>
    `,
    authorId: 2,
    categoryId: 2,
    tags: ['field-recording', 'ambient', 'experimental'],
    publishedDate: '2024-01-22T14:30:00Z',
    readTime: 6,
    featured: false,
    images: {
      thumb: '/images/articles/thumb/field-recording-thumb.jpg',
      small: '/images/articles/small/soundscaping.jpg',
      medium: '/images/articles/medium/field-recording-medium.jpg',
      large: '/images/articles/large/soundscaping.jpg',
      alt: 'Person with headphones holding a field recorder in a forest',
    },
    embeds: {
      youtube: {
        type: 'video',
        id: 'dQw4w9WgXcQ',
        title: 'Field Recording Techniques Masterclass',
      },
    },
    seo: {
      metaTitle: "Field Recordings and Found Sound: Capturing the World's Hidden Orchestra",
      metaDescription:
        'Learn how contemporary artists transform everyday sounds into compelling music through field recording techniques.',
      keywords: ['field recording', 'found sound', 'ambient music', 'soundscape composition'],
    },
    // Album-specific fields (null for non-album articles, but included for schema consistency)
    album: null,
  },

  {
    id: 6,
    slug: 'ambient-music-healing-science-therapeutic-soundscapes',
    title: 'Ambient Music as Healing: The Science Behind Therapeutic Soundscapes',
    excerpt:
      'Research reveals how ambient music affects our brain chemistry and physiological responses, validating its use in therapeutic settings.',
    content: `
      <p>What ambient music pioneers like <em>Brian Eno</em> intuited decades ago, modern neuroscience is now proving: <strong>ambient soundscapes</strong> have measurable therapeutic effects on the human brain and body.</p>

      <h2>The Neuroscience of Ambient Music</h2>
      <p>Recent studies using <strong>fMRI imaging</strong> show that ambient music activates the brain's default mode network – the same neural pathways associated with meditation, introspection, and emotional processing.</p>

      <h3>Physiological Effects</h3>
      <ul>
        <li><strong>Reduced cortisol levels</strong> - Lowering stress hormones</li>
        <li><strong>Decreased heart rate</strong> - Activating the parasympathetic nervous system</li>
        <li><strong>Improved sleep quality</strong> - Facilitating deeper REM cycles</li>
        <li><strong>Enhanced focus</strong> - Reducing cognitive load and distraction</li>
      </ul>

      <blockquote>
        <p>"Ambient music must be as ignorable as it is interesting. It should enhance the environment without demanding attention."</p>
        <cite>– Brian Eno, ambient music pioneer</cite>
      </blockquote>

      <h2>Clinical Applications</h2>
      <p>Healthcare facilities worldwide are incorporating ambient soundscapes into treatment protocols:</p>

      <h3>Hospital Settings</h3>
      <p><strong>Cleveland Clinic</strong> reported a 38% reduction in patient anxiety levels when ambient music was played in waiting areas and treatment rooms. The music helped mask disruptive hospital sounds while promoting calm.</p>

      <h3>Mental Health Treatment</h3>
      <p>Therapists are using carefully crafted ambient pieces to help clients with <em>PTSD</em>, <em>anxiety disorders</em>, and <em>depression</em>. The non-intrusive nature of ambient music allows emotional processing without overwhelming vulnerable individuals.</p>

      <h3>Workplace Wellness</h3>
      <p>Tech companies like <em>Google</em> and <em>Microsoft</em> have installed ambient sound systems in open offices. Studies show improved productivity and reduced stress among employees exposed to these therapeutic soundscapes.</p>

      <h2>The Role of Frequency and Harmony</h2>
      <p>Not all ambient music is equally therapeutic. Research identifies specific characteristics that maximize healing potential:</p>

      <table>
        <tr>
          <th>Element</th>
          <th>Therapeutic Range</th>
          <th>Effect</th>
        </tr>
        <tr>
          <td>Tempo</td>
          <td>60-80 BPM</td>
          <td>Synchronizes with resting heart rate</td>
        </tr>
        <tr>
          <td>Frequency</td>
          <td>528 Hz ("Love Frequency")</td>
          <td>Promotes cellular repair and emotional balance</td>
        </tr>
        <tr>
          <td>Dynamic Range</td>
          <td>Minimal variation</td>
          <td>Prevents startling or attention-grabbing moments</td>
        </tr>
        <tr>
          <td>Duration</td>
          <td>20+ minutes</td>
          <td>Allows nervous system to fully relax</td>
        </tr>
      </table>

      <h2>Artists Leading the Healing Movement</h2>
      <p>Contemporary ambient artists are consciously creating music for therapeutic purposes:</p>

      <ul>
        <li><em>Stars of the Lid</em> - Drone-based compositions for deep relaxation</li>
        <li><em>Julianna Barwick</em> - Vocal loops that induce meditative states</li>
        <li><em>Tim Hecker</em> - Textural soundscapes for emotional processing</li>
        <li><em>Sarah Davachi</em> - Minimalist organ pieces for contemplation</li>
      </ul>

      <h2>The Future of Sound Therapy</h2>
      <p>As our understanding of music's therapeutic properties deepens, we're moving toward <strong>personalized sound prescriptions</strong>. AI systems may soon analyze individual brain patterns and physiological responses to create custom ambient compositions for specific healing outcomes.</p>

      <p>The intersection of ambient music and healthcare represents a return to humanity's oldest healing tradition – using sound as medicine.</p>
    `,
    authorId: 2,
    categoryId: 2,
    tags: ['ambient', 'field-recording', 'experimental'],
    publishedDate: '2024-02-18T13:10:00Z',
    readTime: 8,
    featured: false,
    images: {
      thumb: '/images/articles/thumb/ambient-healing-thumb.jpg',
      small: '/images/articles/small/ambient-healing-small.jpg',
      medium: '/images/articles/medium/ambient-healing-medium.jpg',
      large: '/images/articles/large/soundscaping.jpg',
      alt: 'Person in meditation pose with sound waves visualization',
    },
    embeds: {
      youtube: {
        type: 'video',
        id: 'M4lR_Va97cQ',
        title: 'The Science of Healing Frequencies Documentary',
      },
    },
    seo: {
      metaTitle: 'Ambient Music as Healing: The Science Behind Therapeutic Soundscapes',
      metaDescription:
        "Discover how neuroscience validates ambient music's therapeutic effects and its growing use in healthcare settings.",
      keywords: ['ambient music', 'music therapy', 'healing frequencies', 'therapeutic soundscapes', 'neuroscience'],
    },
    album: null,
  },

  // Album of the Week entries
  {
    id: 101,
    slug: 'emily-scott-robinson-appalachia',
    title: 'Emily Scott Robinson, "Appalachia"',
    excerpt: 'The new LP from the country singer-songwriter is shot through with a much-needed sentiment: Hope.',
    content: `<p>When it was time to record her new album—the follow-up to 2021's excellent American Siren—country-folk singer-songwriter Emily Scott Robinson chose to do so at Dreamland Recording Studios, housed in a 130-year-old church sanctuary hidden in the trees outside of Kingston, New York. But the setting and the spiritual center of her work can be found hundreds of miles to the southwest of that location: "Oh, my heart for Appalachia/ Oh, my heart for these blue hills," Robinson sings in "Appalachia," the album's bluegrass-y title track. "Oh, my heart forever captured, beating still."</p>
      <p>The song is both an ode to that magical, mountainous region in the eastern United States and a celebration of resilience, community, and hope framed by the destruction Hurricane Helene brought to western North Carolina in 2024. It's also a showcase for Robinson's stop-you-in-your-tracks voice—crystal-clear, tinged with twang—and her skillful songwriting, which got her signed to Oh Boy Records, the label co-founded by John Prine in 1981.</p>
      <p>Robinson's specialty is telling stories about the human condition in ways that are seemingly simple yet vivid and evocative—like pencil sketches that bloom into Technicolor daydreams when you close your eyes. Appalachia is filled with examples of that gift: The quietly folky "Cast Iron Heart" depicts heartbreak and redemptive love without overdoing its namesake metaphor. "Time Traveler" is a slow-building tune spilling over with precise details about an elderly woman in cognitive decline. On "Dirtbag Saloon," Robinson turns a lilting country waltz into sharp commentary on economic inequality, gentrification, and "progress" at any cost, while in "Bless It All," she pieces together a stirring tale about struggle and perseverance using only an acoustic guitar, a memorable melody, and a lyrical collage of unpaid bills, tested faith, and shoulders to cry on.</p>
      <p>And then there's "The Time for Flowers," a song Robinson released as a single in 2020, catching the attention of the folks at Oh Boy. Written during the dark days of the Covid-19 pandemic, it's a gorgeous meditation on life's ups and downs, the interconnectedness of existence and the indisputable importance of hope. Against softly plucked guitar strings, Robinson sings, loud and clear: "The time for flowers will come again/ Maybe in one year, maybe in ten/ There are days despair will win/ But the time for flowers will come again."</p>
      <p>The sentiment is not an easy one to remember right now. It helps to have gifted songwriters like Robinson to remind us.</p>`,
    authorId: 5,
    categoryId: 2,
    tags: ['country', 'folk'],
    publishedDate: '2026-01-20T10:00:00Z',
    readTime: 5,
    featured: false,
    images: {
      thumb: '/images/mock/a0193936775_16.jpg',
      small: '/images/mock/a0193936775_16.jpg',
      medium: '/images/mock/a0193936775_16.jpg',
      large: '/images/mock/a0193936775_16.jpg',
      alt: 'Emily Scott Robinson - Appalachia album cover',
    },
    seo: {
      metaTitle: 'Emily Scott Robinson, "Appalachia" - Album tjedna - Radio Roza',
      metaDescription: 'The new LP from the country singer-songwriter is shot through with a much-needed sentiment: Hope.',
      keywords: ['Emily Scott Robinson', 'Appalachia', 'country', 'folk', 'album review'],
    },
    album: {
      artist: 'Emily Scott Robinson',
      albumTitle: 'Appalachia',
      cover: '/images/mock/a0193936775_16.jpg',
      releaseDate: '2025-01-10',
      genre: 'Country;Folk',
    },
  },

  {
    id: 102,
    slug: 'fontaines-dc-romance',
    title: 'Fontaines D.C., "Romance"',
    excerpt: 'Irish post-punk titans deliver their most ambitious and sonically diverse album yet.',
    content: `<p>Fontaines D.C. have always been a band in motion, each album marking a distinct evolution from the last. With Romance, their fourth studio album, the Dublin quintet has made their biggest leap yet—trading the raw, pub-ready energy of their earlier work for something grander, more cinematic, and unexpectedly tender.</p>
      <p>The album opens with "Romance," a track that immediately signals the band's new direction. Synthesizers wash over Grian Chatten's distinctive vocals as he navigates themes of love, loss, and the peculiar loneliness of fame. It's a far cry from the scrappy post-punk of Dogrel, yet it feels like a natural progression rather than a betrayal of their roots.</p>
      <p>"Starburster" showcases the band's ability to build tension like few others in contemporary rock. The track simmers and swells, Chatten's delivery oscillating between a whisper and a scream, before exploding into a cathartic chorus that demands repeated listens.</p>
      <p>Throughout Romance, producer James Ford (Arctic Monkeys, Depeche Mode) helps the band achieve a sound that's simultaneously massive and intimate. The production is rich with detail—listen closely and you'll hear layers of texture that reveal themselves over time, from the subtle electronic flourishes to the carefully placed acoustic moments.</p>
      <p>Lyrically, Chatten has never been more vulnerable. "In the Modern World" finds him grappling with anxiety and the pressure of expectations, while "Favourite" is a love song stripped of pretense, its simplicity making it all the more affecting.</p>
      <p>Romance isn't just Fontaines D.C.'s best album—it's a statement of intent from a band refusing to be confined by genre expectations or their own past successes.</p>`,
    authorId: 6,
    categoryId: 2,
    tags: ['post-punk', 'alternative-rock'],
    publishedDate: '2026-01-13T10:00:00Z',
    readTime: 5,
    featured: false,
    images: {
      thumb: '/images/mock/Romance_Fontaines_D.C._album_cover.jpg',
      small: '/images/mock/Romance_Fontaines_D.C._album_cover.jpg',
      medium: '/images/mock/Romance_Fontaines_D.C._album_cover.jpg',
      large: '/images/mock/Romance_Fontaines_D.C._album_cover.jpg',
      alt: 'Fontaines D.C. - Romance album cover',
    },
    seo: {
      metaTitle: 'Fontaines D.C., "Romance" - Album tjedna - Radio Roza',
      metaDescription: 'Irish post-punk titans deliver their most ambitious and sonically diverse album yet.',
      keywords: ['Fontaines D.C.', 'Romance', 'post-punk', 'alternative rock', 'album review'],
    },
    album: {
      artist: 'Fontaines D.C.',
      albumTitle: 'Romance',
      cover: '/images/mock/Romance_Fontaines_D.C._album_cover.jpg',
      releaseDate: '2024-08-23',
      genre: 'Post-Punk;Alternative Rock',
    },
  },

  {
    id: 103,
    slug: 'arooj-aftab-night-reign',
    title: 'Arooj Aftab, "Night Reign"',
    excerpt:
      'The Grammy-winning vocalist crafts nocturnal soundscapes that blur the lines between jazz, ambient, and South Asian classical music.',
    content: `<p>Arooj Aftab's Night Reign arrives as a meditation on darkness—not as absence, but as presence. The Brooklyn-based, Pakistani-born vocalist and composer has built a career on creating music that exists in the liminal spaces between genres, and this album may be her most fully realized vision yet.</p>
      <p>Opening with "Whiskey," Aftab immediately establishes the album's atmosphere: intimate, unhurried, and deeply textured. Her voice floats over sparse instrumentation, each note placed with intention, each silence as meaningful as the sounds that surround it.</p>
      <p>The production, handled by Aftab alongside longtime collaborator Gyan Riley, favors space over density. Instruments appear and recede like figures in fog—a guitar phrase here, a synth pad there, occasional percussion that feels more felt than heard. It's an approach that demands patient listening but rewards it generously.</p>
      <p>"Autumn Leaves," a Ghazal-influenced piece, showcases Aftab's ability to honor South Asian classical traditions while speaking a thoroughly contemporary musical language. The track unfolds over seven minutes, its gradual build mirroring the seasonal transformation of its title.</p>
      <p>Night Reign is music for the hours between midnight and dawn, when the world is quiet enough to hear your own thoughts. It's an album that doesn't demand attention so much as invite contemplation—a rare and precious quality in an age of constant noise.</p>`,
    authorId: 7,
    categoryId: 2,
    tags: ['jazz', 'ambient', 'world'],
    publishedDate: '2026-01-06T10:00:00Z',
    readTime: 4,
    featured: false,
    images: {
      thumb: '/images/mock/arooj.jpg',
      small: '/images/mock/arooj.jpg',
      medium: '/images/mock/arooj.jpg',
      large: '/images/mock/arooj.jpg',
      alt: 'Arooj Aftab - Night Reign album cover',
    },
    seo: {
      metaTitle: 'Arooj Aftab, "Night Reign" - Album tjedna - Radio Roza',
      metaDescription:
        'The Grammy-winning vocalist crafts nocturnal soundscapes that blur the lines between jazz, ambient, and South Asian classical music.',
      keywords: ['Arooj Aftab', 'Night Reign', 'jazz', 'ambient', 'world music', 'album review'],
    },
    album: {
      artist: 'Arooj Aftab',
      albumTitle: 'Night Reign',
      cover: '/images/mock/arooj.jpg',
      releaseDate: '2024-10-18',
      genre: 'Jazz;Ambient;World',
    },
  },

  {
    id: 104,
    slug: 'adrianne-lenker-bright-future',
    title: 'Adrianne Lenker, "Bright Future"',
    excerpt: "Big Thief's frontwoman delivers her most personal and sonically expansive solo work to date.",
    content: `<p>Adrianne Lenker has always possessed the rare ability to make deeply personal songwriting feel universal. With Bright Future, her fourth solo album, the Big Thief frontwoman expands her sonic palette while maintaining the intimate, handcrafted quality that has defined her work.</p>
      <p>Recorded largely live with a small group of collaborators, Bright Future captures the magic of musicians playing together in a room—something increasingly rare in modern production. The result is an album that breathes, its imperfections serving as reminders that real humans made these sounds.</p>
      <p>"Real House" opens the record with fingerpicked guitar and Lenker's voice, multitracked into gentle harmonies. It's a deceptively simple arrangement that reveals new details with each listen: the creak of a chair, the distant hum of an amplifier, the natural reverb of the recording space.</p>
      <p>The album's centerpiece, "Sadness As A Gift," finds Lenker at her most philosophical. Over swelling strings and subtle piano, she examines the role of melancholy in a fully lived life, arriving at conclusions that feel earned rather than prescribed.</p>
      <p>Throughout Bright Future, Lenker proves herself one of the most vital singer-songwriters of her generation—an artist capable of transforming the mundane into the magical through sheer force of observation and expression.</p>`,
    authorId: 8,
    categoryId: 2,
    tags: ['folk', 'indie-folk'],
    publishedDate: '2025-12-30T10:00:00Z',
    readTime: 4,
    featured: false,
    images: {
      thumb: '/images/mock/Adrianne-Lenker-Bright-Future-767x767.jpeg',
      small: '/images/mock/Adrianne-Lenker-Bright-Future-767x767.jpeg',
      medium: '/images/mock/Adrianne-Lenker-Bright-Future-767x767.jpeg',
      large: '/images/mock/Adrianne-Lenker-Bright-Future-767x767.jpeg',
      alt: 'Adrianne Lenker - Bright Future album cover',
    },
    seo: {
      metaTitle: 'Adrianne Lenker, "Bright Future" - Album tjedna - Radio Roza',
      metaDescription: "Big Thief's frontwoman delivers her most personal and sonically expansive solo work to date.",
      keywords: ['Adrianne Lenker', 'Bright Future', 'folk', 'indie folk', 'Big Thief', 'album review'],
    },
    album: {
      artist: 'Adrianne Lenker',
      albumTitle: 'Bright Future',
      cover: '/images/mock/Adrianne-Lenker-Bright-Future-767x767.jpeg',
      releaseDate: '2024-03-22',
      genre: 'Folk;Indie Folk',
    },
  },

  {
    id: 105,
    slug: 'idles-tangk',
    title: 'IDLES, "TANGK"',
    excerpt: "Bristol's beloved punk provocateurs trade aggression for vulnerability on their fifth studio album.",
    content: `<p>IDLES have built their reputation on righteous anger—songs that confront toxic masculinity, nationalism, and class inequality with unrelenting intensity. TANGK, their fifth album, doesn't abandon these concerns, but it approaches them from an unexpected angle: love.</p>
      <p>"Gift Horse," the album's opening track, sets the tone with Joe Talbot declaring "I want to be loved" over surprisingly gentle instrumentation. It's a vulnerable admission from a frontman better known for screaming than serenading, and it signals the album's willingness to explore emotional territory the band has previously avoided.</p>
      <p>That's not to say TANGK lacks punch. "Roy" is as propulsive as anything in the band's catalog, its driving rhythm and shouted vocals recalling the intensity of their debut. But even here, the lyrics speak to tenderness rather than rage.</p>
      <p>Producer Nigel Godrich (Radiohead, Beck) brings a new sonic dimension to the band's sound. The guitars are more textured, the arrangements more spacious, allowing individual elements room to breathe. It's a mature production for a band maturing in real-time.</p>
      <p>"Grace," the album's emotional peak, features Talbot at his most exposed, singing about fatherhood and the transformative power of caring for another person. It's a long way from the band that once declared "I'm scum," and that distance feels like growth rather than compromise.</p>`,
    authorId: 9,
    categoryId: 2,
    tags: ['post-punk', 'alternative-rock'],
    publishedDate: '2025-12-23T10:00:00Z',
    readTime: 4,
    featured: false,
    images: {
      thumb: '/images/mock/tangk.png',
      small: '/images/mock/tangk.png',
      medium: '/images/mock/tangk.png',
      large: '/images/mock/tangk.png',
      alt: 'IDLES - TANGK album cover',
    },
    seo: {
      metaTitle: 'IDLES, "TANGK" - Album tjedna - Radio Roza',
      metaDescription: "Bristol's beloved punk provocateurs trade aggression for vulnerability on their fifth studio album.",
      keywords: ['IDLES', 'TANGK', 'post-punk', 'alternative rock', 'album review'],
    },
    album: {
      artist: 'IDLES',
      albumTitle: 'TANGK',
      cover: '/images/mock/tangk.png',
      releaseDate: '2024-02-16',
      genre: 'Post-Punk;Alternative Rock',
    },
  },

  {
    id: 106,
    slug: 'kim-gordon-the-collective',
    title: 'Kim Gordon, "The Collective"',
    excerpt: 'The Sonic Youth legend continues her solo evolution with an abrasive, experimental collection.',
    content: `<p>At 71, Kim Gordon continues to make music that sounds like nothing else. The Collective, her second solo album, pushes even further into the experimental territory she explored on 2019's No Home Record, creating something that's part noise collage, part industrial meditation, and entirely her own.</p>
      <p>Working primarily with producer Justin Raisen, Gordon has crafted an album that rewards patience and challenges expectations. Opening track "BYE BYE" layers distorted vocals over churning electronics, establishing an atmosphere of beautiful unease that persists throughout the record.</p>
      <p>"I'm a Man" finds Gordon interrogating masculinity with characteristic wit and bite. The production is intentionally abrasive—guitars that sound like machinery, drums that hit like hammer blows—yet there's an underlying groove that makes the whole thing strangely danceable.</p>
      <p>The Collective isn't an easy listen, nor is it meant to be. Gordon has never been interested in accessibility for its own sake. Instead, she creates spaces where conventional song structure gives way to texture and atmosphere, where melody emerges from noise only to dissolve back into it.</p>
      <p>For those willing to meet Gordon on her terms, The Collective offers something increasingly rare: genuinely challenging music from an artist with nothing to prove and everything to explore.</p>`,
    authorId: 9,
    categoryId: 2,
    tags: ['experimental', 'noise-rock', 'electronic'],
    publishedDate: '2025-12-16T10:00:00Z',
    readTime: 4,
    featured: false,
    images: {
      thumb: '/images/mock/kim-gordon.jpg',
      small: '/images/mock/kim-gordon.jpg',
      medium: '/images/mock/kim-gordon.jpg',
      large: '/images/mock/kim-gordon.jpg',
      alt: 'Kim Gordon - The Collective album cover',
    },
    seo: {
      metaTitle: 'Kim Gordon, "The Collective" - Album tjedna - Radio Roza',
      metaDescription: 'The Sonic Youth legend continues her solo evolution with an abrasive, experimental collection.',
      keywords: ['Kim Gordon', 'The Collective', 'experimental', 'noise rock', 'Sonic Youth', 'album review'],
    },
    album: {
      artist: 'Kim Gordon',
      albumTitle: 'The Collective',
      cover: '/images/mock/kim-gordon.jpg',
      releaseDate: '2024-03-08',
      genre: 'Experimental;Noise Rock;Electronic',
    },
  },

  // ---------------------------------------------------------------------------
  // KOMENTAR Articles
  // ---------------------------------------------------------------------------
  {
    id: 3,
    slug: 'album-review-midnight-reveries-luna-collective',
    title: "Album Review: 'Midnight Reveries' by Luna Collective",
    excerpt:
      "Luna Collective's third album is a masterclass in atmospheric indie rock, blending shoegaze textures with post-rock dynamics.",
    content: `
      <p><strong>Luna Collective</strong> returns with their most ambitious work yet. <em>"Midnight Reveries"</em> sees the Chicago-based quartet expanding their sonic palette while maintaining the dreamy, introspective quality that made their previous releases so compelling.</p>

      <div class="rating">
        <h3>Rating: ★★★★☆ (4/5)</h3>
      </div>

      <h2>Track-by-Track Analysis</h2>

      <h3>1. "Suburban Ghosts"</h3>
      <p>The opening track immediately establishes the album's ethereal atmosphere. Layered guitars create a wall of sound that feels both massive and intimate, while the rhythm section provides a steady heartbeat beneath the swirling textures.</p>

      <h3>2. "Digital Séance"</h3>
      <p>Perhaps the album's most experimental moment, incorporating glitchy electronic elements that complement rather than compete with the organic instrumentation. The result is hauntingly beautiful.</p>

      <blockquote>
        <p>"We wanted to explore the intersection between memory and technology, how our digital lives become part of our emotional landscape."</p>
        <cite>– Sarah Chen, Luna Collective vocalist</cite>
      </blockquote>

      <h3>3. "Neon Cathedral"</h3>
      <p>The album's centerpiece is a seven-minute journey through cascading arpeggios and slowly building dynamics. It showcases the band's newfound confidence in extended compositions.</p>

      <h2>Production and Sound</h2>
      <p>Recorded at <strong>Electrical Audio</strong> with engineer <em>Greg Norman</em>, the album benefits from a warm, analog sound that gives space for each instrument to breathe. The reverb-drenched guitars never become muddy, and the vocals sit perfectly in the mix.</p>

      <ul>
        <li><strong>Highlights:</strong> "Digital Séance," "Neon Cathedral," "Static Dreams"</li>
        <li><strong>For fans of:</strong> My Bloody Valentine, Sigur Rós, Explosions in the Sky</li>
        <li><strong>Best experienced:</strong> On vinyl, late at night, with good headphones</li>
      </ul>

      <p><em>"Midnight Reveries"</em> confirms Luna Collective as one of the most promising acts in contemporary indie rock. While not every experiment succeeds, the album's emotional resonance and sonic ambition make it a rewarding listen for both longtime fans and newcomers.</p>
    `,
    authorId: 4,
    categoryId: 3,
    tags: ['shoegaze', 'post-rock', 'vinyl'],
    publishedDate: '2024-02-01T09:15:00Z',
    readTime: 5,
    featured: false,
    images: {
      thumb: '/images/articles/thumb/luna-collective-thumb.jpg',
      small: '/images/articles/small/luna-collective-small.jpg',
      medium: '/images/articles/medium/luna-collective-medium.jpg',
      large: '/images/articles/large/luna-collective-large.jpg',
      alt: 'Luna Collective band members in moody lighting',
    },
    embeds: {
      bandcamp: {
        type: 'album',
        id: '1234567890',
        title: 'Midnight Reveries by Luna Collective',
      },
    },
    seo: {
      metaTitle: "Album Review: 'Midnight Reveries' by Luna Collective - 4/5 Stars",
      metaDescription:
        "Luna Collective's third album blends shoegaze and post-rock in their most ambitious work yet. Read our full review.",
      keywords: ['Luna Collective', 'Midnight Reveries', 'album review', 'indie rock', 'shoegaze'],
    },
  },

  {
    id: 8,
    slug: 'vinilova-renesansa-zasto-se-vracamo-analognom-zvuku',
    title: 'Vinilova renesansa: Zašto se vraćamo analognom zvuku',
    excerpt:
      'Prodaja vinnil ploča raste već petnaest godina zaredom. Istražujemo što stoji iza ove neočekivane renesanse analognog formata.',
    content: `
      <p>U doba kada je sva glazba svijeta dostupna jednim klikom, <strong>vinilne ploče</strong> doživljavaju nezaustavljivi povratak. Ovo nije nostalgija – ovo je svjesni izbor nove generacije slušatelja.</p>

      <h2>Brojke koje govore</h2>
      <p>Prema podacima <em>IFPI-ja</em>, prodaja vinila u 2023. godini premašila je CD prodaju prvi put nakon 1987. godine. U Hrvatskoj, specijalizirane trgovine poput <strong>Dancing Bear</strong> i <strong>Dirty Old Shop</strong> bilježe konstantan rast prometa.</p>

      <h3>Zašto vinyl?</h3>
      <ul>
        <li><strong>Ritualni aspekt</strong> - Slušanje postaje svjestan čin, ne pozadinska buka</li>
        <li><strong>Zvučna toplina</strong> - Analogna reprodukcija nudi drugačiji doživljaj</li>
        <li><strong>Fizički artefakt</strong> - Artwork, liner notes, taktilni doživljaj</li>
        <li><strong>Kolekcjonarstvo</strong> - Ograničena izdanja, boje vinila, rariteteti</li>
      </ul>

      <blockquote>
        <p>"Streaming je za otkrivanje glazbe. Vinyl je za slušanje glazbe."</p>
        <cite>– vlasnik riječke trgovine pločama</cite>
      </blockquote>

      <h2>Lokalna vinyl kultura</h2>
      <p>Hrvatska vinyl scena živi i diše. Od <em>Record Store Day</em> događanja do sve brojnijih vinyl-only DJ setova, analogni format pronalazi svoje mjesto u digitalnom dobu.</p>

      <p>Lokalni labelii poput <strong>Menart</strong> i <strong>PDV Records</strong> sve češće objavljuju vinyl izdanja domaćih izvođača, prepoznajući da publika želi više od streaminga.</p>

      <h2>Održivost i budućnost</h2>
      <p>Kritičari upozoravaju na ekološki otisak proizvodnje PVC-a, no industrija odgovara razvojem biorazgradivih alternativa. Budućnost vinila možda leži u inovativnim materijalima koji zadržavaju karakteristike zvuka bez ekološke štete.</p>
    `,
    authorId: 3,
    categoryId: 3,
    tags: ['vinyl', 'vintage-gear'],
    publishedDate: '2024-03-01T14:30:00Z',
    readTime: 5,
    featured: false,
    images: {
      thumb: '/images/articles/thumb/field-recording-thumb.jpg',
      small: '/images/articles/small/soundscaping.jpg',
      medium: '/images/articles/medium/field-recording-medium.jpg',
      large: '/images/articles/large/soundscaping.jpg',
      alt: 'Kolekcija vinilnih ploča',
    },
    seo: {
      metaTitle: 'Vinilova renesansa: Zašto se vraćamo analognom zvuku',
      metaDescription: 'Prodaja vinila raste već petnaest godina. Što stoji iza povratka analognog formata?',
      keywords: ['vinyl', 'ploče', 'analogni zvuk', 'kolekcjonarstvo', 'glazba'],
    },
  },

  {
    id: 10,
    slug: 'kada-glazba-postane-politika-zvuk-otpora',
    title: 'Kada glazba postane politika: Zvuk otpora u doba krize',
    excerpt:
      'Od punk pokreta do današnjih digitalnih prosvjeda, glazba je uvijek bila oružje onih bez glasa. Kako zvuči otpor danas?',
    content: `
      <p>Glazba i politika oduvijek su bili isprepleteni. Od <em>Woodstocka</em> do <em>Live Aida</em>, od <strong>Azre</strong> do današnjih TikTok himni, zvuk je nosio poruke koje su riječi same po sebi ne bi mogle prenijeti.</p>

      <h2>Kratka povijest glazbenog aktivizma</h2>
      <p>Jugoslavenski novi val nije bio samo glazbeni pokret – bio je to kulturni i politički čin. Bendovi poput <em>Pankrta</em>, <em>Paraf</em> i <em>Azre</em> artikulirali su frustracije generacije koja je živjela u "blagostanju" koje se raspadalo iznutra.</p>

      <blockquote>
        <p>"Nismo htjeli srušiti sistem. Htjeli smo da sistem prizna da postoji netko tko ga ne prihvaća."</p>
        <cite>– veteran jugoslavenskog punka</cite>
      </blockquote>

      <h3>Današnji oblici otpora</h3>
      <ul>
        <li><strong>Benefit koncerti</strong> - Direktna podrška lokalnim zajednicama</li>
        <li><strong>Viralni prosvjedi</strong> - Pjesme koje postaju himne pokreta</li>
        <li><strong>DIY izdavaštvo</strong> - Zaobilaženje korporativnih struktura</li>
        <li><strong>Community radio</strong> - Demokratizacija medijskog prostora</li>
      </ul>

      <h2>Zvuk današnjice</h2>
      <p>U doba klimatske krize, rastućih nejednakosti i političke polarizacije, glazba ponovno postaje prostor artikulacije kolektivnih strahova i nada. Ali forma se promijenila.</p>

      <p>Današnji aktivizam je manje manifestiran kroz eksplicitne političke tekstove, a više kroz <strong>načine proizvodnje i distribucije</strong>. Kolektivi, kooperative, pay-what-you-want modeli – sve su to politički činovi u svijetu gdje je glazba postala roba.</p>

      <h2>Može li glazba promijeniti svijet?</h2>
      <p>Vjerojatno ne – barem ne direktno. Ali glazba može stvoriti prostore gdje se promjena čini mogućom. Može povezati ljude, artikulirati ono neizgovoreno i, makar na trenutak, stvoriti alternativnu stvarnost.</p>

      <p>A to, u doba cinizma i apatije, nije malo.</p>
    `,
    authorId: 2,
    categoryId: 3,
    tags: ['underground', 'diy', 'live-performance'],
    publishedDate: '2024-03-10T09:30:00Z',
    readTime: 6,
    featured: false,
    images: {
      thumb: '/images/articles/thumb/jazz-fusion-thumb.jpg',
      small: '/images/articles/small/jazz-fusion-small.jpg',
      medium: '/images/articles/medium/jazz-fusion-medium.jpg',
      large: '/images/articles/large/jazz-fusion-large.jpg',
      alt: 'Koncert s publikom koja drži transparente',
    },
    seo: {
      metaTitle: 'Kada glazba postane politika: Zvuk otpora u doba krize',
      metaDescription: 'Od punk pokreta do današnjih digitalnih prosvjeda – kako glazba artikulira otpor.',
      keywords: ['glazba', 'politika', 'aktivizam', 'punk', 'otpor', 'povijest'],
    },
  },

  // ---------------------------------------------------------------------------
  // ČAKULE Articles
  // ---------------------------------------------------------------------------
  {
    id: 5,
    slug: 'jazz-fusion-digital-renaissance-tradition-meets-technology',
    title: "Jazz Fusion's Digital Renaissance: When Tradition Meets Technology",
    excerpt:
      'A new generation of jazz musicians is embracing digital tools while honoring the improvisational spirit of the genre.',
    content: `
      <p>Jazz has always been about innovation and pushing boundaries. Today's jazz fusion artists are continuing that tradition by incorporating <strong>digital technologies</strong> while maintaining the genre's essential spirit of improvisation and musical conversation.</p>

      <h2>The New Guard</h2>
      <p>Artists like <em>Snarky Puppy</em>, <em>GoGo Penguin</em>, and <em>Alfa Mist</em> represent a new wave of jazz fusion that seamlessly blends acoustic instruments with electronic elements, creating music that feels both futuristic and deeply rooted in jazz tradition.</p>

      <h3>Technology as an Instrument</h3>
      <p>Modern jazz musicians aren't just adding computers to their setup – they're treating digital tools as extensions of their creative voice:</p>

      <ul>
        <li><strong>Live looping</strong> - Creating complex polyrhythms in real-time</li>
        <li><strong>Effects processing</strong> - Transforming acoustic instruments</li>
        <li><strong>Software instruments</strong> - Expanding the tonal palette</li>
        <li><strong>Laptop orchestras</strong> - Ensemble performance with technology</li>
      </ul>

      <blockquote>
        <p>"The computer is just another instrument in the band. It needs to listen, respond, and contribute to the conversation like any other musician."</p>
        <cite>– Robert Glasper, jazz pianist and producer</cite>
      </blockquote>

      <h2>Case Study: The London Jazz Scene</h2>
      <p>London's jazz scene has become a hotbed of innovation, with venues like <strong>Ronnie Scott's</strong> and <strong>Jazz Cafe</strong> regularly featuring artists who blur the lines between genres:</p>

      <h3>Key Artists to Watch</h3>
      <ul>
        <li><em>Nubya Garcia</em> - Saxophone-led compositions with electronic underpinnings</li>
        <li><em>Kamaal Williams</em> - Keyboard virtuoso blending jazz with broken beat</li>
        <li><em>Sons of Kemet</em> - Afro-Caribbean influences meet modern production</li>
        <li><em>Moses Boyd</em> - Drummer pushing the boundaries of rhythm and texture</li>
      </ul>

      <h2>The Educational Evolution</h2>
      <p>Jazz education is adapting too. Conservatories now offer courses in <strong>electronic music production</strong> alongside traditional theory and performance classes. Students learn to code in <em>Max/MSP</em> and <em>SuperCollider</em> as readily as they learn chord progressions.</p>

      <p>This technical knowledge doesn't replace musical intuition – it amplifies it. Young musicians are developing hybrid skill sets that allow them to be composers, performers, and sound designers simultaneously.</p>

      <h2>The Future of Improvisation</h2>
      <p>As artificial intelligence and machine learning advance, some jazz musicians are exploring collaborative improvisation with AI systems. While controversial, these experiments push us to consider fundamental questions about creativity, consciousness, and what makes music human.</p>

      <p>The digital renaissance of jazz fusion proves that tradition and innovation aren't opposing forces – they're dance partners in an ongoing musical conversation.</p>
    `,
    authorId: 3,
    categoryId: 4,
    tags: ['jazz', 'collaboration', 'live-performance'],
    publishedDate: '2024-02-12T11:20:00Z',
    readTime: 6,
    featured: false,
    images: {
      thumb: '/images/articles/thumb/jazz-fusion-thumb.jpg',
      small: '/images/articles/small/jazz-fusion-small.jpg',
      medium: '/images/articles/medium/jazz-fusion-medium.jpg',
      large: '/images/articles/large/jazz-fusion-large.jpg',
      alt: 'Jazz musician playing electric piano with laptop and effects pedals',
    },
    embeds: {
      bandcamp: {
        type: 'track',
        id: '987654321',
        title: 'Digital Conversations by London Jazz Collective',
      },
    },
    seo: {
      metaTitle: "Jazz Fusion's Digital Renaissance: When Tradition Meets Technology",
      metaDescription:
        'Explore how modern jazz musicians blend digital tools with traditional improvisation to create innovative fusion music.',
      keywords: ['jazz fusion', 'digital jazz', 'electronic jazz', 'improvisation', 'modern jazz'],
    },
  },

  {
    id: 9,
    slug: 'intervju-nova-generacija-hrvatskih-elektronicar',
    title: 'Intervju: Kako je nastala nova generacija hrvatskih elektroničara',
    excerpt:
      'Razgovaramo s četvero mladih producenata koji definiraju zvuk hrvatske elektronske scene za novo desetljeće.',
    content: `
      <p>Hrvatska elektronska scena prolazi kroz period intenzivnog rasta. Nova generacija producenata, odrasla na internetu i globalnim utjecajima, stvara glazbu koja konkurira svjetskim standardima.</p>

      <h2>Digitalni urođenici</h2>
      <p>Za razliku od prethodnih generacija koje su se morale probijati kroz fizičke barijere distribucije, današnji mladi glazbenici od prvog dana razmišljaju globalno. <strong>Bandcamp</strong>, <strong>SoundCloud</strong> i <strong>YouTube</strong> nisu im alati – to je njihov prirodni habitat.</p>

      <blockquote>
        <p>"Moj prvi release imao je više slušatelja u Japanu nego u Hrvatskoj. To ti odmah promijeni perspektivu."</p>
        <cite>– mlada producentica iz Zagreba</cite>
      </blockquote>

      <h3>Zajednički utjecaji</h3>
      <ul>
        <li><strong>UK bass</strong> - Dubstep, grime, garage kao temelj</li>
        <li><strong>Berlinski techno</strong> - Minimalizam i hipnotički ritam</li>
        <li><strong>Japanska elektronika</strong> - Teksture i prostornost</li>
        <li><strong>Lokalna tradicija</strong> - Elementi folklora u novom ruhu</li>
      </ul>

      <h2>Produkcija bez granica</h2>
      <p>Laptop je postao studio, a spavaća soba postala je glazbena tvornica. Ali ono što ovu generaciju čini posebnom nije samo pristup tehnologiji – to je njihov <em>mindset</em>.</p>

      <p>Kolaboracije se događaju preko kontinenata, mixevi se šalju putem interneta, a feedback dolazi u realnom vremenu od slušatelja iz cijelog svijeta.</p>

      <h2>Izazovi i prilike</h2>
      <p>Unatoč globalnoj povezanosti, lokalna infrastruktura ostaje problem. Nedostatak klubova, festivala i medijske podrške znači da mnogi talenti odlaze ili ostaju nevidljivi u vlastitoj zemlji.</p>

      <p>No upravo ta izolacija stvara jedinstveni zvuk – mješavinu globalnih trendova i lokalne specifičnosti koja je prepoznatljiva i autentična.</p>
    `,
    authorId: 4,
    categoryId: 4,
    tags: ['interview', 'electronic', 'diy'],
    publishedDate: '2024-03-05T11:00:00Z',
    readTime: 7,
    featured: false,
    images: {
      thumb: '/images/articles/thumb/bedroom-producer-thumb.jpg',
      small: '/images/articles/small/bedroom-producer-small.jpg',
      medium: '/images/articles/medium/bedroom-producer-medium.jpg',
      large: '/images/articles/large/bedroom-producer-large.jpg',
      alt: 'Mladi producent za laptopom',
    },
    seo: {
      metaTitle: 'Intervju: Nova generacija hrvatskih elektroničara',
      metaDescription: 'Razgovor s mladim producentima koji definiraju zvuk hrvatske elektronske scene.',
      keywords: ['elektronska glazba', 'producenti', 'hrvatska', 'intervju', 'nova generacija'],
    },
  },
];

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

/**
 * Enrich article with full author and category objects
 */
function enrichArticle(article) {
  return {
    ...article,
    author: getAuthorById(article.authorId),
    category: getCategoryById(article.categoryId),
  };
}

/**
 * Get all articles with optional filtering
 */
export function getArticles(options = {}) {
  let result = articles.map(enrichArticle);

  if (options.featured !== undefined) {
    result = result.filter((article) => article.featured === options.featured);
  }

  if (options.category) {
    result = result.filter(
      (article) => article.category.slug === options.category || article.category.id === options.category
    );
  }

  if (options.tag) {
    result = result.filter((article) => article.tags.includes(options.tag));
  }

  if (options.author) {
    result = result.filter(
      (article) =>
        article.author.id === options.author ||
        article.author.name === options.author ||
        article.author.slug === options.author
    );
  }

  if (options.hasAlbum !== undefined) {
    result = result.filter((article) => (options.hasAlbum ? article.album !== null : article.album === null));
  }

  // Sort by publish date (newest first)
  result.sort((a, b) => new Date(b.publishedDate) - new Date(a.publishedDate));

  if (options.limit) {
    result = result.slice(0, options.limit);
  }

  return result;
}

/**
 * Get a single article by ID or slug
 */
export function getArticle(identifier) {
  const article = articles.find((a) => a.id === identifier || a.slug === identifier);
  return article ? enrichArticle(article) : null;
}

/**
 * Get a featured article
 */
export function getFeaturedArticle() {
  const article = articles.find((a) => a.featured);
  return article ? enrichArticle(article) : null;
}

/**
 * Get related articles based on category and tags
 */
export function getRelatedArticles(article, limit = 3) {
  const enrichedArticle = typeof article === 'object' ? article : getArticle(article);
  if (!enrichedArticle) return [];

  return articles
    .filter((a) => a.id !== enrichedArticle.id)
    .map(enrichArticle)
    .filter(
      (a) =>
        a.category.id === enrichedArticle.category.id || a.tags.some((tag) => enrichedArticle.tags.includes(tag))
    )
    .sort((a, b) => {
      const aScore =
        (a.category.id === enrichedArticle.category.id ? 2 : 0) +
        a.tags.filter((tag) => enrichedArticle.tags.includes(tag)).length;
      const bScore =
        (b.category.id === enrichedArticle.category.id ? 2 : 0) +
        b.tags.filter((tag) => enrichedArticle.tags.includes(tag)).length;
      return bScore - aScore;
    })
    .slice(0, limit);
}

/**
 * Get all categories
 */
export function getCategories() {
  return [...categories];
}

/**
 * Get a single category by slug or ID
 */
export function getCategory(identifier) {
  return categories.find((c) => c.slug === identifier || c.id === identifier) || null;
}

/**
 * Get all tags
 */
export function getTags() {
  return [...tags];
}

/**
 * Get all authors
 */
export function getAuthors() {
  return [...authors];
}

/**
 * Get a single author by slug or ID
 */
export function getAuthor(identifier) {
  return authors.find((a) => a.slug === identifier || a.id === identifier) || null;
}

/**
 * Search articles by title, excerpt, or content
 */
export function searchArticles(query, limit = 10) {
  const searchTerm = query.toLowerCase();
  return articles
    .filter(
      (article) =>
        article.title.toLowerCase().includes(searchTerm) ||
        article.excerpt.toLowerCase().includes(searchTerm) ||
        article.content.toLowerCase().includes(searchTerm) ||
        article.tags.some((tag) => tag.toLowerCase().includes(searchTerm))
    )
    .map(enrichArticle)
    .slice(0, limit);
}

/**
 * Get articles by date range
 */
export function getArticlesByDateRange(startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);

  return articles
    .filter((article) => {
      const publishDate = new Date(article.publishedDate);
      return publishDate >= start && publishDate <= end;
    })
    .map(enrichArticle);
}

/**
 * Get article statistics
 */
export function getArticleStats() {
  return {
    totalArticles: articles.length,
    featuredArticles: articles.filter((a) => a.featured).length,
    albumArticles: articles.filter((a) => a.album !== null).length,
    categories: categories.length,
    authors: authors.length,
    averageReadTime: Math.round(articles.reduce((sum, a) => sum + a.readTime, 0) / articles.length),
  };
}

// =============================================================================
// ALBUM-SPECIFIC UTILITIES (for backwards compatibility)
// =============================================================================

/**
 * Flatten album article data for backwards compatibility with existing components.
 * Maps new unified structure to old album-specific structure.
 */
function flattenAlbumData(article) {
  if (!article || !article.album) return article;

  return {
    ...article,
    // Flatten album properties to top level for compatibility
    artist: article.album.artist,
    albumTitle: article.album.albumTitle,
    cover: article.album.cover,
    genre: article.album.genre,
    releaseDate: article.album.releaseDate,
    // Map excerpt to description (old naming)
    description: article.excerpt,
    // Map publishedDate to publishDate (old naming)
    publishDate: article.publishedDate,
  };
}

/**
 * Get all albums of the week (articles with album data), sorted by publish date
 */
export function getAlbumsOfTheWeek(options = {}) {
  return getArticles({ ...options, category: 'album-tjedna', hasAlbum: true }).map(flattenAlbumData);
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
  const article = getArticle(slug);
  return article && article.album ? flattenAlbumData(article) : null;
}

/**
 * Get albums by author
 */
export function getAlbumsByAuthor(authorSlug) {
  return getArticles({ author: authorSlug, hasAlbum: true }).map(flattenAlbumData);
}
