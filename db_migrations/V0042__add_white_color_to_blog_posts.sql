-- Обновляем все статьи, оборачивая контент в div с белым цветом
UPDATE blog_posts 
SET content = '<div style="color: white;">' || content || '</div>'
WHERE content NOT LIKE '<div style="color: white;">%';