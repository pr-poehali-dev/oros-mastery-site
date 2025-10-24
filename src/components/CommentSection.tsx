import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface Comment {
  id: number;
  author: string;
  date: string;
  text: string;
  likes: number;
}

interface CommentSectionProps {
  entityType: 'universe' | 'character' | 'theory';
  entityId: number;
}

const CommentSection = ({ entityType, entityId }: CommentSectionProps) => {
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      author: 'Алексей Космонавт',
      date: '15 октября 2024',
      text: 'Отличный анализ! Никогда не думал об этом с такой стороны.',
      likes: 12
    },
    {
      id: 2,
      author: 'Мария Звездная',
      date: '14 октября 2024',
      text: 'Интересная теория, но есть несколько моментов, которые противоречат канону.',
      likes: 8
    }
  ]);

  const [newComment, setNewComment] = useState('');
  const [userName, setUserName] = useState('');
  const [sortBy, setSortBy] = useState<'new' | 'popular'>('new');

  const handleAddComment = () => {
    if (!newComment.trim() || !userName.trim()) return;

    const comment: Comment = {
      id: Date.now(),
      author: userName,
      date: new Date().toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' }),
      text: newComment,
      likes: 0
    };

    setComments([comment, ...comments]);
    setNewComment('');
  };

  const handleLike = (commentId: number) => {
    setComments(comments.map(comment => 
      comment.id === commentId 
        ? { ...comment, likes: comment.likes + 1 }
        : comment
    ));
  };

  const sortedComments = [...comments].sort((a, b) => {
    if (sortBy === 'popular') {
      return b.likes - a.likes;
    }
    return b.id - a.id;
  });

  return (
    <div className="mt-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold">Комментарии ({comments.length})</h2>
        <div className="flex gap-2">
          <Button
            variant={sortBy === 'new' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSortBy('new')}
          >
            <Icon name="Clock" size={16} className="mr-2" />
            Новые
          </Button>
          <Button
            variant={sortBy === 'popular' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSortBy('popular')}
          >
            <Icon name="TrendingUp" size={16} className="mr-2" />
            Популярные
          </Button>
        </div>
      </div>

      <Card className="p-6 mb-8 bg-gray-800 border-gray-700">
        <h3 className="text-xl font-bold mb-4 text-white">Добавить комментарий</h3>
        <input
          type="text"
          placeholder="Ваше имя"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className="w-full p-3 mb-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
        />
        <textarea
          placeholder="Ваш комментарий..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="w-full min-h-[120px] p-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500 resize-none"
        />
        <Button
          onClick={handleAddComment}
          className="mt-3"
          disabled={!newComment.trim() || !userName.trim()}
        >
          <Icon name="Send" size={20} className="mr-2" />
          Отправить
        </Button>
      </Card>

      <div className="space-y-4">
        {sortedComments.map((comment) => (
          <Card key={comment.id} className="p-6 bg-gray-800 border-gray-700 hover:border-gray-600 transition-colors">
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center font-bold">
                    {comment.author.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold">{comment.author}</h4>
                    <p className="text-sm text-gray-300">{comment.date}</p>
                  </div>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleLike(comment.id)}
                className="flex items-center gap-2"
              >
                <Icon name="Heart" size={16} />
                {comment.likes > 0 && <span>{comment.likes}</span>}
              </Button>
            </div>
            <p className="text-gray-300 leading-relaxed">{comment.text}</p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;