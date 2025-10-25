import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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

const ShopProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<ShopProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await fetch('https://api.poehali.dev/projects/f9f23ac4-7352-47dd-a4bb-81301617dd90/database/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: `SELECT * FROM shop_products WHERE id = ${id}`
        })
      });
      const data = await response.json();
      if (data.rows && data.rows.length > 0) {
        const p = data.rows[0];
        setProduct({
          ...p,
          price: parseFloat(p.price),
          old_price: p.old_price ? parseFloat(p.old_price) : undefined,
          rating: parseFloat(p.rating)
        });
      }
    } catch (error) {
      console.error('Ошибка загрузки товара:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
        <Navigation />
        <Breadcrumbs />
        <div className="flex justify-center items-center py-20">
          <Icon name="Loader2" size={48} className="animate-spin text-cyan-400" />
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
        <Navigation />
        <Breadcrumbs />
        <div className="container mx-auto px-4 pt-24 pb-12 text-center">
          <Icon name="PackageX" size={64} className="mx-auto mb-4 text-gray-600" />
          <h1 className="text-3xl font-bold text-white mb-4">Товар не найден</h1>
          <Button onClick={() => navigate('/shop')} className="bg-gradient-to-r from-cyan-500 to-green-500">
            <Icon name="ArrowLeft" size={16} className="mr-2" />
            Вернуться в магазин
          </Button>
        </div>
      </div>
    );
  }

  const features = product.features ? product.features.split('\n').filter(f => f.trim()) : [];
  const specifications = product.specifications ? JSON.parse(product.specifications) : {};
  const discount = product.old_price ? Math.round((1 - product.price / product.old_price) * 100) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      <Navigation />
      <Breadcrumbs />

      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500 rounded-full blur-[150px] opacity-20 animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-green-500 rounded-full blur-[150px] opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <Button
          onClick={() => navigate('/shop')}
          variant="outline"
          className="mb-6 border-gray-600 text-gray-300 hover:bg-gray-800"
        >
          <Icon name="ArrowLeft" size={16} className="mr-2" />
          Назад в магазин
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10">
          <Card className="bg-gray-800/50 border-gray-700 overflow-hidden">
            <CardContent className="p-0">
              <div className="relative h-96 lg:h-[600px] bg-gray-900">
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Icon name="Package" size={128} className="text-gray-700" />
                  </div>
                )}
                
                {discount > 0 && (
                  <Badge className="absolute top-4 right-4 bg-red-500 text-white text-lg px-4 py-2">
                    -{discount}%
                  </Badge>
                )}

                {!product.stock && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <Badge className="bg-gray-900 text-white text-xl px-6 py-3">
                      Нет в наличии
                    </Badge>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <div>
              {product.category && (
                <Badge variant="outline" className="border-cyan-500 text-cyan-400 mb-3">
                  {product.category}
                </Badge>
              )}
              
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                {product.name}
              </h1>

              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-2">
                  {[...Array(5)].map((_, i) => (
                    <Icon
                      key={i}
                      name="Star"
                      size={20}
                      className={i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}
                    />
                  ))}
                </div>
                <span className="text-lg text-gray-300">{product.rating.toFixed(1)}</span>
                <span className="text-gray-500">({product.reviews_count} отзывов)</span>
              </div>

              <p className="text-lg text-gray-300 leading-relaxed">
                {product.description}
              </p>
            </div>

            <Card className="bg-gray-900/50 border-gray-700">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-baseline gap-3">
                    {product.old_price && (
                      <span className="text-2xl text-gray-500 line-through">
                        {product.old_price.toFixed(2)} ₽
                      </span>
                    )}
                    <span className="text-5xl font-bold text-green-400">
                      {product.price.toFixed(2)} ₽
                    </span>
                  </div>

                  {product.stock > 0 && product.stock < 10 && (
                    <div className="flex items-center gap-2 text-orange-400">
                      <Icon name="AlertCircle" size={18} />
                      <span>Осталось всего {product.stock} шт.</span>
                    </div>
                  )}

                  {product.stock > 0 && (
                    <div className="flex items-center gap-4">
                      <div className="flex items-center border border-gray-600 rounded-lg">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          className="text-white hover:bg-gray-700"
                        >
                          <Icon name="Minus" size={16} />
                        </Button>
                        <span className="px-6 text-white text-lg font-semibold">{quantity}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                          className="text-white hover:bg-gray-700"
                        >
                          <Icon name="Plus" size={16} />
                        </Button>
                      </div>

                      <Button
                        className="flex-1 bg-gradient-to-r from-cyan-500 to-green-500 hover:from-cyan-600 hover:to-green-600 text-white text-lg py-6"
                      >
                        <Icon name="ShoppingCart" size={20} className="mr-2" />
                        Добавить в корзину
                      </Button>
                    </div>
                  )}

                  {!product.stock && (
                    <Button disabled className="w-full py-6 text-lg">
                      Нет в наличии
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {features.length > 0 && (
              <Card className="bg-gray-800/50 border-gray-700">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                    <Icon name="Sparkles" size={24} className="text-cyan-400" />
                    Особенности
                  </h2>
                  <ul className="space-y-2">
                    {features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2 text-gray-300">
                        <Icon name="Check" size={20} className="text-green-400 flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {Object.keys(specifications).length > 0 && (
              <Card className="bg-gray-800/50 border-gray-700">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                    <Icon name="Settings" size={24} className="text-cyan-400" />
                    Характеристики
                  </h2>
                  <div className="space-y-3">
                    {Object.entries(specifications).map(([key, value]) => (
                      <div key={key} className="flex justify-between py-2 border-b border-gray-700">
                        <span className="text-gray-400">{key}</span>
                        <span className="text-white font-medium">{value as string}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopProduct;
