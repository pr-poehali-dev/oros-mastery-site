import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import SEO from '@/components/SEO';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Catalog = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');
  const [sortBy, setSortBy] = useState('popular');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 300000]);

  const allProducts = [
    {
      id: 1,
      name: 'iPhone 15 Pro Max',
      price: 129990,
      oldPrice: null,
      image: 'https://cdn.poehali.dev/projects/f9f23ac4-7352-47dd-a4bb-81301617dd90/files/7940f217-1753-4487-8069-2d6ce05f4f69.jpg',
      badge: 'Новинка',
      category: 'iphone',
      rating: 4.9,
      reviews: 324,
      colors: 4,
      specs: { screen: '6.7"', chip: 'A17 Pro', camera: '48 МП' }
    },
    {
      id: 2,
      name: 'MacBook Pro 14" M3',
      price: 189990,
      oldPrice: null,
      image: 'https://cdn.poehali.dev/projects/f9f23ac4-7352-47dd-a4bb-81301617dd90/files/f433707d-2145-4cfd-9be1-e5b767d02b42.jpg',
      badge: 'Популярное',
      category: 'mac',
      rating: 5.0,
      reviews: 521,
      colors: 2,
      specs: { screen: '14.2"', chip: 'M3', ram: '16 ГБ' }
    },
    {
      id: 3,
      name: 'Apple Watch Ultra 2',
      price: 89990,
      oldPrice: null,
      image: 'https://cdn.poehali.dev/projects/f9f23ac4-7352-47dd-a4bb-81301617dd90/files/0cf6cd8b-4be7-4da8-924c-bce479bbeb84.jpg',
      badge: 'Хит продаж',
      category: 'watch',
      rating: 4.8,
      reviews: 287,
      colors: 2,
      specs: { screen: '49 мм', battery: '36 ч', water: '100 м' }
    },
    {
      id: 4,
      name: 'AirPods Pro 2',
      price: 24990,
      oldPrice: null,
      image: 'https://cdn.poehali.dev/projects/f9f23ac4-7352-47dd-a4bb-81301617dd90/files/a6a4b701-6f59-470f-886f-db85ec9dab94.jpg',
      badge: 'Бестселлер',
      category: 'airpods',
      rating: 4.7,
      reviews: 891,
      colors: 1,
      specs: { battery: '30 ч', anc: 'Да', wireless: 'Qi' }
    },
    {
      id: 5,
      name: 'iPhone 15',
      price: 89990,
      oldPrice: 94990,
      image: 'https://cdn.poehali.dev/projects/f9f23ac4-7352-47dd-a4bb-81301617dd90/files/7940f217-1753-4487-8069-2d6ce05f4f69.jpg',
      badge: 'Скидка',
      category: 'iphone',
      rating: 4.8,
      reviews: 645,
      colors: 5,
      specs: { screen: '6.1"', chip: 'A16', camera: '48 МП' }
    },
    {
      id: 6,
      name: 'MacBook Air 13" M2',
      price: 129990,
      oldPrice: null,
      image: 'https://cdn.poehali.dev/projects/f9f23ac4-7352-47dd-a4bb-81301617dd90/files/f433707d-2145-4cfd-9be1-e5b767d02b42.jpg',
      badge: null,
      category: 'mac',
      rating: 4.9,
      reviews: 412,
      colors: 4,
      specs: { screen: '13.6"', chip: 'M2', ram: '8 ГБ' }
    },
    {
      id: 7,
      name: 'iPad Pro 12.9"',
      price: 119990,
      oldPrice: null,
      image: 'https://cdn.poehali.dev/projects/f9f23ac4-7352-47dd-a4bb-81301617dd90/files/7940f217-1753-4487-8069-2d6ce05f4f69.jpg',
      badge: null,
      category: 'ipad',
      rating: 4.9,
      reviews: 234,
      colors: 2,
      specs: { screen: '12.9"', chip: 'M2', storage: '256 ГБ' }
    },
    {
      id: 8,
      name: 'Apple Watch Series 9',
      price: 44990,
      oldPrice: null,
      image: 'https://cdn.poehali.dev/projects/f9f23ac4-7352-47dd-a4bb-81301617dd90/files/0cf6cd8b-4be7-4da8-924c-bce479bbeb84.jpg',
      badge: null,
      category: 'watch',
      rating: 4.7,
      reviews: 567,
      colors: 3,
      specs: { screen: '45 мм', battery: '18 ч', water: '50 м' }
    }
  ];

  const categories = [
    { id: 'all', name: 'Все товары', icon: 'Grid3x3', count: allProducts.length },
    { id: 'iphone', name: 'iPhone', icon: 'Smartphone', count: allProducts.filter(p => p.category === 'iphone').length },
    { id: 'mac', name: 'Mac', icon: 'Laptop', count: allProducts.filter(p => p.category === 'mac').length },
    { id: 'ipad', name: 'iPad', icon: 'Tablet', count: allProducts.filter(p => p.category === 'ipad').length },
    { id: 'watch', name: 'Watch', icon: 'Watch', count: allProducts.filter(p => p.category === 'watch').length },
    { id: 'airpods', name: 'AirPods', icon: 'Headphones', count: allProducts.filter(p => p.category === 'airpods').length }
  ];

  const filteredProducts = allProducts
    .filter(p => selectedCategory === 'all' || p.category === selectedCategory)
    .filter(p => p.price >= priceRange[0] && p.price <= priceRange[1])
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });

  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat && cat !== selectedCategory) {
      setSelectedCategory(cat);
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Каталог продукции Apple - Все модели iPhone, Mac, iPad"
        description="Полный каталог техники Apple. Выбирайте из сотен моделей с доставкой и гарантией."
        keywords="каталог apple, купить iphone, macbook, ipad каталог"
        url="https://rick-and-morty.poehali.dev/catalog"
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
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="py-12 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Каталог товаров</h1>
            <p className="text-muted-foreground">Найдено товаров: {filteredProducts.length}</p>
          </div>

          <div className="grid lg:grid-cols-[280px_1fr] gap-8">
            <aside className="space-y-6">
              <Card className="p-6">
                <h3 className="font-semibold mb-4">Категории</h3>
                <div className="space-y-2">
                  {categories.map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setSelectedCategory(cat.id);
                        setSearchParams(cat.id === 'all' ? {} : { category: cat.id });
                      }}
                      className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                        selectedCategory === cat.id 
                          ? 'bg-accent text-accent-foreground' 
                          : 'hover:bg-secondary'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon name={cat.icon as any} size={20} />
                        <span>{cat.name}</span>
                      </div>
                      <span className="text-sm">{cat.count}</span>
                    </button>
                  ))}
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="font-semibold mb-4">Цена</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                      className="w-full px-3 py-2 border border-border rounded-lg text-sm"
                      placeholder="От"
                    />
                    <span className="text-muted-foreground">—</span>
                    <input
                      type="number"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                      className="w-full px-3 py-2 border border-border rounded-lg text-sm"
                      placeholder="До"
                    />
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="300000"
                    step="10000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([0, Number(e.target.value)])}
                    className="w-full"
                  />
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="font-semibold mb-4">Фильтры</h3>
                <div className="space-y-3">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm">Со скидкой</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm">Новинки</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm">В наличии</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm">Рассрочка 0%</span>
                  </label>
                </div>
              </Card>
            </aside>

            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="Сортировка" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="popular">По популярности</SelectItem>
                      <SelectItem value="price-asc">Сначала дешевле</SelectItem>
                      <SelectItem value="price-desc">Сначала дороже</SelectItem>
                      <SelectItem value="rating">По рейтингу</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="icon">
                    <Icon name="Grid3x3" size={18} />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Icon name="List" size={18} />
                  </Button>
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <Link key={product.id} to={`/product/${product.id}`}>
                    <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 h-full">
                      <div className="relative aspect-square bg-secondary/30 overflow-hidden">
                        <img 
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-contain p-8 group-hover:scale-110 transition-transform duration-500"
                        />
                        {product.badge && (
                          <Badge className={`absolute top-4 left-4 ${
                            product.badge === 'Скидка' 
                              ? 'bg-destructive text-destructive-foreground' 
                              : 'bg-accent text-accent-foreground'
                          }`}>
                            {product.badge}
                          </Badge>
                        )}
                        <Button 
                          size="icon" 
                          variant="outline"
                          className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity rounded-full bg-background/80 backdrop-blur-sm"
                        >
                          <Icon name="Heart" size={18} />
                        </Button>
                      </div>
                      <div className="p-6">
                        <h3 className="font-semibold text-lg mb-2 group-hover:text-accent transition-colors">
                          {product.name}
                        </h3>
                        
                        <div className="flex items-center gap-2 mb-3">
                          <div className="flex items-center">
                            <Icon name="Star" size={14} className="text-yellow-500 fill-yellow-500" />
                            <span className="text-sm ml-1">{product.rating}</span>
                          </div>
                          <span className="text-xs text-muted-foreground">
                            ({product.reviews} отзывов)
                          </span>
                        </div>

                        <div className="flex items-center gap-1 mb-4">
                          {Array.from({ length: product.colors }).map((_, i) => (
                            <div key={i} className="w-5 h-5 rounded-full border-2 border-border bg-muted"></div>
                          ))}
                        </div>

                        <div className="space-y-1 mb-4 text-xs text-muted-foreground">
                          {Object.entries(product.specs).map(([key, value]) => (
                            <div key={key}>{value}</div>
                          ))}
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            {product.oldPrice && (
                              <p className="text-sm text-muted-foreground line-through">
                                {product.oldPrice.toLocaleString('ru-RU')} ₽
                              </p>
                            )}
                            <p className="text-2xl font-bold">
                              {product.price.toLocaleString('ru-RU')} ₽
                            </p>
                          </div>
                          <Button size="icon" className="rounded-full">
                            <Icon name="ShoppingCart" size={20} />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
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

export default Catalog;
