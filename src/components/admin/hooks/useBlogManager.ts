import { useState } from 'react';
import { BlogFormData } from '@/components/admin/BlogForm';

const BLOG_API = 'https://functions.poehali.dev/833cc9a4-513a-4d22-a390-4878941c0d71';

export const useBlogManager = () => {
  const [blogPosts, setBlogPosts] = useState<any[]>([]);
  const [editingBlogPost, setEditingBlogPost] = useState<any | null>(null);

  const fetchBlogPosts = async () => {
    try {
      const response = await fetch(BLOG_API);
      const data = await response.json();
      setBlogPosts(data);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
    }
  };

  const handleBlogSubmit = async (formData: BlogFormData, isEdit: boolean) => {
    try {
      const method = isEdit ? 'PUT' : 'POST';
      const url = isEdit ? `${BLOG_API}?id=${formData.id}` : BLOG_API;
      
      const tagsArray = formData.tags.split(',').map(t => t.trim());
      
      await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'post',
          title: formData.title,
          content: formData.content,
          excerpt: formData.excerpt,
          tags: tagsArray,
          author: formData.author,
          image: formData.image,
          category: formData.category,
          date: formData.date,
          readTime: formData.readTime,
          views: formData.views || 0,
          likes: formData.likes || 0
        })
      });

      fetchBlogPosts();
      setEditingBlogPost(null);
      alert(isEdit ? 'Статья успешно обновлена!' : 'Статья успешно добавлена!');
    } catch (error) {
      console.error('Error saving blog post:', error);
      alert('Ошибка при сохранении статьи');
    }
  };

  const handleDeleteBlogPost = async (id: number) => {
    if (confirm('Вы уверены, что хотите удалить эту статью?')) {
      try {
        await fetch(`${BLOG_API}?id=${id}`, { method: 'DELETE' });
        fetchBlogPosts();
      } catch (error) {
        console.error('Error deleting blog post:', error);
      }
    }
  };

  return {
    blogPosts,
    editingBlogPost,
    setEditingBlogPost,
    fetchBlogPosts,
    handleBlogSubmit,
    handleDeleteBlogPost
  };
};