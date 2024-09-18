/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import styles from './productCard.module.css';

const ProductCard = ({ product , key}) => {
  console.log(product);
  
  const { id, name, price, description, images } = product;

  return (
    <div key={key} className={styles.productCard}>
      {/* <img src={`http://localhost:3000${images[0].image.url}`} alt={name} className={styles.productImage} /> */}
      <div className={styles.productInfo}>
        <h3 className={styles.productName}>{name}</h3>
        <p className={styles.productPrice}>${price}</p>
        <p className={styles.productDescription}>{description}</p>
        <Link to={`/products/${id}`} className={styles.viewDetailsButton}>
          View Details
        </Link>
        <button  className={styles.viewDetailsButton}>Add to cart</button>
      </div>
    </div>
  );
};

export default ProductCard;