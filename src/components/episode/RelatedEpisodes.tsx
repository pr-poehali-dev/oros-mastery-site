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

interface RelatedEpisodesProps {
  currentEpisode: Episode;
  allEpisodes: Episode[];
  generateSlug: (id: number, title: string) => string;
}

const RelatedEpisodes = ({ currentEpisode, allEpisodes, generateSlug }: RelatedEpisodesProps) => {
  if (allEpisodes.length === 0) return null;

  return (
    <div className="mt-16">
      <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
        <Icon name="Sparkles" size={28} className="text-yellow-400" />
        Похожие эпизоды
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {allEpisodes
          .filter(ep => ep.season === currentEpisode.season && ep.id !== currentEpisode.id)
          .slice(0, 4)
          .map(ep => (
            <Link
              key={ep.id}
              to={`/episode/${generateSlug(ep.id, ep.title)}`}
              className="group"
            >
              <Card className="bg-gray-800/50 border-gray-700 hover:border-cyan-400 transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
                <div className="relative overflow-hidden aspect-video">
                  <img 
                    src={ep.image} 
                    alt={`${ep.title} - сезон ${ep.season} эпизод ${ep.episode}`}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60"></div>
                </div>
                <div className="p-4">
                  <div className="text-cyan-400 text-xs mb-2">S{ep.season}E{ep.episode}</div>
                  <h3 className="text-white font-semibold group-hover:text-cyan-400 transition-colors line-clamp-2">
                    {ep.title}
                  </h3>
                </div>
              </Card>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default RelatedEpisodes;
