# Mock Articles System for Roza

A comprehensive mock data system designed for testing CMS functionality before implementing a real content management backend.

## 🚀 Quick Start

1. **View the Demo**: Visit `http://localhost:3001/demo/articles`
2. **Browse Articles**: Explore the full article listing with filtering
3. **Read Articles**: Click any article to view the complete content
4. **Test Features**: Try category filtering, featured articles, and responsive design

## 📋 What's Included

### Complete Article System
- **6 realistic articles** covering various music topics
- **Rich HTML content** with proper formatting, headings, lists, tables
- **4 author profiles** with bios, avatars, and social media links
- **8 categorized topics** with color-coded organization
- **Media embeds** (Bandcamp and YouTube examples)
- **SEO-optimized metadata** for each article
- **Responsive placeholder images** generated dynamically

### Key Features
- ✅ **Featured articles** system
- ✅ **Category and tag filtering**
- ✅ **Author profiles** with social links
- ✅ **Related articles** algorithm
- ✅ **Search functionality** 
- ✅ **Responsive design** (mobile, tablet, desktop)
- ✅ **SEO metadata** and structured data
- ✅ **Accessibility** features (ARIA labels, keyboard navigation)
- ✅ **Media embeds** (Bandcamp, YouTube)

## 🗂️ File Structure

```
roza/
├── src/lib/
│   ├── components/
│   │   ├── ArticleList.svelte     # Article grid component
│   │   └── ArticleView.svelte     # Single article display
│   ├── data/
│   │   ├── mockArticles.js        # Main mock data
│   │   └── README.md              # Detailed API docs
│   └── utils/
│       └── placeholders.js        # Image generation utilities
├── src/routes/demo/
│   ├── +page.svelte               # Demo home page
│   └── articles/
│       ├── +page.svelte           # Articles listing
│       └── [slug]/
│           ├── +page.js           # Article loader
│           └── +page.svelte       # Single article page
└── static/images/
    ├── authors/                   # Author avatar SVGs
    └── articles/                  # Article placeholder structure
```

## 💻 Usage Examples

### Import and Use Articles
```javascript
import { getArticles, getArticle } from '$lib/data/mockArticles.js';

// Get all articles
const articles = getArticles();

// Get featured articles
const featured = getArticles({ featured: true, limit: 5 });

// Get articles by category
const electronic = getArticles({ category: 'electronic' });

// Get single article
const article = getArticle('article-slug');
```

### Generate Placeholder Images
```javascript
import { generateAuthorAvatarUrl, generateArticleImageSet } from '$lib/utils/placeholders.js';

// Generate author avatar
const avatar = generateAuthorAvatarUrl('Author Name', 150);

// Generate article images
const images = generateArticleImageSet('Article Title', 'electronic');
```

### Use in Svelte Components
```svelte
<script>
  import { getArticles } from '$lib/data/mockArticles.js';
  const articles = getArticles({ featured: true });
</script>

{#each articles as article}
  <article>
    <h2>{article.title}</h2>
    <p>{article.excerpt}</p>
    <time>{new Date(article.publishedDate).toLocaleDateString()}</time>
  </article>
{/each}
```

## 📊 Available Data

### Sample Articles
1. **Modular Synthesis** - Electronic music technology deep-dive
2. **Field Recordings** - Experimental sound capture techniques
3. **Album Review** - Professional music criticism format
4. **DIY Revolution** - Bedroom producer culture analysis
5. **Jazz Fusion** - Genre evolution and modern techniques
6. **Ambient Healing** - Music therapy and neuroscience

### Categories (8 total)
- Electronic (#3B82F6)
- Ambient (#8B5CF6) 
- Indie Rock (#EF4444)
- Experimental (#10B981)
- Jazz (#F59E0B)
- Folk (#84CC16)
- Hip Hop (#6366F1)
- Review (#EC4899)

### Authors (4 total)
- **Elena Rodriguez** - Music journalist, electronic enthusiast
- **Marcus Chen** - Sound engineer, ambient specialist
- **Zara Al-Mahmoud** - Cultural critic, DJ
- **Alex Thompson** - Indie rock writer

## 🎨 Visual Features

### Automatic Placeholder Generation
- **Author avatars** with initials and consistent colors
- **Article thumbnails** with themed designs based on category
- **Responsive image sets** (thumb, small, medium, large)
- **SVG-based** for crisp display at any size

### Theme Support
- `music` - General music theme with musical notes
- `electronic` - Electronic/digital aesthetic
- `ambient` - Soft, atmospheric design
- `jazz` - Warm, classic styling
- `review` - Review/rating focused design

## 🔍 API Reference

### Core Functions
- `getArticles(options)` - Retrieve filtered articles
- `getArticle(identifier)` - Get single article by ID or slug
- `getRelatedArticles(article, limit)` - Find related content
- `searchArticles(query, limit)` - Search across content
- `getCategories()` - Get all categories
- `getTags()` - Get all available tags
- `getAuthors()` - Get all author profiles
- `getArticleStats()` - Get collection statistics

### Utility Functions
- `generateAuthorAvatarUrl(name, size)` - Create author avatar
- `generateArticleImageSet(title, theme)` - Create image set
- `getThemeFromCategory(slug)` - Map category to theme

## 🛠️ Development Benefits

### Perfect for Testing
- **Frontend development** without waiting for backend
- **Client presentations** with realistic content
- **UI/UX testing** across different content types
- **Responsive design** verification
- **Performance testing** with various content lengths

### Production-Ready Features
- **SEO optimization** with proper meta tags
- **Accessibility compliance** (ARIA labels, semantic HTML)
- **Schema.org structured data** for rich snippets
- **Social media integration** (Open Graph, Twitter Cards)
- **Performance optimized** with lazy loading

## 📱 Responsive Design

The system is fully responsive and tested across:
- **Desktop** (1200px+) - Multi-column grid layout
- **Tablet** (768px-1199px) - Adaptive grid
- **Mobile** (320px-767px) - Single column, touch-optimized

## ♿ Accessibility Features

- **Semantic HTML** structure
- **ARIA labels** for interactive elements
- **Keyboard navigation** support
- **Screen reader** friendly
- **Color contrast** compliance
- **Alt text** for all images

## 🔧 Customization

### Adding New Articles
Add to `mockArticles` array in `/src/lib/data/mockArticles.js`:
```javascript
{
  id: 7,
  title: "Your Article Title",
  slug: "your-article-slug",
  // ... complete article structure
}
```

### Adding Categories
Extend `mockCategories` array:
```javascript
{ id: 9, name: "New Genre", slug: "new-genre", color: "#FF6B6B" }
```

### Custom Themes
Add to placeholder generator themes:
```javascript
newtheme: {
  gradient: ['#color1', '#color2'],
  accent: '#accent',
  icon: '🎪'
}
```

## 📈 Statistics

Current mock data includes:
- **6 articles** with full content
- **4 authors** with complete profiles
- **8 categories** with color schemes
- **20+ tags** for content classification
- **6 minutes** average read time
- **100% articles** with media embeds

## 🌐 Demo URLs

- **Main Demo**: `/demo` - Overview of all demo systems
- **Articles List**: `/demo/articles` - Browse all articles with filtering
- **Single Article**: `/demo/articles/[slug]` - Full article view
- **Example Article**: `/demo/articles/resurgence-modular-synthesis-contemporary-electronic`

## 💡 Best Practices

1. **Always use utility functions** rather than accessing data directly
2. **Generate placeholders consistently** using provided utilities
3. **Include alt text** for accessibility
4. **Handle loading states** in components
5. **Implement proper error boundaries**
6. **Test across different screen sizes**

## 🚀 Ready to Use

The mock articles system is production-ready for testing your CMS interface. It provides everything needed to build and test a complete content management system before connecting to a real backend.

**Start exploring**: Visit `http://localhost:3001/demo/articles` to see it in action!