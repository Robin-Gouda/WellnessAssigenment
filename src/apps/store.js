import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../home/HomeSlice.js";

export const store = configureStore({
  reducer: {
    product: productReducer,
  },
});
