/* eslint-disable react/prop-types */
import  { useState, useEffect } from 'react';
import styles from './categoryCard.module.css';

export default function CategoryCard({ category }) {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = `${category?.image?.cloudinaryUrl}`;
    img.onload = () => setImageLoaded(true);
  }, [category?.image?.cloudinaryUrl]);

  return (
    <div className={styles.cardContainer}>
      {imageLoaded ? (
        <div
          className={styles.card}
          style={{ backgroundImage: `url(${category?.image?.cloudinaryUrl})` }}
        >
          <h4>{category?.name}</h4>
        </div>
      ) : (
        <div className={styles.skeleton}></div>
      )}
    </div>
  );
}
