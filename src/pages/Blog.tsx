import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import Breadcrumbs from '@/components/Breadcrumbs';
import SEO from '@/components/SEO';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { generateSlug } from '@/utils/slugify';

const BLOG_API = 'https://functions.poehali.dev/833cc9a4-513a-4d22-a390-4878941c0d71';

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const navigate = useNavigate();
  const [blogPosts, setBlogPosts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([{ id: 'all', name: 'Все статьи', icon: 'FileText' }]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogPosts();
  }, []);

  const fetchBlogPosts = async () => {
    try {
      const response = await fetch(BLOG_API);
      const data = await response.json();
      setBlogPosts(data);
      
      const uniqueCategories = Array.from(new Set(data.map((post: any) => post.category).filter(Boolean)));
      const categoryMap: Record<string, { name: string; icon: string }> = {
        'episodes': { name: 'Эпизоды', icon: 'Play' },
        'theory': { name: 'Теории', icon: 'Lightbulb' },
        'Анализ': { name: 'Анализ', icon: 'Search' },
        'Теории': { name: 'Теории', icon: 'Lightbulb' },
        'Персонажи': { name: 'Персонажи', icon: 'Users' },
        'Пасхалки': { name: 'Пасхалки', icon: 'Eye' },
        'Философия': { name: 'Философия', icon: 'Brain' },
        'characters': { name: 'Персонажи', icon: 'Users' },
        'easter-eggs': { name: 'Пасхалки', icon: 'Eye' },
        'technology': { name: 'Технологии', icon: 'Cpu' },
        'quotes': { name: 'Цитаты', icon: 'Quote' },
        'music': { name: 'Музыка', icon: 'Music' },
        'philosophy': { name: 'Философия', icon: 'Brain' }
      };
      
      const dynamicCategories = uniqueCategories.map((cat: any) => ({
        id: cat,
        name: categoryMap[cat]?.name || cat,
        icon: categoryMap[cat]?.icon || 'FileText'
      }));
      
      setCategories([{ id: 'all', name: 'Все статьи', icon: 'FileText' }, ...dynamicCategories]);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const blogPostsOld = [
    {
      id: 1,
      title: 'Топ-10 лучших эпизодов Rick and Morty',
      excerpt: 'Разбираем самые запоминающиеся и философские эпизоды сериала, которые заставляют задуматься о вселенной и нашем месте в ней.',
      author: 'Рик Санчез',
      date: '15 окт 2024',
      readTime: '5 мин',
      image: 'https://cdn.poehali.dev/projects/f9f23ac4-7352-47dd-a4bb-81301617dd90/files/d490fe60-e1ff-4015-8de4-bb5defe289ae.jpg',
      category: 'episodes',
      tags: ['Episodes', 'Top', 'Review']
    },
    {
      id: 2,
      title: 'Теория мультивселенной в Rick and Morty',
      excerpt: 'Как сериал использует концепцию бесконечных миров и что это говорит о нашей реальности. Разбираем научные основы.',
      author: 'Морти Смит',
      date: '10 окт 2024',
      readTime: '8 мин',
      image: 'https://cdn.poehali.dev/projects/f9f23ac4-7352-47dd-a4bb-81301617dd90/files/54ad156d-f2d1-49cc-9d49-a0e720719998.jpg',
      category: 'theory',
      tags: ['Theory', 'Science', 'Multiverse']
    },
    {
      id: 3,
      title: 'Все пасхалки 5 сезона',
      excerpt: 'Собрали все отсылки, скрытые детали и пасхалки из последнего сезона сериала. Вы точно что-то пропустили!',
      author: 'Саммер Смит',
      date: '5 окт 2024',
      readTime: '6 мин',
      image: 'https://cdn.poehali.dev/projects/f9f23ac4-7352-47dd-a4bb-81301617dd90/files/b9f7c54d-44b3-419e-a414-f00ff618c62e.jpg',
      category: 'easter-eggs',
      tags: ['Easter Eggs', 'Season 5', 'Details']
    },
    {
      id: 4,
      title: 'Эволюция персонажей за 5 сезонов',
      excerpt: 'Как менялись главные герои от первого до пятого сезона. Анализ характеров и развития сюжетных арок.',
      author: 'Бёрдперсон',
      date: '1 окт 2024',
      readTime: '10 мин',
      image: 'https://cdn.poehali.dev/projects/f9f23ac4-7352-47dd-a4bb-81301617dd90/files/d490fe60-e1ff-4015-8de4-bb5defe289ae.jpg',
      category: 'characters',
      tags: ['Characters', 'Analysis', 'Development']
    },
    {
      id: 5,
      title: 'Философия нигилизма в сериале',
      excerpt: 'Почему Rick and Morty — это больше, чем просто мультик. Разбираем философские концепции и экзистенциализм.',
      author: 'Мистер Мисикс',
      date: '28 сен 2024',
      readTime: '12 мин',
      image: 'https://cdn.poehali.dev/projects/f9f23ac4-7352-47dd-a4bb-81301617dd90/files/54ad156d-f2d1-49cc-9d49-a0e720719998.jpg',
      category: 'theory',
      tags: ['Philosophy', 'Nihilism', 'Deep Dive']
    },
    {
      id: 6,
      title: 'Самые смешные моменты сериала',
      excerpt: 'Подборка самых забавных сцен и диалогов, которые заставили нас смеяться до слёз. С таймкодами!',
      author: 'Джерри Смит',
      date: '25 сен 2024',
      readTime: '4 мин',
      image: 'https://cdn.poehali.dev/projects/f9f23ac4-7352-47dd-a4bb-81301617dd90/files/b9f7c54d-44b3-419e-a414-f00ff618c62e.jpg',
      category: 'episodes',
      tags: ['Funny', 'Best Moments', 'Comedy']
    },
    {
      id: 7,
      title: 'Научная достоверность изобретений Рика',
      excerpt: 'Насколько реальны технологии из сериала? Физик анализирует портальную пушку и другие устройства.',
      author: 'Доктор Вонг',
      date: '20 сен 2024',
      readTime: '9 мин',
      image: 'https://cdn.poehali.dev/projects/f9f23ac4-7352-47dd-a4bb-81301617dd90/files/d490fe60-e1ff-4015-8de4-bb5defe289ae.jpg',
      category: 'theory',
      tags: ['Science', 'Technology', 'Physics']
    },
    {
      id: 8,
      title: 'Все альтернативные версии Рика',
      excerpt: 'Каталог всех Риков из разных измерений. От самого умного до самого глупого.',
      author: 'Рик Прайм',
      date: '15 сен 2024',
      readTime: '7 мин',
      image: 'https://cdn.poehali.dev/projects/f9f23ac4-7352-47dd-a4bb-81301617dd90/files/54ad156d-f2d1-49cc-9d49-a0e720719998.jpg',
      category: 'characters',
      tags: ['Rick', 'Multiverse', 'Characters']
    },
    {
      id: 9,
      title: 'Скрытые отсылки к классике sci-fi',
      excerpt: 'Все референсы к культовым фильмам и книгам научной фантастики, которые вы могли не заметить.',
      author: 'Саммер Смит',
      date: '10 сен 2024',
      readTime: '8 мин',
      image: 'https://cdn.poehali.dev/projects/f9f23ac4-7352-47dd-a4bb-81301617dd90/files/b9f7c54d-44b3-419e-a414-f00ff618c62e.jpg',
      category: 'easter-eggs',
      tags: ['References', 'Sci-Fi', 'Easter Eggs']
    }
  ];



  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      <Navigation />
      <Breadcrumbs />
      <SEO
        title="Блог Rick and Morty - Теории, анализ и факты"
        description="Блог о Rick and Morty - теории фанатов, анализ эпизодов, интересные факты, философские размышления и научные концепции из сериала. Глубокий разбор мультсериала."
        keywords="Rick and Morty блог, теории, анализ эпизодов, пасхалки, персонажи, философия, наука, блог Рик и Морти, статьи о сериале"
      />
      <section className="relative pt-32 pb-24 overflow-hidden bg-gradient-to-br from-cyan-600 via-green-500 to-blue-600">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30"></div>
        
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-green-400 rounded-full blur-[120px] opacity-30 animate-pulse"></div>
          <div className="absolute top-1/3 right-1/3 w-72 h-72 bg-cyan-400 rounded-full blur-[100px] opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="container relative z-10 px-4 text-center text-white">
          <Button 
            variant="ghost" 
            className="mb-6 text-white hover:text-white hover:bg-white/20"
            onClick={() => window.history.back()}
          >
            <Icon name="ArrowLeft" className="mr-2" size={20} />
            Назад на главную
          </Button>

          <Badge className="mb-6 bg-cyan-400/20 text-white border-cyan-400 backdrop-blur-sm text-sm px-6 py-2 animate-fade-in">
            📝 Блог о Rick and Morty
          </Badge>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight animate-fade-in">
            Статьи и теории
          </h1>
          
          <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto font-light leading-relaxed animate-fade-in">
            Глубокий разбор сериала, научные теории и интересные факты о мультивселенной
          </p>

          <div className="max-w-2xl mx-auto animate-scale-in">
            <div className="relative">
              <Icon name="Search" className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={20} />
              <Input
                type="text"
                placeholder="Поиск статей..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-14 bg-white/10 backdrop-blur-md border-white/20 text-white placeholder:text-white/60 text-lg"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-900">
        <div className="container px-4">
          <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
            {categories.map((category, index) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? 'default' : 'outline'}
                className={`whitespace-nowrap animate-slide-up ${
                  selectedCategory === category.id
                    ? 'bg-cyan-400 text-gray-900 hover:bg-cyan-300'
                    : 'bg-gray-800 text-white border-gray-700 hover:bg-gray-700'
                }`}
                onClick={() => setSelectedCategory(category.id)}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <Icon name={category.icon as any} className="mr-2" size={18} />
                {category.name}
              </Button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-900 text-white">
        <div className="container px-4">
          <div className="mb-8 flex items-center justify-between">
            <p className="text-gray-400">
              Найдено статей: <span className="text-cyan-400 font-bold">{filteredPosts.length}</span>
            </p>
          </div>

          {filteredPosts.length === 0 ? (
            <div className="text-center py-20">
              <Icon name="FileX" size={64} className="mx-auto mb-4 text-gray-600" />
              <h3 className="text-2xl font-bold mb-2">Статьи не найдены</h3>
              <p className="text-gray-400">Попробуйте изменить запрос или выбрать другую категорию</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {filteredPosts.map((post, index) => (
                <Card 
                  key={post.id} 
                  className="bg-gray-800 border-gray-700 hover:border-cyan-400 transition-all duration-300 transform hover:-translate-y-2 group animate-scale-in overflow-hidden flex flex-col"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="relative overflow-hidden aspect-video">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60"></div>
                    <Badge className="absolute top-3 right-3 bg-cyan-400 text-gray-800 border-0 font-semibold">
                      {post.readTime}
                    </Badge>
                  </div>

                  <CardHeader className="flex-grow">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {post.tags.map((tag, idx) => (
                        <Badge key={idx} className="bg-cyan-400/20 text-cyan-400 border-cyan-400/50 text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <CardTitle className="text-xl text-white group-hover:text-cyan-400 transition-colors mb-2">
                      {post.title}
                    </CardTitle>
                    <CardDescription className="text-gray-400 leading-relaxed">
                      {post.excerpt}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="mt-auto">
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center gap-2">
                        <Icon name="User" size={14} />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Icon name="Calendar" size={14} />
                        {post.date}
                      </div>
                    </div>

                    <Button 
                      className="w-full bg-transparent border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-gray-900 font-semibold"
                      onClick={() => navigate(`/blog/${generateSlug(post.id, post.title)}`)}
                    >
                      Читать полностью
                      <Icon name="ArrowRight" className="ml-2" size={16} />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-16 bg-gray-900 text-white">
        <div className="container px-4 space-y-12">
          <Card className="bg-gray-800/60 backdrop-blur-sm border-gray-700/50 p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-100 mb-4 text-center">Изучай вселенную Rick and Morty</h3>
            <p className="text-gray-400 text-center mb-6">
              Погрузись глубже в мир сериала - смотри эпизоды, изучай теории и открывай секреты мультивселенной
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              <Link to="/episodes" className="h-full">
                <Card className="bg-gray-800/80 border-green-500/30 p-6 hover:border-green-400 hover:bg-gray-700/80 transition-all group cursor-pointer h-full flex flex-col">
                  <Icon name="Play" size={32} className="text-green-400 mb-3 group-hover:scale-110 transition-transform" />
                  <h4 className="text-white font-semibold mb-2 group-hover:text-green-400 transition-colors">Все эпизоды</h4>
                  <p className="text-gray-400 text-sm flex-grow">Смотри и обсуждай каждую серию</p>
                </Card>
              </Link>
              <Link to="/theories" className="h-full">
                <Card className="bg-gray-800/80 border-purple-500/30 p-6 hover:border-purple-400 hover:bg-gray-700/80 transition-all group cursor-pointer h-full flex flex-col">
                  <Icon name="Lightbulb" size={32} className="text-purple-400 mb-3 group-hover:scale-110 transition-transform" />
                  <h4 className="text-white font-semibold mb-2 group-hover:text-purple-400 transition-colors">Теории фанатов</h4>
                  <p className="text-gray-400 text-sm flex-grow">Разгадывай загадки сериала</p>
                </Card>
              </Link>
              <Link to="/characters" className="h-full">
                <Card className="bg-gray-800/80 border-cyan-500/30 p-6 hover:border-cyan-400 hover:bg-gray-700/80 transition-all group cursor-pointer h-full flex flex-col">
                  <Icon name="Users" size={32} className="text-cyan-400 mb-3 group-hover:scale-110 transition-transform" />
                  <h4 className="text-white font-semibold mb-2 group-hover:text-cyan-400 transition-colors">Персонажи</h4>
                  <p className="text-gray-400 text-sm flex-grow">Узнай больше о героях</p>
                </Card>
              </Link>
            </div>
          </Card>

          <Card className="bg-gray-800 border-gray-700 max-w-4xl mx-auto overflow-hidden">
            <div className="grid md:grid-cols-2">
              <div className="p-8 md:p-12">
                <Badge className="mb-4 bg-green-400/20 text-green-400 border-green-400">
                  Подписка
                </Badge>
                <h2 className="text-3xl font-bold mb-4 text-white">
                  Не пропускай новые статьи!
                </h2>
                <p className="text-gray-400 mb-6 leading-relaxed">
                  Подпишись на рассылку и получай уведомления о новых теориях, разборах эпизодов и интересных фактах.
                </p>
                
                <div className="space-y-3">
                  <Input
                    type="email"
                    placeholder="Твой email"
                    className="bg-gray-900 border-gray-700 text-white h-12"
                  />
                  <Button className="w-full bg-green-400 text-gray-900 hover:bg-green-300 font-bold h-12">
                    <Icon name="Mail" className="mr-2" size={18} />
                    Подписаться
                  </Button>
                </div>
              </div>
              
              <div className="relative h-64 md:h-auto">
                <img 
                  src="https://cdn.poehali.dev/projects/f9f23ac4-7352-47dd-a4bb-81301617dd90/files/54ad156d-f2d1-49cc-9d49-a0e720719998.jpg" 
                  alt="Subscribe"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-gray-800 via-transparent to-transparent md:from-transparent"></div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;