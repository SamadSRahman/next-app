import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useProducts from '../../hooks/useProducts';
import styles from './productDetails.module.css';
import useCart from '../../hooks/useCart';


const ProductDetails = () => {
  const { productId } = useParams();
  const { handleGetProductById, product, handleUpdateProductVeiws, } = useProducts();
  const {handleAddToCart} = useCart()

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    handleGetProductById(productId);
    handleUpdateProductVeiws(productId)
  }, [productId]);

  if (!product) {
    return <div className={styles.loading}>Loading...</div>;
  }
console.log(product);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      (prevIndex + 1) % product.images.length
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      (prevIndex - 1 + product.images.length) % product.images.length
    );
  };

  return (
    <div className={styles.productDetails}>
      <h1 className={styles.productName}>{product.name}</h1>
      
      <div className={styles.productImageContainer}>
        <button onClick={prevImage} className={styles.imageNavButton}>&lt;</button>
        <img 
          src={`${product.images?product?.images[currentImageIndex]?.image?.url:""}`} 
          alt={`${product?.name} - Image ${currentImageIndex + 1}`} 
          className={styles.productImage}
        />
        <button onClick={nextImage} className={styles.imageNavButton}>&gt;</button>
      </div>
      
      <p className={styles.productPrice}>Price: ₹{product?.price}</p>
      
      <div className={styles.productDescription}>
        <h2>Description</h2>
        <p>{product?.description}</p>
      </div>
      
      <div className={styles.productFeatures}>
        <h2>Features</h2>
        <ul>
          {product?.features?.map((feature, index) => (
            <li key={index}>{feature.feature}</li>
          ))}
        </ul>
      </div>
      <button onClick={()=>handleAddToCart(productId)}>Add to Cart</button>
    </div>
  );
};

export default ProductDetails;
