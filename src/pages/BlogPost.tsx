import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const articles: Record<string, any> = {
    '1': {
      id: 1,
      title: 'Топ-10 лучших эпизодов Rick and Morty',
      author: 'Рик Санчез',
      date: '15 окт 2024',
      readTime: '5 мин',
      image: 'https://cdn.poehali.dev/projects/f9f23ac4-7352-47dd-a4bb-81301617dd90/files/d490fe60-e1ff-4015-8de4-bb5defe289ae.jpg',
      tags: ['Episodes', 'Top', 'Review'],
      content: `
        <h2>Вступление</h2>
        <p>За пять сезонов Rick and Morty подарил нам десятки незабываемых эпизодов. Некоторые заставили нас смеяться до слёз, другие — задуматься о смысле жизни. Давайте разберём самые лучшие!</p>

        <h2>10. Pickle Rick (S3E3)</h2>
        <p>Классика жанра! Рик превращается в огурец, чтобы избежать семейной терапии. Этот эпизод стал мемом и показал, на что способен сериал в плане абсурдного юмора.</p>
        
        <h2>9. Total Rickall (S2E4)</h2>
        <p>Паразиты, которые создают ложные воспоминания — гениальная концепция. Мистер Пупырка стал одним из самых запоминающихся персонажей.</p>

        <h2>8. The Ricks Must Be Crazy (S2E6)</h2>
        <p>Рик создаёт целую вселенную в качестве батарейки для своей машины. Философская глубина и рекурсия на максимум!</p>

        <h2>7. Mortynight Run (S2E2)</h2>
        <p>Морти спасает газообразное существо, которое оказывается телепатом-убийцей. Этический дилемма и великолепная анимация.</p>

        <h2>6. Auto Erotic Assimilation (S2E3)</h2>
        <p>Рик встречает свою бывшую — коллективный разум. Один из самых грустных финалов в истории сериала.</p>

        <h2>5. Close Rick-Counters of the Rick Kind (S1E10)</h2>
        <p>Знакомство с Советом Риков и Evil Morty. Эпизод, который запустил главную сюжетную линию сериала.</p>

        <h2>4. Ricklantis Mixup (S3E7)</h2>
        <p>История Города Риков без участия главных героев. Политическая сатира и неожиданные повороты сюжета.</p>

        <h2>3. The Vat of Acid Episode (S4E8)</h2>
        <p>Морти получает пульт для сохранения реальности. Эмоциональная качеля с гениальной развязкой.</p>

        <h2>2. The Rickshank Rickdemption (S3E1)</h2>
        <p>Легендарная премьера третьего сезона. "Wubba Lubba Dub Dub" получило новое значение, а мем про соус стал вирусным.</p>

        <h2>1. Total Rickall (S2E4)</h2>
        <p>Абсолютный шедевр сериала. Философия, юмор, экшен и эмоции — всё в одном эпизоде. Именно за это мы любим Rick and Morty!</p>

        <h2>Заключение</h2>
        <p>Каждый эпизод Rick and Morty по-своему уникален. Какой ваш любимый? Напишите в комментариях!</p>
      `
    },
    '2': {
      id: 2,
      title: 'Теория мультивселенной в Rick and Morty',
      author: 'Морти Смит',
      date: '10 окт 2024',
      readTime: '8 мин',
      image: 'https://cdn.poehali.dev/projects/f9f23ac4-7352-47dd-a4bb-81301617dd90/files/54ad156d-f2d1-49cc-9d49-a0e720719998.jpg',
      tags: ['Theory', 'Science', 'Multiverse'],
      content: `
        <h2>Что такое мультивселенная?</h2>
        <p>Мультивселенная в Rick and Morty — это центральная концепция, которая позволяет сериалу исследовать бесконечное количество реальностей. Каждое решение создаёт новую ветку вселенной.</p>

        <h2>Научная основа</h2>
        <p>Теория многих миров Эверетта предполагает, что каждое квантовое событие создаёт параллельную вселенную. Rick and Morty доводит эту идею до абсурда, показывая бесконечные варианты одних и тех же персонажей.</p>

        <h2>Центральная Конечная Кривая</h2>
        <p>Это ограниченная часть мультивселенной, где во всех вселенных Рик является самым умным существом. Эта концепция объясняет, почему все Рики такие похожие.</p>

        <h2>Портальная пушка</h2>
        <p>Главный инструмент для путешествий между измерениями. Портальная пушка работает на "концентрированной тёмной материи" и может открывать проход в любую вселенную.</p>

        <h2>Философские последствия</h2>
        <p>Если существует бесконечное количество вселенных, то:</p>
        <ul>
          <li>Ничто не имеет значения (нигилизм Рика)</li>
          <li>Всегда есть запасная вселенная</li>
          <li>Каждое решение уже было принято в другой вселенной</li>
        </ul>

        <h2>Эмоциональная цена</h2>
        <p>Несмотря на бесконечные возможности, персонажи всё равно страдают. Это показывает, что эмоции важнее логики.</p>

        <h2>Совет Риков</h2>
        <p>Организация, объединяющая Риков из разных вселенных. Парадокс: самый умный человек создаёт правительство, хотя ненавидит власть.</p>

        <h2>Заключение</h2>
        <p>Мультивселенная в Rick and Morty — это не просто научная концепция, а способ исследования человеческой природы через призму бесконечности.</p>
      `
    },
    '3': {
      id: 3,
      title: 'Все пасхалки 5 сезона',
      author: 'Саммер Смит',
      date: '5 окт 2024',
      readTime: '6 мин',
      image: 'https://cdn.poehali.dev/projects/f9f23ac4-7352-47dd-a4bb-81301617dd90/files/b9f7c54d-44b3-419e-a414-f00ff618c62e.jpg',
      tags: ['Easter Eggs', 'Season 5', 'Details'],
      content: `
        <h2>Введение</h2>
        <p>Пятый сезон Rick and Morty оказался насыщенным отсылками к поп-культуре, предыдущим сезонам и просто скрытыми деталями. Давайте разберём их все!</p>

        <h2>Эпизод 1: "Mort Dinner Rick Andre"</h2>
        <p><strong>Отсылки к "Океану":</strong> Вся структура эпизода напоминает фильмы об ограблениях. Особенно "Одиннадцать друзей Оушена".</p>
        <p><strong>Мистер Нимбус:</strong> Его дизайн — пародия на Аквамена и Намора одновременно.</p>

        <h2>Эпизод 2: "Mortyplicity"</h2>
        <p><strong>Decoy families:</strong> Концепция вложенных копий отсылает к "Inception" и "The Prestige".</p>
        <p><strong>Squid people:</strong> Явная отсылка к Ктулху и лавкрафтовским ужасам.</p>

        <h2>Эпизод 3: "A Rickconvenient Mort"</h2>
        <p><strong>Планетина:</strong> Капитан Планета, но с тёмным поворотом. Экологический активизм доведённый до абсурда.</p>
        <p><strong>Дизайн кольца:</strong> Точная копия колец из оригинального мультика 90-х.</p>

        <h2>Эпизод 4: "Rickdependence Spray"</h2>
        <p><strong>Гигантские сперматозоиды:</strong> Пародия на фильмы-катастрофы про гигантских монстров.</p>
        <p><strong>Chud Cannons:</strong> Отсылка к фильму "C.H.U.D." 1984 года.</p>

        <h2>Эпизод 5: "Amortycan Grickfitti"</h2>
        <p><strong>Hellraiser box:</strong> Куб-трансформер явно вдохновлён конфигурацией Леманта.</p>
        <p><strong>80s aesthetic:</strong> Весь эпизод — ностальгия по фильмам 80-х.</p>

        <h2>Эпизод 8: "Rickternal Friendshine of the Spotless Mort"</h2>
        <p><strong>Название:</strong> Отсылка к фильму "Eternal Sunshine of the Spotless Mind".</p>
        <p><strong>Birdperson's mind:</strong> Визуальный стиль напоминает работы Дэна Хармона.</p>

        <h2>Эпизод 10: "Rickmurai Jack"</h2>
        <p><strong>Evil Morty возвращается:</strong> Финальное разрешение сюжетной линии, начатой в S1E10.</p>
        <p><strong>Breaking the curve:</strong> Разрушение Центральной Конечной Кривой — метафора выхода из зоны комфорта.</p>

        <h2>Общие пасхалки сезона</h2>
        <ul>
          <li>Появление персонажей из прошлых сезонов на фоне</li>
          <li>Отсылки к реальным научным теориям</li>
          <li>Пародии на современные события 2021 года</li>
          <li>Множество мемов из интернет-культуры</li>
        </ul>

        <h2>Заключение</h2>
        <p>Пятый сезон оказался одним из самых насыщенных отсылками. При повторном просмотре вы обязательно найдёте что-то новое!</p>
      `
    },
    '4': {
      id: 4,
      title: 'Эволюция персонажей за 5 сезонов',
      author: 'Бёрдперсон',
      date: '1 окт 2024',
      readTime: '10 мин',
      image: 'https://cdn.poehali.dev/projects/f9f23ac4-7352-47dd-a4bb-81301617dd90/files/d490fe60-e1ff-4015-8de4-bb5defe289ae.jpg',
      tags: ['Characters', 'Analysis', 'Development'],
      content: `
        <h2>Rick Sanchez: От бога к человеку</h2>
        <p><strong>Сезон 1:</strong> Рик предстаёт как всезнающий и всемогущий гений. Он решает любые проблемы наукой.</p>
        <p><strong>Сезон 2-3:</strong> Начинаем видеть трещины в его броне. Депрессия, алкоголизм и страх одиночества.</p>
        <p><strong>Сезон 4-5:</strong> Рик признаёт свои слабости и даже начинает ходить на терапию. Это огромный шаг для персонажа.</p>

        <h2>Morty Smith: Взросление</h2>
        <p><strong>Сезон 1:</strong> Наивный подросток, который просто следует за дедом.</p>
        <p><strong>Сезон 2-3:</strong> Становится увереннее, начинает сопротивляться Рику.</p>
        <p><strong>Сезон 4-5:</strong> Превращается в циничного подростка, который понимает абсурдность вселенной. "Evil Morty" — его тёмное отражение.</p>

        <h2>Summer Smith: От типичного подростка к воину</h2>
        <p><strong>Сезон 1:</strong> Популярная девушка, которая хочет внимания.</p>
        <p><strong>Сезон 2-3:</strong> Начинает участвовать в приключениях и показывает свою силу.</p>
        <p><strong>Сезон 4-5:</strong> Становится полноценным членом команды, иногда более компетентным, чем Морти.</p>

        <h2>Beth Smith: Поиск себя</h2>
        <p><strong>Сезон 1-2:</strong> Несчастная домохозяйка, ищущая одобрения отца.</p>
        <p><strong>Сезон 3:</strong> Кризис идентичности достигает пика. Рик предлагает ей клонирование.</p>
        <p><strong>Сезон 4-5:</strong> Beth принимает себя и начинает жить для себя, не для отца.</p>

        <h2>Jerry Smith: От лузера к... лузеру?</h2>
        <p><strong>Сезон 1-3:</strong> Классический неудачник, которого все презирают.</p>
        <p><strong>Сезон 4-5:</strong> Находит моменты триумфа и показывает неожиданную стойкость. Остаётся собой, несмотря на давление.</p>

        <h2>Birdperson/Phoenix Person</h2>
        <p>Трагическая арка персонажа: от лучшего друга Рика до киборга-противника и обратно к союзнику.</p>

        <h2>Evil Morty: Самый сложный персонаж</h2>
        <p>Появляется в S1E10 и возвращается в S5E10. Его мотивация — вырваться из тени Рика. Символизирует бунт против предопределённости.</p>

        <h2>Заключение</h2>
        <p>За пять сезонов персонажи Rick and Morty прошли невероятный путь развития. Это уже не просто мультик про деда-учёного и внука — это история о людях, которые пытаются найти смысл в абсурдной вселенной.</p>
      `
    },
    '5': {
      id: 5,
      title: 'Философия нигилизма в сериале',
      author: 'Мистер Мисикс',
      date: '28 сен 2024',
      readTime: '12 мин',
      image: 'https://cdn.poehali.dev/projects/f9f23ac4-7352-47dd-a4bb-81301617dd90/files/54ad156d-f2d1-49cc-9d49-a0e720719998.jpg',
      tags: ['Philosophy', 'Nihilism', 'Deep Dive'],
      content: `
        <h2>Что такое нигилизм?</h2>
        <p>Нигилизм — философская позиция, утверждающая отсутствие объективного смысла жизни. Rick and Morty исследует эту идею через призму научной фантастики.</p>

        <h2>Рик как воплощение нигилизма</h2>
        <p>Рик знает, что существует бесконечное количество вселенных. Это означает:</p>
        <ul>
          <li>Ничто не уникально</li>
          <li>Любое действие не имеет значения</li>
          <li>Смерть можно обратить, просто переместившись в другую вселенную</li>
        </ul>

        <h2>"Nobody exists on purpose"</h2>
        <p>Эта фраза Морти в эпизоде "Rixty Minutes" идеально отражает нигилистическую философию сериала. Если нет цели, то и стресс бессмысленен.</p>

        <h2>Бесконечность как проклятие</h2>
        <p>Рик несчастен именно потому, что понимает бесконечность. Когда всё возможно, ничто не имеет ценности.</p>

        <h2>Экзистенциализм vs Нигилизм</h2>
        <p>Морти представляет экзистенциалистский ответ на нигилизм Рика:</p>
        <ul>
          <li>Создавай свой собственный смысл</li>
          <li>Цени моменты, даже если они не вечны</li>
          <li>Связи с людьми важнее логики</li>
        </ul>

        <h2>"Wubba Lubba Dub Dub"</h2>
        <p>Казалось бы бессмысленная фраза на самом деле означает "I am in great pain, please help me" на языке птицелюдей. Рик прячет боль за абсурдом.</p>

        <h2>Терапия как противоядие</h2>
        <p>В эпизоде "Pickle Rick" доктор Вонг говорит Рику прямо в лицо: его интеллект — это способ избегать эмоций, а не решать проблемы.</p>

        <h2>Семья как якорь</h2>
        <p>Несмотря на весь нигилизм, Рик всегда возвращается к семье. Это показывает, что даже самый убеждённый нигилист нуждается в связях.</p>

        <h2>Мистер Мисикс: Буквальный экзистенциализм</h2>
        <p>"I was made to serve butter" → "Oh my god" → "Yeah, welcome to the club, pal"</p>
        <p>Эта сцена в двух репликах объясняет экзистенциальный кризис всего человечества.</p>

        <h2>Заключение: Оптимистический нигилизм</h2>
        <p>Rick and Morty предлагает третий путь: признать, что жизнь бессмысленна, но это освобождает нас создавать свой собственный смысл. Если ничто не имеет значения, значит всё зависит только от нас.</p>
      `
    },
    '6': {
      id: 6,
      title: 'Самые смешные моменты сериала',
      author: 'Джерри Смит',
      date: '25 сен 2024',
      readTime: '4 мин',
      image: 'https://cdn.poehali.dev/projects/f9f23ac4-7352-47dd-a4bb-81301617dd90/files/b9f7c54d-44b3-419e-a414-f00ff618c62e.jpg',
      tags: ['Funny', 'Best Moments', 'Comedy'],
      content: `
        <h2>10. "I'm Pickle Rick!" (S3E3)</h2>
        <p>Момент, когда Рик объявляет, что он огурец, стал легендарным мемом. Абсурдность ситуации доведена до максимума.</p>

        <h2>9. Мистер Мисикс и его экзистенциальный кризис (S1E9)</h2>
        <p>"What is my purpose?" — "You pass butter" — "Oh my god"</p>
        <p>Смешно и грустно одновременно. Классика!</p>

        <h2>8. Джерри и симулятор (S1E4)</h2>
        <p>Джерри застревает в симуляторе инопланетян и не может правильно ответить на вопросы. Его некомпетентность на пике!</p>

        <h2>7. "Show me what you got!" (S2E5)</h2>
        <p>Гигантские головы в небе требуют музыкального конкурса. Ice-T оказывается пришельцем. Что может быть лучше?</p>

        <h2>6. Рой: Вся жизнь в игре (S2E2)</h2>
        <p>Морти проживает целую жизнь в аркадной игре за 5 минут. "Roy" стал символом потерянного времени на видеоигры.</p>

        <h2>5. "Get Schwifty" (S2E5)</h2>
        <p>Рик и Морти пишут песню за 5 минут, чтобы спасти Землю. Результат — вирусный хит!</p>

        <h2>4. Anatomy Park (S1E3)</h2>
        <p>"Pirates of the Pancreas" — аттракцион внутри бездомного. Только в Rick and Morty!</p>

        <h2>3. Плутон — это планета (S1E9)</h2>
        <p>Джерри отстаивает статус Плутона как планеты и становится героем плутониан. Его триумф недолгий.</p>

        <h2>2. Fart (S2E2)</h2>
        <p>Газообразное существо по имени Fart поёт "Goodbye Moonmen". Джемайн Клемент великолепен в этой роли!</p>

        <h2>1. Ball Fondlers (S2E4)</h2>
        <p>Пародийное шоу внутри шоу. Название говорит само за себя!</p>

        <h2>Бонус: Лучшие фразы Рика</h2>
        <ul>
          <li>"Wubba Lubba Dub Dub!"</li>
          <li>"And that's the waaaaay the news goes!"</li>
          <li>"Grass... tastes bad!"</li>
          <li>"Rikki-Tikki-Tavi, biatch!"</li>
        </ul>

        <h2>Заключение</h2>
        <p>Rick and Morty умудряется быть смешным на всех уровнях: от грубого юмора до тонкой сатиры. Какой момент рассмешил вас больше всего?</p>
      `
    },
    '7': {
      id: 7,
      title: 'Научная достоверность изобретений Рика',
      author: 'Доктор Вонг',
      date: '20 сен 2024',
      readTime: '9 мин',
      image: 'https://cdn.poehali.dev/projects/f9f23ac4-7352-47dd-a4bb-81301617dd90/files/d490fe60-e1ff-4015-8de4-bb5defe289ae.jpg',
      tags: ['Science', 'Technology', 'Physics'],
      content: `
        <h2>Портальная пушка: Физика червоточин</h2>
        <p><strong>В сериале:</strong> Мгновенное путешествие между вселенными.</p>
        <p><strong>В реальности:</strong> Червоточины теоретически возможны по общей теории относительности Эйнштейна, но требуют экзотической материи с отрицательной энергией.</p>
        <p><strong>Вердикт:</strong> 30% реально. Концепция существует, но практическая реализация невозможна с текущими технологиями.</p>

        <h2>Батарейка Рика: Miniverse</h2>
        <p><strong>В сериале:</strong> Целая вселенная в качестве источника энергии.</p>
        <p><strong>В реальности:</strong> Нарушает первый закон термодинамики (сохранение энергии).</p>
        <p><strong>Вердикт:</strong> 5% реально. Хотя идея сферы Дайсона (использование всей энергии звезды) похожа.</p>

        <h2>Масштабирующий луч</h2>
        <p><strong>В сериале:</strong> Изменение размера объектов без изменения массы.</p>
        <p><strong>В реальности:</strong> Квадратно-кубический закон делает это невозможным. Большие существа раздавят себя под собственным весом.</p>
        <p><strong>Вердикт:</strong> 10% реально. Квантовое изменение размера частиц теоретически возможно.</p>

        <h2>Love Potion</h2>
        <p><strong>В сериале:</strong> Химическое вещество, вызывающее любовь.</p>
        <p><strong>В реальности:</strong> Окситоцин и дофамин влияют на привязанность, но не вызывают мгновенную любовь.</p>
        <p><strong>Вердикт:</strong> 40% реально. Феромоны и гормоны действительно влияют на влечение.</p>

        <h2>Межпространственные кабели</h2>
        <p><strong>В сериале:</strong> Телевидение из других измерений.</p>
        <p><strong>В реальности:</strong> Квантовая запутанность позволяет передачу информации, но не видео в реальном времени.</p>
        <p><strong>Вердикт:</strong> 20% реально. Концепция многомировой интерпретации квантовой механики реальна.</p>

        <h2>Meeseeks Box</h2>
        <p><strong>В сериале:</strong> Создание существ из ниоткуда с единственной целью.</p>
        <p><strong>В реальности:</strong> Нарушает закон сохранения массы и энергии.</p>
        <p><strong>Вердикт:</strong> 1% реально. Разве что ИИ с узкой специализацией.</p>

        <h2>Freeze Ray</h2>
        <p><strong>В сериале:</strong> Мгновенная заморозка объектов.</p>
        <p><strong>В реальности:</strong> Существуют криогенные технологии, но они требуют времени.</p>
        <p><strong>Вердикт:</strong> 50% реально. Лазеры охлаждения существуют в лабораториях.</p>

        <h2>Клонирование</h2>
        <p><strong>В сериале:</strong> Быстрое создание полных копий с памятью.</p>
        <p><strong>В реальности:</strong> Клонирование возможно (овечка Долли), но переноса памяти нет.</p>
        <p><strong>Вердикт:</strong> 60% реально для тела, 0% для памяти.</p>

        <h2>Заключение</h2>
        <p>Большинство изобретений Рика основаны на реальных научных концепциях, но доведены до абсурда. Создатели сериала консультируются с учёными, чтобы технобабл звучал убедительно!</p>
      `
    },
    '8': {
      id: 8,
      title: 'Все альтернативные версии Рика',
      author: 'Рик Прайм',
      date: '15 сен 2024',
      readTime: '7 мин',
      image: 'https://cdn.poehali.dev/projects/f9f23ac4-7352-47dd-a4bb-81301617dd90/files/54ad156d-f2d1-49cc-9d49-a0e720719998.jpg',
      tags: ['Rick', 'Multiverse', 'Characters'],
      content: `
        <h2>Rick C-137: Наш главный Рик</h2>
        <p>Самый умный Рик в Центральной Конечной Кривой. Изобрёл портальное путешествие и потерял семью из-за другого Рика.</p>

        <h2>Rick Prime: Убийца жены Рика</h2>
        <p>Тот, кто убил Бет и Диану C-137. Запустил всю историю о мести. Появляется в финале 5 сезона.</p>

        <h2>Simple Rick</h2>
        <p>Рик, который выбрал семью вместо науки. Его счастливые воспоминания используются для производства конфет.</p>

        <h2>Doofus Rick (J19ζ7)</h2>
        <p>Добрый и наивный Рик, которого все считают дураком. Ест собственные какашки (по словам нашего Рика).</p>

        <h2>Cowboy Rick</h2>
        <p>Рик из измерения, застрявшего в эпохе Дикого Запада. Носит ковбойскую шляпу и стреляет из портальной пушки-кольта.</p>

        <h2>Cop Rick</h2>
        <p>Работает детективом в полиции Цитадели. Главный персонаж эпизода "Tales from the Citadel".</p>

        <h2>Teacher Rick</h2>
        <p>Преподаёт в школе для Морти в Цитадели. Разочаровался в системе.</p>

        <h2>Tiny Rick</h2>
        <p>Клон нашего Рика в теле подростка. "I'm Tiny Rick!" стал мемом, но на самом деле это был крик о помощи.</p>

        <h2>Toxic Rick</h2>
        <p>Отделённая токсичная часть личности Рика. Представляет все его худшие качества.</p>

        <h2>Healthy Rick</h2>
        <p>Вторая половина после разделения. Показывает, что даже "хорошая" версия Рика эгоистична.</p>

        <h2>Wasp Rick</h2>
        <p>Рик-оса из измерения, где люди эволюционировали от насекомых. Умер от рук Cop Rick.</p>

        <h2>Rick D-99</h2>
        <p>Появляется в "Close Rick-counters of the Rick Kind". Один из первых альтернативных Риков.</p>

        <h2>Президент Морти (Evil Morty)</h2>
        <p>Технически не Рик, но управлял Цитаделью. Единственный Морти умнее любого Рика.</p>

        <h2>Заключение</h2>
        <p>Каждая версия Рика показывает, каким он мог бы быть при других обстоятельствах. Но все они несчастны по-своему — доказательство, что проблема не в обстоятельствах, а в самом Рике.</p>
      `
    },
    '9': {
      id: 9,
      title: 'Скрытые отсылки к классике sci-fi',
      author: 'Саммер Смит',
      date: '10 сен 2024',
      readTime: '8 мин',
      image: 'https://cdn.poehali.dev/projects/f9f23ac4-7352-47dd-a4bb-81301617dd90/files/b9f7c54d-44b3-419e-a414-f00ff618c62e.jpg',
      tags: ['References', 'Sci-Fi', 'Easter Eggs'],
      content: `
        <h2>"Back to the Future"</h2>
        <p><strong>Очевидно:</strong> Весь сериал — пародия на "Назад в будущее". Рик = Док, Морти = Марти.</p>
        <p><strong>Детали:</strong> Портальная пушка работает как DeLorean, но вместо времени путешествуют между мирами.</p>

        <h2>"Doctor Who"</h2>
        <p><strong>ТАРДИС:</strong> Способность Рика путешествовать куда угодно похожа на ТАРДИС.</p>
        <p><strong>"Wibbly wobbly timey wimey":</strong> Подход к времени и реальности очень похож.</p>

        <h2>"Alien"</h2>
        <p><strong>Facehuggers:</strong> В эпизоде "Raising Gazorpazorp" появляются похожие существа.</p>
        <p><strong>Body horror:</strong> Общая эстетика инопланетной угрозы.</p>

        <h2>"The Matrix"</h2>
        <p><strong>"Roy" (S2E2):</strong> Симуляция жизни в аркадной игре — прямая отсылка к концепции Матрицы.</p>
        <p><strong>Красная vs Синяя таблетка:</strong> Выбор между правдой и неведением.</p>

        <h2>"Inception"</h2>
        <p><strong>"Lawnmower Dog" (S1E2):</strong> Многоуровневые сны Морти-стиль.</p>
        <p><strong>Вложенность реальностей:</strong> Структура эпизода копирует фильм Нолана.</p>

        <h2>"The Thing"</h2>
        <p><strong>"Total Rickall" (S2E4):</strong> Паразиты, которые мимикрируют под людей.</p>
        <p><strong>Паранойя:</strong> Кто настоящий, а кто — паразит?</p>

        <h2>"Fantastic Voyage"</h2>
        <p><strong>"Anatomy Park" (S1E3):</strong> Весь эпизод — отсылка к путешествию внутри тела.</p>
        <p><strong>"Pirates of the Pancreas":</strong> Абсурдная версия образовательного тура.</p>

        <h2>"Blade Runner"</h2>
        <p><strong>Синтетики:</strong> Роботы и синты в Rick and Morty похожи на репликантов.</p>
        <p><strong>Philosophical questions:</strong> Что делает человека человеком?</p>

        <h2>"Star Wars"</h2>
        <p><strong>"The Rickchurian Mortydate":</strong> Битва на световых мечах (типа).</p>
        <p><strong>Империя зла:</strong> Галактическая Федерация = Империя.</p>

        <h2>"2001: A Space Odyssey"</h2>
        <p><strong>Monoliths:</strong> Загадочные артефакты появляются в нескольких эпизодах.</p>
        <p><strong>Космическая одиссея:</strong> Философский подход к исследованию космоса.</p>

        <h2>"Dune"</h2>
        <p><strong>"Get Schwifty":</strong> Песчаная планета с гигантскими червями.</p>
        <p><strong>Spice:</strong> Рик использует вещества, расширяющие сознание.</p>

        <h2>"Hitchhiker's Guide to the Galaxy"</h2>
        <p><strong>Абсурдность вселенной:</strong> Общий тон и юмор очень похожи.</p>
        <p><strong>"42":</strong> Несколько раз упоминается в фоновых деталях.</p>

        <h2>Заключение</h2>
        <p>Rick and Morty — это любовное письмо всей научной фантастике. Создатели не просто копируют классику, а переосмысливают её через призму современного цинизма и постмодернизма.</p>
      `
    }
  };

  const article = articles[id || '1'];

  if (!article) {
    navigate('/blog');
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white">
      <section className="relative py-12 bg-gradient-to-br from-cyan-600 via-green-500 to-blue-600">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30"></div>
        
        <div className="container relative z-10 px-4">
          <Button 
            variant="ghost" 
            className="mb-6 text-white hover:text-white hover:bg-white/20"
            onClick={() => navigate('/blog')}
          >
            <Icon name="ArrowLeft" className="mr-2" size={20} />
            Назад к статьям
          </Button>
        </div>
      </section>

      <section className="py-12">
        <div className="container px-4">
          <article className="max-w-4xl mx-auto">
            <div className="mb-8">
              <div className="flex flex-wrap gap-2 mb-4 animate-fade-in">
                {article.tags.map((tag: string, idx: number) => (
                  <Badge key={idx} className="bg-cyan-400/20 text-cyan-400 border-cyan-400/50">
                    {tag}
                  </Badge>
                ))}
              </div>

              <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
                {article.title}
              </h1>

              <div className="flex items-center gap-6 text-gray-400 mb-8 animate-fade-in">
                <div className="flex items-center gap-2">
                  <Icon name="User" size={18} />
                  <span>{article.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Calendar" size={18} />
                  <span>{article.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Clock" size={18} />
                  <span>{article.readTime}</span>
                </div>
              </div>

              <div className="relative aspect-video rounded-2xl overflow-hidden mb-8 animate-scale-in">
                <img 
                  src={article.image} 
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60"></div>
              </div>
            </div>

            <Card className="bg-gray-800 border-gray-700 animate-fade-in">
              <CardContent className="prose prose-invert max-w-none p-8 md:p-12">
                <div 
                  className="article-content"
                  dangerouslySetInnerHTML={{ __html: article.content }}
                  style={{
                    fontSize: '1.125rem',
                    lineHeight: '1.75rem'
                  }}
                />
              </CardContent>
            </Card>

            <div className="mt-12 flex gap-4">
              <Button 
                className="flex-1 bg-green-400 text-gray-900 hover:bg-green-300 font-bold"
                onClick={() => navigate('/blog')}
              >
                <Icon name="ArrowLeft" className="mr-2" size={18} />
                Все статьи
              </Button>
              <Button 
                className="flex-1 bg-cyan-400 text-gray-900 hover:bg-cyan-300 font-bold"
                onClick={() => navigate('/')}
              >
                <Icon name="Home" className="mr-2" size={18} />
                На главную
              </Button>
            </div>
          </article>
        </div>
      </section>

      <style>{`
        .article-content h2 {
          font-size: 2rem;
          font-weight: 700;
          margin-top: 2rem;
          margin-bottom: 1rem;
          color: #22d3ee;
        }
        
        .article-content h3 {
          font-size: 1.5rem;
          font-weight: 600;
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
          color: #34d399;
        }
        
        .article-content p {
          margin-bottom: 1.25rem;
          color: #d1d5db;
        }
        
        .article-content ul, .article-content ol {
          margin-bottom: 1.25rem;
          padding-left: 2rem;
          color: #d1d5db;
        }
        
        .article-content li {
          margin-bottom: 0.5rem;
        }
        
        .article-content strong {
          color: #22d3ee;
          font-weight: 600;
        }
        
        .article-content a {
          color: #34d399;
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
};

export default BlogPost;
