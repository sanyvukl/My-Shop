import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  isLoading: false,
};

const productsSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    // Actions
    GET_PRODUCTS: (state, action) => {
      state.isLoading = true;
      state.products = action.payload;
      state.isLoading = false;
    },
    ADD_PRODUCT: (state, action) => {
      state.isLoading = true;
      state.products = [...state.products, { ...action.payload }];
      state.isLoading = false;

      console.log("Added", action.payload);
    },
    DELETE_PRODUCT: (state, action) => {
      state.isLoading = true;
      state.products = state.products.filter(
        (element) => element.id !== action.payload
      );
      state.isLoading = false;
    },
    UPDATE_PRODUCT: (state, action) => {
      const { id, data } = action.payload;
      state.isLoading = true;
      const productIndex = state.products.findIndex((elem) => elem.id === id);
      state.products[productIndex] = { id, data };
      state.isLoading = false;
    },
  },
});

export const productsSelector = (state) => state.product.products;
export const isLoadingSelector = (state) => state.product.isLoading;
export const { GET_PRODUCTS, ADD_PRODUCT, UPDATE_PRODUCT, DELETE_PRODUCT } =
  productsSlice.actions;
export default productsSlice.reducer;
