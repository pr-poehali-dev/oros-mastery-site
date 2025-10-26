import { Card } from '@/components/ui/card';

const BlogSeoContent = () => {
  return (
    <section className="py-16 bg-gray-900/50">
      <div className="container mx-auto px-4">
        <Card className="bg-gray-800/50 border-purple-500/30 p-8">
          <h2 className="text-3xl font-bold text-purple-400 mb-6">
            Блог о Рик и Морти: теории, разборы и анализ эпизодов
          </h2>
          
          <div className="space-y-6 text-gray-300 leading-relaxed">
            <p>
              Добро пожаловать в <strong className="text-white">блог фанатов Rick and Morty</strong>! Здесь мы публикуем 
              глубокие разборы эпизодов, невероятные теории о мультивселенной, анализ персонажей и обсуждение скрытых деталей, 
              которые вы могли пропустить при просмотре.
            </p>

            <h3 className="text-2xl font-bold text-cyan-400 mt-8 mb-4">
              Что вы найдете в блоге
            </h3>

            <ul className="space-y-3 list-none">
              <li className="flex items-start gap-3">
                <span className="text-green-400 text-xl">📝</span>
                <span><strong>Теории фанатов</strong> — самые интересные гипотезы о сюжете, персонажах и будущих сезонах</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-400 text-xl">🔍</span>
                <span><strong>Разбор эпизодов</strong> — детальный анализ каждой серии с объяснением отсылок и пасхалок</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-400 text-xl">🌌</span>
                <span><strong>Мультивселенная</strong> — исследование различных измерений и их обитателей</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-400 text-xl">👥</span>
                <span><strong>Персонажи</strong> — биографии, мотивация и развитие главных и второстепенных героев</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-400 text-xl">🔬</span>
                <span><strong>Научная фантастика</strong> — объяснение научных концепций, использованных в сериале</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-400 text-xl">🎬</span>
                <span><strong>За кадром</strong> — интересные факты о создании сериала и работе команды</span>
              </li>
            </ul>

            <h3 className="text-2xl font-bold text-cyan-400 mt-8 mb-4">
              Популярные темы блога
            </h3>

            <p>
              Наши читатели особенно любят статьи о <strong className="text-purple-400">теории Evil Morty</strong> и его планах, 
              разборы <strong className="text-purple-400">взаимоотношений Рика и Морти</strong>, объяснение концепции 
              <strong className="text-purple-400"> Центральной Кривой Конечности</strong> и анализ самых эмоциональных моментов сериала.
            </p>

            <p>
              Мы регулярно публикуем материалы о новых эпизодах сразу после их выхода, разбирая каждую деталь и обсуждая 
              возможные последствия для дальнейшего сюжета. Присоединяйтесь к обсуждениям в комментариях!
            </p>

            <h3 className="text-2xl font-bold text-cyan-400 mt-8 mb-4">
              Для кого этот блог
            </h3>

            <p>
              Наш блог создан для <strong className="text-cyan-400">настоящих фанатов</strong> Rick and Morty, которые хотят копнуть глубже 
              поверхностного сюжета. Если вы любите искать пасхалки, обсуждать теории и философию сериала — вы попали по адресу!
            </p>

            <p>
              Каждая статья написана с любовью к сериалу и вниманием к деталям. Мы стараемся находить то, что ускользает от глаз 
              обычного зрителя, и делиться этим с сообществом фанатов.
            </p>

            <h3 className="text-2xl font-bold text-cyan-400 mt-8 mb-4">
              Присоединяйтесь к сообществу
            </h3>

            <p>
              Читайте наши статьи, оставляйте комментарии, делитесь своими теориями! Каждое мнение важно, и вместе 
              мы раскрываем все тайны мультивселенной Рика и Морти.
            </p>

            <p className="text-sm text-gray-400 mt-8 border-t border-gray-700 pt-6">
              Новые статьи выходят регулярно. Подписывайтесь на обновления, чтобы не пропустить свежие разборы и теории о Rick and Morty!
            </p>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default BlogSeoContent;
