import {apiClient} from '../config';

export const getProducts = async () => {
  const response = await apiClient.get('/api/products');
  return response.data;
};

export const getProductById = async (id) => {
  const response = await apiClient.get(`/api/products/${id}?depth=1`);
  return response.data;
};

export const getRecentProducts = async () => {
  const response = await apiClient.get(`/api/products/recently-added-products`);
  return response.data;
};

export const getMostViewedProduct = async () => {
  const response = await apiClient.get(`/api/products/most-viewed-products`);
  return response.data;
};

export const updateProductViews = async (id) => {
  const response = await apiClient.post(`/api/products/product/${id}/view`);
  return response.data;
};

