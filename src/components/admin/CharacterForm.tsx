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
  shortDescription?: string;
  role: string;
  species: string;
  status: string;
  bio: string;
  image: string;
  abilities: string;
  age?: string;
  gender?: string;
  origin?: string;
  affiliation?: string;
  firstAppearance?: string;
  voiceActor?: string;
  personality?: string;
}

const CharacterForm = ({ onSubmit, editingCharacter, onCancelEdit }: CharacterFormProps) => {
  const [form, setForm] = useState<CharacterFormData>({
    name: '',
    shortDescription: '',
    role: '',
    species: '',
    status: '',
    bio: '',
    image: '',
    abilities: '',
    age: '',
    gender: '',
    origin: '',
    affiliation: '',
    firstAppearance: '',
    voiceActor: '',
    personality: ''
  });

  useEffect(() => {
    if (editingCharacter) {
      setForm({
        ...editingCharacter,
        shortDescription: editingCharacter.shortDescription || '',
        age: editingCharacter.age || '',
        gender: editingCharacter.gender || '',
        origin: editingCharacter.origin || '',
        affiliation: editingCharacter.affiliation || '',
        firstAppearance: editingCharacter.firstAppearance || '',
        voiceActor: editingCharacter.voiceActor || '',
        personality: editingCharacter.personality || ''
      });
    }
  }, [editingCharacter]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(form, !!editingCharacter);
    resetForm();
  };

  const resetForm = () => {
    setForm({
      name: '',
      shortDescription: '',
      role: '',
      species: '',
      status: '',
      bio: '',
      image: '',
      abilities: '',
      age: '',
      gender: '',
      origin: '',
      affiliation: '',
      firstAppearance: '',
      voiceActor: '',
      personality: ''
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

          <div>
            <label className="text-white text-sm font-medium mb-2 block">
              Краткое описание
            </label>
            <Textarea
              placeholder="Краткое описание для карточки (1-2 предложения)"
              value={form.shortDescription}
              onChange={(e) => setForm({ ...form, shortDescription: e.target.value })}
              className="bg-gray-900 border-gray-700 text-white min-h-[60px]"
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

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-white text-sm font-medium mb-2 block">
                Статус
              </label>
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
                className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
              >
                <option value="">Выберите статус</option>
                <option value="Жив">Жив</option>
                <option value="Мертв">Мертв</option>
                <option value="Неизвестно">Неизвестно</option>
              </select>
            </div>
            <div>
              <label className="text-white text-sm font-medium mb-2 block">
                Пол
              </label>
              <select
                value={form.gender}
                onChange={(e) => setForm({ ...form, gender: e.target.value })}
                className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
              >
                <option value="">Выберите пол</option>
                <option value="Мужской">Мужской</option>
                <option value="Женский">Женский</option>
                <option value="Неизвестно">Неизвестно</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-white text-sm font-medium mb-2 block">
                Возраст
              </label>
              <Input
                placeholder="Например: 70+"
                value={form.age}
                onChange={(e) => setForm({ ...form, age: e.target.value })}
                className="bg-gray-900 border-gray-700 text-white"
              />
            </div>
            <div>
              <label className="text-white text-sm font-medium mb-2 block">
                Происхождение
              </label>
              <Input
                placeholder="Например: Вселенная C-137"
                value={form.origin}
                onChange={(e) => setForm({ ...form, origin: e.target.value })}
                className="bg-gray-900 border-gray-700 text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-white text-sm font-medium mb-2 block">
                Принадлежность
              </label>
              <Input
                placeholder="Например: Независимый"
                value={form.affiliation}
                onChange={(e) => setForm({ ...form, affiliation: e.target.value })}
                className="bg-gray-900 border-gray-700 text-white"
              />
            </div>
            <div>
              <label className="text-white text-sm font-medium mb-2 block">
                Первое появление
              </label>
              <Input
                placeholder="Например: Pilot (S1E1)"
                value={form.firstAppearance}
                onChange={(e) => setForm({ ...form, firstAppearance: e.target.value })}
                className="bg-gray-900 border-gray-700 text-white"
              />
            </div>
          </div>

          <div>
            <label className="text-white text-sm font-medium mb-2 block">
              Актёр озвучки
            </label>
            <Input
              placeholder="Например: Justin Roiland"
              value={form.voiceActor}
              onChange={(e) => setForm({ ...form, voiceActor: e.target.value })}
              className="bg-gray-900 border-gray-700 text-white"
            />
          </div>

          <div>
            <label className="text-white text-sm font-medium mb-2 block">
              Черты характера (через запятую)
            </label>
            <Textarea
              placeholder="Например: Гениальный, Циничный, Пьющий"
              value={form.personality}
              onChange={(e) => setForm({ ...form, personality: e.target.value })}
              className="bg-gray-900 border-gray-700 text-white min-h-[60px]"
            />
          </div>

          <div>
            <label className="text-white text-sm font-medium mb-2 block">
              Полная биография *
            </label>
            <RichTextEditor
              value={form.bio}
              onChange={(value) => setForm({ ...form, bio: value })}
              placeholder="Полная биография персонажа..."
            />
          </div>

          <div>
            <label className="text-white text-sm font-medium mb-2 block">
              Способности (через запятую)
            </label>
            <Textarea
              placeholder="Например: Гениальный интеллект, Изобретательность, Боевые навыки"
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

export default CharacterForm;