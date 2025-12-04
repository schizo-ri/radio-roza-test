# Citaj Radio - Filtering Implementation

## Overview

The `citaj-radio` section has been implemented with a flexible filtering system that allows users to browse articles by category, tag, author, or featured status using URL query parameters.

## URL Structure

### Main Pages
- `/citaj-radio/` - Main page showing all articles with category overview
- `/citaj-radio/[slug]/` - Individual article pages

### Filtering URLs
- `/citaj-radio/?kategorija=aktualno` - Filter by category
- `/citaj-radio/?tag=synth-pop` - Filter by tag  
- `/citaj-radio/?autor=elena-rodriguez` - Filter by author (using slug)
- `/citaj-radio/?featured=true` - Show only featured articles
- `/citaj-radio/?kategorija=komentar&featured=true` - Combine filters

## File Structure

```
citaj-radio/
├── +page.js                    # Load function with query parameter handling
├── +page.svelte                # Main page with filtering UI
└── [slug]/
    ├── +page.js               # Individual article loader
    └── +page.svelte           # Article display page
```

## Implementation Details

### Data Loading (`+page.js`)
The load function processes query parameters and filters articles accordingly:
- `kategorija` - filters by category slug or name
- `tag` - filters by exact tag match
- `autor` - filters by author slug, name, or ID
- `featured` - boolean filter for featured articles
- `limit` - limits number of results (default: 8)

### UI Components

#### Filter Controls
- **Active Filters Display**: Shows currently applied filters with remove buttons
- **Category Buttons**: Quick category selection (hidden when filters active)
- **Featured Toggle**: Checkbox to show only featured articles
- **Clear All Filters**: Reset to default view

#### Interactive Elements
All tags and author names throughout the application are clickable and will:
- Navigate to filtered view
- Maintain current page context
- Use proper URL encoding for special characters

### Data Structure Extensions

#### Authors
Each author now includes a `slug` field for clean URLs:
```javascript
{
  id: 1,
  name: 'Elena Rodriguez',
  slug: 'elena-rodriguez',  // Added for URL structure
  bio: '...',
  // ... other fields
}
```

#### Categories
Categories use existing `slug` field for URL parameters:
```javascript
{
  id: 1,
  slug: 'aktualno',
  title: 'Aktualno',
  description: 'Novo na Radio Roži'
}
```

## Navigation Behavior

### From Article Cards
- **Author Name**: Click → filter by author
- **Tags**: Click → filter by tag
- **Article Title**: Click → view full article

### From Article Pages  
- **Breadcrumb Category**: Click → filter by category
- **Author Name**: Click → filter by author
- **Tags**: Click → filter by tag

### Filter Management
- **Remove Individual Filter**: Click ✕ next to filter tag
- **Clear All Filters**: Click "Obriši sve" button
- **Combine Filters**: Use multiple query parameters

## Technical Features

### SEO Friendly
- Clean URLs with semantic parameter names
- No JavaScript required for navigation
- Server-side filtering in load function

### Performance
- Filtered on server-side in `+page.js`
- No client-side JavaScript filtering
- Fast navigation using SvelteKit routing

### Accessibility
- Proper ARIA labels on interactive elements
- Semantic HTML structure
- Keyboard navigation support

## Usage Examples

### Filtering Articles
```javascript
// Get articles for specific category
/citaj-radio/?kategorija=album-tjedna

// Get articles by specific author
/citaj-radio/?autor=elena-rodriguez

// Get featured articles in a category
/citaj-radio/?kategorija=aktualno&featured=true

// Get articles with specific tag
/citaj-radio/?tag=modular-synth
```

### Programmatic Usage
```javascript
// In load function
export function load({ url }) {
  const kategorija = url.searchParams.get('kategorija');
  const tag = url.searchParams.get('tag');
  const autor = url.searchParams.get('autor');
  const featured = url.searchParams.get('featured') === 'true';
  
  const articles = getArticles({
    category: kategorija,
    tag: tag,
    author: autor,
    featured,
    limit: 8
  });
  
  return { articles, filters: { kategorija, tag, autor, featured } };
}
```

## Future Enhancements

### Potential Improvements
1. **Pagination**: Add `page` and `per_page` parameters
2. **Search**: Add `q` parameter for full-text search
3. **Sorting**: Add `sort` parameter (date, title, popularity)
4. **Date Range**: Add `from` and `to` date parameters
5. **Multiple Tags**: Support comma-separated tag values

### URL Examples for Future Features
```
/citaj-radio/?q=synthesizer&sort=date&page=2
/citaj-radio/?from=2024-01-01&to=2024-12-31
/citaj-radio/?tag=synth-pop,electronic,ambient
```

## Debugging

### Common Issues
1. **Filters Not Working**: Check that `+page.js` is properly exporting load function
2. **Wrong Articles Showing**: Verify filter logic in `mockArticles.js`
3. **Links Not Working**: Ensure proper URL encoding for special characters

### Testing Filters
```bash
# Test category filter
curl "http://localhost:5174/citaj-radio/?kategorija=aktualno"

# Test author filter  
curl "http://localhost:5174/citaj-radio/?autor=elena-rodriguez"

# Test featured filter
curl "http://localhost:5174/citaj-radio/?featured=true"

# Test combined filters
curl "http://localhost:5174/citaj-radio/?kategorija=komentar&featured=true"
```
