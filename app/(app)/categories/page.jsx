"use client";
import styles from "./categories.module.css";
import useCategories from "../hooks/useCategories";
import { useEffect } from "react";
import CategoryCard from "../components/categoryCard/CategoryCard";
import Header from "../components/header/Header";
export default function Categories() {
  const { handleGetCategories, categories } = useCategories();

  useEffect(() => {
    handleGetCategories();
  }, []);

  return (
    <div className={styles.container}>
      <Header />
      {categories.map((cat) => (
        <CategoryCard key={cat.id} category={cat} />
      ))}
    </div>
  );
}
