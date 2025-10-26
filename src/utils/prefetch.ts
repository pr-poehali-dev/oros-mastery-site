// Prefetch утилиты для улучшения производительности

const prefetchedUrls = new Set<string>();

export const prefetchAPI = (url: string) => {
  if (prefetchedUrls.has(url)) return;
  
  prefetchedUrls.add(url);
  
  // Используем низкоприоритетный fetch для prefetch
  fetch(url, {
    priority: 'low',
    cache: 'force-cache'
  } as RequestInit).catch(() => {
    // Игнорируем ошибки prefetch
  });
};

export const prefetchRoute = (path: string) => {
  // Prefetch для динамических импортов роутов
  const routeMap: Record<string, () => Promise<any>> = {
    '/blog': () => import('../pages/Blog'),
    '/episodes': () => import('../pages/Episodes'),
    '/characters': () => import('../pages/Characters'),
    '/theories': () => import('../pages/Theories'),
    '/universes': () => import('../pages/Universes'),
    '/about': () => import('../pages/About'),
    '/contact': () => import('../pages/Contact'),
    '/shop': () => import('../pages/Shop'),
  };

  const loader = routeMap[path];
  if (loader) {
    loader().catch(() => {});
  }
};

// Автоматический prefetch при наведении на ссылки
export const setupLinkPrefetch = () => {
  if (typeof window === 'undefined') return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const link = entry.target as HTMLAnchorElement;
        const href = link.getAttribute('href');
        
        if (href && href.startsWith('/')) {
          prefetchRoute(href);
        }
      }
    });
  }, { rootMargin: '50px' });

  document.addEventListener('mouseover', (e) => {
    const target = e.target as HTMLElement;
    const link = target.closest('a');
    
    if (link && link.href && link.href.startsWith(window.location.origin)) {
      const path = new URL(link.href).pathname;
      prefetchRoute(path);
    }
  }, { passive: true });

  // Наблюдаем за всеми ссылками в viewport
  setTimeout(() => {
    document.querySelectorAll('a[href^="/"]').forEach(link => {
      observer.observe(link);
    });
  }, 1000);
};
