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

  const cases = [
    {
      title: 'НЕДВИЖИМОСТЬ',
      description: 'Увеличение заявок на 340% за 4 месяца',
      image: 'https://cdn.poehali.dev/files/3ea97814-b369-4ea6-9475-282202bed0fc.jpg',
      stats: { metric: '+340%', label: 'заявок' }
    },
    {
      title: 'E-COMMERCE',
      description: 'Снижение стоимости заказа на 45%',
      image: 'https://cdn.poehali.dev/files/3ea97814-b369-4ea6-9475-282202bed0fc.jpg',
      stats: { metric: '-45%', label: 'CPO' }
    },
    {
      title: 'МЕДИЦИНА',
      description: 'Рост конверсии в 2.5 раза',
      image: 'https://cdn.poehali.dev/files/3ea97814-b369-4ea6-9475-282202bed0fc.jpg',
      stats: { metric: 'x2.5', label: 'конверсия' }
    },
    {
      title: 'ОБРАЗОВАНИЕ',
      description: 'Привлечение 500+ студентов за месяц',
      image: 'https://cdn.poehali.dev/files/3ea97814-b369-4ea6-9475-282202bed0fc.jpg',
      stats: { metric: '500+', label: 'студентов' }
    },
    {
      title: 'АВТОБИЗНЕС',
      description: 'Увеличение записей на тест-драйв на 280%',
      image: 'https://cdn.poehali.dev/files/3ea97814-b369-4ea6-9475-282202bed0fc.jpg',
      stats: { metric: '+280%', label: 'записей' }
    },
    {
      title: 'СТРОИТЕЛЬСТВО',
      description: 'ROI 450% за полгода работы',
      image: 'https://cdn.poehali.dev/files/3ea97814-b369-4ea6-9475-282202bed0fc.jpg',
      stats: { metric: '450%', label: 'ROI' }
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <SEO
        title="0101.studio - Комплексный маркетинг для бизнеса от 50 000 ₽"
        description="Профессиональное маркетинговое агентство. Контекстная реклама, таргет, аналитика. Гарантия результата."
        keywords="маркетинг, реклама, контекстная реклама, яндекс директ, google ads"
        url="https://rick-and-morty.poehali.dev/"
      />

      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-lg border-b border-white/10">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="text-xl font-bold">
            0101<span className="text-primary">.STUDIO</span>
          </Link>
          <div className="hidden md:flex items-center gap-8 text-sm">
            <a href="#cases" className="text-white/70 hover:text-white transition-colors">КЕЙСЫ</a>
            <a href="#services" className="text-white/70 hover:text-white transition-colors">УСЛУГИ</a>
            <a href="#process" className="text-white/70 hover:text-white transition-colors">ПРОЦЕСС</a>
            <a href="#pricing" className="text-white/70 hover:text-white transition-colors">ЦЕНЫ</a>
          </div>
          <Button className="bg-primary text-black hover:bg-primary/90 font-bold">
            СВЯЗАТЬСЯ
          </Button>
        </div>
      </nav>

      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="w-2 h-2 bg-primary rounded-full"></div>
            <div className="w-2 h-2 bg-primary rounded-full"></div>
            <div className="w-2 h-2 bg-primary rounded-full"></div>
            <div className="w-2 h-2 bg-primary rounded-full"></div>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Комплексный маркетинг для<br />бизнеса от 50 000 ₽
          </h1>
          <p className="text-lg md:text-xl text-white/60 mb-12 max-w-2xl mx-auto">
            Привлекаем клиентов через контекстную рекламу, таргет и SEO.<br />Работаем на результат, а не на показы.
          </p>
          <Button size="lg" className="bg-primary text-black hover:bg-primary/90 font-bold text-lg px-12 py-6">
            ПОЛУЧИТЬ СТРАТЕГИЮ
          </Button>
        </div>
      </section>

      <section id="cases" className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-4">КЕЙСЫ</h2>
            <p className="text-white/60 text-lg">Реальные результаты наших клиентов</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cases.map((item, index) => (
              <div key={index} className="group relative overflow-hidden rounded-lg border border-white/10 hover:border-primary/50 transition-all">
                <div className="aspect-[4/3] overflow-hidden">
                  <img 
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6 bg-gradient-to-t from-black via-black/80 to-transparent absolute bottom-0 left-0 right-0">
                  <div className="text-xs text-primary font-bold mb-2">{item.title}</div>
                  <div className="text-sm text-white/80 mb-4">{item.description}</div>
                  <div className="flex items-baseline gap-2">
                    <div className="text-3xl font-bold text-primary">{item.stats.metric}</div>
                    <div className="text-xs text-white/60">{item.stats.label}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-white/5">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-4">ПОЧЕМУ КОНТЕКСТ</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="border-l-4 border-primary pl-6">
                <h3 className="text-xl font-bold mb-2">Быстрый старт</h3>
                <p className="text-white/60">Первые заявки уже через 24 часа после запуска рекламы</p>
              </div>
              <div className="border-l-4 border-primary pl-6">
                <h3 className="text-xl font-bold mb-2">Точный таргетинг</h3>
                <p className="text-white/60">Показываем рекламу только тем, кто ищет ваш продукт прямо сейчас</p>
              </div>
              <div className="border-l-4 border-primary pl-6">
                <h3 className="text-xl font-bold mb-2">Полный контроль</h3>
                <p className="text-white/60">Прозрачная аналитика и отчётность по каждому рублю</p>
              </div>
            </div>
            <div className="rounded-lg overflow-hidden border border-white/10">
              <img 
                src="https://cdn.poehali.dev/files/3ea97814-b369-4ea6-9475-282202bed0fc.jpg"
                alt="Аналитика"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-4">РАБОЧАЯ СТРАТЕГИЯ</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Исследование ниши', description: 'Анализируем конкурентов и целевую аудиторию' },
              { title: 'Разработка стратегии', description: 'Создаём индивидуальный план продвижения' },
              { title: 'Настройка кампаний', description: 'Запускаем рекламу на всех площадках' },
              { title: 'Тестирование', description: 'A/B тесты объявлений и посадочных страниц' },
              { title: 'Оптимизация', description: 'Постоянное улучшение результатов' },
              { title: 'Масштабирование', description: 'Увеличение бюджета на эффективные каналы' }
            ].map((item, index) => (
              <div key={index} className="p-6 border border-white/10 rounded-lg hover:border-primary/50 transition-colors">
                <div className="text-6xl font-bold text-white/10 mb-4">0{index + 1}</div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-white/60">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-white/5">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-4">ЭТАПЫ РАБОТ</h2>
          </div>
          <div className="max-w-4xl mx-auto space-y-8">
            {[
              { number: '01', title: 'Знакомство и анализ', duration: '1-2 дня', description: 'Изучаем ваш бизнес, анализируем рынок и конкурентов' },
              { number: '02', title: 'Стратегия', duration: '3-5 дней', description: 'Разрабатываем подробный план продвижения с прогнозом результатов' },
              { number: '03', title: 'Запуск', duration: '5-7 дней', description: 'Настраиваем и запускаем рекламные кампании' },
              { number: '04', title: 'Оптимизация', duration: 'постоянно', description: 'Анализируем результаты и улучшаем показатели' }
            ].map((item, index) => (
              <div key={index} className="flex items-start gap-6 p-6 border border-white/10 rounded-lg">
                <div className="text-5xl font-bold text-primary">{item.number}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-2xl font-bold">{item.title}</h3>
                    <div className="text-sm text-white/60">{item.duration}</div>
                  </div>
                  <p className="text-white/60">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button size="lg" className="bg-primary text-black hover:bg-primary/90 font-bold text-lg px-12 py-6">
              НАЧАТЬ СОТРУДНИЧЕСТВО
            </Button>
          </div>
        </div>
      </section>

      <section id="pricing" className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-4">ЦЕНЫ</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              {
                name: 'СТАРТ',
                price: '50 000',
                features: [
                  'Яндекс.Директ или Google Ads',
                  'До 2 рекламных кампаний',
                  'Базовая аналитика',
                  'Еженедельные отчёты',
                  'Оптимизация ставок'
                ]
              },
              {
                name: 'БИЗНЕС',
                price: '100 000',
                features: [
                  'Яндекс + Google + соцсети',
                  'До 5 рекламных кампаний',
                  'Расширенная аналитика',
                  'A/B тестирование',
                  'Еженедельные созвоны',
                  'Личный менеджер'
                ],
                popular: true
              },
              {
                name: 'МАКСИМУМ',
                price: 'от 200 000',
                features: [
                  'Все рекламные каналы',
                  'Неограниченно кампаний',
                  'Глубокая аналитика + BI',
                  'Стратегическое планирование',
                  'Выделенная команда',
                  'Приоритетная поддержка'
                ]
              }
            ].map((plan, index) => (
              <div 
                key={index} 
                className={`p-8 border rounded-lg ${
                  plan.popular 
                    ? 'border-primary bg-primary/5' 
                    : 'border-white/10'
                }`}
              >
                {plan.popular && (
                  <div className="text-xs text-primary font-bold mb-4">ПОПУЛЯРНЫЙ</div>
                )}
                <div className="text-xl font-bold mb-2">{plan.name}</div>
                <div className="text-4xl font-bold mb-6">
                  {plan.price} <span className="text-lg text-white/60">₽/мес</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <Icon name="Check" className="text-primary flex-shrink-0 mt-0.5" size={16} />
                      <span className="text-white/80">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  className={`w-full ${
                    plan.popular 
                      ? 'bg-primary text-black hover:bg-primary/90' 
                      : 'bg-white/10 hover:bg-white/20'
                  } font-bold`}
                >
                  ВЫБРАТЬ ТАРИФ
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-white/5">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-4">О НАС ГОВОРЯТ</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                name: 'Алексей Иванов',
                company: 'Директор, Недвижимость СПб',
                text: 'За 3 месяца работы количество заявок выросло в 3 раза, а стоимость лида снизилась на 40%. Отличная команда!'
              },
              {
                name: 'Мария Петрова',
                company: 'Владелец, Интернет-магазин',
                text: 'Профессиональный подход к делу. Прозрачная отчётность и реальные результаты. Рекомендую!'
              },
              {
                name: 'Дмитрий Сидоров',
                company: 'CEO, Медицинский центр',
                text: 'Наконец-то нашли агентство, которое работает на результат. ROI вырос в 2 раза за полгода.'
              },
              {
                name: 'Елена Краснова',
                company: 'Маркетолог, IT-компания',
                text: 'Отличное понимание специфики B2B. Качественные лиды и стабильный поток заявок.'
              }
            ].map((review, index) => (
              <div key={index} className="p-6 border border-white/10 rounded-lg">
                <p className="text-white/80 mb-6 italic">"{review.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/20 rounded-full"></div>
                  <div>
                    <div className="font-bold">{review.name}</div>
                    <div className="text-sm text-white/60">{review.company}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-32 px-6">
        <div className="container mx-auto max-w-2xl text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">НАЧНИТЕ РАСТИ УЖЕ СЕГОДНЯ</h2>
          <p className="text-xl text-white/60 mb-12">
            Оставьте заявку и получите бесплатный аудит вашей рекламы
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
            <Input
              type="tel"
              placeholder="+7 (___) ___-__-__"
              value={phone}
              onChange={handlePhoneChange}
              className="flex-1 bg-white/5 border-white/20 text-white placeholder:text-white/40 h-14 text-lg"
            />
            <Button 
              type="submit" 
              size="lg" 
              className="bg-primary text-black hover:bg-primary/90 font-bold text-lg px-12 h-14"
            >
              ОТПРАВИТЬ
            </Button>
          </form>
          <p className="text-xs text-white/40 mt-6">
            Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
          </p>
        </div>
      </section>

      <footer className="py-12 px-6 border-t border-white/10">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="text-xl font-bold mb-4">
                0101<span className="text-primary">.STUDIO</span>
              </div>
              <p className="text-sm text-white/60">
                Комплексный маркетинг для роста вашего бизнеса
              </p>
            </div>
            <div>
              <div className="font-bold mb-4">Услуги</div>
              <div className="space-y-2 text-sm text-white/60">
                <div>Контекстная реклама</div>
                <div>Таргетированная реклама</div>
                <div>SEO продвижение</div>
                <div>Аналитика</div>
              </div>
            </div>
            <div>
              <div className="font-bold mb-4">Компания</div>
              <div className="space-y-2 text-sm text-white/60">
                <div>О нас</div>
                <div>Кейсы</div>
                <div>Блог</div>
                <div>Контакты</div>
              </div>
            </div>
            <div>
              <div className="font-bold mb-4">Контакты</div>
              <div className="space-y-2 text-sm text-white/60">
                <div>info@0101.studio</div>
                <div>+7 (999) 123-45-67</div>
                <div className="flex gap-3 mt-4">
                  <div className="w-8 h-8 bg-white/10 rounded-full"></div>
                  <div className="w-8 h-8 bg-white/10 rounded-full"></div>
                  <div className="w-8 h-8 bg-white/10 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center text-sm text-white/40 pt-8 border-t border-white/10">
            © 2024 0101.STUDIO. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
