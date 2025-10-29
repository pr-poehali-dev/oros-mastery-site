import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Icon from '@/components/ui/icon';
import SEO from '@/components/SEO';

const Product = () => {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedMemory, setSelectedMemory] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const product = {
    id: 1,
    name: 'iPhone 15 Pro Max',
    price: 129990,
    oldPrice: null,
    rating: 4.9,
    reviews: 324,
    inStock: true,
    sku: 'IP15PM-256-TB',
    images: [
      'https://cdn.poehali.dev/projects/f9f23ac4-7352-47dd-a4bb-81301617dd90/files/7940f217-1753-4487-8069-2d6ce05f4f69.jpg',
      'https://cdn.poehali.dev/projects/f9f23ac4-7352-47dd-a4bb-81301617dd90/files/7940f217-1753-4487-8069-2d6ce05f4f69.jpg',
      'https://cdn.poehali.dev/projects/f9f23ac4-7352-47dd-a4bb-81301617dd90/files/7940f217-1753-4487-8069-2d6ce05f4f69.jpg',
      'https://cdn.poehali.dev/projects/f9f23ac4-7352-47dd-a4bb-81301617dd90/files/7940f217-1753-4487-8069-2d6ce05f4f69.jpg'
    ],
    colors: [
      { name: 'Титановый синий', hex: '#394867' },
      { name: 'Титановый черный', hex: '#1a1a1a' },
      { name: 'Титановый натуральный', hex: '#c0c0c0' },
      { name: 'Титановый белый', hex: '#f5f5f5' }
    ],
    memory: [
      { size: '256 ГБ', price: 129990 },
      { size: '512 ГБ', price: 149990 },
      { size: '1 ТБ', price: 169990 }
    ],
    description: 'iPhone 15 Pro Max — это наш самый продвинутый iPhone. Титановый корпус невероятно прочный и удивительно легкий. Процессор A17 Pro обеспечивает невероятную производительность. Камера Pro с 5x оптическим зумом позволяет снимать на профессиональном уровне.',
    features: [
      {
        icon: 'Cpu',
        title: 'A17 Pro чип',
        description: 'Самый быстрый чип в смартфоне с поддержкой ray-tracing'
      },
      {
        icon: 'Camera',
        title: 'Камера Pro 48 МП',
        description: 'Снимайте в формате ProRAW с 5x оптическим зумом'
      },
      {
        icon: 'Shield',
        title: 'Титановый корпус',
        description: 'Прочность аэрокосмического уровня, легче на 19 грамм'
      },
      {
        icon: 'Battery',
        title: 'Автономность',
        description: 'До 29 часов воспроизведения видео'
      },
      {
        icon: 'Smartphone',
        title: 'Super Retina XDR',
        description: 'Дисплей 6.7" с яркостью до 2000 нит'
      },
      {
        icon: 'Zap',
        title: 'USB-C 3.0',
        description: 'Скорость передачи данных до 10 Гбит/с'
      }
    ],
    specs: {
      'Дисплей': {
        'Размер': '6.7 дюйма',
        'Технология': 'Super Retina XDR OLED',
        'Разрешение': '2796 × 1290 пикселей (460 ppi)',
        'Яркость': 'До 2000 нит',
        'Частота обновления': 'ProMotion до 120 Гц',
        'HDR': 'Dolby Vision, HDR10'
      },
      'Процессор': {
        'Чип': 'A17 Pro',
        'Архитектура': '3-нм технология',
        'Ядра': '6‑ядерный ЦП (2 производительных + 4 энергоэффективных)',
        'GPU': '6‑ядерный графический процессор',
        'Neural Engine': '16‑ядерный, 35 трлн операций/с'
      },
      'Камеры': {
        'Основная': '48 МП, f/1.78, 24 мм (основная)',
        'Ультраширокоугольная': '12 МП, f/2.2, 13 мм',
        'Телеобъектив': '12 МП, f/2.8, 120 мм (5x оптический зум)',
        'Фронтальная': '12 МП, f/1.9, TrueDepth',
        'Видео': '4K ProRes, Dolby Vision до 60 fps',
        'Особенности': 'Ночной режим, Deep Fusion, Smart HDR 5'
      },
      'Автономность': {
        'Воспроизведение видео': 'До 29 часов',
        'Потоковое видео': 'До 25 часов',
        'Аудио': 'До 95 часов',
        'Зарядка': 'Быстрая зарядка USB-C, MagSafe до 15 Вт, Qi до 7.5 Вт'
      },
      'Корпус и защита': {
        'Материалы': 'Титан аэрокосмического уровня',
        'Защита': 'Ceramic Shield, IP68',
        'Водонепроницаемость': 'До 6 метров на 30 минут',
        'Вес': '221 грамм',
        'Толщина': '8.25 мм'
      },
      'Связь': {
        '5G': 'Sub‑6 ГГц и mmWave',
        'Wi-Fi': 'Wi‑Fi 6E (802.11ax)',
        'Bluetooth': '5.3',
        'NFC': 'Да, с режимом считывания',
        'Спутниковая связь': 'Emergency SOS via satellite'
      }
    }
  };

  const relatedProducts = [
    {
      id: 2,
      name: 'iPhone 15',
      price: 89990,
      image: 'https://cdn.poehali.dev/projects/f9f23ac4-7352-47dd-a4bb-81301617dd90/files/7940f217-1753-4487-8069-2d6ce05f4f69.jpg'
    },
    {
      id: 3,
      name: 'AirPods Pro 2',
      price: 24990,
      image: 'https://cdn.poehali.dev/projects/f9f23ac4-7352-47dd-a4bb-81301617dd90/files/a6a4b701-6f59-470f-886f-db85ec9dab94.jpg'
    },
    {
      id: 4,
      name: 'MagSafe чехол',
      price: 5990,
      image: 'https://cdn.poehali.dev/projects/f9f23ac4-7352-47dd-a4bb-81301617dd90/files/7940f217-1753-4487-8069-2d6ce05f4f69.jpg'
    },
    {
      id: 5,
      name: 'Apple Watch Ultra 2',
      price: 89990,
      image: 'https://cdn.poehali.dev/projects/f9f23ac4-7352-47dd-a4bb-81301617dd90/files/0cf6cd8b-4be7-4da8-924c-bce479bbeb84.jpg'
    }
  ];

  const reviews = [
    {
      author: 'Александр К.',
      rating: 5,
      date: '15 октября 2024',
      text: 'Отличный телефон! Камера просто невероятная, особенно ночные снимки. Титановый корпус ощущается премиально. Батарея держит весь день активного использования.',
      verified: true
    },
    {
      author: 'Мария П.',
      rating: 5,
      date: '12 октября 2024',
      text: 'Перешла с iPhone 12 Pro — разница колоссальная. Экран ярче, телефон легче, камера снимает как профессиональная техника. Очень довольна покупкой!',
      verified: true
    },
    {
      author: 'Дмитрий С.',
      rating: 4,
      date: '8 октября 2024',
      text: 'Хороший флагман, но цена кусается. Если у вас iPhone 14 Pro, можно пропустить это поколение. Для остальных — отличный выбор.',
      verified: true
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={`${product.name} - Купить по цене ${product.price.toLocaleString('ru-RU')} ₽`}
        description={product.description}
        keywords={`${product.name}, купить iphone, apple`}
        url={`https://rick-and-morty.poehali.dev/product/${id}`}
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
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="py-8 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="mb-6">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link to="/" className="hover:text-foreground">Главная</Link>
              <Icon name="ChevronRight" size={14} />
              <Link to="/catalog" className="hover:text-foreground">Каталог</Link>
              <Icon name="ChevronRight" size={14} />
              <span className="text-foreground">{product.name}</span>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            <div className="space-y-4">
              <div className="aspect-square bg-secondary/20 rounded-2xl overflow-hidden">
                <img 
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-contain p-12"
                />
              </div>
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square bg-secondary/20 rounded-xl overflow-hidden border-2 transition-all ${
                      selectedImage === index ? 'border-accent' : 'border-transparent'
                    }`}
                  >
                    <img src={img} alt={`${product.name} ${index + 1}`} className="w-full h-full object-contain p-3" />
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <Badge className="bg-accent text-accent-foreground">Новинка</Badge>
                  {product.inStock && (
                    <Badge variant="outline" className="text-green-600 border-green-600">
                      <Icon name="Check" size={14} className="mr-1" /> В наличии
                    </Badge>
                  )}
                </div>
                <h1 className="text-4xl font-bold mb-3">{product.name}</h1>
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Icon 
                        key={i} 
                        name="Star" 
                        size={18} 
                        className={`${i < Math.floor(product.rating) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {product.rating} ({product.reviews} отзывов)
                  </span>
                </div>
                <p className="text-muted-foreground text-sm">Артикул: {product.sku}</p>
              </div>

              <div className="border-t border-b border-border py-6">
                <div className="flex items-baseline gap-4 mb-2">
                  <div className="text-4xl font-bold">
                    {product.memory[selectedMemory].price.toLocaleString('ru-RU')} ₽
                  </div>
                  {product.oldPrice && (
                    <div className="text-xl text-muted-foreground line-through">
                      {product.oldPrice.toLocaleString('ru-RU')} ₽
                    </div>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">Рассрочка 0% — от {Math.round(product.memory[selectedMemory].price / 12).toLocaleString('ru-RU')} ₽/мес</p>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Цвет: {product.colors[selectedColor].name}</h3>
                <div className="flex gap-3">
                  {product.colors.map((color, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedColor(index)}
                      className={`w-12 h-12 rounded-full border-2 transition-all ${
                        selectedColor === index ? 'border-accent scale-110' : 'border-border'
                      }`}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Память</h3>
                <div className="grid grid-cols-3 gap-3">
                  {product.memory.map((mem, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedMemory(index)}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        selectedMemory === index 
                          ? 'border-accent bg-accent/5' 
                          : 'border-border hover:border-accent/50'
                      }`}
                    >
                      <div className="font-semibold">{mem.size}</div>
                      <div className="text-sm text-muted-foreground">{mem.price.toLocaleString('ru-RU')} ₽</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center border border-border rounded-lg">
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    <Icon name="Minus" size={16} />
                  </Button>
                  <span className="px-6 py-2 font-semibold">{quantity}</span>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Icon name="Plus" size={16} />
                  </Button>
                </div>
                <Button className="flex-1 h-12 text-lg" size="lg">
                  <Icon name="ShoppingCart" size={20} className="mr-2" />
                  Добавить в корзину
                </Button>
                <Button variant="outline" size="icon" className="h-12 w-12">
                  <Icon name="Heart" size={20} />
                </Button>
              </div>

              <div className="bg-secondary/20 rounded-xl p-6 space-y-3">
                <div className="flex items-center gap-3">
                  <Icon name="Truck" size={20} className="text-accent" />
                  <span className="text-sm">Бесплатная доставка по Москве</span>
                </div>
                <div className="flex items-center gap-3">
                  <Icon name="RotateCcw" size={20} className="text-accent" />
                  <span className="text-sm">Возврат в течение 14 дней</span>
                </div>
                <div className="flex items-center gap-3">
                  <Icon name="ShieldCheck" size={20} className="text-accent" />
                  <span className="text-sm">Официальная гарантия Apple 1 год</span>
                </div>
                <div className="flex items-center gap-3">
                  <Icon name="CreditCard" size={20} className="text-accent" />
                  <span className="text-sm">Оплата при получении или картой</span>
                </div>
              </div>
            </div>
          </div>

          <Tabs defaultValue="description" className="mb-16">
            <TabsList className="grid w-full max-w-3xl grid-cols-3">
              <TabsTrigger value="description">Описание</TabsTrigger>
              <TabsTrigger value="specs">Характеристики</TabsTrigger>
              <TabsTrigger value="reviews">Отзывы ({product.reviews})</TabsTrigger>
            </TabsList>
            
            <TabsContent value="description" className="mt-8">
              <div className="max-w-4xl">
                <h2 className="text-3xl font-bold mb-6">О товаре</h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-12">
                  {product.description}
                </p>

                <h3 className="text-2xl font-bold mb-6">Основные возможности</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {product.features.map((feature, index) => (
                    <Card key={index} className="p-6">
                      <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-4">
                        <Icon name={feature.icon as any} size={24} className="text-accent" />
                      </div>
                      <h4 className="font-semibold mb-2">{feature.title}</h4>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="specs" className="mt-8">
              <div className="max-w-4xl space-y-8">
                {Object.entries(product.specs).map(([category, specs]) => (
                  <Card key={category} className="p-6">
                    <h3 className="text-xl font-bold mb-4">{category}</h3>
                    <div className="space-y-3">
                      {Object.entries(specs).map(([key, value]) => (
                        <div key={key} className="flex justify-between py-2 border-b border-border last:border-0">
                          <span className="text-muted-foreground">{key}</span>
                          <span className="font-medium text-right">{value}</span>
                        </div>
                      ))}
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="mt-8">
              <div className="max-w-4xl space-y-6">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Отзывы покупателей</h3>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Icon key={i} name="Star" size={20} className="text-yellow-500 fill-yellow-500" />
                        ))}
                      </div>
                      <span className="text-lg font-semibold">{product.rating}</span>
                      <span className="text-muted-foreground">на основе {product.reviews} отзывов</span>
                    </div>
                  </div>
                  <Button variant="outline">Написать отзыв</Button>
                </div>

                {reviews.map((review, index) => (
                  <Card key={index} className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold">{review.author}</span>
                          {review.verified && (
                            <Badge variant="outline" className="text-xs">
                              <Icon name="Check" size={12} className="mr-1" /> Проверенная покупка
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-0.5">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Icon 
                                key={i} 
                                name="Star" 
                                size={14} 
                                className={`${i < review.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-muted-foreground">{review.date}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">{review.text}</p>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          <div>
            <h2 className="text-3xl font-bold mb-8">С этим товаром покупают</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((item) => (
                <Link key={item.id} to={`/product/${item.id}`}>
                  <Card className="group overflow-hidden hover:shadow-xl transition-all">
                    <div className="aspect-square bg-secondary/20 p-8">
                      <img src={item.image} alt={item.name} className="w-full h-full object-contain group-hover:scale-110 transition-transform" />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold mb-2 group-hover:text-accent transition-colors">{item.name}</h3>
                      <p className="text-xl font-bold">{item.price.toLocaleString('ru-RU')} ₽</p>
                    </div>
                  </Card>
                </Link>
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

export default Product;
