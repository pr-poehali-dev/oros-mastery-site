import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [selectedSeason, setSelectedSeason] = useState('all');

  const episodes = [
    { id: 1, season: 1, episode: 1, title: 'Pilot', duration: '22 min', rating: 8.2, image: 'https://cdn.poehali.dev/projects/f9f23ac4-7352-47dd-a4bb-81301617dd90/files/54ad156d-f2d1-49cc-9d49-a0e720719998.jpg' },
    { id: 2, season: 1, episode: 2, title: 'Lawnmower Dog', duration: '22 min', rating: 8.5, image: 'https://cdn.poehali.dev/projects/f9f23ac4-7352-47dd-a4bb-81301617dd90/files/d490fe60-e1ff-4015-8de4-bb5defe289ae.jpg' },
    { id: 3, season: 1, episode: 3, title: 'Anatomy Park', duration: '22 min', rating: 8.3, image: 'https://cdn.poehali.dev/projects/f9f23ac4-7352-47dd-a4bb-81301617dd90/files/b9f7c54d-44b3-419e-a414-f00ff618c62e.jpg' },
    { id: 4, season: 2, episode: 1, title: 'A Rickle in Time', duration: '22 min', rating: 9.1, image: 'https://cdn.poehali.dev/projects/f9f23ac4-7352-47dd-a4bb-81301617dd90/files/54ad156d-f2d1-49cc-9d49-a0e720719998.jpg' },
    { id: 5, season: 2, episode: 2, title: 'Mortynight Run', duration: '22 min', rating: 8.6, image: 'https://cdn.poehali.dev/projects/f9f23ac4-7352-47dd-a4bb-81301617dd90/files/d490fe60-e1ff-4015-8de4-bb5defe289ae.jpg' },
    { id: 6, season: 3, episode: 1, title: 'The Rickshank Rickdemption', duration: '22 min', rating: 9.8, image: 'https://cdn.poehali.dev/projects/f9f23ac4-7352-47dd-a4bb-81301617dd90/files/b9f7c54d-44b3-419e-a414-f00ff618c62e.jpg' }
  ];

  const blogPosts = [
    {
      id: 1,
      title: 'Топ-10 лучших эпизодов Rick and Morty',
      excerpt: 'Разбираем самые запоминающиеся и философские эпизоды сериала, которые заставляют задуматься о вселенной.',
      author: 'Рик Санчез',
      date: '15 окт 2024',
      readTime: '5 мин',
      image: 'https://cdn.poehali.dev/projects/f9f23ac4-7352-47dd-a4bb-81301617dd90/files/d490fe60-e1ff-4015-8de4-bb5defe289ae.jpg',
      tags: ['Episodes', 'Top']
    },
    {
      id: 2,
      title: 'Теория мультивселенной в Rick and Morty',
      excerpt: 'Как сериал использует концепцию бесконечных миров и что это говорит о нашей реальности.',
      author: 'Морти Смит',
      date: '10 окт 2024',
      readTime: '8 мин',
      image: 'https://cdn.poehali.dev/projects/f9f23ac4-7352-47dd-a4bb-81301617dd90/files/54ad156d-f2d1-49cc-9d49-a0e720719998.jpg',
      tags: ['Theory', 'Science']
    },
    {
      id: 3,
      title: 'Все пасхалки 5 сезона',
      excerpt: 'Собрали все отсылки, скрытые детали и пасхалки из последнего сезона сериала.',
      author: 'Саммер Смит',
      date: '5 окт 2024',
      readTime: '6 мин',
      image: 'https://cdn.poehali.dev/projects/f9f23ac4-7352-47dd-a4bb-81301617dd90/files/b9f7c54d-44b3-419e-a414-f00ff618c62e.jpg',
      tags: ['Easter Eggs', 'Season 5']
    }
  ];

  const filteredEpisodes = selectedSeason === 'all' 
    ? episodes 
    : episodes.filter(ep => ep.season === parseInt(selectedSeason));

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-cyan-600 via-green-500 to-blue-600">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30"></div>
        
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-green-400 rounded-full blur-[120px] opacity-40 animate-pulse"></div>
          <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-cyan-400 rounded-full blur-[100px] opacity-30 animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="container relative z-10 px-4 py-20 text-center text-white animate-fade-in">
          <div className="mb-8 inline-block relative">
            <div className="absolute inset-0 bg-green-400 blur-2xl opacity-50 animate-pulse"></div>
            <img 
              src="https://cdn.poehali.dev/projects/f9f23ac4-7352-47dd-a4bb-81301617dd90/files/54ad156d-f2d1-49cc-9d49-a0e720719998.jpg" 
              alt="Portal"
              className="relative w-64 h-64 object-cover rounded-full border-4 border-green-400 shadow-2xl"
            />
          </div>

          <Badge className="mb-6 bg-green-400/20 text-white border-green-400 backdrop-blur-sm text-sm px-6 py-2">
            🛸 Wubba Lubba Dub Dub!
          </Badge>
          
          <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight">
            Rick and Morty
            <span className="block text-green-400 mt-2 text-5xl md:text-6xl">Universe Portal</span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto font-light leading-relaxed">
            Смотри все серии, читай теории и погружайся в бесконечную мультивселенную!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="bg-green-400 text-gray-900 hover:bg-green-300 text-lg px-8 py-6 h-auto font-bold shadow-2xl transform hover:scale-105 transition-all"
              onClick={() => document.getElementById('episodes')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Icon name="Play" className="mr-2" size={20} />
              Смотреть серии
            </Button>
            
            <Button 
              size="lg" 
              variant="outline" 
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-gray-900 text-lg px-8 py-6 h-auto font-bold backdrop-blur-sm transform hover:scale-105 transition-all"
              onClick={() => document.getElementById('blog')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Icon name="BookOpen" className="mr-2" size={20} />
              Читать блог
            </Button>
          </div>

          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 animate-slide-up">
              <div className="text-3xl mb-2">🔬</div>
              <div className="text-2xl font-bold mb-1">200+</div>
              <div className="text-white/90 text-sm">Эпизодов</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <div className="text-3xl mb-2">🌌</div>
              <div className="text-2xl font-bold mb-1">∞</div>
              <div className="text-white/90 text-sm">Вселенных</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="text-3xl mb-2">👽</div>
              <div className="text-2xl font-bold mb-1">500+</div>
              <div className="text-white/90 text-sm">Персонажей</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <div className="text-3xl mb-2">⭐</div>
              <div className="text-2xl font-bold mb-1">9.1</div>
              <div className="text-white/90 text-sm">Рейтинг</div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <Icon name="ChevronDown" size={40} className="text-white/70" />
        </div>
      </section>

      <section id="episodes" className="py-24 bg-gray-900 text-white">
        <div className="container px-4">
          <div className="text-center mb-12 animate-fade-in">
            <Badge className="mb-4 bg-green-400/20 text-green-400 border-green-400">Все серии</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Каталог эпизодов</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Выбери сезон и начни просмотр прямо сейчас
            </p>
          </div>

          <Tabs defaultValue="all" className="w-full max-w-6xl mx-auto mb-8" onValueChange={setSelectedSeason}>
            <TabsList className="grid grid-cols-5 w-full max-w-2xl mx-auto bg-gray-800 mb-12">
              <TabsTrigger value="all" className="data-[state=active]:bg-green-400 data-[state=active]:text-gray-900">Все</TabsTrigger>
              <TabsTrigger value="1" className="data-[state=active]:bg-green-400 data-[state=active]:text-gray-900">Сезон 1</TabsTrigger>
              <TabsTrigger value="2" className="data-[state=active]:bg-green-400 data-[state=active]:text-gray-900">Сезон 2</TabsTrigger>
              <TabsTrigger value="3" className="data-[state=active]:bg-green-400 data-[state=active]:text-gray-900">Сезон 3</TabsTrigger>
              <TabsTrigger value="4" className="data-[state=active]:bg-green-400 data-[state=active]:text-gray-900">Сезон 4</TabsTrigger>
            </TabsList>

            <TabsContent value={selectedSeason} className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                {filteredEpisodes.map((episode, index) => (
                  <Card 
                    key={episode.id} 
                    className="bg-gray-800 border-gray-700 hover:border-green-400 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-green-400/20 group animate-scale-in overflow-hidden"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="relative overflow-hidden aspect-video">
                      <img 
                        src={episode.image} 
                        alt={episode.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60"></div>
                      <Badge className="absolute top-3 left-3 bg-green-400 text-gray-900 border-0">
                        S{episode.season}E{episode.episode}
                      </Badge>
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/50">
                        <Button className="bg-green-400 text-gray-900 hover:bg-green-300 font-bold">
                          <Icon name="Play" className="mr-2" size={20} />
                          Смотреть
                        </Button>
                      </div>
                    </div>

                    <CardHeader>
                      <CardTitle className="text-white group-hover:text-green-400 transition-colors">
                        {episode.title}
                      </CardTitle>
                      <CardDescription className="flex items-center justify-between text-gray-400">
                        <span className="flex items-center gap-1">
                          <Icon name="Clock" size={14} />
                          {episode.duration}
                        </span>
                        <span className="flex items-center gap-1 text-yellow-400">
                          <Icon name="Star" size={14} className="fill-yellow-400" />
                          {episode.rating}
                        </span>
                      </CardDescription>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <section id="blog" className="py-24 bg-gradient-to-b from-gray-900 to-gray-800 text-white">
        <div className="container px-4">
          <div className="text-center mb-12 animate-fade-in">
            <Badge className="mb-4 bg-cyan-400/20 text-cyan-400 border-cyan-400">Блог</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Статьи и теории</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Глубокий разбор сериала, теории фанатов и интересные факты
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {blogPosts.map((post, index) => (
              <Card 
                key={post.id} 
                className="bg-gray-800 border-gray-700 hover:border-cyan-400 transition-all duration-300 transform hover:-translate-y-2 group animate-scale-in overflow-hidden"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="relative overflow-hidden aspect-video">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60"></div>
                </div>

                <CardHeader>
                  <div className="flex gap-2 mb-3">
                    {post.tags.map((tag, idx) => (
                      <Badge key={idx} className="bg-cyan-400/20 text-cyan-400 border-cyan-400/50 text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <CardTitle className="text-xl text-white group-hover:text-cyan-400 transition-colors mb-2">
                    {post.title}
                  </CardTitle>
                  <CardDescription className="text-gray-400 leading-relaxed mb-4">
                    {post.excerpt}
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-2">
                      <Icon name="User" size={14} />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <Icon name="Calendar" size={14} />
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Icon name="Clock" size={14} />
                        {post.readTime}
                      </span>
                    </div>
                  </div>

                  <Button 
                    className="w-full bg-transparent border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-gray-900 font-semibold"
                  >
                    Читать полностью
                    <Icon name="ArrowRight" className="ml-2" size={16} />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button 
              size="lg" 
              className="bg-cyan-400 text-gray-900 hover:bg-cyan-300 font-bold"
              onClick={() => window.location.href = '/blog'}
            >
              <Icon name="FileText" className="mr-2" size={20} />
              Все статьи блога
            </Button>
          </div>
        </div>
      </section>

      <footer className="bg-gray-950 text-white py-16 border-t border-gray-800">
        <div className="container px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div className="md:col-span-2">
              <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
                Rick and Morty Portal
              </h3>
              <p className="text-gray-400 leading-relaxed mb-4">
                Твой путеводитель по бесконечной мультивселенной Rick and Morty. Смотри серии, читай теории и открывай новые измерения!
              </p>
              <div className="flex gap-3">
                <Button size="sm" className="bg-green-400 text-gray-900 hover:bg-green-300">
                  <Icon name="Youtube" size={18} />
                </Button>
                <Button size="sm" className="bg-cyan-400 text-gray-900 hover:bg-cyan-300">
                  <Icon name="Twitter" size={18} />
                </Button>
                <Button size="sm" className="bg-blue-400 text-gray-900 hover:bg-blue-300">
                  <Icon name="Facebook" size={18} />
                </Button>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold mb-4 text-lg text-green-400">Навигация</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#episodes" className="hover:text-green-400 transition-colors flex items-center gap-2">
                    <Icon name="ChevronRight" size={16} />
                    Все серии
                  </a>
                </li>
                <li>
                  <a href="#blog" className="hover:text-green-400 transition-colors flex items-center gap-2">
                    <Icon name="ChevronRight" size={16} />
                    Блог
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-green-400 transition-colors flex items-center gap-2">
                    <Icon name="ChevronRight" size={16} />
                    Персонажи
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-green-400 transition-colors flex items-center gap-2">
                    <Icon name="ChevronRight" size={16} />
                    Теории
                  </a>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4 text-lg text-cyan-400">Информация</h4>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center gap-2">
                  <Icon name="Tv" size={16} />
                  Adult Swim
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="Calendar" size={16} />
                  С 2013 года
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="Users" size={16} />
                  Фанатское сообщество
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 text-center text-gray-500">
            <p className="mb-2">
              Фанатский сайт Rick and Morty. Все права на контент принадлежат Adult Swim и создателям сериала.
            </p>
            <p>&copy; 2025 Rick and Morty Universe Portal. Made with 💚 by fans for fans.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;