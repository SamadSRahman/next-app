import { useState } from "react";
import {
  getMostViewedProduct,
  getProductById,
  getProducts,
  getRecentProducts,
  updateProductViews,
} from "../api/products";

export default function useProducts() {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState([]);

  const handleGetProducts = async () => {
    setLoading(true);
    try {
      const response = await getProducts();
      console.log(response);
      setLoading(false);
      setProducts(response.docs);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  const handleGetProductById = async (id) => {
    setLoading(true);
    try {
      const response = await getProductById(id);
      console.log(response);
      setLoading(false);
      setProduct(response);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  const handleGetRecentProducts = async () => {
    setLoading(true);
    try {
      const response = await getRecentProducts();
      console.log(response);
      setLoading(false);
      setProducts(response.docs);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  const handleMostViewedProducts = async () => {
    setLoading(true);
    try {
      const response = await getMostViewedProduct();
      console.log(response);
      setLoading(false);
      setProducts(response.docs);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  const handleUpdateProductVeiws = async (id) => {
    setLoading(true);
    try {
      const response = await updateProductViews(id);
      console.log(response);
      setLoading(false);
      setProducts(response.docs);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return {
    handleGetProducts,
    loading,
    products,
    handleGetProductById,
    product,
    handleGetRecentProducts,
    handleMostViewedProducts,
    handleUpdateProductVeiws
  };
}
