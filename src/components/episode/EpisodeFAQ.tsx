import { useEffect } from 'react';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface Episode {
  id: number;
  title: string;
  season: number;
  episode: number;
  description: string;
}

interface EpisodeFAQProps {
  episode: Episode;
}

const EpisodeFAQ = ({ episode }: EpisodeFAQProps) => {
  const generateMetaDescription = () => {
    const keywords = [
      `смотреть ${episode.episode} серию Рик и Морти`,
      `${episode.season} сезон ${episode.episode} эпизод`,
      'Rick and Morty онлайн',
      'в хорошем качестве',
      'с русской озвучкой'
    ];
    return `${episode.title} - ${keywords.join(', ')}. ${episode.description.slice(0, 120)}...`;
  };

  const episodeTypeName = () => {
    const lastDigit = episode.episode % 10;
    const lastTwoDigits = episode.episode % 100;
    
    if (lastTwoDigits >= 11 && lastTwoDigits <= 19) return `${episode.episode}-й эпизод`;
    if (lastDigit === 1) return `${episode.episode}-й эпизод`;
    if (lastDigit >= 2 && lastDigit <= 4) return `${episode.episode}-й эпизод`;
    return `${episode.episode}-й эпизод`;
  };

  const faqData = [
    {
      question: `Где смотреть ${episode.episode} эпизод ${episode.season} сезона Рик и Морти онлайн бесплатно?`,
      answer: `Смотреть "${episode.title}" (${episodeTypeName()} ${episode.season} сезона) Rick and Morty можно на этой странице в HD качестве с русской озвучкой совершенно бесплатно. Доступен просмотр на телефоне, планшете и компьютере без регистрации.`
    },
    {
      question: `О чем ${episode.episode} серия ${episode.season} сезона Рик и Морти "${episode.title}"?`,
      answer: `${episode.description} В этом эпизоде зрители увидят очередные безумные приключения гениального ученого Рика и его внука Морти в мультивселенной.`
    },
    {
      question: `Когда вышел эпизод "${episode.title}" сериала Рик и Морти?`,
      answer: `Эпизод "${episode.title}" - это ${episodeTypeName()} ${episode.season} сезона культового анимационного сериала "Рик и Морти" (Rick and Morty). Сериал создан Дэном Хармоном и Джастином Ройландом для канала Adult Swim.`
    },
    {
      question: `Можно ли скачать ${episode.episode} серию Рик и Морти?`,
      answer: `На нашем сайте вы можете смотреть ${episode.episode} эпизод онлайн без скачивания. Это быстрее, безопаснее и не занимает место на устройстве. Просмотр доступен 24/7 в любое время.`
    },
    {
      question: `Есть ли субтитры к эпизоду "${episode.title}"?`,
      answer: `${episodeTypeName()} ${episode.season} сезона доступен с профессиональной русской озвучкой. Оригинальная озвучка на английском языке также доступна для тех, кто изучает язык.`
    }
  ];

  useEffect(() => {
    const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': faqData.map(item => ({
        '@type': 'Question',
        'name': item.question,
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': item.answer
        }
      }))
    };

    let scriptTag = document.querySelector('script[data-faq-schema="true"]');
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.setAttribute('type', 'application/ld+json');
      scriptTag.setAttribute('data-faq-schema', 'true');
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(faqSchema);

    return () => {
      const existingScript = document.querySelector('script[data-faq-schema="true"]');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, [episode]);

  return (
    <Card className="bg-gray-800/50 border-purple-500/30 p-6">
      <h2 className="text-2xl font-bold text-purple-400 mb-6 flex items-center gap-2">
        <Icon name="HelpCircle" size={28} />
        Часто задаваемые вопросы
      </h2>
      <div className="space-y-4">
        {faqData.map((item, index) => (
          <details 
            key={index}
            className="group bg-gray-700/30 rounded-lg p-4 cursor-pointer hover:bg-gray-700/50 transition-colors"
          >
            <summary className="font-semibold text-cyan-300 flex items-center justify-between">
              {item.question}
              <Icon name="ChevronDown" size={20} className="text-gray-400 group-open:rotate-180 transition-transform" />
            </summary>
            <p className="mt-3 text-gray-300 leading-relaxed">
              {item.answer}
            </p>
          </details>
        ))}
      </div>
    </Card>
  );
};

export default EpisodeFAQ;