import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

export interface Episode {
  id: number;
  title: string;
  season: number;
  episode: number;
  description: string;
  image: string;
  airDate: string;
  videoUrl?: string;
}

interface EpisodeListProps {
  episodes: Episode[];
  onDelete: (id: number) => Promise<void>;
}

const EpisodeList = ({ episodes, onDelete }: EpisodeListProps) => {
  return (
    <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-2xl text-white flex items-center gap-2">
          <Icon name="List" size={24} className="text-cyan-400" />
          Список эпизодов
        </CardTitle>
        <CardDescription className="text-gray-300">
          Всего эпизодов: {episodes.length}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 max-h-[600px] overflow-y-auto">
          {episodes.map((episode) => (
            <div
              key={episode.id}
              className="bg-gray-900/50 p-4 rounded-lg border border-gray-700 hover:border-cyan-500/50 transition-colors"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30">
                      S{episode.season}E{episode.episode}
                    </Badge>
                    <h3 className="text-white font-semibold">{episode.title}</h3>
                  </div>
                  <p className="text-gray-300 text-sm mb-2">{episode.description}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-300">
                    <span className="flex items-center gap-1">
                      <Icon name="Calendar" size={14} />
                      {episode.airDate}
                    </span>
                    {episode.videoUrl && (
                      <span className="flex items-center gap-1 text-green-400">
                        <Icon name="Video" size={14} />
                        Видео
                      </span>
                    )}
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onDelete(episode.id)}
                  className="border-red-500/50 text-red-400 hover:bg-red-500/10"
                >
                  <Icon name="Trash2" size={16} />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default EpisodeList;