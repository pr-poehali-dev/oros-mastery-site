import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    setTimeout(() => {
      if (formData.username === 'admin' && formData.password === 'rick137') {
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('adminUser', formData.username);
        navigate('/admin');
      } else {
        setError('Неверный логин или пароль');
        setIsLoading(false);
      }
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center px-4">
      <Navigation />
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500 rounded-full blur-[150px] opacity-20 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-green-500 rounded-full blur-[150px] opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <Card className="w-full max-w-md bg-gray-800/80 border-gray-700 backdrop-blur-xl shadow-2xl relative z-10">
        <CardHeader className="space-y-4">
          <div className="flex justify-center">
            <div className="bg-gradient-to-r from-cyan-500 to-green-500 p-4 rounded-2xl">
              <Icon name="Lock" size={48} className="text-white" />
            </div>
          </div>
          
          <div className="text-center">
            <CardTitle className="text-3xl font-bold text-white mb-2">
              Вход в админ-панель
            </CardTitle>
            <CardDescription className="text-gray-400">
              Введите данные для доступа к управлению
            </CardDescription>
          </div>

          <div className="flex justify-center gap-2">
            <Badge className="bg-cyan-400/20 text-cyan-400 border-cyan-400/50 text-xs">
              🔒 Защищённая зона
            </Badge>
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-white text-sm font-medium mb-2 block flex items-center gap-2">
                <Icon name="User" size={16} className="text-cyan-400" />
                Логин
              </label>
              <Input
                type="text"
                placeholder="Введите логин"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                required
                className="bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-500 focus:border-cyan-400 focus:ring-cyan-400"
                disabled={isLoading}
              />
            </div>

            <div>
              <label className="text-white text-sm font-medium mb-2 block flex items-center gap-2">
                <Icon name="KeyRound" size={16} className="text-cyan-400" />
                Пароль
              </label>
              <Input
                type="password"
                placeholder="Введите пароль"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
                className="bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-500 focus:border-cyan-400 focus:ring-cyan-400"
                disabled={isLoading}
              />
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-3 flex items-center gap-2 text-red-400 animate-shake">
                <Icon name="AlertCircle" size={18} />
                <span className="text-sm">{error}</span>
              </div>
            )}

            <Button 
              type="submit"
              className="w-full bg-gradient-to-r from-cyan-500 to-green-500 hover:from-cyan-600 hover:to-green-600 text-white font-semibold py-6 text-lg"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Icon name="Loader2" size={20} className="mr-2 animate-spin" />
                  Проверка...
                </>
              ) : (
                <>
                  <Icon name="LogIn" size={20} className="mr-2" />
                  Войти
                </>
              )}
            </Button>

            <div className="pt-4 border-t border-gray-700">
              <Button
                type="button"
                variant="ghost"
                className="w-full text-gray-400 hover:text-white"
                onClick={() => navigate('/')}
              >
                <Icon name="ArrowLeft" size={18} className="mr-2" />
                Вернуться на главную
              </Button>
            </div>
          </form>

          <div className="mt-6 p-4 bg-gray-700/30 rounded-lg border border-gray-600">
            <p className="text-xs text-gray-400 text-center mb-2">
              <Icon name="Info" size={14} className="inline mr-1" />
              Тестовые данные для входа:
            </p>
            <div className="flex flex-col gap-1 text-xs text-gray-300 font-mono">
              <div className="bg-gray-900/50 px-3 py-2 rounded">
                <span className="text-cyan-400">Логин:</span> admin
              </div>
              <div className="bg-gray-900/50 px-3 py-2 rounded">
                <span className="text-green-400">Пароль:</span> rick137
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;