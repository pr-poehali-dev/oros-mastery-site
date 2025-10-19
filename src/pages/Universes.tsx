import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
  const [selectedDimension, setSelectedDimension] = useState<number | null>(null);
  const [universes, setUniverses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUniverses();
  }, []);

  const fetchUniverses = async () => {
    try {
      const response = await fetch(`${CONTENT_API}?type=universes`);
      const data = await response.json();
      setUniverses(data);
    } catch (error) {
      console.error('Error fetching universes:', error);
    } finally {
      setLoading(false);
    }
  };

  const fallbackUniverses = [
    {
      id: 1,
      dimension: 'C-137',
      name: 'Главная вселенная Рика',
      description: 'Вселенная, откуда родом наш Рик. Здесь произошла трагедия с Дианой и молодой Бет.',
      status: 'active',
      danger: 'medium',
      inhabitants: 'Рик C-137, семья Смитов',
      features: ['Высокие технологии', 'Нестабильность', 'Портальная пушка'],
      color: 'cyan',
      image: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800&auto=format&fit=crop'
    },
    {
      id: 2,
      dimension: 'Замена-вселенная',
      name: 'Кронен-вселенная',
      description: 'Вселенная, в которую переселились Рик и Морти после того, как превратили всех в Кроненбергов.',
      status: 'abandoned',
      danger: 'extreme',
      inhabitants: 'Кроненберги, Джерри, Саммер, Бет',
      features: ['Кроненберг-монстры', 'Постапокалипсис', 'Биологическая катастрофа'],
      color: 'red',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop'
    },
    {
      id: 3,
      dimension: 'C-131',
      name: 'Текущая вселенная',
      description: 'Вселенная, куда переселились Рик и Морти. Здесь они заняли место своих двойников.',
      status: 'active',
      danger: 'low',
      inhabitants: 'Семья Смитов (заменённые Рик и Морти)',
      features: ['Стабильная реальность', 'Нормальная жизнь', 'Никаких Кроненбергов'],
      color: 'green',
      image: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800&auto=format&fit=crop'
    },
    {
      id: 4,
      dimension: 'Цитадель Риков',
      name: 'Цитадель',
      description: 'Независимая станция вне измерений, где живут тысячи Риков и Морти из разных вселенных.',
      status: 'active',
      danger: 'medium',
      inhabitants: '∞ Риков и Морти',
      features: ['Мультивселенная хаб', 'Технологический центр', 'Рик-правительство'],
      color: 'purple',
      image: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=800&auto=format&fit=crop'
    },
    {
      id: 5,
      dimension: 'Dimension 35-C',
      name: 'Пицца-вселенная',
      description: 'Вселенная, где пицца ест людей. Упоминается в шутку Риком.',
      status: 'unknown',
      danger: 'high',
      inhabitants: 'Разумные пиццы',
      features: ['Инверсия пищевой цепи', 'Агрессивная еда', 'Хаос'],
      color: 'orange',
      image: 'https://images.unsplash.com/photo-1513002749550-c59d786b8e6c?w=800&auto=format&fit=crop'
    },
    {
      id: 6,
      dimension: 'Dimension J19ζ7',
      name: 'Вселенная Джерри',
      description: 'Вселенная, где Джерри успешен и уверен в себе. Противоположность обычного Джерри.',
      status: 'active',
      danger: 'low',
      inhabitants: 'Успешный Джерри, его семья',
      features: ['Успех Джерри', 'Альтернативная судьба', 'Стабильность'],
      color: 'blue',
      image: 'https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?w=800&auto=format&fit=crop'
    },
    {
      id: 7,
      dimension: 'Dimension C-500A',
      name: 'Простая вселенная',
      description: 'Вселенная, где все выглядят просто и говорят "my man". Здесь продаются яблоки.',
      status: 'active',
      danger: 'low',
      inhabitants: 'Простые люди',
      features: ['Простота', 'My man!', 'Продавец яблок'],
      color: 'yellow',
      image: 'https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=800&auto=format&fit=crop'
    },
    {
      id: 8,
      dimension: 'Dimension D-99',
      name: 'Межвселенский кабель',
      description: 'Вселенные, доступные через межвселенский кабель с бесконечными ТВ-каналами.',
      status: 'active',
      danger: 'low',
      inhabitants: 'Бесконечные персонажи',
      features: ['Бесконечное ТВ', 'Абсурдные шоу', 'Развлечения'],
      color: 'pink',
      image: 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=800&auto=format&fit=crop'
    }
  ];

  const displayUniverses = universes.length > 0 ? universes : fallbackUniverses;

  const getDangerColor = (danger: string) => {
    switch (danger) {
      case 'low': return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'medium': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'high': return 'bg-orange-500/20 text-orange-300 border-orange-500/30';
      case 'extreme': return 'bg-red-500/20 text-red-300 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30';
      case 'abandoned': return 'bg-red-500/20 text-red-300 border-red-500/30';
      case 'unknown': return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      <Navigation />
      <Breadcrumbs />
      <SEO
        title="Вселенные Rick and Morty - Гид по мультивселенной"
        description="Исследуйте все вселенные Rick and Morty. Цитадель Риков, Кроненберг-вселенная и другие измерения мультивселенной. Полный каталог всех вселенных и измерений."
        keywords="Rick and Morty вселенные, измерения, C-137, Цитадель Риков, мультивселенная, вселенная Рик и Морти, все измерения, каталог вселенных"
      />
      
      <section className="relative pt-32 pb-24 overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-500 to-pink-600">
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
            Все вселенные
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Исследуйте бесконечность измерений и параллельных миров
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="text-cyan-400 text-xl">Загрузка вселенных...</div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayUniverses.map((universe) => (
            <Card 
              key={universe.id} 
              className="bg-gray-800/50 border-gray-700 overflow-hidden hover:border-purple-500/50 transition-all cursor-pointer"
              onClick={() => navigate(`/universe/${generateSlug(universe.id, universe.name)}`)}
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={universe.image} 
                  alt={universe.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
                <Badge className="absolute top-4 right-4 bg-black/50 text-white border-0 backdrop-blur-sm">
                  {universe.dimension}
                </Badge>
              </div>
              
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge className={getStatusColor(universe.status)}>
                    {universe.status === 'active' ? 'Активна' : universe.status === 'abandoned' ? 'Заброшена' : 'Неизвестно'}
                  </Badge>
                  <Badge className={getDangerColor(universe.danger)}>
                    {universe.danger === 'low' ? 'Безопасно' : universe.danger === 'medium' ? 'Средне' : universe.danger === 'high' ? 'Опасно' : 'Критично'}
                  </Badge>
                </div>
                <CardTitle className="text-2xl text-white">{universe.name}</CardTitle>
                <CardDescription className="text-gray-400">
                  {universe.description}
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
                В мультивселенной Rick and Morty существует бесконечное количество измерений. 
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