import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';

interface UniverseFormProps {
  onSubmit: (formData: UniverseFormData, isEdit: boolean) => Promise<void>;
  editingUniverse?: UniverseFormData & { id?: number } | null;
  onCancelEdit?: () => void;
}

export interface UniverseFormData {
  id?: number;
  name: string;
  description: string;
  image: string;
  status: string;
  features: string;
}

const UniverseForm = ({ onSubmit, editingUniverse, onCancelEdit }: UniverseFormProps) => {
  const [form, setForm] = useState<UniverseFormData>({
    name: '',
    description: '',
    image: '',
    status: '',
    features: ''
  });

  useEffect(() => {
    if (editingUniverse) {
      setForm(editingUniverse);
    }
  }, [editingUniverse]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(form, !!editingUniverse);
    setForm({
      name: '',
      description: '',
      image: '',
      status: '',
      features: ''
    });
    if (onCancelEdit) onCancelEdit();
  };

  const handleCancel = () => {
    setForm({
      name: '',
      description: '',
      image: '',
      status: '',
      features: ''
    });
    if (onCancelEdit) onCancelEdit();
  };

  return (
    <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-2xl text-white flex items-center gap-2">
          <Icon name={editingUniverse ? "Edit" : "Plus"} size={24} className="text-indigo-400" />
          {editingUniverse ? 'Редактировать вселенную' : 'Добавить вселенную'}
        </CardTitle>
        <CardDescription className="text-gray-300">
          {editingUniverse ? 'Обновите данные вселенной' : 'Добавьте новую вселенную'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-white text-sm font-medium mb-2 block">
              Название вселенной *
            </label>
            <Input
              placeholder="Например: Главная вселенная Рика"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
              className="bg-gray-900 border-gray-700 text-white"
            />
          </div>

          <div>
            <label className="text-white text-sm font-medium mb-2 block">
              Статус
            </label>
            <Input
              placeholder="Например: Активная"
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
              className="bg-gray-900 border-gray-700 text-white"
            />
          </div>

          <div>
            <label className="text-white text-sm font-medium mb-2 block">
              Описание *
            </label>
            <Textarea
              placeholder="Краткое описание вселенной..."
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              required
              className="bg-gray-900 border-gray-700 text-white min-h-[100px]"
            />
          </div>

          <div>
            <label className="text-white text-sm font-medium mb-2 block">
              Особенности (через запятую)
            </label>
            <Textarea
              placeholder="Например: Рики управляют цитаделью, Морти служат помощниками, Существует Совет Риков"
              value={form.features}
              onChange={(e) => setForm({ ...form, features: e.target.value })}
              className="bg-gray-900 border-gray-700 text-white min-h-[80px]"
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

          <div className="flex gap-3">
            <Button type="submit" className="flex-1 bg-indigo-500 hover:bg-indigo-600">
              <Icon name="Check" size={20} className="mr-2" />
              {editingUniverse ? 'Сохранить' : 'Добавить вселенную'}
            </Button>
            {editingUniverse && (
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

export default UniverseForm;
