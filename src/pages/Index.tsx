import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import SEO from '@/components/SEO';

const Index = () => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Apple Store - Официальные продукты Apple в России"
        description="Купить iPhone, MacBook, iPad, Apple Watch и аксессуары с гарантией. Быстрая доставка по всей России."
        keywords="apple, iphone, macbook, ipad, apple watch, airpods, купить apple"
        url="https://rick-and-morty.poehali.dev/"
      />

      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-2xl border-b border-border/50">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Icon name="Apple" size={20} className="text-white" />
              </div>
              <span className="text-lg font-semibold tracking-tight">Apple Store</span>
            </Link>
            
            <div className="hidden lg:flex items-center gap-1">
              <Button variant="ghost" size="sm" className="text-sm font-medium" asChild>
                <Link to="/catalog?category=iphone">iPhone</Link>
              </Button>
              <Button variant="ghost" size="sm" className="text-sm font-medium" asChild>
                <Link to="/catalog?category=mac">Mac</Link>
              </Button>
              <Button variant="ghost" size="sm" className="text-sm font-medium" asChild>
                <Link to="/catalog?category=ipad">iPad</Link>
              </Button>
              <Button variant="ghost" size="sm" className="text-sm font-medium" asChild>
                <Link to="/catalog?category=watch">Watch</Link>
              </Button>
              <Button variant="ghost" size="sm" className="text-sm font-medium" asChild>
                <Link to="/catalog?category=airpods">AirPods</Link>
              </Button>
              <Button variant="ghost" size="sm" className="text-sm font-medium" asChild>
                <Link to="/about">О нас</Link>
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="rounded-full">
                <Icon name="Search" size={18} />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full" asChild>
                <Link to="/cart">
                  <Icon name="ShoppingBag" size={18} />
                </Link>
              </Button>
              <Button size="sm" className="hidden md:flex">
                Связаться
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-transparent"></div>
        <div className="container mx-auto px-4 lg:px-6 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 rounded-full">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-primary">Новинка 2024</span>
              </div>
              
              <div>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-[1.1]">
                  iPhone 15 Pro Max
                </h1>
                <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
                  Титан. Такой прочный. Такой легкий. Такой Pro.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon name="Check" size={14} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">A17 Pro — самый мощный чип</h3>
                    <p className="text-sm text-muted-foreground">Революционная производительность с поддержкой ray-tracing</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon name="Check" size={14} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Pro-камера 48 МП</h3>
                    <p className="text-sm text-muted-foreground">Профессиональная фотосъемка с 5x оптическим зумом</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon name="Check" size={14} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Титановый корпус</h3>
                    <p className="text-sm text-muted-foreground">Прочность аэрокосмического уровня, на 19г легче</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 pt-4">
                <Button size="lg" className="h-14 px-8 text-base shadow-lg shadow-primary/20" asChild>
                  <Link to="/product/1">
                    Купить от 129 990 ₽
                    <Icon name="ArrowRight" size={18} className="ml-2" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="h-14 px-8 text-base" asChild>
                  <Link to="/catalog">Смотреть все модели</Link>
                </Button>
              </div>

              <div className="flex items-center gap-6 pt-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Icon name="Truck" size={16} />
                  <span>Бесплатная доставка</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="ShieldCheck" size={16} />
                  <span>Гарантия 1 год</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="RotateCcw" size={16} />
                  <span>Возврат 14 дней</span>
                </div>
              </div>
            </div>

            <div className="relative lg:pl-12">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-accent/20 blur-3xl opacity-50"></div>
              <img 
                src="https://cdn.poehali.dev/projects/f9f23ac4-7352-47dd-a4bb-81301617dd90/files/7940f217-1753-4487-8069-2d6ce05f4f69.jpg"
                alt="iPhone 15 Pro Max"
                className="relative w-full h-auto drop-shadow-2xl transform hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-card">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { name: 'iPhone', icon: 'Smartphone', color: 'from-blue-500 to-cyan-500' },
              { name: 'Mac', icon: 'Laptop', color: 'from-purple-500 to-pink-500' },
              { name: 'iPad', icon: 'Tablet', color: 'from-orange-500 to-red-500' },
              { name: 'Watch', icon: 'Watch', color: 'from-green-500 to-emerald-500' },
              { name: 'AirPods', icon: 'Headphones', color: 'from-indigo-500 to-blue-500' },
              { name: 'Аксессуары', icon: 'Cable', color: 'from-pink-500 to-rose-500' }
            ].map((cat, index) => (
              <Link 
                key={index}
                to={`/catalog?category=${cat.name.toLowerCase()}`}
                className="group"
              >
                <Card className="p-4 hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer border-border/50">
                  <div className="flex flex-col items-center text-center gap-3">
                    <div className={`w-12 h-12 bg-gradient-to-br ${cat.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg`}>
                      <Icon name={cat.icon as any} size={24} className="text-white" />
                    </div>
                    <span className="font-semibold text-sm">{cat.name}</span>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center mb-16">
            <Badge className="mb-4">Хиты продаж</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Популярные устройства</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Самые востребованные продукты Apple с официальной гарантией
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                id: 1,
                name: 'iPhone 15 Pro Max',
                price: '129 990',
                image: 'https://cdn.poehali.dev/projects/f9f23ac4-7352-47dd-a4bb-81301617dd90/files/7940f217-1753-4487-8069-2d6ce05f4f69.jpg',
                badge: 'Новинка',
                rating: 4.9
              },
              {
                id: 2,
                name: 'MacBook Pro 14" M3',
                price: '189 990',
                image: 'https://cdn.poehali.dev/projects/f9f23ac4-7352-47dd-a4bb-81301617dd90/files/f433707d-2145-4cfd-9be1-e5b767d02b42.jpg',
                badge: 'Популярное',
                rating: 5.0
              },
              {
                id: 3,
                name: 'iPad Air M2',
                price: '69 990',
                image: 'https://cdn.poehali.dev/projects/f9f23ac4-7352-47dd-a4bb-81301617dd90/files/92f60dd8-54d1-42fc-a2f1-313a2277a332.jpg',
                badge: 'Выбор редакции',
                rating: 4.8
              },
              {
                id: 4,
                name: 'AirPods Pro 2',
                price: '24 990',
                image: 'https://cdn.poehali.dev/projects/f9f23ac4-7352-47dd-a4bb-81301617dd90/files/a6a4b701-6f59-470f-886f-db85ec9dab94.jpg',
                badge: 'Бестселлер',
                rating: 4.7
              }
            ].map((product) => (
              <Link key={product.id} to={`/product/${product.id}`} className="group">
                <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 border-border/50">
                  <div className="relative aspect-square bg-gradient-to-br from-muted to-background overflow-hidden">
                    <img 
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-contain p-8 group-hover:scale-110 transition-transform duration-500"
                    />
                    <Badge className="absolute top-4 left-4 shadow-lg">
                      {product.badge}
                    </Badge>
                    <button className="absolute top-4 right-4 w-10 h-10 bg-white/80 backdrop-blur rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:scale-110">
                      <Icon name="Heart" size={18} />
                    </button>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-1 mb-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Icon 
                          key={i} 
                          name="Star" 
                          size={14} 
                          className={`${i < Math.floor(product.rating) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`}
                        />
                      ))}
                      <span className="text-sm text-muted-foreground ml-1">({product.rating})</span>
                    </div>
                    <h3 className="font-semibold text-lg mb-3 group-hover:text-primary transition-colors">
                      {product.name}
                    </h3>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">от</p>
                        <p className="text-2xl font-bold">{product.price} ₽</p>
                      </div>
                      <Button size="icon" className="rounded-full shadow-lg" variant="default">
                        <Icon name="ShoppingCart" size={18} />
                      </Button>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" variant="outline" asChild className="h-12">
              <Link to="/catalog">
                Смотреть весь каталог
                <Icon name="ArrowRight" size={18} className="ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-32 bg-card">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative order-2 lg:order-1">
              <div className="absolute -inset-8 bg-gradient-to-br from-primary/10 to-accent/10 blur-3xl"></div>
              <img 
                src="https://cdn.poehali.dev/projects/f9f23ac4-7352-47dd-a4bb-81301617dd90/files/f433707d-2145-4cfd-9be1-e5b767d02b42.jpg"
                alt="MacBook Pro"
                className="relative w-full h-auto drop-shadow-2xl rounded-3xl"
              />
            </div>
            <div className="space-y-8 order-1 lg:order-2">
              <div>
                <Badge className="mb-4">Профессионалам</Badge>
                <h2 className="text-4xl md:text-5xl font-bold mb-4">MacBook Pro с чипом M3</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Революционная производительность для самых требовательных задач. Мощный процессор M3, 
                  потрясающий дисплей Liquid Retina XDR и автономность до 22 часов.
                </p>
              </div>

              <div className="space-y-4">
                {[
                  { icon: 'Zap', title: 'M3 чип', desc: 'До 40% быстрее M1' },
                  { icon: 'Monitor', title: 'XDR дисплей', desc: 'Яркость до 1600 нит' },
                  { icon: 'Battery', title: '22 часа', desc: 'Работа от батареи' }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 bg-background rounded-2xl border border-border/50">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon name={item.icon as any} size={24} className="text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Button size="lg" className="h-12" asChild>
                <Link to="/product/2">
                  Узнать больше
                  <Icon name="ArrowRight" size={18} className="ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Почему выбирают нас</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Официальный партнёр Apple с безупречной репутацией
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: 'ShieldCheck',
                title: 'Официальная гарантия',
                description: 'Все товары с гарантией Apple. Полное сервисное обслуживание в авторизованных центрах по всей России.'
              },
              {
                icon: 'Truck',
                title: 'Быстрая доставка',
                description: 'Доставка по Москве в день заказа. По России — от 1 до 3 дней. Бережная упаковка и страхование груза.'
              },
              {
                icon: 'CreditCard',
                title: 'Удобная оплата',
                description: 'Рассрочка 0% на 12 месяцев без переплат. Принимаем карты, наличные, Apple Pay и криптовалюту.'
              },
              {
                icon: 'Repeat',
                title: 'Trade-In',
                description: 'Обменяйте старое устройство на новое с выгодой до 50 000 ₽. Быстрая оценка и моментальная выплата.'
              },
              {
                icon: 'Award',
                title: 'Бонусная программа',
                description: 'Накапливайте баллы за каждую покупку. Получайте эксклюзивные предложения и ранний доступ к новинкам.'
              },
              {
                icon: 'Headphones',
                title: 'Поддержка 24/7',
                description: 'Сертифицированные специалисты Apple помогут с выбором, настройкой и решением любых вопросов.'
              }
            ].map((feature, index) => (
              <Card key={index} className="p-8 hover:shadow-2xl transition-all duration-300 border-border/50 group hover:-translate-y-1">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
                  <Icon name={feature.icon as any} size={28} className="text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-32 bg-gradient-to-br from-primary/5 via-accent/5 to-transparent">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="max-w-5xl mx-auto">
            <Card className="overflow-hidden border-border/50 shadow-2xl">
              <div className="grid md:grid-cols-2">
                <div className="p-8 lg:p-12 space-y-6">
                  <div>
                    <Badge className="mb-4">Эксклюзивное предложение</Badge>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Получите консультацию эксперта</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      Оставьте заявку, и наш специалист поможет подобрать идеальное устройство Apple под ваши задачи
                    </p>
                  </div>

                  <form className="space-y-4">
                    <div>
                      <Input 
                        type="text"
                        placeholder="Ваше имя"
                        className="h-12"
                      />
                    </div>
                    <div>
                      <Input 
                        type="tel"
                        placeholder="+7 (___) ___-__-__"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="h-12"
                      />
                    </div>
                    <Button className="w-full h-12 shadow-lg shadow-primary/20">
                      Получить консультацию
                      <Icon name="ArrowRight" size={18} className="ml-2" />
                    </Button>
                    <p className="text-xs text-muted-foreground text-center">
                      Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
                    </p>
                  </form>
                </div>

                <div className="relative hidden md:block">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20"></div>
                  <img 
                    src="https://cdn.poehali.dev/projects/f9f23ac4-7352-47dd-a4bb-81301617dd90/files/0cf6cd8b-4be7-4da8-924c-bce479bbeb84.jpg"
                    alt="Консультация"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 bg-card">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Подпишитесь на новости</h2>
            <p className="text-muted-foreground mb-8">
              Узнавайте первыми о новинках Apple, эксклюзивных предложениях и специальных акциях
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input 
                type="email"
                placeholder="Ваш email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 flex-1"
              />
              <Button className="h-12 px-8 shadow-lg shadow-primary/20">
                Подписаться
              </Button>
            </form>
          </div>
        </div>
      </section>

      <footer className="bg-card border-t border-border/50">
        <div className="container mx-auto px-4 lg:px-6 py-12">
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
            <div className="lg:col-span-2">
              <Link to="/" className="flex items-center gap-2 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center">
                  <Icon name="Apple" size={22} className="text-white" />
                </div>
                <span className="text-xl font-semibold">Apple Store</span>
              </Link>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Официальный магазин продукции Apple в России. Гарантия качества и профессиональный сервис.
              </p>
              <div className="flex gap-3">
                {['Facebook', 'Instagram', 'Twitter', 'Youtube'].map((social) => (
                  <button key={social} className="w-10 h-10 bg-muted rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                    <Icon name={social as any} size={18} />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Магазин</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                {['iPhone', 'Mac', 'iPad', 'Watch', 'AirPods'].map((item) => (
                  <li key={item}>
                    <Link to={`/catalog?category=${item.toLowerCase()}`} className="hover:text-foreground transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Информация</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                {[
                  { label: 'О компании', to: '/about' },
                  { label: 'Контакты', to: '/contact' },
                  { label: 'Доставка', to: '#' },
                  { label: 'Оплата', to: '#' },
                  { label: 'Гарантия', to: '#' }
                ].map((item) => (
                  <li key={item.label}>
                    <Link to={item.to} className="hover:text-foreground transition-colors">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Контакты</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Icon name="Phone" size={14} />
                  <a href="tel:+74951234567" className="hover:text-foreground transition-colors">
                    +7 (495) 123-45-67
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="Mail" size={14} />
                  <a href="mailto:info@applestore.ru" className="hover:text-foreground transition-colors">
                    info@applestore.ru
                  </a>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="MapPin" size={14} className="mt-0.5" />
                  <span>Москва, ул. Тверская, 1</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-border/50 text-center text-sm text-muted-foreground">
            <p>© 2024 Apple Store. Все права защищены. Политика конфиденциальности</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
