import { useState } from 'react';
import { Episode } from '@/components/admin/EpisodeList';
import { EpisodeFormData } from '@/components/admin/EpisodeForm';

const EPISODES_API = 'https://functions.poehali.dev/031f0f01-3e0b-440b-a295-08f07c4d1389';

export const useEpisodesManager = () => {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [editingEpisode, setEditingEpisode] = useState<Episode | null>(null);

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

  return {
    episodes,
    editingEpisode,
    setEditingEpisode,
    fetchEpisodes,
    handleEpisodeSubmit,
    handleDeleteEpisode
  };
};
