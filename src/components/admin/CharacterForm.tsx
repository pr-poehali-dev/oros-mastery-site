import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import RichTextEditor from '@/components/admin/RichTextEditor';

interface CharacterFormProps {
  onSubmit: (formData: CharacterFormData, isEdit: boolean) => Promise<void>;
  editingCharacter?: CharacterFormData & { id?: number } | null;
  onCancel?: () => void;
}

export interface CharacterFormData {
  id?: number;
  name: string;
  role?: string;
  species?: string;
  bio?: string;
  full_bio?: string;
  image: string;
  background_image?: string;
  avatar_image?: string;
  status: string;
  abilities: string;
  origin?: string;
  first_appearance?: string;
  occupation?: string;
  affiliation?: string;
  family?: string;
  notable_episodes?: string;
  personality?: string;
  goals?: string;
}

const CharacterForm = ({ onSubmit, editingCharacter, onCancel }: CharacterFormProps) => {
  const [form, setForm] = useState<CharacterFormData>({
    name: '',
    role: '',
    species: '',
    bio: '',
    full_bio: '',
    image: '',
    background_image: '',
    avatar_image: '',
    status: '',
    abilities: '',
    origin: '',
    first_appearance: '',
    occupation: '',
    affiliation: '',
    family: '',
    notable_episodes: '',
    personality: '',
    goals: ''
  });

  useEffect(() => {
    if (editingCharacter) {
      setForm({
        id: editingCharacter.id,
        name: editingCharacter.name || '',
        role: editingCharacter.role || '',
        species: editingCharacter.species || '',
        bio: editingCharacter.bio || '',
        full_bio: editingCharacter.full_bio || '',
        image: editingCharacter.image || '',
        background_image: editingCharacter.background_image || '',
        avatar_image: editingCharacter.avatar_image || '',
        status: editingCharacter.status || '',
        abilities: editingCharacter.abilities || '',
        origin: editingCharacter.origin || '',
        first_appearance: editingCharacter.first_appearance || '',
        occupation: editingCharacter.occupation || '',
        affiliation: editingCharacter.affiliation || '',
        family: editingCharacter.family || '',
        notable_episodes: editingCharacter.notable_episodes || '',
        personality: editingCharacter.personality || '',
        goals: editingCharacter.goals || ''
      });
    } else {
      resetForm();
    }
  }, [editingCharacter]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(form, !!form.id);
    resetForm();
  };

  const resetForm = () => {
    setForm({
      name: '',
      role: '',
      species: '',
      bio: '',
      full_bio: '',
      image: '',
      background_image: '',
      avatar_image: '',
      status: '',
      abilities: '',
      origin: '',
      first_appearance: '',
      occupation: '',
      affiliation: '',
      family: '',
      notable_episodes: '',
      personality: '',
      goals: ''
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
              <label className="text-sm font-medium text-gray-300 mb-2 block">Роль</label>
              <Input
                placeholder="Главный герой, Антагонист..."
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-300 mb-2 block">Вид</label>
              <Input
                placeholder="Человек, Инопланетянин..."
                value={form.species}
                onChange={(e) => setForm({ ...form, species: e.target.value })}
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-300 mb-2 block">Статус</label>
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-cyan-500"
              >
                <option value="">Выберите статус</option>
                <option value="Жив">Жив</option>
                <option value="Мертв">Мертв</option>
                <option value="Неизвестно">Неизвестно</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-300 mb-2 block">Происхождение</label>
              <Input
                placeholder="Земля C-137"
                value={form.origin}
                onChange={(e) => setForm({ ...form, origin: e.target.value })}
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-300 mb-2 block">Первое появление</label>
              <Input
                placeholder="S01E01"
                value={form.first_appearance}
                onChange={(e) => setForm({ ...form, first_appearance: e.target.value })}
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-300 mb-2 block">Род деятельности</label>
              <Input
                placeholder="Ученый, Студент..."
                value={form.occupation}
                onChange={(e) => setForm({ ...form, occupation: e.target.value })}
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-300 mb-2 block">Принадлежность</label>
              <Input
                placeholder="Цитадель Риков, Семья Смитов..."
                value={form.affiliation}
                onChange={(e) => setForm({ ...form, affiliation: e.target.value })}
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-300 mb-2 block">Краткая биография</label>
            <Textarea
              placeholder="Короткое описание для карточки (1-2 предложения)"
              value={form.bio}
              onChange={(e) => setForm({ ...form, bio: e.target.value })}
              className="bg-gray-700 border-gray-600 text-white min-h-[60px]"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-300 mb-2 block">Полная биография*</label>
            <RichTextEditor
              value={form.full_bio || ''}
              onChange={(value) => setForm({ ...form, full_bio: value })}
              placeholder="Подробная биография персонажа с форматированием..."
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-300 mb-2 block">Личность</label>
            <Textarea
              placeholder="Описание характера и личности персонажа..."
              value={form.personality}
              onChange={(e) => setForm({ ...form, personality: e.target.value })}
              className="bg-gray-700 border-gray-600 text-white min-h-[80px]"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-300 mb-2 block">Цели и мотивация</label>
            <Textarea
              placeholder="Что движет персонажем, его цели..."
              value={form.goals}
              onChange={(e) => setForm({ ...form, goals: e.target.value })}
              className="bg-gray-700 border-gray-600 text-white min-h-[80px]"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-300 mb-2 block">Семья (через запятую)</label>
            <Input
              placeholder="Морти Смит (внук), Бет Смит (дочь)..."
              value={form.family}
              onChange={(e) => setForm({ ...form, family: e.target.value })}
              className="bg-gray-700 border-gray-600 text-white"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-300 mb-2 block">Способности (через запятую)</label>
            <Textarea
              placeholder="Гениальный интеллект, Изобретательность, Боевые навыки"
              value={form.abilities}
              onChange={(e) => setForm({ ...form, abilities: e.target.value })}
              className="bg-gray-700 border-gray-600 text-white min-h-[80px]"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-300 mb-2 block">Ключевые эпизоды (через запятую)</label>
            <Textarea
              placeholder="S01E01 - Пилот, S03E07 - Риклантида..."
              value={form.notable_episodes}
              onChange={(e) => setForm({ ...form, notable_episodes: e.target.value })}
              className="bg-gray-700 border-gray-600 text-white min-h-[80px]"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-300 mb-2 block">URL изображения (карточка)*</label>
            <Input
              type="url"
              placeholder="https://..."
              value={form.image}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
              className="bg-gray-700 border-gray-600 text-white"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-300 mb-2 block">URL фоновой картинки (для карточки)</label>
              <Input
                type="url"
                placeholder="https://..."
                value={form.background_image}
                onChange={(e) => setForm({ ...form, background_image: e.target.value })}
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-300 mb-2 block">URL аватара (круглая иконка)</label>
              <Input
                type="url"
                placeholder="https://..."
                value={form.avatar_image}
                onChange={(e) => setForm({ ...form, avatar_image: e.target.value })}
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