-- Обновление аватаров комментариев в стиле Rick and Morty

UPDATE episode_comments SET author_avatar = 'https://cdn.poehali.dev/projects/f9f23ac4-7352-47dd-a4bb-81301617dd90/files/c9a3f133-fa81-4fe3-a601-025b0bfc2b9d.jpg' WHERE author_name = 'Morty Smith';

UPDATE episode_comments SET author_avatar = 'https://cdn.poehali.dev/projects/f9f23ac4-7352-47dd-a4bb-81301617dd90/files/3f41c8f3-d9b0-4f41-963e-7c2928324e2f.jpg' WHERE author_name = 'Summer Smith';

UPDATE episode_comments SET author_avatar = 'https://cdn.poehali.dev/projects/f9f23ac4-7352-47dd-a4bb-81301617dd90/files/79886724-8c68-451d-8021-13406ee76a6c.jpg' WHERE author_name = 'Beth Smith';

UPDATE episode_comments SET author_avatar = 'https://cdn.poehali.dev/projects/f9f23ac4-7352-47dd-a4bb-81301617dd90/files/8b5f9068-bcfc-4288-b8db-8b202497cac1.jpg' WHERE author_name = 'Jerry Smith';

UPDATE episode_comments SET author_avatar = 'https://cdn.poehali.dev/projects/f9f23ac4-7352-47dd-a4bb-81301617dd90/files/7e657598-765e-4b62-9125-552446d80464.jpg' WHERE author_name = 'Rick Sanchez' OR author_name LIKE 'Rick%';
