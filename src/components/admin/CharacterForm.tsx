import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';

interface CharacterFormProps {
  onSubmit: (formData: CharacterFormData, isEdit: boolean) => Promise<void>;
  editingCharacter?: CharacterFormData & { id?: number } | null;
  onCancel?: () => void;
}

export interface CharacterFormData {
  id?: number;
  name: string;
  description: string;
  image: string;
  background_image?: string;
  status: string;
  abilities: string;
}

const CharacterForm = ({ onSubmit, editingCharacter, onCancel }: CharacterFormProps) => {
  const [form, setForm] = useState<CharacterFormData>({
    name: '',
    description: '',
    image: '',
    background_image: '',
    status: '',
    abilities: ''
  });

  useEffect(() => {
    if (editingCharacter) {
      setForm({
        id: editingCharacter.id,
        name: editingCharacter.name || '',
        description: editingCharacter.description || '',
        image: editingCharacter.image || '',
        background_image: editingCharacter.background_image || '',
        status: editingCharacter.status || '',
        abilities: editingCharacter.abilities || ''
      });
    } else {
      resetForm();
    }
  }, [editingCharacter]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(form, !!editingCharacter?.id);
    resetForm();
  };

  const resetForm = () => {
    setForm({
      name: '',
      description: '',
      image: '',
      background_image: '',
      status: '',
      abilities: ''
    });
  };

  return (
    <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-2xl text-white flex items-center gap-2">
          <Icon name={editingCharacter ? "Edit" : "Plus"} size={24} className="text-blue-400" />
          {editingCharacter ? 'Редактировать персонажа' : 'Добавить персонажа'}
        </CardTitle>
        <CardDescription className="text-gray-400">
          {editingCharacter ? 'Обновите информацию о персонаже' : 'Создайте нового персонажа Rick and Morty'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-300 mb-2 block">Имя персонажа*</label>
              <Input
                required
                placeholder="Рик Санчез"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-300 mb-2 block">Статус</label>
              <Input
                placeholder="Жив / Мертв / Неизвестно"
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-300 mb-2 block">Описание*</label>
            <Textarea
              required
              placeholder="Подробное описание персонажа..."
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="bg-gray-700 border-gray-600 text-white min-h-[200px]"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-300 mb-2 block">Способности (через запятую)</label>
            <Textarea
              placeholder="Гениальный интеллект, Изобретательность, Боевые навыки"
              value={form.abilities}
              onChange={(e) => setForm({ ...form, abilities: e.target.value })}
              className="bg-gray-700 border-gray-600 text-white"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-300 mb-2 block">URL изображения (карточка)</label>
              <Input
                type="url"
                placeholder="https://..."
                value={form.image}
                onChange={(e) => setForm({ ...form, image: e.target.value })}
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-300 mb-2 block">URL фонового изображения</label>
              <Input
                type="url"
                placeholder="https://..."
                value={form.background_image}
                onChange={(e) => setForm({ ...form, background_image: e.target.value })}
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button 
              type="submit" 
              className="bg-gradient-to-r from-cyan-500 to-green-500 hover:from-cyan-600 hover:to-green-600"
            >
              <Icon name="Save" size={18} className="mr-2" />
              {editingCharacter ? 'Обновить' : 'Создать'}
            </Button>
            {editingCharacter && onCancel && (
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

export default CharacterForm;
