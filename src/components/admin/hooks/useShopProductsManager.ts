import { useState } from 'react';

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

const API_BASE = 'https://api.poehali.dev/projects/f9f23ac4-7352-47dd-a4bb-81301617dd90/database';

export const useShopProductsManager = () => {
  const [products, setProducts] = useState<ShopProduct[]>([]);
  const [editingProduct, setEditingProduct] = useState<ShopProduct | null>(null);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${API_BASE}/query`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: 'SELECT * FROM shop_products ORDER BY created_at DESC'
        })
      });
      const data = await response.json();
      setProducts(data.rows || []);
    } catch (error) {
      console.error('Ошибка загрузки товаров:', error);
    }
  };

  const handleProductSubmit = async (productData: Omit<ShopProduct, 'id'>) => {
    try {
      if (editingProduct?.id) {
        const query = `
          UPDATE shop_products 
          SET name = '${productData.name.replace(/'/g, "''")}',
              description = '${productData.description.replace(/'/g, "''")}',
              price = ${productData.price},
              old_price = ${productData.old_price || 'NULL'},
              image = ${productData.image ? `'${productData.image.replace(/'/g, "''")}'` : 'NULL'},
              category = ${productData.category ? `'${productData.category.replace(/'/g, "''")}'` : 'NULL'},
              stock = ${productData.stock},
              is_available = ${productData.is_available},
              rating = ${productData.rating},
              reviews_count = ${productData.reviews_count},
              features = ${productData.features ? `'${productData.features.replace(/'/g, "''")}'` : 'NULL'},
              specifications = ${productData.specifications ? `'${productData.specifications.replace(/'/g, "''")}'` : 'NULL'},
              updated_at = CURRENT_TIMESTAMP
          WHERE id = ${editingProduct.id}
        `;

        await fetch(`${API_BASE}/query`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query })
        });
      } else {
        const query = `
          INSERT INTO shop_products (
            name, description, price, old_price, image, category, 
            stock, is_available, rating, reviews_count, features, specifications
          ) VALUES (
            '${productData.name.replace(/'/g, "''")}',
            '${productData.description.replace(/'/g, "''")}',
            ${productData.price},
            ${productData.old_price || 'NULL'},
            ${productData.image ? `'${productData.image.replace(/'/g, "''")}'` : 'NULL'},
            ${productData.category ? `'${productData.category.replace(/'/g, "''")}'` : 'NULL'},
            ${productData.stock},
            ${productData.is_available},
            ${productData.rating},
            ${productData.reviews_count},
            ${productData.features ? `'${productData.features.replace(/'/g, "''")}'` : 'NULL'},
            ${productData.specifications ? `'${productData.specifications.replace(/'/g, "''")}'` : 'NULL'}
          )
        `;

        await fetch(`${API_BASE}/query`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query })
        });
      }

      setEditingProduct(null);
      await fetchProducts();
    } catch (error) {
      console.error('Ошибка сохранения товара:', error);
      alert('Ошибка сохранения товара');
    }
  };

  const handleDeleteProduct = async (id: number) => {
    try {
      await fetch(`${API_BASE}/query`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: `DELETE FROM shop_products WHERE id = ${id}`
        })
      });
      await fetchProducts();
    } catch (error) {
      console.error('Ошибка удаления товара:', error);
      alert('Ошибка удаления товара');
    }
  };

  return {
    products,
    editingProduct,
    setEditingProduct,
    fetchProducts,
    handleProductSubmit,
    handleDeleteProduct
  };
};
