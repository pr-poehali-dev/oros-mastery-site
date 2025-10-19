import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';

interface Episode {
  id: number;
  title: string;
  season: number;
  episode: number;
  description: string;
  image: string;
  airDate: string;
}

const Admin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    season: '',
    episode: '',
    description: '',
    image: '',
    airDate: ''
  });

  const [episodes, setEpisodes] = useState<Episode[]>([
    {
      id: 1,
      title: 'Pilot',
      season: 1,
      episode: 1,
      description: 'Рик переезжает к семье своей дочери и соглашается взять Морти в первое приключение.',
      image: 'https://cdn.poehali.dev/projects/f9f23ac4-7352-47dd-a4bb-81301617dd90/files/d490fe60-e1ff-4015-8de4-bb5defe289ae.jpg',
      airDate: '2 дек 2013'
    }
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newEpisode: Episode = {
      id: episodes.length + 1,
      title: formData.title,
      season: Number(formData.season),
      episode: Number(formData.episode),
      description: formData.description,
      image: formData.image || 'https://cdn.poehali.dev/projects/f9f23ac4-7352-47dd-a4bb-81301617dd90/files/d490fe60-e1ff-4015-8de4-bb5defe289ae.jpg',
      airDate: formData.airDate
    };

    setEpisodes([...episodes, newEpisode]);
    
    setFormData({
      title: '',
      season: '',
      episode: '',
      description: '',
      image: '',
      airDate: ''
    });

    alert('Эпизод успешно добавлен!');
  };

  const handleDelete = (id: number) => {
    if (confirm('Вы уверены, что хотите удалить этот эпизод?')) {
      setEpisodes(episodes.filter(ep => ep.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <Button 
            onClick={() => navigate('/')} 
            variant="ghost" 
            className="text-cyan-400 hover:text-cyan-300 mb-4"
          >
            <Icon name="ArrowLeft" size={20} className="mr-2" />
            На главную
          </Button>
          
          <div className="flex items-center gap-4 mb-2">
            <div className="bg-gradient-to-r from-cyan-500 to-green-500 p-3 rounded-lg">
              <Icon name="Settings" size={32} className="text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white">Админ-панель</h1>
              <p className="text-gray-400 mt-1">Управление эпизодами Rick and Morty</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl text-white flex items-center gap-2">
                <Icon name="Plus" size={24} className="text-cyan-400" />
                Добавить новый эпизод
              </CardTitle>
              <CardDescription className="text-gray-400">
                Заполните форму для добавления эпизода в базу данных
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-white text-sm font-medium mb-2 block">
                    Название эпизода *
                  </label>
                  <Input
                    placeholder="Например: Pickle Rick"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
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
                      value={formData.season}
                      onChange={(e) => setFormData({ ...formData, season: e.target.value })}
                      required
                      min="1"
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
                      value={formData.episode}
                      onChange={(e) => setFormData({ ...formData, episode: e.target.value })}
                      required
                      min="1"
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-white text-sm font-medium mb-2 block">
                    Описание *
                  </label>
                  <Textarea
                    placeholder="Краткое описание эпизода..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                    className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-500 min-h-[100px]"
                  />
                </div>

                <div>
                  <label className="text-white text-sm font-medium mb-2 block">
                    URL изображения
                  </label>
                  <Input
                    type="url"
                    placeholder="https://..."
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Оставьте пустым для изображения по умолчанию
                  </p>
                </div>

                <div>
                  <label className="text-white text-sm font-medium mb-2 block">
                    Дата выхода *
                  </label>
                  <Input
                    placeholder="Например: 2 дек 2013"
                    value={formData.airDate}
                    onChange={(e) => setFormData({ ...formData, airDate: e.target.value })}
                    required
                    className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-500"
                  />
                </div>

                <Button 
                  type="submit"
                  className="w-full bg-gradient-to-r from-cyan-500 to-green-500 hover:from-cyan-600 hover:to-green-600 text-white font-semibold"
                >
                  <Icon name="Plus" size={20} className="mr-2" />
                  Добавить эпизод
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl text-white flex items-center gap-2">
                  <Icon name="List" size={24} className="text-green-400" />
                  Список эпизодов ({episodes.length})
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Все добавленные эпизоды в базе данных
                </CardDescription>
              </CardHeader>
              <CardContent className="max-h-[600px] overflow-y-auto space-y-3">
                {episodes.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    <Icon name="Inbox" size={48} className="mx-auto mb-3 opacity-50" />
                    <p>Пока нет добавленных эпизодов</p>
                  </div>
                ) : (
                  episodes.map((episode) => (
                    <Card key={episode.id} className="bg-gray-700/50 border-gray-600 hover:border-cyan-400 transition-colors">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge className="bg-cyan-400/20 text-cyan-400 border-cyan-400/50 text-xs">
                                S{episode.season}E{episode.episode}
                              </Badge>
                              <Badge className="bg-green-400/20 text-green-400 border-green-400/50 text-xs">
                                {episode.airDate}
                              </Badge>
                            </div>
                            <h3 className="text-white font-semibold text-lg mb-1">
                              {episode.title}
                            </h3>
                            <p className="text-gray-400 text-sm line-clamp-2">
                              {episode.description}
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(episode.id)}
                            className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
                          >
                            <Icon name="Trash2" size={18} />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
