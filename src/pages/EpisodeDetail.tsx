import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import SEO from '@/components/SEO';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

interface Episode {
  id: number;
  title: string;
  season: number;
  episode: number;
  description: string;
  image: string;
  airDate: string;
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

const EpisodeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [episode, setEpisode] = useState<Episode | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState({
    authorName: '',
    text: '',
    rating: 5
  });

  useEffect(() => {
    fetchEpisodeData();
  }, [id]);

  const fetchEpisodeData = async () => {
    try {
      const response = await fetch(`${API_URL}?id=${id}`);
      const data = await response.json();
      setEpisode(data.episode);
      setComments(data.comments || []);
      setArticles(data.articles || []);
    } catch (error) {
      console.error('Error fetching episode:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'add_comment',
          episodeId: id,
          authorName: newComment.authorName,
          authorAvatar: `https://i.pravatar.cc/150?u=${newComment.authorName}`,
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

  const handleNavigate = (direction: 'prev' | 'next') => {
    const currentId = parseInt(id || '1');
    const newId = direction === 'prev' ? currentId - 1 : currentId + 1;
    if (newId > 0 && newId <= 12) {
      navigate(`/episode/${newId}`);
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
        title={`${episode.title} - S${episode.season}E${episode.episode}`}
        description={episode.description}
        image={episode.image}
        keywords={`Rick and Morty, ${episode.title}, сезон ${episode.season}, эпизод ${episode.episode}, смотреть онлайн`}
        type="article"
      />
      <div className="container mx-auto px-4 pt-24 pb-12">
        <Link to="/">
          <Button variant="ghost" className="text-cyan-400 hover:text-cyan-300 mb-6">
            <Icon name="ArrowLeft" size={20} className="mr-2" />
            На главную
          </Button>
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Card className="bg-gray-800/50 border-cyan-500/30 overflow-hidden">
              <img 
                src={episode.image} 
                alt={episode.title}
                className="w-full h-96 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 bg-gradient-to-r from-cyan-500 to-green-500 text-white text-sm rounded-full">
                    S{episode.season}E{episode.episode}
                  </span>
                  <span className="text-gray-400">{episode.airDate}</span>
                </div>
                <h1 className="text-4xl font-bold text-cyan-400 mb-4">{episode.title}</h1>
                <p className="text-gray-300 text-lg leading-relaxed">{episode.description}</p>
              </div>
            </Card>

            <div className="flex justify-between gap-4">
              <Button
                onClick={() => handleNavigate('prev')}
                disabled={parseInt(id || '1') <= 1}
                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:opacity-50"
              >
                <Icon name="ChevronLeft" size={20} className="mr-2" />
                Предыдущий эпизод
              </Button>
              <Button
                onClick={() => handleNavigate('next')}
                disabled={parseInt(id || '1') >= 12}
                className="flex-1 bg-gradient-to-r from-cyan-600 to-green-600 hover:from-cyan-700 hover:to-green-700 disabled:opacity-50"
              >
                Следующий эпизод
                <Icon name="ChevronRight" size={20} className="ml-2" />
              </Button>
            </div>

            {articles.map((article) => (
              <Card key={article.id} className="bg-gray-800/50 border-green-500/30 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Icon name="Lightbulb" size={24} className="text-yellow-400" />
                  <h2 className="text-2xl font-bold text-green-400">{article.title}</h2>
                </div>
                <div className="text-gray-300 leading-relaxed whitespace-pre-line">
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
                        src={comment.authorAvatar} 
                        alt={comment.authorName}
                        className="w-12 h-12 rounded-full"
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
            <Card className="bg-gray-800/50 border-purple-500/30 p-6 sticky top-6">
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
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default EpisodeDetail;