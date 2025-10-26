import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { WatchedEpisode } from '@/hooks/useWatchedEpisodes';

interface WatchedEpisodesProps {
  episodes: WatchedEpisode[];
  onRemove: (id: string) => void;
}

const WatchedEpisodes = ({ episodes, onRemove }: WatchedEpisodesProps) => {
  const navigate = useNavigate();
  const [startIndex, setStartIndex] = useState(0);

  if (episodes.length === 0) return null;

  const displayedEpisodes = episodes.slice(startIndex, startIndex + 3);
  const canGoPrev = startIndex > 0;
  const canGoNext = startIndex + 3 < episodes.length;

  const handlePrev = () => {
    if (canGoPrev) setStartIndex(startIndex - 1);
  };

  const handleNext = () => {
    if (canGoNext) setStartIndex(startIndex + 1);
  };

  return (
    <div className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Icon name="Clock" size={24} className="text-cyan-400" />
          <h2 className="text-xl md:text-2xl font-bold text-white">
            Просмотренное
          </h2>
        </div>
        {episodes.length > 3 && (
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={handlePrev}
              disabled={!canGoPrev}
              className="h-8 w-8 rounded-full border-gray-700 text-white disabled:opacity-30 hover:bg-gray-700"
            >
              <Icon name="ChevronLeft" size={18} />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={handleNext}
              disabled={!canGoNext}
              className="h-8 w-8 rounded-full border-gray-700 text-white disabled:opacity-30 hover:bg-gray-700"
            >
              <Icon name="ChevronRight" size={18} />
            </Button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedEpisodes.map((ep, index) => {
          const isLatest = startIndex === 0 && index === 0;
          return (
            <Card 
              key={ep.id}
              className="bg-gray-800 border-gray-700 hover:border-cyan-400 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-cyan-400/20 group overflow-hidden cursor-pointer"
              onClick={() => navigate(`/episode/${ep.slug}`)}
            >
              <div className="relative overflow-hidden aspect-video">
                <img 
                  src={ep.image}
                  alt={ep.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60"></div>
                <Badge className="absolute top-3 left-3 bg-cyan-400 text-gray-900 border-0 font-semibold">
                  {ep.season} сезон {ep.episode} серия
                </Badge>
                {isLatest && (
                  <Badge className="absolute top-3 right-3 bg-green-500 text-white border-0 font-semibold animate-pulse">
                    <Icon name="Play" size={12} className="mr-1" />
                    Продолжить
                  </Badge>
                )}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onRemove(ep.id);
                  }}
                  className="absolute bottom-3 right-3 bg-black/60 hover:bg-red-500 p-1.5 rounded-full transition-colors z-10"
                  aria-label="Удалить из просмотренного"
                >
                  <Icon name="X" size={14} className="text-white" />
                </button>
                <div className={`absolute inset-0 flex items-center justify-center transition-opacity bg-black/50 ${
                  isLatest ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                }`}>
                  <Button className={`font-bold ${
                    isLatest 
                      ? 'bg-green-500 text-white hover:bg-green-600' 
                      : 'bg-cyan-400 text-gray-900 hover:bg-cyan-300'
                  }`}>
                    <Icon name="Play" className="mr-2" size={20} />
                    {isLatest ? 'Продолжить просмотр' : 'Смотреть'}
                  </Button>
                </div>
              </div>

              <CardHeader>
                <CardTitle className="text-white group-hover:text-cyan-400 transition-colors line-clamp-2">
                  {ep.title}
                </CardTitle>
                <CardDescription className="flex items-center justify-between text-gray-300">
                  <span className="flex items-center gap-1">
                    <Icon name="Clock" size={14} />
                    Просмотрено
                  </span>
                  <span className="flex items-center gap-1 text-cyan-400">
                    <Icon name="Film" size={14} />
                    S{ep.season}E{ep.episode}
                  </span>
                </CardDescription>
              </CardHeader>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default WatchedEpisodes;