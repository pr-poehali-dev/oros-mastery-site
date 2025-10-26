import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { WatchedEpisode } from '@/hooks/useWatchedEpisodes';

interface WatchedEpisodesProps {
  episodes: WatchedEpisode[];
  onRemove: (id: string) => void;
}

const WatchedEpisodes = ({ episodes, onRemove }: WatchedEpisodesProps) => {
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {displayedEpisodes.map((ep) => (
          <Link
            key={ep.id}
            to={`/episode/${ep.slug}`}
            className="group"
          >
            <div className="bg-gray-800 rounded-lg overflow-hidden hover:ring-2 hover:ring-cyan-400 transition-all">
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={ep.image}
                  alt={ep.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <Badge className="absolute top-2 md:top-3 left-2 md:left-3 bg-cyan-400/90 text-gray-900 border-0 font-bold text-xs md:text-sm">
                  S{ep.season}E{ep.episode}
                </Badge>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onRemove(ep.id);
                  }}
                  className="absolute top-2 md:top-3 right-2 md:right-3 bg-black/60 hover:bg-red-500 p-1.5 rounded-full transition-colors z-10"
                  aria-label="Удалить из просмотренного"
                >
                  <Icon name="X" size={14} className="text-white" />
                </button>
              </div>
              <div className="p-3 md:p-4">
                <h3 className="text-white font-semibold mb-2 line-clamp-2 group-hover:text-cyan-400 transition-colors text-sm md:text-base">
                  {ep.title}
                </h3>
                <div className="flex items-center gap-2 text-gray-400 text-xs md:text-sm">
                  <Icon name="Clock" size={12} />
                  <span>Недавно просмотрено</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default WatchedEpisodes;