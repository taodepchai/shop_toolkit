import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { CartItemType } from '../../interface/types';


export interface CartState {
 items: CartItemType[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: CartState = {
  items: [],
  status: 'idle',
  error: null,
};

export const fetchCart:any = createAsyncThunk('cart/fetchCart', async () => {
  const response = await axios.get('http://localhost:3000/cart');
  return response.data as CartItemType[];
});

export const addToCart:any = createAsyncThunk('cart/addToCart', async (product: CartItemType) => {
  const response = await axios.post('http://localhost:3000/cart', product);
  return response.data;
});

export const updateCart:any = createAsyncThunk('cart/updateCart', async (item: CartItemType) => {
  const response = await axios.put(`http://localhost:3000/cart/${item.id}`, item);
  return response.data;
});

export const removeFromCart:any = createAsyncThunk('cart/removeFromCart', async (id: number) => {
  await axios.delete(`http://localhost:3000/cart/${id}`);
  return id;
});

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch cart';
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateCart.fulfilled, (state, action) => {
        const index = state.items.findIndex(item => item.id === action.payload.id);
        state.items[index] = action.payload;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.id !== action.payload);
      });
  }
});

export default cartSlice.reducer;
