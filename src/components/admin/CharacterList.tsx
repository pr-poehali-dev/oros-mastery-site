import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { CharacterFormData } from './CharacterForm';

export interface Character extends CharacterFormData {
  id: number;
}

interface CharacterListProps {
  characters: Character[];
  onDelete: (id: number) => Promise<void>;
  onEdit: (character: Character) => void;
}

const CharacterList = ({ characters, onDelete, onEdit }: CharacterListProps) => {
  return (
    <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-2xl text-white flex items-center gap-2">
          <Icon name="List" size={24} className="text-blue-400" />
          Список персонажей
        </CardTitle>
        <CardDescription className="text-gray-300">
          Всего персонажей: {characters.length}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 max-h-[600px] overflow-y-auto">
          {characters.map((character) => (
            <div
              key={character.id}
              className="bg-gray-900/50 p-4 rounded-lg border border-gray-700 hover:border-blue-500/50 transition-colors"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-white font-semibold">{character.name}</h3>
                    <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                      {character.role}
                    </Badge>
                  </div>
                  <p className="text-gray-300 text-sm mb-2">{character.bio}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-300">
                    <span className="flex items-center gap-1">
                      <Icon name="Dna" size={14} />
                      {character.species}
                    </span>
                    {character.status && (
                      <span className="flex items-center gap-1 text-green-400">
                        <Icon name="Heart" size={14} />
                        {character.status}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onEdit(character)}
                    className="border-blue-500/50 text-blue-400 hover:bg-blue-500/10"
                  >
                    <Icon name="Edit" size={16} />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onDelete(character.id)}
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

export default CharacterList;