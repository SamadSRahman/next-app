import { apiClientWithToken } from "../config";

export const getCart = async (id) => {
  const response = await apiClientWithToken.get(`/api/customers/${id}`);
  return response.data;
};
export const addToCart = async (id, productId) => {
  const response = await apiClientWithToken.patch(
    `/api/cart/update-cart/${id}`,
    { products: [{ product: productId, quantity: 1 }] }
  );
  return response.data;
};
