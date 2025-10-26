import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface Article {
  id: number;
  title: string;
  content: string;
  createdAt: string;
}

interface EpisodeArticlesProps {
  articles: Article[];
  funFacts?: string;
}

const EpisodeArticles = ({ articles, funFacts }: EpisodeArticlesProps) => {
  return (
    <>
      {funFacts && (
        <Card className="bg-gray-800/50 border-yellow-500/30 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Icon name="Sparkles" size={24} className="text-yellow-400" />
            <h2 className="text-2xl font-bold text-yellow-400">Интересные факты</h2>
          </div>
          <div className="text-gray-300 leading-relaxed whitespace-pre-line">
            {funFacts}
          </div>
        </Card>
      )}

      {articles.length > 0 && articles.slice(0, 2).map((article) => (
        <Card key={article.id} className="bg-gray-800/50 border-green-500/30 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Icon name="Lightbulb" size={24} className="text-green-400" />
            <h2 className="text-xl md:text-2xl font-bold text-green-400 break-words">{article.title}</h2>
          </div>
          <div className="text-gray-300 leading-relaxed whitespace-pre-line break-words text-sm md:text-base">
            {article.content}
          </div>
        </Card>
      ))}
    </>
  );
};

export default EpisodeArticles;
