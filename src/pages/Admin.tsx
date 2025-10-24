import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import AdminHeader from '@/components/admin/AdminHeader';
import EpisodeForm from '@/components/admin/EpisodeForm';
import EpisodeList from '@/components/admin/EpisodeList';
import BlogForm from '@/components/admin/BlogForm';
import BlogList from '@/components/admin/BlogList';
import UniverseForm from '@/components/admin/UniverseForm';
import UniverseList from '@/components/admin/UniverseList';
import CharacterForm from '@/components/admin/CharacterForm';
import CharacterList from '@/components/admin/CharacterList';
import CharacterImport from '@/components/admin/CharacterImport';
import TheoryForm from '@/components/admin/TheoryForm';
import TheoryList from '@/components/admin/TheoryList';
import ArticleForm from '@/components/admin/ArticleForm';
import ArticleList from '@/components/admin/ArticleList';
import PlaceholderTab from '@/components/admin/PlaceholderTab';
import { useEpisodesManager } from '@/components/admin/hooks/useEpisodesManager';
import { useBlogManager } from '@/components/admin/hooks/useBlogManager';
import { useContentManager } from '@/components/admin/hooks/useContentManager';

const Admin = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('episodes');

  const {
    episodes,
    editingEpisode,
    setEditingEpisode,
    fetchEpisodes,
    handleEpisodeSubmit,
    handleDeleteEpisode
  } = useEpisodesManager();

  const {
    blogPosts,
    editingBlogPost,
    setEditingBlogPost,
    fetchBlogPosts,
    handleBlogSubmit,
    handleDeleteBlogPost
  } = useBlogManager();

  const {
    universes,
    editingUniverse,
    setEditingUniverse,
    fetchUniverses,
    handleUniverseSubmit,
    handleDeleteUniverse,
    characters,
    editingCharacter,
    setEditingCharacter,
    fetchCharacters,
    handleCharacterSubmit,
    handleDeleteCharacter,
    theories,
    editingTheory,
    setEditingTheory,
    fetchTheories,
    handleTheorySubmit,
    handleDeleteTheory,
    articles,
    editingArticle,
    setEditingArticle,
    fetchArticles,
    handleArticleSubmit,
    handleDeleteArticle
  } = useContentManager();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    fetchEpisodes();
    fetchUniverses();
    fetchCharacters();
    fetchTheories();
    fetchBlogPosts();
    fetchArticles();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      <Navigation />
      <Breadcrumbs />
      <div className="container mx-auto px-4 pt-24 pb-12">
        <AdminHeader />
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-9 gap-2 bg-gray-800/50 p-2 mb-8 h-auto">
            <TabsTrigger 
              value="episodes" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-green-500 data-[state=active]:text-white text-gray-300"
            >
              Эпизоды
            </TabsTrigger>
            <TabsTrigger 
              value="universes"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-green-500 data-[state=active]:text-white text-gray-300"
            >
              Вселенные
            </TabsTrigger>
            <TabsTrigger 
              value="characters"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-green-500 data-[state=active]:text-white text-gray-300"
            >
              Персонажи
            </TabsTrigger>
            <TabsTrigger 
              value="theories"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-green-500 data-[state=active]:text-white text-gray-300"
            >
              Теории
            </TabsTrigger>
            <TabsTrigger 
              value="blog"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-green-500 data-[state=active]:text-white text-gray-300"
            >
              Блог
            </TabsTrigger>
            <TabsTrigger 
              value="articles"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-green-500 data-[state=active]:text-white text-gray-300"
            >
              Статьи
            </TabsTrigger>
            <TabsTrigger 
              value="comments"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-green-500 data-[state=active]:text-white text-gray-300"
            >
              Комментарии
            </TabsTrigger>
            <TabsTrigger 
              value="users"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-green-500 data-[state=active]:text-white text-gray-300"
            >
              Пользователи
            </TabsTrigger>
            <TabsTrigger 
              value="settings"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-green-500 data-[state=active]:text-white text-gray-300"
            >
              Настройки
            </TabsTrigger>
          </TabsList>

          <TabsContent value="episodes" className="space-y-6">
            <EpisodeForm 
              editingEpisode={editingEpisode}
              onSubmit={handleEpisodeSubmit}
              onCancel={() => setEditingEpisode(null)}
            />
            <EpisodeList 
              episodes={episodes}
              onEdit={setEditingEpisode}
              onDelete={handleDeleteEpisode}
            />
          </TabsContent>

          <TabsContent value="universes" className="space-y-6">
            <UniverseForm 
              editingUniverse={editingUniverse}
              onSubmit={handleUniverseSubmit}
              onCancel={() => setEditingUniverse(null)}
              characters={characters}
            />
            <UniverseList 
              universes={universes}
              onEdit={setEditingUniverse}
              onDelete={handleDeleteUniverse}
            />
          </TabsContent>

          <TabsContent value="characters" className="space-y-6">
            <CharacterImport onComplete={fetchCharacters} />
            <CharacterForm 
              editingCharacter={editingCharacter}
              onSubmit={handleCharacterSubmit}
              onCancel={() => setEditingCharacter(null)}
            />
            <CharacterList 
              characters={characters}
              onEdit={setEditingCharacter}
              onDelete={handleDeleteCharacter}
            />
          </TabsContent>

          <TabsContent value="theories" className="space-y-6">
            <TheoryForm 
              editingTheory={editingTheory}
              episodes={episodes}
              characters={characters}
              onSubmit={handleTheorySubmit}
              onCancel={() => setEditingTheory(null)}
            />
            <TheoryList 
              theories={theories}
              onEdit={setEditingTheory}
              onDelete={handleDeleteTheory}
            />
          </TabsContent>

          <TabsContent value="blog" className="space-y-6">
            <BlogForm 
              initialData={editingBlogPost}
              onSubmit={handleBlogSubmit}
              onCancel={() => setEditingBlogPost(null)}
            />
            <BlogList 
              posts={blogPosts}
              onEdit={setEditingBlogPost}
              onDelete={handleDeleteBlogPost}
            />
          </TabsContent>

          <TabsContent value="articles" className="space-y-6">
            <ArticleForm 
              editingArticle={editingArticle}
              episodes={episodes}
              onSubmit={handleArticleSubmit}
              onCancel={() => setEditingArticle(null)}
            />
            <ArticleList 
              articles={articles}
              onEdit={setEditingArticle}
              onDelete={handleDeleteArticle}
            />
          </TabsContent>

          <TabsContent value="comments">
            <PlaceholderTab 
              icon="MessageSquare"
              title="Комментарии"
              description="Здесь будет модерация комментариев пользователей"
            />
          </TabsContent>

          <TabsContent value="users">
            <PlaceholderTab 
              icon="Users"
              title="Пользователи"
              description="Здесь будет управление пользователями системы"
            />
          </TabsContent>

          <TabsContent value="settings">
            <PlaceholderTab 
              icon="Settings"
              title="Настройки"
              description="Здесь будут общие настройки сайта"
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;