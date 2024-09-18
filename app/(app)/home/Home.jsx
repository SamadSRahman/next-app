/* eslint-disable no-unused-vars */
// src/pages/Home.jsx
import React from "react";
import styles from "./home.module.css";
import CategoriesSection from "../components/categoriesSection/CategoriesSection";
import ContentSection from "../components/contentSection/ContentSection";

const Home = () => {
  return (
    <div className={styles.container}>
      <div className={styles.categoriesSection}>
        {" "}
        <CategoriesSection />
      </div>
      <div className={styles.contentSection}>
        <ContentSection />
      </div>
    </div>
  );
};

export default Home;
