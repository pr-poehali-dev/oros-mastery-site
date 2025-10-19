import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date?: string;
  tags: string[];
  image: string;
}

interface BlogListProps {
  posts: BlogPost[];
  onDelete: (id: number) => void;
  onEdit: (post: BlogPost) => void;
}

const BlogList = ({ posts, onDelete, onEdit }: BlogListProps) => {
  return (
    <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-2xl text-white flex items-center gap-2">
          <Icon name="FileText" size={24} className="text-orange-400" />
          Опубликованные статьи ({posts.length})
        </CardTitle>
        <CardDescription className="text-gray-300">
          Редактировать или удалить статьи
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
          {posts.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              <Icon name="Inbox" size={48} className="mx-auto mb-2 opacity-50" />
              <p>Статей пока нет</p>
            </div>
          ) : (
            posts.map((post) => (
              <Card key={post.id} className="bg-gray-900/50 border-gray-700">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-white mb-2 line-clamp-1">
                        {post.title}
                      </h3>
                      <p className="text-sm text-gray-400 mb-3 line-clamp-2">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge variant="outline" className="border-orange-500/30 text-orange-300 text-xs">
                          <Icon name="User" size={12} className="mr-1" />
                          {post.author}
                        </Badge>
                        {post.tags && post.tags.length > 0 && (
                          post.tags.slice(0, 3).map((tag, idx) => (
                            <Badge 
                              key={idx} 
                              variant="outline" 
                              className="border-cyan-500/30 text-cyan-300 text-xs"
                            >
                              {tag}
                            </Badge>
                          ))
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Button
                        size="sm"
                        onClick={() => onEdit(post)}
                        className="bg-blue-500 hover:bg-blue-600 h-8 px-3"
                      >
                        <Icon name="Edit" size={14} className="mr-1" />
                        Изменить
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onDelete(post.id)}
                        className="border-red-500/50 text-red-400 hover:bg-red-500/10 h-8 px-3"
                      >
                        <Icon name="Trash2" size={14} className="mr-1" />
                        Удалить
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default BlogList;
