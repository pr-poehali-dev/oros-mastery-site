-- Создание таблиц для контента

-- Таблица вселенных
CREATE TABLE IF NOT EXISTS universes (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    image VARCHAR(500),
    status VARCHAR(100),
    features TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица персонажей
CREATE TABLE IF NOT EXISTS characters (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(255),
    species VARCHAR(255),
    bio TEXT,
    full_bio TEXT,
    image VARCHAR(500),
    background_image VARCHAR(500),
    avatar_image VARCHAR(500),
    status VARCHAR(100),
    abilities TEXT,
    origin VARCHAR(255),
    first_appearance VARCHAR(255),
    occupation VARCHAR(255),
    affiliation VARCHAR(255),
    family TEXT,
    notable_episodes TEXT,
    personality TEXT,
    goals TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица теорий
CREATE TABLE IF NOT EXISTS theories (
    id SERIAL PRIMARY KEY,
    title VARCHAR(500) NOT NULL,
    type VARCHAR(100) DEFAULT 'character',
    probability VARCHAR(50) DEFAULT 'medium',
    author VARCHAR(255),
    votes INTEGER DEFAULT 0,
    views INTEGER DEFAULT 0,
    likes INTEGER DEFAULT 0,
    published_date DATE,
    description TEXT,
    evidence TEXT,
    related_episodes TEXT,
    related_characters TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Индексы для быстрого поиска
CREATE INDEX IF NOT EXISTS idx_universes_name ON universes(name);
CREATE INDEX IF NOT EXISTS idx_characters_name ON characters(name);
CREATE INDEX IF NOT EXISTS idx_theories_title ON theories(title);
CREATE INDEX IF NOT EXISTS idx_theories_type ON theories(type);
