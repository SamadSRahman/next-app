import {apiClient} from '../config';

export const login = async (email, password) => {
  const response = await apiClient.post('/api/customers/login', { email, password });
  return response.data;
};

export const register = async (email, password, name, number) => {
  console.log(email, password, name, number);
  
  const response = await apiClient.post('/api/customers', {email, password, name, number});
  return response.data;
};
