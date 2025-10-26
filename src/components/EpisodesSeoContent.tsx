import { Card } from '@/components/ui/card';

interface EpisodesSeoContentProps {
  season?: string;
  episodesCount: number;
}

const EpisodesSeoContent = ({ season, episodesCount }: EpisodesSeoContentProps) => {
  const isAllSeasons = season === 'all' || !season;

  return (
    <section className="py-16 bg-gray-900/50">
      <div className="container mx-auto px-4">
        <Card className="bg-gray-800/50 border-cyan-500/30 p-8">
          {isAllSeasons ? (
            <>
              <h2 className="text-3xl font-bold text-cyan-400 mb-6">
                Полный каталог эпизодов Рик и Морти
              </h2>
              
              <div className="space-y-6 text-gray-300 leading-relaxed">
                <p>
                  На этой странице собраны <strong className="text-white">все {episodesCount} эпизодов</strong> культового анимационного сериала 
                  <strong className="text-cyan-400"> Rick and Morty</strong>. Каждая серия доступна для просмотра онлайн в HD качестве 
                  с подробным описанием, рейтингом и возможностью оставить комментарий.
                </p>

                <h3 className="text-2xl font-bold text-purple-400 mt-8 mb-4">
                  Как пользоваться каталогом
                </h3>

                <ul className="space-y-3 list-none">
                  <li className="flex items-start gap-3">
                    <span className="text-green-400 text-xl">✓</span>
                    <span><strong>Фильтр по сезонам</strong> — выберите нужный сезон для быстрого поиска</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-400 text-xl">✓</span>
                    <span><strong>Поиск</strong> — найдите эпизод по названию или описанию</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-400 text-xl">✓</span>
                    <span><strong>Рейтинги</strong> — смотрите оценки других зрителей</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-400 text-xl">✓</span>
                    <span><strong>История просмотра</strong> — отслеживайте просмотренные серии</span>
                  </li>
                </ul>

                <h3 className="text-2xl font-bold text-purple-400 mt-8 mb-4">
                  Популярные эпизоды сериала
                </h3>

                <p>
                  Среди фанатов особенно выделяются такие эпизоды как <strong>"Огурчик Рик"</strong> (3 сезон 3 серия), 
                  где Рик превращает себя в огурец, <strong>"Свадебные корки"</strong> (2 сезон 6 серия) с невероятно эмоциональной 
                  сюжетной линией, и <strong>"Межпространственный кабель"</strong> серии, полные импровизации и абсурдного юмора.
                </p>

                <p>
                  Каждый сезон Rick and Morty содержит 10-11 эпизодов, полных научной фантастики, черного юмора и философских размышлений. 
                  От первого сезона 2013 года до последних выпусков — здесь вы найдете все серии с удобной навигацией.
                </p>

                <h3 className="text-2xl font-bold text-purple-400 mt-8 mb-4">
                  Что особенного в Rick and Morty
                </h3>

                <p>
                  Сериал отличается <strong className="text-cyan-400">умным сценарием</strong>, где каждая серия может быть как отдельной историей, 
                  так и частью большой повествовательной арки. Авторы не боятся поднимать сложные темы: экзистенциализм, семейные отношения, 
                  последствия выбора и природу реальности.
                </p>

                <p>
                  Анимация, юмор и неожиданные повороты сюжета делают каждый эпизод уникальным. Именно поэтому фанаты пересматривают 
                  любимые серии снова и снова, находя новые детали и пасхалки.
                </p>

                <p className="text-sm text-gray-400 mt-8 border-t border-gray-700 pt-6">
                  Выберите любой эпизод из каталога выше и погрузитесь в безумные приключения Рика и Морти. 
                  Новые серии добавляются сразу после выхода с профессиональной русской озвучкой.
                </p>
              </div>
            </>
          ) : (
            <>
              <h2 className="text-3xl font-bold text-cyan-400 mb-6">
                Эпизоды {season} сезона Рик и Морти
              </h2>
              
              <div className="space-y-6 text-gray-300 leading-relaxed">
                <p>
                  <strong className="text-white">{season} сезон</strong> сериала Rick and Morty включает {episodesCount} эпизодов, 
                  каждый из которых доступен для просмотра онлайн в HD качестве с русской озвучкой. 
                  Здесь собраны все серии сезона с описаниями, рейтингами и датами выхода.
                </p>

                <h3 className="text-2xl font-bold text-purple-400 mt-8 mb-4">
                  О {season} сезоне
                </h3>

                <p>
                  Каждый сезон Рик и Морти развивает сюжетные линии персонажей, добавляет новых существ из мультивселенной 
                  и поднимает философские вопросы. {season} сезон не исключение — здесь вас ждут новые приключения, 
                  неожиданные повороты и фирменный юмор Adult Swim.
                </p>

                <p>
                  Все эпизоды {season} сезона можно смотреть в любом порядке, но мы рекомендуем начать с первой серии, 
                  чтобы не пропустить важные сюжетные детали и развитие персонажей.
                </p>

                <h3 className="text-2xl font-bold text-purple-400 mt-8 mb-4">
                  Как смотреть {season} сезон
                </h3>

                <ul className="space-y-3 list-none">
                  <li className="flex items-start gap-3">
                    <span className="text-green-400 text-xl">✓</span>
                    <span>Выберите эпизод из списка выше</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-400 text-xl">✓</span>
                    <span>Нажмите на карточку эпизода для просмотра</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-400 text-xl">✓</span>
                    <span>Смотрите онлайн без регистрации и скачивания</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-400 text-xl">✓</span>
                    <span>Оставьте свой рейтинг и комментарий после просмотра</span>
                  </li>
                </ul>

                <p className="text-sm text-gray-400 mt-8 border-t border-gray-700 pt-6">
                  Приятного просмотра {season} сезона Рик и Морти! Каждый эпизод откроет новые грани мультивселенной.
                </p>
              </div>
            </>
          )}
        </Card>
      </div>
    </section>
  );
};

export default EpisodesSeoContent;
