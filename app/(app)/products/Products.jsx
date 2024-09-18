import useProducts from "../../hooks/useProducts";
import { useEffect } from "react";
import ProductCard from "../../components/productCard/ProductCard";
import useCategories from "../../hooks/useCategories";

const Products = () => {
  const { handleGetProducts, products } = useProducts();
  const { handleGetCategoriesById, productsByCat } = useCategories();
  // For demo purposes, replace with actual product data from an API

  useEffect(() => {
    handleGetProducts(), handleGetCategoriesById(1);
  }, []);
  return (
    <div>
      <h1>Products</h1>
      {products?.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default Products;
