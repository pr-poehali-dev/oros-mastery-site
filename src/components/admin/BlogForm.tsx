import { useState, useEffect, KeyboardEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import type { BlogPost } from './hooks/useBlogManager';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface BlogFormProps {
  onSubmit: (formData: BlogPost, isEdit: boolean) => Promise<void>;
  initialData?: BlogPost | null;
  onCancel?: () => void;
}

const BlogForm = ({ onSubmit, initialData, onCancel }: BlogFormProps) => {
  const [form, setForm] = useState<BlogPost>({
    title: '',
    content: '',
    excerpt: '',
    author: 'Админ',
    image: '',
    category: '',
    date: new Date().toISOString().split('T')[0],
    read_time: '5 мин',
    views: 0,
    likes: 0
  });
  const [submitting, setSubmitting] = useState(false);
  const [categoryInput, setCategoryInput] = useState('');
  const [categories, setCategories] = useState<string[]>(['Анализ', 'Теории', 'Персонажи', 'Пасхалки', 'Философия']);

  useEffect(() => {
    if (initialData) {
      setForm(initialData);
    }
    const savedCategories = localStorage.getItem('blogCategories');
    if (savedCategories) {
      setCategories(JSON.parse(savedCategories));
    }
  }, [initialData]);

  const handleAddCategory = () => {
    if (categoryInput.trim() && !categories.includes(categoryInput.trim())) {
      const newCategories = [...categories, categoryInput.trim()];
      setCategories(newCategories);
      localStorage.setItem('blogCategories', JSON.stringify(newCategories));
      setCategoryInput('');
    }
  };

  const handleCategoryKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddCategory();
    }
  };

  const handleDeleteCategory = (catToDelete: string) => {
    const newCategories = categories.filter(cat => cat !== catToDelete);
    setCategories(newCategories);
    localStorage.setItem('blogCategories', JSON.stringify(newCategories));
    if (form.category === catToDelete) {
      setForm({ ...form, category: '' });
    }
  };

  const isEdit = !!initialData?.id;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await onSubmit(form, isEdit);
      if (!isEdit) {
        setForm({
          title: '',
          content: '',
          excerpt: '',
          author: 'Админ',
          image: '',
          category: '',
          date: new Date().toISOString().split('T')[0],
          read_time: '5 мин',
          views: 0,
          likes: 0
        });
      }
    } catch (error) {
      console.error('Form submit error:', error);
    } finally {
      setSubmitting(false);
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
            <div className="bg-gray-900 border border-gray-700 rounded-lg overflow-hidden">
              <ReactQuill
                theme="snow"
                value={form.excerpt}
                onChange={(value) => setForm({ ...form, excerpt: value })}
                className="[&_.ql-editor]:min-h-[80px] [&_.ql-editor]:text-white [&_.ql-toolbar]:bg-gray-800 [&_.ql-toolbar]:border-gray-700 [&_.ql-container]:border-0 [&_.ql-editor]:bg-gray-900"
                modules={{
                  toolbar: [
                    ['bold', 'italic', 'underline'],
                    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                    ['link'],
                    ['clean']
                  ]
                }}
              />
            </div>
          </div>

          <div>
            <label className="text-white text-sm font-medium mb-2 block">
              Содержание *
            </label>
            <div className="bg-gray-900 border border-gray-700 rounded-lg overflow-hidden">
              <ReactQuill
                theme="snow"
                value={form.content}
                onChange={(value) => setForm({ ...form, content: value })}
                className="[&_.ql-editor]:min-h-[300px] [&_.ql-editor]:text-white [&_.ql-toolbar]:bg-gray-800 [&_.ql-toolbar]:border-gray-700 [&_.ql-container]:border-0 [&_.ql-editor]:bg-gray-900"
                modules={{
                  toolbar: [
                    [{ 'header': [1, 2, 3, false] }],
                    ['bold', 'italic', 'underline', 'strike'],
                    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                    ['blockquote', 'code-block'],
                    ['link', 'image'],
                    ['clean']
                  ]
                }}
              />
            </div>
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

          <div>
            <label className="text-white text-sm font-medium mb-2 block">
              Категория *
            </label>
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-500 mb-2"
              required
            >
              <option value="">Выберите категорию</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <div className="flex gap-2 mb-2">
              <Input
                placeholder="Новая категория..."
                value={categoryInput}
                onChange={(e) => setCategoryInput(e.target.value)}
                onKeyPress={handleCategoryKeyPress}
                className="bg-gray-900 border-gray-700 text-white text-sm"
              />
              <Button 
                type="button"
                onClick={handleAddCategory}
                className="bg-green-600 hover:bg-green-700 text-white px-4"
              >
                <Icon name="Plus" size={16} />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <div key={cat} className="bg-gray-700 text-white text-xs px-3 py-1 rounded-full flex items-center gap-2">
                  {cat}
                  <button
                    type="button"
                    onClick={() => handleDeleteCategory(cat)}
                    className="text-red-400 hover:text-red-300"
                  >
                    <Icon name="X" size={12} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-white text-sm font-medium mb-2 block">
                Время чтения
              </label>
              <Input
                placeholder="5 мин"
                value={form.read_time}
                onChange={(e) => setForm({ ...form, read_time: e.target.value })}
                className="bg-gray-900 border-gray-700 text-white"
              />
            </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-white text-sm font-medium mb-2 block">
                Просмотры
              </label>
              <Input
                type="number"
                placeholder="0"
                value={form.views || 0}
                onChange={(e) => setForm({ ...form, views: parseInt(e.target.value) || 0 })}
                className="bg-gray-900 border-gray-700 text-white"
              />
            </div>

            <div>
              <label className="text-white text-sm font-medium mb-2 block">
                Лайки
              </label>
              <Input
                type="number"
                placeholder="0"
                value={form.likes || 0}
                onChange={(e) => setForm({ ...form, likes: parseInt(e.target.value) || 0 })}
                className="bg-gray-900 border-gray-700 text-white"
              />
            </div>
          </div>

          <div className="flex gap-2">
            <Button 
              type="submit" 
              className="flex-1 bg-orange-500 hover:bg-orange-600"
              disabled={submitting}
            >
              <Icon name="Check" size={20} className="mr-2" />
              {submitting ? 'Сохранение...' : (isEdit ? 'Сохранить изменения' : 'Опубликовать статью')}
            </Button>
            {isEdit && onCancel && (
              <Button 
                type="button" 
                onClick={onCancel}
                variant="outline"
                className="border-gray-600 text-gray-300 hover:bg-gray-800"
                disabled={submitting}
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