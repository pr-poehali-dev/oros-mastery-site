import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import SEO from '@/components/SEO';

const Index = () => {
  const [cartCount] = useState(0);

  const featuredProducts = [
    {
      id: 1,
      name: 'iPhone 15 Pro Max',
      price: '129 990',
      image: 'https://cdn.poehali.dev/projects/f9f23ac4-7352-47dd-a4bb-81301617dd90/files/7940f217-1753-4487-8069-2d6ce05f4f69.jpg',
      badge: 'Новинка',
      colors: ['Титановый синий', 'Титановый черный', 'Титановый натуральный']
    },
    {
      id: 2,
      name: 'MacBook Pro 14" M3',
      price: '189 990',
      image: 'https://cdn.poehali.dev/projects/f9f23ac4-7352-47dd-a4bb-81301617dd90/files/f433707d-2145-4cfd-9be1-e5b767d02b42.jpg',
      badge: 'Популярное',
      colors: ['Space Gray', 'Silver']
    },
    {
      id: 3,
      name: 'Apple Watch Ultra 2',
      price: '89 990',
      image: 'https://cdn.poehali.dev/projects/f9f23ac4-7352-47dd-a4bb-81301617dd90/files/0cf6cd8b-4be7-4da8-924c-bce479bbeb84.jpg',
      badge: 'Хит продаж',
      colors: ['Титан', 'Черный титан']
    },
    {
      id: 4,
      name: 'AirPods Pro 2',
      price: '24 990',
      image: 'https://cdn.poehali.dev/projects/f9f23ac4-7352-47dd-a4bb-81301617dd90/files/a6a4b701-6f59-470f-886f-db85ec9dab94.jpg',
      badge: 'Бестселлер',
      colors: ['Белый']
    }
  ];

  const categories = [
    { name: 'iPhone', icon: 'Smartphone', count: '24 модели' },
    { name: 'Mac', icon: 'Laptop', count: '18 моделей' },
    { name: 'iPad', icon: 'Tablet', count: '12 моделей' },
    { name: 'Watch', icon: 'Watch', count: '8 моделей' },
    { name: 'AirPods', icon: 'Headphones', count: '6 моделей' },
    { name: 'Аксессуары', icon: 'Cable', count: '100+ товаров' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Apple Store - Официальные продукты Apple в России"
        description="Купить iPhone, MacBook, iPad, Apple Watch и аксессуары с гарантией. Быстрая доставка по всей России."
        keywords="apple, iphone, macbook, ipad, apple watch, airpods, купить apple"
        url="https://rick-and-morty.poehali.dev/"
      />

      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <Icon name="Apple" size={28} className="text-foreground" />
              <span className="text-xl font-semibold">Apple Store</span>
            </Link>
            
            <div className="hidden md:flex items-center gap-8 text-sm">
              <Link to="/catalog?category=iphone" className="text-muted-foreground hover:text-foreground transition-colors">iPhone</Link>
              <Link to="/catalog?category=mac" className="text-muted-foreground hover:text-foreground transition-colors">Mac</Link>
              <Link to="/catalog?category=ipad" className="text-muted-foreground hover:text-foreground transition-colors">iPad</Link>
              <Link to="/catalog?category=watch" className="text-muted-foreground hover:text-foreground transition-colors">Watch</Link>
              <Link to="/catalog?category=airpods" className="text-muted-foreground hover:text-foreground transition-colors">AirPods</Link>
              <Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors">О нас</Link>
              <Link to="/contact" className="text-muted-foreground hover:text-foreground transition-colors">Контакты</Link>
            </div>

            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon">
                <Icon name="Search" size={20} />
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link to="/cart" className="relative">
                  <Icon name="ShoppingBag" size={20} />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <section className="relative py-20 px-6 bg-gradient-to-b from-secondary/30 to-background overflow-hidden">
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <Badge className="bg-accent text-accent-foreground">Новинка</Badge>
              <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                iPhone 15 Pro Max
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Титан. Такой прочный. Такой легкий. Такой Pro.
              </p>
              <ul className="space-y-3 text-lg">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span>Процессор A17 Pro — мощнее всех</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span>Титановый корпус — прочность и легкость</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span>Pro‑камера 48 МП с 5x зумом</span>
                </li>
              </ul>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" asChild className="text-lg">
                  <Link to="/product/1">Купить от 129 990 ₽</Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="text-lg">
                  <Link to="/catalog">Все модели iPhone</Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-accent/20 to-transparent blur-3xl"></div>
              <img 
                src="https://cdn.poehali.dev/projects/f9f23ac4-7352-47dd-a4bb-81301617dd90/files/7940f217-1753-4487-8069-2d6ce05f4f69.jpg"
                alt="iPhone 15 Pro Max"
                className="relative w-full h-auto object-contain drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 border-y border-border">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category, index) => (
              <Link 
                key={index}
                to={`/catalog?category=${category.name.toLowerCase()}`}
                className="group"
              >
                <Card className="p-6 text-center hover:shadow-lg transition-all hover:scale-105 cursor-pointer">
                  <div className="mb-4 flex justify-center">
                    <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center group-hover:bg-accent/10 transition-colors">
                      <Icon name={category.icon as any} size={32} className="text-foreground group-hover:text-accent transition-colors" />
                    </div>
                  </div>
                  <h3 className="font-semibold mb-1">{category.name}</h3>
                  <p className="text-xs text-muted-foreground">{category.count}</p>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-4xl font-bold mb-2">Популярные товары</h2>
              <p className="text-muted-foreground">Самые продаваемые устройства Apple</p>
            </div>
            <Button variant="outline" asChild>
              <Link to="/catalog">Смотреть все</Link>
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <Link key={product.id} to={`/product/${product.id}`}>
                <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300">
                  <div className="relative aspect-square bg-secondary/30 overflow-hidden">
                    <img 
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-contain p-8 group-hover:scale-110 transition-transform duration-500"
                    />
                    <Badge className="absolute top-4 left-4 bg-accent text-accent-foreground">
                      {product.badge}
                    </Badge>
                  </div>
                  <div className="p-6">
                    <h3 className="font-semibold text-lg mb-2 group-hover:text-accent transition-colors">
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-2 mb-3">
                      {product.colors.slice(0, 3).map((_, i) => (
                        <div key={i} className="w-5 h-5 rounded-full border-2 border-border bg-muted"></div>
                      ))}
                      {product.colors.length > 3 && (
                        <span className="text-xs text-muted-foreground">+{product.colors.length - 3}</span>
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">от</p>
                        <p className="text-2xl font-bold">{product.price} ₽</p>
                      </div>
                      <Button size="icon" className="rounded-full">
                        <Icon name="Plus" size={20} />
                      </Button>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-secondary/20">
        <div className="container mx-auto max-w-7xl">
          <h2 className="text-4xl font-bold text-center mb-16">Почему выбирают нас</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: 'ShieldCheck',
                title: 'Официальная гарантия',
                description: 'Все товары с официальной гарантией Apple. Полное сервисное обслуживание.'
              },
              {
                icon: 'Truck',
                title: 'Быстрая доставка',
                description: 'Доставка по Москве в день заказа. По России — от 1 до 3 дней.'
              },
              {
                icon: 'CreditCard',
                title: 'Удобная оплата',
                description: 'Рассрочка 0% на 12 месяцев. Оплата картой, наличными или криптовалютой.'
              },
              {
                icon: 'Repeat',
                title: 'Trade-in',
                description: 'Обменяйте старое устройство на новое с выгодой до 50 000 ₽.'
              },
              {
                icon: 'Award',
                title: 'Бонусная программа',
                description: 'Накапливайте баллы и получайте скидки на следующие покупки.'
              },
              {
                icon: 'Headphones',
                title: 'Поддержка 24/7',
                description: 'Наши эксперты всегда готовы помочь с выбором и настройкой.'
              }
            ].map((feature, index) => (
              <Card key={index} className="p-8 hover:shadow-lg transition-shadow">
                <div className="w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center mb-6">
                  <Icon name={feature.icon as any} size={28} className="text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="bg-gradient-to-r from-accent/10 via-accent/5 to-transparent rounded-3xl p-12 text-center">
            <h2 className="text-4xl font-bold mb-4">Подпишитесь на новости</h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
              Узнавайте первыми о новинках, эксклюзивных предложениях и специальных акциях
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input 
                type="email"
                placeholder="Ваш email"
                className="flex-1 px-6 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent"
              />
              <Button size="lg" className="px-8">
                Подписаться
              </Button>
            </form>
          </div>
        </div>
      </section>

      <footer className="py-12 px-6 border-t border-border">
        <div className="container mx-auto max-w-7xl">
          <div className="grid md:grid-cols-5 gap-8 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <Icon name="Apple" size={32} />
                <span className="text-xl font-semibold">Apple Store</span>
              </div>
              <p className="text-muted-foreground mb-6">
                Официальный магазин продукции Apple в России. Гарантия качества и профессиональный сервис.
              </p>
              <div className="flex gap-3">
                <Button variant="outline" size="icon" className="rounded-full">
                  <Icon name="Facebook" size={18} />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full">
                  <Icon name="Instagram" size={18} />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full">
                  <Icon name="Twitter" size={18} />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full">
                  <Icon name="Youtube" size={18} />
                </Button>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Магазин</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li><Link to="/catalog?category=iphone" className="hover:text-foreground transition-colors">iPhone</Link></li>
                <li><Link to="/catalog?category=mac" className="hover:text-foreground transition-colors">Mac</Link></li>
                <li><Link to="/catalog?category=ipad" className="hover:text-foreground transition-colors">iPad</Link></li>
                <li><Link to="/catalog?category=watch" className="hover:text-foreground transition-colors">Watch</Link></li>
                <li><Link to="/catalog?category=airpods" className="hover:text-foreground transition-colors">AirPods</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Информация</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li><Link to="/about" className="hover:text-foreground transition-colors">О компании</Link></li>
                <li><Link to="/contact" className="hover:text-foreground transition-colors">Контакты</Link></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Доставка</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Оплата</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Гарантия</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Контакты</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Icon name="Phone" size={16} />
                  <span>+7 (495) 123-45-67</span>
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="Mail" size={16} />
                  <span>info@applestore.ru</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="MapPin" size={16} className="mt-0.5" />
                  <span>Москва, ул. Тверская, 1</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-border text-center text-sm text-muted-foreground">
            <p>© 2024 Apple Store. Все права защищены. Политика конфиденциальности</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
