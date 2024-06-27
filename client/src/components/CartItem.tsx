import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateCart } from "../store/reducer/cartSlice";
import "./styles.css";

interface CartItemProps {
  item: {
    id: number;
    name: string;
    price: number;
    quantity: number;
    image: string;
  };
  onRemove: (id: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({ item, onRemove }) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(item.quantity);

  const handleUpdate = () => {
    dispatch(updateCart({ ...item, quantity }));
  };

  return (
    <div className="cart-item">
      <img src={item.image} alt={item.name} />
      <div>
        <h3>{item.name}</h3>
        <p>${item.price}</p>
        <div>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            min="1"
            max={item.quantity}
          />
          <button onClick={handleUpdate} className="update">
            Update
          </button>
        </div>
      </div>
      <button onClick={() => onRemove(item.id)} className="remove">
        Remove
      </button>
    </div>
  );
};

export default CartItem;
