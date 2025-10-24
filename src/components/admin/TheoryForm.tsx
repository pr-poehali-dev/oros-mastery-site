import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import RichTextEditor from '@/components/ui/RichTextEditor';

interface TheoryFormProps {
  onSubmit: (formData: TheoryFormData, isEdit: boolean) => Promise<void>;
  editingTheory?: TheoryFormData & { id?: number } | null;
  onCancelEdit?: () => void;
}

export interface TheoryFormData {
  id?: number;
  title: string;
  type: string;
  probability: string;
  author: string;
  summary: string;
  fullText: string;
  evidence: string;
  counterArguments: string;
  image?: string;
  backgroundImage?: string;
  relatedEpisodes?: string;
  relatedCharacters?: string;
  likes?: number;
  views?: number;
  shares?: number;
}

const TheoryForm = ({ onSubmit, editingTheory, onCancelEdit }: TheoryFormProps) => {
  const [form, setForm] = useState<TheoryFormData>({
    title: '',
    type: 'character',
    probability: 'medium',
    author: '',
    summary: '',
    fullText: '',
    evidence: '',
    counterArguments: '',
    image: '',
    backgroundImage: '',
    relatedEpisodes: '',
    relatedCharacters: '',
    likes: 0,
    views: 0,
    shares: 0
  });

  useEffect(() => {
    if (editingTheory) {
      setForm({
        ...editingTheory,
        backgroundImage: editingTheory.backgroundImage || '',
        relatedEpisodes: editingTheory.relatedEpisodes || '',
        relatedCharacters: editingTheory.relatedCharacters || '',
        likes: editingTheory.likes || 0,
        views: editingTheory.views || 0,
        shares: editingTheory.shares || 0
      });
    }
  }, [editingTheory]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(form, !!editingTheory);
    resetForm();
  };

  const resetForm = () => {
    setForm({
      title: '',
      type: 'character',
      probability: 'medium',
      author: '',
      summary: '',
      fullText: '',
      evidence: '',
      counterArguments: '',
      image: '',
      backgroundImage: '',
      relatedEpisodes: '',
      relatedCharacters: '',
      likes: 0,
      views: 0,
      shares: 0
    });
    if (onCancelEdit) onCancelEdit();
  };

  return (
    <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-2xl text-white flex items-center gap-2">
          <Icon name={editingTheory ? "Edit" : "Plus"} size={24} className="text-green-400" />
          {editingTheory ? 'Редактировать теорию' : 'Добавить теорию'}
        </CardTitle>
        <CardDescription className="text-gray-300">
          {editingTheory ? 'Обновите данные теории' : 'Добавьте новую теорию'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-white text-sm font-medium mb-2 block">
              Название теории *
            </label>
            <Input
              placeholder="Например: Злой Морти — это будущая версия нашего Морти"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
              className="bg-gray-900 border-gray-700 text-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-white text-sm font-medium mb-2 block">
                Тип теории *
              </label>
              <select
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
                className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
              >
                <option value="character">Персонажи</option>
                <option value="plot">Сюжет</option>
                <option value="universe">Вселенная</option>
                <option value="science">Наука</option>
                <option value="philosophy">Философия</option>
              </select>
            </div>

            <div>
              <label className="text-white text-sm font-medium mb-2 block">
                Вероятность *
              </label>
              <select
                value={form.probability}
                onChange={(e) => setForm({ ...form, probability: e.target.value })}
                className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
              >
                <option value="low">Низкая</option>
                <option value="medium">Средняя</option>
                <option value="high">Высокая</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-white text-sm font-medium mb-2 block">
              Автор
            </label>
            <Input
              placeholder="Имя автора теории"
              value={form.author}
              onChange={(e) => setForm({ ...form, author: e.target.value })}
              className="bg-gray-900 border-gray-700 text-white"
            />
          </div>

          <div>
            <label className="text-white text-sm font-medium mb-2 block">
              Краткое описание *
            </label>
            <Textarea
              placeholder="Краткое описание теории (1-2 предложения)"
              value={form.summary}
              onChange={(e) => setForm({ ...form, summary: e.target.value })}
              required
              className="bg-gray-900 border-gray-700 text-white min-h-[80px]"
            />
          </div>

          <div>
            <label className="text-white text-sm font-medium mb-2 block">
              Полное описание *
            </label>
            <RichTextEditor
              value={form.fullText}
              onChange={(value) => setForm({ ...form, fullText: value })}
              placeholder="Полное описание теории..."
            />
          </div>

          <div>
            <label className="text-white text-sm font-medium mb-2 block">
              Доказательства
            </label>
            <RichTextEditor
              value={form.evidence}
              onChange={(value) => setForm({ ...form, evidence: value })}
              placeholder="Доказательства теории..."
            />
          </div>

          <div>
            <label className="text-white text-sm font-medium mb-2 block">
              Контраргументы
            </label>
            <RichTextEditor
              value={form.counterArguments}
              onChange={(value) => setForm({ ...form, counterArguments: value })}
              placeholder="Контраргументы к теории..."
            />
          </div>

          <div>
            <label className="text-white text-sm font-medium mb-2 block">
              Связанные эпизоды (ID через запятую)
            </label>
            <Input
              placeholder="Например: 1, 5, 10"
              value={form.relatedEpisodes}
              onChange={(e) => setForm({ ...form, relatedEpisodes: e.target.value })}
              className="bg-gray-900 border-gray-700 text-white"
            />
          </div>

          <div>
            <label className="text-white text-sm font-medium mb-2 block">
              Связанные персонажи (ID через запятую)
            </label>
            <Input
              placeholder="Например: 1, 2, 3"
              value={form.relatedCharacters}
              onChange={(e) => setForm({ ...form, relatedCharacters: e.target.value })}
              className="bg-gray-900 border-gray-700 text-white"
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="text-white text-sm font-medium mb-2 block">
                Лайки
              </label>
              <Input
                type="number"
                placeholder="0"
                value={form.likes}
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
                placeholder="0"
                value={form.views}
                onChange={(e) => setForm({ ...form, views: parseInt(e.target.value) || 0 })}
                className="bg-gray-900 border-gray-700 text-white"
              />
            </div>

            <div>
              <label className="text-white text-sm font-medium mb-2 block">
                Поделились
              </label>
              <Input
                type="number"
                placeholder="0"
                value={form.shares}
                onChange={(e) => setForm({ ...form, shares: parseInt(e.target.value) || 0 })}
                className="bg-gray-900 border-gray-700 text-white"
              />
            </div>
          </div>

          <div>
            <label className="text-white text-sm font-medium mb-2 block">
              URL изображения карточки
            </label>
            <Input
              placeholder="https://..."
              value={form.image}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
              className="bg-gray-900 border-gray-700 text-white"
            />
          </div>

          <div>
            <label className="text-white text-sm font-medium mb-2 block">
              URL фонового изображения
            </label>
            <Input
              placeholder="https://..."
              value={form.backgroundImage}
              onChange={(e) => setForm({ ...form, backgroundImage: e.target.value })}
              className="bg-gray-900 border-gray-700 text-white"
            />
          </div>

          <div className="flex gap-3">
            <Button type="submit" className="flex-1 bg-green-500 hover:bg-green-600">
              <Icon name="Check" size={20} className="mr-2" />
              {editingTheory ? 'Сохранить' : 'Добавить теорию'}
            </Button>
            {editingTheory && (
              <Button 
                type="button" 
                onClick={resetForm} 
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

export default TheoryForm;
