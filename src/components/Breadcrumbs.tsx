import { Link, useLocation } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import { useEffect } from 'react';

interface BreadcrumbItem {
  label: string;
  path: string;
}

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);

  const breadcrumbNameMap: { [key: string]: string } = {
    'episodes': 'Эпизоды',
    'universes': 'Вселенные',
    'characters': 'Персонажи',
    'theories': 'Теории',
    'blog': 'Блог',
    'admin': 'Админка',
    'universe': 'Вселенная',
    'character': 'Персонаж',
    'theory': 'Теория',
    'episode': 'Эпизод',
    'post': 'Статья',
    'about': 'О сайте',
    'contact': 'Контакты'
  };

  if (pathnames.length === 0) {
    return null;
  }

  const breadcrumbs: BreadcrumbItem[] = [
    { label: 'Главная', path: '/' }
  ];

  pathnames.forEach((value, index) => {
    const path = `/${pathnames.slice(0, index + 1).join('/')}`;
    const label = breadcrumbNameMap[value] || value;
    
    if (!value.includes('-') || index === pathnames.length - 1) {
      breadcrumbs.push({ label, path });
    }
  });

  useEffect(() => {
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      'itemListElement': breadcrumbs.map((item, index) => ({
        '@type': 'ListItem',
        'position': index + 1,
        'name': item.label,
        'item': `${window.location.origin}${item.path}`
      }))
    };

    let scriptTag = document.querySelector('script[data-breadcrumb-schema="true"]');
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.setAttribute('type', 'application/ld+json');
      scriptTag.setAttribute('data-breadcrumb-schema', 'true');
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(structuredData);

    return () => {
      const existingScript = document.querySelector('script[data-breadcrumb-schema="true"]');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, [location.pathname]);

  return (
    <nav className="container mx-auto px-4 py-4" aria-label="Навигационная цепочка">
      <ol className="flex items-center gap-2 text-sm" itemScope itemType="https://schema.org/BreadcrumbList">
        {breadcrumbs.map((crumb, index) => (
          <li key={crumb.path} className="flex items-center gap-2" itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
            {index > 0 && (
              <Icon name="ChevronRight" size={16} className="text-gray-500" />
            )}
            {index === breadcrumbs.length - 1 ? (
              <>
                <span className="text-cyan-400 font-medium" itemProp="name">{crumb.label}</span>
                <meta itemProp="position" content={String(index + 1)} />
              </>
            ) : (
              <>
                <Link 
                  to={crumb.path} 
                  className="text-gray-400 hover:text-cyan-400 transition-colors"
                  itemProp="item"
                >
                  <span itemProp="name">{crumb.label}</span>
                </Link>
                <meta itemProp="position" content={String(index + 1)} />
              </>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;