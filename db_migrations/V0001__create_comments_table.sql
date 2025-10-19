-- Создание таблицы комментариев для блога
CREATE TABLE IF NOT EXISTS comments (
    id SERIAL PRIMARY KEY,
    article_id INTEGER NOT NULL,
    author_name VARCHAR(100) NOT NULL,
    author_email VARCHAR(255),
    comment_text TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_approved BOOLEAN DEFAULT TRUE
);

-- Создание индекса для быстрого поиска комментариев по статье
CREATE INDEX IF NOT EXISTS idx_comments_article_id ON comments(article_id);

-- Создание индекса для сортировки по дате
CREATE INDEX IF NOT EXISTS idx_comments_created_at ON comments(created_at DESC);