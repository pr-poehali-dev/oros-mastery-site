import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';

const AdminHeader = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/login');
  };

  return (
    <div className="mb-8">
      <Button 
        onClick={() => navigate('/')} 
        variant="ghost" 
        className="text-cyan-400 hover:text-cyan-300 mb-4"
      >
        <Icon name="ArrowLeft" size={20} className="mr-2" />
        На главную
      </Button>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="bg-gradient-to-r from-cyan-500 to-green-500 p-3 rounded-lg">
            <Icon name="Settings" size={32} className="text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-green-400">
              Панель администратора
            </h1>
            <p className="text-gray-400 mt-1">Управление контентом Рик и Морти</p>
          </div>
        </div>
        
        <Button 
          onClick={handleLogout}
          variant="outline" 
          className="border-red-500/50 text-red-400 hover:bg-red-500/10"
        >
          <Icon name="LogOut" size={18} className="mr-2" />
          Выйти
        </Button>
      </div>
    </div>
  );
};

export default AdminHeader;