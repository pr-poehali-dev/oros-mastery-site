import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';

const EPISODES_API = 'https://functions.poehali.dev/031f0f01-3e0b-440b-a295-08f07c4d1389';
const BLOG_API = 'https://functions.poehali.dev/833cc9a4-513a-4d22-a390-4878941c0d71';

interface Episode {
  id: number;
  title: string;
  season: number;
  episode: number;
  description: string;
  image: string;
  airDate: string;
  videoUrl?: string;
}

const Admin = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('episodes');

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [navigate]);

  const [episodeForm, setEpisodeForm] = useState({
    title: '',
    season: '',
    episode: '',
    description: '',
    image: '',
    videoUrl: '',
    airDate: ''
  });

  const [blogForm, setBlogForm] = useState({
    title: '',
    content: '',
    excerpt: '',
    tags: '',
    author: 'Админ',
    image: ''
  });

  const [episodes, setEpisodes] = useState<Episode[]>([]);

  useEffect(() => {
    fetchEpisodes();
  }, []);

  const fetchEpisodes = async () => {
    try {
      const response = await fetch(EPISODES_API);
      const data = await response.json();
      setEpisodes(data);
    } catch (error) {
      console.error('Error fetching episodes:', error);
    }
  };

  const handleEpisodeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await fetch(EPISODES_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: episodeForm.title,
          season: Number(episodeForm.season),
          episode: Number(episodeForm.episode),
          description: episodeForm.description,
          image: episodeForm.image,
          videoUrl: episodeForm.videoUrl,
          airDate: episodeForm.airDate
        })
      });

      setEpisodeForm({
        title: '',
        season: '',
        episode: '',
        description: '',
        image: '',
        videoUrl: '',
        airDate: ''
      });

      fetchEpisodes();
      alert('Эпизод успешно добавлен!');
    } catch (error) {
      console.error('Error adding episode:', error);
      alert('Ошибка при добавлении эпизода');
    }
  };

  const handleBlogSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await fetch(BLOG_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'post',
          title: blogForm.title,
          content: blogForm.content,
          excerpt: blogForm.excerpt,
          tags: blogForm.tags.split(',').map(t => t.trim()),
          author: blogForm.author,
          image: blogForm.image
        })
      });

      setBlogForm({
        title: '',
        content: '',
        excerpt: '',
        tags: '',
        author: 'Админ',
        image: ''
      });

      alert('Статья успешно добавлена!');
    } catch (error) {
      console.error('Error adding blog post:', error);
      alert('Ошибка при добавлении статьи');
    }
  };

  const handleDeleteEpisode = async (id: number) => {
    if (confirm('Вы уверены, что хотите удалить этот эпизод?')) {
      try {
        await fetch(`${EPISODES_API}?id=${id}`, { method: 'DELETE' });
        fetchEpisodes();
      } catch (error) {
        console.error('Error deleting episode:', error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      <Navigation />
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="mb-8">
          <Button 
            onClick={() => navigate('/')} 
            variant="ghost" 
            className="text-cyan-400 hover:text-cyan-300 mb-4"
          >
            <Icon name="ArrowLeft" size={20} className="mr-2" />
            На главную
          </Button>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-r from-cyan-500 to-green-500 p-3 rounded-lg">
                <Icon name="Settings" size={32} className="text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-white">Админ-панель</h1>
                <p className="text-gray-400 mt-1">Управление контентом сайта</p>
              </div>
            </div>
            
            <Button 
              onClick={() => {
                localStorage.removeItem('isAuthenticated');
                localStorage.removeItem('adminUser');
                navigate('/login');
              }}
              variant="outline"
              className="border-red-500/50 text-red-400 hover:bg-red-500/10 hover:text-red-300"
            >
              <Icon name="LogOut" size={18} className="mr-2" />
              Выйти
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 bg-gray-800 mb-8">
            <TabsTrigger value="episodes" className="data-[state=active]:bg-cyan-500 data-[state=active]:text-white">
              <Icon name="Film" size={18} className="mr-2" />
              Эпизоды
            </TabsTrigger>
            <TabsTrigger value="blog" className="data-[state=active]:bg-green-500 data-[state=active]:text-white">
              <Icon name="FileText" size={18} className="mr-2" />
              Статьи
            </TabsTrigger>
          </TabsList>

          <TabsContent value="episodes">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-2xl text-white flex items-center gap-2">
                    <Icon name="Plus" size={24} className="text-cyan-400" />
                    Добавить эпизод
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Добавьте новый эпизод с видео
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleEpisodeSubmit} className="space-y-4">
                    <div>
                      <label className="text-white text-sm font-medium mb-2 block">
                        Название эпизода *
                      </label>
                      <Input
                        placeholder="Например: Pickle Rick"
                        value={episodeForm.title}
                        onChange={(e) => setEpisodeForm({ ...episodeForm, title: e.target.value })}
                        required
                        className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-500"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-white text-sm font-medium mb-2 block">
                          Сезон *
                        </label>
                        <Input
                          type="number"
                          placeholder="1"
                          value={episodeForm.season}
                          onChange={(e) => setEpisodeForm({ ...episodeForm, season: e.target.value })}
                          required
                          className="bg-gray-700 border-gray-600 text-white"
                        />
                      </div>
                      <div>
                        <label className="text-white text-sm font-medium mb-2 block">
                          Эпизод *
                        </label>
                        <Input
                          type="number"
                          placeholder="1"
                          value={episodeForm.episode}
                          onChange={(e) => setEpisodeForm({ ...episodeForm, episode: e.target.value })}
                          required
                          className="bg-gray-700 border-gray-600 text-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-white text-sm font-medium mb-2 block">
                        Описание *
                      </label>
                      <Textarea
                        placeholder="Краткое описание эпизода"
                        value={episodeForm.description}
                        onChange={(e) => setEpisodeForm({ ...episodeForm, description: e.target.value })}
                        required
                        className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-500 min-h-[100px]"
                      />
                    </div>

                    <div>
                      <label className="text-white text-sm font-medium mb-2 block">
                        URL изображения
                      </label>
                      <Input
                        placeholder="https://example.com/image.jpg"
                        value={episodeForm.image}
                        onChange={(e) => setEpisodeForm({ ...episodeForm, image: e.target.value })}
                        className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-500"
                      />
                    </div>

                    <div>
                      <label className="text-white text-sm font-medium mb-2 block flex items-center gap-2">
                        <Icon name="Video" size={16} className="text-green-400" />
                        Ссылка на видео (YouTube, Vimeo и т.д.)
                      </label>
                      <Input
                        placeholder="https://www.youtube.com/watch?v=..."
                        value={episodeForm.videoUrl}
                        onChange={(e) => setEpisodeForm({ ...episodeForm, videoUrl: e.target.value })}
                        className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-500"
                      />
                    </div>

                    <div>
                      <label className="text-white text-sm font-medium mb-2 block">
                        Дата выхода *
                      </label>
                      <Input
                        placeholder="2 дек 2013"
                        value={episodeForm.airDate}
                        onChange={(e) => setEpisodeForm({ ...episodeForm, airDate: e.target.value })}
                        required
                        className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-500"
                      />
                    </div>

                    <Button 
                      type="submit"
                      className="w-full bg-gradient-to-r from-cyan-500 to-green-500 hover:from-cyan-600 hover:to-green-600 text-white font-semibold"
                    >
                      <Icon name="Plus" size={18} className="mr-2" />
                      Добавить эпизод
                    </Button>
                  </form>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-2xl text-white flex items-center gap-2">
                    <Icon name="List" size={24} className="text-green-400" />
                    Список эпизодов
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Всего эпизодов: {episodes.length}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 max-h-[600px] overflow-y-auto">
                    {episodes.map((episode) => (
                      <div 
                        key={episode.id}
                        className="flex items-center justify-between bg-gray-700/30 p-3 rounded-lg border border-gray-600/30"
                      >
                        <div className="flex items-center gap-3 flex-1">
                          <Badge className="bg-cyan-500 text-white">
                            S{episode.season}E{episode.episode}
                          </Badge>
                          <span className="text-white font-medium">{episode.title}</span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteEpisode(episode.id)}
                          className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                        >
                          <Icon name="Trash2" size={16} />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="blog">
            <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm max-w-3xl mx-auto">
              <CardHeader>
                <CardTitle className="text-2xl text-white flex items-center gap-2">
                  <Icon name="Plus" size={24} className="text-green-400" />
                  Добавить статью в блог
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Создайте новую статью для блога
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleBlogSubmit} className="space-y-4">
                  <div>
                    <label className="text-white text-sm font-medium mb-2 block">
                      Заголовок статьи *
                    </label>
                    <Input
                      placeholder="Например: Теория о происхождении Evil Morty"
                      value={blogForm.title}
                      onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                      required
                      className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-500"
                    />
                  </div>

                  <div>
                    <label className="text-white text-sm font-medium mb-2 block">
                      Краткое описание *
                    </label>
                    <Textarea
                      placeholder="Краткое описание статьи для превью"
                      value={blogForm.excerpt}
                      onChange={(e) => setBlogForm({ ...blogForm, excerpt: e.target.value })}
                      required
                      className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-500 min-h-[80px]"
                    />
                  </div>

                  <div>
                    <label className="text-white text-sm font-medium mb-2 block">
                      Содержание статьи *
                    </label>
                    <Textarea
                      placeholder="Полный текст статьи"
                      value={blogForm.content}
                      onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
                      required
                      className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-500 min-h-[300px]"
                    />
                  </div>

                  <div>
                    <label className="text-white text-sm font-medium mb-2 block">
                      Теги (через запятую)
                    </label>
                    <Input
                      placeholder="теория, персонажи, анализ"
                      value={blogForm.tags}
                      onChange={(e) => setBlogForm({ ...blogForm, tags: e.target.value })}
                      className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-500"
                    />
                  </div>

                  <div>
                    <label className="text-white text-sm font-medium mb-2 block">
                      Автор
                    </label>
                    <Input
                      placeholder="Имя автора"
                      value={blogForm.author}
                      onChange={(e) => setBlogForm({ ...blogForm, author: e.target.value })}
                      className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-500"
                    />
                  </div>

                  <div>
                    <label className="text-white text-sm font-medium mb-2 block">
                      URL изображения (оставьте пустым для автогенерации)
                    </label>
                    <Input
                      placeholder="https://example.com/image.jpg"
                      value={blogForm.image}
                      onChange={(e) => setBlogForm({ ...blogForm, image: e.target.value })}
                      className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-500"
                    />
                    <p className="text-gray-500 text-xs mt-1">
                      Если не указать, будет создана уникальная картинка по теме статьи
                    </p>
                  </div>

                  <Button 
                    type="submit"
                    className="w-full bg-gradient-to-r from-green-500 to-cyan-500 hover:from-green-600 hover:to-cyan-600 text-white font-semibold"
                  >
                    <Icon name="Plus" size={18} className="mr-2" />
                    Опубликовать статью
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;