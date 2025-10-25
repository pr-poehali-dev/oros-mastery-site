// Утилита для генерации тестовых комментариев
// Использовать в консоли браузера для заполнения эпизодов

const NAMES = [
  "Рик С-137", "Морти Смит", "Саммер", "Джерри", "Бет",
  "Птичья Личность", "Мистер Жопосранчик", "Мистер Попибаттхол",
  "Александр", "Дмитрий", "Анна", "Елена", "Сергей", "Ольга",
  "Максим", "Мария", "Владимир", "Ирина", "Андрей", "Екатерина",
  "Николай", "Светлана", "Алексей", "Наталья", "Павел", "Татьяна",
  "Иван", "Юлия", "Роман", "Виктория", "Денис", "Анастасия"
];

const COMMENT_TEMPLATES: Record<number, string[]> = {
  1: [
    "Пилот просто бомба!", "Отличное начало сериала",
    "Морти в этой серии просто шедевр", "Классика!",
    "Юмор на высоте", "Портал-пушка - лучшее изобретение Рика!",
    "Браво создателям!", "Гениальный эпизод!",
    "Лучшее начало сезона!", "Пересматриваю каждый год",
    "Рик и Морти навсегда!", "Обожаю этот сериал",
    "Шедевр!", "Невероятная серия", "Смеялся всю серию"
  ],
  2: [
    "Второй сезон не разочаровал!", "Сюжет становится интереснее",
    "Рик снова всех переиграл", "Лучший эпизод сезона!",
    "Гениальный сценарий", "Морти повзрослел",
    "Обожаю межпространственные приключения", "Смеялся всю серию",
    "Такого поворота не ожидал!", "Качество не падает",
    "Второй сезон даже лучше первого", "Рик гений!",
    "Невероятные приключения", "Каждая серия лучше предыдущей"
  ],
  3: [
    "Третий сезон просто космос!", "Философия сериала поражает",
    "Рик С-137 лучший Рик!", "Эмоциональная серия",
    "Глубокий смысл", "Плакал и смеялся одновременно",
    "Шедевр анимации!", "Пересматриваю и нахожу новые детали",
    "Браво сценаристам!", "Лучше с каждым сезоном",
    "Третий сезон самый лучший", "Рик становится интереснее",
    "Морти повзрослел", "Философский сериал"
  ],
  4: [
    "Сезон не подкачал", "Креативность зашкаливает",
    "Рик и Морти форевер!", "Каждая серия - шедевр",
    "Сериал века!", "Юмор стал ещё лучше",
    "Обожаю этих персонажей", "Сериал который заставляет думать",
    "Идеальный баланс юмора и драмы", "Гениальный сценарий",
    "Лучший сезон", "Не могу остановиться смотреть",
    "Каждый эпизод открытие", "Философия глубокая"
  ]
};

const generateAvatar = (name: string): string => {
  const seed = encodeURIComponent(name);
  return `https://api.dicebear.com/7.x/fun-emoji/svg?seed=${seed}&backgroundColor=06b6d4,10b981,8b5cf6,ec4899&radius=50`;
};

const randomChoice = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

const randomRating = (): number => {
  const rand = Math.random();
  if (rand < 0.6) return 5;
  if (rand < 0.9) return 4;
  return 3;
};

export const generateCommentsForEpisode = async (episodeId: number, season: number, count: number = 50): Promise<void> => {
  const API_URL = 'https://functions.poehali.dev/ac29f682-6173-43c7-a16b-3ffb94e0f51a';
  const templates = COMMENT_TEMPLATES[season] || COMMENT_TEMPLATES[1];
  
  console.log(`Генерирую ${count} комментариев для эпизода ${episodeId} (сезон ${season})...`);
  
  for (let i = 0; i < count; i++) {
    const name = randomChoice(NAMES);
    const text = randomChoice(templates);
    const rating = randomRating();
    const avatar = generateAvatar(name);
    
    try {
      await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'add_comment',
          episodeId,
          authorName: name,
          authorAvatar: avatar,
          text,
          rating
        })
      });
      
      if ((i + 1) % 10 === 0) {
        console.log(`  Создано ${i + 1} комментариев...`);
      }
      
      // Небольшая задержка чтобы не перегрузить сервер
      await new Promise(resolve => setTimeout(resolve, 100));
    } catch (error) {
      console.error(`Ошибка при создании комментария ${i + 1}:`, error);
    }
  }
  
  console.log(`✅ Готово! Создано ${count} комментариев для эпизода ${episodeId}`);
};

// Функция для заполнения всех эпизодов
export const fillAllEpisodesWithComments = async (): Promise<void> => {
  const EPISODES_API = 'https://functions.poehali.dev/031f0f01-3e0b-440b-a295-08f07c4d1389';
  
  console.log('Загружаю список эпизодов...');
  const response = await fetch(EPISODES_API);
  const episodes = await response.json();
  
  console.log(`Найдено ${episodes.length} эпизодов`);
  
  for (const episode of episodes) {
    const commentsCount = Math.floor(Math.random() * (100 - 30 + 1)) + 30; // 30-100
    await generateCommentsForEpisode(episode.id, episode.season, commentsCount);
    
    // Пауза между эпизодами
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  console.log('🎉 Все эпизоды заполнены комментариями!');
};

// Экспортируем для использования в window для консоли
if (typeof window !== 'undefined') {
  (window as any).generateComments = generateCommentsForEpisode;
  (window as any).fillAllComments = fillAllEpisodesWithComments;
}
