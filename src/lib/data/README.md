# Mock Articles System

A comprehensive mock data system for testing CMS functionality before implementing a real content management system. This system provides realistic article data with all the features you'd expect from a production CMS.

## Features

### 🗂️ Complete Article Structure
- **Rich HTML content** with proper formatting, headings, lists, tables, and blockquotes
- **Author information** with bio, avatar, and social media links
- **Categories** with color coding for visual organization
- **Tags** for detailed content classification
- **Publication dates** and estimated read times
- **SEO metadata** including titles, descriptions, and keywords
- **Featured article** system for highlighting important content

### 🎵 Media Embeds
- **Bandcamp** album and track embeds
- **YouTube** video and playlist embeds
- Easy to extend for other platforms

### 🖼️ Image System
- **Responsive image sets** (thumb, small, medium, large)
- **SVG placeholder generation** with themed designs
- **Author avatars** automatically generated from names
- **Alt text** included for accessibility

### 🎨 Visual Elements
- **Category color schemes** for consistent branding
- **Author avatar generation** with initials and consistent colors
- **Themed article placeholders** based on content category

## Quick Start

### Import and Use Articles

```javascript
import { getArticles, getArticle } from '$lib/data/mockArticles.js';

// Get all articles
const allArticles = getArticles();

// Get featured articles only
const featuredArticles = getArticles({ featured: true, limit: 5 });

// Get articles by category
const electronicArticles = getArticles({ category: 'electronic' });

// Get a single article by slug
const article = getArticle('resurgence-modular-synthesis-contemporary-electronic');
```

### Generate Placeholder Images

```javascript
import { 
  generateAuthorAvatarUrl, 
  generateArticleImageSet,
  getThemeFromCategory 
} from '$lib/utils/placeholders.js';

// Generate author avatar
const avatarUrl = generateAuthorAvatarUrl('Elena Rodriguez', 150);

// Generate article image set
const theme = getThemeFromCategory('electronic');
const imageSet = generateArticleImageSet('Article Title', theme);
```

### Use in Svelte Components

```svelte
<script>
  import { getArticles } from '$lib/data/mockArticles.js';
  import { generateAuthorAvatarUrl } from '$lib/utils/placeholders.js';
  
  const articles = getArticles({ limit: 6 });
</script>

{#each articles as article}
  <article>
    <h2>{article.title}</h2>
    <p>{article.excerpt}</p>
    <img src={generateAuthorAvatarUrl(article.author.name)} alt="{article.author.name} avatar" />
    <time>{new Date(article.publishedDate).toLocaleDateString()}</time>
  </article>
{/each}
```

## API Reference

### Core Functions

#### `getArticles(options)`
Retrieve articles with optional filtering.

**Parameters:**
- `options.featured` (boolean) - Filter to featured articles only
- `options.category` (string) - Filter by category slug or name
- `options.tag` (string) - Filter by tag
- `options.author` (string|number) - Filter by author name or ID
- `options.limit` (number) - Limit number of results

**Returns:** Array of article objects

#### `getArticle(identifier)`
Get a single article by ID or slug.

**Parameters:**
- `identifier` (string|number) - Article ID or slug

**Returns:** Article object or undefined

#### `getRelatedArticles(article, limit)`
Find articles related to the given article based on category and tags.

**Parameters:**
- `article` (object) - The source article
- `limit` (number) - Maximum number of related articles (default: 3)

**Returns:** Array of related articles

#### `searchArticles(query, limit)`
Search articles by title, excerpt, content, tags, or category.

**Parameters:**
- `query` (string) - Search term
- `limit` (number) - Maximum results (default: 10)

**Returns:** Array of matching articles

### Data Access Functions

#### `getCategories()`
Returns all available categories with ID, name, slug, and color.

#### `getTags()`
Returns all available tags as an array of strings.

#### `getAuthors()`
Returns all author objects with complete information.

#### `getArticleStats()`
Returns statistics about the article collection:
```javascript
{
  totalArticles: 6,
  featuredArticles: 3,
  categories: 8,
  authors: 4,
  averageReadTime: 6,
  articlesWithEmbeds: 6
}
```

### Utility Functions

#### `getArticlesByDateRange(startDate, endDate)`
Filter articles by publication date range.

#### `generateAuthorAvatarUrl(name, size)`
Create SVG avatar with initials and consistent colors.

#### `generateArticleImageSet(title, theme)`
Create responsive image set with themed placeholder.

#### `getThemeFromCategory(categorySlug)`
Map category to appropriate visual theme.

## Article Structure

Each article object contains:

```javascript
{
  id: 1,
  title: "Article Title",
  slug: "article-slug",
  excerpt: "Brief description...",
  content: "<p>HTML formatted content...</p>",
  images: {
    thumb: "/path/to/thumb.jpg",
    small: "/path/to/small.jpg", 
    medium: "/path/to/medium.jpg",
    large: "/path/to/large.jpg",
    alt: "Image description"
  },
  author: {
    id: 1,
    name: "Author Name",
    bio: "Author biography...",
    avatar: "/path/to/avatar.jpg",
    social: {
      twitter: "@handle",
      instagram: "@handle"
    }
  },
  category: {
    id: 1,
    name: "Category Name",
    slug: "category-slug",
    color: "#3B82F6"
  },
  tags: ["tag1", "tag2", "tag3"],
  publishedDate: "2024-01-15T10:00:00Z",
  readTime: 8,
  featured: true,
  embeds: {
    bandcamp: {
      type: "album",
      id: "123456789",
      title: "Album Title"
    },
    youtube: {
      type: "video", 
      id: "videoId",
      title: "Video Title"
    }
  },
  seo: {
    metaTitle: "SEO optimized title",
    metaDescription: "SEO description...",
    keywords: ["keyword1", "keyword2"]
  }
}
```

## Available Categories

- **Electronic** (#3B82F6) - Electronic music and production
- **Ambient** (#8B5CF6) - Ambient and atmospheric music
- **Indie Rock** (#EF4444) - Independent rock music
- **Experimental** (#10B981) - Experimental and avant-garde
- **Jazz** (#F59E0B) - Jazz and fusion
- **Folk** (#84CC16) - Folk and acoustic music
- **Hip Hop** (#6366F1) - Hip hop and rap
- **Review** (#EC4899) - Album and music reviews

## Sample Articles

The system includes 6 comprehensive sample articles:

1. **Modular Synthesis** - Electronic music technology deep-dive
2. **Field Recordings** - Experimental sound capture techniques  
3. **Album Review** - Professional music criticism format
4. **DIY Revolution** - Bedroom producer culture analysis
5. **Jazz Fusion** - Genre evolution and modern techniques
6. **Ambient Healing** - Music therapy and neuroscience

## Placeholder Image Themes

The placeholder generator supports these visual themes:
- `music` - General music theme with musical notes
- `electronic` - Electronic/digital aesthetic 
- `ambient` - Soft, atmospheric design
- `jazz` - Warm, classic styling
- `review` - Review/rating focused design

## Components

### ArticleList.svelte
Displays articles in a responsive grid with:
- Filtering by category, featured status
- Author avatars and meta information
- Responsive design
- Hover effects and animations

### ArticleView.svelte  
Full article display component with:
- Rich content rendering
- Author information and social links
- Media embeds (Bandcamp, YouTube)
- Share functionality
- Mobile-responsive design

## Usage in Routes

### List Page
```javascript
// +page.js
import { getArticles } from '$lib/data/mockArticles.js';

export function load({ url }) {
  const category = url.searchParams.get('category');
  const featured = url.searchParams.has('featured');
  
  return {
    articles: getArticles({ category, featured })
  };
}
```

### Article Detail Page
```javascript  
// [slug]/+page.js
import { error } from '@sveltejs/kit';
import { getArticle } from '$lib/data/mockArticles.js';

export function load({ params }) {
  const article = getArticle(params.slug);
  
  if (!article) {
    throw error(404, 'Article not found');
  }
  
  return { article };
}
```

## SEO and Accessibility

The mock data includes comprehensive SEO metadata:
- **Meta titles and descriptions** optimized for search
- **Keywords** relevant to content
- **Structured data** (JSON-LD) for rich snippets
- **Alt text** for all images
- **Semantic HTML** in article content
- **Social media tags** (Open Graph, Twitter Card)

## Extending the System

### Adding New Articles
Add to the `mockArticles` array in `/src/lib/data/mockArticles.js`:

```javascript
{
  id: 7,
  title: "New Article Title",
  slug: "new-article-slug", 
  // ... rest of article structure
}
```

### Adding New Categories
Add to the `mockCategories` array:

```javascript
{ 
  id: 9, 
  name: "New Genre", 
  slug: "new-genre", 
  color: "#FF6B6B" 
}
```

### Custom Placeholder Themes
Add to the themes object in `/src/lib/utils/placeholders.js`:

```javascript
newtheme: {
  gradient: ['#color1', '#color2'],
  accent: '#accentColor',
  icon: '🎪'
}
```

## Best Practices

1. **Always use the utility functions** rather than accessing data directly
2. **Generate placeholders consistently** using the provided utilities  
3. **Include alt text** for accessibility
4. **Use semantic HTML** in article content
5. **Implement proper loading states** in components
6. **Handle missing data gracefully** with fallbacks

## Demo Pages

Visit `/demo/articles` to see the complete system in action:
- Article listing with filtering
- Single article views with full content
- Related articles functionality
- Responsive design across devices

This mock system provides everything needed to build and test a complete CMS interface before connecting to a real backend.