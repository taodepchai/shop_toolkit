import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './reducer/cartSlice';
import productsReducer from './reducer/productsSlice';

const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer
  }
});

export default store;
