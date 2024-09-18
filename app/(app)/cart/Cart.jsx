// src/pages/Cart.jsx
import React, { useEffect } from "react";
import useCart from "../../hooks/useCart";

const Cart = () => {
  const { handleGetCart, cart } = useCart();
  useEffect(() => {
    handleGetCart();
  }, []);
  return (
    <div>
      <h1>Your Shopping Cart</h1>
      {cart?.products?.length < 1 ? (
        <p>No items in the cart yet!</p>
      ) : (
        cart?.products?.map((ele, i) => <p key={i}>{ele.product.name} Quantity {ele.quantity}</p> 
      )
      )}
    </div>
  );
};

export default Cart;
