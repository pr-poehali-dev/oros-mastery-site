import { useState, useEffect } from 'react';

const STORAGE_KEY = 'watched_episodes';

export interface WatchedEpisode {
  id: string;
  slug: string;
  title: string;
  season: number;
  episode: number;
  image: string;
  watchedAt: number;
}

export const useWatchedEpisodes = () => {
  const [watchedEpisodes, setWatchedEpisodes] = useState<WatchedEpisode[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setWatchedEpisodes(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to parse watched episodes', e);
      }
    }
  }, []);

  const markAsWatched = (episode: Omit<WatchedEpisode, 'watchedAt'>) => {
    setWatchedEpisodes((prev) => {
      const filtered = prev.filter((e) => e.id !== episode.id);
      const updated = [{ ...episode, watchedAt: Date.now() }, ...filtered].slice(0, 20);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const removeWatched = (id: string) => {
    setWatchedEpisodes((prev) => {
      const updated = prev.filter((e) => e.id !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const isWatched = (id: string) => {
    return watchedEpisodes.some((e) => e.id === id);
  };

  return {
    watchedEpisodes,
    markAsWatched,
    removeWatched,
    isWatched,
  };
};
