import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

export interface Universe {
  id: number;
  name: string;
  description: string;
  image: string;
  status: string;
  features: string;
}

interface UniverseListProps {
  universes: Universe[];
  onDelete: (id: number) => Promise<void>;
  onEdit: (universe: Universe) => void;
}

const UniverseList = ({ universes, onDelete, onEdit }: UniverseListProps) => {
  return (
    <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-2xl text-white flex items-center gap-2">
          <Icon name="List" size={24} className="text-indigo-400" />
          Список вселенных
        </CardTitle>
        <CardDescription className="text-gray-300">
          Всего вселенных: {universes.length}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 max-h-[600px] overflow-y-auto">
          {universes.map((universe) => (
            <div
              key={universe.id}
              className="bg-gray-900/50 p-4 rounded-lg border border-gray-700 hover:border-indigo-500/50 transition-colors"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-white font-semibold">{universe.name}</h3>
                    {universe.status && (
                      <Badge className="bg-indigo-500/20 text-indigo-300 border-indigo-500/30">
                        {universe.status}
                      </Badge>
                    )}
                  </div>
                  <p className="text-gray-300 text-sm mb-2">{universe.description}</p>
                  {universe.features && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {universe.features.split(',').slice(0, 3).map((feature, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs text-gray-300">
                          {feature.trim()}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onEdit(universe)}
                    className="border-indigo-500/50 text-indigo-400 hover:bg-indigo-500/10"
                  >
                    <Icon name="Edit" size={16} />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onDelete(universe.id)}
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

export default UniverseList;
