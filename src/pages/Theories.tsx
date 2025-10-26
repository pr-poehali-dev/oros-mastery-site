import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
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
  const { type: typeParam } = useParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState(typeParam || 'all');
  const [theories, setTheories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTheories();
  }, []);

  useEffect(() => {
    if (typeParam) {
      setSelectedType(typeParam);
    }
  }, [typeParam]);

  const fetchTheories = async () => {
    try {
      const timestamp = Date.now();
      const response = await fetch(`${CONTENT_API}?type=theories&_t=${timestamp}`, {
        cache: 'no-store'
      });
      const data = await response.json();
      setTheories(data);
    } catch (error) {
      console.error('Error fetching theories:', error);
    } finally {
      setLoading(false);
    }
  };



  const displayTheories = theories;

  const types = [
    { id: 'all', name: 'Все теории', icon: 'Lightbulb' },
    { id: 'character', name: 'Персонажи', icon: 'User' },
    { id: 'multiverse', name: 'Мультивселенная', icon: 'Globe' },
    { id: 'science', name: 'Наука', icon: 'Atom' },
    { id: 'future', name: 'Будущее', icon: 'TrendingUp' }
  ];

  const filteredTheories = displayTheories.filter(theory => {
    const matchesType = selectedType === 'all' || theory.type === selectedType;
    
    const matchesSearch = searchQuery === '' ||
                         theory.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         theory.summary?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         theory.fullText?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         theory.full_text?.toLowerCase().includes(searchQuery.toLowerCase());
    
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
      <SEO
        title={selectedType !== 'all' ? `${types.find(t => t.id === selectedType)?.name} - Теории Рик и Морти` : "Теории Rick and Morty: самые невероятные фанатские теории, разгадки тайн"}
        description="Изучайте самые невероятные фанатские теории о Рике и Морти с доказательствами и анализом. Разгадки тайн Evil Morty, теории о мультивселенной, скрытые послания создателей, тайны персонажей, научные концепции сериала. Полная база теорий с подтверждениями из эпизодов."
        keywords="Рик и Морти теории, фанатские теории Rick and Morty, Evil Morty теория, тайны мультивселенной, научные концепции, скрытые послания, разгадки, фан-теории, анализ сериала, теории о персонажах"
      />
      <div className="pt-20 pb-4 container mx-auto px-4">
        <Breadcrumbs />
      </div>
      
      <section className="relative pt-12 pb-24 overflow-hidden bg-gradient-to-br from-green-600 via-cyan-500 to-blue-600">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30"></div>
        
        <div className="container relative z-10 px-4 text-center text-white">
          <Badge className="mb-6 bg-white/20 text-white border-white backdrop-blur-sm">
            <Icon name="Lightbulb" size={16} className="mr-2" />
            Фанатские теории
          </Badge>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            {selectedType === 'all' 
              ? 'Теории из Рика и Морти' 
              : `Теория ${
                  selectedType === 'character' ? 'персонажей' :
                  selectedType === 'multiverse' ? 'мультивселенной' :
                  selectedType === 'science' ? 'науки' :
                  'будущего'
                } из Рика и Морти`}
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Разгадываем тайны мультивселенной Рик и Морти
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto mb-12 text-gray-200 bg-gray-800/30 rounded-lg p-8">
          <h2 className="text-3xl font-bold mb-6 text-white">Фанатские теории о Рике и Морти: разгадайте тайны мультивселенной!</h2>
          
          <p className="mb-4 text-lg leading-relaxed">
            **Rick and Morty** - это не просто мультсериал, а **загадка с множеством уровней**. 
            Создатели оставляют десятки скрытых подсказок, а фанаты строят невероятные теории, которые иногда сбываются! 
            Мы собрали **самые интересные и обоснованные** теории с доказательствами из эпизодов.
          </p>

          <h3 className="text-2xl font-semibold mb-4 text-green-400 flex items-center">
            <Icon name="Lightbulb" size={24} className="mr-2" />
            Категории теорий
          </h3>
          
          <ul className="space-y-3 mb-6">
            <li className="flex items-start">
              <Icon name="Check" size={20} className="mr-2 mt-1 text-green-400 flex-shrink-0" />
              <span><strong className="text-white">Теории о персонажах:</strong> Тайны Evil Morty, история Рика C-137, связь между персонажами и их скрытые мотивы</span>
            </li>
            <li className="flex items-start">
              <Icon name="Check" size={20} className="mr-2 mt-1 text-green-400 flex-shrink-0" />
              <span><strong className="text-white">Теории мультивселенной:</strong> Правила путешествий между измерениями, структура вселенной, главные тайны мультивселенной</span>
            </li>
            <li className="flex items-start">
              <Icon name="Check" size={20} className="mr-2 mt-1 text-green-400 flex-shrink-0" />
              <span><strong className="text-white">Научные теории:</strong> Объяснение технологий Рика, квантовая физика, временные парадоксы и научные концепции из сериала</span>
            </li>
            <li className="flex items-start">
              <Icon name="Check" size={20} className="mr-2 mt-1 text-green-400 flex-shrink-0" />
              <span><strong className="text-white">Предсказания будущего:</strong> Что произойдёт в следующих сезонах, анализ намёков создателей и прогнозы развития сюжета</span>
            </li>
          </ul>

          <h3 className="text-2xl font-semibold mb-4 text-green-400 flex items-center">
            <Icon name="Star" size={24} className="mr-2" />
            Самые популярные теории
          </h3>
          
          <p className="mb-4">
            **Evil Morty** - самая обсуждаемая теория среди фанатов. Кто он на самом деле? Почему он так умён и безжалостен? Какая связь у него с Риком C-137? Фанаты создали десятки теорий с доказательствами из эпизодов.
          </p>

          <p className="mb-4">
            **Кривая смерти** (центральная концепция сериала) - согласно теории, она показывает, в каких измерениях Рик ещё жив, а в каких нет. Это объясняет, почему Рик может прыгать между измерениями без последствий.
          </p>

          <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4 mt-6">
            <p className="text-sm flex items-start">
              <Icon name="Sparkles" size={18} className="mr-2 mt-0.5 text-green-400 flex-shrink-0" />
              <span><strong>Знаете ли вы?</strong> Многие фанатские теории, которые казались безумными, позже подтвердились в новых эпизодах! Создатели сериала следят за теориями фанатов и иногда используют их в сюжете.</span>
            </p>
          </div>
        </div>

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
                onClick={() => {
                  if (type.id === 'all') {
                    navigate('/theories');
                  } else {
                    navigate(`/theories/type/${type.id}`);
                  }
                }}
                variant={selectedType === type.id ? 'default' : 'outline'}
                className={
                  selectedType === type.id
                    ? 'bg-gradient-to-r from-green-400 to-cyan-400 text-gray-900 border-0 font-semibold hover:from-green-500 hover:to-cyan-500'
                    : 'border-cyan-500/30 text-cyan-300 bg-gray-800/50 hover:bg-cyan-500/10 hover:border-cyan-500/50'
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
                    loading="lazy"
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
                      {theory.author && (
                        <span className="flex items-center gap-1">
                          <Icon name="User" size={14} />
                          {theory.author}
                        </span>
                      )}
                      {theory.published_date && (
                        <span className="flex items-center gap-1">
                          <Icon name="Calendar" size={14} />
                          {new Date(theory.published_date).toLocaleDateString('ru-RU', { 
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric'
                          })}
                        </span>
                      )}
                      {theory.views !== undefined && (
                        <span className="flex items-center gap-1">
                          <Icon name="Eye" size={14} />
                          {theory.views.toLocaleString()}
                        </span>
                      )}
                      {theory.likes !== undefined && (
                        <span className="flex items-center gap-1">
                          <Icon name="Heart" size={14} />
                          {theory.likes.toLocaleString()}
                        </span>
                      )}
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