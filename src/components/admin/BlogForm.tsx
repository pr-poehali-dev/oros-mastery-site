import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';

interface BlogFormProps {
  onSubmit: (formData: BlogFormData, isEdit: boolean) => Promise<void>;
  initialData?: BlogFormData | null;
  onCancel?: () => void;
}

export interface BlogFormData {
  id?: number;
  title: string;
  content: string;
  excerpt: string;
  tags: string;
  author: string;
  image: string;
  category: string;
  date?: string;
  readTime?: string;
  views?: number;
  likes?: number;
}

const BlogForm = ({ onSubmit, initialData, onCancel }: BlogFormProps) => {
  const [form, setForm] = useState<BlogFormData>(initialData || {
    title: '',
    content: '',
    excerpt: '',
    tags: '',
    author: 'Админ',
    image: '',
    category: '',
    date: new Date().toISOString().split('T')[0],
    readTime: '5 мин',
    views: 0,
    likes: 0
  });
  const [imageUrl, setImageUrl] = useState('');

  const isEdit = !!initialData;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(form, isEdit);
    if (!isEdit) {
      setForm({
        title: '',
        content: '',
        excerpt: '',
        tags: '',
        author: 'Админ',
        image: '',
        category: '',
        date: new Date().toISOString().split('T')[0],
        readTime: '5 мин',
        views: 0,
        likes: 0
      });
    }
  };

  const insertImage = () => {
    if (imageUrl) {
      const imageMarkdown = `\n![Изображение](${imageUrl})\n`;
      setForm({ ...form, content: form.content + imageMarkdown });
      setImageUrl('');
    }
  };

  return (
    <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-2xl text-white flex items-center gap-2">
          <Icon name={isEdit ? "Edit" : "Plus"} size={24} className="text-orange-400" />
          {isEdit ? 'Редактировать статью' : 'Добавить статью'}
        </CardTitle>
        <CardDescription className="text-gray-300">
          {isEdit ? 'Внесите изменения в статью' : 'Создайте новую статью для блога'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-white text-sm font-medium mb-2 block">
              Заголовок *
            </label>
            <Input
              placeholder="Название статьи"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
              className="bg-gray-900 border-gray-700 text-white"
            />
          </div>

          <div>
            <label className="text-white text-sm font-medium mb-2 block">
              Краткое описание *
            </label>
            <Textarea
              placeholder="Краткое описание статьи..."
              value={form.excerpt}
              onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
              required
              className="bg-gray-900 border-gray-700 text-white min-h-[80px]"
            />
          </div>

          <div>
            <label className="text-white text-sm font-medium mb-2 block">
              Содержание * (поддерживает Markdown)
            </label>
            <div className="space-y-2">
              <div className="flex gap-2">
                <Input
                  placeholder="URL картинки для вставки"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="bg-gray-900 border-gray-700 text-white flex-1"
                />
                <Button 
                  type="button" 
                  onClick={insertImage}
                  className="bg-purple-500 hover:bg-purple-600"
                >
                  <Icon name="Image" size={16} className="mr-2" />
                  Вставить картинку
                </Button>
              </div>
              <Textarea
                placeholder="Полный текст статьи... Используйте ![alt](url) для картинок"
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
                required
                className="bg-gray-900 border-gray-700 text-white min-h-[300px] font-mono text-sm"
              />
              <p className="text-xs text-gray-400">💡 Форматирование: **жирный**, *курсив*, # Заголовок, ![alt](url) - картинка</p>
            </div>
          </div>

          <div>
            <label className="text-white text-sm font-medium mb-2 block">
              Теги (через запятую)
            </label>
            <Input
              placeholder="Например: теории, персонажи, анализ"
              value={form.tags}
              onChange={(e) => setForm({ ...form, tags: e.target.value })}
              className="bg-gray-900 border-gray-700 text-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-white text-sm font-medium mb-2 block">
                Автор
              </label>
              <Input
                placeholder="Имя автора"
                value={form.author}
                onChange={(e) => setForm({ ...form, author: e.target.value })}
                className="bg-gray-900 border-gray-700 text-white"
              />
            </div>

            <div>
              <label className="text-white text-sm font-medium mb-2 block">
                Дата публикации
              </label>
              <Input
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                className="bg-gray-900 border-gray-700 text-white"
              />
            </div>
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

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-white text-sm font-medium mb-2 block">
                Категория
              </label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                required
              >
                <option value="">Выберите категорию</option>
                <option value="Анализ">Анализ</option>
                <option value="Теории">Теории</option>
                <option value="Персонажи">Персонажи</option>
                <option value="Пасхалки">Пасхалки</option>
                <option value="Философия">Философия</option>
              </select>
            </div>

            <div>
              <label className="text-white text-sm font-medium mb-2 block">
                Время чтения
              </label>
              <Input
                placeholder="5 мин"
                value={form.readTime}
                onChange={(e) => setForm({ ...form, readTime: e.target.value })}
                className="bg-gray-900 border-gray-700 text-white"
              />
            </div>
          </div>

          <div className="flex gap-2">
            <Button type="submit" className="flex-1 bg-orange-500 hover:bg-orange-600">
              <Icon name="Check" size={20} className="mr-2" />
              {isEdit ? 'Сохранить изменения' : 'Опубликовать статью'}
            </Button>
            {isEdit && onCancel && (
              <Button 
                type="button" 
                onClick={onCancel}
                variant="outline"
                className="border-gray-600 text-gray-300 hover:bg-gray-800"
              >
                Отмена
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default BlogForm;