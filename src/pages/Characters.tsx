import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';

const Characters = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecies, setSelectedSpecies] = useState('all');

  const characters = [
    {
      id: 1,
      name: 'Рик Санчез',
      species: 'human',
      status: 'alive',
      origin: 'C-137',
      occupation: 'Учёный',
      description: 'Гениальный, но циничный изобретатель с алкогольной зависимостью. Путешествует по мультивселенной.',
      personality: ['Гениальный', 'Циничный', 'Пьющий', 'Безрассудный'],
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop',
      color: 'cyan'
    },
    {
      id: 2,
      name: 'Морти Смит',
      species: 'human',
      status: 'alive',
      origin: 'C-137',
      occupation: 'Школьник',
      description: 'Нервный внук Рика, которого постоянно втягивают в опасные приключения по вселенным.',
      personality: ['Нервный', 'Добрый', 'Неуверенный', 'Развивающийся'],
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop',
      color: 'yellow'
    },
    {
      id: 3,
      name: 'Саммер Смит',
      species: 'human',
      status: 'alive',
      origin: 'Земля',
      occupation: 'Школьница',
      description: 'Старшая сестра Морти. Типичный подросток, который иногда присоединяется к приключениям.',
      personality: ['Уверенная', 'Саркастичная', 'Популярная', 'Храбрая'],
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop',
      color: 'pink'
    },
    {
      id: 4,
      name: 'Джерри Смит',
      species: 'human',
      status: 'alive',
      origin: 'Земля',
      occupation: 'Безработный',
      description: 'Зять Рика и отец Морти и Саммер. Неуверенный в себе и часто становится объектом насмешек.',
      personality: ['Неуверенный', 'Добродушный', 'Неудачник', 'Ревнивый'],
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop',
      color: 'brown'
    },
    {
      id: 5,
      name: 'Бет Смит',
      species: 'human',
      status: 'alive',
      origin: 'Земля',
      occupation: 'Хирург-ветеринар',
      description: 'Дочь Рика, жена Джерри. Талантливый хирург с проблемами в личной жизни.',
      personality: ['Умная', 'Алкоголичка', 'Амбициозная', 'Конфликтная'],
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&auto=format&fit=crop',
      color: 'red'
    },
    {
      id: 6,
      name: 'Мистер Мизикс',
      species: 'alien',
      status: 'alive',
      origin: 'Неизвестно',
      occupation: 'Помощник',
      description: 'Оранжевое существо, созданное Риком для помощи Морти. Говорит только "Ooh-wee!"',
      personality: ['Позитивный', 'Дружелюбный', 'Загадочный'],
      image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&auto=format&fit=crop',
      color: 'orange'
    },
    {
      id: 7,
      name: 'Птица-Личность',
      species: 'alien',
      status: 'alive',
      origin: 'Птичья планета',
      occupation: 'Революционер',
      description: 'Лучший друг Рика. Борец за свободу на своей планете. Предал Рика в прошлом.',
      personality: ['Преданный', 'Воинственный', 'Сложный', 'Героический'],
      image: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=400&auto=format&fit=crop',
      color: 'blue'
    },
    {
      id: 8,
      name: 'Сквончи',
      species: 'alien',
      status: 'deceased',
      origin: 'Неизвестно',
      occupation: 'Наёмник',
      description: 'Маленький инопланетный наёмник с невероятными боевыми навыками. Пожертвовал собой.',
      personality: ['Храбрый', 'Жестокий', 'Верный', 'Героический'],
      image: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&auto=format&fit=crop',
      color: 'green'
    },
    {
      id: 9,
      name: 'Мистер Попо-задница',
      species: 'alien',
      status: 'alive',
      origin: 'Земля',
      occupation: 'Учитель',
      description: 'Инопланетянин, который долго жил на Земле и преподавал музыку Морти.',
      personality: ['Терпеливый', 'Мудрый', 'Странный'],
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop',
      color: 'purple'
    },
    {
      id: 10,
      name: 'Злой Морти',
      species: 'human',
      status: 'alive',
      origin: 'Неизвестно',
      occupation: 'Президент Цитадели',
      description: 'Морти, который устал от Риков и захватил власть на Цитадели. Самый опасный Морти.',
      personality: ['Умный', 'Безжалостный', 'Амбициозный', 'Манипулятор'],
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop',
      color: 'red'
    }
  ];

  const species = [
    { id: 'all', name: 'Все', icon: 'Users' },
    { id: 'human', name: 'Люди', icon: 'User' },
    { id: 'alien', name: 'Инопланетяне', icon: 'Rocket' }
  ];

  const filteredCharacters = characters.filter(char => {
    const matchesSpecies = selectedSpecies === 'all' || char.species === selectedSpecies;
    const matchesSearch = char.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         char.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSpecies && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    return status === 'alive' 
      ? 'bg-green-500/20 text-green-300 border-green-500/30' 
      : 'bg-red-500/20 text-red-300 border-red-500/30';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      <Navigation />
      <SEO
        title="Персонажи Rick and Morty - Полный каталог героев"
        description="Познакомьтесь со всеми персонажами Rick and Morty. Рик, Морти, Саммер, семья Смитов и другие герои сериала. Биографии, описания и факты о персонажах."
        keywords="Rick and Morty персонажи, Рик Санчез, Морти Смит, герои, инопланетяне, персонажи Рик и Морти, биографии героев, все персонажи"
      />
      
      <section className="relative pt-32 pb-24 overflow-hidden bg-gradient-to-br from-cyan-600 via-blue-500 to-purple-600">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30"></div>
        
        <div className="container relative z-10 px-4 text-center text-white">
          <Badge className="mb-6 bg-white/20 text-white border-white backdrop-blur-sm">
            <Icon name="Users" size={16} className="mr-2" />
            Персонажи
          </Badge>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Герои сериала
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Познакомьтесь с семьёй Смитов и их друзьями из разных вселенных
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        <div className="mb-8 space-y-6">
          <div className="relative">
            <Icon name="Search" size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
            <Input
              placeholder="Поиск персонажей..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 bg-gray-800 border-gray-700 text-white placeholder:text-gray-300 h-14 text-lg"
            />
          </div>

          <div className="flex gap-2 flex-wrap">
            {species.map(spec => (
              <Button
                key={spec.id}
                onClick={() => setSelectedSpecies(spec.id)}
                variant={selectedSpecies === spec.id ? 'default' : 'outline'}
                className={
                  selectedSpecies === spec.id
                    ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white border-0'
                    : 'border-gray-700 text-gray-300 hover:bg-gray-800'
                }
              >
                <Icon name={spec.icon as any} size={16} className="mr-2" />
                {spec.name}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCharacters.map((character) => (
            <Card 
              key={character.id} 
              className="bg-gray-800/50 border-gray-700 overflow-hidden hover:border-cyan-500/50 transition-all cursor-pointer"
              onClick={() => navigate(`/character/${character.id}`)}
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={character.image} 
                  alt={character.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
                <Badge className={`absolute top-4 right-4 ${getStatusColor(character.status)}`}>
                  {character.status === 'alive' ? 'Жив' : 'Погиб'}
                </Badge>
              </div>
              
              <CardHeader>
                <CardTitle className="text-2xl text-white">{character.name}</CardTitle>
                <CardDescription className="text-gray-400 space-y-1">
                  <div className="flex items-center gap-2">
                    <Icon name="MapPin" size={14} />
                    <span>{character.origin}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name="Briefcase" size={14} />
                    <span>{character.occupation}</span>
                  </div>
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <p className="text-gray-300 text-sm mb-4">{character.description}</p>
                
                <div className="flex flex-wrap gap-2">
                  {character.personality.map((trait, idx) => (
                    <Badge key={idx} variant="outline" className="border-cyan-500/30 text-cyan-300 text-xs">
                      {trait}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredCharacters.length === 0 && (
          <div className="text-center py-20">
            <Icon name="UserX" size={64} className="mx-auto text-gray-600 mb-4" />
            <h3 className="text-2xl font-bold text-gray-400 mb-2">Персонажи не найдены</h3>
            <p className="text-gray-500">Попробуйте изменить параметры поиска</p>
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
};

export default Characters;