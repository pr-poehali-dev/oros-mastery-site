import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import EpisodeForm, { EpisodeFormData } from '@/components/admin/EpisodeForm';
import EpisodeList, { Episode } from '@/components/admin/EpisodeList';
import BlogForm, { BlogFormData } from '@/components/admin/BlogForm';
import BlogList from '@/components/admin/BlogList';
import UniverseForm, { UniverseFormData } from '@/components/admin/UniverseForm';
import UniverseList, { Universe } from '@/components/admin/UniverseList';
import CharacterForm, { CharacterFormData } from '@/components/admin/CharacterForm';
import CharacterList, { Character } from '@/components/admin/CharacterList';
import TheoryForm, { TheoryFormData } from '@/components/admin/TheoryForm';
import TheoryList, { Theory } from '@/components/admin/TheoryList';
import ArticleForm, { ArticleFormData } from '@/components/admin/ArticleForm';
import ArticleList, { Article } from '@/components/admin/ArticleList';
import PlaceholderTab from '@/components/admin/PlaceholderTab';

const EPISODES_API = 'https://functions.poehali.dev/031f0f01-3e0b-440b-a295-08f07c4d1389';
const BLOG_API = 'https://functions.poehali.dev/833cc9a4-513a-4d22-a390-4878941c0d71';
const CONTENT_API = 'https://functions.poehali.dev/a3182691-86a7-4e0e-8e97-a0951d94bfb4';

const Admin = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('episodes');
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [editingEpisode, setEditingEpisode] = useState<Episode | null>(null);
  const [universes, setUniverses] = useState<Universe[]>([]);
  const [editingUniverse, setEditingUniverse] = useState<Universe | null>(null);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [editingCharacter, setEditingCharacter] = useState<Character | null>(null);
  const [theories, setTheories] = useState<Theory[]>([]);
  const [editingTheory, setEditingTheory] = useState<Theory | null>(null);
  const [blogPosts, setBlogPosts] = useState<any[]>([]);
  const [editingBlogPost, setEditingBlogPost] = useState<any | null>(null);
  const [articles, setArticles] = useState<Article[]>([]);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);

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

  const fetchBlogPosts = async () => {
    try {
      const response = await fetch(BLOG_API);
      const data = await response.json();
      setBlogPosts(data);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
    }
  };

  const fetchUniverses = async () => {
    try {
      const response = await fetch(`${CONTENT_API}?type=universes`);
      const data = await response.json();
      setUniverses(data);
    } catch (error) {
      console.error('Error fetching universes:', error);
    }
  };

  const fetchCharacters = async () => {
    try {
      const response = await fetch(`${CONTENT_API}?type=characters`);
      const data = await response.json();
      setCharacters(data);
    } catch (error) {
      console.error('Error fetching characters:', error);
    }
  };

  const fetchTheories = async () => {
    try {
      const response = await fetch(`${CONTENT_API}?type=theories`);
      const data = await response.json();
      setTheories(data);
    } catch (error) {
      console.error('Error fetching theories:', error);
    }
  };

  const fetchEpisodes = async () => {
    try {
      const response = await fetch(EPISODES_API);
      const data = await response.json();
      setEpisodes(data);
    } catch (error) {
      console.error('Error fetching episodes:', error);
    }
  };

  const handleEpisodeSubmit = async (formData: EpisodeFormData, isEdit: boolean) => {
    try {
      const method = isEdit ? 'PUT' : 'POST';
      const url = isEdit ? `${EPISODES_API}?id=${formData.id}` : EPISODES_API;
      
      await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: formData.title,
          season: Number(formData.season),
          episode: Number(formData.episode),
          description: formData.description,
          image: formData.image,
          videoUrl: formData.videoUrl,
          videoIframe: formData.videoIframe,
          airDate: formData.airDate
        })
      });

      fetchEpisodes();
      setEditingEpisode(null);
      alert(isEdit ? 'Эпизод успешно обновлён!' : 'Эпизод успешно добавлен!');
    } catch (error) {
      console.error('Error saving episode:', error);
      alert('Ошибка при сохранении эпизода');
    }
  };

  const handleBlogSubmit = async (formData: BlogFormData, isEdit: boolean) => {
    try {
      const method = isEdit ? 'PUT' : 'POST';
      const url = isEdit ? `${BLOG_API}?id=${formData.id}` : BLOG_API;
      
      await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'post',
          title: formData.title,
          content: formData.content,
          excerpt: formData.excerpt,
          tags: formData.tags.split(',').map(t => t.trim()),
          author: formData.author,
          image: formData.image
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

  const handleDeleteEpisode = async (id: number) => {
    if (confirm('Вы уверены, что хотите удалить этот эпизод?')) {
      try {
        await fetch(`${EPISODES_API}?id=${id}`, { method: 'DELETE' });
        fetchEpisodes();
      } catch (error) {
        console.error('Error deleting episode:', error);
      }
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

  const handleUniverseSubmit = async (formData: UniverseFormData, isEdit: boolean) => {
    try {
      const method = isEdit ? 'PUT' : 'POST';
      const url = isEdit ? `${CONTENT_API}?type=universes&id=${formData.id}` : `${CONTENT_API}?type=universes`;
      
      await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      fetchUniverses();
      setEditingUniverse(null);
      alert(isEdit ? 'Вселенная успешно обновлена!' : 'Вселенная успешно добавлена!');
    } catch (error) {
      console.error('Error saving universe:', error);
      alert('Ошибка при сохранении вселенной');
    }
  };

  const handleDeleteUniverse = async (id: number) => {
    if (confirm('Вы уверены, что хотите удалить эту вселенную?')) {
      try {
        await fetch(`${CONTENT_API}?type=universes&id=${id}`, { method: 'DELETE' });
        fetchUniverses();
      } catch (error) {
        console.error('Error deleting universe:', error);
      }
    }
  };

  const handleCharacterSubmit = async (formData: CharacterFormData, isEdit: boolean) => {
    try {
      const method = isEdit ? 'PUT' : 'POST';
      const url = isEdit ? `${CONTENT_API}?type=characters&id=${formData.id}` : `${CONTENT_API}?type=characters`;
      
      await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      fetchCharacters();
      setEditingCharacter(null);
      alert(isEdit ? 'Персонаж успешно обновлён!' : 'Персонаж успешно добавлен!');
    } catch (error) {
      console.error('Error saving character:', error);
      alert('Ошибка при сохранении персонажа');
    }
  };

  const handleDeleteCharacter = async (id: number) => {
    if (confirm('Вы уверены, что хотите удалить этого персонажа?')) {
      try {
        await fetch(`${CONTENT_API}?type=characters&id=${id}`, { method: 'DELETE' });
        fetchCharacters();
      } catch (error) {
        console.error('Error deleting character:', error);
      }
    }
  };

  const handleTheorySubmit = async (formData: TheoryFormData, isEdit: boolean) => {
    try {
      const method = isEdit ? 'PUT' : 'POST';
      const url = isEdit ? `${CONTENT_API}?type=theories&id=${formData.id}` : `${CONTENT_API}?type=theories`;
      
      await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      fetchTheories();
      setEditingTheory(null);
      alert(isEdit ? 'Теория успешно обновлена!' : 'Теория успешно добавлена!');
    } catch (error) {
      console.error('Error saving theory:', error);
      alert('Ошибка при сохранении теории');
    }
  };

  const handleDeleteTheory = async (id: number) => {
    if (confirm('Вы уверены, что хотите удалить эту теорию?')) {
      try {
        await fetch(`${CONTENT_API}?type=theories&id=${id}`, { method: 'DELETE' });
        fetchTheories();
      } catch (error) {
        console.error('Error deleting theory:', error);
      }
    }
  };

  const fetchArticles = async () => {
    try {
      const response = await fetch(`${CONTENT_API}?type=articles`);
      const data = await response.json();
      setArticles(data);
    } catch (error) {
      console.error('Error fetching articles:', error);
    }
  };

  const handleArticleSubmit = async (formData: ArticleFormData, isEdit: boolean) => {
    try {
      const method = isEdit ? 'PUT' : 'POST';
      const url = isEdit ? `${CONTENT_API}?type=articles&id=${formData.id}` : `${CONTENT_API}?type=articles`;
      
      await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      fetchArticles();
      setEditingArticle(null);
      alert(isEdit ? 'Статья успешно обновлена!' : 'Статья успешно добавлена!');
    } catch (error) {
      console.error('Error saving article:', error);
      alert('Ошибка при сохранении статьи');
    }
  };

  const handleDeleteArticle = async (id: number) => {
    if (confirm('Вы уверены, что хотите удалить эту статью?')) {
      try {
        await fetch(`${CONTENT_API}?type=articles&id=${id}`, { method: 'DELETE' });
        fetchArticles();
      } catch (error) {
        console.error('Error deleting article:', error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      <Navigation />
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="mb-8">
          <Button 
            onClick={() => navigate('/')} 
            variant="ghost" 
            className="text-cyan-400 hover:text-cyan-300 mb-4"
          >
            <Icon name="ArrowLeft" size={20} className="mr-2" />
            На главную
          </Button>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-r from-cyan-500 to-green-500 p-3 rounded-lg">
                <Icon name="Settings" size={32} className="text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-white">Админ-панель</h1>
                <p className="text-gray-400 mt-1">Управление контентом сайта</p>
              </div>
            </div>
            
            <Button 
              onClick={() => {
                localStorage.removeItem('isAuthenticated');
                localStorage.removeItem('adminUser');
                navigate('/login');
              }}
              variant="outline"
              className="border-red-500/50 text-red-400 hover:bg-red-500/10 hover:text-red-300"
            >
              <Icon name="LogOut" size={18} className="mr-2" />
              Выйти
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-5xl mx-auto grid-cols-2 md:grid-cols-7 bg-gray-800 mb-8 gap-2">
            <TabsTrigger value="episodes" className="data-[state=active]:bg-cyan-500 data-[state=active]:text-white">
              <Icon name="Film" size={18} className="mr-2" />
              Эпизоды
            </TabsTrigger>
            <TabsTrigger value="articles" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white">
              <Icon name="FileText" size={18} className="mr-2" />
              Статьи
            </TabsTrigger>
            <TabsTrigger value="universes" className="data-[state=active]:bg-indigo-500 data-[state=active]:text-white">
              <Icon name="Globe" size={18} className="mr-2" />
              Вселенные
            </TabsTrigger>
            <TabsTrigger value="characters" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
              <Icon name="Users" size={18} className="mr-2" />
              Персонажи
            </TabsTrigger>
            <TabsTrigger value="theories" className="data-[state=active]:bg-green-500 data-[state=active]:text-white">
              <Icon name="Lightbulb" size={18} className="mr-2" />
              Теории
            </TabsTrigger>
            <TabsTrigger value="blog" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">
              <Icon name="BookOpen" size={18} className="mr-2" />
              Блог
            </TabsTrigger>
            <TabsTrigger value="videos" className="data-[state=active]:bg-pink-500 data-[state=active]:text-white">
              <Icon name="Video" size={18} className="mr-2" />
              Видео
            </TabsTrigger>
          </TabsList>

          <TabsContent value="episodes">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <EpisodeForm 
                onSubmit={handleEpisodeSubmit} 
                editingEpisode={editingEpisode} 
                onCancelEdit={() => setEditingEpisode(null)}
              />
              <EpisodeList 
                episodes={episodes} 
                onDelete={handleDeleteEpisode}
                onEdit={(episode) => setEditingEpisode(episode)}
              />
            </div>
          </TabsContent>

          <TabsContent value="articles">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <ArticleForm 
                onSubmit={handleArticleSubmit} 
                editingArticle={editingArticle} 
                episodes={episodes}
                onCancel={() => setEditingArticle(null)}
              />
              <ArticleList 
                articles={articles} 
                onDelete={handleDeleteArticle}
                onEdit={(article) => setEditingArticle(article)}
              />
            </div>
          </TabsContent>

          <TabsContent value="videos">
            <PlaceholderTab
              title="Видео"
              description="Управление видеоконтентом"
              iconName="Video"
              color="purple"
            />
          </TabsContent>

          <TabsContent value="universes">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <UniverseForm 
                onSubmit={handleUniverseSubmit} 
                editingUniverse={editingUniverse} 
                onCancelEdit={() => setEditingUniverse(null)}
              />
              <UniverseList 
                universes={universes} 
                onDelete={handleDeleteUniverse}
                onEdit={(universe) => setEditingUniverse(universe)}
              />
            </div>
          </TabsContent>

          <TabsContent value="characters">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <CharacterForm 
                onSubmit={handleCharacterSubmit} 
                editingCharacter={editingCharacter} 
                onCancelEdit={() => setEditingCharacter(null)}
              />
              <CharacterList 
                characters={characters} 
                onDelete={handleDeleteCharacter}
                onEdit={(character) => setEditingCharacter(character)}
              />
            </div>
          </TabsContent>

          <TabsContent value="theories">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <TheoryForm 
                onSubmit={handleTheorySubmit} 
                editingTheory={editingTheory} 
                onCancelEdit={() => setEditingTheory(null)}
              />
              <TheoryList 
                theories={theories} 
                onDelete={handleDeleteTheory}
                onEdit={(theory) => setEditingTheory(theory)}
              />
            </div>
          </TabsContent>

          <TabsContent value="blog">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <BlogForm 
                onSubmit={handleBlogSubmit}
                initialData={editingBlogPost}
                onCancel={() => setEditingBlogPost(null)}
              />
              <BlogList 
                posts={blogPosts}
                onDelete={handleDeleteBlogPost}
                onEdit={(post) => setEditingBlogPost(post)}
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;