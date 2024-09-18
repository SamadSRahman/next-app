import { useState } from "react";
import { getCategoies, getCategoiesById } from "../api/categories";

export default function useCategories() {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [productsByCat, setProductsByCat] = useState([]);

  const handleGetCategories = async () => {
    setLoading(true);
    try {
      const response = await getCategoies();
      console.log(response);
      setLoading(false);
      setCategories(response.docs);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleGetCategoriesById = async (id) => {
    setLoading(true);
    try {
      const response = await getCategoiesById(id);
      console.log(response);
      setLoading(false);
      setCategories(response);
     const data= response.subcategories.map(ele=>ele.products)
     const result = data.flatMap(arr => arr.map(item => item));
     setProductsByCat(result)
      
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return { loading, categories, handleGetCategories, handleGetCategoriesById, productsByCat };
}
