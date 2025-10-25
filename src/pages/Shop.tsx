import { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

interface ShopProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  old_price?: number;
  image?: string;
  category?: string;
  stock: number;
  is_available: boolean;
  rating: number;
  reviews_count: number;
  features?: string;
  specifications?: string;
}

const Shop = () => {
  const [products, setProducts] = useState<ShopProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('https://api.poehali.dev/projects/f9f23ac4-7352-47dd-a4bb-81301617dd90/database/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: 'SELECT * FROM shop_products WHERE is_available = true ORDER BY created_at DESC'
        })
      });
      const data = await response.json();
      setProducts(data.rows || []);
    } catch (error) {
      console.error('Ошибка загрузки товаров:', error);
    } finally {
      setLoading(false);
    }
  };

  const categories = ['all', ...Array.from(new Set(products.map(p => p.category).filter(Boolean)))];
  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      <Navigation />
      <Breadcrumbs />
      
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500 rounded-full blur-[150px] opacity-20 animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-green-500 rounded-full blur-[150px] opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="relative z-10 mb-12 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">
            Мультивселенский магазин
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Эксклюзивные товары из разных измерений
          </p>
        </div>

        <div className="flex gap-2 mb-8 flex-wrap justify-center">
          {categories.map(cat => (
            <Button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              variant={selectedCategory === cat ? 'default' : 'outline'}
              className={selectedCategory === cat 
                ? 'bg-gradient-to-r from-cyan-500 to-green-500' 
                : 'border-gray-600 text-gray-300 hover:bg-gray-800'
              }
            >
              {cat === 'all' ? 'Все товары' : cat}
            </Button>
          ))}
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Icon name="Loader2" size={48} className="animate-spin text-cyan-400" />
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <Icon name="ShoppingBag" size={64} className="mx-auto mb-4 text-gray-600" />
            <p className="text-xl text-gray-400">Товары скоро появятся</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <Card key={product.id} className="bg-gray-800/50 border-gray-700 hover:border-cyan-500 transition-all group overflow-hidden">
                <div className="relative h-64 overflow-hidden bg-gray-900">
                  {product.image ? (
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Icon name="Package" size={64} className="text-gray-700" />
                    </div>
                  )}
                  
                  {product.old_price && (
                    <Badge className="absolute top-3 right-3 bg-red-500 text-white">
                      -{Math.round((1 - product.price / product.old_price) * 100)}%
                    </Badge>
                  )}
                  
                  {!product.stock && (
                    <Badge className="absolute top-3 left-3 bg-gray-700 text-white">
                      Нет в наличии
                    </Badge>
                  )}
                </div>

                <CardContent className="p-4 space-y-3">
                  {product.category && (
                    <Badge variant="outline" className="border-cyan-500 text-cyan-400 text-xs">
                      {product.category}
                    </Badge>
                  )}

                  <h3 className="text-lg font-bold text-white line-clamp-2 group-hover:text-cyan-400 transition-colors">
                    {product.name}
                  </h3>

                  <p className="text-sm text-gray-400 line-clamp-2">
                    {product.description}
                  </p>

                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <Icon name="Star" size={16} className="text-yellow-400 fill-yellow-400" />
                      <span className="text-sm text-gray-300">{product.rating.toFixed(1)}</span>
                    </div>
                    <span className="text-xs text-gray-500">({product.reviews_count})</span>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-gray-700">
                    <div>
                      {product.old_price && (
                        <span className="text-sm text-gray-500 line-through mr-2">
                          {product.old_price.toFixed(2)} ₽
                        </span>
                      )}
                      <span className="text-xl font-bold text-green-400">
                        {product.price.toFixed(2)} ₽
                      </span>
                    </div>
                    
                    <Button 
                      size="sm"
                      className="bg-gradient-to-r from-cyan-500 to-green-500 hover:from-cyan-600 hover:to-green-600"
                      disabled={!product.stock}
                    >
                      <Icon name="ShoppingCart" size={16} className="mr-1" />
                      Купить
                    </Button>
                  </div>

                  {product.stock > 0 && product.stock < 10 && (
                    <p className="text-xs text-orange-400">
                      <Icon name="AlertCircle" size={12} className="inline mr-1" />
                      Осталось всего {product.stock} шт.
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;
