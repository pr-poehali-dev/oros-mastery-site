import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

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

      {allEpisodes.length > 0 && (
        <Card className="bg-gray-800/50 border-cyan-500/30 p-6">
          <h3 className="text-xl font-bold text-cyan-400 mb-4 flex items-center gap-2">
            <Icon name="Film" size={24} />
            Сезон {episode.season}
          </h3>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {allEpisodes
              .filter(ep => ep.season === episode.season)
              .sort((a, b) => a.episode - b.episode)
              .map(ep => (
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
                  </div>
                </Link>
              ))}
          </div>
        </Card>
      )}
    </>
  );
};

export default EpisodeSidebar;
