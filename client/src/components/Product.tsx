import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import './styles.css';
import { addToCart } from '../store/reducer/cartSlice';

interface ProductProps {
  product: {
    id: number;
    name: string;
    price: number;
    quantity: number;
    description: string;
    image: string;
  };
}

const Product: React.FC<ProductProps> = ({ product }) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    if (product.quantity > 0) {
      dispatch(addToCart({ ...product, quantity }));
    }
  };

  return (
    <div className="product">
      <img src={product.image} alt={product.name} />
      <div>
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <p>Price: ${product.price}</p>
        <p>Total: {product.quantity}</p>
      </div>
      <div>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          min="1"
          max={product.quantity}
        />
        <button onClick={handleAddToCart} disabled={product.quantity === 0}>
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default Product;
