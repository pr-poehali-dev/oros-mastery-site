import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
        title="0101.studio - Маркетинговое агентство полного цикла"
        description="Разрабатываем эффективные стратегии продвижения, которые увеличивают выручку и снижают стоимость лида"
        keywords="маркетинговое агентство, digital marketing, продвижение бизнеса, реклама, CPL, стратегия продвижения"
        url="https://rick-and-morty.poehali.dev/"
      />

      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-foreground">
            0101<span className="text-primary">.studio</span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <a href="#cases" className="text-foreground/80 hover:text-foreground transition-colors">Кейсы</a>
            <a href="#strategy" className="text-foreground/80 hover:text-foreground transition-colors">Стратегия</a>
            <a href="#stages" className="text-foreground/80 hover:text-foreground transition-colors">Этапы</a>
            <a href="#pricing" className="text-foreground/80 hover:text-foreground transition-colors">Цены</a>
            <a href="#reviews" className="text-foreground/80 hover:text-foreground transition-colors">Отзывы</a>
          </div>
          <Button asChild>
            <a href="#contact">Оставить заявку</a>
          </Button>
        </div>
      </nav>

      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Маркетинговое агентство
              <br />
              <span className="text-primary">полного цикла</span>
            </h1>
            <p className="text-xl md:text-2xl text-foreground/70 mb-8 max-w-2xl mx-auto">
              Разрабатываем эффективные стратегии продвижения, которые увеличивают выручку и снижают стоимость лида
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="text-lg px-8 py-6">
                <a href="#contact">Получить консультацию</a>
              </Button>
              <Button size="lg" variant="outline" asChild className="text-lg px-8 py-6">
                <a href="#cases">Смотреть кейсы</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="cases" className="py-20 px-4 bg-secondary">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">КЕЙСЫ</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            <div className="group relative overflow-hidden bg-card border border-border hover:border-primary transition-all duration-300 cursor-pointer">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src="https://cdn.poehali.dev/files/e8995be7-4bf8-47fe-a47d-eb26d35c2270.png" 
                  alt="Недвижимость" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-xl font-bold mb-2">Недвижимость премиум-класса</h3>
                <div className="flex gap-4 text-sm">
                  <div>
                    <div className="text-primary font-bold">↑250%</div>
                    <div className="text-white/70">Продажи</div>
                  </div>
                  <div>
                    <div className="text-primary font-bold">-40%</div>
                    <div className="text-white/70">CPL</div>
                  </div>
                  <div>
                    <div className="text-primary font-bold">₽15к</div>
                    <div className="text-white/70">Бюджет</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="group relative overflow-hidden bg-card border border-border hover:border-primary transition-all duration-300 cursor-pointer">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src="https://cdn.poehali.dev/projects/f9f23ac4-7352-47dd-a4bb-81301617dd90/files/8d2021e5-a8f4-492a-8348-d2716ef6e34e.jpg" 
                  alt="Автобизнес" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-xl font-bold mb-2">Автосалон luxury-сегмента</h3>
                <div className="flex gap-4 text-sm">
                  <div>
                    <div className="text-primary font-bold">↑180%</div>
                    <div className="text-white/70">Заявки</div>
                  </div>
                  <div>
                    <div className="text-primary font-bold">-35%</div>
                    <div className="text-white/70">CPL</div>
                  </div>
                  <div>
                    <div className="text-primary font-bold">₽25к</div>
                    <div className="text-white/70">Бюджет</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="group relative overflow-hidden bg-card border border-border hover:border-primary transition-all duration-300 cursor-pointer">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src="https://cdn.poehali.dev/projects/f9f23ac4-7352-47dd-a4bb-81301617dd90/files/c4d3ff03-47dd-4934-9174-5ad07722cbe5.jpg" 
                  alt="Ресторан" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-xl font-bold mb-2">Сеть ресторанов</h3>
                <div className="flex gap-4 text-sm">
                  <div>
                    <div className="text-primary font-bold">↑320%</div>
                    <div className="text-white/70">Трафик</div>
                  </div>
                  <div>
                    <div className="text-primary font-bold">-50%</div>
                    <div className="text-white/70">CPL</div>
                  </div>
                  <div>
                    <div className="text-primary font-bold">₽10к</div>
                    <div className="text-white/70">Бюджет</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="group relative overflow-hidden bg-card border border-border hover:border-primary transition-all duration-300 cursor-pointer">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src="https://cdn.poehali.dev/projects/f9f23ac4-7352-47dd-a4bb-81301617dd90/files/d52da39e-632e-4e2f-908b-11a31ad81bf7.jpg" 
                  alt="E-commerce" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-xl font-bold mb-2">Интернет-магазин мебели</h3>
                <div className="flex gap-4 text-sm">
                  <div>
                    <div className="text-primary font-bold">↑200%</div>
                    <div className="text-white/70">Продажи</div>
                  </div>
                  <div>
                    <div className="text-primary font-bold">-45%</div>
                    <div className="text-white/70">CPL</div>
                  </div>
                  <div>
                    <div className="text-primary font-bold">₽20к</div>
                    <div className="text-white/70">Бюджет</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:col-span-2 group relative overflow-hidden bg-card border border-border hover:border-primary transition-all duration-300 cursor-pointer">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src="https://cdn.poehali.dev/files/e8995be7-4bf8-47fe-a47d-eb26d35c2270.png" 
                  alt="SaaS" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-xl font-bold mb-2">SaaS для B2B</h3>
                <div className="flex gap-4 text-sm">
                  <div>
                    <div className="text-primary font-bold">↑400%</div>
                    <div className="text-white/70">Регистрации</div>
                  </div>
                  <div>
                    <div className="text-primary font-bold">-60%</div>
                    <div className="text-white/70">CPL</div>
                  </div>
                  <div>
                    <div className="text-primary font-bold">₽30к</div>
                    <div className="text-white/70">Бюджет</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 px-4">
        <div className="container mx-auto max-w-2xl">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">Оставьте заявку</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Input
                type="tel"
                placeholder="+7 (___) ___-__-__"
                value={phone}
                onChange={handlePhoneChange}
                className="text-lg py-6 bg-card border-border text-foreground"
                maxLength={18}
              />
            </div>
            <Button type="submit" size="lg" className="w-full text-lg py-6">
              Отправить заявку
            </Button>
          </form>
        </div>
      </section>

      <section id="strategy" className="py-20 px-4 bg-secondary">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">Наша стратегия работы</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-card border border-border p-6 hover:border-primary transition-colors">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Icon name="Target" className="text-primary" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Подбор источников трафика</h3>
              <p className="text-foreground/70">Анализируем и выбираем наиболее эффективные каналы привлечения для вашей ниши</p>
            </div>

            <div className="bg-card border border-border p-6 hover:border-primary transition-colors">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Icon name="Search" className="text-primary" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Анализ конкурентов</h3>
              <p className="text-foreground/70">Изучаем стратегии конкурентов и выявляем возможности для вашего роста</p>
            </div>

            <div className="bg-card border border-border p-6 hover:border-primary transition-colors">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Icon name="Lightbulb" className="text-primary" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Разработка креативов</h3>
              <p className="text-foreground/70">Создаем эффективные объявления и офферы, которые конвертируют</p>
            </div>

            <div className="bg-card border border-border p-6 hover:border-primary transition-colors">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Icon name="TrendingUp" className="text-primary" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Поиск сильных сторон</h3>
              <p className="text-foreground/70">Находим и усиливаем конкурентные преимущества вашего бизнеса</p>
            </div>

            <div className="bg-card border border-border p-6 hover:border-primary transition-colors">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Icon name="FileText" className="text-primary" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Подготовка медиапланов</h3>
              <p className="text-foreground/70">Разрабатываем детальные планы с прогнозами результатов и бюджетов</p>
            </div>

            <div className="bg-card border border-border p-6 hover:border-primary transition-colors">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Icon name="Zap" className="text-primary" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Эффективная стратегия</h3>
              <p className="text-foreground/70">Создаем комплексную стратегию продвижения, нацеленную на результат</p>
            </div>
          </div>
        </div>
      </section>

      <section id="results" className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">Результаты работы</h2>
          <p className="text-center text-foreground/70 mb-16 text-lg">После запуска наших стратегий</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="relative inline-block mb-4">
                <div className="w-32 h-32 rounded-full border-8 border-primary relative overflow-hidden">
                  <div className="absolute inset-0 bg-primary" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 25%, 0 25%)' }}></div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Icon name="TrendingUp" className="text-primary" size={40} />
                </div>
              </div>
              <div className="text-5xl font-bold text-primary mb-2">↑320%</div>
              <div className="text-xl font-semibold mb-2">Рост выручки</div>
              <p className="text-foreground/70">В среднем у наших клиентов за первые 6 месяцев</p>
            </div>

            <div className="text-center">
              <div className="relative inline-block mb-4">
                <div className="w-32 h-32 rounded-full border-8 border-primary relative overflow-hidden">
                  <div className="absolute inset-0 bg-primary" style={{ clipPath: 'polygon(0 50%, 100% 50%, 100% 100%, 0 100%)' }}></div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Icon name="ArrowDown" className="text-primary" size={40} />
                </div>
              </div>
              <div className="text-5xl font-bold text-primary mb-2">-45%</div>
              <div className="text-xl font-semibold mb-2">Снижение CPL</div>
              <p className="text-foreground/70">Оптимизация рекламных кампаний снижает стоимость лида</p>
            </div>

            <div className="text-center">
              <div className="relative inline-block mb-4">
                <div className="w-32 h-32 rounded-full border-8 border-primary relative overflow-hidden">
                  <div className="absolute inset-0 bg-primary" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 40%, 0 40%)' }}></div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Icon name="Target" className="text-primary" size={40} />
                </div>
              </div>
              <div className="text-5xl font-bold text-primary mb-2">↑280%</div>
              <div className="text-xl font-semibold mb-2">Увеличение конверсии</div>
              <p className="text-foreground/70">Точная настройка воронки и креативов повышает отдачу</p>
            </div>
          </div>
        </div>
      </section>

      <section id="stages" className="py-20 px-4 bg-secondary">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">Этапы работы</h2>
          
          <div className="space-y-6">
            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-primary text-black rounded-full flex items-center justify-center text-xl font-bold">
                1
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-2">Знакомство и анализ</h3>
                <p className="text-foreground/70">Изучаем ваш бизнес, целевую аудиторию и текущую ситуацию на рынке</p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-primary text-black rounded-full flex items-center justify-center text-xl font-bold">
                2
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-2">Разработка стратегии</h3>
                <p className="text-foreground/70">Создаем индивидуальный план продвижения с учетом ваших целей и бюджета</p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-primary text-black rounded-full flex items-center justify-center text-xl font-bold">
                3
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-2">Запуск кампаний</h3>
                <p className="text-foreground/70">Настраиваем рекламные кампании и запускаем тестовый период</p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-primary text-black rounded-full flex items-center justify-center text-xl font-bold">
                4
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-2">Оптимизация</h3>
                <p className="text-foreground/70">Анализируем результаты и улучшаем показатели для максимальной эффективности</p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-primary text-black rounded-full flex items-center justify-center text-xl font-bold">
                5
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-2">Масштабирование</h3>
                <p className="text-foreground/70">Увеличиваем бюджеты и расширяем успешные стратегии для роста бизнеса</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="pricing" className="py-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">Тарифы</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card border border-border p-8 hover:border-primary transition-all">
              <h3 className="text-2xl font-bold mb-4">Старт</h3>
              <div className="mb-6">
                <div className="text-4xl font-bold text-primary mb-2">от 50 000₽</div>
                <div className="text-foreground/60">в месяц</div>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <Icon name="Check" className="text-primary mt-1 flex-shrink-0" size={20} />
                  <span>Настройка 1-2 рекламных каналов</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="Check" className="text-primary mt-1 flex-shrink-0" size={20} />
                  <span>Базовая аналитика и отчеты</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="Check" className="text-primary mt-1 flex-shrink-0" size={20} />
                  <span>Разработка креативов</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="Check" className="text-primary mt-1 flex-shrink-0" size={20} />
                  <span>Ежемесячная оптимизация</span>
                </li>
              </ul>
              <Button className="w-full" variant="outline" asChild>
                <a href="#contact">Выбрать тариф</a>
              </Button>
            </div>

            <div className="bg-card border-2 border-primary p-8 relative transform md:scale-105 shadow-2xl">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-black px-4 py-1 rounded-full text-sm font-bold">
                Популярный
              </div>
              <h3 className="text-2xl font-bold mb-4">Профи</h3>
              <div className="mb-6">
                <div className="text-4xl font-bold text-primary mb-2">от 120 000₽</div>
                <div className="text-foreground/60">в месяц</div>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <Icon name="Check" className="text-primary mt-1 flex-shrink-0" size={20} />
                  <span>Настройка 3-5 рекламных каналов</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="Check" className="text-primary mt-1 flex-shrink-0" size={20} />
                  <span>Продвинутая аналитика и CRM</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="Check" className="text-primary mt-1 flex-shrink-0" size={20} />
                  <span>A/B тестирование креативов</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="Check" className="text-primary mt-1 flex-shrink-0" size={20} />
                  <span>Еженедельная оптимизация</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="Check" className="text-primary mt-1 flex-shrink-0" size={20} />
                  <span>Персональный менеджер</span>
                </li>
              </ul>
              <Button className="w-full" asChild>
                <a href="#contact">Выбрать тариф</a>
              </Button>
            </div>

            <div className="bg-card border border-border p-8 hover:border-primary transition-all">
              <h3 className="text-2xl font-bold mb-4">Максимум</h3>
              <div className="mb-6">
                <div className="text-4xl font-bold text-primary mb-2">от 250 000₽</div>
                <div className="text-foreground/60">в месяц</div>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <Icon name="Check" className="text-primary mt-1 flex-shrink-0" size={20} />
                  <span>Все доступные каналы трафика</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="Check" className="text-primary mt-1 flex-shrink-0" size={20} />
                  <span>Полный маркетинг-аудит</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="Check" className="text-primary mt-1 flex-shrink-0" size={20} />
                  <span>Выделенная команда</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="Check" className="text-primary mt-1 flex-shrink-0" size={20} />
                  <span>24/7 поддержка и оптимизация</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="Check" className="text-primary mt-1 flex-shrink-0" size={20} />
                  <span>Индивидуальная стратегия роста</span>
                </li>
              </ul>
              <Button className="w-full" variant="outline" asChild>
                <a href="#contact">Выбрать тариф</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="reviews" className="py-20 px-4 bg-secondary">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">Отзывы клиентов</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-card border border-border p-6">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Icon key={i} name="Star" className="text-primary fill-primary" size={20} />
                ))}
              </div>
              <p className="text-foreground/80 mb-4">
                "Работа с 0101.studio превзошла все ожидания. За 3 месяца удалось снизить стоимость лида на 40% и увеличить продажи в 2.5 раза. Команда профессионалов!"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                  <span className="text-primary font-bold">АС</span>
                </div>
                <div>
                  <div className="font-bold">Алексей Смирнов</div>
                  <div className="text-sm text-foreground/60">Директор агентства недвижимости</div>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border p-6">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Icon key={i} name="Star" className="text-primary fill-primary" size={20} />
                ))}
              </div>
              <p className="text-foreground/80 mb-4">
                "Наконец-то нашли агентство, которое работает на результат! Четкая стратегия, прозрачная аналитика и главное - реальный рост конверсий. Рекомендую!"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                  <span className="text-primary font-bold">МК</span>
                </div>
                <div>
                  <div className="font-bold">Мария Козлова</div>
                  <div className="text-sm text-foreground/60">Владелец онлайн-магазина</div>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border p-6">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Icon key={i} name="Star" className="text-primary fill-primary" size={20} />
                ))}
              </div>
              <p className="text-foreground/80 mb-4">
                "Отличная команда! Помогли выстроить эффективную воронку продаж с нуля. Особенно порадовала оперативность и внимание к деталям."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                  <span className="text-primary font-bold">ДП</span>
                </div>
                <div>
                  <div className="font-bold">Дмитрий Петров</div>
                  <div className="text-sm text-foreground/60">CEO SaaS-стартапа</div>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border p-6">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Icon key={i} name="Star" className="text-primary fill-primary" size={20} />
                ))}
              </div>
              <p className="text-foreground/80 mb-4">
                "Сотрудничаем уже год. За это время трафик вырос в 4 раза, а стоимость привлечения клиента упала в 2 раза. Продолжаем масштабироваться!"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                  <span className="text-primary font-bold">ЕВ</span>
                </div>
                <div>
                  <div className="font-bold">Елена Васильева</div>
                  <div className="text-sm text-foreground/60">Сеть ресторанов</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="container mx-auto max-w-2xl">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">Свяжитесь с нами</h2>
        </div>
      </section>

      <footer className="bg-secondary py-12 px-4 border-t border-border">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-2">
              <div className="text-2xl font-bold mb-4">
                0101<span className="text-primary">.studio</span>
              </div>
              <p className="text-foreground/70 mb-4">
                Маркетинговое агентство полного цикла. Создаем эффективные стратегии продвижения для роста вашего бизнеса.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Услуги</h4>
              <ul className="space-y-2 text-foreground/70">
                <li><a href="#strategy" className="hover:text-primary transition-colors">Стратегия</a></li>
                <li><a href="#cases" className="hover:text-primary transition-colors">Кейсы</a></li>
                <li><a href="#pricing" className="hover:text-primary transition-colors">Тарифы</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Контакты</h4>
              <ul className="space-y-2 text-foreground/70">
                <li className="flex items-center gap-2">
                  <Icon name="Mail" size={16} />
                  <a href="mailto:hello@0101.studio" className="hover:text-primary transition-colors">hello@0101.studio</a>
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="Phone" size={16} />
                  <a href="tel:+79999999999" className="hover:text-primary transition-colors">+7 (999) 999-99-99</a>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border pt-8 text-center text-foreground/60">
            <p>© 2024 0101.studio — Все права защищены</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;