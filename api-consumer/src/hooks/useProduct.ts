import { useState, useEffect } from 'react';
import type { Product } from '../@types/product';
import { getProducts } from '../services/api';

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts()
      .then(data => setProducts(data))
      .finally(() => setLoading(false));
  }, []);

  return { products, loading };
};