import { useState } from "react";
import { addToCart, getCart } from "../api/cart";


export default function useCart() {
    const [loading, setLoading] = useState(false);
    // const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const id = localStorage.getItem("userId")

    const handleGetCart = async () => {
        setLoading(true);
        try {
          const response = await getCart(id);
          console.log(response);
          setLoading(false);
          setCart(response.cart);
        } catch (error) {
          console.log(error);
          setLoading(false);
        }
      };
   

    const handleAddToCart = async (productId) => {
        setLoading(true);
        try {
          const response = await addToCart(id, productId);
          console.log(response);
          setLoading(false);
          setCart(response);
        } catch (error) {
          console.log(error);
          setLoading(false);
        }
      };

    return{handleGetCart, loading, cart, handleAddToCart}
}
