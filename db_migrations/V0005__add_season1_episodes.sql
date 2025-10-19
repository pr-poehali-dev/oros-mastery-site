-- Добавляем эпизоды сезона 1
INSERT INTO episodes (title, season, episode, description, image, air_date) VALUES 
('Pilot', 1, 1, 'Рик переезжает к семье своей дочери и соглашается взять Морти в первое приключение', 'https://image.tmdb.org/t/p/w500/vfvADGeTVPDjrHWzVwRl8e4nWMn.jpg', '2 дек 2013'),
('Lawnmower Dog', 1, 2, 'Рик создаёт устройство для проникновения в сны собаки Снафлс', 'https://image.tmdb.org/t/p/w500/kRqGFHJaJB48K75V8Cc39QHy4FU.jpg', '9 дек 2013'),
('Anatomy Park', 1, 3, 'Рик создаёт парк развлечений внутри человеческого тела', 'https://image.tmdb.org/t/p/w500/rgk0C87g4tPBLg7LJGvJnNqc8dC.jpg', '16 дек 2013'),
('M. Night Shaym-Aliens!', 1, 4, 'Рик и Морти оказываются в симуляции, созданной инопланетянами', 'https://image.tmdb.org/t/p/w500/qBbPzFLmDQvWnwdoYLSYv6E5l6J.jpg', '23 дек 2013'),
('Meeseeks and Destroy', 1, 5, 'Рик даёт семье коробку Meeseeks, которая вызывает существ для выполнения задач', 'https://image.tmdb.org/t/p/w500/mFxsC5jG7uqaKs23Yyv6Y7q7ySv.jpg', '30 дек 2013'),
('Rick Potion #9', 1, 6, 'Морти просит у Рика зелье любви, которое превращает всех в монстров', 'https://image.tmdb.org/t/p/w500/mE8x7y3ZsOchfMEKYuEKLxFKNhA.jpg', '6 янв 2014'),
('Raising Gazorpazorp', 1, 7, 'Морти становится отцом инопланетного ребёнка', 'https://image.tmdb.org/t/p/w500/y9bBKWXLq7Y0t2kfSGJJqLu2xYG.jpg', '13 янв 2014'),
('Rixty Minutes', 1, 8, 'Рик создаёт кабельную коробку, показывающую ТВ из других измерений', 'https://image.tmdb.org/t/p/w500/lFnwK5v38HjJUlMpKdLGKdRoHFJ.jpg', '20 янв 2014'),
('Something Ricked This Way Comes', 1, 9, 'Рик сражается с дьяволом, который продаёт проклятые предметы', 'https://image.tmdb.org/t/p/w500/iGQxrfVm8PiMakDcjWdP8qJpfRp.jpg', '27 янв 2014'),
('Close Rick-counters of the Rick Kind', 1, 10, 'Рика обвиняют в убийстве других Риков из параллельных вселенных', 'https://image.tmdb.org/t/p/w500/caNZQcXm2pHnO9CJZX3D1x0yaxc.jpg', '3 фев 2014'),
('Ricksy Business', 1, 11, 'Рик устраивает вечеринку, которая выходит из-под контроля', 'https://image.tmdb.org/t/p/w500/xmJQbTcz9F9q3FNvTNgRqZ2jKWc.jpg', '10 фев 2014')
ON CONFLICT (id) DO NOTHING;