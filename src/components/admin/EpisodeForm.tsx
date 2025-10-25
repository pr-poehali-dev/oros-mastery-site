import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';

interface EpisodeFormProps {
  onSubmit: (formData: EpisodeFormData, isEdit: boolean) => Promise<void>;
  editingEpisode?: EpisodeFormData & { id?: number } | null;
  onCancelEdit?: () => void;
}

export interface EpisodeFormData {
  id?: number;
  title: string;
  season: string;
  episode: string;
  description: string;
  image: string;
  videoUrl: string;
  videoIframe: string;
  airDate: string;
  funFacts: string;
  linkedArticles: number[];
  likes?: number;
  views?: number;
}

const EpisodeForm = ({ onSubmit, editingEpisode, onCancelEdit }: EpisodeFormProps) => {
  const [form, setForm] = useState<EpisodeFormData>({
    title: '',
    season: '',
    episode: '',
    description: '',
    image: '',
    videoUrl: '',
    videoIframe: '',
    airDate: '',
    funFacts: '',
    linkedArticles: [],
    likes: 0,
    views: 0
  });

  useEffect(() => {
    if (editingEpisode) {
      setForm(editingEpisode);
    }
  }, [editingEpisode]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(form, !!editingEpisode);
    setForm({
      title: '',
      season: '',
      episode: '',
      description: '',
      image: '',
      videoUrl: '',
      videoIframe: '',
      airDate: '',
      funFacts: '',
      linkedArticles: [],
      likes: 0,
      views: 0
    });
    if (onCancelEdit) onCancelEdit();
  };

  const handleCancel = () => {
    setForm({
      title: '',
      season: '',
      episode: '',
      description: '',
      image: '',
      videoUrl: '',
      videoIframe: '',
      airDate: '',
      funFacts: '',
      linkedArticles: [],
      likes: 0,
      views: 0
    });
    if (onCancelEdit) onCancelEdit();
  };

  return (
    <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-2xl text-white flex items-center gap-2">
          <Icon name={editingEpisode ? "Edit" : "Plus"} size={24} className="text-cyan-400" />
          {editingEpisode ? 'Редактировать эпизод' : 'Добавить эпизод'}
        </CardTitle>
        <CardDescription className="text-gray-300">
          {editingEpisode ? 'Обновите данные эпизода' : 'Добавьте новый эпизод с видео'}
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
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
              className="bg-gray-900 border-gray-700 text-white"
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
                value={form.season}
                onChange={(e) => setForm({ ...form, season: e.target.value })}
                required
                className="bg-gray-900 border-gray-700 text-white"
              />
            </div>
            <div>
              <label className="text-white text-sm font-medium mb-2 block">
                Эпизод *
              </label>
              <Input
                type="number"
                placeholder="3"
                value={form.episode}
                onChange={(e) => setForm({ ...form, episode: e.target.value })}
                required
                className="bg-gray-900 border-gray-700 text-white"
              />
            </div>
          </div>

          <div>
            <label className="text-white text-sm font-medium mb-2 block">
              Дата выхода *
            </label>
            <Input
              placeholder="9 дек 2013"
              value={form.airDate}
              onChange={(e) => setForm({ ...form, airDate: e.target.value })}
              required
              className="bg-gray-900 border-gray-700 text-white"
            />
          </div>

          <div>
            <label className="text-white text-sm font-medium mb-2 block">
              Описание *
            </label>
            <Textarea
              placeholder="Краткое описание эпизода..."
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              required
              className="bg-gray-900 border-gray-700 text-white min-h-[100px]"
            />
          </div>

          <div>
            <label className="text-white text-sm font-medium mb-2 block">
              URL изображения *
            </label>
            <Input
              placeholder="https://..."
              value={form.image}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
              required
              className="bg-gray-900 border-gray-700 text-white"
            />
          </div>

          <div>
            <label className="text-white text-sm font-medium mb-2 block">
              URL видео (опционально)
            </label>
            <Input
              placeholder="https://..."
              value={form.videoUrl}
              onChange={(e) => setForm({ ...form, videoUrl: e.target.value })}
              className="bg-gray-900 border-gray-700 text-white"
            />
          </div>

          <div>
            <label className="text-white text-sm font-medium mb-2 block">
              iframe видео (опционально)
            </label>
            <Textarea
              placeholder='<iframe src="https://..." ...></iframe>'
              value={form.videoIframe}
              onChange={(e) => setForm({ ...form, videoIframe: e.target.value })}
              className="bg-gray-900 border-gray-700 text-white min-h-[100px] font-mono text-sm"
            />
            <p className="text-xs text-gray-400 mt-1">💡 Вставьте полный код iframe с YouTube, VK или другого видеохостинга</p>
          </div>

          <div>
            <label className="text-white text-sm font-medium mb-2 block">
              Интересные факты (опционально)
            </label>
            <Textarea
              placeholder="Введите интересные факты об эпизоде, каждый с новой строки..."
              value={form.funFacts}
              onChange={(e) => setForm({ ...form, funFacts: e.target.value })}
              className="bg-gray-900 border-gray-700 text-white min-h-[100px]"
            />
            <p className="text-xs text-gray-400 mt-1">💡 Каждый факт с новой строки</p>
          </div>

          {editingEpisode && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-white text-sm font-medium mb-2 block">
                  Лайки
                </label>
                <Input
                  type="number"
                  value={form.likes || 0}
                  onChange={(e) => setForm({ ...form, likes: parseInt(e.target.value) || 0 })}
                  className="bg-gray-900 border-gray-700 text-white"
                />
              </div>
              <div>
                <label className="text-white text-sm font-medium mb-2 block">
                  Просмотры
                </label>
                <Input
                  type="number"
                  value={form.views || 0}
                  onChange={(e) => setForm({ ...form, views: parseInt(e.target.value) || 0 })}
                  className="bg-gray-900 border-gray-700 text-white"
                />
              </div>
            </div>
          )}

          <div className="flex gap-3">
            <Button type="submit" className="flex-1 bg-cyan-500 hover:bg-cyan-600">
              <Icon name="Check" size={20} className="mr-2" />
              {editingEpisode ? 'Сохранить' : 'Добавить эпизод'}
            </Button>
            {editingEpisode && (
              <Button 
                type="button" 
                onClick={handleCancel} 
                variant="outline"
                className="border-gray-600 text-gray-300 hover:bg-gray-700"
              >
                <Icon name="X" size={20} className="mr-2" />
                Отмена
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default EpisodeForm;