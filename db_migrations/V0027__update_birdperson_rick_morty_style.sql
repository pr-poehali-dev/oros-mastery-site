-- Замена изображения Бёрдперсона на стиль Rick and Morty
UPDATE characters 
SET image = 'https://cdn.poehali.dev/projects/f9f23ac4-7352-47dd-a4bb-81301617dd90/files/edf073dd-9421-4bf6-8fb0-99008c39e052.jpg',
    avatar_image = 'https://cdn.poehali.dev/projects/f9f23ac4-7352-47dd-a4bb-81301617dd90/files/edf073dd-9421-4bf6-8fb0-99008c39e052.jpg',
    background_image = 'https://cdn.poehali.dev/projects/f9f23ac4-7352-47dd-a4bb-81301617dd90/files/edf073dd-9421-4bf6-8fb0-99008c39e052.jpg'
WHERE name = 'Бёрдперсон';