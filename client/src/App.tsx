import React from 'react';
import ProductList from './components/ProductList';
import ShoppingCart from './components/ShoppingCart';
import './components/styles.css';

const App: React.FC = () => {
  return (
    <div className="container">
      <ProductList />
      <ShoppingCart />
    </div>
  );
};

export default App;
