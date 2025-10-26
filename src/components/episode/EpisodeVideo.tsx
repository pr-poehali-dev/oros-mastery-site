import { useState, useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
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

interface EpisodeVideoProps {
  episode: Episode;
  localLikes: number;
  localViews: number;
  liked: boolean;
  onLike: () => void;
  onNavigate: (direction: 'prev' | 'next') => void;
}

const EpisodeVideo = ({ episode, localLikes, localViews, liked, onLike, onNavigate }: EpisodeVideoProps) => {
  const [showSkipCredits, setShowSkipCredits] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const videoContainerRef = useRef<HTMLDivElement>(null);

  const CREDITS_START_TIME = 1140;
  const CREDITS_SKIP_TIME = 1200;

  useEffect(() => {
    if (!episode.videoIframe) return;

    const interval = setInterval(() => {
      const iframe = videoContainerRef.current?.querySelector('iframe');
      if (iframe) {
        try {
          const iframeSrc = iframe.src;
          if (iframeSrc.includes('kodik') || iframeSrc.includes('youtube')) {
            const timeMatch = iframeSrc.match(/[?&]t=(\d+)/);
            if (timeMatch) {
              const time = parseInt(timeMatch[1]);
              setCurrentTime(time);
              
              if (time >= CREDITS_START_TIME && time < CREDITS_SKIP_TIME) {
                setShowSkipCredits(true);
              } else {
                setShowSkipCredits(false);
              }
            }
          }
        } catch (e) {
          console.log('Cannot access iframe time');
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [episode.videoIframe]);

  const handleSkipCredits = () => {
    setShowSkipCredits(false);
    onNavigate('next');
  };

  return (
    <Card className="bg-gray-800/50 border-cyan-500/30 overflow-hidden">
      {episode.videoIframe ? (
        <div 
          ref={videoContainerRef}
          className="relative w-full aspect-video md:h-[600px] [&_iframe]:w-full [&_iframe]:h-full [&_iframe]:border-0"
        >
          <div dangerouslySetInnerHTML={{ __html: episode.videoIframe }} />
          
          {showSkipCredits && (
            <div className="absolute bottom-20 right-8 z-10 animate-in slide-in-from-right duration-300">
              <Button
                onClick={handleSkipCredits}
                className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-semibold px-6 py-3 shadow-2xl"
              >
                <Icon name="FastForward" size={20} className="mr-2" />
                Пропустить титры
              </Button>
            </div>
          )}
        </div>
      ) : (
        <img 
          src={episode.image} 
          alt={`${episode.title} - сезон ${episode.season} эпизод ${episode.episode} Rick and Morty`}
          className="w-full h-96 object-cover"
          loading="eager"
        />
      )}
      <div className="p-6 space-y-4">
        <h1 className="text-2xl md:text-4xl font-bold text-cyan-400">{episode.title}</h1>
        <div className="flex items-center gap-3 flex-wrap">
          <span className="px-3 py-1 bg-gradient-to-r from-cyan-500 to-green-500 text-white text-sm rounded-full">
            Сезон {episode.season}, Эпизод {episode.episode}
          </span>
          <span className="text-gray-300 text-sm md:text-base">{episode.airDate}</span>
        </div>

        <div className="flex items-center gap-4 flex-wrap">
          <Button
            onClick={onLike}
            variant={liked ? "default" : "outline"}
            className={`${liked ? 'bg-pink-500 hover:bg-pink-600' : 'border-pink-500/50 text-pink-400 hover:bg-pink-500/10'} transition-all`}
            disabled={liked}
          >
            <Icon name="Heart" size={20} className="mr-2" fill={liked ? "currentColor" : "none"} />
            {localLikes} {liked ? 'Нравится' : 'Нравится'}
          </Button>
          <div className="flex items-center gap-2 text-gray-300">
            <Icon name="Eye" size={20} className="text-cyan-400" />
            <span>{localViews} просмотров</span>
          </div>
        </div>

        <p className="text-gray-300 leading-relaxed text-sm md:text-base">{episode.description}</p>

        <div className="flex items-center gap-3 pt-4 border-t border-gray-700 flex-wrap">
          <Button 
            onClick={() => onNavigate('prev')}
            variant="outline"
            className="flex-1 min-w-[140px] bg-transparent border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10"
          >
            <Icon name="ChevronLeft" size={20} className="mr-2" />
            Предыдущий
          </Button>
          <Button 
            onClick={() => onNavigate('next')}
            variant="outline"
            className="flex-1 min-w-[140px] bg-transparent border-green-500/50 text-green-400 hover:bg-green-500/10"
          >
            Следующий
            <Icon name="ChevronRight" size={20} className="ml-2" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default EpisodeVideo;