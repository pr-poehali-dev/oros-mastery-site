import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';

const TheoryDetail = () => {
  const { id } = useParams();

  const theories = [
    {
      id: 1,
      title: 'Злой Морти — это будущая версия нашего Морти',
      type: 'character',
      probability: 'high',
      author: 'Фанатское сообщество',
      votes: 15234,
      summary: 'Теория о том, что Злой Морти — это наш Морти из будущего, который устал от Рика.',
      fullText: `## Введение

Одна из самых популярных и обсуждаемых теорий в фандоме Rick and Morty предполагает, что Злой Морти (Evil Morty) — это будущая или альтернативная версия главного Морти C-137. Эта теория объясняет многие загадки сериала и предсказывает драматическую арку развития персонажа.

## Основные аргументы

### Исключительный интеллект

Злой Морти демонстрирует уровень интеллекта, не свойственный обычным Морти. Он способен:
- Создавать сложные технологические устройства
- Манипулировать Риками
- Разрабатывать долгосрочные стратегические планы
- Понимать науку на уровне, близком к Рику

Это говорит о том, что он провёл значительное время рядом с Риком, изучая его методы и технологии. Наш Морти постепенно становится умнее с каждым сезоном, что подтверждает возможность такой эволюции.

### Мотивация против Риков

Злой Морти открыто ненавидит всех Риков и систему, которую они создали. Эта ненависть кажется личной, как будто он пострадал от конкретного Рика. 

В сериале мы видим, как наш Морти регулярно страдает от эгоизма и безразличия Рика. С каждым приключением Морти получает новые травмы — физические и психологические. Теория предполагает, что в какой-то момент чаша терпения переполнится.

### Знание технологий Рика

Злой Морти не только понимает технологии Рика, но и может модифицировать их. В эпизоде "Close Rick-counters of the Rick Kind" он создал устройство для контроля Рика, что требует глубокого понимания биологии и технологий Риков.

Такие знания мог получить только Морти, проведший годы рядом с Риком, наблюдая и изучая. Наш Морти всё чаще демонстрирует способность использовать изобретения Рика и даже улучшать их.

### Желание разрушить Центральную Конечную Кривую

В финале 5 сезона Злой Морти сбежал за пределы Центральной Конечной Кривой — искусственного ограничения мультивселенной, созданного Риками. Это действие демонстрирует желание вырваться из системы, где Рики всегда доминируют.

Наш Морти всё больше осознаёт, что Рик использует его. Возможно, в будущем он решит, что единственный способ обрести свободу — это уничтожить всю систему Риков.

## Доказательства из сериала

### Визуальные подсказки

Глаза Злого Морти выглядят иначе — они менее невинные и более жёсткие. Это может быть результатом того, что он пережил. Интересно, что в моменты сильного стресса наш Морти иногда демонстрирует похожий взгляд.

### Поведенческие паттерны

Злой Морти манипулирует людьми так же, как это делает Рик. Он научился играть на слабостях других, использовать их страхи и желания. Наш Морти тоже начинает демонстрировать эти навыки в поздних сезонах.

### Отсутствие эмпатии к другим Морти

Злой Морти использует других Морти как инструменты, не проявляя к ним сочувствия. Это может быть защитным механизмом — если он сам Морти, который пострадал, он может считать других Морти слабыми версиями себя.

## Временные парадоксы и мультивселенная

В мультивселенной Rick and Morty возможны путешествия во времени, хотя Рик считает их опасными и избегает. Теория предполагает несколько сценариев:

### Сценарий 1: Путешествие во времени
Наш Морти в будущем изобретает способ путешествовать во времени, возвращается в прошлое и становится Злым Морти. Это создаёт временную петлю, где его существование предопределено.

### Сценарий 2: Альтернативная временная линия
Злой Морти из альтернативной временной линии, где события развивались иначе. В какой-то критический момент наш Морти выбрал остаться с Риком, а Злой Морти — восстать против него.

### Сценарий 3: Мультивселенная без Центральной Кривой
После разрушения Центральной Конечной Кривой открылись вселенные, где Морти могут быть умнее Риков. Возможно, Злой Морти родом оттуда.

## Психологический анализ

### Травма и развитие

Психологически теория имеет смысл. Морти — подросток, регулярно сталкивающийся со смертельными опасностями, моральными дилеммами и экзистенциальными кризисами. Без правильной поддержки это может привести к:
- Посттравматическому стрессовому расстройству
- Потере эмпатии
- Желанию контролировать окружающих
- Ненависти к источнику травмы (Рику)

### Цикл насилия

Злой Морти может представлять то, чем Морти станет, если будет слишком долго подвергаться влиянию Рика. Это предупреждение о том, что жертва может стать агрессором, перенимая черты своего мучителя.

## Контраргументы

### Разные измерения
Создатели сериала подчёркивали, что в бесконечной мультивселенной существуют бесконечные вариации каждого персонажа. Злой Морти может быть просто одной из таких вариаций, а не будущей версией нашего Морти.

### Хронология
Временная линия событий не всегда поддерживает теорию. Злой Морти появился в сериале раньше, чем наш Морти прошёл достаточную эволюцию.

### Заявления создателей
Джастин Ройланд и Дэн Хармон не подтверждали эту теорию, хотя и не опровергали её полностью.

## Философский смысл

Эта теория поднимает вопрос о детерминизме и свободе воли. Если Злой Морти — это то, чем станет наш Морти, можно ли изменить будущее? Или каждый Морти обречён либо оставаться в тени Рика, либо стать его врагом?

Теория также исследует тему ответственности. Рик создаёт своих врагов своими действиями. Злой Морти — это результат того, как Рики обращаются с Морти во всей мультивселенной.

## Влияние на сюжет

Если теория верна, это означает:
- Драматическую конфронтацию между Риком и Морти в будущем
- Возможное искупление для Рика или его окончательное падение
- Объяснение многих загадок сериала
- Тёмное предупреждение о будущем наших героев

## Заключение

Теория о том, что Злой Морти — это будущая версия нашего Морти, основана на сильных доказательствах из сериала, психологических паттернах и тематических параллелях. Хотя она не подтверждена официально, она остаётся одной из самых правдоподобных и интересных теорий в фандоме.

Сериал продолжает давать подсказки в обе стороны, держа зрителей в напряжении. Возможно, создатели намеренно оставляют эту возможность открытой, чтобы использовать её в будущих сезонах. Или, возможно, правда ещё страшнее, и Злой Морти — это не будущее, а неизбежный итог для любого Морти, достаточно долго пробывшего с Риком.`,
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

  const theory = theories.find(t => t.id === Number(id)) || theories[0];

  const getProbabilityColor = (probability: string) => {
    switch (probability) {
      case 'confirmed': return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'high': return 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30';
      case 'medium': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'low': return 'bg-red-500/20 text-red-300 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      <Navigation />
      <SEO
        title={theory.title}
        description={theory.summary}
        keywords={`Rick and Morty теория, ${theory.title}, фан-теория`}
      />

      <section className="relative pt-32 pb-16 bg-gradient-to-br from-green-600 via-cyan-500 to-blue-600">
        <div className="container mx-auto px-4">
          <Link to="/theories">
            <Button variant="ghost" className="text-white hover:text-cyan-300 mb-6">
              <Icon name="ArrowLeft" size={20} className="mr-2" />
              Все теории
            </Button>
          </Link>

          <div className="flex items-center gap-4 mb-6">
            <Badge className={getProbabilityColor(theory.probability)} style={{ fontSize: '1rem', padding: '0.5rem 1rem' }}>
              {theory.probability === 'high' ? 'Высокая вероятность' : theory.probability}
            </Badge>
            <Badge className="bg-white/20 text-white border-white" style={{ fontSize: '1rem', padding: '0.5rem 1rem' }}>
              {theory.category}
            </Badge>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {theory.title}
          </h1>

          <div className="flex items-center gap-6 text-white/80">
            <span className="flex items-center gap-2">
              <Icon name="User" size={16} />
              {theory.author}
            </span>
            <span className="flex items-center gap-2">
              <Icon name="ThumbsUp" size={16} />
              {theory.votes.toLocaleString()} голосов
            </span>
            <span className="flex items-center gap-2">
              <Icon name="AlertCircle" size={16} />
              {theory.impactLevel}
            </span>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-2xl text-white flex items-center gap-3">
                  <Icon name="FileText" size={24} className="text-cyan-400" />
                  Полное описание теории
                </CardTitle>
              </CardHeader>
              <CardContent className="prose prose-invert max-w-none">
                <div className="text-gray-300 leading-relaxed space-y-4">
                  {theory.fullText.split('\n\n').map((paragraph, idx) => {
                    if (paragraph.startsWith('##')) {
                      return (
                        <h2 key={idx} className="text-2xl font-bold text-cyan-400 mt-8 mb-4">
                          {paragraph.replace('## ', '')}
                        </h2>
                      );
                    }
                    if (paragraph.startsWith('###')) {
                      return (
                        <h3 key={idx} className="text-xl font-semibold text-cyan-300 mt-6 mb-3">
                          {paragraph.replace('### ', '')}
                        </h3>
                      );
                    }
                    if (paragraph.startsWith('-')) {
                      const items = paragraph.split('\n').filter(item => item.startsWith('-'));
                      return (
                        <ul key={idx} className="space-y-2 ml-4">
                          {items.map((item, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <Icon name="Check" size={16} className="text-green-400 mt-1 flex-shrink-0" />
                              <span>{item.replace('- ', '')}</span>
                            </li>
                          ))}
                        </ul>
                      );
                    }
                    return <p key={idx} className="text-gray-300">{paragraph}</p>;
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-xl text-white flex items-center gap-2">
                  <Icon name="FileCheck" size={20} className="text-cyan-400" />
                  Доказательства
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {theory.evidence.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-gray-300 text-sm">
                      <Icon name="Check" size={16} className="text-green-400 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-xl text-white flex items-center gap-2">
                  <Icon name="AlertTriangle" size={20} className="text-orange-400" />
                  Контраргументы
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {theory.counterArguments.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-gray-300 text-sm">
                      <Icon name="X" size={16} className="text-red-400 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-xl text-white flex items-center gap-2">
                  <Icon name="Film" size={20} className="text-cyan-400" />
                  Связанные эпизоды
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {theory.relatedEpisodes.map((ep, idx) => (
                    <div key={idx} className="text-gray-300 text-sm flex items-center gap-2">
                      <Icon name="Play" size={14} className="text-cyan-400" />
                      {ep}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-xl text-white flex items-center gap-2">
                  <Icon name="Users" size={20} className="text-cyan-400" />
                  Связанные персонажи
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {theory.relatedCharacters.map((char, idx) => (
                    <div key={idx} className="text-gray-300 text-sm flex items-center gap-2">
                      <Icon name="User" size={14} className="text-cyan-400" />
                      {char}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default TheoryDetail;
