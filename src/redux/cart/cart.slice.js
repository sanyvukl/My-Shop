import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
  previousURL: "/",
};

const getTotalQuantity = (cartItems) => {
  return cartItems.reduce((acc, current) => {
    return (acc += current.quantity);
  }, 0);
};
const getTotalAmount = (cartItems) => {
  return cartItems.reduce((acc, current) => {
    return (acc += current.quantity * current.data.price);
  }, 0);
};

const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Action
    ADD_TO_CART: (state, action) => {
      const { product } = action.payload;
      const productIndex = state.cartItems.findIndex(
        (item) => item.id === product.id
      );
      if (productIndex >= 0) {
        // Exist
        if (product.extraQuantity) {
          state.cartItems[productIndex].quantity += product.extraQuantity;
        } else {
          state.cartItems[productIndex].quantity += 1;
        }
        toast.info(`${product.data.name} added to cart`, {
          position: "top-left",
        });
      } else {
        // Not Exist
        if (product.extraQuantity) {
          const tempProduct = { ...product, quantity: product.extraQuantity };
          state.cartItems.push(tempProduct);
        } else {
          const tempProduct = { ...product, quantity: 1 };
          state.cartItems.push(tempProduct);
        }
        toast.success(`${product.data.name} added to cart`, {
          position: "top-left",
        });
      }

      state.cartTotalAmount = getTotalAmount(state.cartItems);
      state.cartTotalQuantity = getTotalQuantity(state.cartItems);
    },
    DELETE_FROM_CART: (state, action) => {
      const { product } = action.payload;
      const productIndex = state.cartItems.findIndex(
        (item) => item.id === product.id
      );

      if (state.cartItems[productIndex].quantity === 1) {
        // One element
        state.cartItems = [...state.cartItems].filter(
          (item) => item.id !== product.id
        );
      } else if (state.cartItems[productIndex].quantity > 1) {
        // More than one element
        state.cartItems[productIndex].quantity -= 1;
      }
      state.cartTotalAmount = getTotalAmount(state.cartItems);
      state.cartTotalQuantity = getTotalQuantity(state.cartItems);
    },
    REMOVE_FROM_CART: (state, action) => {
      const { product } = action.payload;
      //Removing Items
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== product.id
      );
      state.cartTotalAmount = getTotalAmount(state.cartItems);
      state.cartTotalQuantity = getTotalQuantity(state.cartItems);
    },
    CLEAR_CART: (state) => {
      state.cartItems = [];
      state.cartTotalAmount = 0;
      state.cartTotalQuantity = 0;
    },
    SAVE_URL: (state, action) => {
      state.previousURL = action.payload;
    },
  },
});

export const selectCartItems = (state) => state.cart.cartItems;
export const selectCartTotalAmount = (state) => state.cart.cartTotalAmount;
export const selectCartTotalQuantity = (state) => state.cart.cartTotalQuantity;
export const selectCartPreviousUrl = (state) => state.cart.previousURL;
export const {
  ADD_TO_CART,
  DELETE_FROM_CART,
  REMOVE_FROM_CART,
  CLEAR_CART,
  SAVE_URL,
} = CartSlice.actions;

export default CartSlice.reducer;
