# Mock API za Radio Rožu

Ovaj direktorij sadrži strukturirane mock podatke i simulirani API za Radio Rožu web stranicu. Svi podaci su organizirani po entitetima s međusobnim vezama i helper funkcijama za lakše korištenje.

## Struktura podataka

### 📁 Datoteke

- `users.js` - Korisnici koji se mogu prijaviti u CMS
- `authors.js` - Autori članaka i emisija (mogu biti vezani uz korisnike ili gosti)
- `shows.js` - Radijske emisije (tematski blokovi i govorne emisije)
- `episodes.js` - Epizode emisija s detaljnim informacijama
- `articles.js` - Članci s poboljšanom strukturom i SEO metapodacima
- `categories.js` - Kategorije za organizaciju sadržaja
- `tags.js` - Tagovi za označavanje i pretraživanje
- `index.js` - Glavni API s async funkcijama i simulacijom kašnjenja

## Korištenje

### Osnovni import

```javascript
import mockAPI from '$lib/data/mock';

// ili pojedinačni API-ji
import { articlesAPI, showsAPI, episodesAPI } from '$lib/data/mock';
```

### Primjeri korištenja

#### Dohvaćanje članaka

```javascript
// Svi objavljeni članci
const articles = await mockAPI.articles.getAll({ status: 'published' });

// Članci s paginacijom
const pagedArticles = await mockAPI.articles.getAll({
  status: 'published',
  page: 2,
  perPage: 10
});

// Dohvati članak po slug-u
const article = await mockAPI.articles.getBySlug('nova-sezona-elektronskog-pulsa');

// Featured članci
const featured = await mockAPI.articles.getFeatured(5);

// Najpopularniji članci
const popular = await mockAPI.articles.getPopular(10);

// Pretraživanje
const searchResults = await mockAPI.articles.search('techno', { page: 1 });
```

#### Rad s emisijama

```javascript
// Sve aktivne emisije
const activeShows = await mockAPI.shows.getActive();

// Emisije po tipu
const talkShows = await mockAPI.shows.getByType('govorna_emisija');
const musicShows = await mockAPI.shows.getByType('tematski_blok');

// Emisije vanjskih suradnika
const externalShows = await mockAPI.shows.getAll({ external: true });

// Emisija po slug-u
const show = await mockAPI.shows.getBySlug('elektronski-puls');

// Live emisije
const liveShows = await mockAPI.shows.getLive();
```

#### Rad s epizodama

```javascript
// Najnovije epizode
const latestEpisodes = await mockAPI.episodes.getLatest(10);

// Epizode određene emisije
const showEpisodes = await mockAPI.episodes.getByShow('show_002');

// Najpopularnije epizode
const mostPlayed = await mockAPI.episodes.getMostPlayed(5);

// Epizode s gostima
const episodesWithGuests = await mockAPI.episodes.getAll({ 
  status: 'published',
  page: 1,
  perPage: 20
});
```

#### Rad s autorima

```javascript
// Svi aktivni autori
const activeAuthors = await mockAPI.authors.getActive();

// Gost autori (bez korisničkog računa)
const guestAuthors = await mockAPI.authors.getGuests();

// Autor po ID-u
const author = await mockAPI.authors.getById('auth_001');

// Autori koji vode emisije
const showHosts = await mockAPI.authors.getWithShows();
```

#### Kategorije i tagovi

```javascript
// Stablo kategorija
const categoryTree = await mockAPI.categories.getTree();

// Glavne kategorije
const mainCategories = await mockAPI.categories.getMain();

// Tag cloud
const tagCloud = await mockAPI.tags.getCloud();

// Popularni tagovi
const popularTags = await mockAPI.tags.getPopular(20);
```

#### Globalno pretraživanje

```javascript
// Pretraži sve tipove sadržaja
const searchResults = await mockAPI.search.searchAll('jazz', {
  limit: 10 // max rezultata po tipu
});

// Rezultat će sadržavati:
// {
//   articles: [...],
//   episodes: [...],
//   shows: [...],
//   authors: [...],
//   tags: [...]
// }
```

#### Statistike

```javascript
// Pregled svih statistika
const stats = await mockAPI.stats.getOverview();

// Sadržaj u datumskom rasponu
const content = await mockAPI.stats.getContentByDateRange(
  '2024-01-01T00:00:00Z',
  '2024-01-31T23:59:59Z'
);
```

## Struktura podataka

### User
```javascript
{
  id: string,
  email: string,
  username: string,
  firstName: string,
  lastName: string,
  role: 'admin' | 'editor' | 'author' | 'contributor' | 'guest',
  isActive: boolean,
  avatar: string,
  createdDate: ISO date,
  updatedDate: ISO date,
  lastLogin: ISO date,
  preferences: object
}
```

### Author
```javascript
{
  id: string,
  firstName: string,
  lastName: string,
  nickname: string | null,
  slug: string,
  email: string,
  phone: string | null,
  bio: string,
  avatar: string,
  userId: string | null, // null za goste
  isActive: boolean,
  joinedDate: ISO date,
  social: object,
  expertise: array,
  stats: object
}
```

### Show
```javascript
{
  id: string,
  title: string,
  slug: string,
  type: 'tematski_blok' | 'govorna_emisija',
  description: string,
  longDescription: string,
  isExternal: boolean,
  isActive: boolean,
  startDate: ISO date,
  endDate: ISO date | null,
  cover: object,
  hosts: array of author IDs,
  schedule: object,
  categories: array,
  tags: array,
  social: object,
  stats: object,
  metadata: object
}
```

### Episode
```javascript
{
  id: string,
  showId: string,
  episodeNumber: number,
  title: string,
  slug: string,
  description: string,
  longDescription: string,
  cover: string | null,
  airDate: ISO date,
  duration: number (minutes),
  authors: array of author IDs,
  guests: array,
  status: 'draft' | 'published' | 'archived',
  isLive: boolean,
  recordingDate: ISO date,
  links: object,
  segments: array,
  playlist: array,
  tags: array,
  stats: object,
  metadata: object
}
```

### Article
```javascript
{
  id: string,
  title: string,
  slug: string,
  excerpt: string,
  content: HTML string,
  authorId: string,
  categoryId: string,
  tags: array,
  featuredImage: object,
  gallery: array,
  status: 'draft' | 'published' | 'archived' | 'scheduled',
  publishedDate: ISO date,
  updatedDate: ISO date,
  scheduledDate: ISO date | null,
  featured: boolean,
  sticky: boolean,
  readTime: number (minutes),
  viewCount: number,
  relatedArticles: array of IDs,
  relatedShows: array of IDs,
  relatedEpisodes: array of IDs,
  embeds: array,
  seo: object,
  comments: object
}
```

### Category
```javascript
{
  id: string,
  title: string,
  slug: string,
  description: string,
  color: hex color,
  icon: string,
  parentId: string | null,
  order: number,
  isActive: boolean,
  articleCount: number,
  featuredImage: string,
  seo: object
}
```

### Tag
```javascript
{
  id: string,
  name: string,
  slug: string,
  description: string,
  count: number,
  color: hex color,
  category: string
}
```

## Paginacija

Svi API pozivi koji vraćaju liste podržavaju paginaciju:

```javascript
const result = await mockAPI.articles.getAll({
  page: 2,
  perPage: 20
});

// Rezultat sadrži:
{
  items: [...], // stranica podataka
  pagination: {
    page: 2,
    perPage: 20,
    total: 156,
    totalPages: 8,
    hasNext: true,
    hasPrev: true
  }
}
```

## Simulacija kašnjenja

Svi API pozivi imaju simulirano kašnjenje od 300ms da bi bolje simulirali pravi API. Ovo omogućava testiranje loading stanja u UI-ju.

## Error handling

API funkcije bacaju greške kad resurs nije pronađen:

```javascript
try {
  const article = await mockAPI.articles.getById('nepostojeci-id');
} catch (error) {
  console.error(error.message); // "Article with id nepostojeci-id not found"
}
```

## Direktan pristup sirovim podacima

Ako trebate direktan pristup podacima bez async simulacije:

```javascript
import { 
  rawUsers, 
  rawAuthors, 
  rawShows, 
  rawEpisodes, 
  rawArticles,
  rawCategories,
  rawTags 
} from '$lib/data/mock';
```

## Napomene

1. Svi datumi su u ISO 8601 formatu
2. ID-jevi koriste prefixe za lakše prepoznavanje (npr. `auth_001`, `show_002`, `ep_003`)
3. Slug-ovi su URL-friendly verzije naslova
4. Veze između entiteta su implementirane preko ID-jeva
5. Mock podaci su statični ali API simulira dinamičko ponašanje (npr. brojač pregleda)

## Buduće poboljšanje

Ovaj mock API je dizajniran da bude lako zamijenjen pravim backend API-jem. Trebate samo zamijeniti mock implementacije s pravim HTTP pozivima zadržavajući istu strukturu i potpise funkcija.