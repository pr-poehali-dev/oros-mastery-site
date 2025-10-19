import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';

interface BlogFormProps {
  onSubmit: (formData: BlogFormData) => Promise<void>;
}

export interface BlogFormData {
  title: string;
  content: string;
  excerpt: string;
  tags: string;
  author: string;
  image: string;
}

const BlogForm = ({ onSubmit }: BlogFormProps) => {
  const [form, setForm] = useState<BlogFormData>({
    title: '',
    content: '',
    excerpt: '',
    tags: '',
    author: 'Админ',
    image: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(form);
    setForm({
      title: '',
      content: '',
      excerpt: '',
      tags: '',
      author: 'Админ',
      image: ''
    });
  };

  return (
    <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-2xl text-white flex items-center gap-2">
          <Icon name="Plus" size={24} className="text-orange-400" />
          Добавить статью
        </CardTitle>
        <CardDescription className="text-gray-400">
          Создайте новую статью для блога
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
              Содержание *
            </label>
            <Textarea
              placeholder="Полный текст статьи..."
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              required
              className="bg-gray-900 border-gray-700 text-white min-h-[300px]"
            />
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

          <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600">
            <Icon name="Check" size={20} className="mr-2" />
            Опубликовать статью
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default BlogForm;
