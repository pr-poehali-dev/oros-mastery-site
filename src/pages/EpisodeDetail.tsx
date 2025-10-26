import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import SEO from '@/components/SEO';
import Navigation from '@/components/Navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import Footer from '@/components/Footer';
import { generateSlug, extractEpisodeInfo } from '@/utils/slugify';
import { useWatchedEpisodes } from '@/hooks/useWatchedEpisodes';
import { useSwipeGesture } from '@/hooks/useSwipeGesture';

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

// Generate Rick and Morty style avatar based on name
const generateAvatar = (name: string): string => {
  // Use DiceBear API with fun-emoji style for Rick and Morty vibes
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
  const [newComment, setNewComment] = useState({
    authorName: '',
    text: '',
    rating: 5
  });
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
      // Fetch all episodes to find by slug
      const episodesResponse = await fetch('https://functions.poehali.dev/031f0f01-3e0b-440b-a295-08f07c4d1389');
      const episodesData = await episodesResponse.json();
      setAllEpisodes(episodesData);
      
      // Find episode by matching slug
      const foundEpisode = episodesData.find((ep: Episode) => 
        generateSlug(ep.id, ep.title) === slug
      );
      
      if (!foundEpisode) {
        setLoading(false);
        return;
      }
      
      // Fetch detailed episode data with timeout
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
      
      // Mark as watched
      markAsWatched({
        id: foundEpisode.id.toString(),
        slug: generateSlug(foundEpisode.id, foundEpisode.title),
        title: foundEpisode.title,
        season: foundEpisode.season,
        episode: foundEpisode.episode,
        image: foundEpisode.image
      });
      
      // Increment views
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

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!episode) return;
    
    try {
      await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'add_comment',
          episodeId: episode.id,
          authorName: newComment.authorName,
          authorAvatar: generateAvatar(newComment.authorName),
          text: newComment.text,
          rating: newComment.rating
        })
      });
      setNewComment({ authorName: '', text: '', rating: 5 });
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

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Card className="bg-gray-800/50 border-cyan-500/30 overflow-hidden">
              {episode.videoIframe ? (
                <div 
                  className="w-full aspect-video md:h-[600px] [&_iframe]:w-full [&_iframe]:h-full [&_iframe]:border-0"
                  dangerouslySetInnerHTML={{ __html: episode.videoIframe }}
                />
              ) : (
                <img 
                  src={episode.image} 
                  alt={episode.title}
                  className="w-full h-96 object-cover"
                />
              )}
              <div className="p-6 space-y-4">
                <h1 className="text-2xl md:text-4xl font-bold text-cyan-400">{episode.title}</h1>
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="px-3 py-1 bg-gradient-to-r from-cyan-500 to-green-500 text-white text-sm rounded-full">
                    Сезон {episode.season}, Эпизод {episode.episode}
                  </span>
                  <span className="text-gray-300 text-sm md:text-base">{episode.airDate}</span>
                  <div className="flex items-center gap-4 w-full md:w-auto md:ml-auto">
                    <span className="flex items-center gap-1 text-gray-300">
                      <Icon name="Eye" size={18} className="text-blue-400" />
                      {localViews}
                    </span>
                    <button
                      onClick={handleLike}
                      disabled={liked}
                      className={`flex items-center gap-1 transition-colors ${
                        liked ? 'text-pink-500' : 'text-gray-300 hover:text-pink-400'
                      } disabled:cursor-not-allowed`}
                    >
                      <Icon name={liked ? "Heart" : "Heart"} size={18} className={liked ? "fill-pink-500" : ""} />
                      {localLikes}
                    </button>
                  </div>
                </div>
                <p className="text-gray-300 text-lg leading-relaxed">{episode.description}</p>
              </div>
            </Card>

            <div className="flex flex-col md:flex-row justify-between gap-4">
              <Button
                onClick={() => handleNavigate('prev')}
                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:opacity-50"
              >
                <Icon name="ChevronLeft" size={20} className="mr-2" />
                <span className="hidden md:inline">Предыдущий эпизод</span>
                <span className="md:hidden">Предыдущий</span>
              </Button>
              <Button
                onClick={() => handleNavigate('next')}
                className="flex-1 bg-gradient-to-r from-cyan-600 to-green-600 hover:from-cyan-700 hover:to-green-700 disabled:opacity-50"
              >
                <span className="hidden md:inline">Следующий эпизод</span>
                <span className="md:hidden">Следующий</span>
                <Icon name="ChevronRight" size={20} className="ml-2" />
              </Button>
            </div>

            {episode.funFacts && (
              <Card className="bg-gray-800/50 border-yellow-500/30 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Icon name="Sparkles" size={24} className="text-yellow-400" />
                  <h2 className="text-2xl font-bold text-yellow-400">Интересные факты</h2>
                </div>
                <div className="text-gray-300 leading-relaxed whitespace-pre-line">
                  {episode.funFacts}
                </div>
              </Card>
            )}

            {articles.length > 0 && articles.slice(0, 2).map((article) => (
              <Card key={article.id} className="bg-gray-800/50 border-green-500/30 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Icon name="Lightbulb" size={24} className="text-green-400" />
                  <h2 className="text-xl md:text-2xl font-bold text-green-400 break-words">{article.title}</h2>
                </div>
                <div className="text-gray-300 leading-relaxed whitespace-pre-line break-words text-sm md:text-base">
                  {article.content}
                </div>
              </Card>
            ))}

            <Card className="bg-gray-800/50 border-cyan-500/30 p-6">
              <h2 className="text-2xl font-bold text-cyan-400 mb-6 flex items-center gap-2">
                <Icon name="MessageCircle" size={28} />
                Комментарии ({comments.length})
              </h2>

              <form onSubmit={handleSubmitComment} className="mb-8 space-y-4">
                <div>
                  <input
                    type="text"
                    placeholder="Ваше имя"
                    value={newComment.authorName}
                    onChange={(e) => setNewComment({ ...newComment, authorName: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-700/50 border border-cyan-500/30 rounded-lg text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <textarea
                    placeholder="Ваш комментарий"
                    value={newComment.text}
                    onChange={(e) => setNewComment({ ...newComment, text: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-700/50 border border-cyan-500/30 rounded-lg text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none h-24 resize-none"
                    required
                  />
                </div>
                <div className="flex items-center gap-4">
                  <label className="text-gray-300">Оценка:</label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setNewComment({ ...newComment, rating: star })}
                        className="text-2xl focus:outline-none"
                      >
                        {star <= newComment.rating ? '⭐' : '☆'}
                      </button>
                    ))}
                  </div>
                </div>
                <Button 
                  type="submit"
                  className="bg-gradient-to-r from-cyan-500 to-green-500 hover:from-cyan-600 hover:to-green-600"
                >
                  Отправить комментарий
                </Button>
              </form>

              <div className="space-y-4">
                {comments.map((comment) => (
                  <div key={comment.id} className="bg-gray-700/30 p-4 rounded-lg border border-gray-600/30">
                    <div className="flex items-start gap-3">
                      <img 
                        src={comment.authorAvatar || generateAvatar(comment.authorName)} 
                        alt={comment.authorName}
                        className="w-12 h-12 rounded-full bg-gray-800"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-semibold text-cyan-300">{comment.authorName}</span>
                          <div className="flex">
                            {Array.from({ length: comment.rating }).map((_, i) => (
                              <span key={i} className="text-yellow-400">⭐</span>
                            ))}
                          </div>
                        </div>
                        <p className="text-gray-300">{comment.text}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <div className="space-y-6">
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
                <div>
                  <span className="text-gray-400">Комментариев:</span>
                  <span className="ml-2 font-semibold">{comments.length}</span>
                </div>
                <div>
                  <span className="text-gray-400">Статей:</span>
                  <span className="ml-2 font-semibold">{articles.length}</span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-purple-500/30">
                <h4 className="text-lg font-semibold text-purple-300 mb-3">Быстрая навигация</h4>
                <div className="space-y-2">
                  <Link to="/episodes" className="block text-cyan-400 hover:text-cyan-300 text-sm flex items-center gap-2">
                    <Icon name="Film" size={14} />
                    Все эпизоды
                  </Link>
                  <Link to="/blog" className="block text-cyan-400 hover:text-cyan-300 text-sm flex items-center gap-2">
                    <Icon name="BookOpen" size={14} />
                    Читать блог
                  </Link>
                  <Link to="/theories" className="block text-cyan-400 hover:text-cyan-300 text-sm flex items-center gap-2">
                    <Icon name="Lightbulb" size={14} />
                    Теории фанатов
                  </Link>
                </div>
              </div>
            </Card>



            {/* Серии текущего сезона */}
            {episode && allEpisodes.length > 0 && (
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
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default EpisodeDetail;