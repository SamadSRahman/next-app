import {apiClient} from '../config';

export const getCategoies = async () => {
  const response = await apiClient.get('/api/categories');
  return response.data;
};
export const getCategoiesById = async (id) => {
  const response = await apiClient.get(`/api/categories/${id}`);
  return response.data;
};
