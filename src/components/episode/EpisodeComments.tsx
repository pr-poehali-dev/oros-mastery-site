import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface Comment {
  id: number;
  authorName: string;
  authorAvatar: string;
  text: string;
  rating: number;
  createdAt: string;
}

interface EpisodeCommentsProps {
  comments: Comment[];
  onSubmit: (comment: { authorName: string; text: string; rating: number }) => void;
  generateAvatar: (name: string) => string;
}

const EpisodeComments = ({ comments, onSubmit, generateAvatar }: EpisodeCommentsProps) => {
  const [newComment, setNewComment] = useState({
    authorName: '',
    text: '',
    rating: 5
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(newComment);
    setNewComment({ authorName: '', text: '', rating: 5 });
  };

  return (
    <Card className="bg-gray-800/50 border-cyan-500/30 p-6">
      <h2 className="text-2xl font-bold text-cyan-400 mb-6 flex items-center gap-2">
        <Icon name="MessageCircle" size={28} />
        Комментарии ({comments.length})
      </h2>

      <form onSubmit={handleSubmit} className="mb-8 space-y-4">
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
  );
};

export default EpisodeComments;
