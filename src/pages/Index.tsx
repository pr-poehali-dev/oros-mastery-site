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
          <Link to="/" className="text-2xl font-bold text-foreground flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg"></div>
            <span>0101<span className="text-primary">.studio</span></span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <a href="#about" className="text-foreground/80 hover:text-primary transition-colors">О нас</a>
            <a href="#services" className="text-foreground/80 hover:text-primary transition-colors">Услуги</a>
            <a href="#cases" className="text-foreground/80 hover:text-primary transition-colors">Кейсы</a>
            <a href="#pricing" className="text-foreground/80 hover:text-primary transition-colors">Цены</a>
            <a href="#reviews" className="text-foreground/80 hover:text-primary transition-colors">Отзывы</a>
          </div>
          <Button asChild className="bg-gradient-to-r from-primary to-secondary hover:opacity-90">
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
            <p className="text-xl md:text-2xl text-foreground/70 mb-8 max-w-2xl mx-auto">
              Комплексное digital-продвижение с гарантией результата. Работаем на рост вашей прибыли, а не просто показов.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button size="lg" asChild className="text-lg px-8 py-6 bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                <a href="#contact">Получить стратегию</a>
              </Button>
              <Button size="lg" variant="outline" asChild className="text-lg px-8 py-6 border-primary/50 hover:bg-primary/10">
                <a href="#cases">Кейсы (↑320%)</a>
              </Button>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
              <Card className="p-4 bg-card/50 backdrop-blur-sm border-border/50">
                <div className="text-3xl font-bold text-primary mb-1">320%</div>
                <div className="text-sm text-foreground/60">Рост выручки</div>
              </Card>
              <Card className="p-4 bg-card/50 backdrop-blur-sm border-border/50">
                <div className="text-3xl font-bold text-secondary mb-1">-50%</div>
                <div className="text-sm text-foreground/60">Снижение CPL</div>
              </Card>
              <Card className="p-4 bg-card/50 backdrop-blur-sm border-border/50">
                <div className="text-3xl font-bold text-primary mb-1">150+</div>
                <div className="text-sm text-foreground/60">Клиентов</div>
              </Card>
              <Card className="p-4 bg-card/50 backdrop-blur-sm border-border/50">
                <div className="text-3xl font-bold text-secondary mb-1">5 лет</div>
                <div className="text-sm text-foreground/60">На рынке</div>
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
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Мы не делаем "просто рекламу"
              </h2>
              <p className="text-lg text-foreground/70 mb-6">
                0101.studio — это команда экспертов в performance-маркетинге. Мы создаем системы привлечения клиентов, которые масштабируются и приносят стабильную прибыль.
              </p>
              <p className="text-lg text-foreground/70 mb-8">
                Наш подход основан на глубокой аналитике, A/B тестировании и постоянной оптимизации. Каждый рубль вашего бюджета работает на максимум.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Icon name="Target" className="text-primary" size={20} />
                  </div>
                  <div>
                    <div className="font-semibold mb-1">Фокус на ROI</div>
                    <div className="text-foreground/60">Работаем только на результат, который можно измерить</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center flex-shrink-0">
                    <Icon name="TrendingUp" className="text-secondary" size={20} />
                  </div>
                  <div>
                    <div className="font-semibold mb-1">Прозрачность</div>
                    <div className="text-foreground/60">Полная отчетность и доступ к аналитике в реальном времени</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Icon name="Zap" className="text-primary" size={20} />
                  </div>
                  <div>
                    <div className="font-semibold mb-1">Скорость</div>
                    <div className="text-foreground/60">Первые результаты уже через 2 недели после запуска</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl blur-3xl"></div>
              <img 
                src="https://cdn.poehali.dev/projects/f9f23ac4-7352-47dd-a4bb-81301617dd90/files/7fd82c0d-e6aa-4d3b-af42-1dfd5e9e037c.jpg"
                alt="Команда 0101.studio"
                className="relative rounded-2xl shadow-2xl w-full"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-primary/10 border border-primary/30 rounded-full mb-6">
              <span className="text-primary font-semibold">Услуги</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Что мы делаем</h2>
            <p className="text-xl text-foreground/60 max-w-2xl mx-auto">
              Полный спектр digital-маркетинга под ключ
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6 bg-card/50 backdrop-blur-sm border-primary/30 hover:border-primary transition-all group">
              <div className="w-14 h-14 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Icon name="Target" className="text-white" size={28} />
              </div>
              <h3 className="text-2xl font-bold mb-3">Performance Marketing</h3>
              <p className="text-foreground/70 mb-4">
                Контекстная и таргетированная реклама с оплатой за результат. Яндекс.Директ, VK Ads, myTarget.
              </p>
              <ul className="space-y-2 text-sm text-foreground/60">
                <li className="flex items-center gap-2">
                  <Icon name="Check" className="text-primary" size={16} />
                  <span>Настройка рекламных кампаний</span>
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="Check" className="text-primary" size={16} />
                  <span>A/B тестирование креативов</span>
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="Check" className="text-primary" size={16} />
                  <span>Оптимизация конверсий</span>
                </li>
              </ul>
            </Card>

            <Card className="p-6 bg-card/50 backdrop-blur-sm border-secondary/30 hover:border-secondary transition-all group">
              <div className="w-14 h-14 bg-gradient-to-br from-secondary to-primary rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Icon name="Search" className="text-white" size={28} />
              </div>
              <h3 className="text-2xl font-bold mb-3">SEO & Контент</h3>
              <p className="text-foreground/70 mb-4">
                Продвижение в поисковых системах и создание контента, который продает и привлекает органический трафик.
              </p>
              <ul className="space-y-2 text-sm text-foreground/60">
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
              </ul>
            </Card>

            <Card className="p-6 bg-card/50 backdrop-blur-sm border-primary/30 hover:border-primary transition-all group">
              <div className="w-14 h-14 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Icon name="BarChart3" className="text-white" size={28} />
              </div>
              <h3 className="text-2xl font-bold mb-3">Аналитика & CRO</h3>
              <p className="text-foreground/70 mb-4">
                Глубокая аналитика поведения пользователей и оптимизация конверсии на каждом этапе воронки.
              </p>
              <ul className="space-y-2 text-sm text-foreground/60">
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
              </ul>
            </Card>

            <Card className="p-6 bg-card/50 backdrop-blur-sm border-secondary/30 hover:border-secondary transition-all group">
              <div className="w-14 h-14 bg-gradient-to-br from-secondary to-primary rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Icon name="Users" className="text-white" size={28} />
              </div>
              <h3 className="text-2xl font-bold mb-3">SMM & Community</h3>
              <p className="text-foreground/70 mb-4">
                Управление соцсетями, создание вовлекающего контента и построение лояльного сообщества вокруг бренда.
              </p>
              <ul className="space-y-2 text-sm text-foreground/60">
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
              </ul>
            </Card>

            <Card className="p-6 bg-card/50 backdrop-blur-sm border-primary/30 hover:border-primary transition-all group">
              <div className="w-14 h-14 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Icon name="Mail" className="text-white" size={28} />
              </div>
              <h3 className="text-2xl font-bold mb-3">Email & CRM</h3>
              <p className="text-foreground/70 mb-4">
                Email-маркетинг, автоворонки и CRM-маркетинг для повышения LTV и удержания клиентов.
              </p>
              <ul className="space-y-2 text-sm text-foreground/60">
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
              </ul>
            </Card>

            <Card className="p-6 bg-card/50 backdrop-blur-sm border-secondary/30 hover:border-secondary transition-all group">
              <div className="w-14 h-14 bg-gradient-to-br from-secondary to-primary rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Icon name="Lightbulb" className="text-white" size={28} />
              </div>
              <h3 className="text-2xl font-bold mb-3">Стратегия & Консалтинг</h3>
              <p className="text-foreground/70 mb-4">
                Разработка маркетинговой стратегии, аудит текущих активностей и консультации по росту бизнеса.
              </p>
              <ul className="space-y-2 text-sm text-foreground/60">
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
              </ul>
            </Card>
          </div>
        </div>
      </section>

      <section id="cases" className="py-20 px-4 bg-card/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-primary/10 border border-primary/30 rounded-full mb-6">
              <span className="text-primary font-semibold">Наши работы</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Кейсы и результаты</h2>
            <p className="text-xl text-foreground/60 max-w-2xl mx-auto">
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
                <h3 className="text-xl font-bold mb-3">Premium-класс жилой комплекс</h3>
                <div className="grid grid-cols-3 gap-3 text-sm">
                  <div className="bg-background/50 backdrop-blur-sm rounded-lg p-3">
                    <div className="text-primary font-bold text-lg">↑250%</div>
                    <div className="text-foreground/60 text-xs">Продажи</div>
                  </div>
                  <div className="bg-background/50 backdrop-blur-sm rounded-lg p-3">
                    <div className="text-secondary font-bold text-lg">-40%</div>
                    <div className="text-foreground/60 text-xs">CPL</div>
                  </div>
                  <div className="bg-background/50 backdrop-blur-sm rounded-lg p-3">
                    <div className="text-primary font-bold text-lg">6 мес</div>
                    <div className="text-foreground/60 text-xs">Срок</div>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="group relative overflow-hidden bg-card/50 backdrop-blur-sm border-secondary/30 hover:border-secondary transition-all cursor-pointer">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src="https://cdn.poehali.dev/projects/f9f23ac4-7352-47dd-a4bb-81301617dd90/files/8d2021e5-a8f4-492a-8348-d2716ef6e34e.jpg" 
                  alt="Автобизнес" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent"></div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="inline-block px-3 py-1 bg-secondary/20 backdrop-blur-sm rounded-full text-xs text-secondary mb-3">
                  Automotive
                </div>
                <h3 className="text-xl font-bold mb-3">Автосалон luxury-сегмента</h3>
                <div className="grid grid-cols-3 gap-3 text-sm">
                  <div className="bg-background/50 backdrop-blur-sm rounded-lg p-3">
                    <div className="text-secondary font-bold text-lg">↑180%</div>
                    <div className="text-foreground/60 text-xs">Заявки</div>
                  </div>
                  <div className="bg-background/50 backdrop-blur-sm rounded-lg p-3">
                    <div className="text-primary font-bold text-lg">-35%</div>
                    <div className="text-foreground/60 text-xs">CPL</div>
                  </div>
                  <div className="bg-background/50 backdrop-blur-sm rounded-lg p-3">
                    <div className="text-secondary font-bold text-lg">4 мес</div>
                    <div className="text-foreground/60 text-xs">Срок</div>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="group relative overflow-hidden bg-card/50 backdrop-blur-sm border-primary/30 hover:border-primary transition-all cursor-pointer">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src="https://cdn.poehali.dev/projects/f9f23ac4-7352-47dd-a4bb-81301617dd90/files/c4d3ff03-47dd-4934-9174-5ad07722cbe5.jpg" 
                  alt="Ресторан" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent"></div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="inline-block px-3 py-1 bg-primary/20 backdrop-blur-sm rounded-full text-xs text-primary mb-3">
                  HoReCa
                </div>
                <h3 className="text-xl font-bold mb-3">Сеть премиум-ресторанов</h3>
                <div className="grid grid-cols-3 gap-3 text-sm">
                  <div className="bg-background/50 backdrop-blur-sm rounded-lg p-3">
                    <div className="text-primary font-bold text-lg">↑320%</div>
                    <div className="text-foreground/60 text-xs">Трафик</div>
                  </div>
                  <div className="bg-background/50 backdrop-blur-sm rounded-lg p-3">
                    <div className="text-secondary font-bold text-lg">-50%</div>
                    <div className="text-foreground/60 text-xs">CAC</div>
                  </div>
                  <div className="bg-background/50 backdrop-blur-sm rounded-lg p-3">
                    <div className="text-primary font-bold text-lg">5 мес</div>
                    <div className="text-foreground/60 text-xs">Срок</div>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="group relative overflow-hidden bg-card/50 backdrop-blur-sm border-secondary/30 hover:border-secondary transition-all cursor-pointer">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src="https://cdn.poehali.dev/projects/f9f23ac4-7352-47dd-a4bb-81301617dd90/files/d52da39e-632e-4e2f-908b-11a31ad81bf7.jpg" 
                  alt="E-commerce" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent"></div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="inline-block px-3 py-1 bg-secondary/20 backdrop-blur-sm rounded-full text-xs text-secondary mb-3">
                  E-commerce
                </div>
                <h3 className="text-xl font-bold mb-3">Интернет-магазин мебели</h3>
                <div className="grid grid-cols-3 gap-3 text-sm">
                  <div className="bg-background/50 backdrop-blur-sm rounded-lg p-3">
                    <div className="text-secondary font-bold text-lg">↑200%</div>
                    <div className="text-foreground/60 text-xs">Продажи</div>
                  </div>
                  <div className="bg-background/50 backdrop-blur-sm rounded-lg p-3">
                    <div className="text-primary font-bold text-lg">-45%</div>
                    <div className="text-foreground/60 text-xs">CPA</div>
                  </div>
                  <div className="bg-background/50 backdrop-blur-sm rounded-lg p-3">
                    <div className="text-secondary font-bold text-lg">3 мес</div>
                    <div className="text-foreground/60 text-xs">Срок</div>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="md:col-span-2 group relative overflow-hidden bg-card/50 backdrop-blur-sm border-primary/30 hover:border-primary transition-all cursor-pointer">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src="https://cdn.poehali.dev/projects/f9f23ac4-7352-47dd-a4bb-81301617dd90/files/75a6ef06-6bf6-40aa-a5d6-6a1d95f1c146.jpg" 
                  alt="SaaS" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent"></div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="inline-block px-3 py-1 bg-primary/20 backdrop-blur-sm rounded-full text-xs text-primary mb-3">
                  SaaS / B2B
                </div>
                <h3 className="text-2xl font-bold mb-3">CRM-система для малого бизнеса</h3>
                <div className="grid grid-cols-4 gap-3 text-sm">
                  <div className="bg-background/50 backdrop-blur-sm rounded-lg p-3">
                    <div className="text-primary font-bold text-lg">↑400%</div>
                    <div className="text-foreground/60 text-xs">Регистрации</div>
                  </div>
                  <div className="bg-background/50 backdrop-blur-sm rounded-lg p-3">
                    <div className="text-secondary font-bold text-lg">-60%</div>
                    <div className="text-foreground/60 text-xs">CPL</div>
                  </div>
                  <div className="bg-background/50 backdrop-blur-sm rounded-lg p-3">
                    <div className="text-primary font-bold text-lg">25%</div>
                    <div className="text-foreground/60 text-xs">CR trial→paid</div>
                  </div>
                  <div className="bg-background/50 backdrop-blur-sm rounded-lg p-3">
                    <div className="text-secondary font-bold text-lg">8 мес</div>
                    <div className="text-foreground/60 text-xs">Срок</div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5"></div>
        <div className="container mx-auto max-w-2xl relative z-10">
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-2 bg-primary/10 border border-primary/30 rounded-full mb-6">
              <span className="text-primary font-semibold">Начнем работу</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Получите бесплатный аудит</h2>
            <p className="text-xl text-foreground/60">
              Оставьте заявку, и мы проанализируем ваши рекламные кампании бесплатно
            </p>
          </div>
          <Card className="p-8 bg-card/50 backdrop-blur-sm border-primary/30">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Ваш телефон</label>
                <Input
                  type="tel"
                  placeholder="+7 (___) ___-__-__"
                  value={phone}
                  onChange={handlePhoneChange}
                  className="text-lg py-6 bg-background/50 border-border"
                  maxLength={18}
                />
              </div>
              <Button type="submit" size="lg" className="w-full text-lg py-6 bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                Получить бесплатный аудит
              </Button>
              <p className="text-center text-sm text-foreground/60">
                Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
              </p>
            </form>
          </Card>
        </div>
      </section>

      <section className="py-20 px-4 bg-card/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-primary/10 border border-primary/30 rounded-full mb-6">
              <span className="text-primary font-semibold">Процесс работы</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Как мы работаем</h2>
          </div>

          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-primary hidden md:block"></div>
            
            <div className="space-y-12">
              {[
                {
                  num: 1,
                  title: 'Анализ и аудит',
                  desc: 'Глубокий анализ вашего бизнеса, целевой аудитории, конкурентов и текущих маркетинговых активностей',
                  icon: 'Search'
                },
                {
                  num: 2,
                  title: 'Стратегия',
                  desc: 'Разработка индивидуальной стратегии продвижения с четкими KPI и прогнозом результатов',
                  icon: 'Lightbulb'
                },
                {
                  num: 3,
                  title: 'Запуск',
                  desc: 'Настройка всех инструментов, создание креативов и запуск первых тестовых кампаний',
                  icon: 'Rocket'
                },
                {
                  num: 4,
                  title: 'Оптимизация',
                  desc: 'Ежедневный мониторинг, A/B тесты и оптимизация для максимальной эффективности',
                  icon: 'TrendingUp'
                },
                {
                  num: 5,
                  title: 'Масштабирование',
                  desc: 'Увеличение бюджетов на успешные каналы и расширение охвата аудитории',
                  icon: 'Zap'
                }
              ].map((step) => (
                <div key={step.num} className="flex gap-6 items-start relative">
                  <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white text-xl font-bold shadow-lg z-10">
                    {step.num}
                  </div>
                  <Card className="flex-1 p-6 bg-card/50 backdrop-blur-sm border-border/50">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon name={step.icon as any} className="text-primary" size={24} />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold mb-2">{step.title}</h3>
                        <p className="text-foreground/70">{step.desc}</p>
                      </div>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="pricing" className="py-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-primary/10 border border-primary/30 rounded-full mb-6">
              <span className="text-primary font-semibold">Тарифы</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Выберите свой план</h2>
            <p className="text-xl text-foreground/60">
              Гибкие условия для бизнеса любого масштаба
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-8 bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all">
              <div className="inline-block px-3 py-1 bg-primary/10 rounded-full text-xs text-primary mb-4">
                Для старта
              </div>
              <h3 className="text-2xl font-bold mb-2">Базовый</h3>
              <div className="mb-6">
                <div className="text-4xl font-bold mb-2">
                  <span className="text-primary">от 50 000₽</span>
                </div>
                <div className="text-foreground/60">в месяц</div>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <Icon name="Check" className="text-primary mt-1 flex-shrink-0" size={20} />
                  <span>1-2 рекламных канала</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="Check" className="text-primary mt-1 flex-shrink-0" size={20} />
                  <span>Базовая аналитика</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="Check" className="text-primary mt-1 flex-shrink-0" size={20} />
                  <span>До 5 креативов в месяц</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="Check" className="text-primary mt-1 flex-shrink-0" size={20} />
                  <span>Ежемесячные отчеты</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="Check" className="text-primary mt-1 flex-shrink-0" size={20} />
                  <span>Email поддержка</span>
                </li>
              </ul>
              <Button className="w-full" variant="outline" asChild>
                <a href="#contact">Выбрать план</a>
              </Button>
            </Card>

            <Card className="p-8 bg-gradient-to-br from-primary/10 to-secondary/10 backdrop-blur-sm border-2 border-primary relative transform md:scale-105 shadow-2xl">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary to-secondary text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                Рекомендуем
              </div>
              <div className="inline-block px-3 py-1 bg-primary/20 rounded-full text-xs text-primary mb-4 mt-2">
                Оптимальный
              </div>
              <h3 className="text-2xl font-bold mb-2">Профессиональный</h3>
              <div className="mb-6">
                <div className="text-4xl font-bold mb-2">
                  <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">от 120 000₽</span>
                </div>
                <div className="text-foreground/60">в месяц</div>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <Icon name="Check" className="text-primary mt-1 flex-shrink-0" size={20} />
                  <span>3-5 рекламных каналов</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="Check" className="text-primary mt-1 flex-shrink-0" size={20} />
                  <span>Расширенная аналитика + дашборды</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="Check" className="text-primary mt-1 flex-shrink-0" size={20} />
                  <span>До 15 креативов + A/B тесты</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="Check" className="text-primary mt-1 flex-shrink-0" size={20} />
                  <span>Еженедельные отчеты</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="Check" className="text-primary mt-1 flex-shrink-0" size={20} />
                  <span>Персональный менеджер</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="Check" className="text-primary mt-1 flex-shrink-0" size={20} />
                  <span>CRO аудит сайта</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="Check" className="text-primary mt-1 flex-shrink-0" size={20} />
                  <span>Приоритетная поддержка</span>
                </li>
              </ul>
              <Button className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90" asChild>
                <a href="#contact">Выбрать план</a>
              </Button>
            </Card>

            <Card className="p-8 bg-card/50 backdrop-blur-sm border-border/50 hover:border-secondary/50 transition-all">
              <div className="inline-block px-3 py-1 bg-secondary/10 rounded-full text-xs text-secondary mb-4">
                Для роста
              </div>
              <h3 className="text-2xl font-bold mb-2">Максимум</h3>
              <div className="mb-6">
                <div className="text-4xl font-bold mb-2">
                  <span className="text-secondary">от 250 000₽</span>
                </div>
                <div className="text-foreground/60">в месяц</div>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <Icon name="Check" className="text-secondary mt-1 flex-shrink-0" size={20} />
                  <span>Все каналы + эксперименты</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="Check" className="text-secondary mt-1 flex-shrink-0" size={20} />
                  <span>Полный маркетинг-аудит</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="Check" className="text-secondary mt-1 flex-shrink-0" size={20} />
                  <span>Безлимитные креативы</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="Check" className="text-secondary mt-1 flex-shrink-0" size={20} />
                  <span>Индивидуальные отчеты 24/7</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="Check" className="text-secondary mt-1 flex-shrink-0" size={20} />
                  <span>Выделенная команда</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="Check" className="text-secondary mt-1 flex-shrink-0" size={20} />
                  <span>Стратегические сессии</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="Check" className="text-secondary mt-1 flex-shrink-0" size={20} />
                  <span>VIP поддержка и консалтинг</span>
                </li>
              </ul>
              <Button className="w-full" variant="outline" asChild>
                <a href="#contact">Выбрать план</a>
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
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Что говорят клиенты</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                name: 'Алексей Смирнов',
                role: 'CEO, Строительная компания',
                text: 'Работа с 0101.studio превзошла все ожидания. За 3 месяца удалось снизить стоимость лида на 40% и увеличить продажи в 2.5 раза. Команда профессионалов, которые действительно понимают, что делают.',
                avatar: 'АС'
              },
              {
                name: 'Мария Козлова',
                role: 'Владелец e-commerce',
                text: 'Наконец-то нашли агентство, которое работает на результат! Четкая стратегия, прозрачная аналитика и главное - реальный рост конверсий. За полгода ROAS вырос с 150% до 380%. Рекомендую!',
                avatar: 'МК'
              },
              {
                name: 'Дмитрий Петров',
                role: 'Founder, SaaS startup',
                text: 'Отличная команда! Помогли выстроить эффективную воронку продаж с нуля. Особенно порадовала оперативность и внимание к деталям. Запустили первые кампании за неделю, первые результаты через 2 недели.',
                avatar: 'ДП'
              },
              {
                name: 'Елена Васильева',
                role: 'Маркетинг-директор, HoReCa',
                text: 'Сотрудничаем уже год. За это время трафик вырос в 4 раза, а стоимость привлечения клиента упала в 2 раза. Продолжаем масштабироваться! Огромный плюс - постоянная коммуникация и подробные отчеты.',
                avatar: 'ЕВ'
              }
            ].map((review, idx) => (
              <Card key={idx} className="p-6 bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Icon key={i} name="Star" className="text-primary fill-primary" size={18} />
                  ))}
                </div>
                <p className="text-foreground/80 mb-6 leading-relaxed">"{review.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-sm">{review.avatar}</span>
                  </div>
                  <div>
                    <div className="font-bold">{review.name}</div>
                    <div className="text-sm text-foreground/60">{review.role}</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-card/30 py-12 px-4 border-t border-border/50">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-2">
              <Link to="/" className="text-2xl font-bold text-foreground flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg"></div>
                <span>0101<span className="text-primary">.studio</span></span>
              </Link>
              <p className="text-foreground/70 mb-4">
                Performance маркетинговое агентство. Создаем системы привлечения клиентов, которые работают и масштабируются.
              </p>
              <div className="flex gap-3">
                <a href="#" className="w-10 h-10 bg-primary/10 hover:bg-primary/20 rounded-lg flex items-center justify-center transition-colors">
                  <Icon name="MessageCircle" size={20} className="text-primary" />
                </a>
                <a href="#" className="w-10 h-10 bg-primary/10 hover:bg-primary/20 rounded-lg flex items-center justify-center transition-colors">
                  <Icon name="Instagram" size={20} className="text-primary" />
                </a>
                <a href="#" className="w-10 h-10 bg-primary/10 hover:bg-primary/20 rounded-lg flex items-center justify-center transition-colors">
                  <Icon name="Linkedin" size={20} className="text-primary" />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Навигация</h4>
              <ul className="space-y-2 text-foreground/70">
                <li><a href="#about" className="hover:text-primary transition-colors">О нас</a></li>
                <li><a href="#services" className="hover:text-primary transition-colors">Услуги</a></li>
                <li><a href="#cases" className="hover:text-primary transition-colors">Кейсы</a></li>
                <li><a href="#pricing" className="hover:text-primary transition-colors">Тарифы</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Контакты</h4>
              <ul className="space-y-3 text-foreground/70">
                <li className="flex items-start gap-2">
                  <Icon name="Mail" size={18} className="text-primary mt-0.5" />
                  <a href="mailto:hello@0101.studio" className="hover:text-primary transition-colors">hello@0101.studio</a>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="Phone" size={18} className="text-primary mt-0.5" />
                  <a href="tel:+79999999999" className="hover:text-primary transition-colors">+7 (999) 999-99-99</a>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="MapPin" size={18} className="text-primary mt-0.5" />
                  <span>Москва, Россия</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border/50 pt-8 text-center text-foreground/60">
            <p>© 2024 0101.studio — Digital Marketing Agency. Все права защищены</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
