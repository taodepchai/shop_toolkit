import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { ProductType } from '../../interface/types';



export interface ProductsState {
  items: ProductType[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ProductsState = {
  items: [],
  status: 'idle',
  error: null,
};

export const fetchProducts:any = createAsyncThunk('products/fetchProducts', async () => {
  const response = await axios.get('http://localhost:3000/products');
  return response.data as ProductType[];
});

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch products';
      });
  }
});

export default productsSlice.reducer;
