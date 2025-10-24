import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import Navigation from '@/components/Navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { generateSlug } from '@/utils/slugify';

const EPISODES_API = 'https://functions.poehali.dev/031f0f01-3e0b-440b-a295-08f07c4d1389';

const Episodes = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSeason, setSelectedSeason] = useState('all');
  const [episodes, setEpisodes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEpisodes();
  }, []);

  const fetchEpisodes = async () => {
    try {
      const response = await fetch(EPISODES_API);
      const data = await response.json();
      console.log('Episodes data:', data);
      setEpisodes(data);
    } catch (error) {
      console.error('Error fetching episodes:', error);
    } finally {
      setLoading(false);
    }
  };

  const fallbackEpisodes = [
    { id: 1, season: 1, episode: 1, title: 'Pilot', rating: 8.2, airDate: '2 дек 2013', description: 'Рик переезжает к семье своей дочери и берет Морти в первое приключение.', image: 'https://cdn.poehali.dev/projects/f9f23ac4-7352-47dd-a4bb-81301617dd90/files/54ad156d-f2d1-49cc-9d49-a0e720719998.jpg' },
    { id: 2, season: 1, episode: 2, title: 'Lawnmower Dog', rating: 8.5, airDate: '9 дек 2013', description: 'Рик делает собаку Снаффлса умной, а Морти застревает во сне.', image: 'https://cdn.poehali.dev/projects/f9f23ac4-7352-47dd-a4bb-81301617dd90/files/d490fe60-e1ff-4015-8de4-bb5defe289ae.jpg' },
    { id: 3, season: 1, episode: 3, title: 'Anatomy Park', rating: 8.3, airDate: '16 дек 2013', description: 'Морти попадает внутрь бездомного по имени Рубен.', image: 'https://cdn.poehali.dev/projects/f9f23ac4-7352-47dd-a4bb-81301617dd90/files/b9f7c54d-44b3-419e-a414-f00ff618c62e.jpg' },
    { id: 4, season: 1, episode: 4, title: 'M. Night Shaym-Aliens!', rating: 8.4, airDate: '13 янв 2014', description: 'Рика похищают инопланетяне-охотники.', image: 'https://cdn.poehali.dev/projects/f9f23ac4-7352-47dd-a4bb-81301617dd90/files/54ad156d-f2d1-49cc-9d49-a0e720719998.jpg' },
    { id: 5, season: 1, episode: 5, title: 'Meeseeks and Destroy', rating: 8.7, airDate: '20 янв 2014', description: 'Рик дает семье коробку Мизиксов.', image: 'https://cdn.poehali.dev/projects/f9f23ac4-7352-47dd-a4bb-81301617dd90/files/d490fe60-e1ff-4015-8de4-bb5defe289ae.jpg' },
    { id: 6, season: 1, episode: 6, title: 'Rick Potion #9', rating: 9.1, airDate: '27 янв 2014', description: 'Морти просит Рика сделать любовное зелье.', image: 'https://cdn.poehali.dev/projects/f9f23ac4-7352-47dd-a4bb-81301617dd90/files/b9f7c54d-44b3-419e-a414-f00ff618c62e.jpg' },
    { id: 7, season: 1, episode: 7, title: 'Raising Gazorpazorp', rating: 8.2, airDate: '10 мар 2014', description: 'Морти становится отцом инопланетного ребенка.', image: 'https://cdn.poehali.dev/projects/f9f23ac4-7352-47dd-a4bb-81301617dd90/files/54ad156d-f2d1-49cc-9d49-a0e720719998.jpg' },
    { id: 8, season: 1, episode: 8, title: 'Rixty Minutes', rating: 9.0, airDate: '17 мар 2014', description: 'Рик подключает межвселенское кабельное телевидение.', image: 'https://cdn.poehali.dev/projects/f9f23ac4-7352-47dd-a4bb-81301617dd90/files/d490fe60-e1ff-4015-8de4-bb5defe289ae.jpg' },
    { id: 9, season: 1, episode: 9, title: 'Something Ricked This Way Comes', rating: 8.6, airDate: '24 мар 2014', description: 'Саммер устраивается на работу к Дьяволу.', image: 'https://cdn.poehali.dev/projects/f9f23ac4-7352-47dd-a4bb-81301617dd90/files/b9f7c54d-44b3-419e-a414-f00ff618c62e.jpg' },
    { id: 10, season: 1, episode: 10, title: 'Close Rick-counters of the Rick Kind', rating: 9.3, airDate: '7 апр 2014', description: 'Рика обвиняют в убийстве других Риков.', image: 'https://cdn.poehali.dev/projects/f9f23ac4-7352-47dd-a4bb-81301617dd90/files/54ad156d-f2d1-49cc-9d49-a0e720719998.jpg' },
    { id: 11, season: 1, episode: 11, title: 'Ricksy Business', rating: 8.9, airDate: '14 апр 2014', description: 'Рик устраивает межвселенскую вечеринку.', image: 'https://cdn.poehali.dev/projects/f9f23ac4-7352-47dd-a4bb-81301617dd90/files/d490fe60-e1ff-4015-8de4-bb5defe289ae.jpg' },
    { id: 12, season: 2, episode: 1, title: 'A Rickle in Time', rating: 9.2, airDate: '26 июл 2015', description: 'Время расколото на множество реальностей.', image: 'https://cdn.poehali.dev/projects/f9f23ac4-7352-47dd-a4bb-81301617dd90/files/b9f7c54d-44b3-419e-a414-f00ff618c62e.jpg' },
  ];

  const displayEpisodes = episodes.length > 0 ? episodes : fallbackEpisodes;

  // Получаем уникальные сезоны динамически
  const uniqueSeasons = Array.from(new Set(displayEpisodes.map(e => e.season))).sort((a, b) => a - b);
  
  const seasons = [
    { id: 'all', name: 'Все сезоны', count: displayEpisodes.length },
    ...uniqueSeasons.map(season => ({
      id: season.toString(),
      name: `Сезон ${season}`,
      count: displayEpisodes.filter(e => e.season === season).length
    }))
  ];

  const filteredEpisodes = displayEpisodes.filter(ep => {
    const matchesSeason = selectedSeason === 'all' || ep.season === parseInt(selectedSeason);
    const matchesSearch = ep.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         ep.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSeason && matchesSearch;
  });

  const getRatingColor = (rating: number) => {
    if (rating >= 9) return 'bg-green-500/20 text-green-300 border-green-500/30';
    if (rating >= 8.5) return 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30';
    if (rating >= 8) return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
    return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      <Navigation />
      <SEO
        title="Эпизоды Rick and Morty - Полный каталог всех сезонов"
        description="Все эпизоды Rick and Morty с описаниями, рейтингами и датами выхода. Смотрите и обсуждайте лучшие моменты сериала. Полный каталог всех серий и сезонов."
        keywords="Rick and Morty эпизоды, все серии, сезоны, смотреть онлайн, описание эпизодов, каталог серий Рик и Морти, рейтинги эпизодов"
      />
      <div className="pt-20">
        <Breadcrumbs />
      </div>
      
      <section className="relative pt-12 pb-24 overflow-hidden bg-gradient-to-br from-cyan-600 via-green-500 to-blue-600">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30"></div>
        
        <div className="container relative z-10 px-4 text-center text-white">
          <Badge className="mb-6 bg-white/20 text-white border-white backdrop-blur-sm">
            <Icon name="Film" size={16} className="mr-2" />
            База эпизодов
          </Badge>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Все эпизоды
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Полная коллекция серий Rick and Morty с описаниями и рейтингами
          </p>

          <div className="flex justify-center gap-4 flex-wrap">
            <div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full">
              <Icon name="Film" size={20} className="inline mr-2" />
              <span className="font-bold">{episodes.length}</span> эпизодов
            </div>
            <div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full">
              <Icon name="Star" size={20} className="inline mr-2" />
              Рейтинг <span className="font-bold">8.7</span>/10
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="text-cyan-400 text-xl">Загрузка эпизодов...</div>
          </div>
        ) : (
          <>
        <div className="mb-8 space-y-6">
          <div className="relative">
            <Icon name="Search" size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
            <Input
              placeholder="Поиск эпизодов..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 bg-gray-800 border-gray-700 text-white placeholder:text-gray-300 h-14 text-lg"
            />
          </div>

          <div className="flex gap-2 flex-wrap">
            {seasons.map(season => (
              <Button
                key={season.id}
                onClick={() => setSelectedSeason(season.id)}
                variant={selectedSeason === season.id ? 'default' : 'outline'}
                className={
                  selectedSeason === season.id
                    ? 'bg-gradient-to-r from-cyan-600 to-green-600 text-white border-0'
                    : 'border-gray-700 text-gray-300 hover:bg-gray-800'
                }
              >
                {season.name}
                <Badge className="ml-2 bg-white/20" variant="secondary">{season.count}</Badge>
              </Button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEpisodes.map((episode) => (
            <Card 
              key={episode.id} 
              className="bg-gray-800/50 border-gray-700 overflow-hidden hover:border-cyan-500/50 transition-all cursor-pointer group"
              onClick={() => navigate(`/episode/${generateSlug(episode.id, episode.title)}`)}
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={episode.image || 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&auto=format&fit=crop'} 
                  alt={episode.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&auto=format&fit=crop';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
                <Badge className="absolute top-4 left-4 bg-gradient-to-r from-cyan-500 to-green-500 text-white border-0">
                  S{episode.season}E{episode.episode}
                </Badge>
                <Badge className={`absolute top-4 right-4 ${getRatingColor(episode.rating)}`}>
                  ⭐ {episode.rating}
                </Badge>
              </div>
              
              <CardHeader>
                <CardTitle className="text-xl text-white group-hover:text-cyan-400 transition-colors">
                  {episode.title}
                </CardTitle>
                <CardDescription className="text-gray-400 flex items-center gap-2">
                  <Icon name="Calendar" size={14} />
                  {episode.airDate}
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                  {episode.description}
                </p>
                
                <Button 
                  variant="outline" 
                  className="w-full border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10"
                >
                  <Icon name="Play" size={16} className="mr-2" />
                  Смотреть эпизод
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredEpisodes.length === 0 && (
          <div className="text-center py-20">
            <Icon name="FileQuestion" size={64} className="mx-auto text-gray-600 mb-4" />
            <h3 className="text-2xl font-bold text-gray-400 mb-2">Эпизоды не найдены</h3>
            <p className="text-gray-500">Попробуйте изменить параметры поиска</p>
          </div>
        )}
        </>
        )}

        <div className="mt-16 text-center">
          <Card className="bg-gray-800/60 backdrop-blur-sm border-gray-700/50 p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-100 mb-4 text-center">Хотите узнать больше?</h3>
            <p className="text-gray-400 text-center mb-6">
              Читайте наш блог с глубоким анализом эпизодов, теориями фанатов и интересными фактами о Rick and Morty
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <Link to="/blog" className="h-full">
                <Card className="bg-gray-800/80 border-cyan-500/30 p-6 hover:border-cyan-400 hover:bg-gray-700/80 transition-all group cursor-pointer h-full flex flex-col">
                  <Icon name="BookOpen" size={32} className="text-cyan-400 mb-3 group-hover:scale-110 transition-transform" />
                  <h4 className="text-white font-semibold mb-2 group-hover:text-cyan-400 transition-colors">Перейти в блог</h4>
                  <p className="text-gray-400 text-sm flex-grow">Глубокий анализ сериала</p>
                </Card>
              </Link>
              <Link to="/theories" className="h-full">
                <Card className="bg-gray-800/80 border-green-500/30 p-6 hover:border-green-400 hover:bg-gray-700/80 transition-all group cursor-pointer h-full flex flex-col">
                  <Icon name="Lightbulb" size={32} className="text-green-400 mb-3 group-hover:scale-110 transition-transform" />
                  <h4 className="text-white font-semibold mb-2 group-hover:text-green-400 transition-colors">Теории фанатов</h4>
                  <p className="text-gray-400 text-sm flex-grow">Разгадывай загадки сериала</p>
                </Card>
              </Link>
            </div>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Episodes;