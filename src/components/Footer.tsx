import { Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';

const Footer = () => {
  return (
    <footer className="bg-gray-900 border-t border-cyan-500/30 mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-green-500 flex items-center justify-center">
                <span className="text-2xl">🚀</span>
              </div>
              <span className="text-xl font-bold text-cyan-400">Rick & Morty</span>
            </div>
            <p className="text-gray-300 text-sm mb-4">
              Полный фан-сайт о сериале Rick and Morty. Эпизоды, теории, персонажи и многое другое.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 hover:bg-cyan-500/20 flex items-center justify-center text-cyan-400 transition-colors">
                <Icon name="Facebook" size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 hover:bg-cyan-500/20 flex items-center justify-center text-cyan-400 transition-colors">
                <Icon name="Twitter" size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 hover:bg-cyan-500/20 flex items-center justify-center text-cyan-400 transition-colors">
                <Icon name="Instagram" size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 hover:bg-cyan-500/20 flex items-center justify-center text-cyan-400 transition-colors">
                <Icon name="Youtube" size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
              <Icon name="Compass" size={18} className="text-cyan-400" />
              Навигация
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-cyan-400 transition-colors text-sm flex items-center gap-2">
                  <Icon name="Home" size={14} />
                  Главная
                </Link>
              </li>
              <li>
                <Link to="/episodes" className="text-gray-300 hover:text-cyan-400 transition-colors text-sm flex items-center gap-2">
                  <Icon name="Film" size={14} />
                  Эпизоды
                </Link>
              </li>
              <li>
                <Link to="/universes" className="text-gray-300 hover:text-cyan-400 transition-colors text-sm flex items-center gap-2">
                  <Icon name="Globe" size={14} />
                  Вселенные
                </Link>
              </li>
              <li>
                <Link to="/characters" className="text-gray-300 hover:text-cyan-400 transition-colors text-sm flex items-center gap-2">
                  <Icon name="Users" size={14} />
                  Персонажи
                </Link>
              </li>
              <li>
                <Link to="/theories" className="text-gray-300 hover:text-cyan-400 transition-colors text-sm flex items-center gap-2">
                  <Icon name="Lightbulb" size={14} />
                  Теории
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-300 hover:text-cyan-400 transition-colors text-sm flex items-center gap-2">
                  <Icon name="BookOpen" size={14} />
                  Блог
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
              <Icon name="Star" size={18} className="text-cyan-400" />
              Популярное
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/episode/2-pilot" className="text-gray-300 hover:text-cyan-400 transition-colors text-sm">
                  Pilot - S1E1
                </Link>
              </li>
              <li>
                <Link to="/episodes" className="text-gray-300 hover:text-cyan-400 transition-colors text-sm">
                  Все эпизоды
                </Link>
              </li>
              <li>
                <Link to="/blog/1-kak-multivselennaya-rabotaet-v-rick-and-morty-nauchnyy-podkhod" className="text-gray-300 hover:text-cyan-400 transition-colors text-sm">
                  Теория мультивселенной
                </Link>
              </li>
              <li>
                <Link to="/theories" className="text-gray-300 hover:text-cyan-400 transition-colors text-sm">
                  Теории фанатов
                </Link>
              </li>
              <li>
                <Link to="/characters" className="text-gray-300 hover:text-cyan-400 transition-colors text-sm">
                  Персонажи
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
              <Icon name="Info" size={18} className="text-cyan-400" />
              Информация
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-300 hover:text-cyan-400 transition-colors text-sm flex items-center gap-2">
                  <Icon name="Info" size={14} />
                  О сайте
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-cyan-400 transition-colors text-sm flex items-center gap-2">
                  <Icon name="Mail" size={14} />
                  Контакты
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-cyan-400 transition-colors text-sm flex items-center gap-2">
                  <Icon name="Shield" size={14} />
                  Политика конфиденциальности
                </a>
              </li>
              <li>
                <Link to="/login" className="text-gray-300 hover:text-cyan-400 transition-colors text-sm flex items-center gap-2">
                  <Icon name="Lock" size={14} />
                  Админ-панель
                </Link>
              </li>
            </ul>
            <div className="mt-6 p-4 bg-gradient-to-r from-cyan-900/20 to-green-900/20 border border-cyan-500/30 rounded-lg">
              <p className="text-cyan-400 text-xs font-semibold mb-1">Wubba Lubba Dub Dub!</p>
              <p className="text-gray-300 text-xs">
                Фан-сайт Rick and Morty © 2024
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-300 text-sm text-center md:text-left">
              © 2024 Rick and Morty Fan Site. Создано с помощью{' '}
              <a href="https://poehali.dev" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 transition-colors">
                poehali.dev
              </a>
            </p>
            <div className="flex items-center gap-4 text-gray-300 text-sm">
              <span className="flex items-center gap-1">
                <Icon name="Heart" size={14} className="text-red-400" />
                Сделано с любовью
              </span>
              <span className="flex items-center gap-1">
                <Icon name="Zap" size={14} className="text-yellow-400" />
                Powered by React
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;