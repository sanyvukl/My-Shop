import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  shippingAddress: {},
  billingAddress: {},
};

const CheckoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    // Actions
    SAVE_SHIPPING_ADDRESS(state, action) {
      state.shippingAddress = action.payload;
    },
    SAVE_BILLING_ADDRESS(state, action) {
      state.billingAddress = action.payload;
    },
  },
});

export const selectShippingAddress = (state) => state.checkout.shippingAddress;
export const selectBillingAddress = (state) => state.checkout.billingAddress;

export const { SAVE_SHIPPING_ADDRESS, SAVE_BILLING_ADDRESS } =
  CheckoutSlice.actions;

export default CheckoutSlice.reducer;
