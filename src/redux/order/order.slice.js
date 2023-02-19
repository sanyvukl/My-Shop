import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orderHistory: [],
  userOrders: [],
  totalAmount: 0,
};

const OrderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    ADD_ORDER: (state, action) => {
      state.orderHistory = [...state.orderHistory, action.payload];
    },
    STORE_ORDERS: (state, action) => {
      state.orderHistory = action.payload;
      state.totalAmount = state.orderHistory.reduce(
        (acc, current) => (acc += current.data.orderAmount),
        0
      );
    },
    STORE_USER_ORDERS: (state, action) => {
      state.userOrders = action.payload;
    },
    UPDATE_ORDER: (state, action) => {
      const { id, data } = action.payload;
      const indexOfOrder = state.orderHistory.findIndex((el) => el.id === id);
      state.orderHistory[indexOfOrder] = { id, data };
    },
    DELETE_ORDER: (state, action) => {
      const { id } = action.payload;
      state.orderHistory = state.orderHistory.filter(
        (order) => order.id !== id
      );
    },
  },
});
export const selectOrderHistory = (state) => state.orders.orderHistory;
export const selectTotalAmount = (state) => state.orders.totalAmount;
export const selectUserOrders = (state) => state.orders.userOrders;
export const {
  ADD_ORDER,
  STORE_ORDERS,
  STORE_USER_ORDERS,
  UPDATE_ORDER,
  DELETE_ORDER,
} = OrderSlice.actions;

export default OrderSlice.reducer;
