import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';

interface CharacterFormProps {
  onSubmit: (formData: CharacterFormData, isEdit: boolean) => Promise<void>;
  editingCharacter?: CharacterFormData & { id?: number } | null;
  onCancelEdit?: () => void;
}

export interface CharacterFormData {
  id?: number;
  name: string;
  role: string;
  species: string;
  status: string;
  bio: string;
  image: string;
  abilities: string;
}

const CharacterForm = ({ onSubmit, editingCharacter, onCancelEdit }: CharacterFormProps) => {
  const [form, setForm] = useState<CharacterFormData>({
    name: '',
    role: '',
    species: '',
    status: '',
    bio: '',
    image: '',
    abilities: ''
  });

  useEffect(() => {
    if (editingCharacter) {
      setForm(editingCharacter);
    }
  }, [editingCharacter]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(form, !!editingCharacter);
    setForm({
      name: '',
      role: '',
      species: '',
      status: '',
      bio: '',
      image: '',
      abilities: ''
    });
    if (onCancelEdit) onCancelEdit();
  };

  const handleCancel = () => {
    setForm({
      name: '',
      role: '',
      species: '',
      status: '',
      bio: '',
      image: '',
      abilities: ''
    });
    if (onCancelEdit) onCancelEdit();
  };

  return (
    <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-2xl text-white flex items-center gap-2">
          <Icon name={editingCharacter ? "Edit" : "Plus"} size={24} className="text-blue-400" />
          {editingCharacter ? 'Редактировать персонажа' : 'Добавить персонажа'}
        </CardTitle>
        <CardDescription className="text-gray-300">
          {editingCharacter ? 'Обновите данные персонажа' : 'Добавьте нового персонажа'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-white text-sm font-medium mb-2 block">
              Имя персонажа *
            </label>
            <Input
              placeholder="Например: Рик Санчез"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
              className="bg-gray-900 border-gray-700 text-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-white text-sm font-medium mb-2 block">
                Роль *
              </label>
              <Input
                placeholder="Например: Главный герой"
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
                required
                className="bg-gray-900 border-gray-700 text-white"
              />
            </div>
            <div>
              <label className="text-white text-sm font-medium mb-2 block">
                Вид *
              </label>
              <Input
                placeholder="Например: Человек"
                value={form.species}
                onChange={(e) => setForm({ ...form, species: e.target.value })}
                required
                className="bg-gray-900 border-gray-700 text-white"
              />
            </div>
          </div>

          <div>
            <label className="text-white text-sm font-medium mb-2 block">
              Статус
            </label>
            <Input
              placeholder="Например: Живой"
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
              className="bg-gray-900 border-gray-700 text-white"
            />
          </div>

          <div>
            <label className="text-white text-sm font-medium mb-2 block">
              Биография *
            </label>
            <Textarea
              placeholder="Краткая биография персонажа..."
              value={form.bio}
              onChange={(e) => setForm({ ...form, bio: e.target.value })}
              required
              className="bg-gray-900 border-gray-700 text-white min-h-[100px]"
            />
          </div>

          <div>
            <label className="text-white text-sm font-medium mb-2 block">
              Способности (через запятую)
            </label>
            <Textarea
              placeholder="Например: Гениальный интеллект, Изобретательность, Портальная пушка"
              value={form.abilities}
              onChange={(e) => setForm({ ...form, abilities: e.target.value })}
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
            <Button type="submit" className="flex-1 bg-blue-500 hover:bg-blue-600">
              <Icon name="Check" size={20} className="mr-2" />
              {editingCharacter ? 'Сохранить' : 'Добавить персонажа'}
            </Button>
            {editingCharacter && (
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

export default CharacterForm;
