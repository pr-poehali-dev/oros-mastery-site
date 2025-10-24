import { useState } from 'react';
import { Universe } from '@/components/admin/UniverseList';
import { UniverseFormData } from '@/components/admin/UniverseForm';
import { Character } from '@/components/admin/CharacterList';
import { CharacterFormData } from '@/components/admin/CharacterForm';
import { Theory } from '@/components/admin/TheoryList';
import { TheoryFormData } from '@/components/admin/TheoryForm';
import { Article } from '@/components/admin/ArticleList';
import { ArticleFormData } from '@/components/admin/ArticleForm';

const CONTENT_API = 'https://functions.poehali.dev/a3182691-86a7-4e0e-8e97-a0951d94bfb4';

export const useContentManager = () => {
  const [universes, setUniverses] = useState<Universe[]>([]);
  const [editingUniverse, setEditingUniverse] = useState<Universe | null>(null);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [editingCharacter, setEditingCharacter] = useState<Character | null>(null);
  const [theories, setTheories] = useState<Theory[]>([]);
  const [editingTheory, setEditingTheory] = useState<Theory | null>(null);
  const [articles, setArticles] = useState<Article[]>([]);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);

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

  const fetchArticles = async () => {
    try {
      const response = await fetch(`${CONTENT_API}?type=articles`);
      const data = await response.json();
      setArticles(data);
    } catch (error) {
      console.error('Error fetching articles:', error);
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
      console.log('handleCharacterSubmit called with:', { formData, isEdit });
      const method = isEdit ? 'PUT' : 'POST';
      const url = isEdit ? `${CONTENT_API}?type=characters&id=${formData.id}` : `${CONTENT_API}?type=characters`;
      console.log('Request URL:', url, 'Method:', method);
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      console.log('Response status:', response.status);
      const result = await response.json();
      console.log('Response data:', result);

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

  const handleArticleSubmit = async (formData: ArticleFormData, isEdit: boolean) => {
    try {
      const method = isEdit ? 'PUT' : 'POST';
      const url = isEdit ? `${CONTENT_API}?type=articles&id=${formData.id}` : `${CONTENT_API}?type=articles`;
      
      const tagsArray = formData.tags.split(',').map(t => t.trim());
      
      await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          tags: tagsArray,
          views: formData.views || 0,
          likes: formData.likes || 0
        })
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

  return {
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
  };
};