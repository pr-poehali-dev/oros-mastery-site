import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

export interface Article {
  id: number;
  episodeId: number;
  title: string;
  content: string;
  createdAt?: string;
  episodeTitle?: string;
  season?: number;
  episode?: number;
}

interface ArticleListProps {
  articles: Article[];
  onEdit: (article: Article) => void;
  onDelete: (id: number) => void;
}

const ArticleList = ({ articles, onEdit, onDelete }: ArticleListProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-cyan-400 mb-4">
        Список статей ({articles.length})
      </h3>
      {articles.length === 0 ? (
        <Card className="p-6 bg-gray-800/50 border-cyan-500/30 text-center">
          <p className="text-gray-400">Статьи пока не добавлены</p>
        </Card>
      ) : (
        <div className="grid gap-4">
          {articles.map((article) => (
            <Card key={article.id} className="p-4 bg-gray-800/50 border-cyan-500/30">
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    {article.season && article.episode && (
                      <span className="px-2 py-1 bg-gradient-to-r from-cyan-500 to-green-500 text-white text-xs rounded-full">
                        S{article.season}E{article.episode}
                      </span>
                    )}
                    <h4 className="text-lg font-semibold text-cyan-400">
                      {article.title}
                    </h4>
                  </div>
                  {article.episodeTitle && (
                    <p className="text-sm text-gray-400 mb-2">
                      Эпизод: {article.episodeTitle}
                    </p>
                  )}
                  <p className="text-gray-300 line-clamp-2">{article.content}</p>
                  {article.createdAt && (
                    <p className="text-xs text-gray-500 mt-2">
                      Создано: {new Date(article.createdAt).toLocaleDateString('ru-RU')}
                    </p>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={() => onEdit(article)}
                    size="sm"
                    variant="outline"
                    className="border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10"
                  >
                    <Icon name="Edit" size={16} />
                  </Button>
                  <Button
                    onClick={() => {
                      if (confirm('Удалить эту статью?')) {
                        onDelete(article.id);
                      }
                    }}
                    size="sm"
                    variant="outline"
                    className="border-red-500/50 text-red-400 hover:bg-red-500/10"
                  >
                    <Icon name="Trash2" size={16} />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ArticleList;
