import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    { path: '/', label: 'Главная', icon: 'Home' },
    { path: '/episodes', label: 'Эпизоды', icon: 'Film' },
    { path: '/universes', label: 'Вселенные', icon: 'Globe' },
    { path: '/characters', label: 'Персонажи', icon: 'Users' },
    { path: '/theories', label: 'Теории', icon: 'Lightbulb' },
    { path: '/blog', label: 'Блог', icon: 'BookOpen' }
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur-sm border-b border-cyan-500/30">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 group">
            <img 
              src="https://cdn.poehali.dev/projects/f9f23ac4-7352-47dd-a4bb-81301617dd90/files/6f97f817-22a0-4b87-bd11-3733b5f22ff6.jpg" 
              alt="Рик и Морти Logo"
              className="w-12 h-12 rounded-full object-cover group-hover:scale-110 transition-transform border-2 border-cyan-500"
            />
            <span className="text-xl font-bold text-cyan-400 hidden sm:block">
              Rick & Morty
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {menuItems.map((item) => (
              <Link key={item.path} to={item.path}>
                <Button
                  variant={isActive(item.path) ? 'default' : 'ghost'}
                  className={
                    isActive(item.path)
                      ? 'bg-gradient-to-r from-cyan-500 to-green-500 text-white'
                      : 'text-gray-300 hover:text-cyan-400'
                  }
                >
                  <Icon name={item.icon as any} size={18} className="mr-2" />
                  {item.label}
                </Button>
              </Link>
            ))}
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-cyan-400 hover:bg-cyan-500/10 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            <Icon name={isOpen ? 'X' : 'Menu'} size={24} />
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden py-4 border-t border-cyan-500/30">
            <div className="flex flex-col gap-2">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                >
                  <Button
                    variant={isActive(item.path) ? 'default' : 'ghost'}
                    className={`w-full justify-start ${
                      isActive(item.path)
                        ? 'bg-gradient-to-r from-cyan-500 to-green-500 text-white'
                        : 'text-gray-300 hover:text-cyan-400'
                    }`}
                  >
                    <Icon name={item.icon as any} size={18} className="mr-2" />
                    {item.label}
                  </Button>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;