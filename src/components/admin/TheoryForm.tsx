import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';

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
    image: ''
  });

  useEffect(() => {
    if (editingTheory) {
      setForm(editingTheory);
    }
  }, [editingTheory]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(form, !!editingTheory);
    setForm({
      title: '',
      type: 'character',
      probability: 'medium',
      author: '',
      summary: '',
      fullText: '',
      evidence: '',
      counterArguments: '',
      image: ''
    });
    if (onCancelEdit) onCancelEdit();
  };

  const handleCancel = () => {
    setForm({
      title: '',
      type: 'character',
      probability: 'medium',
      author: '',
      summary: '',
      fullText: '',
      evidence: '',
      counterArguments: '',
      image: ''
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
              <Select value={form.type} onValueChange={(value) => setForm({ ...form, type: value })}>
                <SelectTrigger className="bg-gray-900 border-gray-700 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="character">Персонаж</SelectItem>
                  <SelectItem value="multiverse">Мультивселенная</SelectItem>
                  <SelectItem value="plot">Сюжет</SelectItem>
                  <SelectItem value="other">Другое</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-white text-sm font-medium mb-2 block">
                Вероятность *
              </label>
              <Select value={form.probability} onValueChange={(value) => setForm({ ...form, probability: value })}>
                <SelectTrigger className="bg-gray-900 border-gray-700 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="confirmed">Подтверждено</SelectItem>
                  <SelectItem value="high">Высокая</SelectItem>
                  <SelectItem value="medium">Средняя</SelectItem>
                  <SelectItem value="low">Низкая</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <label className="text-white text-sm font-medium mb-2 block">
              Автор теории *
            </label>
            <Input
              placeholder="Например: Фанатское сообщество"
              value={form.author}
              onChange={(e) => setForm({ ...form, author: e.target.value })}
              required
              className="bg-gray-900 border-gray-700 text-white"
            />
          </div>

          <div>
            <label className="text-white text-sm font-medium mb-2 block">
              URL изображения
            </label>
            <Input
              placeholder="https://example.com/image.jpg"
              value={form.image || ''}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
              className="bg-gray-900 border-gray-700 text-white"
            />
            {form.image && (
              <div className="mt-2 rounded overflow-hidden">
                <img src={form.image} alt="Preview" className="w-full h-32 object-cover" />
              </div>
            )}
          </div>

          <div>
            <label className="text-white text-sm font-medium mb-2 block">
              Краткое описание *
            </label>
            <Textarea
              placeholder="Краткое изложение теории..."
              value={form.summary}
              onChange={(e) => setForm({ ...form, summary: e.target.value })}
              required
              className="bg-gray-900 border-gray-700 text-white min-h-[80px]"
            />
          </div>

          <div>
            <label className="text-white text-sm font-medium mb-2 block">
              Полный текст *
            </label>
            <Textarea
              placeholder="Подробное описание теории со всеми деталями..."
              value={form.fullText}
              onChange={(e) => setForm({ ...form, fullText: e.target.value })}
              required
              className="bg-gray-900 border-gray-700 text-white min-h-[150px]"
            />
          </div>

          <div>
            <label className="text-white text-sm font-medium mb-2 block">
              Доказательства (каждое с новой строки)
            </label>
            <Textarea
              placeholder="Доказательство 1&#10;Доказательство 2&#10;Доказательство 3"
              value={form.evidence}
              onChange={(e) => setForm({ ...form, evidence: e.target.value })}
              className="bg-gray-900 border-gray-700 text-white min-h-[100px]"
            />
          </div>

          <div>
            <label className="text-white text-sm font-medium mb-2 block">
              Контраргументы (каждый с новой строки)
            </label>
            <Textarea
              placeholder="Контраргумент 1&#10;Контраргумент 2"
              value={form.counterArguments}
              onChange={(e) => setForm({ ...form, counterArguments: e.target.value })}
              className="bg-gray-900 border-gray-700 text-white min-h-[100px]"
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

export default TheoryForm;