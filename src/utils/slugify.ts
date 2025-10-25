export const slugify = (text: string): string => {
  const translitMap: { [key: string]: string } = {
    'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'yo', 'ж': 'zh',
    'з': 'z', 'и': 'i', 'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n', 'о': 'o',
    'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u', 'ф': 'f', 'х': 'h', 'ц': 'ts',
    'ч': 'ch', 'ш': 'sh', 'щ': 'sch', 'ъ': '', 'ы': 'y', 'ь': '', 'э': 'e', 'ю': 'yu', 'я': 'ya'
  };

  return text
    .toLowerCase()
    .split('')
    .map(char => translitMap[char] || char)
    .join('')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .substring(0, 100);
};

export const generateSlug = (id: number, title: string): string => {
  return slugify(title);
};

// Extract episode info from title for URL routing
export const extractEpisodeInfo = (title: string): { season: number; episode: number } | null => {
  // Extract from format "Рик и Морти. 1 сезон 3 серия. ..."
  const match = title.match(/(\d+)\s*сезон\s*(\d+)\s*серия/i);
  if (match) {
    return { season: parseInt(match[1]), episode: parseInt(match[2]) };
  }
  return null;
};