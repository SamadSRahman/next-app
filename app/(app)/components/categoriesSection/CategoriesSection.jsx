import  { useEffect, useState, useRef } from "react";
import useCategories from "../../hooks/useCategories";
import styles from "./categoriesSection.module.css";

export default function CategoriesSection() {
  const { handleGetCategories, categories } = useCategories();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isUserInteracted, setIsUserInteracted] = useState(false);
  const tagContainerRef = useRef(null);
  const tagRefs = useRef([]);
  const timeoutRef = useRef(null);

  useEffect(() => {
    handleGetCategories();
  }, []);

  useEffect(() => {
    if (!isUserInteracted) {
      timeoutRef.current = setTimeout(() => {
        setCurrentIndex((prevValue) =>
          prevValue < categories.length - 1 ? prevValue + 1 : 0
        );
      }, 5000);
    }

    if (tagRefs.current[currentIndex] && tagContainerRef.current) {
      const container = tagContainerRef.current;
      const tag = tagRefs.current[currentIndex];
      
      const containerRect = container.getBoundingClientRect();
      const tagRect = tag.getBoundingClientRect();
      
      const isTagFullyVisible = 
        tagRect.left >= containerRect.left &&
        tagRect.right <= containerRect.right;

      if (!isTagFullyVisible) {
        const scrollLeft = tag.offsetLeft - container.clientWidth / 2 + tag.clientWidth / 2;
        container.scrollTo({
          left: scrollLeft,
          behavior: 'smooth'
        });
      }
    }

    return () => clearTimeout(timeoutRef.current);
  }, [currentIndex, categories, isUserInteracted]);

  const handleTagClick = (index) => {
    clearTimeout(timeoutRef.current);
    setIsUserInteracted(true);
    setCurrentIndex(index);
  };

  return (
    <div
      className={styles.container}
      style={{
        backgroundImage: `url(http://localhost:3000${categories[currentIndex]?.image?.sizes?.tablet?.url})`,
      }}
    >
      <div className={styles.tagContainer} ref={tagContainerRef}>
        {categories.map((category, ind) => (
          <div
            ref={(el) => (tagRefs.current[ind] = el)}
            onClick={() => handleTagClick(ind)}
            className={`${styles.tag}`}
            style={currentIndex===ind?{backgroundColor:"white",color:"black",  textShadow:"none" }:{}}
            key={category.id}
          >
            {category.name}
          </div>
        ))}
      </div>
      <div className={styles.contentBox}>
        <p>
            {categories[currentIndex]?.description}
        </p>
        <button>Explore</button>
      </div>
    </div>
  );
}