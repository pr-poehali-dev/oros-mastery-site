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
  const faqData = [
    {
      question: `Где смотреть ${episode.episode} эпизод Рик и Морти онлайн?`,
      answer: `${episode.episode} эпизод ${episode.season} сезона "Рик и Морти" доступен для просмотра на этой странице в хорошем качестве с русской озвучкой.`
    },
    {
      question: `Когда вышел эпизод "${episode.title}"?`,
      answer: `Эпизод "${episode.title}" является ${episode.episode}-м эпизодом ${episode.season} сезона сериала "Рик и Морти".`
    },
    {
      question: `О чем ${episode.episode} серия Рик и Морти?`,
      answer: episode.description
    },
    {
      question: `Сколько эпизодов в ${episode.season} сезоне Рик и Морти?`,
      answer: `${episode.season} сезон "Рик и Морти" включает 10-11 эпизодов. Вы можете посмотреть все эпизоды сезона в плейлисте на сайте.`
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
