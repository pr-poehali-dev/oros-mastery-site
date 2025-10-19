import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import Navigation from '@/components/Navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import EditableContent from '@/components/EditableContent';
import CommentSection from '@/components/CommentSection';

const CharacterDetail = () => {
  const { slug } = useParams();
  const id = slug ? parseInt(slug.split('-')[0]) : 1;

  const charactersData = [
    {
      id: 1,
      name: 'Рик Санчез',
      species: 'Человек',
      status: 'Жив',
      origin: 'Вселенная C-137',
      occupation: 'Учёный, изобретатель',
      personality: ['Гениальный', 'Циничный', 'Пьющий', 'Безрассудный'],
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop',
      fullBio: `Рик Санчез — гениальный учёный, изобретатель и один из самых умных существ во всей мультивселенной. Его полное имя — Рик Санчез C-137, что указывает на его происхождение из вселенной C-137.

## Ранняя жизнь

Рик родился и вырос в обычной семье. В молодости он был счастлив, женился на женщине по имени Диана и у них родилась дочь Бет. Однако его жизнь кардинально изменилась, когда другой Рик из параллельной вселенной убил его жену и дочь, взорвав их дом.

Это трагическое событие превратило Рика в того циничного, озлобленного гения, которого мы знаем. Он посвятил годы поискам убийцы своей семьи, путешествуя по бесконечным измерениям мультивселенной.

## Изобретения и достижения

Рик создал множество революционных изобретений:

### Портальная пушка
Главное изобретение Рика — портальная пушка, позволяющая мгновенно перемещаться между различными измерениями и вселенными. Это устройство делает его одним из самых опасных существ в мультивселенной, так как он может в любой момент сбежать или призвать подкрепление из других измерений.

### Микроверс батарейка
Рик создал целую миниатюрную вселенную внутри батарейки, жители которой производят энергию для его космического корабля, даже не подозревая об этом. Это демонстрирует его гениальность и полное отсутствие этики.

### Другие изобретения
- Лазерное оружие различных типов
- Устройство для замораживания времени
- Оборудование для чтения мыслей
- Медицинские приборы, способные лечить любые болезни
- Робототехника и искусственный интеллект

## Характер и личность

Рик — сложная и противоречивая личность:

### Цинизм и нигилизм
Рик не верит в смысл жизни, любовь или какие-либо высшие ценности. Для него вселенная — это бессмысленное место, где ничего не имеет значения. Этот цинизм является защитным механизмом, помогающим ему справиться с потерей семьи.

### Алкоголизм
Рик страдает от тяжёлой алкогольной зависимости. Он постоянно пьян или под действием различных веществ. Это его способ справиться с болью и экзистенциальным кризисом.

### Интеллект
Несмотря на все свои проблемы, Рик остаётся гениальным учёным. Он может решать задачи, которые другим кажутся невозможными, и регулярно перехитряет существ, считающих себя умнее его.

### Скрытая любовь к семье
Хотя Рик утверждает, что ничто не имеет значения, его действия показывают обратное. Он рискует жизнью ради Морти и остальных членов семьи, хотя никогда не признается в этом открыто.

## Отношения

### Морти
Морти — внук Рика и его постоянный спутник в приключениях. Рик использует "глупые" мозговые волны Морти, чтобы скрыть свои собственные гениальные волны от врагов. Но со временем между ними развивается настоящая связь, хотя Рик никогда не признает это.

### Бет
Бет — дочь Рика. Их отношения сложны, так как Рик бросил её в детстве и вернулся только спустя десятилетия. Бет страдает от проблем с привязанностью и алкоголизма, частично из-за отсутствия отца.

### Птица-Личность
Один из немногих друзей Рика. Их дружба выдержала множество испытаний, включая предательство Птицы-Личности. Несмотря ни на что, Рик продолжает считать его другом.

### Другие Рики
Рик C-137 презирает большинство других Риков из параллельных вселенных. Он считает Цитадель Риков признаком слабости и конформизма. Для него другие Рики — это версии его самого, которые выбрали лёгкий путь.

## Способности

Помимо интеллекта, Рик обладает:
- Экспертными знаниями в боевых искусствах
- Навыками стрельбы и рукопашного боя
- Способностью быстро адаптироваться к любой ситуации
- Умением манипулировать людьми и существами
- Знанием тысяч языков и культур

## Моральная философия

Рик живёт по своим правилам. Он не признаёт авторитетов, правительств или богов. Для него единственная ценность — это свобода делать всё, что он хочет. Эта философия одновременно освобождает и разрушает его.

Несмотря на цинизм, Рик иногда демонстрирует признаки совести. Он может спасти невинных, наказать злодеев или защитить семью. Но он всегда отрицает, что это имеет какое-то значение.

## Влияние на мультивселенную

Рик Санчез — одна из самых влиятельных фигур в мультивселенной. Его действия часто имеют последствия для целых измерений и цивилизаций. Он свергал правительства, уничтожал планеты и создавал новые формы жизни.

## Загадки и тайны

Многое о Рике остаётся загадкой:
- Что на самом деле случилось с его женой Дианой?
- Почему он вернулся к Бет именно сейчас?
- Есть ли что-то, что может заставить его изменить свою философию?
- Какова его истинная цель?`,
      age: '70+',
      gender: 'Мужской',
      affiliation: 'Независимый',
      abilities: ['Гениальный интеллект', 'Изобретательность', 'Боевые навыки', 'Путешествия между измерениями'],
      firstAppearance: 'Pilot (S1E1)',
      voiceActor: 'Justin Roiland'
    }
  ];

  const [character, setCharacter] = useState(charactersData.find(c => c.id === Number(id)) || charactersData[0]);

  const handleContentSave = (newContent: string) => {
    setCharacter({ ...character, fullBio: newContent });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      <Navigation />
      <Breadcrumbs />
      <SEO
        title={`${character.name} - Персонаж Rick and Morty`}
        description={`${character.name} - ${character.occupation}. ${character.fullBio.substring(0, 150)}...`}
        image={character.image}
        keywords={`Rick and Morty, ${character.name}, персонаж, ${character.origin}, ${character.species}, биография персонажа`}
        ogType="article"
      />

      <div className="relative h-96 overflow-hidden">
        <img 
          src={character.image} 
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
              <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                {character.status}
              </Badge>
              <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30">
                {character.species}
              </Badge>
              <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                {character.occupation}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Card className="bg-gray-800/50 border-gray-700 p-8">
              <EditableContent
                content={character.fullBio}
                onSave={handleContentSave}
                title="Биография"
              />
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
                <div>
                  <p className="text-gray-400 text-sm mb-1">Возраст</p>
                  <p className="text-white font-semibold">{character.age}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-1">Пол</p>
                  <p className="text-white font-semibold">{character.gender}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-1">Происхождение</p>
                  <p className="text-white font-semibold">{character.origin}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-1">Принадлежность</p>
                  <p className="text-white font-semibold">{character.affiliation}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-1">Первое появление</p>
                  <p className="text-white font-semibold">{character.firstAppearance}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-1">Голос</p>
                  <p className="text-white font-semibold">{character.voiceActor}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-xl text-white flex items-center gap-2">
                  <Icon name="Zap" size={20} className="text-cyan-400" />
                  Способности
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {character.abilities.map((ability, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-gray-300">
                      <Icon name="Star" size={14} className="text-yellow-400" />
                      <span>{ability}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-xl text-white flex items-center gap-2">
                  <Icon name="Heart" size={20} className="text-cyan-400" />
                  Черты характера
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {character.personality.map((trait, idx) => (
                    <Badge key={idx} variant="outline" className="border-cyan-500/30 text-cyan-300">
                      {trait}
                    </Badge>
                  ))}
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