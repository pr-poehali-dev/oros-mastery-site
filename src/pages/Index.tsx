import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import SEO from '@/components/SEO';

const Index = () => {
  const [phone, setPhone] = useState('');

  const formatPhone = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length === 0) return '';
    if (cleaned.length <= 1) return `+${cleaned}`;
    if (cleaned.length <= 4) return `+${cleaned.slice(0, 1)} (${cleaned.slice(1)}`;
    if (cleaned.length <= 7) return `+${cleaned.slice(0, 1)} (${cleaned.slice(1, 4)}) ${cleaned.slice(4)}`;
    if (cleaned.length <= 9) return `+${cleaned.slice(0, 1)} (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7)}`;
    return `+${cleaned.slice(0, 1)} (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7, 9)}-${cleaned.slice(9, 11)}`;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value);
    setPhone(formatted);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Phone submitted:', phone);
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="0101.studio - Digital маркетинговое агентство | Продвижение бизнеса"
        description="Профессиональное маркетинговое агентство полного цикла. Увеличим вашу выручку на 300%, снизим CPL на 50%. Стратегия, аналитика, результат."
        keywords="маркетинговое агентство, digital marketing, продвижение бизнеса, реклама, CPL, стратегия продвижения, performance marketing"
        url="https://rick-and-morty.poehali.dev/"
      />

      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg"></div>
            <span className="text-foreground">0101<span className="text-primary">.studio</span></span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <a href="#about" className="text-muted-foreground hover:text-primary transition-colors">О нас</a>
            <a href="#services" className="text-muted-foreground hover:text-primary transition-colors">Услуги</a>
            <a href="#process" className="text-muted-foreground hover:text-primary transition-colors">Процесс</a>
            <a href="#cases" className="text-muted-foreground hover:text-primary transition-colors">Кейсы</a>
            <a href="#team" className="text-muted-foreground hover:text-primary transition-colors">Команда</a>
            <a href="#pricing" className="text-muted-foreground hover:text-primary transition-colors">Цены</a>
            <a href="#reviews" className="text-muted-foreground hover:text-primary transition-colors">Отзывы</a>
          </div>
          <Button asChild className="bg-gradient-to-r from-primary to-secondary text-background hover:opacity-90">
            <a href="#contact">Связаться</a>
          </Button>
        </div>
      </nav>

      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary/10"></div>
        <div className="absolute inset-0 bg-[url('https://cdn.poehali.dev/projects/f9f23ac4-7352-47dd-a4bb-81301617dd90/files/2b949fc0-1e40-40c9-8a2a-12b8a724de22.jpg')] opacity-10 bg-cover bg-center"></div>
        
        <div className="container mx-auto relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block px-4 py-2 bg-primary/10 border border-primary/30 rounded-full mb-6 backdrop-blur-sm">
              <span className="text-primary font-semibold">🚀 Performance Marketing Agency</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent animate-fade-in">
              Превращаем клики
              <br />
              в продажи
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Комплексное digital-продвижение с гарантией результата. Работаем на рост вашей прибыли, а не просто показов.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button size="lg" asChild className="text-lg px-8 py-6 bg-gradient-to-r from-primary to-secondary text-background hover:opacity-90">
                <a href="#contact">Получить стратегию</a>
              </Button>
              <Button size="lg" variant="outline" asChild className="text-lg px-8 py-6 border-primary/50 text-foreground hover:bg-primary/10">
                <a href="#cases">Кейсы (↑320%)</a>
              </Button>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
              <Card className="p-4 bg-card/50 backdrop-blur-sm border-border/50">
                <div className="text-3xl font-bold text-primary mb-1">320%</div>
                <div className="text-sm text-muted-foreground">Рост выручки</div>
              </Card>
              <Card className="p-4 bg-card/50 backdrop-blur-sm border-border/50">
                <div className="text-3xl font-bold text-secondary mb-1">-50%</div>
                <div className="text-sm text-muted-foreground">Снижение CPL</div>
              </Card>
              <Card className="p-4 bg-card/50 backdrop-blur-sm border-border/50">
                <div className="text-3xl font-bold text-primary mb-1">150+</div>
                <div className="text-sm text-muted-foreground">Клиентов</div>
              </Card>
              <Card className="p-4 bg-card/50 backdrop-blur-sm border-border/50">
                <div className="text-3xl font-bold text-secondary mb-1">5 лет</div>
                <div className="text-sm text-muted-foreground">На рынке</div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="py-20 px-4 bg-card/30">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block px-4 py-2 bg-primary/10 border border-primary/30 rounded-full mb-6">
                <span className="text-primary font-semibold">О компании</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
                Мы не делаем "просто рекламу"
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                0101.studio — это команда экспертов в performance-маркетинге. Мы создаем системы привлечения клиентов, которые масштабируются и приносят стабильную прибыль.
              </p>
              <p className="text-lg text-muted-foreground mb-8">
                Наш подход основан на глубокой аналитике, A/B тестировании и постоянной оптимизации. Каждый рубль вашего бюджета работает на максимум.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Icon name="Target" className="text-primary" size={20} />
                  </div>
                  <div>
                    <div className="font-semibold mb-1 text-foreground">Фокус на ROI</div>
                    <div className="text-muted-foreground">Работаем только на результат, который можно измерить</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center flex-shrink-0">
                    <Icon name="TrendingUp" className="text-secondary" size={20} />
                  </div>
                  <div>
                    <div className="font-semibold mb-1 text-foreground">Прозрачность</div>
                    <div className="text-muted-foreground">Полная отчетность и доступ к аналитике в реальном времени</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Icon name="Zap" className="text-primary" size={20} />
                  </div>
                  <div>
                    <div className="font-semibold mb-1 text-foreground">Скорость</div>
                    <div className="text-muted-foreground">Первые результаты уже через 2 недели после запуска</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden border-2 border-primary/20">
                <img 
                  src="https://cdn.poehali.dev/files/fa0ac5d4-ae70-4eb5-b09c-8b45c77da06e.png" 
                  alt="Digital Marketing" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-primary to-secondary rounded-2xl blur-3xl opacity-30"></div>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-primary/10 border border-primary/30 rounded-full mb-6">
              <span className="text-primary font-semibold">Услуги</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">Полный спектр digital-услуг</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Все инструменты для привлечения и удержания клиентов под одной крышей
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            <Card className="p-6 bg-card/50 backdrop-blur-sm border-primary/30 hover:border-primary transition-all group">
              <div className="w-14 h-14 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Icon name="Megaphone" className="text-background" size={28} />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-foreground">Контекстная реклама</h3>
              <p className="text-muted-foreground mb-4">
                Настройка и ведение рекламы в Яндекс.Директ и Google Ads с постоянной оптимизацией ставок и объявлений.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Icon name="Check" className="text-primary" size={16} />
                  <span>Поиск + РСЯ / КМС</span>
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="Check" className="text-primary" size={16} />
                  <span>Смарт-кампании и автостратегии</span>
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="Check" className="text-primary" size={16} />
                  <span>Ремаркетинг и ретаргетинг</span>
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="Check" className="text-primary" size={16} />
                  <span>Performance Max кампании</span>
                </li>
              </ul>
            </Card>

            <Card className="p-6 bg-card/50 backdrop-blur-sm border-secondary/30 hover:border-secondary transition-all group">
              <div className="w-14 h-14 bg-gradient-to-br from-secondary to-primary rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Icon name="Search" className="text-background" size={28} />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-foreground">SEO & Контент</h3>
              <p className="text-muted-foreground mb-4">
                Продвижение в поисковых системах и создание контента, который продает и привлекает органический трафик.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Icon name="Check" className="text-secondary" size={16} />
                  <span>Технический и коммерческий SEO</span>
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="Check" className="text-secondary" size={16} />
                  <span>Контент-маркетинг</span>
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="Check" className="text-secondary" size={16} />
                  <span>Ссылочное продвижение</span>
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="Check" className="text-secondary" size={16} />
                  <span>E-A-T оптимизация</span>
                </li>
              </ul>
            </Card>

            <Card className="p-6 bg-card/50 backdrop-blur-sm border-primary/30 hover:border-primary transition-all group">
              <div className="w-14 h-14 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Icon name="BarChart3" className="text-background" size={28} />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-foreground">Аналитика & CRO</h3>
              <p className="text-muted-foreground mb-4">
                Глубокая аналитика поведения пользователей и оптимизация конверсии на каждом этапе воронки.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Icon name="Check" className="text-primary" size={16} />
                  <span>Веб-аналитика (Метрика, GA4)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="Check" className="text-primary" size={16} />
                  <span>Тепловые карты и сессии</span>
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="Check" className="text-primary" size={16} />
                  <span>CRO и UX-аудит</span>
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="Check" className="text-primary" size={16} />
                  <span>A/B тестирование</span>
                </li>
              </ul>
            </Card>

            <Card className="p-6 bg-card/50 backdrop-blur-sm border-secondary/30 hover:border-secondary transition-all group">
              <div className="w-14 h-14 bg-gradient-to-br from-secondary to-primary rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Icon name="Users" className="text-background" size={28} />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-foreground">SMM & Community</h3>
              <p className="text-muted-foreground mb-4">
                Управление соцсетями, создание вовлекающего контента и построение лояльного сообщества вокруг бренда.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Icon name="Check" className="text-secondary" size={16} />
                  <span>Контент-план и оформление</span>
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="Check" className="text-secondary" size={16} />
                  <span>Таргетированная реклама</span>
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="Check" className="text-secondary" size={16} />
                  <span>Работа с блогерами</span>
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="Check" className="text-secondary" size={16} />
                  <span>Модерация и комьюнити-менеджмент</span>
                </li>
              </ul>
            </Card>

            <Card className="p-6 bg-card/50 backdrop-blur-sm border-primary/30 hover:border-primary transition-all group">
              <div className="w-14 h-14 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Icon name="Mail" className="text-background" size={28} />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-foreground">Email & CRM</h3>
              <p className="text-muted-foreground mb-4">
                Email-маркетинг, автоворонки и CRM-маркетинг для повышения LTV и удержания клиентов.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Icon name="Check" className="text-primary" size={16} />
                  <span>Triggered-цепочки писем</span>
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="Check" className="text-primary" size={16} />
                  <span>Сегментация базы</span>
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="Check" className="text-primary" size={16} />
                  <span>Реактивация клиентов</span>
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="Check" className="text-primary" size={16} />
                  <span>Интеграция с CRM</span>
                </li>
              </ul>
            </Card>

            <Card className="p-6 bg-card/50 backdrop-blur-sm border-secondary/30 hover:border-secondary transition-all group">
              <div className="w-14 h-14 bg-gradient-to-br from-secondary to-primary rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Icon name="Lightbulb" className="text-background" size={28} />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-foreground">Стратегия & Консалтинг</h3>
              <p className="text-muted-foreground mb-4">
                Разработка маркетинговой стратегии, аудит текущих активностей и консультации по росту бизнеса.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Icon name="Check" className="text-secondary" size={16} />
                  <span>Маркетинговый аудит</span>
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="Check" className="text-secondary" size={16} />
                  <span>Стратегия продвижения</span>
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="Check" className="text-secondary" size={16} />
                  <span>Анализ конкурентов</span>
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="Check" className="text-secondary" size={16} />
                  <span>Unit-экономика и ROI расчёт</span>
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      <section id="process" className="py-20 px-4 bg-card/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-primary/10 border border-primary/30 rounded-full mb-6">
              <span className="text-primary font-semibold">Процесс работы</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">Как мы работаем</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Прозрачная методология от первого касания до масштабирования
            </p>
          </div>

          <div className="space-y-8">
            <Card className="p-6 bg-card/50 backdrop-blur-sm border-primary/30 hover:border-primary transition-all">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl font-bold text-background">1</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-2 text-foreground">Аудит и анализ</h3>
                  <p className="text-muted-foreground mb-4">
                    Глубокий анализ вашего бизнеса, целевой аудитории, конкурентов и текущих каналов привлечения. Изучаем unit-экономику, LTV, CAC и точки роста.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">Анализ ЦА</span>
                    <span className="px-3 py-1 bg-secondary/10 text-secondary rounded-full text-sm">Конкурентный анализ</span>
                    <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">Технический аудит</span>
                    <span className="px-3 py-1 bg-secondary/10 text-secondary rounded-full text-sm">Unit-экономика</span>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-card/50 backdrop-blur-sm border-secondary/30 hover:border-secondary transition-all">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-secondary to-primary rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl font-bold text-background">2</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-2 text-foreground">Стратегия и план</h3>
                  <p className="text-muted-foreground mb-4">
                    Разрабатываем комплексную стратегию продвижения с четкими KPI, бюджетами и сроками. Определяем приоритетные каналы и точки контакта с аудиторией.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-secondary/10 text-secondary rounded-full text-sm">Медиаплан</span>
                    <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">KPI дашборд</span>
                    <span className="px-3 py-1 bg-secondary/10 text-secondary rounded-full text-sm">Бюджетирование</span>
                    <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">Воронка продаж</span>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-card/50 backdrop-blur-sm border-primary/30 hover:border-primary transition-all">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl font-bold text-background">3</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-2 text-foreground">Запуск кампаний</h3>
                  <p className="text-muted-foreground mb-4">
                    Настраиваем рекламные кампании, устанавливаем аналитику, создаем креативы и лендинги. Запускаем в тестовом режиме с небольшим бюджетом.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">Настройка кампаний</span>
                    <span className="px-3 py-1 bg-secondary/10 text-secondary rounded-full text-sm">Создание креативов</span>
                    <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">Установка аналитики</span>
                    <span className="px-3 py-1 bg-secondary/10 text-secondary rounded-full text-sm">Тестирование</span>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-card/50 backdrop-blur-sm border-secondary/30 hover:border-secondary transition-all">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-secondary to-primary rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl font-bold text-background">4</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-2 text-foreground">Оптимизация</h3>
                  <p className="text-muted-foreground mb-4">
                    Ежедневный мониторинг результатов, корректировка ставок, отключение неэффективных связок. Проводим A/B тесты креативов, посадочных и аудиторий.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-secondary/10 text-secondary rounded-full text-sm">A/B тестирование</span>
                    <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">Оптимизация ставок</span>
                    <span className="px-3 py-1 bg-secondary/10 text-secondary rounded-full text-sm">Анализ данных</span>
                    <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">Корректировки</span>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-card/50 backdrop-blur-sm border-primary/30 hover:border-primary transition-all">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl font-bold text-background">5</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-2 text-foreground">Масштабирование</h3>
                  <p className="text-muted-foreground mb-4">
                    После достижения целевых показателей увеличиваем бюджеты, добавляем новые каналы и форматы. Масштабируем только то, что доказало свою эффективность.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">Рост бюджета</span>
                    <span className="px-3 py-1 bg-secondary/10 text-secondary rounded-full text-sm">Новые каналы</span>
                    <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">Автоматизация</span>
                    <span className="px-3 py-1 bg-secondary/10 text-secondary rounded-full text-sm">Стабильный рост</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section id="cases" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-primary/10 border border-primary/30 rounded-full mb-6">
              <span className="text-primary font-semibold">Наши работы</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">Кейсы и результаты</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Реальные цифры от реальных клиентов
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            <Card className="group relative overflow-hidden bg-card/50 backdrop-blur-sm border-primary/30 hover:border-primary transition-all cursor-pointer">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src="https://cdn.poehali.dev/files/e8995be7-4bf8-47fe-a47d-eb26d35c2270.png" 
                  alt="Недвижимость" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent"></div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="inline-block px-3 py-1 bg-primary/20 backdrop-blur-sm rounded-full text-xs text-primary mb-3">
                  Недвижимость
                </div>
                <h3 className="text-xl font-bold mb-2 text-foreground">Застройщик элитной недвижимости</h3>
                <div className="flex items-center gap-4 mb-3">
                  <div>
                    <div className="text-2xl font-bold text-primary">320%</div>
                    <div className="text-xs text-muted-foreground">Рост заявок</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-secondary">-45%</div>
                    <div className="text-xs text-muted-foreground">CPL</div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Комплексный маркетинг: контекст + таргет + SEO. Срок: 6 месяцев
                </p>
              </div>
            </Card>

            <Card className="group relative overflow-hidden bg-card/50 backdrop-blur-sm border-secondary/30 hover:border-secondary transition-all cursor-pointer">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src="https://cdn.poehali.dev/files/d26cae92-e2e6-42b1-affd-e0c44ec5fc1e.png" 
                  alt="E-commerce" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent"></div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="inline-block px-3 py-1 bg-secondary/20 backdrop-blur-sm rounded-full text-xs text-secondary mb-3">
                  E-commerce
                </div>
                <h3 className="text-xl font-bold mb-2 text-foreground">Интернет-магазин косметики</h3>
                <div className="flex items-center gap-4 mb-3">
                  <div>
                    <div className="text-2xl font-bold text-secondary">+250%</div>
                    <div className="text-xs text-muted-foreground">Рост продаж</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">ROAS 4.2</div>
                    <div className="text-xs text-muted-foreground">Окупаемость</div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Performance Max + Shopping + Email-маркетинг. Срок: 4 месяца
                </p>
              </div>
            </Card>

            <Card className="group relative overflow-hidden bg-card/50 backdrop-blur-sm border-primary/30 hover:border-primary transition-all cursor-pointer">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src="https://cdn.poehali.dev/files/8dea89f4-99dd-421c-94f4-f7f8c0a07ad9.png" 
                  alt="B2B" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent"></div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="inline-block px-3 py-1 bg-primary/20 backdrop-blur-sm rounded-full text-xs text-primary mb-3">
                  B2B
                </div>
                <h3 className="text-xl font-bold mb-2 text-foreground">IT-решения для бизнеса</h3>
                <div className="flex items-center gap-4 mb-3">
                  <div>
                    <div className="text-2xl font-bold text-primary">180%</div>
                    <div className="text-xs text-muted-foreground">Рост лидов</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-secondary">-52%</div>
                    <div className="text-xs text-muted-foreground">CAC</div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  LinkedIn Ads + контент-маркетинг + CRM-интеграция. Срок: 8 месяцев
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section id="team" className="py-20 px-4 bg-card/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-primary/10 border border-primary/30 rounded-full mb-6">
              <span className="text-primary font-semibold">Команда</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">Эксперты в своих областях</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Над вашим проектом работает команда из 6-8 специалистов
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6 text-center bg-card/50 backdrop-blur-sm border-primary/30 hover:border-primary transition-all group">
              <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Icon name="Target" className="text-background" size={32} />
              </div>
              <h3 className="text-lg font-bold mb-2 text-foreground">Performance-маркетолог</h3>
              <p className="text-sm text-muted-foreground">
                Стратегия, планирование, координация всех каналов
              </p>
            </Card>

            <Card className="p-6 text-center bg-card/50 backdrop-blur-sm border-secondary/30 hover:border-secondary transition-all group">
              <div className="w-20 h-20 bg-gradient-to-br from-secondary to-primary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Icon name="MousePointerClick" className="text-background" size={32} />
              </div>
              <h3 className="text-lg font-bold mb-2 text-foreground">PPC-специалист</h3>
              <p className="text-sm text-muted-foreground">
                Настройка и оптимизация рекламных кампаний
              </p>
            </Card>

            <Card className="p-6 text-center bg-card/50 backdrop-blur-sm border-primary/30 hover:border-primary transition-all group">
              <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Icon name="Search" className="text-background" size={32} />
              </div>
              <h3 className="text-lg font-bold mb-2 text-foreground">SEO-специалист</h3>
              <p className="text-sm text-muted-foreground">
                Техническая оптимизация и продвижение в поиске
              </p>
            </Card>

            <Card className="p-6 text-center bg-card/50 backdrop-blur-sm border-secondary/30 hover:border-secondary transition-all group">
              <div className="w-20 h-20 bg-gradient-to-br from-secondary to-primary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Icon name="PenTool" className="text-background" size={32} />
              </div>
              <h3 className="text-lg font-bold mb-2 text-foreground">Дизайнер</h3>
              <p className="text-sm text-muted-foreground">
                Креативы, баннеры, лендинги, UI/UX
              </p>
            </Card>

            <Card className="p-6 text-center bg-card/50 backdrop-blur-sm border-primary/30 hover:border-primary transition-all group">
              <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Icon name="FileText" className="text-background" size={32} />
              </div>
              <h3 className="text-lg font-bold mb-2 text-foreground">Копирайтер</h3>
              <p className="text-sm text-muted-foreground">
                Продающие тексты, контент для сайта и соцсетей
              </p>
            </Card>

            <Card className="p-6 text-center bg-card/50 backdrop-blur-sm border-secondary/30 hover:border-secondary transition-all group">
              <div className="w-20 h-20 bg-gradient-to-br from-secondary to-primary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Icon name="BarChart3" className="text-background" size={32} />
              </div>
              <h3 className="text-lg font-bold mb-2 text-foreground">Аналитик</h3>
              <p className="text-sm text-muted-foreground">
                Настройка систем аналитики, отчёты, insights
              </p>
            </Card>

            <Card className="p-6 text-center bg-card/50 backdrop-blur-sm border-primary/30 hover:border-primary transition-all group">
              <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Icon name="Code" className="text-background" size={32} />
              </div>
              <h3 className="text-lg font-bold mb-2 text-foreground">Разработчик</h3>
              <p className="text-sm text-muted-foreground">
                Технические доработки, интеграции, автоматизация
              </p>
            </Card>

            <Card className="p-6 text-center bg-card/50 backdrop-blur-sm border-secondary/30 hover:border-secondary transition-all group">
              <div className="w-20 h-20 bg-gradient-to-br from-secondary to-primary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Icon name="Users" className="text-background" size={32} />
              </div>
              <h3 className="text-lg font-bold mb-2 text-foreground">Менеджер проекта</h3>
              <p className="text-sm text-muted-foreground">
                Координация команды, контроль сроков и качества
              </p>
            </Card>
          </div>
        </div>
      </section>

      <section id="pricing" className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-primary/10 border border-primary/30 rounded-full mb-6">
              <span className="text-primary font-semibold">Тарифы</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">Прозрачное ценообразование</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Выберите пакет услуг под ваши цели и бюджет
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all">
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2 text-foreground">Старт</h3>
                <p className="text-muted-foreground mb-4">Для малого бизнеса и стартапов</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-foreground">от 50 000₽</span>
                  <span className="text-muted-foreground">/мес</span>
                </div>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2 text-muted-foreground">
                  <Icon name="Check" className="text-primary flex-shrink-0 mt-0.5" size={20} />
                  <span>1-2 канала привлечения</span>
                </li>
                <li className="flex items-start gap-2 text-muted-foreground">
                  <Icon name="Check" className="text-primary flex-shrink-0 mt-0.5" size={20} />
                  <span>До 100 000₽ рекламного бюджета</span>
                </li>
                <li className="flex items-start gap-2 text-muted-foreground">
                  <Icon name="Check" className="text-primary flex-shrink-0 mt-0.5" size={20} />
                  <span>Базовая аналитика и отчёты</span>
                </li>
                <li className="flex items-start gap-2 text-muted-foreground">
                  <Icon name="Check" className="text-primary flex-shrink-0 mt-0.5" size={20} />
                  <span>2 креатива/месяц</span>
                </li>
                <li className="flex items-start gap-2 text-muted-foreground">
                  <Icon name="Check" className="text-primary flex-shrink-0 mt-0.5" size={20} />
                  <span>Техподдержка в рабочее время</span>
                </li>
              </ul>
              <Button asChild className="w-full bg-gradient-to-r from-primary to-secondary text-background hover:opacity-90">
                <a href="#contact">Выбрать</a>
              </Button>
            </Card>

            <Card className="p-6 bg-card/50 backdrop-blur-sm border-primary shadow-xl shadow-primary/20 scale-105 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-primary to-secondary rounded-full text-sm font-semibold text-background">
                Популярный
              </div>
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2 text-foreground">Рост</h3>
                <p className="text-muted-foreground mb-4">Для растущего бизнеса</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-foreground">от 120 000₽</span>
                  <span className="text-muted-foreground">/мес</span>
                </div>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2 text-muted-foreground">
                  <Icon name="Check" className="text-primary flex-shrink-0 mt-0.5" size={20} />
                  <span>3-4 канала привлечения</span>
                </li>
                <li className="flex items-start gap-2 text-muted-foreground">
                  <Icon name="Check" className="text-primary flex-shrink-0 mt-0.5" size={20} />
                  <span>До 500 000₽ рекламного бюджета</span>
                </li>
                <li className="flex items-start gap-2 text-muted-foreground">
                  <Icon name="Check" className="text-primary flex-shrink-0 mt-0.5" size={20} />
                  <span>Продвинутая аналитика + CRO</span>
                </li>
                <li className="flex items-start gap-2 text-muted-foreground">
                  <Icon name="Check" className="text-primary flex-shrink-0 mt-0.5" size={20} />
                  <span>5 креативов/месяц</span>
                </li>
                <li className="flex items-start gap-2 text-muted-foreground">
                  <Icon name="Check" className="text-primary flex-shrink-0 mt-0.5" size={20} />
                  <span>Персональный менеджер 24/7</span>
                </li>
                <li className="flex items-start gap-2 text-muted-foreground">
                  <Icon name="Check" className="text-primary flex-shrink-0 mt-0.5" size={20} />
                  <span>SEO + контент-маркетинг</span>
                </li>
              </ul>
              <Button asChild className="w-full bg-gradient-to-r from-primary to-secondary text-background hover:opacity-90">
                <a href="#contact">Выбрать</a>
              </Button>
            </Card>

            <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50 hover:border-secondary/30 transition-all">
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2 text-foreground">Масштаб</h3>
                <p className="text-muted-foreground mb-4">Для крупного бизнеса</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-foreground">от 300 000₽</span>
                  <span className="text-muted-foreground">/мес</span>
                </div>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2 text-muted-foreground">
                  <Icon name="Check" className="text-secondary flex-shrink-0 mt-0.5" size={20} />
                  <span>Все доступные каналы</span>
                </li>
                <li className="flex items-start gap-2 text-muted-foreground">
                  <Icon name="Check" className="text-secondary flex-shrink-0 mt-0.5" size={20} />
                  <span>Без ограничений по бюджету</span>
                </li>
                <li className="flex items-start gap-2 text-muted-foreground">
                  <Icon name="Check" className="text-secondary flex-shrink-0 mt-0.5" size={20} />
                  <span>BI-дашборды + прогнозирование</span>
                </li>
                <li className="flex items-start gap-2 text-muted-foreground">
                  <Icon name="Check" className="text-secondary flex-shrink-0 mt-0.5" size={20} />
                  <span>Неограниченные креативы</span>
                </li>
                <li className="flex items-start gap-2 text-muted-foreground">
                  <Icon name="Check" className="text-secondary flex-shrink-0 mt-0.5" size={20} />
                  <span>Выделенная команда</span>
                </li>
                <li className="flex items-start gap-2 text-muted-foreground">
                  <Icon name="Check" className="text-secondary flex-shrink-0 mt-0.5" size={20} />
                  <span>Стратегический консалтинг</span>
                </li>
                <li className="flex items-start gap-2 text-muted-foreground">
                  <Icon name="Check" className="text-secondary flex-shrink-0 mt-0.5" size={20} />
                  <span>Кастомные разработки</span>
                </li>
              </ul>
              <Button asChild className="w-full bg-gradient-to-r from-primary to-secondary text-background hover:opacity-90">
                <a href="#contact">Выбрать</a>
              </Button>
            </Card>
          </div>
        </div>
      </section>

      <section id="reviews" className="py-20 px-4 bg-card/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-primary/10 border border-primary/30 rounded-full mb-6">
              <span className="text-primary font-semibold">Отзывы</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">Что говорят клиенты</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Честные отзывы о нашей работе
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="p-6 bg-card/50 backdrop-blur-sm border-primary/30">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                  <span className="text-lg font-bold text-background">АС</span>
                </div>
                <div>
                  <div className="font-semibold text-foreground">Алексей Смирнов</div>
                  <div className="text-sm text-muted-foreground">CEO, TechCorp</div>
                </div>
              </div>
              <div className="flex gap-1 mb-3">
                {[1,2,3,4,5].map(i => <Icon key={i} name="Star" className="text-primary fill-primary" size={16} />)}
              </div>
              <p className="text-muted-foreground">
                "За 4 месяца работы увеличили поток лидов в 3 раза при том же бюджете. Команда действительно понимает, что делает. Особенно радует прозрачная аналитика."
              </p>
            </Card>

            <Card className="p-6 bg-card/50 backdrop-blur-sm border-secondary/30">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-secondary to-primary rounded-full flex items-center justify-center">
                  <span className="text-lg font-bold text-background">МК</span>
                </div>
                <div>
                  <div className="font-semibold text-foreground">Мария Ковалева</div>
                  <div className="text-sm text-muted-foreground">Маркетолог, BeautyShop</div>
                </div>
              </div>
              <div className="flex gap-1 mb-3">
                {[1,2,3,4,5].map(i => <Icon key={i} name="Star" className="text-secondary fill-secondary" size={16} />)}
              </div>
              <p className="text-muted-foreground">
                "Отличный результат по e-commerce! ROAS вырос с 1.8 до 4.2. Ребята постоянно тестируют новые гипотезы и находят точки роста. Рекомендую!"
              </p>
            </Card>

            <Card className="p-6 bg-card/50 backdrop-blur-sm border-primary/30">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                  <span className="text-lg font-bold text-background">ДП</span>
                </div>
                <div>
                  <div className="font-semibold text-foreground">Дмитрий Петров</div>
                  <div className="text-sm text-muted-foreground">Директор, ProEstate</div>
                </div>
              </div>
              <div className="flex gap-1 mb-3">
                {[1,2,3,4,5].map(i => <Icon key={i} name="Star" className="text-primary fill-primary" size={16} />)}
              </div>
              <p className="text-muted-foreground">
                "Работаем уже 8 месяцев. Стоимость заявки снизилась вдвое, качество лидов выросло. Профессиональный подход на всех этапах."
              </p>
            </Card>
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-2 bg-primary/10 border border-primary/30 rounded-full mb-6">
              <span className="text-primary font-semibold">Контакты</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">Готовы начать?</h2>
            <p className="text-xl text-muted-foreground">
              Оставьте заявку и получите бесплатный аудит вашего маркетинга
            </p>
          </div>

          <Card className="p-8 bg-card/50 backdrop-blur-sm border-primary/30">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2 text-foreground">Ваше имя</label>
                <Input 
                  type="text" 
                  placeholder="Иван Иванов" 
                  className="w-full bg-background/50 border-border text-foreground"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2 text-foreground">Телефон</label>
                <Input 
                  type="tel" 
                  value={phone}
                  onChange={handlePhoneChange}
                  placeholder="+7 (___) ___-__-__" 
                  className="w-full bg-background/50 border-border text-foreground"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-foreground">Email</label>
                <Input 
                  type="email" 
                  placeholder="ivan@company.ru" 
                  className="w-full bg-background/50 border-border text-foreground"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-foreground">Ваш бизнес</label>
                <Input 
                  type="text" 
                  placeholder="Чем занимаетесь?" 
                  className="w-full bg-background/50 border-border text-foreground"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-foreground">Рекламный бюджет (мес.)</label>
                <select className="w-full px-4 py-2 rounded-lg bg-background/50 border border-border text-foreground">
                  <option>До 100 000₽</option>
                  <option>100 000 - 300 000₽</option>
                  <option>300 000 - 500 000₽</option>
                  <option>Более 500 000₽</option>
                </select>
              </div>

              <Button type="submit" className="w-full text-lg py-6 bg-gradient-to-r from-primary to-secondary text-background hover:opacity-90">
                Получить бесплатный аудит
              </Button>
              
              <p className="text-xs text-center text-muted-foreground">
                Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
              </p>
            </form>
          </Card>
        </div>
      </section>

      <footer className="bg-card/50 border-t border-border/50 py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <Link to="/" className="text-2xl font-bold flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg"></div>
                <span className="text-foreground">0101<span className="text-primary">.studio</span></span>
              </Link>
              <p className="text-muted-foreground text-sm">
                Performance-маркетинг с гарантией результата
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-foreground">Услуги</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#services" className="hover:text-primary transition-colors">Контекстная реклама</a></li>
                <li><a href="#services" className="hover:text-primary transition-colors">SEO продвижение</a></li>
                <li><a href="#services" className="hover:text-primary transition-colors">SMM</a></li>
                <li><a href="#services" className="hover:text-primary transition-colors">Аналитика</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-foreground">Компания</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#about" className="hover:text-primary transition-colors">О нас</a></li>
                <li><a href="#cases" className="hover:text-primary transition-colors">Кейсы</a></li>
                <li><a href="#team" className="hover:text-primary transition-colors">Команда</a></li>
                <li><a href="#reviews" className="hover:text-primary transition-colors">Отзывы</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-foreground">Контакты</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="mailto:hello@0101.studio" className="hover:text-primary transition-colors flex items-center gap-2">
                    <Icon name="Mail" size={16} />
                    hello@0101.studio
                  </a>
                </li>
                <li>
                  <a href="tel:+74951234567" className="hover:text-primary transition-colors flex items-center gap-2">
                    <Icon name="Phone" size={16} />
                    +7 (495) 123-45-67
                  </a>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border/50 pt-8 text-center text-sm text-muted-foreground">
            © 2025 0101.studio. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
