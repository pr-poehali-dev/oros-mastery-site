import { useState, useEffect, lazy, Suspense } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import SEO from '@/components/SEO';
import Navigation from '@/components/Navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import Footer from '@/components/Footer';
import { generateSlug } from '@/utils/slugify';
import { useWatchedEpisodes } from '@/hooks/useWatchedEpisodes';
import { useSwipeGesture } from '@/hooks/useSwipeGesture';

const EpisodeVideo = lazy(() => import('@/components/episode/EpisodeVideo'));
const EpisodeArticles = lazy(() => import('@/components/episode/EpisodeArticles'));
const EpisodeComments = lazy(() => import('@/components/episode/EpisodeComments'));
const EpisodeSidebar = lazy(() => import('@/components/episode/EpisodeSidebar'));
const RelatedEpisodes = lazy(() => import('@/components/episode/RelatedEpisodes'));

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

interface Comment {
  id: number;
  authorName: string;
  authorAvatar: string;
  text: string;
  rating: number;
  createdAt: string;
}

interface Article {
  id: number;
  title: string;
  content: string;
  createdAt: string;
}

const API_URL = 'https://functions.poehali.dev/ac29f682-6173-43c7-a16b-3ffb94e0f51a';

const generateAvatar = (name: string): string => {
  const seed = encodeURIComponent(name);
  return `https://api.dicebear.com/7.x/fun-emoji/svg?seed=${seed}&backgroundColor=06b6d4,10b981,8b5cf6,ec4899&radius=50`;
};

const EpisodeDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [episode, setEpisode] = useState<Episode | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [allEpisodes, setAllEpisodes] = useState<Episode[]>([]);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [localLikes, setLocalLikes] = useState(0);
  const [localViews, setLocalViews] = useState(0);
  const { markAsWatched } = useWatchedEpisodes();

  useSwipeGesture({
    onSwipeLeft: () => handleNavigate('next'),
    onSwipeRight: () => handleNavigate('prev'),
    threshold: 100
  });

  useEffect(() => {
    fetchEpisodeData();
  }, [slug]);

  const fetchEpisodeData = async () => {
    try {
      const episodesResponse = await fetch('https://functions.poehali.dev/031f0f01-3e0b-440b-a295-08f07c4d1389');
      const episodesData = await episodesResponse.json();
      setAllEpisodes(episodesData);
      
      const foundEpisode = episodesData.find((ep: Episode) => 
        generateSlug(ep.id, ep.title) === slug
      );
      
      if (!foundEpisode) {
        setLoading(false);
        return;
      }
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);
      
      try {
        const response = await fetch(`${API_URL}?id=${foundEpisode.id}`, {
          signal: controller.signal
        });
        clearTimeout(timeoutId);
        const data = await response.json();
        setEpisode(data.episode);
        setLocalLikes(data.episode?.likes || 0);
        setLocalViews(data.episode?.views || 0);
        setComments(data.comments || []);
        setArticles((data.articles || []).slice(0, 2));
      } catch (error) {
        clearTimeout(timeoutId);
        if ((error as Error).name === 'AbortError') {
          console.log('Request timeout - using basic data');
          setEpisode(foundEpisode as Episode);
        } else {
          throw error;
        }
      }
      
      markAsWatched({
        id: foundEpisode.id.toString(),
        slug: generateSlug(foundEpisode.id, foundEpisode.title),
        title: foundEpisode.title,
        season: foundEpisode.season,
        episode: foundEpisode.episode,
        image: foundEpisode.image
      });
      
      await fetch(`${API_URL}?id=${foundEpisode.id}&action=increment_views`, {
        method: 'POST'
      });
    } catch (error) {
      console.error('Error fetching episode:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async () => {
    if (liked || !episode) return;
    
    try {
      await fetch(`${API_URL}?id=${episode.id}&action=increment_likes`, {
        method: 'POST'
      });
      setLiked(true);
      setLocalLikes(prev => prev + 1);
    } catch (error) {
      console.error('Error liking episode:', error);
    }
  };

  const handleSubmitComment = async (commentData: { authorName: string; text: string; rating: number }) => {
    if (!episode) return;
    
    try {
      await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'add_comment',
          episodeId: episode.id,
          authorName: commentData.authorName,
          authorAvatar: generateAvatar(commentData.authorName),
          text: commentData.text,
          rating: commentData.rating
        })
      });
      fetchEpisodeData();
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const handleNavigate = async (direction: 'prev' | 'next') => {
    if (!episode) return;
    
    try {
      const response = await fetch(`${API_URL}?id=${episode.id}&action=get_navigation&current_id=${episode.id}&direction=${direction}`);
      const data = await response.json();
      if (data.episode) {
        navigate(`/episode/${generateSlug(data.episode.id, data.episode.title)}`);
        window.scrollTo(0, 0);
      }
    } catch (error) {
      console.error('Navigation error:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center">
        <div className="text-cyan-400 text-2xl">Загрузка...</div>
      </div>
    );
  }

  if (!episode) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center">
        <div className="text-red-400 text-2xl">Эпизод не найден</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      <Navigation />
      <SEO
        title={`Смотреть ${episode.episode} эпизод Рика и Морти в хорошем качестве`}
        description={episode.description}
        image={episode.image}
        keywords={`Рик и Морти, ${episode.title}, сезон ${episode.season}, эпизод ${episode.episode}, смотреть онлайн`}
        ogType="article"
        episodeNumber={episode.episode}
        seasonNumber={episode.season}
      />
      <div className="pt-20">
        <Breadcrumbs customLabel={episode.title} />
      </div>
      <div className="container mx-auto px-4 pt-12 pb-12">
        <Link to="/">
          <Button variant="ghost" className="text-cyan-400 hover:text-cyan-300 mb-6">
            <Icon name="ArrowLeft" size={20} className="mr-2" />
            На главную
          </Button>
        </Link>

        <Suspense fallback={
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <div className="h-96 bg-gray-800/50 rounded-lg animate-pulse"></div>
              <div className="h-64 bg-gray-800/50 rounded-lg animate-pulse"></div>
              <div className="h-96 bg-gray-800/50 rounded-lg animate-pulse"></div>
            </div>
            <div className="space-y-6">
              <div className="h-48 bg-gray-800/50 rounded-lg animate-pulse"></div>
              <div className="h-96 bg-gray-800/50 rounded-lg animate-pulse"></div>
            </div>
          </div>
        }>
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <EpisodeVideo
                episode={episode}
                localLikes={localLikes}
                localViews={localViews}
                liked={liked}
                onLike={handleLike}
                onNavigate={handleNavigate}
              />

              <EpisodeArticles
                articles={articles}
                funFacts={episode.funFacts}
              />

              <EpisodeComments
                comments={comments}
                onSubmit={handleSubmitComment}
                generateAvatar={generateAvatar}
              />
            </div>

            <div className="space-y-6">
              <EpisodeSidebar
                episode={episode}
                allEpisodes={allEpisodes}
                generateSlug={generateSlug}
              />
            </div>
          </div>

          <RelatedEpisodes
            currentEpisode={episode}
            allEpisodes={allEpisodes}
            generateSlug={generateSlug}
          />
        </Suspense>
      </div>

      <Footer />
    </div>
  );
};

export default EpisodeDetail;