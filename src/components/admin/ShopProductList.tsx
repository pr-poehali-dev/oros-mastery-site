import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

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
}

interface ShopProductListProps {
  products: ShopProduct[];
  onEdit: (product: ShopProduct) => void;
  onDelete: (id: number) => void;
}

const ShopProductList = ({ products, onEdit, onDelete }: ShopProductListProps) => {
  if (products.length === 0) {
    return (
      <Card className="bg-gray-800/50 border-gray-700">
        <CardContent className="py-12 text-center">
          <Icon name="Package" size={48} className="mx-auto mb-4 text-gray-600" />
          <p className="text-gray-400">Товары не найдены. Добавьте первый товар.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gray-800/50 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Icon name="List" size={24} className="text-cyan-400" />
          Список товаров ({products.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {products.map(product => (
            <div 
              key={product.id}
              className="bg-gray-700/30 rounded-lg p-4 border border-gray-600 hover:border-cyan-500 transition-colors"
            >
              <div className="flex gap-4">
                <div className="w-24 h-24 rounded-lg overflow-hidden bg-gray-900 flex-shrink-0">
                  {product.image ? (
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Icon name="Package" size={32} className="text-gray-700" />
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div>
                      <h3 className="text-white font-bold text-lg mb-1">{product.name}</h3>
                      {product.category && (
                        <Badge variant="outline" className="border-cyan-500 text-cyan-400 text-xs mb-2">
                          {product.category}
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex gap-2 flex-shrink-0">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onEdit(product)}
                        className="border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-white"
                      >
                        <Icon name="Edit" size={16} className="mr-1" />
                        Редактировать
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          if (confirm(`Удалить товар "${product.name}"?`)) {
                            onDelete(product.id);
                          }
                        }}
                        className="border-red-500 text-red-400 hover:bg-red-500 hover:text-white"
                      >
                        <Icon name="Trash2" size={16} />
                      </Button>
                    </div>
                  </div>

                  <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                    {product.description}
                  </p>

                  <div className="flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Icon name="DollarSign" size={16} className="text-green-400" />
                      <span className="text-white font-bold">{product.price.toFixed(2)} ₽</span>
                      {product.old_price && (
                        <span className="text-gray-500 line-through text-xs">
                          {product.old_price.toFixed(2)} ₽
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <Icon name="Package" size={16} className="text-blue-400" />
                      <span className="text-gray-300">{product.stock} шт.</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Icon name="Star" size={16} className="text-yellow-400" />
                      <span className="text-gray-300">{product.rating.toFixed(1)} ({product.reviews_count})</span>
                    </div>

                    <div className="flex items-center gap-2">
                      {product.is_available ? (
                        <>
                          <Icon name="CheckCircle" size={16} className="text-green-400" />
                          <span className="text-green-400">В продаже</span>
                        </>
                      ) : (
                        <>
                          <Icon name="XCircle" size={16} className="text-red-400" />
                          <span className="text-red-400">Снято с продажи</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ShopProductList;
