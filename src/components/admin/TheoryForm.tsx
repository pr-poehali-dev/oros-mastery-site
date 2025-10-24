import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';


interface TheoryFormProps {
  onSubmit: (formData: TheoryFormData, isEdit: boolean) => Promise<void>;
  editingTheory?: TheoryFormData & { id?: number } | null;
  onCancel?: () => void;
}

export interface TheoryFormData {
  id?: number;
  title: string;
  description: string;
  image?: string;
  status: string;
  evidence: string;
}

const TheoryForm = ({ onSubmit, editingTheory, onCancel }: TheoryFormProps) => {
  const [form, setForm] = useState<TheoryFormData>({
    title: '',
    description: '',
    image: '',
    status: '',
    evidence: ''
  });

  useEffect(() => {
    if (editingTheory) {
      setForm({
        id: editingTheory.id,
        title: editingTheory.title || '',
        description: editingTheory.description || '',
        image: editingTheory.image || '',
        status: editingTheory.status || '',
        evidence: editingTheory.evidence || ''
      });
    } else {
      resetForm();
    }
  }, [editingTheory]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(form, !!editingTheory?.id);
    resetForm();
  };

  const resetForm = () => {
    setForm({
      title: '',
      description: '',
      image: '',
      status: '',
      evidence: ''
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-300 mb-2 block">Статус</label>
              <Input
                placeholder="Подтверждено / Вероятно / Опровергнуто"
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-300 mb-2 block">URL изображения</label>
              <Input
                type="url"
                placeholder="https://..."
                value={form.image}
                onChange={(e) => setForm({ ...form, image: e.target.value })}
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-300 mb-2 block">Описание теории*</label>
            <Textarea
              required
              placeholder="Подробное описание теории..."
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="bg-gray-700 border-gray-600 text-white min-h-[200px]"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-300 mb-2 block">Доказательства (через запятую)</label>
            <Textarea
              placeholder="Знание технологий Рика, Схожие черты характера"
              value={form.evidence}
              onChange={(e) => setForm({ ...form, evidence: e.target.value })}
              className="bg-gray-700 border-gray-600 text-white"
            />
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