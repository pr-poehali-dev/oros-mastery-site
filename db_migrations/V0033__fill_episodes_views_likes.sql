-- Заполнение эпизодов просмотрами и лайками
UPDATE episodes SET 
  views = FLOOR(RANDOM() * 20000 + 5000)::int,
  likes = FLOOR(RANDOM() * 2000 + 250)::int
WHERE season = 1;

UPDATE episodes SET 
  views = FLOOR(RANDOM() * 18000 + 4000)::int,
  likes = FLOOR(RANDOM() * 1800 + 200)::int
WHERE season = 2;

UPDATE episodes SET 
  views = FLOOR(RANDOM() * 16000 + 3500)::int,
  likes = FLOOR(RANDOM() * 1600 + 180)::int
WHERE season = 3;

UPDATE episodes SET 
  views = FLOOR(RANDOM() * 15000 + 3000)::int,
  likes = FLOOR(RANDOM() * 1500 + 150)::int
WHERE season = 4;

UPDATE episodes SET 
  views = FLOOR(RANDOM() * 14000 + 3000)::int,
  likes = FLOOR(RANDOM() * 1400 + 140)::int
WHERE season = 5;
