const API_URLS = {
  episodes: 'https://functions.poehali.dev/031f0f01-3e0b-440b-a295-08f07c4d1389',
  blog: 'https://functions.poehali.dev/833cc9a4-513a-4d22-a390-4878941c0d71'
};

export const api = {
  // Episodes
  async getEpisodes(season?: number) {
    const url = season ? `${API_URLS.episodes}?season=${season}` : API_URLS.episodes;
    const response = await fetch(url);
    return response.json();
  },

  async createEpisode(episode: any) {
    const response = await fetch(API_URLS.episodes, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(episode)
    });
    return response.json();
  },

  async deleteEpisode(id: number) {
    const response = await fetch(`${API_URLS.episodes}?id=${id}`, {
      method: 'DELETE'
    });
    return response.json();
  },

  // Blog
  async getBlogPosts() {
    const response = await fetch(API_URLS.blog);
    return response.json();
  },

  async getBlogPost(id: number) {
    const response = await fetch(`${API_URLS.blog}?id=${id}`);
    return response.json();
  },

  async createComment(comment: any) {
    const response = await fetch(API_URLS.blog, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.dumps({ ...comment, type: 'comment' })
    });
    return response.json();
  }
};
