/* eslint-disable react/prop-types */
import  { useState, useEffect } from 'react';
import styles from './categoryCard.module.css';

export default function CategoryCard({ category }) {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = `http://localhost:3000${category?.image?.sizes?.card?.url}`;
    img.onload = () => setImageLoaded(true);
  }, [category?.image?.sizes?.card?.url]);

  return (
    <div className={styles.cardContainer}>
      {imageLoaded ? (
        <div
          className={styles.card}
          style={{ backgroundImage: `url(http://localhost:3000${category?.image?.sizes?.thumbnail?.url})` }}
        >
          <h4>{category?.name}</h4>
        </div>
      ) : (
        <div className={styles.skeleton}></div>
      )}
    </div>
  );
}
