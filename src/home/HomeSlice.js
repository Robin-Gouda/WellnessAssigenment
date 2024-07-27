import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchAllProducts,
  fetchProductById,
  fetchProductForHeader,
} from "./HomeApi";

const initialState = {
  status: "idel",
  products: [],
  selectedProduct: null,
  headerImage: null,
};

export const fetchAllProductsAsync = createAsyncThunk(
  "product/fetchAllProducts",
  async () => {
    const response = await fetchAllProducts();
    // console.log(response.data);
    return response.data;
  }
);

export const fetchProductForHeaderAsync = createAsyncThunk(
  "product/fetchProductForHeader",
  async () => {
    const response = await fetchProductForHeader();
    return response.data;
  }
);

export const fetchProductByIdAsync = createAsyncThunk(
  "product/fetchProductsById",
  async (id) => {
    const response = await fetchProductById(id);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const productSlice = createSlice({
  name: "products",
  initialState,
  extraReducers: (bulider) => {
    bulider
      .addCase(fetchAllProductsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
        state.status = "idel";
        state.products = action.payload;
      })
      .addCase(fetchProductByIdAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductByIdAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.selectedProduct = action.payload;
      })
      .addCase(fetchProductForHeaderAsync.fulfilled, (state, action) => {
        // state.status = "idle";
        state.headerImage = action.payload.image;
      });
  },
});

export default productSlice.reducer;
