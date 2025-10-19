-- Создание таблицы вселенных
CREATE TABLE IF NOT EXISTS universes (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    image VARCHAR(500),
    status VARCHAR(100),
    features TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Создание таблицы персонажей
CREATE TABLE IF NOT EXISTS characters (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(255) NOT NULL,
    species VARCHAR(100) NOT NULL,
    status VARCHAR(50),
    bio TEXT NOT NULL,
    full_bio TEXT,
    image VARCHAR(500),
    abilities TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Создание таблицы теорий
CREATE TABLE IF NOT EXISTS theories (
    id SERIAL PRIMARY KEY,
    title VARCHAR(500) NOT NULL,
    type VARCHAR(50) NOT NULL,
    probability VARCHAR(50) NOT NULL,
    author VARCHAR(255) NOT NULL,
    votes INTEGER DEFAULT 0,
    summary TEXT NOT NULL,
    full_text TEXT NOT NULL,
    evidence TEXT,
    counter_arguments TEXT,
    related_episodes TEXT,
    related_characters TEXT,
    impact_level VARCHAR(100),
    category VARCHAR(100),
    image VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Индексы для улучшения производительности
CREATE INDEX IF NOT EXISTS idx_universes_name ON universes(name);
CREATE INDEX IF NOT EXISTS idx_characters_name ON characters(name);
CREATE INDEX IF NOT EXISTS idx_theories_title ON theories(title);
CREATE INDEX IF NOT EXISTS idx_theories_type ON theories(type);
CREATE INDEX IF NOT EXISTS idx_theories_probability ON theories(probability);
