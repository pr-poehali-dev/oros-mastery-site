import { useState, useEffect, useMemo, memo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import Footer from '@/components/Footer';
import { useNavigate } from 'react-router-dom';
import SEO from '@/components/SEO';
import Navigation from '@/components/Navigation';
import { generateSlug } from '@/utils/slugify';
import { useWatchedEpisodes } from '@/hooks/useWatchedEpisodes';
import WatchedEpisodes from '@/components/WatchedEpisodes';
import FAQ from '@/components/FAQ';
import SeoContent from '@/components/SeoContent';
import OptimizedImage from '@/components/OptimizedImage';
import { cachedFetch } from '@/utils/cache';

const EPISODES_API = 'https://functions.poehali.dev/031f0f01-3e0b-440b-a295-08f07c4d1389';
const BLOG_API = 'https://functions.poehali.dev/833cc9a4-513a-4d22-a390-4878941c0d71';
const CONTENT_API = 'https://functions.poehali.dev/a3182691-86a7-4e0e-8e97-a0951d94bfb4';

const Index = () => {
  const navigate = useNavigate();
  const [selectedSeason, setSelectedSeason] = useState('all');
  const [episodes, setEpisodes] = useState<any[]>([]);
  const [blogPosts, setBlogPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [blogLoading, setBlogLoading] = useState(true);
  const [stats, setStats] = useState({ episodes: 0, seasons: 0 });
  const { watchedEpisodes, removeWatched } = useWatchedEpisodes();

  useEffect(() => {
    fetchEpisodes();
    fetchBlogPosts();
  }, []);

  const fetchEpisodes = async () => {
    try {
      const data = await cachedFetch<any[]>(EPISODES_API);
      setEpisodes(data);
      
      const uniqueSeasons = new Set(data.map((ep: any) => ep.season));
      setStats({
        episodes: data.length,
        seasons: uniqueSeasons.size
      });
    } catch (error) {
      console.error('Error fetching episodes:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchBlogPosts = async () => {
    try {
      const [blogData, articlesData] = await Promise.all([
        cachedFetch<any[]>(BLOG_API),
        cachedFetch<any[]>(`${CONTENT_API}?type=articles`)
      ]);
      
      const validBlogData = Array.isArray(blogData) ? blogData : [];
      const validArticlesData = Array.isArray(articlesData) ? articlesData : [];
      
      const combinedPosts = [...validBlogData, ...validArticlesData];
      setBlogPosts(combinedPosts);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
    } finally {
      setBlogLoading(false);
    }
  };

  const blogPostsPreview = useMemo(() => blogPosts.slice(0, 3), [blogPosts]);

  const filteredEpisodes = useMemo(() => 
    selectedSeason === 'all' 
      ? episodes 
      : episodes.filter(ep => ep.season === parseInt(selectedSeason)),
    [episodes, selectedSeason]
  );

  const availableSeasons = useMemo(() => 
    Array.from(new Set(episodes.map(ep => ep.season))).sort((a, b) => a - b),
    [episodes]
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      <SEO
        title="Смотреть все сезоны Рик и Морти онлайн бесплатно в HD качестве"
        description="Все серии Рик и Морти (Rick and Morty) смотреть онлайн в хорошем HD качестве с русской озвучкой бесплатно. Полная коллекция эпизодов всех сезонов, блог с теориями, персонажи и вселенные мультсериала Adult Swim. Смотрите на любом устройстве без регистрации."
        keywords="Рик и Морти смотреть онлайн, Rick and Morty на русском, все серии Рик и Морти, HD качество, бесплатно, без регистрации, Adult Swim, мультсериал, все сезоны, эпизоды, русская озвучка, анимация"
        url="https://rick-and-morty.poehali.dev/"
      />
      <Navigation />
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
              loading="eager"
              fetchpriority="high"
              width="256"
              height="256"
            />
          </div>

          <Badge className="mb-6 bg-green-400/20 text-white border-green-400 backdrop-blur-sm text-sm px-6 py-2">
            🛸 Wubba Lubba Dub Dub!
          </Badge>
          
          <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight">
            Рик и Морти
            <span className="block text-green-400 mt-2 text-5xl md:text-6xl">Universe Portal</span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto font-light leading-relaxed">
            Смотри все серии, читай теории и погружайся в бесконечную мультивселенную!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="bg-green-400 text-gray-900 hover:bg-green-500 hover:text-white text-lg px-8 py-6 h-auto font-bold shadow-2xl transform hover:scale-105 transition-all"
              onClick={() => document.getElementById('episodes')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Icon name="Play" className="mr-2" size={20} />
              Смотреть серии
            </Button>
            
            <Button 
              size="lg" 
              variant="outline" 
              className="bg-transparent border-2 border-white text-white hover:bg-white/10 hover:border-green-400 text-lg px-8 py-6 h-auto font-bold backdrop-blur-sm transform hover:scale-105 transition-all"
              onClick={() => document.getElementById('blog')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Icon name="BookOpen" className="mr-2" size={20} />
              Читать блог
            </Button>
          </div>

          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 animate-slide-up">
              <div className="text-3xl mb-2">🎬</div>
              <div className="text-2xl font-bold mb-1">{loading ? '...' : stats.episodes}</div>
              <div className="text-white/90 text-sm">Серий</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <div className="text-3xl mb-2">📺</div>
              <div className="text-2xl font-bold mb-1">{loading ? '...' : stats.seasons}</div>
              <div className="text-white/90 text-sm">Сезонов</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="text-3xl mb-2">🌌</div>
              <div className="text-2xl font-bold mb-1">∞</div>
              <div className="text-white/90 text-sm">Вселенных</div>
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
          <WatchedEpisodes episodes={watchedEpisodes} onRemove={removeWatched} />
          
          <div className="text-center mb-12 animate-fade-in">
            <Badge className="mb-4 bg-green-400/20 text-green-400 border-green-400">Все серии</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Каталог эпизодов Rick and Morty</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Выбери сезон и начни просмотр прямо сейчас
            </p>
          </div>

          <Tabs defaultValue="all" className="w-full max-w-6xl mx-auto mb-8" onValueChange={setSelectedSeason}>
            <TabsList className="flex flex-wrap justify-center gap-2 w-full max-w-4xl mx-auto bg-gray-800 mb-12 p-2 min-h-fit">
              <TabsTrigger value="all" className="data-[state=active]:bg-green-400 data-[state=active]:text-gray-900">Все</TabsTrigger>
              {availableSeasons.map(season => (
                <TabsTrigger 
                  key={season} 
                  value={season.toString()} 
                  className="data-[state=active]:bg-green-400 data-[state=active]:text-gray-900"
                >
                  Сезон {season}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value={selectedSeason} className="mt-0">
              {loading ? (
                <div className="flex justify-center items-center py-20">
                  <div className="text-green-400 text-xl">Загрузка эпизодов...</div>
                </div>
              ) : filteredEpisodes.length === 0 ? (
                <div className="text-center py-20 text-gray-400">
                  <p className="text-xl">Эпизоды не найдены</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                  {filteredEpisodes.map((episode, index) => (
                  <Card 
                    key={episode.id} 
                    className="bg-gray-800 border-gray-700 hover:border-green-400 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-green-400/20 group animate-scale-in overflow-hidden cursor-pointer"
                    style={{ animationDelay: `${index * 0.1}s` }}
                    onClick={() => navigate(`/episode/${generateSlug(episode.id, episode.title)}`)}
                  >
                    <div className="relative overflow-hidden aspect-video">
                      <OptimizedImage 
                        src={episode.image} 
                        alt={`${episode.title} - сезон ${episode.season} эпизод ${episode.episode}`}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        priority={index < 3}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60"></div>
                      <Badge className="absolute top-3 left-3 bg-green-400 text-gray-900 border-0 font-semibold">
                        {episode.season} сезон {episode.episode} серия
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
                      <CardDescription className="flex items-center justify-between text-gray-300">
                        <span className="flex items-center gap-1">
                          <Icon name="Calendar" size={14} />
                          {episode.airDate || 'TBA'}
                        </span>
                        <span className="flex items-center gap-1 text-green-400">
                          <Icon name="Film" size={14} />
                          S{episode.season}E{episode.episode}
                        </span>
                      </CardDescription>
                    </CardHeader>
                  </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <section id="blog" className="py-24 bg-gradient-to-b from-gray-900 to-gray-800 text-white">
        <div className="container px-4">
          <div className="text-center mb-12 animate-fade-in">
            <Badge className="mb-4 bg-cyan-400/20 text-cyan-400 border-cyan-400">Блог</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Блог о Rick and Morty: Статьи и теории</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Глубокий разбор сериала, теории фанатов и интересные факты
            </p>
          </div>

          {blogLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="text-cyan-400 text-xl">Загрузка статей...</div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {blogPostsPreview.map((post, index) => (
                <Card 
                  key={post.id} 
                  className="bg-gray-800 border-gray-700 hover:border-cyan-400 transition-all duration-300 transform hover:-translate-y-2 group animate-scale-in overflow-hidden flex flex-col cursor-pointer"
                  style={{ animationDelay: `${index * 0.15}s` }}
                  onClick={() => navigate(`/blog/${generateSlug(post.id, post.title)}`)}
                >
                  <div className="relative overflow-hidden aspect-video">
                    <OptimizedImage 
                      src={post.image} 
                      alt={`${post.title} - статья в блоге Rick and Morty`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      priority={index < 3}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60"></div>
                  </div>

                  <CardHeader className="flex-grow">
                    <div className="flex gap-2 mb-3">
                      {post.tags && post.tags.map((tag, idx) => (
                        <Badge key={idx} className="bg-cyan-400/20 text-cyan-400 border-cyan-400/50 text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  <CardTitle className="text-xl text-white group-hover:text-cyan-400 transition-colors mb-2">
                    {post.title}
                  </CardTitle>
                  <CardDescription className="text-gray-300 leading-relaxed mb-4">
                    {post.excerpt}
                  </CardDescription>
                </CardHeader>

                <CardContent className="mt-auto">
                  <div className="flex items-center justify-between text-sm text-gray-300 mb-4">
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
          )}

          <div className="text-center mt-12">
            <Button 
              size="lg" 
              className="bg-cyan-400 text-gray-900 hover:bg-cyan-300 font-bold"
              onClick={() => navigate('/blog')}
            >
              <Icon name="FileText" className="mr-2" size={20} />
              Все статьи блога
            </Button>
          </div>
        </div>
      </section>

      <SeoContent />

      <section className="py-20 bg-gray-900 text-white">
        <div className="container px-4">
          <div className="max-w-5xl mx-auto">
            <FAQ items={[
              {
                question: 'Где смотреть Рик и Морти онлайн бесплатно в хорошем качестве?',
                answer: 'На нашем сайте вы можете смотреть все серии Рик и Морти онлайн бесплатно в HD качестве с русской озвучкой. Доступны все сезоны без регистрации. Выберите нужный эпизод и начните просмотр прямо сейчас на любом устройстве.'
              },
              {
                question: 'Сколько сезонов Рик и Морти вышло на данный момент?',
                answer: 'На данный момент вышло 7 сезонов Rick and Morty. Канал Adult Swim продлил сериал ещё на 70 эпизодов, так что фанатов ждёт множество новых приключений Рика и Морти в мультивселенной!'
              },
              {
                question: 'Можно ли смотреть Рик и Морти на телефоне или планшете?',
                answer: 'Да! Наш сайт полностью адаптирован для мобильных устройств. Вы можете смотреть все серии Рик и Морти на телефоне, планшете или компьютере. Видеоплеер автоматически подстраивается под размер экрана для комфортного просмотра.'
              },
              {
                question: 'Есть ли русская озвучка в эпизодах Rick and Morty?',
                answer: 'Да, все эпизоды доступны с профессиональной русской озвучкой. Также доступна оригинальная английская озвучка для тех, кто хочет смотреть в оригинале или изучает английский язык.'
              },
              {
                question: 'Нужна ли регистрация для просмотра эпизодов?',
                answer: 'Нет, регистрация не требуется! Вы можете начать смотреть Рик и Морти онлайн прямо сейчас без создания аккаунта. Просто выберите эпизод и наслаждайтесь просмотром.'
              },
              {
                question: 'Какая серия Рик и Морти самая популярная?',
                answer: 'Среди самых популярных эпизодов: "Огурчик Рик" (S3E3), "Свадебные корки" (S2E6), "Межпространственный кабель" (S1E8). Каждый эпизод на нашем сайте имеет рейтинг и комментарии зрителей, где вы можете узнать мнение других фанатов.'
              }
            ]} />
            <div className="text-center mb-12 mt-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Исследуй вселенную Rick and Morty
              </h2>
              <p className="text-xl text-gray-300">
                Множество разделов ждут тебя в путешествии по мультивселенной
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card 
                className="bg-gray-800/80 border-cyan-500/30 p-6 hover:border-cyan-400 transition-all hover:scale-105 cursor-pointer group"
                onClick={() => navigate('/episodes')}
              >
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon name="Play" size={32} className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-cyan-400 group-hover:text-cyan-300">Эпизоды</h3>
                  <p className="text-gray-400 text-sm">Полный каталог всех серий с описаниями</p>
                </div>
              </Card>

              <Card 
                className="bg-gray-800/80 border-purple-500/30 p-6 hover:border-purple-400 transition-all hover:scale-105 cursor-pointer group"
                onClick={() => navigate('/theories')}
              >
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon name="Lightbulb" size={32} className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-purple-400 group-hover:text-purple-300">Теории</h3>
                  <p className="text-gray-400 text-sm">Разгадывай тайны сериала вместе с фанатами</p>
                </div>
              </Card>

              <Card 
                className="bg-gray-800/80 border-green-500/30 p-6 hover:border-green-400 transition-all hover:scale-105 cursor-pointer group"
                onClick={() => navigate('/characters')}
              >
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon name="Users" size={32} className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-green-400 group-hover:text-green-300">Персонажи</h3>
                  <p className="text-gray-400 text-sm">Узнай больше о героях мультивселенной</p>
                </div>
              </Card>

              <Card 
                className="bg-gray-800/80 border-yellow-500/30 p-6 hover:border-yellow-400 transition-all hover:scale-105 cursor-pointer group"
                onClick={() => navigate('/universes')}
              >
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon name="Globe" size={32} className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-yellow-400 group-hover:text-yellow-300">Вселенные</h3>
                  <p className="text-gray-400 text-sm">Исследуй параллельные миры и измерения</p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;