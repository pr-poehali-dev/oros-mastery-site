import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import Navigation from '@/components/Navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { generateSlug } from '@/utils/slugify';

const CONTENT_API = 'https://functions.poehali.dev/a3182691-86a7-4e0e-8e97-a0951d94bfb4';

const Universes = () => {
  const navigate = useNavigate();
  const { danger: dangerParam } = useParams();
  const [selectedDanger, setSelectedDanger] = useState(dangerParam || 'all');
  const [universes, setUniverses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUniverses();
  }, []);

  useEffect(() => {
    if (dangerParam) {
      setSelectedDanger(dangerParam);
    } else {
      setSelectedDanger('all');
    }
  }, [dangerParam]);

  const fetchUniverses = async () => {
    try {
      const timestamp = Date.now();
      const response = await fetch(`${CONTENT_API}?type=universes&_t=${timestamp}`, {
        cache: 'no-store'
      });
      const data = await response.json();
      setUniverses(data);
    } catch (error) {
      console.error('Error fetching universes:', error);
    } finally {
      setLoading(false);
    }
  };



  const dangerLevels = [
    { id: 'all', name: 'Все уровни' },
    { id: 'low', name: 'Низкий' },
    { id: 'medium', name: 'Средний' },
    { id: 'high', name: 'Высокий' },
    { id: 'critical', name: 'Критический' }
  ];

  const filteredUniverses = selectedDanger === 'all' 
    ? universes 
    : universes.filter(u => {
        const lowerDanger = u.danger_level?.toLowerCase() || '';
        if (selectedDanger === 'low') return lowerDanger.includes('низкий');
        if (selectedDanger === 'medium') return lowerDanger.includes('средний');
        if (selectedDanger === 'high') return lowerDanger.includes('высокий');
        if (selectedDanger === 'critical') return lowerDanger.includes('критический') || lowerDanger.includes('экстрем');
        return false;
      });

  const displayUniverses = filteredUniverses;

  const getDangerColor = (danger: string) => {
    const lowerDanger = danger?.toLowerCase() || '';
    if (lowerDanger.includes('низкий') || lowerDanger.includes('очень низкий')) return 'bg-green-500/20 text-green-300 border-green-500/30';
    if (lowerDanger.includes('средний')) return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
    if (lowerDanger.includes('высокий')) return 'bg-orange-500/20 text-orange-300 border-orange-500/30';
    if (lowerDanger.includes('критический') || lowerDanger.includes('экстрем')) return 'bg-red-500/20 text-red-300 border-red-500/30';
    return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
  };

  const getStatusColor = (status: string) => {
    const lowerStatus = status?.toLowerCase() || '';
    if (lowerStatus.includes('активн') || lowerStatus.includes('стабильн') || lowerStatus.includes('мирн')) return 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30';
    if (lowerStatus.includes('заброшен') || lowerStatus.includes('враждебн')) return 'bg-red-500/20 text-red-300 border-red-500/30';
    if (lowerStatus.includes('нестабильн') || lowerStatus.includes('опасн')) return 'bg-orange-500/20 text-orange-300 border-orange-500/30';
    return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      <Navigation />
      <SEO
        title={selectedDanger !== 'all' ? `${dangerLevels.find(d => d.id === selectedDanger)?.name} уровень опасности - Вселенные Рик и Морти` : "Вселенные Rick and Morty: полный гид по мультивселенной, каталог измерений"}
        description="Полный каталог вселенных и измерений Рика и Морти с описанием, уровнем опасности и историей. Исследуйте C-137, Цитадель Риков, Кроненберг-вселенную и сотни других параллельных миров, посещённых героями. Полная карта мультивселенной с фильтрами по уровню опасности."
        keywords="Рик и Морти вселенные, измерения Rick and Morty, C-137 вселенная, Цитадель Риков, Кроненберг вселенная, мультивселенная, параллельные измерения, каталог вселенных, карта мультивселенной, опасные измерения"
      />
      <div className="pt-20 pb-4 container mx-auto px-4">
        <Breadcrumbs />
      </div>
      
      <section className="relative pt-12 pb-24 overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-500 to-pink-600">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30"></div>
        
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-purple-400 rounded-full blur-[120px] opacity-30 animate-pulse"></div>
          <div className="absolute top-1/3 right-1/3 w-72 h-72 bg-pink-400 rounded-full blur-[100px] opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
        
        <div className="container relative z-10 px-4 text-center text-white">
          <Badge className="mb-6 bg-white/20 text-white border-white backdrop-blur-sm">
            <Icon name="Globe" size={16} className="mr-2" />
            Мультивселенная
          </Badge>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            {selectedDanger === 'all' 
              ? 'Вселенные' 
              : `Вселенные с ${
                  selectedDanger === 'low' ? 'низким' :
                  selectedDanger === 'medium' ? 'средним' :
                  selectedDanger === 'high' ? 'высоким' :
                  'критическим'
                } уровнем опасности`}
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Исследуйте бесконечность измерений и параллельных миров
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto mb-12 text-gray-200 bg-gray-800/30 rounded-lg p-8">
          <h2 className="text-3xl font-bold mb-6 text-white">Мультивселенная Rick and Morty: гид по бесконечности измерений</h2>
          
          <p className="mb-4 text-lg leading-relaxed">
            В сериале **Рик и Морти** существует **бесконечное количество вселенных** - от близких копий нашей реальности до абсолютно безумных измерений с уникальными законами физики. 
            Мы создали самый полный каталог известных вселенных, посещённых Риком и Морти во всех сезонах.
          </p>

          <h3 className="text-2xl font-semibold mb-4 text-purple-400 flex items-center">
            <Icon name="Globe" size={24} className="mr-2" />
            Известные вселенные и измерения
          </h3>
          
          <ul className="space-y-3 mb-6">
            <li className="flex items-start">
              <Icon name="Check" size={20} className="mr-2 mt-1 text-purple-400 flex-shrink-0" />
              <span><strong className="text-white">Вселенная C-137:</strong> Родная вселенная Рика Санчеза, главного героя сериала</span>
            </li>
            <li className="flex items-start">
              <Icon name="Check" size={20} className="mr-2 mt-1 text-purple-400 flex-shrink-0" />
              <span><strong className="text-white">Цитадель Риков:</strong> Город-государство из тысяч Риков и Морти из разных измерений</span>
            </li>
            <li className="flex items-start">
              <Icon name="Check" size={20} className="mr-2 mt-1 text-purple-400 flex-shrink-0" />
              <span><strong className="text-white">Кроненберг-вселенная:</strong> Измерение, где Рик прревратил всех людей в мутантов</span>
            </li>
            <li className="flex items-start">
              <Icon name="Check" size={20} className="mr-2 mt-1 text-purple-400 flex-shrink-0" />
              <span><strong className="text-white">Альтернативные вселенные:</strong> Измерения, где история пошла другим путём - с другими Риками, Морти и событиями</span>
            </li>
            <li className="flex items-start">
              <Icon name="Check" size={20} className="mr-2 mt-1 text-purple-400 flex-shrink-0" />
              <span><strong className="text-white">Экзотические измерения:</strong> Вселенные с уникальными свойствами, чудовищами и правилами</span>
            </li>
          </ul>

          <h3 className="text-2xl font-semibold mb-4 text-purple-400 flex items-center">
            <Icon name="Shield" size={24} className="mr-2" />
            Уровни опасности вселенных
          </h3>
          
          <p className="mb-4">
            Каждой вселенной присвоен **уровень опасности** - от безопасных измерений до критически опасных миров, где выживание почти невозможно. Используйте фильтры, чтобы найти вселенные по уровню угрозы.
          </p>

          <p className="mb-4">
            Каждая карточка вселенной содержит: название, описание, уровень опасности, особенности и важные события, которые произошли в этой вселенной. Нажмите на карточку для подробной информации.
          </p>

          <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-4 mt-6">
            <p className="text-sm flex items-start">
              <Icon name="Sparkles" size={18} className="mr-2 mt-0.5 text-purple-400 flex-shrink-0" />
              <span><strong>Интересный факт:</strong> Согласно теории сериала, существует бесконечное количество вселенных, где возможны любые события - но Рик посещает лишь те, где он самый умный человек во вселенной!</span>
            </p>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="text-cyan-400 text-xl">Загрузка вселенных...</div>
          </div>
        ) : (
          <>
            <div className="mb-8">
              <div className="flex gap-2 flex-wrap">
                {dangerLevels.map(level => (
                  <Button
                    key={level.id}
                    onClick={() => {
                      if (level.id === 'all') {
                        navigate('/universes');
                      } else {
                        navigate(`/universes/danger/${level.id}`);
                      }
                    }}
                    variant={selectedDanger === level.id ? 'default' : 'outline'}
                    className={
                      selectedDanger === level.id
                        ? 'bg-gradient-to-r from-purple-400 to-pink-400 text-gray-900 border-0 font-semibold'
                        : 'border-gray-700 text-gray-900 bg-gray-200 hover:bg-gray-300'
                    }
                  >
                    {level.name}
                  </Button>
                ))}
              </div>
            </div>
          </>)}
        {!loading && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayUniverses.map((universe) => (
            <Card 
              key={universe.id} 
              className="bg-gray-800/50 border-gray-700 overflow-hidden hover:border-purple-500/50 transition-all cursor-pointer"
              onClick={() => navigate(`/universe/${generateSlug(universe.id, universe.name)}`)}
            >
              <div className="relative h-48 overflow-hidden bg-gradient-to-br from-purple-900 via-indigo-900 to-pink-900">
                {universe.image ? (
                  <img 
                    src={universe.image} 
                    alt={universe.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Icon name="Globe" size={64} className="text-white/30" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
                <Badge className="absolute top-4 right-4 bg-black/50 text-white border-0 backdrop-blur-sm">
                  {universe.coordinates}
                </Badge>
              </div>
              
              <CardHeader>
                <div className="flex items-center justify-between mb-2 gap-2 flex-wrap">
                  <Badge className={`${getStatusColor(universe.status)} text-xs md:text-sm`}>
                    {universe.status}
                  </Badge>
                  <Badge className={`${getDangerColor(universe.danger_level)} text-xs md:text-sm`}>
                    {universe.danger_level}
                  </Badge>
                </div>
                <CardTitle className="text-xl md:text-2xl text-white break-words">{universe.name}</CardTitle>
                <CardDescription className="text-gray-400 text-sm break-words">
                  {universe.description?.substring(0, 120) + '...'}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
        )}

        <div className="mt-12 text-center">
          <Card className="bg-gray-800/80 border-gray-700/50 backdrop-blur-sm">
            <CardContent className="p-8">
              <Icon name="Infinity" size={64} className="mx-auto text-purple-400 mb-4" />
              <h3 className="text-3xl font-bold text-gray-100 mb-4">Бесконечность вселенных</h3>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                В мультивселенной Рик и Морти существует бесконечное количество измерений. 
                Каждое решение создаёт новую ветвь реальности, а каждая вселенная имеет свои уникальные особенности.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Universes;