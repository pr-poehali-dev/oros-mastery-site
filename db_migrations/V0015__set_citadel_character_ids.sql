UPDATE universes 
SET related_characters = '1,2'
WHERE name = 'Цитадель Риков' AND (related_characters IS NULL OR related_characters NOT LIKE '%,%');