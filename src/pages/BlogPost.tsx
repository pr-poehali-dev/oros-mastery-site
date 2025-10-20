import { useParams, useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { useEffect, useState } from 'react';
import Comments from '@/components/Comments';
import SEO from '@/components/SEO';
import Navigation from '@/components/Navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import Footer from '@/components/Footer';
import ShareButtons from '@/components/ShareButtons';
import { generateSlug } from '@/utils/slugify';

const BLOG_API = 'https://functions.poehali.dev/833cc9a4-513a-4d22-a390-4878941c0d71';
const CONTENT_API = 'https://functions.poehali.dev/a3182691-86a7-4e0e-8e97-a0951d94bfb4';

const BlogPost = () => {
  const { slug } = useParams();
  const id = slug ? parseInt(slug.split('-')[0]) : 1;
  const navigate = useNavigate();
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [article, setArticle] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchArticle();
  }, [id]);

  const fetchArticle = async () => {
    try {
      const [blogResponse, articlesResponse] = await Promise.all([
        fetch(BLOG_API),
        fetch(`${CONTENT_API}?type=articles`)
      ]);
      
      const blogData = await blogResponse.json();
      const articlesData = await articlesResponse.json();
      
      const validBlogData = Array.isArray(blogData) ? blogData : [];
      const validArticlesData = Array.isArray(articlesData) ? articlesData : [];
      
      const combinedPosts = [...validBlogData, ...validArticlesData];
      const foundArticle = combinedPosts.find(p => p.id === Number(id));
      
      if (foundArticle) {
        setArticle(foundArticle);
      }
    } catch (error) {
      console.error('Error fetching article:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleShare = () => {
    if (!article) return;
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
    if (!article) return;
    setBookmarked(!bookmarked);
    if (!bookmarked) {
      localStorage.setItem(`bookmark_${article.id}`, 'true');
    } else {
      localStorage.removeItem(`bookmark_${article.id}`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Загрузка...</div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
        <Navigation />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Статья не найдена</h1>
          <Button onClick={() => navigate('/blog')} className="bg-cyan-400 text-gray-900">
            Вернуться к блогу
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      <Navigation />
      <Breadcrumbs />
      <SEO
        title={article.title}
        description={article.excerpt}
        image={article.image}
        keywords={`Rick and Morty, ${(article.tags || []).join(', ')}, блог, статьи, теории`}
        ogType="article"
        author={article.author}
        publishedTime={article.date}
      />
      <div className="container mx-auto px-4 max-w-4xl pt-24 pb-12">
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
                {(article.tags || []).map((tag, idx) => (
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
                {article.views !== undefined && (
                  <div className="flex items-center gap-2">
                    <Icon name="Eye" size={18} />
                    <span>{article.views.toLocaleString()} просмотров</span>
                  </div>
                )}
                {article.likes !== undefined && (
                  <div className="flex items-center gap-2">
                    <Icon name="Heart" size={18} />
                    <span>{article.likes} лайков</span>
                  </div>
                )}
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
              <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-300 text-sm mb-2">Понравилась статья?</p>
                    <Button 
                      onClick={handleLike}
                      className={liked ? "bg-red-500 hover:bg-red-600 text-white" : "bg-cyan-500 hover:bg-cyan-600 text-white"}
                    >
                      <Icon name="Heart" size={18} className={liked ? "mr-2 fill-current" : "mr-2"} />
                      {liked ? 'Нравится' : 'Поставить лайк'}
                    </Button>
                  </div>
                  <Button 
                    variant="outline" 
                    className={bookmarked ? "border-cyan-500 text-cyan-400 hover:bg-cyan-500/10" : "border-gray-600 text-gray-300 hover:bg-gray-700"}
                    onClick={handleBookmark}
                  >
                    <Icon name="Bookmark" size={18} className={bookmarked ? "fill-current" : ""} />
                  </Button>
                </div>
                
                <ShareButtons 
                  title={article.title} 
                  excerpt={article.excerpt}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8">
          <Comments comments={article.comments} />
        </div>

        <div className="mt-6 text-center">
          <Link to="/blog">
            <Button className="bg-cyan-500 hover:bg-cyan-600 text-white">
              <Icon name="ArrowLeft" size={18} className="mr-2" />
              Все статьи блога
            </Button>
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BlogPost;