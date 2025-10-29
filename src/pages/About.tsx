import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import SEO from '@/components/SEO';

const About = () => {
  const stats = [
    { value: '15', label: 'Лет на рынке', icon: 'Calendar' },
    { value: '50K+', label: 'Довольных клиентов', icon: 'Users' },
    { value: '25', label: 'Магазинов по России', icon: 'Store' },
    { value: '500+', label: 'Моделей в наличии', icon: 'Package' }
  ];

  const values = [
    {
      icon: 'ShieldCheck',
      title: 'Качество',
      description: 'Работаем только с официальными поставщиками Apple. Каждое устройство проходит строгий контроль качества.'
    },
    {
      icon: 'Heart',
      title: 'Забота о клиентах',
      description: 'Индивидуальный подход к каждому покупателю. Помогаем с выбором и настройкой устройств.'
    },
    {
      icon: 'Lightbulb',
      title: 'Инновации',
      description: 'Следим за новинками и первыми предлагаем их нашим клиентам. Всегда в курсе технологических трендов.'
    },
    {
      icon: 'Award',
      title: 'Профессионализм',
      description: 'Наша команда — сертифицированные специалисты Apple с многолетним опытом работы.'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="О компании - Apple Store"
        description="Официальный партнёр Apple в России. 15 лет опыта, 25 магазинов, более 50 000 довольных клиентов."
        keywords="о компании, apple store, официальный партнер apple"
        url="https://rick-and-morty.poehali.dev/about"
      />

      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <Icon name="Apple" size={28} className="text-foreground" />
              <span className="text-xl font-semibold">Apple Store</span>
            </Link>
            
            <div className="hidden md:flex items-center gap-8 text-sm">
              <Link to="/catalog" className="text-muted-foreground hover:text-foreground transition-colors">Каталог</Link>
              <Link to="/about" className="text-foreground font-medium">О нас</Link>
              <Link to="/contact" className="text-muted-foreground hover:text-foreground transition-colors">Контакты</Link>
            </div>

            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon">
                <Icon name="Search" size={20} />
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link to="/cart">
                  <Icon name="ShoppingBag" size={20} />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <section className="py-20 px-6 bg-gradient-to-b from-secondary/30 to-background">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">О нашей компании</h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Мы — официальный партнёр Apple в России с 2009 года. Наша миссия — делать инновационные технологии доступными каждому, 
            обеспечивая высочайший уровень сервиса и профессиональную поддержку.
          </p>
        </div>
      </section>

      <section className="py-16 px-6 border-y border-border">
        <div className="container mx-auto max-w-7xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Card key={index} className="p-8 text-center hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name={stat.icon as any} size={32} className="text-accent" />
                </div>
                <div className="text-4xl font-bold mb-2">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="container mx-auto max-w-7xl">
          <h2 className="text-4xl font-bold text-center mb-16">Наши ценности</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="p-8 hover:shadow-lg transition-shadow">
                <div className="w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center mb-6">
                  <Icon name={value.icon as any} size={28} className="text-accent" />
                </div>
                <h3 className="text-2xl font-semibold mb-3">{value.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{value.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <footer className="py-12 px-6 border-t border-border">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center text-sm text-muted-foreground">
            <p>© 2024 Apple Store. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default About;
