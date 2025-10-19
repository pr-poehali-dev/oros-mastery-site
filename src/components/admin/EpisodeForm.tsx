import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';

interface EpisodeFormProps {
  onSubmit: (formData: EpisodeFormData) => Promise<void>;
}

export interface EpisodeFormData {
  title: string;
  season: string;
  episode: string;
  description: string;
  image: string;
  videoUrl: string;
  airDate: string;
}

const EpisodeForm = ({ onSubmit }: EpisodeFormProps) => {
  const [form, setForm] = useState<EpisodeFormData>({
    title: '',
    season: '',
    episode: '',
    description: '',
    image: '',
    videoUrl: '',
    airDate: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(form);
    setForm({
      title: '',
      season: '',
      episode: '',
      description: '',
      image: '',
      videoUrl: '',
      airDate: ''
    });
  };

  return (
    <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-2xl text-white flex items-center gap-2">
          <Icon name="Plus" size={24} className="text-cyan-400" />
          Добавить эпизод
        </CardTitle>
        <CardDescription className="text-gray-300">
          Добавьте новый эпизод с видео
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

          <Button type="submit" className="w-full bg-cyan-500 hover:bg-cyan-600">
            <Icon name="Check" size={20} className="mr-2" />
            Добавить эпизод
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default EpisodeForm;