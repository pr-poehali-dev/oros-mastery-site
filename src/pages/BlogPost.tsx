import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { useEffect, useState } from 'react';
import Comments from '@/components/Comments';
import { blogPosts } from '@/data/blogData';
import SEO from '@/components/SEO';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  const article = blogPosts.find(p => p.id === Number(id)) || blogPosts[0];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.excerpt,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Ссылка скопирована в буфер обмена!');
    }
  };

  const handleLike = () => {
    setLiked(!liked);
  };

  const handleBookmark = () => {
    setBookmarked(!bookmarked);
    if (!bookmarked) {
      localStorage.setItem(`bookmark_${article.id}`, 'true');
    } else {
      localStorage.removeItem(`bookmark_${article.id}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      <Navigation />
      <div className="py-20">
      <SEO
        title={article.title}
        description={article.excerpt}
        image={article.image}
        keywords={article.tags.join(', ')}
        type="article"
        author={article.author}
        publishedTime={article.date}
      />
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
                  <Button 
                    onClick={handleLike}
                    className={liked ? "bg-red-500 hover:bg-red-600 text-white" : "bg-cyan-500 hover:bg-cyan-600 text-white"}
                  >
                    <Icon name="Heart" size={18} className={liked ? "mr-2 fill-current" : "mr-2"} />
                    {liked ? 'Нравится' : 'Поставить лайк'}
                  </Button>
                </div>
                <div className="flex gap-3">
                  <Button 
                    variant="outline" 
                    className="border-gray-600 text-gray-300 hover:bg-gray-700"
                    onClick={handleShare}
                  >
                    <Icon name="Share2" size={18} className="mr-2" />
                    Поделиться
                  </Button>
                  <Button 
                    variant="outline" 
                    className={bookmarked ? "border-cyan-500 text-cyan-400 hover:bg-cyan-500/10" : "border-gray-600 text-gray-300 hover:bg-gray-700"}
                    onClick={handleBookmark}
                  >
                    <Icon name="Bookmark" size={18} className={bookmarked ? "fill-current" : ""} />
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

      <Footer />
    </div>
  );
};

export default BlogPost;