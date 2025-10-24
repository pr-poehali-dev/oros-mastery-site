import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const CHARACTERS_DATA = [
  {
    name: "Рик Санчез",
    species: "Человек",
    status: "Жив",
    origin: "Земля C-137",
    role: "Главный герой",
    bio: "Гениальный учёный и изобретатель, дедушка Морти. Циничный алкоголик с невероятным интеллектом, который путешествует по мультивселенной. Считает себя умнее всех во вселенной и часто пренебрегает чувствами других. Самый умный человек во вселенной, создатель портальной пушки.",
    image: "https://cdn.poehali.dev/projects/f9f23ac4-7352-47dd-a4bb-81301617dd90/files/d490fe60-e1ff-4015-8de4-bb5defe289ae.jpg"
  },
  {
    name: "Морти Смит",
    species: "Человек", 
    status: "Жив",
    origin: "Земля C-137",
    role: "Главный герой",
    bio: "Внук Рика, нервный 14-летний подросток. Несмотря на низкий интеллект и неуверенность, часто проявляет храбрость и моральную стойкость. Постоянный спутник Рика в его приключениях по мультивселенной.",
    image: "https://cdn.poehali.dev/projects/f9f23ac4-7352-47dd-a4bb-81301617dd90/files/54ad156d-f2d1-49cc-9d49-a0e720719998.jpg"
  },
  {
    name: "Джерри Смит",
    species: "Человек",
    status: "Жив", 
    origin: "Земля",
    role: "Второстепенный персонаж",
    bio: "Отец Морти и Саммер, зять Рика. Неудачник и неуверенный в себе человек, который постоянно ищет одобрения. Работает в рекламном агентстве. Воплощение заурядности, часто конфликтует с Риком.",
    image: "https://cdn.poehali.dev/projects/f9f23ac4-7352-47dd-a4bb-81301617dd90/files/b9f7c54d-44b3-419e-a414-f00ff618c62e.jpg"
  },
  {
    name: "Бет Смит",
    species: "Человек",
    status: "Жив",
    origin: "Земля", 
    role: "Второстепенный персонаж",
    bio: "Дочь Рика, жена Джерри, мать Морти и Саммер. Талантливый конский хирург с проблемами в личной жизни. Страдает от отсутствия отца в детстве. Унаследовала интеллект Рика и склонность к алкоголю.",
    image: "https://cdn.poehali.dev/projects/f9f23ac4-7352-47dd-a4bb-81301617dd90/files/d490fe60-e1ff-4015-8de4-bb5defe289ae.jpg"
  },
  {
    name: "Саммер Смит",
    species: "Человек",
    status: "Жив",
    origin: "Земля",
    role: "Второстепенный персонаж", 
    bio: "Старшая сестра Морти, типичная девочка-подросток. Изначально эгоистичная и поверхностная, эволюционирует до смелого члена команды. Часто присоединяется к приключениям Рика.",
    image: "https://cdn.poehali.dev/projects/f9f23ac4-7352-47dd-a4bb-81301617dd90/files/54ad156d-f2d1-49cc-9d49-a0e720719998.jpg"
  },
  {
    name: "Злой Морти",
    species: "Человек",
    status: "Жив",
    origin: "Неизвестная вселенная",
    role: "Главный антагонист",
    bio: "Самый умный и опасный Морти. Стал президентом Цитадели Риков. Единственный Морти, который смог перехитрить Риков. Устал от жестокости Риков и сбежал за Центральную Конечную Кривую. Носит повязку на глазу.",
    image: "https://cdn.poehali.dev/projects/f9f23ac4-7352-47dd-a4bb-81301617dd90/files/54ad156d-f2d1-49cc-9d49-a0e720719998.jpg"
  },
  {
    name: "Бёрдперсон",
    species: "Инопланетянин",
    status: "Жив",
    origin: "Планета птиц",
    role: "Союзник",
    bio: "Старый друг Рика, гуманоидная птица. Боец сопротивления против Галактической Федерации. Был женат на Тэмми, которая оказалась агентом. Превращён в киборга после предательства.",
    image: "https://cdn.poehali.dev/projects/f9f23ac4-7352-47dd-a4bb-81301617dd90/files/b9f7c54d-44b3-419e-a414-f00ff618c62e.jpg"
  },
  {
    name: "Сквончи",
    species: "Инопланетянин",
    status: "Погиб",
    origin: "Неизвестная планета",
    role: "Союзник",
    bio: "Друг Рика, маленькое существо с грубым характером. Эксперт по выживанию и боевым действиям. Пожертвовал собой ради спасения друзей. Несмотря на размер, был крайне опасным бойцом.",
    image: "https://cdn.poehali.dev/projects/f9f23ac4-7352-47dd-a4bb-81301617dd90/files/d490fe60-e1ff-4015-8de4-bb5defe289ae.jpg"
  },
  {
    name: "Мистер Жопосранчик",
    species: "Инопланетянин",
    status: "Жив",
    origin: "Измерение Жопосранчика",
    role: "Второстепенный персонаж",
    bio: "Газообразное существо, созданное Риком для Морти. Может проходить сквозь твёрдые объекты и выполнять одну функцию. Наивный и добрый персонаж, попавший в сложные ситуации.",
    image: "https://cdn.poehali.dev/projects/f9f23ac4-7352-47dd-a4bb-81301617dd90/files/54ad156d-f2d1-49cc-9d49-a0e720719998.jpg"
  },
  {
    name: "Джессика",
    species: "Человек",
    status: "Жив",
    origin: "Земля",
    role: "Эпизодический персонаж",
    bio: "Объект романтических чувств Морти, популярная девочка в школе. Рыжеволосая красавица, в которую влюблён Морти. Добрая и дружелюбная, хотя не всегда замечает внимание Морти.",
    image: "https://cdn.poehali.dev/projects/f9f23ac4-7352-47dd-a4bb-81301617dd90/files/d490fe60-e1ff-4015-8de4-bb5defe289ae.jpg"
  }
];

const API_URL = 'https://functions.poehali.dev/a3182691-86a7-4e0e-8e97-a0951d94bfb4';

export default function CharacterImport({ onComplete }: { onComplete: () => void }) {
  const [importing, setImporting] = useState(false);
  const [progress, setProgress] = useState({ current: 0, total: 0, success: 0, failed: 0 });
  const [log, setLog] = useState<string[]>([]);

  const addLog = (message: string) => {
    setLog(prev => [...prev, message]);
  };

  const importCharacters = async () => {
    setImporting(true);
    setProgress({ current: 0, total: CHARACTERS_DATA.length, success: 0, failed: 0 });
    setLog([]);
    
    addLog(`Начинаю импорт ${CHARACTERS_DATA.length} персонажей...`);

    for (let i = 0; i < CHARACTERS_DATA.length; i++) {
      const char = CHARACTERS_DATA[i];
      setProgress(prev => ({ ...prev, current: i + 1 }));
      
      try {
        addLog(`[${i+1}/${CHARACTERS_DATA.length}] Добавляю ${char.name}...`);
        
        const response = await fetch(API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            type: 'characters',
            ...char
          })
        });

        if (response.ok) {
          addLog(`✓ ${char.name} успешно добавлен`);
          setProgress(prev => ({ ...prev, success: prev.success + 1 }));
        } else {
          const error = await response.text();
          addLog(`✗ ${char.name} - ошибка: ${error}`);
          setProgress(prev => ({ ...prev, failed: prev.failed + 1 }));
        }

        await new Promise(resolve => setTimeout(resolve, 300));
        
      } catch (error: any) {
        addLog(`✗ ${char.name} - ошибка: ${error.message}`);
        setProgress(prev => ({ ...prev, failed: prev.failed + 1 }));
      }
    }

    addLog('');
    addLog('='.repeat(50));
    addLog('Импорт завершён!');
    addLog(`Успешно: ${progress.success}, Ошибок: ${progress.failed}`);
    
    setImporting(false);
    
    if (progress.success > 0) {
      setTimeout(() => onComplete(), 2000);
    }
  };

  return (
    <Card className="p-6 bg-gray-800/50 border-cyan-500/20 mb-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-cyan-400">Массовый импорт персонажей</h3>
            <p className="text-gray-400 text-sm mt-1">
              Добавить {CHARACTERS_DATA.length} основных персонажей одним кликом
            </p>
          </div>
          <Button
            onClick={importCharacters}
            disabled={importing}
            className="bg-gradient-to-r from-cyan-500 to-green-500 hover:from-cyan-600 hover:to-green-600"
          >
            {importing ? `Импорт... ${progress.current}/${progress.total}` : 'Начать импорт'}
          </Button>
        </div>

        {importing && (
          <div className="space-y-2">
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-cyan-500 to-green-500 h-2 rounded-full transition-all"
                style={{ width: `${(progress.current / progress.total) * 100}%` }}
              />
            </div>
            <div className="flex justify-between text-sm text-gray-400">
              <span>Прогресс: {progress.current} из {progress.total}</span>
              <span className="text-green-400">Успешно: {progress.success}</span>
              {progress.failed > 0 && (
                <span className="text-red-400">Ошибок: {progress.failed}</span>
              )}
            </div>
          </div>
        )}

        {log.length > 0 && (
          <div className="bg-gray-900/50 rounded-lg p-4 max-h-64 overflow-y-auto font-mono text-xs">
            {log.map((line, i) => (
              <div
                key={i}
                className={
                  line.startsWith('✓') ? 'text-green-400' :
                  line.startsWith('✗') ? 'text-red-400' :
                  line.includes('завершён') ? 'text-cyan-400 font-bold' :
                  'text-gray-400'
                }
              >
                {line}
              </div>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
}
