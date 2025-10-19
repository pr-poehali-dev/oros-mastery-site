-- Добавляем таблицу для комментариев к эпизодам
CREATE TABLE IF NOT EXISTS episode_comments (
    id SERIAL PRIMARY KEY,
    episode_id INTEGER NOT NULL,
    author_name VARCHAR(100) NOT NULL,
    author_avatar VARCHAR(500),
    comment_text TEXT NOT NULL,
    rating INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Добавляем таблицу для статей об эпизодах
CREATE TABLE IF NOT EXISTS episode_articles (
    id SERIAL PRIMARY KEY,
    episode_id INTEGER NOT NULL,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Индексы для быстрого поиска
CREATE INDEX IF NOT EXISTS idx_episode_comments_episode_id ON episode_comments(episode_id);
CREATE INDEX IF NOT EXISTS idx_episode_articles_episode_id ON episode_articles(episode_id);
