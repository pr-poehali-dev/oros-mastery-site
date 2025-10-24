import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

import { TheoryFormData } from './TheoryForm';

export interface Theory extends TheoryFormData {
  id: number;
}

interface TheoryListProps {
  theories: Theory[];
  onDelete: (id: number) => Promise<void>;
  onEdit: (theory: Theory) => void;
}

const TheoryList = ({ theories, onDelete, onEdit }: TheoryListProps) => {
  const getProbabilityColor = (probability: string) => {
    switch (probability) {
      case 'confirmed': return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'high': return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
      case 'medium': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'low': return 'bg-red-500/20 text-red-300 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  const getProbabilityText = (probability: string) => {
    switch (probability) {
      case 'confirmed': return 'Подтверждено';
      case 'high': return 'Высокая';
      case 'medium': return 'Средняя';
      case 'low': return 'Низкая';
      default: return 'Неизвестно';
    }
  };

  return (
    <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-2xl text-white flex items-center gap-2">
          <Icon name="List" size={24} className="text-green-400" />
          Список теорий
        </CardTitle>
        <CardDescription className="text-gray-300">
          Всего теорий: {theories.length}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 max-h-[600px] overflow-y-auto">
          {theories.map((theory) => (
            <div
              key={theory.id}
              className="bg-gray-900/50 p-4 rounded-lg border border-gray-700 hover:border-green-500/50 transition-colors"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <h3 className="text-white font-semibold">{theory.title}</h3>
                    <Badge className={getProbabilityColor(theory.probability)}>
                      {getProbabilityText(theory.probability)}
                    </Badge>
                  </div>
                  <p className="text-gray-300 text-sm mb-2">{theory.summary}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-300">
                    <span className="flex items-center gap-1">
                      <Icon name="User" size={14} />
                      {theory.author}
                    </span>
                    <span className="flex items-center gap-1">
                      <Icon name="Tag" size={14} />
                      {theory.type}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onEdit(theory)}
                    className="border-green-500/50 text-green-400 hover:bg-green-500/10"
                  >
                    <Icon name="Edit" size={16} />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onDelete(theory.id)}
                    className="border-red-500/50 text-red-400 hover:bg-red-500/10"
                  >
                    <Icon name="Trash2" size={16} />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TheoryList;