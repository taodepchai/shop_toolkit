import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CartItemType } from "../interface/types";
import { fetchCart, removeFromCart } from "../store/reducer/cartSlice";
import CartItem from "./CartItem";
import "./styles.css";

const ShoppingCart: React.FC = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state: any) => state.cart.items);
  const cartStatus = useSelector((state: any) => state.cart.status);

  useEffect(() => {
    if (cartStatus === "idle") {
      dispatch(fetchCart());
    }
  }, [cartStatus, dispatch]);

  const [showModal, setShowModal] = useState(false);
  const [itemToRemove, setItemToRemove] = useState<number | null>(null);

  const handleRemove = (id: number) => {
    setShowModal(true);
    setItemToRemove(id);
  };

  const confirmRemove = () => {
    if (itemToRemove !== null) {
      dispatch(removeFromCart(itemToRemove));
      setShowModal(false);
      setItemToRemove(null);
    }
  };

  const cancelRemove = () => {
    setShowModal(false);
    setItemToRemove(null);
  };

  const totalAmount = cart.reduce(
    (total: number, item: CartItemType) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="shopping-cart">
      <h2>Shopping cart</h2>
      {cart.map((item: CartItemType) => (
        <CartItem key={item.id} item={item} onRemove={handleRemove} />
      ))}
      <div className="cart-summary">
        <span>Subtotal:</span>
        <span>${totalAmount.toFixed(2)}</span>
      </div>
      {showModal && (
        <div className="modal">
          <h3>Are you sure you want to remove this item?</h3>
          <button onClick={confirmRemove}>Yes</button>
          <button onClick={cancelRemove} className="cancel">
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default ShoppingCart;
