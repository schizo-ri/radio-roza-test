/**
 * Mock Articles Data for Testing
 *
 * This file contains sample articles with all the necessary fields for testing
 * the CMS and article pages before implementing the actual CMS.
 */

export const mockAuthors = [
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
];

export const mockCategories = [
  {
    id: 1,
    slug: 'aktualno',
    title: 'Aktualno',
    description: 'Novo na Radio Roži',
  },
  {
    id: 2,
    slug: 'album-tjedna',
    title: 'Album tjedna',
    description: 'Album tjedna je radio program koji se bavi najnovijim albumima i izdanjima.',
  },
  {
    id: 3,
    slug: 'komentar',
    title: 'Komentar',
    description: 'Komentar je radio program koji se bavi najnovijim komentarima i izdanjima.',
  },
  {
    id: 4,
    slug: 'cakule',
    title: 'Čakule',
    description: 'Čakule je radio program koji se bavi najnovijim čakulama i izdanjima.',
  },
];

export const mockTags = [
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
];

export const mockArticles = [
  {
    id: 1,
    title: 'The Resurgence of Modular Synthesis in Contemporary Electronic Music',
    slug: 'resurgence-modular-synthesis-contemporary-electronic',
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
    images: {
      thumb: '/images/articles/thumb/modular-synth-thumb.jpg',
      small: '/images/articles/small/modular-synth-small.jpg',
      medium: '/images/articles/medium/modular-synth-medium.jpg',
      large: '/images/articles/large/modular-synth-large.jpg',
      alt: 'Close-up of a modular synthesizer with patch cables',
    },
    author: mockAuthors[0],
    category: mockCategories[0], // Electronic
    tags: ['modular-synth', 'electronic', 'synthesis', 'contemporary'],
    publishedDate: '2024-01-15T10:00:00Z',
    readTime: 8,
    featured: true,
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
    id: 2,
    title: "Field Recordings and Found Sound: Capturing the World's Hidden Orchestra",
    slug: 'field-recordings-found-sound-hidden-orchestra',
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
    images: {
      thumb: '/images/articles/thumb/field-recording-thumb.jpg',
      small: '/images/articles/small/field-recording-small.jpg',
      medium: '/images/articles/medium/field-recording-medium.jpg',
      large: '/images/articles/large/field-recording-large.jpg',
      alt: 'Person with headphones holding a field recorder in a forest',
    },
    author: mockAuthors[1],
    category: mockCategories[1], // Experimental
    tags: ['field-recording', 'ambient', 'soundscape', 'experimental', 'found-sound'],
    publishedDate: '2024-01-22T14:30:00Z',
    readTime: 6,
    featured: false,
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
  },

  {
    id: 3,
    title: "Album Review: 'Midnight Reveries' by Luna Collective",
    slug: 'album-review-midnight-reveries-luna-collective',
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
    images: {
      thumb: '/images/articles/thumb/luna-collective-thumb.jpg',
      small: '/images/articles/small/luna-collective-small.jpg',
      medium: '/images/articles/medium/luna-collective-medium.jpg',
      large: '/images/articles/large/luna-collective-large.jpg',
      alt: 'Luna Collective band members in moody lighting',
    },
    author: mockAuthors[3],
    category: mockCategories[2], // Review
    tags: ['album-review', 'indie-rock', 'shoegaze', 'post-rock', 'chicago'],
    publishedDate: '2024-02-01T09:15:00Z',
    readTime: 5,
    featured: true,
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
    id: 4,
    title: 'The DIY Revolution: How Bedroom Producers Are Changing Electronic Music',
    slug: 'diy-revolution-bedroom-producers-electronic-music',
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
    images: {
      thumb: '/images/articles/thumb/bedroom-producer-thumb.jpg',
      small: '/images/articles/small/bedroom-producer-small.jpg',
      medium: '/images/articles/medium/bedroom-producer-medium.jpg',
      large: '/images/articles/large/bedroom-producer-large.jpg',
      alt: 'Home studio setup with laptop, speakers, and MIDI controller',
    },
    author: mockAuthors[0],
    category: mockCategories[0], // Electronic
    tags: ['diy', 'bedroom-producer', 'electronic', 'home-studio', 'music-production'],
    publishedDate: '2024-02-08T16:45:00Z',
    readTime: 7,
    featured: false,
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
      keywords: [
        'DIY music',
        'bedroom producer',
        'electronic music',
        'home studio',
        'music production',
      ],
    },
  },

  {
    id: 5,
    title: "Jazz Fusion's Digital Renaissance: When Tradition Meets Technology",
    slug: 'jazz-fusion-digital-renaissance-tradition-meets-technology',
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
    images: {
      thumb: '/images/articles/thumb/jazz-fusion-thumb.jpg',
      small: '/images/articles/small/jazz-fusion-small.jpg',
      medium: '/images/articles/medium/jazz-fusion-medium.jpg',
      large: '/images/articles/large/jazz-fusion-large.jpg',
      alt: 'Jazz musician playing electric piano with laptop and effects pedals',
    },
    author: mockAuthors[2],
    category: mockCategories[3], // Jazz
    tags: ['jazz', 'fusion', 'electronic', 'improvisation', 'london-jazz'],
    publishedDate: '2024-02-12T11:20:00Z',
    readTime: 6,
    featured: false,
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
    id: 6,
    title: 'Ambient Music as Healing: The Science Behind Therapeutic Soundscapes',
    slug: 'ambient-music-healing-science-therapeutic-soundscapes',
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
    images: {
      thumb: '/images/articles/thumb/ambient-healing-thumb.jpg',
      small: '/images/articles/small/ambient-healing-small.jpg',
      medium: '/images/articles/medium/ambient-healing-medium.jpg',
      large: '/images/articles/large/ambient-healing-large.jpg',
      alt: 'Person in meditation pose with sound waves visualization',
    },
    author: mockAuthors[1],
    category: mockCategories[1], // Ambient
    tags: ['ambient', 'healing', 'therapy', 'neuroscience', 'wellness'],
    publishedDate: '2024-02-18T13:10:00Z',
    readTime: 8,
    featured: true,
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
      keywords: [
        'ambient music',
        'music therapy',
        'healing frequencies',
        'therapeutic soundscapes',
        'neuroscience',
      ],
    },
  },
];

// Utility functions for accessing mock data

/**
 * Get all articles with optional filtering
 */
export function getArticles(options = {}) {
  let articles = [...mockArticles];

  if (options.featured) {
    articles = articles.filter((article) => article.featured);
  }

  if (options.category) {
    articles = articles.filter(
      (article) =>
        article.category.slug === options.category || article.category.name === options.category
    );
  }

  if (options.tag) {
    articles = articles.filter((article) => article.tags.includes(options.tag));
  }

  if (options.author) {
    articles = articles.filter(
      (article) =>
        article.author.id === options.author ||
        article.author.name === options.author ||
        article.author.slug === options.author
    );
  }

  if (options.limit) {
    articles = articles.slice(0, options.limit);
  }

  // Sort by publish date (newest first)
  return articles.sort((a, b) => new Date(b.publishedDate) - new Date(a.publishedDate));
}

/**
 * Get a single article by ID or slug
 */
export function getArticle(identifier) {
  return mockArticles.find((article) => article.id === identifier || article.slug === identifier);
}

/**
 * Get related articles based on category and tags
 */
export function getRelatedArticles(article, limit = 3) {
  const related = mockArticles
    .filter((a) => a.id !== article.id)
    .filter(
      (a) =>
        a.category.id === article.category.id || a.tags.some((tag) => article.tags.includes(tag))
    )
    .sort((a, b) => {
      // Score based on category match and tag overlap
      const aScore =
        (a.category.id === article.category.id ? 2 : 0) +
        a.tags.filter((tag) => article.tags.includes(tag)).length;
      const bScore =
        (b.category.id === article.category.id ? 2 : 0) +
        b.tags.filter((tag) => article.tags.includes(tag)).length;
      return bScore - aScore;
    })
    .slice(0, limit);

  return related;
}

/**
 * Get all categories
 */
export function getCategories() {
  return [...mockCategories];
}

/**
 * Get all tags
 */
export function getTags() {
  return [...mockTags];
}

/**
 * Get all authors
 */
export function getAuthors() {
  return [...mockAuthors];
}

/**
 * Search articles by title, excerpt, or content
 */
export function searchArticles(query, limit = 10) {
  const searchTerm = query.toLowerCase();
  return mockArticles
    .filter(
      (article) =>
        article.title.toLowerCase().includes(searchTerm) ||
        article.excerpt.toLowerCase().includes(searchTerm) ||
        article.content.toLowerCase().includes(searchTerm) ||
        article.tags.some((tag) => tag.toLowerCase().includes(searchTerm)) ||
        article.category.name.toLowerCase().includes(searchTerm)
    )
    .slice(0, limit);
}

/**
 * Get articles by date range
 */
export function getArticlesByDateRange(startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);

  return mockArticles.filter((article) => {
    const publishDate = new Date(article.publishedDate);
    return publishDate >= start && publishDate <= end;
  });
}

/**
 * Get article statistics
 */
export function getArticleStats() {
  return {
    totalArticles: mockArticles.length,
    featuredArticles: mockArticles.filter((a) => a.featured).length,
    categories: mockCategories.length,
    authors: mockAuthors.length,
    averageReadTime: Math.round(
      mockArticles.reduce((sum, article) => sum + article.readTime, 0) / mockArticles.length
    ),
    articlesWithEmbeds: mockArticles.filter((a) => a.embeds).length,
  };
}
