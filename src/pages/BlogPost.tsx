import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { useEffect } from 'react';
import Comments from '@/components/Comments';
import { blogPosts } from '@/data/blogData';

const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const article = blogPosts.find(p => p.id === Number(id)) || blogPosts[0];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <Button 
          onClick={() => navigate('/blog')} 
          variant="ghost" 
          className="mb-6 text-cyan-400 hover:text-cyan-300"
        >
          <Icon name="ArrowLeft" size={20} className="mr-2" />
          Назад к блогу
        </Button>

        <Card className="bg-gray-800/50 border-gray-700 overflow-hidden backdrop-blur-sm">
          <div className="relative h-96 overflow-hidden">
            <img 
              src={article.image} 
              alt={article.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent"></div>
            
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <div className="flex flex-wrap gap-2 mb-4">
                {article.tags.map((tag, idx) => (
                  <Badge key={idx} className="bg-cyan-400/20 text-cyan-400 border-cyan-400/50">
                    {tag}
                  </Badge>
                ))}
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                {article.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-6 text-gray-300">
                <div className="flex items-center gap-2">
                  <Icon name="User" size={18} />
                  <span>{article.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Calendar" size={18} />
                  <span>{article.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Clock" size={18} />
                  <span>{article.readTime}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Eye" size={18} />
                  <span>{article.views.toLocaleString()} просмотров</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Heart" size={18} />
                  <span>{article.likes} лайков</span>
                </div>
              </div>
            </div>
          </div>

          <CardContent className="p-8 md:p-12">
            <div className="prose prose-invert max-w-none prose-headings:text-white prose-p:text-white prose-li:text-white prose-strong:text-white">
              {article.content.split('\n').map((line, idx) => {
                const trimmed = line.trim();
                
                if (!trimmed) return null;
                
                if (trimmed.startsWith('## ')) {
                  return <h2 key={idx} className="text-2xl font-bold text-white mt-8 mb-4">{trimmed.replace('## ', '')}</h2>;
                }
                
                if (trimmed.startsWith('### ')) {
                  return <h3 key={idx} className="text-xl font-bold text-white mt-6 mb-3">{trimmed.replace('### ', '')}</h3>;
                }
                
                if (trimmed.startsWith('# ')) {
                  return <h1 key={idx} className="text-3xl font-bold text-white mt-10 mb-5">{trimmed.replace('# ', '')}</h1>;
                }
                
                return <p key={idx} className="text-white mb-4 leading-relaxed">{trimmed}</p>;
              })}
            </div>

            <div className="mt-12 pt-8 border-t border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm mb-2">Понравилась статья?</p>
                  <Button className="bg-cyan-500 hover:bg-cyan-600 text-white">
                    <Icon name="Heart" size={18} className="mr-2" />
                    Поставить лайк
                  </Button>
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700">
                    <Icon name="Share2" size={18} className="mr-2" />
                    Поделиться
                  </Button>
                  <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700">
                    <Icon name="Bookmark" size={18} />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8">
          <Comments comments={article.comments} />
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
