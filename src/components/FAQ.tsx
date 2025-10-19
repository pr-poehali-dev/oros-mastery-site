import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  items: FAQItem[];
  title?: string;
}

const FAQ = ({ items, title = 'Часто задаваемые вопросы' }: FAQProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': items.map(item => ({
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
    scriptTag.textContent = JSON.stringify(structuredData);

    return () => {
      const existingScript = document.querySelector('script[data-faq-schema="true"]');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, [items]);

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full" itemScope itemType="https://schema.org/FAQPage">
      <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
        <Icon name="HelpCircle" size={32} className="text-cyan-400" />
        {title}
      </h2>
      
      <div className="space-y-4">
        {items.map((item, index) => (
          <Card 
            key={index} 
            className="bg-gray-800/50 border-gray-700 hover:border-cyan-500/50 transition-all cursor-pointer"
            onClick={() => toggleQuestion(index)}
            itemScope
            itemProp="mainEntity"
            itemType="https://schema.org/Question"
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h3 
                    className="text-lg font-semibold text-white mb-2 flex items-center gap-2"
                    itemProp="name"
                  >
                    <Icon 
                      name="MessageCircle" 
                      size={20} 
                      className="text-cyan-400 flex-shrink-0" 
                    />
                    {item.question}
                  </h3>
                  
                  {openIndex === index && (
                    <div 
                      className="text-gray-300 leading-relaxed mt-3 pl-7"
                      itemScope
                      itemProp="acceptedAnswer"
                      itemType="https://schema.org/Answer"
                    >
                      <p itemProp="text">{item.answer}</p>
                    </div>
                  )}
                </div>
                
                <Icon 
                  name={openIndex === index ? "ChevronUp" : "ChevronDown"} 
                  size={24} 
                  className="text-cyan-400 flex-shrink-0 transition-transform" 
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
