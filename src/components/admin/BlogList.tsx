import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import type { BlogPost } from './hooks/useBlogManager';

interface BlogListProps {
  posts: BlogPost[];
  onEdit: (post: BlogPost) => void;
  onDelete: (id: number) => void;
  loading?: boolean;
}

const BlogList = ({ posts, onEdit, onDelete, loading }: BlogListProps) => {
  if (loading) {
    return (
      <Card className="bg-gray-800/50 border-gray-700">
        <CardContent className="p-8 text-center text-gray-400">
          Загрузка...
        </CardContent>
      </Card>
    );
  }

  if (posts.length === 0) {
    return (
      <Card className="bg-gray-800/50 border-gray-700">
        <CardContent className="p-8 text-center text-gray-400">
          <Icon name="FileText" size={48} className="mx-auto mb-4 opacity-50" />
          <p>Нет статей</p>
          <p className="text-sm mt-2">Создайте первую статью для блога</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gray-800/50 border-gray-700">
      <CardHeader>
        <CardTitle className="text-xl text-white flex items-center gap-2">
          <Icon name="List" size={24} className="text-orange-400" />
          Статьи блога ({posts.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {posts.map((post) => (
            <div
              key={post.id}
              className="p-4 bg-gray-900/50 border border-gray-700 rounded-lg hover:border-cyan-500/50 transition-colors"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-white mb-1 truncate">
                    {post.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-2 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="flex flex-wrap gap-3 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Icon name="User" size={14} />
                      {post.author}
                    </span>
                    <span className="flex items-center gap-1">
                      <Icon name="Calendar" size={14} />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Icon name="Clock" size={14} />
                      {post.read_time}
                    </span>
                    <span className="flex items-center gap-1">
                      <Icon name="Tag" size={14} />
                      {post.category}
                    </span>
                    {post.views !== undefined && (
                      <span className="flex items-center gap-1">
                        <Icon name="Eye" size={14} />
                        {post.views}
                      </span>
                    )}
                    {post.likes !== undefined && (
                      <span className="flex items-center gap-1">
                        <Icon name="Heart" size={14} />
                        {post.likes}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex gap-2 shrink-0">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onEdit(post)}
                    className="border-cyan-500 text-cyan-400 hover:bg-cyan-500/10"
                  >
                    <Icon name="Edit" size={16} />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => post.id && onDelete(post.id)}
                    className="border-red-500 text-red-400 hover:bg-red-500/10"
                  >
                    <Icon name="Trash2" size={16} />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default BlogList;
