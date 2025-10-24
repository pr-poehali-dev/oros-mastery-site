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
import ReactMarkdown from 'react-markdown';
import { generateSlug } from '@/utils/slugify';

const CONTENT_API = 'https://functions.poehali.dev/a3182691-86a7-4e0e-8e97-a0951d94bfb4';

const UniverseDetail = () => {
  const { slug } = useParams();
  const id = slug ? parseInt(slug.split('-')[0]) : 1;

  const [universe, setUniverse] = useState<any>(null);
  const [relatedCharacters, setRelatedCharacters] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUniverse();
  }, [id]);

  const fetchUniverse = async () => {
    try {
      const response = await fetch(`${CONTENT_API}?type=universes&id=${id}`);
      const data = await response.json();
      setUniverse(data);
      
      if (data.related_characters) {
        const charIds = data.related_characters.split(',').map((id: string) => id.trim());
        const charPromises = charIds.map((charId: string) => 
          fetch(`${CONTENT_API}?type=characters&id=${charId}`).then(r => r.json())
        );
        const chars = await Promise.all(charPromises);
        setRelatedCharacters(chars.filter(c => c && c.id));
      }
    } catch (error) {
      console.error('Error fetching universe:', error);
    } finally {
      setLoading(false);
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

  if (!universe) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
        <Navigation />
        <div className="container mx-auto px-4 py-32 text-center">
          <p className="text-white text-xl">Вселенная не найдена</p>
          <Link to="/universes">
            <Button className="mt-4">Вернуться к списку</Button>
          </Link>
        </div>
      </div>
    );
  }

  const featuresArray = universe.features ? universe.features.split(',').map((f: string) => f.trim()) : [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 [&_h2]:text-white [&_h4]:text-white">
      <Navigation />
      <SEO
        title={`${universe.name} | Рик и Морти`}
        description={universe.description?.substring(0, 160)}
        image={universe.image}
        keywords={`Рик и Морти, ${universe.name}, вселенная, измерение, мультивселенная`}
        ogType="article"
      />
      <div className="pt-20">
        <Breadcrumbs customLabel={universe.name} />
      </div>

      <div className="relative h-96 overflow-hidden">
        <img 
          src={universe.image} 
          alt={universe.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent"></div>
        
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container mx-auto">
            <Link to="/universes">
              <Button variant="ghost" className="text-white hover:text-cyan-300 mb-4">
                <Icon name="ArrowLeft" size={20} className="mr-2" />
                Все вселенные
              </Button>
            </Link>
            
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
              {universe.name}
            </h1>
            
            <div className="flex gap-3 flex-wrap">
              {universe.status && (
                <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30">
                  {universe.status}
                </Badge>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-2xl text-white flex items-center gap-2">
                  <Icon name="BookOpen" size={24} className="text-cyan-400" />
                  Описание
                </CardTitle>
              </CardHeader>
              <CardContent className="prose prose-invert max-w-none">
                <div 
                  className="text-gray-300 [&_h2]:text-white [&_h3]:text-white [&_h4]:text-white [&_strong]:text-white [&_ul]:list-disc [&_ul]:ml-6 [&_ol]:list-decimal [&_ol]:ml-6 [&_li]:mb-2"
                  dangerouslySetInnerHTML={{ __html: universe.description }}
                />
              </CardContent>
            </Card>

            <CommentSection entityType="universe" entityId={universe.id} />
          </div>

          <div className="space-y-6">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-xl text-white flex items-center gap-2">
                  <Icon name="Info" size={20} className="text-cyan-400" />
                  Информация
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {universe.coordinates && (
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Координаты</p>
                    <p className="text-white font-semibold">{universe.coordinates}</p>
                  </div>
                )}
                {universe.status && (
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Статус</p>
                    <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30">
                      {universe.status}
                    </Badge>
                  </div>
                )}
                {universe.danger_level && (
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Уровень опасности</p>
                    <Badge className="bg-red-500/20 text-red-300 border-red-500/30">
                      {universe.danger_level}
                    </Badge>
                  </div>
                )}
                {universe.discovery_date && (
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Дата открытия</p>
                    <p className="text-white font-semibold">{universe.discovery_date}</p>
                  </div>
                )}
                {universe.population && (
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Население</p>
                    <p className="text-white font-semibold">{universe.population}</p>
                  </div>
                )}
                {universe.technology && (
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Технологический уровень</p>
                    <p className="text-white font-semibold">{universe.technology}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {relatedCharacters.length > 0 && (
              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-xl text-white flex items-center gap-2">
                    <Icon name="Users" size={20} className="text-cyan-400" />
                    Связанные персонажи
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {relatedCharacters.map((char) => (
                      <Link 
                        key={char.id} 
                        to={`/character/${generateSlug(char.id, char.name)}`}
                        className="flex items-center gap-3 p-3 bg-gray-900/50 rounded-lg hover:bg-gray-900 transition-colors group"
                      >
                        {char.avatar_image && (
                          <img 
                            src={char.avatar_image} 
                            alt={char.name}
                            className="w-12 h-12 rounded-full object-cover border-2 border-gray-700 group-hover:border-cyan-500 transition-colors"
                          />
                        )}
                        <div className="flex-1">
                          <p className="text-white font-semibold group-hover:text-cyan-400 transition-colors">
                            {char.name}
                          </p>
                          {char.role && (
                            <p className="text-sm text-gray-400">{char.role}</p>
                          )}
                        </div>
                        <Icon name="ChevronRight" size={16} className="text-gray-400 group-hover:text-cyan-400 transition-colors" />
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {featuresArray.length > 0 && (
              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-xl text-white flex items-center gap-2">
                    <Icon name="Sparkles" size={20} className="text-cyan-400" />
                    Особенности
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {featuresArray.map((feature: string, index: number) => (
                      <li key={index} className="flex items-start gap-2 text-gray-300">
                        <Icon name="ChevronRight" size={16} className="text-cyan-400 mt-1 shrink-0" />
                        <span>{feature}</span>
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
                  Поделиться
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="flex-1 border-gray-600 hover:bg-gray-700"
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.href);
                      alert('Ссылка скопирована!');
                    }}
                  >
                    <Icon name="Link" size={16} className="mr-2" />
                    Копировать
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default UniverseDetail;