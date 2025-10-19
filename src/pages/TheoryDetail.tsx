import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import EditableContent from '@/components/EditableContent';
import CommentSection from '@/components/CommentSection';

const TheoryDetail = () => {
  const { id } = useParams();

  const theoriesData = [
    {
      id: 1,
      title: 'Злой Морти — это будущая версия нашего Морти',
      type: 'character',
      probability: 'high',
      author: 'Фанатское сообщество',
      votes: 15234,
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop',
      summary: 'Теория о том, что Злой Морти — это наш Морти из будущего, который устал от Рика.',
      fullText: `Одна из самых популярных и обсуждаемых теорий в фандоме Rick and Morty предполагает, что Злой Морти (Evil Morty) — это будущая или альтернативная версия главного Морти C-137. Эта теория объясняет многие загадки сериала и предсказывает драматическую арку развития персонажа.

ОСНОВНЫЕ АРГУМЕНТЫ

Исключительный интеллект

Злой Морти демонстрирует уровень интеллекта, не свойственный обычным Морти. Он способен создавать сложные технологические устройства, манипулировать Риками, разрабатывать долгосрочные стратегические планы и понимать науку на уровне, близком к Рику.

Это говорит о том, что он провёл значительное время рядом с Риком, изучая его методы и технологии. Наш Морти постепенно становится умнее с каждым сезоном, что подтверждает возможность такой эволюции.

Мотивация против Риков

Злой Морти открыто ненавидит всех Риков и систему, которую они создали. Эта ненависть кажется личной, как будто он пострадал от конкретного Рика.

В сериале мы видим, как наш Морти регулярно страдает от эгоизма и безразличия Рика. С каждым приключением Морти получает новые травмы — физические и психологические. Теория предполагает, что в какой-то момент чаша терпения переполнится.

Знание технологий Рика

Злой Морти не только понимает технологии Рика, но и может модифицировать их. В эпизоде "Close Rick-counters of the Rick Kind" он создал устройство для контроля Рика, что требует глубокого понимания биологии и технологий Риков.

ДОКАЗАТЕЛЬСТВА ИЗ СЕРИАЛА

Визуальные подсказки - Глаза Злого Морти выглядят иначе — они менее невинные и более жёсткие. Это может быть результатом того, что он пережил.

Поведенческие паттерны - Злой Морти манипулирует людьми так же, как это делает Рик. Он научился играть на слабостях других, использовать их страхи и желания.

ПСИХОЛОГИЧЕСКИЙ АНАЛИЗ

Психологически теория имеет смысл. Морти — подросток, регулярно сталкивающийся со смертельными опасностями, моральными дилеммами и экзистенциальными кризисами. Без правильной поддержки это может привести к посттравматическому стрессовому расстройству, потере эмпатии и желанию контролировать окружающих.

Злой Морти может представлять то, чем Морти станет, если будет слишком долго подвергаться влиянию Рика. Это предупреждение о том, что жертва может стать агрессором, перенимая черты своего мучителя.

ЗАКЛЮЧЕНИЕ

Теория о том, что Злой Морти — это будущая версия нашего Морти, основана на сильных доказательствах из сериала, психологических паттернах и тематических параллелях. Хотя она не подтверждена официально, она остаётся одной из самых правдоподобных и интересных теорий в фандоме.`,
      evidence: [
        'Знание технологий Рика на экспертном уровне',
        'Схожие черты характера и манеры поведения',
        'Глубокая мотивация против всех Риков',
        'Умение манипулировать и планировать',
        'Желание разрушить систему Центральной Кривой',
        'Постепенная эволюция нашего Морти в сторону независимости'
      ],
      counterArguments: [
        'Бесконечность вариаций в мультивселенной',
        'Хронологические несоответствия',
        'Отсутствие официального подтверждения',
        'Возможность альтернативных объяснений'
      ],
      relatedEpisodes: ['Close Rick-counters of the Rick Kind', 'The Ricklantis Mixup', 'Rickmurai Jack'],
      relatedCharacters: ['Морти C-137', 'Рик C-137', 'Злой Морти'],
      impactLevel: 'Критическое',
      category: 'Персонажи'
    }
  ];

  const [theory, setTheory] = useState(theoriesData.find(t => t.id === Number(id)) || theoriesData[0]);

  const handleContentSave = (newContent: string) => {
    setTheory({ ...theory, fullText: newContent });
  };

  const getProbabilityColor = (probability: string) => {
    switch (probability) {
      case 'confirmed': return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'high': return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
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
      <SEO
        title={`${theory.title} - Теория Rick and Morty`}
        description={theory.summary}
        keywords={`Rick and Morty теория, ${theory.title}, фан-теория, ${theory.category}, теории мультсериала`}
        ogType="article"
      />

      <section className="relative pt-32 pb-16 bg-gradient-to-br from-purple-600 via-indigo-500 to-pink-600">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="container mx-auto px-4 relative z-10">
          <Link to="/theories">
            <Button variant="ghost" className="text-white hover:bg-white/20 mb-6">
              <Icon name="ArrowLeft" size={20} className="mr-2" />
              Все теории
            </Button>
          </Link>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Badge className={`${getProbabilityColor(theory.probability)} mb-4 border px-4 py-1`}>
                Вероятность: {getProbabilityText(theory.probability)}
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
                {theory.title}
              </h1>
              <p className="text-xl text-gray-200 mb-6">{theory.summary}</p>
              <div className="flex flex-wrap gap-4 text-white/90">
                <div className="flex items-center gap-2">
                  <Icon name="User" size={20} />
                  <span>{theory.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="ThumbsUp" size={20} />
                  <span>{theory.votes.toLocaleString()} голосов</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Tag" size={20} />
                  <span>{theory.category}</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <img
                src={theory.image}
                alt={theory.title}
                className="w-full h-64 lg:h-full object-cover rounded-xl shadow-2xl border-4 border-white/20"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Card className="p-8 bg-gray-800 border-gray-700">
              <EditableContent
                content={theory.fullText}
                onSave={handleContentSave}
                title="Описание теории"
              />
            </Card>

            <Card className="p-6 bg-gradient-to-br from-purple-900/50 to-pink-900/50 border-purple-700">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <Icon name="CheckCircle" size={28} className="text-purple-400" />
                Доказательства
              </h2>
              <ul className="space-y-3">
                {theory.evidence.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Icon name="ChevronRight" size={20} className="text-purple-400 mt-1 flex-shrink-0" />
                    <span className="text-gray-200">{item}</span>
                  </li>
                ))}
              </ul>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-pink-900/50 to-red-900/50 border-pink-700">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <Icon name="XCircle" size={28} className="text-pink-400" />
                Контраргументы
              </h2>
              <ul className="space-y-3">
                {theory.counterArguments.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Icon name="ChevronRight" size={20} className="text-pink-400 mt-1 flex-shrink-0" />
                    <span className="text-gray-200">{item}</span>
                  </li>
                ))}
              </ul>
            </Card>

            <CommentSection entityType="theory" entityId={theory.id} />
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <Card className="p-6 bg-gray-800 border-gray-700">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Icon name="Film" size={24} className="text-purple-400" />
                  Связанные эпизоды
                </h3>
                <ul className="space-y-2">
                  {theory.relatedEpisodes.map((episode, index) => (
                    <li key={index} className="text-gray-300 hover:text-purple-400 transition-colors cursor-pointer">
                      • {episode}
                    </li>
                  ))}
                </ul>
              </Card>

              <Card className="p-6 bg-gray-800 border-gray-700">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Icon name="Users" size={24} className="text-purple-400" />
                  Связанные персонажи
                </h3>
                <ul className="space-y-2">
                  {theory.relatedCharacters.map((character, index) => (
                    <li key={index} className="text-gray-300 hover:text-purple-400 transition-colors cursor-pointer">
                      • {character}
                    </li>
                  ))}
                </ul>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-purple-900/50 to-pink-900/50 border-purple-700">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Icon name="TrendingUp" size={24} className="text-purple-400" />
                  Статистика
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Уровень влияния:</span>
                    <span className="font-semibold text-purple-300">{theory.impactLevel}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Голосов:</span>
                    <span className="font-semibold text-purple-300">{theory.votes.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Категория:</span>
                    <span className="font-semibold text-purple-300">{theory.category}</span>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-gray-800 border-gray-700">
                <h3 className="text-xl font-bold mb-4">Поделиться теорией</h3>
                <div className="flex gap-3">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Icon name="Share2" size={16} />
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Icon name="Bookmark" size={16} />
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Icon name="Flag" size={16} />
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default TheoryDetail;
