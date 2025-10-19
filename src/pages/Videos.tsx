import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import Navigation from '@/components/Navigation';
import SEO from '@/components/SEO';
import VideoPlayer from '@/components/VideoPlayer';

const Videos = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const videos = [
    {
      id: 1,
      title: 'Официальный трейлер 1 сезона',
      url: 'https://www.youtube.com/watch?v=WNhH00ZDGR8',
      category: 'trailers',
      description: 'Первый трейлер сериала Rick and Morty',
      views: '15M',
      duration: '2:15'
    },
    {
      id: 2,
      title: 'Лучшие моменты Рика',
      url: 'https://www.youtube.com/watch?v=E_BZGwB1wq8',
      category: 'compilations',
      description: 'Подборка самых смешных и безумных моментов Рика',
      views: '8.2M',
      duration: '15:30'
    },
    {
      id: 3,
      title: 'Разбор теории мультивселенной',
      url: 'https://www.youtube.com/watch?v=W1Kgl9aqOnI',
      category: 'theories',
      description: 'Научный анализ концепции мультивселенной в сериале',
      views: '3.5M',
      duration: '18:42'
    },
    {
      id: 4,
      title: 'Behind the Scenes - Создание персонажей',
      url: 'https://www.youtube.com/watch?v=hx26hSaL_1o',
      category: 'behind-scenes',
      description: 'Как создавались любимые персонажи сериала',
      views: '2.1M',
      duration: '12:05'
    },
    {
      id: 5,
      title: 'Pickle Rick - Полная версия',
      url: 'https://www.youtube.com/watch?v=tST36NJkVvk',
      category: 'episodes',
      description: 'Культовый эпизод про Рика-огурца',
      views: '22M',
      duration: '21:30'
    },
    {
      id: 6,
      title: 'Эволюция анимации Rick and Morty',
      url: 'https://www.youtube.com/watch?v=tF1FM8W0fvE',
      category: 'behind-scenes',
      description: 'Как менялась анимация от пилота до последнего сезона',
      views: '1.8M',
      duration: '10:20'
    }
  ];

  const categories = [
    { id: 'all', name: 'Все видео', icon: 'Video' },
    { id: 'trailers', name: 'Трейлеры', icon: 'Film' },
    { id: 'episodes', name: 'Эпизоды', icon: 'Play' },
    { id: 'compilations', name: 'Подборки', icon: 'List' },
    { id: 'theories', name: 'Теории', icon: 'Lightbulb' },
    { id: 'behind-scenes', name: 'За кадром', icon: 'Camera' }
  ];

  const filteredVideos = videos.filter(video => {
    const matchesCategory = selectedCategory === 'all' || video.category === selectedCategory;
    const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         video.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      <Navigation />
      <SEO
        title="Видео"
        description="Смотрите трейлеры, эпизоды, подборки и теории о Rick and Morty. Полная коллекция видео контента."
        keywords="Rick and Morty видео, трейлеры, эпизоды, подборки, теории"
      />
      
      <section className="relative pt-32 pb-24 overflow-hidden bg-gradient-to-br from-purple-600 via-pink-500 to-orange-600">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30"></div>
        
        <div className="container relative z-10 px-4 text-center text-white">
          <Badge className="mb-6 bg-white/20 text-white border-white backdrop-blur-sm">
            <Icon name="Video" size={16} className="mr-2" />
            Видео контент
          </Badge>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Видеотека
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Трейлеры, эпизоды, теории и эксклюзивный контент
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        <div className="mb-8 space-y-6">
          <div className="relative">
            <Icon name="Search" size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Поиск видео..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 h-14 text-lg"
            />
          </div>

          <div className="flex gap-2 flex-wrap">
            {categories.map(cat => (
              <Button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                variant={selectedCategory === cat.id ? 'default' : 'outline'}
                className={
                  selectedCategory === cat.id
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0'
                    : 'border-gray-700 text-gray-300 hover:bg-gray-800'
                }
              >
                <Icon name={cat.icon as any} size={16} className="mr-2" />
                {cat.name}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.map((video) => (
            <Card key={video.id} className="bg-gray-800/50 border-gray-700 overflow-hidden hover:border-purple-500/50 transition-all">
              <CardHeader className="p-0">
                <VideoPlayer url={video.url} title={video.title} />
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                    {categories.find(c => c.id === video.category)?.name}
                  </Badge>
                  <span className="text-gray-400 text-sm">{video.duration}</span>
                </div>
                <CardTitle className="text-xl text-white mb-2">{video.title}</CardTitle>
                <CardDescription className="text-gray-400 mb-4">
                  {video.description}
                </CardDescription>
                <div className="flex items-center gap-4 text-gray-400 text-sm">
                  <div className="flex items-center gap-1">
                    <Icon name="Eye" size={16} />
                    <span>{video.views}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredVideos.length === 0 && (
          <div className="text-center py-20">
            <Icon name="VideoOff" size={64} className="mx-auto text-gray-600 mb-4" />
            <h3 className="text-2xl font-bold text-gray-400 mb-2">Видео не найдены</h3>
            <p className="text-gray-500">Попробуйте изменить параметры поиска</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Videos;
