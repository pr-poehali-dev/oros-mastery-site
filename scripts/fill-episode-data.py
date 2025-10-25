#!/usr/bin/env python3
"""
Скрипт для заполнения эпизодов просмотрами, лайками и комментариями
"""
import psycopg2
import os
import random
from typing import List, Tuple

# Подключение к БД через DATABASE_URL из окружения
DATABASE_URL = os.environ.get('DATABASE_URL')

# Генерация случайных просмотров и лайков
def generate_stats(season: int, episode: int) -> Tuple[int, int]:
    """Генерирует реалистичные просмотры и лайки"""
    base_views = random.randint(5000, 25000)
    # Первые эпизоды популярнее
    if season == 1 and episode <= 3:
        base_views = random.randint(20000, 45000)
    
    likes = int(base_views * random.uniform(0.05, 0.15))
    return base_views, likes

# Пул имён для комментариев
NAMES = [
    "Рик С-137", "Морти Смит", "Саммер", "Джерри", "Бет",
    "Птичья Личность", "Мистер Жопосранчик", "Мистер Попибаттхол",
    "Александр", "Дмитрий", "Анна", "Елена", "Сергей", "Ольга",
    "Максим", "Мария", "Владимир", "Ирина", "Андрей", "Екатерина",
    "Николай", "Светлана", "Алексей", "Наталья", "Павел", "Татьяна",
    "Иван", "Юлия", "Роман", "Виктория", "Денис", "Анастасия",
    "Кирилл", "Дарья", "Артём", "Полина", "Егор", "Валерия"
]

# Шаблоны комментариев для разных сезонов
COMMENT_TEMPLATES = {
    1: [
        "Пилот просто бомба! {} из 5 звёзд!",
        "Отличное начало сериала, сразу видна гениальность Рика",
        "Морти в этой серии просто шедевр 😂",
        "Впервые увидел эту серию и не пожалел",
        "Классика! Пересматриваю уже {} раз",
        "Юмор на высоте, обожаю этот сериал",
        "Портал-пушка - лучшее изобретение Рика!",
        "Эта серия заставила меня влюбиться в сериал",
        "Браво создателям! Оригинально и смешно",
        "Рик - мой любимый персонаж, гений!",
    ],
    2: [
        "Второй сезон не разочаровал!",
        "Сюжет становится всё интереснее",
        "Отличная серия, {} звёзд!",
        "Рик снова всех переиграл 🔥",
        "Морти наконец-то повзрослел",
        "Обожаю межпространственные приключения",
        "Лучший эпизод сезона!",
        "Смеялся всю серию 😄",
        "Гениальный сценарий",
        "Такого поворота не ожидал!",
    ],
    3: [
        "Третий сезон просто космос!",
        "Философия сериала поражает",
        "Рик С-137 лучший Рик!",
        "Эмоциональная серия",
        "Плакал и смеялся одновременно",
        "Глубокий смысл за юмором",
        "Шедевр анимации!",
        "Пересматриваю и нахожу новые детали",
        "Браво сценаристам!",
        "Лучше с каждым сезоном",
    ],
    4: [
        "Четвёртый сезон не подкачал",
        "Креативность зашкаливает",
        "Рик и Морти форевер!",
        "Отсылки к науке восхищают",
        "Каждая серия - маленький шедевр",
        "Не могу дождаться следующей серии",
        "Юмор стал ещё лучше",
        "Обожаю этих персонажей",
        "Сериал который заставляет думать",
        "Идеальный баланс юмора и драмы",
    ],
    5: [
        "Пятый сезон просто огонь! 🔥",
        "Сюжетные линии развиваются отлично",
        "Рик становится интереснее",
        "Морти повзрослел и это видно",
        "Семейная драма + научная фантастика = идеально",
        "Лучший сезон на данный момент",
        "Не ожидал такого развития событий",
        "Гениально написано!",
        "Пересматриваю и восхищаюсь",
        "Сериал века!",
    ]
}

def generate_comment(season: int, episode_title: str) -> Tuple[str, str, int]:
    """Генерирует случайный комментарий"""
    name = random.choice(NAMES)
    rating = random.choices([3, 4, 5], weights=[0.1, 0.3, 0.6])[0]
    
    templates = COMMENT_TEMPLATES.get(season, COMMENT_TEMPLATES[1])
    template = random.choice(templates)
    
    # Форматируем шаблон если есть плейсхолдеры
    if '{}' in template:
        text = template.format(random.randint(2, 10) if 'раз' in template else rating)
    else:
        text = template
    
    return name, text, rating

def generate_avatar(name: str) -> str:
    """Генерирует URL аватара для пользователя"""
    from urllib.parse import quote
    seed = quote(name)
    return f"https://api.dicebear.com/7.x/fun-emoji/svg?seed={seed}&backgroundColor=06b6d4,10b981,8b5cf6,ec4899&radius=50"

def main():
    if not DATABASE_URL:
        print("ERROR: DATABASE_URL не установлен")
        return
    
    conn = psycopg2.connect(DATABASE_URL)
    cur = conn.cursor()
    
    # Получаем все эпизоды
    cur.execute("SELECT id, title, season, episode FROM episodes ORDER BY season, episode")
    episodes = cur.fetchall()
    
    print(f"Найдено {len(episodes)} эпизодов")
    
    for ep_id, title, season, episode in episodes:
        # Генерируем просмотры и лайки
        views, likes = generate_stats(season, episode)
        
        # Обновляем эпизод
        cur.execute(
            f"UPDATE episodes SET views={views}, likes={likes} WHERE id={ep_id}"
        )
        
        print(f"Эпизод {season}x{episode}: {views} просмотров, {likes} лайков")
        
        # Генерируем комментарии (от 30 до 100 на эпизод)
        num_comments = random.randint(30, 100)
        
        for _ in range(num_comments):
            name, text, rating = generate_comment(season, title)
            avatar = generate_avatar(name)
            
            # Экранируем кавычки
            name_escaped = name.replace("'", "''")
            text_escaped = text.replace("'", "''")
            avatar_escaped = avatar.replace("'", "''")
            
            cur.execute(
                f"""INSERT INTO comments (episode_id, author_name, author_avatar, text, rating, created_at)
                VALUES ({ep_id}, '{name_escaped}', '{avatar_escaped}', '{text_escaped}', {rating}, NOW())"""
            )
        
        print(f"  Добавлено {num_comments} комментариев")
    
    conn.commit()
    cur.close()
    conn.close()
    
    print("\n✅ Данные успешно добавлены!")

if __name__ == '__main__':
    main()
