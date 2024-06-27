import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../store/reducer/productsSlice';
import Product from './Product';
import { ProductType } from '../interface/types';
import './styles.css';

const ProductList: React.FC = () => {
  const dispatch = useDispatch();
  const products = useSelector((state: any) => state.products.items);
  const productStatus = useSelector((state: any) => state.products.status);

  useEffect(() => {
    if (productStatus === 'idle') {
      dispatch(fetchProducts());
    }
  }, [productStatus, dispatch]);

  return (
    <div className="product-list">
      <h2>List Product</h2>
      {products.map((product:ProductType) => (
        <Product key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
