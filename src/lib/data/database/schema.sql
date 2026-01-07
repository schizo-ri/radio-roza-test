-- Radio Roža PostgreSQL Database Schema
-- Version: 2.0
-- Description: Complete database schema for Radio Roža community radio website
-- Includes all features from migrations consolidated into main schema

-- =============================================
-- EXTENSIONS
-- =============================================
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm"; -- For better text search
CREATE EXTENSION IF NOT EXISTS "unaccent"; -- For accent-insensitive search

-- =============================================
-- CUSTOM TYPES
-- =============================================
CREATE TYPE user_role AS ENUM ('admin', 'editor', 'author', 'contributor', 'guest');
CREATE TYPE content_status AS ENUM ('draft', 'published', 'archived', 'scheduled');
CREATE TYPE show_type AS ENUM ('tematski_blok', 'govorna_emisija');
CREATE TYPE weekday AS ENUM ('monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday');
CREATE TYPE production_type AS ENUM ('live', 'pre-recorded');
CREATE TYPE embed_type AS ENUM ('youtube', 'mixcloud', 'bandcamp', 'spotify', 'soundcloud', 'vimeo');

-- =============================================
-- TABLES
-- =============================================

-- Users table (CMS users)
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(100) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    role user_role NOT NULL DEFAULT 'contributor',
    is_active BOOLEAN DEFAULT true,
    avatar TEXT,
    phone VARCHAR(50),
    bio TEXT,
    preferences JSONB DEFAULT '{}',
    notification_preferences JSONB DEFAULT '{
        "email": {
            "new_episode": true,
            "new_article": true,
            "comment_reply": true,
            "newsletter": true
        },
        "push": {
            "new_episode": false,
            "new_article": false,
            "comment_reply": true
        }
    }',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    last_login TIMESTAMPTZ,
    email_verified BOOLEAN DEFAULT false,
    email_verification_token TEXT,
    password_reset_token TEXT,
    password_reset_expires TIMESTAMPTZ
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_active ON users(is_active);

-- Authors table (content creators - can be linked to users or be guests)
CREATE TABLE authors (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    nickname VARCHAR(100),
    slug VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(50),
    bio TEXT,
    avatar TEXT,
    is_active BOOLEAN DEFAULT true,
    joined_date TIMESTAMPTZ DEFAULT NOW(),
    social_links JSONB DEFAULT '{}',
    expertise TEXT[] DEFAULT '{}',
    stats JSONB DEFAULT '{"articlesCount": 0, "showsCount": 0, "episodesCount": 0}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_authors_user_id ON authors(user_id);
CREATE INDEX idx_authors_slug ON authors(slug);
CREATE INDEX idx_authors_active ON authors(is_active);
CREATE INDEX idx_authors_name ON authors(first_name, last_name);

-- Categories table
CREATE TABLE categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    parent_id UUID REFERENCES categories(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    color VARCHAR(7), -- Hex color
    icon VARCHAR(50),
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    article_count INTEGER DEFAULT 0,
    featured_image TEXT,
    seo_meta JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_categories_parent ON categories(parent_id);
CREATE INDEX idx_categories_slug ON categories(slug);
CREATE INDEX idx_categories_active ON categories(is_active);
CREATE INDEX idx_categories_order ON categories(display_order);

-- Tags table
CREATE TABLE tags (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) UNIQUE NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    usage_count INTEGER DEFAULT 0,
    color VARCHAR(7),
    category VARCHAR(50), -- tag category (music_genre, location, event, etc.)
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_tags_slug ON tags(slug);
CREATE INDEX idx_tags_name ON tags(name);
CREATE INDEX idx_tags_category ON tags(category);
CREATE INDEX idx_tags_usage ON tags(usage_count DESC);

-- Shows table (radio shows)
CREATE TABLE shows (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    type show_type NOT NULL,
    description TEXT,
    long_description TEXT,
    is_external BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    start_date TIMESTAMPTZ,
    end_date TIMESTAMPTZ,
    cover_images JSONB DEFAULT '{}',
    schedule JSONB DEFAULT '{}',
    social_links JSONB DEFAULT '{}',
    stats JSONB DEFAULT '{"totalEpisodes": 0, "averageListeners": 0, "rating": 0}',
    metadata JSONB DEFAULT '{}',
    search_vector tsvector,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_shows_slug ON shows(slug);
CREATE INDEX idx_shows_type ON shows(type);
CREATE INDEX idx_shows_active ON shows(is_active);
CREATE INDEX idx_shows_external ON shows(is_external);
CREATE INDEX idx_shows_search_vector ON shows USING gin(search_vector);

-- Podcasts table (separate from shows for RSS feeds)
CREATE TABLE podcasts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    show_id UUID REFERENCES shows(id) ON DELETE CASCADE,
    feed_url TEXT,
    itunes_url TEXT,
    spotify_url TEXT,
    google_url TEXT,
    rss_feed TEXT,
    itunes_category TEXT,
    itunes_subcategory TEXT,
    explicit_content BOOLEAN DEFAULT false,
    copyright_text TEXT,
    owner_name TEXT,
    owner_email VARCHAR(255),
    last_build_date TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_podcasts_show ON podcasts(show_id);

-- Show hosts (many-to-many relationship)
CREATE TABLE show_hosts (
    show_id UUID REFERENCES shows(id) ON DELETE CASCADE,
    author_id UUID REFERENCES authors(id) ON DELETE CASCADE,
    is_primary BOOLEAN DEFAULT false,
    role TEXT,
    joined_date TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY (show_id, author_id)
);

CREATE INDEX idx_show_hosts_show ON show_hosts(show_id);
CREATE INDEX idx_show_hosts_author ON show_hosts(author_id);

-- Show categories (many-to-many)
CREATE TABLE show_categories (
    show_id UUID REFERENCES shows(id) ON DELETE CASCADE,
    category_id UUID REFERENCES categories(id) ON DELETE CASCADE,
    PRIMARY KEY (show_id, category_id)
);

-- Show tags (many-to-many)
CREATE TABLE show_tags (
    show_id UUID REFERENCES shows(id) ON DELETE CASCADE,
    tag_id UUID REFERENCES tags(id) ON DELETE CASCADE,
    PRIMARY KEY (show_id, tag_id)
);

-- Episodes table
CREATE TABLE episodes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    show_id UUID REFERENCES shows(id) ON DELETE CASCADE,
    episode_number INTEGER,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    long_description TEXT,
    cover_image TEXT,
    air_date TIMESTAMPTZ,
    duration INTEGER, -- in minutes
    status content_status DEFAULT 'draft',
    is_live BOOLEAN DEFAULT false,
    recording_date TIMESTAMPTZ,
    links JSONB DEFAULT '{}',
    segments JSONB DEFAULT '[]',
    playlist JSONB DEFAULT '[]',
    stats JSONB DEFAULT '{"plays": 0, "likes": 0, "comments": 0, "shares": 0}',
    metadata JSONB DEFAULT '{}',
    last_played_at TIMESTAMPTZ,
    podcast_guid VARCHAR(255) UNIQUE,
    enclosure_url TEXT,
    enclosure_size BIGINT,
    enclosure_type TEXT,
    search_vector tsvector,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_episodes_show ON episodes(show_id);
CREATE INDEX idx_episodes_slug ON episodes(slug);
CREATE INDEX idx_episodes_status ON episodes(status);
CREATE INDEX idx_episodes_air_date ON episodes(air_date DESC);
CREATE INDEX idx_episodes_live ON episodes(is_live);
CREATE INDEX idx_episodes_search_vector ON episodes USING gin(search_vector);

-- Episode authors (many-to-many)
CREATE TABLE episode_authors (
    episode_id UUID REFERENCES episodes(id) ON DELETE CASCADE,
    author_id UUID REFERENCES authors(id) ON DELETE CASCADE,
    is_primary BOOLEAN DEFAULT false,
    role TEXT,
    PRIMARY KEY (episode_id, author_id)
);

CREATE INDEX idx_episode_authors_episode ON episode_authors(episode_id);
CREATE INDEX idx_episode_authors_author ON episode_authors(author_id);

-- Episode guests
CREATE TABLE episode_guests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    episode_id UUID REFERENCES episodes(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    role TEXT,
    bio TEXT,
    website TEXT,
    social_links JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_episode_guests_episode ON episode_guests(episode_id);

-- Episode tags (many-to-many)
CREATE TABLE episode_tags (
    episode_id UUID REFERENCES episodes(id) ON DELETE CASCADE,

    tag_id UUID REFERENCES tags(id) ON DELETE CASCADE,
    PRIMARY KEY (episode_id, tag_id)
);

-- Articles table
CREATE TABLE articles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    author_id UUID REFERENCES authors(id) ON DELETE SET NULL,
    category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
    title TEXT NOT NULL,
    slug VARCHAR(500) UNIQUE NOT NULL,
    excerpt TEXT,
    content TEXT NOT NULL,
    featured_image JSONB DEFAULT '{}',
    gallery JSONB DEFAULT '[]',
    status content_status DEFAULT 'draft',
    published_date TIMESTAMPTZ,
    scheduled_date TIMESTAMPTZ,
    is_featured BOOLEAN DEFAULT false,
    is_sticky BOOLEAN DEFAULT false,
    read_time INTEGER, -- in minutes
    view_count INTEGER DEFAULT 0,
    embeds JSONB DEFAULT '[]',
    seo_meta JSONB DEFAULT '{}',
    comments_enabled BOOLEAN DEFAULT true,
    comment_count INTEGER DEFAULT 0,
    current_version INTEGER DEFAULT 1,
    search_vector tsvector,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_articles_author ON articles(author_id);
CREATE INDEX idx_articles_category ON articles(category_id);
CREATE INDEX idx_articles_slug ON articles(slug);
CREATE INDEX idx_articles_status ON articles(status);
CREATE INDEX idx_articles_published ON articles(published_date DESC);
CREATE INDEX idx_articles_featured ON articles(is_featured);
CREATE INDEX idx_articles_sticky ON articles(is_sticky);
CREATE INDEX idx_articles_views ON articles(view_count DESC);
CREATE INDEX idx_articles_search_vector ON articles USING gin(search_vector);

-- Article versions table
CREATE TABLE article_versions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    article_id UUID REFERENCES articles(id) ON DELETE CASCADE,
    version_number INTEGER NOT NULL,
    title TEXT,
    content TEXT,
    excerpt TEXT,
    change_summary TEXT,
    edited_by UUID REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(article_id, version_number)
);

CREATE INDEX idx_article_versions_article ON article_versions(article_id);
CREATE INDEX idx_article_versions_created ON article_versions(created_at DESC);

-- Article tags (many-to-many)
CREATE TABLE article_tags (
    article_id UUID REFERENCES articles(id) ON DELETE CASCADE,
    tag_id UUID REFERENCES tags(id) ON DELETE CASCADE,
    PRIMARY KEY (article_id, tag_id)
);

CREATE INDEX idx_article_tags_article ON article_tags(article_id);
CREATE INDEX idx_article_tags_tag ON article_tags(tag_id);

-- Related articles (self-referencing many-to-many)
CREATE TABLE related_articles (
    article_id UUID REFERENCES articles(id) ON DELETE CASCADE,
    related_article_id UUID REFERENCES articles(id) ON DELETE CASCADE,
    relevance_score DECIMAL(3,2) DEFAULT 1.0,
    PRIMARY KEY (article_id, related_article_id),
    CHECK (article_id != related_article_id)
);

-- Article-Show relationships
CREATE TABLE article_shows (
    article_id UUID REFERENCES articles(id) ON DELETE CASCADE,
    show_id UUID REFERENCES shows(id) ON DELETE CASCADE,
    PRIMARY KEY (article_id, show_id)
);

-- Article-Episode relationships
CREATE TABLE article_episodes (
    article_id UUID REFERENCES articles(id) ON DELETE CASCADE,
    episode_id UUID REFERENCES episodes(id) ON DELETE CASCADE,
    PRIMARY KEY (article_id, episode_id)
);

-- Comments table
CREATE TABLE comments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    article_id UUID REFERENCES articles(id) ON DELETE CASCADE,
    episode_id UUID REFERENCES episodes(id) ON DELETE CASCADE,
    parent_id UUID REFERENCES comments(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    author_name TEXT,
    author_email VARCHAR(255),
    author_website TEXT,
    content TEXT NOT NULL,
    is_approved BOOLEAN DEFAULT false,
    is_featured BOOLEAN DEFAULT false,
    likes INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    ip_address INET,
    user_agent TEXT,
    CHECK (article_id IS NOT NULL OR episode_id IS NOT NULL)
);

CREATE INDEX idx_comments_article ON comments(article_id);
CREATE INDEX idx_comments_episode ON comments(episode_id);
CREATE INDEX idx_comments_parent ON comments(parent_id);
CREATE INDEX idx_comments_user ON comments(user_id);
CREATE INDEX idx_comments_approved ON comments(is_approved);
CREATE INDEX idx_comments_featured ON comments(is_featured);

-- Playlists table
CREATE TABLE playlists (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    is_public BOOLEAN DEFAULT true,
    cover_image TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);


CREATE INDEX idx_playlists_user ON playlists(user_id);
CREATE INDEX idx_playlists_public ON playlists(is_public);

-- Playlist items
CREATE TABLE playlist_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    playlist_id UUID REFERENCES playlists(id) ON DELETE CASCADE,
    episode_id UUID REFERENCES episodes(id) ON DELETE CASCADE,
    position INTEGER NOT NULL,
    added_at TIMESTAMPTZ DEFAULT NOW(),
    notes TEXT,
    UNIQUE(playlist_id, episode_id)
);

CREATE INDEX idx_playlist_items_playlist ON playlist_items(playlist_id);
CREATE INDEX idx_playlist_items_episode ON playlist_items(episode_id);
CREATE INDEX idx_playlist_items_position ON playlist_items(playlist_id, position);

-- Favorites table
CREATE TABLE favorites (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    entity_type VARCHAR(50) NOT NULL, -- article, episode, show, author
    entity_id UUID NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, entity_type, entity_id)
);

CREATE INDEX idx_favorites_user ON favorites(user_id);
CREATE INDEX idx_favorites_entity ON favorites(entity_type, entity_id);
CREATE INDEX idx_favorites_created ON favorites(created_at DESC);

-- Listening history table
CREATE TABLE listening_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    episode_id UUID REFERENCES episodes(id) ON DELETE CASCADE,
    played_at TIMESTAMPTZ DEFAULT NOW(),
    progress_seconds INTEGER DEFAULT 0,
    completed BOOLEAN DEFAULT false,
    device_info JSONB DEFAULT '{}',
    session_id TEXT
);

CREATE INDEX idx_history_user ON listening_history(user_id);
CREATE INDEX idx_history_episode ON listening_history(episode_id);
CREATE INDEX idx_history_played ON listening_history(played_at DESC);
CREATE INDEX idx_history_session ON listening_history(session_id);

-- Notifications table
CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    type VARCHAR(50) NOT NULL, -- new_episode, new_article, comment_reply, etc.
    title TEXT NOT NULL,
    message TEXT,
    entity_type VARCHAR(50),
    entity_id UUID,
    is_read BOOLEAN DEFAULT false,
    read_at TIMESTAMPTZ,
    data JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_notifications_user ON notifications(user_id);
CREATE INDEX idx_notifications_unread ON notifications(user_id, is_read) WHERE is_read = false;
CREATE INDEX idx_notifications_created ON notifications(created_at DESC);

-- Search configuration table
CREATE TABLE search_config (
    id SERIAL PRIMARY KEY,
    entity_type VARCHAR(50) NOT NULL,
    field_name VARCHAR(50) NOT NULL,
    weight CHAR(1) NOT NULL CHECK (weight IN ('A', 'B', 'C', 'D')),
    UNIQUE(entity_type, field_name)
);

-- Media/attachments table
CREATE TABLE media (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    filename TEXT NOT NULL,
    original_name TEXT,
    mime_type VARCHAR(100),
    size_bytes BIGINT,
    width INTEGER,
    height INTEGER,
    duration INTEGER, -- for audio/video in seconds
    storage_path TEXT NOT NULL,
    public_url TEXT,
    thumbnails JSONB DEFAULT '{}',
    metadata JSONB DEFAULT '{}',
    uploaded_by UUID REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_media_uploaded_by ON media(uploaded_by);
CREATE INDEX idx_media_mime ON media(mime_type);
CREATE INDEX idx_media_created ON media(created_at DESC);

-- Analytics events table
CREATE TABLE analytics_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_type VARCHAR(50) NOT NULL, -- page_view, play, download, share, etc.
    entity_type VARCHAR(50), -- article, episode, show
    entity_id UUID,
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    session_id TEXT,
    ip_address INET,
    user_agent TEXT,
    referrer TEXT,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_analytics_type ON analytics_events(event_type);
CREATE INDEX idx_analytics_entity ON analytics_events(entity_type, entity_id);
CREATE INDEX idx_analytics_user ON analytics_events(user_id);
CREATE INDEX idx_analytics_session ON analytics_events(session_id);
CREATE INDEX idx_analytics_created ON analytics_events(created_at DESC);

-- Newsletter subscribers
CREATE TABLE newsletter_subscribers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    name TEXT,
    is_subscribed BOOLEAN DEFAULT true,
    preferences JSONB DEFAULT '{}',
    verification_token TEXT,
    verified_at TIMESTAMPTZ,
    unsubscribed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_newsletter_email ON newsletter_subscribers(email);
CREATE INDEX idx_newsletter_subscribed ON newsletter_subscribers(is_subscribed);

-- =============================================
-- FUNCTIONS & TRIGGERS
-- =============================================

-- Update timestamp trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Update search vector trigger
CREATE OR REPLACE FUNCTION update_search_vector()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_TABLE_NAME = 'articles' THEN
        NEW.search_vector :=
            setweight(to_tsvector('simple', COALESCE(NEW.title, '')), 'A') ||
            setweight(to_tsvector('simple', COALESCE(NEW.excerpt, '')), 'B') ||
            setweight(to_tsvector('simple', COALESCE(NEW.content, '')), 'C');
    ELSIF TG_TABLE_NAME = 'episodes' THEN
        NEW.search_vector :=
            setweight(to_tsvector('simple', COALESCE(NEW.title, '')), 'A') ||
            setweight(to_tsvector('simple', COALESCE(NEW.description, '')), 'B');
    ELSIF TG_TABLE_NAME = 'shows' THEN
        NEW.search_vector :=
            setweight(to_tsvector('simple', COALESCE(NEW.title, '')), 'A') ||
            setweight(to_tsvector('simple', COALESCE(NEW.description, '')), 'B');
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add update triggers to all relevant tables
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_authors_updated_at BEFORE UPDATE ON authors
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON categories
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_tags_updated_at BEFORE UPDATE ON tags
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_shows_updated_at BEFORE UPDATE ON shows
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_episodes_updated_at BEFORE UPDATE ON episodes
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_articles_updated_at BEFORE UPDATE ON articles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_comments_updated_at BEFORE UPDATE ON comments
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_playlists_updated_at BEFORE UPDATE ON playlists
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_podcasts_updated_at BEFORE UPDATE ON podcasts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Search vector triggers
CREATE TRIGGER update_articles_search_vector
    BEFORE INSERT OR UPDATE ON articles
    FOR EACH ROW EXECUTE FUNCTION update_search_vector();

CREATE TRIGGER update_episodes_search_vector
    BEFORE INSERT OR UPDATE ON episodes
    FOR EACH ROW EXECUTE FUNCTION update_search_vector();

CREATE TRIGGER update_shows_search_vector
    BEFORE INSERT OR UPDATE ON shows
    FOR EACH ROW EXECUTE FUNCTION update_search_vector();

-- Function to increment view count
CREATE OR REPLACE FUNCTION increment_view_count(
    p_article_id UUID
) RETURNS VOID AS $$
BEGIN
    UPDATE articles
    SET view_count = view_count + 1
    WHERE id = p_article_id;
END;
$$ LANGUAGE plpgsql;

-- Function to update tag usage count
CREATE OR REPLACE FUNCTION update_tag_usage_count()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE tags SET usage_count = usage_count + 1 WHERE id = NEW.tag_id;
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE tags SET usage_count = usage_count - 1 WHERE id = OLD.tag_id;
    END IF;
    RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_article_tag_count
    AFTER INSERT OR DELETE ON article_tags
    FOR EACH ROW EXECUTE FUNCTION update_tag_usage_count();

CREATE TRIGGER update_episode_tag_count
    AFTER INSERT OR DELETE ON episode_tags
    FOR EACH ROW EXECUTE FUNCTION update_tag_usage_count();

CREATE TRIGGER update_show_tag_count
    AFTER INSERT OR DELETE ON show_tags
    FOR EACH ROW EXECUTE FUNCTION update_tag_usage_count();

-- Function to update category article count
CREATE OR REPLACE FUNCTION update_category_article_count()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' OR TG_OP = 'UPDATE' THEN
        -- Decrement old category if UPDATE
        IF TG_OP = 'UPDATE' AND OLD.category_id IS NOT NULL AND OLD.category_id != NEW.category_id THEN
            UPDATE categories
            SET article_count = article_count - 1
            WHERE id = OLD.category_id;
        END IF;

        -- Increment new category
        IF NEW.category_id IS NOT NULL AND NEW.status = 'published' THEN
            UPDATE categories
            SET article_count = article_count + 1
            WHERE id = NEW.category_id;
        END IF;
    ELSIF TG_OP = 'DELETE' THEN
        IF OLD.category_id IS NOT NULL AND OLD.status = 'published' THEN
            UPDATE categories
            SET article_count = article_count - 1
            WHERE id = OLD.category_id;
        END IF;
    END IF;
    RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_category_count
    AFTER INSERT OR UPDATE OR DELETE ON articles
    FOR EACH ROW EXECUTE FUNCTION update_category_article_count();

-- Function for full-text search
CREATE OR REPLACE FUNCTION search_content(
    search_query TEXT,
    content_type TEXT DEFAULT 'all',
    limit_results INTEGER DEFAULT 20
) RETURNS TABLE (
    id UUID,
    type TEXT,
    title TEXT,
    excerpt TEXT,
    slug TEXT,
    published_date TIMESTAMPTZ,
    relevance REAL
) AS $$
BEGIN
    RETURN QUERY
    SELECT * FROM (
        -- Search articles
        SELECT
            a.id,
            'article'::TEXT as type,
            a.title,
            a.excerpt,
            a.slug,
            a.published_date,
            ts_rank(a.search_vector, plainto_tsquery('simple', search_query)) as relevance
        FROM articles a
        WHERE a.status = 'published'
            AND (content_type = 'all' OR content_type = 'article')
            AND a.search_vector @@ plainto_tsquery('simple', search_query)

        UNION ALL

        -- Search episodes
        SELECT
            e.id,
            'episode'::TEXT as type,
            e.title,
            e.description as excerpt,
            e.slug,
            e.air_date as published_date,
            ts_rank(e.search_vector, plainto_tsquery('simple', search_query)) as relevance
        FROM episodes e
        WHERE e.status = 'published'
            AND (content_type = 'all' OR content_type = 'episode')
            AND e.search_vector @@ plainto_tsquery('simple', search_query)

        UNION ALL

        -- Search shows
        SELECT
            s.id,
            'show'::TEXT as type,
            s.title,
            s.description as excerpt,
            s.slug,
            s.start_date as published_date,
            ts_rank(s.search_vector, plainto_tsquery('simple', search_query)) as relevance
        FROM shows s
        WHERE s.is_active = true
            AND (content_type = 'all' OR content_type = 'show')
            AND s.search_vector @@ plainto_tsquery('simple', search_query)
    ) results
    ORDER BY relevance DESC
    LIMIT limit_results;
END;
$$ LANGUAGE plpgsql;

-- =============================================
-- VIEWS
-- =============================================

-- View for article with author and category
CREATE OR REPLACE VIEW v_articles_full AS
SELECT
    a.*,
    auth.first_name || ' ' || auth.last_name as author_name,
    auth.slug as author_slug,
    auth.avatar as author_avatar,
    c.title as category_title,
    c.slug as category_slug,
    c.color as category_color,
    array_agg(DISTINCT t.name) FILTER (WHERE t.name IS NOT NULL) as tag_names,
    array_agg(DISTINCT t.slug) FILTER (WHERE t.slug IS NOT NULL) as tag_slugs
FROM articles a
LEFT JOIN authors auth ON a.author_id = auth.id
LEFT JOIN categories c ON a.category_id = c.id
LEFT JOIN article_tags at ON a.id = at.article_id
LEFT JOIN tags t ON at.tag_id = t.id
GROUP BY a.id, auth.id, c.id;

-- View for episodes with show info
CREATE OR REPLACE VIEW v_episodes_full AS
SELECT
    e.*,
    s.title as show_title,
    s.slug as show_slug,
    s.type as show_type,
    array_agg(DISTINCT auth.first_name || ' ' || auth.last_name) FILTER (WHERE auth.id IS NOT NULL) as author_names,
    array_agg(DISTINCT t.name) FILTER (WHERE t.name IS NOT NULL) as tag_names
FROM episodes e
LEFT JOIN shows s ON e.show_id = s.id
LEFT JOIN episode_authors ea ON e.id = ea.episode_id
LEFT JOIN authors auth ON ea.author_id = auth.id
LEFT JOIN episode_tags et ON e.id = et.episode_id
LEFT JOIN tags t ON et.tag_id = t.id
GROUP BY e.id, s.id;

-- View for shows with hosts
CREATE OR REPLACE VIEW v_shows_with_hosts AS
SELECT
    s.*,
    array_agg(DISTINCT auth.first_name || ' ' || auth.last_name) FILTER (WHERE auth.id IS NOT NULL) as host_names,
    array_agg(DISTINCT auth.slug) FILTER (WHERE auth.slug IS NOT NULL) as host_slugs,
    count(DISTINCT e.id) as total_episodes
FROM shows s
LEFT JOIN show_hosts sh ON s.id = sh.show_id
LEFT JOIN authors auth ON sh.author_id = auth.id
LEFT JOIN episodes e ON s.id = e.show_id AND e.status = 'published'
GROUP BY s.id;

-- =============================================
-- INDEXES FOR PERFORMANCE
-- =============================================

-- Composite indexes for common queries
CREATE INDEX idx_articles_status_published ON articles(status, published_date DESC)
    WHERE status = 'published';

CREATE INDEX idx_episodes_show_status ON episodes(show_id, status, air_date DESC);

CREATE INDEX idx_articles_featured_published ON articles(is_featured, published_date DESC)
    WHERE is_featured = true AND status = 'published';

-- =============================================
-- ROW LEVEL SECURITY (Optional)
-- =============================================

-- Enable RLS on sensitive tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

-- Example policies (customize as needed)
CREATE POLICY users_view_own ON users
    FOR SELECT
    USING (id = current_setting('app.current_user_id')::UUID OR
           EXISTS (SELECT 1 FROM users WHERE id = current_setting('app.current_user_id')::UUID AND role = 'admin'));

CREATE POLICY comments_view_approved ON comments
    FOR SELECT
    USING (is_approved = true OR user_id = current_setting('app.current_user_id')::UUID);

-- =============================================
-- INITIAL DATA / SEEDS (Optional)
-- =============================================

-- Insert default search configuration
INSERT INTO search_config (entity_type, field_name, weight) VALUES
('article', 'title', 'A'),
('article', 'excerpt', 'B'),
('article', 'content', 'C'),
('episode', 'title', 'A'),
('episode', 'description', 'B'),
('show', 'title', 'A'),
('show', 'description', 'B')
ON CONFLICT DO NOTHING;

-- Insert default categories
INSERT INTO categories (title, slug, description, color, display_order) VALUES
('Glazba', 'glazba', 'Sve o glazbi', '#FF6B6B', 1),
('Kultura', 'kultura', 'Kulturna događanja', '#4ECDC4', 2),
('Društvo', 'drustvo', 'Društvene teme', '#95E1D3', 3),
('Tehnologija', 'tehnologija', 'Tech i inovacije', '#A8E6CF', 4),
('Vijesti', 'vijesti', 'Najnovije vijesti', '#FF6B9D', 5)
ON CONFLICT (slug) DO NOTHING;

-- Insert some default tags
INSERT INTO tags (name, slug, category) VALUES
('techno', 'techno', 'music_genre'),
('jazz', 'jazz', 'music_genre'),
('indie', 'indie', 'music_genre'),
('zagreb', 'zagreb', 'location'),
('intervju', 'intervju', 'format'),
('aktivizam', 'aktivizam', 'society')
ON CONFLICT (slug) DO NOTHING;

-- =============================================
-- PERMISSIONS (Grants)
-- =============================================

-- Create roles
CREATE ROLE radio_roza_app;
CREATE ROLE radio_roza_admin;

-- Grant permissions
GRANT SELECT, INSERT, UPDATE ON ALL TABLES IN SCHEMA public TO radio_roza_app;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO radio_roza_admin;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO radio_roza_admin;
GRANT USAGE ON SCHEMA public TO radio_roza_app, radio_roza_admin;
