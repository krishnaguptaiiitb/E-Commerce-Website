import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import AdminProductSlice from "./admin/product-slice/index.js";
import shoppingProductSlice from "./shop/products-slice/index.js";

const store = configureStore({
  reducer: {
    auth: authReducer,
    adminProducts: AdminProductSlice,
    shoppingProducts: shoppingProductSlice,
  },
});

export default store;
