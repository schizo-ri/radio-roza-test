# PostgreSQL Database Schema Documentation

## 📊 Database Overview

Ova PostgreSQL shema je dizajnirana za Radio Rožu community radio web aplikaciju. Shema podržava kompleksne relacije između korisnika, autora, emisija, epizoda, članaka i povezanih entiteta.

## 🗂️ Entity Relationship Diagram (Tekstualni prikaz)

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   USERS     │────>│   AUTHORS   │<────│   SHOWS     │
└─────────────┘     └─────────────┘     └─────────────┘
      │                    │                    │
      │                    │                    │
      ▼                    ▼                    ▼
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  COMMENTS   │     │  ARTICLES   │     │  EPISODES   │
└─────────────┘     └─────────────┘     └─────────────┘
                           │                    │
                           │                    │
                           ▼                    ▼
                    ┌─────────────┐     ┌─────────────┐
                    │ CATEGORIES  │     │    TAGS     │
                    └─────────────┘     └─────────────┘
```

## 📋 Glavni entiteti

### Users (korisnici CMS-a)
- Korisnici koji se mogu prijaviti u CMS sustav
- Role: admin, editor, author, contributor, guest
- Povezani s autorima (1:1 opcionalno)

### Authors (autori sadržaja)
- Mogu biti vezani uz korisnike ili biti vanjski suradnici
- Vode emisije, pišu članke, produciraju epizode
- Sadrže statistike o broju sadržaja

### Shows (radijske emisije)
- Dva tipa: `tematski_blok` i `govorna_emisija`
- Mogu biti interni ili vanjski programi
- Imaju raspored emitiranja i statistike

### Episodes (epizode emisija)
- Pripadaju emisijama
- Mogu imati više autora (many-to-many)
- Podržavaju goste, segmente, playliste

### Articles (članci)
- Kompletan CMS za članke
- SEO optimizacija
- Galerije, embeds, related content

### Categories & Tags
- Hijerarhijske kategorije (parent-child)
- Tagovi s kategorijama i brojačima korištenja

## 🔗 Relacijske tablice (Junction tables)

```sql
-- Many-to-many veze
show_hosts          -- emisija <-> autori
episode_authors     -- epizoda <-> autori
article_tags        -- članak <-> tagovi
episode_tags        -- epizoda <-> tagovi
show_tags          -- emisija <-> tagovi
related_articles    -- članak <-> povezani članci
article_shows       -- članak <-> emisije
article_episodes    -- članak <-> epizode
```

## 📝 Primjeri upita

### 1. Dohvati sve članke s autorima i kategorijama

```sql
SELECT 
    a.title,
    a.slug,
    a.published_date,
    auth.first_name || ' ' || auth.last_name AS author_name,
    c.title AS category,
    array_agg(t.name) AS tags
FROM articles a
LEFT JOIN authors auth ON a.author_id = auth.id
LEFT JOIN categories c ON a.category_id = c.id
LEFT JOIN article_tags at ON a.id = at.article_id
LEFT JOIN tags t ON at.tag_id = t.id
WHERE a.status = 'published'
GROUP BY a.id, auth.id, c.id
ORDER BY a.published_date DESC
LIMIT 20;
```

### 2. Najnovije epizode s informacijama o emisiji

```sql
SELECT 
    e.title AS episode_title,
    e.air_date,
    e.duration,
    s.title AS show_title,
    s.type AS show_type,
    array_agg(DISTINCT a.first_name || ' ' || a.last_name) AS authors
FROM episodes e
JOIN shows s ON e.show_id = s.id
LEFT JOIN episode_authors ea ON e.id = ea.episode_id
LEFT JOIN authors a ON ea.author_id = a.id
WHERE e.status = 'published'
    AND e.air_date <= NOW()
GROUP BY e.id, s.id
ORDER BY e.air_date DESC
LIMIT 10;
```

### 3. Statistike po autorima

```sql
SELECT 
    a.first_name || ' ' || a.last_name AS author_name,
    a.slug,
    COUNT(DISTINCT ar.id) AS article_count,
    COUNT(DISTINCT e.id) AS episode_count,
    COUNT(DISTINCT sh.show_id) AS show_count,
    a.is_active
FROM authors a
LEFT JOIN articles ar ON ar.author_id = a.id AND ar.status = 'published'
LEFT JOIN episode_authors ea ON ea.author_id = a.id
LEFT JOIN episodes e ON ea.episode_id = e.id AND e.status = 'published'
LEFT JOIN show_hosts sh ON sh.author_id = a.id
GROUP BY a.id
ORDER BY article_count DESC;
```

### 4. Popularni tagovi

```sql
SELECT 
    t.name,
    t.slug,
    t.usage_count,
    t.category,
    COUNT(DISTINCT at.article_id) AS article_uses,
    COUNT(DISTINCT et.episode_id) AS episode_uses,
    COUNT(DISTINCT st.show_id) AS show_uses
FROM tags t
LEFT JOIN article_tags at ON t.id = at.tag_id
LEFT JOIN episode_tags et ON t.id = et.tag_id
LEFT JOIN show_tags st ON t.id = st.tag_id
GROUP BY t.id
ORDER BY t.usage_count DESC
LIMIT 30;
```

### 5. Raspored emisija za određeni dan

```sql
SELECT 
    s.title,
    s.type,
    (s.schedule->>'startTime')::time AS start_time,
    (s.schedule->>'endTime')::time AS end_time,
    s.schedule->>'isLive' AS is_live,
    array_agg(a.first_name || ' ' || a.last_name) AS hosts
FROM shows s
LEFT JOIN show_hosts sh ON s.id = sh.show_id
LEFT JOIN authors a ON sh.author_id = a.id
WHERE s.is_active = true
    AND s.schedule->'dayOfWeek' ? 'monday'  -- ili bilo koji dan
GROUP BY s.id
ORDER BY (s.schedule->>'startTime')::time;
```

### 6. Full-text pretraživanje

```sql
-- Koristi ugrađenu funkciju
SELECT * FROM search_content('jazz techno', 'all', 20);

-- Ili direktno
SELECT 
    title,
    slug,
    ts_rank(
        to_tsvector('simple', title || ' ' || excerpt || ' ' || content),
        plainto_tsquery('simple', 'jazz techno')
    ) AS relevance
FROM articles
WHERE to_tsvector('simple', title || ' ' || excerpt || ' ' || content) 
    @@ plainto_tsquery('simple', 'jazz techno')
ORDER BY relevance DESC;
```

### 7. Komentari s threadovima

```sql
WITH RECURSIVE comment_tree AS (
    -- Root komentari
    SELECT 
        c.*,
        0 AS depth,
        ARRAY[c.id] AS path
    FROM comments c
    WHERE c.parent_id IS NULL 
        AND c.article_id = 'neki-uuid'
        AND c.is_approved = true
    
    UNION ALL
    
    -- Rekurzivno dohvati djecu
    SELECT 
        c.*,
        ct.depth + 1,
        ct.path || c.id
    FROM comments c
    JOIN comment_tree ct ON c.parent_id = ct.id
    WHERE c.is_approved = true
)
SELECT * FROM comment_tree
ORDER BY path;
```

### 8. Analitika - najpopularniji sadržaj

```sql
-- Najčitaniji članci ovaj tjedan
SELECT 
    a.title,
    a.slug,
    COUNT(ae.id) AS views_this_week,
    a.view_count AS total_views
FROM articles a
LEFT JOIN analytics_events ae ON 
    ae.entity_id = a.id 
    AND ae.entity_type = 'article'
    AND ae.event_type = 'page_view'
    AND ae.created_at >= NOW() - INTERVAL '7 days'
WHERE a.status = 'published'
GROUP BY a.id
ORDER BY views_this_week DESC
LIMIT 10;
```

## 🚀 Optimizacije

### Indeksi
- Svi foreign key-evi imaju indekse
- Composite indeksi za česte upite
- Full-text search indeksi (GIN)
- Partial indeksi za filtrirane upite

### Triggeri
- Automatsko ažuriranje `updated_at` timestamp-a
- Brojanje korištenja tagova
- Brojanje članaka po kategorijama

### View-ovi
- `v_articles_full` - članci s autorima i kategorijama
- `v_episodes_full` - epizode s emisijama
- `v_shows_with_hosts` - emisije s voditeljima

## 🔒 Sigurnost

### Row Level Security (RLS)
- Omogućen na `users` i `comments` tablicama
- Korisnici mogu vidjeti samo svoje podatke
- Admini mogu vidjeti sve

### Role i permisije
```sql
-- Aplikacijski korisnik (ograničene permisije)
GRANT SELECT, INSERT, UPDATE ON ALL TABLES TO radio_roza_app;

-- Admin korisnik (sve permisije)
GRANT ALL PRIVILEGES ON ALL TABLES TO radio_roza_admin;
```

## 📦 Migracije

### Inicijalna migracija
```bash
psql -U postgres -d radio_roza < schema.sql
```

### Backup
```bash
pg_dump -U postgres -d radio_roza > backup_$(date +%Y%m%d).sql
```

### Restore
```bash
psql -U postgres -d radio_roza < backup_20240110.sql
```

## 🔧 Održavanje

### Vacuum i analyze
```sql
-- Redovito pokretati za optimalne performanse
VACUUM ANALYZE;

-- Ili automatski
ALTER DATABASE radio_roza SET autovacuum = on;
```

### Reindex
```sql
-- Ponovo izgradi indekse nakon velikih promjena
REINDEX DATABASE radio_roza;
```

## 💡 Napomene

1. **UUID vs Serial ID**: Koristimo UUID za bolje skaliranje i sigurnost
2. **JSONB polja**: Za fleksibilne metapodatke i postavke
3. **Timezone**: Sve vrijeme je u UTC (TIMESTAMPTZ)
4. **Soft delete**: Nije implementiran, ali se može lako dodati
5. **Versioning**: Nije uključen, ali se može dodati za članke/epizode

## 🔄 Povezanost s Mock API-jem

Mock API struktura direktno odgovara ovoj shemi:
- Mock `id` polja (npr. 'auth_001') → UUID u bazi
- Mock objekti → relacijske tablice
- Mock helper funkcije → SQL view-ovi i funkcije