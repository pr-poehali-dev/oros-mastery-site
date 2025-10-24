ALTER TABLE t_p93401540_oros_mastery_site.episodes 
ADD COLUMN IF NOT EXISTS fun_facts TEXT;

CREATE TABLE IF NOT EXISTS t_p93401540_oros_mastery_site.episode_article_links (
    id SERIAL PRIMARY KEY,
    episode_id INTEGER NOT NULL,
    article_id INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(episode_id, article_id)
);