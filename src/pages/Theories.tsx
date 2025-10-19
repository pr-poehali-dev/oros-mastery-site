import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { generateSlug } from '@/utils/slugify';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import Navigation from '@/components/Navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';

const CONTENT_API = 'https://functions.poehali.dev/a3182691-86a7-4e0e-8e97-a0951d94bfb4';

const Theories = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [theories, setTheories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTheories();
  }, []);

  const fetchTheories = async () => {
    try {
      const response = await fetch(`${CONTENT_API}?type=theories`);
      const data = await response.json();
      setTheories(data);
    } catch (error) {
      console.error('Error fetching theories:', error);
    } finally {
      setLoading(false);
    }
  };

  const fallbackTheories = [
    {
      id: 1,
      title: 'Злой Морти — это будущая версия нашего Морти',
      type: 'character',
      probability: 'high',
      author: 'Фанатское сообщество',
      votes: 15234,
      summary: 'Теория о том, что Злой Морти — это наш Морти из будущего, который устал от Рика.',
      fullText: 'Многие фанаты считают, что Злой Морти на самом деле наш Морти C-137, который в будущем устал от манипуляций Рика и решил противостоять всем Рикам. Это объясняет его исключительный интеллект, знание технологий Рика и желание разрушить систему Цитадели. В эпизоде "Close Rick-counters of the Rick Kind" мы видим, что Злой Морти управляет Риком через контроллер — возможно, это технология, которую наш Морти изучит в будущем.',
      evidence: [
        'Знание технологий Рика',
        'Схожие черты характера',
        'Мотивация против Риков',
        'Умение манипулировать'
      ]
    },
    {
      id: 2,
      title: 'Рик C-137 — не самый умный Рик',
      type: 'multiverse',
      probability: 'medium',
      author: 'Reddit теоретики',
      votes: 12890,
      summary: 'Теория предполагает, что существуют Рики умнее нашего главного героя.',
      fullText: 'Хотя Рик C-137 считается самым умным во вселенной, теория предполагает, что есть Рики, которые его превосходят. Простой Рик показал, что можно быть счастливым без гениальности. Возможно, существует Рик, который научился балансировать интеллект и эмоции, став сильнее нашего Рика. Цитадель могла скрывать существование таких Риков, чтобы сохранить иерархию.',
      evidence: [
        'Существование Цитадели',
        'Разные версии Риков',
        'Простой Рик как пример',
        'Злой Морти смог обмануть C-137'
      ]
    },
    {
      id: 3,
      title: 'Бет — клон',
      type: 'character',
      probability: 'high',
      author: 'Официальные намёки',
      votes: 18567,
      summary: 'Теория о том, что Бет, которая живёт с семьёй — это клон, созданный Риком.',
      fullText: 'В эпизоде "ABCs of Beth" Рик предлагает Бет выбор: остаться с семьёй или уйти в космические приключения, создав её клон. Шоу намеренно не раскрывает, какой выбор она сделала. Многие считают, что нынешняя Бет — клон, так как она стала более эмоционально стабильной и внимательной к семье. Настоящая Бет может быть где-то во вселенной, живя жизнь искателя приключений.',
      evidence: [
        'Изменение поведения Бет',
        'Намёки в диалогах Рика',
        'Отсутствие чёткого ответа',
        'Рик способен создавать клонов'
      ]
    },
    {
      id: 4,
      title: 'Морти — щит для мозговых волн Рика',
      type: 'science',
      probability: 'confirmed',
      author: 'Канон сериала',
      votes: 22145,
      summary: 'Официально подтверждённая теория о том, зачем Рику нужен Морти.',
      fullText: 'Эта теория была частично подтверждена в сериале. Рик берёт Морти в приключения не только ради компании, но и потому, что "глупые" мозговые волны Морти нейтрализуют гениальные волны Рика, делая его невидимым для врагов. Злой Морти использовал эту концепцию, окружив себя заключёнными Морти, чтобы скрыться. Это объясняет, почему каждому Рику нужен свой Морти.',
      evidence: [
        'Прямое упоминание в сериале',
        'Злой Морти использует этот принцип',
        'Купол из Морти',
        'Объяснение Рика'
      ]
    },
    {
      id: 5,
      title: 'Диана жива в другой вселенной',
      type: 'character',
      probability: 'medium',
      author: 'Фан-теоретики',
      votes: 9876,
      summary: 'Теория о том, что жена Рика может быть жива в параллельной вселенной.',
      fullText: 'Мы знаем, что Диану убили, что стало триггером для Рика стать тем, кто он есть. Но в мультивселенной может существовать версия, где она выжила. Рик мог не искать её намеренно, боясь разрушить свой образ циничного учёного. Встреча с живой Дианой разрушила бы его мотивацию к мести и заставила переосмыслить всю жизнь.',
      evidence: [
        'Бесконечная мультивселенная',
        'Воспоминания Рика',
        'Его избегание темы',
        'Поведенческие паттерны'
      ]
    },
    {
      id: 6,
      title: 'Мистер Мизикс — паразит памяти',
      type: 'character',
      probability: 'low',
      author: 'Конспирологи',
      votes: 5432,
      summary: 'Спорная теория о природе Мистера Мизикса.',
      fullText: 'Некоторые фанаты считают, что Мистер Мизикс — это эволюционировавший паразит памяти из эпизода "Total Rickall". В отличие от других паразитов, он смог создать не только хорошие, но и плохие воспоминания, полностью интегрировавшись в реальность. Его фраза "Ooh-wee" может быть защитным механизмом, не позволяющим распознать его природу.',
      evidence: [
        'Странное появление',
        'Никто не помнит его происхождения',
        'Всегда позитивен',
        'Необъяснимое существование'
      ]
    },
    {
      id: 7,
      title: 'Портальная пушка имеет ограничения',
      type: 'science',
      probability: 'high',
      author: 'Научные фанаты',
      votes: 11234,
      summary: 'Теория об ограничениях технологии портальной пушки Рика.',
      fullText: 'Хотя портальная пушка кажется всемогущей, она может иметь фундаментальные ограничения. Теория предполагает, что пушка не может создавать порталы в определённые измерения или временные периоды. Это объясняет, почему Рик не может просто вернуться и спасти Диану, или почему он избегает некоторых вселенных. Центральная Конечная Кривая может быть ограничением самой технологии, а не выбором.',
      evidence: [
        'Рик избегает некоторых вселенных',
        'Невозможность изменить прошлое',
        'Центральная Конечная Кривая',
        'Технологические паттерны'
      ]
    },
    {
      id: 8,
      title: 'Морти станет умнее Рика',
      type: 'future',
      probability: 'medium',
      author: 'Аналитики сюжета',
      votes: 13456,
      summary: 'Теория о постепенном развитии интеллекта Морти до уровня Рика.',
      fullText: 'На протяжении сезонов Морти становится всё умнее и решительнее. Он учится у Рика, использует его технологии и принимает самостоятельные решения. Теория предполагает, что к концу сериала Морти превзойдёт Рика в интеллекте, но сохранит эмпатию и моральность. Это создаст идеального героя — гения с сердцем, в отличие от циничного Рика.',
      evidence: [
        'Постепенное развитие персонажа',
        'Использование технологий Рика',
        'Независимые решения',
        'Моральное превосходство'
      ]
    }
  ];

  const displayTheories = theories.length > 0 ? theories : fallbackTheories;

  const types = [
    { id: 'all', name: 'Все теории', icon: 'Lightbulb' },
    { id: 'character', name: 'Персонажи', icon: 'User' },
    { id: 'multiverse', name: 'Мультивселенная', icon: 'Globe' },
    { id: 'science', name: 'Наука', icon: 'Atom' },
    { id: 'future', name: 'Будущее', icon: 'TrendingUp' }
  ];

  const filteredTheories = displayTheories.filter(theory => {
    const matchesType = selectedType === 'all' || theory.type === selectedType;
    const matchesSearch = theory.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         theory.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  const getProbabilityColor = (probability: string) => {
    switch (probability) {
      case 'confirmed': return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'high': return 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30';
      case 'medium': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'low': return 'bg-red-500/20 text-red-300 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  const getProbabilityText = (probability: string) => {
    switch (probability) {
      case 'confirmed': return 'Подтверждено';
      case 'high': return 'Высокая';
      case 'medium': return 'Средняя';
      case 'low': return 'Низкая';
      default: return 'Неизвестно';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      <Navigation />
      <Breadcrumbs />
      <SEO
        title="Теории Rick and Morty - Фанатские теории и анализ"
        description="Фанатские теории о Rick and Morty. Злой Морти, мультивселенная, тайны персонажей и научные концепции сериала. Полный каталог теорий с доказательствами."
        keywords="Rick and Morty теории, фанатские теории, Злой Морти, мультивселенная, анализ, теории Рик и Морти, разбор сериала, фан-теории"
      />
      
      <section className="relative pt-32 pb-24 overflow-hidden bg-gradient-to-br from-green-600 via-cyan-500 to-blue-600">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30"></div>
        
        <div className="container relative z-10 px-4 text-center text-white">
          <Badge className="mb-6 bg-white/20 text-white border-white backdrop-blur-sm">
            <Icon name="Lightbulb" size={16} className="mr-2" />
            Фанатские теории
          </Badge>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Теории сериала
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Разгадываем тайны мультивселенной Rick and Morty
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="text-cyan-400 text-xl">Загрузка теорий...</div>
          </div>
        ) : (
          <>
        <div className="mb-8 space-y-6">
          <div className="relative">
            <Icon name="Search" size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
            <Input
              placeholder="Поиск теорий..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 bg-gray-800 border-gray-700 text-white placeholder:text-gray-300 h-14 text-lg"
            />
          </div>

          <div className="flex gap-2 flex-wrap">
            {types.map(type => (
              <Button
                key={type.id}
                onClick={() => setSelectedType(type.id)}
                variant={selectedType === type.id ? 'default' : 'outline'}
                className={
                  selectedType === type.id
                    ? 'bg-gradient-to-r from-green-600 to-cyan-600 text-white border-0'
                    : 'border-gray-700 text-gray-300 hover:bg-gray-800'
                }
              >
                <Icon name={type.icon as any} size={16} className="mr-2" />
                {type.name}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {filteredTheories.map((theory) => (
            <Card 
              key={theory.id} 
              className="bg-gray-800/50 border-gray-700 hover:border-green-500/50 transition-all cursor-pointer overflow-hidden flex flex-col"
              onClick={() => navigate(`/theory/${generateSlug(theory.id, theory.title)}`)}
            >
              {theory.image && (
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={theory.image} 
                    alt={theory.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
                  <Badge className={`absolute top-4 right-4 ${getProbabilityColor(theory.probability)}`}>
                    {getProbabilityText(theory.probability)}
                  </Badge>
                </div>
              )}
              
              <CardHeader className="flex-grow">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex-1">
                    <CardTitle className="text-2xl text-white mb-2">{theory.title}</CardTitle>
                    <CardDescription className="text-gray-300 flex items-center gap-3 flex-wrap">
                      <span className="flex items-center gap-1">
                        <Icon name="User" size={14} />
                        {theory.author}
                      </span>
                      <span className="flex items-center gap-1">
                        <Icon name="ThumbsUp" size={14} />
                        {theory.votes.toLocaleString()} голосов
                      </span>
                    </CardDescription>
                  </div>
                  {!theory.image && (
                    <Badge className={getProbabilityColor(theory.probability)}>
                      {getProbabilityText(theory.probability)}
                    </Badge>
                  )}
                </div>
                <p className="text-gray-300">{theory.summary}</p>
              </CardHeader>
              
              <CardContent>
                <Button
                  variant="outline"
                  className="w-full border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/theory/${theory.id}`);
                  }}
                >
                  <Icon name="BookOpen" size={18} className="mr-2" />
                  Читать подробнее
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredTheories.length === 0 && (
          <div className="text-center py-20">
            <Icon name="SearchX" size={64} className="mx-auto text-gray-600 mb-4" />
            <h3 className="text-2xl font-bold text-gray-400 mb-2">Теории не найдены</h3>
            <p className="text-gray-500">Попробуйте изменить параметры поиска</p>
          </div>
        )}
        </>
        )}
      </section>

      <Footer />
    </div>
  );
};

export default Theories;