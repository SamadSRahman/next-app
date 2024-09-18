import styles from "./categories.module.css";
import useCategories from "../../hooks/useCategories";
import { useEffect } from "react";
import CategoryCard from "../../components/categoryCard/CategoryCard";
export default function Categories() {
  const { handleGetCategories, categories } = useCategories();

  useEffect(()=>{handleGetCategories()},[])

  return <div className={styles.container}>
    {categories.map((cat)=><CategoryCard key={cat.id} category={cat} /> )}
  </div>;
}
