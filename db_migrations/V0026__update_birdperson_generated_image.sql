-- Обновление изображения Бёрдперсона на сгенерированное
UPDATE characters 
SET image = 'https://cdn.poehali.dev/projects/f9f23ac4-7352-47dd-a4bb-81301617dd90/files/ab0b3b63-b020-42eb-8569-928fc5d4b4e1.jpg',
    avatar_image = 'https://cdn.poehali.dev/projects/f9f23ac4-7352-47dd-a4bb-81301617dd90/files/ab0b3b63-b020-42eb-8569-928fc5d4b4e1.jpg',
    background_image = 'https://cdn.poehali.dev/projects/f9f23ac4-7352-47dd-a4bb-81301617dd90/files/ab0b3b63-b020-42eb-8569-928fc5d4b4e1.jpg'
WHERE name = 'Бёрдперсон';