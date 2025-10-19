import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';

const COMMENTS_API = 'https://functions.poehali.dev/df43a856-d894-4d69-8696-a9283d3315fe';

interface Comment {
  id: number;
  author_name: string;
  comment_text: string;
  created_at: string;
}

interface CommentsProps {
  articleId: number;
}

const Comments = ({ articleId }: CommentsProps) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [authorName, setAuthorName] = useState('');
  const [commentText, setCommentText] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Загрузка комментариев
  const loadComments = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${COMMENTS_API}?article_id=${articleId}`);
      const data = await response.json();
      
      if (response.ok) {
        setComments(data.comments || []);
      }
    } catch (err) {
      console.error('Error loading comments:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadComments();
  }, [articleId]);

  // Отправка комментария
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!authorName.trim() || !commentText.trim()) {
      setError('Пожалуйста, заполните все поля');
      return;
    }

    try {
      setSubmitting(true);
      const response = await fetch(COMMENTS_API, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          article_id: articleId,
          author_name: authorName.trim(),
          comment_text: commentText.trim(),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        setAuthorName('');
        setCommentText('');
        // Перезагружаем комментарии
        await loadComments();
        
        // Убираем сообщение об успехе через 3 секунды
        setTimeout(() => setSuccess(false), 3000);
      } else {
        setError(data.error || 'Ошибка при отправке комментария');
      }
    } catch (err) {
      setError('Ошибка соединения с сервером');
      console.error('Error submitting comment:', err);
    } finally {
      setSubmitting(false);
    }
  };

  // Форматирование даты
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'только что';
    if (diffMins < 60) return `${diffMins} мин назад`;
    if (diffHours < 24) return `${diffHours} ч назад`;
    if (diffDays < 7) return `${diffDays} дн назад`;
    
    return date.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className="mt-16">
      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader>
          <CardTitle className="text-2xl text-white flex items-center gap-2">
            <Icon name="MessageSquare" size={24} className="text-cyan-400" />
            Комментарии ({comments.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Форма добавления комментария */}
          <form onSubmit={handleSubmit} className="mb-8 p-6 bg-gray-900/50 rounded-lg border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-4">Оставить комментарий</h3>
            
            <div className="space-y-4">
              <div>
                <Input
                  type="text"
                  placeholder="Ваше имя"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400"
                  maxLength={100}
                  disabled={submitting}
                />
              </div>
              
              <div>
                <Textarea
                  placeholder="Напишите ваш комментарий..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400 min-h-[120px]"
                  maxLength={2000}
                  disabled={submitting}
                />
                <div className="text-xs text-gray-400 mt-1 text-right">
                  {commentText.length}/2000
                </div>
              </div>

              {error && (
                <div className="p-3 bg-red-500/10 border border-red-500/50 rounded text-red-400 text-sm">
                  {error}
                </div>
              )}

              {success && (
                <div className="p-3 bg-green-500/10 border border-green-500/50 rounded text-green-400 text-sm">
                  Комментарий успешно добавлен! ✓
                </div>
              )}

              <Button
                type="submit"
                disabled={submitting}
                className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-semibold"
              >
                {submitting ? (
                  <>
                    <Icon name="Loader2" className="mr-2 animate-spin" size={18} />
                    Отправка...
                  </>
                ) : (
                  <>
                    <Icon name="Send" className="mr-2" size={18} />
                    Отправить комментарий
                  </>
                )}
              </Button>
            </div>
          </form>

          {/* Список комментариев */}
          <div className="space-y-4">
            {loading ? (
              <div className="text-center py-8 text-gray-400">
                <Icon name="Loader2" className="mx-auto animate-spin mb-2" size={32} />
                <p>Загрузка комментариев...</p>
              </div>
            ) : comments.length === 0 ? (
              <div className="text-center py-8 text-gray-400">
                <Icon name="MessageSquare" className="mx-auto mb-2" size={48} />
                <p>Пока нет комментариев. Будьте первым!</p>
              </div>
            ) : (
              comments.map((comment) => (
                <div
                  key={comment.id}
                  className="p-4 bg-gray-900/30 rounded-lg border border-gray-700/50 hover:border-gray-600 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
                      <Icon name="User" size={20} className="text-cyan-400" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-baseline gap-2 mb-2">
                        <span className="font-semibold text-white">
                          {comment.author_name}
                        </span>
                        <span className="text-xs text-gray-400">
                          {formatDate(comment.created_at)}
                        </span>
                      </div>
                      <p className="text-gray-100 leading-relaxed whitespace-pre-wrap">
                        {comment.comment_text}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Comments;
