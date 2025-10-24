import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import Navigation from '@/components/Navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import CommentSection from '@/components/CommentSection';

const CONTENT_API = 'https://functions.poehali.dev/a3182691-86a7-4e0e-8e97-a0951d94bfb4';

const TheoryDetail = () => {
  const { slug } = useParams();
  const id = slug ? parseInt(slug.split('-')[0]) : 1;

  const [theory, setTheory] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    fetchTheory();
    const bookmarks = JSON.parse(localStorage.getItem('theoryBookmarks') || '[]');
    setIsBookmarked(bookmarks.includes(Number(id)));
  }, [id]);

  const fetchTheory = async () => {
    try {
      const response = await fetch(`${CONTENT_API}?type=theories&id=${id}`);
      const data = await response.json();
      setTheory(data);
    } catch (error) {
      console.error('Error fetching theory:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: theory.title,
          text: theory.description,
          url: window.location.href
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Ссылка скопирована!');
    }
  };

  const handleBookmark = () => {
    const bookmarks = JSON.parse(localStorage.getItem('theoryBookmarks') || '[]');
    if (isBookmarked) {
      const updated = bookmarks.filter((bId: number) => bId !== Number(id));
      localStorage.setItem('theoryBookmarks', JSON.stringify(updated));
      setIsBookmarked(false);
      alert('Удалено из закладок');
    } else {
      bookmarks.push(Number(id));
      localStorage.setItem('theoryBookmarks', JSON.stringify(bookmarks));
      setIsBookmarked(true);
      alert('Добавлено в закладки!');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
        <Navigation />
        <div className="container mx-auto px-4 py-32 text-center">
          <p className="text-white text-xl">Загрузка...</p>
        </div>
      </div>
    );
  }

  if (!theory) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
        <Navigation />
        <div className="container mx-auto px-4 py-32 text-center">
          <p className="text-white text-xl">Теория не найдена</p>
          <Link to="/theories">
            <Button className="mt-4">Вернуться к списку</Button>
          </Link>
        </div>
      </div>
    );
  }

  const evidenceArray = theory.evidence ? theory.evidence.split(',').map((e: string) => e.trim()) : [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 [&_h2]:text-white [&_h4]:text-white">
      <Navigation />
      <Breadcrumbs />
      <SEO
        title={`${theory.title} | Rick and Morty`}
        description={theory.description?.substring(0, 160)}
        keywords={`Rick and Morty, ${theory.title}, теория, фан-теория`}
        ogType="article"
      />

      <section className="relative pt-32 pb-16 bg-gradient-to-br from-purple-600 via-indigo-500 to-pink-600 overflow-hidden">
        {theory.image && (
          <img 
            src={theory.image} 
            alt={theory.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="container mx-auto px-4 relative z-10">
          <Link to="/theories">
            <Button variant="ghost" className="text-white hover:bg-white/20 mb-6">
              <Icon name="ArrowLeft" size={20} className="mr-2" />
              Все теории
            </Button>
          </Link>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {theory.status && (
                <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30 mb-4 border px-4 py-1">
                  {theory.status}
                </Badge>
              )}
              <h1 className="text-4xl md:text-5xl font-bold text-gray-100 mb-4 leading-tight">
                {theory.title}
              </h1>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-2xl text-white flex items-center gap-2">
                  <Icon name="FileText" size={24} className="text-cyan-400" />
                  Описание теории
                </CardTitle>
              </CardHeader>
              <CardContent className="prose prose-invert max-w-none">
                <div className="text-gray-300 whitespace-pre-wrap">
                  {theory.description}
                </div>
              </CardContent>
            </Card>

            <CommentSection entityType="theory" entityId={theory.id} />
          </div>

          <div className="space-y-6">
            {evidenceArray.length > 0 && (
              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-xl text-white flex items-center gap-2">
                    <Icon name="CheckCircle2" size={20} className="text-green-400" />
                    Доказательства
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {evidenceArray.map((evidence: string, index: number) => (
                      <li key={index} className="flex items-start gap-2 text-gray-300">
                        <Icon name="ChevronRight" size={16} className="text-green-400 mt-1 shrink-0" />
                        <span>{evidence}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-xl text-white flex items-center gap-2">
                  <Icon name="Share2" size={20} className="text-cyan-400" />
                  Действия
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button 
                  variant="outline" 
                  className="w-full border-gray-600 hover:bg-gray-700"
                  onClick={handleShare}
                >
                  <Icon name="Share2" size={16} className="mr-2" />
                  Поделиться
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full border-gray-600 hover:bg-gray-700"
                  onClick={handleBookmark}
                >
                  <Icon name={isBookmarked ? "BookmarkCheck" : "Bookmark"} size={16} className="mr-2" />
                  {isBookmarked ? 'В закладках' : 'В закладки'}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default TheoryDetail;