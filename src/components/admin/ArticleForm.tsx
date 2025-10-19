import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

export interface ArticleFormData {
  id?: number;
  episodeId: number;
  title: string;
  content: string;
}

interface ArticleFormProps {
  editingArticle: ArticleFormData | null;
  episodes: Array<{ id: number; title: string; season: number; episode: number }>;
  onSubmit: (data: ArticleFormData, isEdit: boolean) => void;
  onCancel: () => void;
}

const ArticleForm = ({ editingArticle, episodes, onSubmit, onCancel }: ArticleFormProps) => {
  const [formData, setFormData] = useState<ArticleFormData>({
    episodeId: 0,
    title: '',
    content: ''
  });

  useEffect(() => {
    if (editingArticle) {
      setFormData(editingArticle);
    } else {
      setFormData({
        episodeId: 0,
        title: '',
        content: ''
      });
    }
  }, [editingArticle]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData, !!editingArticle);
  };

  return (
    <Card className="p-6 bg-gray-800/50 border-cyan-500/30">
      <h3 className="text-xl font-bold text-cyan-400 mb-4">
        {editingArticle ? 'Редактировать статью' : 'Добавить статью'}
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Эпизод
          </label>
          <select
            value={formData.episodeId}
            onChange={(e) => setFormData({ ...formData, episodeId: Number(e.target.value) })}
            className="w-full px-4 py-2 bg-gray-700 border border-cyan-500/30 rounded-lg text-white focus:outline-none focus:border-cyan-500"
            required
          >
            <option value={0}>Выберите эпизод</option>
            {episodes.map((ep) => (
              <option key={ep.id} value={ep.id}>
                S{ep.season}E{ep.episode} - {ep.title}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Заголовок статьи
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-4 py-2 bg-gray-700 border border-cyan-500/30 rounded-lg text-white focus:outline-none focus:border-cyan-500"
            placeholder="Интересный факт об эпизоде"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Содержание
          </label>
          <textarea
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            className="w-full px-4 py-2 bg-gray-700 border border-cyan-500/30 rounded-lg text-white focus:outline-none focus:border-cyan-500 min-h-[150px]"
            placeholder="Подробное описание интересного факта..."
            required
          />
        </div>

        <div className="flex gap-3">
          <Button
            type="submit"
            className="flex-1 bg-gradient-to-r from-cyan-500 to-green-500 hover:from-cyan-600 hover:to-green-600"
          >
            <Icon name="Save" size={18} className="mr-2" />
            {editingArticle ? 'Обновить' : 'Добавить'}
          </Button>
          {editingArticle && (
            <Button
              type="button"
              onClick={onCancel}
              variant="outline"
              className="border-red-500/50 text-red-400 hover:bg-red-500/10"
            >
              <Icon name="X" size={18} className="mr-2" />
              Отмена
            </Button>
          )}
        </div>
      </form>
    </Card>
  );
};

export default ArticleForm;
