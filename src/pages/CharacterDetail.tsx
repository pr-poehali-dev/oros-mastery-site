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
import { generateSlug } from '@/utils/slugify';

const CONTENT_API = 'https://functions.poehali.dev/a3182691-86a7-4e0e-8e97-a0951d94bfb4';

const CharacterDetail = () => {
  const { slug } = useParams();

  const [character, setCharacter] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCharacter();
  }, [slug]);

  const fetchCharacter = async () => {
    try {
      const response = await fetch(`${CONTENT_API}?type=characters`);
      const data = await response.json();
      const characters = Array.isArray(data) ? data : [];
      
      const foundCharacter = characters.find(c => generateSlug(c.id, c.name) === slug);
      setCharacter(foundCharacter || null);
    } catch (error) {
      console.error('Error fetching character:', error);
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

  if (!character) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
        <Navigation />
        <div className="container mx-auto px-4 py-32 text-center">
          <p className="text-white text-xl">Персонаж не найден</p>
          <Link to="/characters">
            <Button className="mt-4">Вернуться к списку</Button>
          </Link>
        </div>
      </div>
    );
  }

  const abilitiesArray = character.abilities ? character.abilities.split(',').map((a: string) => a.trim()) : [];
  const familyArray = character.family ? character.family.split(',').map((f: string) => f.trim()) : [];
  const episodesArray = character.notable_episodes ? character.notable_episodes.split(',').map((e: string) => e.trim()) : [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 [&_h2]:text-white [&_h4]:text-white">
      <Navigation />
      <SEO
        title={`${character.name} | Рик и Морти`}
        description={character.description?.substring(0, 160)}
        image={character.image}
        keywords={`Рик и Морти, ${character.name}, персонаж`}
        ogType="article"
      />
      <div className="pt-20">
        <Breadcrumbs customLabel={character.name} />
      </div>

      <div className="relative h-96 overflow-hidden">
        <img 
          src={character.background_image || character.image} 
          alt={character.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent"></div>
        
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container mx-auto">
            <Link to="/characters">
              <Button variant="ghost" className="text-white hover:text-cyan-300 mb-4">
                <Icon name="ArrowLeft" size={20} className="mr-2" />
                Все персонажи
              </Button>
            </Link>
            
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
              {character.name}
            </h1>
            
            <div className="flex gap-3 flex-wrap">
              {character.status && (
                <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                  {character.status}
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
                  Биография
                </CardTitle>
              </CardHeader>
              <CardContent className="prose prose-invert max-w-none">
                <div 
                  className="text-gray-300 [&_h2]:text-white [&_h3]:text-white [&_h4]:text-white [&_strong]:text-white [&_ul]:list-disc [&_ul]:ml-6 [&_ol]:list-decimal [&_ol]:ml-6 [&_li]:mb-2"
                  dangerouslySetInnerHTML={{ __html: character.full_bio || character.bio || character.description }}
                />
              </CardContent>
            </Card>

            <CommentSection entityType="character" entityId={character.id} />
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
                {character.species && (
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Вид</p>
                    <p className="text-white font-semibold">{character.species}</p>
                  </div>
                )}
                {character.status && (
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Статус</p>
                    <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                      {character.status}
                    </Badge>
                  </div>
                )}
                {character.origin && (
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Происхождение</p>
                    <p className="text-white font-semibold">{character.origin}</p>
                  </div>
                )}
                {character.occupation && (
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Род деятельности</p>
                    <p className="text-white font-semibold">{character.occupation}</p>
                  </div>
                )}
                {character.affiliation && (
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Принадлежность</p>
                    <p className="text-white font-semibold">{character.affiliation}</p>
                  </div>
                )}
                {character.first_appearance && (
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Первое появление</p>
                    <p className="text-white font-semibold">{character.first_appearance}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {familyArray.length > 0 && (
              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-xl text-white flex items-center gap-2">
                    <Icon name="Users" size={20} className="text-cyan-400" />
                    Семья
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {familyArray.map((member: string, index: number) => (
                      <li key={index} className="flex items-start gap-2 text-gray-300">
                        <Icon name="ChevronRight" size={16} className="text-cyan-400 mt-1 shrink-0" />
                        <span>{member}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {character.personality && (
              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-xl text-white flex items-center gap-2">
                    <Icon name="Heart" size={20} className="text-cyan-400" />
                    Личность
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 leading-relaxed">{character.personality}</p>
                </CardContent>
              </Card>
            )}

            {character.goals && (
              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-xl text-white flex items-center gap-2">
                    <Icon name="Target" size={20} className="text-cyan-400" />
                    Цели и мотивация
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 leading-relaxed">{character.goals}</p>
                </CardContent>
              </Card>
            )}

            {abilitiesArray.length > 0 && (
              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-xl text-white flex items-center gap-2">
                    <Icon name="Zap" size={20} className="text-cyan-400" />
                    Способности
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {abilitiesArray.map((ability: string, index: number) => (
                      <li key={index} className="flex items-start gap-2 text-gray-300">
                        <Icon name="ChevronRight" size={16} className="text-cyan-400 mt-1 shrink-0" />
                        <span>{ability}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {episodesArray.length > 0 && (
              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-xl text-white flex items-center gap-2">
                    <Icon name="Film" size={20} className="text-cyan-400" />
                    Ключевые эпизоды
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {episodesArray.map((episode: string, index: number) => (
                      <li key={index} className="flex items-start gap-2 text-gray-300">
                        <Icon name="Play" size={16} className="text-cyan-400 mt-1 shrink-0" />
                        <span>{episode}</span>
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

export default CharacterDetail;