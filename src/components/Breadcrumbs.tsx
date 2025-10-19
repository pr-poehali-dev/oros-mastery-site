import { Link, useLocation } from 'react-router-dom';
import Icon from '@/components/ui/icon';

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
    'post': 'Статья'
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

  return (
    <nav className="container mx-auto px-4 py-4">
      <ol className="flex items-center gap-2 text-sm">
        {breadcrumbs.map((crumb, index) => (
          <li key={crumb.path} className="flex items-center gap-2">
            {index > 0 && (
              <Icon name="ChevronRight" size={16} className="text-gray-500" />
            )}
            {index === breadcrumbs.length - 1 ? (
              <span className="text-cyan-400 font-medium">{crumb.label}</span>
            ) : (
              <Link 
                to={crumb.path} 
                className="text-gray-400 hover:text-cyan-400 transition-colors"
              >
                {crumb.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
