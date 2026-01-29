import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import Breadcrumbs from '@/components/Breadcrumbs';
import SEO from '@/components/SEO';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import FAQ from '@/components/FAQ';

const About = () => {
  const stats = [
    { icon: 'BookOpen', value: '100+', label: 'Статей в блоге' },
    { icon: 'Film', value: '500+', label: 'Эпизодов с описаниями' },
    { icon: 'Users', value: '50+', label: 'Персонажей' },
    { icon: 'Globe', value: '20+', label: 'Вселенных' },
    { icon: 'Lightbulb', value: '75+', label: 'Теорий фанатов' },
    { icon: 'Heart', value: '10,000+', label: 'Активных фанатов' }
  ];

  const features = [
    {
      icon: 'Film',
      title: 'База эпизодов',
      description: 'Полная коллекция всех эпизодов Rick and Morty с детальными описаниями, датами выхода и возможностью просмотра онлайн.'
    },
    {
      icon: 'BookOpen',
      title: 'Тематический блог',
      description: 'Глубокие аналитические статьи о сюжете, персонажах, философии и научных концепциях сериала от опытных авторов и фанатов.'
    },
    {
      icon: 'Lightbulb',
      title: 'Теории и разборы',
      description: 'Исследования мультивселенной, научные объяснения технологий Рика и философские аспекты сериала с подробными разборами.'
    },
    {
      icon: 'Users',
      title: 'Энциклопедия персонажей',
      description: 'Подробная информация о всех персонажах сериала - от главных героев до второстепенных персонажей из разных вселенных.'
    },
    {
      icon: 'Globe',
      title: 'Мультивселенная',
      description: 'Карта известных вселенных Rick and Morty с описанием их особенностей, важных событий и связей между измерениями.'
    },
    {
      icon: 'MessageCircle',
      title: 'Сообщество',
      description: 'Активное русскоязычное сообщество фанатов для обсуждения теорий, обмена мнениями и участия в дискуссиях о сериале.'
    }
  ];

  const faqItems = [
    {
      question: 'Что такое Rick and Morty Fan Site?',
      answer: 'Это крупнейший русскоязычный фан-портал, посвященный культовому мультсериалу Rick and Morty. Мы предоставляем полную информацию об эпизодах, персонажах, вселенных, а также публикуем аналитические статьи, теории и обзоры.'
    },
    {
      question: 'Откуда берется информация на сайте?',
      answer: 'Информация собирается из официальных источников Adult Swim, интервью с создателями, а также создается нашей командой авторов и активными участниками сообщества. Все статьи проходят проверку на достоверность.'
    },
    {
      question: 'Можно ли смотреть эпизоды на вашем сайте?',
      answer: 'Мы предоставляем детальную информацию о каждом эпизоде, включая описания, даты выхода и аналитику. Для некоторых эпизодов доступны официальные плееры от правообладателей.'
    },
    {
      question: 'Как я могу внести свой вклад в развитие сайта?',
      answer: 'Вы можете написать статью для блога, предложить свою теорию, сообщить об ошибке или присоединиться к обсуждениям в нашем Telegram-сообществе. Свяжитесь с нами через страницу контактов.'
    },
    {
      question: 'Сайт является официальным?',
      answer: 'Нет, это независимый фан-проект, созданный поклонниками сериала для поклонников. Мы не аффилированы с Adult Swim, Cartoon Network или создателями сериала.'
    },
    {
      question: 'Как часто обновляется контент?',
      answer: 'Мы регулярно добавляем новые статьи в блог (2-3 раза в неделю), обновляем информацию о новых эпизодах сразу после их выхода и публикуем теории фанатов по мере их поступления.'
    },
    {
      question: 'Можно ли использовать материалы сайта?',
      answer: 'Материалы сайта защищены авторским правом. Для использования контента в некоммерческих целях с указанием источника свяжитесь с нами. Коммерческое использование требует письменного разрешения.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      <Navigation />
      <div className="pt-20">
        <Breadcrumbs />
      </div>
      
      <SEO
        title="О сайте Rick and Morty - крупнейший русскоязычный фан-портал о Рике и Морти"
        description="Узнайте о крупнейшем русскоязычном фан-портале о мультсериале Рик и Морти. Полная база всех эпизодов, аналитические статьи, фанатские теории, энциклопедия персонажей, каталог вселенных и активное сообщество фанатов Rick and Morty. Наша миссия, история и возможности сайта."
        keywords="Рик и Морти сайт, Rick and Morty фан-портал, о сайте, русскоязычный портал, фан-сайт, сообщество фанатов, база эпизодов, блог о сериале, теории фанатов, Adult Swim"
      />

      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="w-24 h-24 rounded-full bg-gradient-to-r from-cyan-500 to-green-500 flex items-center justify-center animate-pulse">
              <Icon name="Rocket" size={48} className="text-white" />
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-green-400 mb-6">
            О Рик и Морти фан-сайт
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Крупнейший русскоязычный портал для поклонников культового мультсериала Рик и Морти. 
            Мы объединяем фанатов, предоставляем актуальную информацию и создаем площадку для обсуждения 
            самого умного и безумного сериала во всей мультивселенной.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-16">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-gray-800/50 border-cyan-500/30 hover:border-cyan-500 transition-all hover:scale-105">
              <CardContent className="p-6 text-center">
                <Icon name={stat.icon as any} size={32} className="text-cyan-400 mx-auto mb-3" />
                <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Mission */}
        <Card className="bg-gradient-to-r from-cyan-900/20 to-green-900/20 border-cyan-500/50 mb-16">
          <CardContent className="p-8 md:p-12">
            <div className="flex items-start gap-4 mb-6">
              <Icon name="Target" size={40} className="text-cyan-400 flex-shrink-0" />
              <div>
                <h2 className="text-3xl font-bold text-white mb-4">Наша миссия</h2>
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  Быть лучшим русскоязычным ресурсом о Рик и Морти, предоставляя фанатам полную информацию 
                  о сериале, платформу для обсуждений и глубокого анализа. Мы стремимся создать пространство, 
                  где каждый поклонник сериала может найти единомышленников, узнать что-то новое и поделиться 
                  своими мыслями о мультивселенной Рика и Морти.
                </p>
                <p className="text-gray-300 text-lg leading-relaxed">
                  Наша команда состоит из преданных фанатов, которые тщательно изучают каждый эпизод, 
                  анализируют научные концепции, философские идеи и создают качественный контент для сообщества. 
                  Мы верим, что Rick and Morty - это больше, чем просто развлечение, это произведение искусства, 
                  заслуживающее серьезного подхода и внимания.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* What We Offer */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-white mb-8 flex items-center gap-3">
            <Icon name="Star" size={36} className="text-cyan-400" />
            Что мы предлагаем
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="bg-gray-800/50 border-gray-700 hover:border-cyan-500/50 transition-all group">
                <CardContent className="p-6">
                  <div className="w-14 h-14 rounded-full bg-cyan-500/20 flex items-center justify-center mb-4 group-hover:bg-cyan-500/30 transition-colors">
                    <Icon name={feature.icon as any} size={28} className="text-cyan-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* SEO Content Section */}
        <div className="max-w-4xl mx-auto mb-16 text-gray-200 bg-gray-800/30 rounded-lg p-8">
          <h2 className="text-3xl font-bold mb-6 text-white">Почему наш сайт - лучший для фанатов Rick and Morty?</h2>
          
          <p className="mb-4 text-lg leading-relaxed">
            Мы - **крупнейший русскоязычный портал** о культовом мультсериале Рик и Морти. 
            Наша цель - создать единое пространство, где каждый фанат сможет найти всю информацию о сериале, обсудить теории и поделиться мнением.
          </p>

          <h3 className="text-2xl font-semibold mb-4 text-cyan-400 flex items-center">
            <Icon name="Database" size={24} className="mr-2" />
            Что вы найдёте на нашем сайте?
          </h3>
          
          <ul className="space-y-3 mb-6">
            <li className="flex items-start">
              <Icon name="Check" size={20} className="mr-2 mt-1 text-cyan-400 flex-shrink-0" />
              <span><strong className="text-white">Полная база эпизодов:</strong> Все серии всех сезонов с подробными описаниями, датами выхода и рейтингами</span>
            </li>
            <li className="flex items-start">
              <Icon name="Check" size={20} className="mr-2 mt-1 text-cyan-400 flex-shrink-0" />
              <span><strong className="text-white">Аналитический блог:</strong> Глубокие разборы эпизодов, анализ персонажей, научные концепции и философские размышления</span>
            </li>
            <li className="flex items-start">
              <Icon name="Check" size={20} className="mr-2 mt-1 text-cyan-400 flex-shrink-0" />
              <span><strong className="text-white">База теорий:</strong> Самые невероятные фанатские теории с доказательствами и разгадками тайн Evil Morty</span>
            </li>
            <li className="flex items-start">
              <Icon name="Check" size={20} className="mr-2 mt-1 text-cyan-400 flex-shrink-0" />
              <span><strong className="text-white">Энциклопедия персонажей:</strong> Подробные биографии Рика, Морти, Саммер, семьи Смитов и сотен других героев</span>
            </li>
            <li className="flex items-start">
              <Icon name="Check" size={20} className="mr-2 mt-1 text-cyan-400 flex-shrink-0" />
              <span><strong className="text-white">Каталог вселенных:</strong> Полный гид по мультивселенной с описанием всех измерений, посещённых Риком и Морти</span>
            </li>
            <li className="flex items-start">
              <Icon name="Check" size={20} className="mr-2 mt-1 text-cyan-400 flex-shrink-0" />
              <span><strong className="text-white">Активное сообщество:</strong> Общайтесь с другими фанатами, делитесь теориями и мнениями о сериале</span>
            </li>
          </ul>

          <h3 className="text-2xl font-semibold mb-4 text-cyan-400 flex items-center">
            <Icon name="Users" size={24} className="mr-2" />
            Для кого этот сайт?
          </h3>
          
          <p className="mb-4">
            **Для всех поклонников Rick and Morty** — от новичков, которые только начинают знакомиться с сериалом, до опытных фанатов, которые знают наизусть каждый эпизод. 
            Мы создали удобную платформу с поиском, фильтрами и структурированной информацией, чтобы каждый мог легко найти нужное.
          </p>

          <div className="bg-cyan-900/20 border border-cyan-500/30 rounded-lg p-4 mt-6">
            <p className="text-sm flex items-start">
              <Icon name="Heart" size={18} className="mr-2 mt-0.5 text-cyan-400 flex-shrink-0" />
              <span><strong>Наша миссия:</strong> Быть лучшим русскоязычным ресурсом о Рике и Морти, предоставляя полную информацию о сериале и платформу для общения фанатов!</span>
            </p>
          </div>
        </div>

        {/* Our Story */}
        <Card className="bg-gray-800/50 border-gray-700 mb-16">
          <CardContent className="p-8 md:p-12">
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <Icon name="BookMarked" size={32} className="text-cyan-400" />
              Наша история
            </h2>
            <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
              <p>
                Rick and Morty Fan Site был создан в 2024 году группой энтузиастов, которые заметили отсутствие 
                качественного русскоязычного ресурса о сериале. Мы начали с простой базы эпизодов и небольшого блога, 
                но благодаря поддержке сообщества быстро выросли в крупнейший фан-портал.
              </p>
              <p>
                За время существования проекта мы опубликовали сотни статей, проанализировали все эпизоды, 
                создали энциклопедию персонажей и вселенных, а также собрали активное сообщество тысяч фанатов. 
                Каждый день десятки тысяч людей посещают наш сайт в поисках информации, обсуждений и новых теорий.
              </p>
              <p>
                Мы продолжаем развиваться и добавлять новые функции. В наших планах - интерактивная карта мультивселенной, 
                система рейтингов эпизодов от сообщества, подкасты с обсуждениями и многое другое. 
                Присоединяйтесь к нашему путешествию через бесконечные вселенные Rick and Morty!
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Team Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
            <Icon name="Shield" size={32} className="text-cyan-400" />
            Наши ценности
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Icon name="CheckCircle" size={24} className="text-green-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Качество контента</h3>
                    <p className="text-gray-300">
                      Мы тщательно проверяем все публикации, следим за достоверностью информации и 
                      стремимся создавать только качественный и полезный контент для наших читателей.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Icon name="Users" size={24} className="text-cyan-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Сообщество</h3>
                    <p className="text-gray-300">
                      Мы ценим каждого участника нашего сообщества и создаем дружелюбную атмосферу 
                      для обсуждений, обмена мнениями и коллективного изучения вселенной Rick and Morty.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Icon name="Zap" size={24} className="text-yellow-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Инновации</h3>
                    <p className="text-gray-300">
                      Постоянно внедряем новые функции и технологии, чтобы сделать взаимодействие 
                      с сайтом максимально удобным и интересным для пользователей.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Icon name="Heart" size={24} className="text-red-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Страсть к сериалу</h3>
                    <p className="text-gray-300">
                      Мы сами большие фанаты Rick and Morty и вкладываем душу в каждую статью, 
                      каждое описание и каждую деталь нашего проекта.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ */}
        <div className="mb-16">
          <FAQ items={faqItems} title="Часто задаваемые вопросы" />
        </div>

        {/* CTA */}
        <Card className="bg-gradient-to-r from-cyan-500/10 to-green-500/10 border-cyan-500/50">
          <CardContent className="p-8 md:p-12 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Следите за новостями в соцсетях!</h2>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
              Подписывайтесь на наши страницы, чтобы быть в курсе последних новостей, теорий и обновлений о Rick and Morty.
            </p>
            <div className="flex gap-4 justify-center">
              <a 
                href="https://t.me/wubbaRickAndMorty" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center w-20 h-20 rounded-2xl bg-gray-800 hover:bg-cyan-500/20 border border-cyan-500/30 hover:border-cyan-500 text-cyan-400 transition-all group"
                title="Telegram"
              >
                <Icon name="Send" size={28} className="mb-1 group-hover:scale-110 transition-transform" />
                <span className="text-xs text-gray-400">Telegram</span>
              </a>
              <a 
                href="https://vk.com/wubbaRickAndMorty" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center w-20 h-20 rounded-2xl bg-gray-800 hover:bg-cyan-500/20 border border-cyan-500/30 hover:border-cyan-500 text-cyan-400 transition-all group"
                title="ВКонтакте"
              >
                <Icon name="Share2" size={28} className="mb-1 group-hover:scale-110 transition-transform" />
                <span className="text-xs text-gray-400">ВКонтакте</span>
              </a>
              <a 
                href="https://www.youtube.com/channel/UCypoo5_Rg2A2HQQesranCTA" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center w-20 h-20 rounded-2xl bg-gray-800 hover:bg-cyan-500/20 border border-cyan-500/30 hover:border-cyan-500 text-cyan-400 transition-all group"
                title="YouTube"
              >
                <Icon name="Youtube" size={28} className="mb-1 group-hover:scale-110 transition-transform" />
                <span className="text-xs text-gray-400">YouTube</span>
              </a>
            </div>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
};

export default About;