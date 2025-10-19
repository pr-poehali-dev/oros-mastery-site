import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';

const UniverseDetail = () => {
  const { id } = useParams();

  const universes = [
    {
      id: 1,
      dimension: 'C-137',
      name: 'Главная вселенная Рика',
      description: 'Вселенная, откуда родом наш Рик. Здесь произошла трагедия с Дианой и молодой Бет.',
      status: 'active',
      danger: 'medium',
      inhabitants: 'Рик C-137, семья Смитов',
      features: ['Высокие технологии', 'Нестабильность', 'Портальная пушка'],
      image: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800&auto=format&fit=crop',
      fullDescription: `Вселенная C-137 — это родное измерение Рика Санчеза, одного из самых умных существ во всей мультивселенной. Это измерение стало точкой отсчёта для всех безумных приключений, которые мы наблюдаем в сериале.

## История вселенной

Вселенная C-137 имеет трагическую историю. В этом измерении Рик потерял свою жену Диану и дочь Бет в результате взрыва, организованного другим Риком. Это событие стало поворотным моментом в жизни Рика C-137 и превратило его в того циничного гения, которого мы знаем.

После трагедии Рик отправился в путешествие по мультивселенной в поисках Рика, который убил его семью. Он изобрел портальную пушку, которая позволяет ему путешествовать между бесконечным количеством измерений. В процессе своих поисков Рик стал одним из самых опасных и непредсказуемых существ в мультивселенной.

## Технологический уровень

Технологический уровень вселенной C-137 значительно превосходит большинство других измерений благодаря Рику. Его изобретения включают:

- **Портальную пушку**: устройство, позволяющее мгновенно перемещаться между измерениями
- **Космический корабль**: летательный аппарат, способный путешествовать быстрее света
- **Лазерное оружие**: различные виды энергетического оружия
- **Микроверс батарейка**: миниатюрная вселенная, используемая как источник энергии
- **Оружие для замораживания времени**: устройство, останавливающее время в локальной области

Рик не делится своими технологиями с правительством или другими учёными, считая их недостойными. Это создаёт уникальную ситуацию, когда в одной вселенной существует огромный технологический разрыв между Риком и остальной цивилизацией.

## Социальная структура

В отличие от многих других вселенных, где Рики объединились в Цитадель, Рик C-137 долгое время оставался независимым. Он презирает идею Цитадели Риков, считая её признаком слабости и конформизма.

Общество вселенной C-137 на Земле похоже на наше собственное, с теми же проблемами, конфликтами и структурами власти. Однако присутствие Рика и его технологий иногда влияет на ход событий, хотя он старается оставаться в тени.

## Связь с другими вселенными

Вселенная C-137 тесно связана с несколькими другими ключевыми измерениями:

1. **Кроненберг-вселенная**: измерение, которое Рик и Морти превратили в апокалиптический кошмар, населённый мутантами-кроненбергами
2. **Замена-вселенная**: измерение, почти идентичное C-137, куда переселились Рик иМорти после инцидента с Кроненбергами
3. **Цитадель Риков**: независимая станция вне измерений, где живут тысячи Риков из разных вселенных

## Значимые события

Во вселенной C-137 произошло множество важных событий, изменивших не только это измерение, но и всю мультивселенную:

- Убийство Дианы и Бет Риком из другого измерения
- Создание Риком портальной пушки
- Инцидент с Кроненбергами, приведший к эвакуации
- Первый контакт с Цитаделью Риков
- Противостояние со Злым Морти

## Философское значение

Вселенная C-137 представляет собой философскую загадку. В мультивселенной с бесконечным количеством измерений, что делает это конкретное измерение особенным? Возможно, ничего. И именно это осознание делает Рика таким циничным и нигилистичным.

Однако, несмотря на весь свой цинизм, Рик C-137 продолжает возвращаться к своей семье. Это может означать, что даже в бесконечной мультивселенной определённые связи имеют значение. Или, возможно, это просто удобная база для операций.

## Текущее состояние

На данный момент статус вселенной C-137 остаётся неопределённым. Рик и Морти технически не живут там с момента инцидента с Кроненбергами. Они заняли места своих двойников в другом измерении. Но Рик всё ещё идентифицирует себя как Рик C-137, что говорит о важности происхождения, даже для того, кто отрицает значение чего-либо.

Вселенная продолжает существовать, населённая мутантами-кроненбергами, а также Джерри, Саммер и Бет из того измерения, которые каким-то образом выжили и адаптировались к новым условиям.`,
      relatedCharacters: ['Рик C-137', 'Морти', 'Диана', 'Бет'],
      relatedEpisodes: [1, 6, 10],
      coordinates: 'C-137',
      discoveryDate: 'Изначальная',
      population: 'Неизвестно',
      technology: 'Продвинутая'
    }
  ];

  const universe = universes.find(u => u.id === Number(id)) || universes[0];

  const getDangerColor = (danger: string) => {
    switch (danger) {
      case 'low': return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'medium': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'high': return 'bg-orange-500/20 text-orange-300 border-orange-500/30';
      case 'extreme': return 'bg-red-500/20 text-red-300 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      <Navigation />
      <SEO
        title={`${universe.name} - ${universe.dimension}`}
        description={universe.description}
        image={universe.image}
        keywords={`Rick and Morty, ${universe.dimension}, ${universe.name}, вселенная, измерение`}
      />

      <div className="relative h-96 overflow-hidden">
        <img 
          src={universe.image} 
          alt={universe.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent"></div>
        
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container mx-auto">
            <Link to="/universes">
              <Button variant="ghost" className="text-white hover:text-cyan-300 mb-4">
                <Icon name="ArrowLeft" size={20} className="mr-2" />
                Все вселенные
              </Button>
            </Link>
            
            <Badge className="mb-4 bg-purple-500/20 text-purple-300 border-purple-500/30 text-lg px-4 py-2">
              {universe.dimension}
            </Badge>
            
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
              {universe.name}
            </h1>
            
            <div className="flex gap-3 flex-wrap">
              <Badge className={getDangerColor(universe.danger)}>
                Уровень опасности: {universe.danger === 'medium' ? 'Средний' : universe.danger}
              </Badge>
              <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30">
                {universe.status === 'active' ? 'Активна' : 'Статус неизвестен'}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-3xl text-white flex items-center gap-3">
                  <Icon name="BookOpen" size={28} className="text-cyan-400" />
                  Подробное описание
                </CardTitle>
              </CardHeader>
              <CardContent className="prose prose-invert max-w-none">
                <div className="text-gray-300 leading-relaxed space-y-4">
                  {universe.fullDescription.split('\n\n').map((paragraph, idx) => {
                    if (paragraph.startsWith('##')) {
                      return (
                        <h2 key={idx} className="text-2xl font-bold text-cyan-400 mt-8 mb-4">
                          {paragraph.replace('## ', '')}
                        </h2>
                      );
                    }
                    if (paragraph.startsWith('-')) {
                      const items = paragraph.split('\n').filter(item => item.startsWith('-'));
                      return (
                        <ul key={idx} className="space-y-2 ml-4">
                          {items.map((item, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <Icon name="Check" size={16} className="text-green-400 mt-1 flex-shrink-0" />
                              <span>{item.replace(/^- \*\*(.+?)\*\*:/, '<strong>$1</strong>:').replace(/\*\*(.+?)\*\*/g, '$1')}</span>
                            </li>
                          ))}
                        </ul>
                      );
                    }
                    if (paragraph.match(/^\d\./)) {
                      const items = paragraph.split('\n').filter(item => item.match(/^\d\./));
                      return (
                        <ol key={idx} className="space-y-2 ml-4 list-decimal">
                          {items.map((item, i) => (
                            <li key={i} className="text-gray-300">
                              {item.replace(/^\d\. \*\*(.+?)\*\*:/, '$1:').replace(/\*\*(.+?)\*\*/g, '$1')}
                            </li>
                          ))}
                        </ol>
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
                  <Icon name="Info" size={20} className="text-cyan-400" />
                  Информация
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-gray-400 text-sm mb-1">Координаты</p>
                  <p className="text-white font-semibold">{universe.coordinates}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-1">Дата открытия</p>
                  <p className="text-white font-semibold">{universe.discoveryDate}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-1">Население</p>
                  <p className="text-white font-semibold">{universe.population}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-1">Технологии</p>
                  <p className="text-white font-semibold">{universe.technology}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-xl text-white flex items-center gap-2">
                  <Icon name="Sparkles" size={20} className="text-cyan-400" />
                  Особенности
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {universe.features.map((feature, idx) => (
                    <Badge key={idx} variant="outline" className="border-cyan-500/30 text-cyan-300">
                      {feature}
                    </Badge>
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
                  {universe.relatedCharacters.map((char, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-gray-300 hover:text-cyan-400 transition-colors cursor-pointer">
                      <Icon name="User" size={14} />
                      <span>{char}</span>
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

export default UniverseDetail;
