import { Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import { WatchedEpisode } from '@/hooks/useWatchedEpisodes';

interface WatchedEpisodesProps {
  episodes: WatchedEpisode[];
  onRemove: (id: string) => void;
}

const WatchedEpisodes = ({ episodes, onRemove }: WatchedEpisodesProps) => {
  if (episodes.length === 0) return null;

  return (
    <div className="mb-12">
      <div className="flex items-center gap-3 mb-6">
        <Icon name="Clock" size={28} className="text-cyan-400" />
        <h2 className="text-2xl md:text-3xl font-bold text-white">
          Просмотренное
        </h2>
      </div>

      <div className="relative">
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-800">
          {episodes.map((episode) => (
            <div
              key={episode.id}
              className="flex-shrink-0 w-64 group relative"
            >
              <Link to={`/episode/${episode.slug}`}>
                <div className="relative rounded-lg overflow-hidden aspect-video mb-3">
                  <img
                    src={episode.image}
                    alt={episode.title}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-2 left-2 right-2">
                    <div className="text-xs text-cyan-400 font-semibold mb-1">
                      S{episode.season}E{episode.episode}
                    </div>
                  </div>
                </div>
                <h3 className="text-white font-semibold text-sm line-clamp-2 group-hover:text-cyan-400 transition-colors">
                  {episode.title}
                </h3>
              </Link>
              
              <button
                onClick={(e) => {
                  e.preventDefault();
                  onRemove(episode.id);
                }}
                className="absolute top-2 right-2 bg-black/60 hover:bg-red-500 p-1.5 rounded-full transition-colors"
                aria-label="Удалить из просмотренного"
              >
                <Icon name="X" size={16} className="text-white" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WatchedEpisodes;
