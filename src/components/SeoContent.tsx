import { Card } from '@/components/ui/card';

const SeoContent = () => {
  return (
    <section className="py-16 bg-gray-900/50">
      <div className="container mx-auto px-4">
        <Card className="bg-gray-800/50 border-cyan-500/30 p-8">
          <h2 className="text-3xl font-bold text-cyan-400 mb-6">
            Смотреть Рик и Морти онлайн в хорошем качестве
          </h2>
          
          <div className="space-y-6 text-gray-300 leading-relaxed">
            <p>
              <strong className="text-white">Rick and Morty</strong> — культовый анимационный сериал для взрослых, созданный Дэном Хармоном и Джастином Ройландом. 
              На нашем сайте вы можете <strong className="text-cyan-400">смотреть все серии Рик и Морти онлайн бесплатно</strong> в HD качестве 
              с профессиональной русской озвучкой.
            </p>

            <p>
              Сериал рассказывает о приключениях гениального, но циничного ученого Рика Санчеса и его доброго, но легко поддающегося влиянию внука Морти Смита. 
              Вместе они путешествуют по бесконечным измерениям мультивселенной, попадая в опасные и абсурдные ситуации.
            </p>

            <h3 className="text-2xl font-bold text-purple-400 mt-8 mb-4">
              Почему стоит смотреть Рик и Морти у нас?
            </h3>

            <ul className="space-y-3 list-none">
              <li className="flex items-start gap-3">
                <span className="text-green-400 text-xl">✓</span>
                <span><strong>HD качество</strong> — все эпизоды доступны в высоком разрешении</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-400 text-xl">✓</span>
                <span><strong>Русская озвучка</strong> — профессиональный перевод и озвучивание</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-400 text-xl">✓</span>
                <span><strong>Без регистрации</strong> — начните смотреть прямо сейчас</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-400 text-xl">✓</span>
                <span><strong>Все сезоны</strong> — полная коллекция эпизодов от 1 до последнего сезона</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-400 text-xl">✓</span>
                <span><strong>Любые устройства</strong> — смотрите на компьютере, планшете или телефоне</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-400 text-xl">✓</span>
                <span><strong>Быстрая загрузка</strong> — никаких зависаний и задержек</span>
              </li>
            </ul>

            <h3 className="text-2xl font-bold text-purple-400 mt-8 mb-4">
              О сериале Rick and Morty
            </h3>

            <p>
              Анимационный сериал <strong>Рик и Морти</strong> впервые вышел на канале Adult Swim в 2013 году и мгновенно завоевал сердца миллионов зрителей. 
              Уникальное сочетание научной фантастики, черного юмора, философских размышлений и эмоциональных моментов делает его одним из лучших 
              мультсериалов современности.
            </p>

            <p>
              Каждый эпизод — это отдельное приключение, но при этом сериал имеет сквозную сюжетную линию и множество отсылок к предыдущим сериям. 
              Рик и Морти исследуют альтернативные вселенные, встречают странных существ, попадают в безумные ситуации и сталкиваются 
              с экзистенциальными вопросами о смысле жизни.
            </p>

            <h3 className="text-2xl font-bold text-purple-400 mt-8 mb-4">
              Главные герои
            </h3>

            <p>
              <strong className="text-cyan-400">Рик Санчез</strong> — гениальный ученый-алкоголик с травматическим прошлым. Несмотря на свой цинизм, 
              он глубоко заботится о своей семье, хотя и скрывает это.
            </p>

            <p>
              <strong className="text-cyan-400">Морти Смит</strong> — внук Рика, добрый и наивный подросток, который часто становится голосом разума 
              в безумных приключениях деда. Со временем он становится более уверенным и независимым.
            </p>

            <p className="text-sm text-gray-400 mt-8 border-t border-gray-700 pt-6">
              Смотрите Rick and Morty онлайн на нашем сайте — здесь собраны все серии всех сезонов с удобной навигацией, 
              описаниями эпизодов, интересными фактами и возможностью обсудить любимые моменты с другими фанатами сериала.
            </p>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default SeoContent;
