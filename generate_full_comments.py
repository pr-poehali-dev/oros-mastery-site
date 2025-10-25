#!/usr/bin/env python3
"""
Скрипт для генерации SQL INSERT запросов для комментариев к эпизодам
Запуск: python3 generate_full_comments.py > db_migrations/V0034__fill_episode_comments.sql
"""
import random
from urllib.parse import quote

# Имена для комментариев
NAMES = [
    "Рик С-137", "Морти Смит", "Саммер", "Джерри", "Бет",
    "Птичья Личность", "Мистер Жопосранчик", "Мистер Попибаттхол",
    "Александр", "Дмитрий", "Анна", "Елена", "Сергей", "Ольга",
    "Максим", "Мария", "Владимир", "Ирина", "Андрей", "Екатерина",
    "Николай", "Светлана", "Алексей", "Наталья", "Павел", "Татьяна",
    "Иван", "Юлия", "Роман", "Виктория", "Денис", "Анастасия"
]

# Шаблоны комментариев для разных сезонов
COMMENT_TEMPLATES = {
    1: [
        "Пилот просто бомба!",
        "Отличное начало сериала",
        "Морти в этой серии просто шедевр",
        "Классика!",
        "Юмор на высоте",
        "Портал-пушка - лучшее изобретение Рика!",
        "Браво создателям!",
        "Впервые увидел эту серию и не пожалел",
        "Классика! Пересматриваю уже третий раз",
        "Юмор на высоте, обожаю этот сериал",
        "Эта серия заставила меня влюбиться в сериал",
        "Браво создателям! Оригинально и смешно",
        "Рик - мой любимый персонаж, гений!",
        "Отличное начало сериала, сразу видна гениальность Рика",
        "Гениальный эпизод!",
        "Лучшее начало сезона!",
        "Пересматриваю каждый год",
        "Рик и Морти навсегда!",
        "Обожаю этот сериал",
        "Шедевр!",
        "Отлично!",
        "Супер начало!",
        "Невероятная серия",
        "Смеялся всю серию",
        "Гениально написано",
        "Лучший сериал!",
        "Отличная анимация",
        "Креативный сюжет",
        "Обожаю приключения Рика",
        "Морти такой милый тут"
    ],
    2: [
        "Второй сезон не разочаровал!",
        "Сюжет становится интереснее",
        "Рик снова всех переиграл",
        "Лучший эпизод сезона!",
        "Гениальный сценарий",
        "Отличная серия!",
        "Морти наконец-то повзрослел",
        "Обожаю межпространственные приключения",
        "Смеялся всю серию",
        "Такого поворота не ожидал!",
        "Качество не падает",
        "Второй сезон даже лучше первого",
        "Рик гений!",
        "Невероятные приключения",
        "Каждая серия лучше предыдущей",
        "Сюжет развивается отлично",
        "Обожаю этот сезон",
        "Юмор на высшем уровне",
        "Креативность зашкаливает",
        "Рик и Морти форевер!",
        "Отличный эпизод",
        "Смотрю и пересматриваю",
        "Гениальная идея",
        "Лучшее что я видел",
        "Морти становится круче",
        "Рик непредсказуем",
        "Обожаю этих персонажей",
        "Сериал который заставляет думать",
        "Идеальный баланс юмора и драмы",
        "Философия сериала поражает"
    ],
    3: [
        "Третий сезон просто космос!",
        "Философия сериала поражает",
        "Рик С-137 лучший Рик!",
        "Эмоциональная серия",
        "Глубокий смысл",
        "Плакал и смеялся одновременно",
        "Глубокий смысл за юмором",
        "Шедевр анимации!",
        "Пересматриваю и нахожу новые детали",
        "Браво сценаристам!",
        "Лучше с каждым сезоном",
        "Третий сезон самый лучший",
        "Рик становится интереснее",
        "Морти повзрослел",
        "Обожаю развитие персонажей",
        "Сюжетные линии супер",
        "Эмоции зашкаливают",
        "Гениальный сезон",
        "Не могу оторваться",
        "Каждая серия - шедевр",
        "Рик и Морти лучшее что есть",
        "Философский сериал",
        "Глубина поражает",
        "Юмор и драма идеально",
        "Обожаю этот мир",
        "Персонажи живые",
        "Сценарий на высоте",
        "Лучший сезон на данный момент",
        "Не ожидал такого развития событий",
        "Гениально написано!"
    ],
    4: [
        "Сезон не подкачал",
        "Креативность зашкаливает",
        "Рик и Морти форевер!",
        "Каждая серия - шедевр",
        "Сериал века!",
        "Четвёртый сезон не подкачал",
        "Отсылки к науке восхищают",
        "Каждая серия - маленький шедевр",
        "Не могу дождаться следующей серии",
        "Юмор стал ещё лучше",
        "Обожаю этих персонажей",
        "Сериал который заставляет думать",
        "Идеальный баланс юмора и драмы",
        "Четвёртый сезон огонь",
        "Рик непобедим",
        "Морти крут",
        "Обожаю приключения",
        "Сюжет интересный",
        "Персонажи развиваются",
        "Гениальный сценарий",
        "Лучший сезон",
        "Не могу остановиться смотреть",
        "Каждый эпизод открытие",
        "Юмор тонкий",
        "Философия глубокая",
        "Рик гений безумия",
        "Морти герой",
        "Семья Смитов супер",
        "Обожаю мультивселенную",
        "Сериал для умных"
    ],
    5: [
        "Сезон не подкачал",
        "Креативность зашкаливает",
        "Рик и Морти форевер!",
        "Каждая серия - шедевр",
        "Сериал века!",
        "Пятый сезон просто огонь!",
        "Сюжетные линии развиваются отлично",
        "Рик становится интереснее",
        "Морти повзрослел и это видно",
        "Семейная драма + научная фантастика = идеально",
        "Лучший сезон на данный момент",
        "Не ожидал такого развития событий",
        "Гениально написано!",
        "Пересматриваю и восхищаюсь",
        "Пятый сезон лучший",
        "Обожаю новые серии",
        "Рик и Морти навсегда",
        "Сюжет закручивается",
        "Персонажи живые",
        "Эмоции зашкаливают",
        "Гениальный сезон",
        "Философия сериала",
        "Юмор на высоте",
        "Драма трогает",
        "Рик сложный персонаж",
        "Морти взрослеет",
        "Семья важна",
        "Мультивселенная бесконечна",
        "Обожаю этот мир",
        "Сериал для души и ума"
    ]
}

# Данные эпизодов (id, season, episode, title)
# Сезон 1 - 11 эпизодов, Сезон 2 - 10, Сезон 3 - 10, Сезон 4 - 10, Сезон 5 - 10
EPISODES = [
    (1, 1, 1, "Pilot"), (2, 1, 2, "Lawnmower Dog"), (3, 1, 3, "Anatomy Park"),
    (4, 1, 4, "M. Night Shaym-Aliens!"), (5, 1, 5, "Meeseeks and Destroy"), (6, 1, 6, "Rick Potion #9"),
    (7, 1, 7, "Raising Gazorpazorp"), (8, 1, 8, "Rixty Minutes"), (9, 1, 9, "Something Ricked This Way Comes"),
    (10, 1, 10, "Close Rick-counters of the Rick Kind"), (11, 1, 11, "Ricksy Business"),
    (12, 2, 1, "A Rickle in Time"), (13, 2, 2, "Mortynight Run"), (14, 2, 3, "Auto Erotic Assimilation"),
    (15, 2, 4, "Total Rickall"), (16, 2, 5, "Get Schwifty"), (17, 2, 6, "The Ricks Must Be Crazy"),
    (18, 2, 7, "Big Trouble in Little Sanchez"), (19, 2, 8, "Interdimensional Cable 2: Tempting Fate"),
    (20, 2, 9, "Look Who's Purging Now"), (21, 2, 10, "The Wedding Squanchers"),
    (22, 3, 1, "The Rickshank Rickdemption"), (23, 3, 2, "Rickmancing the Stone"), (24, 3, 3, "Pickle Rick"),
    (25, 3, 4, "Vindicators 3: The Return of Worldender"), (26, 3, 5, "The Whirly Dirly Conspiracy"),
    (27, 3, 6, "Rest and Ricklaxation"), (28, 3, 7, "The Ricklantis Mixup"), (29, 3, 8, "Morty's Mind Blowers"),
    (30, 3, 9, "The ABC's of Beth"), (31, 3, 10, "The Rickchurian Mortydate"),
    (32, 4, 1, "Edge of Tomorty: Rick Die Rickpeat"), (33, 4, 2, "The Old Man and the Seat"),
    (34, 4, 3, "One Crew Over the Crewcoo's Morty"), (35, 4, 4, "Claw and Hoarder: Special Ricktim's Morty"),
    (36, 4, 5, "Rattlestar Ricklactica"), (37, 4, 6, "Never Ricking Morty"), (38, 4, 7, "Promortyus"),
    (39, 4, 8, "The Vat of Acid Episode"), (40, 4, 9, "Childrick of Mort"), (41, 4, 10, "Star Mort Rickturn of the Jerri"),
    (42, 5, 1, "Mort Dinner Rick Andre"), (43, 5, 2, "Mortyplicity"), (44, 5, 3, "A Rickconvenient Mort"),
    (45, 5, 4, "Rickdependence Spray"), (46, 5, 5, "Amortycan Grickfitti"),
    (47, 5, 6, "Rick & Morty's Thanksploitation Spectacular"), (48, 5, 7, "Gotron Jerrysis Rickvangelion"),
    (49, 5, 8, "Rickternal Friendshine of the Spotless Mort"), (50, 5, 9, "Forgetting Sarick Mortshall"),
    (51, 5, 10, "Rickmurai Jack")
]

def generate_avatar(name):
    """Генерирует URL аватара для пользователя"""
    seed = quote(name)
    return f"https://api.dicebear.com/7.x/fun-emoji/svg?seed={seed}&backgroundColor=06b6d4,10b981,8b5cf6,ec4899&radius=50"

def escape_sql(text):
    """Экранирует одинарные кавычки для SQL"""
    return text.replace("'", "''")

def generate_comments_for_episode(episode_id, season, episode_num, title):
    """Генерирует комментарии для одного эпизода"""
    num_comments = random.randint(30, 100)
    templates = COMMENT_TEMPLATES.get(season, COMMENT_TEMPLATES[1])
    
    comments = []
    for i in range(num_comments):
        name = random.choice(NAMES)
        text = random.choice(templates)
        # 60% - 5 звёзд, 30% - 4 звезды, 10% - 3 звезды
        rating = random.choices([5, 4, 3], weights=[0.6, 0.3, 0.1])[0]
        avatar = generate_avatar(name)
        
        # Генерируем разные временные интервалы
        days_ago = num_comments - i
        if days_ago > 30:
            time_interval = f"{days_ago} days"
        elif days_ago > 0:
            time_interval = f"{days_ago} days"
        else:
            hours = random.randint(1, 24)
            time_interval = f"{hours} hours"
        
        comment = f"({episode_id}, '{escape_sql(name)}', '{escape_sql(avatar)}', '{escape_sql(text)}', {rating}, NOW() - INTERVAL '{time_interval}')"
        comments.append(comment)
    
    return comments

def main():
    """Генерирует SQL файл с комментариями"""
    print("-- Заполнение комментариев к эпизодам")
    print("-- Генерируем от 30 до 100 комментариев для каждого эпизода")
    print("-- Таблица: episode_comments (episode_id, author_name, author_avatar, comment_text, rating, created_at)")
    print()
    
    all_comments = []
    
    for episode_id, season, episode_num, title in EPISODES:
        comments = generate_comments_for_episode(episode_id, season, episode_num, title)
        all_comments.extend(comments)
    
    # Разбиваем на части по 500 комментариев
    chunk_size = 500
    chunk_num = 1
    for i in range(0, len(all_comments), chunk_size):
        chunk = all_comments[i:i+chunk_size]
        print(f"-- Часть {chunk_num}: Комментарии {i+1}-{min(i+chunk_size, len(all_comments))}")
        print("INSERT INTO episode_comments (episode_id, author_name, author_avatar, comment_text, rating, created_at) VALUES")
        print(",\n".join(chunk))
        print(";")
        print()
        chunk_num += 1
    
    import sys
    print(f"-- ✅ Всего комментариев: {len(all_comments)}", file=sys.stderr)
    print(f"-- 📝 Эпизодов: {len(EPISODES)}", file=sys.stderr)
    print(f"-- 📊 Разбито на {chunk_num-1} INSERT запросов", file=sys.stderr)

if __name__ == '__main__':
    main()
