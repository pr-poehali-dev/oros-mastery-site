// Генератор уникальных изображений для статей на основе их заголовка
export const generateBlogImage = (title: string, id: number): string => {
  // Используем Picsum Photos с уникальным seed на основе заголовка и id
  const seed = `rick-morty-${id}-${title.replace(/\s+/g, '-').toLowerCase()}`;
  return `https://picsum.photos/seed/${encodeURIComponent(seed)}/800/450`;
};

// Альтернативные изображения для разных категорий
const categoryImages: Record<string, string> = {
  'theory': 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800&h=450&fit=crop',
  'episodes': 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&h=450&fit=crop',
  'characters': 'https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=800&h=450&fit=crop',
  'easter-eggs': 'https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=800&h=450&fit=crop',
  'philosophy': 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=450&fit=crop',
  'science': 'https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?w=800&h=450&fit=crop',
};

export const getBlogImage = (category: string, id: number, title: string): string => {
  // Используем категорийное изображение если доступно, иначе генерируем уникальное
  return categoryImages[category] || generateBlogImage(title, id);
};
