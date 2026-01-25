/**
 * Utility functions to generate SVG placeholder images for articles and authors
 */

/**
 * Generate an SVG placeholder image for author avatars
 */
export function generateAuthorAvatar(name, size = 200) {
  // Create initials from name
  const initials = name
    .split(' ')
    .map((word) => word.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2);

  // Generate a consistent color based on name
  const colors = [
    '#FF6B6B',
    '#4ECDC4',
    '#45B7D1',
    '#96CEB4',
    '#FFEAA7',
    '#DDA0DD',
    '#98D8C8',
    '#F7DC6F',
    '#BB8FCE',
    '#85C1E9',
  ];

  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const colorIndex = Math.abs(hash) % colors.length;
  const backgroundColor = colors[colorIndex];

  return `
    <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
      <circle cx="${size / 2}" cy="${size / 2}" r="${size / 2}" fill="${backgroundColor}"/>
      <text
        x="${size / 2}"
        y="${size / 2}"
        text-anchor="middle"
        dominant-baseline="central"
        fill="#1c1b1b"
        opacity="0.8"
        font-family="Anybody, sans-serif"
        font-size="${size / 3}"
        font-weight="bold"
      >
        ${initials}
      </text>
    </svg>
  `;
}

/**
 * Generate an SVG placeholder image for articles
 */
export function generateArticlePlaceholder(title, width = 800, height = 600, theme = 'music') {
  // Theme-based color schemes
  const themes = {
    music: {
      gradient: ['#667eea', '#764ba2'],
      accent: '#f093fb',
      icon: '♪',
    },
    electronic: {
      gradient: ['#4facfe', '#00f2fe'],
      accent: '#43e97b',
      icon: '⚡',
    },
    ambient: {
      gradient: ['#a8edea', '#fed6e3'],
      accent: '#d299c2',
      icon: '◦',
    },
    jazz: {
      gradient: ['#ffecd2', '#fcb69f'],
      accent: '#ff8a80',
      icon: '♫',
    },
    review: {
      gradient: ['#ff9a9e', '#fecfef'],
      accent: '#fda085',
      icon: '★',
    },
  };

  const selectedTheme = themes[theme] || themes.music;

  // Truncate title if too long
  const displayTitle = title.length > 40 ? title.substring(0, 37) + '...' : title;

  return `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${selectedTheme.gradient[0]};stop-opacity:1" />
          <stop offset="100%" style="stop-color:${selectedTheme.gradient[1]};stop-opacity:1" />
        </linearGradient>
        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="2" dy="4" stdDeviation="3" flood-opacity="0.3"/>
        </filter>
      </defs>

      <!-- Background -->
      <rect width="100%" height="100%" fill="url(#bg-gradient)"/>

      <!-- Decorative elements -->
      <circle cx="${width * 0.8}" cy="${height * 0.2}" r="40" fill="${selectedTheme.accent}" opacity="0.3"/>
      <circle cx="${width * 0.15}" cy="${height * 0.85}" r="60" fill="white" opacity="0.2"/>
      <rect x="${width * 0.7}" y="${height * 0.6}" width="80" height="80" fill="white" opacity="0.1" rx="10"/>

      <!-- Main icon -->
      <text
        x="${width / 2}"
        y="${height / 2 - 30}"
        text-anchor="middle"
        fill="white"
        font-family="Poppins, sans-serif"
        font-size="72"
        opacity="0.8"
      >
        ${selectedTheme.icon}
      </text>

      <!-- Title -->
      <rect x="40" y="${height - 100}" width="${width - 80}" height="60" fill="rgba(0,0,0,0.7)" rx="8" filter="url(#shadow)"/>
      <text
        x="${width / 2}"
        y="${height - 65}"
        text-anchor="middle"
        fill="white"
        font-family="Arial, sans-serif"
        font-size="18"
        font-weight="bold"
      >
        ${displayTitle}
      </text>

      <!-- Subtle pattern overlay -->
      <pattern id="pattern" patternUnits="userSpaceOnUse" width="60" height="60" patternTransform="rotate(45)">
        <rect width="60" height="60" fill="transparent"/>
        <rect x="0" y="0" width="30" height="30" fill="rgba(255,255,255,0.02)"/>
        <rect x="30" y="30" width="30" height="30" fill="rgba(255,255,255,0.02)"/>
      </pattern>
      <rect width="100%" height="100%" fill="url(#pattern)"/>
    </svg>
  `;
}

/**
 * Convert SVG string to data URL for use in img src
 */
export function svgToDataUrl(svgString) {
  const encoded = encodeURIComponent(svgString);
  return `data:image/svg+xml,${encoded}`;
}

/**
 * Generate a complete set of responsive article images
 */
export function generateArticleImageSet(title, theme = 'music') {
  const baseSvg = generateArticlePlaceholder(title, 1200, 900, theme);

  return {
    thumb: svgToDataUrl(generateArticlePlaceholder(title, 200, 150, theme)),
    small: svgToDataUrl(generateArticlePlaceholder(title, 400, 300, theme)),
    medium: svgToDataUrl(generateArticlePlaceholder(title, 800, 600, theme)),
    large: svgToDataUrl(baseSvg),
    alt: `Placeholder image for article: ${title}`,
  };
}

/**
 * Generate author avatar as data URL
 */
export function generateAuthorAvatarUrl(name, size = 200) {
  const svg = generateAuthorAvatar(name, size);
  return svgToDataUrl(svg);
}

/**
 * Determine theme based on article category
 */
export function getThemeFromCategory(category) {
  const themeMap = {
    electronic: 'electronic',
    ambient: 'ambient',
    jazz: 'jazz',
    review: 'review',
    experimental: 'ambient',
    'indie-rock': 'music',
    folk: 'music',
    'hip-hop': 'electronic',
  };

  return themeMap[category] || 'music';
}

// Example usage:
// const avatarUrl = generateAuthorAvatarUrl("Elena Rodriguez", 150);
// const articleImages = generateArticleImageSet("The Future of Electronic Music", "electronic");
