import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import SEO from '@/components/SEO';

const Contact = () => {
  const stores = [
    {
      city: 'Москва, ЦУМ',
      address: 'ул. Петровка, 2',
      phone: '+7 (495) 123-45-67',
      hours: '10:00 - 22:00',
      subway: 'Театральная'
    },
    {
      city: 'Москва, Афимолл',
      address: 'Пресненская наб., 2',
      phone: '+7 (495) 234-56-78',
      hours: '10:00 - 22:00',
      subway: 'Выставочная'
    },
    {
      city: 'Санкт-Петербург',
      address: 'Невский пр., 88',
      phone: '+7 (812) 345-67-89',
      hours: '10:00 - 21:00',
      subway: 'Маяковская'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Контакты - Apple Store"
        description="Свяжитесь с нами. Адреса магазинов, телефоны, время работы. Мы всегда готовы помочь."
        keywords="контакты, apple store адреса, телефоны, магазины apple"
        url="https://rick-and-morty.poehali.dev/contact"
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
              <Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors">О нас</Link>
              <Link to="/contact" className="text-foreground font-medium">Контакты</Link>
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

      <div className="py-12 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4">Контакты</h1>
            <p className="text-muted-foreground text-lg">Мы всегда рады помочь вам</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-6">Напишите нам</h2>
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Имя</label>
                  <Input placeholder="Ваше имя" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <Input type="email" placeholder="your@email.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Телефон</label>
                  <Input type="tel" placeholder="+7 (___) ___-__-__" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Сообщение</label>
                  <textarea 
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent min-h-[150px]"
                    placeholder="Ваше сообщение"
                  />
                </div>
                <Button className="w-full" size="lg">
                  Отправить сообщение
                </Button>
              </form>
            </Card>

            <div className="space-y-6">
              <Card className="p-8">
                <h3 className="text-xl font-bold mb-6">Способы связи</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
                      <Icon name="Phone" size={24} className="text-accent" />
                    </div>
                    <div>
                      <div className="font-medium">Телефон</div>
                      <a href="tel:+74951234567" className="text-muted-foreground hover:text-accent">
                        +7 (495) 123-45-67
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
                      <Icon name="Mail" size={24} className="text-accent" />
                    </div>
                    <div>
                      <div className="font-medium">Email</div>
                      <a href="mailto:info@applestore.ru" className="text-muted-foreground hover:text-accent">
                        info@applestore.ru
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
                      <Icon name="MessageCircle" size={24} className="text-accent" />
                    </div>
                    <div>
                      <div className="font-medium">Онлайн-чат</div>
                      <div className="text-muted-foreground">Доступен 24/7</div>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-8">
                <h3 className="text-xl font-bold mb-6">Режим работы</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Понедельник - Пятница</span>
                    <span className="font-medium">10:00 - 22:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Суббота - Воскресенье</span>
                    <span className="font-medium">10:00 - 21:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Праздничные дни</span>
                    <span className="font-medium">11:00 - 20:00</span>
                  </div>
                </div>
              </Card>

              <Card className="p-8">
                <h3 className="text-xl font-bold mb-6">Социальные сети</h3>
                <div className="flex gap-3">
                  <Button variant="outline" size="icon" className="rounded-full">
                    <Icon name="Facebook" size={20} />
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full">
                    <Icon name="Instagram" size={20} />
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full">
                    <Icon name="Twitter" size={20} />
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full">
                    <Icon name="Youtube" size={20} />
                  </Button>
                </div>
              </Card>
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-8">Наши магазины</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {stores.map((store, index) => (
                <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-bold mb-4">{store.city}</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start gap-3">
                      <Icon name="MapPin" size={18} className="text-accent mt-0.5" />
                      <div>
                        <div className="text-muted-foreground">{store.address}</div>
                        {store.subway && (
                          <div className="text-xs text-muted-foreground mt-1">
                            м. {store.subway}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Icon name="Phone" size={18} className="text-accent" />
                      <a href={`tel:${store.phone}`} className="text-muted-foreground hover:text-accent">
                        {store.phone}
                      </a>
                    </div>
                    <div className="flex items-center gap-3">
                      <Icon name="Clock" size={18} className="text-accent" />
                      <span className="text-muted-foreground">{store.hours}</span>
                    </div>
                  </div>
                  <div className="mt-6 pt-6 border-t border-border">
                    <Button variant="outline" className="w-full">
                      Показать на карте
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>

      <footer className="py-12 px-6 border-t border-border mt-20">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center text-sm text-muted-foreground">
            <p>© 2024 Apple Store. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Contact;
