import { useState } from 'react';

export interface BlogPost {
  id?: number;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  read_time: string;
  image: string;
  category: string;
  views?: number;
  likes?: number;
}

const API_URL = 'https://functions.poehali.dev/833cc9a4-513a-4d22-a390-4878941c0d71';

export const useBlogManager = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [editingBlogPost, setEditingBlogPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBlogPosts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('Ошибка загрузки постов');
      const data = await response.json();
      setBlogPosts(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка загрузки');
      console.error('Error fetching blog posts:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleBlogSubmit = async (formData: BlogPost, isEdit: boolean) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (!response.ok) throw new Error(`Ошибка ${isEdit ? 'обновления' : 'создания'} поста`);
      
      await fetchBlogPosts();
      setEditingBlogPost(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка сохранения');
      console.error('Error saving blog post:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteBlogPost = async (id: number) => {
    if (!confirm('Удалить этот пост?')) return;
    
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}?id=${id}`, {
        method: 'DELETE'
      });
      
      if (!response.ok) throw new Error('Ошибка удаления поста');
      
      await fetchBlogPosts();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка удаления');
      console.error('Error deleting blog post:', err);
    } finally {
      setLoading(false);
    }
  };

  return {
    blogPosts,
    editingBlogPost,
    setEditingBlogPost,
    fetchBlogPosts,
    handleBlogSubmit,
    handleDeleteBlogPost,
    loading,
    error
  };
};