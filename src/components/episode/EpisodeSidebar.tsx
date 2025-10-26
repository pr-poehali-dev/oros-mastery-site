import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { useWatchedEpisodes } from '@/hooks/useWatchedEpisodes';

interface Episode {
  id: number;
  title: string;
  season: number;
  episode: number;
  description: string;
  image: string;
  airDate: string;
  videoIframe?: string;
  funFacts?: string;
  likes?: number;
  views?: number;
}

interface EpisodeSidebarProps {
  episode: Episode;
  allEpisodes: Episode[];
  generateSlug: (id: number, title: string) => string;
}

const EpisodeSidebar = ({ episode, allEpisodes, generateSlug }: EpisodeSidebarProps) => {
  const { isWatched } = useWatchedEpisodes();
  
  const seasonEpisodes = allEpisodes
    .filter(ep => ep.season === episode.season)
    .sort((a, b) => a.episode - b.episode);
  
  const watchedCount = seasonEpisodes.filter(ep => isWatched(ep.id.toString())).length;
  const totalCount = seasonEpisodes.length;
  const progressPercent = totalCount > 0 ? Math.round((watchedCount / totalCount) * 100) : 0;

  return (
    <>
      <Card className="bg-gray-800/50 border-purple-500/30 p-6">
        <h3 className="text-xl font-bold text-purple-400 mb-4 flex items-center gap-2">
          <Icon name="Info" size={24} />
          Информация об эпизоде
        </h3>
        <div className="space-y-3 text-gray-300">
          <div>
            <span className="text-gray-400">Сезон:</span>
            <span className="ml-2 font-semibold">{episode.season}</span>
          </div>
          <div>
            <span className="text-gray-400">Эпизод:</span>
            <span className="ml-2 font-semibold">{episode.episode}</span>
          </div>
          <div>
            <span className="text-gray-400">Дата выхода:</span>
            <span className="ml-2 font-semibold">{episode.airDate}</span>
          </div>
        </div>
      </Card>

      {totalCount > 0 && (
        <Card className="bg-gray-800/50 border-green-500/30 p-6">
          <h3 className="text-xl font-bold text-green-400 mb-4 flex items-center gap-2">
            <Icon name="TrendingUp" size={24} />
            Прогресс сезона
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">Просмотрено:</span>
              <span className="text-white font-semibold">{watchedCount} из {totalCount}</span>
            </div>
            <div className="relative w-full h-3 bg-gray-700 rounded-full overflow-hidden">
              <div 
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-green-500 to-cyan-500 transition-all duration-500 ease-out"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="text-center">
              <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-400">
                {progressPercent}%
              </span>
            </div>
          </div>
        </Card>
      )}

      {totalCount > 0 && (
        <Card className="bg-gray-800/50 border-cyan-500/30 p-6">
          <h3 className="text-xl font-bold text-cyan-400 mb-4 flex items-center gap-2">
            <Icon name="Film" size={24} />
            Сезон {episode.season}
          </h3>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {seasonEpisodes.map(ep => {
              const watched = isWatched(ep.id.toString());
              return (
                <Link
                  key={ep.id}
                  to={`/episode/${generateSlug(ep.id, ep.title)}`}
                  className={`block p-3 rounded-lg transition-all ${
                    ep.id === episode.id
                      ? 'bg-cyan-500/20 border-l-4 border-cyan-400'
                      : 'bg-gray-700/30 hover:bg-gray-700/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`text-sm font-semibold ${
                      ep.id === episode.id ? 'text-cyan-400' : 'text-gray-400'
                    }`}>
                      С{ep.season}Э{ep.episode}
                    </span>
                    <span className={`text-sm flex-1 ${
                      ep.id === episode.id ? 'text-white font-semibold' : 'text-gray-300'
                    }`}>
                      {ep.title}
                    </span>
                    {watched && ep.id !== episode.id && (
                      <Icon name="Check" size={16} className="text-green-400 flex-shrink-0" />
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        </Card>
      )}
    </>
  );
};

export default EpisodeSidebar;