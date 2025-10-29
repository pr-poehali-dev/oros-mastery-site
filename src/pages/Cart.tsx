import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import SEO from '@/components/SEO';

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'iPhone 15 Pro Max',
      price: 129990,
      quantity: 1,
      image: 'https://cdn.poehali.dev/projects/f9f23ac4-7352-47dd-a4bb-81301617dd90/files/7940f217-1753-4487-8069-2d6ce05f4f69.jpg',
      color: 'Титановый синий',
      memory: '256 ГБ'
    },
    {
      id: 2,
      name: 'AirPods Pro 2',
      price: 24990,
      quantity: 1,
      image: 'https://cdn.poehali.dev/projects/f9f23ac4-7352-47dd-a4bb-81301617dd90/files/a6a4b701-6f59-470f-886f-db85ec9dab94.jpg',
      color: 'Белый',
      memory: null
    }
  ]);

  const [promoCode, setPromoCode] = useState('');

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems(items => 
      items.map(item => item.id === id ? { ...item, quantity: newQuantity } : item)
    );
  };

  const removeItem = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = 0;
  const delivery = subtotal > 50000 ? 0 : 500;
  const total = subtotal - discount + delivery;

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Корзина - Apple Store"
        description="Оформление заказа в магазине Apple"
        keywords="корзина, оформление заказа, apple"
        url="https://rick-and-morty.poehali.dev/cart"
      />

      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <Icon name="Apple" size={28} className="text-foreground" />
              <span className="text-xl font-semibold">Apple Store</span>
            </Link>
            
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon">
                <Icon name="Search" size={20} />
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link to="/cart" className="relative">
                  <Icon name="ShoppingBag" size={20} />
                  <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {cartItems.length}
                  </span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="py-12 px-6">
        <div className="container mx-auto max-w-7xl">
          <h1 className="text-4xl font-bold mb-8">Корзина</h1>

          {cartItems.length === 0 ? (
            <Card className="p-12 text-center">
              <div className="w-24 h-24 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                <Icon name="ShoppingBag" size={48} className="text-muted-foreground" />
              </div>
              <h2 className="text-2xl font-bold mb-3">Корзина пуста</h2>
              <p className="text-muted-foreground mb-6">Добавьте товары из каталога</p>
              <Button size="lg" asChild>
                <Link to="/catalog">Перейти в каталог</Link>
              </Button>
            </Card>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                {cartItems.map((item) => (
                  <Card key={item.id} className="p-6">
                    <div className="flex gap-6">
                      <div className="w-32 h-32 bg-secondary/20 rounded-xl flex-shrink-0 p-4">
                        <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="font-semibold text-lg mb-1">{item.name}</h3>
                            <div className="text-sm text-muted-foreground space-y-1">
                              <div>Цвет: {item.color}</div>
                              {item.memory && <div>Память: {item.memory}</div>}
                            </div>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => removeItem(item.id)}
                            className="text-muted-foreground hover:text-destructive"
                          >
                            <Icon name="Trash2" size={20} />
                          </Button>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center border border-border rounded-lg">
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              <Icon name="Minus" size={16} />
                            </Button>
                            <span className="px-4 py-2 font-semibold min-w-[3rem] text-center">
                              {item.quantity}
                            </span>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Icon name="Plus" size={16} />
                            </Button>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold">
                              {(item.price * item.quantity).toLocaleString('ru-RU')} ₽
                            </div>
                            {item.quantity > 1 && (
                              <div className="text-sm text-muted-foreground">
                                {item.price.toLocaleString('ru-RU')} ₽ за шт.
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}

                <Card className="p-6">
                  <h3 className="font-semibold mb-4">Промокод</h3>
                  <div className="flex gap-3">
                    <Input 
                      placeholder="Введите промокод"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="flex-1"
                    />
                    <Button variant="outline">Применить</Button>
                  </div>
                </Card>
              </div>

              <div className="space-y-6">
                <Card className="p-6 sticky top-24">
                  <h3 className="text-xl font-bold mb-6">Итого</h3>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between text-muted-foreground">
                      <span>Товары ({cartItems.length})</span>
                      <span>{subtotal.toLocaleString('ru-RU')} ₽</span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Скидка</span>
                        <span>-{discount.toLocaleString('ru-RU')} ₽</span>
                      </div>
                    )}
                    <div className="flex justify-between text-muted-foreground">
                      <span>Доставка</span>
                      <span>{delivery === 0 ? 'Бесплатно' : `${delivery} ₽`}</span>
                    </div>
                    {subtotal < 50000 && delivery > 0 && (
                      <div className="text-sm text-muted-foreground">
                        До бесплатной доставки: {(50000 - subtotal).toLocaleString('ru-RU')} ₽
                      </div>
                    )}
                  </div>

                  <div className="border-t border-border pt-4 mb-6">
                    <div className="flex justify-between items-baseline">
                      <span className="text-lg font-semibold">К оплате</span>
                      <span className="text-3xl font-bold">{total.toLocaleString('ru-RU')} ₽</span>
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">
                      Или {Math.round(total / 12).toLocaleString('ru-RU')} ₽ × 12 мес
                    </div>
                  </div>

                  <Button className="w-full h-12 text-lg mb-3" size="lg">
                    Оформить заказ
                  </Button>
                  <Button variant="outline" className="w-full" asChild>
                    <Link to="/catalog">Продолжить покупки</Link>
                  </Button>
                </Card>

                <Card className="p-6">
                  <h3 className="font-semibold mb-4">Способы оплаты</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-secondary rounded-lg flex items-center justify-center">
                        <Icon name="CreditCard" size={16} />
                      </div>
                      <span>Банковская карта</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-secondary rounded-lg flex items-center justify-center">
                        <Icon name="Wallet" size={16} />
                      </div>
                      <span>Apple Pay / Google Pay</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-secondary rounded-lg flex items-center justify-center">
                        <Icon name="Banknote" size={16} />
                      </div>
                      <span>Наличные при получении</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-secondary rounded-lg flex items-center justify-center">
                        <Icon name="CalendarDays" size={16} />
                      </div>
                      <span>Рассрочка 0-0-12</span>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <h3 className="font-semibold mb-4">Доставка</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start gap-3">
                      <Icon name="Truck" size={16} className="mt-0.5 text-accent" />
                      <div>
                        <div className="font-medium mb-1">Курьером по Москве</div>
                        <div className="text-muted-foreground">Бесплатно при заказе от 50 000 ₽</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Icon name="PackageCheck" size={16} className="mt-0.5 text-accent" />
                      <div>
                        <div className="font-medium mb-1">Самовывоз</div>
                        <div className="text-muted-foreground">Из 15 магазинов в Москве</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Icon name="MapPin" size={16} className="mt-0.5 text-accent" />
                      <div>
                        <div className="font-medium mb-1">По России</div>
                        <div className="text-muted-foreground">СДЭК, Почта России, курьер</div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          )}
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

export default Cart;
