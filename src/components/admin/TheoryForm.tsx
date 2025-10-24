import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


interface TheoryFormProps {
  onSubmit: (formData: TheoryFormData, isEdit: boolean) => Promise<void>;
  editingTheory?: TheoryFormData & { id?: number } | null;
  onCancel?: () => void;
}

export interface TheoryFormData {
  id?: number;
  title: string;
  type: string;
  probability: string;
  author: string;
  votes?: number;
  summary: string;
  full_text: string;
  evidence: string;
  counter_arguments: string;
  related_episodes?: string;
  related_characters?: string;
  impact_level?: string;
  category?: string;
  image?: string;
  background_image?: string;
  description?: string;
  status?: string;
}

const TheoryForm = ({ onSubmit, editingTheory, onCancel }: TheoryFormProps) => {
  const [form, setForm] = useState<TheoryFormData>({
    id: undefined,
    title: '',
    type: 'character',
    probability: 'medium',
    author: '',
    votes: 0,
    summary: '',
    full_text: '',
    evidence: '',
    counter_arguments: '',
    related_episodes: '',
    related_characters: '',
    impact_level: '',
    category: '',
    image: '',
    background_image: ''
  });

  useEffect(() => {
    if (editingTheory) {
      setForm({
        id: editingTheory.id,
        title: editingTheory.title || '',
        type: editingTheory.type || 'character',
        probability: editingTheory.probability || 'medium',
        author: editingTheory.author || '',
        votes: editingTheory.votes || 0,
        summary: editingTheory.summary || '',
        full_text: editingTheory.full_text || '',
        evidence: editingTheory.evidence || '',
        counter_arguments: editingTheory.counter_arguments || '',
        related_episodes: editingTheory.related_episodes || '',
        related_characters: editingTheory.related_characters || '',
        impact_level: editingTheory.impact_level || '',
        category: editingTheory.category || '',
        image: editingTheory.image || '',
        background_image: editingTheory.background_image || ''
      });
    } else {
      resetForm();
    }
  }, [editingTheory]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(form, !!form.id);
  };

  const resetForm = () => {
    setForm({
      id: undefined,
      title: '',
      type: 'character',
      probability: 'medium',
      author: '',
      votes: 0,
      summary: '',
      full_text: '',
      evidence: '',
      counter_arguments: '',
      related_episodes: '',
      related_characters: '',
      impact_level: '',
      category: '',
      image: '',
      background_image: ''
    });
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
            <label className="text-sm font-medium text-gray-300 mb-2 block">Название теории*</label>
            <Input
              required
              placeholder="Злой Морти — это будущая версия нашего Морти"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="bg-gray-700 border-gray-600 text-white"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-300 mb-2 block">Тип теории*</label>
              <select
                required
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
                className="w-full bg-gray-700 border-gray-600 text-white rounded-md px-3 py-2"
              >
                <option value="character">Персонажи</option>
                <option value="multiverse">Мультивселенная</option>
                <option value="science">Наука</option>
                <option value="future">Будущее</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-300 mb-2 block">Вероятность*</label>
              <select
                required
                value={form.probability}
                onChange={(e) => setForm({ ...form, probability: e.target.value })}
                className="w-full bg-gray-700 border-gray-600 text-white rounded-md px-3 py-2"
              >
                <option value="confirmed">Подтверждено</option>
                <option value="high">Высокая</option>
                <option value="medium">Средняя</option>
                <option value="low">Низкая</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-300 mb-2 block">Автор*</label>
              <Input
                required
                placeholder="Фанатское сообщество"
                value={form.author}
                onChange={(e) => setForm({ ...form, author: e.target.value })}
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-300 mb-2 block">URL изображения карточки</label>
              <Input
                type="url"
                placeholder="https://..."
                value={form.image}
                onChange={(e) => setForm({ ...form, image: e.target.value })}
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-300 mb-2 block">URL фона страницы теории</label>
              <Input
                type="url"
                placeholder="https://..."
                value={form.background_image}
                onChange={(e) => setForm({ ...form, background_image: e.target.value })}
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-300 mb-2 block">Краткое описание*</label>
            <Textarea
              required
              placeholder="Краткое описание теории в 1-2 предложения..."
              value={form.summary}
              onChange={(e) => setForm({ ...form, summary: e.target.value })}
              className="bg-gray-700 border-gray-600 text-white"
              rows={2}
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-300 mb-2 block">Полное описание*</label>
            <div className="bg-white rounded-md">
              <ReactQuill
                theme="snow"
                value={form.full_text}
                onChange={(value) => setForm({ ...form, full_text: value })}
                className="min-h-[300px]"
                modules={{
                  toolbar: [
                    [{ 'header': [1, 2, 3, false] }],
                    ['bold', 'italic', 'underline', 'strike'],
                    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                    ['blockquote', 'code-block'],
                    ['link'],
                    ['clean']
                  ]
                }}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-300 mb-2 block">Доказательства (через запятую)*</label>
              <Textarea
                required
                placeholder="Знание технологий Рика, Схожие черты характера"
                value={form.evidence}
                onChange={(e) => setForm({ ...form, evidence: e.target.value })}
                className="bg-gray-700 border-gray-600 text-white"
                rows={3}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-300 mb-2 block">Контраргументы (через запятую)*</label>
              <Textarea
                required
                placeholder="Разные биографии, Временные парадоксы"
                value={form.counter_arguments}
                onChange={(e) => setForm({ ...form, counter_arguments: e.target.value })}
                className="bg-gray-700 border-gray-600 text-white"
                rows={3}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-300 mb-2 block">Связанные эпизоды (через запятую)</label>
              <Input
                placeholder="Close Rick-counters, Tales From the Citadel"
                value={form.related_episodes}
                onChange={(e) => setForm({ ...form, related_episodes: e.target.value })}
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-300 mb-2 block">Связанные персонажи (через запятую)</label>
              <Input
                placeholder="Морти С-137, Злой Морти, Рик С-137"
                value={form.related_characters}
                onChange={(e) => setForm({ ...form, related_characters: e.target.value })}
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button 
              type="submit" 
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            >
              <Icon name="Save" size={18} className="mr-2" />
              {editingTheory ? 'Обновить' : 'Создать'}
            </Button>
            {editingTheory && onCancel && (
              <Button 
                type="button" 
                variant="outline"
                onClick={() => {
                  resetForm();
                  onCancel();
                }}
                className="border-gray-600 text-gray-300 hover:bg-gray-700"
              >
                <Icon name="X" size={18} className="mr-2" />
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