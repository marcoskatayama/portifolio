import type { Product } from '../@types/product';

const API_URL = 'https://fakestoreapi.com';

export const getProducts = async (): Promise<Product[]> => {
  const response = await fetch(`${API_URL}/products`);
  if (!response.ok) throw new Error('Erro ao buscar produtos');
  return response.json();
};