import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import RichTextEditor from '@/components/admin/RichTextEditor';


interface Character {
  id: number;
  name: string;
}

interface UniverseFormProps {
  onSubmit: (formData: UniverseFormData, isEdit: boolean) => Promise<void>;
  editingUniverse?: UniverseFormData & { id?: number } | null;
  onCancelEdit?: () => void;
  characters: Character[];
}

export interface UniverseFormData {
  id?: number;
  name: string;
  shortDescription?: string;
  description: string;
  image: string;
  backgroundImage?: string;
  status: string;
  dangerLevel?: string;
  coordinates?: string;
  discoveryDate?: string;
  population?: string;
  technology?: string;
  features: string;
  relatedCharacters?: string;
}

const UniverseForm = ({ onSubmit, editingUniverse, onCancelEdit, characters }: UniverseFormProps) => {
  const [form, setForm] = useState<UniverseFormData>({
    name: '',
    shortDescription: '',
    description: '',
    image: '',
    backgroundImage: '',
    status: '',
    dangerLevel: '',
    coordinates: '',
    discoveryDate: '',
    population: '',
    technology: '',
    features: '',
    relatedCharacters: ''
  });
  const [selectedCharacters, setSelectedCharacters] = useState<number[]>([]);

  useEffect(() => {
    if (editingUniverse) {
      setForm({
        ...editingUniverse,
        shortDescription: editingUniverse.shortDescription || '',
        backgroundImage: editingUniverse.backgroundImage || '',
        dangerLevel: editingUniverse.dangerLevel || '',
        coordinates: editingUniverse.coordinates || '',
        discoveryDate: editingUniverse.discoveryDate || '',
        population: editingUniverse.population || '',
        technology: editingUniverse.technology || '',
        relatedCharacters: editingUniverse.relatedCharacters || ''
      });
      if (editingUniverse.relatedCharacters) {
        const ids = editingUniverse.relatedCharacters.split(',').map(id => parseInt(id.trim())).filter(id => !isNaN(id));
        setSelectedCharacters(ids);
      }
    }
  }, [editingUniverse]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formWithCharacters = {
      ...form,
      relatedCharacters: selectedCharacters.join(',')
    };
    await onSubmit(formWithCharacters, !!editingUniverse);
    resetForm();
  };

  const toggleCharacter = (charId: number) => {
    if (selectedCharacters.includes(charId)) {
      setSelectedCharacters(selectedCharacters.filter(id => id !== charId));
    } else {
      setSelectedCharacters([...selectedCharacters, charId]);
    }
  };

  const resetForm = () => {
    setForm({
      name: '',
      shortDescription: '',
      description: '',
      image: '',
      backgroundImage: '',
      status: '',
      dangerLevel: '',
      coordinates: '',
      discoveryDate: '',
      population: '',
      technology: '',
      features: '',
      relatedCharacters: ''
    });
    setSelectedCharacters([]);
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
              Краткое описание
            </label>
            <Textarea
              placeholder="Краткое описание для карточки (1-2 предложения)"
              value={form.shortDescription}
              onChange={(e) => setForm({ ...form, shortDescription: e.target.value })}
              className="bg-gray-900 border-gray-700 text-white min-h-[60px]"
            />
          </div>

          <div>
            <label className="text-white text-sm font-medium mb-2 block">
              Полное описание *
            </label>
            <RichTextEditor
              value={form.description}
              onChange={(value) => setForm({ ...form, description: value })}
              placeholder="Полное описание вселенной с форматированием..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-white text-sm font-medium mb-2 block">
                Координаты
              </label>
              <Input
                placeholder="Например: C-137"
                value={form.coordinates}
                onChange={(e) => setForm({ ...form, coordinates: e.target.value })}
                className="bg-gray-900 border-gray-700 text-white"
              />
            </div>

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
                <option value="Активна">Активна</option>
                <option value="Уничтожена">Уничтожена</option>
                <option value="Недоступна">Недоступна</option>
                <option value="Заброшена">Заброшена</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-white text-sm font-medium mb-2 block">
                Уровень опасности
              </label>
              <select
                value={form.dangerLevel}
                onChange={(e) => setForm({ ...form, dangerLevel: e.target.value })}
                className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
              >
                <option value="">Выберите уровень</option>
                <option value="Низкий">Низкий</option>
                <option value="Средний">Средний</option>
                <option value="Высокий">Высокий</option>
                <option value="Критический">Критический</option>
              </select>
            </div>

            <div>
              <label className="text-white text-sm font-medium mb-2 block">
                Дата открытия
              </label>
              <Input
                placeholder="Например: 2013"
                value={form.discoveryDate}
                onChange={(e) => setForm({ ...form, discoveryDate: e.target.value })}
                className="bg-gray-900 border-gray-700 text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-white text-sm font-medium mb-2 block">
                Население
              </label>
              <Input
                placeholder="Например: 7 миллиардов"
                value={form.population}
                onChange={(e) => setForm({ ...form, population: e.target.value })}
                className="bg-gray-900 border-gray-700 text-white"
              />
            </div>

            <div>
              <label className="text-white text-sm font-medium mb-2 block">
                Технологический уровень
              </label>
              <Input
                placeholder="Например: Высокотехнологичная"
                value={form.technology}
                onChange={(e) => setForm({ ...form, technology: e.target.value })}
                className="bg-gray-900 border-gray-700 text-white"
              />
            </div>
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
              Связанные персонажи
            </label>
            <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 max-h-64 overflow-y-auto">
              {characters.length === 0 ? (
                <p className="text-gray-400 text-sm">Нет доступных персонажей. Создайте персонажей во вкладке "Персонажи".</p>
              ) : (
                <div className="space-y-2">
                  {characters.map((char) => (
                    <label 
                      key={char.id} 
                      className="flex items-center gap-3 p-2 hover:bg-gray-800 rounded cursor-pointer transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={selectedCharacters.includes(char.id)}
                        onChange={() => toggleCharacter(char.id)}
                        className="w-4 h-4 rounded border-gray-600 text-indigo-500 focus:ring-indigo-500"
                      />
                      <span className="text-white">{char.name}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
            {selectedCharacters.length > 0 && (
              <p className="text-sm text-gray-400 mt-2">
                Выбрано: {selectedCharacters.length} {selectedCharacters.length === 1 ? 'персонаж' : 'персонажа'}
              </p>
            )}
          </div>

          <div>
            <label className="text-white text-sm font-medium mb-2 block">
              URL изображения карточки *
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
              URL фонового изображения
            </label>
            <Input
              placeholder="https://..."
              value={form.backgroundImage}
              onChange={(e) => setForm({ ...form, backgroundImage: e.target.value })}
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

export default UniverseForm;