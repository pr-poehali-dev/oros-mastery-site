import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface ShopProduct {
  id?: number;
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

interface ShopProductFormProps {
  editingProduct: ShopProduct | null;
  onSubmit: (product: Omit<ShopProduct, 'id'>) => void;
  onCancel: () => void;
}

const ShopProductForm = ({ editingProduct, onSubmit, onCancel }: ShopProductFormProps) => {
  const [formData, setFormData] = useState<Omit<ShopProduct, 'id'>>({
    name: '',
    description: '',
    price: 0,
    old_price: undefined,
    image: '',
    category: '',
    stock: 0,
    is_available: true,
    rating: 0,
    reviews_count: 0,
    features: '',
    specifications: ''
  });

  useEffect(() => {
    if (editingProduct) {
      setFormData({
        name: editingProduct.name,
        description: editingProduct.description,
        price: editingProduct.price,
        old_price: editingProduct.old_price,
        image: editingProduct.image,
        category: editingProduct.category,
        stock: editingProduct.stock,
        is_available: editingProduct.is_available,
        rating: editingProduct.rating,
        reviews_count: editingProduct.reviews_count,
        features: editingProduct.features,
        specifications: editingProduct.specifications
      });
    }
  }, [editingProduct]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      name: '',
      description: '',
      price: 0,
      old_price: undefined,
      image: '',
      category: '',
      stock: 0,
      is_available: true,
      rating: 0,
      reviews_count: 0,
      features: '',
      specifications: ''
    });
  };

  return (
    <Card className="bg-gray-800/50 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Icon name="Package" size={24} className="text-cyan-400" />
          {editingProduct ? 'Редактировать товар' : 'Добавить товар'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-white">Название *</Label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="bg-gray-700 border-gray-600 text-white"
                required
                placeholder="Портал-пушка Rick C-137"
              />
            </div>

            <div>
              <Label className="text-white">Категория</Label>
              <Input
                value={formData.category || ''}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="bg-gray-700 border-gray-600 text-white"
                placeholder="Гаджеты"
              />
            </div>
          </div>

          <div>
            <Label className="text-white">Описание *</Label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="bg-gray-700 border-gray-600 text-white min-h-[100px]"
              required
              placeholder="Подробное описание товара"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label className="text-white">Цена (₽) *</Label>
              <Input
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                className="bg-gray-700 border-gray-600 text-white"
                required
              />
            </div>

            <div>
              <Label className="text-white">Старая цена (₽)</Label>
              <Input
                type="number"
                step="0.01"
                value={formData.old_price || ''}
                onChange={(e) => setFormData({ ...formData, old_price: e.target.value ? parseFloat(e.target.value) : undefined })}
                className="bg-gray-700 border-gray-600 text-white"
                placeholder="Для отображения скидки"
              />
            </div>

            <div>
              <Label className="text-white">Остаток *</Label>
              <Input
                type="number"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) })}
                className="bg-gray-700 border-gray-600 text-white"
                required
              />
            </div>
          </div>

          <div>
            <Label className="text-white">URL изображения</Label>
            <Input
              type="url"
              value={formData.image || ''}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              className="bg-gray-700 border-gray-600 text-white"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label className="text-white">Рейтинг (0-5)</Label>
              <Input
                type="number"
                step="0.1"
                min="0"
                max="5"
                value={formData.rating}
                onChange={(e) => setFormData({ ...formData, rating: parseFloat(e.target.value) })}
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>

            <div>
              <Label className="text-white">Отзывов</Label>
              <Input
                type="number"
                value={formData.reviews_count}
                onChange={(e) => setFormData({ ...formData, reviews_count: parseInt(e.target.value) })}
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>

            <div className="flex items-center gap-2 pt-6">
              <input
                type="checkbox"
                id="is_available"
                checked={formData.is_available}
                onChange={(e) => setFormData({ ...formData, is_available: e.target.checked })}
                className="w-4 h-4"
              />
              <Label htmlFor="is_available" className="text-white cursor-pointer">
                Доступен для продажи
              </Label>
            </div>
          </div>

          <div>
            <Label className="text-white">Особенности</Label>
            <Textarea
              value={formData.features || ''}
              onChange={(e) => setFormData({ ...formData, features: e.target.value })}
              className="bg-gray-700 border-gray-600 text-white min-h-[80px]"
              placeholder="Одна особенность на строку"
            />
          </div>

          <div>
            <Label className="text-white">Характеристики (JSON)</Label>
            <Textarea
              value={formData.specifications || ''}
              onChange={(e) => setFormData({ ...formData, specifications: e.target.value })}
              className="bg-gray-700 border-gray-600 text-white min-h-[80px] font-mono text-sm"
              placeholder='{"Вес": "2 кг", "Размер": "30x15x8 см"}'
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button 
              type="submit"
              className="bg-gradient-to-r from-cyan-500 to-green-500 hover:from-cyan-600 hover:to-green-600"
            >
              <Icon name="Save" size={18} className="mr-2" />
              {editingProduct ? 'Обновить' : 'Добавить'}
            </Button>
            
            {editingProduct && (
              <Button 
                type="button"
                variant="outline"
                onClick={onCancel}
                className="border-gray-600 text-gray-300 hover:bg-gray-700"
              >
                <Icon name="X" size={18} className="mr-2" />
                Отмена
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ShopProductForm;
